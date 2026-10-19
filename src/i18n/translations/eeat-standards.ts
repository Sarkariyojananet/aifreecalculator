/**
 * E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 * Standards, Methodology, Trust Signals, and Technical Limitations
 * Localized across all 9 supported languages (en, hi, es, ja, fr, de, pt, ko, it)
 * aifreecalculator.com
 */

import type { Locale } from '../config';

export interface EEATMethodology {
  title: string;
  badge: string;
  standardName: string;
  description: string;
}

export interface EEATTrustBadge {
  icon: string;
  title: string;
  desc: string;
}

export interface EEATLimitations {
  title: string;
  disclaimer: string;
  technicalNote: string;
  peerReviewNote: string;
  feedbackLinkText: string;
}

export interface EEATData {
  methodology: EEATMethodology;
  trustBadges: EEATTrustBadge[];
  limitations: EEATLimitations;
}

export function getEEATContent(categoryKey: string, locale: Locale): EEATData {
  const normCategory = categoryKey.toLowerCase().replace(/\s+/g, '-');

  switch (locale) {
    case 'hi':
      return getHindiEEAT(normCategory);
    case 'es':
      return getSpanishEEAT(normCategory);
    case 'ja':
      return getJapaneseEEAT(normCategory);
    case 'fr':
      return getFrenchEEAT(normCategory);
    case 'de':
      return getGermanEEAT(normCategory);
    case 'pt':
      return getPortugueseEEAT(normCategory);
    case 'ko':
      return getKoreanEEAT(normCategory);
    case 'it':
      return getItalianEEAT(normCategory);
    case 'en':
    default:
      return getEnglishEEAT(normCategory);
  }
}

// ----------------------------------------------------------------------
// 1. ENGLISH (en)
// ----------------------------------------------------------------------
function getEnglishEEAT(cat: string): EEATData {
  let standardName = 'Standard Mathematical & Scientific Principles';
  let description = 'Computed using verified algebraic formulas, standard Euclidean geometry, and ISO unit conversion constants.';
  let technicalNote = 'Evaluated using standard IEEE 754 floating-point arithmetic. Designed for high accuracy across general and technical workflows.';

  if (cat === 'construction') {
    standardName = 'IS 456:2000, SP 34 & CPWD Standards';
    description = 'Formulas adhere to Indian Standard IS 456:2000 (Plain and Reinforced Concrete - Code of Practice) and SP 34 detailing guidelines. Concrete mix proportions apply nominal ratios with standard 5%–10% cutting, lap length, and site wastage allowances.';
    technicalNote = 'Material quantities serve as preliminary planning estimates and Bill of Quantities (BOQ) preparation. Final structural execution requires certified structural drawings by a licensed civil engineer.';
  } else if (cat === 'finance') {
    standardName = 'Standard Banking Amortization & Indian Income Tax Act';
    description = 'Loan installments apply standard reducing-balance amortization with periodic monthly compounding. Tax calculations incorporate Section 115BAC of the Indian Income Tax Act (New Regime vs. Old Regime deductions), updated quarterly to reflect official budget circulars.';
    technicalNote = 'Estimates are intended for personal budgeting and wealth planning. Actual loan schedules and tax liabilities depend on individual lender terms and official tax assessments.';
  } else if (cat === 'health') {
    standardName = 'WHO Clinical Cutoffs & Mifflin-St Jeor Biometrics';
    description = 'Body Mass Index (BMI) categorizations strictly follow World Health Organization (WHO) international clinical ranges. Basal Metabolic Rate (BMR) models implement clinically validated Mifflin-St Jeor and Revised Harris-Benedict physiological equations.';
    technicalNote = 'Biometric calculations serve as general health and wellness indicators. They do not constitute or replace professional clinical diagnosis, laboratory testing, or medical advice.';
  } else if (cat === 'pdf-tools') {
    standardName = 'ISO 32000-1 Document Architecture';
    description = 'Document manipulation strictly complies with the ISO 32000-1 open standard for PDF files. Operations execute entirely inside your local browser via WebAssembly with zero server-side file transmission.';
    technicalNote = 'File size is limited by available client device memory (recommended under 100MB per file). Encrypted or password-protected PDF files require decryption prior to processing.';
  } else if (cat === 'image-tools') {
    standardName = 'W3C HTML5 Canvas 2D Specification';
    description = 'Image transformations and compression use the official W3C HTML5 Canvas 2D API. Processing runs entirely in browser memory on your GPU/CPU with no external cloud uploads.';
    technicalNote = 'Maximum image dimensions and processing speeds depend on your device’s hardware memory limits. Large RAW formats should be converted to PNG/JPEG before batch optimization.';
  } else if (cat === 'compiler-tools') {
    standardName = 'Sandboxed WebAssembly & JavaScript Runtime';
    description = 'Code is compiled and executed in an isolated, secure client-side sandbox environment, providing instant syntax validation, execution benchmarks, and output inspection.';
    technicalNote = 'Sandboxed execution environment does not allow raw OS system calls, native network socket binding, or persistent local hard disk access.';
  } else if (cat === 'time-table-tools') {
    standardName = 'Chronological Matrix & CSS Paged Media Standard';
    description = 'Timetable grids follow standard chronological scheduling intervals with responsive layout and CSS print media rules for crisp A4/Letter export.';
    technicalNote = 'Schedules are stored temporarily in browser local storage. Download a PDF or print your schedule to preserve a permanent record.';
  }

  return {
    methodology: {
      title: 'Calculation Methodology & Reference Standards',
      badge: 'Verified Standards',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: '100% Client-Side Processing',
        desc: 'All computations and file operations run entirely in your local browser sandbox. Zero data is ever sent to or stored on our servers.',
      },
      {
        icon: '🔓',
        title: 'No Account Required',
        desc: 'Instant, unrestricted access without registration, credit cards, email collection, or sign-up walls.',
      },
      {
        icon: '📐',
        title: 'Published Formulas',
        desc: 'Every tool displays its exact algebraic equation, variable definitions, and step-by-step instructions for transparent verification.',
      },
      {
        icon: '⏱️',
        title: 'Quarterly Review Cycle',
        desc: 'Regularly verified by our engineering team against updated tax provisions, building codes, and web specifications.',
      },
    ],
    limitations: {
      title: 'Technical Limitations & Appropriate Use',
      disclaimer: 'This tool is provided for educational and preliminary planning estimation purposes only.',
      technicalNote,
      peerReviewNote: 'Notice an equation discrepancy or want to suggest a standard update? Our editorial team welcomes peer review.',
      feedbackLinkText: 'Submit Feedback & Peer Review →',
    },
  };
}

