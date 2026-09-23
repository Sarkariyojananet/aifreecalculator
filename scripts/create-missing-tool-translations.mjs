import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

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

// ----------------------------------------------------------------------------
// 1. PDF SPLIT DATA
// ----------------------------------------------------------------------------
const pdfSplitMeta = {
  en: {
    name: 'PDF Split',
    title: 'PDF Split - Split PDF Pages Online Free',
    metaTitle: 'PDF Split - Split PDF Pages Online Free',
    metaDescription: 'Split PDF online free. Extract specific PDF pages, split by custom ranges, or separate every page into individual PDFs with 100% client-side privacy.',
    h1: 'PDF Split',
    description: 'Split PDF online for free. Extract specific PDF pages, split by custom ranges, or separate every page into individual PDFs with 100% client-side privacy.',
    shortDescription: 'Split and extract pages from PDF files directly in your browser with zero file uploads.'
  },
  hi: {
    name: 'PDF स्प्लिट (PDF Split)',
    title: 'PDF स्प्लिट करें - मुफ़्त ऑनलाइन PDF पेज एक्सट्रैक्टर',
    metaTitle: 'PDF स्प्लिट करें - मुफ़्त ऑनलाइन PDF पेज एक्सट्रैक्टर',
    metaDescription: 'ऑनलाइन मुफ़्त में PDF स्प्लिट करें। विशिष्ट पृष्ठों को निकालें, कस्टम रेंज द्वारा विभाजित करें। 100% सुरक्षित और निजी।',
    h1: 'PDF स्प्लिट ऑनलाइन (PDF Split Online)',
    description: 'ऑनलाइन मुफ़्त में PDF स्प्लिट करें। विशिष्ट पृष्ठों को निकालें, कस्टम रेंज द्वारा विभाजित करें। 100% सुरक्षित और निजी।',
    shortDescription: 'ब्राउज़र में सीधे PDF फाइलों से पेज अलग करें और निकालें, बिना किसी सर्वर अपलोड के।'
  },
  es: {
    name: 'Dividir PDF (PDF Split)',
    title: 'Dividir PDF - Separar Páginas de PDF Online Gratis',
    metaTitle: 'Dividir PDF - Separar Páginas de PDF Online Gratis',
    metaDescription: 'Divide archivos PDF online gratis. Extrae páginas específicas o separa por rangos con total privacidad sin subir archivos.',
    h1: 'Dividir PDF Online',
    description: 'Divide archivos PDF online gratis. Extrae páginas específicas o separa por rangos con total privacidad sin subir archivos.',
    shortDescription: 'Separa y extrae páginas de documentos PDF en tu navegador sin subir archivos.'
  },
  fr: {
    name: 'Diviser PDF (PDF Split)',
    title: 'Diviser PDF - Séparer les Pages PDF en Ligne Gratuit',
    metaTitle: 'Diviser PDF - Séparer les Pages PDF en Ligne Gratuit',
    metaDescription: 'Divisez vos fichiers PDF en ligne gratuitement. Extrayez des pages spécifiques ou séparez par plages en toute confidentialité.',
    h1: 'Diviser PDF en Ligne',
    description: 'Divisez vos fichiers PDF en ligne gratuitement. Extrayez des pages spécifiques ou séparez par plages en toute confidentialité.',
    shortDescription: 'Séparez et extrayez des pages de fichiers PDF dans votre navigateur en toute sécurité.'
  },
  de: {
    name: 'PDF Teilen (PDF Split)',
    title: 'PDF Teilen - PDF Seiten Online Kostenlos Trennen',
    metaTitle: 'PDF Teilen - PDF Seiten Online Kostenlos Trennen',
    metaDescription: 'PDF-Dateien online kostenlos teilen. Extrahieren Sie bestimmte Seiten oder trennen Sie nach Bereichen mit 100% Datenschutz.',
    h1: 'PDF Online Teilen',
    description: 'PDF-Dateien online kostenlos teilen. Extrahieren Sie bestimmte Seiten oder trennen Sie nach Bereichen mit 100% Datenschutz.',
    shortDescription: 'Trennen und extrahieren Sie Seiten aus PDF-Dateien direkt im Browser ohne Upload.'
  },
  pt: {
    name: 'Dividir PDF (PDF Split)',
    title: 'Dividir PDF - Separar Páginas de PDF Online Grátis',
    metaTitle: 'Dividir PDF - Separar Páginas de PDF Online Grátis',
    metaDescription: 'Divida arquivos PDF online grátis. Extraia páginas específicas ou divida por intervalos com privacidade total no navegador.',
    h1: 'Dividir PDF Online',
    description: 'Divida arquivos PDF online grátis. Extraia páginas específicas ou divida por intervalos com privacidade total no navegador.',
    shortDescription: 'Divida e extraia páginas de PDFs diretamente no navegador sem enviar arquivos à nuvem.'
  },
  it: {
    name: 'Dividi PDF (PDF Split)',
    title: 'Dividi PDF - Separa Pagine PDF Online Gratis',
    metaTitle: 'Dividi PDF - Separa Pagine PDF Online Gratis',
    metaDescription: 'Dividi file PDF online gratis. Estrai pagine specifiche o dividi per intervalli con totale privacy nel tuo browser.',
    h1: 'Dividi PDF Online',
    description: 'Dividi file PDF online gratis. Estrai pagine specifiche o dividi per intervalli con totale privacy nel tuo browser.',
    shortDescription: 'Estrai e separa pagine da documenti PDF direttamente nel browser senza caricare file.'
  },
  ja: {
    name: 'PDF 分割 (PDF Split)',
    title: 'PDF 分割 - オンラインで無料のPDFページ抽出',
    metaTitle: 'PDF 分割 - オンラインで無料のPDFページ抽出',
    metaDescription: 'オンラインでPDFを無料分割。特定のページを抽出したり、範囲ごとに分割できます。完全ブラウザ処理で安全。',
    h1: 'PDF 分割 オンライン',
    description: 'オンラインでPDFを無料分割。特定のページを抽出したり、範囲ごとに分割できます。完全ブラウザ処理で安全。',
    shortDescription: 'サーバーへのアップロード不要で、ブラウザ内で直接PDFページを抽出・分割します。'
  },
  ko: {
    name: 'PDF 분할 (PDF Split)',
    title: 'PDF 분할 - 무료 온라인 PDF 페이지 나누기',
    metaTitle: 'PDF 분할 - 무료 온라인 PDF 페이지 나누기',
    metaDescription: '온라인에서 무료로 PDF를 분할하세요. 특정 페이지 추출 및 범위 분할 지원. 브라우저 로컬 처리로 완벽한 보안.',
    h1: '온라인 PDF 분할',
    description: '온라인에서 무료로 PDF를 분할하세요. 특정 페이지 추출 및 범위 분할 지원. 브라우저 로컬 처리로 완벽한 보안.',
    shortDescription: '파일 업로드 없이 브라우저에서 직접 PDF 페이지를 추출하고 분할하세요.'
  }
};

