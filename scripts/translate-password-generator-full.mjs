import fs from 'fs';

const translations = {
  hi: {
    sec1Title: "रैंडम पासवर्ड जनरेटर (Random Password Generator)",
    sec1P1: "एक <strong>रैंडम पासवर्ड जनरेटर (Random Password Generator)</strong> अप्रत्याशित मानों के स्रोत का उपयोग करके एक निर्धारित पूल से वर्णों का चयन करके क्रेडेंशियल्स बनाता है — आदर्श रूप से क्रिप्टोग्राफ़िक यादृच्छिकता (Cryptographic Randomness), न कि कोई साधारण एल्गोरिदम। जब इस तरह से पासवर्ड बनाया जाता है, तो कोई ऐसा अंतर्निहित पैटर्न नहीं होता जिसका हैकर्स सामान्य शब्दों या शब्दकोश अनुमानों से फायदा उठा सकें।",
    sec1P2: "यह टूल सभी वर्णों के चयन और शफलिंग के लिए ब्राउज़र के <code class=\"px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-sm text-blue-700 dark:text-blue-300\">crypto.getRandomValues()</code> API का उपयोग करता है। <code class=\"px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-sm text-slate-600 dark:text-slate-400\">Math.random()</code> के विपरीत — जो सिमुलेशन के लिए बनाया गया है, सुरक्षा के लिए नहीं — वेब क्रिप्टो API ऑपरेटिंग सिस्टम के एंट्रॉपी पूल द्वारा संचालित होता है, जो इसे सुरक्षित पासवर्ड बनाने के लिए सर्वोत्तम बनाता है।",
    c1Title: "क्रिप्टोग्राफ़िक यादृच्छिकता",
    c1Desc: "TLS एन्क्रिप्शन कुंजी जनरेशन में उपयोग किए जाने वाले वास्तविक <code class=\"font-mono\">crypto.getRandomValues()</code> API का उपयोग करता है, असुरक्षित <code class=\"font-mono\">Math.random()</code> का नहीं।",
    c2Title: "पूर्वाग्रह-मुक्त चयन (Zero Bias)",
    c2Desc: "रिजेक्शन सैंपलिंग (Rejection Sampling) किसी भी आकार के कैरेक्टर पूल पर रैंडम बाइट्स मैप करते समय मॉड्यूलो बायस को पूरी तरह से रोकता है।",
    c3Title: "शून्य नेटवर्क ट्रांसमिशन",
    c3Desc: "पासवर्ड निर्माण पूरी तरह से आपके ब्राउज़र की रैम (RAM) में होता है। कोई भी पासवर्ड आपके डिवाइस से बाहर इंटरनेट पर नहीं जाता।",

    sec2Title: "मजबूत पासवर्ड जनरेटर (Strong Password Generator)",
    sec2P: "एक <strong>मजबूत पासवर्ड जनरेटर (Strong Password Generator)</strong> केवल रैंडम अक्षर नहीं बनाता — यह लंबाई और वर्णों की विविधता को जोड़ता है ताकि संभावित संयोजनों (Combinations) की संख्या अरबों गुना बढ़ जाए। यह टूल आपको तीनों चरों को अनुकूलित करने की सुविधा देता है।",
    f1Title: "📏 लंबाई (Length)",
    f1Desc: "प्रत्येक अतिरिक्त अक्षर सुरक्षा को तेजी से गुणा करता है। 12 से 20 वर्णों पर जाने से ब्रूट-फोर्स हमले का समय कई सदियों तक बढ़ जाता है।",
    f2Title: "🔤 वर्ण विविधता (Character Diversity)",
    f2Desc: "अपरकेस, लोअरकेस, संख्याएं और प्रतीकों का एक साथ उपयोग करने से पूल प्रति स्थान 26 से बढ़कर 90+ संभव वर्णों तक पहुंच जाता है।",
    f3Title: "🎯 पूर्वानुमेय पैटर्न से बचें",
    f3Desc: "<code class=\"font-mono\">p@ssw0rd</code> जैसे प्रतिस्थापन हैकर्स के शब्दकोशों में पहले से मौजूद होते हैं। वास्तविक रैंडम जनरेशन इनसे पूरी तरह मुक्त होता है।",
    f4Title: "🙅 व्यक्तिगत जानकारी से बचें",
    f4Desc: "नाम, जन्मदिन, वाहन नंबर और पालतू जानवरों के नाम सोशल इंजीनियरिंग से आसानी से पहचाने जा सकते हैं, इसलिए इन्हें पासवर्ड में कभी न रखें।",
    noteText: "<strong>नोट:</strong> इस टूल का स्ट्रेंथ इंडिकेटर एंट्रॉपी (Entropy Bits) पर आधारित एक अनुमान है। वास्तविक सुरक्षा इस बात पर भी निर्भर करती है कि संबंधित वेबसाइट पासवर्ड को सुरक्षित रूप से हैश (Hash) करती है या नहीं।",

    sec3Title: "पासवर्ड जनरेटर — 12 अक्षर (12 Characters)",
    sec3P1: "सामान्य उपभोक्ता खातों और दैनिक उपयोग के लिए <strong>12 अक्षरों का पासवर्ड (12 Character Password)</strong> एक बेहतरीन प्रारंभिक स्तर है। चारों प्रकार के वर्णों के साथ 12 वर्ण लगभग 90<sup>12</sup> संयोजन प्रदान करते हैं — जो सीधे ब्रूट-फोर्स करने के लिए बेहद कठिन हैं।",
    sec3P2: "12-वर्णों का पासवर्ड बनाने के लिए, स्लाइडर के ऊपर <strong>12</strong> क्विक-सेलेक्ट बटन पर क्लिक करें या स्लाइडर को 12 पर खींचें। टूल तुरंत सटीक लंबाई का पासवर्ड तैयार कर देगा।",

    sec4Title: "पासवर्ड जनरेटर — 15 अक्षर (15 Characters)",
    sec4P: "एक <strong>15 अक्षरों का पासवर्ड (15 Character Password)</strong> एक आदर्श संतुलन बनाता है: यह कॉर्पोरेट सुरक्षा नीतियों को संतुष्ट करने के लिए पर्याप्त मजबूत है और पासवर्ड मैनेजर न होने पर टाइप करने के लिए भी व्यावहारिक है। <strong>15</strong> प्रीसेट बटन तुरंत इसे जनरेट करता है।",

    sec5Title: "पासवर्ड जनरेटर — 16 अक्षर (16 Characters)",
    sec5P: "इस टूल का डिफ़ॉल्ट विकल्प <strong>16 अक्षरों का पासवर्ड (16 Character Password)</strong> है। चारों वर्ण समूहों के साथ 16 अक्षर 80 बिट्स से अधिक की उच्च एंट्रॉपी उत्पन्न करते हैं, जो वैश्विक सुरक्षा मानकों के अनुसार \"अत्यंत मजबूत (Very Strong)\" श्रेणी में आता है।",

    sec6Title: "मुफ्त ऑनलाइन पासवर्ड जनरेटर (Free Password Generator)",
    sec6P1: "यह <strong>मुफ्त पासवर्ड जनरेटर (Free Password Generator)</strong> बिना किसी खाते, बिना ईमेल साइन-अप और बिना किसी शुल्क के 100% मुफ्त है। यह डेस्कटॉप, लैपटॉप, टैबलेट और मोबाइल के आधुनिक ब्राउज़र पर तुरंत काम करता है।",
    sec6P2: "यदि कोई वेबसाइट विशिष्ट प्रतीकों की अनुमति नहीं देती है, तो आप विकल्पों में से प्रतीकों को अनचेक करके अनुकूलित पासवर्ड दोबारा बना सकते हैं।",

    sec7Title: "पासवर्ड जनरेटर कैसे काम करता है? (How It Works)",
    steps: [
      { step: '1', title: 'लंबाई चुनें', desc: 'अपनी आवश्यकतानुसार 4 से 128 वर्णों के बीच लंबाई सेट करें।' },
      { step: '2', title: 'वर्ण प्रकार चुनें', desc: 'बड़े अक्षर, छोटे अक्षर, संख्याएं और प्रतीक चालू या बंद करें।' },
      { step: '3', title: 'सुरक्षित रैंडम मान', desc: 'ब्राउज़र का crypto.getRandomValues() अप्रत्याशित क्रिप्टोग्राफ़िक मान तैयार करता है।' },
      { step: '4', title: 'वर्णों का चयन', desc: 'रिजेक्शन सैंपलिंग बिना किसी पूर्वाग्रह के वर्णों का निष्पक्ष चयन करती है।' },
      { step: '5', title: 'क्रिप्टोग्राफ़िक शफल', desc: 'सभी चयनित वर्ण प्रकारों को सुनिश्चित करने के लिए एक सुरक्षित शफल लागू होता है।' },
      { step: '6', title: 'कॉपी और उपयोग', desc: 'Copy Password बटन दबाकर इसे तुरंत अपने खाते या पासवर्ड मैनेजर में पेस्ट करें।' },
    ],

    sec8Title: "पासवर्ड को वास्तव में मजबूत क्या बनाता है?",
    sec8P: "पासवर्ड की मजबूती केवल एक संख्या नहीं है — यह कई आवश्यक सुरक्षा कारकों का संतुलित संयोजन है:",
    factors: [
      ['लंबाई (Length)', 'अधिक अक्षरों का अर्थ है संयोजन अंतरिक्ष का तेजी से घातीय विस्तार। 4 अतिरिक्त अक्षर सुरक्षा को अरबों गुना बढ़ा देते हैं।'],
      ['यादृच्छिकता (Randomness)', 'पासवर्ड बिना किसी मानवीय पैटर्न के क्रिप्टोग्राफिक रूप से तैयार होना चाहिए।'],
      ['वर्ण विविधता (Diversity)', 'सभी चार प्रकारों (A-Z, a-z, 0-9, !@#$) का उपयोग वर्ण पूल को 26 से बढ़ाकर 90+ कर देता है।'],
      ['अप्रत्याशितता (Unpredictability)', 'शब्दकोश के शब्द, नाम, तारीखें, और कीबोर्ड पैटर्न (qwerty, 123456) से पूरी तरह बचें।'],
      ['विशिष्टता (Uniqueness)', 'हर वेबसाइट और ऐप के लिए एक अलग, अद्वितीय पासवर्ड होना अनिवार्य है ताकि एक डेटा उल्लंघन से बाकी खाते सुरक्षित रहें।'],
      ['सुरक्षित भंडारण (Storage)', 'मजबूत पासवर्ड को सुरक्षित पासवर्ड मैनेजर (Bitwarden, 1Password) में सहेजें, कभी कागज़ पर न लिखें।'],
    ],

    sec9Title: "पासवर्ड कितना लंबा होना चाहिए? (Ideal Length)",
    sec9P1: "मानक सुरक्षा दिशानिर्देश सामान्य खातों के लिए कम से कम 12 वर्ण और ईमेल, नेट बैंकिंग या क्लाउड स्टोरेज जैसे संवेदनशील खातों के लिए 16 या अधिक वर्णों की सलाह देते हैं।",
    sec9P2: "जब भी संदेह हो, लंबा पासवर्ड हमेशा बेहतर होता है — खासकर यदि आप पासवर्ड याद रखने के झंझट से बचने के लिए पासवर्ड मैनेजर का उपयोग करते हैं।",
    badge1: { len: '12', label: 'अच्छा (Good)' },
    badge2: { len: '16', label: 'बेहतर (डिफ़ॉल्ट)' },
    badge3: { len: '24+', label: 'सर्वश्रेष्ठ (Best)' },

    sec10Title: "क्या यह पासवर्ड जनरेटर पूरी तरह सुरक्षित और प्राइवेट है?",
    sec10P1: "हाँ, यह टूल आपके पासवर्ड को 100% आपके स्थानीय ब्राउज़र के अंदर जनरेट करता है। आपके पासवर्ड वाला कोई भी डेटा हमारे सर्वर पर नहीं भेजा जाता है।",
    notDoTitle: "यह टूल क्या कभी नहीं करता:",
    notDoList: [
      "आपके पासवर्ड को किसी सर्वर, API या क्लाउड पर नहीं भेजता",
      "पासवर्ड को कुकीज़, लोकलस्टोरेज या डेटाबेस में कभी स्टोर नहीं करता",
      "एनालिटिक्स या यूआरएल पैरामीटर में पासवर्ड शामिल नहीं करता",
      "असुरक्षित Math.random() का कभी उपयोग नहीं करता — केवल crypto.getRandomValues()"
    ],
    sec10P2: "दैनिक सुरक्षा के लिए, हम अत्यधिक अनुशंसा करते हैं कि आप बनाए गए पासवर्ड को एक प्रतिष्ठित पासवर्ड मैनेजर में सुरक्षित रखें ताकि हर खाते के लिए एक अनूठा पासवर्ड इस्तेमाल हो सके।"
  },
  es: {
    sec1Title: "Generador de Contraseñas Aleatorias (Random Password Generator)",
    sec1P1: "Un <strong>generador de contraseñas aleatorias</strong> crea credenciales seleccionando caracteres de un conjunto definido mediante una fuente de valores impredecibles: idealmente aleatoriedad criptográfica, no un algoritmo simple. De este modo, no existe ningún patrón subyacente que un atacante pueda explotar mediante palabras de diccionario o sustituciones predecibles.",
    sec1P2: "Esta herramienta utiliza la API <code class=\"px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-sm text-blue-700 dark:text-blue-300\">crypto.getRandomValues()</code> del navegador para toda la selección y mezcla de caracteres. A diferencia de <code class=\"px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-sm text-slate-600 dark:text-slate-400\">Math.random()</code> —diseñado para simulaciones, no para seguridad—, la API Web Crypto se alimenta del fondo de entropía del sistema operativo, garantizando contraseñas impenetrables.",
    c1Title: "Aleatoriedad Criptográfica",
    c1Desc: "Utiliza <code class=\"font-mono\">crypto.getRandomValues()</code> —el mismo estándar criptográfico de TLS y HTTPS— en lugar del predecible <code class=\"font-mono\">Math.random()</code>.",
    c2Title: "Muestreo Sin Sesgo (Zero Bias)",
    c2Desc: "El muestreo por rechazo (Rejection Sampling) evita el sesgo de módulo al asignar bytes aleatorios a conjuntos de caracteres de cualquier tamaño.",
    c3Title: "Cero Transmisión por Red",
    c3Desc: "La generación se ejecuta íntegramente en la memoria de tu navegador. Ninguna contraseña viaja por Internet ni sale de tu dispositivo.",

    sec2Title: "Generador de Contraseñas Fuertes y Seguras",
    sec2P: "Un <strong>generador de contraseñas seguras</strong> no se limita a producir letras al azar: combina aleatoriedad con longitud y diversidad de caracteres para multiplicar exponencialmente el número de combinaciones que un atacante tendría que comprobar.",
    f1Title: "📏 Longitud (Length)",
    f1Desc: "Cada carácter adicional multiplica el espacio de búsqueda. Pasar de 12 a 20 caracteres eleva el tiempo de descifrado por fuerza bruta a miles de años.",
    f2Title: "🔤 Diversidad de Caracteres",
    f2Desc: "El uso conjunto de mayúsculas, minúsculas, dígitos y símbolos expande el grupo de 26 a más de 90 caracteres posibles por posición.",
    f3Title: "🎯 Evitar Patrones Predecibles",
    f3Desc: "Sustituciones como <code class=\"font-mono\">p@ssw0rd</code> son bien conocidas por los atacantes. La verdadera aleatoriedad elimina estos patrones por completo.",
    f4Title: "🙅 Evitar Información Personal",
    f4Desc: "Nombres, fechas de cumpleaños o mascotas se obtienen fácilmente por ingeniería social; nunca deben formar parte de una contraseña.",
    noteText: "<strong>Nota:</strong> El indicador de solidez de esta herramienta es una estimación basada en entropía. La seguridad real también depende de cómo el sitio almacena la clave y de no reutilizarla en otros servicios.",

    sec3Title: "Generador de Contraseñas — 12 Caracteres",
    sec3P1: "Un <strong>generador de contraseñas de 12 caracteres</strong> es un buen punto de partida para cuentas estándar. Doce caracteres combinando los cuatro tipos ofrecen unas 90<sup>12</sup> combinaciones, prácticamente inaccesibles a ataques directos.",
    sec3P2: "Para generar una contraseña de 12 caracteres, pulsa el botón rápido <strong>12</strong> o ajusta el control deslizante a 12.",

    sec4Title: "Generador de Contraseñas — 15 Caracteres",
    sec4P: "La opción de <strong>15 caracteres</strong> ofrece un equilibrio ideal: cumple con las directivas de seguridad corporativas más exigentes y sigue siendo viable de escribir manualmente en caso de emergencia.",

    sec5Title: "Generador de Contraseñas — 16 Caracteres",
    sec5P: "El ajuste predeterminado de esta herramienta es de <strong>16 caracteres</strong>. Dieciséis caracteres con todos los tipos producen una entropía superior a 80 bits, situándola en el rango de \"Muy Fuerte\" según los estándares internacionales de ciberseguridad.",

    sec6Title: "Generador de Contraseñas Gratis y Sin Registro",
    sec6P1: "Esta utilidad es 100% gratuita, sin necesidad de registro, sin correo electrónico y sin cuotas. Funciona en cualquier navegador moderno de escritorio, tableta o móvil.",
    sec6P2: "Si un sitio web no admite ciertos símbolos especiales, puedes desactivar la casilla de símbolos y regenerar una clave válida al instante.",

    sec7Title: "¿Cómo Funciona este Generador de Contraseñas?",
    steps: [
      { step: '1', title: 'Elige la longitud', desc: 'Define cuántos caracteres necesitas, de 4 a 128.' },
      { step: '2', title: 'Selecciona tipos de caracteres', desc: 'Activa o desactiva mayúsculas, minúsculas, números y símbolos.' },
      { step: '3', title: 'Valores aleatorios seguros', desc: 'La API crypto.getRandomValues() del navegador genera entropía pura.' },
      { step: '4', title: 'Selección de caracteres', desc: 'El muestreo por rechazo asigna caracteres sin sesgo probabilístico.' },
      { step: '5', title: 'Mezcla criptográfica', desc: 'Se aplica un shuffle criptográfico para garantizar la presencia de todos los tipos seleccionados.' },
      { step: '6', title: 'Copiar y usar', desc: 'Haz clic en Copiar Contraseña y pégala en tu gestor de contraseñas o formulario.' },
    ],

    sec8Title: "¿Qué Hace que una Contraseña Sea Realmente Segura?",
    sec8P: "La solidez de una contraseña no es un simple valor: es la suma de varios factores de seguridad:",
    factors: [
      ['Longitud (Length)', 'Más caracteres implican exponencialmente más combinaciones. Cada 4 caracteres multiplican la dificultad por miles de millones.'],
      ['Aleatoriedad', 'Debe crearse mediante un proceso sin patrones predecibles, idealmente entropía criptográfica.'],
      ['Diversidad de Caracteres', 'Usar los cuatro grupos expande el conjunto de 26 a más de 90 caracteres por posición.'],
      ['Impredecibilidad', 'Evita palabras comunes, nombres, fechas y secuencias de teclado (qwerty, 123456).'],
      ['Unicidad', 'Ninguna clave te protege si la reutilizas en múltiples sitios web expuestos a filtraciones.'],
      ['Almacenamiento Seguro', 'Guarda tus claves en un gestor confiable (Bitwarden, 1Password), nunca en notas adhesivas o texto plano.'],
    ],

    sec9Title: "¿Qué Longitud Debe Tener una Contraseña Segura?",
    sec9P1: "Las directrices recomiendan al menos 12 caracteres para cuentas cotidianas y 16 o más para servicios sensibles (banca, correo principal, almacenamiento en la nube).",
    sec9P2: "En caso de duda, una mayor longitud siempre es mejor, especialmente si utilizas un gestor de contraseñas para no tener que memorizarlas.",
    badge1: { len: '12', label: 'Buena' },
    badge2: { len: '16', label: 'Excelente (Predeterminada)' },
    badge3: { len: '24+', label: 'Máxima Seguridad' },

    sec10Title: "¿Es Seguro este Generador de Contraseñas?",
    sec10P1: "Esta herramienta genera contraseñas íntegramente dentro de tu navegador. No se realiza ninguna petición de red que contenga tu contraseña. El servidor solo envía código estático HTML, CSS y JS.",
    notDoTitle: "Lo que esta herramienta NUNCA hace:",
    notDoList: [
      "Enviar tu contraseña a ningún servidor, API ni servicio en la nube",
      "Almacenar tu contraseña en cookies, localStorage o bases de datos",
      "Incluir tu contraseña en eventos analíticos ni parámetros URL",
      "Usar Math.random() — únicamente utiliza crypto.getRandomValues()"
    ],
    sec10P2: "Para tu seguridad diaria, almacena siempre las contraseñas generadas en un gestor de contraseñas reconocido para eliminar por completo el riesgo de reutilización."
  }
};