// ----------------------------------------------------------------------
// 2. HINDI (hi)
// ----------------------------------------------------------------------
function getHindiEEAT(cat: string): EEATData {
  let standardName = 'मानक गणितीय और वैज्ञानिक सिद्धांत';
  let description = 'सत्यापित बीजगणितीय सूत्रों, यूक्लिडियन ज्यामिति और आईएसओ इकाई रूपांतरण मानकों के अनुसार गणना की जाती है।';
  let technicalNote = 'गणना मानक IEEE 754 फ़्लोटिंग-पॉइंट नियमों का पालन करती है, जो उच्च परिशुद्धता सुनिश्चित करती है।';

  if (cat === 'construction') {
    standardName = 'IS 456:2000, SP 34 और CPWD मानक';
    description = 'निर्माण गणनाएँ भारतीय मानक IS 456:2000 (प्लेन और रीइन्फोर्स्ड कंक्रीट) और SP 34 डिटेलिंग गाइडलाइंस के अनुसार की जाती हैं। कंक्रीट मिक्स में 5%–10% साइट कटिंग और वेस्टेज भत्ता शामिल है।';
    technicalNote = 'सामग्री की गणना प्रारंभिक योजना और बीओक्यू (BOQ) के लिए है। वास्तविक निर्माण से पहले चार्टर्ड सिविल इंजीनियर से अनुमोदन अवश्य लें।';
  } else if (cat === 'finance') {
    standardName = 'बैंकिंग परिशोधन और भारतीय आयकर अधिनियम';
    description = 'ऋण ईएमआई की गणना मासिक चक्रवृद्धि के साथ मानक रिड्यूसिंग-बैलेंस विधि से होती है। आयकर गणना धारा 115BAC (नई बनाम पुरानी कर व्यवस्था) पर आधारित है और बजट घोषणाओं के अनुसार अपडेट होती है।';
    technicalNote = 'परिणाम व्यक्तिगत बजट और वित्तीय योजना के लिए हैं। वास्तविक ब्याज दरें और कर देयता वित्तीय संस्थानों और कर अधिकारियों के नियमों पर निर्भर करती है।';
  } else if (cat === 'health') {
    standardName = 'WHO बीएमआई वर्गीकरण और मिफलिन-सेंट जोर सूत्र';
    description = 'बीएमआई श्रेणियां विश्व स्वास्थ्य संगठन (WHO) के अंतरराष्ट्रीय क्लिनिकल मानकों पर आधारित हैं। बीएमआर गणना मिफलिन-सेंट जोर और संशोधित हैरिस-बेनेडिक्ट सूत्रों द्वारा की जाती है।';
    technicalNote = 'स्वास्थ्य गणनाएँ केवल सामान्य जागरूकता और वेलनेस ट्रैकिंग के लिए हैं। ये किसी चिकित्सक के परामर्श या चिकित्सकीय निदान का विकल्प नहीं हैं।';
  } else if (cat === 'pdf-tools') {
    standardName = 'ISO 32000-1 पीडीएफ मानक';
    description = 'दस्तावेज़ प्रोसेसिंग ISO 32000-1 खुले मानक के अनुरूप है। सभी कार्य वेब असेंबली द्वारा सीधे आपके ब्राउज़र में होते हैं, सर्वर पर कोई फाइल अपलोड नहीं होती।';
    technicalNote = 'फाइल का आकार आपके डिवाइस की रैम पर निर्भर करता है (100MB से कम अनुशंसित)। पासवर्ड-संरक्षित फाइलों को पहले अनलॉक करना आवश्यक है।';
  } else if (cat === 'image-tools') {
    standardName = 'W3C HTML5 कैनवास 2D विनिर्देश';
    description = 'छवि रूपांतरण और संपीड़न आधिकारिक W3C HTML5 Canvas 2D API द्वारा होता है। सभी प्रोसेसिंग 100% स्थानीय मेमोरी में होती है।';
    technicalNote = 'अधिकतम छवि रिज़ॉल्यूशन आपके डिवाइस की ग्राफिक मेमोरी पर निर्भर करता है। बड़ी रॉ फाइलों को पहले जेपीईजी या पीएनजी में बदलें।';
  } else if (cat === 'compiler-tools') {
    standardName = 'सुरक्षित वेब असेंबली और जावास्क्रिप्ट रनटाइम';
    description = 'कोड निष्पादन एक सुरक्षित, पृथक क्लाइंट-साइड सैंडबॉक्स में होता है, जो त्वरित सिंटैक्स सत्यापन और आउटपुट निरीक्षण प्रदान करता है।';
    technicalNote = 'सैंडबॉक्स वातावरण में सिस्टम-स्तरीय नेटवर्क सॉकेट या हार्ड डिस्क तक सीधी पहुंच उपलब्ध नहीं होती है।';
  } else if (cat === 'time-table-tools') {
    standardName = 'कालानुक्रमिक मैट्रिक्स और सीएसएस प्रिंट मीडिया मानक';
    description = 'टाइमटेबल ग्रिड मानक दैनिक और साप्ताहिक समय अंतरालों का पालन करता है और उच्च-गुणवत्ता वाले ए4 प्रिंट निर्यात का समर्थन करता है।';
    technicalNote = 'समय सारिणी ब्राउज़र के स्थानीय स्टोरेज में सुरक्षित रहती है। स्थायी रिकॉर्ड के लिए पीडीएफ डाउनलोड या प्रिंट करें।';
  }

  return {
    methodology: {
      title: 'गणना पद्धति और प्रामाणिक संदर्भ मानक',
      badge: 'सत्यापित मानक',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: '100% क्लाइंट-साइड प्रोसेसिंग',
        desc: 'सभी गणनाएँ और फ़ाइल संचालन सीधे आपके ब्राउज़र में चलते हैं। कोई भी डेटा या फ़ाइल सर्वर पर नहीं भेजी जाती।',
      },
      {
        icon: '🔓',
        title: 'किसी अकाउंट की आवश्यकता नहीं',
        desc: 'बिना किसी पंजीकरण, पासवर्ड या क्रेडिट कार्ड के असीमित और मुफ़्त उपयोग।',
      },
      {
        icon: '📐',
        title: 'पारदर्शी गणितीय सूत्र',
        desc: 'प्रत्येक टूल में समीकरण, चरों की परिभाषा और चरण-दर-चरण निर्देश पारदर्शी रूप से प्रकाशित हैं।',
      },
      {
        icon: '⏱️',
        title: 'त्रैमासिक संपादकीय समीक्षा',
        desc: 'इंजीनियरिंग टीम द्वारा अद्यतन कर नियमों, निर्माण कोड और मानकों के अनुसार नियमित जांच।',
      },
    ],
    limitations: {
      title: 'तकनीकी सीमाएँ और उचित उपयोग',
      disclaimer: 'यह टूल केवल शैक्षिक और प्रारंभिक योजना अनुमान के उद्देश्य से प्रदान किया गया है।',
      technicalNote,
      peerReviewNote: 'क्या आपने कोई विसंगति देखी या मानक में सुधार का सुझाव देना चाहते हैं? हमारी टीम सहकर्मी समीक्षा का स्वागत करती है।',
      feedbackLinkText: 'प्रतिक्रिया और सुधार सुझाव भेजें →',
    },
  };
}

