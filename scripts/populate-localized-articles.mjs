import fs from 'fs';
import path from 'path';

const tools = [
  'image-compressor',
  'image-resizer',
  'jpg-to-png',
  'png-to-jpg',
  'qr-code-generator',
  'word-counter',
  'json-formatter',
  'json-validator',
  'password-generator',
  'pdf-merge'
];

console.log('=== Populating localized contentHtml for 10 Online Tools ===');

for (const slug of tools) {
  const astroPath = path.resolve(`src/pages/free-online-tools/${slug}.astro`);
  const jsonPath = path.resolve(`src/i18n/translations/calculators/data/${slug}.json`);
  if (!fs.existsSync(astroPath) || !fs.existsSync(jsonPath)) continue;

  const astroContent = fs.readFileSync(astroPath, 'utf-8');
  const slotMatch = astroContent.match(/<Fragment slot="content">([\s\S]*?)<\/Fragment>/);
  if (!slotMatch) {
    console.error(`Slot not found for ${slug}`);
    continue;
  }

  const enHtml = slotMatch[1].trim();
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // Ensure en has contentHtml
  jsonData.en.contentHtml = enHtml;

  function replaceHeading(html, englishText, localizedText) {
    const escaped = englishText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(<h[23][^>]*>\\s*)` + escaped + `(\\s*<\\/h[23]>)`, 'gi');
    return html.replace(regex, `$1${localizedText}$2`);
  }

  // Function to adapt HTML content per locale
  function generateLocalizedHtml(loc) {
    let html = enHtml;

    if (loc === 'hi') {
      html = replaceHeading(html, 'Free Image Compressor Online', 'मुफ्त ऑनलाइन इमेज कंप्रेसर (Image Compressor)');
      html = replaceHeading(html, 'Popular Target Size Limits Explained', 'प्रमुख फाइल साइज सीमाएं (20KB, 50KB, 100KB, 200KB)');
      html = replaceHeading(html, 'Compress Image to 20KB', 'फोटो को 20KB में कंप्रेस करें');
      html = replaceHeading(html, 'Compress Image to 50KB', 'फोटो को 50KB में कंप्रेस करें');
      html = replaceHeading(html, 'Compress Image to 100KB', 'फोटो को 100KB में कंप्रेस करें');
      html = replaceHeading(html, 'Compress Image to 200KB', 'फोटो को 200KB में कंप्रेस करें');
      html = replaceHeading(html, 'How to Compress an Image', 'इमेज को कैसे कंप्रेस करें (5 आसान चरण)');
      html = replaceHeading(html, 'How Does an Image Compressor Work?', 'इमेज कंप्रेसर कैसे काम करता है?');
      html = replaceHeading(html, 'Why Compress Images?', 'फोटो को कंप्रेस क्यों करें? (प्रमुख लाभ)');
      html = replaceHeading(html, 'Explore More Free Online Tools', 'अन्य उपयोगी ऑनलाइन टूल्स');
      html = replaceHeading(html, 'Online Image Resizer', 'ऑनलाइन इमेज रिसाइज़र (Image Resizer)');
      html = replaceHeading(html, 'Resize Image in KB', 'KB में फोटो का साइज बदलें');
      html = replaceHeading(html, 'Resize Image in CM', 'सेंटीमीटर (CM) में फोटो रिसाइज़ करें');
      html = replaceHeading(html, 'How to Resize an Image Online', 'ऑनलाइन फोटो को रिसाइज़ कैसे करें');
      html = replaceHeading(html, 'Why Resize an Image?', 'फोटो को रिसाइज़ क्यों करें?');
      html = replaceHeading(html, 'JPG to PNG Converter', 'JPG से PNG कन्वर्टर');
      html = replaceHeading(html, 'How to Convert JPG to PNG', 'JPG को PNG में कैसे बदलें');
      html = replaceHeading(html, 'Convert JPG to PNG Online', 'JPG को PNG में ऑनलाइन बदलें');
      html = replaceHeading(html, 'Why Convert JPG to PNG?', 'JPG को PNG में क्यों बदलें?');
      html = replaceHeading(html, 'PNG to JPG Converter', 'PNG से JPG कन्वर्टर');
      html = replaceHeading(html, 'How to Convert PNG to JPG', 'PNG को JPG में कैसे बदलें');
      html = replaceHeading(html, 'Why Convert PNG to JPG?', 'PNG को JPG में क्यों बदलें?');
      html = replaceHeading(html, 'Free QR Code Generator for Custom & Dynamic Needs', 'मुफ्त QR कोड जनरेटर');
      html = replaceHeading(html, 'How to Generate a QR Code for Free', 'मुफ्त में QR कोड कैसे बनाएं');
      html = replaceHeading(html, 'Best Practices for Printing and Scanning QR Codes', 'QR कोड प्रिंट और स्कैन करने के श्रेष्ठ तरीके');
      html = replaceHeading(html, 'Word Counter - Free Online Tools', 'वर्ड काउंटर (Word Counter) - शब्दों और अक्षरों की गिनती');
      html = replaceHeading(html, 'Free Word Counter Tool: Designed for Writers, Students, and Marketers', 'मुफ्त वर्ड काउंटर टूल: लेखकों, छात्रों और मार्केटर्स के लिए');
      html = replaceHeading(html, 'What Does a Word Counter Count?', 'वर्ड काउंटर क्या-क्या गिनता है?');
      html = replaceHeading(html, 'How to Use This Word Counter', 'इस वर्ड काउंटर का उपयोग कैसे करें');
      html = replaceHeading(html, 'Why Is Word Count Important?', 'शब्दों की संख्या क्यों महत्वपूर्ण है?');
      html = replaceHeading(html, 'Word Count vs Character Count', 'वर्ड काउंट बनाम कैरेक्टर काउंट');
      html = replaceHeading(html, 'How Are Reading and Speaking Times Calculated?', 'पढ़ने और बोलने के समय की गणना कैसे होती है?');
      html = replaceHeading(html, 'Is This Word Counter Free and Private?', 'क्या यह वर्ड काउंटर सुरक्षित और निजी है?');
      html = replaceHeading(html, 'JSON Formatter Online: Clean, Validated, and Inspectable Data', 'ऑनलाइन JSON फॉर्मेटर (JSON Formatter)');
      html = replaceHeading(html, 'What Is a JSON Formatter?', 'JSON फॉर्मेटर क्या है?');
      html = replaceHeading(html, 'How to Format JSON', 'JSON को कैसे फॉर्मेट करें');
      html = replaceHeading(html, 'How to Validate JSON', 'JSON को कैसे वैलिडेट करें');
      html = replaceHeading(html, 'JSON Formatter vs JSON Minifier', 'JSON फॉर्मेटर बनाम JSON मिनीफायर');
      html = replaceHeading(html, 'XML to JSON Formatter: Translate Legacy Feeds Easily', 'XML से JSON फॉर्मेटर');
      html = replaceHeading(html, 'Why Use an Online JSON Formatter?', 'ऑनलाइन JSON फॉर्मेटर का उपयोग क्यों करें?');
      html = replaceHeading(html, 'Is This JSON Formatter Free and Private?', 'क्या यह JSON फॉर्मेटर सुरक्षित और निजी है?');
      html = replaceHeading(html, 'JSON Validator Online', 'ऑनलाइन JSON वैलिडेटर (JSON Validator)');
      html = replaceHeading(html, 'What Is a JSON Validator?', 'JSON वैलिडेटर क्या है?');
      html = replaceHeading(html, 'Common JSON Syntax Errors', 'सामान्य JSON सिंटैक्स त्रुटियां');
      html = replaceHeading(html, 'JSON Validator vs JSON Formatter', 'JSON वैलिडेटर बनाम JSON फॉर्मेटर');
      html = replaceHeading(html, 'Random Password Generator', 'रैंडम और मजबूत पासवर्ड जनरेटर');
      html = replaceHeading(html, 'Strong Password Generator', 'सुरक्षित और मजबूत पासवर्ड बनाएं');
      html = replaceHeading(html, 'How Does a Password Generator Work?', 'पासवर्ड जनरेटर कैसे काम करता है?');
      html = replaceHeading(html, 'What Makes a Password Strong?', 'पासवर्ड को क्या मजबूत बनाता है?');
      html = replaceHeading(html, 'PDF Merge Online', 'ऑनलाइन PDF मर्ज टूल (PDF Merge)');
      html = replaceHeading(html, 'How to Merge PDF Files', 'PDF फाइलों को आपस में कैसे जोड़ें');
      html = replaceHeading(html, 'Why Merge PDF Files?', 'PDF फाइलों को मर्ज क्यों करें?');
      html = replaceHeading(html, 'Is PDF Merge Safe?', 'क्या PDF मर्ज सुरक्षित है?');
      return html;
    }

    if (loc === 'es') {
      html = replaceHeading(html, 'Free Image Compressor Online', 'Compresor de Imágenes Online Gratis');
      html = replaceHeading(html, 'Popular Target Size Limits Explained', 'Límites de Tamaño Habituales (20KB, 50KB, 100KB, 200KB)');
      html = replaceHeading(html, 'How to Compress an Image', 'Cómo Comprimir una Imagen en 5 Pasos');
      html = replaceHeading(html, 'Why Compress Images?', '¿Por Qué Comprimir Imágenes?');
      html = replaceHeading(html, 'Online Image Resizer', 'Redimensionador de Imágenes Online');
      html = replaceHeading(html, 'JPG to PNG Converter', 'Conversor de JPG a PNG Online');
      html = replaceHeading(html, 'PNG to JPG Converter', 'Conversor de PNG a JPG Online');
      html = replaceHeading(html, 'Free QR Code Generator for Custom & Dynamic Needs', 'Generador de Códigos QR Gratis');
      html = replaceHeading(html, 'Word Counter - Free Online Tools', 'Contador de Palabras Online Gratis');
      html = replaceHeading(html, 'JSON Formatter Online: Clean, Validated, and Inspectable Data', 'Formateador de JSON Online');
      html = replaceHeading(html, 'JSON Validator Online', 'Validador de JSON Online');
      html = replaceHeading(html, 'Random Password Generator', 'Generador de Contraseñas Seguras y Aleatorias');
      html = replaceHeading(html, 'PDF Merge Online', 'Unir Archivos PDF Online Gratis');
      return html;
    }

    if (loc === 'fr') {
      html = replaceHeading(html, 'Free Image Compressor Online', 'Compresseur d\'Images en Ligne Gratuit');
      html = replaceHeading(html, 'Popular Target Size Limits Explained', 'Limites de Poids Usuelles (20Ko, 50Ko, 100Ko, 200Ko)');
      html = replaceHeading(html, 'How to Compress an Image', 'Comment Compresser une Image en 5 Étapes');
      html = replaceHeading(html, 'Why Compress Images?', 'Pourquoi Compresser vos Images ?');
      html = replaceHeading(html, 'Online Image Resizer', 'Redimensionneur d\'Images en Ligne');
      html = replaceHeading(html, 'JPG to PNG Converter', 'Convertisseur JPG en PNG');
      html = replaceHeading(html, 'PNG to JPG Converter', 'Convertisseur PNG en JPG');
      html = replaceHeading(html, 'Free QR Code Generator for Custom & Dynamic Needs', 'Générateur de QR Code Gratuit');
      html = replaceHeading(html, 'Word Counter - Free Online Tools', 'Compteur de Mots en Ligne Gratuit');
      html = replaceHeading(html, 'JSON Formatter Online: Clean, Validated, and Inspectable Data', 'Formateur JSON en Ligne');
      html = replaceHeading(html, 'JSON Validator Online', 'Validateur JSON en Ligne');
      html = replaceHeading(html, 'Random Password Generator', 'Générateur de Mots de Passe Sécurisés');
      html = replaceHeading(html, 'PDF Merge Online', 'Fusionner des Fichiers PDF en Ligne');
      return html;
    }

    if (loc === 'de') {
      html = replaceHeading(html, 'Free Image Compressor Online', 'Kostenloser Online-Bildkompressor');
      html = replaceHeading(html, 'Popular Target Size Limits Explained', 'Typische Dateigrößen-Ziele (20KB, 50KB, 100KB, 200KB)');
      html = replaceHeading(html, 'How to Compress an Image', 'Bild in 5 Schritten komprimieren');
      html = replaceHeading(html, 'Why Compress Images?', 'Warum Bilder komprimieren?');
      html = replaceHeading(html, 'Online Image Resizer', 'Online-Bildgrößenänderer (Image Resizer)');
      html = replaceHeading(html, 'JPG to PNG Converter', 'JPG-zu-PNG-Konverter');
      html = replaceHeading(html, 'PNG to JPG Converter', 'PNG-zu-JPG-Konverter');
      html = replaceHeading(html, 'Free QR Code Generator for Custom & Dynamic Needs', 'Kostenloser QR-Code-Generator');
      html = replaceHeading(html, 'Word Counter - Free Online Tools', 'Kostenloser Online-Wortzähler');
      html = replaceHeading(html, 'JSON Formatter Online: Clean, Validated, and Inspectable Data', 'Online-JSON-Formatierer');
      html = replaceHeading(html, 'JSON Validator Online', 'Online-JSON-Validator');
      html = replaceHeading(html, 'Random Password Generator', 'Sicherer Passwort-Generator');
      html = replaceHeading(html, 'PDF Merge Online', 'PDFs online zusammenfügen');
      return html;
    }

    if (loc === 'pt') {
      html = replaceHeading(html, 'Free Image Compressor Online', 'Compressor de Imagens Online Grátis');
      html = replaceHeading(html, 'Popular Target Size Limits Explained', 'Limites de Tamanho Populares (20KB, 50KB, 100KB, 200KB)');
      html = replaceHeading(html, 'How to Compress an Image', 'Como Comprimir uma Imagem em 5 Passos');
      html = replaceHeading(html, 'Why Compress Images?', 'Por Que Comprimir Imagens?');
      html = replaceHeading(html, 'Online Image Resizer', 'Redimensionador de Imagens Online');
      html = replaceHeading(html, 'JPG to PNG Converter', 'Conversor de JPG para PNG');
      html = replaceHeading(html, 'PNG to JPG Converter', 'Conversor de PNG para JPG');
      html = replaceHeading(html, 'Free QR Code Generator for Custom & Dynamic Needs', 'Gerador de QR Code Grátis');
      html = replaceHeading(html, 'Word Counter - Free Online Tools', 'Contador de Palavras Online Grátis');
      html = replaceHeading(html, 'JSON Formatter Online: Clean, Validated, and Inspectable Data', 'Formatador JSON Online');
      html = replaceHeading(html, 'JSON Validator Online', 'Validador JSON Online');
      html = replaceHeading(html, 'Random Password Generator', 'Gerador de Senhas Seguras');
      html = replaceHeading(html, 'PDF Merge Online', 'Juntar Arquivos PDF Online Grátis');
      return html;
    }

    if (loc === 'it') {
      html = replaceHeading(html, 'Free Image Compressor Online', 'Compressore di Immagini Online Gratis');
      html = replaceHeading(html, 'Popular Target Size Limits Explained', 'Limiti di Dimensione Standard (20KB, 50KB, 100KB, 200KB)');
      html = replaceHeading(html, 'How to Compress an Image', 'Come Comprimere un\'Immagine in 5 Passaggi');
      html = replaceHeading(html, 'Why Compress Images?', 'Perché Comprimere le Immagini?');
      html = replaceHeading(html, 'Online Image Resizer', 'Strumento per Ridimensionare Immagini Online');
      html = replaceHeading(html, 'JPG to PNG Converter', 'Convertitore da JPG a PNG');
      html = replaceHeading(html, 'PNG to JPG Converter', 'Convertitore da PNG a JPG');
      html = replaceHeading(html, 'Free QR Code Generator for Custom & Dynamic Needs', 'Generatore di Codici QR Gratuito');
      html = replaceHeading(html, 'Word Counter - Free Online Tools', 'Contatore di Parole Online Gratis');
      html = replaceHeading(html, 'JSON Formatter Online: Clean, Validated, and Inspectable Data', 'Formattatore JSON Online');
      html = replaceHeading(html, 'JSON Validator Online', 'Validatore JSON Online');
      html = replaceHeading(html, 'Random Password Generator', 'Generatore di Password Sicure');
      html = replaceHeading(html, 'PDF Merge Online', 'Unisci File PDF Online');
      return html;
    }

    if (loc === 'ja') {
      html = replaceHeading(html, 'Free Image Compressor Online', '無料オンライン画像圧縮ツール');
      html = replaceHeading(html, 'Popular Target Size Limits Explained', '主要なファイル容量の目安（20KB、50KB、100KB、200KB）');
      html = replaceHeading(html, 'How to Compress an Image', '画像を圧縮する5つのステップ');
      html = replaceHeading(html, 'Why Compress Images?', 'なぜ画像を圧縮するのか？（主なメリット）');
      html = replaceHeading(html, 'Online Image Resizer', 'オンライン画像リサイズツール');
      html = replaceHeading(html, 'JPG to PNG Converter', 'JPGからPNGへの変換ツール');
      html = replaceHeading(html, 'PNG to JPG Converter', 'PNGからJPGへの変換ツール');
      html = replaceHeading(html, 'Free QR Code Generator for Custom & Dynamic Needs', '無料QRコードジェネレーター');
      html = replaceHeading(html, 'Word Counter - Free Online Tools', '無料オンライン文字数カウント');
      html = replaceHeading(html, 'JSON Formatter Online: Clean, Validated, and Inspectable Data', 'オンラインJSONフォーマッター');
      html = replaceHeading(html, 'JSON Validator Online', 'オンラインJSONバリデーター');
      html = replaceHeading(html, 'Random Password Generator', '強力なパスワード自動生成ツール');
      html = replaceHeading(html, 'PDF Merge Online', 'オンラインPDF結合ツール');
      return html;
    }

    if (loc === 'ko') {
      html = replaceHeading(html, 'Free Image Compressor Online', '무료 온라인 이미지 압축기');
      html = replaceHeading(html, 'Popular Target Size Limits Explained', '자주 쓰이는 파일 용량 규격 (20KB, 50KB, 100KB, 200KB)');
      html = replaceHeading(html, 'How to Compress an Image', '이미지 압축 5단계 방법');
      html = replaceHeading(html, 'Why Compress Images?', '이미지를 압축해야 하는 이유');
      html = replaceHeading(html, 'Online Image Resizer', '온라인 이미지 리사이저');
      html = replaceHeading(html, 'JPG to PNG Converter', 'JPG를 PNG로 변환하기');
      html = replaceHeading(html, 'PNG to JPG Converter', 'PNG를 JPG로 변환하기');
      html = replaceHeading(html, 'Free QR Code Generator for Custom & Dynamic Needs', '무료 맞춤형 QR 코드 생성기');
      html = replaceHeading(html, 'Word Counter - Free Online Tools', '무료 온라인 글자수 세기');
      html = replaceHeading(html, 'JSON Formatter Online: Clean, Validated, and Inspectable Data', '온라인 JSON 포맷터');
      html = replaceHeading(html, 'JSON Validator Online', '온라인 JSON 검증기');
      html = replaceHeading(html, 'Random Password Generator', '강력한 무작위 비밀번호 생성기');
      html = replaceHeading(html, 'PDF Merge Online', '온라인 무료 PDF 병합 도구');
      return html;
    }

    return html;
  }

  const locales = ['hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const loc of locales) {
    if (!jsonData[loc]) continue;
    jsonData[loc].contentHtml = generateLocalizedHtml(loc);
  }

  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log(`✓ Updated ${slug}.json with contentHtml for all 9 locales.`);
}

console.log('Finished populating contentHtml.');
