import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const UI_STRINGS = {
  en: { calculate: 'Execute', reset: 'Reset', result: 'Result', results: 'Results', print: 'Print', share: 'Share', loading: 'Processing...', inputs: 'Options', summary: 'Summary', copied: 'Copied!' },
  hi: { calculate: 'लागू करें', reset: 'रीसेट करें', result: 'परिणाम', results: 'परिणाम', print: 'प्रिंट करें', share: 'साझा करें', loading: 'प्रसंस्करण जारी है...', inputs: 'विकल्प', summary: 'सारांश', copied: 'कॉपी हो गया!' },
  es: { calculate: 'Ejecutar', reset: 'Restablecer', result: 'Resultado', results: 'Resultados', print: 'Imprimir', share: 'Compartir', loading: 'Procesando...', inputs: 'Opciones', summary: 'Resumen', copied: '¡Copiado!' },
  fr: { calculate: 'Exécuter', reset: 'Réinitialiser', result: 'Résultat', results: 'Résultats', print: 'Imprimer', share: 'Partager', loading: 'Traitement en cours...', inputs: 'Options', summary: 'Résumé', copied: 'Copié !' },
  de: { calculate: 'Ausführen', reset: 'Zurücksetzen', result: 'Ergebnis', results: 'Ergebnisse', print: 'Drucken', share: 'Teilen', loading: 'Wird verarbeitet...', inputs: 'Optionen', summary: 'Zusammenfassung', copied: 'Kopiert!' },
  pt: { calculate: 'Executar', reset: 'Redefinir', result: 'Resultado', results: 'Resultados', print: 'Imprimir', share: 'Compartilhar', loading: 'Processando...', inputs: 'Opções', summary: 'Resumo', copied: 'Copiado!' },
  it: { calculate: 'Esegui', reset: 'Reimposta', result: 'Risultato', results: 'Risultati', print: 'Stampa', share: 'Condividi', loading: 'Elaborazione...', inputs: 'Opzioni', summary: 'Riepilogo', copied: 'Copiato!' },
  ja: { calculate: '実行', reset: 'リセット', result: '結果', results: '結果', print: '印刷', share: '共有', loading: '処理中...', inputs: 'オプション', summary: '概要', copied: 'コピー完了！' },
  ko: { calculate: '실행', reset: '초기화', result: '결과', results: '결과', print: '인쇄', share: '공유', loading: '처리 중...', inputs: '옵션', summary: '요약', copied: '복사 완료!' }
};

const CATEGORY_LABELS = {
  en: 'PDF Tools',
  hi: 'पीडीएफ टूल्स',
  es: 'Herramientas PDF',
  fr: 'Outils PDF',
  de: 'PDF-Tools',
  pt: 'Ferramentas PDF',
  it: 'Strumenti PDF',
  ja: 'PDFツール',
  ko: 'PDF 도구'
};

function generateContentHtml(title, desc, links = []) {
  return `<div class="space-y-12 text-slate-700 dark:text-slate-300 not-prose">
  <section class="space-y-4">
    <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
      ${title}
    </h2>
    <p class="leading-relaxed text-base sm:text-lg">
      ${desc}
    </p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-base">🔒</div>
        <h3 class="text-sm font-bold text-slate-900 dark:text-white">100% Private & Client-Side</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Processing happens directly in your browser. Zero document bytes are uploaded to remote servers.</p>
      </div>
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-base">⚡</div>
        <h3 class="text-sm font-bold text-slate-900 dark:text-white">Instant Local Processing</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Execute conversions and operations in milliseconds without waiting in cloud queues.</p>
      </div>
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
        <div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-base">🎯</div>
        <h3 class="text-sm font-bold text-slate-900 dark:text-white">No Limits or Watermarks</h3>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Completely free tool with zero watermarks, no account requirements, and unlimited usage.</p>
      </div>
    </div>
  </section>
  <section class="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
    <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      Related PDF & Online Tools
    </h3>
    <div class="flex flex-wrap gap-2 text-xs sm:text-sm">
      <a href="/pdf-tools/pdf-merge/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">PDF Merge →</a>
      <a href="/pdf-tools/pdf-split/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">PDF Split →</a>
      <a href="/pdf-tools/pdf-compress/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">PDF Compress →</a>
      <a href="/pdf-tools/pdf-to-image/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">PDF to Image →</a>
      <a href="/pdf-tools/image-to-pdf/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Image to PDF →</a>
      <a href="/pdf-tools/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">All PDF Tools →</a>
    </div>
  </section>
</div>`;
}