// ----------------------------------------------------------------------
// 3. SPANISH (es)
// ----------------------------------------------------------------------
function getSpanishEEAT(cat: string): EEATData {
  let standardName = 'Principios Matemáticos y Científicos Estándar';
  let description = 'Calculado mediante ecuaciones algebraicas verificadas, geometría euclidiana y factores de conversión ISO.';
  let technicalNote = 'Opera según el estándar IEEE 754 de coma flotante, garantizando alta precisión en cálculos cotidianos y técnicos.';

  if (cat === 'construction') {
    standardName = 'Normas IS 456:2000, SP 34 y Criterios CPWD';
    description = 'Las cantidades siguen las directrices de ingeniería civil IS 456:2000 para hormigón armado y detalles de armadura SP 34, incorporando márgenes de desperdicio del 5% al 10%.';
    technicalNote = 'Las cubicaciones son estimaciones para presupuestos preliminares. La ejecución en obra requiere planos visados por un ingeniero civil colegiado.';
  } else if (cat === 'finance') {
    standardName = 'Amortización Bancaria Progresiva y Ley Tributaria';
    description = 'Aplica el sistema de amortización sobre saldo deudor con capitalización periódica estándar. Las tablas impositivas se revisan trimestralmente según disposiciones oficiales.';
    technicalNote = 'Los valores son proyecciones para planificación financiera personal. Las cuotas finales dependen de las condiciones contractuales de cada entidad bancaria.';
  } else if (cat === 'health') {
    standardName = 'Clasificaciones OMS y Ecuación Mifflin-St Jeor';
    description = 'El IMC se evalúa según los puntos de corte clínicos de la Organización Mundial de la Salud (OMS). El gasto metabólico basal aplica la fórmula de Mifflin-St Jeor.';
    technicalNote = 'Los indicadores tienen fines orientativos de bienestar. No constituyen ni sustituyen un diagnóstico clínico, analítica médica o prescripción facultativa.';
  } else if (cat === 'pdf-tools') {
    standardName = 'Arquitectura de Documentos ISO 32000-1';
    description = 'Cumple estrictamente el estándar abierto ISO 32000-1 para archivos PDF. La manipulación se ejecuta localmente en el navegador mediante WebAssembly sin subida de archivos.';
    technicalNote = 'El tamaño de archivo está limitado por la memoria RAM del dispositivo (se recomienda menos de 100 MB). Los PDF con contraseña deben desbloquearse previamente.';
  } else if (cat === 'image-tools') {
    standardName = 'Especificación W3C HTML5 Canvas 2D';
    description = 'El escalado y la compresión gráfica emplean el motor oficial Canvas 2D de W3C, procesando los píxeles en memoria local sin almacenamiento en la nube.';
    technicalNote = 'Las resoluciones máximas dependen de los límites de hardware de su tarjeta gráfica o procesador.';
  } else if (cat === 'compiler-tools') {
    standardName = 'Entorno de Ejecución Aislado WebAssembly';
    description = 'El código se ejecuta en un entorno sandbox seguro del lado del cliente, ofreciendo verificación inmediata de sintaxis y resultados en milisegundos.';
    technicalNote = 'El entorno seguro no tiene acceso a sockets de red del sistema operativo ni escritura en el disco local.';
  } else if (cat === 'time-table-tools') {
    standardName = 'Matriz Cronológica y Estándar CSS Paged Media';
    description = 'Organización horaria por intervalos estructurados con reglas de medios impresos CSS para exportación en formato A4 o Carta.';
    technicalNote = 'Los horarios se almacenan temporalmente en la memoria local del navegador. Descargue el PDF para conservarlos de forma permanente.';
  }

  return {
    methodology: {
      title: 'Metodología de Cálculo y Estándares de Referencia',
      badge: 'Estándares Verificados',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: 'Procesamiento 100% en el Navegador',
        desc: 'Todos los cálculos y archivos se ejecutan localmente en su dispositivo. Ningún dato viaja ni se almacena en nuestros servidores.',
      },
      {
        icon: '🔓',
        title: 'Sin Registro ni Cuentas',
        desc: 'Acceso inmediato, ilimitado y totalmente gratuito sin necesidad de correos, contraseñas ni suscripciones.',
      },
      {
        icon: '📐',
        title: 'Fórmulas Transparentes',
        desc: 'Publicamos la ecuación matemática exacta, definición de variables y ejemplos prácticos para una comprobación independiente.',
      },
      {
        icon: '⏱️',
        title: 'Revisión Trimestral Continua',
        desc: 'Comprobado periódicamente por nuestro equipo técnico frente a normativas fiscales y estándares de ingeniería actualizados.',
      },
    ],
    limitations: {
      title: 'Limitaciones Técnicas y Uso Responsable',
      disclaimer: 'Esta herramienta se ofrece con fines educativos y de estimación orientativa previa.',
      technicalNote,
      peerReviewNote: '¿Detectó una variación en una fórmula o desea proponer un estándar? Nuestro equipo agradece la revisión técnica.',
      feedbackLinkText: 'Enviar Comentarios y Revisión Técnica →',
    },
  };
}