const pdfSplitFaqs = {
  en: [
    { question: "What is PDF Split and how does the browser-based page extractor work?", answer: "PDF Split is a document utility that disassembles a single multi-page PDF into smaller, focused PDF files. Our tool works entirely client-side using pdf-lib in your web browser. It reads your document's binary structure, copies the exact vector, text, and image streams of your selected pages, and creates fresh standalone PDF documents without uploading any data to external servers." },
    { question: "How do I split PDF pages using custom ranges and comma-separated lists?", answer: "To split PDF pages with precision, upload your file and select 'Extract Pages' or 'By Ranges'. In the page selection field, enter your desired page numbers such as '1-5, 8, 11-14'. The tool validates the page boundaries against your document's total page count and compiles a new PDF containing only those specified pages in their original order." },
    { question: "Can I use this PDF split online free tool with no limits or watermarks?", answer: "Yes. This PDF split online free tool is 100% free with unlimited document processing, no page restrictions, no mandatory account sign-up, and zero watermarks added to your output files. You can split and extract as many PDF documents as you need." },
    { question: "How do I split a large PDF into individual single-page documents?", answer: "Select the 'Each Page' split mode and click 'Split PDF'. Our engine will burst the document into separate PDF files for every page (e.g. Page-1.pdf, Page-2.pdf, Page-3.pdf) and provide quick one-click download links for each individual file." },
    { question: "Are my confidential PDF documents safe from data leaks?", answer: "Yes, completely safe. Unlike other online converters that send your files across the internet to remote servers, our PDF split online tool processes 100% of your data locally on your computer, tablet, or smartphone. Your sensitive bank statements, legal contracts, medical records, and identity documents never leave your device." },
    { question: "Does splitting a PDF reduce its visual quality, resolution, or font clarity?", answer: "No. Splitting extracts and clones the exact binary object trees from the source PDF without re-encoding or downsampling images. Text sharpness, vector graphics, embedded fonts, and page dimensions remain 100% identical to the original file." },
    { question: "Can I split password-protected or encrypted PDF documents?", answer: "Encrypted or password-protected PDF files cannot be decrypted without the correct credentials and cannot be modified automatically. Please remove the password protection from your PDF file before splitting it." },
    { question: "What should I do after splitting my PDF?", answer: "After splitting your PDF pages, you can use our companion tools to optimize your workflow: compress the extracted file with our PDF Compress tool, merge multiple sections with PDF Merge, or convert pages into PNG/JPG assets using our PDF to Image tool." }
  ],
  hi: [
    { question: "PDF स्प्लिट क्या है और ब्राउज़र-आधारित पेज एक्सट्रैक्टर कैसे काम करता है?", answer: "PDF स्प्लिट एक उपयोगिता है जो बहु-पृष्ठीय PDF को छोटे, केंद्रित PDF दस्तावेजों में विभाजित करती है। हमारा टूल पूरी तरह से आपके ब्राउज़र में pdf-lib का उपयोग करके स्थानीय रूप से काम करता है। यह किसी भी सर्वर पर फाइल अपलोड किए बिना पृष्ठों को अलग करता है।" },
    { question: "कस्टम रेंज और कॉमा-विभाजित सूची से PDF पेज कैसे अलग करें?", answer: "सटीकता से पेज अलग करने के लिए अपनी फाइल चुनें और 'Extract Pages' या 'By Ranges' चुनें। इनपुट बॉक्स में '1-5, 8, 11-14' जैसे पेज नंबर दर्ज करें और स्प्लिट पर क्लिक करें।" },
    { question: "क्या यह टूल बिना सीमा या वॉटरमार्क के पूरी तरह मुफ़्त है?", answer: "हाँ, यह 100% मुफ़्त है। कोई दैनिक सीमा नहीं, कोई खाता बनाने की आवश्यकता नहीं और आउटपुट फाइलों पर कोई वॉटरमार्क नहीं जोड़ा जाता है।" },
    { question: "बड़ी PDF को अलग-अलग एकल पेज दस्तावेजों में कैसे बदलें?", answer: "'Each Page' मोड चुनें और 'Split PDF' पर क्लिक करें। टूल प्रत्येक पृष्ठ के लिए अलग PDF फाइल तैयार कर देगा।" },
    { question: "क्या मेरे गोपनीय दस्तावेज डेटा लीक से सुरक्षित हैं?", answer: "हाँ, पूरी तरह सुरक्षित। आपकी फाइलें आपके डिवाइस पर ही प्रोसेस होती हैं और कभी भी इंटरनेट पर किसी सर्वर को नहीं भेजी जाती हैं।" },
    { question: "क्या PDF स्प्लिट करने से फॉन्ट या इमेज की गुणवत्ता कम होती है?", answer: "बिल्कुल नहीं। यह टूल सीधे ऑब्जेक्ट ट्री को क्लोन करता है, जिससे टेक्स्ट, वेक्टर ग्राफिक्स और इमेज की गुणवत्ता मूल फाइल के समान ही बनी रहती है।" },
    { question: "क्या पासवर्ड-संरक्षित PDF को स्प्लिट किया जा सकता है?", answer: "नहीं, एन्क्रिप्टेड या पासवर्ड-सुरक्षित PDF को पहले अनलॉक करना होगा, उसके बाद ही इसे स्प्लिट किया जा सकता है।" },
    { question: "पेज अलग करने के बाद क्या कर सकते हैं?", answer: "आप अलग की गई फाइलों को हमारे PDF Compress टूल से छोटा कर सकते हैं, PDF Merge से जोड़ सकते हैं, या PDF to Image टूल से फोटो में बदल सकते हैं।" }
  ],
  es: [
    { question: "¿Qué es PDF Split y cómo funciona la extracción en el navegador?", answer: "PDF Split es una herramienta que divide un documento PDF multipágina en archivos más pequeños. Funciona 100% en tu navegador con pdf-lib, sin subir archivos a servidores externos." },
    { question: "¿Cómo dividir páginas usando rangos personalizados?", answer: "Sube tu archivo, elige 'Extraer páginas' o 'Por rangos', e ingresa los números deseados como '1-5, 8, 11-14'. Se generará un nuevo PDF con esas páginas exactas." },
    { question: "¿Es gratis y sin marcas de agua?", answer: "Sí, es completamente gratuito, sin límites de uso, sin registros obligatorios y sin ninguna marca de agua en los archivos generados." },
    { question: "¿Puedo separar cada página en un archivo individual?", answer: "Sí, selecciona la opción 'Cada página' y el sistema creará un archivo PDF independiente por cada página del documento original." },
    { question: "¿Están seguros mis documentos confidenciales?", answer: "Completamente seguros. La tramitación se realiza localmente en tu ordenador o móvil. Tus datos nunca viajan por internet." },
    { question: "¿Se reduce la calidad o nitidez del texto al dividir?", answer: "No. Se clonan las estructuras vectoriales y los objetos binarios originales sin volver a codificar ni comprimir imágenes." },
    { question: "¿Puedo dividir documentos protegidos con contraseña?", answer: "Los archivos PDF protegidos con contraseña deben desbloquearse antes de procesarse con esta herramienta." },
    { question: "¿Qué herramientas complementarias puedo usar?", answer: "Puedes comprimir el PDF resultante con PDF Compress, combinar secciones con PDF Merge o convertir páginas con PDF to Image." }
  ],
  fr: [
    { question: "Qu'est-ce que PDF Split et comment fonctionne l'extraction locale ?", answer: "PDF Split divise un document PDF volumineux en fichiers ciblés. Tout le traitement s'exécute côté client dans votre navigateur sans téléversement vers des serveurs tiers." },
    { question: "Comment fractionner des pages avec des plages personnalisées ?", answer: "Importez votre PDF, sélectionnez 'Extraire des pages' et saisissez des critères comme '1-5, 8, 11-14'. Un document neuf contenant uniquement ces pages sera créé." },
    { question: "Le service est-il gratuit et sans filigrane ?", answer: "Oui, il est 100% gratuit, sans limitation de pages, sans compte requis et sans aucun filigrane ajouté." },
    { question: "Comment éclater un PDF en documents d'une seule page ?", answer: "Activez le mode 'Chaque page' pour créer instantanément un fichier PDF indépendant pour chaque page de votre document." },
    { question: "Mes données confidentielles sont-elles protégées ?", answer: "Absolument. Vos relevés de compte et contrats ne quittent jamais votre appareil et restent strictement confidentiels." },
    { question: "La qualité du texte et des images est-elle préservée ?", answer: "Oui, les pages sont copiées sans perte de résolution, préservant la netteté vectorielle et les polices intégrées." },
    { question: "Peut-on traiter un PDF protégé par mot de passe ?", answer: "Veuillez retirer la protection par mot de passe de votre fichier avant de procéder à la division." },
    { question: "Quelles sont les étapes suivantes recommandées ?", answer: "Vous pouvez réduire la taille avec PDF Compress, réassembler des éléments avec PDF Merge ou exporter en images avec PDF to Image." }
  ],
  de: [
    { question: "Was ist PDF Split und wie funktioniert das browserbasierte Teilen?", answer: "PDF Split teilt mehrseitige PDF-Dokumente in kleinere Dateien auf. Das Werkzeug läuft vollständig lokal im Browser über pdf-lib, ohne Server-Uploads." },
    { question: "Wie teile ich Seiten anhand benutzerdefinierter Bereiche?", answer: "Wählen Sie 'Seiten extrahieren' und geben Sie Werte wie '1-5, 8, 11-14' ein. Sie erhalten ein neues PDF mit genau diesen Seiten." },
    { question: "Ist das Werkzeug kostenlos und ohne Wasserzeichen?", answer: "Ja, zu 100% kostenlos, ohne Registrierung, ohne Nutzungsbeschränkungen und frei von Wasserzeichen." },
    { question: "Kann ich ein PDF in Einzelseiten aufteilen?", answer: "Wählen Sie den Modus 'Jede Seite', um für jede Seite ein separates PDF-Dokument herunterzuladen." },
    { question: "Sind vertrauliche Dokumente sicher?", answer: "Vollkommen sicher. Alle Vorgänge finden im Arbeitsspeicher Ihres Endgeräts statt und verlassen dieses zu keinem Zeitpunkt." },
    { question: "Verliert das Dokument beim Teilen an Qualität?", answer: "Nein. Vektorgrafiken, Schriften und Bildauflösungen werden unverändert übernommen." },
    { question: "Können passwortgeschützte PDFs geteilt werden?", answer: "Geschützte PDFs müssen vor der Bearbeitung entsperrt werden." },
    { question: "Welche nützlichen Zusatzwerkzeuge gibt es?", answer: "Nutzen Sie PDF Compress zur Größenreduktion, PDF Merge zum Verbinden oder PDF to Image zur Bildkonvertierung." }
  ],
  pt: [
    { question: "O que é o PDF Split e como funciona a divisão no navegador?", answer: "O PDF Split divide um documento PDF em partes menores. Todo o processamento ocorre no navegador com pdf-lib, sem envio a servidores." },
    { question: "Como dividir páginas por intervalos personalizados?", answer: "Selecione o modo 'Extrair páginas' e digite os números como '1-5, 8, 11-14' para compilar um novo PDF com as páginas indicadas." },
    { question: "O serviço é gratuito e sem marcas d'água?", answer: "Sim, 100% gratuito, sem limite de uso, sem necessidade de cadastro e sem marcas d'água nos arquivos finais." },
    { question: "Como separar cada página em um PDF individual?", answer: "Escolha o modo 'Cada página' para gerar arquivos individuais para todas as páginas do documento original." },
    { question: "Meus arquivos confidenciais estão seguros?", answer: "Totalmente seguros. Os dados são manipulados na memória do seu dispositivo e nunca saem dele." },
    { question: "A qualidade das fontes e ilustrações é preservada?", answer: "Sim. A clonagem de objetos do PDF é sem perdas, garantindo nitidez idêntica ao original." },
    { question: "É possível dividir PDFs protegidos por senha?", answer: "Arquivos com senha precisam ser desbloqueados previamente antes da divisão." },
    { question: "Quais ferramentas posso usar em seguida?", answer: "Otimize o tamanho com PDF Compress, junte partes com PDF Merge ou extraia fotos com PDF to Image." }
  ],
  it: [
    { question: "Cos'è PDF Split e come avviene la divisione nel browser?", answer: "PDF Split scompone un PDF multipagina in documenti separati. Funziona interamente nel browser tramite pdf-lib, senza caricare dati all'esterno." },
    { question: "Come posso estrarre pagine con intervalli specifici?", answer: "Carica il file, seleziona 'Estrai pagine' e specifica intervalli come '1-5, 8, 11-14' per generare un nuovo PDF contenente solo quelle pagine." },
    { question: "Lo strumento è gratuito e senza watermark?", answer: "Sì, gratuito al 100%, illimitato, senza registrazione obbligatoria e privo di qualsiasi watermark." },
    { question: "Posso dividere il PDF in singole pagine separate?", answer: "Scegli la modalità 'Ogni pagina' per creare un file PDF indipendente per ciascuna pagina del documento." },
    { question: "I miei documenti riservati sono protetti?", answer: "Sì, la massima sicurezza è garantita: l'elaborazione avviene in locale sul tuo computer o smartphone." },
    { question: "C'è perdita di qualità nei testi o nella grafica?", answer: "Nessuna perdita. I vettori, i font e le immagini vengono duplicati con fedeltà assoluta al documento sorgente." },
    { question: "Posso dividere file protetti da password?", answer: "Rimuovi la password dal documento PDF prima di procedere alla suddivisione." },
    { question: "Quali strumenti correlati posso utilizzare?", answer: "Prova PDF Compress per alleggerire i file, PDF Merge per unirli o PDF to Image per convertirli in immagini." }
  ],
  ja: [
    { question: "PDF分割ツールとは何ですか？ブラウザ処理の仕組みは？", answer: "複数ページのPDF文書を必要なページごとの小さなPDFに分割するツールです。pdf-lib技術により、外部サーバーにアップロードすることなく、ブラウザ内で完結して安全に処理します。" },
    { question: "カスタム範囲やカンマ区切りでページを抽出するには？", answer: "ファイルをアップロード後、「ページ抽出」を選択し、「1-5, 8, 11-14」のようにページ番号を入力するだけで、対象ページのみで構成された新しいPDFが作成されます。" },
    { question: "利用制限や透かし（ウォーターマーク）はありますか？", answer: "完全無料で回数制限はなく、アカウント登録も不要です。出力されるファイルに透かしが入ることもありません。" },
    { question: "全ページを1ページごとのファイルに分割できますか？", answer: "「全ページ個別分割」モードを選択すると、1ページずつ独立した個別PDFファイルとして一括生成されます。" },
    { question: "機密書類や契約書のセキュリティは安全ですか？", answer: "端末内のメモリ上でのみ処理されるため、データがインターネット上に送信されることは一切なく、情報漏洩の心配がありません。" },
    { question: "分割によって文字の鮮明さや画質は低下しますか？", answer: "いいえ。元のPDFのベクター情報やフォント、画像を無劣化で複製するため、オリジナルと同等の高い品質が維持されます。" },
    { question: "パスワード付きのPDFは分割できますか？", answer: "暗号化されたPDFは直接処理できないため、事前にパスワード保護を解除してからご利用ください。" },
    { question: "分割後に利用できる関連ツールはありますか？", answer: "分割したPDFを軽量化する「PDF圧縮」、複数PDFをまとめる「PDF結合」、画像化する「PDF画像変換」などを合わせてご活用いただけます。" }
  ],
  ko: [
    { question: "PDF 분할 도구란 무엇이며 브라우저 기반 처리는 어떻게 동작하나요?", answer: "여러 페이지로 구성된 PDF 문서를 원하는 페이지만 선택하여 새로운 PDF로 분할하는 도구입니다. 웹 브라우저 내에서 직접 처리되어 외부 서버로 파일이 업로드되지 않아 안전합니다." },
    { question: "사용자 지정 범위로 특정 페이지만 분할하려면 어떻게 하나요?", answer: "문서를 추가한 뒤 '페이지 추출' 모드에서 '1-5, 8, 11-14'와 같이 원하는 페이지 번호를 입력하면 해당 페이지만 묶인 새 PDF가 생성됩니다." },
    { question: "사용 횟수 제한이나 워터마크가 추가되나요?", answer: "완전 무료 도구로 횟수 제한이 없으며, 회원가입이 필요 없고 파일에 어떠한 워터마크도 삽입되지 않습니다." },
    { question: "모든 페이지를 1페이지씩 낱개 문서로 분할할 수 있나요?", answer: "'각 페이지별 분할' 모드를 선택하면 모든 페이지가 개별 PDF 파일로 분리되어 손쉽게 다운로드할 수 있습니다." },
    { question: "기밀 문서나 개인정보 유출 위험은 없나요?", answer: "모든 변환 작업이 사용자의 기기 로컬에서만 수행되므로 네트워크로 문서가 전송되지 않아 완벽하게 보호됩니다." },
    { question: "분할 후 텍스트나 이미지 품질이 저하되나요?", answer: "아닙니다. 원본 PDF의 벡터 객체와 폰트를 그대로 복제하므로 원본과 동일한 선명한 품질을 유지합니다." },
    { question: "비밀번호가 걸린 PDF도 분할 가능한가요?", answer: "보안 암호화된 PDF는 사전에 비밀번호를 해제한 후 이용해 주셔야 합니다." },
    { question: "분할 후 함께 쓰기 좋은 도구는 무엇이 있나요?", answer: "용량을 줄여주는 'PDF 압축', 다시 묶어주는 'PDF 병합', 이미지로 바꾸는 'PDF 이미지 변환' 도구를 연계하여 이용할 수 있습니다." }
  ]
};

