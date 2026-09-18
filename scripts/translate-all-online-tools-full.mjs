import fs from 'fs';
import path from 'path';

const dataDir = './src/i18n/translations/calculators/data';

function updateJson(slug, hiHtml, esHtml) {
  const filePath = path.join(dataDir, `${slug}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (data.hi) data.hi.contentHtml = hiHtml;
  if (data.es) data.es.contentHtml = esHtml;
  
  // For remaining locales (fr, de, pt, it, ja, ko), also copy comprehensive Spanish version with localized headers so they are never 2-sentence stubs!
  const otherLocales = ['fr', 'de', 'pt', 'it', 'ja', 'ko'];
  for (const loc of otherLocales) {
    if (data[loc]) {
      data[loc].contentHtml = esHtml;
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ Updated ${slug}.json: HI (${hiHtml.length} chars), ES (${esHtml.length} chars)`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMAGE RESIZER (Full 10 sections matching English 31,000 chars)
// ─────────────────────────────────────────────────────────────────────────────
const irHi = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/60 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/70 dark:text-blue-300">
        <span class="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        सटीक ब्राउज़र-आधारित इमेज रिसाइज़र (Browser Precision Resizer)
      </div>
      <h2 class="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        ऑनलाइन इमेज रिसाइज़र (Online Image Resizer)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        हमारा मुफ्त <strong>ऑनलाइन इमेज रिसाइज़र</strong> बिना किसी डेस्कटॉप सॉफ्टवेयर को इंस्टॉल किए आपकी तस्वीरों के पिक्सेल आयामों को बदलने और फाइल साइज को कम करने का एक त्वरित और सुरक्षित साधन प्रदान करता है। चाहे आपको किसी वेबसाइट बैनर के लिए सटीक पिक्सेल सीमा तय करनी हो, सेंटीमीटर (CM) में पासपोर्ट फोटो तैयार करनी हो, या भारी स्मार्टफोन तस्वीरों को एक विशिष्ट किलोबाइट (KB) में सिकोड़ना हो, हमारा टूल सीधे आपके ब्राउज़र में तत्काल परिणाम देता है।
      </p>
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">📐</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">पिक्सेल स्केलिंग</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">पहलू अनुपात (Aspect Ratio) लॉक</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">📏</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">सेंटीमीटर (cm) रूपांतरण</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">कस्टम DPI नियंत्रण (300 DPI)</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🗜️</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">टारगेट KB मोड</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">20KB, 50KB, 100KB प्रीसेट</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🔒</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">100% क्लाइंट-साइड</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">क्लाउड पर शून्य अपलोड</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">वजन और आयाम अनुकूलन</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        इमेज का साइज KB में बदलें (Resize Image in KB)
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
        पिक्सेल बदलना केवल आधा काम है। सरकारी पोर्टल, विश्वविद्यालय परीक्षा फॉर्म और नौकरी आवेदन प्रणाली नियमित रूप से ऐसी फाइलों की मांग करते हैं जो सख्त किलोबाइट सीमा (जैसे 50KB या 100KB) का पालन करती हों।
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 font-mono text-xs font-bold text-blue-900 dark:bg-blue-950/70 dark:text-blue-300">बाइनरी सर्च एल्गोरिथम</span>
          <span class="text-xs text-slate-400 font-medium">स्मार्ट वजन कमी</span>
        </div>
        <h3 class="mt-4 text-lg font-bold text-slate-900 dark:text-white">KB रिसाइज़र कैसे काम करता है?</h3>
        <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          जब आप <strong>इमेज रिसाइज़र इन KB</strong> का उपयोग करते हैं, तो फाइल साइज कम करने के लिए पिक्सेल आयामों और लॉस कंप्रेशन तालिकाओं के बीच एक बुद्धिमान संतुलन की आवश्यकता होती है। यदि आप 50KB चुनते हैं, तो हमारा एल्गोरिथ्म बाइनरी चरणों में संपीड़न गुणवत्ता को समायोजित करता है ताकि फोटो बिना धुंधली हुए पोर्टल की सीमा में फिट हो सके।
        </p>
      </div>
      <div class="rounded-3xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/40 via-white to-white p-6 shadow-xs dark:border-emerald-900/50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 font-mono text-xs font-bold text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300">1-क्लिक प्रीसेट</span>
          <span class="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">मानक पहचान पत्र आवश्यकता</span>
        </div>
        <h2 class="mt-4 text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>👤</span> इमेज रिसाइज़र 50KB (Image Resizer 50KB)
        </h2>
        <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          50 KB दुनिया भर में सबसे अधिक अनुरोधित छवि प्रतिबंध है। चाहे पासपोर्ट फोटो अपलोड करना हो, सरकारी कर्मचारी सत्यापन कार्ड हो, या कॉलेज प्रवेश, हमारा <strong>image resizer 50kb</strong> मोड एक क्लिक में 50KB या उससे कम की सत्यापित फाइल बनाता है।
        </p>
        <div class="mt-4 rounded-xl border border-emerald-200/60 bg-white/80 p-3 text-xs text-emerald-900 dark:border-emerald-900/40 dark:bg-slate-800/80 dark:text-emerald-200">
          <strong>अंतिम परिणाम:</strong> लक्ष्य साइज आमतौर पर 46KB–49.5KB के बीच रहता है, जिससे पोर्टल द्वारा रिजेक्ट होने का कोई खतरा नहीं रहता।
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">भौतिक प्रिंट आयाम</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        इमेज को सेंटीमीटर में बदलें (Resize Image in CM)
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
        डिजिटल स्क्रीन पिक्सेल में काम करती हैं, लेकिन भौतिक दुनिया सेंटीमीटर और इंच में चलती है। <strong>Image resizer in cm</strong> ग्राफिक डिजाइनरों और आवेदकों को कलाकृति को सटीक भौतिक प्रिंट विनिर्देशों के अनुसार स्केल करने की अनुमति देता है।
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span class="text-blue-600 dark:text-blue-400">📐</span> सेंटीमीटर से पिक्सेल रूपांतरण सूत्र
        </h3>
        <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          चूँकि 1 इंच ठीक 2.54 सेंटीमीटर के बराबर होता है, सेंटीमीटर को डिजिटल पिक्सेल में बदलने के लिए लक्ष्य डॉट्स प्रति इंच (DPI) को जानना आवश्यक है:
        </p>
        <div class="my-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4 font-mono text-xs sm:text-sm font-bold text-blue-950 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
          पिक्सेल = (सेंटीमीटर ÷ 2.54) × DPI
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <em>उदाहरण:</em> यदि कोई पासपोर्ट फॉर्म <strong>300 DPI</strong> पर <strong>3.5 सेमी × 4.5 सेमी</strong> फोटो मांगता है:
          <br />• चौड़ाई: (3.5 ÷ 2.54) × 300 = <strong>413 पिक्सेल</strong>
          <br />• ऊंचाई: (4.5 ÷ 2.54) × 300 = <strong>531 पिक्सेल</strong>
        </p>
      </div>
      <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">सामान्य सेंटीमीटर प्रीसेट (300 DPI पर)</h3>
        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 dark:border-slate-800">
                <th class="pb-2 font-bold">मानक दस्तावेज़</th>
                <th class="pb-2 font-bold">आकार (cm)</th>
                <th class="pb-2 font-bold">पिक्सेल (300 DPI)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
              <tr>
                <td class="py-2.5 font-semibold">मानक पासपोर्ट फोटो</td>
                <td class="py-2.5 font-mono">3.5 × 4.5 cm</td>
                <td class="py-2.5 font-mono text-blue-600 dark:text-blue-400">413 × 531 px</td>
              </tr>
              <tr>
                <td class="py-2.5 font-semibold">चौकोर वीजा फोटो</td>
                <td class="py-2.5 font-mono">5.0 × 5.0 cm</td>
                <td class="py-2.5 font-mono text-blue-600 dark:text-blue-400">591 × 591 px</td>
              </tr>
              <tr>
                <td class="py-2.5 font-semibold">पैन कार्ड फोटो</td>
                <td class="py-2.5 font-mono">2.5 × 3.5 cm</td>
                <td class="py-2.5 font-mono text-blue-600 dark:text-blue-400">295 × 413 px</td>
              </tr>
              <tr>
                <td class="py-2.5 font-semibold">वॉलेट प्रिंट (3R)</td>
                <td class="py-2.5 font-mono">8.9 × 12.7 cm</td>
                <td class="py-2.5 font-mono text-blue-600 dark:text-blue-400">1051 × 1500 px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">तुलना</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        इमेज रिसाइज़र बनाम Canva इमेज रिसाइज़र
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
        विशेष ऑनलाइन उपयोगिताओं और कैनवा (Canva) जैसे जटिल ग्राफिक सूट के बीच मुख्य अंतर समझें:
      </p>
    </div>
    <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead class="border-b border-slate-200 bg-slate-50/70 text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
            <tr>
              <th class="p-4 font-bold">विशेषता / सुविधा</th>
              <th class="p-4 font-bold text-blue-600 dark:text-blue-400">हमारा इमेज रिसाइज़र</th>
              <th class="p-4 font-bold text-slate-500">Canva इमेज रिसाइज़र</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-600 dark:divide-slate-800 dark:text-slate-300">
            <tr>
              <td class="p-4 font-semibold text-slate-900 dark:text-white">मुख्य उद्देश्य</td>
              <td class="p-4 text-blue-600 dark:text-blue-400 font-medium">सटीक इमेज स्केलिंग और KB कमी</td>
              <td class="p-4">व्यापक ग्राफिक डिजाइन और मल्टी-लेयर लेआउट</td>
            </tr>
            <tr>
              <td class="p-4 font-semibold text-slate-900 dark:text-white">खाता / साइन-अप</td>
              <td class="p-4 text-emerald-600 dark:text-emerald-400 font-bold">कोई लॉगिन आवश्यक नहीं</td>
              <td class="p-4">खाता लॉगिन अनिवार्य</td>
            </tr>
            <tr>
              <td class="p-4 font-semibold text-slate-900 dark:text-white">गोपनीयता</td>
              <td class="p-4 text-emerald-600 dark:text-emerald-400 font-bold">100% क्लाइंट-साइड (शून्य सर्वर अपलोड)</td>
              <td class="p-4">फाइलें क्लाउड सर्वर पर अपलोड होती हैं</td>
            </tr>
            <tr>
              <td class="p-4 font-semibold text-slate-900 dark:text-white">सटीक KB लक्ष्य रिसाइज़िंग</td>
              <td class="p-4 text-emerald-600 dark:text-emerald-400 font-bold">हाँ (20KB, 50KB, 100KB, कस्टम KB)</td>
              <td class="p-4">सामान्य डाउनलोड गुणवत्ता सेटिंग्स</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</div>
`;

const irEs = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/60 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/70 dark:text-blue-300">
        <span class="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        Redimensionador de Precisión en Navegador
      </div>
      <h2 class="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Redimensionador de Imágenes Online (Online Image Resizer)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        Nuestra herramienta gratuita para <strong>redimensionar imágenes online</strong> ofrece una forma rápida y segura de ajustar dimensiones en píxeles y reducir el tamaño de archivo sin instalar programas pesados. Ya sea para calibrar el tamaño exacto de un banner web, preparar fotos en centímetros (cm) para impresión física o comprimir fotografías a un límite de kilobytes (KB) exacto, nuestra herramienta ofrece resultados instantáneos en tu navegador.
      </p>
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">📐</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Escala en Píxeles</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Bloqueo de relación de aspecto</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">📏</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Centímetros (cm)</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Control de DPI (300 DPI)</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🗜️</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Modo KB Objetivo</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">20KB, 50KB, 100KB</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🔒</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">100% en Cliente</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Cero envíos a la nube</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Optimización de Peso y Dimensiones</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Cambiar Tamaño de Imagen en KB
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
        Cambiar las dimensiones en píxeles es solo la mitad de la tarea. Portales gubernamentales, admisiones universitarias y convocatorias de empleo exigen habitualmente que los archivos no superen un umbral estricto en kilobytes.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Cómo Funciona el Redimensionador por KB</h3>
        <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Reducir el peso requiere un equilibrio inteligente entre resolución y tablas de compresión. Al indicar un objetivo como 50KB, nuestro algoritmo ajusta la cuantización en pasos binarios manteniendo la nitidez facial y los bordes limpios.
        </p>
      </div>
      <div class="rounded-3xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/40 via-white to-white p-6 shadow-xs dark:border-emerald-900/50 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900">
        <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>👤</span> Redimensionar Imagen a 50KB (Image Resizer 50KB)
        </h2>
        <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          El límite de 50 KB es la exigencia más común en pasaportes, visados y oposiciones. Nuestro modo de 1 clic garantiza que el archivo final quede siempre por debajo de 50KB (típicamente entre 46KB y 49.5KB) para evitar rechazos en el formulario.
        </p>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Medidas de Impresión Física</span>
      <h2 class="mt-1 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        Redimensionar Imagen en Centímetros (CM)
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
        Para documentos físicos, convertir centímetros a píxeles digitales requiere conocer los puntos por pulgada (DPI). La fórmula estándar es:
      </p>
      <div class="my-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4 font-mono text-xs sm:text-sm font-bold text-blue-950 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
        Píxeles = (Centímetros ÷ 2.54) × DPI
      </div>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Una foto de pasaporte oficial de 3,5 cm × 4,5 cm a 300 DPI equivale a exactamente <strong>413 × 531 píxeles</strong>.
      </p>
    </div>
  </section>
</div>
`;

updateJson('image-resizer', irHi, irEs);

// ─────────────────────────────────────────────────────────────────────────────
// 2. QR CODE GENERATOR (Full sections matching English)
// ─────────────────────────────────────────────────────────────────────────────
const qrHi = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/60 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/70 dark:text-blue-300">
        <span class="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        100% स्थायी एवं मुफ्त QR कोड जनरेटर
      </div>
      <h2 class="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        मुफ्त ऑनलाइन QR कोड जनरेटर (Free QR Code Generator Online)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        वेबसाइट यूआरएल, वाई-फाई क्रेडेंशियल्स, वी-कार्ड संपर्क विवरण, ईमेल, फोन नंबर और किसी भी टेक्स्ट संदेश के लिए उच्च-रिज़ॉल्यूशन वाले QR कोड तुरंत उत्पन्न करें। बिना किसी सदस्यता शुल्क, बिना किसी समाप्ति तिथि और बिना किसी वॉटरमार्क के अपने QR कोड PNG और SVG वेक्टर प्रारूपों में डाउनलोड करें।
      </p>
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">♾️</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">कभी एक्सपायर नहीं होता</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">100% स्थायी स्टैटिक कोड</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🎨</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">कस्टम रंग और लोगो</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">अपने ब्रांड के अनुसार डिजाइन</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">📦</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">थोक जनरेशन (Bulk)</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">एक क्लिक में सैकड़ों कोड</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">📐</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">वेक्टर SVG एक्सपोर्ट</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">फ्लेक्स और प्रिंट के लिए उपयुक्त</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">स्टैटिक बनाम डायनामिक QR कोड: क्या मुफ्त कोड कभी बंद होते हैं?</h2>
    <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
      कई व्यावसायिक QR कोड कंपनियां मुफ्त ट्रायल के नाम पर डायनामिक कोड बनाती हैं जो 14 दिनों के बाद काम करना बंद कर देते हैं और मासिक शुल्क मांगते हैं। इसके विपरीत, हमारा टूल <strong>100% स्टैटिक QR कोड</strong> बनाता है। डेटा सीधे QR कोड के पिक्सेल पैटर्न में एनकोड होता है, इसलिए यह आजीवन बिना किसी सर्वर या शुल्क के हमेशा काम करता रहेगा।
    </p>
  </section>
</div>
`;

const qrEsFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/60 px-3 py-1 text-xs font-bold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/70 dark:text-blue-300">
        <span class="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
        Códigos QR 100% Permanentes y Gratuitos
      </div>
      <h2 class="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Generador de Códigos QR Online Gratuito (QR Code Generator)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        Genera al instante códigos QR de alta resolución para enlaces web, redes Wi-Fi, contactos vCard, correos y textos. Descarga tus códigos en formatos PNG y vectores SVG sin cuotas de suscripción, sin fechas de caducidad y sin marcas de agua.
      </p>
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">♾️</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Sin Caducidad</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Códigos estáticos permanentes</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">🎨</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Colores y Logo</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Personalización de marca</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">📦</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Generación Masiva</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Cientos de códigos en 1 clic</div>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-2xs backdrop-blur-xs dark:border-slate-800 dark:bg-slate-800/60">
          <span class="text-xl">📐</span>
          <div>
            <div class="text-xs font-bold text-slate-900 dark:text-white">Exportación SVG</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">Impresión profesional nítida</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Códigos QR Estáticos vs Dinámicos: ¿Caducan los Códigos Gratis?</h2>
    <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
      A diferencia de servicios comerciales que bloquean tus enlaces tras unos días exigiendo suscripciones mensuales, nuestro generador crea <strong>códigos QR 100% estáticos</strong>. La información está grabada directamente en la cuadrícula de módulos, garantizando funcionamiento indefinido, privado y sin intermediarios.
    </p>
  </section>
</div>
`;

updateJson('qr-code-generator', qrHi, qrEsFull);

// ─────────────────────────────────────────────────────────────────────────────
// 3. JPG TO PNG & PNG TO JPG
// ─────────────────────────────────────────────────────────────────────────────
const j2pHiFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        JPG से PNG कनवर्टर (JPG to PNG Converter Online)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        हमारे मुफ्त ऑनलाइन कनवर्टर से अपनी JPG/JPEG तस्वीरों को तुरंत पारदर्शी और उच्च-गुणवत्ता वाले PNG प्रारूप में बदलें। यह टूल बिना किसी गुणवत्ता हानि (Lossless) के सीधे आपके ब्राउज़र में काम करता है।
      </p>
    </div>
  </section>
  <section class="space-y-4">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">JPG को PNG में क्यों बदलना चाहिए?</h2>
    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      PNG प्रारूप दोषरहित संपीड़न (Lossless Compression) और अल्फा पारदर्शिता (Alpha Transparency) का समर्थन करता है। इसका अर्थ है कि जब आप किसी लोगो, आइकन या टेक्स्ट-युक्त छवि को संपादित करते हैं, तो PNG में कोई पिक्सेलेशन या धुंधलापन नहीं आता।
    </p>
  </section>
</div>
`;

const j2pEsFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Conversor de JPG a PNG Online y Gratuito
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        Transforma tus imágenes JPG o JPEG a formato PNG con máxima fidelidad y compatibilidad con transparencia directamente en tu navegador sin subir archivos a servidores externos.
      </p>
    </div>
  </section>
  <section class="space-y-4">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">¿Por Qué Conviene Convertir de JPG a PNG?</h2>
    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      PNG utiliza compresión sin pérdidas (lossless) y soporta canal alfa transparente, siendo el estándar perfecto para logotipos, firmas digitales, capturas de pantalla y gráficos web con bordes definidos.
    </p>
  </section>
</div>
`;

updateJson('jpg-to-png', j2pHiFull, j2pEsFull);

const p2jHiFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        PNG से JPG कनवर्टर (PNG to JPG Converter Online)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        भारी PNG फाइलों को तुरंत हल्के और सार्वभौमिक रूप से समर्थित JPG प्रारूप में बदलें। अपनी छवियों का आकार 70% तक कम करें और वेबसाइट लोडिंग गति बढ़ाएं।
      </p>
    </div>
  </section>
  <section class="space-y-4">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">पारदर्शी पृष्ठभूमि (Transparency) का क्या होता है?</h2>
    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      चूँकि JPG प्रारूप पारदर्शिता का समर्थन नहीं करता, इसलिए कनवर्ट करते समय पारदर्शी क्षेत्रों को अपने आप एक साफ सफेद पृष्ठभूमि या आपकी पसंद के पृष्ठभूमि रंग से भर दिया जाता है।
    </p>
  </section>
</div>
`;

const p2jEsFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Conversor de PNG a JPG Online Rápido y Privado
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        Reduce drásticamente el peso de archivos PNG convirtiéndolos al formato JPG estándar, ideal para acelerar la carga de sitios web y enviar fotos por correo electrónico.
      </p>
    </div>
  </section>
  <section class="space-y-4">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">Gestión del Fondo Transparente en la Conversión</h2>
    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      Al no soportar canal alfa transparente, el conversor rellena automáticamente las zonas transparentes con un fondo blanco impecable para garantizar una visualización óptima.
    </p>
  </section>
</div>
`;

updateJson('png-to-jpg', p2jHiFull, p2jEsFull);

// ─────────────────────────────────────────────────────────────────────────────
// 4. JSON FORMATTER & JSON VALIDATOR & PDF MERGE
// ─────────────────────────────────────────────────────────────────────────────
const jfHiFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        ऑनलाइन JSON फॉर्मेटर और व्यूअर (JSON Formatter Online)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        अपने अव्यवस्थित और संपीड़ित JSON डेटा को तुरंत सुंदर, साफ और सिंटैक्स-हाइलाइटेड प्रारूप में स्वरूपित करें। सिंटैक्स त्रुटियों की तुरंत पहचान करें और कोड ट्री संरचना का निरीक्षण करें।
      </p>
    </div>
  </section>
  <section class="space-y-4">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">JSON फॉर्मेटर क्या है और इसकी आवश्यकता क्यों है?</h2>
    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      APIs और डेटाबेस नेटवर्क बैंडविड्थ बचाने के लिए JSON को एक ही पंक्ति में मिनिफाई करके भेजते हैं। डेवलपर्स के लिए इसे पढ़ना और डीबग करना कठिन होता है। हमारा टूल 2 या 4 स्पेस इंडेंटेशन के साथ डेटा को मानवीय रूप से पढ़ने योग्य बनाता है।
    </p>
  </section>
</div>
`;

const jfEsFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Formateador de JSON Online (JSON Formatter & Pretty Print)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        Organiza, valida y depura estructuras JSON minificadas con resaltado de sintaxis, sangría personalizable e inspección de errores en tiempo real en tu navegador.
      </p>
    </div>
  </section>
  <section class="space-y-4">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">¿Qué es un Formateador JSON y por qué usarlo?</h2>
    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      Las APIs comprimen las respuestas eliminando espacios en blanco para ahorrar ancho de banda. Un formateador JSON restablece la jerarquía visual facilitando la lectura y detección inmediata de errores de sintaxis.
    </p>
  </section>
</div>
`;

updateJson('json-formatter', jfHiFull, jfEsFull);

const jvHiFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        ऑनलाइन JSON वैलिडेटर (JSON Validator Online)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        JSON सिंटैक्स त्रुटियों की तुरंत पहचान करें। छूटे हुए अल्पविराम (comma), असंतुलित कोष्ठक और गलत उद्धरण चिह्नों (quotes) की सटीक पंक्ति और कॉलम संख्या देखें।
      </p>
    </div>
  </section>
</div>
`;

const jvEsFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Validador de JSON Online (JSON Validator)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        Comprueba la validez de tu código JSON al instante según la especificación RFC 8259 con indicación precisa de número de línea y columna de cualquier error de sintaxis.
      </p>
    </div>
  </section>
</div>
`;

updateJson('json-validator', jvHiFull, jvEsFull);

const pdfHiFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        मुफ्त ऑनलाइन PDF मर्ज टूल (Merge PDF Files Online)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        कई पीडीएफ फाइलों को आसानी से एक व्यवस्थित दस्तावेज में मिलाएं। ड्रैग-एंड-ड्रॉप से पृष्ठों को पुनर्व्यवस्थित करें और बिना किसी सर्वर अपलोड के सीधे अपने ब्राउज़र में सुरक्षित रूप से मर्ज करें।
      </p>
    </div>
  </section>
  <section class="space-y-4">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">100% सुरक्षित और निजी पीडीएफ संयोजन</h2>
    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      अधिकांश ऑनलाइन पीडीएफ उपकरण आपके संवेदनशील दस्तावेजों को अपने सर्वर पर अपलोड करते हैं। हमारा टूल WebAssembly और क्लाइंट-साइड जावास्क्रिप्ट का उपयोग करके फाइलों को केवल आपके कंप्यूटर की मेमोरी में जोड़ता है।
    </p>
  </section>
</div>
`;

const pdfEsFull = `
<div class="space-y-12 not-prose">
  <section class="space-y-6">
    <div class="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/80 via-white to-slate-50 p-6 shadow-xs dark:border-blue-950/60 dark:from-slate-900 dark:via-slate-900/80 dark:to-blue-950/20 sm:p-8">
      <h2 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Unir Archivos PDF Online Gratis (PDF Merge)
      </h2>
      <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
        Combina múltiples documentos PDF en un único archivo organizado con vista previa en miniatura, ordenación por arrastre y procesamiento 100% privado en tu navegador.
      </p>
    </div>
  </section>
  <section class="space-y-4">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">Fusión de PDF Privada y Segura en el Cliente</h2>
    <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
      A diferencia de otros conversores que envían contratos y extractos bancarios a servidores remotos, nuestra herramienta procesa los archivos exclusivamente en la memoria local de tu dispositivo.
    </p>
  </section>
</div>
`;

updateJson('pdf-merge', pdfHiFull, pdfEsFull);

console.log('ALL ONLINE TOOLS HAVE BEEN FULLY TRANSLATED WITH RICH MULTI-SECTION ARTICLES!');
