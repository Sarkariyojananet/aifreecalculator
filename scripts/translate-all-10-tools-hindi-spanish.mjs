import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

function updateToolHtml(slug, hiHtml, esHtml) {
  const filePath = path.join(dataDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (data.hi) data.hi.contentHtml = hiHtml;
  if (data.es) data.es.contentHtml = esHtml;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✓ ${slug}.json contentHtml fully translated for Hindi and Spanish.`);
}

// 1. IMAGE COMPRESSOR
const icHi = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/60 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/70 dark:text-blue-300">
        <span class="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        100% सुरक्षित और स्थानीय कंप्रेशन
      </div>
      <h2 class="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        मुफ्त ऑनलाइन इमेज कंप्रेसर (Free Image Compressor Online)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        हमारे मुफ्त <strong>ऑनलाइन इमेज कंप्रेसर</strong> में आपका स्वागत है, जिसे आपकी फोटो की गुणवत्ता बनाए रखते हुए फाइल साइज (KB/MB) को तेजी से, सुरक्षित रूप से और बिना किसी वॉटरमार्क के कम करने के लिए बनाया गया है। अन्य पारंपरिक कन्वर्टर्स के विपरीत जो आपकी निजी तस्वीरों को सर्वर पर भेजते हैं, हमारा टूल 100% आपके ब्राउज़र में ही काम करता है।
      </p>
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🔒</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">सर्वर पर कोई अपलोड नहीं</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">फोटो आपके डिवाइस पर सुरक्षित रहती है</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">⚡</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">अल्ट्रा-फास्ट स्पीड</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">एक सेकंड से कम समय में प्रोसेसिंग</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🎯</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">सटीक KB चयन</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">20KB, 50KB, 100KB, 200KB प्रीसेट</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">💎</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">आजीवन 100% मुफ्त</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">बिना लॉगिन, बिना वॉटरमार्क</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">लोकप्रिय फाइल साइज आवश्यकताएं</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        प्रमुख फाइल साइज सीमाएं (20KB, 50KB, 100KB, 200KB)
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
        सरकारी नौकरियों, विश्वविद्यालयों और ऑनलाइन फॉर्मों में सख्त फाइल साइज सीमाएं होती हैं। जानें कि कैसे हमारा टूल हर जरूरत को पूरा करता है:
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="rounded-3xl border border-amber-200/80 bg-linear-to-b from-amber-50/40 via-white to-white p-6 shadow-xs dark:border-amber-900/50 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">✍️ फोटो को 20KB में कंप्रेस करें</h3>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          सरकारी फॉर्मों, सिविल सेवा और प्रतियोगी परीक्षाओं में हस्ताक्षर और अंगूठे के निशान अपलोड करने के लिए 20KB की सीमा अनिवार्य होती है।
        </p>
        <div class="mt-3 text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-slate-800 p-3 rounded-xl border border-amber-200">
          <strong>उपयुक्त:</strong> डिजिटल हस्ताक्षर, अंगूठे का निशान, परीक्षा फॉर्म।
        </div>
      </div>
      <div class="rounded-3xl border border-blue-200/80 bg-linear-to-b from-blue-50/40 via-white to-white p-6 shadow-xs dark:border-blue-900/50 dark:from-blue-950/20 dark:via-slate-900 dark:to-slate-900">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">📸 फोटो को 50KB में कंप्रेस करें</h3>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          पासपोर्ट फोटो, वीजा आवेदन और कॉलेज प्रवेश के लिए 50KB की सीमा सबसे सामान्य अंतरराष्ट्रीय मानक है।
        </p>
        <div class="mt-3 text-xs text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-slate-800 p-3 rounded-xl border border-blue-200">
          <strong>उपयुक्त:</strong> पासपोर्ट फोटो, ड्राइविंग लाइसेंस, छात्र पहचान पत्र।
        </div>
      </div>
      <div class="rounded-3xl border border-indigo-200/80 bg-linear-to-b from-indigo-50/40 via-white to-white p-6 shadow-xs dark:border-indigo-900/50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">📄 फोटो को 100KB में कंप्रेस करें</h3>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          जॉब पोर्टल, सीवी और मार्कशीट अपलोड के लिए 100KB का साइज सबसे उत्तम माना जाता है ताकि दस्तावेज एकदम स्पष्ट पढ़े जा सकें।
        </p>
        <div class="mt-3 text-xs text-indigo-900 dark:text-indigo-200 bg-indigo-50 dark:bg-slate-800 p-3 rounded-xl border border-indigo-200">
          <strong>उपयुक्त:</strong> मार्कशीट, डिग्री प्रमाण पत्र, पैन कार्ड व आधार कार्ड स्कैन।
        </div>
      </div>
      <div class="rounded-3xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/40 via-white to-white p-6 shadow-xs dark:border-emerald-900/50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">🖼️ फोटो को 200KB में कंप्रेस करें</h3>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          वेबसाइट बैनर, ब्लॉग पोस्ट और ई-कॉमर्स उत्पादों के लिए 200KB का साइज आदर्श संतुलन प्रदान करता है।
        </p>
        <div class="mt-3 text-xs text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-slate-800 p-3 rounded-xl border border-emerald-200">
          <strong>उपयुक्त:</strong> वेबसाइट बैनर, ऑनलाइन स्टोर उत्पाद, सोशल मीडिया कवर।
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">आसान कार्यप्रणाली</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        इमेज को कैसे कंप्रेस करें (5 आसान चरण)
      </h2>
    </div>
    <div class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">1. अपनी फोटो चुनें:</strong> फोटो को ड्रैग-एंड-ड्रॉप करें या फाइल चुनें पर क्लिक करें। (JPG, PNG, WebP समर्थित)
      </div>
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">2. लक्षित साइज चुनें:</strong> 20KB, 50KB, 100KB, 200KB में से चुनें या अपना मनपसंद साइज दर्ज करें।
      </div>
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">3. ऑटोमैटिक प्रोसेसिंग:</strong> टूल आपके ब्राउज़र में ही बाइनरी सर्च द्वारा साइज और क्वालिटी को बैलेंस करता है।
      </div>
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">4. पूर्वावलोकन देखें:</strong> मूल साइज और कंप्रेस होने के बाद के साइज की तुलना करें।
      </div>
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">5. तुरंत डाउनलोड करें:</strong> 'Download Compressed Image' पर क्लिक करके फोटो अपने डिवाइस में सुरक्षित करें।
      </div>
    </div>
  </section>
</div>`;

const icEs = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/60 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/70 dark:text-blue-300">
        <span class="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        Motor 100% Local y Privado
      </div>
      <h2 class="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Compresor de Imágenes Online Gratis
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        Bienvenido a nuestro <strong>compresor de imágenes online gratis</strong>, diseñado para reducir el peso en KB de tus fotos de forma rápida, segura y sin marcas de agua ni límites de uso. A diferencia de otros conversores que envían tus fotos privadas a servidores externos, nuestra herramienta funciona 100% en tu propio navegador.
      </p>
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🔒</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Sin Subida a Servidores</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Tus fotos no salen de tu equipo</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">⚡</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Velocidad Instantánea</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Compresión en menos de un segundo</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🎯</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Precisión en KB</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Ajustes a 20KB, 50KB, 100KB, 200KB</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">💎</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">100% Gratis Siempre</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Sin registro ni publicidad invasiva</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Límites de Peso Más Solicitados</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Límites de Tamaño Habituales (20KB, 50KB, 100KB, 200KB)
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
        Las convocatorias de empleo público, trámites oficiales y portales universitarios exigen límites estrictos de tamaño. Selecciona el umbral adecuado para tu caso:
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="rounded-3xl border border-amber-200/80 bg-linear-to-b from-amber-50/40 via-white to-white p-6 shadow-xs dark:border-amber-900/50 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">✍️ Comprimir Imagen a 20KB</h3>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Requisito típico para firmas electrónicas digitalizadas y huellas dactilares en convocatorias oficiales y formularios administrativos.
        </p>
        <div class="mt-3 text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-slate-800 p-3 rounded-xl border border-amber-200">
          <strong>Ideal para:</strong> Firmas digitales y miniaturas de identificación.
        </div>
      </div>
      <div class="rounded-3xl border border-blue-200/80 bg-linear-to-b from-blue-50/40 via-white to-white p-6 shadow-xs dark:border-blue-900/50 dark:from-blue-950/20 dark:via-slate-900 dark:to-slate-900">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">📸 Comprimir Imagen a 50KB</h3>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          El estándar internacional por excelencia para fotos de pasaporte, renovación de DNI, visados y credenciales de empresa.
        </p>
        <div class="mt-3 text-xs text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-slate-800 p-3 rounded-xl border border-blue-200">
          <strong>Ideal para:</strong> Fotos de pasaporte, visados y carnets de estudiante.
        </div>
      </div>
      <div class="rounded-3xl border border-indigo-200/80 bg-linear-to-b from-indigo-50/40 via-white to-white p-6 shadow-xs dark:border-indigo-900/50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">📄 Comprimir Imagen a 100KB</h3>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Utilizado habitualmente para subir títulos académicos, certificados escaneados y adjuntos de currículum sin rechazos en portales de empleo.
        </p>
        <div class="mt-3 text-xs text-indigo-900 dark:text-indigo-200 bg-indigo-50 dark:bg-slate-800 p-3 rounded-xl border border-indigo-200">
          <strong>Ideal para:</strong> Diplomas, certificados de notas y recibos escaneados.
        </div>
      </div>
      <div class="rounded-3xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/40 via-white to-white p-6 shadow-xs dark:border-emerald-900/50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white">🖼️ Comprimir Imagen a 200KB</h3>
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          El punto de equilibrio perfecto para blogs, tiendas de comercio electrónico y banners web con carga móvil ultrarrápida.
        </p>
        <div class="mt-3 text-xs text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-slate-800 p-3 rounded-xl border border-emerald-200">
          <strong>Ideal para:</strong> Tiendas online, artículos de blog y catálogos digitales.
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Paso a Paso</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Cómo Comprimir una Imagen en 5 Pasos
      </h2>
    </div>
    <div class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">1. Elige tu imagen:</strong> Arrastra tu fotografía o pulsa para explorar archivos (JPG, PNG, WebP).
      </div>
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">2. Selecciona el tamaño objetivo:</strong> Pulsa sobre 20KB, 50KB, 100KB o introduce un valor personalizado.
      </div>
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">3. Optimización automática:</strong> El motor ajusta de forma imperceptible la cuantificación de color en tu navegador.
      </div>
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">4. Compara el resultado:</strong> Visualiza antes y después con el porcentaje exacto de espacio ahorrado.
      </div>
      <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <strong class="text-slate-900 dark:text-white">5. Descarga de inmediato:</strong> Haz clic en 'Descargar Imagen Comprimida' y guárdala sin esperas.
      </div>
    </div>
  </section>
</div>`;

updateToolHtml('image-compressor', icHi, icEs);

// 2. WORD COUNTER
const wcHi = `
<section class="word-counter-content space-y-6">
  <h2>वर्ड काउंटर (Word Counter) - शब्दों और अक्षरों की सटीक ऑनलाइन गिनती</h2>
  <p>हमारा <strong>वर्ड काउंटर टूल</strong> लेखकों, छात्रों, ब्लॉगर्स और डिजिटल मार्केटर्स के लिए बनाया गया है। यह टूल आपके टेक्स्ट के शब्दों, अक्षरों (स्पेस के साथ और बिना स्पेस), वाक्यों, पैराग्राफ और अनुमानित पढ़ने के समय का रियल-टाइम में सटीक विश्लेषण प्रदान करता है।</p>

  <h2>वर्ड काउंटर क्या-क्या गिनता है?</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <h3 class="font-bold text-slate-900 dark:text-white text-base">📝 कुल शब्द (Words)</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">स्पेस और विराम चिह्नों द्वारा अलग किए गए शब्दों की कुल संख्या। निबंध और असाइनमेंट की सीमा जांचने के लिए आवश्यक।</p>
    </div>
    <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <h3 class="font-bold text-slate-900 dark:text-white text-base">🔤 कुल अक्षर (Characters)</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">स्पेस सहित और स्पेस रहित वर्णों की गिनती। ट्विटर/एक्स (280 अक्षर) और मेटा डिस्क्रिप्शन (160 अक्षर) के लिए उपयोगी।</p>
    </div>
    <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <h3 class="font-bold text-slate-900 dark:text-white text-base">⏱️ अनुमानित पढ़ने का समय (Reading Time)</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">औसत पाठक की गति (200-250 शब्द प्रति मिनट) के आधार पर आपके लेख को पढ़ने में लगने वाला कुल समय।</p>
    </div>
    <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <h3 class="font-bold text-slate-900 dark:text-white text-base">🎙️ बोलने का समय (Speaking Time)</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">भाषण, पॉडकास्ट या यूट्यूब स्क्रिप्ट के लिए 130-150 शब्द प्रति मिनट की वाक् दर पर आधारित गणना।</p>
    </div>
  </div>

  <h2>सोशल मीडिया और ब्लॉग के लिए आदर्श शब्द सीमा</h2>
  <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
    <li><strong>Twitter / X:</strong> अधिकतम 280 अक्षर।</li>
    <li><strong>LinkedIn पोस्ट:</strong> 1,000 से 2,000 अक्षर सबसे प्रभावी जुड़ाव देते हैं।</li>
    <li><strong>Instagram कैप्शन:</strong> अधिकतम 2,200 अक्षर (पहले 125 अक्षर सबसे महत्वपूर्ण)।</li>
    <li><strong>SEO ब्लॉग पोस्ट:</strong> सर्च इंजन रैंकिंग के लिए 1,500 से 2,500 शब्द सबसे उपयुक्त माने जाते हैं।</li>
  </ul>
</section>`;

const wcEs = `
<section class="word-counter-content space-y-6">
  <h2>Contador de Palabras Online - Métricas Precisas de Redacción</h2>
  <p>Nuestra <strong>calculadora y contador de palabras online</strong> proporciona a redactores, estudiantes y profesionales métricas en tiempo real sobre la longitud, ritmo y composición de sus textos.</p>

  <h2>¿Qué Parámetros Analiza este Contador de Palabras?</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <h3 class="font-bold text-slate-900 dark:text-white text-base">📝 Palabras Totales</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Cálculo de vocablos delimitados por espacios y signos de puntuación, fundamental para trabajos académicos y artículos de prensa.</p>
    </div>
    <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <h3 class="font-bold text-slate-900 dark:text-white text-base">🔤 Caracteres con y sin Espacios</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Conteo total de pulsaciones para ajustar publicaciones a límites estrictos como los 280 caracteres de X/Twitter o meta descripciones SEO.</p>
    </div>
    <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <h3 class="font-bold text-slate-900 dark:text-white text-base">⏱️ Tiempo Estimado de Lectura</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Calculado en base al ritmo medio de lectura silenciosa adulta (200 a 250 palabras por minuto).</p>
    </div>
    <div class="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <h3 class="font-bold text-slate-900 dark:text-white text-base">🎙️ Tiempo de Locución / Discurso</h3>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1">Proyección para discursos en público, guiones de YouTube y locuciones de podcast (130-150 palabras/minuto).</p>
    </div>
  </div>

  <h2>Límites Recomendados para Redes Sociales y SEO</h2>
  <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
    <li><strong>X / Twitter:</strong> Límite estricto de 280 caracteres.</li>
    <li><strong>LinkedIn:</strong> Entre 1.000 y 2.000 caracteres para publicaciones profesionales de alto impacto.</li>
    <li><strong>Instagram:</strong> Hasta 2.200 caracteres de pie de foto (los primeros 125 son clave antes del corte).</li>
    <li><strong>Artículos de Blog (SEO):</strong> Artículos extensos de 1.500 a 2.500 palabras para posicionamiento orgánico competitivo.</li>
  </ul>
</section>`;

updateToolHtml('word-counter', wcHi, wcEs);

// 3. QR CODE GENERATOR
const qrHi = `
<section class="qr-content space-y-6">
  <h2>मुफ्त QR कोड जनरेटर (Free QR Code Generator)</h2>
  <p>हमारा <strong>QR कोड जनरेटर</strong> किसी भी वेबसाइट URL, टेक्स्ट, वाई-फाई नेटवर्क, ईमेल या संपर्क विवरण (vCard) को तुरंत उच्च-गुणवत्ता वाले दो-आयामी बारकोड में बदलता है।</p>

  <h2>स्थायी स्टेटिक QR कोड बनाम एक्सपायर होने वाले कोड</h2>
  <p>अन्य वेबसाइटों के विपरीत जो कुछ हफ्तों बाद पैसे मांगती हैं या लिंक एक्सपायर कर देती हैं, हमारा टूल 100% <strong>स्थायी स्टेटिक QR कोड</strong> बनाता है। कोड में डेटा सीधे एम्बेड होता है, इसलिए यह आजीवन बिना किसी रुकावट के काम करता है।</p>

  <h2>बल्क QR कोड जनरेटर (Bulk QR Code Generation)</h2>
  <p>रेस्टोरेंट मेनू, इवेंट टिकट, वेयरहाउस लेबल या इन्वेंट्री ट्रैकिंग के लिए दर्जनों या सैकड़ों QR कोड एक साथ बनाएं। 'Bulk Generator' में अपनी लिंक सूची चिपकाएं और एक क्लिक में सभी कोड डाउनलोड करें।</p>

  <h2>प्रिंट और स्कैनिंग के लिए सर्वोत्तम सुझाव</h2>
  <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
    <li><strong>रंग का कंट्रास्ट:</strong> हमेशा गहरे रंग के मॉड्यूल (जैसे काला या गहरा नीला) और हल्के पृष्ठभूमि (सफेद) का उपयोग करें।</li>
    <li><strong>न्यूनतम प्रिंट साइज:</strong> विजिटिंग कार्ड के लिए कम से कम 2 सेमी × 2 सेमी का साइज रखें। बड़े होर्डिंग और बैनर के लिए दूरी के अनुपात में साइज बढ़ाएं।</li>
    <li><strong>वेक्टर SVG फॉर्मेट:</strong> बड़े विज्ञापनों और फ्लेक्स प्रिंटिंग के लिए हमेशा SVG फॉर्मेट डाउनलोड करें ताकि पिक्सल न फटें।</li>
  </ul>
</section>`;

const qrEs = `
<section class="qr-content space-y-6">
  <h2>Generador de Códigos QR Gratis para Enlaces, Wi-Fi y Textos</h2>
  <p>Nuestro <strong>generador de códigos QR online</strong> convierte al instante direcciones web, redes Wi-Fi, tarjetas de contacto vCard, correos y textos planos en códigos de barras bidimensionales de alta resolución.</p>

  <h2>Códigos QR Estáticos Permanentes: Sin Caducidad ni Pagos Ocultos</h2>
  <p>A diferencia de servicios comerciales que bloquean tus enlaces tras unos días exigiendo suscripciones mensuales, nuestro generador crea <strong>códigos QR 100% estáticos</strong>. La información está grabada directamente en la cuadrícula de módulos, garantizando funcionamiento indefinido y sin intermediarios.</p>

  <h2>Generador de Códigos QR por Lotes (Bulk)</h2>
  <p>Crea decenas o cientos de códigos simultáneamente para cartas de restaurante con número de mesa, acreditaciones de eventos o control de inventario. Pega tu lista de enlaces y descárgalos todos con un solo clic.</p>

  <h2>Recomendaciones para una Impresión y Escaneo Óptimos</h2>
  <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
    <li><strong>Alto contraste:</strong> Utiliza siempre módulos oscuros sobre fondos claros para facilitar la lectura óptica.</li>
    <li><strong>Dimensión mínima recomendada:</strong> Al menos 2 x 2 cm en tarjetas de visita; aumenta el tamaño proporcionalmente para carteles vistos a distancia.</li>
    <li><strong>Descarga en formato SVG vectorial:</strong> Ideal para imprentas profesionales sin pixelación ni pérdida de nitidez al escalar.</li>
  </ul>
</section>`;

updateToolHtml('qr-code-generator', qrHi, qrEs);

// 4. IMAGE RESIZER
const irHi = `
<section class="image-resizer-content space-y-6">
  <h2>ऑनलाइन इमेज रिसाइज़र (Online Image Resizer) - पिक्सेल, सेमी और KB में बदलें</h2>
  <p>हमारा <strong>ऑनलाइन इमेज रिसाइज़र</strong> आपको फोटो के आयामों (Dimensions) को पिक्सेल (px), सेंटीमीटर (cm), इंच (inch) में बदलने और विशिष्ट फाइल साइज (जैसे 50KB) में सेट करने की पूरी सुविधा देता है।</p>

  <h2>सेंटीमीटर (CM) और DPI में फोटो रिसाइज़ करें</h2>
  <p>पासपोर्ट, सरकारी नौकरियों और वीजा फॉर्मों में 3.5cm × 4.5cm जैसे विशिष्ट आयामों की आवश्यकता होती है। हमारा टूल प्रिंटिंग के लिए उपयुक्त 300 DPI और वेब के लिए 72 DPI के साथ सटीक सेंटीमीटर रूपांतरण करता है।</p>

  <h2>फोटो का साइज 50KB में कैसे बदलें?</h2>
  <p>'Target Size (KB)' मोड चुनें और 50 दर्ज करें। हमारा एल्गोरिथ्म फोटो की चौड़ाई, ऊंचाई और कंप्रेशन को संतुलित करके फाइल को 50KB की सीमा के भीतर तैयार कर देता है।</p>
</section>`;

const irEs = `
<section class="image-resizer-content space-y-6">
  <h2>Redimensionador de Imágenes Online en Píxeles, Centímetros y KB</h2>
  <p>Nuestra <strong>herramienta para redimensionar imágenes online</strong> permite ajustar las dimensiones en píxeles (px), centímetros (cm), pulgadas o comprimir al peso exacto deseado (por ejemplo, 50KB).</p>

  <h2>Cambio de Tamaño en Centímetros y Ajuste de DPI</h2>
  <p>Para trámites de pasaporte, visados y credenciales que exigen medidas concretas como 3,5 x 4,5 cm, nuestro conversor calcula los píxeles exactos en función de la resolución (300 DPI para impresión nítida o 72 DPI para web).</p>

  <h2>Cómo Redimensionar una Foto a 50KB</h2>
  <p>Activa el modo de tamaño objetivo en KB e introduce 50. El sistema adapta automáticamente compresión y escala manteniendo la nitidez facial y el encuadre natural.</p>
</section>`;

updateToolHtml('image-resizer', irHi, irEs);

// 5. JPG TO PNG
const j2pHi = `
<section class="jpg-to-png-content space-y-6">
  <h2>JPG से PNG कनवर्टर (JPG to PNG Converter Online)</h2>
  <p>हमारे <strong>JPG से PNG कनवर्टर</strong> के साथ अपनी तस्वीरों को बिना किसी गुणवत्ता हानि (Lossless) के पीएनजी फॉर्मेट में बदलें।</p>
  <h2>JPG को PNG में क्यों बदलें?</h2>
  <p>PNG फॉर्मेट पारदर्शी पृष्ठभूमि (Transparent Background) और बिना नुकसान वाली कंप्रेशन तकनीक का समर्थन करता है, जिससे लोगो, टेक्स्ट और ग्राफिक्स एकदम स्पष्ट रहते हैं।</p>
</section>`;

const j2pEs = `
<section class="jpg-to-png-content space-y-6">
  <h2>Conversor de JPG a PNG Online y Gratuito</h2>
  <p>Convierte tus fotografías JPG al formato PNG sin pérdida de fidelidad mediante compresión sin pérdidas (lossless).</p>
  <h2>¿Por Qué Conviene Convertir de JPG a PNG?</h2>
  <p>El formato PNG admite canal alfa transparente y preserva bordes afilados en textos, gráficos vectoriales y logotipos sin los artefactos de compresión del JPEG.</p>
</section>`;

updateToolHtml('jpg-to-png', j2pHi, j2pEs);

// 6. PNG TO JPG
const p2jHi = `
<section class="png-to-jpg-content space-y-6">
  <h2>PNG से JPG कनवर्टर (PNG to JPG Converter Online)</h2>
  <p>भारी PNG फाइलों को तुरंत हल्के और अनुकूलित JPG फॉर्मेट में बदलें, जिससे फाइल का साइज 50% से 80% तक कम हो जाता है।</p>
  <h2>पारदर्शिता (Transparency) का क्या होता है?</h2>
  <p>JPG फॉर्मेट पारदर्शिता को सपोर्ट नहीं करता, इसलिए पारदर्शी क्षेत्रों को स्वचालित रूप से साफ सफेद पृष्ठभूमि या आपकी पसंद के रंग से भर दिया जाता है।</p>
</section>`;

const p2jEs = `
<section class="png-to-jpg-content space-y-6">
  <h2>Conversor de PNG a JPG Online</h2>
  <p>Transforma archivos PNG pesados en formato JPG optimizado reduciendo el peso del archivo entre un 50% y un 80% para envíos rápidos por correo o web.</p>
  <h2>Gestión del Fondo Transparente</h2>
  <p>Dado que JPG no soporta canal alfa transparente, las áreas vacías se completan con un fondo blanco limpio o el color que selecciones.</p>
</section>`;

updateToolHtml('png-to-jpg', p2jHi, p2jEs);

// 7. JSON FORMATTER
const jfHi = `
<section class="json-formatter-content space-y-6">
  <h2>ऑनलाइन JSON फॉर्मेटर (JSON Formatter & Pretty Print)</h2>
  <p>अव्यवस्थित और एक पंक्ति वाले JSON कोड को सुंदर, स्पष्ट और 2 या 4 स्पेस के इंडेंटेशन के साथ व्यवस्थित करें।</p>
  <h2>प्रीटी प्रिंट बनाम मिनिफाई (Pretty Print vs Minify)</h2>
  <p>प्रीटी प्रिंट पढ़ने और डिबगिंग के लिए कोड को व्यवस्थित करता है, जबकि मिनिफाई नेटवर्क बैंडविड्थ बचाने के लिए सभी अतिरिक्त स्पेस हटा देता है।</p>
</section>`;

const jfEs = `
<section class="json-formatter-content space-y-6">
  <h2>Formateador de JSON Online (Pretty Print e Indentación)</h2>
  <p>Organiza estructuras complejas de datos JSON con sangría de 2 o 4 espacios para mejorar la legibilidad y facilitar la depuración.</p>
  <h2>Pretty Print frente a Minificación</h2>
  <p>Pretty Print añade saltos y tabulaciones para el desarrollo humano, mientras que la minificación descarta espacios innecesarios para optimizar transferencias de red.</p>
</section>`;

updateToolHtml('json-formatter', jfHi, jfEs);

// 8. JSON VALIDATOR
const jvHi = `
<section class="json-validator-content space-y-6">
  <h2>ऑनलाइन JSON वैलिडेटर (JSON Validator & Syntax Checker)</h2>
  <p>अपने JSON डेटा की RFC 8259 और ECMA-404 मानकों के अनुसार सिंटैक्स जांच करें और गलतियों को लाइन नंबर के साथ तुरंत पहचानें।</p>
  <h2>सामान्य JSON त्रुटियां</h2>
  <p>अंतिम कॉमा (Trailing Comma), सिंगल कोट्स का उपयोग या बंद न होने वाले ब्रैकेट जैसी सामान्य गलतियों को तुरंत ढूंढकर ठीक करें।</p>
</section>`;

const jvEs = `
<section class="json-validator-content space-y-6">
  <h2>Validador de JSON Online y Comprobador de Sintaxis RFC</h2>
  <p>Verifica si tus estructuras de datos cumplen con los estándares oficiales RFC 8259 e identifica la línea y columna exactas de cualquier error sintáctico.</p>
  <h2>Errores Frecuentes en JSON</h2>
  <p>Detecta comas finales sobrantes, uso indebido de comillas simples y llaves o corchetes sin cerrar.</p>
</section>`;

updateToolHtml('json-validator', jvHi, jvEs);

// 9. PASSWORD GENERATOR
const pgHi = `
<section class="password-generator-content space-y-6">
  <h2>सुरक्षित पासवर्ड जनरेटर (Random & Strong Password Generator)</h2>
  <p>Web Crypto API का उपयोग करके हैक-प्रूफ और मजबूत पासवर्ड बनाएं जिसमें बड़े-छोटे अक्षर, संख्याएं और विशेष प्रतीक शामिल हों।</p>
  <h2>मजबूत पासवर्ड क्यों जरूरी है?</h2>
  <p>14 से 16 अक्षरों का एक जटिल पासवर्ड ब्रूट-फोर्स और डिक्शनरी हमलों को विफल करता है और आपके डिजिटल खातों को सुरक्षित रखता है।</p>
</section>`;

const pgEs = `
<section class="password-generator-content space-y-6">
  <h2>Generador de Contraseñas Seguras y Aleatorias</h2>
  <p>Genera claves criptográficamente robustas mediante la API nativa Web Crypto del navegador, combinando mayúsculas, minúsculas, números y caracteres especiales.</p>
  <h2>Longitud Recomendada para Máxima Seguridad</h2>
  <p>Se aconseja una longitud mínima de 14 a 16 caracteres para resistir intentos computacionales modernos de fuerza bruta.</p>
</section>`;

updateToolHtml('password-generator', pgHi, pgEs);

// 10. PDF MERGE
const pmHi = `
<section class="pdf-merge-content space-y-6">
  <h2>ऑनलाइन PDF मर्ज टूल (Free PDF Merge Online)</h2>
  <p>एकाधिक PDF दस्तावेजों को एक ही फाइल में सुरक्षित रूप से जोड़ें। बिना किसी सॉफ्टवेयर इंस्टॉलेशन के अपने ब्राउज़र में ही फाइलों को क्रमबद्ध करें।</p>
  <h2>100% निजी और सुरक्षित</h2>
  <p>आपकी गोपनीय फाइलें किसी बाहरी सर्वर पर अपलोड नहीं होती हैं; पूरी प्रक्रिया आपके कंप्यूटर या मोबाइल के ब्राउज़र में स्थानीय रूप से संपन्न होती है।</p>
</section>`;

const pmEs = `
<section class="pdf-merge-content space-y-6">
  <h2>Unir Archivos PDF Online Gratis (PDF Merge)</h2>
  <p>Combina múltiples documentos PDF en un único archivo continuo de manera rápida, intuitiva y manteniendo intacta la resolución original.</p>
  <h2>Seguridad y Privacidad Garantizadas</h2>
  <p>Tus documentos confidenciales se procesan en la memoria local de tu navegador sin enviarse a servidores externos.</p>
</section>`;

updateToolHtml('pdf-merge', pmHi, pmEs);

console.log('\nAll 10 online tools successfully updated with complete Hindi and Spanish articles!');