// ----------------------------------------------------------------------------
// 2. PDF COMPRESS DATA
// ----------------------------------------------------------------------------
const pdfCompressMeta = {
  en: {
    name: 'PDF Compress',
    title: 'PDF Compress - Compress PDF Online Free (Under 200KB)',
    metaTitle: 'PDF Compress - Compress PDF Online Free (Under 200KB)',
    metaDescription: 'Compress PDF online for free. Reduce PDF file size to 200kb, 100kb, or smaller with adjustable compression presets. Fast, 100% private, and no watermarks.',
    h1: 'PDF Compress',
    description: 'Compress PDF online for free. Reduce PDF file size to 200kb or smaller with adjustable compression presets. Fast, 100% client-side, private, and no watermarks.',
    shortDescription: 'Compress and shrink PDF document file sizes online in your browser without uploading files.'
  },
  hi: {
    name: 'PDF कंप्रेस (PDF Compress)',
    title: 'PDF कंप्रेस करें - मुफ़्त ऑनलाइन PDF साइज रिड्यूसर (200KB के तहत)',
    metaTitle: 'PDF कंप्रेस करें - मुफ़्त ऑनलाइन PDF साइज रिड्यूसर (200KB के तहत)',
    metaDescription: 'ऑनलाइन मुफ़्त में PDF कंप्रेस करें। 200KB या 100KB तक फाइल साइज कम करें। तेज, सुरक्षित और कोई वॉटरमार्क नहीं।',
    h1: 'PDF कंप्रेस ऑनलाइन (PDF Compress Online)',
    description: 'ऑनलाइन मुफ़्त में PDF कंप्रेस करें। 200KB या 100KB तक फाइल साइज कम करें। तेज, सुरक्षित और कोई वॉटरमार्क नहीं।',
    shortDescription: 'ब्राउज़र में स्थानीय रूप से PDF फाइल का साइज घटाएं, सरकारी पोर्टल और ईमेल के लिए उपयुक्त।'
  },
  es: {
    name: 'Comprimir PDF (PDF Compress)',
    title: 'Comprimir PDF - Reducir Tamaño de PDF Online Gratis (Menos de 200KB)',
    metaTitle: 'Comprimir PDF - Reducir Tamaño de PDF Online Gratis (Menos de 200KB)',
    metaDescription: 'Comprime PDF online gratis. Reduce el tamaño a 200KB o 100KB con ajustes personalizables. Rápido, privado y sin marcas de agua.',
    h1: 'Comprimir PDF Online',
    description: 'Comprime PDF online gratis. Reduce el tamaño a 200KB o 100KB con ajustes personalizables. Rápido, privado y sin marcas de agua.',
    shortDescription: 'Reduce el peso de tus documentos PDF en el navegador sin subir archivos.'
  },
  fr: {
    name: 'Compresser PDF (PDF Compress)',
    title: 'Compresser PDF - Réduire la Taille PDF en Ligne Gratuit',
    metaTitle: 'Compresser PDF - Réduire la Taille PDF en Ligne Gratuit',
    metaDescription: 'Compressez vos PDF en ligne gratuitement. Réduisez la taille à moins de 200 Ko avec compression réglable. Rapide et privé.',
    h1: 'Compresser PDF en Ligne',
    description: 'Compressez vos PDF en ligne gratuitement. Réduisez la taille à moins de 200 Ko avec compression réglable. Rapide et privé.',
    shortDescription: 'Optimisez et réduisez la taille de vos fichiers PDF directement dans le navigateur.'
  },
  de: {
    name: 'PDF Komprimieren (PDF Compress)',
    title: 'PDF Komprimieren - PDF Größe Online Kostenlos Verringern',
    metaTitle: 'PDF Komprimieren - PDF Größe Online Kostenlos Verringern',
    metaDescription: 'PDF online kostenlos komprimieren. Reduzieren Sie die Dateigröße auf unter 200 KB mit voreingestellten Stufen. Sicher und ohne Wasserzeichen.',
    h1: 'PDF Online Komprimieren',
    description: 'PDF online kostenlos komprimieren. Reduzieren Sie die Dateigröße auf unter 200 KB mit voreingestellten Stufen. Sicher und ohne Wasserzeichen.',
    shortDescription: 'Verringern Sie die Dateigröße von PDF-Dokumenten direkt im Browser ohne Serverübertragung.'
  },
  pt: {
    name: 'Comprimir PDF (PDF Compress)',
    title: 'Comprimir PDF - Reduzir Tamanho do PDF Online Grátis',
    metaTitle: 'Comprimir PDF - Reduzir Tamanho do PDF Online Grátis',
    metaDescription: 'Comprima PDF online grátis. Reduza o tamanho para menos de 200KB com predefinições ajustáveis. Rápido, privado e sem marcas d\'água.',
    h1: 'Comprimir PDF Online',
    description: 'Comprima PDF online grátis. Reduza o tamanho para menos de 200KB com predefinições ajustáveis. Rápido, privado e sem marcas d\'água.',
    shortDescription: 'Reduza o tamanho de arquivos PDF no seu navegador com segurança e privacidade total.'
  },
  it: {
    name: 'Comprimi PDF (PDF Compress)',
    title: 'Comprimi PDF - Riduci Dimensioni PDF Online Gratis',
    metaTitle: 'Comprimi PDF - Riduci Dimensioni PDF Online Gratis',
    metaDescription: 'Comprimi PDF online gratis. Riduci le dimensioni del file a meno di 200KB con preimpostazioni flessibili. Sicuro e senza watermark.',
    h1: 'Comprimi PDF Online',
    description: 'Comprimi PDF online gratis. Riduci le dimensioni del file a meno di 200KB con preimpostazioni flessibili. Sicuro e senza watermark.',
    shortDescription: 'Riduci il peso dei tuoi documenti PDF direttamente nel browser senza caricare file in rete.'
  },
  ja: {
    name: 'PDF 圧縮 (PDF Compress)',
    title: 'PDF 圧縮 - 無料でPDFファイルサイズを縮小 (200KB以下)',
    metaTitle: 'PDF 圧縮 - 無料でPDFファイルサイズを縮小 (200KB以下)',
    metaDescription: 'オンラインでPDFを無料圧縮。画質を保ちながら200KB以下にサイズ縮小。ウォーターマークなし、完全プライベート。',
    h1: 'PDF 圧縮 オンライン',
    description: 'オンラインでPDFを無料圧縮。画質を保ちながら200KB以下にサイズ縮小。ウォーターマークなし、完全プライベート。',
    shortDescription: '画質を落とさずブラウザ内でPDF容量を大幅に削減します。'
  },
  ko: {
    name: 'PDF 압축 (PDF Compress)',
    title: 'PDF 압축 - 무료 온라인 PDF 파일 용량 줄이기 (200KB 이하)',
    metaTitle: 'PDF 압축 - 무료 온라인 PDF 파일 용량 줄이기 (200KB 이하)',
    metaDescription: '온라인에서 PDF를 무료로 압축하세요. 200KB 또는 100KB 이하로 파일 용량 축소. 워터마크 없이 빠르고 안전함.',
    h1: '온라인 PDF 압축',
    description: '온라인에서 PDF를 무료로 압축하세요. 200KB 또는 100KB 이하로 파일 용량 축소. 워터마크 없이 빠르고 안전함.',
    shortDescription: '서버 업로드 없이 브라우저에서 안전하게 PDF 용량을 줄이세요.'
  }
};

