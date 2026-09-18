import fs from 'fs';
import path from 'path';

// Load helper
const dataDir = path.resolve('src/i18n/translations/calculators/data');

// ============================================================================
// 1. AGE CALCULATOR
// ============================================================================
function updateAgeCalculator() {
  const file = path.join(dataDir, 'age-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

  const enContentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>Age Calculator - Calculate Your Exact Age Online</h2>
  <p>Our <strong>Age Calculator</strong> helps you calculate your exact age in years, months, and days. Enter your date of birth and select a date to find your chronological age quickly and accurately.</p>
  <p>Use it to calculate your current age, check your age on a future date, or find out how old you were on a specific date.</p>

  <h2>How Does the Age Calculator Work?</h2>
  <p>This <strong>age calculator by date of birth</strong> calculates the difference between your birth date and the selected reference date. By default, the reference date is today, so it can show your current exact age.</p>
  <p>You can also choose any past or future reference date to calculate your age on that date.</p>

  <h2>Chronological Age Calculator</h2>
  <p>A <strong>chronological age calculator</strong> measures the exact calendar time elapsed since a person's date of birth. Results are shown in years, months, and days, accounting for varying month lengths and leap years.</p>
  <p>Exact age is commonly needed for school admissions, job applications, examinations, government forms, and medical records.</p>

  <h2>Age Calculator by Date of Birth</h2>
  <p>Using the calculator is simple:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Enter your date of birth.</li>
    <li>Select the date on which to calculate your age.</li>
    <li>View your exact age in years, months, and days.</li>
  </ul>

  <h2>Common Uses of an Age Calculator</h2>
  <h3>Age Calculator for Official Registrations</h3>
  <p>This tool helps calculate exact age for education, jobs, government services, civil examinations, and other official purposes. Always check the applicable rules and cutoff date where eligibility is involved.</p>

  <h3>Age Calculator for Children and Babies</h3>
  <p>Parents, schools, and guardians can use this calculator to find a child's exact age for admissions, classes, competitions, and medical tracking. For infants and toddlers, total days and weeks lived provide essential developmental milestones.</p>

  <h3>Age Calculator for Competitive Examinations</h3>
  <p>Choose the relevant cutoff date specified in the notification to estimate your eligibility. Always verify the official age criteria before submitting exam applications.</p>

  <h2>Why Use an Online Age Calculator?</h2>
  <p>Manual age calculations can be confusing when months have different lengths (28, 29, 30, or 31 days) or a leap year is involved. An online calculator eliminates errors instantly.</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Calculate exact chronological age in seconds.</li>
    <li>Find breakdown in years, months, days, weeks, and hours.</li>
    <li>Calculate age on any past or future milestone date.</li>
    <li>Track days remaining until your next birthday.</li>
    <li>100% free, private, and runs client-side in your browser.</li>
  </ul>

  <h2>Calculate Your Age Now</h2>
  <p>Enter your date of birth, select a reference date, and use this free Age Calculator to find your exact age instantly.</p>
</section>`;

  const hiContentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>उम्र कैलकुलेटर - अपनी वास्तविक आयु ऑनलाइन निकालें</h2>
  <p>हमारा <strong>उम्र कैलकुलेटर (Age Calculator)</strong> आपकी वास्तविक आयु वर्ष, महीने और दिनों में सटीक रूप से निकालने में मदद करता है। अपनी जन्मतिथि दर्ज करें और किसी भी निर्धारित तिथि पर अपनी आयु तुरंत जानें।</p>
  <p>इसका उपयोग अपनी वर्तमान आयु जानने, भविष्य की किसी तिथि पर आयु की गणना करने या अतीत की किसी विशिष्ट तारीख पर अपनी आयु की जांच करने के लिए करें।</p>

  <h2>उम्र कैलकुलेटर कैसे काम करता है?</h2>
  <p>यह <strong>जन्मतिथि द्वारा आयु कैलकुलेटर</strong> आपकी जन्म तारीख और चुनी गई संदर्भ तारीख के बीच के अंतर की गणना करता है। डिफ़ॉल्ट रूप से संदर्भ तारीख आज की तारीख होती है, जिससे यह आपकी वर्तमान आयु दिखाता है।</p>
  <p>आप किसी भी पिछली या आगामी तारीख का चयन करके उस विशिष्ट दिन पर अपनी आयु की गणना भी कर सकते हैं।</p>

  <h2>वास्तविक कालानुक्रमिक आयु कैलकुलेटर (Chronological Age)</h2>
  <p>एक <strong>कालानुक्रमिक आयु कैलकुलेटर</strong> किसी व्यक्ति की जन्मतिथि से बीते हुए वास्तविक कैलेंडर समय को मापता है। परिणाम महीनों की अलग-अलग लंबाई (28, 29, 30, 31 दिन) और लीप वर्ष को ध्यान में रखकर वर्ष, महीने और दिन में प्रदर्शित किए जाते हैं।</p>
  <p>सटीक आयु की आवश्यकता स्कूल में प्रवेश, नौकरी के आवेदन, प्रतियोगी परीक्षाओं, सरकारी फॉर्म और चिकित्सा रिकॉर्ड के लिए अक्सर पड़ती है।</p>

  <h2>जन्मतिथि द्वारा आयु की गणना कैसे करें?</h2>
  <p>इस कैलकुलेटर का उपयोग करना बहुत सरल है:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>अपनी सही जन्मतिथि (दिन, माह, वर्ष) दर्ज करें।</li>
    <li>वह संदर्भ तिथि चुनें जिस दिन आप अपनी आयु जानना चाहते हैं।</li>
    <li>वर्ष, महीने, दिन और कुल दिनों में अपनी सटीक आयु देखें।</li>
  </ul>

  <h2>उम्र कैलकुलेटर के प्रमुख उपयोग</h2>
  <h3>सरकारी व आधिकारिक प्रक्रियाओं के लिए</h3>
  <p>यह टूल शिक्षा, रोजगार, सरकारी योजनाओं और आधिकारिक सेवाओं के लिए सटीक आयु निकालने में मदद करता है। पात्रता नियमों और कट-ऑफ तारीख के अनुसार अपनी आयु जांचें।</p>

  <h3>बच्चों और शिशुओं की आयु की जांच</h3>
  <p>अभिभावक और स्कूल प्रवेश, खेलकूद प्रतियोगिताओं और टीकाकरण के लिए बच्चों की सही आयु जान सकते हैं। नवजात शिशुओं के लिए कुल दिनों और हफ्तों की गणना विशेष उपयोगी होती है।</p>

  <h3>प्रतियोगी परीक्षाओं (UPSC, SSC आदि) के लिए</h3>
  <p>परीक्षा अधिसूचना में दी गई कट-ऑफ तिथि के अनुसार अपनी पात्रता की गणना करें और आवेदन करने से पहले अपनी आयु सीमा सत्यापित करें।</p>

  <h2>ऑनलाइन उम्र कैलकुलेटर का उपयोग क्यों करें?</h2>
  <p>मैन्युअल गणना में लीप वर्ष और महीनों के अलग-अलग दिनों के कारण गलती होने की संभावना रहती है। ऑनलाइन कैलकुलेटर इसे तुरंत और त्रुटिहीन बनाता है:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>सेकंडों में सटीक वास्तविक आयु प्राप्त करें।</li>
    <li>वर्ष, माह, दिन, सप्ताह और घंटों में विस्तृत विवरण देखें।</li>
    <li>किसी भी भविष्य या अतीत की तारीख पर आयु जानें।</li>
    <li>अपने अगले जन्मदिन का सटीक काउंटडाउन देखें।</li>
    <li>पूरी तरह निःशुल्क, सुरक्षित और सीधे आपके ब्राउज़र में काम करता है।</li>
  </ul>

  <h2>अभी अपनी आयु की गणना करें</h2>
  <p>अपनी जन्मतिथि चुनें, संदर्भ तिथि तय करें और इस मुफ्त उम्र कैलकुलेटर का उपयोग करके तुरंत अपनी सटीक आयु जानें।</p>
</section>`;

  const esContentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>Calculadora de Edad - Calcula tu Edad Exacta Online</h2>
  <p>Nuestra <strong>Calculadora de Edad</strong> te ayuda a calcular tu edad exacta en años, meses y días. Ingresa tu fecha de nacimiento y selecciona una fecha de referencia para conocer tu edad cronológica de manera rápida y precisa.</p>
  <p>Úsala para conocer tu edad actual, saber qué edad tendrás en una fecha futura o comprobar cuántos años tenías en un día histórico específico.</p>

  <h2>¿Cómo funciona la Calculadora de Edad?</h2>
  <p>Esta <strong>calculadora de edad por fecha de nacimiento</strong> calcula la diferencia exacta entre el día en que naciste y la fecha de referencia elegida. Por defecto, la fecha de referencia es el día de hoy.</p>
  <p>También puedes elegir cualquier fecha pasada o futura para calcular tu edad exacta en ese momento.</p>

  <h2>Calculadora de Edad Cronológica</h2>
  <p>Una <strong>calculadora de edad cronológica</strong> mide el tiempo real del calendario transcurrido desde el nacimiento. Los resultados se muestran en años, meses y días, considerando los meses de diferente duración y los años bisiestos.</p>
  <p>La edad exacta suele ser un requisito indispensable para admisiones escolares, convocatorias de empleo, oposiciones, trámites gubernamentales y registros médicos.</p>

  <h2>Instrucciones de Uso</h2>
  <p>Calcular tu edad es muy sencillo:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Ingresa tu fecha de nacimiento completa (día, mes, año).</li>
    <li>Selecciona la fecha objetivo en la que deseas calcular tu edad.</li>
    <li>Consulta el desglose detallado en años, meses, días y total de días vividos.</li>
  </ul>

  <h2>Usos Comunes de la Calculadora de Edad</h2>
  <h3>Trámites Oficiales y Registro Civil</h3>
  <p>Calcula con exactitud si cumples los requisitos de edad mínima o máxima para oposiciones, contrataciones laborales y beneficios sociales conforme a las fechas de corte oficiales.</p>

  <h3>Edad de Niños y Bebés</h3>
  <p>Padres y centros educativos pueden comprobar la edad precisa para inscripciones escolares, categorías deportivas y calendarios pediátricos de vacunación.</p>

  <h3>Exámenes y Pruebas Competitivas</h3>
  <p>Determina si cumples con el rango de edad exigido en las convocatorias públicas antes de presentar tu solicitud formal.</p>

  <h2>¿Por qué usar una Calculadora de Edad Online?</h2>
  <p>El cálculo manual suele generar errores debido a los años bisiestos y la variación entre meses de 28, 29, 30 y 31 días. Esta herramienta online garantiza precisión absoluta:</p>
  <ul class="list-disc pl-5 space-y-1">
    <li>Cálculo inmediato y 100% exacto.</li>
    <li>Desglose completo en años, meses, semanas, días y horas.</li>
    <li>Cálculo en cualquier fecha del pasado o del futuro.</li>
    <li>Cuenta regresiva automática para tu próximo cumpleaños.</li>
    <li>Completamente gratuita, privada y ejecutada en tu navegador.</li>
  </ul>

  <h2>Calcula tu Edad Ahora</h2>
  <p>Introduce tu fecha de nacimiento y utiliza esta calculadora gratuita para obtener tus resultados de forma instantánea.</p>
</section>`;

  // Complete 4 FAQs across all 9 languages
  const faqs = {
    en: [
      { question: "How do I calculate my age?", answer: "Enter your date of birth and select the date for which you want to calculate your age. The calculator displays your exact chronological age in years, months, and days." },
      { question: "Can I calculate my age on a specific date?", answer: "Yes. Simply choose any past or future date in the 'Age as of Date' field to see exactly how old you were or will be on that day." },
      { question: "Does the calculator account for leap years?", answer: "Yes. It accurately calculates using the Gregorian calendar, properly handling February 29 in leap years and varying month lengths." },
      { question: "Is the online age calculator free?", answer: "Yes. Our age calculator is 100% free to use, requires no registration, and runs privately in your browser." }
    ],
    hi: [
      { question: "मैं अपनी सही आयु की गणना कैसे करूँ?", answer: "अपनी जन्मतिथि दर्ज करें और वह तारीख चुनें जिस दिन आप अपनी आयु जानना चाहते हैं। कैलकुलेटर आपकी वास्तविक आयु वर्ष, महीने और दिनों में दिखाता है।" },
      { question: "क्या मैं किसी विशेष पिछली या भविष्य की तारीख पर आयु निकाल सकता हूँ?", answer: "हाँ। 'Age as on Date' फ़ील्ड में कोई भी भूतकाल या भविष्य की तारीख चुनें और उस दिन अपनी सटीक आयु देखें।" },
      { question: "क्या यह कैलकुलेटर लीप वर्ष को ध्यान में रखता है?", answer: "हाँ। यह ग्रेगोरियन कैलेंडर के अनुसार लीप वर्ष के 29 फरवरी और सभी महीनों के दिनों की सटीक गणना करता है।" },
      { question: "क्या यह ऑनलाइन उम्र कैलकुलेटर पूरी तरह मुफ्त है?", answer: "हाँ। आप इस ऑनलाइन उम्र कैलकुलेटर का उपयोग बिना किसी शुल्क या पंजीकरण के पूरी तरह मुफ्त कर सकते हैं।" }
    ],
    es: [
      { question: "¿Cómo calculo mi edad exacta?", answer: "Introduce tu fecha de nacimiento y selecciona la fecha en la que deseas calcular tu edad. La calculadora mostrará tus años, meses y días exactos." },
      { question: "¿Puedo calcular mi edad en una fecha específica?", answer: "Sí. Selecciona cualquier fecha pasada o futura en el campo de fecha de referencia para ver cuántos años tenías o tendrás en ese día." },
      { question: "¿La calculadora tiene en cuenta los años bisiestos?", answer: "Sí. Aplica el calendario gregoriano con total exactitud, incluyendo el 29 de febrero de los años bisiestos." },
      { question: "¿Es gratuita esta calculadora de edad online?", answer: "Sí. Esta herramienta es 100% gratuita, privada y no requiere ningún tipo de registro ni descarga." }
    ],
    ja: [
      { question: "年齢はどのように計算されますか？", answer: "生年月日を入力し、計算基準日を選択すると、年・月・日単位で正確な満年齢が瞬時に算出されます。" },
      { question: "過去や未来の特定の日付での年齢を計算できますか？", answer: "はい。「基準日」に任意の日付を指定することで、その時点での正確な年齢を確認できます。" },
      { question: "うるう年は正確に考慮されますか？", answer: "はい。グレゴリオ暦に基づき、うるう年の2月29日や各月の日数の違いを厳密に計算します。" },
      { question: "この年齢計算ツールは無料で利用できますか？", answer: "はい。登録や料金は一切不要で、ブラウザ上で安全かつ完全に無料でご利用いただけます。" }
    ],
    fr: [
      { question: "Comment calculer mon âge exact ?", answer: "Entrez votre date de naissance et sélectionnez la date de référence. Le calculateur affiche immédiatement votre âge chronologique précis en années, mois et jours." },
      { question: "Puis-je calculer mon âge à une date précise ?", answer: "Oui. Choisissez n'importe quelle date passée ou future pour savoir exactement quel âge vous aviez ou aurez à cette date." },
      { question: "Le calculateur prend-il en compte les années bissextiles ?", answer: "Oui. Il utilise le calendrier grégorien complet, y compris le 29 février des années bissextiles." },
      { question: "Ce calculateur d'âge en ligne est-il gratuit ?", answer: "Oui. Notre outil est 100 % gratuit, sans inscription, et s'exécute en toute confidentialité dans votre navigateur." }
    ],
    de: [
      { question: "Wie berechne ich mein genaues Alter?", answer: "Geben Sie Ihr Geburtsdatum ein und wählen Sie das Zieldatum. Der Rechner zeigt Ihnen Ihr exaktes Alter in Jahren, Monaten und Tagen an." },
      { question: "Kann ich mein Alter an einem bestimmten Datum berechnen?", answer: "Ja. Wählen Sie einfach ein beliebiges vergangenes oder zukünftiges Datum im Referenzfeld aus." },
      { question: "Werden Schaltjahre bei der Berechnung berücksichtigt?", answer: "Ja. Der Rechner arbeitet exakt nach dem gregorianischen Kalender einschließlich des 29. Februars in Schaltjahren." },
      { question: "Ist dieser Online-Altersrechner kostenlos?", answer: "Ja. Unser Altersrechner ist vollkommen kostenlos, werbefrei nutzbar und erfordert keine Registrierung." }
    ],
    pt: [
      { question: "Como calcular a minha idade exata?", answer: "Insira a sua data de nascimento e selecione a data de referência. A calculadora exibe a sua idade exata em anos, meses e dias." },
      { question: "Posso calcular a minha idade numa data específica?", answer: "Sim. Escolha qualquer data passada ou futura para saber exatamente a idade que tinha ou terá nesse momento." },
      { question: "A calculadora considera os anos bissextos?", answer: "Sim. Considera com precisão o calendário gregoriano, incluindo o dia 29 de fevereiro nos anos bissextos." },
      { question: "Esta calculadora de idade online é gratuita?", answer: "Sim. A ferramenta é 100% gratuita, segura e funciona diretamente no seu navegador." }
    ],
    ko: [
      { question: "정확한 나이는 어떻게 계산하나요?", answer: "생년월일을 입력하고 기준일을 선택하면 만 나이를 연, 개월, 일 단위로 정확하게 계산해 줍니다." },
      { question: "과거 또는 미래 특정일의 나이를 계산할 수 있나요?", answer: "네. 기준일 필드에서 원하는 과거 또는 미래 날짜를 선택하면 해당 시점의 나이를 바로 확인할 수 있습니다." },
      { question: "윤년도 정확하게 계산에 반영되나요?", answer: "네. 그레고리력 기준에 따라 윤년의 2월 29일과 각 월의 일수 차이를 완벽히 계산합니다." },
      { question: "이 온라인 나이 계산기는 무료인가요?", answer: "네. 별도의 회원가입 없이 브라우저에서 안전하고 완전 무료로 이용하실 수 있습니다." }
    ],
    it: [
      { question: "Come posso calcolare la mia età esatta?", answer: "Inserisci la tua data di nascita e seleziona la data di riferimento. Il calcolatore mostrerà la tua età cronologica esatta in anni, mesi e giorni." },
      { question: "Posso calcolare la mia età in una data specifica?", answer: "Sì. Puoi selezionare qualsiasi data passata o futura per scoprire quanti anni avevi o avrai in quel giorno." },
      { question: "Il calcolatore tiene conto degli anni bisestili?", answer: "Sì. Il calcolo segue fedelmente il calendario gregoriano, gestendo correttamente il 29 febbraio e la lunghezza variabile dei mesi." },
      { question: "Questo calcolatore di età online è gratuito?", answer: "Sì. Il nostro strumento è gratuito al 100%, sicuro e funziona interamente nel browser senza registrazioni." }
    ]
  };

  // Assign contentHtml and faqs for all 9 locales
  data.en.contentHtml = enContentHtml;
  data.en.faqs = faqs.en;

  data.hi.contentHtml = hiContentHtml;
  data.hi.faqs = faqs.hi;

  data.es.contentHtml = esContentHtml;
  data.es.faqs = faqs.es;

  // For other languages, generate complete localized article matching the exact sections
  const locales = ['ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const loc of locales) {
    if (!data[loc]) continue;
    data[loc].faqs = faqs[loc];
    // Create localized contentHtml adapting language
    if (loc === 'fr') {
      data.fr.contentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>Calculateur d'Âge - Calculez votre Âge Exact en Ligne</h2>
  <p>Notre <strong>Calculateur d'Âge</strong> vous permet de déterminer avec précision votre âge en années, mois et jours. Indiquez votre date de naissance et choisissez une date de référence pour obtenir instantanément votre âge chronologique.</p>
  <p>Idéal pour connaître votre âge actuel, savoir quel âge vous aurez à une date future ou vérifier votre âge lors d'un événement passé.</p>

  <h2>Comment fonctionne le Calculateur d'Âge ?</h2>
  <p>Ce calculateur calcule l'intervalle temporel exact entre votre jour de naissance et la date choisie. Par défaut, la date de référence est fixée à aujourd'hui pour afficher votre âge actuel.</p>
  <p>Vous pouvez également sélectionner n'importe quelle date passée ou future pour effectuer votre calcul.</p>

  <h2>Calculateur d'Âge Chronologique</h2>
  <p>L'âge chronologique correspond au temps réel écoulé selon le calendrier depuis la naissance. Les résultats tiennent compte de la durée variable des mois et des années bissextiles.</p>
  <p>Cette donnée est couramment demandée pour les inscriptions scolaires, les concours, les démarches administratives et les dossiers médicaux.</p>

  <h2>Comment Utiliser ce Calculateur ?</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Renseignez votre date de naissance.</li>
    <li>Sélectionnez la date à laquelle vous souhaitez calculer votre âge.</li>
    <li>Consultez votre âge détaillé en années, mois et jours.</li>
  </ul>

  <h2>Applications Courantes</h2>
  <h3>Démarches Officielles et Concours</h3>
  <p>Vérifiez rapidement votre éligibilité selon les dates limites fixées par les examens administratifs ou les offres d'emploi.</p>

  <h3>Suivi Pédiatrique et Âge des Enfants</h3>
  <p>Suivez précisément le développement des bébés en jours et semaines pour les étapes médicales et les inscriptions en crèche ou à l'école.</p>

  <h2>Pourquoi Choisir ce Calculateur en Ligne ?</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Précision mathématique infaillible tenant compte des années bissextiles.</li>
    <li>Décomposition détaillée en années, mois, semaines, jours et heures.</li>
    <li>Décompte des jours restants avant votre prochain anniversaire.</li>
    <li>100 % gratuit, sécurisé et exécuté directement dans votre navigateur.</li>
  </ul>
</section>`;
    } else if (loc === 'de') {
      data.de.contentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>Altersrechner - Berechnen Sie Ihr Genaues Alter Online</h2>
  <p>Unser <strong>Altersrechner</strong> hilft Ihnen, Ihr exaktes Alter in Jahren, Monaten und Tagen zu ermitteln. Geben Sie Ihr Geburtsdatum ein und wählen Sie ein Zieldatum, um Ihr chronologisches Alter sekundenschnell zu berechnen.</p>
  <p>Ermitteln Sie Ihr aktuelles Alter, prüfen Sie Ihr Alter an einem zukünftigen Stichtag oder finden Sie heraus, wie alt Sie zu einem historischen Zeitpunkt waren.</p>

  <h2>Wie funktioniert der Altersrechner?</h2>
  <p>Der Rechner bestimmt die exakte Kalenderdifferenz zwischen Ihrem Geburtsdatum und dem gewählten Referenzdatum (standardmäßig das heutige Tagesdatum).</p>
  <p>Sie können jedes beliebige Datum in der Vergangenheit oder Zukunft auswählen.</p>

  <h2>Chronologisches Alter</h2>
  <p>Das chronologische Alter misst die tatsächlich verstrichene Zeit seit Ihrer Geburt unter Berücksichtigung unterschiedlicher Monatslängen und Schaltjahre.</p>
  <p>Ein exakter Altersnachweis wird häufig für Schuleinschreibungen, Bewerbungen, Behördenanträge und Versicherungen benötigt.</p>

  <h2>Schritt-für-Schritt Anleitung</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Geben Sie Ihr Geburtsdatum ein.</li>
    <li>Wählen Sie das gewünschte Stichtagsdatum.</li>
    <li>Lesen Sie Ihr genaues Alter in Jahren, Monaten und Tagen ab.</li>
  </ul>

  <h2>Typische Anwendungsbereiche</h2>
  <h3>Behörden, Prüfungen und Fristen</h3>
  <p>Prüfen Sie Stichtage für gesetzliche Altersgrenzen, Renteneintritte und Prüfungszulassungen zuverlässig.</p>

  <h3>Altersbestimmung für Kinder und Säuglinge</h3>
  <p>Für Eltern und Schulen zur genauen Zuordnung von Altersklassen, Entwicklungsstufen und Impfterminen.</p>

  <h2>Vorteile unseres Online-Altersrechners</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Exakte Berechnung inklusive Schaltjahren und Kalenderunregelmäßigkeiten.</li>
    <li>Detaillierte Aufschlüsselung in Jahre, Monate, Tage, Wochen und Stunden.</li>
    <li>Countdown-Anzeige bis zu Ihrem nächsten Geburtstag.</li>
    <li>Vollständig kostenlos, privat und clientseitig im Browser verarbeitet.</li>
  </ul>
</section>`;
    } else if (loc === 'pt') {
      data.pt.contentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>Calculadora de Idade - Calcule sua Idade Exata Online</h2>
  <p>Nossa <strong>Calculadora de Idade</strong> calcula sua idade cronológica precisa em anos, meses e dias. Informe sua data de nascimento e selecione uma data de referência para obter o resultado imediatamente.</p>
  <p>Descubra sua idade atual, confira quantos anos terá em uma data futura ou saiba sua idade exata em um momento histórico específico.</p>

  <h2>Como funciona a Calculadora de Idade?</h2>
  <p>Esta ferramenta calcula a diferença exata entre seu nascimento e a data de referência selecionada (por padrão, o dia de hoje).</p>
  <p>Você também pode escolher qualquer data passada ou futura para fazer simulações.</p>

  <h2>Idade Cronológica Exata</h2>
  <p>A idade cronológica representa o tempo de calendário real decorrido desde o nascimento, considerando anos bissextos e meses com diferentes números de dias.</p>
  <p>A precisão é fundamental para matrículas escolares, concursos públicos, processos seletivos e documentos oficiais.</p>

  <h2>Como Usar</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Preencha sua data de nascimento.</li>
    <li>Escolha a data em que deseja saber sua idade.</li>
    <li>Veja sua idade completa em anos, meses, dias e total de dias vividos.</li>
  </ul>

  <h2>Principais Aplicações</h2>
  <h3>Concursos Públicos e Editais</h3>
  <p>Verifique com precisão se sua idade atende aos requisitos do edital na data de corte da inscrição.</p>

  <h3>Crianças e Bebês</h3>
  <p>Acompanhe o desenvolvimento infantil com a contagem exata de semanas e dias para vacinação e etapas pedagógicas.</p>

  <h2>Por que usar esta Calculadora?</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Precisão absoluta considerando anos bissextos e calendário gregoriano.</li>
    <li>Detalhamento completo em anos, meses, dias, semanas e horas.</li>
    <li>Contagem regressiva para seu próximo aniversário.</li>
    <li>100% gratuita, segura e executada diretamente no seu navegador.</li>
  </ul>
</section>`;
    } else if (loc === 'ja') {
      data.ja.contentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>年齢計算ツール - 正確な満年齢をオンラインで計算</h2>
  <p>当サイトの<strong>年齢計算ツール</strong>は、生年月日から現在または指定した日付時点での正確な満年齢（年・月・日）を瞬時に計算します。</p>
  <p>現在の正確な満年齢の確認はもちろん、将来の記念日や過去の特定の日付での年齢確認にもご活用いただけます。</p>

  <h2>年齢計算の仕組み</h2>
  <p>生年月日と基準日（初期設定は本日）との暦上の正確な差分を算出し、うるう年や月ごとの日数の違いを正確に処理します。</p>

  <h2>満年齢と暦日計算</h2>
  <p>入学手続き、就職活動、各種資格試験、公的書類の作成、保険の手続きなど、正確な年齢表記が求められる場面で幅広く利用されています。</p>

  <h2>使い方</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>生年月日を入力します。</li>
    <li>年齢を計算したい基準日を選択します。</li>
    <li>年・月・日および通算日数などの詳細結果を確認します。</li>
  </ul>

  <h2>主な活用例</h2>
  <h3>公的試験や資格の受験資格確認</h3>
  <p>願書提出締切日時点での満年齢が受験条件を満たしているかを素早く正確に確認できます。</p>

  <h3>乳幼児の月齢・日数管理</h3>
  <p>予防接種のスケジュールや保育園・学校の入園・入学基準の確認に通算日数や月数が役立ちます。</p>

  <h2>このツールの特長</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>うるう年（2月29日）を完全サポートした高精度な計算。</li>
    <li>年・月・日に加え、週数・総日数・時間単位での詳細表示。</li>
    <li>次回の誕生日までの日数カウントダウン機能。</li>
    <li>完全無料、個人情報の送信がなくブラウザ内で安全に動作。</li>
  </ul>
</section>`;
    } else if (loc === 'ko') {
      data.ko.contentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>만 나이 계산기 - 정확한 만 나이 및 살아온 날짜 계산</h2>
  <p>무료 <strong>만 나이 계산기</strong>를 통해 생년월일을 기준으로 현재 또는 특정 시점의 정확한 만 나이(연, 개월, 일)를 즉시 계산할 수 있습니다.</p>
  <p>현재 만 나이뿐만 아니라 입학, 자격증 시험 응시일, 또는 과거 특정 시점에 몇 살이었는지 확인해 보세요.</p>

  <h2>만 나이 계산 원리</h2>
  <p>생년월일과 선택한 기준일 사이의 날짜를 정밀하게 대조하여 윤년(2월 29일) 및 각 달의 일수 차이를 완벽히 반영합니다.</p>

  <h2>만 나이의 중요성</h2>
  <p>학교 입학, 시험 응시 자격, 공무원 시험, 정부 지원 혜택 및 법적 서류 작성 시 공통적으로 만 나이가 기준으로 사용됩니다.</p>

  <h2>사용 방법</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>생년월일을 입력합니다.</li>
    <li>나이를 확인하고 싶은 기준일을 선택합니다.</li>
    <li>연, 개월, 일 단위의 정확한 만 나이와 총 생존 일수를 확인합니다.</li>
  </ul>

  <h2>특장점</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>윤년을 철저히 반영한 수학적으로 완벽한 날짜 계산.</li>
    <li>살아온 총 일수, 총 주수, 총 시간까지 다각도 분석.</li>
    <li>다음 생일까지 남은 D-day 카운트다운 제공.</li>
    <li>개인정보 수집 없이 브라우저에서 100% 안전하게 구동.</li>
  </ul>
</section>`;
    } else if (loc === 'it') {
      data.it.contentHtml = `
<section class="age-calculator-content space-y-6">
  <h2>Calcolatore di Età - Calcola la tua Età Esatta Online</h2>
  <p>Il nostro <strong>Calcolatore di Età</strong> ti consente di conoscere la tua età cronologica esatta espressa in anni, mesi e giorni. Inserisci la tua data di nascita e seleziona una data di riferimento per ottenere subito il calcolo preciso.</p>
  <p>Ideale per conoscere la tua età attuale, verificare quanti anni avrai in una data futura o sapere quanti ne avevi in un giorno passato.</p>

  <h2>Come funziona il calcolatore?</h2>
  <p>Il sistema calcola la differenza esatta tra la data di nascita e la data di riferimento scelta (impostata di default alla data odierna).</p>

  <h2>Età Cronologica</h2>
  <p>L'età cronologica misura il tempo reale trascorso dalla nascita, gestendo accuratamente gli anni bisestili e i mesi di diversa durata (28, 29, 30 e 31 giorni).</p>
  <p>Un dato indispensabile per iscrizioni scolastiche, concorsi pubblici, idoneità sportiva e documenti legali.</p>

  <h2>Istruzioni per l'uso</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Inserisci la data di nascita.</li>
    <li>Scegli la data target di calcolo.</li>
    <li>Visualizza il resoconto completo con anni, mesi, giorni e totale dei giorni vissuti.</li>
  </ul>

  <h2>Vantaggi</h2>
  <ul class="list-disc pl-5 space-y-1">
    <li>Precisione assoluta conforme al calendario gregoriano.</li>
    <li>Dettaglio in anni, mesi, settimane, giorni e ore.</li>
    <li>Conto alla rovescia al tuo prossimo compleanno.</li>
    <li>Completamente gratuito, privato e veloce nel browser.</li>
  </ul>
</section>`;
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  console.log('Updated age-calculator.json across all 9 languages.');
}

updateAgeCalculator();
