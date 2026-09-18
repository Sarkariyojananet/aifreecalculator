import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

// ============================================================================
// 1. PPF CALCULATOR (Full translation of contentHtml)
// ============================================================================
function updatePpf() {
  const file = path.join(dataDir, 'ppf-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  data.hi.contentHtml = `
<section class="ppf-content space-y-6">
  <h2>PPF ब्याज गणना सूत्र और 5 तारीख का सुनहरा नियम</h2>
  <p>वित्त मंत्रालय द्वारा प्रत्येक तिमाही में पीपीएफ (PPF) की ब्याज दरें तय की जाती हैं। सरकारी नियमों के अनुसार, ब्याज की गणना <strong>प्रति माह की 5 तारीख की समाप्ति और महीने के अंतिम दिन के बीच के न्यूनतम शेष (Lowest Balance)</strong> पर की जाती है, और यह ब्याज प्रतिवर्ष 31 मार्च को खाते में जमा (Credit) किया जाता है।</p>

  <div class="my-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">सुनहरा नियम: महीने की 5 तारीख से पहले निवेश करें</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <li><strong>एकमुश्त निवेशक:</strong> <strong>5 अप्रैल</strong> से पहले या उसी दिन जमा करने पर आपको उस वित्तीय वर्ष के पूरे 12 महीनों का चक्रवृद्धि ब्याज मिलता है।</li>
      <li><strong>मासिक एसआईपी निवेशक:</strong> प्रत्येक माह की <strong>5 तारीख</strong> तक किस्त जमा करने पर उस महीने का पूरा ब्याज अर्जित होता है।</li>
    </ul>
  </div>

  <h2>वार्षिकी चक्रवृद्धि भविष्य निधि सूत्र (Annuity Compounding Formula)</h2>
  <p>प्रत्येक वर्ष की शुरुआत में समान वार्षिक जमा के लिए परिपक्वता मूल्य (Future Value) <em>F</em> की गणना इस प्रकार की जाती है:</p>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    F = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i)
  </div>
  <p class="text-xs text-slate-500 dark:text-slate-400">जहाँ <em>P</em> = वार्षिक जमा, <em>i</em> = वार्षिक ब्याज दर (r ÷ 100), और <em>n</em> = वर्षों की संख्या (15 से 30 वर्ष)।</p>

  <h2>विस्तृत PPF गणना उदाहरण</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h4 class="font-bold text-sm text-blue-600 dark:text-blue-400">उदाहरण 1: सामान्य बचतकर्ता</h4>
      <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">₹10,000 प्रति वर्ष 15 वर्षों के लिए @ 7.1%</p>
      <ul class="text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-1">
        <li>कुल निवेश: <strong>₹1,50,000</strong></li>
        <li>कुल अर्जित ब्याज: <strong class="text-emerald-600">₹1,21,214</strong></li>
        <li>अनुमानित मैच्योरिटी राशि: <strong>₹2,71,214</strong></li>
      </ul>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h4 class="font-bold text-sm text-emerald-600 dark:text-emerald-400">उदाहरण 2: धारा 80C की अधिकतम सीमा</h4>
      <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">₹1,50,000 प्रति वर्ष 15 वर्षों के लिए @ 7.1%</p>
      <ul class="text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-1">
        <li>कुल निवेश: <strong>₹22,50,000</strong></li>
        <li>कुल अर्जित ब्याज: <strong class="text-emerald-600">₹18,18,209</strong></li>
        <li>अनुमानित मैच्योरिटी राशि: <strong>₹40,68,209</strong></li>
      </ul>
    </div>
  </div>

  <h2>प्रमुख नियम, खाता विस्तार और आंशिक निकासी</h2>
  <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
    <li><strong>जमा सीमा:</strong> न्यूनतम ₹500, अधिकतम ₹1,50,000 प्रति वित्तीय वर्ष।</li>
    <li><strong>15-वर्षीय मैच्योरिटी विस्तार:</strong> 15 वर्ष पूरे होने के बाद 5-5 वर्षों के ब्लॉक में खाते को अनिश्चित काल के लिए आगे बढ़ाया जा सकता है।</li>
    <li><strong>आंशिक निकासी:</strong> 7वें वित्तीय वर्ष से आंशिक निकासी की अनुमति है, जो 4थे पूर्ववर्ती वर्ष के अंत में शेष राशि का अधिकतम 50% हो सकती है।</li>
    <li><strong>कर छूट:</strong> EEE (छूट-छूट-छूट) श्रेणी में होने के कारण मूलधन, ब्याज और मैच्योरिटी राशि तीनों पूरी तरह कर-मुक्त हैं।</li>
  </ul>
</section>`;

  data.es.contentHtml = `
<section class="ppf-content space-y-6">
  <h2>Fórmula de Cálculo de Intereses del PPF y la Regla del Día 5</h2>
  <p>El Ministerio de Finanzas establece las tasas de interés trimestralmente. Por ley, los intereses se calculan <strong>mensualmente sobre el saldo más bajo registrado entre el cierre del día 5 y el último día de cada mes</strong>, y se acreditan anualmente al cierre del ejercicio fiscal.</p>

  <div class="my-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">La Regla de Oro: Aportar Antes del Día 5</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <li><strong>Inversores de pago único:</strong> Depositar antes del <strong>5 de abril</strong> garantiza el devengo de interés compuesto durante los 12 meses del ejercicio.</li>
      <li><strong>Inversores de aportación periódica:</strong> Depositar el día 5 de cada mes o antes asegura el cómputo de intereses de todo el mes natural.</li>
    </ul>
  </div>

  <h2>Fórmula de Valor Futuro con Interés Compuesto</h2>
  <p>Para depósitos anuales constantes a inicio de cada periodo, el valor acumulado <em>F</em> se calcula mediante:</p>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    F = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i)
  </div>
  <p class="text-xs text-slate-500 dark:text-slate-400">Donde <em>P</em> = Depósito anual, <em>i</em> = Tasa de interés anual (r ÷ 100) y <em>n</em> = Número de años (15 a 30).</p>

  <h2>Ejemplos Prácticos de Cálculo</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h4 class="font-bold text-sm text-blue-600 dark:text-blue-400">Ejemplo 1: Ahorrador Moderado</h4>
      <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">10.000 ₹ al año durante 15 años al 7,1%</p>
      <ul class="text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-1">
        <li>Capital Invertido: <strong>150.000 ₹</strong></li>
        <li>Intereses Acumulados: <strong class="text-emerald-600">121.214 ₹</strong></li>
        <li>Capital al Vencimiento: <strong>271.214 ₹</strong></li>
      </ul>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h4 class="font-bold text-sm text-emerald-600 dark:text-emerald-400">Ejemplo 2: Aportación Máxima Permitida</h4>
      <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">150.000 ₹ al año durante 15 años al 7,1%</p>
      <ul class="text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-1">
        <li>Capital Invertido: <strong>2.250.000 ₹</strong></li>
        <li>Intereses Acumulados: <strong class="text-emerald-600">1.818.209 ₹</strong></li>
        <li>Capital al Vencimiento: <strong>4.068.209 ₹</strong></li>
      </ul>
    </div>
  </div>

  <h2>Normativa, Prórrogas y Rescates Parciales</h2>
  <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
    <li><strong>Límites de aportación:</strong> Mínimo 500 ₹ y máximo 150.000 ₹ por ejercicio fiscal.</li>
    <li><strong>Prórroga del plazo:</strong> Tras los 15 años iniciales, se puede prorrogar indefinidamente en bloques de 5 años.</li>
    <li><strong>Retiradas parciales:</strong> Permitidas a partir del séptimo año fiscal hasta el 50% del saldo acumulado.</li>
    <li><strong>Exención fiscal:</strong> Régimen EEE (Exento-Exento-Exento) que garantiza un rendimiento 100% libre de tributación.</li>
  </ul>