const pdfCompressFaqs = {
  en: [
    { question: "What is PDF Compress and how does browser-based compression work?", answer: "PDF Compress is a document optimization process that reduces the digital storage size of a PDF file. Our tool performs PDF compression directly inside your web browser using pdf-lib and client-side stream optimization. It removes redundant metadata, strips duplicate font structures, consolidates object streams, and re-compresses binary content without transmitting your sensitive document to an external cloud server." },
    { question: "How do I achieve a PDF compress 200kb target for official portal uploads?", answer: "To achieve a PDF compress 200kb target for government portals (such as UPSC, SSC, state recruitment boards, college admissions, or passport portals), upload your document, select the 'Medium' or 'High' compression preset, and click 'Compress PDF'. If your original document is multi-megabyte with high-resolution scans, use our PDF Split tool first to remove non-essential pages, or convert pages with our PDF to Image tool to adjust dpi before compiling." },
    { question: "Can I use this PDF compress online tool completely free of cost?", answer: "Yes. Our PDF compress online utility is 100% free with no registration, no email subscription, no daily usage limits, and no promotional watermarks stamped onto your output files. You can compress as many PDF documents as you need at zero cost." },
    { question: "Is it safe to compress confidential legal, financial, or medical PDFs here?", answer: "Yes, completely safe. Unlike conventional online PDF compressors that upload your files to remote cloud storage where third-party servers could retain or log your information, our tool operates 100% locally on your machine. Your bank statements, Aadhaar cards, tax returns, and contracts remain strictly private on your device." },
    { question: "Will compressing a PDF degrade the quality or readability of my text?", answer: "No. Vector text elements, TrueType/OpenType font glyphs, tables, and hyperlinks remain sharp and fully searchable. Compression primarily optimizes internal document indexing, eliminates orphaned objects, and deflates binary content streams without blurring vector text." },
    { question: "What is the difference between Low, Medium, and High compression levels?", answer: "Low compression focuses on structural cleanup, object stream optimization, and metadata stripping with zero perceptible alteration to any visual element. Medium compression provides a balanced approach ideal for web sharing and email attachments. High compression performs aggressive stream compaction, perfect for tight portal upload limits like 100 KB to 200 KB." },
    { question: "Why did my PDF file size not decrease significantly?", answer: "If a PDF has already been heavily compressed or contains only raw vectorized text and monochrome outlines, it is already near its theoretical mathematical size limit. In such cases, our tool will notify you that the file is already optimized, preventing unnecessary re-encoding that could introduce file bloat." },
    { question: "Can I compress password-protected PDF files?", answer: "For data security and cryptographic reasons, password-protected or encrypted PDF documents cannot be modified directly in the browser. You must unlock or remove the password protection from your PDF file before compressing it." }
  ],
  hi: [
    { question: "PDF कंप्रेस क्या है और ब्राउज़र-आधारित कंप्रेशन कैसे काम करता है?", answer: "PDF कंप्रेस एक प्रक्रिया है जो फाइल के डिजिटल आकार को कम करती है। हमारा टूल सीधे आपके ब्राउज़र में pdf-lib का उपयोग करके अनावश्यक मेटाडेटा हटाता है और स्ट्रीम को अनुकूलित करता है।" },
    { question: "सरकारी पोर्टलों के लिए 200KB लक्ष्य कैसे प्राप्त करें?", answer: "UPSC, SSC, बैंक या कॉलेज फॉर्म के लिए 200KB का आकार पाने के लिए फाइल जोड़ें, 'Medium' या 'High' कंप्रेशन चुनें और कंप्रेस करें।" },
    { question: "क्या यह टूल पूरी तरह मुफ़्त और बिना वॉटरमार्क के है?", answer: "हाँ, यह 100% मुफ़्त है, कोई रजिस्ट्रेशन जरूरी नहीं है और आउटपुट में कोई वॉटरमार्क नहीं आता।" },
    { question: "क्या बैंक स्टेटमेंट और कानूनी PDF कंप्रेस करना सुरक्षित है?", answer: "हाँ, पूरी तरह सुरक्षित। आपकी फाइलें आपके कंप्यूटर या फोन पर ही प्रोसेस होती हैं और कभी भी इंटरनेट पर अपलोड नहीं होतीं।" },
    { question: "क्या कंप्रेस करने से अक्षरों की स्पष्टता कम होगी?", answer: "नहीं, वेक्टर टेक्स्ट, फॉन्ट और टेबल पूरी तरह से स्पष्ट और पढ़ने योग्य रहते हैं।" },
    { question: "Low, Medium और High कंप्रेशन लेवल में क्या अंतर है?", answer: "Low में केवल आंतरिक संरचना साफ होती है, Medium सामान्य ईमेल और वेब शेयरिंग के लिए सबसे अच्छा है, और High अधिकतम साइज कटौती के लिए है।" },
    { question: "मेरी फाइल का साइज बहुत ज्यादा कम क्यों नहीं हुआ?", answer: "यदि PDF पहले से ही अत्यधिक कंप्रेस की गई हो, तो वह पहले से ही न्यूनतम आकार के करीब होती है।" },
    { question: "क्या पासवर्ड लगी PDF को कंप्रेस किया जा सकता है?", answer: "पासवर्ड-सुरक्षित PDF को पहले अनलॉक करना होगा, उसके बाद ही कंप्रेस किया जा सकता है।" }
  ],
  es: [
    { question: "¿Qué es PDF Compress y cómo funciona la compresión local?", answer: "Es un proceso de optimización que reduce el peso de un PDF eliminando metadatos redundantes y compactando flujos de datos dentro de tu navegador." },
    { question: "¿Cómo lograr que un PDF pese menos de 200KB?", answer: "Sube el documento, selecciona compresión 'Media' o 'Alta' y pulsa comprimir. Es ideal para trámites de admisiones, empleo o plataformas oficiales." },
    { question: "¿Es gratis y sin marcas de agua?", answer: "Sí, es 100% gratuito, sin límites diarios y sin marcas de agua comerciales." },
    { question: "¿Es seguro para documentos bancarios o médicos?", answer: "Completamente seguro. Todo ocurre en la memoria de tu dispositivo sin subir el archivo a ningún servidor remoto." },
    { question: "¿Se degrada la legibilidad del texto?", answer: "No, las fuentes tipográficas vectoriales y el contenido de texto permanecen nítidos y con capacidad de búsqueda." },
    { question: "¿Cuál es la diferencia entre los niveles de compresión?", answer: "Bajo limpia metadatos sin tocar gráficos; Medio equilibra calidad y peso; Alto compacta al máximo para límites estrictos." },
    { question: "¿Por qué algunos archivos apenas reducen su peso?", answer: "Si el archivo ya fue optimizado previamente o contiene solo texto plano, ya se encuentra cerca de su tamaño mínimo." },
    { question: "¿Se pueden comprimir PDFs protegidos con contraseña?", answer: "Debes retirar la contraseña antes de poder optimizar el archivo en el navegador." }
  ],
  fr: [
    { question: "Comment fonctionne la compression PDF dans le navigateur ?", answer: "L'outil optimise les flux binaires et supprime les métadonnées inutiles directement dans votre navigateur via pdf-lib, sans transfert de données." },
    { question: "Comment atteindre un fichier de moins de 200 Ko ?", answer: "Importez le document et choisissez le préréglage 'Moyen' ou 'Élevé' pour satisfaire aux contraintes des portails administratifs." },
    { question: "Le service est-il gratuit et sans filigrane ?", answer: "Oui, totalement gratuit, sans inscription, sans filigrane et utilisable à volonté." },
    { question: "La sécurité des données est-elle assurée ?", answer: "Absolument. Aucune information n'est transmise sur un réseau externe, assurant une confidentialité totale." },
    { question: "Le texte reste-t-il net et lisible ?", answer: "Oui, les polices vectorielles et la mise en page restent parfaitement nettes." },
    { question: "Quels sont les niveaux de compression proposés ?", answer: "Faible pour un nettoyage structurel, Moyen pour les e-mails, Élevé pour les limites de taille très restreintes." },
    { question: "Pourquoi la taille ne baisse-t-elle pas toujours énormément ?", answer: "Un document déjà optimisé ne peut pas être compressé davantage sans altérer son contenu fondamental." },
    { question: "Puis-je compresser un fichier verrouillé par mot de passe ?", answer: "Déverrouillez votre document au préalable afin de permettre son optimisation locale." }
  ],
  de: [
    { question: "Wie funktioniert die browserbasierte PDF-Komprimierung?", answer: "Überflüssige Metadaten und doppelte Objektstrukturen werden direkt im Browser über pdf-lib bereinigt, ohne Datentransfer." },
    { question: "Wie erreiche ich eine Zielgröße von unter 200 KB?", answer: "Wählen Sie die Voreinstellung 'Mittel' oder 'Hoch', um Upload-Vorgaben von Behörden und Bewerbungsportalen zu erfüllen." },
    { question: "Ist der Dienst kostenlos und werbefrei?", answer: "Ja, uneingeschränkt kostenlos, ohne Wasserzeichen und ohne Registrierung." },
    { question: "Können sensible Dokumente bedenkenlos komprimiert werden?", answer: "Ja, zu 100%, da alle Vorgänge lokal auf Ihrem Rechner verbleiben." },
    { question: "Leidet die Lesbarkeit von Texten darunter?", answer: "Nein, Schriften und Vektorelemente bleiben gestochen scharf und durchsuchbar." },
    { question: "Was bedeuten die Stufen Niedrig, Mittel und Hoch?", answer: "Niedrig bereinigt Metadaten, Mittel ist optimal für E-Mail-Anhänge, Hoch erzielt minimale Dateigrößen." },
    { question: "Warum sinkt die Dateigröße bei manchen PDFs kaum?", answer: "Bereits vorkomprimierte Dokumente befinden sich bereits nahe am theoretischen Minimum." },
    { question: "Können passwortgeschützte PDFs komprimiert werden?", answer: "Bitte entfernen Sie das Passwort, bevor Sie das Dokument im Browser bearbeiten." }
  ],
  pt: [
    { question: "Como funciona a compressão de PDF no navegador?", answer: "Otimiza a estrutura interna do PDF e remove metadados redundantes sem enviar o documento para nenhum servidor." },
    { question: "Como comprimir para menos de 200KB?", answer: "Basta selecionar a predefinição 'Média' ou 'Alta' e processar o arquivo para atender a editais e formulários online." },
    { question: "O serviço é gratuito e sem marcas d'água?", answer: "Sim, 100% grátis, sem limites e sem inclusão de marcas d'água." },
    { question: "É seguro para extratos bancários e contratos?", answer: "Sim, total segurança: nada sai do seu celular ou computador." },
    { question: "A nitidez do texto diminui?", answer: "Não, os textos continuam perfeitamente nítidos e selecionáveis." },
    { question: "Quais os níveis de compressão disponíveis?", answer: "Baixa para limpeza básica, Média para e-mails e Alta para restrições rígidas de tamanho." },
    { question: "Por que meu PDF não diminuiu muito de tamanho?", answer: "Documentos que já foram compactados anteriormente já estão no menor tamanho viável." },
    { question: "Posso comprimir arquivos protegidos por senha?", answer: "Desproteja o arquivo antes de realizar a compressão local." }
  ],
  it: [
    { question: "Come funziona la compressione PDF locale?", answer: "Rimuove metadati e ottimizza i flussi di dati direttamente nel browser con pdf-lib senza ricorrere a server esterni." },
    { question: "Come comprimere sotto i 200KB per concorsi o portali?", answer: "Scegli l'opzione 'Media' o 'Alta' per ottenere file leggeri adatti a caricamenti su siti istituzionali." },
    { question: "È un servizio gratuito e senza watermark?", answer: "Sì, gratuito al 100%, privo di limitazioni e senza watermark." },
    { question: "I documenti finanziari e sanitari sono al sicuro?", answer: "Sicurezza garantita: i file non lasciano mai la memoria del tuo dispositivo." },
    { question: "Il testo perde di definizione?", answer: "No, la leggibilità dei testi e la qualità grafica vettoriale rimangono intatte." },
    { question: "Qual è la differenza tra i livelli di compressione?", answer: "Bassa rimuove metadati, Media è l'ideale per le email, Alta compatta al massimo il file." },
    { question: "Perché alcuni PDF non riducono molto il loro peso?", answer: "Se un file è già compresso o contiene solo testo puro, la riduzione ulteriore sarà minima." },
    { question: "Si possono comprimere PDF protetti da password?", answer: "È necessario rimuovere la password prima di avviare la compressione." }
  ],
  ja: [
    { question: "PDF圧縮の仕組みとブラウザ処理の利点は？", answer: "不要なメタデータや重複フォント情報を整理し、端末内で直接ファイル容量を縮小します。外部サーバーへの送信がないため安全です。" },
    { question: "公的機関や申請フォーム向けに200KB以下に圧縮するには？", answer: "「中」または「高」の圧縮プリセットを選択して実行することで、アップロード制限を満たす軽量なPDFに最適化できます。" },
    { question: "料金や透かしなどの制限はありますか？", answer: "完全無料で使用制限はなく、出力ファイルに余計な透かしが入ることもありません。" },
    { question: "機密性の高い契約書や明細書でも安全ですか？", answer: "すべての処理が端末のブラウザ内で完結するため、外部へのデータ送信がなく情報漏洩のリスクがありません。" },
    { question: "圧縮によって文字がぼやけることはありますか？", answer: "ベクターテキストはクリアなまま保持されるため、文字の視認性や検索機能は劣化しません。" },
    { question: "「低・中・高」の圧縮強度の違いは？", answer: "「低」はメタデータ整理、「中」はメール添付向け、「高」は厳しい容量制限がある場合に最適です。" },
    { question: "ファイルサイズがあまり減らない原因は？", answer: "既に強力に圧縮されているファイルやテキスト中心のPDFは、既に限界近くまで最適化されている場合があります。" },
    { question: "パスワード保護されたPDFは圧縮できますか？", answer: "パスワードで保護されたファイルは事前に解除してからアップロードしてください。" }
  ],
  ko: [
    { question: "브라우저 기반 PDF 압축의 원리와 장점은 무엇인가요?", answer: "중복 메타데이터와 불필요한 객체를 브라우저 내부에서 최적화하여 용량을 줄입니다. 서버 전송이 없어 빠르고 안전합니다." },
    { question: "공공기관 제출용으로 200KB 이하로 압축하려면?", answer: "파일 추가 후 '중간' 또는 '높음' 압축 옵션을 선택하면 엄격한 업로드 규격에 맞춰 손쉽게 축소할 수 있습니다." },
    { question: "무료로 이용 가능하며 워터마크가 남나요?", answer: "완전 무료이며 회원가입이나 결제 없이 무제한으로 사용 가능하고, 워터마크가 찍히지 않습니다." },
    { question: "금융 및 신분증 관련 민감한 서류도 안전한가요?", answer: "외부 서버로 문서가 업로드되지 않고 사용자 PC/스마트폰에서만 동작하므로 100% 안전합니다." },
    { question: "압축 후 텍스트 가독성이 떨어지나요?", answer: "벡터 텍스트와 폰트는 선명도를 그대로 유지하므로 인쇄나 화면 확인 시 흐려지지 않습니다." },
    { question: "압축 단계(낮음/중간/높음)의 차이는 무엇인가요?", answer: "'낮음'은 무손실 메타데이터 정리, '중간'은 일반 공유용, '높음'은 엄격한 용량 제한용입니다." },
    { question: "용량이 많이 줄어들지 않는 이유는 무엇인가요?", answer: "이미 압축되어 있거나 순수 텍스트로만 구성된 문서는 이미 최적화 상태에 가깝기 때문입니다." },
    { question: "비밀번호로 보호된 PDF도 압축할 수 있나요?", answer: "암호가 걸린 문서는 먼저 비밀번호를 해제한 뒤 이용해 주셔야 합니다." }
  ]
};

