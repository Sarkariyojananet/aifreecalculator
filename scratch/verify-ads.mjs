// test script

async function test() {
  const res = await fetch('http://localhost:4321/');
  const html = await res.text();
  console.log('Homepage contains data-ad-slot-location="top":', html.includes('data-ad-slot-location="top"'));
  console.log('Homepage contains buildGoogleTestAd:', html.includes('buildGoogleTestAd'));
  console.log('Homepage contains GOOGLE ADSENSE TEST MODE:', html.includes('GOOGLE ADSENSE TEST MODE'));

  const emiRes = await fetch('http://localhost:4321/finance/emi-calculator/');
  const emiHtml = await emiRes.text();
  console.log('EMI has sidebar ad:', emiHtml.includes('data-ad-slot-location="sidebar"'));
  console.log('EMI has mobile-banner ad:', emiHtml.includes('data-ad-slot-location="mobile-banner"'));
  console.log('EMI has mobile-rectangle ad:', emiHtml.includes('data-ad-slot-location="mobile-rectangle"'));
}

test();
