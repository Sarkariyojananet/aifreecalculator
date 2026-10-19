/**
 * Utility Tools Definitions (5 Tools x 9 Locales)
 * qr-code-generator, word-counter, json-formatter, json-validator, password-generator
 */

function createMultiLocaleTool({ formulaTitle, formulaDescription, stepByStep, workedExample, faqs }) {
  const result = {};
  const locales = ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const loc of locales) {
    result[loc] = {
      formulaTitle: formulaTitle[loc] || formulaTitle.en,
      formulaDescription: formulaDescription[loc] || formulaDescription.en,
      stepByStep: stepByStep[loc] || stepByStep.en,
      workedExample: workedExample[loc] || workedExample.en,
      faqs: faqs[loc] || faqs.en,
    };
  }
  return result;
}

export const utilityToolsDefinitions = {
  // 1. Password Generator
  'password-generator': createMultiLocaleTool({
    formulaTitle: {
      en: 'CSPRNG Cryptographic Entropy & Password Security Architecture',
      hi: 'CSPRNG क्रिप्टोग्राफिक एन्ट्रॉपी और पासवर्ड सुरक्षा संरचना',
      es: 'Arquitectura de Entropía Criptográfica y Seguridad CSPRNG',
      ja: 'CSPRNG暗号学的エントロピーとパスワードセキュリティ構造',
      fr: 'Architecture d\'Entropie Cryptographique et Sécurité CSPRNG',
      de: 'CSPRNG Kryptografische Entropie & Passwort-Sicherheitsarchitektur',
      pt: 'Arquitetura de Entropia Criptográfica CSPRNG e Segurança de Senhas',
      ko: 'CSPRNG 암호학적 엔트로피 및 비밀번호 보안 구조',
      it: 'Architettura di Entropia Crittografica CSPRNG e Sicurezza Password'
    },
    formulaDescription: {
      en: 'Password generation uses the browser\'s native Cryptographically Secure Pseudo-Random Number Generator (window.crypto.getRandomValues) to select unbiased characters across selected character sets, achieving high bit entropy (Entropy = L × log2(N)) without external server communication.',
      hi: 'पासवर्ड निर्माण ब्राउज़र के मूल क्रिप्टोग्राफिक सुरक्षित रैंडम नंबर जनरेटर (window.crypto.getRandomValues) का उपयोग करता है। यह चयनित वर्ण सेटों से बिना किसी सर्वर संचार के उच्च एन्ट्रॉपी (Entropy = L × log2(N)) वाले पासवर्ड उत्पन्न करता है।',
      es: 'La generación de contraseñas utiliza el generador de números pseudoaleatorios criptográficamente seguro nativo del navegador (window.crypto.getRandomValues), logrando alta entropía en bits (Entropía = L × log2(N)) sin transferencias a servidores.',
      ja: 'パスワード生成にはブラウザ標準の暗号学的擬似乱数生成器（window.crypto.getRandomValues）を採用。外部サーバーとの通信を一切行わず、高いビットエントロピー（エントロピー = L × log2(N)）を持つ安全な乱数列を抽出します。',
      fr: 'La génération de mots de passe s\'appuie sur l\'API native du navigateur (window.crypto.getRandomValues), garantissant une sélection non biaisée des caractères et une haute entropie en bits (Entropie = L × log2(N)) sans transmission réseau.',
      de: 'Die Passworterstellung nutzt den browserintegrierten kryptografisch sicheren Pseudozufallszahlengenerator (window.crypto.getRandomValues). Ohne Serverkontakt wird eine hohe Bit-Entropie (Entropie = L × log2(N)) gewährleistet.',
      pt: 'A geração de senhas emprega a API criptograficamente segura nativa do navegador (window.crypto.getRandomValues), alcançando alta entropia em bits (Entropia = L × log2(N)) sem qualquer envio de dados para servidores.',
      ko: '비밀번호 생성은 브라우저 표준 암호학적 난수 생성기(window.crypto.getRandomValues)를 사용하여 외부 서버 통신 없이 높은 비트 엔트로피(Entropy = L × log2(N))의 안전한 무작위 문자열을 생성합니다.',
      it: 'La generazione della password adotta il generatore crittografico nativo del browser (window.crypto.getRandomValues), garantendo un\'elevata entropia in bit (Entropia = L × log2(N)) senza alcun transito su server remoti.'
    },
    stepByStep: {
      en: [
        { stepNumber: 1, title: 'Set Desired Length', instruction: 'Use the slider or input field to choose password length (minimum 12 to 16 characters recommended for strong accounts).' },
        { stepNumber: 2, title: 'Select Character Sets', instruction: 'Toggle uppercase letters (A-Z), lowercase letters (a-z), numeric digits (0-9), and special symbols (!@#$%^&*).' },
        { stepNumber: 3, title: 'Optionally Exclude Ambiguous Characters', instruction: 'Enable the option to exclude confusing characters like 0, O, 1, l, and I for easier manual typing.' },
        { stepNumber: 4, title: 'Generate & Copy', instruction: 'Click Generate to produce new random passwords instantly, inspect entropy strength, and click Copy to clipboard.' }
      ],
      hi: [
        { stepNumber: 1, title: 'लंबाई चुनें', instruction: 'स्लाइडर या इनपुट बॉक्स से पासवर्ड की लंबाई निर्धारित करें (सुरक्षा के लिए कम से कम 12-16 अक्षर अनुशंसित हैं)।' },
        { stepNumber: 2, title: 'वर्ण श्रेणियां चुनें', instruction: 'बड़े अक्षर (A-Z), छोटे अक्षर (a-z), अंक (0-9) और विशेष चिह्न (!@#$%^&*) चेक करें।' },
        { stepNumber: 3, title: 'भ्रमित करने वाले अक्षर हटाएं', instruction: 'टाइप करने में आसानी के लिए 0, O, 1, l जैसे एक जैसे दिखने वाले अक्षरों को हटाने का विकल्प चुनें।' },
        { stepNumber: 4, title: 'पासवर्ड बनाएं और कॉपी करें', instruction: 'जेनरेट बटन पर क्लिक करके नया पासवर्ड बनाएं और कॉपी बटन दबाकर क्लिपबोर्ड पर सुरक्षित करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Definir longitud', instruction: 'Ajuste la longitud deseada con el control deslizante (se recomiendan de 12 a 16 caracteres para cuentas importantes).' },
        { stepNumber: 2, title: 'Seleccionar tipos de caracteres', instruction: 'Active mayúsculas (A-Z), minúsculas (a-z), números (0-9) y símbolos especiales (!@#$%^&*).' },
        { stepNumber: 3, title: 'Excluir caracteres confusos', instruction: 'Opcionalmente elimine caracteres similares como 0, O, 1, l e I para facilitar la lectura manual.' },
        { stepNumber: 4, title: 'Generar y copiar', instruction: 'Haga clic en Generar para crear contraseñas seguras al instante y pulse Copiar para guardarla en el portapapeles.' }
      ],
      ja: [
        { stepNumber: 1, title: '文字数の設定', instruction: 'スライダーを動かしてパスワードの長さを指定します（強固なセキュリティには12〜16文字以上を推奨）。' },
        { stepNumber: 2, title: '文字種の選択', instruction: '英大文字(A-Z)、英小文字(a-z)、数字(0-9)、特殊記号(!@#$%^&*)から必要な組み合わせを選択します。' },
        { stepNumber: 3, title: '紛らわしい文字の除外', instruction: '視認性を高めたい場合は、0とO、1とlなどの混同しやすい文字を除外する設定を有効にします。' },
        { stepNumber: 4, title: '生成とコピー', instruction: '生成ボタンを押して暗号学的に安全なパスワードを作成し、ワンクリックでクリップボードにコピーします。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Définir la longueur', instruction: 'Ajustez le curseur pour choisir le nombre de caractères (12 à 16 caractères recommandés pour une sécurité optimale).' },
        { stepNumber: 2, title: 'Sélectionner les jeux de caractères', instruction: 'Cochez les majuscules (A-Z), minuscules (a-z), chiffres (0-9) et symboles spéciaux (!@#$%^&*).' },
        { stepNumber: 3, title: 'Exclure les caractères ambigus', instruction: 'Activez l\'option pour retirer les caractères confus comme 0, O, 1, l ou I si vous devez saisir le mot de passe manuellement.' },
        { stepNumber: 4, title: 'Générer et copier', instruction: 'Cliquez sur Générer pour créer le mot de passe instantanément, puis cliquez sur Copier.' }
      ],
      de: [
        { stepNumber: 1, title: 'Länge festlegen', instruction: 'Wählen Sie mit dem Schieberegler die Zeichenanzahl (mindestens 12 bis 16 Zeichen für sensible Konten empfohlen).' },
        { stepNumber: 2, title: 'Zeichensätze wählen', instruction: 'Aktivieren Sie Großbuchstaben (A-Z), Kleinbuchstaben (a-z), Ziffern (0-9) und Sonderzeichen (!@#$%^&*).' },
        { stepNumber: 3, title: 'Mehrdeutige Zeichen ausschließen', instruction: 'Entfernen Sie auf Wunsch schwer unterscheidbare Zeichen wie 0, O, 1, l und I.' },
        { stepNumber: 4, title: 'Erzeugen & Kopieren', instruction: 'Klicken Sie auf Generieren, um ein sicheres Passwort zu erstellen, und kopieren Sie es mit einem Klick in die Zwischenablage.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Definir o comprimento', instruction: 'Ajuste o seletor para determinar o total de caracteres (recomenda-se entre 12 e 16 caracteres para contas sensíveis).' },
        { stepNumber: 2, title: 'Escolher os grupos de caracteres', instruction: 'Marque letras maiúsculas (A-Z), minúsculas (a-z), números (0-9) e símbolos especiais (!@#$%^&*).' },
        { stepNumber: 3, title: 'Excluir caracteres ambíguos', instruction: 'Ative a opção de excluir caracteres parecidos como 0, O, 1, l e I para facilitar a digitação manual.' },
        { stepNumber: 4, title: 'Gerar e copiar', instruction: 'Clique em Gerar para obter a senha criptográfica e use o botão Copiar para transferi-la à área de transferência.' }
      ],
      ko: [
        { stepNumber: 1, title: '비밀번호 길이 지정', instruction: '슬라이더를 조절하여 원하는 글자 수를 선택합니다(보안 강화를 위해 12~16자 이상 권장).' },
        { stepNumber: 2, title: '문자 조합 선택', instruction: '대문자(A-Z), 소문자(a-z), 숫자(0-9), 특수문자(!@#$%^&*) 옵션을 원하는 대로 활성화합니다.' },
        { stepNumber: 3, title: '혼동하기 쉬운 문자 제외', instruction: '수동 입력 시 헷갈리기 쉬운 문자(0, O, 1, l, I)를 제외하도록 설정할 수 있습니다.' },
        { stepNumber: 4, title: '생성 및 복사', instruction: '생성 버튼을 눌러 암호학적으로 안전한 무작위 비밀번호를 확인하고 복사 버튼을 눌러 클립보드에 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Impostare la lunghezza', instruction: 'Regola la barra di scorrimento (consigliati da 12 a 16 caratteri per account importanti).' },
        { stepNumber: 2, title: 'Selezionare i caratteri', instruction: 'Attiva lettere maiuscole (A-Z), minuscole (a-z), cifre numeriche (0-9) e simboli speciali (!@#$%^&*).' },
        { stepNumber: 3, title: 'Escludere caratteri ambigui', instruction: 'Attiva l\'esclusione di caratteri simili come 0, O, 1, l e I per facilitare la digitazione manuale.' },
        { stepNumber: 4, title: 'Genera e copia', instruction: 'Fai clic su Genera per calcolare la nuova password e premi Copia per incollarla in sicurezza.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Master Account Password Generation Example',
        scenario: 'Configuring a master password for a secure email vault requiring high entropy and 16 characters.',
        calculation: 'Pool size N = 26 + 26 + 10 + 32 = 94. Length L = 16. Entropy = 16 × log2(94) ≈ 104.8 bits. CSPRNG draws 16 unbiased byte indices.',
        result: 'Generated Password: "k9#VxQ7!m$2Pz@8L" with ~105 bits of cryptographic strength (brute-force infeasible).'
      },
      hi: {
        title: 'सुरक्षित ईमेल खाते के लिए पासवर्ड निर्माण उदाहरण',
        scenario: 'एक सुरक्षित ईमेल वॉल्ट के लिए 16 अक्षरों का उच्च एन्ट्रॉपी वाला मास्टर पासवर्ड बनाना।',
        calculation: 'वर्ण पूल N = 26 + 26 + 10 + 32 = 94। लंबाई L = 16। एन्ट्रॉपी = 16 × log2(94) ≈ 104.8 बिट्स। CSPRNG द्वारा 16 निष्पक्ष यादृच्छिक सूचकांक चुने गए।',
        result: 'उत्पन्न पासवर्ड: "k9#VxQ7!m$2Pz@8L" (~105 बिट्स क्रिप्टोग्राफिक सुरक्षा, ब्रूट-फोर्स असंभव)।'
      },
      es: {
        title: 'Ejemplo de Generación para Cuenta Maestra',
        scenario: 'Crear una contraseña de 16 caracteres con alta entropía para un gestor de correo confidencial.',
        calculation: 'Tamaño del conjunto N = 26 + 26 + 10 + 32 = 94. Longitud L = 16. Entropía = 16 × log2(94) ≈ 104,8 bits.',
        result: 'Contraseña generada: "k9#VxQ7!m$2Pz@8L" con ~105 bits de robustez criptográfica.'
      },
      ja: {
        title: 'マスターアカウント用パスワード生成の実例',
        scenario: '16文字かつ英数記号を含む高エントロピーな重要アカウント用パスワードを作成する構成例。',
        calculation: '文字種総数 N = 94、文字列長 L = 16。エントロピー = 16 × log2(94) ≈ 104.8ビット。CSPRNGにより偏りなく抽出。',
        result: '生成結果: "k9#VxQ7!m$2Pz@8L"（暗号強度約105ビット、総当たり攻撃に対する耐性を確保）。'
      },
      fr: {
        title: 'Exemple de Création pour Compte Sécurisé',
        scenario: 'Configuration d\'un mot de passe principal de 16 caractères pour un compte professionnel.',
        calculation: 'Taille du réservoir N = 94. Longueur L = 16. Entropie = 16 × log2(94) ≈ 104,8 bits.',
        result: 'Mot de passe généré : "k9#VxQ7!m$2Pz@8L" avec une robustesse cryptographique d\'environ 105 bits.'
      },
      de: {
        title: 'Praxisbeispiel für ein Master-Passwort',
        scenario: 'Erstellung eines 16-stelligen Passworts mit maximaler Entropie für einen sicheren Passwort-Tresor.',
        calculation: 'Zeichenpool N = 94. Länge L = 16. Entropie = 16 × log2(94) ≈ 104,8 Bit.',
        result: 'Erzeugtes Passwort: "k9#VxQ7!m$2Pz@8L" mit ~105 Bit kryptografischer Schutzstärke.'
      },
      pt: {
        title: 'Exemplo de Criação de Senha para Conta Mestra',
        scenario: 'Configurar uma senha de 16 caracteres para um cofre de dados confidenciais.',
        calculation: 'Tamanho do conjunto N = 94. Comprimento L = 16. Entropia = 16 × log2(94) ≈ 104,8 bits.',
        result: 'Senha gerada: "k9#VxQ7!m$2Pz@8L" com cerca de 105 bits de solidez criptográfica.'
      },
      ko: {
        title: '마스터 계정 비밀번호 생성 실전 예시',
        scenario: '높은 보안 수준이 요구되는 클라우드 계정을 위해 16자리 고엔트로피 비밀번호 생성.',
        calculation: '문자 풀 크기 N = 94, 길이 L = 16. 엔트로피 = 16 × log2(94) ≈ 104.8비트. CSPRNG를 통해 무작위 추출.',
        result: '생성된 비밀번호: "k9#VxQ7!m$2Pz@8L" (~105비트 암호학적 강도, 무차별 대입 공격 원천 차단).'
      },
      it: {
        title: 'Esempio di Generazione Password per Account Principale',
        scenario: 'Configurazione di una password a 16 caratteri con elevata entropia per un archivio sicuro.',
        calculation: 'Insieme caratteri N = 94. Lunghezza L = 16. Entropia = 16 × log2(94) ≈ 104,8 bit.',
        result: 'Password generata: "k9#VxQ7!m$2Pz@8L" con ~105 bit di resistenza crittografica.'
      }
    },
    faqs: {
      en: [
        { question: 'Is the generated password stored or logged on any server?', answer: 'No. Passwords are generated strictly inside your browser memory using the standard Web Cryptography API (window.crypto). No network request is initiated.' },
        { question: 'How is mathematical entropy calculated?', answer: 'Entropy in bits equals length (L) multiplied by log2(N), where N is the total count of selectable unique characters. For a 16-character password using all 94 ASCII characters, entropy exceeds 104 bits.' },
        { question: 'What is the minimum recommended length for safety?', answer: 'We recommend at least 12 characters for everyday websites and 16 characters or more for banking, email, and password manager master credentials.' },
        { question: 'Why does excluding ambiguous characters help?', answer: 'Characters like uppercase "O" and number "0", or lowercase "l" and uppercase "I", look identical in many fonts. Removing them prevents frustrating login errors when typing manually.' }
      ],
      hi: [
        { question: 'क्या बनाया गया पासवर्ड किसी सर्वर पर सेव होता है?', answer: 'बिल्कुल नहीं। पासवर्ड पूरी तरह से आपके ब्राउज़र की मेमोरी में Web Cryptography API द्वारा बनता है। कोई भी डेटा सर्वर पर नहीं भेजा जाता।' },
        { question: 'पासवर्ड की मजबूती (एन्ट्रॉपी) कैसे मापी जाती है?', answer: 'एन्ट्रॉपी का सूत्र L × log2(N) है, जहाँ L लंबाई और N उपलब्ध वर्णों की संख्या है। 16 अक्षरों के सभी वर्ण सेट वाले पासवर्ड की शक्ति 104 बिट से अधिक होती है।' },
        { question: 'सुरक्षित खाते के लिए न्यूनतम कितनी लंबाई होनी चाहिए?', answer: 'सामान्य खातों के लिए कम से कम 12 अक्षर और बैंकिंग या मास्टर खातों के लिए 16 या अधिक अक्षर रखने की सलाह दी जाती है।' },
        { question: 'भ्रमित करने वाले अक्षर हटाने का क्या फायदा है?', answer: 'कई फॉन्ट में 0 और O या l और I एक जैसे दिखते हैं। इन्हें हटाने से फोन या कीबोर्ड पर हाथ से टाइप करते समय गलती नहीं होती।' }
      ],
      es: [
        { question: '¿La contraseña generada se guarda o registra en algún servidor?', answer: 'No. La creación ocurre exclusivamente en la memoria local del navegador mediante la Web Cryptography API. No se envía ninguna solicitud por internet.' },
        { question: '¿Cómo se calcula la entropía matemática?', answer: 'La entropía en bits se calcula como L × log2(N), donde L es la longitud y N el número de caracteres posibles. Con 16 caracteres y los 4 conjuntos, supera los 104 bits.' },
        { question: '¿Cuál es la longitud mínima recomendada?', answer: 'Se aconseja un mínimo de 12 caracteres para servicios cotidianos y de 16 o más para banca electrónica y gestores de contraseñas.' },
        { question: '¿Por qué excluir caracteres ambiguos?', answer: 'Caracteres como el número 0 y la letra O, o la "l" minúscula y la "I" mayúscula, pueden confundirse fácilmente al escribir en pantallas táctiles.' }
      ],
      ja: [
        { question: '生成されたパスワードはサーバーに送信・記録されますか？', answer: 'いいえ。ブラウザ標準のWeb Cryptography APIを用いて端末のメモリ内でのみ生成されます。外部サーバーへの通信は一切発生しません。' },
        { question: 'エントロピー（暗号強度）はどのように計算されますか？', answer: 'パスワード長(L) × log2(利用可能な文字種数N)で算出されます。全94文字種を用いた16文字パスワードの場合、エントロピーは約104.8ビットに達します。' },
        { question: '推奨されるパスワードの最小長はどれくらいですか？', answer: '一般的なWebサイトで最低12文字以上、オンラインバンキングやパスワード管理ツールのマスターキーには16文字以上を強く推奨します。' },
        { question: '紛らわしい文字を除外するメリットは何ですか？', answer: '数字の「0」と英字の「O」、小文字の「l」と大文字の「I」など、フォントによって見分けにくい文字を排除することで手入力時の入力ミスを防止できます。' }
      ],
      fr: [
        { question: 'Le mot de passe généré est-il enregistré sur vos serveurs ?', answer: 'Non. Il est généré localement dans la mémoire de votre navigateur via l\'API Web Cryptography native. Aucune donnée n\'est transmise sur le réseau.' },
        { question: 'Comment l\'entropie est-elle calculée ?', answer: 'L\'entropie en bits vaut L × log2(N), où L est la longueur et N le nombre de caractères possibles. Un mot de passe de 16 caractères atteint plus de 104 bits d\'entropie.' },
        { question: 'Quelle est la longueur minimale conseillée ?', answer: 'Au moins 12 caractères pour les sites standards et 16 caractères ou plus pour les boîtes mail principales et la banque en ligne.' },
        { question: 'Pourquoi exclure les caractères ambigus ?', answer: 'Les caractères comme 0 et O ou l et I se ressemblent dans plusieurs polices. Les exclure évite les erreurs de frappe manuelle.' }
      ],
      de: [
        { question: 'Wird das generierte Passwort auf einem Server gespeichert?', answer: 'Nein. Die Erstellung erfolgt ausschließlich im Browser über die native Web Cryptography API. Es findet keinerlei Datenübertragung statt.' },
        { question: 'Wie berechnet sich die mathematische Entropie?', answer: 'Entropie = L × log2(N), wobei L die Länge und N die Anzahl verfügbarer Zeichen ist. Bei 16 Zeichen und allen Zeichensätzen liegt der Wert über 104 Bit.' },
        { question: 'Welche Passwortlänge wird mindestens empfohlen?', answer: 'Mindestens 12 Zeichen für reguläre Webdienste und 16 Zeichen oder mehr für sensible Zugänge wie Online-Banking und E-Mail.' },
        { question: 'Was bringt das Ausschließen mehrdeutiger Zeichen?', answer: 'Zeichen wie "0" und "O" oder "l" und "I" sind bei manueller Eingabe leicht zu verwechseln. Das Ausschließen verhindert Tippfehler.' }
      ],
      pt: [
        { question: 'A senha criada é armazenada em algum servidor?', answer: 'Não. Todo o processo roda na memória local do navegador pela Web Cryptography API. Nenhuma informação é transmitida pela rede.' },
        { question: 'Como a entropia é calculada?', answer: 'A entropia em bits é calculada pela fórmula L × log2(N). Para 16 caracteres com todos os conjuntos, atinge-se mais de 104 bits de proteção.' },
        { question: 'Qual o tamanho mínimo recomendado?', answer: 'Pelo menos 12 caracteres para contas cotidianas e 16 caracteres ou mais para bancos e gerenciadores de senhas.' },
        { question: 'Por que excluir caracteres ambíguos?', answer: 'Letras e números como 0 e O, ou l e I, são facilmente confundidos ao digitar manualmente no teclado do smartphone.' }
      ],
      ko: [
        { question: '생성된 비밀번호가 서버에 기록되거나 전송되나요?', answer: '전혀 아닙니다. 브라우저에 내장된 Web Cryptography API를 통해 기기 메모리 내에서만 생성되며 네트워크 통신이 발생하지 않습니다.' },
        { question: '비밀번호 엔트로피는 어떻게 계산되나요?', answer: '엔트로피(비트) = 길이(L) × log2(사용 가능한 문자 종류 N)으로 계산됩니다. 94개 문자를 모두 포함한 16자리 암호는 104비트 이상의 보안성을 가집니다.' },
        { question: '안전을 위한 최소 권장 길이는 얼마인가요?', answer: '일반 웹사이트는 최소 12자 이상, 금융 및 이메일, 패스워드 매니저 마스터 계정은 16자 이상을 권장합니다.' },
        { question: '혼동하기 쉬운 문자를 제외하는 이유는 무엇인가요?', answer: '숫자 0과 알파벳 O, 소문자 l과 대문자 I 등 폰트에 따라 구분이 어려운 문자를 제외하여 수동 입력 시 오타를 예방할 수 있습니다.' }
      ],
      it: [
        { question: 'La password generata viene memorizzata su server remoti?', answer: 'No. Viene calcolata unicamente nella memoria del browser mediante l\'API nativa Web Cryptography, senza alcun traffico di rete.' },
        { question: 'Come viene calcolata l\'entropia?', answer: 'L\'entropia in bit è pari a L × log2(N). Una password a 16 caratteri con tutti i set supera ampiamente i 104 bit di forza crittografica.' },
        { question: 'Qual è la lunghezza minima consigliata?', answer: 'Consigliamo almeno 12 caratteri per i siti web comuni e 16 o più per banking online e master password.' },
        { question: 'A cosa serve escludere i caratteri ambigui?', answer: 'Caratteri come 0 e O oppure l e I possono sembrare identici in molti caratteri tipografici, provocando errori di digitazione.' }
      ]
    }
  }),

  // 2. Word Counter
  'word-counter': createMultiLocaleTool({
    formulaTitle: {
      en: 'Unicode Text Boundary Tokenization & Reading Metric Evaluation',
      hi: 'यूनिकोड टेक्स्ट सीमा टोकनाइजेशन और पठन मीट्रिक मूल्यांकन',
      es: 'Tokenización de Límites de Texto Unicode y Métricas de Lectura',
      ja: 'Unicodeテキスト境界トークナイズと読了時間測定技術',
      fr: 'Tokenisation Unicode et Évaluation des Métriques de Lecture',
      de: 'Unicode-Text-Tokenisierung und Lesegeschwindigkeits-Analyse',
      pt: 'Tokenização de Texto Unicode e Avaliação de Métricas de Leitura',
      ko: 'Unicode 텍스트 경계 토큰화 및 읽기 시간 측정 구조',
      it: 'Tokenizzazione del Testo Unicode e Calcolo delle Metriche di Lettura'
    },
    formulaDescription: {
      en: 'Word and character counts are computed client-side using regular expression boundary matching and Unicode string tokenization. Reading time is estimated using standard adult comprehension benchmarks of 200 words per minute (WPM), and speaking time at 130 WPM.',
      hi: 'शब्द और वर्णों की संख्या नियमित अभिव्यक्ति (RegEx) और यूनिकोड स्ट्रिंग टोकनाइजेशन द्वारा क्लाइंट-साइड पर जांची जाती है। पढ़ने के समय का अनुमान मानक 200 शब्द प्रति मिनट (WPM) और बोलने का समय 130 WPM के आधार पर लगाया जाता है।',
      es: 'El recuento de palabras y caracteres se calcula en el cliente mediante expresiones regulares y segmentación de cadenas Unicode. El tiempo de lectura se estima con el promedio estándar de 200 palabras por minuto (PPM) y el habla en 130 PPM.',
      ja: '単語数と文字数は、正規表現による境界判定とUnicode文字列トークナイズを用いてブラウザ内で即時集計されます。読了時間は成人の平均読書速度（分速200語 / 日本語約500文字）、スピーチ時間は分速130語を基準に推定します。',
      fr: 'Le décompte des mots et caractères s\'exécute en local via des expressions régulières et la tokenisation Unicode. Le temps de lecture est évalué sur la base de 200 mots par minute (WPM) et le temps de parole à 130 WPM.',
      de: 'Wort- und Zeichenzahlen werden clientseitig über reguläre Ausdrücke und Unicode-Segmentierung ermittelt. Die Lesezeit basiert auf der Standardlesegeschwindigkeit von 200 WPM, die Sprechzeit auf 130 WPM.',
      pt: 'A contagem de palavras e caracteres é realizada localmente por meio de expressões regulares e tokenização Unicode. O tempo de leitura é estimado no padrão de 200 palavras por minuto (PPM) e a fala em 130 PPM.',
      ko: '단어 및 글자 수는 정규 표현식 경계 분석과 유니코드 토큰화를 통해 브라우저 내에서 즉각 연산됩니다. 읽기 시간은 성인 평균 분당 200단어(WPM), 말하기 시간은 분당 130단어 기준으로 산출됩니다.',
      it: 'Il conteggio di parole e caratteri avviene sul client tramite espressioni regolari e tokenizzazione Unicode. Il tempo di lettura viene stimato su una media standard di 200 parole al minuto (WPM) e il tempo di pronuncia su 130 WPM.'
    },
    stepByStep: {
      en: [
        { stepNumber: 1, title: 'Enter or Paste Text', instruction: 'Type directly into the main text editor or paste an article, essay, or draft from your clipboard.' },
        { stepNumber: 2, title: 'Inspect Real-Time Statistics', instruction: 'View real-time counters for words, characters (with and without spaces), sentences, paragraphs, and reading time.' },
        { stepNumber: 3, title: 'Analyze Keyword Density', instruction: 'Review the frequency analysis panel to identify your most frequently repeated terms and avoid over-optimization.' },
        { stepNumber: 4, title: 'Copy Clean Summary', instruction: 'Click Copy Text or Copy Stats to capture accurate metrics for assignments, editorial submissions, or ad character limits.' }
      ],
      hi: [
        { stepNumber: 1, title: 'टेक्स्ट लिखें या पेस्ट करें', instruction: 'एडिटर में सीधे टाइप करें या अपने लेख, निबंध या ईमेल ड्राफ्ट को पेस्ट करें।' },
        { stepNumber: 2, title: 'रीयल-टाइम आंकड़े देखें', instruction: 'शब्द, वर्ण (स्पेस के साथ और बिना), वाक्य, पैराग्राफ और पढ़ने के समय की तुरंत गिनती देखें।' },
        { stepNumber: 3, title: 'कीवर्ड घनत्व जांचें', instruction: 'बार-बार दोहराए जाने वाले शब्दों की सूची देखें ताकि भाषा स्वाभाविक और संतुलित बनी रहे।' },
        { stepNumber: 4, title: 'परिणाम कॉपी करें', instruction: 'आवश्यकतानुसार टेक्स्ट या सांख्यिकी सारांश को क्लिपबोर्ड पर कॉपी करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Escribir o pegar texto', instruction: 'Escriba directamente en el editor o pegue su artículo, ensayo o borrador desde el portapapeles.' },
        { stepNumber: 2, title: 'Consultar métricas en tiempo real', instruction: 'Observe el recuento instantáneo de palabras, caracteres (con y sin espacios), oraciones y párrafos.' },
        { stepNumber: 3, title: 'Analizar densidad de palabras clave', instruction: 'Revise la tabla de frecuencia para identificar términos repetitivos y equilibrar su redacción.' },
        { stepNumber: 4, title: 'Copiar texto o resumen', instruction: 'Haga clic en Copiar para transferir el texto verificado a su procesador o plataforma de publicación.' }
      ],
      ja: [
        { stepNumber: 1, title: 'テキストの入力または貼り付け', instruction: 'エディタに直接文章を入力するか、クリップボードから記事や論文の原稿を貼り付けます。' },
        { stepNumber: 2, title: 'リアルタイム測定結果の確認', instruction: '文字数（空白を含む・除く）、単語数、文の数、段落数、想定読了時間を即座に確認します。' },
        { stepNumber: 3, title: 'キーワード出現頻度の確認', instruction: '文章中で頻出する語句の分布を確認し、語彙の重複やSEOキーワードの比率を調整します。' },
        { stepNumber: 4, title: 'コピーと活用', instruction: 'ワンクリックでカウント結果や整理された文章をコピーし、提出物やSNS投稿に活用します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Saisir ou coller le texte', instruction: 'Tapez directement dans l\'éditeur ou collez votre document, dissertation ou article.' },
        { stepNumber: 2, title: 'Consulter les statistiques en direct', instruction: 'Visualisez immédiatement le nombre de mots, caractères (avec et sans espaces), phrases et paragraphes.' },
        { stepNumber: 3, title: 'Analyser la densité des mots', instruction: 'Examinez la liste des mots les plus fréquents pour enrichir votre style et éviter les répétitions.' },
        { stepNumber: 4, title: 'Copier les résultats', instruction: 'Cliquez sur Copier pour récupérer le texte vérifié conforme aux limites imposées.' }
      ],
      de: [
        { stepNumber: 1, title: 'Text eingeben oder einfügen', instruction: 'Schreiben Sie direkt in das Textfeld oder fügen Sie Ihren Entwurf aus der Zwischenablage ein.' },
        { stepNumber: 2, title: 'Echtzeit-Statistiken prüfen', instruction: 'Sehen Sie sofort die Anzahl an Wörtern, Zeichen (mit/ohne Leerzeichen), Sätzen und Absätzen.' },
        { stepNumber: 3, title: 'Keyword-Häufigkeit analysieren', instruction: 'Überprüfen Sie wiederkehrende Begriffe, um Wortwiederholungen in Ihrem Text gezielt zu vermeiden.' },
        { stepNumber: 4, title: 'Statistik oder Text kopieren', instruction: 'Kopieren Sie das geprüfte Dokument bequem in die Zwischenablage für Ihre Abgabe.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Digitar ou colar texto', instruction: 'Digite diretamente no editor ou cole o conteúdo do seu rascunho a partir da área de transferência.' },
        { stepNumber: 2, title: 'Acompanhar contagem em tempo real', instruction: 'Monitore instantaneamente palavras, caracteres (com e sem espaços), frases e parágrafos.' },
        { stepNumber: 3, title: 'Avaliar densidade de termos', instruction: 'Examine a frequência das palavras mais recorrentes para melhorar a clareza do texto.' },
        { stepNumber: 4, title: 'Copiar dados', instruction: 'Copie o texto corrigido ou as métricas para cumprir limites de caracteres em redações e anúncios.' }
      ],
      ko: [
        { stepNumber: 1, title: '텍스트 입력 또는 붙여넣기', instruction: '입력창에 직접 원고를 작성하거나 클립보드에서 글을 복사하여 붙여넣습니다.' },
        { stepNumber: 2, title: '실시간 통계 수치 확인', instruction: '공백 포함/제외 글자 수, 단어 수, 문장 수, 문단 수, 예상 소요 시간을 실시간으로 확인합니다.' },
        { stepNumber: 3, title: '단어 빈도수 분석', instruction: '자주 반복 사용된 주요 키워드 통계를 살펴보고 문맥의 중복을 다듬습니다.' },
        { stepNumber: 4, title: '복사 및 활용', instruction: '글자 수 제한이 있는 자기소개서, 과제, 광고 문구 규격에 맞춰 손쉽게 복사하여 활용합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Digitare o incollare il testo', instruction: 'Scrivi direttamente nel riquadro o incolla il testo del tuo articolo o saggio.' },
        { stepNumber: 2, title: 'Consultare le metriche in tempo reale', instruction: 'Monitora all\'istante parole, caratteri (con e senza spazi), frasi e paragrafi.' },
        { stepNumber: 3, title: 'Verificare la frequenza delle parole', instruction: 'Controlla i termini più utilizzati per ottimizzare il lessico ed evitare ripetizioni.' },
        { stepNumber: 4, title: 'Copiare il testo', instruction: 'Copia il testo verificato rispettando i vincoli di caratteri di saggi ed esami.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Editorial Article Readability Assessment',
        scenario: 'Evaluating a 600-word blog post to confirm it fits a 3-minute reading time goal.',
        calculation: 'Characters (no spaces) = 3,120. Characters (with spaces) = 3,700. Words = 600. Sentences = 35. Reading Time = 600 words ÷ 200 WPM = 3.0 minutes.',
        result: 'Summary: 600 words, 35 sentences (avg 17.1 words/sentence), exactly 3 minutes reading time.'
      },
      hi: {
        title: 'संपादकीय लेख पठन समय मूल्यांकन उदाहरण',
        scenario: '600 शब्दों के ब्लॉग पोस्ट की जांच करना ताकि यह 3 मिनट के पठन लक्ष्य में फिट हो सके।',
        calculation: 'वर्ण (बिना स्पेस) = 3,120। वर्ण (स्पेस सहित) = 3,700। शब्द = 600। वाक्य = 35। पढ़ने का समय = 600 ÷ 200 = 3.0 मिनट।',
        result: 'निष्कर्ष: 600 शब्द, 35 वाक्य (औसत 17.1 शब्द/वाक्य), सटीक 3 मिनट का पठन समय।'
      },
      es: {
        title: 'Ejemplo de Evaluación Editorial de Lectura',
        scenario: 'Analizar un artículo de 600 palabras para comprobar que se ajusta a un tiempo de lectura de 3 minutos.',
        calculation: 'Caracteres sin espacios = 3.120. Con espacios = 3.700. Palabras = 600. Frases = 35. Tiempo = 600 ÷ 200 PPM = 3 minutos.',
        result: 'Resultado: 600 palabras, 35 oraciones (promedio de 17,1 palabras por oración), 3 minutos de lectura.'
      },
      ja: {
        title: 'ブログ原稿の文字数と読了時間測定例',
        scenario: '約1,500文字のWeb解説記事を検証し、3分程度で読み切れる構成か確認する例。',
        calculation: '文字数（空白除く）= 1,480文字。段落数 = 6。平均読書速度（分速500字）に基づく計算: 1,480 ÷ 500 ≈ 2.96分。',
        result: '判定結果: 1,480文字、読了目安時間約3分。Web記事として理想的な情報量に収まっています。'
      },
      fr: {
        title: 'Exemple d\'Évaluation Éditoriale d\'un Article',
        scenario: 'Vérifier qu\'un article de 600 mots respecte un objectif de lecture de 3 minutes.',
        calculation: 'Caractères (sans espaces) = 3 120. Mots = 600. Phrases = 35. Temps = 600 ÷ 200 WPM = 3,0 minutes.',
        result: 'Bilan : 600 mots, 35 phrases (17,1 mots/phrase en moyenne), temps de lecture estimé à 3 minutes.'
      },
      de: {
        title: 'Beispiel für einen redaktionellen Artikel-Check',
        scenario: 'Prüfung eines 600-Wörter-Textes auf Einhaltung der maximalen Lesezeit von 3 Minuten.',
        calculation: 'Zeichen (ohne Leerzeichen) = 3.120. Wörter = 600. Sätze = 35. Lesezeit = 600 ÷ 200 WPM = 3,0 Minuten.',
        result: 'Ergebnis: 600 Wörter, 35 Sätze (Ø 17,1 Wörter/Satz), geschätzte Lesezeit exakt 3 Minuten.'
      },
      pt: {
        title: 'Exemplo de Avaliação Editorial de Texto',
        scenario: 'Análise de uma postagem de 600 palavras para certificar leitura prevista em 3 minutos.',
        calculation: 'Caracteres (sem espaços) = 3.120. Palavras = 600. Frases = 35. Tempo = 600 ÷ 200 PPM = 3 minutos.',
        result: 'Resultado: 600 palavras, 35 frases (média de 17,1 palavras/frase), tempo de leitura de 3 minutos.'
      },
      ko: {
        title: '원고 분량 및 예상 읽기 시간 검증 실전 예시',
        scenario: '3분 내외로 완독 가능한 블로그 칼럼(약 600단어) 작성 규격 검토.',
        calculation: '공백 제외 글자 수 = 3,120자, 총 단어 수 = 600단어, 문장 수 = 35문장. 읽기 시간 = 600 ÷ 200 WPM = 3.0분.',
        result: '측정 요약: 600단어, 35문장(문장당 평균 17.1단어), 약 3분의 안정적인 리딩 타임 산출.'
      },
      it: {
        title: 'Esempio di Verifica Editoriale di un Articolo',
        scenario: 'Verifica di un articolo di 600 parole per rispettare l\'obiettivo di lettura di 3 minuti.',
        calculation: 'Caratteri (senza spazi) = 3.120. Parole = 600. Frasi = 35. Tempo = 600 ÷ 200 WPM = 3,0 minuti.',
        result: 'Riepilogo: 600 parole, 35 frasi (media di 17,1 parole/frase), 3 minuti di lettura stimata.'
      }
    },
    faqs: {
      en: [
        { question: 'Is my pasted text transmitted to any external server?', answer: 'No. The entire analysis occurs inside your browser\'s local JavaScript engine. Your draft text is never logged, transmitted, or saved remotely.' },
        { question: 'How is reading time calculated?', answer: 'Reading time is computed by dividing the total word count by 200 words per minute (the standard average reading speed for adults in informational reading).' },
        { question: 'Does this tool support non-Latin scripts (Hindi, Japanese, Korean)?', answer: 'Yes. The counter implements Unicode character property ranges and CJK character tokenization so Asian characters and scripts are counted accurately.' },
        { question: 'What is the difference between character count with and without spaces?', answer: 'Count with spaces includes blank whitespace and line breaks, which is standard for social media (Twitter/X) and academic assignments. Count without spaces counts only visible glyphs.' }
      ],
      hi: [
        { question: 'क्या मेरा पेस्ट किया गया टेक्स्ट किसी बाहरी सर्वर पर भेजा जाता है?', answer: 'नहीं। पूरा विश्लेषण आपके ब्राउज़र के स्थानीय जावास्क्रिप्ट इंजन में होता है। आपका ड्राफ्ट कभी भी किसी सर्वर पर सेव नहीं होता।' },
        { question: 'पढ़ने के समय की गणना कैसे की जाती है?', answer: 'पढ़ने के समय की गणना कुल शब्द संख्या को 200 शब्द प्रति मिनट (वयस्कों की औसत पठन गति) से विभाजित करके की जाती है।' },
        { question: 'क्या यह टूल हिंदी और देवनागरी लिपि का सटीक विश्लेषण करता है?', answer: 'हाँ। यह टूल यूनिकोड अक्षरों और मात्राओं का सही मिलान करता है ताकि देवनागरी वर्णों की सही गिनती हो सके।' },
        { question: 'स्पेस के साथ और बिना स्पेस वर्णों की गिनती में क्या अंतर है?', answer: 'स्पेस सहित गिनती में रिक्त स्थान और नई लाइनें शामिल होती हैं (जो ट्विटर/सोशल मीडिया पर आवश्यक हैं), जबकि बिना स्पेस में केवल दृश्य वर्ण गिने जाते हैं।' }
      ],
      es: [
        { question: '¿El texto ingresado se envía a servidores externos?', answer: 'No. El análisis se realiza completamente en el motor JavaScript de su navegador. Su texto nunca se envía ni se almacena externamente.' },
        { question: '¿Cómo se calcula el tiempo estimado de lectura?', answer: 'Se divide el número total de palabras entre 200 palabras por minuto, la velocidad promedio de comprensión en lectura para adultos.' },
        { question: '¿Soporta caracteres especiales y acentos en español?', answer: 'Sí. El motor de expresiones regulares contempla el conjunto completo de caracteres acentuados, eñes y signos de apertura (¿, ¡).' },
        { question: '¿Qué diferencia hay entre contar con o sin espacios?', answer: 'El recuento con espacios incluye separadores y saltos de línea (ideal para límites de redes sociales), mientras que sin espacios mide únicamente los caracteres visibles.' }
      ],
      ja: [
        { question: '貼り付けたテキストが外部サーバーに送信・保存されることはありますか？', answer: 'いいえ。すべてのテキスト解析はお使いのブラウザ内部で完結します。機密文書や未公開の下書きも安全にカウントできます。' },
        { question: '読了時間の計算基準は何ですか？', answer: '一般的な日本語の読書速度（1分あたり約500文字）および英単語（分速200語）を基準に推定時間を算出しています。' },
        { question: '日本語（漢字・ひらがな・カタカナ）の文字数は正しく認識されますか？', answer: 'はい。Unicode文字プロパティに対応した正規表現を採用しており、日本語の約物や全角文字も正確に集計されます。' },
        { question: '空白込みと空白除外の違いは何ですか？', answer: '空白込みはスペースや改行文字を含めた総文字数（SNS等の投稿制限用）、空白除外は純粋な文章構成文字のみを指します。' }
      ],
      fr: [
        { question: 'Le texte saisi est-il conservé sur un serveur ?', answer: 'Non. Le comptage est exécuté exclusivement dans la mémoire de votre navigateur. Vos textes demeurent strictement confidentiels.' },
        { question: 'Comment le temps de lecture est-il déterminé ?', answer: 'Il est calculé en divisant le nombre total de mots par 200 mots par minute, référence courante pour la lecture adulte.' },
        { question: 'Les caractères accentués français sont-ils bien comptabilisés ?', answer: 'Oui. Le parseur gère l\'ensemble de l\'alphabet latin étendu, y compris les accents (é, è, ê) et les cédilles.' },
        { question: 'Pourquoi distinguer les caractères avec et sans espaces ?', answer: 'Le décompte avec espaces sert aux limites strictes de publication (réseaux sociaux), tandis que sans espaces sert aux métriques de traduction.' }
      ],
      de: [
        { question: 'Wird der eingegebene Text auf Server übertragen?', answer: 'Nein. Die Analyse findet zu 100 % lokal im Browser statt. Ihr Text wird zu keinem Zeitpunkt übertragen oder gespeichert.' },
        { question: 'Wie wird die Lesezeit berechnet?', answer: 'Die Wortanzahl wird durch 200 Wörter pro Minute geteilt, was dem wissenschaftlichen Durchschnitt für informatives Lesen entspricht.' },
        { question: 'Werden deutsche Umlaute und Sonderzeichen korrekt gezählt?', answer: 'Ja. Umlaute (ä, ö, ü) und das Eszett (ß) werden durch vollständige Unicode-Unterstützung präzise erfasst.' },
        { question: 'Was ist der Unterschied zwischen Zeichen mit und ohne Leerzeichen?', answer: 'Zeichen mit Leerzeichen umfasst sämtliche Whitespaces (wichtig für Zeichenlimits bei Plattformen), ohne Leerzeichen zählt reine Schriftzeichen.' }
      ],
      pt: [
        { question: 'O texto digitado é transferido para algum servidor?', answer: 'Não. Toda a contagem roda no motor JavaScript do seu próprio navegador. Seus rascunhos nunca saem do seu aparelho.' },
        { question: 'Como é calculado o tempo de leitura?', answer: 'Divide-se a quantidade de palavras por 200 palavras por minuto, padrão internacional de velocidade de leitura informativa.' },
        { question: 'O contador reconhece acentuação em português?', answer: 'Sim. Todas as palavras acentuadas e caracteres especiais como "ç" e "ã" são interpretados com total precisão.' },
        { question: 'Qual a utilidade da contagem sem espaços?', answer: 'A contagem sem espaços é exigida por agências de tradução e revisores, enquanto a contagem com espaços é padrão em formulários e redes sociais.' }
      ],
      ko: [
        { question: '입력한 텍스트가 외부 서버에 전송되거나 저장되나요?', answer: '아닙니다. 모든 텍스트 연산은 브라우저 로컬 자바스크립트 엔진 내에서 수행되므로 기밀 문서도 안전하게 검토할 수 있습니다.' },
        { question: '읽기 시간 산출 기준은 무엇인가요?', answer: '성인의 평균적인 정보 습득 읽기 속도인 분당 200단어를 기준으로 총 단어 수를 나누어 계산합니다.' },
        { question: '한글의 자모 및 띄어쓰기가 정확하게 카운트되나요?', answer: '네. 유니코드 한글 음절 블록을 지원하여 한글 단어 및 문자 수가 정확하게 측정됩니다.' },
        { question: '공백 포함과 공백 제외 글자 수의 차이는 무엇인가요?', answer: '공백 포함은 띄어쓰기와 줄바꿈을 모두 합산한 수치(이력서/자기소개서 규격용)이며, 공백 제외는 순수 활자 글자 수만을 의미합니다.' }
      ],
      it: [
        { question: 'Il testo inserito viene inviato a server esterni?', answer: 'No. L\'analisi avviene al 100% nel motore JavaScript locale del tuo browser. Il testo non viene mai registrato né memorizzato.' },
        { question: 'Come viene calcolato il tempo di lettura stimato?', answer: 'Dividendo il totale delle parole per 200 parole al minuto, velocità media standard di lettura per adulti.' },
        { question: 'Le lettere accentate italiane sono conteggiate correttamente?', answer: 'Sì. La tokenizzazione Unicode include tutte le vocali accentate e i caratteri speciali della lingua italiana.' },
        { question: 'A cosa serve il conteggio senza spazi?', answer: 'È il parametro di riferimento per il settore editoriale e le traduzioni professionali, mentre quello con spazi serve per i limiti di testo.' }
      ]
    }
  }),

  // 3. JSON Formatter
  'json-formatter': createMultiLocaleTool({
    formulaTitle: {
      en: 'RFC 8259 Lexical JSON Parsing & Structural Pretty-Printing',
      hi: 'RFC 8259 लेक्सिकल JSON पार्सिंग और स्ट्रक्चरल प्रिटी-प्रिंटिंग',
      es: 'Análisis Léxico JSON RFC 8259 y Formateo Estructural',
      ja: 'RFC 8259準拠JSON構文解析と階層整形アーキテクチャ',
      fr: 'Analyse Lexicale JSON RFC 8259 et Indentation Structurelle',
      de: 'RFC 8259 Lexikalische JSON-Analyse & Strukturierte Formatierung',
      pt: 'Análise Léxica JSON RFC 8259 e Formatação Estrutural',
      ko: 'RFC 8259 표준 JSON 렉시컬 구문 분석 및 계층 포맷팅 구조',
      it: 'Analisi Lessicale JSON RFC 8259 e Formattazione Strutturata'
    },
    formulaDescription: {
      en: 'JSON formatting executes entirely client-side using JavaScript\'s native JSON.parse() deserializer and JSON.stringify(data, null, indent) serializer, constructing a standardized hierarchical view without transmitting sensitive payload data over the internet.',
      hi: 'JSON फॉर्मेटिंग पूरी तरह से जावास्क्रिप्ट के मूल JSON.parse() और JSON.stringify(data, null, indent) द्वारा क्लाइंट-साइड पर होती है। यह संवेदनशील डेटा को इंटरनेट पर भेजे बिना एक व्यवस्थित पदानुक्रम दृश्य तैयार करती है।',
      es: 'El formateo de JSON se ejecuta íntegramente en el cliente mediante los métodos nativos JSON.parse() y JSON.stringify(datos, null, sangría), generando una estructura jerárquica limpia sin transmitir datos confidenciales por internet.',
      ja: 'JSON整形機能は、ブラウザネイティブのJSON.parse()およびJSON.stringify(data, null, indent)を用いてローカルで構文木を展開。機密性の高いペイロードデータを外部送信することなく、視認性の高いインデント構造へ再構築します。',
      fr: 'Le formatage JSON s\'effectue entièrement dans votre navigateur grâce aux fonctions natives JSON.parse() et JSON.stringify(données, null, indentation), produisant une structure lisible sans téléversement de données.',
      de: 'Die JSON-Formatierung erfolgt vollständig clientseitig über die nativen Methoden JSON.parse() und JSON.stringify(data, null, indent). Sensible Nutzdaten werden zu keinem Zeitpunkt über das Internet übertragen.',
      pt: 'A formatação de JSON opera totalmente no navegador utilizando JSON.parse() e JSON.stringify(dados, null, espaçamento), organizando a estrutura em árvore sem transferir dados confidenciais para servidores.',
      ko: 'JSON 포맷터는 브라우저 내장 JSON.parse() 및 JSON.stringify(data, null, indent) 엔진을 활용하여 로컬에서 구문 트리를 생성하며, 민감한 페이로드를 외부로 전송하지 않고 깔끔한 들여쓰기 구조로 변환합니다.',
      it: 'La formattazione JSON viene eseguita interamente sul client tramite le funzioni native JSON.parse() e JSON.stringify(dati, null, rientro), garantendo leggibilità senza trasmettere payload sensibili in rete.'
    },
    stepByStep: {
      en: [
        { stepNumber: 1, title: 'Paste Raw JSON', instruction: 'Paste your unformatted, minified, or API payload JSON string into the input code area.' },
        { stepNumber: 2, title: 'Choose Indentation Setting', instruction: 'Select 2 spaces (standard web convention), 4 spaces, or tab indentation according to your project style.' },
        { stepNumber: 3, title: 'Click Format / Beautify', instruction: 'Trigger the formatter to parse the data structure, sort keys if selected, and highlight syntax errors.' },
        { stepNumber: 4, title: 'Copy or Download', instruction: 'Copy the formatted JSON to your clipboard or download it as a `.json` file for your codebase.' }
      ],
      hi: [
        { stepNumber: 1, title: 'कच्चा JSON पेस्ट करें', instruction: 'अपने मिनीफाइड या API से प्राप्त अनफॉर्मेटेड JSON डेटा को इनपुट बॉक्स में पेस्ट करें।' },
        { stepNumber: 2, title: 'इंडेंटेशन चुनें', instruction: 'अपनी पसंद के अनुसार 2 स्पेस (मानक वेब), 4 स्पेस या टैब स्पेस का चयन करें।' },
        { stepNumber: 3, title: 'फॉर्मेट बटन दबाएं', instruction: 'डेटा संरचना को सुव्यवस्थित करने और किसी भी सिंटैक्स त्रुटि को उजागर करने के लिए फॉर्मेट पर क्लिक करें।' },
        { stepNumber: 4, title: 'कॉपी या डाउनलोड करें', instruction: 'सुव्यवस्थित JSON को क्लिपबोर्ड पर कॉपी करें या सीधे .json फाइल के रूप में डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Pegar JSON sin formato', instruction: 'Pegue su cadena JSON minificada o respuesta de API en el editor de entrada.' },
        { stepNumber: 2, title: 'Elegir sangría', instruction: 'Seleccione 2 espacios (estándar habitual), 4 espacios o tabulaciones según su preferencia.' },
        { stepNumber: 3, title: 'Formatear y validar', instruction: 'Haga clic en Formatear para reestructurar la jerarquía de objetos y matrices.' },
        { stepNumber: 4, title: 'Copiar o descargar', instruction: 'Copie el JSON resultante al portapapeles o descárguelo como archivo .json.' }
      ],
      ja: [
        { stepNumber: 1, title: 'JSONデータの貼り付け', instruction: '整形したい圧縮JSONやAPIレスポンスの文字列を入力欄に貼り付けます。' },
        { stepNumber: 2, title: 'インデント幅の指定', instruction: '一般的な2スペース、4スペース、またはタブインデントから好みの書式を選択します。' },
        { stepNumber: 3, title: '整形ボタンの実行', instruction: '整形を実行して構文エラーの有無を自動検証し、階層構造を美しく展開します。' },
        { stepNumber: 4, title: 'コピーまたはダウンロード', instruction: 'ワンクリックで整形済みJSONをクリップボードにコピーするか、.jsonファイルとして保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Coller le JSON brut', instruction: 'Collez votre texte JSON compacté ou issu d\'une réponse d\'API dans la zone d\'édition.' },
        { stepNumber: 2, title: 'Choisir l\'indentation', instruction: 'Sélectionnez 2 espaces, 4 espaces ou une tabulation selon la convention de votre projet.' },
        { stepNumber: 3, title: 'Lancer le formatage', instruction: 'Cliquez sur Formater pour structurer les objets imbriqués et vérifier la syntaxe.' },
        { stepNumber: 4, title: 'Copier ou télécharger', instruction: 'Copiez le résultat formaté ou téléchargez-le directement au format .json.' }
      ],
      de: [
        { stepNumber: 1, title: 'Unformatiertes JSON einfügen', instruction: 'Fügen Sie Ihre minifizierte JSON-Zeichenkette oder API-Antwort in den Editor ein.' },
        { stepNumber: 2, title: 'Einrückung wählen', instruction: 'Wählen Sie 2 Leerzeichen, 4 Leerzeichen oder Tabulatoren als gewünschte Einrückung.' },
        { stepNumber: 3, title: 'Formatieren klicken', instruction: 'Starten Sie den Formatierungsvorgang zur automatischen Strukturierung der Datenobjekte.' },
        { stepNumber: 4, title: 'Kopieren oder herunterladen', instruction: 'Kopieren Sie das strukturierte JSON in die Zwischenablage oder speichern Sie es als Datei.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Colar JSON bruto', instruction: 'Cole sua resposta de API ou string JSON minificada na área de entrada.' },
        { stepNumber: 2, title: 'Definir espaçamento', instruction: 'Escolha 2 espaços, 4 espaços ou tabulação para a indentação do código.' },
        { stepNumber: 3, title: 'Formatar estrutura', instruction: 'Clique em Formatar para expandir chaves, matrizes e inspecionar a sintaxe.' },
        { stepNumber: 4, title: 'Copiar ou exportar', instruction: 'Copie o código JSON formatado ou baixe-o como arquivo .json no seu computador.' }
      ],
      ko: [
        { stepNumber: 1, title: '원본 JSON 붙여넣기', instruction: '압축되었거나 정렬되지 않은 API 응답 JSON 문자열을 입력란에 붙여넣습니다.' },
        { stepNumber: 2, title: '들여쓰기 규격 선택', instruction: '프로젝트 코딩 스타일에 맞춰 2칸 공백, 4칸 공백 또는 탭 들여쓰기를 선택합니다.' },
        { stepNumber: 3, title: '포맷팅 실행', instruction: '포맷 버튼을 클릭하여 중첩된 객체 및 배열 구조를 정돈하고 문법 이상을 검사합니다.' },
        { stepNumber: 4, title: '복사 또는 파일 다운로드', instruction: '정렬된 JSON 데이터를 클립보드에 복사하거나 .json 확장자 파일로 즉시 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Incollare il JSON grezzo', instruction: 'Incolla la stringa JSON compressa o il payload API nell\'area di testo.' },
        { stepNumber: 2, title: 'Scegliere l\'indentazione', instruction: 'Seleziona 2 spazi, 4 spazi o tabulazione in base agli standard del tuo progetto.' },
        { stepNumber: 3, title: 'Formattare il codice', instruction: 'Avvia la formattazione per strutturare gli oggetti e validare la correttezza del codice.' },
        { stepNumber: 4, title: 'Copia o scarica', instruction: 'Copia il codice JSON pronto negli appunti oppure scaricalo come file .json.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Minified API Payload Beautification',
        scenario: 'Formatting a compact single-line user profile JSON response into readable 2-space indented code.',
        calculation: 'Input: {"id":1024,"user":"alex","roles":["admin","editor"],"active":true}. Parse -> Pretty-print with 2-space indentation.',
        result: 'Formatted JSON with distinct line breaks, color-coded keys, and indented arrays for effortless debugging.'
      },
      hi: {
        title: 'मिनीफाइड API पेलोड सुंदरीकरण उदाहरण',
        scenario: 'एकल-पंक्ति वाले उपयोगकर्ता प्रोफाइल JSON डेटा को पढ़ने योग्य 2-स्पेस इंडेंटेड कोड में बदलना।',
        calculation: 'इनपुट: {"id":1024,"user":"alex","roles":["admin","editor"],"active":true} -> 2-स्पेस इंडेंटेशन के साथ पार्सिंग।',
        result: 'उचित लाइन ब्रेक और इंडेंटेड एरे के साथ स्पष्ट और पढ़ने योग्य JSON कोड तैयार।'
      },
      es: {
        title: 'Ejemplo de Formateo de Respuesta API',
        scenario: 'Transformar una respuesta JSON minificada de una sola línea en código legible sangrado a 2 espacios.',
        calculation: 'Entrada: {"id":1024,"user":"alex","roles":["admin","editor"],"active":true} -> Conversión a estructura expandida.',
        result: 'Código JSON organizado jerárquicamente con saltos de línea claros y lectura inmediata.'
      },
      ja: {
        title: 'API圧縮JSONレスポンスの可読化実例',
        scenario: '1行に圧縮されたユーザープロフィール情報を2スペースインデントの構造化コードへ整形する例。',
        calculation: '入力: {"id":1024,"user":"alex","roles":["admin","editor"],"active":true} をローカルパース処理。',
        result: '適切な改行とキー・値のインデントが適用され、デバッグしやすいJSONツリーが完成。'
      },
      fr: {
        title: 'Exemple de Mise en Forme d\'une Réponse API',
        scenario: 'Convertir un JSON compacté sur une seule ligne en structure indentée à 2 espaces.',
        calculation: 'Entrée : {"id":1024,"user":"alex","roles":["admin","editor"],"active":true} -> Analyse et indentation.',
        result: 'JSON propre avec sauts de lignes et indentation claire facilitant le débogage.'
      },
      de: {
        title: 'Beispiel für die Formatierung einer API-Antwort',
        scenario: 'Umwandlung einer einzeiligen minifizierten Nutzer-JSON-Struktur in lesbaren Code mit 2 Leerzeichen Einrückung.',
        calculation: 'Eingabe: {"id":1024,"user":"alex","roles":["admin","editor"],"active":true} -> Parsen und Strukturieren.',
        result: 'Klar strukturierter JSON-Baum mit sauberen Zeilenumbrüchen für schnelle Fehleranalyse.'
      },
      pt: {
        title: 'Exemplo de Formatação de Resposta de API',
        scenario: 'Transformação de um JSON minificado de uma linha em código indentado a 2 espaços.',
        calculation: 'Entrada: {"id":1024,"user":"alex","roles":["admin","editor"],"active":true} -> Processamento e expansão.',
        result: 'JSON organizado com quebras de linha e matrizes alinhadas para fácil inspeção técnica.'
      },
      ko: {
        title: '압축된 API 응답 데이터 포맷팅 실전 예시',
        scenario: '한 줄로 압축된 사용자 프로필 JSON 데이터를 2칸 공백 들여쓰기가 적용된 구조로 변환.',
        calculation: '입력: {"id":1024,"user":"alex","roles":["admin","editor"],"active":true} -> 구문 분석 및 계층 포맷팅.',
        result: '명확한 줄바꿈과 배열 인덴트가 적용되어 가독성이 극대화된 표준 JSON 출력.'
      },
      it: {
        title: 'Esempio di Formattazione Payload API',
        scenario: 'Conversione di un JSON compresso a riga singola in codice indentato a 2 spazi.',
        calculation: 'Input: {"id":1024,"user":"alex","roles":["admin","editor"],"active":true} -> Elaborazione e indentazione.',
        result: 'Codice JSON strutturato con rientri corretti per una verifica rapida e ordinata.'
      }
    },
    faqs: {
      en: [
        { question: 'Is my JSON payload uploaded to external servers?', answer: 'No. The entire serialization and deserialization cycle happens inside your browser via native JSON methods. Confidential API keys and credentials are never exposed.' },
        { question: 'What is the maximum file size supported?', answer: 'Because parsing runs in browser memory, files up to 20MB to 50MB process smoothly. Extremely large files (>100MB) can cause browser tab slowdowns.' },
        { question: 'Can this tool minify JSON back into a single line?', answer: 'Yes. You can toggle between pretty-print (indented) and compact minification (0 indentation) with a single click.' },
        { question: 'Why does formatting fail with a SyntaxError?', answer: 'Common causes include unquoted keys, single quotes instead of double quotes around strings, or trailing commas after the last array/object element.' }
      ],
      hi: [
        { question: 'क्या मेरा JSON डेटा किसी सर्वर पर अपलोड होता है?', answer: 'नहीं। सभी प्रक्रिया सीधे आपके ब्राउज़र में होती है। API कुंजियां, पासवर्ड या व्यक्तिगत डेटा कभी भी हमारे सर्वर पर नहीं जाता।' },
        { question: 'यह टूल अधिकतम कितने बड़े डेटा का समर्थन करता है?', answer: 'ब्राउज़र मेमोरी के अनुसार 20MB से 50MB तक का डेटा आसानी से प्रोसेस हो जाता है। बहुत बड़ी फाइलों (>100MB) पर ब्राउज़र धीमा हो सकता है।' },
        { question: 'क्या यह टूल JSON को वापस मिनीफाइड (एक लाइन) कर सकता है?', answer: 'हाँ। आप एक क्लिक में इंडेंटेड फॉर्मेट से कॉम्पैक्ट मिनीफाइड फॉर्मेट में स्विच कर सकते हैं।' },
        { question: 'फॉर्मेटिंग में SyntaxError आने का मुख्य कारण क्या है?', answer: 'इसके सामान्य कारण हैं: बिना कोट्स वाली कीज़, डबल कोट्स की जगह सिंगल कोट्स का उपयोग, या अंतिम एलिमेंट के बाद लगा अनावश्यक कॉमा (trailing comma)।' }
      ],
      es: [
        { question: '¿El payload JSON se sube a servidores externos?', answer: 'No. La serialización ocurre exclusivamente en su navegador. Claves de API y credenciales permanecen 100% privadas.' },
        { question: '¿Cuál es el tamaño máximo de archivo admitido?', answer: 'Se procesan con fluidez archivos de hasta 20 a 50 MB en memoria. Archivos superiores a 100 MB pueden ralentizar la pestaña del navegador.' },
        { question: '¿Permite compactar el JSON a una sola línea?', answer: 'Sí. Puede alternar entre vista estructurada con sangría y minificación compacta sin espacios.' },
        { question: '¿Por qué aparece un SyntaxError al formatear?', answer: 'Suele deberse a claves sin comillas, uso de comillas simples en lugar de dobles, o comas sobrantes al final de listas u objetos.' }
      ],
      ja: [
        { question: 'JSONデータが外部サーバーに送信されることはありますか？', answer: 'いいえ。パース処理はブラウザ内のJavaScriptエンジンでのみ行われます。APIキーやアクセストークンを含む機密データも安全です。' },
        { question: '処理可能な最大データサイズはどのくらいですか？', answer: 'ブラウザのメモリ制約上、20MB〜50MB程度までスムーズに動作します。100MBを超える極端なデータはタブの動作が重くなる場合があります。' },
        { question: '整形したJSONを1行に再圧縮（Minify）できますか？', answer: 'はい。インデント付き展開表示と余分な空白を除去した圧縮表示（Minify）をワンクリックで切り替えられます。' },
        { question: '構文エラー（SyntaxError）が発生する原因は何ですか？', answer: 'キーが二重引用符で囲まれていない、シングルクォーテーションの使用、配列末尾の余分なカンマ（Trailing comma）などが主な原因です。' }
      ],
      fr: [
        { question: 'Mes données JSON sont-elles envoyées sur un serveur ?', answer: 'Non. Tout s\'exécute localement dans votre navigateur via JSON.parse(). Vos clés d\'API et données privées restent strictement protégées.' },
        { question: 'Quelle est la taille maximale prise en charge ?', answer: 'Les fichiers jusqu\'à 20 à 50 Mo sont traités rapidement. Au-delà de 100 Mo, la mémoire de l\'onglet peut être saturée.' },
        { question: 'L\'outil permet-il de minifier le JSON en une seule ligne ?', answer: 'Oui. Vous pouvez basculer instantanément entre le mode indenté et la version compacte sans espaces.' },
        { question: 'Pourquoi une erreur de syntaxe s\'affiche-t-elle ?', answer: 'Les causes fréquentes sont l\'emploi de guillemets simples à la place de guillemets doubles ou une virgule traînante en fin d\'objet.' }
      ],
      de: [
        { question: 'Wird mein JSON auf externe Server übertragen?', answer: 'Nein. Das Parsen erfolgt ausschließlich über die native Browser-Engine. API-Schlüssel und vertrauliche Daten bleiben sicher auf Ihrem Gerät.' },
        { question: 'Wie groß darf die JSON-Datei maximal sein?', answer: 'Dateien bis zu 20–50 MB werden reibungslos verarbeitet. Bei extrem großen Dateien (>100 MB) kann der Browser-Tab reagieren verzögern.' },
        { question: 'Kann das JSON auch wieder minifiziert werden?', answer: 'Ja. Sie können mit einem Klick zwischen lesbarer Einrückung und kompakter einzeiliger Darstellung wechseln.' },
        { question: 'Warum schlägt das Formatieren mit einem Syntaxfehler fehl?', answer: 'Häufige Ursachen sind einfache statt doppelte Anführungszeichen, fehlende Anführungszeichen bei Schlüsseln oder überflüssige Kommas am Ende.' }
      ],
      pt: [
        { question: 'Meus dados JSON são enviados para a internet?', answer: 'Não. O processamento ocorre exclusivamente no navegador com métodos nativos. Chaves de API e dados de clientes nunca saem do seu computador.' },
        { question: 'Qual o limite de tamanho suportado?', answer: 'Arquivos de até 20 MB a 50 MB funcionam com agilidade. Cargas acima de 100 MB podem sobrecarregar a memória da aba.' },
        { question: 'O formatador também consegue minificar o código?', answer: 'Sim. É possível alternar entre o código estruturado com recuo e o formato compacto de uma linha só.' },
        { question: 'O que causa erro de sintaxe ao formatar?', answer: 'Geralmente aspas simples em vez de duplas, chaves sem aspas ou vírgulas extras no final de listas ou objetos.' }
      ],
      ko: [
        { question: '입력한 JSON 페이로드가 서버로 전송되나요?', answer: '아닙니다. 모든 직렬화 및 역직렬화는 브라우저 내부 네이티브 메소드로 처리되므로 API 인증키나 개인정보가 안전하게 보호됩니다.' },
        { question: '처리 가능한 최대 파일 용량은 얼마인가요?', answer: '기기 메모리에 따라 약 20MB~50MB 크기의 JSON 데이터까지 무리 없이 처리되며, 100MB 이상의 대용량 파일은 브라우저 지연을 유발할 수 있습니다.' },
        { question: '정렬된 JSON을 다시 한 줄로 압축(Minify)할 수 있나요?', answer: '네. 버튼 하나로 들여쓰기가 적용된 서식과 불필요한 공백이 제거된 한 줄 압축 모드를 자유롭게 전환할 수 있습니다.' },
        { question: 'SyntaxError 문법 오류가 발생하는 이유는 무엇인가요?', answer: '키 이름을 큰따옴표로 감싸지 않았거나, 작은따옴표를 사용했거나, 객체 또는 배열 마지막 요소 뒤에 불필요한 쉼표(Trailing comma)가 있는 경우 발생합니다.' }
      ],
      it: [
        { question: 'Il codice JSON viene caricato su server esterni?', answer: 'No. Il processo avviene interamente nel browser tramite API native. Token di sicurezza e dati personali rimangono confidenziali.' },
        { question: 'Qual è la dimensione massima consentita?', answer: 'File fino a 20-50 MB vengono gestiti fluidamente. Oltre i 100 MB la scheda del browser potrebbe rallentare.' },
        { question: 'È possibile comprimere il JSON in una sola riga?', answer: 'Sì. È possibile passare istantaneamente dalla visualizzazione indentata alla versione minificata senza spazi.' },
        { question: 'Perché ricevo un errore di sintassi durante la formattazione?', answer: 'Spesso a causa di virgolette singole anziché doppie, chiavi non racchiuse tra virgolette o virgole finali in eccesso.' }
      ]
    }
  }),

  // 4. JSON Validator
  'json-validator': createMultiLocaleTool({
    formulaTitle: {
      en: 'RFC 8259 Lexical Syntax Validation & Error Coordinate Detection',
      hi: 'RFC 8259 लेक्सिकल सिंटैक्स सत्यापन और त्रुटि निर्देशांक पहचान',
      es: 'Validación de Sintaxis Léxica RFC 8259 y Detección de Errores',
      ja: 'RFC 8259標準JSON構文検証とエラー行・桁位置検出技術',
      fr: 'Validation de Syntaxe RFC 8259 et Détection des Coordonnées d\'Erreur',
      de: 'RFC 8259 Lexikalische Syntaxprüfung & Fehler-Positionsbestimmung',
      pt: 'Validação de Sintaxe RFC 8259 e Localização Precisa de Erros',
      ko: 'RFC 8259 표준 JSON 문법 검증 및 오류 위치(줄/열) 정밀 검출 구조',
      it: 'Validazione Sintattica RFC 8259 e Localizzazione degli Errori'
    },
    formulaDescription: {
      en: 'The validator parses your JSON text stream in real time against strict RFC 8259 specifications, pinpointing the exact line and character column of syntax violations (such as trailing commas, unquoted keys, or unescaped control characters) entirely inside your browser.',
      hi: 'यह वैलिलेटर RFC 8259 मानकों के आधार पर आपके JSON टेक्स्ट का रीयल-टाइम विश्लेषण करता है और सिंटैक्स त्रुटियों (जैसे अतिरिक्त कॉमा, बिना कोट्स वाली कीज़ या छूटे हुए ब्रैकेट) की सटीक पंक्ति और कॉलम संख्या दिखाता है।',
      es: 'El validador analiza el texto JSON en tiempo real según la norma estricta RFC 8259, indicando con precisión la línea y columna exactas del error de sintaxis (como comas finales o claves sin entrecomillar) dentro del navegador.',
      ja: '本検証ツールはRFC 8259厳格仕様に基づきJSON構文をリアルタイム解析。末尾の余分なカンマやエスケープ漏れなどの文法違反を、ブラウザ内部で正確な行番号と文字位置（行・列）とともに特定します。',
      fr: 'Le validateur examine votre flux JSON selon la spécification stricte RFC 8259, repérant immédiatement la ligne et la colonne exactes des erreurs de syntaxe directement dans votre navigateur.',
      de: 'Der Validator prüft Ihren JSON-Text in Echtzeit gemäß RFC 8259 und lokalisiert die exakte Zeilen- und Spaltenposition von Syntaxfehlern (wie überflüssige Kommas oder ungeschützte Steuerzeichen) lokal im Browser.',
      pt: 'O validador analisa o JSON em tempo real sob as especificações estritas da RFC 8259, indicando a linha e coluna exatas de falhas de sintaxe diretamente no navegador, sem enviar dados a terceiros.',
      ko: '본 검증 도구는 엄격한 RFC 8259 표준 규격에 따라 JSON 문자열을 실시간 파싱하여 불필요한 쉼표, 따옴표 누락, 괄호 불일치 등의 문법 오류가 발생한 정확한 줄(Line)과 열(Column) 위치를 브라우저 로컬에서 찾아냅니다.',
      it: 'Il validatore analizza il testo JSON in tempo reale secondo lo standard RFC 8259, evidenziando riga e colonna esatte degli errori sintattici direttamente nel browser.'
    },
    stepByStep: {
      en: [
        { stepNumber: 1, title: 'Input or Paste JSON', instruction: 'Paste the JSON data you want to inspect into the validation editor.' },
        { stepNumber: 2, title: 'Click Validate JSON', instruction: 'Trigger the validation parser to check against strict RFC 8259 grammars.' },
        { stepNumber: 3, title: 'Inspect Error Location', instruction: 'If an error is detected, inspect the highlighted line and character offset with the descriptive fix recommendation.' },
        { stepNumber: 4, title: 'Auto-Fix or Copy', instruction: 'Resolve highlighted syntax flaws and copy the verified, valid JSON directly to your clipboard.' }
      ],
      hi: [
        { stepNumber: 1, title: 'JSON डेटा पेस्ट करें', instruction: 'जिस JSON डेटा की जांच करनी है उसे एडिटर बॉक्स में पेस्ट करें।' },
        { stepNumber: 2, title: 'सत्यापित करें पर क्लिक करें', instruction: 'RFC 8259 मानकों के अनुसार सिंटैक्स जांच शुरू करने के लिए वैलिडेट बटन दबाएं।' },
        { stepNumber: 3, title: 'त्रुटि की स्थिति देखें', instruction: 'त्रुटि मिलने पर हाइलाइट की गई लाइन और कॉलम संख्या तथा सुझाव देखकर उसे ठीक करें।' },
        { stepNumber: 4, title: 'सुधारें और कॉपी करें', instruction: 'सिंटैक्स ठीक करने के बाद वैध JSON को सीधे क्लिपबोर्ड पर कॉपी करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Pegar datos JSON', instruction: 'Pegue el código que desea auditar en el editor de validación.' },
        { stepNumber: 2, title: 'Validar sintaxis', instruction: 'Ejecute la validación para comprobar el cumplimiento de las reglas RFC 8259.' },
        { stepNumber: 3, title: 'Localizar el error', instruction: 'Si se detecta un fallo, consulte el número exacto de línea y columna resaltado.' },
        { stepNumber: 4, title: 'Corregir y copiar', instruction: 'Resuelva el error indicado y copie el JSON verificado en su portapapeles.' }
      ],
      ja: [
        { stepNumber: 1, title: 'JSONコードの入力', instruction: '検証したいJSON文字列をエディタ欄に貼り付けます。' },
        { stepNumber: 2, title: '構文検証の実行', instruction: '検証ボタンをクリックし、RFC 8259規格に適合しているか即座に判定します。' },
        { stepNumber: 3, title: 'エラー箇所の確認', instruction: '文法エラーがある場合、赤くハイライトされた行番号と列位置、および修正ヒントを確認します。' },
        { stepNumber: 4, title: '修正とコピー', instruction: '指摘箇所を修正して「Valid JSON」の認定を確認後、クリーンなコードをコピーします。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Coller le code JSON', instruction: 'Insérez le texte JSON à vérifier dans la fenêtre d\'analyse.' },
        { stepNumber: 2, title: 'Lancer la validation', instruction: 'Cliquez sur Valider pour analyser la conformité avec la spécification RFC 8259.' },
        { stepNumber: 3, title: 'Consulter l\'erreur', instruction: 'Si une faute est détectée, observez la ligne et la colonne en surbrillance pour comprendre la cause.' },
        { stepNumber: 4, title: 'Corriger et copier', instruction: 'Rectifiez la syntaxe et copiez le JSON validé dans votre presse-papiers.' }
      ],
      de: [
        { stepNumber: 1, title: 'JSON-Inhalt einfügen', instruction: 'Fügen Sie den zu prüfenden JSON-Text in den Prüfeditor ein.' },
        { stepNumber: 2, title: 'Validierung starten', instruction: 'Klicken Sie auf Validieren, um die Einhaltung der RFC-8259-Grammatik zu prüfen.' },
        { stepNumber: 3, title: 'Fehlerstelle lokalisieren', instruction: 'Prüfen Sie bei Syntaxfehlern die exakt markierte Zeilen- und Zeichenposition.' },
        { stepNumber: 4, title: 'Beheben und kopieren', instruction: 'Beheben Sie die Abweichung und kopieren Sie das fehlerfreie JSON in die Zwischenablage.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Colar código JSON', instruction: 'Insira o trecho de JSON a ser validado na caixa de edição.' },
        { stepNumber: 2, title: 'Validar sintaxe', instruction: 'Clique em Validar para checar a aderência ao padrão RFC 8259.' },
        { stepNumber: 3, title: 'Localizar falha', instruction: 'Caso haja erro, visualize a linha e a coluna exatas destacadas pelo sistema.' },
        { stepNumber: 4, title: 'Corrigir e copiar', instruction: 'Ajuste a pontuação incorreta e copie o JSON validado para o seu projeto.' }
      ],
      ko: [
        { stepNumber: 1, title: 'JSON 코드 입력', instruction: '검증하고자 하는 JSON 원본 텍스트를 검사 창에 붙여넣습니다.' },
        { stepNumber: 2, title: '유효성 검증 클릭', instruction: '검증 버튼을 눌러 표준 RFC 8259 문법과의 일치 여부를 즉시 평가합니다.' },
        { stepNumber: 3, title: '오류 위치 확인', instruction: '오류가 발견되면 표시된 정확한 줄 및 열 번호와 원인 안내 메시지를 확인합니다.' },
        { stepNumber: 4, title: '수정 후 복사', instruction: '지적된 문법을 수정한 후 정상 판정(Valid JSON)을 확인하고 완성된 코드를 복사합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Inserire il codice JSON', instruction: 'Incolla la stringa da sottoporre a controllo nella finestra di validazione.' },
        { stepNumber: 2, title: 'Avviare la validazione', instruction: 'Premi Valida per eseguire la scansione secondo le regole formali RFC 8259.' },
        { stepNumber: 3, title: 'Individuare l\'errore', instruction: 'Se vengono rilevate anomalie, consulta la riga e colonna segnalate.' },
        { stepNumber: 4, title: 'Correggi e copia', instruction: 'Correggi i punti indicati e copia il JSON valido negli appunti.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Trailing Comma Syntax Error Detection',
        scenario: 'Troubleshooting a broken configuration JSON failing to parse inside a production server.',
        calculation: 'Input: {"title":"App","version":2.0,}. Parser scans tokens and detects unexpected closing brace "}" at Line 1, Column 28 preceded by comma.',
        result: 'Identified: "SyntaxError: Unexpected token \'}\' after trailing comma at line 1, col 28". Fixed by stripping trailing comma.'
      },
      hi: {
        title: 'अतिरिक्त कॉमा सिंटैक्स त्रुटि पहचान उदाहरण',
        scenario: 'उत्पादन सर्वर में विफल हो रही कॉन्फ़िगरेशन JSON फाइल की समस्या का निवारण करना।',
        calculation: 'इनपुट: {"title":"App","version":2.0,}। पार्सर पंक्ति 1, कॉलम 28 पर अतिरिक्त कॉमा के बाद बंद हो रहे ब्रैकेट को पकड़ता है।',
        result: 'पहचान: "लाइन 1, कॉलम 28 पर अतिरिक्त कॉमा के कारण त्रुटि"। कॉमा हटाकर वैध JSON तैयार किया गया।'
      },
      es: {
        title: 'Ejemplo de Detección de Coma Sobrante',
        scenario: 'Depurar un archivo de configuración que arroja error en un servidor de producción.',
        calculation: 'Entrada: {"title":"App","version":2.0,}. El analizador detecta la llave de cierre "}" en línea 1, columna 28 tras una coma.',
        result: 'Diagnóstico: "Error sintáctico por coma final en línea 1, col 28". Subsanado eliminando la coma sobrante.'
      },
      ja: {
        title: '末尾カンマ（Trailing Comma）エラー検出の実例',
        scenario: 'サーバー起動時にエラーを引き起こしていた設定ファイルのJSON構文を特定する例。',
        calculation: '入力: {"title":"App","version":2.0,} を構文解析し、1行目28文字目の余分なカンマ直後の閉じ括弧「}」を検知。',
        result: '特定結果: 「1行28列: 末尾の余分なカンマによるSyntaxError」。カンマを削除して正常なJSONへ修復完了。'
      },
      fr: {
        title: 'Exemple de Détection d\'une Virgule Traînante',
        scenario: 'Résolution d\'un bug de configuration bloquant le déploiement d\'une application.',
        calculation: 'Entrée : {"title":"App","version":2.0,}. L\'analyseur signale l\'accolade fermante "}" non attendue ligne 1, col 28.',
        result: 'Erreur identifiée : virgule traînante interdite ligne 1, col 28. Corrigé immédiatement.'
      },
      de: {
        title: 'Beispiel zur Erkennung überflüssiger Kommas',
        scenario: 'Fehlerbehebung in einer Konfigurationsdatei, die vom Server abgelehnt wird.',
        calculation: 'Eingabe: {"title":"App","version":2.0,}. Der Parser meldet die schließende Klammer "}" an Zeile 1, Spalte 28.',
        result: 'Diagnose: Unzulässiges nachstehendes Komma in Zeile 1, Spalte 28 erfolgreich behoben.'
      },
      pt: {
        title: 'Exemplo de Detecção de Vírgula Sobressalente',
        scenario: 'Depuração de um arquivo de configuração rejeitado pelo sistema de produção.',
        calculation: 'Entrada: {"title":"App","version":2.0,}. O parser aponta a chave de fechamento "}" na linha 1, coluna 28 após a vírgula.',
        result: 'Identificado: "SyntaxError na linha 1, col 28 devido a vírgula final". Corrigido com sucesso.'
      },
      ko: {
        title: '말미 쉼표(Trailing Comma) 문법 오류 검출 실전 예시',
        scenario: '서버 파싱 오류를 유발하는 잘못된 설정 JSON 코드의 원인 추적.',
        calculation: '입력: {"title":"App","version":2.0,}. 파서가 1줄 28열에서 쉼표 직후 닫는 중괄호 "}"를 발견하여 문법 위반 감지.',
        result: '검출 결과: "1줄 28열 말미 쉼표 오류". 불필요한 쉼표를 제거하여 정상 작동 코드로 복구 완료.'
      },
      it: {
        title: 'Esempio di Individuazione Virgola Finale Non Valida',
        scenario: 'Risoluzione di un file di configurazione non accettato da un\'applicazione.',
        calculation: 'Input: {"title":"App","version":2.0,}. Il parser rileva la parentesi graffa "}" alla riga 1, colonna 28.',
        result: 'Segnalazione: virgola superflua alla riga 1, col 28. Risolto rimuovendo il carattere non conforme.'
      }
    },
    faqs: {
      en: [
        { question: 'Why does JSON forbid trailing commas when JavaScript allows them?', answer: 'The JSON standard (RFC 8259) was specified as a universal, language-agnostic data interchange format. To prevent parser ambiguities across C++, Java, and Python, trailing commas in objects and arrays are strictly illegal.' },
        { question: 'Can this validator identify line and column numbers of errors?', answer: 'Yes. The validator captures browser syntax parser exceptions and maps the character byte offset directly to human-readable line and column indices.' },
        { question: 'Does the tool check for duplicate keys in JSON objects?', answer: 'Yes. While basic parsers may overwrite duplicate keys silently, this tool alerts you if identical keys are declared within the same object scope.' },
        { question: 'Is my data secure while validating confidential credentials?', answer: '100% secure. All validation runs locally inside your browser\'s memory. Nothing is transmitted to external servers.' }
      ],
      hi: [
        { question: 'जावास्क्रिप्ट में अतिरिक्त कॉमा मान्य होने पर भी JSON में क्यों वर्जित है?', answer: 'JSON (RFC 8259) एक सार्वभौमिक डेटा प्रारूप है। विभिन्न प्रोग्रामिंग भाषाओं (जैसे C++, Java, Python) में पार्सिंग की स्पष्टता बनाए रखने के लिए अतिरिक्त कॉमा वर्जित है।' },
        { question: 'क्या यह टूल त्रुटि की सटीक पंक्ति और कॉलम संख्या बताता है?', answer: 'हाँ। वैलिलेटर पार्सर त्रुटि के वर्ण स्थान को मापकर सटीक पंक्ति और कॉलम संख्या प्रदर्शित करता है।' },
        { question: 'क्या यह ऑब्जेक्ट्स में डुप्लिकेट कीज़ की पहचान करता है?', answer: 'हाँ। एक ही ऑब्जेक्ट में एक ही नाम की दो कीज़ होने पर यह आपको सतर्क करता है।' },
        { question: 'क्या संवेदनशील क्रेडेंशियल्स की जांच करते समय डेटा सुरक्षित रहता है?', answer: 'हाँ, 100% सुरक्षित। संपूर्ण सत्यापन आपके ब्राउज़र में होता है और कोई डेटा बाहर नहीं भेजा जाता।' }
      ],
      es: [
        { question: '¿Por qué JSON prohíbe las comas finales si JavaScript las permite?', answer: 'JSON (RFC 8259) es un estándar independiente de lenguajes. Para garantizar compatibilidad absoluta entre Java, Python y C++, las comas finales no están permitidas.' },
        { question: '¿Indica el número exacto de línea y columna del fallo?', answer: 'Sí. El validador calcula la posición del carácter erróneo y la convierte a coordenadas legibles de línea y columna.' },
        { question: '¿Detecta claves duplicadas dentro de un mismo objeto?', answer: 'Sí. Advierte si existen claves idénticas repetidas en el mismo nivel del objeto.' },
        { question: '¿Es seguro validar archivos con contraseñas o tokens?', answer: 'Totalmente. La validación se ejecuta en local, sin transferir datos a la red.' }
      ],
      ja: [
        { question: 'JavaScriptでは許容される末尾カンマが、なぜJSONではエラーになるのですか？', answer: 'JSON規格（RFC 8259）は言語に依存しないデータ交換規格として厳格に定義されており、PythonやJavaなど多様なパーサーでの解釈不一致を防ぐため末尾カンマは禁止されています。' },
        { question: 'エラーの行番号や文字位置は正確に分かりますか？', answer: 'はい。構文例外から文字オフセットを計算し、修正すべき正確な行番号（Line）と列位置（Column）をわかりやすく表示します。' },
        { question: '同一オブジェクト内のキー重複は検知できますか？', answer: 'はい。重複したキーが存在する場合、上書きによるデータ消失を防ぐための警告を表示します。' },
        { question: 'パスワードや機密設定ファイルを検証しても安全ですか？', answer: '完全にお使いの端末内で検証が行われるため、機密トークンや設定データが外部に漏洩する心配はありません。' }
      ],
      fr: [
        { question: 'Pourquoi les virgules traînantes sont-elles interdites en JSON ?', answer: 'La norme RFC 8259 garantit l\'interopérabilité entre tous les langages. Pour éviter toute ambiguïté, la virgule après le dernier élément est proscrite.' },
        { question: 'L\'outil précise-t-il la ligne et la colonne du problème ?', answer: 'Oui. Le validateur convertit le décalage de caractères en coordonnées précises de ligne et colonne.' },
        { question: 'Les clés dupliquées sont-elles signalées ?', answer: 'Oui. L\'analyseur signale les doublons dans un même objet pour éviter les écrasements de données.' },
        { question: 'Mes données confidentielles sont-elles protégées ?', answer: 'Absolument. Aucune donnée ne quitte votre navigateur lors de la validation.' }
      ],
      de: [
        { question: 'Warum sind nachgestellte Kommas in JSON nicht erlaubt?', answer: 'Der RFC-8259-Standard verlangt strikte Eindeutigkeit zwischen allen Programmiersprachen. Nachgestellte Kommas sind daher im JSON-Standard untersagt.' },
        { question: 'Werden Zeilen- und Spaltennummern angezeigt?', answer: 'Ja. Das Tool berechnet aus dem Fehler-Offset die exakte Zeile und Spalte der fehlerhaften Stelle.' },
        { question: 'Werden doppelte Schlüssel im Objekt erkannt?', answer: 'Ja. Der Validator warnt vor identischen Schlüsseln im gleichen Objektbereich.' },
        { question: 'Ist die Prüfung vertraulicher Konfigurationen sicher?', answer: 'Ja, zu 100 %. Die Validierung erfolgt vollständig in der lokalen Sandbox Ihres Browsers.' }
      ],
      pt: [
        { question: 'Por que o JSON não permite vírgula no último item?', answer: 'A norma RFC 8259 foi concebida para funcionar em qualquer linguagem de programação sem ambiguidades de interpretação.' },
        { question: 'O validador mostra linha e coluna exatas do erro?', answer: 'Sim. A ferramenta converte a posição exata da exceção em números legíveis de linha e coluna.' },
        { question: 'O sistema avisa sobre chaves duplicadas?', answer: 'Sim. É emitido um alerta caso o mesmo identificador apareça mais de uma vez no mesmo objeto.' },
        { question: 'É seguro validar tokens de acesso ou senhas?', answer: 'Sim. Todo o processamento ocorre no seu computador, sem comunicação com servidores externos.' }
      ],
      ko: [
        { question: '자바스크립트에서는 허용되는 말미 쉼표가 왜 JSON에서는 문법 오류인가요?', answer: 'JSON(RFC 8259)은 C++, Java, Python 등 다양한 언어 간 데이터 교환을 위한 독립 규격이므로 파서 간의 모호성을 없애기 위해 마지막 쉼표를 엄격히 금지합니다.' },
        { question: '오류가 발생한 줄과 열 번호가 정확히 표시되나요?', answer: '네. 파서 예외 정보를 바탕으로 문제가 발생한 정확한 줄(Line)과 열(Column) 번호를 계산하여 사용자에게 안내합니다.' },
        { question: '객체 내 중복된 키(Duplicate Key)도 검출되나요?', answer: '네. 같은 객체 스코프 내에 동일한 이름의 키가 중복 선언되어 데이터가 덮어씌워지는 현상을 경고합니다.' },
        { question: '보안 토큰이나 비밀번호가 포함된 데이터를 검증해도 안전한가요?', answer: '완벽하게 안전합니다. 모든 검증 작업은 브라우저 메모리 로컬에서만 동작하며 외부 서버로 전송되지 않습니다.' }
      ],
      it: [
        { question: 'Perché il JSON vieta le virgole finali a differenza di JavaScript?', answer: 'Lo standard RFC 8259 richiede la massima compatibilità universale tra i vari linguaggi, escludendo le virgole tra virgolette non necessarie.' },
        { question: 'Lo strumento segnala riga e colonna dell\'errore?', answer: 'Sì. La posizione viene calcolata e mostrata con coordinate precise di riga e colonna.' },
        { question: 'Vengono segnalate chiavi duplicate?', answer: 'Sì. Viene mostrato un avviso in presenza di chiavi duplicate nello stesso blocco.' },
        { question: 'La validazione di credenziali è sicura?', answer: 'Assolutamente sì. Nessun dato lascia il tuo dispositivo durante l\'analisi.' }
      ]
    }
  }),

  // 5. QR Code Generator
  'qr-code-generator': createMultiLocaleTool({
    formulaTitle: {
      en: 'ISO/IEC 18004 Reed-Solomon Error Correction & 2D Matrix Synthesis',
      hi: 'ISO/IEC 18004 रीड-सोलोमन त्रुटि सुधार और 2D मैट्रिक्स संश्लेषण',
      es: 'Síntesis de Matriz 2D y Corrección de Errores Reed-Solomon ISO/IEC 18004',
      ja: 'ISO/IEC 18004準拠リード・ソロモン誤り訂正と2Dマトリックス描画構造',
      fr: 'Correction d\'Erreur Reed-Solomon ISO/IEC 18004 et Matrice 2D',
      de: 'ISO/IEC 18004 Reed-Solomon-Fehlerkorrektur & 2D-Matrixsynthese',
      pt: 'Síntese de Matriz 2D e Correção de Erros Reed-Solomon ISO/IEC 18004',
      ko: 'ISO/IEC 18004 표준 리드-솔로몬 오류 정정 및 2D 매트릭스 렌더링 구조',
      it: 'Correzione Errori Reed-Solomon ISO/IEC 18004 e Sintesi Matrice 2D'
    },
    formulaDescription: {
      en: 'QR code generation maps input text or URLs into an ISO/IEC 18004 compliant 2D module grid using Galois Field arithmetic and Reed-Solomon polynomial error correction (Levels L: 7%, M: 15%, Q: 25%, H: 30%), rendering clean vector SVG or raster PNG pixels directly on client-side HTML5 Canvas without remote server calls.',
      hi: 'QR कोड निर्माण इनपुट टेक्स्ट या URL को ISO/IEC 18004 मानकों के अनुसार रीड-सोलोमन त्रुटि सुधार (स्तर L: 7%, M: 15%, Q: 25%, H: 30%) के साथ 2D मैट्रिक्स ग्रिड में बदलता है। यह बिना सर्वर कॉल के सीधे HTML5 कैनवास पर उच्च रिज़ॉल्यूशन PNG या SVG उत्पन्न करता है।',
      es: 'La generación de códigos QR mapea texto o URL en una matriz 2D conforme a ISO/IEC 18004 mediante polinomios de corrección Reed-Solomon (niveles L: 7%, M: 15%, Q: 25%, H: 30%), dibujando gráficos SVG o PNG en el lienzo del navegador sin intermediarios.',
      ja: 'QRコード生成機能は、ISO/IEC 18004規格に準拠しガロア体演算とリード・ソロモン誤り訂正（L: 7%、M: 15%、Q: 25%、H: 30%）を用いて2次元マトリックスを構成。サーバー通信なしでHTML5 Canvas上に高解像度PNGやSVGを直接レンダリングします。',
      fr: 'La création de QR codes convertit textes ou URL en grille matricielle 2D ISO/IEC 18004 avec correction d\'erreur Reed-Solomon (L : 7%, M : 15%, Q : 25%, H : 30%), générant du SVG ou du PNG sur Canvas sans appel serveur.',
      de: 'Die QR-Code-Erzeugung überführt Eingabetexte nach ISO/IEC 18004 in ein 2D-Pixelraster mit Reed-Solomon-Fehlerkorrektur (Level L: 7 %, M: 15 %, Q: 25 %, H: 30 %) direkt auf dem HTML5-Canvas ohne externe Serveranfragen.',
      pt: 'A criação de QR Code mapeia textos e links em uma matriz bidimensional ISO/IEC 18004 com correção de erros Reed-Solomon (L: 7%, M: 15%, Q: 25%, H: 30%), desenhando imagens PNG ou SVG nítidas no navegador.',
      ko: 'QR 코드 생성기는 ISO/IEC 18004 표준에 따라 갈루아 체 연산과 리드-솔로몬(Reed-Solomon) 다항식 오류 정정(L: 7%, M: 15%, Q: 25%, H: 30%)을 적용하여 2D 매트릭스 그리드를 생성하며, 원격 서버 호출 없이 브라우저 HTML5 Canvas에서 고해상도 PNG 또는 SVG로 즉시 렌더링합니다.',
      it: 'La generazione del codice QR traspone testo o URL in una matrice 2D conforme a ISO/IEC 18004 con correzione errori Reed-Solomon (L: 7%, M: 15%, Q: 25%, H: 30%), disegnando grafica PNG o SVG sul canvas locale.'
    },
    stepByStep: {
      en: [
        { stepNumber: 1, title: 'Enter Text or URL', instruction: 'Type or paste your destination link, Wi-Fi credentials, contact card, or plain text into the input field.' },
        { stepNumber: 2, title: 'Select Error Correction Level', instruction: 'Choose Low (L 7%), Medium (M 15%), Quartile (Q 25%), or High (H 30% recommended for logos or outdoor signage).' },
        { stepNumber: 3, title: 'Customize Visual Dimensions', instruction: 'Adjust pixel size, quiet zone padding, and foreground/background colors for maximum contrast.' },
        { stepNumber: 4, title: 'Download QR Code', instruction: 'Click Download PNG or SVG to save a high-resolution, print-ready barcode immediately.' }
      ],
      hi: [
        { stepNumber: 1, title: 'टेक्स्ट या URL दर्ज करें', instruction: 'अपना वेबसाइट लिंक, वाई-फाई पासवर्ड, संपर्क विवरण या सामान्य टेक्स्ट दर्ज करें।' },
        { stepNumber: 2, title: 'त्रुटि सुधार स्तर चुनें', instruction: 'कम (L 7%), मध्यम (M 15%), क्वार्टाइल (Q 25%) या उच्च (H 30%) में से उपयुक्त स्तर चुनें।' },
        { stepNumber: 3, title: 'रंग और आकार अनुकूलित करें', instruction: 'पिक्सेल आकार, मार्जिन और बैकग्राउंड रंगों को स्कैनिंग की सुगमता के अनुसार सेट करें।' },
        { stepNumber: 4, title: 'डाउनलोड करें', instruction: 'प्रिंटिंग या डिजिटल उपयोग के लिए उच्च गुणवत्ता वाले PNG या SVG प्रारूप में तुरंत डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Introducir texto o enlace', instruction: 'Escriba o pegue la dirección URL, clave Wi-Fi o texto que desea codificar.' },
        { stepNumber: 2, title: 'Seleccionar corrección de error', instruction: 'Elija entre Bajo (7%), Medio (15%), Cuartil (25%) o Alto (30% ideal si incluye logotipos).' },
        { stepNumber: 3, title: 'Ajustar tamaño y colores', instruction: 'Configure la resolución y contraste entre módulos y fondo para asegurar escaneo rápido.' },
        { stepNumber: 4, title: 'Descargar código QR', instruction: 'Guarde el archivo como PNG de alta definición o SVG vectorial listo para imprimir.' }
      ],
      ja: [
        { stepNumber: 1, title: 'テキストまたはURLの入力', instruction: 'WebサイトのURL、Wi-Fi接続情報、連絡先、または任意のテキストを入力欄に指定します。' },
        { stepNumber: 2, title: '誤り訂正レベルの選択', instruction: '用途に合わせてL（7%）、M（15%）、Q（25%）、H（30%・屋外印刷やロゴ挿入向け）から選択します。' },
        { stepNumber: 3, title: 'サイズと配色の調整', instruction: '解像度、余白幅（クワイエットゾーン）、および十分なコントラストを持つ前景色・背景色を設定します。' },
        { stepNumber: 4, title: '保存と出力', instruction: 'ワンクリックで高解像度PNGまたはベクターSVG形式で保存し、印刷物やWebサイトに配置します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Entrer le texte ou l\'URL', instruction: 'Saisissez l\'adresse web, les identifiants Wi-Fi ou le texte à intégrer au QR code.' },
        { stepNumber: 2, title: 'Choisir le niveau de correction', instruction: 'Sélectionnez L (7%), M (15%), Q (25%) ou H (30% recommandé pour l\'impression grand format).' },
        { stepNumber: 3, title: 'Personnaliser dimensions et couleurs', instruction: 'Ajustez la taille en pixels et veillez à conserver un contraste élevé avec le fond.' },
        { stepNumber: 4, title: 'Télécharger le QR Code', instruction: 'Cliquez sur Télécharger pour obtenir une image PNG ou un fichier SVG prêt pour l\'impression.' }
      ],
      de: [
        { stepNumber: 1, title: 'Text oder URL eingeben', instruction: 'Geben Sie den Ziellink, WLAN-Zugangsdaten oder Informationstext in das Feld ein.' },
        { stepNumber: 2, title: 'Fehlerkorrektur-Level wählen', instruction: 'Wählen Sie L (7 %), M (15 %), Q (25 %) oder H (30 % für Plakate und Druckmaterialien).' },
        { stepNumber: 3, title: 'Größe und Farben anpassen', instruction: 'Bestimmen Sie Pixelmaße und Vorder-/Hintergrundfarben für optimalen Kontrast beim Scannen.' },
        { stepNumber: 4, title: 'QR-Code herunterladen', instruction: 'Laden Sie die Datei als hochauflösendes PNG oder skalierbare SVG-Vektordatei herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Inserir link ou texto', instruction: 'Digite a URL de destino, credenciais de Wi-Fi ou texto que deseja transformar em código.' },
        { stepNumber: 2, title: 'Definir tolerância a falhas', instruction: 'Escolha o nível de correção: L (7%), M (15%), Q (25%) ou H (30% para materiais impressos).' },
        { stepNumber: 3, title: 'Ajustar dimensões e contraste', instruction: 'Defina a resolução e certifique-se de que a cor do código se destaque nitidamente do fundo.' },
        { stepNumber: 4, title: 'Baixar imagem', instruction: 'Baixe o código QR finalizado em formato PNG de alta resolução ou vetor SVG.' }
      ],
      ko: [
        { stepNumber: 1, title: '텍스트 또는 URL 입력', instruction: 'QR 코드로 변환할 웹사이트 주소, 와이파이 접속 정보, 연락처 또는 일반 텍스트를 입력합니다.' },
        { stepNumber: 2, title: '오류 복원율 선택', instruction: '용도에 따라 Low(7%), Medium(15%), Quartile(25%), High(30%・로고 삽입 및 인쇄물용) 중 선택합니다.' },
        { stepNumber: 3, title: '크기 및 색상 맞춤 설정', instruction: '스마트폰 카메라 인식률을 높이기 위해 충분한 대비의 배경색과 모듈 크기, 여백을 조절합니다.' },
        { stepNumber: 4, title: 'QR 코드 다운로드', instruction: '고해상도 PNG 또는 크기 조절이 자유로운 벡터 SVG 파일로 즉시 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Inserire testo o URL', instruction: 'Digita il link, le credenziali Wi-Fi o le informazioni da codificare nel QR code.' },
        { stepNumber: 2, title: 'Scegliere la correzione errori', instruction: 'Seleziona L (7%), M (15%), Q (25%) o H (30% per insegne e supporti stampati).' },
        { stepNumber: 3, title: 'Regolare dimensioni e colori', instruction: 'Imposta la risoluzione garantendo un contrasto cromatico netto per la scansione.' },
        { stepNumber: 4, title: 'Scaricare il codice', instruction: 'Scarica il QR code in formato PNG ad alta definizione o SVG vettoriale.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Promotional Product Flyer QR Code Creation',
        scenario: 'Generating a high-res QR code pointing to https://example.com/promo for printed brochures.',
        calculation: 'Input URL: 26 characters. Encoding mode: Alphanumeric/Byte. Error Correction Level H (30%). Version 3 Matrix (29×29 modules). Output rendered at 1000×1000px.',
        result: 'Scannable PNG barcode generated instantly with 30% damage tolerance, allowing clear smartphone detection even when printed on glossy paper.'
      },
      hi: {
        title: 'उत्पाद ब्रोशर के लिए QR कोड निर्माण उदाहरण',
        scenario: 'मुद्रित ब्रोशर के लिए https://example.com/promo लिंक का उच्च-रिज़ॉल्यूशन QR कोड बनाना।',
        calculation: 'इनपुट URL: 26 वर्ण। त्रुटि सुधार स्तर H (30%)। संस्करण 3 मैट्रिक्स (29×29 मॉड्यूल)। आउटपुट 1000×1000 पिक्सेल पर तैयार।',
        result: '30% क्षति सहनशीलता वाला स्पष्ट QR कोड तैयार, जो प्रिंट होने के बाद भी किसी भी स्मार्टफोन से तुरंत स्कैन हो जाता है।'
      },
      es: {
        title: 'Ejemplo de Creación de QR para Folleto Publicitario',
        scenario: 'Generar un código QR de alta resolución con el enlace https://example.com/promo para catálogo impreso.',
        calculation: 'Enlace: 26 caracteres. Corrección de error H (30%). Matriz Versión 3 (29×29 módulos). Resolución de 1000×1000 px.',
        result: 'Código QR nítido con 30% de tolerancia a manchas, garantizando lectura inmediata con cualquier teléfono.'
      },
      ja: {
        title: '店頭チラシ用QRコード生成の実例',
        scenario: '印刷用フライヤーに掲載するため、「https://example.com/promo」へのリンクを高耐久QRコード化する例。',
        calculation: '入力文字列長: 26文字。誤り訂正レベル: H（30%）。バージョン3マトリックス（29×29モジュール）、1000×1000pxで描画。',
        result: '30%の部分破損や汚れがあっても読み取れる堅牢なQRコードが完成。光沢紙印刷でも高精度にスキャン可能。'
      },
      fr: {
        title: 'Exemple de Création pour Brochure Imprimée',
        scenario: 'Création d\'un QR code haute résolution pointant vers https://example.com/promo pour des prospectus.',
        calculation: 'URL de 26 caractères. Correction d\'erreur H (30%). Matrice Version 3 (29×29 modules) rendue en 1000×1000 px.',
        result: 'Image QR téléchargeable avec tolérance de 30% aux pliures, garantissant une lecture rapide par smartphone.'
      },
      de: {
        title: 'Beispiel für einen QR-Code auf Werbeflyern',
        scenario: 'Erstellung eines druckfähigen QR-Codes für die Adresse https://example.com/promo.',
        calculation: 'URL: 26 Zeichen. Fehlerkorrektur Level H (30 %). Matrix Version 3 (29×29 Module), ausgegeben in 1000×1000 Pixeln.',
        result: 'Scannbarer QR-Code mit 30 % Schmutztoleranz, ideal für Flyer und Druckerzeugnisse.'
      },
      pt: {
        title: 'Exemplo de QR Code para Material Publicitário',
        scenario: 'Criação de um QR Code de alta resolução com o link https://example.com/promo para panfletos.',
        calculation: 'URL com 26 caracteres. Nível de correção H (30%). Matriz Versão 3 (29×29 módulos) em 1000×1000 px.',
        result: 'Código QR nítido com tolerância de 30% a danos físicos, garantindo leitura veloz em smartphones.'
      },
      ko: {
        title: '홍보 리플릿용 고해상도 QR 코드 제작 실전 예시',
        scenario: '인쇄용 홍보물에 삽입할 웹사이트 주소(https://example.com/promo)의 고품질 QR 바코드 제작.',
        calculation: '입력 URL 길이: 26자. 오류 복원 등급: High(30%). 버전 3 매트릭스(29×29 모듈) 적용 후 1000×1000px로 렌더링.',
        result: '표면 오염이나 구겨짐에 30%까지 견디는 안정적인 QR 코드가 즉각 생성되어 모바일 스캔 테스트 완료.'
      },
      it: {
        title: 'Esempio di QR Code per Volantini Promozionali',
        scenario: 'Generazione di un codice QR ad alta risoluzione verso https://example.com/promo per brochure cartacee.',
        calculation: 'URL: 26 caratteri. Livello di correzione H (30%). Matrice Versione 3 (29×29 moduli) a 1000×1000 pixel.',
        result: 'Codice QR pronto con tolleranza del 30% a danni o abrasioni, con scansione immediata da cellulare.'
      }
    },
    faqs: {
      en: [
        { question: 'Do these QR codes expire or have scan limits?', answer: 'No. These are standard static QR codes where data is encoded directly into the pixel pattern. They never expire and have zero scan limits.' },
        { question: 'Which error correction level should I choose?', answer: 'For digital screens, Level M (15%) is standard. For outdoor posters, packaging, or if you plan to overlay a central logo, select Level H (30%) to allow reconstruction of occluded modules.' },
        { question: 'What is the "quiet zone" around the QR code?', answer: 'The quiet zone is the blank margin surrounding the barcode (minimum 4 module widths). It is mandatory so smartphone camera sensors can isolate the matrix from surrounding design elements.' },
        { question: 'Does generating QR codes send my data or Wi-Fi passwords to a server?', answer: 'No. The matrix calculation runs 100% locally in your browser memory. Sensitive Wi-Fi passwords and private URLs never leave your machine.' }
      ],
      hi: [
        { question: 'क्या ये QR कोड कभी एक्सपायर होते हैं या स्कैन की कोई सीमा है?', answer: 'नहीं। ये मानक स्टेटिक QR कोड हैं जिनमें डेटा सीधे पिक्सेल पैटर्न में इनकोड होता है। ये कभी समाप्त नहीं होते और इन्हें असीमित बार स्कैन किया जा सकता है।' },
        { question: 'मुझे कौन सा त्रुटि सुधार स्तर (Error Correction) चुनना चाहिए?', answer: 'डिजिटल स्क्रीन के लिए स्तर M (15%) उपयुक्त है। यदि आप पोस्टर पर प्रिंट कर रहे हैं या बीच में लोगो लगाना चाहते हैं तो स्तर H (30%) चुनें।' },
        { question: 'QR कोड के चारों ओर "क्वाइट ज़ोन" (Quiet Zone) क्या होता है?', answer: 'यह QR कोड के चारों ओर का खाली बॉर्डर (कम से कम 4 मॉड्यूल चौड़ा) होता है, जिससे स्मार्टफोन कैमरा कोड को आसानी से पहचान सके।' },
        { question: 'क्या QR कोड बनाते समय मेरा डेटा या वाई-फाई पासवर्ड सर्वर पर जाता है?', answer: 'बिल्कुल नहीं। संपूर्ण मैट्रिक्स गणना आपके ब्राउज़र में होती है। कोई भी डेटा बाहरी सर्वर पर नहीं भेजा जाता।' }
      ],
      es: [
        { question: '¿Caducan estos códigos QR o tienen límite de lecturas?', answer: 'No. Son códigos estáticos estándar con los datos incrustados en los módulos. Funcionan de forma permanente y sin cuotas.' },
        { question: '¿Qué nivel de corrección de error conviene elegir?', answer: 'Para pantallas suele bastar el nivel M (15%). Para impresión en papel o si se añade un logo, elija el nivel H (30%).' },
        { question: '¿Qué es la "zona muda" (quiet zone)?', answer: 'Es el margen en blanco que rodea al código (mínimo 4 módulos de ancho) necesario para que las cámaras distingan el código del fondo.' },
        { question: '¿Se envía información a servidores al generar el código?', answer: 'No. La matriz se dibuja totalmente en la memoria del navegador. Claves y enlaces se procesan en privado.' }
      ],
      ja: [
        { question: '作成したQRコードに有効期限やスキャン回数の制限はありますか？', answer: 'いいえ。URLや文字列が直接モジュールとして埋め込まれる静的（スタティック）QRコードのため、期限切れやスキャン制限はありません。' },
        { question: '誤り訂正レベルはどれを選べば良いですか？', answer: 'Webや画面表示なら標準のM（15%）、チラシや屋外看板への印刷、中央にロゴを配置したい場合は最高耐久のH（30%）をおすすめします。' },
        { question: 'QRコード周辺の「余白（クワイエットゾーン）」とは何ですか？', answer: 'QRコードの周囲に必要な白枠のことで、最低でもモジュール幅4個分の空白が必要です。これが不足するとカメラの認識率が低下します。' },
        { question: 'Wi-Fiパスワードや個人情報が外部サーバーに送信されますか？', answer: 'いいえ。すべての描画計算はお使いのブラウザ内部で行われます。ネットワークを介したデータ送信は一切ありません。' }
      ],
      fr: [
        { question: 'Ces QR codes expirent-ils ou ont-ils une limite de scans ?', answer: 'Non. Il s\'agit de QR codes statiques. Les données sont inscrites directement dans le motif et restent valides indéfiniment sans restriction.' },
        { question: 'Quel niveau de correction d\'erreur choisir ?', answer: 'Le niveau M (15%) convient pour les écrans. Pour l\'impression papier ou si vous collez un logo au centre, choisissez le niveau H (30%).' },
        { question: 'Qu\'est-ce que la zone de silence (quiet zone) ?', answer: 'C\'est la marge blanche autour du code (au moins 4 modules de largeur) indispensable pour permettre à l\'appareil photo de le détecter.' },
        { question: 'Mes données ou mots de passe Wi-Fi sont-ils transmis à un serveur ?', answer: 'Non. La synthèse matricielle est réalisée à 100 % dans votre navigateur en toute confidentialité.' }
      ],
      de: [
        { question: 'Laufen diese QR-Codes ab oder gibt es Scan-Limits?', answer: 'Nein. Es handelt sich um statische QR-Codes, bei denen die Information direkt im Pixelmuster gespeichert ist. Sie bleiben dauerhaft gültig.' },
        { question: 'Welches Fehlerkorrektur-Level sollte gewählt werden?', answer: 'Level M (15 %) reicht für Bildschirme. Für gedruckte Flyer oder Plakate mit Logo-Überlagerung empfiehlt sich Level H (30 %).' },
        { question: 'Was bedeutet die "Ruhezone" um den QR-Code?', answer: 'Der unbedruckte Randbereich (mindestens 4 Modulbreiten), den Smartphone-Kameras zwingend benötigen, um den Barcode vom Hintergrund zu trennen.' },
        { question: 'Werden WLAN-Passwörter oder Daten an Server übertragen?', answer: 'Nein. Die Erstellung läuft zu 100 % lokal im Arbeitsspeicher Ihres Browsers ab.' }
      ],
      pt: [
        { question: 'Esses códigos QR expiram ou possuem limite de leitura?', answer: 'Não. São QR codes estáticos em que a informação fica gravada no padrão de módulos. Funcionam para sempre e sem limites.' },
        { question: 'Qual nível de correção de erro devo escolher?', answer: 'Para telas e sites, o nível M (15%) é ideal. Para impressos ou códigos com logotipo no centro, use o nível H (30%).' },
        { question: 'O que é a "zona de silêncio" (margem)?', answer: 'É a borda em branco ao redor do código (mínimo de 4 módulos) necessária para a câmera do celular focar e ler a matriz.' },
        { question: 'Meus dados ou senhas de Wi-Fi são enviados a algum servidor?', answer: 'Não. Todo o cálculo ocorre no seu próprio navegador via JavaScript local, garantindo total privacidade.' }
      ],
      ko: [
        { question: '생성된 QR 코드에 유효기간이나 스캔 횟수 제한이 있나요?', answer: '전혀 없습니다. 데이터가 흑백 모듈 패턴 자체에 직접 영구 기록되는 정적(Static) QR 코드이므로 평생 무료로 무제한 스캔할 수 있습니다.' },
        { question: '오류 복원 등급(Error Correction)은 무엇을 선택해야 하나요?', answer: '일반 모바일 화면 공유는 M 레벨(15%), 종이 인쇄물이나 중앙에 브랜드 로고를 덧붙일 경우에는 H 레벨(30%) 선택을 권장합니다.' },
        { question: 'QR 코드 주변의 여백(Quiet Zone)은 왜 필요한가요?', answer: '스마트폰 카메라가 주변 이미지와 바코드를 혼동하지 않고 정확히 인식하기 위한 필수 공백 영역(최소 4모듈 이상 폭)입니다.' },
        { question: '와이파이 비밀번호 등 개인 데이터가 서버로 전송되나요?', answer: '아닙니다. 모든 2D 바코드 매트릭스 연산은 기기 브라우저 메모리 내에서 100% 로컬로 실행되므로 외부 유출이 없습니다.' }
      ],
      it: [
        { question: 'I codici QR hanno una data di scadenza o limiti di scansione?', answer: 'No. Sono codici statici permanenti in cui il contenuto è incorporato nei pixel. Non scadono mai e non hanno limiti di utilizzo.' },
        { question: 'Quale livello di correzione errori conviene impostare?', answer: 'Livello M (15%) per l\'uso a video. Livello H (30%) per stampe su carta, manifesti o se intendi applicare un logo al centro.' },
        { question: 'Cosa si intende per "zona di rispetto" (quiet zone)?', answer: 'È il margine bianco perimetrale (almeno 4 moduli) che consente alla fotocamera dello smartphone di isolare e decodificare il codice.' },
        { question: 'Le informazioni o le password Wi-Fi vengono trasmesse a server remoti?', answer: 'No. La generazione della matrice avviene esclusivamente in locale nel browser, senza alcun passaggio su server.' }
      ]
    }
  })
};