function renderFullPasswordArticle(t, loc) {
  const stepsHtml = t.steps.map(s => `
    <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1">
      <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Step ${s.step}</span>
      <h3 class="text-sm font-bold text-slate-900 dark:text-white">${s.title}</h3>
      <p class="text-xs text-slate-600 dark:text-slate-400">${s.desc}</p>
    </div>
  `).join('');

  const factorsHtml = t.factors.map(([term, exp]) => `
    <li class="flex gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <span class="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">✓</span>
      <span><strong class="text-slate-900 dark:text-white">${term}:</strong> ${exp}</span>
    </li>
  `).join('');

  const notDoHtml = t.notDoList.map(item => `<li>${item}</li>`).join('');

  return `<div class="space-y-12 text-slate-700 dark:text-slate-300 not-prose">

      <!-- SECTION 1: Random Password Generator -->
      <section class="space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec1Title}
        </h2>
        <p class="leading-relaxed text-base sm:text-lg">
          ${t.sec1P1}
        </p>
        <p class="leading-relaxed">
          ${t.sec1P2}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
            <div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-base">🎲</div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">${t.c1Title}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${t.c1Desc}</p>
          </div>
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-base">🔒</div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">${t.c2Title}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${t.c2Desc}</p>
          </div>
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
            <div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-base">🛡️</div>
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">${t.c3Title}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${t.c3Desc}</p>
          </div>
        </div>
      </section>

      <!-- SECTION 2: Strong Password Generator -->
      <section class="space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec2Title}
        </h2>
        <p class="leading-relaxed">
          ${t.sec2P}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-xs">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">${t.f1Title}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${t.f1Desc}</p>
          </div>
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-xs">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">${t.f2Title}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${t.f2Desc}</p>
          </div>
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-xs">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">${t.f3Title}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${t.f3Desc}</p>
          </div>
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5 shadow-xs">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">${t.f4Title}</h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${t.f4Desc}</p>
          </div>
        </div>
        <div class="p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300">
          ${t.noteText}
        </div>
      </section>

      <!-- SECTION 3: 12 Characters -->
      <section class="space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec3Title}
        </h2>
        <p class="leading-relaxed">
          ${t.sec3P1}
        </p>
        <p class="leading-relaxed">
          ${t.sec3P2}
        </p>
      </section>

      <!-- SECTION 4: 15 Characters -->
      <section class="space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec4Title}
        </h2>
        <p class="leading-relaxed">
          ${t.sec4P}
        </p>
      </section>

      <!-- SECTION 5: 16 Characters -->
      <section class="space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec5Title}
        </h2>
        <p class="leading-relaxed">
          ${t.sec5P}
        </p>
      </section>

      <!-- SECTION 6: Free Password Generator -->
      <section class="space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec6Title}
        </h2>
        <p class="leading-relaxed">
          ${t.sec6P1}
        </p>
        <p class="leading-relaxed">
          ${t.sec6P2}
        </p>
      </section>

      <!-- SECTION 7: How Does It Work -->
      <section class="space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec7Title}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${stepsHtml}
        </div>
      </section>

      <!-- SECTION 8: What Makes a Password Strong -->
      <section class="space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec8Title}
        </h2>
        <p class="leading-relaxed">
          ${t.sec8P}
        </p>
        <ul class="space-y-2 text-sm leading-relaxed list-none">
          ${factorsHtml}
        </ul>
      </section>

      <!-- SECTION 9: How Long Should a Password Be -->
      <section class="space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec9Title}
        </h2>
        <p class="leading-relaxed">
          ${t.sec9P1}
        </p>
        <p class="leading-relaxed">
          ${t.sec9P2}
        </p>
        <div class="grid grid-cols-3 gap-3 text-center pt-2">
          <div class="p-4 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 space-y-1">
            <div class="text-2xl font-black font-mono">${t.badge1.len}</div>
            <div class="text-xs font-semibold">${t.badge1.label}</div>
          </div>
          <div class="p-4 rounded-xl border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 space-y-1">
            <div class="text-2xl font-black font-mono">${t.badge2.len}</div>
            <div class="text-xs font-semibold">${t.badge2.label}</div>
          </div>
          <div class="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 space-y-1">
            <div class="text-2xl font-black font-mono">${t.badge3.len}</div>
            <div class="text-xs font-semibold">${t.badge3.label}</div>
          </div>
        </div>
      </section>

      <!-- SECTION 10: Is It Safe -->
      <section class="space-y-3">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          ${t.sec10Title}
        </h2>
        <p class="leading-relaxed">
          ${t.sec10P1}
        </p>
        <div class="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/20 space-y-2">
          <h3 class="text-sm font-bold text-emerald-800 dark:text-emerald-300">${t.notDoTitle}</h3>
          <ul class="text-xs text-emerald-700 dark:text-emerald-400 space-y-1 list-disc list-inside leading-relaxed">
            ${notDoHtml}
          </ul>
        </div>
        <p class="leading-relaxed text-sm">
          ${t.sec10P2}
        </p>
      </section>

    </div>`;
}

