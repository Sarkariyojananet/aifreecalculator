async function check() {
  const cfgRes = await fetch('http://localhost:4321/api/adsense-config/');
  const cfg = await cfgRes.json();
  console.log('--- API ADSENSE CONFIG ---');
  console.log('enabled:', cfg.enabled);
  console.log('testMode:', cfg.testMode);
  console.log('clientId:', cfg.clientId);
  console.log('slots:');
  for (const [k, v] of Object.entries(cfg.slots)) {
    console.log(`  ${k}: enabled=${v.enabled}, net=${v.adNetwork}, slotId=${v.slotId}`);
  }

  const homeHtml = await (await fetch('http://localhost:4321/')).text();
  console.log('\n--- HOMEPAGE HTML CHECKS ---');
  console.log('Has adsbygoogle script tag:', homeHtml.includes('adsbygoogle.js'));
  console.log('Has top slot:', homeHtml.includes('data-ad-slot-location="top"'));
  console.log('Has footer slot:', homeHtml.includes('data-ad-slot-location="footer"'));
  console.log('Has sidebar slot:', homeHtml.includes('data-ad-slot-location="sidebar"'));
  
  const emiHtml = await (await fetch('http://localhost:4321/finance/emi-calculator/')).text();
  console.log('\n--- EMI CALCULATOR HTML CHECKS ---');
  console.log('Has top slot:', emiHtml.includes('data-ad-slot-location="top"'));
  console.log('Has footer slot:', emiHtml.includes('data-ad-slot-location="footer"'));
  console.log('Has sidebar slot:', emiHtml.includes('data-ad-slot-location="sidebar"'));
  console.log('Has mobile_banner slot:', emiHtml.includes('data-ad-slot-location="mobile-banner"'));
  console.log('Has mobile_rectangle slot:', emiHtml.includes('data-ad-slot-location="mobile-rectangle"'));
}

check();