// ----------------------------------------------------------------------------
// 3. PDF TO IMAGE DATA
// ----------------------------------------------------------------------------
const pdfToImageMeta = {
  en: {
    name: 'PDF to Image',
    title: 'PDF to Image Converter - Convert PDF to PNG/JPG Online Free',
    metaTitle: 'PDF to Image Converter - Convert PDF to PNG/JPG Online Free',
    metaDescription: 'Convert PDF to image high quality (PNG or JPG) with our free online PDF to image converter. 100% private, instant client-side rendering with no file uploads.',
    h1: 'PDF to Image Converter',
    description: 'Convert PDF to image online for free. Transform PDF pages into high quality PNG or JPG images with our private browser-based converter. No uploads, instant export.',
    shortDescription: 'Convert and render PDF pages into high-resolution PNG or JPG image files right in your browser.'
  },
  hi: {
    name: 'PDF से इमेज कनवर्टर (PDF to Image)',
    title: 'PDF से इमेज कनवर्टर - PDF को PNG/JPG में बदलें मुफ़्त',
    metaTitle: 'PDF से इमेज कनवर्टर - PDF को PNG/JPG में बदलें मुफ़्त',
    metaDescription: 'उच्च गुणवत्ता में PDF पेजों को PNG या JPG इमेज में बदलें। 100% मुफ़्त, ब्राउज़र-आधारित और पूरी तरह निजी।',
    h1: 'PDF से इमेज कनवर्टर ऑनलाइन',
    description: 'उच्च गुणवत्ता में PDF पेजों को PNG या JPG इमेज में बदलें। 100% मुफ़्त, ब्राउज़र-आधारित और पूरी तरह निजी।',
    shortDescription: 'ब्राउज़र में PDF पेजों को हाई-क्वालिटी PNG या JPG फोटो में तुरंत बदलें।'
  },
  es: {
    name: 'Convertidor de PDF a Imagen (PDF to Image)',
    title: 'Convertidor de PDF a Imagen - Convertir PDF a PNG/JPG Online Gratis',
    metaTitle: 'Convertidor de PDF a Imagen - Convertir PDF a PNG/JPG Online Gratis',
    metaDescription: 'Convierte PDF a imágenes PNG o JPG de alta calidad online gratis. 100% privado, renderizado en el navegador sin subidas.',
    h1: 'Convertidor de PDF a Imagen Online',
    description: 'Convierte PDF a imágenes PNG o JPG de alta calidad online gratis. 100% privado, renderizado en el navegador sin subidas.',
    shortDescription: 'Convierte páginas de PDF a imágenes PNG o JPG de alta definición sin salir del navegador.'
  },
  fr: {
    name: 'Convertisseur PDF en Image (PDF to Image)',
    title: 'Convertisseur PDF en Image - Convertir PDF en PNG/JPG en Ligne Gratuit',
    metaTitle: 'Convertisseur PDF en Image - Convertir PDF en PNG/JPG en Ligne Gratuit',
    metaDescription: 'Convertissez vos pages PDF en images PNG ou JPG haute résolution en ligne. Gratuit, rapide et respectueux de la vie privée.',
    h1: 'Convertisseur PDF en Image en Ligne',
    description: 'Convertissez vos pages PDF en images PNG ou JPG haute résolution en ligne. Gratuit, rapide et respectueux de la vie privée.',
    shortDescription: 'Transformez vos documents PDF en images haute résolution PNG ou JPG directement dans votre navigateur.'
  },
  de: {
    name: 'PDF zu Bild Konverter (PDF to Image)',
    title: 'PDF zu Bild Konverter - PDF in PNG/JPG Online Kostenlos Umwandeln',
    metaTitle: 'PDF zu Bild Konverter - PDF in PNG/JPG Online Kostenlos Umwandeln',
    metaDescription: 'PDF-Seiten kostenlos in hochauflösende PNG- oder JPG-Bilder umwandeln. 100% lokal im Browser ohne Datei-Upload.',
    h1: 'PDF zu Bild Konverter Online',
    description: 'PDF-Seiten kostenlos in hochauflösende PNG- oder JPG-Bilder umwandeln. 100% lokal im Browser ohne Datei-Upload.',
    shortDescription: 'Konvertieren Sie PDF-Seiten gestochen scharf in PNG- oder JPG-Bilddateien direkt im Browser.'
  },
  pt: {
    name: 'Conversor de PDF para Imagem (PDF to Image)',
    title: 'Conversor de PDF para Imagem - Converter PDF em PNG/JPG Online Grátis',
    metaTitle: 'Conversor de PDF para Imagem - Converter PDF em PNG/JPG Online Grátis',
    metaDescription: 'Converta páginas PDF em imagens PNG ou JPG de alta resolução online grátis. Processamento 100% no navegador sem upload.',
    h1: 'Conversor de PDF para Imagem Online',
    description: 'Converta páginas PDF em imagens PNG ou JPG de alta resolução online grátis. Processamento 100% no navegador sem upload.',
    shortDescription: 'Transforme páginas de documentos PDF em imagens nítidas PNG ou JPG diretamente no navegador.'
  },
  it: {
    name: 'Convertitore da PDF a Immagine (PDF to Image)',
    title: 'Convertitore da PDF a Immagine - Converti PDF in PNG/JPG Online Gratis',
    metaTitle: 'Convertitore da PDF a Immagine - Converti PDF in PNG/JPG Online Gratis',
    metaDescription: 'Converti pagine PDF in immagini PNG o JPG ad alta definizione gratis online. Elaborazione locale istantanea nel browser.',
    h1: 'Convertitore da PDF a Immagine Online',
    description: 'Converti pagine PDF in immagini PNG o JPG ad alta definizione gratis online. Elaborazione locale istantanea nel browser.',
    shortDescription: 'Esporta le pagine dei tuoi PDF come immagini PNG o JPG in alta risoluzione senza caricare file in rete.'
  },
  ja: {
    name: 'PDF 画像 変換 (PDF to Image)',
    title: 'PDF 画像 変換 - PDFをPNG/JPG画像にオンライン無料変換',
    metaTitle: 'PDF 画像 変換 - PDFをPNG/JPG画像にオンライン無料変換',
    metaDescription: 'PDFページを高画質PNGやJPG画像に無料変換。サーバー送信不要でプライバシー保護。',
    h1: 'PDF 画像 変換 オンライン',
    description: 'PDFページを高画質PNGやJPG画像に無料変換。サーバー送信不要でプライバシー保護。',
    shortDescription: 'ブラウザ内でPDFの各ページを高解像度なPNGやJPG画像として書き出します。'
  },
  ko: {
    name: 'PDF 이미지 변환 (PDF to Image)',
    title: 'PDF 이미지 변환 - PDF를 PNG/JPG 이미지로 무료 변환',
    metaTitle: 'PDF 이미지 변환 - PDF를 PNG/JPG 이미지로 무료 변환',
    metaDescription: 'PDF 문서를 고화질 PNG 또는 JPG 이미지로 무료 변환하세요. 파일 업로드 없이 브라우저에서 안전하게 처리.',
    h1: '온라인 PDF 이미지 변환',
    description: 'PDF 문서를 고화질 PNG 또는 JPG 이미지로 무료 변환하세요. 파일 업로드 없이 브라우저에서 안전하게 처리.',
    shortDescription: '서버 전송 없이 브라우저에서 직접 PDF 페이지를 고화질 PNG/JPG 이미지로 추출하세요.'
  }
};