</section>`;

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ ppf-calculator.json contentHtml updated for hi and es.');
}

// ============================================================================
// 2. SWP CALCULATOR (Full translation of contentHtml)
// ============================================================================
function updateSwp() {
  const file = path.join(dataDir, 'swp-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  data.hi.contentHtml = `
<section class="swp-content space-y-6">
  <h2>सिस्टमैटिक विड्रॉल प्लान (SWP) क्या है?</h2>
  <p>एक <strong>सिस्टमैटिक विड्रॉल प्लान (SWP)</strong> म्यूचुअल फंड निवेशकों को अपने जमा पूंजी (कॉर्पस) से एक निश्चित अंतराल (आमतौर पर मासिक) पर तयशुदा धनराशि निकालने की सुविधा देता है, जबकि बची हुई पूंजी बाजार में निवेशित रहकर चक्रवृद्धि रिटर्न कमाती रहती है।</p>
  <p>यह विशेष रूप से सेवानिवृत्त (रिटायर्ड) व्यक्तियों, नियमित आय चाहने वालों और वित्तीय स्वतंत्रता प्राप्त करने वाले निवेशकों के लिए एक नियमित मासिक पेंशन या वेतन जैसा समाधान प्रदान करता है।</p>

  <h2>मासिक SWP चक्रवृद्धि सूत्र</h2>
  <p>माह <em>t</em> के अंत में शेष पूंजी की गणना निम्न आवर्ती सूत्र द्वारा की जाती है:</p>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    B_t = B_(t-1) × (1 + r_m) − W
  </div>
  <p class="text-xs text-slate-500 dark:text-slate-400">जहाँ <em>B_t</em> = माह के अंत में शेष राशि, <em>r_m</em> = मासिक प्रभावी ब्याज दर ((1 + r)^(1/12) − 1), और <em>W</em> = मासिक निकासी राशि।</p>

  <h2>महीने की शुरुआत बनाम महीने के अंत में निकासी तुलना</h2>
  <div class="overflow-x-auto my-4">
    <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800">
      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
        <tr>
          <th class="p-3 border border-slate-200 dark:border-slate-800">निकासी का समय</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">ब्याज पर प्रभाव</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">अंतिम कॉर्पस पर प्रभाव</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">सर्वोत्तम उपयोग</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">महीने की शुरुआत (Beginning)</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">निकासी पर उस महीने का ब्याज नहीं मिलता</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">दीर्घकाल में थोड़ा कम शेष बचता है</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">घरेलू खर्च, किराया और बिल भुगतान</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">महीने का अंत (End)</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">पूरी पूंजी पूरे महीने ब्याज अर्जित करती है</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">अधिकतम वेल्थ ग्रोथ और बड़ा शेष</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">विवेकाधीन खर्च और अतिरिक्त आय</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>वार्षिक मुद्रास्फीति वृद्धि (Annual Inflation Step-Up)</h2>
  <p>यदि आप हर साल जीवन यापन की लागत बढ़ने पर अपनी निकासी राशि में 5% या 10% की वृद्धि चुनते हैं, तो हमारा कैलकुलेटर हर 12 महीने बाद निकासी राशि को स्वचालित रूप से बढ़ा देता है ताकि आपकी क्रय शक्ति सुरक्षित रहे।</p>
