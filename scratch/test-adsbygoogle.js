async function check() {
  const homeHtml = await (await fetch('http://localhost:4321/')).text();
  const lines = homeHtml.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('adsbygoogle')) {
      console.log(`Line ${i+1}: ${lines[i].trim()}`);
    }
  }
}
check();