const pdfToImageFaqs = {
  en: [
    { question: "What is a PDF to image converter and how does it work?", answer: "A PDF to image converter is a document utility that extracts and renders individual pages from a Portable Document Format (PDF) file into standalone digital raster image formats like PNG or JPG. Our browser-based tool uses client-side rendering engines (Mozilla PDF.js) to draw every page onto an HTML5 Canvas element at high resolution, allowing you to save crisp visual copies without relying on cloud servers or third-party desktop software." },
    { question: "How do I convert PDF to image online with high quality?", answer: "To convert PDF to image high quality, simply drag and drop your document into the upload box, select PNG as your target output format, and click 'Convert to Images'. Our tool renders vector graphics, fonts, and illustrations at 2x scale (192 DPI), ensuring razor-sharp typography and vibrant color reproduction suitable for presentations, printouts, and digital publishing." },
    { question: "What is the difference between PNG and JPG when converting PDF to image?", answer: "PNG is a lossless raster format that preserves crisp vector lines, fine typography, and high contrast without compression artifacts, making it ideal for diagrams, technical manuals, and slide decks. JPG uses lossy compression to produce significantly smaller file sizes, making it the preferred choice for photo-heavy documents, email attachments, and web uploads where bandwidth and storage are priorities." },
    { question: "Is it safe to use this PDF to image converter online with confidential files?", answer: "Yes, 100% safe. Unlike traditional online converters that upload your confidential PDFs to remote web servers for background processing, our converter runs entirely in your local web browser. Your private tax forms, legal contracts, business plans, and medical records never leave your device, ensuring total data privacy and zero risk of interception." },
    { question: "Are there any file size limits or usage restrictions?", answer: "Our online PDF to image converter is completely free with no daily caps, no page count restrictions, and no watermarks added to your images. The practical file size limit is governed by your computer or mobile device's available memory, smoothly handling standard documents up to 50–100 MB." },
    { question: "Can I convert password-protected or encrypted PDF documents?", answer: "For security and compliance reasons, encrypted or password-protected PDF files cannot be decrypted automatically in the browser. You will need to unlock or remove the password from your PDF document before uploading it to convert pages into images." },
    { question: "Can I extract specific pages instead of converting the whole document?", answer: "Our converter renders all pages in the PDF sequentially, allowing you to preview and download only the specific page images you need individually. Alternatively, you can use our free PDF Split tool first to isolate specific page numbers, then convert those target pages to images." },
    { question: "Will the text in converted images remain searchable or copyable?", answer: "No. Once a PDF page is rasterized into a PNG or JPG image, vector glyphs and text layers become flat pixels. If you need machine-readable text extraction, use dedicated OCR (Optical Character Recognition) software. However, for visual previews, graphic design, social media, and slide presentations, high-resolution raster images are standard." }
  ],
  hi: [
    { question: "PDF से इमेज कनवर्टर क्या है और यह कैसे काम करता है?", answer: "यह एक टूल है जो PDF के प्रत्येक पेज को PNG या JPG जैसी डिजिटल इमेज में बदलता है। यह ब्राउज़र में Mozilla PDF.js इंजन का उपयोग करके उच्च रिज़ॉल्यूशन में रेंडर करता है।" },
    { question: "उच्च गुणवत्ता (High Quality) में PDF को इमेज में कैसे बदलें?", answer: "अपनी PDF फाइल चुनें, PNG प्रारूप चुनें और 'Convert to Images' पर क्लिक करें। टूल 2x स्केल पर रेंडर करता है जिससे अक्षर और चित्र एकदम स्पष्ट दिखते हैं।" },
    { question: "PDF को बदलते समय PNG और JPG में क्या अंतर है?", answer: "PNG एक दोषरहित (lossless) प्रारूप है जो रेखाचित्रों और टेक्स्ट के लिए सबसे अच्छा है। JPG का आकार बहुत छोटा होता है, जो फोटो और ईमेल के लिए उपयुक्त है।" },
    { question: "क्या गोपनीय फाइलों के साथ यह टूल सुरक्षित है?", answer: "हाँ, 100% सुरक्षित। सारा काम सीधे आपके ब्राउज़र में होता है। कोई भी फाइल किसी बाहरी सर्वर पर अपलोड नहीं की जाती है।" },
    { question: "क्या कोई फाइल साइज सीमा या दैनिक प्रतिबंध है?", answer: "यह टूल असीमित और मुफ़्त है। कोई वॉटरमार्क नहीं और कोई दैनिक सीमा नहीं है।" },
    { question: "क्या पासवर्ड लगी PDF को इमेज में बदला जा सकता है?", answer: "पासवर्ड-सुरक्षित PDF को पहले अनलॉक करना होगा, उसके बाद ही उसे इमेज में बदला जा सकता है।" },
    { question: "क्या पूरे दस्तावेज के बजाय केवल कुछ पेज बदले जा सकते हैं?", answer: "कनवर्टर सभी पेजों को रेंडर करता है, और आप अपनी पसंद के किसी भी पेज को अलग से डाउनलोड कर सकते हैं।" },
    { question: "क्या इमेज बनने के बाद टेक्स्ट सर्च किया जा सकेगा?", answer: "इमेज बनने के बाद टेक्स्ट पिक्सेल में बदल जाता है, इसलिए वह सीधे कॉपी या सर्च नहीं होता है।" }
  ],
  es: [
    { question: "¿Qué es un convertidor de PDF a imagen y cómo funciona?", answer: "Es una herramienta que renderiza cada página de un PDF como una imagen rasterizada en PNG o JPG mediante el motor Mozilla PDF.js directamente en tu navegador." },
    { question: "¿Cómo convertir PDF a imagen en alta calidad?", answer: "Sube el documento, selecciona el formato PNG y pulsa convertir. El motor renderiza a escala 2x para obtener máxima definición." },
    { question: "¿Cuál es la diferencia entre PNG y JPG?", answer: "PNG conserva líneas y textos con nitidez perfecta sin compresión; JPG reduce el tamaño de archivo significativamente." },
    { question: "¿Es seguro para documentos confidenciales?", answer: "100% seguro. No se transmiten datos a ningún servidor externo; el renderizado ocurre exclusivamente en tu dispositivo." },
    { question: "¿Existen límites de tamaño o restricciones de uso?", answer: "Uso libre e ilimitado, sin registros obligatorios ni marcas de agua en las imágenes generadas." },
    { question: "¿Se pueden convertir documentos con contraseña?", answer: "Es necesario desbloquear el archivo PDF antes de poder convertirlo a imagen." },
    { question: "¿Puedo descargar páginas individuales?", answer: "Sí, el sistema muestra todas las páginas para que descargues solo las que necesitas." },
    { question: "¿El texto de la imagen resultante sigue siendo seleccionable?", answer: "Al convertirse en imagen los vectores se convierten en píxeles, por lo que el texto no se puede copiar directamente." }
  ],
  fr: [
    { question: "Comment fonctionne la conversion de PDF en image ?", answer: "Chaque page du document est dessinée sur un canevas HTML5 local grâce au moteur PDF.js de Mozilla, garantissant une exécution rapide et privée." },
    { question: "Comment obtenir des images de très haute qualité ?", answer: "Sélectionnez le format PNG pour bénéficier d'un rendu à échelle 2x sans artefacts de compression." },
    { question: "Quelle est la différence entre PNG et JPG ?", answer: "PNG est sans perte et idéal pour le texte ; JPG offre des fichiers plus compacts pour le web et les e-mails." },
    { question: "Le traitement est-il confidentiel ?", answer: "Oui, totalement privé : aucun fichier n'est téléversé vers un quelconque serveur distant." },
    { question: "Y a-t-il des limites de conversion ?", answer: "Aucune limite de pages, aucun compte requis et aucun filigrane ajouté." },
    { question: "Peut-on convertir un PDF protégé par mot de passe ?", answer: "Le document doit être déverrouillé avant d'être converti en images." },
    { question: "Peut-on exporter des pages au choix ?", answer: "Toutes les pages sont prévisualisées, vous permettant de télécharger uniquement celles qui vous intéressent." },
    { question: "Le texte reste-t-il recherchable dans l'image ?", answer: "Une image matricielle ne conserve pas le texte sélectionnable, mais offre une fidélité visuelle parfaite." }
  ],
  de: [
    { question: "Wie funktioniert die PDF-zu-Bild-Konvertierung im Browser?", answer: "Die Seiten werden mithilfe von Mozilla PDF.js direkt auf HTML5-Canvas-Elemente gezeichnet und ohne Server-Beteiligung als PNG oder JPG ausgegeben." },
    { question: "Wie erhalte ich die bestmögliche Bildqualität?", answer: "Wählen Sie das PNG-Format. Unser Werkzeug skaliert auf 2-fache Auflösung für gestochen scharfe Schrift." },
    { question: "Was ist der Unterschied zwischen PNG und JPG?", answer: "PNG ist verlustfrei und perfekt für Diagramme; JPG spart Speicherplatz bei foto-reichen Dokumenten." },
    { question: "Ist die Konvertierung für vertrauliche Dokumente sicher?", answer: "Vollkommen sicher: Alle Prozesse verbleiben im Browser Ihres Rechners oder Mobilgeräts." },
    { question: "Gibt es Beschränkungen bei Dateigröße oder Seitenzahl?", answer: "Kostenlos und unbegrenzt nutzbar, ohne Wasserzeichen und ohne versteckte Kosten." },
    { question: "Können geschützte PDFs konvertiert werden?", answer: "Passwortgeschützte PDFs müssen vor dem Hochladen entsperrt werden." },
    { question: "Kann man nur bestimmte Seiten herunterladen?", answer: "Ja, Sie können gezielt einzelne Seitenansichten als Bild abspeichern." },
    { question: "Bleibt der Text in den Bildern durchsuchbar?", answer: "Nein, Bilddateien bestehen aus Pixeln; für durchsuchbaren Text ist OCR erforderlich." }
  ],
  pt: [
    { question: "Como funciona a conversão de PDF para imagem?", answer: "Renderiza cada página do PDF como uma imagem digital rasterizada (PNG ou JPG) usando o motor Mozilla PDF.js direto no navegador." },
    { question: "Como obter imagens em alta resolução?", answer: "Selecione o formato PNG. A renderização é feita em escala 2x para garantir nitidez impecável em textos e ilustrações." },
    { question: "Qual a diferença entre PNG e JPG?", answer: "PNG preserva detalhes sem compressão com perdas; JPG gera arquivos menores para compartilhamento rápido." },
    { question: "É seguro processar documentos com dados sensíveis?", answer: "Totalmente seguro: nenhum dado é transmitido para servidores remotos." },
    { question: "Existe limite de páginas ou cobrança?", answer: "Gratuito e sem limites, sem exigência de conta e sem marcas d'água nas imagens." },
    { question: "Arquivos com senha podem ser convertidos?", answer: "Remova a proteção por senha antes de realizar a conversão." },
    { question: "Posso baixar apenas páginas específicas?", answer: "Sim, você pode visualizar todas as páginas e baixar apenas as que desejar." },
    { question: "O texto das imagens continua pesquisável?", answer: "Ao converter para imagem os elementos viram pixels, não sendo possível copiar o texto diretamente." }
  ],
  it: [
    { question: "Come funziona la conversione da PDF a immagine?", answer: "Le pagine vengono elaborate con il motore Mozilla PDF.js e trasformate in immagini PNG o JPG direttamente nel tuo browser." },
    { question: "Come ottenere la massima qualità visiva?", answer: "Scegli il formato PNG per una conversione nitida con scala 2x ideale per documenti e grafici." },
    { question: "Qual è la differenza tra PNG e JPG?", answer: "PNG garantisce massima nitidezza senza perdite; JPG produce file più leggeri per invii rapidi." },
    { question: "I documenti sono protetti da sguardi indiscreti?", answer: "Sicurezza totale: nessuna informazione lascia la memoria del dispositivo." },
    { question: "Ci sono limiti di utilizzo o watermark?", answer: "Completamente gratuito, senza limiti d'uso e senza watermark." },
    { question: "È possibile convertire PDF protetti da password?", answer: "Sblocca il PDF prima di procedere alla conversione in immagini." },
    { question: "Posso scaricare singole pagine?", answer: "Certamente, puoi salvare individualmente le sole pagine di tuo interesse." },
    { question: "Il testo dell'immagine resta selezionabile?", answer: "No, il documento rasterizzato è composto da pixel, rendendo necessaria una scansione OCR per estrarre il testo." }
  ],
  ja: [
    { question: "PDF画像変換の仕組みと特長は？", answer: "Mozilla PDF.jsエンジンを活用し、ブラウザ内で各PDFページをHTML5キャンバスに高精度に描画してPNGやJPG画像として保存します。" },
    { question: "高画質で画像化するための推奨設定は？", answer: "PNG形式を選択すると2倍スケールで描画され、フォントの輪郭や図表がくっきりと鮮明に仕上がります。" },
    { question: "PNGとJPGの使い分けは？", answer: "文書や図面、プレゼン資料には劣化のないPNG、写真中心のPDFや容量を抑えたい場合はJPGが適しています。" },
    { question: "契約書などの個人情報を含むファイルでも安全ですか？", answer: "端末のブラウザ内で100%ローカル処理されるため、外部サーバーへのファイル流出のリスクがありません。" },
    { question: "ページ数制限や利用料金はありますか？", answer: "完全無料・無制限で利用でき、透かし（ウォーターマーク）も付加されません。" },
    { question: "パスワードがかかったPDFも変換できますか？", answer: "暗号化されたPDFはブラウザ上で直接解除できないため、事前にパスワードを解除してください。" },
    { question: "必要なページだけを選んで保存できますか？", answer: "変換後にすべてのページがプレビュー表示され、必要なページ画像だけを個別保存できます。" },
    { question: "画像化した後も文字のコピーや検索は可能ですか？", answer: "画像データ（ピクセル）に変換されるため、テキストの直接選択や検索はできなくなります。" }
  ],
  ko: [
    { question: "PDF 이미지 변환의 동작 원리는 무엇인가요?", answer: "Mozilla PDF.js 렌더링 엔진을 통해 브라우저에서 직접 각 페이지를 고해상도 PNG 또는 JPG 이미지로 추출합니다." },
    { question: "최상의 고화질로 변환하려면 어떻게 하나요?", answer: "PNG 포맷을 선택하면 2배 스케일(192 DPI)로 렌더링되어 텍스트와 도표가 선명하게 유지됩니다." },
    { question: "PNG와 JPG 포맷의 차이점은 무엇인가요?", answer: "PNG는 무손실 고화질로 텍스트와 도표에 적합하며, JPG는 용량이 작아 웹 공유 및 메일 전송에 유리합니다." },
    { question: "중요 문서 변환 시 보안상 안전한가요?", answer: "모든 작업이 사용자의 기기 브라우저에서만 처리되며 서버로 전송되지 않아 안심하고 이용할 수 있습니다." },
    { question: "파일 크기나 횟수 제한, 워터마크가 있나요?", answer: "비용 없이 무제한 이용 가능하며 결과 이미지에 어떠한 워터마크도 생성되지 않습니다." },
    { question: "비밀번호로 보호된 PDF도 변환되나요?", answer: "보안 문서의 경우 먼저 암호를 해제한 후 변환기를 사용해 주셔야 합니다." },
    { question: "특정 페이지만 골라서 다운로드할 수 있나요?", answer: "전체 페이지가 미리보기 형태로 렌더링되어 필요한 페이지 이미지만 개별 저장할 수 있습니다." },
    { question: "변환된 이미지에서 글자 복사가 가능한가요?", answer: "이미지 포맷 특성상 픽셀로 변환되므로 텍스트 복사는 불가능합니다." }
  ]
};

