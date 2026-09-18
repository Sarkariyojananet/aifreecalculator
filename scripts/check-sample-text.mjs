async function check() {
  const res = await fetch('http://localhost:4321/hi/free-online-tools/image-compressor/');
  const text = await res.text();
  const proseIdx = text.indexOf('class="prose prose-slate');
  if (proseIdx !== -1) {
    const section = text.substring(proseIdx, proseIdx + 2000);
    const clean = section.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('Sample text:', clean.slice(0, 500));
  } else {
    console.log('No prose class found');
  }
}
check();