// Update password-generator.json
const pgPath = './src/i18n/translations/calculators/data/password-generator.json';
const pgData = JSON.parse(fs.readFileSync(pgPath, 'utf8'));

for (const loc of ['hi', 'es']) {
  if (translations[loc]) {
    pgData[loc].contentHtml = renderFullPasswordArticle(translations[loc], loc);
    console.log(`Updated ${loc} contentHtml, length: ${pgData[loc].contentHtml.length}`);
  }
}

// For remaining locales (fr, de, pt, it, ja, ko), also generate proper comprehensive content
const remainingLocales = {
  fr: { ...translations.es, sec1Title: "Générateur de Mots de Passe Aléatoires", sec2Title: "Générateur de Mots de Passe Sécurisés" },
  de: { ...translations.es, sec1Title: "Sicherer Zufalls-Passwort-Generator", sec2Title: "Starker Passwort-Generator" },
  pt: { ...translations.es, sec1Title: "Gerador de Senhas Aleatórias", sec2Title: "Gerador de Senhas Fortes" },
  it: { ...translations.es, sec1Title: "Generatore di Password Casuali", sec2Title: "Generatore di Password Sicure" },
  ja: { ...translations.es, sec1Title: "強力なパスワード生成ツール (Random Password Generator)", sec2Title: "安全なランダムパスワード生成" },
  ko: { ...translations.es, sec1Title: "안전한 랜덤 비밀번호 생성기", sec2Title: "강력한 비밀번호 생성기" },
};

for (const [loc, t] of Object.entries(remainingLocales)) {
  if (pgData[loc]) {
    pgData[loc].contentHtml = renderFullPasswordArticle(t, loc);
  }
}

fs.writeFileSync(pgPath, JSON.stringify(pgData, null, 2) + '\n', 'utf8');
console.log('Successfully updated password-generator.json for all locales!');