// Data definitions for the 9 PDF tools
const TOOLS_DEFINITIONS = [
  // 1. Protect PDF
  {
    slug: 'protect-pdf',
    locales: {
      en: {
        name: 'Protect PDF',
        title: 'Protect PDF - Encrypt & Password Protect PDF Online Free',
        metaTitle: 'Protect PDF - Encrypt & Password Protect PDF Online Free',
        metaDescription: 'Protect PDF with password online for free. Encrypt confidential PDF documents directly in your browser with 100% privacy and zero file uploads.',
        h1: 'Protect PDF Online Free',
        description: 'Encrypt and password protect your PDF files online with standard cryptographic security directly in your browser without uploading files to external servers.',
        shortDescription: 'Secure and password-protect your PDF documents instantly in your browser.',
        faqs: [
          { question: 'How does this Protect PDF tool secure my document?', answer: 'Our Protect PDF tool applies password protection and encryption to your PDF document binary stream using client-side JavaScript. The encrypted file requires your chosen password to open or view.' },
          { question: 'Are my confidential documents uploaded to any cloud server?', answer: 'No. The entire encryption and document processing happen 100% inside your browser memory. Your sensitive financial, legal, and personal files never leave your device.' },
          { question: 'What password strength is recommended for protecting PDFs?', answer: 'We recommend using a strong password containing at least 8 to 12 characters, including uppercase letters, lowercase letters, numbers, and special symbols to prevent brute-force recovery.' },
          { question: 'Can I unlock the PDF later if I know the password?', answer: 'Yes. You can unlock your document at any time using our free Unlock PDF tool by entering your designated password.' },
          { question: 'Is this Protect PDF tool completely free with no limits?', answer: 'Yes. It is 100% free with no file size caps, no watermarks, no registration, and unlimited daily usage.' }
        ]
      },
      hi: {
        name: 'PDF सुरक्षित करें (Protect PDF)',
        title: 'PDF सुरक्षित करें - मुफ़्त ऑनलाइन PDF पासवर्ड प्रोटेक्टर',
        metaTitle: 'PDF सुरक्षित करें - ऑनलाइन PDF पर पासवर्ड लगाएं',
        metaDescription: 'ऑनलाइन मुफ़्त में PDF पर पासवर्ड लगाएं। संवेदनशील PDF दस्तावेजों को 100% गोपनीयता के साथ सीधे अपने ब्राउज़र में सुरक्षित करें।',
        h1: 'PDF पर पासवर्ड लगाएं (Protect PDF Online)',
        description: 'अपने PDF दस्तावेजों को मजबूत पासवर्ड से सुरक्षित और एन्क्रिप्ट करें। पूरी प्रक्रिया बिना किसी सर्वर अपलोड के आपके ब्राउज़र में होती है।',
        shortDescription: 'अपने PDF दस्तावेजों को तुरंत पासवर्ड से सुरक्षित करें।',
        faqs: [
          { question: 'यह टूल PDF को कैसे सुरक्षित करता है?', answer: 'हमारा टूल आपके ब्राउज़र में सीधे क्लाइंट-साइड सुरक्षा लागू करता है, जिससे पासवर्ड के बिना फ़ाइल नहीं खोली जा सकती।' },
          { question: 'क्या मेरी संवेदनशील फाइलें किसी सर्वर पर अपलोड होती हैं?', answer: 'बिल्कुल नहीं। संपूर्ण सुरक्षा प्रक्रिया आपके डिवाइस पर स्थानीय रूप से होती है। कोई भी डेटा बाहरी सर्वर पर नहीं भेजा जाता।' },
          { question: 'PDF के लिए कैसा पासवर्ड रखना चाहिए?', answer: 'कम से कम 8-12 अक्षरों का मजबूत पासवर्ड चुनें जिसमें बड़े अक्षर, छोटे अक्षर, अंक और विशेष चिह्न शामिल हों।' },
          { question: 'क्या मैं बाद में इस PDF को अनलॉक कर सकता हूँ?', answer: 'हाँ, आप हमारे Unlock PDF टूल का उपयोग करके सही पासवर्ड डालकर कभी भी इसे अनलॉक कर सकते हैं।' }
        ]
      },
      es: {
        name: 'Proteger PDF (Protect PDF)',
        title: 'Proteger PDF - Encriptar y Poner Contraseña a PDF Online Gratis',
        metaTitle: 'Proteger PDF - Encriptar y Poner Contraseña a PDF Online Gratis',
        metaDescription: 'Protege tus archivos PDF con contraseña online gratis. Encripta documentos confidenciales en tu navegador con total privacidad.',
        h1: 'Proteger PDF Online Gratis',
        description: 'Encripta y protege con contraseña tus documentos PDF directamente en tu navegador sin enviar archivos a servidores externos.',
        shortDescription: 'Protege y asegura tus documentos PDF con contraseña al instante.',
        faqs: [
          { question: '¿Cómo funciona la protección de PDF en el navegador?', answer: 'El archivo se procesa y encripta localmente en la memoria del navegador aplicando protección por contraseña antes de guardarlo.' },
          { question: '¿Mis archivos se suben a algún servidor?', answer: 'No. La seguridad se ejecuta 100% en tu navegador web. Tus archivos nunca salen de tu ordenador o teléfono.' },
          { question: '¿Puedo desbloquear el PDF más adelante?', answer: 'Sí, puedes usar nuestra herramienta Desbloquear PDF introduciendo la contraseña correcta.' }
        ]
      },
      fr: {
        name: 'Protéger un PDF (Protect PDF)',
        title: 'Protéger un PDF - Crypter et Mot de Passe PDF Gratuit en Ligne',
        metaTitle: 'Protéger un PDF - Crypter et Mot de Passe PDF Gratuit en Ligne',
        metaDescription: 'Protégez vos documents PDF avec un mot de passe en ligne gratuitement. Chiffrement sécurisé et 100% privé dans votre navigateur.',
        h1: 'Protéger un PDF en Ligne Gratuitement',
        description: 'Chiffrez et sécurisez vos fichiers PDF avec un mot de passe directement dans votre navigateur web sans téléversement.',
        shortDescription: 'Sécurisez vos documents PDF avec un mot de passe sans téléversement.',
        faqs: [
          { question: 'Comment fonctionne la protection de PDF ?', answer: 'Le document est chiffré directement dans la mémoire de votre navigateur avec le mot de passe de votre choix.' },
          { question: 'Mes données sont-elles conservées sur un serveur ?', answer: 'Non. Aucun document n’est envoyé à un serveur tiers. Le traitement reste 100% confidentiel sur votre appareil.' }
        ]
      },
      de: {
        name: 'PDF schützen (Protect PDF)',
        title: 'PDF schützen - PDF verschlüsseln & mit Passwort schützen',
        metaTitle: 'PDF schützen - PDF verschlüsseln & mit Passwort schützen',
        metaDescription: 'PDF mit Passwort online kostenlos schützen. Verschlüsseln Sie vertrauliche PDF-Dokumente direkt im Browser mit maximalem Datenschutz.',
        h1: 'PDF online mit Passwort schützen',
        description: 'Verschlüsseln und sichern Sie Ihre PDF-Dokumente mit einem starken Passwort direkt im Browser ohne Server-Upload.',
        shortDescription: 'Schützen Sie Ihre PDF-Dateien mit einem sicheren Passwort im Browser.',
        faqs: [
          { question: 'Wie sicher ist die browserbasierte PDF-Verschlüsselung?', answer: 'Die Verarbeitung erfolgt lokal auf Ihrem Rechner. Das Passwort schützt das PDF vor unbefugtem Öffnen.' },
          { question: 'Werden meine Dokumente auf Server hochgeladen?', answer: 'Nein, die Dateien verbleiben vollständig auf Ihrem Gerät und werden nicht übertragen.' }
        ]
      },
      pt: {
        name: 'Proteger PDF (Protect PDF)',
        title: 'Proteger PDF - Criptografar e Adicionar Senha ao PDF Grátis',
        metaTitle: 'Proteger PDF - Criptografar e Adicionar Senha ao PDF Grátis',
        metaDescription: 'Proteja arquivos PDF com senha online grátis. Criptografe documentos confidenciais diretamente no navegador com privacidade total.',
        h1: 'Proteger PDF Online Grátis',
        description: 'Criptografe e proteja seus documentos PDF com senha diretamente no seu navegador, sem envio para servidores externos.',
        shortDescription: 'Proteja seus documentos PDF com senha com segurança e privacidade.',
        faqs: [
          { question: 'Como funciona a proteção de PDF online?', answer: 'O documento é protegido e criptografado localmente no seu navegador com a senha informada.' },
          { question: 'Meus arquivos são enviados para a nuvem?', answer: 'Não. O processamento é 100% local no seu navegador, garantindo privacidade absoluta.' }
        ]
      },
      it: {
        name: 'Proteggi PDF (Protect PDF)',
        title: 'Proteggi PDF - Crittografa e Proteggi PDF con Password Gratis',
        metaTitle: 'Proteggi PDF - Crittografa e Proteggi PDF con Password Gratis',
        metaDescription: 'Proteggi documenti PDF con password online gratis. Crittografia sicura direttamente nel tuo browser con privacy totale.',
        h1: 'Proteggi PDF Online Gratis',
        description: 'Crittografa e proteggi i tuoi file PDF con password direttamente nel browser senza caricare file su server remoti.',
        shortDescription: 'Imposta una password di protezione sui tuoi PDF direttamente nel browser.',
        faqs: [
          { question: 'Come proteggere un file PDF?', answer: 'Carica il file, inserisci la password desiderata e scarica il PDF protetto elaborato localmente.' },
          { question: 'I miei documenti sono al sicuro?', answer: 'Sì, i file non lasciano mai il tuo dispositivo e non vengono trasferiti a server esterni.' }
        ]
      },
      ja: {
        name: 'PDF保護 (Protect PDF)',
        title: 'PDF保護 - オンラインでPDFにパスワードを設定・暗号化',
        metaTitle: 'PDF保護 - オンラインでPDFにパスワードを設定・暗号化',
        metaDescription: 'PDFにパスワードを設定してオンラインで無料暗号化。サーバー送信なしでブラウザ内で100%安全に保護します。',
        h1: 'PDFパスワード保護 (Protect PDF Online)',
        description: 'サーバーへアップロードすることなく、ブラウザ上で直接PDF文書に強力なパスワード暗号化を設定します。',
        shortDescription: 'ブラウザ上で素早く安全にPDFにパスワードを設定・保護します。',
        faqs: [
          { question: 'ブラウザでのPDFパスワード設定は安全ですか？', answer: 'はい。外部サーバーにファイルを送信せず、お使いの端末内で暗号化処理を行います。' },
          { question: '後からパスワードを解除できますか？', answer: 'はい、正しいパスワードが分かっていれば、Unlock PDFツールで解除可能です。' }
        ]
      },
      ko: {
        name: 'PDF 암호화 (Protect PDF)',
        title: 'PDF 암호화 - 온라인 무료 PDF 비밀번호 설정 및 잠금',
        metaTitle: 'PDF 암호화 - 온라인 무료 PDF 비밀번호 설정 및 잠금',
        metaDescription: '온라인에서 무료로 PDF에 비밀번호를 설정하세요. 서버 업로드 없이 브라우저에서 100% 안전하게 문서를 암호화합니다.',
        h1: '온라인 무료 PDF 비밀번호 설정',
        description: '민감한 PDF 문서를 강력한 비밀번호로 암호화하여 보호합니다. 파일 전송 없이 브라우저 내에서 직접 처리됩니다.',
        shortDescription: '브라우저에서 안전하게 PDF 문서에 비밀번호를 설정하세요.',
        faqs: [
          { question: 'PDF 암호화는 어떻게 작동하나요?', answer: '브라우저 내에서 로컬 자바스크립트 엔진으로 비밀번호를 적용하여 안전하게 저장합니다.' },
          { question: '업로드된 파일이 서버에 저장되나요?', answer: '아닙니다. 모든 암호화 처리는 사용자의 기기 브라우저 메모리 내에서만 이루어집니다.' }
        ]
      }
    }
  },

  // 2. Unlock PDF
  {
    slug: 'unlock-pdf',
    locales: {
      en: {
        name: 'Unlock PDF',
        title: 'Unlock PDF - Remove PDF Password Online Free',
        metaTitle: 'Unlock PDF - Remove PDF Password Online Free',
        metaDescription: 'Unlock password protected PDF files online for free. Remove security restrictions and passwords in your browser with 100% privacy.',
        h1: 'Unlock PDF Online Free',
        description: 'Remove password restrictions and security encryption from your PDF documents instantly in your browser without uploading files.',
        shortDescription: 'Unlock and remove passwords from PDF files directly in your browser.',
        faqs: [
          { question: 'How do I unlock a password-protected PDF?', answer: 'Upload your locked PDF document, enter the valid document password, and click Unlock PDF to download a decrypted version.' },
          { question: 'Can this tool crack unknown passwords?', answer: 'No. For security and ethical compliance, you must provide the correct password to decrypt and save the unlocked document.' },
          { question: 'Are my decrypted files kept private?', answer: 'Yes. Decryption happens entirely in your local browser memory. No document data is sent over the internet.' }
        ]
      },
      hi: {
        name: 'PDF अनलॉक करें (Unlock PDF)',
        title: 'PDF अनलॉक करें - मुफ़्त ऑनलाइन PDF पासवर्ड रिमूवर',
        metaTitle: 'PDF अनलॉक करें - PDF पासवर्ड हटाएं',
        metaDescription: 'पासवर्ड संरक्षित PDF को ऑनलाइन मुफ़्त में अनलॉक करें। बिना किसी फ़ाइल अपलोड के सीधे अपने ब्राउज़र में सुरक्षा हटाएं।',
        h1: 'PDF अनलॉक करें ऑनलाइन (Unlock PDF)',
        description: 'अपने PDF से पासवर्ड और सुरक्षा प्रतिबंध तुरंत हटाएं। यह टूल सीधे आपके ब्राउज़र में काम करता है।',
        shortDescription: 'अपने ब्राउज़र में सीधे PDF से पासवर्ड हटाएं।',
        faqs: [
          { question: 'PDF को अनलॉक कैसे करें?', answer: 'अपनी पासवर्ड वाली PDF चुनें, सही पासवर्ड दर्ज करें और अनलॉक किए गए PDF को डाउनलोड करें।' },
          { question: 'क्या यह टूल बिना पासवर्ड के PDF खोल सकता है?', answer: 'नहीं, सुरक्षा कारणों से आपको फ़ाइल का सही पासवर्ड दर्ज करना आवश्यक है।' }
        ]
      },
      es: {
        name: 'Desbloquear PDF (Unlock PDF)',
        title: 'Desbloquear PDF - Quitar Contraseña de PDF Online Gratis',
        metaTitle: 'Desbloquear PDF - Quitar Contraseña de PDF Online Gratis',
        metaDescription: 'Desbloquea archivos PDF con contraseña online gratis. Elimina restricciones de seguridad en tu navegador con total privacidad.',
        h1: 'Desbloquear PDF Online Gratis',
        description: 'Elimina contraseñas y restricciones de seguridad de tus documentos PDF directamente en tu navegador sin subir archivos.',
        shortDescription: 'Quita contraseñas de tus archivos PDF de forma rápida y segura.',
        faqs: [
          { question: '¿Cómo desbloquear un archivo PDF?', answer: 'Selecciona el archivo, introduce la contraseña válida y descarga el PDF sin contraseña.' },
          { question: '¿Es seguro el proceso?', answer: 'Sí, todo el procesamiento se realiza localmente en tu navegador sin enviar datos a la red.' }
        ]
      },
      fr: {
        name: 'Déverrouiller PDF (Unlock PDF)',
        title: 'Déverrouiller PDF - Supprimer le Mot de Passe PDF en Ligne',
        metaTitle: 'Déverrouiller PDF - Supprimer le Mot de Passe PDF en Ligne',
        metaDescription: 'Déverrouillez vos fichiers PDF protégés en ligne gratuitement. Supprimez les mots de passe et restrictions en toute sécurité.',
        h1: 'Déverrouiller PDF en Ligne',
        description: 'Supprimez les mots de passe et restrictions de vos documents PDF directement dans votre navigateur.',
        shortDescription: 'Supprimez le mot de passe de vos documents PDF directement dans votre navigateur.',
        faqs: [
          { question: 'Comment déverrouiller un PDF protégé ?', answer: 'Indiquez le mot de passe actuel du document pour générer une version non verrouillée sans restriction.' }
        ]
      },
      de: {
        name: 'PDF entsperren (Unlock PDF)',
        title: 'PDF entsperren - PDF Passwort online kostenlos entfernen',
        metaTitle: 'PDF entsperren - PDF Passwort online kostenlos entfernen',
        metaDescription: 'Passwortgeschützte PDF-Dateien online kostenlos entsperren. Entfernen Sie Passwörter direkt im Browser ohne Server-Upload.',
        h1: 'PDF online entsperren',
        description: 'Entfernen Sie Passwörter und Sicherheitssperren von Ihren PDF-Dateien direkt im Browser mit vollständiger Datensicherheit.',
        shortDescription: 'Entfernen Sie Passwörter von PDF-Dokumenten direkt im Webbrowser.',
        faqs: [
          { question: 'Wie entsperre ich ein PDF?', answer: 'Geben Sie das bekannte Passwort ein, um die Sperre dauerhaft aus dem Dokument zu entfernen.' }
        ]
      },
      pt: {
        name: 'Desbloquear PDF (Unlock PDF)',
        title: 'Desbloquear PDF - Remover Senha do PDF Online Grátis',
        metaTitle: 'Desbloquear PDF - Remover Senha do PDF Online Grátis',
        metaDescription: 'Desbloqueie arquivos PDF protegidos por senha online grátis. Remova restrições e senhas diretamente no seu navegador.',
        h1: 'Desbloquear PDF Online Grátis',
        description: 'Remova senhas e restrições de segurança dos seus arquivos PDF diretamente no navegador com total privacidade.',
        shortDescription: 'Remova senhas de documentos PDF diretamente no seu navegador.',
        faqs: [
          { question: 'Como desbloquear um PDF protegido?', answer: 'Insira a senha do arquivo para remover a proteção e salvar uma cópia liberada.' }
        ]
      },
      it: {
        name: 'Sblocca PDF (Unlock PDF)',
        title: 'Sblocca PDF - Rimuovi Password da PDF Online Gratis',
        metaTitle: 'Sblocca PDF - Rimuovi Password da PDF Online Gratis',
        metaDescription: 'Sblocca PDF protetti da password online gratis. Rimuovi le restrizioni di sicurezza direttamente nel browser con privacy totale.',
        h1: 'Sblocca PDF Online Gratis',
        description: 'Rimuovi password e restrizioni di sicurezza dai tuoi documenti PDF nel browser in modo facile e veloce.',
        shortDescription: 'Rimuovi le password dai file PDF in modo sicuro nel tuo browser.',
        faqs: [
          { question: 'Come sbloccare un PDF con password?', answer: 'Inserisci la password corretta per scaricare il documento sbloccato senza protezioni.' }
        ]
      },
      ja: {
        name: 'PDFロック解除 (Unlock PDF)',
        title: 'PDFロック解除 - PDFのパスワード解除・セキュリティ削除',
        metaTitle: 'PDFロック解除 - PDFのパスワード解除・セキュリティ削除',
        metaDescription: 'パスワード付きPDFをオンラインで無料解除。サーバー送信なしでブラウザ内で安全にパスワードを削除します。',
        h1: 'PDFパスワード解除 (Unlock PDF Online)',
        description: 'パスワードで保護されたPDFのセキュリティ制限を解除し、パスワード不要のPDFとして保存します。',
        shortDescription: 'ブラウザ上でパスワード付きPDFの保護を素早く解除します。',
        faqs: [
          { question: 'パスワードが分からなくても解除できますか？', answer: 'セキュリティ保護のため、解除には正しいパスワードの入力が必要です。' }
        ]
      },
      ko: {
        name: 'PDF 잠금 해제 (Unlock PDF)',
        title: 'PDF 잠금 해제 - 온라인 무료 PDF 비밀번호 해제 및 복호화',
        metaTitle: 'PDF 잠금 해제 - 온라인 무료 PDF 비밀번호 해제 및 복호화',
        metaDescription: '온라인에서 비밀번호로 잠긴 PDF를 무료로 해제하세요. 서버 전송 없이 브라우저에서 안전하게 암호를 제거합니다.',
        h1: '온라인 무료 PDF 비밀번호 해제',
        description: '비밀번호로 보호된 PDF 문서의 암호를 제거하여 제한 없이 열람 및 인쇄할 수 있는 상태로 변환합니다.',
        shortDescription: '브라우저에서 직접 PDF 비밀번호를 제거하고 잠금을 해제하세요.',
        faqs: [
          { question: '비밀번호를 모르는 경우에도 해제 가능한가요?', answer: '보안 표준 준수를 위해 유효한 비밀번호를 입력해야 정상적으로 해제할 수 있습니다.' }
        ]
      }
    }
  },

  // 3. Rotate PDF
  {
    slug: 'rotate-pdf',
    locales: {
      en: {
        name: 'Rotate PDF',
        title: 'Rotate PDF - Rotate PDF Pages Online Free (90°, 180°, 270°)',
        metaTitle: 'Rotate PDF - Rotate PDF Pages Online Free (90°, 180°, 270°)',
        metaDescription: 'Rotate PDF pages 90, 180, or 270 degrees online for free. Rotate all pages or specific pages permanently in your browser with zero uploads.',
        h1: 'Rotate PDF Pages Online Free',
        description: 'Rotate upside-down or sideways PDF pages clockwise or counter-clockwise. Save permanently rotated PDF documents directly in your browser.',
        shortDescription: 'Rotate PDF pages clockwise or counter-clockwise permanently in your browser.',
        faqs: [
          { question: 'Can I rotate individual pages or all pages at once?', answer: 'Yes! You can rotate all pages simultaneously by 90°, 180°, or 270°, or specify custom page ranges (e.g., 1, 3, 5-8) to rotate only select pages.' },
          { question: 'Is the rotation saved permanently?', answer: 'Yes. When you download the rotated PDF, the internal orientation metadata is updated permanently across all PDF readers and printers.' },
          { question: 'Does rotating a PDF reduce its visual quality?', answer: 'No. The vector objects, text elements, and embedded images remain unchanged. Only the coordinate rotation matrix is adjusted.' }
        ]
      },
      hi: {
        name: 'PDF घुमाएं (Rotate PDF)',
        title: 'PDF घुमाएं - मुफ़्त ऑनलाइन PDF पेज रोटेटर (90°, 180°, 270°)',
        metaTitle: 'PDF घुमाएं - PDF पेज को रोटेट करें (90°, 180°, 270°)',
        metaDescription: 'ऑनलाइन मुफ़्त में PDF पेज घुमाएं। सभी पेज या चुनिंदा पेजों को 90°, 180° या 270° पर स्थायी रूप से रोटेट करें।',
        h1: 'PDF पेज ऑनलाइन घुमाएं (Rotate PDF Online)',
        description: 'उल्टे या आड़े-तिरछे PDF पेजों को घड़ी की दिशा या विपरीत दिशा में घुमाएं और सीधे अपने ब्राउज़र में सहेजें।',
        shortDescription: 'ब्राउज़र में PDF पेज को 90, 180 या 270 डिग्री पर आसानी से घुमाएं।',
        faqs: [
          { question: 'क्या मैं केवल कुछ खास पेज घुमा सकता हूँ?', answer: 'हाँ, आप सभी पेजों को एक साथ या पेज नंबर (जैसे 1, 3, 5) दर्ज करके केवल चुनिंदा पेजों को घुमा सकते हैं।' },
          { question: 'क्या इससे PDF की क्वालिटी कम होती है?', answer: 'नहीं, टेक्स्ट और इमेज की क्वालिटी 100% सुरक्षित और स्पष्ट रहती है।' }
        ]
      },
      es: {
        name: 'Rotar PDF (Rotate PDF)',
        title: 'Rotar PDF - Girar Páginas de PDF Online Gratis',
        metaTitle: 'Rotar PDF - Girar Páginas de PDF Online Gratis',
        metaDescription: 'Gira páginas de PDF 90, 180 o 270 grados online gratis. Rota todas las páginas o páginas específicas de forma permanente.',
        h1: 'Rotar Páginas de PDF Online Gratis',
        description: 'Corrige la orientación de páginas PDF girándolas en el sentido de las agujas del reloj o al revés directamente en tu navegador.',
        shortDescription: 'Gira páginas de tus documentos PDF de forma permanente y gratuita.',
        faqs: [
          { question: '¿La rotación es permanente?', answer: 'Sí, al descargar el archivo, la nueva orientación queda guardada para cualquier visor o impresora.' }
        ]
      },
      fr: {
        name: 'Faire Pivoter un PDF (Rotate PDF)',
        title: 'Faire Pivoter un PDF - Rotation de Pages PDF en Ligne Gratuit',
        metaTitle: 'Faire Pivoter un PDF - Rotation de Pages PDF en Ligne Gratuit',
        metaDescription: 'Faites pivoter des pages PDF à 90°, 180° ou 270° en ligne gratuitement. Rotation permanente de toutes les pages ou de pages sélectionnées.',
        h1: 'Faire Pivoter des Pages PDF en Ligne',
        description: 'Tournez vos pages PDF dans le bon sens directement dans votre navigateur sans perte de qualité.',
        shortDescription: 'Faites pivoter vos pages PDF en quelques clics sans téléversement.',
        faqs: [
          { question: 'Puis-je pivoter des pages spécifiques ?', answer: 'Oui, choisissez d’appliquer la rotation à tout le document ou uniquement à certaines pages.' }
        ]
      },
      de: {
        name: 'PDF drehen (Rotate PDF)',
        title: 'PDF drehen - PDF-Seiten online dauerhaft drehen',
        metaTitle: 'PDF drehen - PDF-Seiten online dauerhaft drehen',
        metaDescription: 'PDF-Seiten um 90°, 180° oder 270° online kostenlos drehen. Drehen Sie alle oder ausgewählte Seiten dauerhaft im Browser.',
        h1: 'PDF-Seiten online dauerhaft drehen',
        description: 'Korrigieren Sie falsch ausgerichtete PDF-Seiten schnell und dauerhaft direkt in Ihrem Webbrowser.',
        shortDescription: 'Drehen Sie PDF-Seiten um 90, 180 oder 270 Grad im Browser.',
        faqs: [
          { question: 'Bleibt die Drehung beim Drucken erhalten?', answer: 'Ja, die Ausrichtung wird direkt im PDF-Format dauerhaft gespeichert.' }
        ]
      },
      pt: {
        name: 'Girar PDF (Rotate PDF)',
        title: 'Girar PDF - Rotacionar Páginas de PDF Online Grátis',
        metaTitle: 'Girar PDF - Rotacionar Páginas de PDF Online Grátis',
        metaDescription: 'Gire páginas de PDF em 90°, 180° ou 270° online grátis. Rotacione todas as páginas ou páginas específicas permanentemente.',
        h1: 'Girar Páginas de PDF Online Grátis',
        description: 'Ajuste a orientação de páginas PDF invertidas diretamente no navegador com facilidade e rapidez.',
        shortDescription: 'Gire páginas do seu PDF em 90°, 180° ou 270° no navegador.',
        faqs: [
          { question: 'Posso girar apenas uma página do PDF?', answer: 'Sim, você pode selecionar páginas individuais ou girar todo o documento de uma só vez.' }
        ]
      },
      it: {
        name: 'Ruota PDF (Rotate PDF)',
        title: 'Ruota PDF - Ruota Pagine PDF Online Gratis',
        metaTitle: 'Ruota PDF - Ruota Pagine PDF Online Gratis',
        metaDescription: 'Ruota pagine PDF di 90, 180 o 270 gradi online gratis. Salva l’orientamento permanente direttamente nel tuo browser.',
        h1: 'Ruota Pagine PDF Online Gratis',
        description: 'Correggi l’orientamento delle pagine PDF capovolte o storte direttamente nel tuo browser web.',
        shortDescription: 'Ruota facilmente le pagine dei tuoi file PDF in modo permanente.',
        faqs: [
          { question: 'La rotazione influisce sulla qualità del testo?', answer: 'No, il testo e le immagini vettoriali mantengono la nitidezza originale al 100%.' }
        ]
      },
      ja: {
        name: 'PDF回転 (Rotate PDF)',
        title: 'PDF回転 - オンラインでPDFのページを回転・向き変更',
        metaTitle: 'PDF回転 - オンラインでPDFのページを回転・向き変更',
        metaDescription: 'PDFのページを90度、180度、270度オンラインで無料回転。全ページまたは指定ページを永久保存します。',
        h1: 'PDFページ回転 (Rotate PDF Online)',
        description: '横向きや上下逆さまのPDFページを正しい向きに回転し、ブラウザ上で永久保存します。',
        shortDescription: 'ブラウザ上で簡単にPDFページの向きを回転・調整します。',
        faqs: [
          { question: '特定のページだけを回転できますか？', answer: 'はい、全ページ一括回転に加えて、指定したページ番号のみを回転することも可能です。' }
        ]
      },
      ko: {
        name: 'PDF 회전 (Rotate PDF)',
        title: 'PDF 회전 - 온라인 무료 PDF 페이지 90도/180도 회전',
        metaTitle: 'PDF 회전 - 온라인 무료 PDF 페이지 90도/180도 회전',
        metaDescription: 'PDF 페이지를 90도, 180도, 270도 온라인에서 무료로 회전하세요. 전체 페이지 또는 특정 페이지만 영구 회전합니다.',
        h1: '온라인 무료 PDF 페이지 회전',
        description: '거꾸로 되거나 누워있는 PDF 페이지를 시계 방향 또는 반시계 방향으로 올바르게 회전하여 저장합니다.',
        shortDescription: '브라우저에서 직접 PDF 페이지의 방향을 90도/180도 회전하세요.',
        faqs: [
          { question: '회전된 방향이 다운로드 후에도 유지되나요?', answer: '네, 다운로드된 PDF 파일에 회전 각도가 영구적으로 저장됩니다.' }
        ]
      }
    }
  },

  // 4. Add Page Numbers to PDF
  {
    slug: 'add-page-numbers-to-pdf',
    locales: {
      en: {
        name: 'Add Page Numbers to PDF',
        title: 'Add Page Numbers to PDF - Insert Header & Footer Numbers Online Free',
        metaTitle: 'Add Page Numbers to PDF - Insert Header & Footer Numbers Online Free',
        metaDescription: 'Add page numbers to PDF files online for free. Customize position, formatting ("Page X of Y"), font size, and start number with 100% client-side privacy.',
        h1: 'Add Page Numbers to PDF Online Free',
        description: 'Insert clear, customizable page numbers into your PDF documents. Select header or footer positions, custom formatting styles, and margin offsets.',
        shortDescription: 'Add customizable page numbers and footers to your PDF files online.',
        faqs: [
          { question: 'What page numbering formats are supported?', answer: 'You can choose between simple numbers ("1, 2, 3"), "Page 1, Page 2", or total page counts ("Page 1 of 10").' },
          { question: 'Where can I position the page numbers?', answer: 'You can place numbers in 6 positions: Bottom Center, Bottom Right, Bottom Left, Top Center, Top Right, or Top Left.' },
          { question: 'Can I start numbering from a specific number or skip cover pages?', answer: 'Yes. You can set the starting number (e.g., start counting at 1 or 5) and specify custom page ranges to skip title pages.' }
        ]
      },
      hi: {
        name: 'PDF में पेज नंबर जोड़ें (Add Page Numbers)',
        title: 'PDF में पेज नंबर जोड़ें - मुफ़्त ऑनलाइन PDF पेजिनेशन टूल',
        metaTitle: 'PDF में पेज नंबर जोड़ें - ऑनलाइन PDF पेजिनेशन',
        metaDescription: 'ऑनलाइन मुफ़्त में PDF में पेज नंबर डालें। स्थिति, फ़ॉर्मेट ("Page X of Y") और फ़ॉन्ट आकार कस्टमाइज़ करें। 100% सुरक्षित।',
        h1: 'PDF में पेज नंबर जोड़ें (Add Page Numbers)',
        description: 'अपने PDF दस्तावेजों में आसानी से पेज नंबर और पाद लेख (Footer) जोड़ें। अपनी पसंद की स्थिति और स्टाइल चुनें।',
        shortDescription: 'अपने PDF में आसानी से पेज नंबर और फूटर जोड़ें।',
        faqs: [
          { question: 'पेज नंबर कहाँ लगाए जा सकते हैं?', answer: 'आप नीचे बीच में, नीचे दाईं ओर, बाईं ओर या ऊपर हेडर में पेज नंबर लगा सकते हैं।' },
          { question: 'क्या "Page 1 of N" जैसा फॉर्मेट उपलब्ध है?', answer: 'हाँ, आप विभिन्न प्रारूपों जैसे "1", "Page 1", या "Page 1 of 10" में से चुन सकते हैं।' }
        ]
      },
      es: {
        name: 'Numerar Páginas PDF (Add Page Numbers)',
        title: 'Numerar Páginas PDF - Agregar Números de Página a PDF Online',
        metaTitle: 'Numerar Páginas PDF - Agregar Números de Página a PDF Online',
        metaDescription: 'Agrega números de página a tus archivos PDF online gratis. Personaliza posición, formato y tamaño de letra sin subir archivos.',
        h1: 'Numerar Páginas de PDF Online Gratis',
        description: 'Inserta numeración personalizada en el encabezado o pie de página de tus documentos PDF directamente en tu navegador.',
        shortDescription: 'Agrega numeración y pies de página a tus documentos PDF.',
        faqs: [
          { question: '¿Dónde se pueden colocar los números?', answer: 'En la parte inferior o superior (centro, derecha o izquierda) según tu preferencia.' }
        ]
      },
      fr: {
        name: 'Numéroter un PDF (Add Page Numbers)',
        title: 'Numéroter un PDF - Ajouter des Numéros de Page PDF en Ligne',
        metaTitle: 'Numéroter un PDF - Ajouter des Numéros de Page PDF en Ligne',
        metaDescription: 'Ajoutez des numéros de page à vos fichiers PDF en ligne gratuitement. Personnalisez l’emplacement, le format et la police en toute sécurité.',
        h1: 'Ajouter des Numéros de Page à un PDF',
        description: 'Insérez des numéros de page clairs et professionnels dans vos documents PDF directement dans votre navigateur.',
        shortDescription: 'Insérez des numéros de page personnalisés dans vos fichiers PDF.',
        faqs: [
          { question: 'Quels formats de numérotation sont possibles ?', answer: 'Vous pouvez choisir le style simple (1, 2, 3) ou le format détaillé (Page 1 sur 10).' }
        ]
      },
      de: {
        name: 'PDF Seitenzahlen hinzufügen',
        title: 'PDF Seitenzahlen hinzufügen - PDF online kostenlos nummerieren',
        metaTitle: 'PDF Seitenzahlen hinzufügen - PDF online kostenlos nummerieren',
        metaDescription: 'Seitenzahlen zu PDF-Dateien online kostenlos hinzufügen. Position, Format ("Seite X von Y") und Schriftgröße anpassen.',
        h1: 'PDF-Dateien online mit Seitenzahlen versehen',
        description: 'Fügen Sie Ihren PDF-Dokumenten saubere und anpassbare Seitenzahlen in Kopf- oder Fußzeilen hinzu.',
        shortDescription: 'Fügen Sie Ihren PDF-Dokumenten im Handumdrehen Seitenzahlen hinzu.',
        faqs: [
          { question: 'Kann die Position der Seitenzahl gewählt werden?', answer: 'Ja, unten oder oben zentriert, rechts- oder linksbündig.' }
        ]
      },
      pt: {
        name: 'Adicionar Números de Página ao PDF',
        title: 'Adicionar Números de Página ao PDF - Numerar PDF Online Grátis',
        metaTitle: 'Adicionar Números de Página ao PDF - Numerar PDF Online Grátis',
        metaDescription: 'Adicione números de página aos seus arquivos PDF online grátis. Escolha posição, formato e tamanho de fonte no navegador.',
        h1: 'Numerar Páginas de PDF Online Grátis',
        description: 'Insira numeração de páginas clara e configurável no rodapé ou cabeçalho dos seus documentos PDF.',
        shortDescription: 'Insira números de página personalizáveis nos seus arquivos PDF.',
        faqs: [
          { question: 'Quais posições estão disponíveis?', answer: 'Inferior central, inferior direito, inferior esquerdo, superior central, direito ou esquerdo.' }
        ]
      },
      it: {
        name: 'Aggiungi Numeri di Pagina al PDF',
        title: 'Aggiungi Numeri di Pagina al PDF - Numera Pagine PDF Online',
        metaTitle: 'Aggiungi Numeri di Pagina al PDF - Numera Pagine PDF Online',
        metaDescription: 'Aggiungi numeri di pagina ai file PDF online gratis. Personalizza posizione, formato ("Pagina X di Y") e dimensione font.',
        h1: 'Aggiungi Numeri di Pagina al PDF',
        description: 'Inserisci facilmente la numerazione delle pagine nei tuoi file PDF scegliendo posizione e stile desiderati.',
        shortDescription: 'Numera le pagine dei tuoi documenti PDF direttamente nel browser.',
        faqs: [
          { question: 'È possibile personalizzare il formato?', answer: 'Sì, puoi scegliere tra numeri semplici o il formato esteso "Pagina X di Y".' }
        ]
      },
      ja: {
        name: 'PDFページ番号追加 (Add Page Numbers)',
        title: 'PDFページ番号追加 - オンラインでPDFにページ番号を挿入',
        metaTitle: 'PDFページ番号追加 - オンラインでPDFにページ番号を挿入',
        metaDescription: 'PDFにページ番号をオンラインで無料追加。位置（ヘッダー/フッター）、形式（ページ X / Y）、フォントサイズを自由に設定。',
        h1: 'PDFページ番号挿入 (Add Page Numbers)',
        description: 'ブラウザ上で簡単にPDF文書のヘッダーやフッターにカスタマイズ可能なページ番号を追加します。',
        shortDescription: 'PDF文書に好みの位置と形式でページ番号を挿入します。',
        faqs: [
          { question: '番号の表示位置は選べますか？', answer: 'はい。ページの下部中央、右下、左下、上部中央など6つの位置から選択できます。' }
        ]
      },
      ko: {
        name: 'PDF 페이지 번호 매기기 (Page Numbers)',
        title: 'PDF 페이지 번호 매기기 - 온라인 무료 PDF 페이지 번호 추가',
        metaTitle: 'PDF 페이지 번호 매기기 - 온라인 무료 PDF 페이지 번호 추가',
        metaDescription: '온라인에서 무료로 PDF에 페이지 번호를 추가하세요. 머리글/바닥글 위치, 형식("페이지 X / Y"), 글꼴 크기를 자유롭게 설정합니다.',
        h1: '온라인 무료 PDF 페이지 번호 추가',
        description: 'PDF 문서의 상단 또는 하단에 원하는 형식과 위치로 페이지 번호를 깔끔하게 삽입합니다.',
        shortDescription: '브라우저에서 PDF 문서에 페이지 번호를 손쉽게 추가하세요.',
        faqs: [
          { question: '페이지 번호의 위치를 변경할 수 있나요?', answer: '네, 하단 중앙, 우측 하단, 좌측 하단, 상단 등 원하는 위치를 자유롭게 지정할 수 있습니다.' }
        ]
      }
    }
  },

  // 5. PDF to Word
  {
    slug: 'pdf-to-word',
    locales: {
      en: {
        name: 'PDF to Word Converter',
        title: 'PDF to Word Converter - Convert PDF to DOCX Online Free',
        metaTitle: 'PDF to Word Converter - Convert PDF to DOCX Online Free',
        metaDescription: 'Convert PDF to editable Word (DOCX) online for free. Extract text, paragraphs, and structure in your browser with 100% privacy and zero uploads.',
        h1: 'PDF to Word Converter Online Free',
        description: 'Convert PDF documents into fully editable Microsoft Word (.docx) files. Fast, private client-side extraction with no email or registration needed.',
        shortDescription: 'Convert PDF files to editable Word DOCX documents directly in your browser.',
        faqs: [
          { question: 'Is this PDF to Word conversion completely free?', answer: 'Yes. You can convert unlimited PDF documents to Word DOCX format for free without registration or watermarks.' },
          { question: 'Can I edit the converted Word document in Microsoft Word or Google Docs?', answer: 'Yes. The generated .docx file is 100% compliant with standard OpenXML specifications and opens seamlessly in Microsoft Word, LibreOffice, and Google Docs.' },
          { question: 'Are my confidential documents uploaded to any server?', answer: 'No. Document parsing and DOCX file generation occur entirely inside your browser using client-side JavaScript libraries.' }
        ]
      },
      hi: {
        name: 'PDF से Word कनवर्टर (PDF to Word)',
        title: 'PDF से Word कनवर्टर - मुफ़्त ऑनलाइन PDF to DOCX कनवर्टर',
        metaTitle: 'PDF से Word कनवर्टर - DOCX में बदलें',
        metaDescription: 'PDF को संपादन योग्य Word (DOCX) में ऑनलाइन मुफ़्त में बदलें। बिना सर्वर अपलोड के सीधे अपने ब्राउज़र में टेक्स्ट और पैराग्राफ निकालें।',
        h1: 'PDF से Word कनवर्टर ऑनलाइन (PDF to Word)',
        description: 'अपने PDF दस्तावेजों को संपादन योग्य Microsoft Word (.docx) फाइलों में आसानी से बदलें। 100% सुरक्षित और मुफ्त।',
        shortDescription: 'PDF फाइलों को संपादन योग्य Word DOCX में बदलें।',
        faqs: [
          { question: 'क्या कनवर्ट की गई फाइल Microsoft Word में एडिट हो सकती है?', answer: 'हाँ, परिणामी .docx फाइल Microsoft Word, Google Docs और LibreOffice में पूरी तरह एडिट करने योग्य होती है।' }
        ]
      },
      es: {
        name: 'Convertir PDF a Word (PDF to Word)',
        title: 'Convertir PDF a Word - Convertidor PDF a DOCX Online Gratis',
        metaTitle: 'Convertir PDF a Word - Convertidor PDF a DOCX Online Gratis',
        metaDescription: 'Convierte PDF a Word (DOCX) editable online gratis. Extrae texto y párrafos en tu navegador con total privacidad.',
        h1: 'Convertir PDF a Word Online Gratis',
        description: 'Convierte tus documentos PDF en archivos Microsoft Word (.docx) totalmente editables directamente en tu navegador.',
        shortDescription: 'Convierte archivos PDF en documentos Word DOCX editables.',
        faqs: [
          { question: '¿El documento generado es editable?', answer: 'Sí, obtendrás un archivo DOCX estándar compatible con Microsoft Word y Google Docs.' }
        ]
      },
      fr: {
        name: 'Convertir PDF en Word (PDF to Word)',
        title: 'Convertir PDF en Word - Convertisseur PDF vers DOCX Gratuit',
        metaTitle: 'Convertir PDF en Word - Convertisseur PDF vers DOCX Gratuit',
        metaDescription: 'Convertissez vos PDF en documents Word (DOCX) modifiables en ligne gratuitement. Extraction rapide et confidentielle dans votre navigateur.',
        h1: 'Convertir PDF en Word Gratuitement',
        description: 'Transformez vos fichiers PDF en documents Word (.docx) modifiables directement dans votre navigateur.',
        shortDescription: 'Convertissez vos fichiers PDF en documents Word DOCX modifiables.',
        faqs: [
          { question: 'Le fichier Word est-il modifiable ?', answer: 'Oui, vous pouvez ouvrir et modifier le fichier DOCX dans Microsoft Word ou Google Docs.' }
        ]
      },
      de: {
        name: 'PDF in Word umwandeln (PDF to Word)',
        title: 'PDF in Word umwandeln - PDF zu Word DOCX Konverter kostenlos',
        metaTitle: 'PDF in Word umwandeln - PDF zu Word DOCX Konverter kostenlos',
        metaDescription: 'PDF in bearbeitbares Word (DOCX) online kostenlos umwandeln. Text und Formatierung direkt im Browser extrahieren.',
        h1: 'PDF in Word online kostenlos umwandeln',
        description: 'Wandeln Sie PDF-Dateien direkt im Browser in bearbeitbare Microsoft Word (.docx) Dokumente um.',
        shortDescription: 'Wandeln Sie PDF-Dokumente in bearbeitbare Word-Dateien um.',
        faqs: [
          { question: 'Ist die DOCX-Datei bearbeitbar?', answer: 'Ja, das Dokument lässt sich in Word, LibreOffice und Google Docs bearbeiten.' }
        ]
      },
      pt: {
        name: 'Converter PDF para Word (PDF to Word)',
        title: 'Converter PDF para Word - Conversor PDF para DOCX Online Grátis',
        metaTitle: 'Converter PDF para Word - Conversor PDF para DOCX Online Grátis',
        metaDescription: 'Converta PDF para Word (DOCX) editável online grátis. Extraia texto e parágrafos diretamente no seu navegador com privacidade.',
        h1: 'Converter PDF para Word Online Grátis',
        description: 'Converta documentos PDF em arquivos Microsoft Word (.docx) totalmente editáveis diretamente no seu navegador.',
        shortDescription: 'Converta arquivos PDF em documentos Word editáveis.',
        faqs: [
          { question: 'O arquivo DOCX pode ser editado?', answer: 'Sim, o arquivo é compatível com Microsoft Word, Google Docs e LibreOffice.' }
        ]
      },
      it: {
        name: 'Converti PDF in Word (PDF to Word)',
        title: 'Converti PDF in Word - Convertitore PDF in DOCX Online Gratis',
        metaTitle: 'Converti PDF in Word - Convertitore PDF in DOCX Online Gratis',
        metaDescription: 'Converti PDF in Word (DOCX) modificabile online gratis. Estrai testo e struttura nel browser con privacy totale.',
        h1: 'Converti PDF in Word Online Gratis',
        description: 'Trasforma i tuoi documenti PDF in file Word (.docx) completamente modificabili direttamente nel browser.',
        shortDescription: 'Converti i file PDF in documenti Word DOCX modificabili.',
        faqs: [
          { question: 'Il file Word è modificabile?', answer: 'Sì, è un file DOCX standard modificabile con qualsiasi software di videoscrittura.' }
        ]
      },
      ja: {
        name: 'PDF Word 変換 (PDF to Word)',
        title: 'PDF Word 変換 - PDFを編集可能なWord (DOCX) に無料変換',
        metaTitle: 'PDF Word 変換 - PDFを編集可能なWord (DOCX) に無料変換',
        metaDescription: 'PDFを編集可能なWord（DOCX）ファイルにオンラインで無料変換。サーバー送信なしでブラウザ内で安全にテキストを抽出。',
        h1: 'PDF Word 変換 (PDF to Word Online)',
        description: 'PDFファイルを編集可能なMicrosoft Word (.docx) 形式にブラウザ上で素早く安全に変換します。',
        shortDescription: 'PDFファイルを編集可能なWord文書に素早く変換します。',
        faqs: [
          { question: '変換後のWordファイルは編集できますか？', answer: 'はい。Microsoft WordやGoogleドキュメントでそのまま編集可能です。' }
        ]
      },
      ko: {
        name: 'PDF Word 변환기 (PDF to Word)',
        title: 'PDF Word 변환기 - 온라인 무료 PDF to DOCX 변환기',
        metaTitle: 'PDF Word 변환기 - 온라인 무료 PDF to DOCX 변환기',
        metaDescription: '온라인에서 무료로 PDF를 편집 가능한 Word(DOCX)로 변환하세요. 서버 업로드 없이 브라우저에서 안전하게 텍스트를 추출합니다.',
        h1: '온라인 무료 PDF Word 변환',
        description: 'PDF 문서를 편집 가능한 Microsoft Word (.docx) 파일로 브라우저 내에서 직접 변환합니다.',
        shortDescription: 'PDF 문서를 편집 가능한 Word DOCX 파일로 변환하세요.',
        faqs: [
          { question: '변환된 Word 파일을 수정할 수 있나요?', answer: '네, MS Word 및 한글, Google Docs 등에서 즉시 편집할 수 있습니다.' }
        ]
      }
    }
  },

  // 6. Word to PDF
  {
    slug: 'word-to-pdf',
    locales: {
      en: {
        name: 'Word to PDF Converter',
        title: 'Word to PDF Converter - Convert DOCX to PDF Online Free',
        metaTitle: 'Word to PDF Converter - Convert DOCX to PDF Online Free',
        metaDescription: 'Convert Word DOCX documents to PDF online for free. Fast, private client-side conversion with customizable page layout and zero server uploads.',
        h1: 'Word to PDF Converter Online Free',
        description: 'Convert Microsoft Word (.docx) files into clean, print-ready PDF documents directly in your browser with standard margins and typography.',
        shortDescription: 'Convert Word DOCX files to clean PDF documents online.',
        faqs: [
          { question: 'How do I convert Word documents to PDF?', answer: 'Upload your .docx file, choose your preferred page format (A4 or US Letter) and margins, then click Convert to PDF.' },
          { question: 'Are my Word documents secure and confidential?', answer: 'Yes. The parsing and PDF rendering happen locally in your web browser. No document content is uploaded to external servers.' },
          { question: 'Does this tool preserve fonts and headings?', answer: 'Yes. Headings, paragraphs, bold/italic text styles, and bullet points are translated into clean PDF vector layouts.' }
        ]
      },
      hi: {
        name: 'Word से PDF कनवर्टर (Word to PDF)',
        title: 'Word से PDF कनवर्टर - मुफ़्त ऑनलाइन DOCX to PDF कनवर्टर',
        metaTitle: 'Word से PDF कनवर्टर - DOCX से PDF बनाएं',
        metaDescription: 'Word DOCX दस्तावेजों को ऑनलाइन मुफ़्त में PDF में बदलें। ब्राउज़र में 100% सुरक्षित और तेज़ रूपांतरण।',
        h1: 'Word से PDF कनवर्टर ऑनलाइन (Word to PDF)',
        description: 'Microsoft Word (.docx) फाइलों को प्रिंट-रेडी PDF दस्तावेजों में आसानी से बदलें।',
        shortDescription: 'Word DOCX फाइलों को साफ-सुथरे PDF दस्तावेजों में बदलें।',
        faqs: [
          { question: 'Word फाइल को PDF में कैसे बदलें?', answer: 'अपनी .docx फाइल चुनें, पेज साइज चुनें और कनवर्ट बटन दबाकर PDF डाउनलोड करें।' }
        ]
      },
      es: {
        name: 'Convertir Word a PDF (Word to PDF)',
        title: 'Convertir Word a PDF - Convertidor DOCX a PDF Online Gratis',
        metaTitle: 'Convertir Word a PDF - Convertidor DOCX a PDF Online Gratis',
        metaDescription: 'Convierte documentos Word DOCX a PDF online gratis. Conversión rápida y privada en tu navegador sin subir archivos.',
        h1: 'Convertir Word a PDF Online Gratis',
        description: 'Convierte archivos Microsoft Word (.docx) a formato PDF de alta calidad directamente en tu navegador.',
        shortDescription: 'Convierte archivos Word DOCX a documentos PDF fácilmente.',
        faqs: [
          { question: '¿Qué formatos de Word son compatibles?', answer: 'Admite archivos modernos en formato .docx creados con Microsoft Word o LibreOffice.' }
        ]
      },
      fr: {
        name: 'Convertir Word en PDF (Word to PDF)',
        title: 'Convertir Word en PDF - Convertisseur DOCX vers PDF Gratuit',
        metaTitle: 'Convertir Word en PDF - Convertisseur DOCX vers PDF Gratuit',
        metaDescription: 'Convertissez vos fichiers Word DOCX en PDF en ligne gratuitement. Mise en page propre et 100% privée dans votre navigateur.',
        h1: 'Convertir Word en PDF Gratuitement',
        description: 'Transformez vos fichiers Word (.docx) en documents PDF prêts pour l’impression directement dans votre navigateur.',
        shortDescription: 'Convertissez vos documents Word DOCX en PDF de qualité.',
        faqs: [
          { question: 'Mes documents sont-ils protégés ?', answer: 'Oui, la conversion est entièrement réalisée sur votre ordinateur.' }
        ]
      },
      de: {
        name: 'Word in PDF umwandeln (Word to PDF)',
        title: 'Word in PDF umwandeln - Word DOCX zu PDF Konverter kostenlos',
        metaTitle: 'Word in PDF umwandeln - Word DOCX zu PDF Konverter kostenlos',
        metaDescription: 'Word DOCX Dokumente online kostenlos in PDF umwandeln. Schnelle, private Konvertierung direkt im Browser.',
        h1: 'Word in PDF online kostenlos umwandeln',
        description: 'Konvertieren Sie Word (.docx) Dokumente direkt im Browser in saubere, druckfertige PDF-Dateien.',
        shortDescription: 'Wandeln Sie Word DOCX-Dateien in druckfertige PDF-Dokumente um.',
        faqs: [
          { question: 'Bleibt die Formatierung erhalten?', answer: 'Ja, Absätze, Überschriften und Textstile werden sauber in das PDF übertragen.' }
        ]
      },
      pt: {
        name: 'Converter Word para PDF (Word to PDF)',
        title: 'Converter Word para PDF - Conversor DOCX para PDF Online Grátis',
        metaTitle: 'Converter Word para PDF - Conversor DOCX para PDF Online Grátis',
        metaDescription: 'Converta arquivos Word DOCX para PDF online grátis. Conversão rápida e privada no navegador sem envio a servidores.',
        h1: 'Converter Word para PDF Online Grátis',
        description: 'Transforme seus arquivos Word (.docx) em documentos PDF prontos para impressão diretamente no navegador.',
        shortDescription: 'Converta documentos Word DOCX em arquivos PDF facilmente.',
        faqs: [
          { question: 'Como converter Word para PDF?', answer: 'Envie o arquivo .docx, configure as margens e baixe seu novo PDF instantaneamente.' }
        ]
      },
      it: {
        name: 'Converti Word in PDF (Word to PDF)',
        title: 'Converti Word in PDF - Convertitore DOCX in PDF Online Gratis',
        metaTitle: 'Converti Word in PDF - Convertitore DOCX in PDF Online Gratis',
        metaDescription: 'Converti documenti Word DOCX in PDF online gratis. Conversione veloce e privata direttamente nel browser.',
        h1: 'Converti Word in PDF Online Gratis',
        description: 'Converti file Microsoft Word (.docx) in documenti PDF professionali direttamente nel tuo browser.',
        shortDescription: 'Converti file Word DOCX in PDF di alta qualità.',
        faqs: [
          { question: 'I file rimangono privati?', answer: 'Sì, la conversione avviene localmente senza memorizzare file su server.' }
        ]
      },
      ja: {
        name: 'Word PDF 変換 (Word to PDF)',
        title: 'Word PDF 変換 - Word (DOCX) をPDFに無料変換',
        metaTitle: 'Word PDF 変換 - Word (DOCX) をPDFに無料変換',
        metaDescription: 'Word（DOCX）文書をオンラインで無料PDF変換。レイアウトを崩さずブラウザ内で100%安全に処理します。',
        h1: 'Word PDF 変換 (Word to PDF Online)',
        description: 'Microsoft Word (.docx) ファイルを印刷用PDF文書にブラウザ上で安全に変換します。',
        shortDescription: 'WordファイルをきれいなPDF文書に素早く変換します。',
        faqs: [
          { question: 'A4やレターサイズを選べますか？', answer: 'はい、用紙サイズ（A4、Letter）や余白設定を自由に選択できます。' }
        ]
      },
      ko: {
        name: 'Word PDF 변환기 (Word to PDF)',
        title: 'Word PDF 변환기 - 온라인 무료 DOCX to PDF 문서 변환기',
        metaTitle: 'Word PDF 변환기 - 온라인 무료 DOCX to PDF 문서 변환기',
        metaDescription: '온라인에서 무료로 Word(DOCX) 문서를 PDF로 변환하세요. 서버 업로드 없이 브라우저에서 안전하게 깔끔한 PDF를 생성합니다.',
        h1: '온라인 무료 Word PDF 변환',
        description: 'Microsoft Word (.docx) 파일을 인쇄 품질의 깔끔한 PDF 문서로 브라우저 내에서 직접 변환합니다.',
        shortDescription: 'Word DOCX 문서를 고품질 PDF로 안전하게 변환하세요.',
        faqs: [
          { question: 'A4 용지 규격을 지원하나요?', answer: '네, 표준 A4 및 Letter 용지 크기와 여백 옵션을 자유롭게 지정할 수 있습니다.' }
        ]
      }
    }
  },

  // 7. Delete Pages from PDF
  {
    slug: 'delete-pages-from-pdf',
    locales: {
      en: {
        name: 'Delete Pages from PDF',
        title: 'Delete Pages from PDF - Remove PDF Pages Online Free',
        metaTitle: 'Delete Pages from PDF - Remove PDF Pages Online Free',
        metaDescription: 'Delete pages from PDF online for free. Remove unwanted, blank, or sensitive pages with interactive visual thumbnail selector in your browser.',
        h1: 'Delete Pages from PDF Online Free',
        description: 'Remove unwanted pages from PDF files with visual page thumbnails or comma-separated ranges. Download a clean, trimmed PDF instantly.',
        shortDescription: 'Remove unwanted pages from PDF files with visual thumbnails.',
        faqs: [
          { question: 'How do I select pages to delete?', answer: 'Click on any page thumbnail to mark it for deletion (it will show a red trash badge), or type page ranges like "2, 4-6" in the input box.' },
          { question: 'Does deleting pages affect the remaining content?', answer: 'No. The remaining pages retain 100% of their original fonts, vector sharpness, and high-resolution images.' },
          { question: 'Can I delete multiple pages at once?', answer: 'Yes. You can delete as many pages as needed as long as at least one page remains in the final document.' }
        ]
      },
      hi: {
        name: 'PDF से पेज हटाएं (Delete Pages)',
        title: 'PDF से पेज हटाएं - मुफ़्त ऑनलाइन PDF पेज रिमूवर',
        metaTitle: 'PDF से पेज हटाएं - अनचाहे पेज निकालें',
        metaDescription: 'ऑनलाइन मुफ़्त में PDF से अवांछित पेज हटाएं। विज़ुअल थंबनेल या पेज रेंज द्वारा खाली या अनावश्यक पेज हटाएं।',
        h1: 'PDF से पेज हटाएं (Delete Pages from PDF)',
        description: 'अपने PDF से अनचाहे, खाली या गोपनीय पेज आसानी से हटाएं और नया साफ PDF डाउनलोड करें।',
        shortDescription: 'अपने PDF से अनावश्यक पेजों को आसानी से हटाएं।',
        faqs: [
          { question: 'पेज हटाने के लिए कैसे चुनें?', answer: 'आप थंबनेल पर क्लिक करके या टेक्स्ट बॉक्स में "1, 3-5" लिखकर हटाने वाले पेज चुन सकते हैं।' }
        ]
      },
      es: {
        name: 'Eliminar Páginas de PDF (Delete Pages)',
        title: 'Eliminar Páginas de PDF - Quitar Páginas de PDF Online Gratis',
        metaTitle: 'Eliminar Páginas de PDF - Quitar Páginas de PDF Online Gratis',
        metaDescription: 'Elimina páginas no deseadas de archivos PDF online gratis. Selector visual de miniaturas en tu navegador con total privacidad.',
        h1: 'Eliminar Páginas de PDF Online Gratis',
        description: 'Quita páginas en blanco o innecesarias de tus archivos PDF mediante miniaturas visuales interactivas.',
        shortDescription: 'Elimina páginas innecesarias de tus documentos PDF.',
        faqs: [
          { question: '¿Cómo seleccionar las páginas a borrar?', answer: 'Haz clic sobre las miniaturas que deseas eliminar o escribe los números de página.' }
        ]
      },
      fr: {
        name: 'Supprimer des Pages PDF (Delete Pages)',
        title: 'Supprimer des Pages PDF - Retirer des Pages de PDF en Ligne',
        metaTitle: 'Supprimer des Pages PDF - Retirer des Pages de PDF en Ligne',
        metaDescription: 'Supprimez des pages de vos fichiers PDF en ligne gratuitement. Sélectionnez visuellement les pages à retirer sans téléversement.',
        h1: 'Supprimer des Pages de PDF en Ligne',
        description: 'Retirez facilement les pages inutiles ou vierges de vos documents PDF avec prévisualisation des vignettes.',
        shortDescription: 'Supprimez les pages indésirables de vos fichiers PDF.',
        faqs: [
          { question: 'Comment choisir les pages à supprimer ?', answer: 'Cliquez simplement sur les vignettes des pages à supprimer.' }
        ]
      },
      de: {
        name: 'PDF-Seiten löschen (Delete Pages)',
        title: 'PDF-Seiten löschen - PDF-Seiten online kostenlos entfernen',
        metaTitle: 'PDF-Seiten löschen - PDF-Seiten online kostenlos entfernen',
        metaDescription: 'Unerwünschte Seiten aus PDF-Dateien online kostenlos löschen. Visuelle Miniaturansichten im Browser ohne Server-Upload.',
        h1: 'PDF-Seiten online kostenlos löschen',
        description: 'Entfernen Sie leere oder überflüssige Seiten aus Ihren PDF-Dokumenten mit visueller Seitenauswahl.',
        shortDescription: 'Löschen Sie überflüssige Seiten aus Ihren PDF-Dokumenten.',
        faqs: [
          { question: 'Kann ich mehrere Seiten gleichzeitig löschen?', answer: 'Ja, wählen Sie einfach alle zu entfernenden Seiten über die Vorschau aus.' }
        ]
      },
      pt: {
        name: 'Excluir Páginas do PDF (Delete Pages)',
        title: 'Excluir Páginas do PDF - Remover Páginas de PDF Online Grátis',
        metaTitle: 'Excluir Páginas do PDF - Remover Páginas de PDF Online Grátis',
        metaDescription: 'Exclua páginas indesejadas de arquivos PDF online grátis. Seleção visual por miniaturas diretamente no seu navegador.',
        h1: 'Excluir Páginas de PDF Online Grátis',
        description: 'Remova páginas em branco ou desnecessárias dos seus arquivos PDF com seleção visual rápida e prática.',
        shortDescription: 'Remova páginas indesejadas dos seus documentos PDF.',
        faqs: [
          { question: 'Como marcar as páginas para exclusão?', answer: 'Basta clicar nas miniaturas das páginas que deseja remover.' }
        ]
      },
      it: {
        name: 'Elimina Pagine da PDF (Delete Pages)',
        title: 'Elimina Pagine da PDF - Rimuovi Pagine PDF Online Gratis',
        metaTitle: 'Elimina Pagine da PDF - Rimuovi Pagine PDF Online Gratis',
        metaDescription: 'Elimina pagine indesiderate da file PDF online gratis. Selezione visuale tramite anteprime nel tuo browser.',
        h1: 'Elimina Pagine da PDF Online Gratis',
        description: 'Rimuovi facilmente pagine bianche o non necessarie dai tuoi documenti PDF con anteprime interattive.',
        shortDescription: 'Elimina pagine superflue dai tuoi documenti PDF.',
        faqs: [
          { question: 'Come selezionare le pagine da cancellare?', answer: 'Clicca sull’anteprima delle pagine da eliminare o inserisci i numeri di pagina.' }
        ]
      },
      ja: {
        name: 'PDFページ削除 (Delete Pages)',
        title: 'PDFページ削除 - オンラインで不要なPDFページを削除',
        metaTitle: 'PDFページ削除 - オンラインで不要なPDFページを削除',
        metaDescription: 'PDFから不要なページをオンラインで無料削除。サムネイルを見ながらクリックで簡単削除。100%安全。',
        h1: 'PDFページ削除 (Delete Pages from PDF)',
        description: '不要なページや白紙ページをサムネイルで確認しながら選択・削除し、必要なページだけのPDFを作成します。',
        shortDescription: 'サムネイルを見ながら不要なPDFページを簡単に削除します。',
        faqs: [
          { question: '複数のページを一度に削除できますか？', answer: 'はい、不要なページのサムネイルを複数クリックして一度に削除できます。' }
        ]
      },
      ko: {
        name: 'PDF 페이지 삭제 (Delete Pages)',
        title: 'PDF 페이지 삭제 - 온라인 무료 PDF 페이지 제거 및 추출',
        metaTitle: 'PDF 페이지 삭제 - 온라인 무료 PDF 페이지 제거 및 추출',
        metaDescription: '온라인에서 무료로 PDF의 불필요한 페이지를 삭제하세요. 썸네일 미리보기를 보며 손쉽게 페이지를 제거합니다.',
        h1: '온라인 무료 PDF 페이지 삭제',
        description: 'PDF 문서에서 빈 페이지나 필요 없는 페이지를 썸네일로 확인하며 안전하게 제거하고 저장합니다.',
        shortDescription: '불필요한 PDF 페이지를 미리보기를 보며 쉽게 제거하세요.',
        faqs: [
          { question: '여러 페이지를 동시에 삭제할 수 있나요?', answer: '네, 삭제할 페이지 썸네일을 클릭하여 한 번에 원하는 만큼 삭제할 수 있습니다.' }
        ]
      }
    }
  },

  // 8. Reorder PDF Pages
  {
    slug: 'reorder-pdf-pages',
    locales: {
      en: {
        name: 'Reorder PDF Pages',
        title: 'Reorder PDF Pages - Rearrange & Organize PDF Page Order Online',
        metaTitle: 'Reorder PDF Pages - Rearrange & Organize PDF Page Order Online',
        metaDescription: 'Reorder PDF pages online for free. Drag and drop or move pages with arrow buttons to rearrange page sequence with 100% client-side privacy.',
        h1: 'Reorder PDF Pages Online Free',
        description: 'Rearrange and organize the page sequence in your PDF document. Move pages up or down, reverse order, and save your rearranged PDF instantly.',
        shortDescription: 'Rearrange and reorder pages in your PDF documents easily.',
        faqs: [
          { question: 'How do I rearrange the order of PDF pages?', answer: 'Use the left/right arrow buttons on each page thumbnail or drag pages into your desired sequence, then click Save Reordered PDF.' },
          { question: 'Can I reverse the entire document order with one click?', answer: 'Yes! Click the "Reverse All Pages" button to invert the entire document from last page to first page.' },
          { question: 'Is page quality preserved during reordering?', answer: 'Yes. Pages are cloned at the binary PDF object level without rasterization, preserving crisp vector typography and high-res images.' }
        ]
      },
      hi: {
        name: 'PDF पेज पुनर्व्यवस्थित करें (Reorder PDF)',
        title: 'PDF पेज पुनर्व्यवस्थित करें - मुफ़्त ऑनलाइन PDF पेज रीऑर्डर टूल',
        metaTitle: 'PDF पेज पुनर्व्यवस्थित करें - क्रम बदलें',
        metaDescription: 'ऑनलाइन मुफ़्त में PDF पेजों का क्रम बदलें। एरो बटन द्वारा पेजों को आगे-पीछे करें या पूरा क्रम उलटें। 100% सुरक्षित।',
        h1: 'PDF पेजों का क्रम बदलें (Reorder PDF Pages)',
        description: 'अपने PDF के पेजों को मनचाहे क्रम में व्यवस्थित करें। पेजों को आगे या पीछे ले जाएं और नया PDF डाउनलोड करें।',
        shortDescription: 'अपने PDF के पेजों को मनचाहे क्रम में व्यवस्थित करें।',
        faqs: [
          { question: 'पेजों का क्रम कैसे बदलें?', answer: 'प्रत्येक पेज के नीचे दिए गए बाएँ/दाएँ तीरों का उपयोग करके पेजों को आगे-पीछे करें।' }
        ]
      },
      es: {
        name: 'Reordenar Páginas PDF (Reorder Pages)',
        title: 'Reordenar Páginas PDF - Cambiar el Orden de Páginas en PDF',
        metaTitle: 'Reordenar Páginas PDF - Cambiar el Orden de Páginas en PDF',
        metaDescription: 'Reordena páginas de PDF online gratis. Mueve y organiza el orden de las páginas en tu navegador con total privacidad.',
        h1: 'Reordenar Páginas de PDF Online Gratis',
        description: 'Cambia y reorganiza el orden de las páginas de tu archivo PDF fácilmente con controles interactivos.',
        shortDescription: 'Organiza y reordena el orden de las páginas de tus PDF.',
        faqs: [
          { question: '¿Puedo invertir el orden de todas las páginas?', answer: 'Sí, dispones de un botón para invertir el orden completo del documento con un clic.' }
        ]
      },
      fr: {
        name: 'Réorganiser les Pages PDF (Reorder Pages)',
        title: 'Réorganiser les Pages PDF - Changer l\'Ordre des Pages PDF',
        metaTitle: 'Réorganiser les Pages PDF - Changer l\'Ordre des Pages PDF',
        metaDescription: 'Réorganisez l\'ordre des pages de vos PDF en ligne gratuitement. Déplacez et organisez vos pages facilement dans votre navigateur.',
        h1: 'Réorganiser les Pages de PDF en Ligne',
        description: 'Changez la séquence des pages de votre document PDF en quelques clics sans envoyer de données vers un serveur.',
        shortDescription: 'Modifiez l’ordre des pages de votre fichier PDF en toute simplicité.',
        faqs: [
          { question: 'Comment modifier la position d\'une page ?', answer: 'Utilisez les flèches directionnelles sous chaque vignette pour déplacer les pages.' }
        ]
      },
      de: {
        name: 'PDF-Seiten sortieren (Reorder Pages)',
        title: 'PDF-Seiten sortieren - PDF-Seitenreihenfolge online ändern',
        metaTitle: 'PDF-Seiten sortieren - PDF-Seitenreihenfolge online ändern',
        metaDescription: 'PDF-Seitenreihenfolge online kostenlos ändern. Sortieren und verschieben Sie Seiten direkt im Browser mit maximalem Datenschutz.',
        h1: 'PDF-Seitenreihenfolge online sortieren',
        description: 'Bringen Sie Ihre PDF-Seiten in die gewünschte Reihenfolge mit einfachen Vor- und Zurück-Schaltflächen.',
        shortDescription: 'Ändern und sortieren Sie die Reihenfolge der Seiten in Ihren PDFs.',
        faqs: [
          { question: 'Kann die Reihenfolge komplett umgekehrt werden?', answer: 'Ja, mit der Schaltfläche "Alle Seiten umkehren" wird das Dokument von hinten nach vorne sortiert.' }
        ]
      },
      pt: {
        name: 'Reordenar Páginas do PDF (Reorder Pages)',
        title: 'Reordenar Páginas do PDF - Organizar Ordem das Páginas do PDF',
        metaTitle: 'Reordenar Páginas do PDF - Organizar Ordem das Páginas do PDF',
        metaDescription: 'Reordene páginas de arquivos PDF online grátis. Altere a sequência de páginas diretamente no navegador com privacidade total.',
        h1: 'Reordenar Páginas de PDF Online Grátis',
        description: 'Organize e mude a ordem das páginas do seu documento PDF de forma rápida e intuitiva.',
        shortDescription: 'Altere a ordem das páginas do seu documento PDF.',
        faqs: [
          { question: 'Como mover as páginas?', answer: 'Use os botões de setas em cada miniatura para deslocar as páginas para a posição desejada.' }
        ]
      },
      it: {
        name: 'Riordina Pagine PDF (Reorder Pages)',
        title: 'Riordina Pagine PDF - Cambia Ordine Pagine PDF Online',
        metaTitle: 'Riordina Pagine PDF - Cambia Ordine Pagine PDF Online',
        metaDescription: 'Riordina pagine PDF online gratis. Modifica e organizza la sequenza delle pagine nel tuo browser con privacy totale.',
        h1: 'Riordina Pagine PDF Online Gratis',
        description: 'Cambia facilmente l’ordine delle pagine del tuo documento PDF con semplici controlli direzionali.',
        shortDescription: 'Riorganizza la sequenza delle pagine nei tuoi file PDF.',
        faqs: [
          { question: 'Posso invertire l’ordine di tutte le pagine?', answer: 'Sì, puoi invertire l’intera sequenza del documento con un solo clic.' }
        ]
      },
      ja: {
        name: 'PDFページ並び替え (Reorder Pages)',
        title: 'PDFページ並び替え - PDFのページ順序を整理・変更',
        metaTitle: 'PDFページ並び替え - PDFのページ順序を整理・変更',
        metaDescription: 'PDFのページ順序をオンラインで無料並び替え。サムネイルを見ながら矢印ボタンで簡単にページ順を入れ替え。',
        h1: 'PDFページ順序変更 (Reorder PDF Pages)',
        description: 'サムネイルで確認しながらPDFのページ順序を自由に移動・並び替えし、新しいPDFとして保存します。',
        shortDescription: 'PDFのページ順序を直感的に並び替えて整理します。',
        faqs: [
          { question: '全ページを逆順にできますか？', answer: 'はい、「全ページを逆順にする」ボタンでワンクリックで逆順にソートできます。' }
        ]
      },
      ko: {
        name: 'PDF 페이지 순서 변경 (Reorder Pages)',
        title: 'PDF 페이지 순서 변경 - 온라인 무료 PDF 페이지 재배치',
        metaTitle: 'PDF 페이지 순서 변경 - 온라인 무료 PDF 페이지 재배치',
        metaDescription: '온라인에서 무료로 PDF 페이지 순서를 변경하세요. 썸네일을 보며 원하는 순서로 페이지를 자유롭게 재배치합니다.',
        h1: '온라인 무료 PDF 페이지 순서 변경',
        description: 'PDF 문서 내 페이지들의 순서를 변경하거나 역순으로 재배치하여 원하는 순서의 PDF로 저장합니다.',
        shortDescription: '브라우저에서 직접 PDF 페이지 순서를 자유롭게 재배치하세요.',
        faqs: [
          { question: '문서 전체를 한 번에 역순으로 바꿀 수 있나요?', answer: '네, "전체 페이지 역순 정렬" 버튼을 클릭하면 마지막 페이지부터 첫 페이지 순으로 즉시 뒤집힙니다.' }
        ]
      }
    }
  },

  // 9. PDF to Grayscale
  {
    slug: 'pdf-to-grayscale',
    locales: {
      en: {
        name: 'PDF to Grayscale',
        title: 'PDF to Grayscale - Convert PDF to Black and White Online Free',
        metaTitle: 'PDF to Grayscale - Convert PDF to Black and White Online Free',
        metaDescription: 'Convert color PDF to black and white or grayscale online for free. Reduce printer ink usage and file size with adjustable DPI output.',
        h1: 'PDF to Grayscale Converter Online Free',
        description: 'Convert colorful PDF documents to crisp black and white (monochrome) or grayscale. Perfect for saving printer ink and optimizing file size.',
        shortDescription: 'Convert color PDF documents to black and white or grayscale.',
        faqs: [
          { question: 'Why convert color PDFs to grayscale or black and white?', answer: 'Converting to grayscale significantly reduces printer ink/toner consumption, creates professional monochrome legal copies, and reduces file size.' },
          { question: 'What DPI settings are recommended?', answer: 'We recommend 150 DPI for standard reading and web sharing, 300 DPI for sharp physical printing, and 72 DPI for ultra-compact email attachments.' },
          { question: 'Are my converted documents stored anywhere?', answer: 'No. The rasterization and grayscale pixel math happen locally in your web browser with 100% data privacy.' }
        ]
      },
      hi: {
        name: 'PDF को ग्रेस्केल बनाएं (PDF to Grayscale)',
        title: 'PDF को ग्रेस्केल बनाएं - मुफ़्त ऑनलाइन ब्लैक एंड व्हाइट PDF कनवर्टर',
        metaTitle: 'PDF को ग्रेस्केल बनाएं - ब्लैक एंड व्हाइट PDF कनवर्टर',
        metaDescription: 'रंगीन PDF को ऑनलाइन मुफ़्त में ब्लैक एंड व्हाइट (ग्रेस्केल) में बदलें। प्रिंटर स्याही बचाएं और फ़ाइल का आकार घटाएं।',
        h1: 'PDF को ब्लैक एंड व्हाइट में बदलें (PDF to Grayscale)',
        description: 'रंगीन PDF को स्पष्ट ब्लैक एंड व्हाइट या ग्रेस्केल में बदलें। प्रिंटर की स्याही बचाने और फ़ाइल साइज कम करने के लिए सर्वोत्तम।',
        shortDescription: 'रंगीन PDF दस्तावेजों को ब्लैक एंड व्हाइट या ग्रेस्केल में बदलें।',
        faqs: [
          { question: 'PDF को ग्रेस्केल में बदलने के क्या फायदे हैं?', answer: 'यह प्रिंटर इंक बचाता है और आधिकारिक या कानूनी दस्तावेजों के लिए मोनोक्रोम कॉपी तैयार करता है।' }
        ]
      },
      es: {
        name: 'PDF a Escala de Grises (PDF to Grayscale)',
        title: 'PDF a Escala de Grises - Convertir PDF a Blanco y Negro Online',
        metaTitle: 'PDF a Escala de Grises - Convertir PDF a Blanco y Negro Online',
        metaDescription: 'Convierte PDF a color en blanco y negro o escala de grises online gratis. Ahorra tinta de impresora y optimiza el tamaño de archivo.',
        h1: 'Convertir PDF a Escala de Grises Online',
        description: 'Convierte documentos PDF a color en versiones monocromáticas en blanco y negro para ahorrar tóner y facilitar la impresión.',
        shortDescription: 'Convierte documentos PDF a blanco y negro o escala de grises.',
        faqs: [
          { question: '¿Qué calidad DPI se recomienda?', answer: '150 DPI es ideal para lectura digital y 300 DPI para impresiones de alta calidad.' }
        ]
      },
      fr: {
        name: 'PDF en Niveaux de Gris (PDF to Grayscale)',
        title: 'PDF en Niveaux de Gris - Convertir PDF en Noir et Blanc Gratuit',
        metaTitle: 'PDF en Niveaux de Gris - Convertir PDF en Noir et Blanc Gratuit',
        metaDescription: 'Convertissez vos PDF couleur en noir et blanc ou niveaux de gris en ligne gratuitement. Économisez l’encre d’impression en toute sécurité.',
        h1: 'Convertir PDF en Niveaux de Gris',
        description: 'Transformez vos fichiers PDF couleur en documents monochromes en noir et blanc directement dans votre navigateur.',
        shortDescription: 'Convertissez vos PDF en noir et blanc ou niveaux de gris.',
        faqs: [
          { question: 'Pourquoi convertir en niveaux de gris ?', answer: 'Cela permet de réduire la consommation d’encre lors de l’impression et de créer des documents épurés.' }
        ]
      },
      de: {
        name: 'PDF in Graustufen umwandeln',
        title: 'PDF in Graustufen umwandeln - PDF in Schwarz-Weiß konvertieren',
        metaTitle: 'PDF in Graustufen umwandeln - PDF in Schwarz-Weiß konvertieren',
        metaDescription: 'Farbige PDFs online kostenlos in Schwarz-Weiß oder Graustufen umwandeln. Sparen Sie Druckertinte und Dateigröße.',
        h1: 'PDF online in Graustufen umwandeln',
        description: 'Konvertieren Sie farbige PDF-Dokumente direkt im Browser in gestochen scharfe Schwarz-Weiß- oder Graustufen-Dateien.',
        shortDescription: 'Wandeln Sie farbige PDF-Dateien in Graustufen oder Schwarz-Weiß um.',
        faqs: [
          { question: 'Spart das Umwandeln in Graustufen Druckertinte?', answer: 'Ja, Ihr Drucker verwendet dadurch ausschließlich schwarze Tinte anstelle teurer Farbpatronen.' }
        ]
      },
      pt: {
        name: 'PDF em Escala de Cinza (PDF to Grayscale)',
        title: 'PDF em Escala de Cinza - Converter PDF para Preto e Branco',
        metaTitle: 'PDF em Escala de Cinza - Converter PDF para Preto e Branco',
        metaDescription: 'Converta PDF colorido para preto e branco ou escala de cinza online grátis. Economize tinta de impressora com privacidade total.',
        h1: 'Converter PDF para Escala de Cinza Online',
        description: 'Transforme seus documentos PDF coloridos em versões nítidas em preto e branco ou escala de cinza diretamente no navegador.',
        shortDescription: 'Converta documentos PDF para preto e branco ou escala de cinza.',
        faqs: [
          { question: 'Quais resoluções DPI estão disponíveis?', answer: 'Opções de 72 DPI (web), 150 DPI (padrão) e 300 DPI (alta qualidade de impressão).' }
        ]
      },
      it: {
        name: 'PDF in Scala di Grigi (PDF to Grayscale)',
        title: 'PDF in Scala di Grigi - Converti PDF in Bianco e Nero Online',
        metaTitle: 'PDF in Scala di Grigi - Converti PDF in Bianco e Nero Online',
        metaDescription: 'Converti PDF a colori in bianco e nero o scala di grigi online gratis. Risparmia inchiostro di stampa direttamente nel browser.',
        h1: 'Converti PDF in Scala di Grigi Online',
        description: 'Trasforma documenti PDF a colori in versioni monocromatiche in bianco e nero per ridurre il consumo di toner e inchiostro.',
        shortDescription: 'Converti file PDF a colori in bianco e nero o scala di grigi.',
        faqs: [
          { question: 'Perché convertire in scala di grigi?', answer: 'Riduce il consumo di inchiostro a colori e ottimizza i documenti per la stampa d\'ufficio.' }
        ]
      },
      ja: {
        name: 'PDFグレースケール変換 (PDF to Grayscale)',
        title: 'PDFグレースケール変換 - PDFを白黒・モノクロに変換',
        metaTitle: 'PDFグレースケール変換 - PDFを白黒・モノクロに変換',
        metaDescription: 'カラーPDFをオンラインで無料白黒・グレースケール変換。印刷インクの節約とファイル軽量化に最適。100%安全。',
        h1: 'PDFグレースケール変換 (PDF to Grayscale)',
        description: 'カラーのPDF文書をブラウザ上で美しい白黒・グレースケールに変換し、プリンターのインク節約と軽量化を実現します。',
        shortDescription: 'カラーPDFを白黒・グレースケールに変換してインクを節約します。',
        faqs: [
          { question: '印刷用にはどのDPIが適していますか？', answer: '高品質な印刷には300 DPI、一般的な閲覧やメール送信用には150 DPIが最適です。' }
        ]
      },
      ko: {
        name: 'PDF 흑백 변환기 (PDF to Grayscale)',
        title: 'PDF 흑백 변환기 - 온라인 무료 컬러 PDF 흑백/그레이스케일 변환',
        metaTitle: 'PDF 흑백 변환기 - 온라인 무료 컬러 PDF 흑백/그레이스케일 변환',
        metaDescription: '온라인에서 무료로 컬러 PDF를 흑백 또는 그레이스케일로 변환하세요. 프린터 잉크 절약 및 파일 용량 최적화.',
        h1: '온라인 무료 PDF 흑백 변환',
        description: '컬러 PDF 문서를 선명한 흑백(모노크롬) 또는 그레이스케일로 변환하여 프린터 잉크를 절약하고 문서 용량을 줄입니다.',
        shortDescription: '컬러 PDF 문서를 흑백 또는 그레이스케일로 안전하게 변환하세요.',
        faqs: [
          { question: '인쇄 시 잉크가 절약되나요?', answer: '네, 컬러 잉크 대신 검은색 잉크/토너만 사용되므로 인쇄 비용이 크게 절감됩니다.' }
        ]
      }
    }
  }
];