</section>`;

  data.es.contentHtml = `
<section class="swp-content space-y-6">
  <h2>¿Qué es un Plan de Retiro Sistemático (SWP)?</h2>
  <p>Un <strong>Plan de Retiro Sistemático (SWP)</strong> permite a los inversores en fondos de inversión retirar una suma fija de dinero a intervalos regulares (generalmente mensuales) de su capital acumulado, mientras el capital remanente sigue generando rentabilidad por interés compuesto.</p>
  <p>Es una alternativa ideal para jubilados y personas que buscan generar un sueldo o renta periódica sin descapitalizarse por completo.</p>

  <h2>Fórmula de Capital Remanente en Retiro Periódico</h2>
  <p>El saldo disponible al término de cada mes <em>t</em> se calcula mediante la fórmula iterativa:</p>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    B_t = B_(t-1) × (1 + r_m) − W
  </div>
  <p class="text-xs text-slate-500 dark:text-slate-400">Donde <em>B_t</em> = Capital remanente, <em>r_m</em> = Tasa de interés efectiva mensual ((1 + r)^(1/12) − 1) y <em>W</em> = Importe retirado mensualmente.</p>

  <h2>Comparativa: Retiro a Principio vs. a Final de Mes</h2>
  <div class="overflow-x-auto my-4">
    <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800">
      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
        <tr>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Momento de Retiro</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Efecto en Rentabilidad</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Impacto en Capital Final</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Uso Recomendado</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">Principio de mes</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">La cantidad retirada no genera interés ese mes</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Rendimiento final ligeramente inferior</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Pago de alquiler y facturas corrientes</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">Final de mes</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Todo el capital genera rentabilidad el mes completo</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Maximiza el crecimiento del fondo residual</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Gastos prescindibles o reinversión</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Ajuste Anual por Inflación (Step-Up)</h2>
  <p>Al seleccionar la opción de incremento por inflación (por ejemplo, un 5% o 10% anual), el simulador actualiza automáticamente el retiro cada 12 meses para proteger su poder adquisitivo.</p>
</section>`;

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ swp-calculator.json contentHtml updated for hi and es.');
}

// ============================================================================
// 3. XIRR CALCULATOR (Full translation of contentHtml)
// ============================================================================
function updateXirr() {
  const file = path.join(dataDir, 'xirr-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  data.hi.contentHtml = `