// ----------------------------------------------------------------------
// 4. JAPANESE (ja)
// ----------------------------------------------------------------------
function getJapaneseEEAT(cat: string): EEATData {
  let standardName = '標準的な数学および科学的計算原理';
  let description = '検証済みの代数方程式、ユークリッド幾何学、およびISO単位換算基準に基づいて算出されます。';
  let technicalNote = 'IEEE 754浮動小数点演算規則に準拠し、日常および専門的な計算で高い数値信頼性を確保しています。';

  if (cat === 'construction') {
    standardName = 'IS 456:2000・SP 34配筋規格および標準損耗率';
    description = '土木建築の配合比および鉄筋重量の算出は、鉄筋コンクリート示方書（IS 456準拠）およびSP 34ガイドラインに基づき、5〜10%の現場損耗・継手余長を見込んで計算されます。';
    technicalNote = '資材数量は事前計画および概算積算用です。実際の施工にあたっては、一級建築士等の有資格者による構造図面の確認が必要です。';
  } else if (cat === 'finance') {
    standardName = '元利均等返済方式および標準税制基準';
    description = 'ローン返済試算には月次複利を伴う標準的な元利均等償還式を採用しています。税額計算は公的通達に基づき定期的に見直されています。';
    technicalNote = '試算結果は個人的な資産計画および予算立ての参考値です。実際の返済額や税額は金融機関や税務当局の正式な決定に従います。';
  } else if (cat === 'health') {
    standardName = 'WHO基準およびMifflin-St Jeor基礎代謝推定式';
    description = 'BMI判定は世界保健機関（WHO）の国際臨床区分に準拠しています。基礎代謝量（BMR）は学術的に検証されたMifflin-St Jeor式を用いて算出します。';
    technicalNote = '本計算結果は健康意識向上のための目安であり、医師による診断、臨床検査、医学的助言に代わるものではありません。';
  } else if (cat === 'pdf-tools') {
    standardName = 'ISO 32000-1 文書構造規格';
    description = 'PDFファイルの処理は国際オープン規格ISO 32000-1に完全準拠しています。WebAssemblyによりブラウザ内で完結し、サーバーへのファイル送信はありません。';
    technicalNote = '処理可能なファイルサイズはお使いの端末の空きメモリに依存します（100MB以下を推奨）。パスワード保護されたファイルは事前に解除してください。';
  } else if (cat === 'image-tools') {
    standardName = 'W3C HTML5 Canvas 2D 仕様';
    description = '画像変換および圧縮はW3C公式のHTML5 Canvas 2D APIを利用し、外部クラウドを介さず端末メモリ内で完結します。';
    technicalNote = '最大解像度はお使いの端末のGPUおよびブラウザのメモリ制限に依存します。';
  } else if (cat === 'compiler-tools') {
    standardName = '安全なWebAssembly / JavaScript実行環境';
    description = 'コードは隔離された安全なブラウザ内サンドボックスで即座に実行され、構文エラーの検証と実行結果の確認が行えます。';
    technicalNote = 'サンドボックス環境のため、OSのシステムコール、未許可のネットワーク通信、ローカルディスクへの直接保存は制限されています。';
  } else if (cat === 'time-table-tools') {
    standardName = '時間割マトリクスおよびCSS印刷メディア標準';
    description = '整然とした時間帯別レイアウトと、A4サイズ等での高精細な印刷・PDF出力に対応したCSSメディア設計を採用しています。';
    technicalNote = '作成データはブラウザのローカルメモリに一時保存されます。恒久的な保管にはPDF保存または印刷を行ってください。';
  }

  return {
    methodology: {
      title: '計算方法論および準拠標準規格',
      badge: '検証済み標準規格',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: '100% ブラウザ完結処理',
        desc: 'すべての数値計算やファイル処理はお手元のブラウザ内で安全に完結します。データが外部サーバーへ送信されることは一切ありません。',
      },
      {
        icon: '🔓',
        title: '会員登録・ログイン不要',
        desc: 'メールアドレスの登録やクレジットカード情報の入力なしで、すべての機能を完全無料・無制限でご利用いただけます。',
      },
      {
        icon: '📐',
        title: '透明性の高い数式公開',
        desc: '計算に使用している数学的方程式、変数定義、計算手順を明記しており、誰でも計算根拠を確認できます。',
      },
      {
        icon: '⏱️',
        title: '定期的な四半期レビュー',
        desc: '法改正、税制見直し、最新の技術仕様に合わせて、開発チームが定期的にアルゴリズムの健全性を点検しています。',
      },
    ],
    limitations: {
      title: '技術的な利用制限と適切な活用法',
      disclaimer: '本ツールは学習および事前検討用の概算シミュレーションとして提供されています。',
      technicalNote,
      peerReviewNote: '数式の改善点や規格に関するご指摘がございましたら、専門家の皆様からのレビューを歓迎いたします。',
      feedbackLinkText: 'ご意見・フィードバックを送信する →',
    },
  };
}

