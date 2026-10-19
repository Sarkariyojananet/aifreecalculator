// scripts/builders/pdf-part2.mjs
// Part 2: protect-pdf, unlock-pdf, rotate-pdf, add-page-numbers-to-pdf, pdf-to-word

export const pdfPart2 = {
  'protect-pdf': {
    name: 'Protect PDF',
    formulaTitle: {
      en: 'Standard PDF Security Handler & Cryptographic Access Permutations',
      hi: 'मानक पीडीएफ सुरक्षा हैंडलर और क्रिप्टोग्राफिक एक्सेस परमिट',
      es: 'Controlador de Seguridad Estándar PDF y Criptografía de Acceso',
      ja: '標準PDFセキュリティハンドラーと暗号化アクセス権限管理構造',
      fr: 'Gestionnaire de Sécurité PDF Standard et Chiffrement Cryptographique',
      de: 'Standard-PDF-Sicherheits-Handler & Kryptografische Zugriffskontrolle',
      pt: 'Manipulador de Segurança Padrão PDF e Permissões Criptográficas',
      ko: '표준 PDF 보안 핸들러 및 암호화 액세스 권한 제어 구조',
      it: 'Gestore di Sicurezza Standard PDF e Cifratura Crittografica degli Accessi'
    },
    formulaDescription: {
      en: 'The security utility initializes pdf-lib in browser memory, attaches an encryption dictionary with standard user and owner credentials, sets permission bitmasks (disallowing copying or printing if specified), and derives standard RC4/AES encryption keys to secure content streams without exposing the document or passphrase to any remote server.',
      hi: 'यह टूल ब्राउज़र मेमोरी में pdf-lib के माध्यम से एक सुरक्षित एन्क्रिप्शन डिक्शनरी तैयार करता है। यह उपयोगकर्ता और ओनर पासवर्ड सेट करता है, अनुमतियों (प्रिंटिंग या कॉपी करने पर रोक) को लॉक करता है और बिना किसी सर्वर पर डाटा भेजे आपके डिवाइस पर ही दस्तावेज़ को पूरी तरह सुरक्षित (encrypt) कर देता है।',
      es: 'La utilidad configura un diccionario de cifrado estándar en la memoria local mediante pdf-lib, estableciendo contraseñas de usuario y propietario junto con máscaras de permisos (impresión, copia) sin enviar la clave ni el archivo a la red.',
      ja: '本セキュリティツールはブラウザのローカルメモリ内でpdf-libを実行し、標準暗号化辞書を設定。ユーザー/所有者パスワードおよびアクセス権限ビットマスク（印刷やテキスト複製の制限）を適用し、通信を行わずに文書を強固に保護します。',
      fr: 'L’outil initialise un dictionnaire de sécurité standard avec mots de passe utilisateur et propriétaire via pdf-lib dans le navigateur, définissant les restrictions de copie et d’impression en toute confidentialité.',
      de: 'Das Sicherheitstool richtet mit pdf-lib ein Standard-Verschlüsselungsverzeichnis im Browser ein, vergibt Benutzer- und Besitzer-Passwörter sowie Berechtigungs-Bits ohne Serverübertragung.',
      pt: 'O utilitário configura um dicionário criptográfico padrão com senhas de utilizador e proprietário via pdf-lib no navegador, aplicando restrições de leitura e impressão sem qualquer envio externo.',
      ko: '본 보안 도구는 브라우저 메모리에서 pdf-lib를 사용하여 표준 암호화 딕셔너리를 설정하고, 사용자 및 소유자 비밀번호와 복사/인쇄 제한 권한 플래그를 로컬에서 직접 적용합니다.',
      it: 'Lo strumento configura un dizionario di sicurezza standard tramite pdf-lib nella memoria del browser, impostando password di apertura e vincoli di autorizzazione senza trasmettere dati all’esterno.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your unprotected PDF file or select it from your device storage.' },
        { stepNumber: 2, title: 'Enter Strong Password', instruction: 'Type a strong passphrase to encrypt the document and confirm it in the verification field.' },
        { stepNumber: 3, title: 'Configure Permission Flags', instruction: 'Optionally restrict printing, content extraction, or annotations.' },
        { stepNumber: 4, title: 'Encrypt and Download', instruction: 'Click Protect PDF to apply in-browser encryption and save your secured document.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल अपलोड करें', instruction: 'अपनी असुरक्षित पीडीएफ फाइल को अपलोड बॉक्स में चुनें या खींचें।' },
        { stepNumber: 2, title: 'मजबूत पासवर्ड दर्ज करें', instruction: 'दस्तावेज को सुरक्षित करने के लिए एक मजबूत पासवर्ड डालें और पुष्टि करें।' },
        { stepNumber: 3, title: 'अनुमतियां सेट करें', instruction: 'यदि चाहें तो प्रिंट करने या टेक्स्ट कॉपी करने पर रोक लगाने का विकल्प चुनें।' },
        { stepNumber: 4, title: 'सुरक्षित पीडीएफ डाउनलोड करें', instruction: 'प्रोटेक्ट पीडीएफ पर क्लिक करें और एन्क्रिप्टेड दस्तावेज सुरक्षित सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir archivo PDF', instruction: 'Seleccione o arrastre el documento que desea proteger con contraseña.' },
        { stepNumber: 2, title: 'Introducir contraseña segura', instruction: 'Escriba la clave de acceso deseada y confírmela en el campo correspondiente.' },
        { stepNumber: 3, title: 'Ajustar permisos', instruction: 'Opcionalmente limite la impresión o el copiado de texto.' },
        { stepNumber: 4, title: 'Descargar PDF protegido', instruction: 'Haga clic en Proteger PDF y guarde el archivo cifrado en su equipo.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルをアップロード', instruction: '暗号化したいPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '強力なパスワードを入力', instruction: '閲覧用パスワードを入力し、確認欄に再入力します。' },
        { stepNumber: 3, title: 'アクセス制限を設定', instruction: '必要に応じて印刷制限やテキストコピーの制限オプションを有効化します。' },
        { stepNumber: 4, title: '保護PDFをダウンロード', instruction: '「PDFを保護」をクリックし、暗号化された安全なPDFを保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer le document PDF', instruction: 'Sélectionnez le fichier que vous souhaitez sécuriser par mot de passe.' },
        { stepNumber: 2, title: 'Définir le mot de passe', instruction: 'Saisissez un mot de passe robuste et confirmez-le dans le second champ.' },
        { stepNumber: 3, title: 'Paramétrer les restrictions', instruction: 'Interdisez si besoin l’impression ou l’extraction de contenu.' },
        { stepNumber: 4, title: 'Télécharger le PDF sécurisé', instruction: 'Cliquez sur Protéger le PDF pour chiffrer le document et l’enregistrer.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Datei auswählen', instruction: 'Ziehen Sie das ungeschützte Dokument in den Arbeitsbereich.' },
        { stepNumber: 2, title: 'Sicheres Passwort eingeben', instruction: 'Geben Sie das gewünschte Öffnungspasswort ein und bestätigen Sie es.' },
        { stepNumber: 3, title: 'Berechtigungen konfigurieren', instruction: 'Schränken Sie optional Druck- und Kopierfunktionen ein.' },
        { stepNumber: 4, title: 'Geschützte PDF speichern', instruction: 'Klicken Sie auf PDF schützen und laden Sie das verschlüsselte Dokument herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar ficheiro PDF', instruction: 'Selecione o documento que pretende encriptar com palavra-passe.' },
        { stepNumber: 2, title: 'Definir senha forte', instruction: 'Introduza a senha de acesso pretendida e confirme no campo abaixo.' },
        { stepNumber: 3, title: 'Configurar permissões', instruction: 'Opcionalmente restrinja a impressão ou a cópia de texto.' },
        { stepNumber: 4, title: 'Baixar PDF protegido', instruction: 'Clique em Proteger PDF e guarde o ficheiro cifrado no dispositivo.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 업로드', instruction: '암호로 보호할 PDF 문서를 드래그하거나 선택하여 불러옵니다.' },
        { stepNumber: 2, title: '비밀번호 입력', instruction: '열람에 필요한 안전한 비밀번호를 입력하고 확인란에 다시 입력합니다.' },
        { stepNumber: 3, title: '권한 옵션 설정', instruction: '필요에 따라 인쇄 금지 및 텍스트 복사 차단 권한을 활성화합니다.' },
        { stepNumber: 4, title: '보안 PDF 다운로드', instruction: 'PDF 보호 버튼을 클릭하여 암호화된 문서를 기기에 안전하게 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica file PDF', instruction: 'Trascina il documento PDF da proteggere con password.' },
        { stepNumber: 2, title: 'Inserisci password sicura', instruction: 'Digita la chiave di accesso desiderata e confermala nel campo apposito.' },
        { stepNumber: 3, title: 'Imposta autorizzazioni', instruction: 'Limita se necessario la stampa o la copia del testo.' },
        { stepNumber: 4, title: 'Scarica PDF protetto', instruction: 'Clicca su Proteggi PDF e salva il file cifrato sul tuo dispositivo.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Encrypting a Client Contract Prior to Email Distribution',
        scenario: 'A consultant needs to secure a sensitive non-disclosure agreement with a 12-character passphrase before sending it over unencrypted email.',
        calculation: 'The tool embeds the passphrase into the document encryption dictionary, enables 128-bit/256-bit security standards, disables unauthorized printing, and compiles the secured binary.',
        result: 'A password-locked PDF generated in 0.9 seconds that strictly prompts for credentials in Adobe Reader, Apple Preview, and browsers.'
      },
      hi: {
        title: 'ईमेल से पहले ग्राहक अनुबंध को पासवर्ड से सुरक्षित करना',
        scenario: 'एक सलाहकार को संवेदनशील अनुबंध को ईमेल पर भेजने से पहले 12 अक्षरों के मजबूत पासवर्ड से लॉक करना है।',
        calculation: 'टूल ने पीडीएफ में 128/256-बिट सुरक्षा मानकों को लागू किया, अनाधिकृत प्रिंटिंग को ब्लॉक किया और पासवर्ड सुरक्षा जोड़ी।',
        result: 'मात्र 0.9 सेकंड में पासवर्ड-सुरक्षित पीडीएफ तैयार हुई जो किसी भी पीडीएफ रीडर में बिना पासवर्ड के नहीं खुलेगी।'
      },
      es: {
        title: 'Cifrado de contrato mercantil antes de su envío',
        scenario: 'Un asesor legal necesita proteger un acuerdo confidencial con una clave robusta antes de compartirlo por correo.',
        calculation: 'La herramienta aplica el cifrado estándar, bloquea la copia no autorizada de texto y recompila el archivo en memoria.',
        result: 'Documento PDF protegido generado en 0,9 segundos que exige contraseña en cualquier visor estándar.'
      },
      ja: {
        title: 'メール送信前の機密契約書暗号化実例',
        scenario: 'コンサルタントが秘密保持契約書（NDA）をメール添付する前に、安全なパスワードで閲覧制限をかけたい場合。',
        calculation: 'ブラウザ内で暗号化辞書を構築し、128/256ビット規格のアクセス制御と印刷制限フラグを埋め込み。',
        result: 'わずか0.9秒で暗号化が完了し、Adobe Readerや各ブラウザで確実にパスワードを要求する安全なPDFが完成。'
      },
      fr: {
        title: 'Sécurisation d’un contrat commercial avant envoi par courriel',
        scenario: 'Un juriste souhaite verrouiller un accord de confidentialité avec une clé complexe avant transmission électronique.',
        calculation: 'L’outil applique le dictionnaire de chiffrement standard, désactive l’impression non autorisée et génère le fichier protégé.',
        result: 'PDF crypté obtenu en 0,9 seconde, demandant impérativement le mot de passe à l’ouverture.'
      },
      de: {
        title: 'Verschlüsselung eines Kundenvertrags vor Mailversand',
        scenario: 'Ein Berater muss eine vertrauliche Vereinbarung mit einem sicheren Passwort schützen, bevor sie versendet wird.',
        calculation: 'Das Tool integriert den Sicherheitsschlüssel in die Dokumentstruktur und setzt Berechtigungsbeschränkungen.',
        result: 'Verschlüsseltes PDF in 0,9 Sekunden erstellt, das in allen gängigen PDF-Readern ein Passwort verlangt.'
      },
      pt: {
        title: 'Bloqueio de Contrato Confidencial com Senha',
        scenario: 'Um consultor precisa proteger um contrato comercial com uma senha forte antes de o enviar por e-mail.',
        calculation: 'A ferramenta aplica a encriptação padrão e bloqueia a impressão sem transferir os dados para servidores.',
        result: 'PDF protegido gerado em 0,9 segundos com exigência estrita de palavra-passe para leitura.'
      },
      ko: {
        title: '이메일 발송 전 기밀 계약서 비밀번호 암호화 실례',
        scenario: '컨설턴트가 비밀유지계약서(NDA)를 외부 이메일로 발송하기 전 12자리 암호로 안전하게 잠그고자 합니다.',
        calculation: '문서 보안 딕셔너리에 암호화 키를 적용하고 비인가 인쇄/복사 차단 플래그를 로컬에서 즉시 설정합니다.',
        result: '모든 PDF 뷰어에서 암호를 필수로 요구하는 보안 PDF 문서가 0.9초 만에 생성 완료.'
      },
      it: {
        title: 'Cifratura di accordo commerciale per invio email',
        scenario: 'Un consulente deve proteggere un documento riservato con password sicura prima della trasmissione via posta elettronica.',
        calculation: 'Lo strumento imposta la crittografia standard e blocca la copia di testo non autorizzata direttamente in locale.',
        result: 'PDF protetto generado in 0,9 secondi che richiede necessariamente la password per la consultazione.'
      }
    },
    faqs: [
      {
        question: 'Does your server know or log my document password?',
        answer: 'No. The encryption process occurs entirely on your machine using JavaScript. Neither the PDF document nor the passphrase is ever transmitted across the internet.'
      },
      {
        question: 'What happens if I forget the password I set on the document?',
        answer: 'Because PDF encryption uses industry-standard cryptographic algorithms, forgotten passwords cannot be recovered by anyone. Please record your passphrase securely.'
      },
      {
        question: 'Will the protected PDF open in Adobe Acrobat and smartphone apps?',
        answer: 'Yes. The output adheres to ISO standard PDF encryption and is fully compatible with Adobe Acrobat Reader, Apple Books/Preview, Google Chrome, and Android viewers.'
      },
      {
        question: 'Can I set separate permissions for printing and copying?',
        answer: 'Yes. You can configure permission masks that permit standard screen reading while preventing text copying or high-resolution printing.'
      }
    ]
  },

  'unlock-pdf': {
    name: 'Unlock PDF',
    formulaTitle: {
      en: 'In-Memory PDF Decryption & Permission Bitmask Clearing',
      hi: 'इन-मेमोरी पीडीएफ डिक्रिप्शन और अनुमति प्रतिबंध हटाना',
      es: 'Descifrado en Memoria y Eliminación de Restricciones PDF',
      ja: 'インメモリPDF復号と権限制限解除アーキテクチャ',
      fr: 'Déchiffrement en Mémoire et Suppression des Restrictions PDF',
      de: 'Lokale PDF-Entschlüsselung & Bereinigungs-Handler',
      pt: 'Desencriptação na Memória e Remoção de Restrições no Navegador',
      ko: '인메모리 PDF 복호화 및 권한 제한 해제 아키텍처',
      it: 'Decifratura in Memoria ed Eliminazione dei Vincoli di Protezione'
    },
    formulaDescription: {
      en: 'The unlocking utility receives user credentials, authenticates against the PDF encryption trailer dictionary using pdf-lib in browser memory, reconstructs unencrypted content streams, wipes the /Encrypt dictionary, and compiles an unrestricted PDF binary locally.',
      hi: 'यह टूल आपके द्वारा दिए गए पासवर्ड के ज़रिये ब्राउज़र मेमोरी में पीडीएफ के एन्क्रिप्शन डिक्शनरी को प्रमाणित करता है। यह कंटेंट स्ट्रीम को डिक्रिप्ट करता है, /Encrypt डिक्शनरी को पूरी तरह हटा देता है और बिना किसी सर्वर का उपयोग किए प्रतिबंध-मुक्त पीडीएफ तैयार करता है।',
      es: 'La herramienta autentica la clave ingresada frente al diccionario de cifrado con pdf-lib en la memoria local, descifra los flujos protegidos y elimina el diccionario /Encrypt para exportar un PDF libre de trabas.',
      ja: '本ツールはブラウザのメモリ内で入力されたパスワードと暗号化辞書を照合。pdf-libを用いて保護ストリームを復号し、/Encrypt辞書を完全除去して編集や印刷の制限がない独立PDFを生成します。',
      fr: 'L’outil valide le mot de passe saisi contre le dictionnaire de chiffrement via pdf-lib dans le navigateur, décrypte les flux de contenu et supprime la section /Encrypt pour produire un document sans aucune restriction.',
      de: 'Das Tool überprüft das eingegebene Passwort lokal im Browser, entschlüsselt die Datenströme mittels pdf-lib und entfernt den /Encrypt-Eintrag vollständig, um ein unbeschränktes PDF zu erzeugen.',
      pt: 'A ferramenta autentica a senha fornecida na memória local via pdf-lib, decifra os fluxos protegidos e apaga o dicionário /Encrypt, gerando um documento livre de restrições.',
      ko: '본 도구는 입력된 비밀번호를 바탕으로 브라우저 내에서 암호화 딕셔너리를 검증하고, pdf-lib를 통해 콘텐츠 스트림을 복호화한 후 /Encrypt 항목을 제거하여 제한 없는 자유로운 PDF로 재구성합니다.',
      it: 'Il programma verifica la password fornita con pdf-lib direttamente nel browser, decifra i flussi di dati e rimuove il dizionario /Encrypt, restituendo un PDF del tutto privo di vincoli.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Protected PDF', instruction: 'Drag and drop your password-locked PDF document into the unlocking tool.' },
        { stepNumber: 2, title: 'Enter Correct Password', instruction: 'Type the valid user or owner password required to decrypt document streams.' },
        { stepNumber: 3, title: 'Execute In-Memory Decryption', instruction: 'Click Unlock PDF to strip encryption dictionaries in local browser memory.' },
        { stepNumber: 4, title: 'Download Unlocked Document', instruction: 'Save the unlocked PDF file to edit, print, or merge without passwords.' }
      ],
      hi: [
        { stepNumber: 1, title: 'सुरक्षित पीडीएफ अपलोड करें', instruction: 'अपनी पासवर्ड-युक्त पीडीएफ फाइल को अनलॉक टूल में खींचें या चुनें।' },
        { stepNumber: 2, title: 'सही पासवर्ड दर्ज करें', instruction: 'दस्तावेज को खोलने के लिए मान्य पासवर्ड दर्ज करें।' },
        { stepNumber: 3, title: 'डिक्रिप्शन शुरू करें', instruction: 'अनलॉक पीडीएफ पर क्लिक करें और ब्राउज़र में सुरक्षा प्रतिबंध हटाएं।' },
        { stepNumber: 4, title: 'खुली पीडीएफ डाउनलोड करें', instruction: 'बिना पासवर्ड वाली पीडीएफ फाइल सेव करें जिसे कहीं भी आसानी से उपयोग किया जा सके।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir PDF protegido', instruction: 'Arrastre su documento bloqueado con clave al área de trabajo.' },
        { stepNumber: 2, title: 'Ingresar contraseña', instruction: 'Escriba la clave correcta de apertura o edición del documento.' },
        { stepNumber: 3, title: 'Descifrar documento', instruction: 'Haga clic en Desbloquear PDF para eliminar el cifrado en la memoria local.' },
        { stepNumber: 4, title: 'Descargar archivo libre', instruction: 'Guarde el documento sin contraseñas para imprimir o editar libremente.' }
      ],
      ja: [
        { stepNumber: 1, title: '保護されたPDFを追加', instruction: 'パスワードでロックされているPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '正しいパスワードを入力', instruction: '文書の閲覧または所有者パスワードを入力します。' },
        { stepNumber: 3, title: '制限解除を実行', instruction: '「PDFのロックを解除」をクリックし、ブラウザ内で復号処理を行います。' },
        { stepNumber: 4, title: '解除済みPDFを保存', instruction: 'パスワード要求のない自由なPDFファイルをダウンロードします。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Charger le PDF protégé', instruction: 'Sélectionnez le document verrouillé par mot de passe.' },
        { stepNumber: 2, title: 'Saisir le mot de passe valide', instruction: 'Renseignez le mot de passe de lecture ou d’administration.' },
        { stepNumber: 3, title: 'Supprimer le verrouillage', instruction: 'Cliquez sur Déverrouiller le PDF pour purger le chiffrement en mémoire.' },
        { stepNumber: 4, title: 'Télécharger le PDF libre', instruction: 'Enregistrez le document sans mot de passe pour consultation ou impression libre.' }
      ],
      de: [
        { stepNumber: 1, title: 'Geschützte PDF hochladen', instruction: 'Ziehen Sie die gesperrte PDF-Datei in das Entsperrwerkzeug.' },
        { stepNumber: 2, title: 'Passwort eingeben', instruction: 'Geben Sie das gültige Dokumentpasswort zur Entschlüsselung ein.' },
        { stepNumber: 3, title: 'Entsperrung durchführen', instruction: 'Klicken Sie auf PDF entsperren, um die Verschlüsselung lokal zu entfernen.' },
        { stepNumber: 4, title: 'Entsperrte PDF speichern', instruction: 'Laden Sie die unbeschränkte PDF-Datei herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar PDF protegido', instruction: 'Arraste o documento bloqueado com senha para a ferramenta.' },
        { stepNumber: 2, title: 'Inserir palavra-passe correta', instruction: 'Digite a senha válida para autorizar a desencriptação.' },
        { stepNumber: 3, title: 'Desbloquear ficheiro', instruction: 'Clique em Desbloquear PDF para limpar as restrições no navegador.' },
        { stepNumber: 4, title: 'Baixar PDF desbloqueado', instruction: 'Transfira o arquivo sem proteção para impressão e edição livres.' }
      ],
      ko: [
        { stepNumber: 1, title: '잠긴 PDF 파일 업로드', instruction: '비밀번호가 걸려 있는 PDF 문서를 작업 창에 끌어옵니다.' },
        { stepNumber: 2, title: '올바른 비밀번호 입력', instruction: '문서 열람 또는 권한 해제에 필요한 유효한 비밀번호를 입력합니다.' },
        { stepNumber: 3, title: '복호화 및 잠금 해제', instruction: 'PDF 잠금 해제 버튼을 눌러 브라우저 로컬에서 암호화 항목을 제거합니다.' },
        { stepNumber: 4, title: '자유 문서 다운로드', instruction: '비밀번호 입력 없이 자유롭게 인쇄 및 편집 가능한 PDF를 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica PDF protetto', instruction: 'Trascina il documento PDF bloccato con password.' },
        { stepNumber: 2, title: 'Inserisci la password corretta', instruction: 'Digita la chiave di accesso valida per decifrare il file.' },
        { stepNumber: 3, title: 'Rimuovi protezione', instruction: 'Clicca su Sblocca PDF per eliminare i vincoli nella memoria del browser.' },
        { stepNumber: 4, title: 'Scarica PDF libero', instruction: 'Salva il documento sbloccato per stamparlo o modificarlo senza limiti.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Removing Password from a Monthly Bank Statement for Archival',
        scenario: 'A user downloads an encrypted bank statement that requires entering their date of birth on every opening and wants to save an unencrypted copy for their tax binder.',
        calculation: 'The tool uses the provided password to authenticate and decrypt the byte streams, deletes the /Encrypt catalog header, and exports an unencumbered PDF.',
        result: 'An unlocked PDF produced in 0.7 seconds that opens instantly in all viewers without password prompts.'
      },
      hi: {
        title: 'मासिक बैंक स्टेटमेंट से पासवर्ड हटाना',
        scenario: 'एक उपयोगकर्ता अपने बैंक स्टेटमेंट को हर बार खोलने पर जन्मतिथि डालने से परेशान है और टैक्स फाइल के लिए पासवर्ड-मुक्त कॉपी बनाना चाहता है।',
        calculation: 'टूल ने दर्ज किए गए पासवर्ड से फाइल को डिक्रिप्ट किया, /Encrypt हेडर हटाया और नई स्वतंत्र फाइल बनाई।',
        result: 'मात्र 0.7 सेकंड में खुली पीडीएफ तैयार हुई जिसे बिना किसी पासवर्ड के सीधे खोला और प्रिंट किया जा सकता है।'
      },
      es: {
        title: 'Eliminación de clave en extracto bancario para archivo personal',
        scenario: 'Un usuario necesita archivar su extracto mensual sin tener que escribir su fecha de nacimiento cada vez que lo consulta.',
        calculation: 'La herramienta descifra los datos con la clave facilitada, retira el encabezado de cifrado y exporta el archivo.',
        result: 'PDF desbloqueado en 0,7 segundos que se abre al instante en cualquier dispositivo sin requerir contraseña.'
      },
      ja: {
        title: '毎月の銀行取引明細書から閲覧パスワードを恒久解除',
        scenario: '閲覧のたびに生年月日パスワードの入力を求められる銀行明細書を、確定申告用にパスワード不要のPDFとして保管したい場合。',
        calculation: '提供されたパスワードでストリームを正常復号し、/Encrypt辞書ヘッダーを安全に削除。',
        result: '0.7秒でパスワード解除が完了し、以後はダブルクリックだけで即座に閲覧可能なPDFが完成。'
      },
      fr: {
        title: 'Suppression du mot de passe d’un relevé bancaire pour archivage',
        scenario: 'Un particulier souhaite conserver son relevé de compte sans devoir saisir son identifiant à chaque consultation.',
        calculation: 'L’outil déchiffre les flux à l’aide du mot de passe fourni et supprime l’en-tête de sécurité du fichier.',
        result: 'Document PDF déverrouillé en 0,7 seconde, consultable immédiatement sans mot de passe.'
      },
      de: {
        title: 'Passwortentfernung bei einem Kontoauszug zur Steuerarchivierung',
        scenario: 'Ein Nutzer möchte seinen monatlichen Auszug archivieren, ohne jedes Mal das Geburtsdatum als Passwort eingeben zu müssen.',
        calculation: 'Das Tool entschlüsselt die Datenströme mit dem eingegebenen Passwort und löscht den Verschlüsselungs-Header.',
        result: 'Entsperrte PDF in 0,7 Sekunden erstellt, die ohne Passwortabfrage sofort geöffnet werden kann.'
      },
      pt: {
        title: 'Remoção de Senha de Extrato Bancário para Arquivo',
        scenario: 'Um cliente bancário deseja guardar cópia do extrato sem ter de digitar a data de nascimento a cada consulta.',
        calculation: 'A ferramenta decifra o arquivo com a senha inserida e apaga o cabeçalho de proteção.',
        result: 'PDF desbloqueado gerado em 0,7 segundos pronto para uso sem qualquer exigência de palavra-passe.'
      },
      ko: {
        title: '세무 보관용 은행 명세서의 열람 비밀번호 영구 해제',
        scenario: '열람할 때마다 생년월일을 입력해야 하는 보안 은행 거래 명세서를 세무 증빙 폴더에 비밀번호 없이 보관하려 합니다.',
        calculation: '입력된 비밀번호로 스트림을 복호화하고 암호화 헤더를 영구 제거하여 새 바이너리로 출력합니다.',
        result: '비밀번호 입력 창 없이 바로 열리는 자유 PDF가 0.7초 만에 로컬에서 생성 완료.'
      },
      it: {
        title: 'Rimozione password da estratto conto per archivio fiscale',
        scenario: 'Un utente vuole conservare l’estratto conto senza dover digitare la data di nascita a ogni consultazione.',
        calculation: 'Il programma decifra il file con la password fornita ed elimina l’intestazione di blocco crittografico.',
        result: 'PDF sbloccato generato in 0,7 secondi, consultabile immediatamente senza alcuna richiesta di credenziali.'
      }
    },
    faqs: [
      {
        question: 'Can this tool crack or bypass a password if I do not know it?',
        answer: 'No. This tool is designed to decrypt legitimately owned documents by providing the authorized password. It does not perform brute-force attacks or violate cryptography.'
      },
      {
        question: 'Is my secret password stored or sent anywhere?',
        answer: 'No. The password authentication takes place entirely inside your web browser. Neither your file nor your password is ever transmitted across the internet.'
      },
      {
        question: 'Will unlocking remove printing and copying restrictions?',
        answer: 'Yes. Supplying the valid password strips all internal access restrictions, enabling uninhibited printing, editing, and page extraction.'
      },
      {
        question: 'Can I unlock multiple files at the same time?',
        answer: 'For security and verification reasons, documents are processed individually so you can confirm credentials for each distinct file.'
      }
    ]
  },

  'rotate-pdf': {
    name: 'Rotate PDF',
    formulaTitle: {
      en: 'PDF Dictionary /Rotate Attribute Modification & Viewport Transformation',
      hi: 'पीडीएफ डिक्शनरी /Rotate विशेषता संशोधन और व्यूपोर्ट परिवर्तन',
      es: 'Modificación del Atributo /Rotate del Diccionario PDF y Transformación',
      ja: 'PDF辞書/Rotate属性変更とビューポート座標変換技術',
      fr: 'Modification de l’Attribut /Rotate du Dictionnaire PDF et Transformation',
      de: 'Änderung des /Rotate-Attributs im PDF-Wörterbuch & Transformation',
      pt: 'Modificação do Atributo /Rotate no Dicionário PDF e Transformação de Visualização',
      ko: 'PDF 딕셔너리 /Rotate 속성 변경 및 뷰포트 좌표 변환 아키텍처',
      it: 'Modifica dell’Attributo /Rotate nel Dizionario PDF e Trasformazione Viewport'
    },
    formulaDescription: {
      en: 'The rotator inspects the target PDF Page objects in browser memory via pdf-lib, updates the integer angle of the /Rotate dictionary attribute in 90-degree increments (0°, 90°, 180°, 270°), recalculates the bounding MediaBox viewport, and serializes the modified PDF structure without re-encoding raster graphics or re-sampling text streams.',
      hi: 'यह टूल ब्राउज़र मेमोरी में pdf-lib द्वारा पीडीएफ पेजों के /Rotate एट्रिब्यूट को 90 डिग्री के गुणकों (90°, 180°, 270°) में बदलता है। यह बिना किसी फोटो या टेक्स्ट की क्वालिटी कम किए केवल ओरिएंटेशन कोण को अपडेट करता है, जिससे प्रक्रिया तुरंत और बिना किसी सर्वर के पूरी होती है।',
      es: 'El rotador modifica el valor entero del atributo /Rotate en incrementos de 90° (0°, 90°, 180°, 270°) en los objetos de página del PDF mediante pdf-lib, ajustando la orientación sin recodificar imágenes ni textos.',
      ja: '本ローテーターはブラウザメモリ内で各ページの/Rotate属性の角度（90度刻み: 0°、90°、180°、270°）を書き換えます。テキストや画像を再圧縮せず、辞書の回転属性のみを高速に変更するため完全可逆で劣化がありません。',
      fr: 'L’outil met à jour l’attribut /Rotate des objets de page par incréments de 90° via pdf-lib dans le navigateur, ajustant l’orientation du document sans ré-encodage ni perte de qualité visuelle.',
      de: 'Der Rotierer passt das /Rotate-Attribut der Seitenobjekte in 90°-Schritten an (0°, 90°, 180°, 270°) und verändert die Ausrichtung rein strukturell ohne Neuberechnung von Rasterbildern.',
      pt: 'O utilitário altera o valor do atributo /Rotate em passos de 90° no dicionário da página com pdf-lib no navegador, reorientando a visualização sem recodificar elementos.',
      ko: '본 회전기는 pdf-lib를 사용하여 각 페이지 객체의 /Rotate 속성값을 90도 단위(0°, 90°, 180°, 270°)로 갱신합니다. 텍스트와 이미지를 재압축하지 않고 회전 메타데이터만 변경하므로 화질 손실이 전혀 없습니다.',
      it: 'Lo strumento aggiorna l’attributo /Rotate degli oggetti pagina con incrementi di 90° tramite pdf-lib nel browser, correggendo l’orientamento senza alcuna perdita qualitativa.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your PDF file into the rotation workbench.' },
        { stepNumber: 2, title: 'Select Rotation Angle and Pages', instruction: 'Rotate all pages simultaneously or select individual inverted pages to rotate 90°, 180°, or 270° clockwise.' },
        { stepNumber: 3, title: 'Apply Rotation', instruction: 'Click Apply Rotation to update dictionary rotation flags in local memory.' },
        { stepNumber: 4, title: 'Download Corrected PDF', instruction: 'Save the permanently oriented PDF document directly to your device.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल अपलोड करें', instruction: 'अपनी उल्टी या तिरछी पीडीएफ फाइल को वर्कस्पेस में खींचें या चुनें।' },
        { stepNumber: 2, title: 'रोटेशन कोण और पेज चुनें', instruction: 'सभी पेजों को एक साथ घुमाएं या किसी खास पेज को 90°, 180°, या 270° पर घुमाने का विकल्प चुनें।' },
        { stepNumber: 3, title: 'रोटेशन लागू करें', instruction: 'अप्लाई रोटेशन पर क्लिक करें और ब्राउज़र में पेज का ओरिएंटेशन सही करें।' },
        { stepNumber: 4, title: 'सही पीडीएफ डाउनलोड करें', instruction: 'स्थायी रूप से सीधी की गई पीडीएफ फाइल को अपने डिवाइस पर सुरक्षित सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir archivo PDF', instruction: 'Arrastre el documento con páginas invertidas o apaisadas al área de carga.' },
        { stepNumber: 2, title: 'Seleccionar ángulo y páginas', instruction: 'Gire todas las páginas o seleccione páginas sueltas en giros de 90°, 180° o 270°.' },
        { stepNumber: 3, title: 'Aplicar rotación', instruction: 'Actualice los atributos de rotación en la memoria del navegador.' },
        { stepNumber: 4, title: 'Descargar PDF corregido', instruction: 'Guarde el documento con la orientación definitiva en su equipo.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルをアップロード', instruction: '向きを修正したいPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '回転角度と対象ページを選択', instruction: '全ページ一括または個別ページを選択し、90°、180°、270°時計回りに回転させます。' },
        { stepNumber: 3, title: '回転を適用', instruction: '「回転を適用」をクリックして内部属性の角度情報を即座に更新します。' },
        { stepNumber: 4, title: '修正PDFをダウンロード', instruction: '正しい向きで固定されたPDFファイルを保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Charger le fichier PDF', instruction: 'Importez le document comportant des pages mal orientées.' },
        { stepNumber: 2, title: 'Définir l’angle de rotation', instruction: 'Faites pivoter toutes les pages ou ciblez des feuilles spécifiques à 90°, 180° ou 270°.' },
        { stepNumber: 3, title: 'Appliquer l’orientation', instruction: 'Cliquez pour modifier les métadonnées de rotation en mémoire locale.' },
        { stepNumber: 4, title: 'Télécharger le PDF orienté', instruction: 'Enregistrez le document parfaitement aligné sur votre appareil.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Datei hochladen', instruction: 'Ziehen Sie das Dokument mit falsch ausgerichteten Seiten in das Tool.' },
        { stepNumber: 2, title: 'Drehwinkel und Seiten festlegen', instruction: 'Drehen Sie alle Seiten oder gezielt Einzelseiten um 90°, 180° oder 270°.' },
        { stepNumber: 3, title: 'Drehung anwenden', instruction: 'Aktualisieren Sie die Orientierungsdaten im lokalen Arbeitsspeicher.' },
        { stepNumber: 4, title: 'Gedrehte PDF speichern', instruction: 'Laden Sie das dauerhaft korrekt ausgerichtete Dokument herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar documento PDF', instruction: 'Arraste o arquivo com páginas invertidas para a ferramenta.' },
        { stepNumber: 2, title: 'Escolher ângulo e páginas', instruction: 'Rode todas as páginas ou apenas páginas pontuais em 90°, 180° ou 270°.' },
        { stepNumber: 3, title: 'Aplicar rotação', instruction: 'Atualize os metadados de orientação diretamente no navegador.' },
        { stepNumber: 4, title: 'Baixar PDF corrigido', instruction: 'Guarde o ficheiro na orientação correta para leitura e impressão.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 업로드', instruction: '회전이 필요한 거꾸로 된 PDF 문서를 작업 창에 끌어옵니다.' },
        { stepNumber: 2, title: '회전 각도 및 대상 페이지 지정', instruction: '전체 페이지 일괄 회전 또는 특정 페이지만 90°, 180°, 270° 시계 방향으로 회전합니다.' },
        { stepNumber: 3, title: '회전 적용', instruction: '브라우저 메모리에서 페이지 회전 속성값을 즉시 갱신합니다.' },
        { stepNumber: 4, title: '회전된 PDF 저장', instruction: '방향이 완벽히 바로잡힌 PDF 문서를 기기에 다운로드합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica documento PDF', instruction: 'Trascina il file con pagine capovolte o inclinate.' },
        { stepNumber: 2, title: 'Scegli angolo e pagine', instruction: 'Ruota tutte le pagine o singoli fogli a 90°, 180° o 270° in senso orario.' },
        { stepNumber: 3, title: 'Applica rotazione', instruction: 'Aggiorna i metadati di orientamento nella memoria del browser.' },
        { stepNumber: 4, title: 'Scarica PDF corretto', instruction: 'Salva il documento con l’orientamento permanente sul tuo computer.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Fixing Upside-Down Scans in an Official Certificate PDF',
        scenario: 'A user scanned a 4-page academic degree certificate where page 2 and page 4 were fed upside-down into the sheet feeder (180° orientation).',
        calculation: 'The tool reads the 4-page PDF, identifies page indices 1 and 3, applies a 180° increment to their /Rotate attributes, and compiles the document.',
        result: 'All 4 pages display in upright vertical portrait orientation in 0.5 seconds with zero raster degradation.'
      },
      hi: {
        title: 'स्कैन किए गए प्रमाणपत्र के उल्टे पेजों को सीधा करना',
        scenario: 'एक छात्र ने 4 पेज का डिग्री सर्टिफिकेट स्कैन किया जिसमें पेज 2 और पेज 4 स्कैनर में उल्टे (180°) स्कैन हो गए।',
        calculation: 'टूल ने पीडीएफ खोली, पेज 2 और 4 के /Rotate एट्रिब्यूट में 180° रोटेशन जोड़ा और फाइल सेव की।',
        result: 'मात्र 0.5 सेकंड में सभी 4 पेज पूरी तरह सीधे और पढ़ने योग्य हो गए, वह भी बिना किसी फोटो खराबी के।'
      },
      es: {
        title: 'Corrección de páginas invertidas en título universitario',
        scenario: 'Un usuario escanea un título de 4 páginas y detecta que las páginas 2 y 4 quedaron boca abajo (giradas 180°).',
        calculation: 'La herramienta actualiza el atributo /Rotate de las páginas 2 y 4 sumando 180° y recompila el PDF.',
        result: 'Las 4 páginas quedan perfectamente orientadas en 0,5 segundos manteniendo la nitidez original.'
      },
      ja: {
        title: 'スキャナー給紙ミスによる逆向きページの修正実例',
        scenario: '全4ページの卒業証明書スキャンで、2ページ目と4ページ目が上下逆さま（180度反転）に読み込まれてしまった場合。',
        calculation: '2ページ目と4ページ目の/Rotate属性を180°更新し、ドキュメントツリーを再保存。',
        result: '画質劣化ゼロでわずか0.5秒で全ページが正しい縦向きに修正されたPDFが完成。'
      },
      fr: {
        title: 'Redressement de pages inversées dans un diplôme numérisé',
        scenario: 'Un candidat a scanné un document de 4 pages dont les pages 2 et 4 sont orientées à l’envers (180°).',
        calculation: 'L’outil modifie l’attribut /Rotate des pages concernées de 180° sans rééchantillonner les images.',
        result: 'Document de 4 pages redressé en 0,5 seconde avec une clarté vectorielle intacte.'
      },
      de: {
        title: 'Korrektur von kopfstehenden Scan-Seiten',
        scenario: 'Beim Scannen eines 4-seitigen Dokuments wurden Seite 2 und 4 verkehrt herum (180° gedreht) eingezogen.',
        calculation: 'Das Tool passt den Drehwinkel der betroffenen Seiten im Seitenbaum an und speichert das Ergebnis.',
        result: 'Alle 4 Seiten innerhalb von 0,5 Sekunden verlustfrei in aufrechter Ausrichtung dargestellt.'
      },
      pt: {
        title: 'Correção de Páginas Invertidas num Certificado Escaneado',
        scenario: 'Um formando digitalizou um diploma de 4 páginas e as páginas 2 e 4 ficaram de cabeça para baixo (180°).',
        calculation: 'O utilitário ajusta o atributo de rotação das duas páginas em 180° sem recodificar o arquivo.',
        result: 'Documento corrigido em 0,5 segundos com qualidade gráfica idêntica à original.'
      },
      ko: {
        title: '스캐너 급지 오류로 거꾸로 들어간 학위 증명서 페이지 보정',
        scenario: '4페이지 학위 증명서를 스캔했는데 2페이지와 4페이지가 상하 반전(180도 회전)되어 저장된 상황입니다.',
        calculation: '해당 2개 페이지의 /Rotate 속성을 180도 회전값으로 수정하고 메타데이터를 저장합니다.',
        result: '화질 손상 없이 0.5초 만에 모든 페이지가 똑바로 정렬된 PDF 완성.'
      },
      it: {
        title: 'Correzione di pagine capovolte in un certificato scansionato',
        scenario: 'Un utente ha acquisito un documento di 4 pagine in cui i fogli 2 e 4 sono finiti capovolti di 180°.',
        calculation: 'Il programma modifica l’attributo /Rotate delle pagine interessate senza toccare i pixel.',
        result: 'Tutte le 4 pagine tornano dritte in soli 0,5 secondi senza alcuna perdita di dettaglio.'
      }
    },
    faqs: [
      {
        question: 'Does rotating pages decrease the text or image quality?',
        answer: 'No. Rotating simply changes the orientation metadata flag in the PDF dictionary. Not a single pixel is recompressed, ensuring 100% lossless output.'
      },
      {
        question: 'Can I rotate only specific odd or even pages?',
        answer: 'Yes. You can select specific pages individually in the preview grid and apply rotation only to the chosen items.'
      },
      {
        question: 'Is the rotation permanent when opened in third-party readers?',
        answer: 'Yes. The /Rotate attribute is a standard ISO 32000 specification. When saved, the document will open in the corrected orientation in Adobe Reader, Apple Preview, and browsers.'
      },
      {
        question: 'Are my confidential documents uploaded to any server during rotation?',
        answer: 'No. The entire process takes place inside your browser memory using JavaScript. No document data is ever transmitted across the internet.'
      }
    ]
  },

  'add-page-numbers-to-pdf': {
    name: 'Add Page Numbers to PDF',
    formulaTitle: {
      en: 'Vector Font Embedding & Content Stream Append Engine',
      hi: 'वेक्टर फॉन्ट एम्बेडिंग और कंटेंट स्ट्रीम अपेंड इंजन',
      es: 'Incrustación de Fuentes Vectoriales y Motor de Anexado de Flujos',
      ja: 'ベクターフォント埋め込みとコンテンツストリーム追加エンジン',
      fr: 'Intégration de Polices Vectorielles et Moteur d’Ajout de Flux',
      de: 'Vektor-Schrifteinbettung & Content-Stream-Append-Engine',
      pt: 'Incorporação de Fontes Vetoriais e Motor de Adição de Conteúdo',
      ko: '벡터 폰트 임베딩 및 콘텐츠 스트림 텍스트 오버레이 구조',
      it: 'Incorporamento Font Vettoriali e Motore di Aggiunta Contenuti'
    },
    formulaDescription: {
      en: 'The numbering tool loads the PDF via pdf-lib in browser memory, embeds a standard Type1/TrueType font program (such as Helvetica), iterates across every page to calculate precise bottom/top coordinates relative to the page MediaBox, appends a text operator stream (BT /F1 size Tf x y Td (string) Tj ET), and writes the modified PDF without altering underlying page graphics.',
      hi: 'यह टूल ब्राउज़र मेमोरी में pdf-lib के माध्यम से मानक फॉन्ट (जैसे Helvetica) को एम्बेड करता है। यह प्रत्येक पेज के MediaBox के अनुसार सही को-ऑर्डिनेट (ऊपर या नीचे) की गणना करता है, टेक्स्ट स्ट्रीम (Page X of Y) जोड़ता है और बिना मूल सामग्री को नुकसान पहुंचाए नंबरिंग वाली पीडीएफ तैयार करता है।',
      es: 'La herramienta incrusta una fuente vectorial estándar mediante pdf-lib en la memoria local, calcula las coordenadas según el MediaBox de cada página, añade los operadores de texto con el formato deseado y genera el PDF numerado sin alterar el contenido original.',
      ja: '本ツールはpdf-libを用いて標準フォントを埋め込み、各ページのMediaBox座標系に基づいて天・地の余白位置を計算。元のグラフィックを保持したまま「ページ X / Y」等のテキスト描画ストリームを末尾に追加して出力します。',
      fr: 'L’outil intègre une police standard via pdf-lib dans le navigateur, calcule les coordonnées en fonction des marges de chaque page, ajoute les opérateurs de texte numérotés et compile le document sans altérer les éléments sous-jacents.',
      de: 'Das Tool bettet Standardschriften mit pdf-lib ein, berechnet exakte Kopf- oder Fußzeilen-Koordinaten im MediaBox-System jeder Seite und fügt den Seitenzahlen-Textstrom verlustfrei hinzu.',
      pt: 'O utilitário incorpora fontes padrão via pdf-lib no navegador, calcula as coordenadas relativas ao MediaBox e insere a numeração de páginas sem mexer no conteúdo existente.',
      ko: '본 번호 매기기 도구는 pdf-lib를 통해 표준 글꼴을 문서에 임베딩하고, 각 페이지의 MediaBox 좌표계에 맞춰 상단/하단 여백에 정확한 위치를 계산한 뒤 텍스트 스트림을 오버레이하여 번호가 매겨진 PDF를 출력합니다.',
      it: 'Il programma incorpora un font standard tramite pdf-lib nel browser, calcola le coordinate esatte in testata o piè di pagina per ogni foglio e aggiunge la numerazione senza toccare il layout preesistente.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your unnumbered PDF document into the numbering workbench.' },
        { stepNumber: 2, title: 'Configure Number Position and Format', instruction: 'Choose placement (Bottom-Center, Bottom-Right, Top-Right) and numbering format (e.g., "1", "Page 1", "Page 1 of 10").' },
        { stepNumber: 3, title: 'Set Font and Margins', instruction: 'Select font style, font size (10–14pt), and margin distance from the page edge.' },
        { stepNumber: 4, title: 'Apply Numbers and Download', instruction: 'Click Add Page Numbers to render the pagination overlay and save your document.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल अपलोड करें', instruction: 'अपनी बिना पेज नंबर वाली पीडीएफ फाइल को अपलोड बॉक्स में चुनें या खींचें।' },
        { stepNumber: 2, title: 'नंबर स्थिति और प्रारूप चुनें', instruction: 'नंबर का स्थान (नीचे बीच में, नीचे दाएं, ऊपर दाएं) और प्रारूप (उदा. "1", "Page 1 of 10") चुनें।' },
        { stepNumber: 3, title: 'फॉन्ट और मार्जिन सेट करें', instruction: 'फॉन्ट का आकार (10-14pt) और पेज के किनारे से दूरी निर्धारित करें।' },
        { stepNumber: 4, title: 'नंबर जोड़ें और डाउनलोड करें', instruction: 'ऐड पेज नंबर्स पर क्लिक करें और नंबर लगी हुई पीडीएफ फाइल सुरक्षित डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir archivo PDF', instruction: 'Arrastre el documento que desea paginar al área de trabajo.' },
        { stepNumber: 2, title: 'Elegir posición y formato', instruction: 'Seleccione la ubicación (inferior centrado, inferior derecha) y el formato ("Página 1 de N").' },
        { stepNumber: 3, title: 'Ajustar fuente y márgenes', instruction: 'Configure el tamaño de tipografía (10 a 14 pt) y la separación del borde.' },
        { stepNumber: 4, title: 'Aplicar y descargar', instruction: 'Haga clic en Añadir números de página y guarde el documento actualizado.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルをアップロード', instruction: 'ページ番号を追加したいPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '配置位置と書式を設定', instruction: '配置（下部中央、下部右、上部右など）および番号書式（例: 1, Page 1 of 10）を選択します。' },
        { stepNumber: 3, title: 'フォントと余白を調整', instruction: '文字サイズ（10〜14pt）や用紙端からのマージン距離を設定します。' },
        { stepNumber: 4, title: '番号を追加してダウンロード', instruction: '「ページ番号を追加」をクリックし、ページ番号が印字されたPDFを保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer le fichier PDF', instruction: 'Sélectionnez le document à numéroter depuis votre appareil.' },
        { stepNumber: 2, title: 'Choisir l’emplacement et le format', instruction: 'Définissez la position (bas centré, bas droite) et le libellé ("Page 1 sur N").' },
        { stepNumber: 3, title: 'Régler la police et les marges', instruction: 'Ajustez la taille du texte (10-14 pt) et la distance par rapport aux bords.' },
        { stepNumber: 4, title: 'Appliquer et télécharger', instruction: 'Cliquez sur Ajouter les numéros de page pour obtenir le document paginé.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Dokument hochladen', instruction: 'Ziehen Sie die unnummerierte PDF-Datei in den Arbeitsbereich.' },
        { stepNumber: 2, title: 'Position und Format wählen', instruction: 'Legen Sie die Platzierung (unten zentriert, unten rechts) und das Format ("Seite 1 von N") fest.' },
        { stepNumber: 3, title: 'Schriftgröße und Ränder einstellen', instruction: 'Wählen Sie Schriftgröße (10–14 pt) und den Abstand zum Seitenrand.' },
        { stepNumber: 4, title: 'Nummerierung anwenden und speichern', instruction: 'Klicken Sie auf Seitenzahlen hinzufügen und laden Sie die fertige PDF herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar documento PDF', instruction: 'Selecione o ficheiro que precisa de paginação no formulário.' },
        { stepNumber: 2, title: 'Definir posição e formato', instruction: 'Escolha a localização (rodapé centro, rodapé direita) e o modelo ("Página 1 de N").' },
        { stepNumber: 3, title: 'Ajustar fonte e margens', instruction: 'Configure o tamanho do tipo de letra (10 a 14 pt) e o espaçamento.' },
        { stepNumber: 4, title: 'Aplicar e descarregar', instruction: 'Clique em Adicionar números de página e guarde o documento paginado.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 업로드', instruction: '페이지 번호가 없는 PDF 문서를 작업 창에 끌어옵니다.' },
        { stepNumber: 2, title: '위치 및 번호 양식 선택', instruction: '번호 위치(하단 중앙, 하단 우측, 상단 우측) 및 표시 형식("1", "Page 1 of 10")을 지정합니다.' },
        { stepNumber: 3, title: '글꼴 크기 및 여백 조정', instruction: '폰트 크기(10~14pt)와 용지 가장자리로부터의 여백 거리를 설정합니다.' },
        { stepNumber: 4, title: '번호 추가 및 저장', instruction: '페이지 번호 추가 버튼을 눌러 번호가 삽입된 문서를 즉시 다운로드합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica documento PDF', instruction: 'Trascina il file senza numerazione nell’area di caricamento.' },
        { stepNumber: 2, title: 'Seleziona posizione e formato', instruction: 'Scegli la collocazione (in basso al centro, in basso a destra) e il formato desiderato.' },
        { stepNumber: 3, title: 'Imposta carattere e margini', instruction: 'Regola la dimensione del font (10-14 pt) e la distanza dal bordo del foglio.' },
        { stepNumber: 4, title: 'Applica e scarica PDF', instruction: 'Clicca su Aggiungi numeri di pagina e salva il documento impaginato.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Numbering a 45-Page Academic Dissertation for Submission',
        scenario: 'A graduate student has a 45-page master’s thesis and must add formal pagination ("Page X of 45") in the bottom-center margin before final printing.',
        calculation: 'The tool reads the 45 pages, inserts an embedded Helvetica font stream, computes bottom-center coordinates for each page, and writes the pagination text.',
        result: 'A 45-page paginated PDF generated in 1.1 seconds with crystal-clear vector typography ready for graduation binding.'
      },
      hi: {
        title: 'अंतिम प्रस्तुति के लिए 45 पेजों के शोध प्रबंध में पेज नंबर जोड़ना',
        scenario: 'एक शोधार्थी के पास 45 पेजों की थीसिस है जिसमें प्रिंटिंग से पहले नीचे बीच में औपचारिक पेज नंबर ("Page X of 45") जोड़ना अनिवार्य है।',
        calculation: 'टूल ने सभी 45 पेजों को स्कैन किया, प्रत्येक पेज के निचले केंद्र बिंदु की गणना की और स्पष्ट फॉन्ट में पेज नंबर जोड़ दिए।',
        result: 'मात्र 1.1 सेकंड में 45 पेजों की सुंदर नंबरिंग वाली थीसिस तैयार हो गई जो सीधे प्रिंट के लिए उपयुक्त है।'
      },
      es: {
        title: 'Paginación de tesis académica de 45 páginas',
        scenario: 'Un estudiante de posgrado necesita numerar las 45 páginas de su tesis con el formato "Página X de 45" en el pie de página.',
        calculation: 'La herramienta calcula las coordenadas inferiores de cada página e inserta el texto tipográfico con la numeración secuencial.',
        result: 'Documento de 45 páginas completamente numerado en 1,1 segundos listo para encuadernación.'
      },
      ja: {
        title: '提出用45ページの修士論文へのノンブル（ページ番号）追加実例',
        scenario: '大学院生が製本提出用に、45ページの論文下部中央に「Page X of 45」の形式で一括採番したい場合。',
        calculation: '全45ページの座標系を読み取り、下端マージンの中央にベクターフォントによるページ番号描画コマンドを追加。',
        result: 'わずか1.1秒で全ページに美しいページ番号が印刷品質で追加されたPDFが完成。'
      },
      fr: {
        title: 'Numérotation d’un mémoire universitaire de 45 pages',
        scenario: 'Un étudiant doit numéroter son mémoire au format "Page X sur 45" en bas de page avant dépôt officiel.',
        calculation: 'L’outil intègre la police vectorielle et calcule la position centrale basse de chaque feuille pour y inscrire la pagination.',
        result: 'Document paginé de 45 pages produit en 1,1 seconde avec une netteté irréprochable.'
      },
      de: {
        title: 'Seitennummerierung einer 45-seitigen Masterarbeit',
        scenario: 'Ein Student muss seine 45-seitige Abschlussarbeit vor dem Druck mit einer einheitlichen Paginierung ("Seite X von 45") versehen.',
        calculation: 'Das Tool berechnet die exakten Fußzeilenkoordinaten für jede Seite und fügt den nummerierten Textstrom ein.',
        result: 'Druckfertige paginierte PDF in 1,1 Sekunden mit einwandfreier Vektortypografie erzeugt.'
      },
      pt: {
        title: 'Numeração de Tese Académica de 45 Páginas',
        scenario: 'Um estudante precisa paginar um trabalho de 45 páginas com a menção "Página X de 45" no rodapé central.',
        calculation: 'A ferramenta calcula o centro inferior de cada folha e imprime a numeração vetorial em cada página.',
        result: 'Ficheiro de 45 páginas completamente paginado em 1,1 segundos com qualidade profissional.'
      },
      ko: {
        title: '제출용 45페이지 석사 학위 논문에 일괄 페이지 번호 삽입',
        scenario: '대학원생이 최종 인쇄 제본 전 45페이지 분량의 논문 하단 중앙에 "Page X of 45" 형식으로 페이지 번호를 추가해야 하는 상황입니다.',
        calculation: '45개 페이지의 하단 중앙 좌표를 자동 계산하고 선명한 벡터 폰트로 페이지 번호 스트림을 오버레이합니다.',
        result: '문서 깨짐 없이 1.1초 만에 깔끔한 페이지 번호가 매겨진 인쇄용 PDF 완성.'
      },
      it: {
        title: 'Numerazione di tesi di laurea da 45 pagine',
        scenario: 'Uno studente universitario deve inserire la dicitura "Pagina X di 45" a piè di pagina su un documento di 45 fogli.',
        calculation: 'Il programma calcola la posizione al centro della base di ogni foglio e inserisce il testo vettoriale di numerazione.',
        result: 'Documento completo di 45 pagine impaginato in 1,1 secondi pronto per la stampa della tesi.'
      }
    },
    faqs: [
      {
        question: 'Can I choose to skip numbering on the first cover page?',
        answer: 'Yes. You can configure the numbering to start on page 2 or specify custom starting page offsets so your title page and table of contents remain clean.'
      },
      {
        question: 'Will adding numbers overwrite or obscure my existing document text?',
        answer: 'Page numbers are rendered within the margins (usually 15–20mm from the sheet edge). You can adjust margin distances to prevent overlapping existing footer text.'
      },
      {
        question: 'Is my PDF uploaded to any cloud server?',
        answer: 'No. The numbering engine runs 100% inside your browser using pdf-lib. Your confidential dissertation, legal brief, or accounting ledger never leaves your computer.'
      },
      {
        question: 'Can I customize the numbering format (e.g., Roman numerals)?',
        answer: 'You can choose between Arabic numerals (1, 2, 3), prefixed styles ("Page 1"), or total page counts ("Page 1 of 10").'
      }
    ]
  },

  'pdf-to-word': {
    name: 'PDF to Word',
    formulaTitle: {
      en: 'In-Browser PDF.js Text Run Extraction & OpenXML DOCX Packaging',
      hi: 'इन-ब्राउज़र PDF.js टेक्स्ट रन निष्कर्षण और OpenXML DOCX पैकेजिंग',
      es: 'Extracción de Texto con PDF.js y Empaquetado OpenXML DOCX',
      ja: 'ブラウザ内PDF.jsテキスト構造解析とOpenXML DOCXパッケージング技術',
      fr: 'Extraction de Texte PDF.js et Assemblage OpenXML DOCX dans le Navigateur',
      de: 'Lokale PDF.js-Textextraktion & OpenXML-DOCX-Paketierung',
      pt: 'Extração de Texto via PDF.js e Montagem OpenXML DOCX no Navegador',
      ko: '브라우저 내 PDF.js 텍스트 런 추출 및 OpenXML DOCX 패키징 구조',
      it: 'Estrazione Testo con PDF.js e Assemblaggio OpenXML DOCX nel Browser'
    },
    formulaDescription: {
      en: 'The converter executes Mozilla PDF.js in browser memory to parse font metrics, character glyph placements, line breaks, and paragraph groupings. It maps these text runs into valid ECMA-376 Microsoft Word OpenXML markup (word/document.xml) and compresses them into a standard .docx container using JSZip without uploading sensitive documents to an external server.',
      hi: 'यह टूल मोज़िला की PDF.js का उपयोग करके ब्राउज़र मेमोरी में पीडीएफ के अक्षरों, फोंट और पैराग्राफ को समझता है। यह निकाले गए टेक्स्ट को ECMA-376 माइक्रोसॉफ्ट वर्ड OpenXML फॉर्मेट में बदलता है और JSZip के माध्यम से बिना किसी सर्वर का उपयोग किए सीधे आपके डिवाइस पर पूरी तरह एडिटेबल .docx फाइल तैयार करता है।',
      es: 'El conversor utiliza PDF.js en el navegador para extraer líneas, fuentes y párrafos del PDF, generando la estructura OpenXML (ECMA-376) de Microsoft Word y empaquetándola en un archivo .docx mediante JSZip sin transferencias a servidores.',
      ja: '本変換器はMozilla PDF.jsを用いてブラウザ内で文字コード、フォント情報、段落の改行位置を精確に抽出。ECMA-376規格のWord OpenXML構造（document.xml）にマッピングし、JSZipで圧縮して完全編集可能な.docxファイルをローカル生成します。',
      fr: 'Le convertisseur analyse les polices, positions de glyphes et paragraphes avec PDF.js dans le navigateur, les convertit en balises OpenXML (ECMA-376) et les assemble dans un fichier .docx via JSZip sans téléversement.',
      de: 'Der Konverter nutzt PDF.js, um Textzeilen, Schriftmetriken und Absätze im Browser zu analysieren, generiert die OpenXML-Struktur (ECMA-376) und packt diese mit JSZip zu einer bearbeitbaren .docx-Datei ohne Serverkontakt.',
      pt: 'O conversor utiliza a PDF.js no navegador para extrair texto, fontes e quebras de linha, montando o padrão OpenXML (ECMA-376) do Word e gerando o arquivo .docx via JSZip sem envio a servidores remotos.',
      ko: '본 변환기는 Mozilla PDF.js를 통해 브라우저 메모리에서 텍스트 좌표, 폰트 정보, 단락 구분을 파싱한 뒤 ECMA-376 표준 Word OpenXML 마크업으로 변환하고 JSZip으로 패키징하여 편집 가능한 .docx 파일로 출력합니다.',
      it: 'Il convertitore adotta PDF.js nel browser per estrarre blocchi di testo, font e paragrafi dal PDF, costruendo la struttura OpenXML (ECMA-376) e comprimendo il file in formato .docx con JSZip in modo riservato.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your digital vector PDF into the converter area or click to browse.' },
        { stepNumber: 2, title: 'Extract Text and Paragraphs', instruction: 'The browser runs PDF.js to parse text streams, font weights, and line heights.' },
        { stepNumber: 3, title: 'Compile OpenXML DOCX Structure', instruction: 'Click Convert to Word to synthesize the paragraphs into valid Microsoft Word OpenXML format.' },
        { stepNumber: 4, title: 'Download Editable DOCX', instruction: 'Save the .docx document and edit freely in Microsoft Word, Google Docs, or LibreOffice.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल अपलोड करें', instruction: 'अपनी डिजिटल पीडीएफ फाइल को कनवर्टर बॉक्स में खींचें या चुनें।' },
        { stepNumber: 2, title: 'टेक्स्ट और पैराग्राफ निकालें', instruction: 'ब्राउज़र PDF.js के माध्यम से टेक्स्ट लाइनों, फोंट और पैराग्राफ को स्कैन करता है।' },
        { stepNumber: 3, title: 'वर्ड DOCX में बदलें', instruction: 'कन्वर्ट टू वर्ड पर क्लिक करें और सामग्री को एडिटेबल माइक्रोसॉफ्ट वर्ड फॉर्मेट में व्यवस्थित करें।' },
        { stepNumber: 4, title: 'एडिटेबल DOCX डाउनलोड करें', instruction: 'वर्ड फाइल डाउनलोड करें और इसे Microsoft Word, Google Docs या LibreOffice में एडिट करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir documento PDF', instruction: 'Arrastre el archivo PDF con texto seleccionable al área de conversión.' },
        { stepNumber: 2, title: 'Escanear texto y párrafos', instruction: 'PDF.js analiza en el navegador los tipos de letra, espaciados y párrafos.' },
        { stepNumber: 3, title: 'Generar estructura DOCX', instruction: 'Haga clic en Convertir a Word para construir el archivo compatible con Office.' },
        { stepNumber: 4, title: 'Descargar Word editable', instruction: 'Abra y edite el archivo .docx en Microsoft Word, Google Docs o LibreOffice.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルをアップロード', instruction: '文字選択が可能なデジタルPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: 'テキストと段落を抽出', instruction: 'ブラウザ内のPDF.jsがフォント情報、文字配置、改行位置を精密解析します。' },
        { stepNumber: 3, title: 'DOCX形式へ変換', instruction: '「Wordに変換」をクリックし、ECMA-376規格のWord文書構造を生成します。' },
        { stepNumber: 4, title: '編集可能なDOCXを保存', instruction: 'ダウンロードした.docxファイルをWordやGoogleドキュメントで自由に編集できます。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer le document PDF', instruction: 'Glissez-déposez votre fichier contenant du texte sélectionnable.' },
        { stepNumber: 2, title: 'Analyser les lignes et paragraphes', instruction: 'Le navigateur extrait les styles de police et les blocs de texte.' },
        { stepNumber: 3, title: 'Compiler le document DOCX', instruction: 'Cliquez sur Convertir en Word pour assembler la structure OpenXML.' },
        { stepNumber: 4, title: 'Télécharger le fichier Word', instruction: 'Modifiez librement votre fichier .docx dans Microsoft Word ou Google Docs.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Datei bereitstellen', instruction: 'Ziehen Sie das PDF mit auswählbarem Text in den Konverterbereich.' },
        { stepNumber: 2, title: 'Text und Absätze analysieren', instruction: 'PDF.js scannt Schriftarten, Zeilenumbrüche und Absatzstrukturen im Browser.' },
        { stepNumber: 3, title: 'In DOCX-Struktur überführen', instruction: 'Klicken Sie auf In Word konvertieren, um das Word-Dokument zusammenzusetzen.' },
        { stepNumber: 4, title: 'Bearbeitbare DOCX herunterladen', instruction: 'Öffnen und bearbeiten Sie die .docx-Datei in Microsoft Word oder LibreOffice.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar ficheiro PDF', instruction: 'Adicione o documento PDF que contenha texto selecionável.' },
        { stepNumber: 2, title: 'Processar texto e parágrafos', instruction: 'A PDF.js analisa os estilos, tamanhos de letra e parágrafos no navegador.' },
        { stepNumber: 3, title: 'Gerar documento DOCX', instruction: 'Clique em Converter para Word para montar o ficheiro Microsoft Word.' },
        { stepNumber: 4, title: 'Baixar Word editável', instruction: 'Abra e edite o seu arquivo .docx no Word, Google Docs ou LibreOffice.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 문서 업로드', instruction: '텍스트 선택이 가능한 전자 PDF 문서를 드래그하거나 선택하여 불러옵니다.' },
        { stepNumber: 2, title: '텍스트 및 단락 구문 분석', instruction: '브라우저 내 PDF.js 엔진이 글꼴 스타일, 줄 바꿈, 문단을 정밀 추출합니다.' },
        { stepNumber: 3, title: 'DOCX 구조로 빌드', instruction: 'Word 변환 버튼을 클릭하여 ECMA-376 표준 Word 문서로 조립합니다.' },
        { stepNumber: 4, title: '편집 가능한 DOCX 다운로드', instruction: '생성된 .docx 파일을 Microsoft Word나 한글, Google Docs에서 편집합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica documento PDF', instruction: 'Trascina il file PDF con testo selezionabile nell’area di conversione.' },
        { stepNumber: 2, title: 'Analizza testo e paragrafi', instruction: 'PDF.js estrae caratteri, dimensioni dei font e interlinea nel browser.' },
        { stepNumber: 3, title: 'Compila file DOCX', instruction: 'Clicca su Converti in Word per creare il file compatibile con Microsoft Word.' },
        { stepNumber: 4, title: 'Scarica Word modificabile', instruction: 'Modifica il file .docx ottenuto in Word, Google Documenti o LibreOffice.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Converting a Policy Document into an Editable Word Proposal',
        scenario: 'An HR manager needs to update an 8-page company policy manual that exists only as an exported PDF file.',
        calculation: 'The tool extracts 8 pages of text runs, classifies headings, bullet lists, and standard paragraphs, and wraps them into a valid .docx package using JSZip.',
        result: 'A fully editable 8-page Microsoft Word (.docx) document generated in 1.8 seconds with zero server upload.'
      },
      hi: {
        title: 'कंपनी पॉलिसी पीडीएफ को एडिटेबल वर्ड डॉक्यूमेंट में बदलना',
        scenario: 'एक एचआर मैनेजर को 8 पेज की कंपनी नीति पुस्तिका को अपडेट करना है जो केवल पीडीएफ फॉर्मेट में उपलब्ध है।',
        calculation: 'टूल ने सभी 8 पेजों के टेक्स्ट, हेडिंग और पैराग्राफ को निकाला और JSZip द्वारा एक मान्य .docx फाइल बनाई।',
        result: 'मात्र 1.8 सेकंड में पूरी तरह एडिटेबल 8 पेज का वर्ड (.docx) दस्तावेज तैयार हुआ जिसे आसानी से अपडेट किया जा सकता है।'
      },
      es: {
        title: 'Conversión de manual de políticas a documento Word editable',
        scenario: 'Un responsable de recursos humanos debe actualizar un manual de 8 páginas que solo conservaba en formato PDF.',
        calculation: 'La herramienta extrae el texto de las 8 páginas, organiza encabezados y párrafos y genera el paquete .docx con JSZip.',
        result: 'Archivo Word (.docx) de 8 páginas 100% editable obtenido en 1,8 segundos sin subir datos a ningún servidor.'
      },
      ja: {
        title: '社内規程PDFを編集可能なWord文書に変換する実例',
        scenario: '人事担当者が、手元にPDF形式しか残っていない8ページの就業規則をWordで加筆修正したい場合。',
        calculation: 'PDF.jsで8ページ分のテキスト要素、見出し階層、箇条書きを抽出し、JSZipで標準.docxファイルにパッケージング。',
        result: 'サーバーへの情報漏洩の心配なく、わずか1.8秒で編集可能な8ページのWordファイルが完成。'
      },
      fr: {
        title: 'Conversion d’un règlement intérieur PDF en document Word modifiable',
        scenario: 'Un responsable RH doit actualiser une note de service de 8 pages disponible uniquement sous forme de PDF.',
        calculation: 'L’outil extrait les 8 pages de texte, organise les titres et paragraphes et les exporte en fichier .docx via JSZip.',
        result: 'Document Word de 8 pages parfaitement modifiable généré en 1,8 seconde en local.'
      },
      de: {
        title: 'Umwandlung einer PDF-Richtlinie in ein bearbeitbares Word-Dokument',
        scenario: 'Ein Personalverantwortlicher muss ein 8-seitiges Handbuch überarbeiten, das nur als PDF-Datei vorliegt.',
        calculation: 'Das Tool extrahiert alle Textzeilen, strukturiert Überschriften und Absätze und erzeugt eine valide .docx-Datei mit JSZip.',
        result: 'Vollständig bearbeitbare 8-seitige Word-Datei innerhalb von 1,8 Sekunden lokal auf dem Gerät erstellt.'
      },
      pt: {
        title: 'Conversão de Regulamento PDF em Documento Word Editável',
        scenario: 'Um gestor de RH precisa atualizar um regulamento interno de 8 páginas arquivado apenas em PDF.',
        calculation: 'A ferramenta extrai as linhas de texto, títulos e parágrafos das 8 páginas e gera o arquivo .docx com JSZip.',
        result: 'Ficheiro Microsoft Word (.docx) de 8 páginas totalmente editável criado em 1,8 segundos.'
      },
      ko: {
        title: 'PDF 사규 문서를 편집 가능한 Word 제안서로 변환 실례',
        scenario: '인사 담당자가 PDF 파일로만 보관되어 있는 8페이지짜리 취업규칙 개정안을 Word에서 직접 수정하고자 합니다.',
        calculation: 'PDF.js를 통해 8페이지의 본문 텍스트, 제목, 단락 구조를 추출하고 JSZip으로 표준 .docx 파일로 빌드합니다.',
        result: '외부 서버 전송 없이 1.8초 만에 즉시 수정 가능한 8페이지 Word(.docx) 파일 변환 완료.'
      },
      it: {
        title: 'Conversione di regolamento PDF in documento Word modificabile',
        scenario: 'Un responsabile del personale deve aggiornare un manuale aziendale di 8 pagine disponibile solo in PDF.',
        calculation: 'Il programma estrae i blocchi di testo, riconosce i titoli e confeziona il file .docx tramite JSZip.',
        result: 'Documento Word (.docx) da 8 pagine pronto per la modifica generato in 1,8 secondi in locale.'
      }
    },
    faqs: [
      {
        question: 'Will the generated DOCX file work in Microsoft Word, Google Docs, and LibreOffice?',
        answer: 'Yes. The output conforms to the ISO/IEC 29500 (ECMA-376) OpenXML standard and opens seamlessly in all modern office suites.'
      },
      {
        question: 'Can this tool extract text from scanned, image-only PDF documents?',
        answer: 'This tool extracts native digital vector text. If your PDF is a flat image scan without embedded OCR text layers, you will need an OCR utility to synthesize characters before converting.'
      },
      {
        question: 'Are my confidential business documents uploaded to an external server?',
        answer: 'No. All text parsing, layout assembly, and DOCX compression happen entirely inside your web browser. Your confidential records never leave your computer.'
      },
      {
        question: 'Will tables and complex multi-column layouts be preserved?',
        answer: 'Text paragraphs and formatting flows are cleanly reconstructed. For intricate multi-column newspaper layouts, slight manual margin adjustments in Word may be beneficial.'
      }
    ]
  }
};
