import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

// ============================================================================
// 1. QR CODE GENERATOR (8 FAQs)
// ============================================================================
function updateQrCodeGenerator() {
  const file = path.join(dataDir, 'qr-code-generator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "How do I create a free QR code?", answer: "Choose your desired content type (Website URL, Plain Text, Wi-Fi, Email, Phone, or vCard), enter your information, customize colors and error correction if desired, and download your high-resolution QR code as a PNG, SVG, or JPG image instantly." },
    { question: "Do QR codes generated here ever expire?", answer: "No. Our free QR code generator creates permanent static QR codes. The destination data is encoded directly into the pattern of black-and-white modules without any intermediary redirect server. They will continue to work indefinitely as long as your destination link or content remains active." },
    { question: "What is the difference between this tool, Adobe, and Canva QR code generators?", answer: "While Adobe and Canva offer QR code generators, they typically require user accounts, email sign-ups, or paid subscriptions for high-resolution vector exports, and they embed QR codes inside design suites rather than providing quick standalone files. Our free QR code generator requires no account, provides lossless SVG vector downloads, includes a bulk QR code generator, and processes everything 100% locally in your browser with zero tracking." },
    { question: "Can I generate bulk QR codes at once?", answer: "Yes. Switch to the 'Bulk QR Code Generator' tab, paste multiple URLs or text lines (one per line, or formatted as 'Label,Data'), and our tool will generate all QR codes simultaneously with individual PNG/SVG downloads and a batch download option." },
    { question: "How do I create a Wi-Fi QR code that connects automatically?", answer: "Select the 'Wi-Fi Network' tab, enter your network name (SSID), password, and security type (WPA/WPA2/WEP). When scanned with a smartphone camera, the device automatically prompts the user to join the Wi-Fi network without manually typing passwords." },
    { question: "Which download format should I choose: PNG, SVG, or JPG?", answer: "For web pages, social media, and digital screens, choose high-resolution PNG (512px or 1024px). For professional printing, signage, brochures, and commercial merchandise, choose SVG (Scalable Vector Graphics) because it scales to any dimension without pixelation or blurriness." },
    { question: "Can I add a custom logo or image in the center of my QR code?", answer: "Yes. In the design options, you can choose a preset icon (Link, Wi-Fi, Mail, Star) or upload your own company logo. When adding a center logo, we automatically increase error correction to High (Q or H) so the QR code remains 100% readable by all mobile scanners." },
    { question: "Are my QR codes and input data saved on any server?", answer: "No. All QR code generation takes place 100% client-side inside your browser using JavaScript and HTML5 Canvas. No URLs, Wi-Fi passwords, contact details, or generated images are ever uploaded to or stored on our servers." }
  ];

  const hiFaqs = [
    { question: "मुफ्त QR कोड कैसे बनाएं?", answer: "वेबसाइट URL, सामान्य टेक्स्ट, वाई-फाई, ईमेल या संपर्क विवरण चुनें, जानकारी दर्ज करें और PNG या SVG फॉर्मेट में तुरंत डाउनलोड करें।" },
    { question: "क्या यहाँ बनाए गए QR कोड कभी एक्सपायर होते हैं?", answer: "नहीं। यह टूल स्थायी स्टेटिक QR कोड बनाता है। इसमें कोई एक्सपायरी डेट नहीं होती और यह आजीवन सक्रिय रहता है।" },
    { question: "यह एडोब और कैनवा से कैसे अलग है?", answer: "यहाँ बिना किसी अकाउंट, सब्सक्रिप्शन या विज्ञापन के सीधे हाई-रेजोल्यूशन वेक्टर SVG और बल्क QR कोड मुफ्त में मिलते हैं।" },
    { question: "क्या एक साथ कई (Bulk) QR कोड बना सकते हैं?", answer: "हाँ। 'Bulk QR Code Generator' टैब में एक साथ कई लिंक या टेक्स्ट पेस्ट करें और एक क्लिक में सभी QR कोड तैयार करें।" },
    { question: "वाई-फाई QR कोड कैसे काम करता है?", answer: "वाई-फाई का नाम और पासवर्ड दर्ज करें। जब कोई इसे स्मार्टफोन से स्कैन करेगा, तो बिना पासवर्ड टाइप किए फोन सीधे वाई-फाई से कनेक्ट हो जाएगा।" },
    { question: "PNG, SVG या JPG में से कौन सा फॉर्मेट चुनें?", answer: "स्क्रीन व सोशल मीडिया के लिए PNG तथा प्रिंटिंग, बैनर और पोस्टर के लिए SVG (वेक्टर) फॉर्मेट सबसे अच्छा रहता है।" },
    { question: "क्या QR कोड के बीच में अपना लोगो जोड़ सकते हैं?", answer: "हाँ। आप अपनी कंपनी का लोगो या कोई भी आइकन बीच में जोड़ सकते हैं।" },
    { question: "क्या मेरा डेटा किसी सर्वर पर सुरक्षित होता है?", answer: "नहीं, सारी प्रोसेसिंग 100% आपके ब्राउज़र में होती है और कोई डेटा सर्वर पर स्टोर नहीं किया जाता।" }
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
  console.log('Updated qr-code-generator.json across all 9 languages (8 FAQs each).');
}

// ============================================================================
// 2. WORD COUNTER (11 FAQs)
// ============================================================================
function updateWordCounter() {
  const file = path.join(dataDir, 'word-counter.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "What is a word counter?", answer: "A word counter is a digital writing utility that analyzes entered text to calculate the exact number of words, characters, sentences, paragraphs, and reading duration in real time." },
    { question: "How does an online word counter work?", answer: "Our online word counter processes your text instantly within your browser using Unicode-aware text segmentation algorithms. As you type or paste content, it identifies word boundaries, sentence terminators, and paragraph line breaks without sending data to any external server." },
    { question: "Is this word counter free?", answer: "Yes, this word counter is 100% free to use with no account registration, trial limits, or hidden fees required." },
    { question: "How are words counted?", answer: "Words are counted based on standard linguistic word boundaries, separating sequences of letters, numbers, and symbols. The tool intelligently handles multiple consecutive spaces, tabs, line breaks, and hyphenated compound words without inflating counts." },
    { question: "Does the word counter count characters?", answer: "Yes. The tool simultaneously calculates total characters including spaces as well as characters excluding spaces." },
    { question: "Can I count characters without spaces?", answer: "Yes. The 'Characters (No Spaces)' metric strips out all whitespace characters (spaces, tabs, newlines) and counts only visible letters, digits, and punctuation marks, which is ideal for platforms with strict non-whitespace restrictions." },
    { question: "Does it count sentences and paragraphs?", answer: "Yes. Sentences are detected using standard sentence-ending punctuation (. ! ?), while paragraphs are calculated based on non-empty text blocks separated by line breaks." },
    { question: "How is reading time calculated?", answer: "Reading time is estimated using an average adult silent reading benchmark of approximately 200 to 250 words per minute (WPM). The result is clearly marked as an estimate since reading speed varies by subject matter and complexity." },
    { question: "How is speaking time calculated?", answer: "Speaking time is estimated based on an average presentation speaking pace of approximately 130 words per minute, helping public speakers and scriptwriters time their talks." },
    { question: "Can I use this tool for essays and assignments?", answer: "Absolutely. Students, researchers, and copywriters frequently use this tool to verify length requirements for college applications, academic essays, research abstracts, and journal submissions." },
    { question: "Is my text uploaded to a server?", answer: "No. All text parsing and counting happens 100% locally on your computer or mobile device. None of your writing is ever transmitted, logged, or stored on our servers." }
  ];

  const hiFaqs = [
    { question: "वर्ड काउंटर (Word Counter) क्या है?", answer: "वर्ड काउंटर एक डिजिटल टूल है जो किसी लेख में शब्दों, वर्णों (अक्षरों), वाक्यों, पैराग्राफ और पढ़ने के समय की तुरंत गणना करता है।" },
    { question: "यह ऑनलाइन कैसे काम करता है?", answer: "यह यूनिकोड-सक्षम एल्गोरिदम का उपयोग करके सीधे आपके ब्राउज़र में टेक्स्ट का विश्लेषण करता है।" },
    { question: "क्या यह वर्ड काउंटर पूरी तरह मुफ्त है?", answer: "हाँ, यह 100% मुफ्त है और बिना किसी सीमा या लॉगिन के इस्तेमाल किया जा सकता है।" },
    { question: "शब्दों की गिनती कैसे की जाती है?", answer: "यह रिक्त स्थान (स्पेस), विराम चिह्न और पैराग्राफ के आधार पर शब्दों को अलग करके सटीक गिनती करता है।" },
    { question: "क्या यह अक्षरों (Characters) की गिनती करता है?", answer: "हाँ, यह स्पेस सहित और स्पेस रहित अक्षरों की अलग-अलग गिनती दिखाता है।" },
    { question: "क्या बिना स्पेस के अक्षरों की गिनती संभव है?", answer: "हाँ, 'Characters (No Spaces)' विकल्प केवल दृश्य अक्षरों और अंकों को गिनता है।" },
    { question: "क्या यह वाक्यों और पैराग्राफों को भी गिनता है?", answer: "हाँ, पूर्ण विराम (. ! ?) के आधार पर वाक्यों और लाइन ब्रेक के आधार पर पैराग्राफों की गिनती की जाती है।" },
    { question: "पढ़ने के समय (Reading Time) की गणना कैसे होती है?", answer: "औसत वयस्क के पढ़ने की गति (लगभग 200-250 शब्द प्रति मिनट) के आधार पर समय का अनुमान लगाया जाता है।" },
    { question: "बोलने के समय (Speaking Time) का अनुमान कैसे लगता है?", answer: "भाषण या प्रस्तुति के लिए लगभग 130 शब्द प्रति मिनट की दर से समय निकाला जाता है।" },
    { question: "क्या इसे निबंध और असाइनमेंट के लिए इस्तेमाल कर सकते हैं?", answer: "हाँ, छात्र और लेखक अपने निबंधों और शोध पत्रों की शब्द सीमा जांचने के लिए इसका व्यापक उपयोग करते हैं।" },
    { question: "क्या मेरा टेक्स्ट कहीं स्टोर होता है?", answer: "नहीं, सारी गिनती 100% आपके डिवाइस में होती है और कोई भी टेक्स्ट सर्वर पर नहीं भेजा जाता।" }
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
  console.log('Updated word-counter.json across all 9 languages (11 FAQs each).');
}

// ============================================================================
// 3. JSON FORMATTER (10 FAQs)
// ============================================================================
function updateJsonFormatter() {
  const file = path.join(dataDir, 'json-formatter.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "What is a JSON formatter?", answer: "A JSON formatter is an online developer tool that parses raw, unformatted, or minified JavaScript Object Notation (JSON) data and restructures it with consistent indentation and line breaks, making complex nested objects and arrays easily readable." },
    { question: "How do I format JSON online?", answer: "Simply paste your raw JSON string into the input editor, choose your preferred indentation (2 spaces, 4 spaces, or tabs), and click 'Format JSON'. Your beautified JSON appears instantly in the output panel ready to copy or download." },
    { question: "Is this online JSON formatter free?", answer: "Yes. Our JSON formatter is 100% free with no registration, subscription fees, or usage restrictions." },
    { question: "How do I validate JSON?", answer: "Paste your code into the input panel and click 'Validate JSON'. The tool inspects syntax for missing commas, unquoted keys, trailing commas, and unclosed brackets, pinpointing the approximate line and column of any syntax errors." },
    { question: "Can I minify JSON?", answer: "Yes. Clicking the 'Minify JSON' button removes all unnecessary whitespace, indentations, and newlines to compress your payload for production API calls and storage optimization." },
    { question: "Does formatting JSON change the data?", answer: "No. Valid formatting only alters whitespace and line breaks for human readability. Key names, numeric values, string contents, boolean flags, and nested object hierarchies remain completely untouched." },
    { question: "What is the difference between JSON formatting and minifying?", answer: "JSON formatting expands code with line breaks and indentation to improve human readability during development and debugging. JSON minification compresses code into a single continuous string without whitespace to minimize network transmission latency." },
    { question: "Can this tool convert XML to JSON?", answer: "Yes. Switch to the 'XML to JSON' tab, paste your XML document, and click 'Convert to JSON'. The tool parses the XML DOM tree and converts tags, nested children, attributes, and text into standard JSON format." },
    { question: "What is an XML to JSON formatter?", answer: "An XML to JSON formatter is a converter utility that translates Extensible Markup Language (XML) elements into equivalent JavaScript Object Notation key-value pairs and arrays directly within your browser." },
    { question: "Is my JSON uploaded to a server?", answer: "No. All parsing, formatting, validation, and XML conversions execute 100% locally on your device using native browser JavaScript APIs. Your confidential payloads, API keys, and configurations are never transmitted to our servers." }
  ];

  const hiFaqs = [
    { question: "JSON फॉर्मेटर (JSON Formatter) क्या है?", answer: "JSON फॉर्मेटर एक ऐसा टूल है जो जटिल, अव्यवस्थित या मिनीफाइड JSON डेटा को सही इंडेंटेशन और स्पेसिंग देकर आसानी से पढ़ने योग्य बनाता है।" },
    { question: "ऑनलाइन JSON को कैसे फॉर्मेट करें?", answer: "अपने JSON कोड को इनपुट बॉक्स में पेस्ट करें, इंडेंटेशन (2 स्पेस, 4 स्पेस या टैब) चुनें और 'Format JSON' पर क्लिक करें।" },
    { question: "क्या यह टूल पूरी तरह मुफ्त है?", answer: "हाँ, यह 100% फ्री है और बिना किसी सीमा या शुल्क के उपलब्ध है।" },
    { question: "JSON को वैलिडेट (Validate) कैसे करें?", answer: "कोड पेस्ट करके 'Validate JSON' दबाएं। यह छूटे हुए कॉमा, बिना कोट्स की कीज और ब्रैकेट की गलतियों को रेखांकित करता है।" },
    { question: "क्या मैं JSON को मिनीफाई (Minify) कर सकता हूँ?", answer: "हाँ। 'Minify JSON' बटन पर क्लिक करके गैर-जरूरी स्पेस और लाइन ब्रेक हटाकर फाइल साइज छोटा किया जा सकता है।" },
    { question: "क्या फॉर्मेटिंग से डेटा बदल जाता है?", answer: "नहीं। फॉर्मेटिंग से केवल खाली जगह और लाइन ब्रेक बदलते हैं; वास्तविक डेटा बिल्कुल सुरक्षित रहता है।" },
    { question: "फॉर्मेटिंग और मिनीफाइंग में क्या अंतर है?", answer: "फॉर्मेटिंग पढ़ने में आसानी के लिए इंडेंटेशन जोड़ती है, जबकि मिनीफाइंग नेटवर्क स्पीड बढ़ाने के लिए सभी स्पेस हटा देती है।" },
    { question: "क्या यह XML को JSON में बदल सकता है?", answer: "हाँ। 'XML to JSON' टैब में जाकर XML पेस्ट करें और एक क्लिक में JSON डेटा प्राप्त करें।" },
    { question: "XML to JSON फॉर्मेटर क्या है?", answer: "यह XML डेटा को आधुनिक JSON फॉर्मेट के की-वैल्यू पेयर में बदलने वाला कनवर्टर है।" },
    { question: "क्या मेरा कोड सुरक्षित रहता है?", answer: "हाँ। सारी प्रोसेसिंग 100% आपके ब्राउज़र में होती है, कोई भी संवेदनशील डेटा या API कीज़ सर्वर पर नहीं भेजी जाती हैं।" }
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
  console.log('Updated json-formatter.json across all 9 languages (10 FAQs each).');
}

// ============================================================================
// 4. JSON VALIDATOR (10 FAQs)
// ============================================================================
function updateJsonValidator() {
  const file = path.join(dataDir, 'json-validator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "What is a JSON validator?", answer: "A JSON validator is a developer tool that analyzes structured text against the official RFC 8259 JSON grammar. It verifies that keys are enclosed in double quotes, delimiters like commas and colons are properly placed, brackets and braces are balanced, and data types (objects, arrays, strings, numbers, booleans, and null) are strictly valid." },
    { question: "How can I validate JSON online?", answer: "Paste or type your raw JSON into the input editor and click 'Validate JSON'. The browser's native parser evaluates the text immediately, outputting 'Valid JSON ✓' with data statistics if valid, or pinpointing the exact error, line number, and column number if invalid." },
    { question: "Is this JSON validator free?", answer: "Yes. Our JSON validator is 100% free with no usage limits, no credit card requirements, and no account registration needed." },
    { question: "How do I know if my JSON is valid?", answer: "When you click 'Validate JSON', a clear validation status card appears. If valid, you will see a green 'Valid JSON ✓' badge alongside the detected root type, character count, line count, and payload size. If invalid, a red 'Invalid JSON ✕' badge appears with the parser error message and line coordinates." },
    { question: "Why does my JSON have a syntax error?", answer: "Common causes of JSON syntax errors include missing or trailing commas, using single quotes instead of double quotes, unclosed curly braces or square brackets, unquoted object keys, or trailing comments (which standard JSON does not allow)." },
    { question: "Does JSON allow single quotes?", answer: "No. According to standard JSON specifications (ECMA-404 and RFC 8259), all strings and object keys must be enclosed in double quotes (\"). Single quotes ('') are not valid in standard JSON and will trigger a parsing error." },
    { question: "Are trailing commas allowed in JSON?", answer: "No. Unlike modern JavaScript or Python, standard JSON does not permit trailing commas after the last element in an array or the last property in an object. For example, {\"item\": 1,} is invalid." },
    { question: "Can this validator show where the error is?", answer: "Yes. Whenever your browser's native JSON engine reports a position or line/column offset, our validator computes the exact line and column numbers and highlights the problematic line so you can immediately locate and fix the mistake." },
    { question: "What is the difference between a JSON validator and JSON formatter?", answer: "A JSON validator inspects syntax to ensure text conforms strictly to JSON grammar rules and reports errors if parsing fails. A JSON formatter takes valid JSON and arranges it with customizable indentation and line breaks to make it human-readable." },
    { question: "Is my JSON uploaded to a server?", answer: "No. All JSON parsing, validation, formatting, and file generation happen entirely in your browser using client-side JavaScript. No data is ever transmitted, logged, or stored on external servers." }
  ];

  const hiFaqs = [
    { question: "JSON वैलिडेटर (JSON Validator) क्या है?", answer: "यह एक डेवलपर टूल है जो RFC 8259 मानकों के अनुसार JSON डेटा की संरचनात्मक शुद्धता और सिंटैक्स की जांच करता है।" },
    { question: "ऑनलाइन JSON को कैसे वैलिडेट करें?", answer: "अपना कोड पेस्ट करें और 'Validate JSON' पर क्लिक करें। सही होने पर 'Valid JSON ✓' का हरा बैज और गलत होने पर त्रुटि की लाइन संख्या दिखाई देगी।" },
    { question: "क्या यह वैलिडेटर मुफ्त है?", answer: "हाँ, यह 100% मुफ्त है और बिना किसी सीमा के काम करता है।" },
    { question: "मुझे कैसे पता चलेगा कि मेरा JSON सही है?", answer: "टूल तुरंत स्टेटस कार्ड दिखाता है जिसमें डेटा का प्रकार, कुल पंक्तियां, अक्षरों की संख्या और फाइल साइज का विवरण होता है।" },
    { question: "सिंटैक्स एरर क्यों आता है?", answer: "कॉमा छूट जाने, सिंगल कोट्स का उपयोग करने, ब्रैकेट बंद न करने या अंतिम कॉमा (Trailing Comma) लगाने से एरर आता है।" },
    { question: "क्या JSON में सिंगल कोट्स (' ') चल सकते हैं?", answer: "नहीं। मानक JSON नियमों के तहत सभी कीज और स्ट्रिंग्स को डबल कोट्स (\" \") में ही लिखा जाना अनिवार्य है।" },
    { question: "क्या अंतिम कॉमा (Trailing comma) मान्य है?", answer: "नहीं। ऐरे या ऑब्जेक्ट के आखिरी एलिमेंट के बाद कॉमा लगाना अवैध माना जाता है।" },
    { question: "क्या यह गलती की सटीक जगह दिखाता है?", answer: "हाँ। यह सिंटैक्स एरर की सटीक लाइन संख्या और कॉलम संख्या को हाईलाइट करता है।" },
    { question: "वैलिडेटर और फॉर्मेटर में क्या अंतर है?", answer: "वैलिडेटर सिंटैक्स की वैधता की जांच करता है, जबकि फॉर्मेटर वैध कोड को सुंदर और सुव्यवस्थित बनाता है।" },
    { question: "क्या मेरा डेटा सुरक्षित है?", answer: "हाँ। सारी जांच सीधे आपके ब्राउज़र में होती है और कोई डेटा सर्वर पर नहीं जाता।" }
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
  console.log('Updated json-validator.json across all 9 languages (10 FAQs each).');
}

// ============================================================================
// 5. PASSWORD GENERATOR (11 FAQs)
// ============================================================================
function updatePasswordGenerator() {
  const file = path.join(dataDir, 'password-generator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "What is a password generator?", answer: "A password generator is a tool that automatically creates a randomized sequence of characters for use as a password. Instead of relying on predictable words or patterns, it draws from chosen character sets to produce a password that is difficult to guess." },
    { question: "What is a random password generator?", answer: "A random password generator creates passwords using random character selection rather than dictionary words or personal information. When backed by cryptographic randomness — as this tool is — each character is selected using the browser's Web Crypto API, making the output statistically unpredictable." },
    { question: "How does a strong password generator work?", answer: "A strong password generator combines a large character pool (uppercase, lowercase, digits, symbols) with a sufficient length and cryptographically secure randomness. This tool lets you customize all three factors and shows an estimated strength indicator to help guide your choices." },
    { question: "Can I generate a 12-character password?", answer: "Yes. Click the '12' quick-select button or set the length slider to 12. The tool will immediately generate a 12-character password using your selected character types." },
    { question: "Can I generate a 15-character password?", answer: "Yes. Click the '15' quick-select button or drag the slider to 15. The generated password will be exactly 15 characters long." },
    { question: "Can I generate a 16-character password?", answer: "Yes. The default length is 16 characters, which offers a practical balance between security and usability. Click '16' or adjust the slider to get a 16-character password instantly." },
    { question: "Is this password generator free?", answer: "Yes. This password generator is completely free to use. There are no account requirements, no usage limits, and no subscription fees." },
    { question: "Are generated passwords stored anywhere?", answer: "No. Passwords are generated entirely inside your browser using JavaScript and the Web Crypto API. They are never written to cookies, localStorage, or any database. When you close the tab, the password disappears." },
    { question: "Are passwords sent to a server?", answer: "No. Generation happens 100% client-side. No network request containing your password is made by this tool. The server only delivers the static page assets." },
    { question: "What makes a password strong?", answer: "Several factors contribute to password strength: length (more characters means more possible combinations), character diversity (using uppercase, lowercase, digits, and symbols), unpredictability (true random generation rather than words or patterns), and uniqueness (a different password for every account)." },
    { question: "Should I use a different password for every account?", answer: "Yes. Using the same password across multiple sites means that a breach at one service exposes all your accounts. Consider storing unique passwords in a reputable password manager so you only need to remember one master password." }
  ];

  const hiFaqs = [
    { question: "पासवर्ड जनरेटर (Password Generator) क्या है?", answer: "यह एक सुरक्षा टूल है जो अक्षरों, अंकों और प्रतीकों को मिलाकर एक मजबूत और यादृच्छिक (Random) पासवर्ड तैयार करता है जिसे हैकर्स के लिए तोड़ना असंभव होता है।" },
    { question: "रैंडम पासवर्ड जनरेटर कैसे काम करता है?", answer: "यह वेब क्रिप्टो API (Web Crypto API) का उपयोग करके पूरी तरह से अप्रत्याशित और क्रिप्टोग्राफिक रूप से सुरक्षित वर्णों का चयन करता है।" },
    { question: "मजबूत पासवर्ड जनरेटर की क्या खूबी है?", answer: "यह बड़े अक्षर (A-Z), छोटे अक्षर (a-z), अंक (0-9) और विशेष चिह्न (!@#$) का संयोजन करता है।" },
    { question: "क्या मैं 12 अक्षरों का पासवर्ड बना सकता हूँ?", answer: "हाँ। '12' बटन पर क्लिक करें या स्लाइडर को 12 पर सेट करें।" },
    { question: "क्या 15 अक्षरों का पासवर्ड बनाया जा सकता है?", answer: "हाँ। '15' बटन दबाकर तुरंत 15 अक्षरों का पासवर्ड तैयार करें।" },
    { question: "क्या 16 अक्षरों का पासवर्ड बना सकते हैं?", answer: "हाँ। डिफ़ॉल्ट रूप से 16 अक्षरों का पासवर्ड चुना जाता है जो अधिकतम सुरक्षा प्रदान करता है।" },
    { question: "क्या यह पासवर्ड जनरेटर मुफ्त है?", answer: "हाँ, यह 100% निःशुल्क और असीमित उपयोग के लिए उपलब्ध है।" },
    { question: "क्या बनाए गए पासवर्ड कहीं स्टोर होते हैं?", answer: "बिल्कुल नहीं। पासवर्ड केवल आपके ब्राउज़र की अस्थायी मेमोरी में बनते हैं और टैब बंद करते ही हमेशा के लिए मिट जाते हैं।" },
    { question: "क्या पासवर्ड सर्वर पर भेजे जाते हैं?", answer: "नहीं, कोई भी नेटवर्क कॉल नहीं की जाती। पूरी प्रक्रिया 100% आपके डिवाइस में होती है।" },
    { question: "पासवर्ड को मजबूत क्या बनाता है?", answer: "लंबाई (कम से कम 12-16 अक्षर), वर्णों की विविधता (अक्षर, अंक, प्रतीक) और वास्तविक रैंडमनेस।" },
    { question: "क्या हर खाते के लिए अलग पासवर्ड होना चाहिए?", answer: "हाँ। एक ही पासवर्ड कई साइटों पर इस्तेमाल करने से एक साइट के हैक होने पर आपके सभी अकाउंट खतरे में पड़ जाते हैं।" }
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
  console.log('Updated password-generator.json across all 9 languages (11 FAQs each).');
}

// ============================================================================
// 6. PDF MERGE (10 FAQs)
// ============================================================================
function updatePdfMerge() {
  const file = path.join(dataDir, 'pdf-merge.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enFaqs = [
    { question: "What is a PDF Merge tool?", answer: "A PDF Merge tool combines two or more separate PDF files into a single PDF document. This tool does all of that processing directly in your browser — no file upload to a server is required." },
    { question: "Can I merge PDF files online?", answer: "Yes. This is a browser-based pdf merge online tool. Select your files, arrange their order, click Merge PDFs, and download the result. Everything runs client-side, so you do not need to upload your documents anywhere." },
    { question: "Is this PDF Merge tool free?", answer: "Yes. This pdf merge free utility is available to use at no cost and requires no account or subscription. You can merge PDFs directly from your browser without any registration." },
    { question: "Can I merge two PDF files into one?", answer: "Yes. Add two PDF files using the file picker or drag and drop, then click Merge PDFs. The tool will combine them into a single downloadable PDF document." },
    { question: "Can I change the order of PDF files before merging?", answer: "Yes. After adding your files, use the Move Up and Move Down buttons on each row to arrange them in the order you want. The final merged PDF will follow that order exactly." },
    { question: "Are my PDF files uploaded to a server?", answer: "No. Your PDF files are processed entirely within your browser using client-side JavaScript and the pdf-lib library. The files are read into your browser's memory only and are never transmitted to any server." },
    { question: "Can I merge large PDF files?", answer: "This tool can handle moderately large PDF files depending on the available memory in your browser and device. Very large files (for example, hundreds of megabytes combined) may slow down the merge process or trigger a browser memory warning. If that happens, try merging fewer files at a time." },
    { question: "Can I merge password-protected PDFs?", answer: "No. Password-protected or encrypted PDF files cannot be processed by this tool. The PDF library requires the full document to be accessible. Remove the password protection from your PDFs before attempting to merge them." },
    { question: "Does PDF merging reduce the quality of my documents?", answer: "No. This tool copies PDF pages directly without rasterizing or re-encoding the content. Text, vector graphics, and embedded images are preserved as they appear in the original documents." },
    { question: "Can I download the merged PDF?", answer: "Yes. After the merge completes, a Download Merged PDF button appears. Clicking it saves the combined PDF file directly to your device. No automatic download happens without your action." }
  ];

  const hiFaqs = [
    { question: "PDF मर्ज (PDF Merge) टूल क्या है?", answer: "यह एक ऑनलाइन टूल है जो दो या दो से अधिक अलग-अलग PDF फाइलों को जोड़कर एक संयुक्त PDF दस्तावेज बनाता है।" },
    { question: "क्या मैं ऑनलाइन PDF फाइलों को मर्ज कर सकता हूँ?", answer: "हाँ। फाइलें चुनें, उनका क्रम तय करें और 'Merge PDFs' पर क्लिक करके डाउनलोड करें। सारी प्रक्रिया सीधे आपके ब्राउज़र में होती है।" },
    { question: "क्या यह PDF मर्ज टूल मुफ्त है?", answer: "हाँ, यह 100% फ्री है और किसी लॉगिन या सदस्यता की आवश्यकता नहीं है।" },
    { question: "क्या दो PDF फाइलों को एक में जोड़ा जा सकता है?", answer: "हाँ, दो या उससे अधिक फाइलों को आसानी से जोड़कर एक फाइल बनाई जा सकती है।" },
    { question: "क्या मर्ज करने से पहले फाइलों का क्रम बदला जा सकता है?", answer: "हाँ, 'Move Up' और 'Move Down' बटनों से आप अपनी इच्छानुसार पेजों और फाइलों का क्रम व्यवस्थित कर सकते हैं।" },
    { question: "क्या मेरी PDF फाइलें सर्वर पर अपलोड होती हैं?", answer: "नहीं। pdf-lib लाइब्रेरी द्वारा पूरी प्रक्रिया 100% आपके डिवाइस की मेमोरी में स्थानीय रूप से पूरी होती है।" },
    { question: "क्या बड़ी PDF फाइलें जोड़ी जा सकती हैं?", answer: "हाँ, यह मध्यम और बड़ी फाइलों को आसानी से संभाल सकता है।" },
    { question: "क्या पासवर्ड से सुरक्षित PDF मर्ज हो सकती हैं?", answer: "नहीं, मर्ज करने से पहले आपको PDF से पासवर्ड हटाना होगा।" },
    { question: "क्या PDF की गुणवत्ता कम होती है?", answer: "नहीं, टेक्स्ट, वेक्टर ग्राफिक्स और फोटो की मूल गुणवत्ता 100% सुरक्षित रहती है।" },
    { question: "क्या मर्ज की गई PDF तुरंत डाउनलोड हो जाती है?", answer: "हाँ, 'Download Merged PDF' बटन पर क्लिक करके फाइल तुरंत सेव की जा सकती है।" }
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
  console.log('Updated pdf-merge.json across all 9 languages (10 FAQs each).');
}

updateQrCodeGenerator();
updateWordCounter();
updateJsonFormatter();
updateJsonValidator();
updatePasswordGenerator();
updatePdfMerge();
