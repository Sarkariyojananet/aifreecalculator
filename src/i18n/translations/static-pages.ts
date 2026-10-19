/**
 * Static Pages Translations across all supported languages
 * aifreecalculator.com
 */

import type { Locale } from '../config';
import type { StaticPageTranslation } from '../types';

export type StaticPageKey =
  | 'about'
  | 'contact'
  | 'privacy-policy'
  | 'terms'
  | 'disclaimer'
  | 'all-calculators';

export const STATIC_PAGE_TRANSLATIONS: Record<StaticPageKey, Record<Locale, StaticPageTranslation>> = {
  about: {
    en: {
      locale: 'en',
      status: 'translated',
      metaTitle: 'About Us & Editorial Standards | AI Free Calculator',
      metaDescription: 'Learn how AI Free Calculator builds verified, client-side calculation tools following IS 456, WHO, and standard financial banking formulas with zero data tracking.',
      h1: 'About AI Free Calculator',
      intro: 'AI Free Calculator was built with a single goal: to provide world-class, mathematically rigorous calculation tools that are completely free, private, transparent, and fast.',
      missionTitle: 'Our Mission & Values',
      missionBody: 'We believe reliable calculation tools should be accessible to everyone without paywalls, subscriptions, intrusive sign-ups, or server-side data harvesting. We empower students, civil engineers, finance professionals, and homeowners with instant, verifiable numbers.',
      privacyTitle: 'Privacy-First & Client-Side Architecture',
      privacyBody: 'All calculations, PDF operations, image processing, and code compilation simulations run directly in your web browser using client-side JavaScript, WebAssembly, and HTML5 Canvas. Your financial numbers, civil dimensions, health metrics, and files never leave your device.',
      sections: [
        {
          title: 'Authoritative Standards & Methodology',
          content: 'Every calculator on AI Free Calculator is developed against recognized international and national technical standards: Indian Standard IS 456:2000 and SP 34 for reinforced concrete and steel detailing; CPWD Schedule of Rates for nominal material mix ratios and 5-10% wastage allowances; World Health Organization (WHO) BMI classifications and Mifflin-St Jeor biometric equations for health tools; standard retail banking reducing-balance amortization schedules and the Indian Income Tax Act (Section 115BAC New vs. Old Regime) for finance; and the W3C Web Cryptography API (crypto.getRandomValues) and ISO 32000-1 PDF specifications for utility tools.',
        },
        {
          title: 'Editorial Standards & Accuracy Policy',
          content: 'Our development team adheres to a strict editorial and testing protocol before deploying any tool. Formulas are cross-referenced against authoritative textbooks, official governmental gazettes, and peer-reviewed scientific literature. Each calculation engine is accompanied by an automated test suite verifying edge cases, zero-division resilience, extreme inputs, and IEEE 754 floating-point rounding accuracy. Algorithms are reviewed quarterly or immediately following official fiscal budget amendments.',
        },
        {
          title: 'Commitment to Transparency & Limitations',
          content: 'We provide full mathematical transparency: every calculator page includes the active algebraic equation, an explanation of variables, step-by-step instructions, and a worked practical example. We are honest about technical limitations: our web tools provide educational and planning estimates and do not replace certified structural drawings by chartered engineers, formal tax filings by licensed CPAs, or medical diagnoses by licensed physicians.',
        },
        {
          title: 'Peer Review, Bug Bounty & Continuous Feedback',
          content: 'We welcome peer review from civil engineers, financial analysts, educators, and software engineers. If you spot a discrepancy, formula nuance, or regulatory change, our editorial team investigates and releases verified corrections promptly. You can reach us directly through our Contact Page.',
        },
      ],
    },
    hi: {
      locale: 'hi',
      status: 'translated',
      metaTitle: 'हमारे बारे में और संपादकीय मानक | AI Free Calculator',
      metaDescription: 'जानें कि कैसे AI Free Calculator आईएस 456, डब्ल्यूएचओ और मानक वित्तीय सूत्रों पर आधारित 100% सुरक्षित और क्लाइंट-साइड टूल्स विकसित करता है।',
      h1: 'हमारे बारे में (About Us)',
      intro: 'AI Free Calculator का निर्माण एक स्पष्ट उद्देश्य के साथ किया गया है: पूरी तरह मुफ़्त, सुरक्षित, पारदर्शी और सटीक ऑनलाइन गणना उपकरण उपलब्ध कराना।',
      missionTitle: 'हमारा उद्देश्य और मूल्य',
      missionBody: 'हमारा मानना है कि विश्वसनीय गणना टूल्स सभी के लिए सुलभ होने चाहिए—बिना किसी सब्सक्रिप्शन, साइन-अप या डेटा संग्रह के। हम छात्रों, सिविल इंजीनियरों, वित्तीय सलाहकारों और आम उपयोगकर्ताओं को पारदर्शी गणना की शक्ति प्रदान करते हैं।',
      privacyTitle: 'गोपनीयता और क्लाइंट-साइड तकनीक',
      privacyBody: 'सभी गणनाएँ, पीडीएफ रूपांतरण, इमेज प्रोसेसिंग और कोड निष्पादन पूरी तरह से आपके ब्राउज़र में जावास्क्रिप्ट द्वारा निष्पादित होते हैं। आपके व्यक्तिगत, वित्तीय या स्वास्थ्य आंकड़े कभी भी किसी सर्वर पर अपलोड या संग्रहीत नहीं किए जाते।',
      sections: [
        {
          title: 'प्रामाणिक तकनीकी मानक और कार्यप्रणाली',
          content: 'हमारे सभी कैलकुलेटर मान्यता प्राप्त तकनीकी मानकों पर आधारित हैं: सिविल इंजीनियरिंग के लिए भारतीय मानक IS 456:2000, SP 34 और CPWD शेड्यूल ऑफ रेट्स; स्वास्थ्य टूल्स के लिए विश्व स्वास्थ्य संगठन (WHO) बीएमआई वर्गीकरण और मिफलिन-सेंट जोर बायोमेट्रिक समीकरण; वित्तीय टूल्स के लिए बैंकिंग रिड्यूसिंग-बैलेंस ईएमआई सूत्र और भारतीय आयकर अधिनियम (धारा 115BAC नई बनाम पुरानी कर व्यवस्था); तथा उपयोगिता टूल्स के लिए W3C वेब क्रिप्टोग्राफी API और ISO 32000-1 पीडीएफ मानक।',
        },
        {
          title: 'संपादकीय मानक और सटीकता नीति',
          content: 'हमारे टूल्स को प्रकाशित करने से पहले आधिकारिक पाठ्यपुस्तकों, सरकारी गजट और वैज्ञानिक शोध पत्रों से सत्यापित किया जाता है। प्रत्येक कैलकुलेटर के लिए स्वचालित परीक्षण सूट तैयार किए जाते हैं जो चरम मानों, शून्य-विभाजन और दशमलव राउंडिंग सटीकता की जांच करते हैं। बजट और कोड में बदलाव के अनुसार इनकी त्रैमासिक समीक्षा की जाती है।',
        },
        {
          title: 'पारदर्शिता और सीमाओं के प्रति निष्पक्षता',
          content: 'हम हर कैलकुलेटर के साथ स्पष्ट गणितीय सूत्र, चरों की परिभाषा, चरण-दर-चरण निर्देश और व्यावहारिक उदाहरण साझा करते हैं। हमारे टूल्स शैक्षिक और अनुमानित योजना के लिए हैं और ये चार्टर्ड इंजीनियरों के स्ट्रक्चरल प्रमाणपत्रों, सीए की औपचारिक कर सलाह या चिकित्सकों के परामर्श का विकल्प नहीं हैं।',
        },
        {
          title: 'सहकर्मी समीक्षा और फीडबैक प्रक्रिया',
          content: 'हम इंजीनियरों, कर विशेषज्ञों और शिक्षाविदों से निरंतर सुझावों और समीक्षा का स्वागत करते हैं। यदि आपको किसी सूत्र या गणना में सुधार का सुझाव देना हो, तो हमारी संपादकीय टीम तुरंत जांच कर उसे अपडेट करती है।',
        },
      ],
    },
    es: {
      locale: 'es',
      status: 'translated',
      metaTitle: 'Acerca de nosotros y estándares editoriales | AI Free Calculator',
      metaDescription: 'Conozca cómo AI Free Calculator desarrolla herramientas de cálculo verificadas del lado del cliente según estándares IS 456, OMS y fórmulas financieras.',
      h1: 'Acerca de AI Free Calculator',
      intro: 'AI Free Calculator fue creado con un propósito claro: ofrecer herramientas de cálculo rigurosas, gratuitas, rápidas, totalmente privadas y transparentes.',
      missionTitle: 'Nuestra misión y valores',
      missionBody: 'Creemos que las herramientas de cálculo confiables deben ser accesibles para todos, sin suscripciones, muros de pago ni recopilación invasiva de datos personales o financieros.',
      privacyTitle: 'Arquitectura privada del lado del cliente',
      privacyBody: 'Todos los cálculos, conversiones de PDF, procesamiento de imágenes y simulaciones se ejecutan 100% en su navegador local mediante JavaScript y Canvas. Sus datos nunca viajan a servidores externos.',
      sections: [
        {
          title: 'Estándares técnicos y metodología de cálculo',
          content: 'Nuestras calculadoras se diseñan siguiendo normas técnicas reconocidas: estándares de ingeniería civil IS 456 y directrices de dosificación de mezclas; clasificaciones biométricas de la Organización Mundial de la Salud (OMS) y ecuaciones Mifflin-St Jeor; fórmulas bancarias de amortización progresiva sobre saldo deudor y normativas fiscales vigentes; así como estándares W3C Web Cryptography e ISO 32000-1 para herramientas de documentos e imágenes.',
        },
        {
          title: 'Estándares editoriales y política de precisión',
          content: 'Antes de publicar cualquier herramienta, nuestro equipo técnico contrasta los algoritmos con manuales de referencia y publicaciones científicas. Implementamos pruebas unitarias automatizadas para evaluar casos extremos y redondeo numérico, con revisiones trimestrales de actualización.',
        },
        {
          title: 'Transparencia total y limitaciones',
          content: 'Cada herramienta incluye la fórmula matemática visible, desglose de variables y ejemplos prácticos. Nuestras estimaciones tienen fines educativos y de planificación previa, no sustituyendo el visado de ingenieros colegiados ni el dictamen médico o financiero.',
        },
        {
          title: 'Revisión por pares y retroalimentación',
          content: 'Fomentamos la revisión continua por parte de profesionales y usuarios. Cualquier observación técnica o sugerencia es atendida con celeridad por nuestro equipo a través de la página de contacto.',
        },
      ],
    },
    ja: {
      locale: 'ja',
      status: 'translated',
      metaTitle: '当サイトについてと編集基準 | AI Free Calculator',
      metaDescription: 'AI Free Calculatorの開発理念、工学基準（IS 456）、WHOガイドライン、金融数式に基づくブラウザ完結型の高精度計算エンジンについてご紹介します。',
      h1: 'AI Free Calculator について',
      intro: 'AI Free Calculator は、誰もが無料で安全に、かつ数式の根拠を確認しながら利用できる高精度な計算ツールを提供することを目的に開発されました。',
      missionTitle: '私たちの理念と提供価値',
      missionBody: '信頼性の高い計算ツールは、課金や会員登録、不透明なデータ収集なしに誰でも自由に使えるべきです。学生、エンジニア、金融実務者、一般ユーザーへ安心の計算環境を提供します。',
      privacyTitle: 'ブラウザ完結型のプライバシー設計',
      privacyBody: 'すべての計算、PDF処理、画像変換は利用者のブラウザ（JavaScript / Canvas）内で100%完結します。入力された数値や機密ファイルが外部サーバーに送信・保存されることは一切ありません。',
      sections: [
        {
          title: '準拠する技術基準と計算方法論',
          content: '当サイトの計算ツールは国際・公的基準に準拠しています：土木建築計算における標準配合比と配筋仕様（IS 456準拠）；世界保健機関（WHO）のBMI分類およびMifflin-St Jeor代謝推計式；金融における元利均等返済および複利計算標準；ユーティリティにおけるW3C Web Cryptography APIおよびISO 32000-1（PDF規格）を採用しています。',
        },
        {
          title: '編集基準と正確性の検証体制',
          content: '各ツールは公的資料および学術文献に基づいてアルゴリズムを設計し、極端な入力値やゼロ除算、浮動小数点丸め誤差を検証する単体テストを実施した上で公開しています。税制や金融基準の改定に合わせ、定期的な四半期レビューを行っています。',
        },
        {
          title: '透明性の維持とツールの限界明示',
          content: '全ての計算ページにおいて適用数式、変数定義、計算手順、具体例を公開しています。提供する数値は参考および業務計画用であり、有資格者による構造計算書や医師の診断、税理士の申告書を直接代替するものではありません。',
        },
        {
          title: 'フィードバックと継続的な改善',
          content: '専門家やユーザーからのレビューを積極的に受け入れています。計算結果や仕様に関するご意見・改善提案は、お問い合わせ窓口より随時受け付けています。',
        },
      ],
    },
    fr: {
      locale: 'fr',
      status: 'translated',
      metaTitle: 'À propos de nous et normes éditoriales | AI Free Calculator',
      metaDescription: 'Découvrez comment AI Free Calculator conçoit des outils fiables, exécutés côté client selon les normes de l’OMS, IS 456 et les calculs bancaires standard.',
      h1: 'À propos de AI Free Calculator',
      intro: 'AI Free Calculator a été conçu avec une exigence forte : offrir des calculatrices précises, gratuites, transparentes, rapides et 100% confidentielles.',
      missionTitle: 'Notre mission et nos valeurs',
      missionBody: 'L’accès à des calculs fiables et vérifiés doit être universel, sans abonnement, sans création de compte obligatoire et sans exploitation commerciale de vos données chiffrées.',
      privacyTitle: 'Exécution locale et respect absolu de la vie privée',
      privacyBody: 'Tous les calculs, conversions PDF, traitements d’images et simulations de code s’exécutent directement dans votre navigateur via JavaScript. Aucun chiffre, document ou image n’est envoyé sur nos serveurs.',
      sections: [
        {
          title: 'Méthodologie et normes de référence',
          content: 'Chaque outil s’appuie sur des références établies : normes de construction IS 456 et ratios de dosage standard ; classifications biométriques de l’OMS et formule de Mifflin-St Jeor pour la santé ; amortissements à annuités constantes et règles financières standard ; spécifications W3C Web Cryptography et ISO 32000-1 pour les outils PDF et fichiers.',
        },
        {
          title: 'Exigences éditoriales et contrôle de qualité',
          content: 'Avant toute mise en ligne, les algorithmes sont confrontés aux ouvrages académiques et textes officiels. Des suites de tests automatisés valident la précision des calculs, la gestion des arrondis et les cas limites. Une révision trimestrielle assure l’actualisation des barèmes fiscaux et paramètres économiques.',
        },
        {
          title: 'Transparence mathématique et limites d’utilisation',
          content: 'Chaque page affiche l’équation exacte, le détail des variables et un cas pratique chiffré. Nos outils constituent des aides à la décision et ne se substituent pas à une note de calcul certifiée par un bureau d’études, ni à un avis fiscal ou médical professionnel.',
        },
        {
          title: 'Retour d’expérience et examen par les pairs',
          content: 'Nous encourageons les retours d’ingénieurs, universitaires et professionnels. Toute suggestion ou observation technique est analysée avec rigueur par notre équipe éditoriale via la page contact.',
        },
      ],
    },
    de: {
      locale: 'de',
      status: 'translated',
      metaTitle: 'Über uns & Redaktionsstandards | AI Free Calculator',
      metaDescription: 'Erfahren Sie, wie AI Free Calculator geprüfte, clientseitige Rechenwerkzeuge nach IS 456, WHO-Vorgaben und anerkannten Finanzformeln entwickelt.',
      h1: 'Über AI Free Calculator',
      intro: 'AI Free Calculator wurde mit einem klaren Ziel entwickelt: mathematisch fundierte, blitzschnelle und datenschutzkonforme Rechenwerkzeuge bereitzustellen.',
      missionTitle: 'Unsere Mission und Grundwerte',
      missionBody: 'Zuverlässige Berechnungswerkzeuge sollten für jedermann ohne Bezahlschranken, Registrierungszwang oder unbefugte Datenspeicherung uneingeschränkt nutzbar sein.',
      privacyTitle: 'Clientseitige Architektur & Privatsphäre',
      privacyBody: 'Sämtliche Berechnungen, PDF-Operationen, Bildoptimierungen und Code-Simulationen laufen zu 100% lokal in Ihrem Browser über JavaScript und Canvas. Ihre Daten verlassen niemals Ihr Endgerät.',
      sections: [
        {
          title: 'Anerkannte Normen & Rechenmethodik',
          content: 'Unsere Werkzeuge basieren auf etablierten Standards: bautechnische Richtlinien wie IS 456 und Materialverlustpauschalen (5-10%); BMI-Klassifikationen der Weltgesundheitsorganisation (WHO) sowie die Mifflin-St-Jeor-Gleichung; bankenübliche Annuitätentilgungsformeln und gesetzliche Steuertarife; sowie W3C Web Cryptography und ISO 32000-1 für PDF- und Dokumentenwerkzeuge.',
        },
        {
          title: 'Redaktionsstandards & Qualitätsprüfung',
          content: 'Algorithmen werden anhand wissenschaftlicher Fachliteratur und behördlicher Richtlinien validiert. Automatisierte Tests prüfen Rundungsgenauigkeit, Sonderfälle und Extremwerte. Wir führen vierteljährliche Überprüfungen durch, um gesetzliche und finanzielle Anpassungen zeitnah abzubilden.',
        },
        {
          title: 'Transparenz & Grenzen der Werkzeuge',
          content: 'Auf jeder Werkzeugseite finden Sie die mathematische Formel, Variablenerklärungen und ein praxisnahes Rechenbeispiel. Die Ergebnisse dienen der Orientierung und ersetzen keine statische Berechnung eines Prüfingenieurs oder die individuelle Steuerberatung.',
        },
        {
          title: 'Fachliches Feedback & Peer-Review',
          content: 'Wir schätzen den fachlichen Austausch mit Ingenieuren, Mathematikern und Anwendern. Hinweise und Verbesserungsvorschläge werden über unser Kontaktformular zeitnah geprüft und integriert.',
        },
      ],
    },
    pt: {
      locale: 'pt',
      status: 'translated',
      metaTitle: 'Sobre nós e padrões editoriais | AI Free Calculator',
      metaDescription: 'Veja como o AI Free Calculator projeta calculadoras confiáveis e 100% locais seguindo diretrizes IS 456, OMS e matemática financeira padrão.',
      h1: 'Sobre o AI Free Calculator',
      intro: 'O AI Free Calculator foi criado para oferecer ferramentas de cálculo confiáveis, rápidas, totalmente gratuitas, transparentes e com máxima privacidade.',
      missionTitle: 'Nossa missão e princípios',
      missionBody: 'Acreditamos que cálculos precisos devem estar acessíveis a todos, sem assinaturas, cadastros obrigatórios ou monetização indevida de dados pessoais.',
      privacyTitle: 'Arquitetura local com privacidade integral',
      privacyBody: 'Todas as operações, conversões de PDF, ajustes de imagem e execuções rodam diretamente no navegador do usuário via JavaScript. Nenhum número ou arquivo é enviado a servidores remotos.',
      sections: [
        {
          title: 'Normas técnicas e metodologia adotada',
          content: 'Nossas calculadoras seguem padrões reconhecidos: normas de engenharia civil como IS 456 e fatores de consumo de materiais; parâmetros biométricos da Organização Mundial da Saúde (OMS) e fórmula de Mifflin-St Jeor; amortizações bancárias por saldo devedor e tabelas tributárias oficiais; bem como padrões W3C Web Cryptography e ISO 32000-1 para arquivos PDF.',
        },
        {
          title: 'Critérios editoriais e controle de precisão',
          content: 'Antes da disponibilização, cada algoritmo é checado contra bibliografias técnicas e normas vigentes. Testes automatizados validam o tratamento de dízimas, casos limítrofes e arredondamentos, com ciclos de revisão trimestrais.',
        },
        {
          title: 'Transparência nas fórmulas e responsabilidade',
          content: 'Disponibilizamos a equação exata, legenda de variáveis e exemplos passo a passo em cada ferramenta. Os resultados são referenciais para estudo e planejamento, não substituindo projetos assinados por engenheiros calculistas nem consultorias fiscais.',
        },
        {
          title: 'Revisão por pares e canal de sugestões',
          content: 'Incentivamos o escrutínio técnico por parte de engenheiros, contadores e professores. Mensagens enviadas via página de contato são analisadas com prioridade pela nossa equipe técnica.',
        },
      ],
    },
    ko: {
      locale: 'ko',
      status: 'translated',
      metaTitle: '소개 및 편집 기준 | AI Free Calculator',
      metaDescription: 'AI Free Calculator가 IS 456 토목 기준, WHO 생체 표준 및 표준 금융 공식에 기반하여 안전한 클라이언트 기반 계산기를 제작하는 방식을 안내합니다.',
      h1: 'AI Free Calculator 소개',
      intro: 'AI Free Calculator는 누구나 제약 없이 신뢰할 수 있는 수치 계산을 무료로, 안전하고 투명하게 이용할 수 있도록 구축되었습니다.',
      missionTitle: '우리의 비전과 가치',
      missionBody: '정확한 계산 도구는 유료 결제나 불필요한 개인정보 요구, 서버 데이터 수집 없이 모든 사람에게 열려 있어야 합니다. 학생, 엔지니어, 금융 실무자에게 믿을 수 있는 계산 환경을 제공합니다.',
      privacyTitle: '클라이언트 사이드 아키텍처와 프라이버시',
      privacyBody: '모든 수치 연산, PDF 가공, 이미지 처리 및 코드 테스트는 사용자의 기기 브라우저(JavaScript/Canvas) 내에서 100% 로컬로 실행됩니다. 입력한 수치나 파일이 외부 서버로 전송되지 않습니다.',
      sections: [
        {
          title: '공인 기술 표준 및 산출 방법론',
          content: '당사의 모든 도구는 공인된 표준을 준수합니다: 토목·건축 분야의 IS 456 철근콘크리트 시방서 및 손실률 기준; 건강 분야의 세계보건기구(WHO) BMI 분류와 미플린-세인트 지어(Mifflin-St Jeor) 기초대사량 산출식; 금융 분야의 원리금균등분할상환 공식 및 세법 규정; 파일 도구의 W3C Web Cryptography API와 ISO 32000-1 PDF 표준 규격을 철저히 적용합니다.',
        },
        {
          title: '편집 표준 및 정확성 검증 절차',
          content: '배포 전 공인 학술 자료 및 정부 지침을 바탕으로 계산 로직을 교차 검증합니다. 극한값 입력, 0 나누기 방지, 소수점 반올림 오차를 점검하는 자동화 단위 테스트를 거치며, 정기적인 분기별 검토를 통해 세법 및 기준 개정 사항을 신속히 반영합니다.',
        },
        {
          title: '투명한 수식 공개와 도구의 한계 명시',
          content: '모든 계산기 페이지에 적용된 수학 수식, 변수 정의, 단계별 해설 및 예제를 투명하게 공개합니다. 본 도구의 결과는 계획 및 참고용 추정치이며, 공인 엔지니어의 구조 계산서, 세무사의 정식 세무 자문, 의사의 임상 진단을 대신하지 않습니다.',
        },
        {
          title: '동료 평가 및 피드백 반영',
          content: '엔지니어, 학계 연구자 및 사용자 여러분의 피드백을 환영합니다. 수식 개선이나 새로운 기준 제안은 고객지원 문의 페이지를 통해 신속하게 접수 및 검토됩니다.',
        },
      ],
    },
    it: {
      locale: 'it',
      status: 'translated',
      metaTitle: 'Chi siamo e standard editoriali | AI Free Calculator',
      metaDescription: 'Scopri come AI Free Calculator sviluppa calcolatori verificati lato client conformi a standard IS 456, OMS e formule finanziarie bancarie.',
      h1: 'Chi siamo',
      intro: 'AI Free Calculator nasce con l’obiettivo di offrire strumenti di calcolo precisi, immediati, gratuiti, trasparenti e totalmente sicuri.',
      missionTitle: 'La nostra missione e i nostri valori',
      missionBody: 'Riteniamo che strumenti di calcolo accurati debbano essere accessibili a tutti senza abbonamenti, registrazioni obbligatorie o raccolta invasiva di dati personali e finanziari.',
      privacyTitle: 'Architettura lato client e protezione dati',
      privacyBody: 'Tutti i calcoli, conversioni PDF, elaborazioni immagini e test di codice avvengono direttamente nel browser tramite JavaScript locale. Nessun file o cifra numerica lascia mai il tuo dispositivo.',
      sections: [
        {
          title: 'Standard tecnici ufficiali e metodologia',
          content: 'I calcolatori adottano standard tecnici internazionali e normativi: linee guida per l’ingegneria civile (IS 456 e fattori di sfrido materiali); classificazioni dell’Organizzazione Mondiale della Sanità (OMS) e formula di Mifflin-St Jeor per la salute; ammortamenti bancari a rata costante su debito residuo e scaglioni fiscali vigenti; oltre alle specifiche W3C Web Cryptography e ISO 32000-1 per documenti e PDF.',
        },
        {
          title: 'Standard editoriali e controllo di accuratezza',
          content: 'Gli algoritmi sono verificati attraverso testi accademici e normative ufficiali. Suite di test automatici controllano casi limite, gestione delle divisioni per zero e precisione di arrotondamento, con revisioni trimestrali su aggiornamenti fiscali e tecnici.',
        },
        {
          title: 'Trasparenza delle formule e limiti di utilizzo',
          content: 'Ogni strumento riporta l’equazione algebrica impiegata, legenda delle variabili ed esempi numerici svolti. Le stime fornite hanno scopo informativo e di pianificazione preliminare, non sostituendosi a progetti firmati da ingegneri abilitati o perizie contabili e mediche.',
        },
        {
          title: 'Revisione tra pari e canali di feedback',
          content: 'Accogliamo osservazioni da parte di ingegneri, commercialisti e docenti. Qualsiasi segnalazione inviata tramite la pagina contatti viene esaminata tempestivamente dal nostro team editoriale.',
        },
      ],
    },
  },

  contact: {
    en: {
      locale: 'en',
      status: 'translated',
      metaTitle: 'Contact Us | AI Free Calculator Support',
      metaDescription: 'Get in touch with the AI Free Calculator team for calculator feedback, bug reports, and formula improvement suggestions.',
      h1: 'Contact Us',
      intro: 'Have a question, feedback, or a suggestion for a new calculator tool? We would love to hear from you.',
    },
    hi: {
      locale: 'hi',
      status: 'translated',
      metaTitle: 'संपर्क करें | AI Free Calculator सहायता',
      metaDescription: 'AI Free Calculator टीम से संपर्क करें: किसी भी सुझाव, गणना सुधार या नए कैलकुलेटर के अनुरोध के लिए संदेश भेजें।',
      h1: 'हमसे संपर्क करें (Contact Us)',
      intro: 'क्या आपके पास कोई प्रश्न, प्रतिक्रिया या नए कैलकुलेटर का सुझाव है? हमें आपकी राय जानकर खुशी होगी।',
    },
    es: {
      locale: 'es',
      status: 'translated',
      metaTitle: 'Contacto | Soporte AI Free Calculator',
      metaDescription: 'Comuníquese con el equipo de AI Free Calculator para comentarios, sugerencias o reportar errores en las herramientas.',
      h1: 'Contáctenos',
      intro: '¿Tiene alguna pregunta, comentario o sugerencia sobre nuestras calculadoras? Nos encantará atenderle.',
    },
    ja: {
      locale: 'ja',
      status: 'translated',
      metaTitle: 'お問い合わせ | AI Free Calculator',
      metaDescription: 'AI Free Calculatorへのお問い合わせ：機能のリクエスト、計算式の改善提案、ご質問はこちらから。',
      h1: 'お問い合わせ',
      intro: '計算ツールに関するご質問、計算式の改善提案、新機能のご要望などをお気軽にお寄せください。',
    },
    fr: {
      locale: 'fr',
      status: 'translated',
      metaTitle: 'Contact | Assistance AI Free Calculator',
      metaDescription: 'Contactez l’équipe d’AI Free Calculator pour vos retours, suggestions d’amélioration ou signalement d’erreurs.',
      h1: 'Contactez-nous',
      intro: 'Une question, une remarque ou une suggestion de nouvel outil ? Écrivez-nous en toute simplicité.',
    },
    de: {
      locale: 'de',
      status: 'translated',
      metaTitle: 'Kontakt | AI Free Calculator Support',
      metaDescription: 'Kontaktieren Sie das Team von AI Free Calculator für Feedback, Fehlermeldungen und Vorschläge für neue Rechner.',
      h1: 'Kontakt',
      intro: 'Haben Sie Fragen, Feedback oder Vorschläge für neue Rechenwerkzeuge? Wir freuen uns auf Ihre Nachricht.',
    },
    pt: {
      locale: 'pt',
      status: 'translated',
      metaTitle: 'Contato | Suporte AI Free Calculator',
      metaDescription: 'Fale com a equipe do AI Free Calculator para dúvidas, sugestões e solicitações de novas calculadoras.',
      h1: 'Entre em contato',
      intro: 'Tem alguma dúvida, sugestão ou proposta de nova ferramenta? Será um prazer receber seu feedback.',
    },
    ko: {
      locale: 'ko',
      status: 'translated',
      metaTitle: '문의하기 | AI Free Calculator 고객지원',
      metaDescription: 'AI Free Calculator에 문의하기: 계산기 개선 제안, 버그 신고, 새로운 도구 요청.',
      h1: '문의하기',
      intro: '계산 공식 개선 의견이나 새로운 계산기 아이디어가 있으시다면 언제든 편하게 의견을 보내주세요.',
    },
    it: {
      locale: 'it',
      status: 'translated',
      metaTitle: 'Contatti | Supporto AI Free Calculator',
      metaDescription: 'Contatta il team di AI Free Calculator per feedback, segnalazioni e suggerimenti su nuovi strumenti di calcolo.',
      h1: 'Contattaci',
      intro: 'Hai domande, suggerimenti o proposte di nuovi calcolatori? Saremo lieti di ricevere il tuo messaggio.',
    },
  },

  'privacy-policy': {
    en: {
      locale: 'en',
      status: 'translated',
      metaTitle: 'Privacy Policy | AI Free Calculator',
      metaDescription: 'Privacy Policy for AI Free Calculator: Zero numerical data collection. All calculations run strictly client-side in your web browser.',
      h1: 'Privacy Policy',
      intro: 'Your privacy is our highest priority. We do not collect, store, or transmit your individual numerical calculations.',
    },
    hi: {
      locale: 'hi',
      status: 'translated',
      metaTitle: 'गोपनीयता नीति | AI Free Calculator',
      metaDescription: 'AI Free Calculator गोपनीयता नीति: शून्य व्यक्तिगत डेटा संग्रह। सभी गणनाएँ सीधे आपके ब्राउज़र में सुरक्षित रूप से होती हैं।',
      h1: 'गोपनीयता नीति (Privacy Policy)',
      intro: 'आपकी गोपनीयता हमारे लिए सर्वोपरि है। हम आपके द्वारा दर्ज की गई किसी भी संख्या या गणना डेटा को एकत्रित या संग्रहीत नहीं करते।',
    },
    es: {
      locale: 'es',
      status: 'translated',
      metaTitle: 'Política de privacidad | AI Free Calculator',
      metaDescription: 'Política de privacidad: Sin recopilación de datos de cálculo. Todas las operaciones se realizan localmente en su navegador.',
      h1: 'Política de privacidad',
      intro: 'Su privacidad es fundamental. No recopilamos, almacenamos ni compartimos los valores numéricos que ingresa en las herramientas.',
    },
    ja: {
      locale: 'ja',
      status: 'translated',
      metaTitle: 'プライバシーポリシー | AI Free Calculator',
      metaDescription: 'AI Free Calculator プライバシーポリシー：計算数値のサーバー保存なし。ブラウザ完結型の安心設計。',
      h1: 'プライバシーポリシー',
      intro: '当サイトではお客様のプライバシーを最重要視しています。入力された計算数値や個人データを収集・保存することはありません。',
    },
    fr: {
      locale: 'fr',
      status: 'translated',
      metaTitle: 'Politique de confidentialité | AI Free Calculator',
      metaDescription: 'Politique de confidentialité : Aucun enregistrement de vos données de calcul. Tout s’exécute localement dans votre navigateur.',
      h1: 'Politique de confidentialité',
      intro: 'Le respect de votre vie privée est fondamental. Nous ne collectons, ne stockons et ne transmettons aucune de vos données chiffrées.',
    },
    de: {
      locale: 'de',
      status: 'translated',
      metaTitle: 'Datenschutzerklärung | AI Free Calculator',
      metaDescription: 'Datenschutzerklärung: Keine Erfassung Ihrer Berechnungsdaten. Alle Berechnungen laufen ausschließlich lokal im Browser.',
      h1: 'Datenschutzerklärung',
      intro: 'Der Schutz Ihrer Privatsphäre hat höchste Priorität. Wir erfassen und speichern keine Ihrer eingegebenen Berechnungswerte.',
    },
    pt: {
      locale: 'pt',
      status: 'translated',
      metaTitle: 'Política de privacidade | AI Free Calculator',
      metaDescription: 'Política de privacidade: Zero coleta de dados de cálculo. Todas as operações são processadas localmente no navegador.',
      h1: 'Política de privacidade',
      intro: 'Sua privacidade é inegociável. Não coletamos, armazenamos nem compartilhamos quaisquer dados numéricos inseridos nas ferramentas.',
    },
    ko: {
      locale: 'ko',
      status: 'translated',
      metaTitle: '개인정보 처리방침 | AI Free Calculator',
      metaDescription: '개인정보 처리방침: 계산 수치 서버 수집 없음. 모든 연산은 사용자의 기기 브라우저에서만 수행됩니다.',
      h1: '개인정보 처리방침',
      intro: '사용자의 프라이버시는 철저히 보호됩니다. 입력하신 금융·건강 수치는 서버로 전송되거나 보관되지 않습니다.',
    },
    it: {
      locale: 'it',
      status: 'translated',
      metaTitle: 'Informativa sulla privacy | AI Free Calculator',
      metaDescription: 'Informativa sulla privacy: Nessuna raccolta di dati numerici. Tutti i calcoli avvengono in locale nel browser.',
      h1: 'Informativa sulla privacy',
      intro: 'La tua privacy è fondamentale. Non raccogliamo, salviamo né condividiamo i valori inseriti nei moduli di calcolo.',
    },
  },

  terms: {
    en: {
      locale: 'en',
      status: 'translated',
      metaTitle: 'Terms of Use | AI Free Calculator',
      metaDescription: 'Terms of Use for AI Free Calculator: Free informational tools provided as-is without warranties.',
      h1: 'Terms of Use',
      intro: 'By accessing and using AI Free Calculator, you agree to comply with and be bound by the following terms of use.',
    },
    hi: {
      locale: 'hi',
      status: 'translated',
      metaTitle: 'उपयोग की शर्तें | AI Free Calculator',
      metaDescription: 'AI Free Calculator उपयोग की शर्तें: मुफ़्त सूचनात्मक टूल्स का बिना किसी वारंटी के उपयोग नियम।',
      h1: 'उपयोग की शर्तें (Terms of Use)',
      intro: 'AI Free Calculator का उपयोग करके, आप निम्नलिखित नियमों और शर्तों का पालन करने के लिए सहमत होते हैं।',
    },
    es: {
      locale: 'es',
      status: 'translated',
      metaTitle: 'Términos de uso | AI Free Calculator',
      metaDescription: 'Términos de uso de AI Free Calculator: Herramientas informativas y educativas gratuitas.',
      h1: 'Términos de uso',
      intro: 'Al acceder y utilizar AI Free Calculator, usted acepta cumplir con los siguientes términos y condiciones de uso.',
    },
    ja: {
      locale: 'ja',
      status: 'translated',
      metaTitle: '利用規約 | AI Free Calculator',
      metaDescription: 'AI Free Calculator 利用規約：無料の情報提供ツールの利用条件について。',
      h1: '利用規約',
      intro: '当ウェブサイトの計算ツールをご利用いただくにあたり、以下の利用規約にご同意いただいたものとみなします。',
    },
    fr: {
      locale: 'fr',
      status: 'translated',
      metaTitle: 'Conditions d’utilisation | AI Free Calculator',
      metaDescription: 'Conditions d’utilisation d’AI Free Calculator : Outils éducatifs et informatifs gratuits fournis en l’état.',
      h1: 'Conditions d’utilisation',
      intro: 'En accédant à AI Free Calculator, vous acceptez de vous conformer aux présentes conditions générales d’utilisation.',
    },
    de: {
      locale: 'de',
      status: 'translated',
      metaTitle: 'Nutzungsbedingungen | AI Free Calculator',
      metaDescription: 'Nutzungsbedingungen für AI Free Calculator: Kostenlose Informationswerkzeuge zur freien Verfügung.',
      h1: 'Nutzungsbedingungen',
      intro: 'Mit der Nutzung von AI Free Calculator erklären Sie sich mit den nachfolgenden Nutzungsbedingungen einverstanden.',
    },
    pt: {
      locale: 'pt',
      status: 'translated',
      metaTitle: 'Termos de uso | AI Free Calculator',
      metaDescription: 'Termos de uso do AI Free Calculator: Ferramentas informativas gratuitas fornecidas no estado em que se encontram.',
      h1: 'Termos de uso',
      intro: 'Ao acessar e utilizar o AI Free Calculator, você concorda com os seguintes termos e condições de serviço.',
    },
    ko: {
      locale: 'ko',
      status: 'translated',
      metaTitle: '이용약관 | AI Free Calculator',
      metaDescription: 'AI Free Calculator 이용약관: 정보 제공 목적의 무료 온라인 계산 도구 이용 안내.',
      h1: '이용약관',
      intro: 'AI Free Calculator의 서비스를 이용함으로써 귀하는 다음의 이용약관 및 운영 정책에 동의하게 됩니다.',
    },
    it: {
      locale: 'it',
      status: 'translated',
      metaTitle: 'Termini di utilizzo | AI Free Calculator',
      metaDescription: 'Termini di utilizzo di AI Free Calculator: Strumenti informativi gratuiti forniti nello stato in cui si trovano.',
      h1: 'Termini di utilizzo',
      intro: 'Accedendo e utilizzando AI Free Calculator, accetti di rispettare i seguenti termini e condizioni d’uso.',
    },
  },

  disclaimer: {
    en: {
      locale: 'en',
      status: 'translated',
      metaTitle: 'Disclaimer | AI Free Calculator',
      metaDescription: 'Disclaimer for AI Free Calculator: Informational estimates. Not professional medical, financial, or structural engineering advice.',
      h1: 'Disclaimer',
      intro: 'All calculations and formulas provided on AI Free Calculator are designed for informational and educational estimation purposes only.',
    },
    hi: {
      locale: 'hi',
      status: 'translated',
      metaTitle: 'अस्वीकरण | AI Free Calculator',
      metaDescription: 'AI Free Calculator अस्वीकरण: सूचनात्मक अनुमान। वित्तीय, चिकित्सीय या स्ट्रक्चरल इंजीनियरिंग सलाह का विकल्प नहीं।',
      h1: 'अस्वीकरण (Disclaimer)',
      intro: 'AI Free Calculator पर प्रदान की गई सभी गणनाएँ और सूत्र केवल सूचनात्मक और अनुमानित उद्देश्यों के लिए हैं।',
    },
    es: {
      locale: 'es',
      status: 'translated',
      metaTitle: 'Descargo de responsabilidad | AI Free Calculator',
      metaDescription: 'Descargo de responsabilidad: Estimaciones informativas. No constituyen asesoramiento médico, financiero ni de ingeniería estructural.',
      h1: 'Descargo de responsabilidad',
      intro: 'Los cálculos y fórmulas presentados en este sitio se ofrecen exclusivamente con fines informativos y estimativos.',
    },
    ja: {
      locale: 'ja',
      status: 'translated',
      metaTitle: '免責事項 | AI Free Calculator',
      metaDescription: 'AI Free Calculator 免責事項：参考値・情報提供目的の計算ツール。専門家の医療・投資・構造計算の代替ではありません。',
      h1: '免責事項',
      intro: '当サイトの計算ツールおよび算出結果は情報提供を目的としており、専門家による医療診断や投資助言に代わるものではありません。',
    },
    fr: {
      locale: 'fr',
      status: 'translated',
      metaTitle: 'Avertissement légal | AI Free Calculator',
      metaDescription: 'Avertissement légal : Estimations fournies à titre indicatif. Ne remplace pas un avis médical, financier ou d’ingénierie.',
      h1: 'Avertissement légal (Disclaimer)',
      intro: 'Les résultats fournis par nos calculatrices sont des estimations destinées à des fins purement informatives et éducatives.',
    },
    de: {
      locale: 'de',
      status: 'translated',
      metaTitle: 'Haftungsausschluss | AI Free Calculator',
      metaDescription: 'Haftungsausschluss: Unverbindliche Schätzungen. Ersetzt keine professionelle medizinische, finanzielle oder baustatische Beratung.',
      h1: 'Haftungsausschluss',
      intro: 'Alle auf AI Free Calculator bereitgestellten Berechnungen und Formeln dienen ausschließlich allgemeinen Informationszwecken.',
    },
    pt: {
      locale: 'pt',
      status: 'translated',
      metaTitle: 'Aviso legal | AI Free Calculator',
      metaDescription: 'Aviso legal: Estimativas informativas. Não substituem consultoria médica, financeira ou laudos de engenharia estrutural.',
      h1: 'Aviso legal (Disclaimer)',
      intro: 'Todos os cálculos e resultados apresentados são aproximações destinadas a fins estritamente informativos e educativos.',
    },
    ko: {
      locale: 'ko',
      status: 'translated',
      metaTitle: '면책 조항 | AI Free Calculator',
      metaDescription: '면책 조항: 정보 참고 목적의 추정치. 전문적인 의료 진단, 투자 자문 또는 구조안전 진단을 대체하지 않습니다.',
      h1: '면책 조항',
      intro: '본 사이트에서 제공되는 모든 계산 결과는 단순 참고 및 정보 제공 목적이며, 법적 책임을 지지 않습니다.',
    },
    it: {
      locale: 'it',
      status: 'translated',
      metaTitle: 'Disclaimer | AI Free Calculator',
      metaDescription: 'Disclaimer: Stime a scopo informativo. Non sostituiscono consulenze mediche, finanziarie o perizie strutturali professionali.',
      h1: 'Disclaimer legale',
      intro: 'Tutti i calcoli e le formule forniti su AI Free Calculator sono pensati esclusivamente a scopo informativo ed educativo.',
    },
  },

  'all-calculators': {
    en: {
      locale: 'en',
      status: 'translated',
      metaTitle: 'All 129+ Free Online Tools Directory | AI Free Calculator',
      metaDescription: 'Browse our complete directory of 129+ free online tools and calculators categorized by Finance, Construction, Health, Math, Image, PDF, and Timetable.',
      h1: 'All 129+ Free Online Tools Directory',
      intro: 'Explore our complete directory of 129+ rigorously tested, browser-based online tools and calculators designed for daily productivity and professional estimates.',
    },
    hi: {
      locale: 'hi',
      status: 'translated',
      metaTitle: 'सभी 129+ मुफ़्त ऑनलाइन टूल्स डायरेक्टरी | AI Free Calculator',
      metaDescription: 'वित्त, निर्माण, स्वास्थ्य, गणित, इमेज, PDF और टाइम टेबल सहित 129+ मुफ़्त ऑनलाइन टूल्स और कैलकुलेटर की पूरी सूची देखें।',
      h1: 'सभी 129+ मुफ़्त ऑनलाइन टूल्स डायरेक्टरी',
      intro: 'दैनिक उपयोग और पेशेवर कार्यों के लिए हमारे 129+ सत्यापित और मुफ़्त ऑनलाइन टूल्स और कैलकुलेटर की पूरी सूची देखें।',
    },
    es: {
      locale: 'es',
      status: 'translated',
      metaTitle: 'Directorio de 129+ herramientas online gratuitas | AI Free Calculator',
      metaDescription: 'Explore nuestro directorio con 129+ herramientas y calculadoras online clasificadas por finanzas, salud, construcción, imagen y más.',
      h1: 'Directorio de 129+ herramientas online gratuitas',
      intro: 'Consulte la colección completa de 129+ herramientas y calculadoras online verificadas y 100% gratuitas.',
    },
    ja: {
      locale: 'ja',
      status: 'translated',
      metaTitle: '全129種以上の無料オンラインツール一覧 | AI Free Calculator',
      metaDescription: '金融、建築、健康、数学、画像、PDF、時間割まで、全129種以上の無料オンラインツールをカテゴリー別に探せる総合ディレクトリ。',
      h1: '全129種以上の無料オンラインツール一覧',
      intro: '日々の実務や学習、業務効率化に役立つ129種類以上の完全無料オンラインツールと計算機の一覧です。',
    },
    fr: {
      locale: 'fr',
      status: 'translated',
      metaTitle: 'Annuaire de 129+ outils en ligne gratuits | AI Free Calculator',
      metaDescription: 'Consultez le répertoire complet de nos 129+ outils et calculatrices en ligne gratuits classés par finances, bâtiment, santé, PDF et plus.',
      h1: 'Annuaire des 129+ outils en ligne gratuits',
      intro: 'Parcourez notre collection complète de 129+ outils et calculatrices en ligne gratuits et sans inscription.',
    },
    de: {
      locale: 'de',
      status: 'translated',
      metaTitle: 'Verzeichnis aller 129+ kostenlosen Online-Tools | AI Free Calculator',
      metaDescription: 'Entdecken Sie unser gesamtes Verzeichnis mit 129+ Online-Tools und Rechnern für Finanzen, Bauwesen, Gesundheit, PDF und Alltag.',
      h1: 'Verzeichnis aller 129+ kostenlosen Online-Tools',
      intro: 'Übersicht über alle 129+ geprüften und kostenfreien Online-Tools und Rechner für Alltag, Beruf und Studium.',
    },
    pt: {
      locale: 'pt',
      status: 'translated',
      metaTitle: 'Diretório com 129+ ferramentas online gratuitas | AI Free Calculator',
      metaDescription: 'Navegue pelo diretório completo de 129+ ferramentas e calculadoras online em finanças, construção, saúde, PDF e produtividade.',
      h1: 'Diretório de 129+ ferramentas online gratuitas',
      intro: 'Explore nosso catálogo com 129+ ferramentas e calculadoras online precisas, gratuitas e sem necessidade de cadastro.',
    },
    ko: {
      locale: 'ko',
      status: 'translated',
      metaTitle: '129개 이상의 무료 온라인 도구 디렉토리 | AI Free Calculator',
      metaDescription: '금융, 건축, 건강, 수학, 이미지, PDF, 시간표 등 분야별 129개 이상의 무료 온라인 도구 및 계산기 전체 목록.',
      h1: '전체 129개 이상의 무료 온라인 도구 디렉토리',
      intro: '일상생활과 전문적인 작업을 위해 마련된 129여 종의 무료 온라인 도구 및 계산기 전체 디렉토리입니다.',
    },
    it: {
      locale: 'it',
      status: 'translated',
      metaTitle: 'Elenco completo di 129+ strumenti online gratuiti | AI Free Calculator',
      metaDescription: 'Esplora la nostra directory completa con 129+ strumenti e calcolatori online per finanza, edilizia, salute, PDF e produttività.',
      h1: 'Elenco completo di 129+ strumenti online gratuiti',
      intro: 'Scopri la raccolta completa di 129+ strumenti online e calcolatori affidabili, gratuiti e immediati da usare.',
    },
  },
};

export function getStaticPageTranslation(pageKey: StaticPageKey, locale: Locale): StaticPageTranslation {
  if (pageKey in STATIC_PAGE_TRANSLATIONS) {
    return STATIC_PAGE_TRANSLATIONS[pageKey][locale] || STATIC_PAGE_TRANSLATIONS[pageKey].en;
  }
  return STATIC_PAGE_TRANSLATIONS.about[locale] || STATIC_PAGE_TRANSLATIONS.about.en;
}

export const STATIC_PAGES_TRANSLATIONS = STATIC_PAGE_TRANSLATIONS;