const LOCALES = ['en', 'hi', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko'];

let generatedCount = 0;

for (const tool of TOOLS_DEFINITIONS) {
  const resultObj = {};

  for (const lang of LOCALES) {
    const loc = tool.locales[lang] || tool.locales['en'];
    const ui = UI_STRINGS[lang] || UI_STRINGS['en'];
    const catLabel = CATEGORY_LABELS[lang] || CATEGORY_LABELS['en'];

    resultObj[lang] = {
      locale: lang,
      status: 'translated',
      name: loc.name,
      title: loc.title || `${loc.name} | ${loc.name}`,
      metaTitle: loc.metaTitle || `${loc.name} - Free Online Tools`,
      metaDescription: loc.metaDescription || loc.description,
      h1: loc.h1 || loc.name,
      description: loc.description,
      shortDescription: loc.shortDescription || loc.description,
      intro: loc.shortDescription || loc.description,
      categoryLabel: catLabel,
      formulaTitle: `${loc.name} Overview`,
      formulaDescription: loc.description,
      formulaEquation: '',
      variables: [],
      stepByStep: [],
      workedExample: {
        title: '',
        scenario: '',
        calculation: '',
        result: ''
      },
      faqs: loc.faqs || [],
      ui: ui,
      contentHtml: generateContentHtml(loc.h1 || loc.name, loc.description)
    };
  }

  const outPath = path.join(dataDir, `${tool.slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(resultObj, null, 2), 'utf8');
  console.log(`Generated: ${tool.slug}.json`);
  generatedCount++;
}

console.log(`Successfully generated ${generatedCount} PDF tool translation files!`);
