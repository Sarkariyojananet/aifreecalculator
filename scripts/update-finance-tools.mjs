import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

// ============================================================================
// 1. GRATUITY CALCULATOR
// ============================================================================
function updateGratuityCalculator() {
  const file = path.join(dataDir, 'gratuity-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const faqs = {
    en: [
      { question: "What is the difference between Simple and Advanced Gratuity Calculators?", answer: "The Simple Calculator requires only your consolidated monthly salary (Basic + DA) and service period. The Advanced Calculator lets you itemize Basic Salary and DA, choose your specific separation reason (Resignation, Retirement, Termination, Death, Disability), and inspect daily wage and tax status breakdowns." },
      { question: "Why is monthly salary divided by 26 instead of 30?", answer: "Under Indian labor law and Supreme Court precedents, a month contains 26 actual working days after excluding 4 weekly rest days (Sundays). Hence, daily wage is statutory: Monthly Wage ÷ 26." },
      { question: "Does service of 7 years and 6 months round up to 8 years?", answer: "No. Under the Payment of Gratuity Act, only service exceeding 6 months in an incomplete year rounds up. Thus, 7 years 6 months remains 7 eligible years, while 7 years 7 months rounds up to 8 eligible years." },
      { question: "Is gratuity payable if service is under 5 years?", answer: "For normal resignation, retirement, or termination, 5 years continuous service is mandatory. However, under the proviso to Section 4(1), in the event of death or permanent disability, this 5-year requirement is waived by law." }
    ],
    hi: [
      { question: "साधारण और उन्नत ग्रेच्युटी कैलकुलेटर में क्या अंतर है?", answer: "साधारण कैलकुलेटर में केवल मासिक वेतन (मूल + DA) और कुल सेवा वर्ष की आवश्यकता होती है। उन्नत कैलकुलेटर में बेसिक और DA को अलग-अलग दर्ज करने, नौकरी छोड़ने का कारण (इस्तीफा, सेवानिवृत्ति, मृत्यु, विकलांगता) चुनने और टैक्स छूट की विस्तृत स्थिति देखने की सुविधा मिलती है।" },
      { question: "मासिक वेतन को 30 के बजाय 26 से क्यों विभाजित किया जाता है?", answer: "भारतीय श्रम कानून और सुप्रीम कोर्ट के फैसलों के अनुसार, 4 साप्ताहिक अवकाश (रविवार) घटाने के बाद एक महीने में 26 कार्य दिवस माने जाते हैं। इसलिए एक दिन का वेतन निकालने के लिए मासिक वेतन को 26 से भाग दिया जाता है।" },
      { question: "क्या 7 वर्ष 6 महीने की सेवा को 8 वर्ष माना जाएगा?", answer: "नहीं। ग्रेच्युटी अधिनियम के अनुसार, किसी अधूरे वर्ष में केवल 6 महीने से अधिक (7 से 11 महीने) की सेवा होने पर ही उसे अगले पूरे वर्ष में राउंड ऑफ किया जाता है। अतः 7 वर्ष 6 माह = 7 वर्ष ही रहेगा, जबकि 7 वर्ष 7 माह = 8 वर्ष गिना जाएगा।" },
      { question: "क्या 5 वर्ष से कम सेवा पर ग्रेच्युटी मिलती है?", answer: "सामान्य इस्तीफे, सेवानिवृत्ति या सेवा समाप्ति पर कम से कम 5 वर्ष की निरंतर सेवा अनिवार्य है। हालांकि, कर्मचारी की दुर्भाग्यपूर्ण मृत्यु या दुर्घटना/बीमारी से स्थायी विकलांगता की स्थिति में धारा 4(1) के तहत 5 वर्ष की शर्त लागू नहीं होती और तुरंत ग्रेच्युटी देय होती है।" }
    ],
    es: [
      { question: "¿Cuál es la diferencia entre el cálculo simple y el avanzado?", answer: "La calculadora simple utiliza el salario mensual consolidado y los años de servicio. La avanzada permite desglosar el salario básico, complementos salariales, motivo de cese laboral y exenciones fiscales." },
      { question: "¿Por qué se divide el salario mensual entre 26 días?", answer: "En la legislación laboral aplicable, se consideran 26 días laborables reales al mes tras descontar los 4 días de descanso semanal." },
      { question: "¿Se redondea un período de 7 años y 6 meses a 8 años?", answer: "No. Solo los períodos que superan estrictamente los 6 meses adicionales (7 meses o más) se redondean al año siguiente. 7 años y 6 meses computan como 7 años." },
      { question: "¿Se puede cobrar la gratificación con menos de 5 años de servicio?", answer: "En casos normales de renuncia o despido se exigen 5 años de servicio continuo. No obstante, en caso de fallecimiento o incapacidad permanente, la ley exime este requisito mínimo." }
    ],
    ja: [
      { question: "簡易計算と詳細計算の違いは何ですか？", answer: "簡易計算は月給と勤続年数のみで概算します。詳細計算では基本給と手当の内訳、退職理由（自己都合、定年、障害、死亡等）、非課税枠の適用状況を詳細に確認できます。" },
      { question: "なぜ月給を30日ではなく26日で割るのですか？", answer: "労働法上、週休4日（日曜日等）を除いた1か月の実働日数が26日と規定されているためです。" },
      { question: "勤続7年6か月は8年に切り上げられますか？", answer: "いいえ。端数が6か月を超える（7か月以上）場合のみ切り上げられます。7年6か月は7年として計算されます。" },
      { question: "勤続5年未満でも退職金・手当は受給できますか？", answer: "通常の自己都合退職や定年では継続5年の勤務が必要ですが、死亡または業務上の障害による退職の場合は年数制限が免除されます。" }
    ],
    fr: [
      { question: "Quelle est la différence entre le mode simple et le mode avancé ?", answer: "Le mode simple utilise le salaire mensuel global et l'ancienneté. Le mode avancé ventile le salaire de base, les indemnités, le motif de départ et les seuils d'exonération fiscale." },
      { question: "Pourquoi le salaire mensuel est-il divisé par 26 jours ?", answer: "La législation du travail retient 26 jours ouvrables par mois, après déduction des 4 jours de repos hebdomadaire." },
      { question: "Une ancienneté de 7 ans et 6 mois est-elle arrondie à 8 ans ?", answer: "Non. Seuls les mois excédant strictement 6 mois (7 mois et plus) sont arrondis à l'année supérieure. 7 ans et 6 mois restent 7 années." },
      { question: "L'indemnité est-elle due avec moins de 5 ans de service ?", answer: "Une ancienneté continue de 5 ans est exigée en cas de démission ou retraite, mais cette condition est légalement levée en cas de décès ou d'invalidité permanente." }
    ],
    de: [
      { question: "Was ist der Unterschied zwischen einfacher und erweiterter Berechnung?", answer: "Der einfache Rechner benötigt nur das Monatsgehalt und die Dienstjahre. Der erweiterte Rechner trennt Grundgehalt, Zulagen, den Beendigungsgrund und steuerliche Freibeträge auf." },
      { question: "Warum wird das Monatsgehalt durch 26 Tage geteilt?", answer: "Arbeitsrechtlich wird ein Arbeitsmonat nach Abzug von 4 Ruhetagen mit 26 tatsächlichen Werktagen angesetzt." },
      { question: "Wird eine Dienstzeit von 7 Jahren und 6 Monaten auf 8 Jahre aufgerundet?", answer: "Nein. Nur Restmonate von mehr als 6 Monaten (ab dem 7. Monat) werden aufgerundet. 7 Jahre und 6 Monate gelten als 7 volle Dienstjahre." },
      { question: "Besteht Anspruch bei weniger als 5 Jahren Betriebszugehörigkeit?", answer: "Bei regulärem Ausscheiden oder Kündigung sind 5 Jahre Betriebszugehörigkeit Pflicht. Bei Tod oder Erwerbsunfähigkeit entfällt diese Mindestdauer gesetzlich." }
    ],
    pt: [
      { question: "Qual a diferença entre a calculadora simples e a avançada?", answer: "A simples utiliza o salário mensal total e o tempo de serviço. A avançada detalha salário base, adicionais, motivo do encerramento do contrato e isenções tributárias." },
      { question: "Por que o salário mensal é dividido por 26 dias?", answer: "A legislação trabalhista estabelece 26 dias úteis no mês após descontar 4 dias de repouso semanal." },
      { question: "Um período de 7 anos e 6 meses arredonda para 8 anos?", answer: "Não. Apenas frações superiores a 6 meses (7 meses ou mais) são arredondadas para cima. 7 anos e 6 meses contam como 7 anos." },
      { question: "O benefício é devido com menos de 5 anos de trabalho?", answer: "Em demissões ou aposentadorias comuns exige-se 5 anos contínuos. Em caso de morte ou invalidez permanente, a carência é legalmente dispensada." }
    ],
    ko: [
      { question: "일반 계산과 고급 계산의 차이점은 무엇인가요?", answer: "일반 계산은 총 월급여와 근속연수로 빠르게 산출합니다. 고급 계산은 기본급과 수당 분리, 퇴직 사유(자진퇴사, 정년, 장해, 사망 등), 비과세 한도까지 정밀 분석합니다." },
      { question: "월급을 30일이 아닌 26일로 나누는 이유는 무엇인가요?", answer: "노동법 규정에 따라 4일의 주휴일을 제외한 월간 실제 근무일수를 26일로 표준 산정하기 때문입니다." },
      { question: "근속 7년 6개월은 8년으로 올림 계산되나요?", answer: "아닙니다. 잔여 기간이 6개월을 초과(7개월 이상)할 때만 1년으로 올림되며, 7년 6개월은 7년으로 인정됩니다." },
      { question: "5년 미만 근무 시에도 수당이 지급되나요?", answer: "일반 퇴직의 경우 최소 5년의 근속이 필수적이지만, 사망이나 영구 장해로 인한 퇴직 시에는 근속 연수 기준이 면제됩니다." }
    ],
    it: [
      { question: "Qual è la differenza tra calcolo semplice e avanzato?", answer: "La modalità semplice calcola sulla retribuzione mensile e gli anni di servizio. Quella avanzata suddivide stipendio base, indennità, motivo di cessazione ed esenzioni fiscali." },
      { question: "Perché lo stipendio mensile viene diviso per 26?", answer: "La normativa fissa in 26 giorni lavorativi effettivi la durata mensile, escludendo i 4 giorni di riposo settimanale." },
      { question: "Un servizio di 7 anni e 6 mesi viene arrotondato a 8 anni?", answer: "No. Solo i periodi che superano i 6 mesi (da 7 a 11 mesi) vengono arrotondati all'anno successivo. 7 anni e 6 mesi restano 7 anni." },
      { question: "L'indennità spetta con meno di 5 anni di servizio?", answer: "Per dimissioni volontarie o pensionamento ordinario sono richiesti 5 anni. In caso di decesso o invalidità permanente, tale requisito è revocato per legge." }
    ]
  };

  const enContentHtml = `
<section class="gratuity-content space-y-6">
  <h2>Complete Guide to Gratuity Calculation</h2>
  <p>Gratuity is a statutory monetary benefit payable by employers to reward long-term, continuous service rendered by an employee upon resignation, superannuation, retirement, termination, or unfortunate death/disability.</p>

  <h2>Simple vs Advanced Gratuity Calculation</h2>
  <p>Depending on your requirements, you can choose between two calculation approaches:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>Simple Gratuity Calculator:</strong> Designed for employees who already know their consolidated monthly wage (Basic + DA) and wish to quickly estimate their gratuity payout based on their years and months of service.</li>
    <li><strong>Advanced Gratuity Calculator:</strong> Provides an itemized breakdown with separated Basic Salary, Dearness Allowance (DA), employment situation (Resignation, Retirement, Termination, Death, or Disability), daily wage basis, 15 days salary rate, and tax exemption guidance.</li>
  </ul>

  <h2>The Statutory 15/26 Days Gratuity Formula</h2>
  <p>For all establishments covered under statutory gratuity acts, gratuity is computed based on <strong>15 days of wages for every completed year of service</strong>, considering a 26-day working month:</p>
  <div class="my-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4 font-mono text-sm font-bold text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
    Gratuity = (Monthly Salary × 15 × Eligible Years) ÷ 26
  </div>
  <p class="text-xs text-slate-500 dark:text-slate-400">Where Monthly Salary = Basic Salary + Dearness Allowance (DA).</p>

  <h2>Service Year Rounding Rules (The 6-Month Rule)</h2>
  <p>Specific rounding rules apply for incomplete years of service:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>More than 6 additional months (&gt; 6 months, i.e. 7 to 11 months):</strong> The incomplete year is rounded <strong>UP</strong> to the next full year (e.g. 7 years 7 months = 8 eligible years; 8 years 8 months = 9 eligible years).</li>
    <li><strong>6 additional months or less (&le; 6 months, i.e. 0 to 6 months):</strong> The fractional months are discarded (e.g. 7 years 6 months = 7 eligible years).</li>
  </ul>

  <h2>The 5-Year Continuous Service Eligibility Rule &amp; Exceptions</h2>
  <p>Gratuity is legally payable only if an employee has completed <strong>at least 5 years of continuous service</strong> for normal resignation, retirement, or termination. However, this 5-year condition <strong>does NOT apply</strong> in the unfortunate event of death or permanent disability of the employee, where gratuity is payable immediately regardless of tenure.</p>

  <h2>Statutory Tax Exemption Limit</h2>
  <p>Under Section 10(10) of the Income Tax Act, the statutory tax-free exemption limit for gratuity is <strong>₹20,00,000 (₹20 Lakhs)</strong>. Gratuity received up to ₹20 Lakhs is 100% tax-free for covered private sector employees. Any excess amount received is treated as taxable salary income.</p>
</section>`;

  const hiContentHtml = `
<section class="gratuity-content space-y-6">
  <h2>ग्रेच्युटी गणना (Gratuity Calculation) की संपूर्ण मार्गदर्शिका</h2>
  <p>ग्रेच्युटी (Gratuity) कंपनी या नियोक्ता द्वारा अपने कर्मचारियों को लंबी और निरंतर सेवा के सम्मान में दिया जाने वाला एक वैधानिक वित्तीय लाभ है। यह इस्तीफा, सेवानिवृत्ति (रिटायरमेंट), छंटनी या असामयिक मृत्यु/विकलांगता के समय देय होता है।</p>

  <h2>साधारण बनाम उन्नत ग्रेच्युटी कैलकुलेटर (Simple vs Advanced)</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>साधारण कैलकुलेटर:</strong> उन कर्मचारियों के लिए उपयुक्त है जो अपना मासिक वेतन (मूल वेतन + महंगाई भत्ता DA) जानते हैं और केवल सेवा वर्ष दर्ज करके तुरंत ग्रेच्युटी राशि जानना चाहते हैं।</li>
    <li><strong>उन्नत कैलकुलेटर:</strong> इसमें मूल वेतन और DA का अलग विवरण, नौकरी छोड़ने का कारण (इस्तीफा, रिटायरमेंट, मृत्यु या विकलांगता), प्रतिदिन का वेतन, 15 दिनों का वेतन दर और धारा 10(10) के तहत टैक्स छूट की विस्तृत स्थिति देखने को मिलती है।</li>
  </ul>

  <h2>वैधानिक 15/26 दिन का ग्रेच्युटी फॉर्मूला</h2>
  <p>पेमेंट ऑफ ग्रेच्युटी एक्ट के तहत, 26 कार्य दिवसों के आधार पर प्रत्येक पूर्ण सेवा वर्ष के लिए <strong>15 दिनों के वेतन</strong> की दर से ग्रेच्युटी निकाली जाती है:</p>
  <div class="my-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4 font-mono text-sm font-bold text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
    ग्रेच्युटी = (मासिक वेतन × 15 × पात्र सेवा वर्ष) ÷ 26
  </div>
  <p class="text-xs text-slate-500 dark:text-slate-400">जहाँ मासिक वेतन = मूल वेतन (Basic Salary) + महंगाई भत्ता (DA)।</p>

  <h2>सेवा वर्ष राउंड ऑफ करने का 6 महीने का नियम</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>6 महीने से अधिक की सेवा (7 से 11 महीने):</strong> अधूरा वर्ष अगले पूरे वर्ष में राउंड ऑफ (Round UP) हो जाता है। उदाहरण: 7 वर्ष 7 माह = 8 वर्ष; 8 वर्ष 8 माह = 9 वर्ष।</li>
    <li><strong>6 महीने या उससे कम (0 से 6 महीने):</strong> अतिरिक्त महीनों को छोड़ दिया जाता है। उदाहरण: 7 वर्ष 6 माह = 7 वर्ष।</li>
  </ul>

  <h2>5 वर्ष की निरंतर सेवा नियम और अपवाद</h2>
  <p>सामान्य इस्तीफे या रिटायरमेंट पर ग्रेच्युटी तभी मिलती है जब कर्मचारी ने कम से कम <strong>5 वर्ष की निरंतर सेवा</strong> पूरी की हो। लेकिन धारा 4(1) के तहत कर्मचारी की मृत्यु या दुर्घटना/बीमारी से स्थायी विकलांगता होने पर 5 साल की यह शर्त लागू नहीं होती और तुरंत पूरी ग्रेच्युटी दी जाती है।</p>

  <h2>इनकम टैक्स छूट की सीमा (Section 10(10))</h2>
  <p>आयकर अधिनियम की धारा 10(10) के तहत ग्रेच्युटी पर अधिकतम <strong>₹20,00,000 (20 लाख रुपये)</strong> तक की राशि पूरी तरह टैक्स-फ्री होती है। इससे अधिक मिलने वाली रकम पर लागू स्लैब के अनुसार टैक्स लगता है।</p>
</section>`;

  const esContentHtml = `
<section class="gratuity-content space-y-6">
  <h2>Guía Completa para el Cálculo de Gratificación / Indemnización</h2>
  <p>La gratificación por fin de servicio es una compensación legal que abonan los empleadores para recompensar los años de servicio continuo tras renuncia, jubilación, despido o incapacidad.</p>

  <h2>Modalidad Simple vs. Avanzada</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>Calculadora Simple:</strong> Indicada para quienes disponen del salario mensual consolidado y los años y meses de servicio.</li>
    <li><strong>Calculadora Avanzada:</strong> Permite desglosar salario base, complementos salariales, motivo del cese laboral y límites de exención impositiva.</li>
  </ul>

  <h2>Fórmula Legal de 15/26 Días</h2>
  <p>La gratificación legal se liquida calculando 15 días de salario por cada año de servicio completado sobre una base mensual de 26 días laborables:</p>
  <div class="my-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4 font-mono text-sm font-bold text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
    Gratificación = (Salario Mensual × 15 × Años Elegibles) ÷ 26
  </div>

  <h2>Regla del Redondeo de 6 Meses</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li><strong>Más de 6 meses adicionales (7 a 11 meses):</strong> El año incompleto se redondea hacia arriba al año siguiente (ej. 7 años y 7 meses = 8 años computables).</li>
    <li><strong>6 meses o menos (0 a 6 meses):</strong> Los meses adicionales no se redondean (ej. 7 años y 6 meses = 7 años computables).</li>
  </ul>

  <h2>Requisito de 5 Años y Excepciones Legales</h2>
  <p>Se exige un mínimo de 5 años ininterrumpidos en desvinculaciones ordinarias. Dicho plazo de espera queda exento en situaciones de fallecimiento o incapacidad laboral permanente.</p>
</section>`;

  const localizedContentMap = {
    en: enContentHtml,
    hi: hiContentHtml,
    es: esContentHtml
  };

  for (const loc of ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    if (!data[loc]) continue;
    data[loc].faqs = faqs[loc];
    data[loc].contentHtml = localizedContentMap[loc] || enContentHtml.replace(/Complete Guide to Gratuity Calculation/g, `${data[loc].name} Guide`);
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated gratuity-calculator.json across all 9 languages (4 FAQs each).');
}

// ============================================================================
// 2. PPF CALCULATOR
// ============================================================================
function updatePpfCalculator() {
  const file = path.join(dataDir, 'ppf-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const faqs = {
    en: [
      { question: "What is the current PPF interest rate?", answer: "The Government of India revises small savings scheme interest rates quarterly. The benchmark rate is currently 7.1% per annum, compounded annually." },
      { question: "Can I invest monthly instead of once a year in PPF?", answer: "Yes, you can deposit in monthly installments up to 12 times a year (or any number of irregular installments as long as the total does not exceed ₹1,50,000 per financial year)." },
      { question: "Why is depositing before the 5th of the month important?", answer: "Under PPF rules, interest is calculated on the minimum balance between the 5th day and the end of the month. Depositing on or before the 5th qualifies your new money for interest during that calendar month." },
      { question: "Is the entire PPF maturity amount tax-free?", answer: "Yes. PPF falls under the Exempt-Exempt-Exempt (EEE) tax status under the Indian Income Tax Act. Contributions are deductible under Section 80C, interest earned is tax-free, and the final maturity amount is completely exempt from income tax." },
      { question: "Can I extend my PPF account after 15 years?", answer: "Yes, you can extend your PPF account indefinitely in blocks of 5 years at a time, either with additional contributions (requiring Form H within 1 year) or without additional contributions." }
    ],
    hi: [
      { question: "वर्तमान में PPF की ब्याज दर कितनी है?", answer: "भारत सरकार हर तिमाही में छोटी बचत योजनाओं की ब्याज दरों की समीक्षा करती है। वर्तमान में PPF पर 7.1% वार्षिक चक्रवृद्धि ब्याज दिया जा रहा है।" },
      { question: "क्या मैं PPF में सालाना की जगह हर महीने पैसे जमा कर सकता हूँ?", answer: "हाँ, आप एक वित्तीय वर्ष में कुल 1.5 लाख रुपये की सीमा के भीतर हर महीने या जब चाहें किस्त में पैसे जमा कर सकते हैं।" },
      { question: "महीने की 5 तारीख से पहले पैसा जमा करना क्यों जरूरी है?", answer: "PPF नियमों के अनुसार, महीने की 5 तारीख और अंतिम दिन के बीच के न्यूनतम बैलेंस पर उस महीने का ब्याज मिलता है। 5 तारीख तक पैसा जमा करने पर पूरे महीने का ब्याज मिलता है, जबकि 5 तारीख के बाद जमा करने पर उस महीने का ब्याज नहीं मिलता।" },
      { question: "क्या PPF का मैच्योरिटी अमाउंट पूरी तरह टैक्स-फ्री होता है?", answer: "हाँ। PPF को EEE (Exempt-Exempt-Exempt) का दर्जा प्राप्त है। निवेश पर धारा 80C के तहत छूट मिलती है, मिलने वाला ब्याज पूरी तरह टैक्स-फ्री होता है और मैच्योरिटी राशि पर कोई टैक्स नहीं लगता।" },
      { question: "क्या 15 साल बाद PPF खाते को आगे बढ़ाया जा सकता है?", answer: "हाँ, 15 साल पूरे होने पर आप PPF खाते को 5-5 साल के ब्लॉक में जितनी बार चाहें आगे बढ़ा सकते हैं—नए निवेश के साथ (फॉर्म H भरकर) या बिना किसी नए निवेश के।" }
    ],
    es: [
      { question: "¿Cuál es la tasa de interés actual del PPF?", answer: "El Gobierno revisa las tasas trimestralmente. La tasa de referencia actual es del 7,1% anual con capitalización anual." },
      { question: "¿Puedo realizar aportaciones mensuales al fondo?", answer: "Sí, se admiten aportaciones periódicas mensuales o depósitos puntuales hasta el límite anual de ₹1.50.000." },
      { question: "¿Por qué es clave depositar antes del día 5 de cada mes?", answer: "El interés mensual se computa sobre el saldo mínimo existente entre el día 5 y el último día del mes. Aportar antes del día 5 permite generar intereses ese mismo mes." },
      { question: "¿La rentabilidad y el rescate del PPF están exentos de impuestos?", answer: "Sí. Goza de exención fiscal total (estatus EEE: aportaciones deducibles, intereses exentos y capital final libre de impuestos)." },
      { question: "¿Se puede prorrogar la cuenta tras 15 años?", answer: "Sí, es posible prorrogar la cuenta indefinidamente en bloques de 5 años, con o sin aportaciones adicionales." }
    ],
    ja: [
      { question: "現在のPPF利率はいくらですか？", answer: "政府が四半期ごとに見直しを行っており、現在のベンチマーク金利は年利7.1%（年複利）です。" },
      { question: "年1回の積立ではなく毎月積立は可能ですか？", answer: "はい、年間上限額（15万ルピー）の範囲内であれば、毎月または自由なタイミングで分割拠出が可能です。" },
      { question: "なぜ毎月5日より前の入金が重要なのですか？", answer: "各月の利息は5日終了時から月末までの最低残高に対して計算されるため、5日までに入金するとその月全体の利息が付与されます。" },
      { question: "満期時の受取金は完全非課税ですか？", answer: "はい。拠出金控除、運用益非課税、満期受取金非課税の完全非課税（EEEステータス）が適用されます。" },
      { question: "15年の満期後も口座を延長できますか？", answer: "はい。満期後は5年単位のブロックで何回でも口座の延長が可能です。" }
    ],
    fr: [
      { question: "Quel est le taux d'intérêt actuel du PPF ?", answer: "Le taux officiel révisé trimestriellement s'élève actuellement à 7,1 % par an avec capitalisation annuelle." },
      { question: "Peut-on verser mensuellement plutôt qu'annuellement ?", answer: "Oui, les versements peuvent s'effectuer par mensualités dans la limite annuelle légale de 150 000 ₹." },
      { question: "Pourquoi est-il crucial de déposer avant le 5 du mois ?", answer: "Les intérêts mensuels sont calculés sur le solde minimal entre le 5 et le dernier jour du mois." },
      { question: "Le capital perçu à l'échéance est-il totalement exonéré d'impôt ?", answer: "Oui, le régime EEE garantit une exonération fiscale totale des dépôts, des intérêts courus et du capital final." },
      { question: "Peut-on prolonger le compte au-delà de 15 ans ?", answer: "Oui, la prolongation s'effectue par tranches renouvelables de 5 ans, avec ou sans versements nouveaux." }
    ],
    de: [
      { question: "Wie hoch ist der aktuelle PPF-Zinssatz?", answer: "Die Zinssätze werden vierteljährlich überprüft; der Leitzins liegt derzeit bei 7,1 % p.a. mit jährlicher Zinseszinsberechnung." },
      { question: "Kann man monatliche Raten statt einer jährlichen Einzahlung wählen?", answer: "Ja, Einzahlungen können monatlich flexibel bis zur Jahreshöchstgrenze von 150.000 ₹ erfolgen." },
      { question: "Warum ist die Einzahlung vor dem 5. des Monats so wichtig?", answer: "Die Monatszinsen berechnen sich nach dem Mindestguthaben zwischen dem 5. und dem Monatsletzten." },
      { question: "Ist der gesamte Auszahlungsbetrag steuerfrei?", answer: "Ja, der Sparplan unterliegt dem vollständigen EEE-Steuerbefreiungsstatus." },
      { question: "Kann das Sparkonto nach 15 Jahren verlängert werden?", answer: "Ja, das Konto kann in 5-Jahres-Schritten beliebig oft verlängert werden." }
    ],
    pt: [
      { question: "Qual é a taxa de juros atual do PPF?", answer: "A taxa de referência oficial é revista trimestralmente e situa-se atualmente em 7,1% ao ano, capitalizada anualmente." },
      { question: "É possível investir mensalmente em vez de uma vez por ano?", answer: "Sim, são permitidas aplicações mensais dentro do limite legal anual de ₹1.50.000." },
      { question: "Por que depositar antes do dia 5 é fundamental?", answer: "O rendimento mensal incide sobre o menor saldo entre o 5º dia e o final do mês corrente." },
      { question: "O valor final de resgate é isento de impostos?", answer: "Sim, goza do regime de isenção total EEE (contribuições, juros e resgate isentos)." },
      { question: "É possível prorrogar a conta após os 15 anos de carência?", answer: "Sim, a prorrogação pode ser efetuada em blocos de 5 anos sucessivos." }
    ],
    ko: [
      { question: "현재 PPF 공시 이자율은 얼마인가요?", answer: "정부 고시 기준 금리는 현재 연 7.1% (연 복리)가 적용됩니다." },
      { question: "연 1회 일시납 대신 매월 적립식 납입이 가능한가요?", answer: "네, 연간 한도(15만 루피) 내에서 매월 분할 납입이 자유롭게 가능합니다." },
      { question: "매월 5일 이전에 입금해야 하는 이유는 무엇인가요?", answer: "이자가 매월 5일 마감 후부터 말일까지의 최저 잔액을 기준으로 계산되기 때문입니다." },
      { question: "만기 수령액은 전액 비과세인가요?", answer: "네, 납입액 소득공제, 이자소득세 면제, 만기금 비과세(EEE 혜택)가 모두 적용됩니다." },
      { question: "15년 만기 후에도 계좌 연장이 가능한가요?", answer: "네, 5년 단위 블록으로 원하는 만큼 연속 연장할 수 있습니다." }
    ],
    it: [
      { question: "Qual è il tasso di interesse PPF attualmente in vigore?", answer: "Il tasso ufficiale rivisto periodicamente è pari al 7,1% annuo a capitalizzazione annuale." },
      { question: "Posso effettuare versamenti mensili anziché un versamento unico annuo?", answer: "Sì, sono consentiti versamenti rateali mensili entro il limite massimo annuo stabilito." },
      { question: "Perché è fondamentale depositare prima del giorno 5 del mese?", answer: "Gli interessi mensili vengono calcolati sul saldo minimo registrato tra il giorno 5 e la fine del mese." },
      { question: "L'importo alla scadenza è esente da imposte?", answer: "Sì, beneficia del regime fiscale agevolato EEE con esenzione su versamenti, interessi e capitale finale." },
      { question: "Posso prorogare il conto dopo i 15 anni?", answer: "Sì, è possibile estendere la durata a blocchi di 5 anni rinnovabili." }
    ]
  };

  const enContentHtml = `
<section class="ppf-content space-y-6">
  <h2>PPF Interest Calculation Formula and Timing Nuance</h2>
  <p>The Ministry of Finance sets PPF interest rates quarterly. By law, interest is calculated <strong>monthly</strong> on the <strong>lowest balance between the close of the 5th day and the last day of each calendar month</strong>, and then credited annually on March 31.</p>

  <div class="my-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">The Golden Rule: Deposit On or Before the 5th of the Month</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <li><strong>Lump Sum Investors:</strong> Depositing on or before <strong>April 5</strong> ensures your deposit earns compounding interest for all 12 months in the financial year.</li>
      <li><strong>Monthly SIP Investors:</strong> Depositing on or before the <strong>5th of every month</strong> ensures that installment earns interest for that calendar month.</li>
    </ul>
  </div>

  <h2>Annuity Compounding Future Value Formula</h2>
  <p>For equal annual deposits at the beginning of each year, the future value <em>F</em> is determined by:</p>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    F = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i)
  </div>
  <p class="text-xs text-slate-500 dark:text-slate-400">Where <em>P</em> = Annual deposit, <em>i</em> = Annual interest rate (r ÷ 100), and <em>n</em> = Number of years (15 to 30).</p>

  <h2>Comprehensive PPF Calculation Examples</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h4 class="font-bold text-sm text-blue-600 dark:text-blue-400">Example 1: Moderate Saver</h4>
      <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">₹10,000 / Year for 15 Years @ 7.1%</p>
      <ul class="text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-1">
        <li>Total Invested: <strong>₹1,50,000</strong></li>
        <li>Interest Accumulated: <strong class="text-emerald-600">₹1,21,214</strong></li>
        <li>Estimated Maturity Value: <strong>₹2,71,214</strong></li>
      </ul>
    </div>
    <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <h4 class="font-bold text-sm text-emerald-600 dark:text-emerald-400">Example 2: Maximum Section 80C Cap</h4>
      <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">₹1,50,000 / Year for 15 Years @ 7.1%</p>
      <ul class="text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-1">
        <li>Total Invested: <strong>₹22,50,000</strong></li>
        <li>Interest Accumulated: <strong class="text-emerald-600">₹18,18,209</strong></li>
        <li>Estimated Maturity Value: <strong>₹40,68,209</strong></li>
      </ul>
    </div>
  </div>

  <h2>Key PPF Rules, Extensions, and Partial Withdrawals</h2>
  <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
    <li><strong>Deposit Limits:</strong> Minimum ₹500, maximum ₹1,50,000 per financial year.</li>
    <li><strong>15-Year Maturity Extensions:</strong> Can be extended indefinitely in 5-year blocks, either with contributions (requiring Form H) or without new contributions.</li>
    <li><strong>Partial Withdrawals:</strong> Allowed from the 7th financial year onward, capped at 50% of the balance of the 4th preceding year or previous year, whichever is lower.</li>
    <li><strong>Tax Exemption:</strong> EEE (Exempt-Exempt-Exempt) status ensures 100% tax-free growth and maturity.</li>
  </ul>
</section>`;

  for (const loc of ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    if (!data[loc]) continue;
    data[loc].faqs = faqs[loc];
    data[loc].contentHtml = enContentHtml; // Will be styled and resolved cleanly
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated ppf-calculator.json across all 9 languages (5 FAQs each).');
}

// ============================================================================
// 3. SWP CALCULATOR
// ============================================================================
function updateSwpCalculator() {
  const file = path.join(dataDir, 'swp-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const faqs = {
    en: [
      { question: "How is SWP calculated in mutual funds?", answer: "SWP redemptions are processed by redeeming the exact number of mutual fund units corresponding to your requested monthly withdrawal at the prevailing Net Asset Value (NAV). The remaining units continue to generate market returns." },
      { question: "What is an ideal withdrawal rate for an SWP?", answer: "A conservative withdrawal rate of 6% to 8% per annum is widely recommended for hybrid/equity-oriented portfolios. When the withdrawal rate is kept below the expected portfolio return, your corpus can sustain you throughout retirement without premature depletion." },
      { question: "Can I use this calculator for SBI Mutual Fund SWP investments?", answer: "Yes. This calculator is suitable for estimating systematic withdrawals from any mutual fund scheme, including SBI Mutual Fund, HDFC, or ICICI Prudential funds. It allows you to enter your customized initial corpus, expected returns, and inflation expectations." },
      { question: "What happens if my corpus is depleted before the tenure ends?", answer: "If your balance becomes insufficient, the calculator withdraws whatever remaining amount is left in that month, reduces the balance to ₹0, and highlights the exact month and year of depletion so you can adjust your withdrawal target accordingly." },
      { question: "How does inflation impact an SWP?", answer: "Inflation increases living costs every year. In the SWP with Inflation mode, your monthly payout increases annually by the chosen inflation rate, ensuring that your lifestyle is protected over decades of retirement." },
      { question: "What is the difference between Beginning of Month and End of Month SWP?", answer: "In Beginning of Month mode, the withdrawal is deducted at the start of each month, and growth is calculated on the remaining balance. In End of Month mode, growth is calculated on the opening balance first, and the withdrawal is deducted at month-end. End of Month produces a slightly higher ending corpus because funds stay invested longer." }
    ],
    hi: [
      { question: "म्यूचुअल फंड में SWP की गणना कैसे की जाती है?", answer: "SWP में हर महीने आपकी तय राशि के बराबर म्यूचुअल फंड यूनिट्स तत्कालीन NAV पर रिडीम (बेची) की जाती हैं। शेष बची यूनिट्स बाजार में निवेशित रहकर रिटर्न उत्पन्न करती रहती हैं।" },
      { question: "SWP के लिए आदर्श निकासी दर (Withdrawal Rate) क्या है?", answer: "हाइब्रिड या इक्विटी पोर्टफोलियो के लिए 6% से 8% प्रति वर्ष की निकासी दर आदर्श मानी जाती है। जब निकासी दर निवेश के रिटर्न से कम होती है, तो आपका फंड रिटायरमेंट के दौरान कभी खत्म नहीं होता।" },
      { question: "क्या इस कैलकुलेटर का उपयोग SBI म्यूचुअल फंड SWP के लिए किया जा सकता है?", answer: "हाँ। यह किसी भी म्यूचुअल फंड हाउस जैसे SBI म्यूचुअल फंड, HDFC, ICICI प्रूडेंशियल आदि की योजनाओं में SWP की गणना के लिए पूरी तरह उपयुक्त है।" },
      { question: "यदि अवधि पूरी होने से पहले फंड समाप्त हो जाए तो क्या होगा?", answer: "यदि बैलेंस कम हो जाता है, तो कैलकुलेटर शेष बची पूरी रकम निकाल देता है और बैलेंस ₹0 कर देता है। यह ठीक वही महीना और वर्ष दिखाता है जब फंड समाप्त हुआ।" },
      { question: "SWP पर महंगाई (Inflation) का क्या प्रभाव पड़ता है?", answer: "महंगाई हर साल खर्चों को बढ़ा देती है। मुद्रास्फीति-समायोजित मोड में आपकी मासिक निकासी हर साल महंगाई दर के अनुसार बढ़ती है, जिससे जीवन स्तर बरकरार रहता है।" },
      { question: "महीने की शुरुआत (Beginning) और अंत (End) SWP में क्या अंतर है?", answer: "महीने की शुरुआत में निकासी पहले दिन कट जाती है और शेष राशि पर रिटर्न मिलता है। महीने के अंत में पूरे महीने रिटर्न मिलने के बाद निकासी होती है, जिससे अंत में थोड़ा अधिक बैलेंस बचता है।" }
    ],
    es: [
      { question: "¿Cómo se calcula un plan de retiros sistemáticos (SWP)?", answer: "Se rescatan las participaciones exactas necesarias para satisfacer el importe mensual fijado al valor liquidativo (NAV) vigente, mientras el capital restante continúa invertido." },
      { question: "¿Cuál es la tasa de retiro prudente recomendada?", answer: "Se aconseja una tasa de retiro anual conservadora de entre el 6% y el 8% para evitar descapitalizar prematuramente el patrimonio en jubilación." },
      { question: "¿Es compatible con fondos de cualquier gestora?", answer: "Sí, la herramienta es universal e independiente, aplicable a cualquier fondo indexado o gestionado." },
      { question: "¿Qué ocurre si el capital se agota antes del plazo previsto?", answer: "La calculadora liquida el remanente disponible, sitúa el saldo a cero y señala con precisión el mes y año de agotamiento del fondo." },
      { question: "¿Cómo afecta la inflación al plan de retiros?", answer: "La inflación incrementa el coste de la vida. Con la opción de ajuste por inflación, la cuota mensual se actualiza anualmente para mantener el poder adquisitivo." },
      { question: "¿Qué diferencia hay entre retirar a primeros o a finales de mes?", answer: "A primeros de mes el dinero se deduce de inmediato; a finales de mes genera rendimiento durante todo el mes antes del reembolso, acumulando un remanente final algo mayor." }
    ],
    ja: [
      { question: "SWP（定期解約プラン）はどのように計算されますか？", answer: "毎月指定した出金額に相当する投資信託の口数が基準価額（NAV）に基づいて解約され、残りの口数は運用が継続されます。" },
      { question: "理想的な年間取り崩し率は何パーセントですか？", answer: "資産を枯渇させずに老後資金を維持するためには、年6%〜8%程度の保守的な取り崩し率が推奨されます。" },
      { question: "どの運用会社のファンドにも対応していますか？", answer: "はい。特定の運用会社に依存せず、あらゆる投資信託の定期取り崩しシミュレーションに利用可能です。" },
      { question: "期間終了前に資金が枯渇した場合はどうなりますか？", answer: "残高不足になった時点で残額を全額解約して残高を0ルピーとし、資金が尽きる正確な年月を明示します。" },
      { question: "インフレ率は取り崩しにどのような影響を与えますか？", answer: "インフレ調整を有効にすると、物価上昇率に合わせて毎年の月次受取額がステップアップし、実質的な購買力が保護されます。" },
      { question: "月初の取り崩しと月末の取り崩しの違いは何ですか？", answer: "月初取り崩しは当月の初日に出金され、残額で運用益を計算します。月末取り崩しは1か月間満額で運用した後に控除されるため、最終残高がやや高くなります。" }
    ],
    fr: [
      { question: "Comment est calculé un plan de rachat systématique (SWP) ?", answer: "Le système liquide chaque mois le nombre exact de parts correspondant au montant souhaité sur la base de la valeur liquidative courante." },
      { question: "Quel est le taux de retrait annuel recommandé ?", answer: "Un taux de retrait conservateur de 6 % à 8 % par an permet de préserver le capital retraite sur le long terme." },
      { question: "Ce calculateur convient-il à tous les fonds de placement ?", answer: "Oui, il fonctionne avec n'importe quel portefeuille d'investissement ou OPCVM." },
      { question: "Que se passe-t-il si le capital s'épuise avant la fin de la période ?", answer: "Le calculateur verse le reliquat disponible, ramène le solde à zéro et affiche le mois exact d'épuisement." },
      { question: "Quel est l'impact de l'inflation sur les retraits ?", answer: "L'option avec inflation augmente les retraits chaque année pour préserver le pouvoir d'achat face à la hausse des prix." },
      { question: "Quelle est la différence entre un retrait en début ou en fin de mois ?", answer: "Le retrait en fin de mois permet au capital de produire des rendements pendant un mois complet supplémentaire avant déduction." }
    ],
    de: [
      { question: "Wie wird ein systematischen Entnahmeplan (SWP) berechnet?", answer: "Es werden monatlich genau so viele Fondsanteile zum jeweiligen Rücknahmepreis veräußert, wie für den gewünschten Auszahlungsbetrag nötig sind." },
      { question: "Welche Entnahmerate gilt als nachhaltig?", answer: "Eine jährliche Rate von 6 % bis 8 % gilt als ausgewogen, um das Altersvorsorgevermögen dauerhaft zu sichern." },
      { question: "Kann der Rechner für jeden Investmentfonds genutzt werden?", answer: "Ja, die Berechnungslogik ist unabhängig und gilt universell für jeden Wertpapier- oder Mischfonds." },
      { question: "Was geschieht, wenn das Guthaben vorzeitig aufgebraucht ist?", answer: "Der Rechner entnimmt das verbliebene Restguthaben, setzt den Saldo auf null und weist den Monat des Kapitalverzehrs aus." },
      { question: "Welche Rolle spielt die Inflationsanpassung?", answer: "Bei aktivierter Inflationsanpassung steigt die Auszahlung jährlich mit der Teuerungsrate, um die reale Kaufkraft zu erhalten." },
      { question: "Was unterscheidet Auszahlungen am Monatsanfang von solchen am Monatsende?", answer: "Bei Auszahlungen am Monatsende erwirtschaftet das Guthaben zunächst die vollen Monatserträge, was zu einem etwas höheren Endsaldo führt." }
    ],
    pt: [
      { question: "Como funciona o cálculo de um plano de resgate sistemático (SWP)?", answer: "São resgatadas mensalmente as cotas estritamente necessárias para cobrir o valor desejado com base no valor da cota (NAV) do dia." },
      { question: "Qual a taxa anual de retirada mais indicada?", answer: "Recomenda-se uma taxa conservadora de 6% a 8% ao ano para garantir a longevidade do patrimônio." },
      { question: "A ferramenta serve para fundos de qualquer instituição?", answer: "Sim, trata-se de um modelo matemático neutro aplicável a qualquer fundo de investimento." },
      { question: "O que acontece se o saldo acabar antes do prazo estipulado?", answer: "O sistema zera a conta, resgata o saldo residual e indica com exatidão a data em que o patrimônio se esgotou." },
      { question: "Qual o impacto da inflação no plano de retiradas?", answer: "Ajustar pela inflação garante que o montante mensal cresça anualmente, protegendo o custo de vida." },
      { question: "Qual a diferença entre resgate no início ou no fim do mês?", answer: "No fim do mês, o capital rende durante mais um ciclo mensal antes do desconto, gerando saldo final ligeiramente superior." }
    ],
    ko: [
      { question: "펀드 시스템 출금 플랜(SWP)은 어떻게 계산되나요?", answer: "매월 지정한 인출 금액에 해당하는 펀드 좌수를 기준가(NAV)에 맞춰 환매하며, 잔여 좌수는 지속적으로 시장 수익을 창출합니다." },
      { question: "은퇴 포트폴리오의 적정 인출률은 얼마인가요?", answer: "장기적인 원금 보존과 안정적 노후 생활을 위해 연 6%~8% 수준의 보수적인 인출률이 권장됩니다." },
      { question: "모든 자산운용사 펀드에 적용할 수 있나요?", answer: "네, 특정 금융기관에 국한되지 않고 모든 주식형, 채권형, 혼합형 펀드에 공통 적용됩니다." },
      { question: "설정한 기간 이전에 원금이 고갈되면 어떻게 되나요?", answer: "잔액이 부족해지면 남은 잔액 전액을 인출하고 잔고를 0으로 맞춘 뒤, 자금이 고갈된 정확한 시점을 안내합니다." },
      { question: "물가상승률(인플레이션)은 인출에 어떤 영향을 미치나요?", answer: "물가상승 반영 모드에서는 매년 물가상승률만큼 월 인출액이 증액되어 실질적인 구매력을 보존합니다." },
      { question: "월초 인출과 월말 인출의 차이점은 무엇인가요?", answer: "월초 인출은 즉시 차감 후 잔액이 운용되며, 월말 인출은 한 달간 전체 잔액이 운용된 후 차감되므로 최종 잔액이 약간 더 많습니다." }
    ],
    it: [
      { question: "Come funziona il calcolo del piano di disinvestimento programmato (SWP)?", answer: "Ogni mese viene liquidato il numero di quote necessario a coprire l'importo richiesto al valore patrimoniale netto (NAV)." },
      { question: "Qual è il tasso di prelievo annuo ideale?", answer: "Si consiglia un tasso di prelievo prudente tra il 6% e l'8% annuo per evitare l'erosione anticipata del capitale." },
      { question: "È valido per i fondi di qualsiasi istituto finanziario?", answer: "Sì, il modello matematico è universale e utilizzabile con qualunque fondo d'investimento." },
      { question: "Cosa accade se il capitale si esaurisce prima del termine?", answer: "Il calcolatore liquida la quota residua, porta il saldo a zero e specifica il mese esatto di esaurimento del fondo." },
      { question: "Come incide l'inflazione sull'importo prelevato?", answer: "L'adeguamento all'inflazione incrementa annualmente la rata mensile per tutelare il potere d'acquisto reale." },
      { question: "Qual è la differenza tra prelievo a inizio mese o a fine mese?", answer: "Il prelievo a fine mese consente al capitale di maturare rendimenti per un mese intero in più prima del riscatto." }
    ]
  };

  const enContentHtml = `
<section class="swp-content space-y-6">
  <h2>What is a Systematic Withdrawal Plan (SWP)?</h2>
  <p>A Systematic Withdrawal Plan (SWP) allows mutual fund investors to withdraw a pre-determined sum of money at regular intervals (typically monthly) from their accumulated corpus while keeping the remaining balance invested to generate compounding returns.</p>

  <h2>Fixed Withdrawal vs. Inflation-Adjusted Withdrawal</h2>
  <div class="overflow-x-auto my-4">
    <table class="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800">
      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
        <tr>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Feature</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Simple SWP (Fixed)</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">SWP with Inflation</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">Monthly Payout</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Constant throughout the tenure</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Increases once every 12 months by inflation rate</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">Purchasing Power</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Gradually declines due to cost of living</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Preserved against general inflation</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">Corpus Longevity</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Lasts longer due to constant outflow</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Requires higher initial capital or return rate</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Beginning of Month vs. End of Month Timing</h2>
  <ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
    <li><strong>Beginning of Month:</strong> The scheduled withdrawal is deducted at the start of each month, and growth is earned on the remaining balance. Perfect for monthly living expenses and rent.</li>
    <li><strong>End of Month:</strong> The full balance earns returns across the month first, and the withdrawal is deducted at month-end, yielding a slightly higher final corpus.</li>
  </ul>
</section>`;

  for (const loc of ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    if (!data[loc]) continue;
    data[loc].faqs = faqs[loc];
    data[loc].contentHtml = enContentHtml;
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated swp-calculator.json across all 9 languages (6 FAQs each).');
}

// ============================================================================
// 4. XIRR CALCULATOR
// ============================================================================
function updateXirrCalculator() {
  const file = path.join(dataDir, 'xirr-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const faqs = {
    en: [
      { question: "What is the difference between XIRR and IRR?", answer: "IRR assumes that all cash flows occur at strictly equal time intervals (e.g., exactly 1 year apart). XIRR allows each cash flow to occur on any arbitrary calendar date and calculates the exact day difference, making it suitable for real-world investments." },
      { question: "Why can't I use CAGR to evaluate my mutual fund SIP?", answer: "CAGR only considers the first investment date and the final value. In an SIP, you invest fresh capital each month, so each installment has a different holding period. Applying CAGR to an SIP ignores the staggered nature of your capital and produces inaccurate results." },
      { question: "Can XIRR be negative?", answer: "Yes. If the total maturity or current valuation of your investment is less than the cumulative capital invested, the XIRR will be negative, reflecting an annualized portfolio loss." },
      { question: "Does the maturity date include another recurring investment?", answer: "No. Our calculator strictly halts recurring investments once the schedule reaches the maturity date. On the maturity date, only the positive redemption cash flow is recorded." },
      { question: "Is this calculator affiliated with any specific mutual fund house?", answer: "No. This is an independent mathematical tool. It applies standard financial root-finding mathematics to evaluate any mutual fund, stock portfolio, or cash flow schedule." }
    ],
    hi: [
      { question: "XIRR और IRR में क्या अंतर है?", answer: "IRR यह मानकर चलता है कि सभी निवेश समान समय अंतराल (जैसे ठीक 1 वर्ष) पर हुए हैं। जबकि XIRR में प्रत्येक निवेश किसी भी वास्तविक कैलेंडर तिथि पर हो सकता है और यह सटीक दिनों की संख्या के आधार पर वास्तविक रिटर्न निकालता है।" },
      { question: "SIP के लिए CAGR का उपयोग क्यों नहीं किया जा सकता?", answer: "CAGR केवल पहले निवेश और अंतिम मूल्य पर विचार करता है। SIP में आप हर महीने नया पैसा लगाते हैं, इसलिए प्रत्येक किस्त की अवधि अलग होती है। SIP में CAGR लगाने से गलत और भ्रामक परिणाम मिलते हैं।" },
      { question: "क्या XIRR नकारात्मक (Negative) हो सकता है?", answer: "हाँ। यदि आपके निवेश का वर्तमान मूल्य या कुल मैच्योरिटी राशि आपकी कुल जमा पूंजी से कम है, तो XIRR नकारात्मक होगा, जो पोर्टफोलियो के नुकसान को दर्शाता है।" },
      { question: "क्या मैच्योरिटी की तारीख पर भी नई किस्त जमा होती है?", answer: "नहीं। मैच्योरिटी तिथि पर केवल अंतिम निकासी (रिडेम्पशन) की गणना की जाती है, उस दिन कोई नया निवेश नहीं जोड़ा जाता।" },
      { question: "क्या यह कैलकुलेटर किसी विशेष फंड हाउस से जुड़ा है?", answer: "नहीं। यह पूरी तरह स्वतंत्र गणितीय टूल है जिसका उपयोग किसी भी म्यूचुअल फंड, शेयर या निवेश पोर्टफोलियो का रिटर्न निकालने के लिए किया जा सकता है।" }
    ],
    es: [
      { question: "¿Cuál es la diferencia entre XIRR y TIR (IRR)?", answer: "La TIR asume intervalos periódicos estrictamente iguales (ej. anuales). La XIRR permite fechas de calendario reales y arbitrarias para cada flujo de caja." },
      { question: "¿Por qué no se debe usar el CAGR para compras periódicas o SIP?", answer: "El CAGR solo mide entre un único desembolso inicial y el valor final. Al escalonar aportaciones periódicas, cada cuota tiene un período de maduración distinto que solo la XIRR calcula con exactitud." },
      { question: "¿Puede ser negativa la rentabilidad XIRR?", answer: "Sí. Si la valoración actual es inferior al capital total aportado, la XIRR arrojará un porcentaje negativo correspondiente a la pérdida anualizada." },
      { question: "¿Se efectúa otra aportación en la fecha de vencimiento?", answer: "No. En la fecha de vencimiento únicamente se computa el flujo positivo de reembolso o valor final." },
      { question: "¿Es independiente esta calculadora financiera?", answer: "Sí, aplica algoritmos estándar de búsqueda de raíces financieras aplicables a cualquier fondo o inversión." }
    ],
    ja: [
      { question: "XIRRとIRR（内部収益率）の違いは何ですか？", answer: "IRRはキャッシュフローが正確に等間隔（例：1年ごと）で発生することを前提とします。XIRRは実際の日付（カレンダー日）に基づいて日数単位で正確な年率利回りを算出します。" },
      { question: "積立投資（SIP）でCAGRを使ってはいけない理由は何ですか？", answer: "CAGRは最初の一括投資と最終値のみを比較します。毎月積み立てる場合、各拠出金の運用期間が異なるため、XIRRでなければ真の運用成績は測定できません。" },
      { question: "XIRRがマイナスになることはありますか？", answer: "はい。現在の評価額または満期受取額が累計投資元本を下回っている場合、XIRRはマイナス値（年間損失率）となります。" },
      { question: "満期日にも追加の積立投資が発生しますか？", answer: "いいえ。満期日にはプラスの解約金（最終評価額）のみが計上され、新たな積立は行われません。" },
      { question: "この計算機は特定の投資信託会社専用ですか？", answer: "いいえ。特定の金融機関に属さない独立した数学的ツールであり、あらゆる投信や株式ポートフォリオに対応します。" }
    ],
    fr: [
      { question: "Quelle est la différence entre le TRI (IRR) et le TRI.PAIEMENTS (XIRR) ?", answer: "Le TRI classique impose des flux à intervalles réguliers. Le XIRR prend en compte les dates de calendrier réelles et calcule le rendement sur le nombre exact de jours." },
      { question: "Pourquoi ne pas utiliser le TCAC (CAGR) pour un investissement programmé ?", answer: "Le CAGR ne fonctionne que pour un investissement initial unique. Dans un plan de versements réguliers, chaque flux a une durée de détention différente que seul le XIRR mesure avec précision." },
      { question: "Le XIRR peut-il être négatif ?", answer: "Oui, si la valeur actuelle du portefeuille est inférieure au total des capitaux investis, le rendement annualisé sera négatif." },
      { question: "Y a-t-il un versement le jour de l'échéance ?", answer: "Non, à la date finale de maturité, seul le flux positif de rachat total est enregistré." },
      { question: "Ce calculateur est-il indépendant ?", answer: "Oui, c'est un outil mathématique neutre conforme aux standards financiers internationaux." }
    ],
    de: [
      { question: "Was ist der Unterschied zwischen XIRR und dem internen Zinsfuß (IRR)?", answer: "Der IRR setzt exakt gleiche Zeitabstände voraus. XIRR berechnet die Rendite anhand tagesgenauer historischer Kalenderdaten." },
      { question: "Warum eignet sich CAGR nicht für Sparpläne?", answer: "CAGR berücksichtigt nur eine einmalige Anfangsinvestition und den Endwert. Bei fortlaufenden Sparraten hat jede Rate eine andere Laufzeit, was nur XIRR abbilden kann." },
      { question: "Kann der XIRR-Wert negativ sein?", answer: "Ja, wenn der aktuelle Depotwert unter der Summe aller eingezahlten Raten liegt, weist XIRR einen jährlichen Verlust aus." },
      { question: "Findet am Stichtag eine weitere Einzahlung statt?", answer: "Nein, am Fälligkeitstag wird ausschließlich der positive Rückfluss (Depotwert) gebucht." },
      { question: "Ist dieses Rechenwerkzeug bankenunabhängig?", answer: "Ja, es nutzt universelle mathematische Standardverfahren für beliebige Anlageformen." }
    ],
    pt: [
      { question: "Qual a diferença entre XIRR e TIR (Taxa Interna de Retorno)?", answer: "A TIR pressupõe fluxos em intervalos perfeitamente iguais. O XIRR calcula a rentabilidade considerando as datas reais de calendário e o número exato de dias." },
      { question: "Por que não usar o CAGR em investimentos recorrentes?", answer: "O CAGR considera apenas um aporte único. Em aportes mensais, cada parcela permanece investida por um período diferente, exigindo o XIRR." },
      { question: "O XIRR pode ser negativo?", answer: "Sim. Se o montante final for inferior ao total investido, o resultado refletirá a perda anualizada." },
      { question: "Há aporte no dia do resgate final?", answer: "Não, na data de vencimento registra-se apenas o fluxo positivo correspondente ao valor total resgatado." },
      { question: "A calculadora é vinculada a alguma instituição?", answer: "Não, trata-se de um recurso matemático independente." }
    ],
    ko: [
      { question: "XIRR과 일반 IRR(내부수익률)의 차이는 무엇인가요?", answer: "일반 IRR은 현금흐름이 동일한 간격(예: 1년)으로 발생한다고 가정하지만, XIRR은 실제 달력 날짜를 기반으로 일 단위의 정밀한 연환산 수익률을 계산합니다." },
      { question: "적립식 투자에 왜 단순 연평균수익률(CAGR)을 쓰면 안 되나요?", answer: "CAGR은 최초 1회 투자와 최종 결과만 비교합니다. 매월 분할 투자하는 경우 각 납입금마다 거치 기간이 다르므로 XIRR만이 정확한 수익률을 측정할 수 있습니다." },
      { question: "XIRR이 마이너스가 될 수도 있나요?", answer: "네, 원금 손실이 발생하여 평가액이 총 투자 원금에 미치지 못하면 마이너스 연환산 수익률이 산출됩니다." },
      { question: "만기일에도 적립 납입이 추가로 발생하나요?", answer: "아닙니다. 만기일에는 최종 환매 평가액(플러스 현금흐름)만 반영됩니다." },
      { question: "이 계산기는 특정 금융사 전용인가요?", answer: "아닙니다. 모든 펀드, 주식, 금융 상품의 불규칙한 현금흐름에 공통으로 적용 가능한 독립적 도구입니다." }
    ],
    it: [
      { question: "Qual è la differenza tra XIRR e TIR classico?", answer: "Il TIR assume intervalli di tempo identici, mentre XIRR gestisce date di calendario effettive e calcola il rendimento sui giorni esatti." },
      { question: "Perché non usare il CAGR per un piano di accumulo (PAC)?", answer: "Il CAGR misura solo un versamento iniziale e il valore finale. In un PAC ogni rata ha una durata d'investimento differente che solo XIRR calcola fedelmente." },
      { question: "Il rendimento XIRR può essere negativo?", answer: "Sì, se il valore finale è inferiore alla somma dei versamenti, XIRR indicherà la percentuale di perdita annua." },
      { question: "Alla data di scadenza viene addebitato un altro versamento?", answer: "No, alla scadenza viene registrato soltanto l'incasso positivo del capitale accumulato." },
      { question: "Il calcolatore è indipendente?", answer: "Sì, si basa su algoritmos matematici finanziari standard applicabili a qualunque portafoglio." }
    ]
  };

  const enContentHtml = `
<section class="xirr-content space-y-6">
  <h2>Understanding XIRR: Extended Internal Rate of Return</h2>
  <p>XIRR (Extended Internal Rate of Return) is the global gold standard for calculating annualized returns on investments that involve multiple cash inflows and outflows occurring at irregular or recurring calendar dates.</p>

  <h2>XIRR vs. IRR vs. CAGR Comparison</h2>
  <div class="overflow-x-auto my-4">
    <table class="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800">
      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
        <tr>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Metric</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Best Used For</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Cash Flow Support</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">Exact Date Sensitivity</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">CAGR</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">One-time lump sum investment (&gt; 1 year)</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Only initial &amp; final value</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Only total years</td>
        </tr>
        <tr>
          <td class="p-3 font-semibold border border-slate-200 dark:border-slate-800">XIRR</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">SIPs, multiple deposits, irregular cash flows</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Multiple inflows &amp; outflows</td>
          <td class="p-3 border border-slate-200 dark:border-slate-800">Yes (exact calendar dates)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Step-by-Step Example Calculation</h2>
  <p>Consider an investor making three annual installments of ₹10,000 each into an equity fund:</p>
  <ul class="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
    <li>01/01/2021: First installment of -₹10,000</li>
    <li>01/01/2022: Second installment of -₹10,000 (Day 365)</li>
    <li>01/01/2023: Third installment of -₹10,000 (Day 730)</li>
    <li>01/01/2024: Redemption / Maturity of +₹60,000 (Day 1,095)</li>
  </ul>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-xs sm:text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    -10,000 − [10,000 ÷ (1 + r)¹] − [10,000 ÷ (1 + r)²] + [60,000 ÷ (1 + r)³] = 0
  </div>
  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Solving for <em>r</em> yields <strong>XIRR = 38.92% p.a.</strong></p>
</section>`;

  for (const loc of ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    if (!data[loc]) continue;
    data[loc].faqs = faqs[loc];
    data[loc].contentHtml = enContentHtml;
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated xirr-calculator.json across all 9 languages (5 FAQs each).');
}

updateGratuityCalculator();
updatePpfCalculator();
updateSwpCalculator();
updateXirrCalculator();
