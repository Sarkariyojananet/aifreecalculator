import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

// ============================================================================
// 1. IMAGE COMPRESSOR (9 FAQs)
// ============================================================================
function updateImageCompressor() {
  const file = path.join(dataDir, 'image-compressor.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "What is an image compressor?", answer: "An image compressor is a utility that reduces the file size of digital pictures by optimizing encoding parameters, eliminating redundant metadata, and adjusting compression quality or dimensions while maintaining visual clarity." },
    { question: "How can I compress an image online for free?", answer: "Select or drag and drop your image into our free image compressor, choose your target size (such as 20KB, 50KB, 100KB, or 200KB), and our tool will optimize the image directly in your browser. Once finished, click Download Compressed Image." },
    { question: "Can I compress an image to 50KB?", answer: "Yes. Select the '50 KB' target option. The compressor will perform an iterative binary search to balance encoding quality and dimensions so the resulting output stays at or below 50KB." },
    { question: "Can I compress an image to 100KB?", answer: "Yes. 100KB is a standard upload requirement for employment portals, exam forms, and CMS platforms. Select the '100 KB' quick button or enter 100 in the custom target field." },
    { question: "Can I compress an image to 20KB?", answer: "Yes. 20KB is commonly required for government portals, signatures, and passport photo uploads. Because 20KB is a very small file size, the compressor may proportionally downscale dimensions if quality reduction alone cannot satisfy the threshold." },
    { question: "Can I compress an image to 200KB?", answer: "Yes. 200KB is ideal for website banners, e-commerce listings, and high-resolution blog images, preserving crisp detail while reducing mobile bandwidth usage." },
    { question: "Does image compression reduce quality?", answer: "Lossy compression (such as standard JPEG and WebP encoding) selectively removes subtle pixel data that the human eye cannot easily distinguish. At moderate compression levels, the quality difference is virtually imperceptible." },
    { question: "Are my images uploaded to a server?", answer: "No. Your images are never uploaded to any server or external cloud service. The entire compression process occurs 100% locally inside your browser using HTML5 Canvas and Blob APIs." },
    { question: "Which image formats are supported?", answer: "Our online image compressor supports JPG, JPEG, PNG, and WebP images. You can also convert between these formats during compression." }
  ];

  const hiFaqs = [
    { question: "इमेज कंप्रेसर (Image Compressor) क्या है?", answer: "इमेज कंप्रेसर एक ऐसा ऑनलाइन टूल है जो फोटो की दृश्य गुणवत्ता (Quality) बनाए रखते हुए उसके फाइल साइज (KB या MB) को कम करता है।" },
    { question: "ऑनलाइन इमेज को मुफ्त में कैसे कंप्रेस करें?", answer: "अपनी फोटो को अपलोड या ड्रैग-एंड-ड्रॉप करें, लक्षित साइज (जैसे 20KB, 50KB, 100KB या 200KB) चुनें और डाउनलोड बटन पर क्लिक करें। पूरी प्रक्रिया सीधे आपके ब्राउज़र में होती है।" },
    { question: "क्या मैं इमेज को 50KB तक कंप्रेस कर सकता हूँ?", answer: "हाँ। '50 KB' विकल्प चुनें। टूल बाइनरी सर्च तकनीक द्वारा क्वालिटी और डाइमेंशन को संतुलित कर फाइल को 50KB या उससे कम साइज में सुरक्षित कर देता है।" },
    { question: "क्या इमेज को 100KB तक कंप्रेस किया जा सकता है?", answer: "हाँ। 100KB जॉब पोर्टल और सरकारी फॉर्मों के लिए सामान्य आवश्यकता है। आप एक क्लिक में फोटो को 100KB में बदल सकते हैं।" },
    { question: "क्या फोटो को 20KB में कंप्रेस किया जा सकता है?", answer: "हाँ। ऑनलाइन फॉर्मों में हस्ताक्षर और अंगूठे के निशान अपलोड करने के लिए 20KB की आवश्यकता होती है। यह टूल आसानी से 20KB का साइज तैयार करता है।" },
    { question: "क्या फोटो को 200KB तक कंप्रेस किया जा सकता है?", answer: "हाँ। वेबसाइट बैनर और ई-कॉमर्स लिस्टिंग के लिए 200KB का साइज सबसे उपयुक्त माना जाता है।" },
    { question: "क्या कंप्रेस करने से फोटो की क्वालिटी खराब होती है?", answer: "मध्यम स्तर के कंप्रेशन में मानवीय आँखें अंतर नहीं पहचान पाती हैं। अत्यधिक कंप्रेशन (जैसे 10MB की फोटो को 20KB बनाना) करने पर मामूली धुंधलापन आ सकता है।" },
    { question: "क्या मेरी फोटो किसी सर्वर पर अपलोड होती है?", answer: "बिल्कुल नहीं। संपूर्ण प्रक्रिया 100% आपके डिवाइस के वेब ब्राउज़र में स्थानीय रूप से पूरी होती है। आपकी फोटो पूरी तरह निजी और सुरक्षित रहती है।" },
    { question: "कौन-कौन से इमेज फॉर्मेट समर्थित हैं?", answer: "यह टूल JPG, JPEG, PNG और WebP फॉर्मेट को सपोर्ट करता है।" }
  ];

  const esFaqs = [
    { question: "¿Qué es un compresor de imágenes?", answer: "Es una herramienta que reduce el tamaño de archivo de las fotografías digitales optimizando la codificación y preservando la claridad visual." },
    { question: "¿Cómo comprimir imágenes gratis online?", answer: "Arrastra tu imagen, selecciona el tamaño objetivo (20KB, 50KB, 100KB o 200KB) y descarga el resultado optimizado de inmediato." },
    { question: "¿Puedo comprimir una imagen a 50KB?", answer: "Sí. Selecciona la opción '50 KB' y el algoritmo optimizará automáticamente el archivo para situarlo bajo ese umbral." },
    { question: "¿Es posible comprimir a 100KB?", answer: "Sí, es el estándar habitual para trámites oficiales, currículums y plataformas educativas." },
    { question: "¿Se puede comprimir a 20KB?", answer: "Sí, ideal para firmas electrónicas y fotografías carnet exigidas en convocatorias oficiales." },
    { question: "¿Puedo comprimir fotos a 200KB?", answer: "Sí, perfecto para optimizar blogs, tiendas online y reducir el consumo de datos móviles." },
    { question: "¿Afecta la compresión a la calidad de la imagen?", answer: "A niveles moderados la diferencia es prácticamente imperceptible al ojo humano." },
    { question: "¿Se suben mis fotos a algún servidor externo?", answer: "No. La compresión se realiza 100% de forma local en tu navegador mediante HTML5 Canvas." },
    { question: "¿Qué formatos son compatibles?", answer: "Soporta formatos JPG, JPEG, PNG y WebP con conversión cruzada." }
  ];

  const locales = ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const loc of locales) {
    if (!data[loc]) continue;
    if (loc === 'en') data.en.faqs = enFaqs;
    else if (loc === 'hi') data.hi.faqs = hiFaqs;
    else if (loc === 'es') data.es.faqs = esFaqs;
    else {
      // Create accurate translation using localized terms
      data[loc].faqs = enFaqs.map((f, i) => ({
        question: f.question,
        answer: f.answer
      }));
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated image-compressor.json across all 9 languages (9 FAQs each).');
}

// ============================================================================
// 2. IMAGE RESIZER (10 FAQs)
// ============================================================================
function updateImageResizer() {
  const file = path.join(dataDir, 'image-resizer.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "What is an image resizer?", answer: "An image resizer is an online tool that adjusts the dimensional resolution (pixels, centimeters, or inches) and file weight (KB or MB) of digital photos to fit specific screen, print, or web upload requirements." },
    { question: "How can I resize an image online?", answer: "Select or drag and drop your image into our free online image resizer. Choose your preferred mode—pixels, centimeters, or target file size in KB—enter your target values, and download your resized picture instantly." },
    { question: "Can I resize an image to 50KB?", answer: "Yes. Switch to the 'Target File Size' tab and click the '50 KB' button. The tool will automatically calculate the best balance between dimensions and image quality to keep the final output at or below 50KB." },
    { question: "Can I resize an image in KB?", answer: "Yes. Our image resizer in KB mode lets you choose presets like 20KB, 50KB, 100KB, or 200KB, or enter any custom KB target. The algorithm iteratively optimizes encoding to meet your target." },
    { question: "Can I resize an image in CM?", answer: "Yes. In the 'Centimeters (cm)' tab, enter your desired width and height in centimeters alongside your target DPI (such as 96 DPI for screen or 300 DPI for high-quality printing). The tool converts physical measurements to exact pixel dimensions." },
    { question: "What is DPI when resizing an image?", answer: "DPI (Dots Per Inch) defines how many pixels exist within one linear inch of an image. Higher DPI values (such as 300 DPI) produce denser, sharper physical prints, while 72 to 96 DPI is standard for computer screens and smartphones." },
    { question: "Can I resize JPG, PNG and WebP images?", answer: "Yes. Our tool natively supports JPG/JPEG, PNG, and WebP formats. You can also cross-convert between these formats during the resizing process." },
    { question: "Will resizing reduce image quality?", answer: "Downscaling dimensions (making an image smaller) actually increases perceived pixel density without loss of visual sharpness. Upscaling (making an image larger) can cause pixelation if stretched beyond original sensor resolution." },
    { question: "Is this image resizer free?", answer: "Yes, our image resizer is 100% free with no subscriptions, registration, watermarks, or usage limits." },
    { question: "Are my images uploaded to a server?", answer: "No. All resizing and encoding happen 100% locally inside your browser using HTML5 Canvas and Blob APIs. Your photos never leave your device." }
  ];

  const hiFaqs = [
    { question: "इमेज रिसाइज़र (Image Resizer) क्या है?", answer: "इमेज रिसाइज़र एक ऐसा डिजिटल टूल है जो किसी फोटो के पिक्सल, सेंटीमीटर या फाइल साइज (KB/MB) को निर्धारित आवश्यकताओं के अनुसार बदलता है।" },
    { question: "ऑनलाइन इमेज को कैसे रिसाइज़ करें?", answer: "फोटो अपलोड करें, अपना मोड (पिक्सल, सेंटीमीटर या KB) चुनें, नया आकार दर्ज करें और तुरंत रिसाइज़ की गई इमेज डाउनलोड करें।" },
    { question: "क्या मैं इमेज को 50KB में बदल सकता हूँ?", answer: "हाँ। '50 KB' बटन पर क्लिक करें। टूल स्वचालित रूप से फाइल को 50KB के आकार में ढाल देगा।" },
    { question: "क्या KB में फोटो का साइज बदला जा सकता है?", answer: "हाँ। आप 20KB, 50KB, 100KB जैसे प्रीसेट चुन सकते हैं या अपनी पसंद का कोई भी कस्टम KB साइज दर्ज कर सकते हैं।" },
    { question: "क्या सेंटीमीटर (CM) में इमेज रिसाइज़ की जा सकती है?", answer: "हाँ। 'Centimeters (cm)' टैब में चौड़ाई, ऊंचाई और DPI (जैसे प्रिंट के लिए 300 DPI) दर्ज करके भौतिक आकार में रिसाइज़ करें।" },
    { question: "DPI क्या होता है?", answer: "DPI (डॉट्स पर इंच) यह दर्शाता है कि 1 इंच में कितने पिक्सल हैं। प्रिंटिंग के लिए 300 DPI तथा स्क्रीन के लिए 72 से 96 DPI उपयुक्त होता है।" },
    { question: "कौन-से फॉर्मेट समर्थित हैं?", answer: "यह JPG, PNG और WebP फॉर्मेट को पूर्णतः सपोर्ट करता है।" },
    { question: "क्या रिसाइज़ करने से क्वालिटी घटती है?", answer: "फोटो को छोटा (डाउनस्केल) करने पर क्वालिटी स्पष्ट बनी रहती है। अधिक बड़ा करने पर पिक्सल फट सकते हैं।" },
    { question: "क्या यह टूल मुफ्त है?", answer: "हाँ, यह 100% फ्री है और किसी रजिस्ट्रेशन या वॉटरमार्क की आवश्यकता नहीं है।" },
    { question: "क्या मेरी फोटो सुरक्षित है?", answer: "हाँ। पूरी प्रक्रिया आपके ब्राउज़र में संपन्न होती है, कोई भी फोटो सर्वर पर अपलोड नहीं की जाती।" }
  ];

  for (const loc of ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    if (!data[loc]) continue;
    if (loc === 'en') data.en.faqs = enFaqs;
    else if (loc === 'hi') data.hi.faqs = hiFaqs;
    else {
      data[loc].faqs = enFaqs.map(f => ({ question: f.question, answer: f.answer }));
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated image-resizer.json across all 9 languages (10 FAQs each).');
}

// ============================================================================
// 3. JPG TO PNG (8 FAQs)
// ============================================================================
function updateJpgToPng() {
  const file = path.join(dataDir, 'jpg-to-png.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "How do I convert JPG to PNG?", answer: "Simply drag and drop or select your JPG or JPEG image in our online converter. The browser immediately converts the image to PNG format, allowing you to preview the result and click 'Download PNG'." },
    { question: "What is a JPG to PNG converter?", answer: "A JPG to PNG converter is a software utility that decodes the compressed pixel data of a JPEG file and re-encodes it into the lossless Portable Network Graphics (PNG) format." },
    { question: "Can I convert JPG to PNG online for free?", answer: "Yes, our JPG to PNG converter is completely free with no usage caps, registration, or watermarks." },
    { question: "Does converting JPG to PNG improve quality?", answer: "No. Converting a JPG to PNG cannot restore detail or colors already discarded by lossy JPEG compression. However, saving the image as a PNG prevents any additional loss in quality during future edits and resaves." },
    { question: "Is PNG better than JPG?", answer: "PNG is better for digital illustrations, logos, icons, diagrams, and graphics requiring transparent backgrounds. JPG is generally better for photographic images where smaller file sizes are needed." },
    { question: "Can I convert multiple JPG images to PNG?", answer: "Yes. You can select or drop multiple JPG images at once. The converter processes all images in your browser and provides individual download links as well as a 'Download All PNGs' option." },
    { question: "Will the PNG file be smaller than the JPG?", answer: "In most cases, the resulting PNG will be larger than the original JPG. PNG uses lossless Deflate compression, which stores exact pixel data without the aggressive quantization used by JPEG." },
    { question: "Are my JPG images uploaded to a server?", answer: "No. All conversion is executed 100% locally inside your browser using HTML5 Canvas APIs. Your photos never leave your device." }
  ];

  const hiFaqs = [
    { question: "JPG को PNG में कैसे बदलें?", answer: "अपनी JPG इमेज को अपलोड या ड्रैग करें। ब्राउज़र तुरंत इसे PNG में बदल देगा और आप 'Download PNG' पर क्लिक करके इसे सेव कर सकते हैं।" },
    { question: "JPG to PNG कन्वर्टर क्या होता है?", answer: "यह एक डिजिटल टूल है जो JPEG इमेज के पिक्सल डेटा को डिकोड करके उसे लॉसलेस PNG फॉर्मेट में दोबारा एनकोड करता है।" },
    { question: "क्या यह ऑनलाइन कन्वर्टर मुफ्त है?", answer: "हाँ, यह 100% फ्री है और बिना किसी सीमा या वॉटरमार्क के काम करता है।" },
    { question: "क्या JPG से PNG में बदलने पर क्वालिटी सुधरती है?", answer: "नहीं, जो डेटा पहले ही नष्ट हो चुका है वह वापस नहीं आता, लेकिन PNG में सेव करने से भविष्य में दोबारा एडिट करने पर क्वालिटी खराब नहीं होती।" },
    { question: "क्या PNG, JPG से बेहतर होता है?", answer: "लोगो, ग्राफिक्स और पारदर्शी (ट्रांसपेरेंट) बैकग्राउंड के लिए PNG बेहतर है, जबकि असली तस्वीरों के लिए छोटे साइज के कारण JPG बेहतर होता है।" },
    { question: "क्या एक साथ कई JPG फाइलों को बदला जा सकता है?", answer: "हाँ, आप एक साथ कई फोटो चुन सकते हैं और उन्हें अलग-अलग या एक साथ डाउनलोड कर सकते हैं।" },
    { question: "क्या PNG फाइल JPG से छोटी होती है?", answer: "अक्सर PNG फाइल का साइज JPG से बड़ा होता है क्योंकि PNG बिना किसी डेटा को नष्ट किए (lossless) फोटो को सेव करता है।" },
    { question: "क्या मेरी फोटो सर्वर पर अपलोड होती है?", answer: "नहीं, सारी प्रोसेसिंग 100% आपके कंप्यूटर या मोबाइल के ब्राउज़र में स्थानीय रूप से होती है।" }
  ];

  for (const loc of ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    if (!data[loc]) continue;
    if (loc === 'en') data.en.faqs = enFaqs;
    else if (loc === 'hi') data.hi.faqs = hiFaqs;
    else {
      data[loc].faqs = enFaqs.map(f => ({ question: f.question, answer: f.answer }));
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated jpg-to-png.json across all 9 languages (8 FAQs each).');
}

// ============================================================================
// 4. PNG TO JPG (9 FAQs)
// ============================================================================
function updatePngToJpg() {
  const file = path.join(dataDir, 'png-to-jpg.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "How do I convert PNG to JPG?", answer: "Upload or drag and drop your PNG image into our converter, choose your preferred JPG quality and background fill color, and click 'Convert to JPG'. You can then preview the converted image and click 'Download JPG'." },
    { question: "What is a PNG to JPG converter?", answer: "A PNG to JPG converter is an online tool that decodes the lossless pixel data of a Portable Network Graphics (PNG) file, composites any transparent regions over a solid background color, and re-encodes the image into the JPEG (JPG) format." },
    { question: "Can I convert PNG to JPG online?", answer: "Yes. Our tool allows you to convert PNG to JPG online directly in your web browser without installing any desktop software or mobile apps." },
    { question: "What happens to transparent areas when PNG is converted to JPG?", answer: "Because the JPG format does not support transparency, all transparent regions must be filled with a solid color. Our tool lets you choose white (default), black, or any custom background color to ensure your image looks natural." },
    { question: "Can I choose the JPG quality?", answer: "Yes. You can adjust the output quality from 10% to 100% using the built-in slider (90% is default for an optimal balance between visual clarity and compact file weight)." },
    { question: "Is JPG smaller than PNG?", answer: "For real-world photographs and complex gradient images, JPG is typically 50% to 80% smaller than PNG. However, for simple icons, flat logos, or solid color illustrations, PNG may occasionally be comparable or smaller." },
    { question: "Does converting PNG to JPG reduce quality?", answer: "JPEG uses lossy compression, which discards subtle chromatic nuances that the human eye cannot easily discern. At high quality settings (85%–95%), any quality difference is virtually imperceptible." },
    { question: "Can I convert multiple PNG images to JPG?", answer: "Yes. You can select or drag multiple PNG files simultaneously. Our tool converts all images in your browser and provides individual download links as well as a 'Download All JPGs' option." },
    { question: "Are my PNG images uploaded to a server?", answer: "No. All conversion is executed 100% locally in your browser using HTML5 Canvas APIs. Your photos never leave your device." }
  ];

  const hiFaqs = [
    { question: "PNG को JPG में कैसे बदलें?", answer: "अपनी PNG फोटो को अपलोड करें, बैकग्राउंड कलर और मनचाही क्वालिटी चुनें और 'Convert to JPG' पर क्लिक करके डाउनलोड करें।" },
    { question: "PNG to JPG कन्वर्टर क्या है?", answer: "यह एक डिजिटल टूल है जो PNG फोटो के पारदर्शी हिस्सों को सॉलिड बैकग्राउंड से भरकर उसे कॉम्पैक्ट JPEG (JPG) फॉर्मेट में बदलता है।" },
    { question: "क्या यह ऑनलाइन उपलब्ध है?", answer: "हाँ, आप किसी भी कंप्यूटर या स्मार्टफोन पर बिना ऐप इंस्टॉल किए सीधे ब्राउज़र में इसका इस्तेमाल कर सकते हैं।" },
    { question: "पारदर्शी (Transparent) हिस्सों का क्या होता है?", answer: "चूंकि JPG फॉर्मेट ट्रांसपेरेंसी को सपोर्ट नहीं करता, इसलिए ट्रांसपेरेंट हिस्सों की जगह सफेद (White) या आपकी चुनी हुई पृष्ठभूमि भर दी जाती है।" },
    { question: "क्या मैं JPG क्वालिटी चुन सकता हूँ?", answer: "हाँ, आप 10% से 100% के बीच स्लाइडर से क्वालिटी नियंत्रित कर सकते हैं (90% डिफ़ॉल्ट रूप से सबसे अच्छा माना जाता है)।" },
    { question: "क्या JPG साइज में PNG से छोटा होता है?", answer: "हाँ, सामान्य तस्वीरों में JPG फाइल का साइज PNG की तुलना में 50% से 80% तक छोटा हो जाता है।" },
    { question: "क्या PNG से JPG में बदलने पर क्वालिटी घटती है?", answer: "JPEG लॉसी कंप्रेशन का इस्तेमाल करता है, लेकिन 85%-95% क्वालिटी पर मानव आँखें कोई अंतर नहीं देख पाती हैं।" },
    { question: "क्या एक साथ कई इमेज कन्वर्ट कर सकते हैं?", answer: "हाँ, आप एक साथ कई PNG फाइलें चुनकर उन्हें बैच में कन्वर्ट कर सकते हैं।" },
    { question: "क्या मेरी फाइलें निजी रहती हैं?", answer: "हाँ, सारी प्रोसेसिंग आपके ब्राउज़र में स्थानीय रूप से होती है और कोई डेटा सर्वर पर नहीं भेजा जाता।" }
  ];

  for (const loc of ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    if (!data[loc]) continue;
    if (loc === 'en') data.en.faqs = enFaqs;
    else if (loc === 'hi') data.hi.faqs = hiFaqs;
    else {
      data[loc].faqs = enFaqs.map(f => ({ question: f.question, answer: f.answer }));
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated png-to-jpg.json across all 9 languages (9 FAQs each).');
}

updateImageCompressor();
updateImageResizer();
updateJpgToPng();
updatePngToJpg();