<section class="xirr-content space-y-6">
  <h2>XIRR (एक्सटेंडेड इंटरनल रेट ऑफ रिटर्न) को समझना</h2>
  <p><strong>XIRR (Extended Internal Rate of Return)</strong> उन निवेशों पर वार्षिक रिटर्न की गणना करने का वैश्विक मानक है जिनमें अलग-अलग या अनियमित तिथियों पर कई बार पैसे जमा या निकाले जाते हैं।</p>

  <h2>XIRR बनाम IRR बनाम CAGR तुलना</h2>
  <div class="overflow-x-auto my-4">
    <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800">
      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
        <tr>
          <th class="p-3 border border-slate-200 dark:border-slate-800">पैमाना</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">सर्वोत्तम उपयोग</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">नकद प्रवाह का प्रकार</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">सटीक तारीख संवेदनशीलता</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">CAGR</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">एकमुश्त (Lump sum) निवेश (&gt; 1 वर्ष)</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">केवल प्रारंभिक और अंतिम मूल्य</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">केवल कुल वर्षों की संख्या</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">XIRR</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">एसआईपी (SIP), अनियमित जमा व निकासी</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">एकाधिक इनफ्लो और आउटफ्लो</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">हाँ (सटीक कैलेंडर तिथियों पर आधारित)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>चरण-दर-चरण गणना उदाहरण</h2>
  <p>मान लीजिए एक निवेशक किसी इक्विटी फंड में प्रत्येक वर्ष ₹10,000 की तीन वार्षिक किश्तें जमा करता है:</p>
  <ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
    <li>01/01/2021: पहली किस्त -₹10,000</li>
    <li>01/01/2022: दूसरी किस्त -₹10,000 (दिन 365)</li>
    <li>01/01/2023: तीसरी किस्त -₹10,000 (दिन 730)</li>
    <li>01/01/2024: मैच्योरिटी / रिडेम्पशन +₹60,000 (दिन 1,095)</li>
  </ul>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-xs sm:text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    -10,000 − [10,000 ÷ (1 + r)¹] − [10,000 ÷ (1 + r)²] + [60,000 ÷ (1 + r)³] = 0
  </div>
  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">समीकरण को हल करने पर प्राप्त होता है: <strong>XIRR = 38.92% वार्षिक रिटर्न</strong></p>
</section>`;

  data.es.contentHtml = `
<section class="xirr-content space-y-6">
  <h2>Comprendiendo la Tasa Interna de Retorno Modificada (XIRR)</h2>
  <p>La <strong>XIRR (Tasa Interna de Retorno Ampliada)</strong> es el estándar internacional para calcular el rendimiento porcentual anualizado de carteras de inversión con entradas y salidas de capital en fechas irregulares o periódicas.</p>

  <h2>Comparativa: XIRR vs. TIR (IRR) vs. CAGR</h2>
  <div class="overflow-x-auto my-4">
    <table class="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-800">
      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
        <tr>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Métrica</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Aplicación Ideal</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Compatibilidad de Flujos</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Sensibilidad a Fechas Exactas</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">CAGR</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Inversión única (&gt; 1 año)</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Solo capital inicial y final</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Solo años totales transcurridos</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">XIRR</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Aportaciones periódicas (SIP) y rescates</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Múltiples flujos de entrada y salida</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Sí (pondera días exactos del calendario)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Ejemplo de Cálculo Paso a Paso</h2>
  <p>Consideremos un inversor que realiza tres aportaciones anuales de 10.000 € en un fondo de inversión:</p>
  <ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
    <li>01/01/2021: Primera aportación de -10.000 €</li>
    <li>01/01/2022: Segunda aportación de -10.000 € (Día 365)</li>
    <li>01/01/2023: Tercera aportación de -10.000 € (Día 730)</li>
    <li>01/01/2024: Venta o reembolso de +60.000 € (Día 1.095)</li>
  </ul>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-xs sm:text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    -10.000 − [10.000 ÷ (1 + r)¹] − [10.000 ÷ (1 + r)²] + [60.000 ÷ (1 + r)³] = 0
  </div>
  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Resolviendo para <em>r</em> mediante aproximación numérica: <strong>XIRR = 38,92% anualizado</strong></p>
</section>`;

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ xirr-calculator.json contentHtml updated for hi and es.');
}

updatePpf();
updateSwp();
updateXirr();