// ----------------------------------------------------------------------
// 5. FRENCH (fr)
// ----------------------------------------------------------------------
function getFrenchEEAT(cat: string): EEATData {
  let standardName = 'Principes Mathématiques et Scientifiques Établis';
  let description = 'Calculs réalisés selon des équations algébriques éprouvées, la géométrie euclidienne et les constantes de conversion ISO.';
  let technicalNote = 'Précision garantie selon la norme IEEE 754 sur les nombres à virgule flottante pour un usage courant et professionnel.';

  if (cat === 'construction') {
    standardName = 'Normes IS 456:2000, SP 34 et Ratios BTP';
    description = 'Les calculs de béton armé et d’acier suivent les directives techniques IS 456:2000 et SP 34, intégrant une marge de perte standard de 5% à 10% pour la coupe et les recouvrements.';
    technicalNote = 'Les quantités fournies sont des estimations pour devis quantitatifs préliminaires. La mise en œuvre exige la validation d’un ingénieur structure agréé.';
  } else if (cat === 'finance') {
    standardName = 'Amortissement Bancaire et Fiscalité Standard';
    description = 'Les échéances de crédit appliquent l’amortissement à annuités constantes sur capital restant dû avec capitalisation périodique. Les barèmes fiscaux sont révisés trimestriellement.';
    technicalNote = 'Ces simulations constituent des aides à la décision budgétaire. Les conditions définitives relèvent des contrats émis par les organismes de crédit et administrations fiscales.';
  } else if (cat === 'health') {
    standardName = 'Classifications OMS et Équation Mifflin-St Jeor';
    description = 'L’IMC est évalué selon les intervalles cliniques de l’Organisation Mondiale de la Santé (OMS). Le métabolisme de base applique la formule validée de Mifflin-St Jeor.';
    technicalNote = 'Ces calculs sont des repères de bien-être général. Ils ne remplacent en aucun cas une consultation médicale, un bilan biologique ou un diagnostic professionnel.';
  } else if (cat === 'pdf-tools') {
    standardName = 'Architecture Documentaire ISO 32000-1';
    description = 'Les opérations sur fichiers PDF respectent rigoureusement la norme ouverte ISO 32000-1. Le traitement s’effectue localement via WebAssembly sans transfert de fichier.';
    technicalNote = 'La taille maximale dépend de la mémoire vive de votre appareil (recommandé moins de 100 Mo). Les fichiers verrouillés doivent être déchiffrés au préalable.';
  } else if (cat === 'image-tools') {
    standardName = 'Spécification W3C HTML5 Canvas 2D';
    description = 'Le redimensionnement et l’optimisation graphique exploitent le moteur W3C Canvas 2D, garantissant une exécution intégrale dans la mémoire locale de votre navigateur.';
    technicalNote = 'Les dimensions maximales admissibles dépendent de la mémoire graphique de votre système.';
  } else if (cat === 'compiler-tools') {
    standardName = 'Environnement Sandbox WebAssembly & JavaScript';
    description = 'Le code s’exécute dans un bac à sable client sécurisé et isolé, fournissant une validation syntaxique immédiate et des mesures d’exécution en temps réel.';
    technicalNote = 'L’environnement sécurisé n’autorise pas les appels système vers le réseau externe ou l’écriture directe sur le disque dur local.';
  } else if (cat === 'time-table-tools') {
    standardName = 'Grille Chronologique et Standard CSS Paged Media';
    description = 'Planification structurée par tranches horaires avec règles de mise en page CSS pour une impression ou exportation PDF nette en A4.';
    technicalNote = 'Les données sont conservées temporairement dans le stockage local de votre navigateur. Téléchargez le PDF pour un enregistrement pérenne.';
  }

  return {
    methodology: {
      title: 'Méthodologie de Calcul et Normes de Référence',
      badge: 'Normes Vérifiées',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: 'Traitement 100% Côté Client',
        desc: 'Tous les calculs et traitements de fichiers s’exécutent dans votre navigateur. Aucune donnée n’est transmise ni stockée sur nos serveurs.',
      },
      {
        icon: '🔓',
        title: 'Sans Inscription ni Compte',
        desc: 'Accès libre, instantané et gratuit sans création de compte, sans carte bancaire et sans barrière de connexion.',
      },
      {
        icon: '📐',
        title: 'Formules Publiées et Vérifiables',
        desc: 'Chaque outil présente son équation explicite, la définition des variables et des exemples pratiques détaillés.',
      },
      {
        icon: '⏱️',
        title: 'Cycle de Révision Trimestrielle',
        desc: 'Contrôlé régulièrement par notre équipe technique pour intégrer les évolutions réglementaires et normatives.',
      },
    ],
    limitations: {
      title: 'Limites Techniques et Utilisation Appropriée',
      disclaimer: 'Cet outil est fourni à des fins pédagogiques et d’estimation préliminaire.',
      technicalNote,
      peerReviewNote: 'Vous constatez un écart de formule ou souhaitez proposer une amélioration ? Nous encourageons l’examen par les pairs.',
      feedbackLinkText: 'Transmettre un Retour Technique →',
    },
  };
}

