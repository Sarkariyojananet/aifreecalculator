import type { Locale } from '../../config';
import type { StaticPageTranslation } from '../../types';

export const PRIVACY_POLICY_TRANSLATIONS: Record<Locale, StaticPageTranslation> = {
  en: {
    locale: 'en',
    status: 'translated',
    name: 'Privacy Policy',
    metaTitle: 'Privacy Policy | AI Free Calculator',
    metaDescription: 'Privacy Policy for AI Free Calculator: Zero calculation storage. Client-side processing, Google AdSense cookies, analytics disclosure, and GDPR/CCPA rights.',
    h1: 'Privacy Policy',
    intro: 'Your privacy is our highest priority. We do not collect, store, or transmit your individual numerical calculations. Understand how our client-side tools protect you and how our advertising partners operate.',
    sections: [
      {
        title: '1. Introduction & Overview',
        content: `Welcome to AI Free Calculator (aifreecalculator.com). This Privacy Policy explains our practices regarding the collection, usage, protection, and disclosure of information when you access our calculation tools, web utilities, and services.

By using AI Free Calculator, you agree to the collection and use of information in accordance with this policy. If you disagree with any part of this policy, you may discontinue use of the website at any time.`
      },
      {
        title: '2. Calculation Inputs & Client-Side Architecture',
        content: `Unlike conventional cloud software that stores user inputs on remote servers, AI Free Calculator executes calculations directly inside your web browser using client-side JavaScript.

• Financial Calculations: Your income, tax brackets, loan amounts, monthly EMI figures, interest rates, and SIP investments remain exclusively on your local device.
• Civil & Construction Data: Dimensions, concrete mix ratios, rebar weights, brick counts, and BOQ estimates are calculated locally in browser memory.
• Health & Fitness Metrics: Body weight, height, age, BMI values, BMR rates, and calorie targets are never transmitted to our servers.

Summary: We do not log, sell, transmit, or retain your individual calculator numerical inputs on our servers.`
      },
      {
        title: '3. Information Automatically Collected',
        content: `When you browse our website, our hosting provider (such as Cloudflare) and analytics services may automatically collect standard non-personally identifiable technical data, including:

• Browser type, language preference, and operating system version.
• Approximate geographical location (country/city level, without precise GPS coordinates).
• Referring website URLs and exit pages.
• Page visit timestamps, calculation tool interactions, and error diagnostic logs.`
      },
      {
        title: '4. Cookies, Local Storage & Analytics',
        content: `We use cookies and browser local storage for essential and analytical functions:

• Theme & Preferences: Stores your chosen Dark / Light mode preference locally in localStorage so you do not have to re-select it on every visit.
• Saved Calculations: If you choose to save project estimates, they are stored locally in your browser storage.
• Google Analytics (GA4): Collects anonymous aggregated metrics (such as which calculators are visited most) to help us optimize server performance and prioritize new tools.

You can disable or delete cookies at any time through your web browser settings. Disabling cookies will not affect the core functionality of any calculation tool.`
      },
      {
        title: '5. Advertising Partners & Google AdSense',
        content: `We display advertisements provided by Google AdSense, Google Ad Manager (AdX), and authorized partner networks to cover server infrastructure and maintain free access for all visitors.

• Google DoubleClick / DART Cookies: Google, as a third-party vendor, uses cookies to serve ads based on prior visits to our site and other websites across the Internet.
• Personalized vs. Non-Personalized Ads: Depending on your jurisdiction and browser privacy settings, ads may be tailored based on generalized interests.
• Managing Your Choices: You can manage or disable Google personalized advertising by visiting Google Ads Settings (https://adssettings.google.com/) or the Digital Advertising Alliance Consumer Choice tool (https://optout.aboutads.info/).`
      },
      {
        title: '6. GDPR (EEA/UK) & CCPA/CPRA Privacy Rights',
        content: `Depending on your geographic location, you hold specific statutory data protection rights:

• Right to Access: Request confirmation of whether any personal information is retained.
• Right to Erasure / Deletion: Request deletion of any communications sent directly to our support inbox.
• Do Not Sell My Information: We do not sell, rent, or trade your personal information.
• Non-Discrimination: Equal access and identical calculator functionality regardless of privacy choices.`
      },
      {
        title: '7. Children’s Privacy (COPPA Compliance)',
        content: `AI Free Calculator does not knowingly solicit or collect personal data from children under the age of 13. If you believe a child has provided us with personal contact information, please notify us immediately, and we will promptly remove such records from our logs.`
      },
      {
        title: '8. Updates & Contacting Us About Privacy',
        content: `We may update our Privacy Policy periodically to reflect new features, regulations, or privacy technologies. Any updates will be published directly on this page with a revised effective date.

If you have questions, feedback, or inquiries regarding our privacy standards, please reach out via our Contact Us form or email our webmaster at support@aifreecalculator.com.`
      }
    ]
  },
  hi: {
    locale: 'hi',
    status: 'translated',
    name: 'गोपनीयता नीति',
    metaTitle: 'गोपनीयता नीति | AI Free Calculator',
    metaDescription: 'AI Free Calculator गोपनीयता नीति: शून्य डेटा संग्रह, क्लाइंट-साइड गणना, गूगल ऐडसेंस कुकीज़, एनालिटिक्स प्रकटीकरण और उपयोगकर्ता अधिकार।',
    h1: 'गोपनीयता नीति (Privacy Policy)',
    intro: 'आपकी गोपनीयता हमारे लिए सर्वोपरि है। हम आपके द्वारा दर्ज की गई किसी भी संख्या या गणना डेटा को एकत्रित या संग्रहीत नहीं करते। समझें कि हमारे क्लाइंट-साइड टूल्स आपकी सुरक्षा कैसे करते हैं और विज्ञापन भागीदार कैसे काम करते हैं।',
    sections: [
      {
        title: '1. परिचय एवं सामान्य विवरण',
        content: `AI Free Calculator (aifreecalculator.com) में आपका स्वागत है। यह गोपनीयता नीति यह स्पष्ट करती है कि जब आप हमारे मुफ़्त ऑनलाइन कैलकुलेटर और वेब टूल्स का उपयोग करते हैं, तो जानकारी का प्रबंधन और सुरक्षा कैसे की जाती है।

हमारी वेबसाइट का उपयोग करके, आप इस नीति के नियमों से सहमत होते हैं। यदि आप किसी भी नियम से असहमत हैं, तो आप किसी भी समय वेबसाइट का उपयोग बंद कर सकते हैं।`
      },
      {
        title: '2. गणना इनपुट एवं क्लाइंट-साइड आर्किटेक्चर',
        content: `पारंपरिक क्लाउड सॉफ़्टवेयर के विपरीत, जो उपयोगकर्ताओं के इनपुट डेटा को रिमोट सर्वर पर संग्रहीत करते हैं, AI Free Calculator की सभी गणनाएँ सीधे आपके वेब ब्राउज़र में जावास्क्रिप्ट द्वारा निष्पादित होती हैं।

• वित्तीय गणनाएँ: आपकी आय, टैक्स स्लैब, ऋण राशि, मासिक ईएमआई (EMI) और एसआईपी (SIP) निवेश के आंकड़े पूरी तरह आपके डिवाइस पर रहते हैं।
• निर्माण एवं इंजीनियरिंग डेटा: स्लैब आयाम, सीमेंट-रेत अनुपात, स्टील सरिया का वजन और मात्रा अनुमान केवल ब्राउज़र मेमोरी में प्रोसेस होते हैं।
• स्वास्थ्य एवं फिटनेस मेट्रिक्स: वजन, ऊंचाई, आयु, बीएमआई (BMI), बीएमआर और कैलोरी डेटा कभी हमारे सर्वर पर नहीं भेजा जाता।

निष्कर्ष: हम आपके द्वारा दर्ज किए गए किसी भी संख्यात्मक इनपुट को अपने सर्वर पर न तो लॉग करते हैं, न बेचते हैं, और न ही संग्रहीत करते हैं।`
      },
      {
        title: '3. स्वचालित रूप से एकत्र की जाने वाली तकनीकी जानकारी',
        content: `जब आप हमारी वेबसाइट पर आते हैं, तो हमारा होस्टिंग प्रदाता (जैसे Cloudflare) और एनालिटिक्स सेवाएँ सुरक्षा और तकनीकी प्रदर्शन के लिए गैर-व्यक्तिगत डेटा स्वचालित रूप से एकत्र कर सकती हैं:

• ब्राउज़र का प्रकार, भाषा और ऑपरेटिंग सिस्टम।
• अनुमानित भौगोलिक स्थिति (देश या शहर स्तर पर, बिना किसी सटीक जीपीएस के)।
• संदर्भित वेबसाइट (Referrer URL) और देखे गए पेज।
• विज़िट का समय, टूल इंटरेक्शन और एरर लॉग्स।`
      },
      {
        title: '4. कुकीज़, लोकल स्टोरेज और वेब एनालिटिक्स',
        content: `हम वेबसाइट की कार्यक्षमता और विश्लेषण के लिए कुकीज़ और लोकल स्टोरेज का उपयोग करते हैं:

• थीम और प्राथमिकताएँ: आपके द्वारा चुने गए डार्क या लाइट मोड को localStorage में सुरक्षित रखा जाता है ताकि हर बार पेज बदलने पर दोबारा चयन न करना पड़े।
• गूगल एनालिटिक्स (GA4): यह पहचान-रहित कुल विज़िट आँकड़े एकत्र करता है (जैसे किस कैलकुलेटर का सबसे अधिक उपयोग हुआ) ताकि हम सर्वर गति और टूल्स को बेहतर बना सकें।

आप अपने ब्राउज़र सेटिंग्स से किसी भी समय कुकीज़ को बंद या हटा सकते हैं। कुकीज़ बंद करने से किसी भी कैलकुलेटर की मुख्य गणना प्रभावित नहीं होती।`
      },
      {
        title: '5. विज्ञापन भागीदार एवं गूगल ऐडसेंस (Google AdSense)',
        content: `सर्वर लागत वहन करने और सभी टूल्स को 100% मुफ़्त बनाए रखने के लिए हम Google AdSense और अधिकृत विज्ञापन नेटवर्क द्वारा प्रदर्शित विज्ञापनों का उपयोग करते हैं।

• Google DoubleClick / DART कुकीज़: गूगल एक तृतीय-पक्ष विक्रेता के रूप में आपकी पिछली विज़िट के आधार पर प्रासंगिक विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करता है।
• व्यक्तिगत बनाम गैर-व्यक्तिगत विज्ञापन: आपके क्षेत्र और ब्राउज़र प्राथमिकताओं के अनुसार विज्ञापन दिखाए जा सकते हैं।
• विज्ञापन प्राथमिकताओं का नियंत्रण: आप Google Ads Settings (https://adssettings.google.com/) या DAA Consumer Choice (https://optout.aboutads.info/) पर जाकर व्यक्तिगत विज्ञापनों को बंद कर सकते हैं।`
      },
      {
        title: '6. डेटा सुरक्षा अधिकार (GDPR एवं CCPA)',
        content: `लागू कानूनों के अनुसार आपको निम्नलिखित अधिकार प्राप्त हैं:

• जानकारी का अधिकार: यह जानने का अधिकार कि क्या कोई व्यक्तिगत डेटा संसाधित हुआ है।
• डेटा हटाने का अधिकार: हमारे सपोर्ट ईमेल पर भेजे गए संदेशों को हटाने का अनुरोध करने का अधिकार।
• डेटा की कोई बिक्री नहीं: हम किसी भी उपयोगकर्ता का व्यक्तिगत डेटा न तो बेचते हैं और न ही किराए पर देते हैं।
• समान अधिकार: गोपनीयता प्राथमिकताओं के बावजूद सभी टूल्स का समान और निष्पक्ष उपयोग।`
      },
      {
        title: '7. बच्चों की गोपनीयता (COPPA अनुपालन)',
        content: `AI Free Calculator 13 वर्ष से कम आयु के बच्चों से जानबूझकर कोई व्यक्तिगत जानकारी एकत्र नहीं करता है। यदि आपको लगता है कि किसी बच्चे ने हमें कोई संपर्क जानकारी दी है, तो कृपया हमें सूचित करें, और हम उसे तुरंत हटा देंगे।`
      },
      {
        title: '8. नीति में संशोधन एवं संपर्क सूत्र',
        content: `हम नई सुविधाओं या कानूनी आवश्यकताओं के अनुसार समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। किसी भी बदलाव को इस पेज पर अद्यतन तिथि के साथ प्रकाशित किया जाएगा।

गोपनीयता संबंधी किसी भी प्रश्न, सुझाव या सहायता के लिए हमारे संपर्क पेज (Contact Us) पर जाएं या सीधे ईमेल करें: support@aifreecalculator.com`
      }
    ]
  },
  es: {
    locale: 'es',
    status: 'translated',
    name: 'Política de privacidad',
    metaTitle: 'Política de Privacidad | AI Free Calculator',
    metaDescription: 'Política de Privacidad de AI Free Calculator: Sin almacenamiento de cálculos. Procesamiento en el navegador, cookies de Google AdSense y derechos RGPD.',
    h1: 'Política de Privacidad',
    intro: 'Su privacidad es nuestra máxima prioridad. No recopilamos, almacenamos ni transmitimos los cálculos que realiza en nuestras herramientas. Conozca cómo protegen sus datos nuestras herramientas en el navegador y cómo operan nuestros socios publicitarios.',
    sections: [
      {
        title: '1. Introducción y Ámbito de Aplicación',
        content: `Bienvenido a AI Free Calculator (aifreecalculator.com). Esta Política de Privacidad describe nuestras prácticas sobre la recopilación, uso y protección de datos al utilizar nuestras herramientas y calculadoras online gratuitas.

Al acceder a nuestro sitio web, usted acepta los términos de esta política. Si no está de acuerdo con alguna disposición, puede suspender el uso del sitio en cualquier momento.`
      },
      {
        title: '2. Entradas de Cálculo y Arquitectura en el Cliente',
        content: `A diferencia de las aplicaciones web convencionales que envían sus datos a servidores remotos, AI Free Calculator procesa todas las fórmulas matemáticas directamente en su navegador mediante JavaScript del lado del cliente.

• Cálculos Financieros: Sus ingresos, tramos impositivos, cuotas de préstamos (EMI) e inversiones periódicas (SIP) permanecen exclusivamente en su dispositivo.
• Datos de Construcción y Obra: Dimensiones, dosificación de hormigón, cálculo de acero y cantidades de materiales se computan en la memoria local del navegador.
• Salud y Bienestar: Peso, altura, edad, IMC (BMI), tasa metabólica y calorías no se transmiten ni guardan en ningún servidor.

En resumen: No registramos, vendemos, transmitimos ni almacenamos en nuestros servidores los valores numéricos ingresados en las calculadoras.`
      },
      {
        title: '3. Datos Técnicos Recopilados Automáticamente',
        content: `Al navegar por el sitio, nuestra infraestructura de alojamiento (como Cloudflare) y herramientas analíticas pueden registrar datos técnicos no identificables con fines de seguridad y rendimiento:

• Tipo y versión de navegador, idioma y sistema operativo.
• Ubicación geográfica aproximada (nivel de país o ciudad, sin coordenadas GPS exactas).
• Páginas de referencia y páginas de salida.
• Fecha y hora de visita, interacción con las herramientas y registros de diagnóstico de errores.`
      },
      {
        title: '4. Cookies, Almacenamiento Local y Analítica Web',
        content: `Utilizamos cookies y almacenamiento local (localStorage) para funciones esenciales y analíticas:

• Preferencias de Interfaz: Guardamos localmente su preferencia de tema Claro / Oscuro para evitar configurarla en cada visita.
• Google Analytics (GA4): Recopila estadísticas globales y anónimas de navegación para optimizar la velocidad y estabilidad del servicio.

Puede deshabilitar o eliminar las cookies en cualquier momento a través de la configuración de su navegador. Hacerlo no afectará el funcionamiento matemático de las calculadoras.`
      },
      {
        title: '5. Publicidad y Google AdSense',
        content: `Para financiar los costes de servidores y mantener todas las herramientas 100% gratuitas, mostramos anuncios a través de Google AdSense y redes asociadas autorizadas.

• Cookies de DoubleClick / DART: Google utiliza cookies para mostrar anuncios basados en las visitas previas de los usuarios a este y otros sitios web.
• Anuncios Personalizados y No Personalizados: Según su ubicación geográfica y configuración de privacidad, los anuncios pueden basarse en intereses generales.
• Gestión de Preferencias: Puede inhabilitar la publicidad personalizada de Google visitando Configuración de anuncios de Google (https://adssettings.google.com/) o la herramienta de la Digital Advertising Alliance (https://optout.aboutads.info/).`
      },
      {
        title: '6. Derechos de Privacidad RGPD (UE) y CCPA/CPRA',
        content: `Conforme a las normativas aplicables de protección de datos, usted cuenta con los siguientes derechos:

• Derecho de Acceso: Saber si se procesan datos personales asociados a sus consultas.
• Derecho de Supresión: Solicitar el borrado de cualquier comunicación enviada a nuestro soporte.
• No Venta de Información: No vendemos ni alquilamos datos personales a terceros bajo ninguna circunstancia.
• No Discriminación: Mismo acceso y funcionalidad completa de todas las calculadoras independientemente de sus preferencias de privacidad.`
      },
      {
        title: '7. Protección de Menores (Cumplimiento COPPA)',
        content: `AI Free Calculator no recopila conscientemente datos de menores de 13 años. Si considera que un menor nos ha facilitado información de contacto, comuníquenoslo y eliminaremos dichos registros de forma inmediata.`
      },
      {
        title: '8. Modificaciones y Contacto',
        content: `Podemos actualizar esta política para adaptarla a novedades funcionales o normativas. Las actualizaciones se publicarán en esta página indicando la fecha de revisión.

Para consultas o aclaraciones sobre nuestra política de privacidad, contáctenos mediante el formulario de contacto o escribiendo a: support@aifreecalculator.com`
      }
    ]
  },
  ja: {
    locale: 'ja',
    status: 'translated',
    name: 'プライバシーポリシー',
    metaTitle: 'プライバシーポリシー | AI Free Calculator',
    metaDescription: 'AI Free Calculatorのプライバシーポリシー：計算数値のサーバー保存なし。ブラウザ完結処理、Google AdSenseクッキー、アクセス解析およびデータ保護方針。',
    h1: 'プライバシーポリシー (Privacy Policy)',
    intro: 'お客様のプライバシーは当サイトの最優先事項です。入力された数値や計算データが外部サーバーに送信・保管されることはありません。完全ブラウザ完結型の安全設計と広告配信の仕組みについてご確認ください。',
    sections: [
      {
        title: '1. 基本方針と概要',
        content: `AI Free Calculator（aifreecalculator.com）へようこそ。本プライバシーポリシーは、当サイトの各種オンライン計算ツールおよびWebユーティリティをご利用いただく際のデータ取り扱いと保護方針について説明するものです。

当サイトをご利用いただくことで、本ポリシーに同意されたものとみなされます。ご同意いただけない場合は、いつでも利用を中止していただけます。`
      },
      {
        title: '2. 計算データの完全クライアントサイド処理',
        content: `入力データを外部サーバーに送信・保存する一般的なクラウド型サービスとは異なり、AI Free Calculatorの計算ロジックはすべて利用者のブラウザ上でJavaScriptにより即時処理されます。

• 金融・ローン計算：年収、税率、借入額、毎月の返済額（EMI）、積立投信（SIP）の数値はお使いの端末内のみで処理されます。
• 建築・土木計算：スラブ寸法、コンクリート配合比、鉄筋重量、積算見積もりデータはブラウザメモリ内でのみ計算されます。
• 健康・フィットネス指標：体重、身長、年齢、BMI、基礎代謝量（BMR）、消費カロリーがサーバーへ送信されることは一切ありません。

結論：当サイトのサーバー上で計算用数値を記録、転送、販売、蓄積することは一切ございません。`
      },
      {
        title: '3. 自動的に収集される技術情報',
        content: `サイト閲覧時、セキュリティ保護およびサーバー最適化のため、ホスティング環境（Cloudflare等）およびアクセス解析ツールにより個人を特定しない技術情報が自動収集される場合があります：

• ブラウザの種類、言語設定、オペレーティングシステム（OS）。
• おおよその地域（国または都市レベル。詳細なGPS位置情報は取得しません）。
• 参照元URLおよび離脱ページ。
• 訪問日時、ツールの操作状況、システム診断エラーログ。`
      },
      {
        title: '4. クッキー（Cookie）、ローカルストレージ、アクセス解析',
        content: `当サイトでは機能提供と品質向上のため、CookieおよびlocalStorageを使用しています：

• テーマ設定：ダークモード／ライトモードの表示設定をお使いの端末のlocalStorageに保存し、再訪時の再設定を不要にしています。
• Google アナリティクス（GA4）：どの計算ツールが多く利用されているか等の統計情報を匿名で把握し、サービスの改善に役立てています。

Cookieはお使いのブラウザ設定からいつでも無効化・削除できます。無効化してもツールの計算機能に影響はありません。`
      },
      {
        title: '5. 広告配信およびGoogle AdSenseについて',
        content: `当サイトは、すべての計算ツールを完全無料で提供し続けるため、Google AdSenseをはじめとする第三者配信事業者の広告を掲載しています。

• DoubleClick / DART Cookie：Googleは当サイトや他サイトへの過去のアクセス情報に基づいて適切な広告を配信するためにCookieを使用します。
• パーソナライズ広告の配信：地域や設定に基づき、利用者の関心に応じた広告が表示される場合があります。
• 広告設定の管理：Googleの広告設定（https://adssettings.google.com/）またはオプトアウト管理ページ（https://optout.aboutads.info/）からパーソナライズ広告を無効にできます。`
      },
      {
        title: '6. 国際的なデータ保護権利（GDPR等）',
        content: `利用者の所在地に応じ、関連法令に基づく以下の権利が尊重されます：

• 情報へのアクセス権：ご自身の通信データに関する確認要請。
• 削除請求権：お問い合わせ窓口に送信されたメッセージ等の削除要請。
• 個人情報の非売却：当社が個人情報を第三者に販売・提供することは決してありません。
• 差別の禁止：プライバシー設定の選択に関わらず、すべての計算機能を同等に無料でご利用いただけます。`
      },
      {
        title: '7. 未成年者の保護（COPPA対応）',
        content: `当サイトは13歳未満のお子様から意図的に個人情報を収集することはありません。お子様が個人情報を入力されたと思われる場合は、速やかに管理者までご連絡ください。直ちに削除対応いたします。`
      },
      {
        title: '8. ポリシーの改定とお問い合わせ先',
        content: `本プライバシーポリシーは、新機能の導入や法改正に応じて適宜改定されることがあります。改定内容は本ページにて速やかに公表されます。

プライバシー方針に関するご質問・ご意見は、お問い合わせページ、または以下のメールアドレスまでお願いいたします：
support@aifreecalculator.com`
      }
    ]
  },
  fr: {
    locale: 'fr',
    status: 'translated',
    name: 'Politique de confidentialité',
    metaTitle: 'Politique de Confidentialité | AI Free Calculator',
    metaDescription: 'Politique de confidentialité de AI Free Calculator : Aucun stockage de calculs, traitement local dans le navigateur, cookies Google AdSense et droits RGPD.',
    h1: 'Politique de Confidentialité',
    intro: 'Le respect de votre vie privée est notre priorité absolue. Nous ne collectons, ne stockons et ne transmettons aucun chiffre saisi dans nos outils. Découvrez comment notre architecture locale protège vos données et comment nos partenaires publicitaires opèrent.',
    sections: [
      {
        title: '1. Introduction et Champ d’Application',
        content: `Bienvenue sur AI Free Calculator (aifreecalculator.com). La présente Politique de Confidentialité a pour objet de vous informer sur les modalités de traitement et de protection de vos données lors de l’utilisation de nos calculatrices et outils en ligne gratuits.

En utilisant notre site web, vous acceptez les termes énoncés ci-après. Si vous êtes en désaccord avec tout ou partie de ces dispositions, vous êtes libre d’interrompre votre navigation à tout moment.`
      },
      {
        title: '2. Traitement Local des Données (Architecture Client-Side)',
        content: `Contrairement aux logiciels en ligne traditionnels qui transfèrent vos chiffres vers des serveurs distants, AI Free Calculator exécute l'intégralité des calculs directement dans votre navigateur web via JavaScript.

• Calculs Financiers : Vos revenus, tranches d'imposition, montants d'emprunt, mensualités de crédit (EMI) et plans d'épargne (SIP) restent strictement confinés à votre appareil.
• Données Bâtiment et Génie Civil : Les dimensions de dalles, dosages de béton, poids d'armatures en acier et métrés sont calculés dans la mémoire vive de votre navigateur.
• Indicateurs Santé et Nutrition : Votre poids, taille, âge, IMC, métabolisme de base (BMR) et calories ne sont jamais transmis à nos serveurs.

En résumé : Aucun chiffre, montant ou paramètre saisi dans nos calculateurs n'est enregistré, vendu, transmis ou stocké sur nos serveurs.`
      },
      {
        title: '3. Données Techniques Collectées Automatiquement',
        content: `Lors de votre consultation du site, notre hébergeur (notamment Cloudflare) et nos services de mesure d'audience peuvent enregistrer automatiquement des données techniques anonymisées :

• Type de navigateur, langue de navigation et système d’exploitation.
• Localisation géographique approximative (au niveau du pays ou de la région, sans géolocalisation GPS).
• Pages de provenance (referrers) et pages de sortie.
• Date et heure des visites, interactions techniques et journaux d'erreurs.`
      },
      {
        title: '4. Cookies, Stockage Local et Mesure d’Audience',
        content: `Nous utilisons des cookies techniques et l'espace de stockage local (localStorage) pour les finalités suivantes :

• Préférences d'Affichage : Mémorisation de votre choix de mode Sombre / Clair afin de conserver votre confort visuel sur l'ensemble du site.
• Google Analytics (GA4) : Collecte d'indicateurs globaux et agrégés d'utilisation pour optimiser les performances techniques de nos serveurs.

Vous pouvez à tout instant configurer votre navigateur pour refuser ou supprimer les cookies. Cela n'altère en rien le bon fonctionnement mathématique de nos calculateurs.`
      },
      {
        title: '5. Partenaires Publicitaires et Google AdSense',
        content: `Afin d'assurer la gratuité intégrale de nos outils et financer nos infrastructures d'hébergement, nous affichons des encarts publicitaires gérés par Google AdSense et des réseaux partenaires agréés.

• Cookies DoubleClick / DART : Google utilise des cookies afin de diffuser des annonces pertinentes en fonction des visites antérieures des internautes.
• Annonces Personnalisées et Non-Personnalisées : Selon votre zone géographique et vos choix de consentement, les annonces peuvent être adaptées à des centres d'intérêt généraux.
• Gestion de Vos Préférences : Vous pouvez désactiver la personnalisation publicitaire de Google en consultant les paramètres Google Ads (https://adssettings.google.com/) ou via la plateforme Consumer Choice (https://optout.aboutads.info/).`
      },
      {
        title: '6. Droits RGPD (Union Européenne) et Droits à la Vie Privée',
        content: `Conformément aux réglementations relatives à la protection des données personnelles (notamment le RGPD), vous disposez des droits suivants :

• Droit d'Accès et d'Information : Vérifier si des données vous concernant ont été traitées.
• Droit à l'Effacement : Demander la suppression des messages adressés à notre service d'assistance.
• Non-Commercialisation des Données : Nous ne vendons, ne louons et ne cédons aucune donnée personnelle à des tiers.
• Égalité de Traitement : Accès libre et identique à l'ensemble des fonctionnalités du site, sans discrimination liée à vos préférences publicitaires.`
      },
      {
        title: '7. Protection des Mineurs (Réglementation COPPA)',
        content: `AI Free Calculator ne collecte sciemment aucune donnée personnelle auprès d'enfants de moins de 13 ans. Si vous constatez qu'un mineur nous a transmis des coordonnées personnelles, merci de nous contacter pour que nous procédions à leur suppression immédiate.`
      },
      {
        title: '8. Modifications et Contact',
        content: `La présente politique est susceptible d'évoluer en fonction des améliorations apportées au site ou des exigences légales. La date de dernière mise à jour est mentionnée en tête de page.

Pour toute question ou remarque concernant vos données personnelles, veuillez nous écrire via la page Contact ou à l'adresse suivante : support@aifreecalculator.com`
      }
    ]
  },
  de: {
    locale: 'de',
    status: 'translated',
    name: 'Datenschutzerklärung',
    metaTitle: 'Datenschutzerklärung | AI Free Calculator',
    metaDescription: 'Datenschutzerklärung von AI Free Calculator: Keine Speicherung von Rechenwerten. Clientseitige Verarbeitung, Google AdSense Cookies und DSGVO-Rechte.',
    h1: 'Datenschutzerklärung',
    intro: 'Der Schutz Ihrer personenbezogenen Daten hat für uns höchste Priorität. Wir erfassen, speichern und übermitteln keine Ihrer eingegebenen Berechnungswerte. Erfahren Sie hier, wie unsere browserbasierten Werkzeuge Ihre Daten schützen und wie Werbepartner arbeiten.',
    sections: [
      {
        title: '1. Allgemeine Hinweise und Überblick',
        content: `Willkommen bei AI Free Calculator (aifreecalculator.com). Diese Datenschutzerklärung informiert Sie darüber, welche Daten beim Besuch unserer Website erfasst werden und wie wir mit diesen Daten umgehen.

Durch die Nutzung unseres Angebots erklären Sie sich mit den nachfolgenden Regelungen einverstanden. Sollten Sie damit nicht einverstanden sein, bitten wir Sie, die Nutzung der Website zu beenden.`
      },
      {
        title: '2. Clientseitige Berechnung ohne Server-Speicherung',
        content: `Im Gegensatz zu vielen herkömmlichen Cloud-Anwendungen werden auf AI Free Calculator sämtliche Berechnungen unmittelbar in Ihrem Webbrowser mittels JavaScript auf Ihrem Endgerät ausgeführt.

• Finanzberechnungen: Angaben zu Gehalt, Darlehenssummen, monatlichen Kreditraten (EMI), Zinssätzen und Sparplänen (SIP) verbleiben ausschließlich lokal auf Ihrem Rechner oder Smartphone.
• Bautechnik und Statik: Betonmischungsverhältnisse, Deckenmaße, Stahlbewehrungsgewichte und Materialmengen werden rein temporär im Browser-Arbeitsspeicher kalkuliert.
• Gesundheit und Fitness: Gewicht, Körpergröße, Alter, BMI, Grundumsatz (BMR) und Kalorienbedarfe werden zu keinem Zeitpunkt an unsere Server übertragen.

Zusammenfassung: Eingegebene Zahlenwerte werden von uns weder erfasst, noch gespeichert, analysiert oder an Dritte weitergegeben.`
      },
      {
        title: '3. Automatische Erfassung technischer Server-Daten',
        content: `Beim Aufruf unserer Seiten erfassen unser Hostinganbieter (z. B. Cloudflare) und Analysedienste automatisch unpersönliche technische Informationen, die Ihr Browser übermittelt:

• Browsertyp, Version, Spracheinstellung und verwendetes Betriebssystem.
• Ungefährer geografischer Standort (auf Länder- oder Regionsebene, ohne exakte Standortkoordinaten).
• Zuvor besuchte Website (Referrer-URL) sowie Verweildauer und Interaktionen.
• Server-Logdateien zur Fehlerdiagnose und Angriffserkennung.`
      },
      {
        title: '4. Cookies, Lokaler Speicher (localStorage) und Webanalyse',
        content: `Wir setzen Cookies und den Browserspeicher (localStorage) für funktionale und analytische Zwecke ein:

• Benutzereinstellungen: Ihre Wahl des Dunkel- oder Hellmodus (Dark / Light Mode) wird lokal im localStorage Ihres Browsers gespeichert, um bei jedem Aufruf erhalten zu bleiben.
• Google Analytics (GA4): Dient der anonymisierten Auswertung der Besuchernutzung (z. B. welche Rechner am häufigsten nachgefragt werden), um die Serverkapazitäten gezielt auszubauen.

Sie können das Speichern von Cookies in Ihren Browsereinstellungen jederzeit deaktivieren oder gespeicherte Cookies löschen. Die Funktionsfähigkeit der Rechenwerkzeuge bleibt davon unberührt.`
      },
      {
        title: '5. Werbepartner und Google AdSense',
        content: `Um den Betrieb der Serverinfrastruktur zu finanzieren und alle Online-Rechner dauerhaft kostenfrei anzubieten, binden wir Werbeanzeigen von Google AdSense und autorisierten Werbenetzwerken ein.

• DoubleClick- und DART-Cookies: Google verwendet als Drittanbieter Cookies zur Anzeigenschaltung basierend auf vorherigen Besuchen dieser und anderer Websites im Internet.
• Personalisierte und nicht-personalisierte Werbung: Je nach Wohnsitz und Datenschutzeinstellungen können Anzeigen an allgemeine Interessen angepasst werden.
• Widerspruchsmöglichkeiten (Opt-Out): Sie können personalisierte Werbung über die Google-Anzeigeneinstellungen (https://adssettings.google.com/) oder die Verbraucherplattform (https://optout.aboutads.info/) deaktivieren.`
      },
      {
        title: '6. Datenschutzrechte nach der DSGVO (Europäische Union)',
        content: `Sofern Sie Ihren Wohnsitz in der Europäischen Union haben, stehen Ihnen nach der Datenschutz-Grundverordnung (DSGVO) umfassende Rechte zu:

• Recht auf Auskunft: Sie können Auskunft darüber verlangen, ob und welche personenbezogenen Daten bei Kontaktaufnahme verarbeitet werden.
• Recht auf Löschung: Sie können die Löschung von an unseren Support gesendeten E-Mails verlangen.
• Keine Datenveräußerung: Wir verkaufen oder vermieten unter keinen Umständen personenbezogene Daten an Dritte.
• Diskriminierungsfreie Nutzung: Die uneingeschränkte Nutzung sämtlicher Rechner steht Ihnen unabhängig von Ihren Datenschutzauswahlen kostenfrei offen.`
      },
      {
        title: '7. Schutz von Minderjährigen (COPPA)',
        content: `Unser Angebot richtet sich an ein allgemeines Publikum und erfasst nicht wissentlich personenbezogene Daten von Kindern unter 13 Jahren. Sollten uns solche Daten versehentlich zugegangen sein, werden wir diese nach entsprechendem Hinweis unverzüglich löschen.`
      },
      {
        title: '8. Änderungen und Kontaktmöglichkeiten',
        content: `Wir behalten uns vor, diese Datenschutzerklärung bei technischen Erweiterungen oder veränderten gesetzlichen Vorgaben anzupassen. Die jeweils aktuelle Fassung ist stets auf dieser Seite abrufbar.

Für Fragen zum Datenschutz erreichen Sie uns über unser Kontaktformular oder per E-Mail unter: support@aifreecalculator.com`
      }
    ]
  },
  pt: {
    locale: 'pt',
    status: 'translated',
    name: 'Política de privacidade',
    metaTitle: 'Política de Privacidade | AI Free Calculator',
    metaDescription: 'Política de Privacidade do AI Free Calculator: Zero armazenamento de cálculos. Processamento no navegador, cookies do Google AdSense e conformidade LGPD/GDPR.',
    h1: 'Política de Privacidade',
    intro: 'A sua privacidade é a nossa maior prioridade. Não coletamos, armazenamos ou transmitimos os valores numéricos inseridos em nossas ferramentas. Saiba como nosso processamento local protege suas informações.',
    sections: [
      {
        title: '1. Introdução e Visão Geral',
        content: `Bem-vindo ao AI Free Calculator (aifreecalculator.com). Esta Política de Privacidade descreve nossas práticas sobre a coleta, utilização e proteção de dados ao utilizar nossas calculadoras e utilitários online gratuitos.

Ao utilizar nosso site, você concorda com os termos aqui estabelecidos. Caso discorde de qualquer disposição, poderá cessar o uso a qualquer momento.`
      },
      {
        title: '2. Entradas de Cálculo e Execução no Lado do Cliente',
        content: `Ao contrário de softwares em nuvem convencionais que enviam suas informações para bancos de dados remotos, o AI Free Calculator processa todas as equações diretamente no seu navegador web via JavaScript.

• Cálculos Financeiros: Renda, alíquotas de impostos, valores de financiamento, parcelas mensais (EMI) e projeções de investimentos (SIP) permanecem apenas no seu dispositivo.
• Construção Civil e Engenharia: Dimensões de lajes, traço de concreto, peso de barras de aço e quantitativos de materiais rodam na memória local do navegador.
• Saúde e Fitness: Peso corporal, altura, idade, IMC, taxa metabólica basal (BMR) e calorias diárias nunca são enviados aos nossos servidores.

Resumo: Não registramos, vendemos, transmitimos nem retemos em servidores quaisquer números digitados em nossas calculadoras.`
      },
      {
        title: '3. Dados Técnicos Coletados Automaticamente',
        content: `Ao navegar em nossas páginas, nosso provedor de infraestrutura (como Cloudflare) e serviços analíticos podem coletar dados técnicos não identificáveis para fins de segurança e desempenho:

• Tipo e versão do navegador, idioma e sistema operacional.
• Localização geográfica aproximada (nível de país ou cidade, sem coordenadas GPS precisas).
• URLs de referência e páginas de saída.
• Horários de acesso, interações com as ferramentas e relatórios de erro.`
      },
      {
        title: '4. Cookies, Armazenamento Local e Análise de Tráfego',
        content: `Utilizamos cookies e armazenamento local (localStorage) para finalidades essenciais e analíticas:

• Preferências de Exibição: Armazenamos sua escolha de modo Escuro / Claro no localStorage do seu navegador para manter a consistência visual.
• Google Analytics (GA4): Coleta métricas consolidadas e anônimas de tráfego para aprimorar a estabilidade do servidor e identificar quais ferramentas necessitam de expansão.

Você pode desativar ou apagar cookies a qualquer momento através das configurações do seu navegador web, sem prejuízo ao funcionamento dos cálculos.`
      },
      {
        title: '5. Parceiros de Publicidade e Google AdSense',
        content: `Para custear os servidores e manter todas as ferramentas 100% gratuitas, veiculamos anúncios fornecidos pelo Google AdSense e redes parceiras autorizadas.

• Cookies DoubleClick / DART: O Google utiliza cookies para veicular anúncios com base nas visitas anteriores dos usuários a este e a outros sites na Internet.
• Anúncios Personalizados e Não Personalizados: Conforme sua região e preferências, os anúncios podem refletir interesses gerais.
• Gerenciamento de Opções: Você pode desativar anúncios personalizados visitando as Configurações de Anúncios do Google (https://adssettings.google.com/) ou a ferramenta Consumer Choice (https://optout.aboutads.info/).`
      },
      {
        title: '6. Direitos de Proteção de Dados (LGPD e GDPR)',
        content: `Em conformidade com a legislação aplicável (como LGPD no Brasil e GDPR na Europa), você possui direitos garantidos:

• Direito de Confirmação e Acesso: Confirmar a existência de tratamento de dados de contato eventualmente enviados.
• Direito de Eliminação: Solicitar a exclusão de mensagens encaminhadas ao nosso canal de suporte.
• Não Comercialização: Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais.
• Tratamento Isonômico: Acesso idêntico e irrestrito a todas as ferramentas, independentemente das suas preferências de privacidade.`
      },
      {
        title: '7. Privacidade Infantil (Conformidade COPPA)',
        content: `O AI Free Calculator não coleta intencionalmente dados pessoais de crianças menores de 13 anos. Se você acredita que uma criança nos forneceu dados de contato, avise-nos imediatamente para exclusão segura.`
      },
      {
        title: '8. Atualizações desta Política e Contato',
        content: `Podemos revisar esta Política de Privacidade para acompanhar melhorias tecnológicas ou exigências legais. As alterações serão disponibilizadas nesta página com a data de revisão.

Dúvidas ou solicitações sobre privacidade podem ser enviadas pelo formulário de contato ou pelo e-mail: support@aifreecalculator.com`
      }
    ]
  },
  ko: {
    locale: 'ko',
    status: 'translated',
    name: '개인정보 처리방침',
    metaTitle: '개인정보 처리방침 | AI Free Calculator',
    metaDescription: 'AI Free Calculator 개인정보 처리방침: 계산 수치 서버 미저장, 브라우저 로컬 연산, Google AdSense 쿠키 정책 및 이용자 권리 안내.',
    h1: '개인정보 처리방침 (Privacy Policy)',
    intro: '이용자의 개인정보 보호는 당사의 최우선 가치입니다. 입력하신 금융, 건강, 공학 계산 수치는 외부 서버로 전송되거나 보관되지 않습니다. 브라우저 기반 보안 구조와 광고 운영 방식을 확인하세요.',
    sections: [
      {
        title: '1. 개요 및 기본 방침',
        content: `AI Free Calculator(aifreecalculator.com)에 오신 것을 환영합니다. 본 개인정보 처리방침은 무료 온라인 계산기 및 웹 도구 서비스를 이용할 때 발생하는 정보의 처리 및 보호 기준을 안내합니다.

본 웹사이트를 이용함으로써 이용자는 본 방침의 내용에 동의하게 됩니다. 동의하지 않으실 경우 언제든지 이용을 중단하실 수 있습니다.`
      },
      {
        title: '2. 계산 입력값의 클라이언트 사이드 연산 처리',
        content: `입력된 수치를 원격 서버 데이터베이스에 저장하는 일반적인 클라우드 소프트웨어와 달리, AI Free Calculator의 모든 수식 연산은 브라우저 내부 자바스크립트를 통해 100% 로컬 환경에서 수행됩니다.

• 금융 및 세금 계산: 소득, 세율 구간, 대출 원금, 월 상환액(EMI), 적립식 펀드(SIP) 계산 수치는 이용자의 기기 내부에서만 처리됩니다.
• 건축 및 토목 데이터: 슬래브 규격, 콘크리트 배합비, 철근 소요량 및 물량 견적 수치는 브라우저 메모리에서만 즉시 계산됩니다.
• 건강 및 신체 지표: 체중, 신장, 나이, BMI 수치, 기초대사량(BMR), 칼로리 소모량은 외부 서버로 전송되지 않습니다.

요약: 당사는 이용자가 계산기에 입력한 개별 수치를 서버에 수집, 저장, 전송 또는 판매하지 않습니다.`
      },
      {
        title: '3. 자동으로 수집되는 기술적 정보',
        content: `웹사이트 방문 시 호스팅 제공업체(Cloudflare 등) 및 분석 도구를 통해 시스템 보안과 안정성 유지를 위해 비식별 기술 정보가 자동 수집될 수 있습니다:

• 브라우저 종류, 언어 설정 및 운영체제(OS) 버전.
• 대략적인 접속 국가 및 도시(정밀 GPS 좌표는 수집하지 않음).
• 유입 경로(Referrer URL) 및 접속 종료 페이지.
• 방문 일시, 계산기 상호작용 지표 및 시스템 오류 진단 로그.`
      },
      {
        title: '4. 쿠키(Cookie), 로컬 스토리지 및 분석 도구',
        content: `당사는 기능 제공 및 사용성 개선을 위해 쿠키와 브라우저 로컬 스토리지(localStorage)를 활용합니다:

• 환경설정 저장: 다크 모드 / 라이트 모드 선택 상태를 브라우저 localStorage에 보관하여 페이지 이동 시에도 일관된 화면을 유지합니다.
• Google 애널리틱스(GA4): 서비스 속도 개선과 신규 도구 개발 우선순위 결정을 위해 익명화된 방문 통계를 수집합니다.

이용자는 웹 브라우저 설정을 통해 언제든지 쿠키 저장을 거부하거나 삭제할 수 있으며, 쿠키를 비활성화하더라도 계산기의 기본 연산 기능은 정상 작동합니다.`
      },
      {
        title: '5. 광고 파트너 및 Google AdSense 안내',
        content: `당사는 서버 유지 비용을 충당하고 모든 계산기를 무료로 운영하기 위해 Google AdSense 및 공인 광고 네트워크의 제휴 광고를 게재합니다.

• DoubleClick / DART 쿠키: Google은 제3자 공급업체로서 본 웹사이트 및 인터넷상의 타 사이트 방문 기록을 바탕으로 관련성 높은 광고를 제공하기 위해 쿠키를 사용합니다.
• 맞춤형 광고 설정 관리: 이용자는 Google 광고 설정(https://adssettings.google.com/) 또는 온라인 선택 도구(https://optout.aboutads.info/)를 방문하여 맞춤형 광고 수신 여부를 직접 설정할 수 있습니다.`
      },
      {
        title: '6. 이용자의 권리 및 데이터 보호',
        content: `관련 데이터 보호 법령에 따라 이용자는 다음과 같은 권리를 가집니다:

• 처리 현황 확인: 고객지원 문의 시 전달된 정보의 처리 여부 확인 요청 권리.
• 정보 삭제 요청: 고객센터로 발송된 이메일 기록의 영구 삭제 요청 권리.
• 개인정보 무단 판매 금지: 당사는 이용자의 정보를 영리 목적으로 제3자에게 판매하거나 대여하지 않습니다.
• 차별 없는 서비스: 광고 설정이나 쿠키 허용 여부와 관계없이 모든 이용자에게 차별 없이 동등한 무료 계산 기능을 제공합니다.`
      },
      {
        title: '7. 아동의 개인정보 보호 (COPPA 준수)',
        content: `AI Free Calculator는 만 13세 미만 아동의 개인정보를 고의로 수집하지 않습니다. 아동의 정보가 접수된 사실을 인지하신 경우 즉시 고객지원팀으로 알려주시면 신속히 파기 조치하겠습니다.`
      },
      {
        title: '8. 방침 변경 및 문의 안내',
        content: `본 개인정보 처리방침은 신규 기능 추가 또는 법률 변경에 따라 개정될 수 있으며, 변경 사항은 본 페이지를 통해 공지됩니다.

개인정보 처리 및 보안과 관련된 문의 사항은 고객지원 페이지 또는 전용 이메일로 접수해 주시기 바랍니다: support@aifreecalculator.com`
      }
    ]
  },
  it: {
    locale: 'it',
    status: 'translated',
    name: 'Informativa sulla privacy',
    metaTitle: 'Informativa sulla Privacy | AI Free Calculator',
    metaDescription: 'Informativa sulla Privacy di AI Free Calculator: Nessuna archiviazione dei calcoli. Elaborazione locale nel browser, cookie Google AdSense e diritti GDPR.',
    h1: 'Informativa sulla Privacy',
    intro: 'La tua privacy è la nostra massima priorità. Non raccogliamo, salviamo né trasmettiamo i valori numerici inseriti nei moduli di calcolo. Scopri come l’architettura client-side protegge i tuoi dati e come operano i nostri partner pubblicitari.',
    sections: [
      {
        title: '1. Introduzione e Principi Generali',
        content: `Benvenuto su AI Free Calculator (aifreecalculator.com). La presente Informativa sulla Privacy illustra le nostre modalità di gestione, protezione e tutela dei dati durante l'utilizzo dei nostri strumenti di calcolo gratuiti.

Utilizzando i servizi del nostro sito, accetti le condizioni descritte in questa informativa. Qualora non fossi d'accordo con tali termini, puoi interrompere la navigazione in qualsiasi momento.`
      },
      {
        title: '2. Elaborazione Locale dei Dati (Client-Side)',
        content: `A differenza dei comuni software cloud che inviano i dati a database remoti, AI Free Calculator esegue tutte le formule matematiche direttamente all'interno del tuo browser web tramite JavaScript locale.

• Calcoli Finanziari: Reddito, aliquote fiscali, importi dei prestiti, rate mensili (EMI) e piani di accumulo (SIP) rimangono esclusivamente sul tuo dispositivo.
• Dati per Edilizia e Ingegneria: Dimensioni delle solette, dosaggio del calcestruzzo, peso delle armature in acciaio e computi metrici vengono elaborati nella memoria temporanea del browser.
• Parametri Salute e Benessere: Peso, altezza, età, indice di massa corporea (BMI), metabolismo basale (BMR) e fabbisogno calorico non vengono mai inviati ai nostri server.

Riepilogo: Non registriamo, vendiamo, trasmettiamo né conserviamo sui nostri server i dati numerici immessi nelle calcolatrici.`
      },
      {
        title: '3. Dati Tecnici Raccolti Automaticamente',
        content: `Durante la navigazione, il nostro fornitore di hosting (tra cui Cloudflare) e gli strumenti di diagnostica possono registrare automaticamente dati tecnici anonimizzati:

• Tipo e versione del browser, lingua impostata e sistema operativo.
• Posizione geografica approssimativa (a livello di nazione o città, senza geolocalizzazione GPS precisa).
• Pagine di provenienza (referral) e pagine di uscita.
• Orari delle visite, interazioni con gli strumenti e registri di diagnostica errori.`
      },
      {
        title: '4. Cookie, Archiviazione Locale e Analisi Web',
        content: `Utilizziamo cookie e lo spazio di archiviazione locale (localStorage) per finalità essenziali e statistiche:

• Preferenze di Visualizzazione: Memorizziamo la preferenza della modalità Scura / Chiara nel localStorage del browser per offrirti una navigazione coerente.
• Google Analytics (GA4): Raccoglie metriche aggregate e anonime sull'utilizzo degli strumenti per consentirci di potenziare le prestazioni dei server.

Puoi disattivare o rimuovere i cookie in qualunque momento tramite le impostazioni del tuo browser. Ciò non influenzerà il funzionamento matematico degli strumenti di calcolo.`
      },
      {
        title: '5. Partner Pubblicitari e Google AdSense',
        content: `Per coprire i costi dei server e mantenere l'accesso a tutti i calcolatori completamente gratuito, ospitiamo annunci pubblicitari erogati da Google AdSense e reti autorizzate.

• Cookie DoubleClick / DART: Google, in qualità di fornitore terzo, impiega cookie per mostrare annunci basati sulle visite precedenti degli utenti al nostro e ad altri siti web.
• Annunci Personalizzati e Non Personalizzati: A seconda della tua area geografica e delle preferenze espresse, le inserzioni possono riflettere interessi generici.
• Gestione delle Preferenze Pubblicitarie: Puoi disattivare gli annunci personalizzati accedendo alle Impostazioni Annunci di Google (https://adssettings.google.com/) o alla piattaforma Consumer Choice (https://optout.aboutads.info/).`
      },
      {
        title: '6. Diritti di Protezione dei Dati (Regolamento GDPR)',
        content: `In conformità alle disposizioni del Regolamento Generale sulla Protezione dei Dati (GDPR), gli utenti residenti nello Spazio Economico Europeo godono dei seguenti diritti:

• Diritto di Accesso: Verificare se eventuali dati di contatto inviati al supporto siano stati trattati.
• Diritto alla Cancellazione: Richiedere la rimozione tempestiva delle comunicazioni trasmesse via email.
• Divieto di Vendita Dati: Non vendiamo né cediamo a titolo oneroso i dati degli utenti a terzi.
• Trattamento Non Discriminatorio: Accesso libero e identico a tutte le funzionalità del sito a prescindere dalle scelte di consenso espresse.`
      },
      {
        title: '7. Tutela dei Minori (Conformità COPPA)',
        content: `AI Free Calculator non raccoglie consapevolmente informazioni personali appartenenti a minori di 13 anni. Qualora un genitore o tutore riscontrasse l'invio di dati personali da parte di un minore, è pregato di contattarci per la rimozione immediata.`
      },
      {
        title: '8. Aggiornamenti dell’Informativa e Contatti',
        content: `Ci riserviamo il diritto di aggiornare periodicamente la presente Informativa sulla Privacy in conformità a modifiche operative o legali. Ogni revisione sarà pubblicata su questa pagina con la data aggiornata.

Per qualsiasi chiarimento o richiesta sui tuoi dati personali, puoi utilizzare la nostra pagina di contatto o scriverci direttamente all'indirizzo: support@aifreecalculator.com`
      }
    ]
  }
};