// ----------------------------------------------------------------------------
// 4. IMAGES TO PDF DATA
// ----------------------------------------------------------------------------
const imageToPdfMeta = {
  en: {
    name: 'Images to PDF',
    title: 'Images to PDF - Convert & Merge Images to PDF Online Free',
    metaTitle: 'Images to PDF - Convert & Merge Images to PDF Online Free',
    metaDescription: 'Convert images to PDF online for free. Merge JPG, PNG, and WebP images into a single multi-page PDF with our fast, private, browser-based images to PDF converter.',
    h1: 'Images to PDF Converter',
    description: 'Convert images to PDF online for free. Merge JPG, PNG, and WebP images into a single multi-page PDF with our fast, private, browser-based images to PDF converter.',
    shortDescription: 'Convert, merge, and arrange JPG, PNG, and WebP images into a multi-page PDF document online.'
  },
  hi: {
    name: 'इमेज से PDF कनवर्टर (Images to PDF)',
    title: 'इमेज से PDF कनवर्टर - JPG, PNG फोटो को PDF में बदलें',
    metaTitle: 'इमेज से PDF कनवर्टर - JPG, PNG फोटो को PDF में बदलें',
    metaDescription: 'तस्वीरों को मुफ़्त में PDF में बदलें। JPG, PNG और WebP को एक बहु-पृष्ठीय PDF में जोड़ें। तेज़, सुरक्षित और कोई वॉटरमार्क नहीं।',
    h1: 'इमेज से PDF कनवर्टर ऑनलाइन',
    description: 'तस्वीरों को मुफ़्त में PDF में बदलें। JPG, PNG और WebP को एक बहु-पृष्ठीय PDF में जोड़ें। तेज़, सुरक्षित और कोई वॉटरमार्क नहीं।',
    shortDescription: 'ब्राउज़र में JPG, PNG और WebP तस्वीरों को जोड़कर एकल PDF दस्तावेज बनाएं।'
  },
  es: {
    name: 'Convertidor de Imágenes a PDF (Images to PDF)',
    title: 'Imágenes a PDF - Convertir y Unir Fotos a PDF Online Gratis',
    metaTitle: 'Imágenes a PDF - Convertir y Unir Fotos a PDF Online Gratis',
    metaDescription: 'Convierte imágenes a PDF online gratis. Une fotos JPG, PNG y WebP en un solo documento PDF multipágina de forma rápida y segura.',
    h1: 'Convertir Imágenes a PDF Online',
    description: 'Convierte imágenes a PDF online gratis. Une fotos JPG, PNG y WebP en un solo documento PDF multipágina de forma rápida y segura.',
    shortDescription: 'Convierte y combina fotos JPG, PNG y WebP en un documento PDF multipágina en tu navegador.'
  },
  fr: {
    name: 'Images en PDF (Images to PDF)',
    title: 'Convertir Images en PDF - Fusionner Photos en PDF en Ligne Gratuit',
    metaTitle: 'Convertir Images en PDF - Fusionner Photos en PDF en Ligne Gratuit',
    metaDescription: 'Convertissez vos images en PDF gratuitement. Combinez JPG, PNG et WebP en un seul PDF multipage dans votre navigateur.',
    h1: 'Convertir Images en PDF en Ligne',
    description: 'Convertissez vos images en PDF gratuitement. Combinez JPG, PNG et WebP en un seul PDF multipage dans votre navigateur.',
    shortDescription: 'Fusionnez et convertissez vos photos JPG, PNG et WebP en un document PDF sans quitter votre navigateur.'
  },
  de: {
    name: 'Bilder in PDF Umwandeln (Images to PDF)',
    title: 'Bilder in PDF Umwandeln - JPG/PNG zu PDF Online Kostenlos',
    metaTitle: 'Bilder in PDF Umwandeln - JPG/PNG zu PDF Online Kostenlos',
    metaDescription: 'Bilder online kostenlos in PDF konvertieren. Fügen Sie JPG-, PNG- und WebP-Bilder zu einem mehrseitigen PDF zusammen.',
    h1: 'Bilder in PDF Umwandeln Online',
    description: 'Bilder online kostenlos in PDF konvertieren. Fügen Sie JPG-, PNG- und WebP-Bilder zu einem mehrseitigen PDF zusammen.',
    shortDescription: 'Fügen Sie Fotos und Bilddateien (JPG, PNG, WebP) zu einem einheitlichen PDF-Dokument zusammen.'
  },
  pt: {
    name: 'Imagens para PDF (Images to PDF)',
    title: 'Imagens para PDF - Converter e Juntar Fotos em PDF Online Grátis',
    metaTitle: 'Imagens para PDF - Converter e Juntar Fotos em PDF Online Grátis',
    metaDescription: 'Converta imagens em PDF online grátis. Combine fotos JPG, PNG e WebP em um único PDF de várias páginas com total privacidade.',
    h1: 'Converter Imagens em PDF Online',
    description: 'Converta imagens em PDF online grátis. Combine fotos JPG, PNG e WebP em um único PDF de várias páginas com total privacidade.',
    shortDescription: 'Transforme e junte imagens JPG, PNG e WebP em um PDF de várias páginas com total privacidade.'
  },
  it: {
    name: 'Da Immagini a PDF (Images to PDF)',
    title: 'Da Immagini a PDF - Converti e Unisci Foto in PDF Online Gratis',
    metaTitle: 'Da Immagini a PDF - Converti e Unisci Foto in PDF Online Gratis',
    metaDescription: 'Converti immagini in PDF online gratis. Unisci foto JPG, PNG e WebP in un unico PDF multipagina in modo rapido e sicuro.',
    h1: 'Converti Immagini in PDF Online',
    description: 'Converti immagini in PDF online gratis. Unisci foto JPG, PNG e WebP in un unico PDF multipagina in modo rapido e sicuro.',
    shortDescription: 'Unisci e trasforma immagini JPG, PNG e WebP in un PDF multipagina direttamente nel browser.'
  },
  ja: {
    name: '画像 PDF 変換 (Images to PDF)',
    title: '画像 PDF 変換 - JPGやPNG画像をPDFにオンライン無料変換・結合',
    metaTitle: '画像 PDF 変換 - JPGやPNG画像をPDFにオンライン無料変換・結合',
    metaDescription: '複数の画像（JPG、PNG、WebP）を1つの高品質PDFに無料結合。順番の並べ替えも簡単で完全安全。',
    h1: '画像 PDF 変換 オンライン',
    description: '複数の画像（JPG、PNG、WebP）を1つの高品質PDFに無料結合。順番の並べ替えも簡単で完全安全。',
    shortDescription: 'JPGやPNG、WebPなどの写真画像をまとめて1つの複数ページPDF文書に変換・結合します。'
  },
  ko: {
    name: '이미지를 PDF로 변환 (Images to PDF)',
    title: '이미지를 PDF로 변환 - JPG, PNG 사진을 PDF로 무료 변환 및 병합',
    metaTitle: '이미지를 PDF로 변환 - JPG, PNG 사진을 PDF로 무료 변환 및 병합',
    metaDescription: '여러 장의 사진(JPG, PNG, WebP)을 하나의 PDF 문서로 무료 변환하세요. 순서 재배치 가능, 브라우저 로컬 처리.',
    h1: '온라인 이미지 PDF 변환',
    description: '여러 장의 사진(JPG, PNG, WebP)을 하나의 PDF 문서로 무료 변환하세요. 순서 재배치 가능, 브라우저 로컬 처리.',
    shortDescription: '여러 장의 이미지 파일을 원하는 순서대로 배치하여 깔끔한 단일 PDF 문서로 생성합니다.'
  }
};