// ----------------------------------------------------------------------
// 6. GERMAN (de)
// ----------------------------------------------------------------------
function getGermanEEAT(cat: string): EEATData {
  let standardName = 'Mathematische und Wissenschaftliche Grundsätze';
  let description = 'Berechnet auf Grundlage anerkannter algebraischer Formeln, euklidischer Geometrie und internationaler ISO-Einheiten.';
  let technicalNote = 'Berechnung gemäß IEEE 754 Gleitkommastandard für zuverlässige Präzision bei alltäglichen und technischen Aufgaben.';

  if (cat === 'construction') {
    standardName = 'IS 456:2000, SP 34 und Baustoff-Normen';
    description = 'Stahlbeton- und Materialbedarfsberechnungen orientieren sich an anerkannten technischen Richtlinien (IS 456 / SP 34) mit pauschal 5% bis 10% Verschnitt- und Überlappungszuschlag.';
    technicalNote = 'Materialmengen dienen als Orientierungswerte für Vorkalkulation und Materialbestellung. Die statische Freigabe erfordert geprüfte Pläne eines qualifizierten Tragwerksplaners.';
  } else if (cat === 'finance') {
    standardName = 'Annuitätentilgung und Gesetzliche Steuertarife';
    description = 'Kredittilgungen berechnen sich nach der banküblichen Annuitätenmethode mit periodischer Zinsverrechnung. Steuerberechnungen werden vierteljährlich überprüft.';
    technicalNote = 'Ergebnisse sind Orientierungshilfen für die persönliche Finanzplanung. Verbindliche Raten und Steuerbescheide obliegen Kreditinstituten und Finanzbehörden.';
  } else if (cat === 'health') {
    standardName = 'WHO-Klassifikationen und Mifflin-St-Jeor-Formel';
    description = 'Der Body-Mass-Index (BMI) folgt den offiziellen Schwellenwerten der Weltgesundheitsorganisation (WHO). Der Grundumsatz (BMR) wird nach der klinisch validierten Mifflin-St-Jeor-Gleichung ermittelt.';
    technicalNote = 'Die Werte dienen der allgemeinen Orientierung und ersetzen keinesfalls eine ärztliche Diagnose, Laboranalysen oder medizinische Beratung.';
  } else if (cat === 'pdf-tools') {
    standardName = 'ISO 32000-1 Dokumentenarchitektur';
    description = 'Die Bearbeitung erfolgt strikt nach dem offenen Standard ISO 32000-1 für PDF-Dokumente. Alle Prozesse laufen clientseitig via WebAssembly ohne Serverübertragung ab.';
    technicalNote = 'Die Dateigröße hängt vom verfügbaren Arbeitsspeicher Ihres Endgeräts ab (unter 100 MB empfohlen). Passwortgeschützte PDFs müssen zuvor entsperrt werden.';
  } else if (cat === 'image-tools') {
    standardName = 'W3C HTML5 Canvas 2D Spezifikation';
    description = 'Bildskalierung und -kompression nutzen die offizielle W3C Canvas 2D API im Arbeitsspeicher Ihres Browsers ohne externe Cloud-Verarbeitung.';
    technicalNote = 'Maximale Auflösungen hängen von der Speicherausstattung Ihrer Grafikhardware ab.';
  } else if (cat === 'compiler-tools') {
    standardName = 'Sichere WebAssembly- und JavaScript-Sandbox';
    description = 'Code wird in einer isolierten Browser-Sandbox ausgeführt, die unmittelbare Syntaxprüfungen und Laufzeitanalysen ermöglicht.';
    technicalNote = 'Aus Sicherheitsgründen sind direkte Systemaufrufe ins Netzwerk oder Schreibzugriffe auf die lokale Festplatte unterbunden.';
  } else if (cat === 'time-table-tools') {
    standardName = 'Zeitmatrix und CSS Paged Media Druckstandard';
    description = 'Strukturierte Stundenplangestaltung mit optimierten Druckstilen für den sauberen A4-Export.';
    technicalNote = 'Pläne werden im lokalen Speicher des Browsers zwischengespeichert. Für eine dauerhafte Sicherung drucken oder exportieren Sie die Datei als PDF.';
  }

  return {
    methodology: {
      title: 'Berechnungsmethodik und Referenzstandards',
      badge: 'Geprüfte Standards',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: '100% Lokale Browser-Ausführung',
        desc: 'Alle Berechnungen und Dateioperationen laufen ausschließlich lokal auf Ihrem Gerät. Es werden keine Daten an Server übertragen.',
      },
      {
        icon: '🔓',
        title: 'Kein Benutzerkonto Erforderlich',
        desc: 'Sofortiger, unbegrenzter Zugang ohne Registrierung, Passwörter oder Zahlungsangaben.',
      },
      {
        icon: '📐',
        title: 'Vollständige Formeltransparenz',
        desc: 'Auf jeder Seite werden die mathematische Formel, Variablenerklärungen und ein Schritt-für-Schritt-Rechenbeispiel offengelegt.',
      },
      {
        icon: '⏱️',
        title: 'Vierteljährliche Qualitätssicherung',
        desc: 'Regelmäßige Überprüfung unserer Rechenkerne gegen aktuelle gesetzliche und technische Änderungen.',
      },
    ],
    limitations: {
      title: 'Technische Grenzen und Sachgerechte Nutzung',
      disclaimer: 'Dieses Werkzeug dient ausschließlich informativen Zwecken und vorläufigen Schätzungen.',
      technicalNote,
      peerReviewNote: 'Haben Sie eine Formelabweichung festgestellt oder möchten Sie eine Anpassung vorschlagen? Wir freuen uns über fachliches Feedback.',
      feedbackLinkText: 'Fachliches Feedback Einreichen →',
    },
  };
}

// ----------------------------------------------------------------------
// 7. PORTUGUESE (pt)
// ----------------------------------------------------------------------
function getPortugueseEEAT(cat: string): EEATData {
  let standardName = 'Princípios Matemáticos e Científicos Reconhecidos';
  let description = 'Cálculos realizados com equações algébricas comprovadas, geometria euclidiana e fatores de conversão ISO.';
  let technicalNote = 'Opera em conformidade com o padrão IEEE 754 de ponto flutuante para garantir precisão e estabilidade numéricas.';

  if (cat === 'construction') {
    standardName = 'Normas IS 456:2000, SP 34 e Consumos de Engenharia';
    description = 'As estimativas de aço e concreto armado baseiam-se em diretrizes de cálculo estrutural reconhecidas (IS 456 / SP 34), prevendo margem de 5% a 10% para corte e perdas.';
    technicalNote = 'Os quantitativos são indicativos para planejamento e orçamento preliminar. A construção exige projeto estrutural assinado por engenheiro habilitado.';
  } else if (cat === 'finance') {
    standardName = 'Amortização Financeira e Legislação Tributária';
    description = 'As parcelas de empréstimo utilizam amortização progressiva sobre saldo devedor com capitalização periódica. Tabelas fiscais são revisadas trimestralmente.';
    technicalNote = 'Valores simulados servem ao planejamento orçamentário pessoal. Condições definitivas dependem de contratos bancários e órgãos fiscais.';
  } else if (cat === 'health') {
    standardName = 'Classificações OMS e Fórmula de Mifflin-St Jeor';
    description = 'O IMC é classificado segundo as faixas de corte da Organização Mundial da Saúde (OMS). O gasto energético basal aplica a fórmula de Mifflin-St Jeor.';
    technicalNote = 'Os resultados são indicativos de bem-estar geral e não substituem diagnóstico médico, exames laboratoriais ou aconselhamento profissional.';
  } else if (cat === 'pdf-tools') {
    standardName = 'Arquitetura de Documentos ISO 32000-1';
    description = 'Manipulação compatível com o padrão ISO 32000-1 para arquivos PDF. Processamento 100% no navegador via WebAssembly sem envio de dados a servidores.';
    technicalNote = 'O tamanho dos arquivos suportados depende da memória RAM do seu aparelho (recomendado até 100 MB). Arquivos com senha devem ser desbloqueados previamente.';
  } else if (cat === 'image-tools') {
    standardName = 'Especificação W3C HTML5 Canvas 2D';
    description = 'O redimensionamento e a compressão utilizam a API oficial Canvas 2D do W3C, operando diretamente na memória local do navegador.';
    technicalNote = 'Resoluções máximas dependem dos limites de aceleração de hardware do seu dispositivo.';
  } else if (cat === 'compiler-tools') {
    standardName = 'Ambiente Seguro WebAssembly / JavaScript';
    description = 'O código é compilado e executado em sandbox isolada no cliente, oferecendo validação rápida de sintaxe e inspeção de saída em tempo real.';
    technicalNote = 'O ambiente isolado não permite conexões diretas de rede nem gravação irrestrita no disco local.';
  } else if (cat === 'time-table-tools') {
    standardName = 'Grade Cronológica e Padrão CSS Paged Media';
    description = 'Estruturação por intervalos horários com regras de impressão CSS para exportação nítida em A4.';
    technicalNote = 'Os horários ficam salvos na memória do seu navegador. Baixe o PDF para manter uma cópia permanente.';
  }

  return {
    methodology: {
      title: 'Metodologia de Cálculo e Normas de Referência',
      badge: 'Normas Verificadas',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: 'Processamento 100% no Navegador',
        desc: 'Todos os cálculos e manipulações de arquivo rodam localmente no seu dispositivo. Nenhum dado é enviado ou guardado em nossos servidores.',
      },
      {
        icon: '🔓',
        title: 'Sem Necessidade de Cadastro',
        desc: 'Acesso imediato, gratuito e irrestrito sem exigência de e-mail, senha ou dados de pagamento.',
      },
      {
        icon: '📐',
        title: 'Fórmulas Transparentes',
        desc: 'Apresentamos a equação exata, explicação das variáveis e passo a passo detalhado para verificação independente.',
      },
      {
        icon: '⏱️',
        title: 'Revisão Trimestral Contínua',
        desc: 'Auditoria periódica realizada por nossa equipe técnica perante atualizações normativas e fiscais.',
      },
    ],
    limitations: {
      title: 'Limitações Técnicas e Uso Responsável',
      disclaimer: 'Esta ferramenta é disponibilizada para fins educacionais e de estimativa preliminar.',
      technicalNote,
      peerReviewNote: 'Notou alguma discrepância na fórmula ou deseja sugerir uma norma técnica? Valorizamos a revisão por especialistas.',
      feedbackLinkText: 'Enviar Feedback Técnico →',
    },
  };
}

