async function simulate() {
  const cfg = await (await fetch('http://localhost:4321/api/adsense-config/')).json();
  const html = await (await fetch('http://localhost:4321/')).text();

  console.log('API config.testMode:', cfg.testMode);
  console.log('API config.enabled:', cfg.enabled);

  // Check top slot in html
  const hasTopAside = html.includes('data-ad-slot-location="top"');
  console.log('Has top aside:', hasTopAside);
  
  // Extract top aside HTML
  const topMatch = html.match(/<aside[^>]*data-ad-slot-location="top"[^>]*>([\s\S]*?)<\/aside>/);
  if (topMatch) {
    console.log('Top aside full HTML:\n', topMatch[0].slice(0, 500));
  }

  // Extract footer aside HTML
  const footerMatch = html.match(/<aside[^>]*data-ad-slot-location="footer"[^>]*>([\s\S]*?)<\/aside>/);
  if (footerMatch) {
    console.log('Footer aside full HTML:\n', footerMatch[0].slice(0, 500));
  }
}
simulate();