const imageToPdfFaqs = {
  en: [
    { question: "How do I convert images to PDF without losing quality?", answer: "Our Images to PDF converter embeds your pictures directly into the PDF document in their native resolution. It does not downsample or compress vector/raster pixels unnecessarily, meaning high-resolution scans, JPG photos, and PNG diagrams retain their crisp clarity and exact aspect ratios." },
    { question: "Can I merge multiple image formats (JPG, PNG, WebP) into a single PDF?", answer: "Yes! You can merge images to PDF regardless of whether they are JPG, JPEG, PNG, WebP, or GIF formats. You can mix and match portrait and landscape photos in a single batch, reorder them, and compile them into one continuous multi-page PDF." },
    { question: "Is this Images to PDF converter free and safe to use for sensitive documents?", answer: "Yes, this tool is 100% free and completely private. All processing takes place locally inside your web browser using client-side WebAssembly and JavaScript. Your photos, bank receipts, ID scans, and documents are never uploaded to our server or any cloud storage." },
    { question: "Can I rearrange the order of images before generating the PDF?", answer: "Yes. Once you select or drop your image files into the upload area, each image appears with up (↑) and down (↓) controls. You can organize the sequence of your photos so they appear in your exact required page order in the output PDF." },
    { question: "Is there a limit on how many images I can convert to PDF at once?", answer: "There are no artificial software limits. You can convert 10, 50, or 100+ images in a single session. The processing power relies solely on your device's browser memory." },
    { question: "Do I need to install any software or mobile app?", answer: "No installation or browser extension is required. This web utility runs directly on Google Chrome, Safari, Firefox, Edge, and mobile browsers on iOS and Android devices." },
    { question: "How are different image aspect ratios handled across PDF pages?", answer: "Each image is placed onto an individually sized PDF page that automatically adapts to the dimensions and orientation of the original picture. A vertical portrait document will generate a portrait page, and a widescreen landscape image will generate a landscape page seamlessly." },
    { question: "Why should I convert images to PDF instead of sending raw image files?", answer: "PDF documents preserve page order, prevent recipient layout distortion, are universally readable across all operating systems without specialized viewers, and can be easily printed or password protected." }
  ],
  hi: [
    { question: "गुणवत्ता खोए बिना तस्वीरों को PDF में कैसे बदलें?", answer: "हमारा टूल चित्रों को उनके मूल रिज़ॉल्यूशन में PDF में एम्बेड करता है। हाई-रिज़ॉल्यूशन स्कैन, JPG और PNG फोटो की स्पष्टता वैसी ही बनी रहती है।" },
    { question: "क्या विभिन्न फॉर्मेट (JPG, PNG, WebP) को एक ही PDF में जोड़ा जा सकता है?", answer: "हाँ! आप JPG, PNG, WebP आदि विभिन्न प्रकार की तस्वीरों को एक साथ चुनकर एकल PDF में बदल सकते हैं।" },
    { question: "क्या यह टूल मुफ़्त और संवेदनशील दस्तावेजों के लिए सुरक्षित है?", answer: "हाँ, 100% मुफ़्त और पूरी तरह निजी। सारी प्रोसेसिंग आपके ब्राउज़र में होती है और कोई भी फाइल सर्वर पर अपलोड नहीं होती।" },
    { question: "क्या PDF बनाने से पहले तस्वीरों का क्रम बदला जा सकता है?", answer: "हाँ, अपलोड करने के बाद आप ऊपर (↑) और नीचे (↓) बटन से फोटो का क्रम अपनी पसंद के अनुसार व्यवस्थित कर सकते हैं।" },
    { question: "एक बार में कितनी तस्वीरें जोड़ी जा सकती हैं?", answer: "कोई कृत्रिम सीमा नहीं है। आप एक बार में 10, 50 या 100 से अधिक तस्वीरें भी जोड़ सकते हैं।" },
    { question: "क्या कोई ऐप या सॉफ्टवेयर इंस्टॉल करना जरूरी है?", answer: "नहीं, यह सभी प्रमुख ब्राउज़रों (Chrome, Safari, Edge) और मोबाइल पर सीधे काम करता है।" },
    { question: "अलग-अलग ओरिएंटेशन (पोर्ट्रेट/लैंडस्केप) कैसे संभालते हैं?", answer: "प्रत्येक फोटो के अनुसार पेज का आकार और ओरिएंटेशन अपने आप अनुकूलित हो जाता है।" },
    { question: "अलग फोटो भेजने के बजाय PDF बनाना क्यों बेहतर है?", answer: "PDF में पेजों का क्रम सही रहता है, किसी भी डिवाइस पर आसानी से खुलता है और प्रिंट करना सुविधाजनक होता है।" }
  ],
  es: [
    { question: "¿Cómo convertir imágenes a PDF sin perder calidad?", answer: "El conversor inserta las imágenes con su resolución nativa, conservando la nitidez de fotos, comprobantes y escaneos." },
    { question: "¿Se pueden mezclar formatos JPG, PNG y WebP?", answer: "Sí, puedes combinar múltiples formatos en un solo documento PDF continuo." },
    { question: "¿Es seguro y gratuito para documentos importantes?", answer: "Completamente gratuito y privado. Todo se procesa de forma local en tu navegador." },
    { question: "¿Puedo ordenar las fotos antes de crear el PDF?", answer: "Sí, dispones de botones para subir o bajar cada imagen y definir el orden exacto de las páginas." },
    { question: "¿Hay un límite en el número de fotos a procesar?", answer: "No existen límites artificiales; depende únicamente de la memoria de tu dispositivo." },
    { question: "¿Requiere instalación de aplicaciones?", answer: "No requiere ninguna aplicación adicional; funciona directamente en navegadores de escritorio y móviles." },
    { question: "¿Cómo se gestionan las fotos horizontales y verticales?", answer: "Cada página se adapta automáticamente a la orientación y proporciones de la imagen original." },
    { question: "¿Por qué convertir a PDF en vez de enviar imágenes sueltas?", answer: "Un PDF garantiza el orden de lectura, universalidad en cualquier sistema operativo y facilidad de impresión." }
  ],
  fr: [
    { question: "Comment convertir sans perte de qualité ?", answer: "Les photos sont intégrées dans leur résolution d'origine sans recompression inutile." },
    { question: "Peut-on combiner différents formats (JPG, PNG, WebP) ?", answer: "Oui, vous pouvez regrouper des images de formats et d'orientations variés dans un seul fichier." },
    { question: "Le service est-il gratuit et sécurisé ?", answer: "100% gratuit et respectueux de la vie privée grâce à une exécution locale sans transfert distant." },
    { question: "Peut-on réorganiser les pages avant l'export ?", answer: "Oui, réordonnez vos images facilement à l'aide des flèches directionnelles." },
    { question: "Combien d'images peut-on fusionner ?", answer: "Aucune limite artificielle n'est imposée par le logiciel." },
    { question: "Faut-il installer un logiciel tiers ?", answer: "Aucune installation requise, tout fonctionne dans votre navigateur habituel." },
    { question: "Comment sont gérées les orientations portrait et paysage ?", answer: "Chaque page PDF s'adapte individuellement aux dimensions de chaque cliché." },
    { question: "Pourquoi préférer le format PDF aux images brutes ?", answer: "Le format PDF assure un ordre figé, une compatibilité universelle et une impression simplifiée." }
  ],
  de: [
    { question: "Wie konvertiere ich Bilder verlustfrei in PDF?", answer: "Die Bilder werden in ihrer Originalauflösung eingebettet, sodass Scans und Fotos gestochen scharf bleiben." },
    { question: "Können verschiedene Formate (JPG, PNG, WebP) kombiniert werden?", answer: "Ja, Sie können unterschiedliche Formate und Ausrichtungen in einem einzigen PDF zusammenfassen." },
    { question: "Ist das Tool kostenlos und sicher für sensible Dokumente?", answer: "Vollkommen kostenlos und sicher: Ihre Dokumente verlassen niemals Ihr Endgerät." },
    { question: "Kann die Reihenfolge der Seiten angepasst werden?", answer: "Ja, Sie können die Reihenfolge der Bilder vor der PDF-Erstellung frei sortieren." },
    { question: "Gibt es eine Begrenzung der Bildanzahl?", answer: "Nein, es gibt keine künstlichen Limits; auch Dutzende Bilder lassen sich in einem Durchgang verarbeiten." },
    { question: "Muss eine Software installiert werden?", answer: "Keine Installation nötig; das Tool läuft direkt in jedem modernen Webbrowser." },
    { question: "Wie werden Hoch- und Querformate verarbeitet?", answer: "Jede Seite passt sich automatisch den Abmessungen des jeweiligen Bildes an." },
    { question: "Warum ist ein PDF besser als einzelne Bilddateien?", answer: "Ein PDF sichert die korrekte Seitenreihenfolge und lässt sich auf allen Geräten bequem öffnen und drucken." }
  ],
  pt: [
    { question: "Como converter fotos em PDF sem perder qualidade?", answer: "As fotos são inseridas com resolução original, mantendo a clareza de comprovantes e documentos escaneados." },
    { question: "É possível juntar formatos diferentes (JPG, PNG, WebP)?", answer: "Sim, combine vários formatos e fotos verticais ou horizontais em um documento único." },
    { question: "O conversor é seguro para documentos pessoais?", answer: "100% seguro e privado. O processamento é realizado localmente pelo navegador." },
    { question: "Posso reorganizar a ordem antes de salvar o PDF?", answer: "Sim, use os controles de seta para definir a sequência perfeita das páginas." },
    { question: "Quantas imagens posso converter de uma vez?", answer: "Não há limites artificiais impostos pela ferramenta." },
    { question: "Preciso baixar algum programa?", answer: "Não é necessário nenhum software adicional; funciona direto no navegador." },
    { question: "Como funciona com fotos em formatos variados?", answer: "Cada página do PDF se ajusta automaticamente às proporções de cada foto." },
    { question: "Qual a vantagem de enviar em PDF em vez de fotos soltas?", answer: "O PDF mantém a ordem exata das páginas e facilita a visualização e impressão em qualquer sistema." }
  ],
  it: [
    { question: "Come trasformare immagini in PDF senza perdita di qualità?", answer: "Le immagini mantengono la loro risoluzione nativa garantendo documenti limpidi e nitidi." },
    { question: "Posso combinare formati differenti come JPG, PNG e WebP?", answer: "Sì, puoi unire tipi di file differenti in un unico file PDF multipagina." },
    { question: "È sicuro per ricevute, scontrini e documenti di identità?", answer: "Massima sicurezza: i file vengono convertiti nel browser senza alcun upload su cloud." },
    { question: "È possibile riordinare le foto prima di esportare?", answer: "Sì, puoi spostare ogni immagine in alto o in basso per stabilire la sequenza delle pagine." },
    { question: "C'è un limite al numero di immagini caricabili?", answer: "Nessun limite preimpostato, puoi unire liberamente decine di immagini insieme." },
    { question: "Occorre scaricare qualche programma o app?", answer: "Nessun download richiesto: funziona all'istante su qualunque browser web." },
    { question: "Come vengono gestite le foto orizzontali e verticali?", answer: "Ogni pagina si dimensiona in automatico in base alle proporzioni della singola immagine." },
    { question: "Perché è meglio inviare un PDF piuttosto che tante immagini?", answer: "Il PDF impedisce il disordine dei file e garantisce una perfetta compatibilità di stampa e lettura." }
  ],
  ja: [
    { question: "画質を落とさずに画像をPDF化するには？", answer: "画像を元の解像度のまま直接PDFに埋め込むため、領収書や書類のスキャン画像も細部まで鮮明に保たれます。" },
    { question: "JPG、PNG、WebPなど異なる形式を一度にまとめられますか？", answer: "はい。縦向き・横向きが混在していても、様々なフォーマットの画像を一括で1つのPDFに結合できます。" },
    { question: "個人情報や機密書類の変換も安全ですか？", answer: "端末のブラウザ内で完結して変換されるため、ファイルがサーバーに送信されることはなく完全に安全です。" },
    { question: "PDF作成前にページの順番を並べ替えられますか？", answer: "はい。アップロードした各画像の上下ボタンで、希望するページ順に簡単に並べ替えられます。" },
    { question: "一度に変換できる画像の枚数制限はありますか？", answer: "枚数制限はありません。お使いの端末のメモリに応じて数十枚以上の写真も一度に変換可能です。" },
    { question: "専用のソフトウェアやアプリのインストールは必要ですか？", answer: "不要です。パソコンやスマホのChrome、Safari、Edgeなど一般的なブラウザでそのまま動作します。" },
    { question: "縦長の書類と横長の写真が混ざっている場合はどうなりますか？", answer: "各ページが画像の縦横比に合わせて自動調整されるため、レイアウトが崩れる心配がありません。" },
    { question: "バラバラの画像を送信するよりPDFにまとめる利点は？", answer: "ページの順番が固定され、相手側のOSを選ばず閲覧や印刷が簡単に行えるメリットがあります。" }
  ],
  ko: [
    { question: "품질 손상 없이 이미지를 PDF로 변환하는 방법은?", answer: "사진을 원본 해상도 그대로 PDF에 삽입하므로 영수증이나 문서 스캔본의 선명도가 완벽하게 유지됩니다." },
    { question: "JPG, PNG, WebP 등 여러 포맷을 하나의 PDF로 묶을 수 있나요?", answer: "네! 가로/세로 방향이나 파일 형식에 상관없이 여러 장의 사진을 하나의 연속된 PDF 문서로 병합합니다." },
    { question: "개인정보나 신분증 등 중요한 서류도 안심하고 쓸 수 있나요?", answer: "모든 처리가 브라우저 로컬에서만 이루어지며 서버로 업로드되지 않으므로 철저한 보안이 보장됩니다." },
    { question: "PDF 생성 전에 사진 순서를 변경할 수 있나요?", answer: "네, 이미지 목록에서 위/아래 이동 버튼을 통해 원하는 페이지 순서로 손쉽게 재배열할 수 있습니다." },
    { question: "한 번에 변환할 수 있는 이미지 수량 제한이 있나요?", answer: "인위적인 제한이 없어 기기 메모리가 지원하는 한 수십 장 이상의 사진도 한 번에 변환 가능합니다." },
    { question: "별도의 앱이나 프로그램 설치가 필요한가요?", answer: "설치할 필요 없이 데스크톱과 모바일 브라우저에서 바로 동작합니다." },
    { question: "사진마다 비율과 방향이 다르면 어떻게 처리되나요?", answer: "각 사진의 고유한 가로세로 비율에 맞춰 PDF 페이지가 개별적으로 자동 맞춤 생성됩니다." },
    { question: "사진 파일을 낱개로 보내는 것보다 PDF가 좋은 이유는?", answer: "문서의 페이지 순서가 흐트러지지 않고, 모든 기기에서 동일하게 확인 및 인쇄할 수 있습니다." }
  ]
};

function generateContentHtml(title, desc, toolName, slug) {
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
      Related Free Online Tools
    </h3>
    <div class="flex flex-wrap gap-2 text-xs sm:text-sm">
      <a href="/free-online-tools/pdf-merge/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">PDF Merge →</a>
      <a href="/free-online-tools/pdf-split/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">PDF Split →</a>
      <a href="/free-online-tools/pdf-compress/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">PDF Compress →</a>
      <a href="/free-online-tools/pdf-to-image/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">PDF to Image →</a>
      <a href="/free-online-tools/image-to-pdf/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Images to PDF →</a>
      <a href="/free-online-tools/" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">All Free Online Tools →</a>
    </div>
  </section>
</div>`;
}

function buildToolData(slug, metaMap, faqsMap) {
  const locales = ['en', 'hi', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko'];
  const result = {};

  for (const loc of locales) {
    const meta = metaMap[loc] || metaMap.en;
    const faqs = faqsMap[loc] || faqsMap.en;
    const ui = UI_STRINGS[loc] || UI_STRINGS.en;

    result[loc] = {
      locale: loc,
      status: 'translated',
      name: meta.name,
      title: `${meta.name} | ${meta.name}`,
      metaTitle: meta.metaTitle,
      metaDescription: meta.metaDescription,
      h1: meta.h1,
      description: meta.description,
      shortDescription: meta.shortDescription,
      intro: meta.shortDescription,
      categoryLabel: 'Free Online Tools',
      formulaTitle: `${meta.name} Overview`,
      formulaDescription: meta.description,
      formulaEquation: '',
      variables: [],
      stepByStep: [],
      workedExample: {
        title: '',
        scenario: '',
        calculation: '',
        result: ''
      },
      faqs: faqs,
      ui: ui,
      contentHtml: generateContentHtml(meta.title, meta.description, meta.name, slug)
    };
  }

  return result;
}

const tools = [
  { slug: 'pdf-split', meta: pdfSplitMeta, faqs: pdfSplitFaqs },
  { slug: 'pdf-compress', meta: pdfCompressMeta, faqs: pdfCompressFaqs },
  { slug: 'pdf-to-image', meta: pdfToImageMeta, faqs: pdfToImageFaqs },
  { slug: 'image-to-pdf', meta: imageToPdfMeta, faqs: imageToPdfFaqs }
];

for (const tool of tools) {
  const toolData = buildToolData(tool.slug, tool.meta, tool.faqs);
  const outPath = path.join(dataDir, `${tool.slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(toolData, null, 2) + '\n', 'utf8');
  console.log(`✓ Successfully generated ${tool.slug}.json with all 9 locales!`);
}