// ----------------------------------------------------------------------
// 8. KOREAN (ko)
// ----------------------------------------------------------------------
function getKoreanEEAT(cat: string): EEATData {
  let standardName = '공인 수학 및 과학적 연산 원리';
  let description = '검증된 대수학 공식, 유클리드 기하학 및 ISO 단위 변환 표준에 근거하여 정확하게 연산합니다.';
  let technicalNote = 'IEEE 754 부동소수점 표준 규격을 준수하여 일상 및 기술 작업에서 신뢰할 수 있는 계산 결과를 제공합니다.';

  if (cat === 'construction') {
    standardName = 'IS 456:2000·SP 34 철근 배근 기준 및 손실률';
    description = '철근콘크리트 배합 및 철근량 산출은 IS 456 및 SP 34 시방서 지침을 적용하며, 5%~10%의 현장 할증 및 이음 손실률을 반영합니다.';
    technicalNote = '산출된 자재 수량은 사전 예산 및 물량 내역서 작성을 위한 추정치입니다. 실제 시공 전 공인 토목·구조 엔지니어의 구조도면 승인이 필요합니다.';
  } else if (cat === 'finance') {
    standardName = '원리금균등분할상환 공식 및 표준 세법 규정';
    description = '대출 이자 및 상환 일정은 월복리 원리금균등분할상환 공식을 적용합니다. 세금 계산은 최신 세법 고시를 반영하여 분기별로 검토됩니다.';
    technicalNote = '결과는 개인 재무 설계 및 예산 편성을 위한 참고용입니다. 실제 금리 및 세액은 금융기관 및 과세당국의 규정에 따릅니다.';
  } else if (cat === 'health') {
    standardName = 'WHO 임상 기준 및 Mifflin-St Jeor 대사량 공식';
    description = 'BMI 수치는 세계보건기구(WHO) 국제 임상 기준에 따라 판정되며, 기초대사량(BMR)은 학술적으로 입증된 Mifflin-St Jeor 공식을 적용합니다.';
    technicalNote = '본 지표는 건강 관리 참고용이며 전문의의 진단, 임상 병리 검사 또는 치료 처방을 대신하지 않습니다.';
  } else if (cat === 'pdf-tools') {
    standardName = 'ISO 32000-1 문서 구조 표준';
    description = 'PDF 문서 처리는 ISO 32000-1 표준을 엄격히 준수합니다. WebAssembly 기술을 통해 기기 내부에서 실행되며 서버로 파일을 업로드하지 않습니다.';
    technicalNote = '처리 가능 용량은 기기의 RAM 용량에 따릅니다(100MB 이하 권장). 비밀번호가 설정된 문서는 사전에 해제해야 합니다.';
  } else if (cat === 'image-tools') {
    standardName = 'W3C HTML5 Canvas 2D 규격';
    description = '이미지 압축 및 크기 조절은 W3C 공식 Canvas 2D API를 활용하여 외부 클라우드 전송 없이 브라우저 메모리에서 100% 실행됩니다.';
    technicalNote = '최대 처리 해상도는 기기의 그래픽 가속 및 메모리 한도에 영향을 받습니다.';
  } else if (cat === 'compiler-tools') {
    standardName = '안전한 WebAssembly 및 JavaScript 샌드박스';
    description = '격리된 클라이언트 샌드박스 환경에서 코드를 즉각 컴파일하고 실행하여 빠른 문법 검증과 결과 확인을 지원합니다.';
    technicalNote = '샌드박스 환경에서는 시스템 소켓 통신이나 로컬 하드 디스크 접근이 안전하게 제한됩니다.';
  } else if (cat === 'time-table-tools') {
    standardName = '시간대별 매트릭스 및 CSS 인쇄 미디어 표준';
    description = '시간대별 일정표 구성과 A4 규격에 맞춘 고해상도 인쇄 및 PDF 저장을 지원하는 CSS 미디어 설계를 적용했습니다.';
    technicalNote = '일정 데이터는 브라우저 로컬 저장소에 보관됩니다. 영구 보관을 위해 PDF로 다운로드하거나 인쇄해 두세요.';
  }

  return {
    methodology: {
      title: '산출 방법론 및 공인 표준 규격',
      badge: '검증된 기술 표준',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: '100% 브라우저 로컬 처리',
        desc: '모든 수치 연산 및 파일 작업은 사용자의 기기 내부에서 안전하게 실행됩니다. 서버로 전송되거나 보관되지 않습니다.',
      },
      {
        icon: '🔓',
        title: '회원가입 없는 자유로운 이용',
        desc: '이메일, 비밀번호, 카드 정보 입력 없이 모든 도구를 무제한 완전 무료로 이용할 수 있습니다.',
      },
      {
        icon: '📐',
        title: '투명한 수학 공식 공개',
        desc: '모든 도구의 수학 공식, 변수 정의, 단계별 풀이 과정을 공개하여 누구나 검증할 수 있도록 지원합니다.',
      },
      {
        icon: '⏱️',
        title: '정기적인 분기별 검토',
        desc: '개정되는 세법, 건축 시방서 및 웹 표준에 맞추어 개발팀이 주기적으로 정확도를 점검합니다.',
      },
    ],
    limitations: {
      title: '기술적 한계 및 올바른 사용 안내',
      disclaimer: '본 도구는 교육 및 사전 계획 목적의 추정치를 산출하기 위해 제공됩니다.',
      technicalNote,
      peerReviewNote: '수식 보완이나 새로운 표준 반영에 대한 의견이 있으시다면 전문 연구자 및 사용자 여러분의 피드백을 환영합니다.',
      feedbackLinkText: '전문가 피드백 및 의견 접수 →',
    },
  };
}

// ----------------------------------------------------------------------
// 9. ITALIAN (it)
// ----------------------------------------------------------------------
function getItalianEEAT(cat: string): EEATData {
  let standardName = 'Principi Matematici e Scientifici Riconosciuti';
  let description = 'Calcoli effettuati sulla base di equazioni algebriche verificate, geometria euclidea e fattori di conversione ISO.';
  let technicalNote = 'Conforme allo standard IEEE 754 per numeri a virgola mobile, garantendo precisione per calcoli tecnici e quotidiani.';

  if (cat === 'construction') {
    standardName = 'Norme IS 456:2000, SP 34 e Prontuari Edili';
    description = 'I calcoli di armature e calcestruzzo seguono le linee guida IS 456 e SP 34, includendo una tolleranza forfettaria del 5%–10% per sfridi e sormonti di cantiere.';
    technicalNote = 'I quantitativi costituiscono stime di massima per computi metrici preliminari. L’esecuzione strutturale richiede elaborati firmati da un ingegnere abilitato.';
  } else if (cat === 'finance') {
    standardName = 'Ammortamento Bancario Francese e Normativa Fiscale';
    description = 'I piani di ammortamento applicano rate costanti con interessi calcolati sul debito residuo a capitalizzazione periodica. I parametri fiscali sono aggiornati periodicamente.';
    technicalNote = 'I risultati sono stime per la pianificazione finanziaria personale. Gli importi definitivi dipendono dai contratti di credito e dagli accertamenti fiscali.';
  } else if (cat === 'health') {
    standardName = 'Parametri OMS e Formula di Mifflin-St Jeor';
    description = 'L’indice di massa corporea (IMC) rispecchia i valori soglia dell’Organizzazione Mondiale della Sanità (OMS). Il metabolismo basale impiega la formula di Mifflin-St Jeor.';
    technicalNote = 'Le stime hanno finalità orientative di benessere. Non sostituiscono il parere medico, analisi di laboratorio o diagnosi specialistiche.';
  } else if (cat === 'pdf-tools') {
    standardName = 'Architettura Documentale ISO 32000-1';
    description = 'La gestione dei file PDF rispetta lo standard aperto ISO 32000-1. Tutte le operazioni avvengono localmente nel browser via WebAssembly senza invio al server.';
    technicalNote = 'Le dimensioni massime dipendono dalla memoria RAM del dispositivo (consigliati file inferiori a 100 MB). I PDF con password devono essere preventivamente sbloccati.';
  } else if (cat === 'image-tools') {
    standardName = 'Specifica W3C HTML5 Canvas 2D';
    description = 'Compressione e ridimensionamento utilizzano l’API Canvas 2D del W3C in locale nella memoria di sistema senza caricamenti su server esterni.';
    technicalNote = 'La risoluzione massima gestibile dipende dai limiti hardware e grafici del dispositivo in uso.';
  } else if (cat === 'compiler-tools') {
    standardName = 'Ambiente Sandbox WebAssembly / JavaScript';
    description = 'Il codice viene eseguito in una sandbox sicura e isolata lato client, consentendo la verifica immediata della sintassi e dell’output di calcolo.';
    technicalNote = 'L’ambiente sandbox non consente l’accesso a socket di rete a basso livello né la scrittura sul disco locale.';
  } else if (cat === 'time-table-tools') {
    standardName = 'Griglia Cronologica e Standard CSS Paged Media';
    description = 'Organizzazione oraria strutturata con supporto per la stampa e l’esportazione nitida in formato A4.';
    technicalNote = 'Gli orari sono memorizzati temporaneamente nel browser. Salva o stampa il PDF per conservare una copia definitiva.';
  }

  return {
    methodology: {
      title: 'Metodologia di Calcolo e Standard di Riferimento',
      badge: 'Standard Verificati',
      standardName,
      description,
    },
    trustBadges: [
      {
        icon: '🛡️',
        title: 'Elaborazione 100% Lato Client',
        desc: 'Tutti i calcoli e le operazioni sui file avvengono nel browser locale. Nessun dato o file viene mai trasmesso o salvato sui server.',
      },
      {
        icon: '🔓',
        title: 'Nessun Account Richiesto',
        desc: 'Accesso libero, immediato e gratuito senza necessità di registrazione, credenziali o dati personali.',
      },
      {
        icon: '📐',
        title: 'Formule Matematiche Trasparenti',
        desc: 'Ogni strumento riporta l’equazione esatta, la legenda delle variabili e un esempio numerico svolto passo dopo passo.',
      },
      {
        icon: '⏱️',
        title: 'Ciclo di Revisione Trimestrale',
        desc: 'Verificato periodicamente dal nostro team tecnico in base agli aggiornamenti normativi, fiscali ed edilizi.',
      },
    ],
    limitations: {
      title: 'Limitazioni Tecniche e Uso Appropriato',
      disclaimer: 'Questo strumento è fornito esclusivamente a scopo didattico e per stime di massima.',
      technicalNote,
      peerReviewNote: 'Hai riscontrato un’incongruenza o desideri proporre un aggiornamento agli standard? Il nostro team incoraggia la revisione tecnica.',
      feedbackLinkText: 'Invia Feedback e Revisione Tecnica →',
    },
  };
}
