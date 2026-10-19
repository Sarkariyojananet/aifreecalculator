// scripts/builders/pdf-part1.mjs
// Part 1: pdf-merge, pdf-split, pdf-compress, pdf-to-image, image-to-pdf

export const pdfPart1 = {
  'pdf-merge': {
    name: 'PDF Merge',
    formulaTitle: {
      en: 'Client-Side Binary PDF Stream Concatenation & Object Mapping',
      hi: 'क्लाइंट-साइड बाइनरी पीडीएफ स्ट्रीम संयोजन और ऑब्जेक्ट मैपिंग',
      es: 'Concatenación de Flujos Binarios PDF y Mapeo de Objetos en Cliente',
      ja: 'クライアントサイドPDFバイナリストリーム結合とオブジェクトマッピング',
      fr: 'Concaténation de Flux Binaires PDF et Mappage d’Objets Côté Client',
      de: 'Clientseitige PDF-Stream-Zusammenführung & Objektreferenzierung',
      pt: 'Concatenação de Streams Binários de PDF e Mapeamento de Objetos no Navegador',
      ko: '클라이언트 측 바이너리 PDF 스트림 병합 및 객체 트리 매핑',
      it: 'Concatenazione Stream Binari PDF e Mappatura Oggetti Lato Client'
    },
    formulaDescription: {
      en: 'The merger parses multiple PDF ArrayBuffers using pdf-lib in browser memory. It creates a blank PDFDocument, iterates through each source document to copy target pages via copyPages(), updates cross-reference (xref) tables, re-indexes internal dictionary object references, and serializes the merged output to Uint8Array without sending files across the network.',
      hi: 'यह टूल ब्राउज़र मेमोरी में pdf-lib लाइब्रेरी द्वारा कई पीडीएफ ArrayBuffer को प्रोसेस करता है। यह एक नया PDFDocument बनाकर copyPages() के ज़रिये सभी पेजों को क्रमबद्ध रूप से जोड़ता है, आंतरिक संदर्भ तालिकाओं (xref) को री-इंडेक्स करता है और बिना किसी सर्वर पर भेजे सीधे आपके डिवाइस पर नई पीडीएफ तैयार करता है।',
      es: 'El combinador analiza múltiples ArrayBuffers de PDF mediante pdf-lib en la memoria del navegador. Crea un nuevo PDFDocument, copia páginas con copyPages(), reconstruye las tablas de referencias cruzadas (xref) y genera un Uint8Array descargable sin transferir archivos a ningún servidor externo.',
      ja: '本ツールはブラウザのメモリ内でpdf-libを用いて複数のPDFバイナリ（ArrayBuffer）を解析します。新規PDFDocumentを生成し、copyPages()で各ページの辞書オブジェクトと相互参照テーブル（xref）を安全に再構築して統合PDFを生成。データは外部に送信されません。',
      fr: 'Le fusionneur analyse les ArrayBuffers de vos PDF via pdf-lib dans la mémoire du navigateur. Il initialise un nouveau PDFDocument, copie les pages via copyPages(), recalcule la table des références croisées (xref) et sérialise le document sans aucun transfert vers un serveur.',
      de: 'Der Zusammenführer analysiert mehrere PDF-ArrayBuffers mit pdf-lib im Arbeitsspeicher des Browsers. Er erstellt ein neues PDFDocument, kopiert Seiten via copyPages(), aktualisiert die Querverweistabellen (xref) und serialisiert die Ausgabe als Uint8Array vollständig lokal.',
      pt: 'O mesclador processa múltiplos ArrayBuffers de PDF usando pdf-lib na memória do navegador. Cria um novo PDFDocument, copia páginas via copyPages(), recalcula a tabela de referências cruzadas (xref) e exporta um arquivo Uint8Array sem qualquer upload.',
      ko: '본 병합기는 브라우저 메모리 상에서 pdf-lib를 활용하여 복수의 PDF ArrayBuffer를 파싱합니다. 신규 PDFDocument를 생성하고 copyPages()를 통해 페이지 트리를 복사한 뒤 상호참조 테이블(xref)을 갱신하여 서버 통신 없이 즉시 단일 PDF로 내보냅니다.',
      it: 'Il programma analizza molteplici ArrayBuffer di PDF tramite pdf-lib nella memoria locale. Crea un nuovo PDFDocument, copia le pagine con copyPages(), aggiorna la tabella dei riferimenti incrociati (xref) e serializza l’output finale in locale senza trasmettere file a server remoti.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Documents', instruction: 'Select or drag two or more PDF documents into the upload area.' },
        { stepNumber: 2, title: 'Reorder Document Sequence', instruction: 'Drag and drop or use Move Up/Down buttons to arrange files in your desired reading order.' },
        { stepNumber: 3, title: 'Click Merge PDFs', instruction: 'Initiate in-browser page tree concatenation and cross-reference table indexing.' },
        { stepNumber: 4, title: 'Download Merged PDF', instruction: 'Save the unified document locally to your computer or mobile device.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइलें अपलोड करें', instruction: 'दो या दो से अधिक पीडीएफ फाइलों को अपलोड बॉक्स में चुनें या खींचें।' },
        { stepNumber: 2, title: 'पेज क्रम व्यवस्थित करें', instruction: 'दस्तावेजों को अपनी इच्छानुसार ऊपर या नीचे ले जाकर सही क्रम में सेट करें।' },
        { stepNumber: 3, title: 'मर्ज पीडीएफ पर क्लिक करें', instruction: 'ब्राउज़र में सीधे पेजों को जोड़ने की प्रक्रिया शुरू करें।' },
        { stepNumber: 4, title: 'संयुक्त पीडीएफ डाउनलोड करें', instruction: 'तैयार एकीकृत पीडीएफ फाइल को अपने डिवाइस पर सुरक्षित सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir documentos PDF', instruction: 'Seleccione o arrastre dos o más archivos PDF al área de carga.' },
        { stepNumber: 2, title: 'Ordenar secuencia', instruction: 'Organice el orden de los archivos usando los botones de subir o bajar.' },
        { stepNumber: 3, title: 'Combinar archivos', instruction: 'Inicie la unión y reindexación de páginas en la memoria del navegador.' },
        { stepNumber: 4, title: 'Descargar PDF final', instruction: 'Guarde el documento resultante de inmediato en su dispositivo.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルを追加', instruction: '結合したい2つ以上のPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '表示順序を並べ替え', instruction: '結合順に合わせてファイルカードを上下に移動して順序を整えます。' },
        { stepNumber: 3, title: '結合を実行', instruction: '「PDFを結合」をクリックし、ブラウザ内で高速ストリームマージ処理を開始します。' },
        { stepNumber: 4, title: '結合PDFを保存', instruction: '結合が完了したPDFファイルをローカルストレージにダウンロードします。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer vos fichiers PDF', instruction: 'Sélectionnez ou glissez-déposez au moins deux documents PDF dans la zone dédiée.' },
        { stepNumber: 2, title: 'Organiser l’ordre des documents', instruction: 'Ajustez l’ordre des fichiers à l’aide des boutons Monter/Descendre.' },
        { stepNumber: 3, title: 'Fusionner les PDF', instruction: 'Lancez l’assemblage local des pages et des dictionnaires PDF.' },
        { stepNumber: 4, title: 'Télécharger le document', instruction: 'Enregistrez le document complet fusionné directement sur votre appareil.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Dateien hinzufügen', instruction: 'Wählen oder ziehen Sie mindestens zwei PDF-Dokumente in den Upload-Bereich.' },
        { stepNumber: 2, title: 'Reihenfolge festlegen', instruction: 'Verschieben Sie die Dateien nach oben oder unten, um die gewünschte Seitenabfolge zu erzielen.' },
        { stepNumber: 3, title: 'PDFs zusammenführen', instruction: 'Starten Sie die lokale Zusammenführung und Neuindizierung im Browser.' },
        { stepNumber: 4, title: 'Zusammengefügtes PDF speichern', instruction: 'Laden Sie das fertige Gesamt-PDF direkt auf Ihren Rechner oder Ihr Mobilgerät herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Adicionar ficheiros PDF', instruction: 'Selecione ou arraste dois ou mais documentos PDF para a área de carregamento.' },
        { stepNumber: 2, title: 'Organizar a ordem', instruction: 'Utilize os botões para mover os arquivos para cima ou para baixo conforme a ordem final.' },
        { stepNumber: 3, title: 'Mesclar documentos', instruction: 'Clique em Mesclar para unir as páginas na memória local do navegador.' },
        { stepNumber: 4, title: 'Baixar PDF final', instruction: 'Guarde o documento consolidado diretamente no seu computador ou telemóvel.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 업로드', instruction: '병합할 2개 이상의 PDF 파일을 선택하거나 드래그하여 추가합니다.' },
        { stepNumber: 2, title: '문서 순서 정렬', instruction: '위/아래 이동 버튼을 사용하여 최종 병합본에 표시될 문서 순서를 지정합니다.' },
        { stepNumber: 3, title: 'PDF 병합 실행', instruction: '브라우저 메모리에서 객체 트리 복사 및 결합 처리를 시작합니다.' },
        { stepNumber: 4, title: '완성본 다운로드', instruction: '병합이 완료된 단일 PDF 파일을 기기에 안전하게 다운로드합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica documenti PDF', instruction: 'Seleziona o trascina due o più file PDF nell’apposita area.' },
        { stepNumber: 2, title: 'Ordina i documenti', instruction: 'Modifica la sequenza di unione spostando i file su o giù.' },
        { stepNumber: 3, title: 'Unisci PDF', instruction: 'Avvia la concatenazione e reindicizzazione delle pagine nel browser.' },
        { stepNumber: 4, title: 'Scarica PDF unito', instruction: 'Salva il nuovo documento combinato sul tuo computer o smartphone.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Merging Quarterly Financial Statements',
        scenario: 'A finance manager has four individual quarterly audit reports (Q1 to Q4, 15 pages each) and wants to merge them into a single 60-page annual dossier.',
        calculation: 'The tool reads all 4 files (total size 18 MB), instantiates a master PDFDocument, extracts pages 1–15 from each document sequentially, updates page parent pointers, and writes the 60-page PDF binary.',
        result: 'A unified 60-page annual financial report produced in 1.4 seconds with zero server data exposure.'
      },
      hi: {
        title: 'तिमाही वित्तीय रिपोर्टों का एकीकरण',
        scenario: 'एक एकाउंटेंट के पास 4 अलग-अलग तिमाही ऑडिट रिपोर्ट (प्रत्येक 15 पेज) हैं और उन्हें 60 पेजों की एक वार्षिक फाइल में जोड़ना है।',
        calculation: 'टूल ने चारों फाइलों (कुल 18 MB) को पढ़ा, मास्टर डॉक्यूमेंट में सभी 60 पेजों को क्रमानुसार जोड़ा और नई पीडीएफ तैयार की।',
        result: 'मात्र 1.4 सेकंड में बिना किसी सर्वर पर डाटा भेजे 60 पेजों की वार्षिक रिपोर्ट तैयार हो गई।'
      },
      es: {
        title: 'Unificación de informes trimestrales',
        scenario: 'Un gestor financiero tiene 4 informes trimestrales (15 páginas cada uno) y necesita consolidarlos en un único documento anual de 60 páginas.',
        calculation: 'La herramienta lee los 4 archivos (18 MB en total), copia las 60 páginas de forma secuencial en un nuevo PDF y recalcula las tablas xref.',
        result: 'Documento anual unificado de 60 páginas generado en 1,4 segundos sin enviar datos fuera del equipo.'
      },
      ja: {
        title: '四半期財務報告書の統合実例',
        scenario: '経理担当者が4つの四半期レポート（各15ページ）を、1つの年次報告書（計60ページ）として連結したい場合。',
        calculation: '4ファイル（合計18MB）をブラウザ内で読み込み、ページツリーを順次連結して相互参照テーブルを再構築。',
        result: '外部サーバーへ送信することなく、わずか1.4秒で完全な60ページの統合年次報告書が完成。'
      },
      fr: {
        title: 'Fusion de bilans financiers trimestriels',
        scenario: 'Un analyste dispose de 4 rapports trimestriels de 15 pages chacun et souhaite créer un unique rapport annuel de 60 pages.',
        calculation: 'L’outil charge les 4 documents (18 Mo au total), copie séquentiellement les 60 pages dans un nouveau PDF et réindexe les objets.',
        result: 'Rapport complet de 60 pages obtenu en 1,4 seconde en toute confidentialité.'
      },
      de: {
        title: 'Zusammenführung von Quartalsberichten',
        scenario: 'Ein Finanzleiter möchte 4 Quartalsberichte (je 15 Seiten) zu einem lückenlosen Jahresbericht mit 60 Seiten zusammenfassen.',
        calculation: 'Das Tool lädt die 4 Dateien (insgesamt 18 MB), fügt die 60 Seiten nacheinander in ein neues PDF-Dokument ein und aktualisiert die Baumstruktur.',
        result: 'Vollständiger 60-seitiger Jahresbericht innerhalb von 1,4 Sekunden ohne Datenweitergabe erstellt.'
      },
      pt: {
        title: 'Consolidação de Relatórios Trimestrais',
        scenario: 'Um gestor precisa unificar quatro relatórios de 15 páginas cada em um único dossiê anual de 60 páginas.',
        calculation: 'A ferramenta lê os 4 ficheiros (18 MB), copia as 60 páginas em sequência e recria a tabela de referências.',
        result: 'Relatório anual de 60 páginas gerado em 1,4 segundos com privacidade absoluta.'
      },
      ko: {
        title: '분기별 재무 보고서 병합 예시',
        scenario: '재무 담당자가 4개의 분기별 보고서(각 15페이지)를 하나의 60페이지 연간 종합 보고서로 취합하고자 합니다.',
        calculation: '4개 파일(총 18MB)을 브라우저 메모리에 로드하고 60페이지를 순차 결합하여 객체 트리를 재생성합니다.',
        result: '외부 유출 위험 없이 1.4초 만에 60페이지 연간 보고서 병합 완료.'
      },
      it: {
        title: 'Unione di rendiconti trimestrali',
        scenario: 'Un responsabile contabile deve unire quattro report trimestrali da 15 pagine ciascuno in un fascicolo unico di 60 pagine.',
        calculation: 'Il sistema carica i 4 file (18 MB totali), unisce le 60 pagine e corregge i puntatori di catalogo.',
        result: 'Documento completo di 60 pagine creato in 1,4 secondi nel totale rispetto della riservatezza.'
      }
    },
    faqs: [
      {
        question: 'Are my confidential documents uploaded to an external server?',
        answer: 'No. Processing is executed 100% locally in your web browser using client-side JavaScript. Your confidential contracts, financial statements, and personal records never leave your device.'
      },
      {
        question: 'Is there a limit on file size or the number of PDFs I can merge?',
        answer: 'There is no artificial quota. However, because processing uses local browser RAM, we recommend keeping combined file sizes under 150 MB on mobile devices or 300 MB on desktop computers to avoid browser memory saturation.'
      },
      {
        question: 'Can I merge password-protected or encrypted PDF documents?',
        answer: 'No. Password-protected documents have encrypted content streams that prevent page extraction. Please unlock or decrypt the documents using our Unlock PDF tool before merging.'
      },
      {
        question: 'Does merging compress or degrade the quality of text and graphics?',
        answer: 'No. Pages are copied verbatim as vector stream objects. Typography, vector curves, bookmarks, and embedded images retain their exact original resolution and fidelity.'
      }
    ]
  },

  'pdf-split': {
    name: 'PDF Split',
    formulaTitle: {
      en: 'Selective Page Tree Extraction & Cross-Reference Truncation',
      hi: 'चयनात्मक पेज ट्री निष्कर्षण और संदर्भ विभाजन',
      es: 'Extracción Selectiva de Árbol de Páginas y División de Referencias',
      ja: '選択的ページツリー抽出とクロスリファレンス分離技術',
      fr: 'Extraction Sélective de l’Arbre de Pages et Séparation des Références',
      de: 'Selektive Seitenbaum-Extraktion & Querverweis-Trennung',
      pt: 'Extração Seletiva da Árvore de Páginas e Divisão de Referências',
      ko: '선택적 페이지 트리 추출 및 상호참조 분할 아키텍처',
      it: 'Estrazione Selettiva dell’Albero delle Pagine e Troncatura Riferimenti'
    },
    formulaDescription: {
      en: 'The splitter loads the target PDF document into browser memory via pdf-lib, traverses the document Pages catalog tree, clones only specified page indexes into discrete PDFDocument instances, isolates font and resource dictionaries, and exports independent PDF binaries.',
      hi: 'यह टूल ब्राउज़र में pdf-lib की मदद से आपकी मूल पीडीएफ फाइल को पढ़ता है, चुने गए पेजों के इंडेक्स को नए PDFDocument में क्लोन करता है और बिना किसी सर्वर पर डाटा भेजे स्वतंत्र अलग-अलग पीडीएफ फाइलों में बांट देता है।',
      es: 'El divisor carga el documento en la memoria local mediante pdf-lib, recorre el árbol de páginas, clona únicamente los índices de página indicados en nuevos documentos independientes y exporta los archivos resultantes.',
      ja: '本スプリッターはpdf-libを使い、指定されたページインデックスのみを新規PDFDocumentインスタンスに安全に複製。不要なメタデータや無関係なページリソースを排除した独立PDFファイルを生成します。',
      fr: 'Le diviseur charge le document dans la mémoire du navigateur, clone uniquement les pages ciblées dans de nouveaux conteneurs PDF et génère des fichiers allégés et autonomes.',
      de: 'Der Teiler lädt die Datei in den Browserspeicher, isoliert die angegebenen Seitenindizes in neuen Dokumentinstanzen und erzeugt eigenständige PDF-Dateien ohne Serverinteraktion.',
      pt: 'O divisor lê o documento na memória local, clona apenas as páginas selecionadas para instâncias separadas e produz arquivos PDF independentes com total segurança.',
      ko: '본 분할기는 pdf-lib를 통해 페이지 카탈로그 트리를 탐색하고, 사용자가 지정한 페이지 인덱스만 새 PDFDocument로 복제하여 독립적인 PDF 바이너리로 추출합니다.',
      it: 'Il programma analizza l’albero delle pagine tramite pdf-lib, estrae selettivamente gli intervalli specificati e genera nuovi file PDF del tutto indipendenti in locale.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your PDF file or select it from your local storage.' },
        { stepNumber: 2, title: 'Define Page Range or Split Mode', instruction: 'Specify page numbers (e.g., "1-5, 8, 12-15") or choose to extract every page as an individual file.' },
        { stepNumber: 3, title: 'Execute Separation', instruction: 'Click Split PDF to isolate target pages into standalone documents in browser memory.' },
        { stepNumber: 4, title: 'Download Extracted Files', instruction: 'Download your separated PDF file or a ZIP bundle containing all split documents.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल चुनें', instruction: 'अपनी पीडीएफ फाइल को अपलोड क्षेत्र में खींचें या चुनें।' },
        { stepNumber: 2, title: 'पेज रेंज या मोड चुनें', instruction: 'आवश्यक पेज नंबर दर्ज करें (उदा. "1-5, 8") या हर पेज को अलग करने का विकल्प चुनें।' },
        { stepNumber: 3, title: 'विभाजन शुरू करें', instruction: 'स्प्लिट पीडीएफ पर क्लिक करें और ब्राउज़र में पेजों को अलग करें।' },
        { stepNumber: 4, title: 'अलग की गई फाइल डाउनलोड करें', instruction: 'निकाली गई पीडीएफ फाइल या सभी पेजों की जिप फाइल डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar archivo PDF', instruction: 'Arrastre su documento o selecciónelo desde el explorador de archivos.' },
        { stepNumber: 2, title: 'Definir páginas o rangos', instruction: 'Indique los números de página deseados (ej. "1-4, 7") o extraiga cada página.' },
        { stepNumber: 3, title: 'Dividir documento', instruction: 'Haga clic en Dividir PDF para crear los nuevos archivos en la memoria local.' },
        { stepNumber: 4, title: 'Descargar resultados', instruction: 'Guarde el PDF extraído o el archivo comprimido ZIP con todos los documentos.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルをアップロード', instruction: '分割したいPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '分割範囲を指定', instruction: '抽出したいページ番号（例: 1-5, 8）を入力するか、全ページ分割を選択します。' },
        { stepNumber: 3, title: '分割を実行', instruction: '「PDFを分割」をクリックしてブラウザ内でのページ抽出を開始します。' },
        { stepNumber: 4, title: '分割ファイルを保存', instruction: '抽出されたPDF、または全ページがまとまったZIPファイルをダウンロードします。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Charger le fichier PDF', instruction: 'Importez votre document PDF depuis votre ordinateur ou appareil mobile.' },
        { stepNumber: 2, title: 'Sélectionner les pages', instruction: 'Indiquez les intervalles de pages souhaités (ex. 1-3, 5) ou séparez chaque page.' },
        { stepNumber: 3, title: 'Lancer l’extraction', instruction: 'Cliquez sur Diviser le PDF pour générer les nouveaux documents en mémoire.' },
        { stepNumber: 4, title: 'Télécharger les fichiers', instruction: 'Récupérez votre document extrait ou l’archive ZIP complète.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Dokument hochladen', instruction: 'Ziehen Sie die PDF-Datei in den Arbeitsbereich oder wählen Sie diese aus.' },
        { stepNumber: 2, title: 'Seitenbereich definieren', instruction: 'Geben Sie gewünschte Seitenzahlen ein (z. B. 1-5, 9) oder wählen Sie Einzelseiten-Export.' },
        { stepNumber: 3, title: 'Teilung durchführen', instruction: 'Klicken Sie auf PDF teilen, um die Seiten lokal im Speicher zu isolieren.' },
        { stepNumber: 4, title: 'Ergebnis herunterladen', instruction: 'Speichern Sie das extrahierte Dokument oder das ZIP-Paket auf Ihrem Gerät.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar ficheiro PDF', instruction: 'Selecione ou arraste o seu PDF para o formulário de upload.' },
        { stepNumber: 2, title: 'Definir intervalo de páginas', instruction: 'Indique as páginas pretendidas (ex: 1-4, 7) ou divida todas as páginas.' },
        { stepNumber: 3, title: 'Dividir ficheiro', instruction: 'Clique em Dividir PDF para extrair as páginas na memória do navegador.' },
        { stepNumber: 4, title: 'Baixar arquivos', instruction: 'Transfira o PDF recortado ou o pacote ZIP com todos os documentos divididos.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 선택', instruction: '분할하고자 하는 PDF 문서를 끌어다 놓거나 선택하여 불러옵니다.' },
        { stepNumber: 2, title: '페이지 범위 지정', instruction: '추출할 페이지 번호(예: 1-5, 8)를 입력하거나 개별 분할 모드를 선택합니다.' },
        { stepNumber: 3, title: '분할 시작', instruction: 'PDF 분할 버튼을 클릭하여 브라우저 로컬에서 안전하게 추출합니다.' },
        { stepNumber: 4, title: '분할본 다운로드', instruction: '추출된 PDF 파일 또는 전체 페이지 압축 ZIP 파일을 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica file PDF', instruction: 'Trascina il tuo documento o selezionalo dalla memoria del dispositivo.' },
        { stepNumber: 2, title: 'Specifica pagine o intervallo', instruction: 'Inserisci le pagine da estrarre (es. 1-3, 6) o separa tutte le pagine.' },
        { stepNumber: 3, title: 'Dividi PDF', instruction: 'Avvia l’isolamento e il salvataggio dei singoli fogli nel browser.' },
        { stepNumber: 4, title: 'Scarica i documenti', instruction: 'Scarica il file PDF estratto oppure il pacchetto ZIP completo.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Extracting an Executive Summary from an Annual Report',
        scenario: 'A researcher needs only pages 3 through 7 from an 85-page comprehensive market analysis report to email to stakeholders.',
        calculation: 'The splitter inspects the 85-page PDF, creates a new PDF document, clones page references for index [2, 3, 4, 5, 6], retains embedded chart vectors, and outputs a 5-page PDF.',
        result: 'A lightweight 5-page executive summary PDF created in 0.8 seconds without exposing the full confidential dossier.'
      },
      hi: {
        title: 'वार्षिक रिपोर्ट से कार्यकारी सारांश निकालना',
        scenario: 'एक शोधकर्ता को 85 पेजों की बड़ी मार्केट रिपोर्ट में से केवल पेज 3 से 7 तक की जरूरत है ताकि वह इसे टीम को भेज सके।',
        calculation: 'टूल ने 85 पेजों की फाइल में से पेज 3 से 7 को चुना, केवल इन्हीं 5 पेजों को नए दस्तावेज में क्लोन किया और शेष पेजों को छोड़ दिया।',
        result: 'मात्र 0.8 सेकंड में 5 पेजों का हल्का और केंद्रित दस्तावेज तैयार हुआ, जिससे पूरी गोपनीय फाइल सुरक्षित रही।'
      },
      es: {
        title: 'Extracción de resumen ejecutivo de informe anual',
        scenario: 'Un analista necesita únicamente las páginas 3 a 7 de un informe de 85 páginas para enviarlo por correo electrónico.',
        calculation: 'La herramienta extrae los índices 2 a 6 del PDF original, mantiene los gráficos vectoriales y genera un archivo de 5 páginas.',
        result: 'Documento ligero de 5 páginas obtenido en 0,8 segundos protegiendo la confidencialidad del informe completo.'
      },
      ja: {
        title: '年次レポートから要約ページのみを抽出',
        scenario: '全85ページの市場調査資料から、役員会議用に3〜7ページのみを抽出して送付したい場合。',
        calculation: '85ページのPDFを読み込み、指定された5ページ分のみを新規ドキュメントにクローンし、容量を最適化。',
        result: '機密を含む全体ファイルを送信することなく、0.8秒で5ページの軽量PDFを抽出完了。'
      },
      fr: {
        title: 'Extraction de la synthèse d’un rapport d’activité',
        scenario: 'Un consultant souhaite extraire uniquement les pages 3 à 7 d’un document de 85 pages pour diffusion restreinte.',
        calculation: 'L’outil isole les 5 pages demandées, conserve les polices vectorielles et produit un PDF autonome.',
        result: 'Fichier léger de 5 pages généré en 0,8 seconde sans téléversement de données.'
      },
      de: {
        title: 'Auszug einer Management-Zusammenfassung',
        scenario: 'Ein Berater benötigt aus einem 85-seitigen Geschäftsbericht lediglich die Seiten 3 bis 7 für eine Kundenpräsentation.',
        calculation: 'Das Tool klont die 5 Zielseiten in ein neues PDF-Dokument und entfernt alle überflüssigen Ressourcen.',
        result: 'Kompakte 5-seitige Auszug-PDF in 0,8 Sekunden lokal auf dem Gerät erstellt.'
      },
      pt: {
        title: 'Extração de Sumário Executivo',
        scenario: 'Um consultor precisa apenas das páginas 3 a 7 de um relatório de 85 páginas para enviar por e-mail.',
        calculation: 'O utilitário clona as 5 páginas indicadas mantendo vetores e fontes, descartando as 80 páginas restantes.',
        result: 'PDF leve de 5 páginas criado em 0,8 segundos com segurança total.'
      },
      ko: {
        title: '85페이지 보고서에서 핵심 요약 페이지만 추출',
        scenario: '연구원이 85페이지에 달하는 방대한 연례 보고서 중 이메일 공유용으로 3페이지부터 7페이지까지만 추출하려 합니다.',
        calculation: '85페이지 원본에서 대상 5페이지만 골라내어 새 문서로 복제하고 독립적인 PDF로 렌더링합니다.',
        result: '전체 원본 노출 없이 0.8초 만에 5페이지 분량의 경량 PDF 파일 생성 완료.'
      },
      it: {
        title: 'Estrazione di sintesi da bilancio aziendale',
        scenario: 'Un consulente deve inviare via email solo le pagine da 3 a 7 di un fascicolo di bilancio da 85 pagine.',
        calculation: 'Il software estrae le 5 pagine specificate, preserva i grafici vettoriali e crea un nuovo file leggero.',
        result: 'PDF mirato di 5 pagine ottenuto in 0,8 secondi senza caricare il file su alcun server.'
      }
    },
    faqs: [
      {
        question: 'Does splitting a PDF damage the internal formatting or font rendering?',
        answer: 'No. Target pages are cloned along with their embedded font sub-tables and vector descriptions, guaranteeing identical rendering to the original document.'
      },
      {
        question: 'How do I specify multiple distinct page ranges?',
        answer: 'You can use commas and hyphens in the page input field (for example: "1-3, 5, 8-10"). The tool will extract only the specified pages in the order provided.'
      },
      {
        question: 'Is my file processed locally on my computer?',
        answer: 'Yes, 100% locally. The document is parsed in your browser memory via pdf-lib and is never uploaded to any remote server or third-party cloud.'
      },
      {
        question: 'Can I split a scanned PDF that has no selectable text?',
        answer: 'Yes. The tool operates at the PDF page container level, splitting scanned image pages just as cleanly as native digital vector pages.'
      }
    ]
  },

  'pdf-compress': {
    name: 'PDF Compress',
    formulaTitle: {
      en: 'In-Browser FlateDecode Stream Optimization & Redundant Object Pruning',
      hi: 'इन-ब्राउज़र FlateDecode स्ट्रीम अनुकूलन और रिडंडेंट ऑब्जेक्ट प्रूनिंग',
      es: 'Optimización de Flujos FlateDecode y Eliminación de Objetos Redundantes',
      ja: 'ブラウザ内FlateDecodeストリーム最適化と冗長オブジェクト削減技術',
      fr: 'Optimisation des Flux FlateDecode et Suppression des Objets Redondants',
      de: 'Lokale FlateDecode-Stream-Optimierung & Entfernung redundanter Objekte',
      pt: 'Otimização de Streams FlateDecode e Limpeza de Objetos Redundantes',
      ko: '브라우저 내 FlateDecode 스트림 최적화 및 중복 객체 제거 아키텍처',
      it: 'Ottimizzazione Stream FlateDecode e Rimozione Oggetti Ridondanti'
    },
    formulaDescription: {
      en: 'The compressor inspects internal PDF dictionaries to eliminate orphaned objects, duplicate font descriptors, unreferenced metadata packets, and structural white-space. It re-encodes raw content streams using FlateDecode deflation while preserving vector glyph coordinates and text searchability.',
      hi: 'यह टूल पीडीएफ के आंतरिक ढांचे का विश्लेषण करता है और गैर-जरूरी मेटाडेटा, डुप्लिकेट फॉन्ट डिस्क्रिप्टर और खाली जगह को हटा देता है। यह FlateDecode डिफ्लेशन के ज़रिये टेक्स्ट और वेक्टर क्वालिटी को बनाए रखते हुए फाइल का वजन काफी कम कर देता है।',
      es: 'El compresor examina los diccionarios internos del PDF para eliminar objetos huérfanos, fuentes duplicadas y metadatos innecesarios, reempaquetando los flujos mediante FlateDecode sin perder nitidez vectorial.',
      ja: '本ツールはPDFの内部辞書構造をスキャンし、孤立した未参照オブジェクト、重複フォント、不要なメタデータを削除。FlateDecodeによる可逆圧縮を適用してベクターの鮮明さを保ちながらファイルサイズを削減します。',
      fr: 'Le compresseur analyse l’arborescence du PDF pour purger les métadonnées obsolètes, les polices redondantes et les objets orphelins. Il recompacte les flux via l’algorithme FlateDecode sans dégrader les vecteurs.',
      de: 'Der Kompressor prüft interne PDF-Strukturen, eliminiert ungenutzte Metadaten und doppelte Schriftressourcen und komprimiert Datenströme mittels FlateDecode ohne Qualitätsverlust bei Vektorgrafiken.',
      pt: 'O compressor examina a estrutura interna do PDF para remover metadados desnecessários e fontes duplicadas, recomprimindo os fluxos de conteúdo via FlateDecode sem perder a definição de texto.',
      ko: '본 압축기는 PDF 내부 객체를 정밀 분석하여 고립된 오브젝트, 중복 폰트 테이블, 불필요한 메타데이터를 제거하고 FlateDecode 압축을 통해 텍스트 검색 가능성과 벡터 품질을 온전히 유지합니다.',
      it: 'Il compressore ispeziona i dizionari interni del PDF per rimuovere metadati superflui e oggetti orfani, ricompattando i flussi con FlateDecode senza intaccare la nitidezza del testo vettoriale.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your PDF into the upload area or click to browse.' },
        { stepNumber: 2, title: 'Select Compression Level', instruction: 'Choose Low (structure cleanup), Medium (recommended for web sharing), or High (aggressive stream compacting).' },
        { stepNumber: 3, title: 'Click Compress PDF', instruction: 'Execute client-side stream optimization and dictionary cleanup.' },
        { stepNumber: 4, title: 'Download Compressed Document', instruction: 'Review the file size savings and save the optimized PDF to your device.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल अपलोड करें', instruction: 'अपनी भारी पीडीएफ फाइल को अपलोड बॉक्स में चुनें या खींचें।' },
        { stepNumber: 2, title: 'कम्प्रेशन स्तर चुनें', instruction: 'कम (हल्की सफाई), मध्यम (दैनिक उपयोग के लिए उत्तम), या उच्च (सरकारी पोर्टल अपलोड हेतु) चुनें।' },
        { stepNumber: 3, title: 'कंप्रेस पीडीएफ पर क्लिक करें', instruction: 'ब्राउज़र में सीधे फाइल का आकार कम करने की प्रक्रिया शुरू करें।' },
        { stepNumber: 4, title: 'छोटी पीडीएफ डाउनलोड करें', instruction: 'आकार में हुई कमी की जांच करें और अनुकूलित पीडीएफ सुरक्षित डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir archivo PDF', instruction: 'Arrastre o seleccione el documento que desea reducir de peso.' },
        { stepNumber: 2, title: 'Elegir nivel de compresión', instruction: 'Seleccione Bajo, Medio (óptimo para web y correos) o Alto (máxima reducción).' },
        { stepNumber: 3, title: 'Comprimir PDF', instruction: 'Ejecute la optimización de flujos y eliminación de datos residuales.' },
        { stepNumber: 4, title: 'Descargar archivo optimizado', instruction: 'Compruebe el ahorro de espacio y guarde el documento.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルを選択', instruction: '容量を小さくしたいPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '圧縮レベルを選択', instruction: '低（構造整理）、中（メール添付推奨）、高（最大サイズ削減）から選択します。' },
        { stepNumber: 3, title: '圧縮を開始', instruction: '「PDFを圧縮」をクリックしてブラウザ内での最適化処理を実行します。' },
        { stepNumber: 4, title: '最適化PDFをダウンロード', instruction: '削減された容量を確認し、圧縮済みPDFを保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Sélectionner le document PDF', instruction: 'Glissez-déposez votre fichier volumineux dans l’espace de chargement.' },
        { stepNumber: 2, title: 'Choisir le profil de compression', instruction: 'Optez pour Faible, Moyen (recommandé pour emails) ou Élevé (taille minimale).' },
        { stepNumber: 3, title: 'Compresser le PDF', instruction: 'Lancez le nettoyage des flux et des objets orphelins dans le navigateur.' },
        { stepNumber: 4, title: 'Télécharger le fichier allégé', instruction: 'Vérifiez le gain de taille et téléchargez le document optimisé.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Datei hochladen', instruction: 'Ziehen Sie die zu komprimierende PDF in den Upload-Bereich.' },
        { stepNumber: 2, title: 'Komprimierungsstufe wählen', instruction: 'Wählen Sie Niedrig, Mittel (ideal für E-Mail) oder Hoch (maximale Ersparnis).' },
        { stepNumber: 3, title: 'Kompression starten', instruction: 'Optimieren Sie Datenströme und Metadaten direkt im lokalen Speicher.' },
        { stepNumber: 4, title: 'Komprimierte PDF speichern', instruction: 'Prüfen Sie die Dateigrößenreduktion und laden Sie das Ergebnis herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar documento PDF', instruction: 'Arraste o ficheiro pesado para a zona de carregamento.' },
        { stepNumber: 2, title: 'Escolher nível de compressão', instruction: 'Selecione Baixo, Médio (ideal para partilha) ou Alto (redução máxima).' },
        { stepNumber: 3, title: 'Comprimir PDF', instruction: 'Inicie a compactação de fluxos diretamente no navegador.' },
        { stepNumber: 4, title: 'Baixar PDF reduzido', instruction: 'Confira a percentagem economizada e transfira o documento.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 업로드', instruction: '용량을 줄이고자 하는 PDF 문서를 드래그하거나 선택하여 불러옵니다.' },
        { stepNumber: 2, title: '압축 강도 선택', instruction: '낮음, 보통(이메일 전송 추천), 높음(포털 업로드 규격 맞춤) 중 선택합니다.' },
        { stepNumber: 3, title: '압축 실행', instruction: '브라우저 메모리에서 스트림 최적화 및 중복 데이터 정리를 진행합니다.' },
        { stepNumber: 4, title: '최적화 파일 다운로드', instruction: '줄어든 용량을 확인하고 최종 PDF를 기기에 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica file PDF', instruction: 'Trascina il documento pesante nell’area di caricamento.' },
        { stepNumber: 2, title: 'Seleziona livello di compressione', instruction: 'Scegli tra Basso, Medio (ideale per invio email) o Alto (massima riduzione).' },
        { stepNumber: 3, title: 'Comprimi PDF', instruction: 'Avvia l’ottimizzazione locale dei flussi e dei metadati.' },
        { stepNumber: 4, title: 'Scarica PDF ottimizzato', instruction: 'Verifica la percentuale di spazio risparmiata e salva il file.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Optimizing a Scanned Document for Government Portal Upload',
        scenario: 'An applicant has an 8.2 MB scanned document that exceeds the strict 2.0 MB upload cap on an employment portal.',
        calculation: 'The tool parses the document stream, cleans redundant metadata, deflates embedded raster blocks, and rebuilds xref indices.',
        result: 'File size drops from 8.2 MB to 1.4 MB (83% reduction) with text remaining perfectly sharp and compliant with portal constraints.'
      },
      hi: {
        title: 'सरकारी पोर्टल के लिए स्कैन किए गए दस्तावेज को छोटा करना',
        scenario: 'एक अभ्यर्थी के पास 8.2 MB का स्कैन किया हुआ दस्तावेज है जिसे भर्ती पोर्टल पर अपलोड करने के लिए 2.0 MB से कम करना है।',
        calculation: 'टूल ने पीडीएफ की आंतरिक संरचना का विश्लेषण किया, गैर-जरूरी मेटाडेटा हटाया और FlateDecode संपीड़न लागू किया।',
        result: 'फाइल का आकार 8.2 MB से घटकर मात्र 1.4 MB (83% की कमी) रह गया और सभी अक्षर बिल्कुल स्पष्ट रहे।'
      },
      es: {
        title: 'Optimización de expediente para portal oficial',
        scenario: 'Un usuario dispone de un documento escaneado de 8,2 MB que supera el límite de 2,0 MB exigido en un trámite público.',
        calculation: 'El compresor elimina metadatos obsoletos, comprime flujos binarios y reorganiza la estructura interna.',
        result: 'El tamaño se reduce de 8,2 MB a 1,4 MB (83% de ahorro), manteniendo una legibilidad impecable.'
      },
      ja: {
        title: '行政ポータル提出用PDFの容量削減実例',
        scenario: '提出制限が2.0MBまでの就職申請ポータルに、8.2MBのスキャンPDFをアップロードしたい場合。',
        calculation: '内部の冗長なメタデータや未参照オブジェクトを削除し、データストリームを最適再圧縮。',
        result: '文字の鮮明さを保ったまま、8.2MBから1.4MB（83%削減）へ劇的に圧縮し、提出基準をクリア。'
      },
      fr: {
        title: 'Compression d’un dossier pour portail administratif',
        scenario: 'Un candidat doit téléverser un dossier de 8,2 Mo sur un portail limité à 2,0 Mo maximum.',
        calculation: 'L’outil purge les métadonnées inutiles, optimise les flux internes et réorganise les dictionnaires.',
        result: 'Le fichier passe de 8,2 Mo à 1,4 Mo (83 % d’économie) avec un rendu de texte impeccable.'
      },
      de: {
        title: 'Optimierung für Portal-Uploads mit Größenbegrenzung',
        scenario: 'Eine Bewerbungsunterlage ist 8,2 MB groß, darf aber maximal 2,0 MB für den Upload im Behördenportal betragen.',
        calculation: 'Das Tool bereinigt interne Metadaten, deflatiert Binärströme und reorganisiert die Querverweistabellen.',
        result: 'Größenreduktion von 8,2 MB auf 1,4 MB (83 % Ersparnis) bei voller Lesbarkeit und Textschärfe.'
      },
      pt: {
        title: 'Otimização de Documento para Portal de Concurso',
        scenario: 'Um candidato tem um arquivo de 8,2 MB que precisa ficar abaixo de 2,0 MB para validação em edital.',
        calculation: 'A ferramenta remove metadados desnecessários e recompacta os fluxos binários.',
        result: 'Tamanho cai de 8,2 MB para 1,4 MB (83% de redução), pronto para submissão imediata.'
      },
      ko: {
        title: '공공기관 채용 포털 서류 업로드 용량 최적화',
        scenario: '지원자의 스캔 증빙 서류 용량이 8.2MB여서 채용 사이트의 2.0MB 제한을 초과하는 상황입니다.',
        calculation: '내부 구조를 분석하여 불필요한 메타데이터와 중복 스트림을 제거하고 FlateDecode 압축을 수행합니다.',
        result: '문서 품질 손상 없이 용량이 8.2MB에서 1.4MB(83% 절감)로 감소하여 규격 내 업로드 성공.'
      },
      it: {
        title: 'Ottimizzazione per caricamento su portale pubblico',
        scenario: 'Un utente deve caricare un documento da 8,2 MB su un portale che impone il limite massimo di 2,0 MB.',
        calculation: 'Lo strumento elimina i metadaten ridondanti, comprime i flussi binari e ricompila gli indici.',
        result: 'Il peso scende da 8,2 MB a 1,4 MB (-83%) con caratteri perfettamente definiti e leggibili.'
      }
    },
    faqs: [
      {
        question: 'Will compressing my PDF make text blurry or unreadable?',
        answer: 'No. Our algorithm prioritizes structural stream deflation and object pruning. Native vector text and fonts remain 100% crisp and searchable at any zoom level.'
      },
      {
        question: 'Why did my PDF size barely decrease after compression?',
        answer: 'If your PDF is already heavily optimized or contains pre-compressed high-density JPEG scans, further structural compression yields minimal gains without downsampling raster images.'
      },
      {
        question: 'Is it safe to compress tax forms or legal agreements here?',
        answer: 'Yes, completely safe. The compression routine runs entirely in your local browser environment using JavaScript. Your files are never sent to our servers or stored in the cloud.'
      },
      {
        question: 'Can I compress encrypted or password-protected PDF files?',
        answer: 'Encrypted PDFs cannot have their stream structures rebuilt without unlocking. Please remove the password using Unlock PDF before running compression.'
      }
    ]
  },

  'pdf-to-image': {
    name: 'PDF to Image',
    formulaTitle: {
      en: 'PDF.js Rasterization Engine & Canvas Export Pipeline',
      hi: 'PDF.js रास्टराइज़ेशन इंजन और कैनवास निर्यात पाइपलाइन',
      es: 'Motor de Rasterización PDF.js y Flujo de Exportación Canvas',
      ja: 'PDF.jsラスタライズエンジンとCanvasエクスポートパイプライン',
      fr: 'Moteur de Rastérisation PDF.js et Pipeline d’Exportation Canvas',
      de: 'PDF.js-Rasterisierungs-Engine & Canvas-Export-Pipeline',
      pt: 'Motor de Rasterização PDF.js e Pipeline de Exportação Canvas',
      ko: 'PDF.js 래스터화 렌더링 엔진 및 Canvas 이미지 내보내기 구조',
      it: 'Motore di Rasterizzazione PDF.js e Pipeline di Esportazione Canvas'
    },
    formulaDescription: {
      en: 'The converter utilizes Mozilla PDF.js to parse PDF font programs, vector paths, and raster XObjects into an off-screen HTML5 Canvas at selected DPI scales (72, 150, or 300 DPI). Each page is serialized into high-fidelity PNG or JPG image blobs entirely in browser memory.',
      hi: 'यह टूल मोज़िला की PDF.js लाइब्रेरी का उपयोग करके पीडीएफ पेजों, फोंट और वेक्टर ग्राफिक्स को HTML5 कैनवास पर 72, 150 या 300 DPI में प्रस्तुत (render) करता है। प्रत्येक पेज को बिना सर्वर पर अपलोड किए स्थानीय रूप से उच्च गुणवत्ता वाले PNG या JPG इमेज में बदल दिया जाता है।',
      es: 'El conversor emplea PDF.js de Mozilla para renderizar rutas vectoriales y fuentes en un lienzo HTML5 con la resolución elegida (72, 150 o 300 DPI), exportando cada página como imagen PNG o JPG en la memoria local.',
      ja: '本変換器はMozilla PDF.jsエンジンを活用し、PDF内のフォントやベクターパスを指定解像度（72/150/300 DPI）でHTML5 Canvas上に精密描画。各ページを外部通信なしでPNGやJPG画像として書き出します。',
      fr: 'Le convertisseur utilise le moteur PDF.js de Mozilla pour restituer les vecteurs et polices sur un Canvas HTML5 à la résolution sélectionnée, puis exporte chaque page en PNG ou JPG de haute définition.',
      de: 'Der Konverter nutzt Mozilla PDF.js, um Vektoren und Schriften auf einem HTML5-Canvas mit frei wählbarer DPI-Zahl darzustellen. Jede Seite wird rein lokal als hochauflösendes PNG oder JPG exportiert.',
      pt: 'O conversor utiliza a biblioteca PDF.js para desenhar trajetos vetoriais e fontes num Canvas HTML5 na resolução indicada (72, 150 ou 300 DPI), gerando imagens PNG ou JPG no navegador.',
      ko: '본 변환기는 Mozilla PDF.js 엔진을 활용하여 PDF 내의 벡터 경로와 폰트 글리프를 선택된 해상도(72, 150, 300 DPI)의 HTML5 Canvas에 정밀 렌더링한 후 고품질 PNG/JPG 이미지로 추출합니다.',
      it: 'Il convertitore adotta PDF.js di Mozilla per renderizzare percorsi vettoriali e font su Canvas HTML5 alla risoluzione desiderata (72, 150 o 300 DPI), esportando le pagine come immagini PNG o JPG locali.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your PDF file into the converter area or click to browse.' },
        { stepNumber: 2, title: 'Choose Output Format and DPI', instruction: 'Select PNG (lossless clarity) or JPG (smaller file size) and choose your preferred resolution (150 or 300 DPI).' },
        { stepNumber: 3, title: 'Render Pages', instruction: 'Click Convert to Image to rasterize all PDF pages to canvas in browser memory.' },
        { stepNumber: 4, title: 'Download Image Files', instruction: 'Download individual page images or grab all rendered pages in a single ZIP package.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल अपलोड करें', instruction: 'अपनी पीडीएफ फाइल को कनवर्टर बॉक्स में खींचें या चुनें।' },
        { stepNumber: 2, title: 'फॉर्मेट और DPI चुनें', instruction: 'PNG (उत्कृष्ट स्पष्टता) या JPG (छोटा आकार) चुनें और अपनी पसंद का DPI (150 या 300) सेट करें।' },
        { stepNumber: 3, title: 'इमेज में बदलें', instruction: 'कन्वर्ट पर क्लिक करें और ब्राउज़र में पेजों को इमेज के रूप में रेंडर करें।' },
        { stepNumber: 4, title: 'फोटो डाउनलोड करें', instruction: 'व्यक्तिगत पेज फोटो या सभी पेजों की जिप फाइल को आसानी से सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir archivo PDF', instruction: 'Arrastre o seleccione el documento que desea convertir a imagen.' },
        { stepNumber: 2, title: 'Elegir formato y DPI', instruction: 'Seleccione PNG o JPG y establezca la resolución de salida (150 o 300 DPI).' },
        { stepNumber: 3, title: 'Rasterizar páginas', instruction: 'Inicie la conversión para dibujar las páginas en el lienzo del navegador.' },
        { stepNumber: 4, title: 'Descargar imágenes', instruction: 'Guarde las páginas por separado o descargue un archivo ZIP con todas las imágenes.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルをアップロード', instruction: '画像化したいPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '画像形式とDPIを選択', instruction: '高画質なPNGまたは容量の小さいJPGを選び、解像度（150または300 DPI）を指定します。' },
        { stepNumber: 3, title: '画像への変換を実行', instruction: '「画像に変換」をクリックしてブラウザ内Canvasレンダリングを開始します。' },
        { stepNumber: 4, title: '画像ファイルを保存', instruction: '個別ページのダウンロード、または全ページをまとめたZIP形式で保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer le document PDF', instruction: 'Sélectionnez ou glissez votre document dans le champ prévu à cet effet.' },
        { stepNumber: 2, title: 'Sélectionner le format et la résolution', instruction: 'Choisissez PNG ou JPG, et réglez la résolution souhaitée (150 ou 300 DPI).' },
        { stepNumber: 3, title: 'Lancer la conversion', instruction: 'Cliquez sur Convertir en image pour restituer chaque page sur le Canvas.' },
        { stepNumber: 4, title: 'Télécharger les images', instruction: 'Enregistrez les pages individuellement ou téléchargez l’ensemble dans une archive ZIP.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Datei bereitstellen', instruction: 'Ziehen Sie die PDF-Datei in das Konverterfenster oder wählen Sie diese aus.' },
        { stepNumber: 2, title: 'Format und DPI einstellen', instruction: 'Wählen Sie PNG oder JPG sowie die gewünschte Druck- oder Webauflösung.' },
        { stepNumber: 3, title: 'Seiten in Bilder umwandeln', instruction: 'Klicken Sie auf In Bild konvertieren, um die Seiten im Browser zu zeichnen.' },
        { stepNumber: 4, title: 'Bilder herunterladen', instruction: 'Laden Sie Einzelseiten oder das komplette ZIP-Paket aller Seiten herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar ficheiro PDF', instruction: 'Selecione ou arraste o seu PDF para a área de conversão.' },
        { stepNumber: 2, title: 'Definir formato e resolução', instruction: 'Escolha PNG ou JPG e configure a resolução pretendida (150 ou 300 DPI).' },
        { stepNumber: 3, title: 'Converter para imagem', instruction: 'Inicie a renderização das páginas no Canvas do navegador.' },
        { stepNumber: 4, title: 'Baixar imagens', instruction: 'Descarregue imagens avulsas ou o pacote ZIP com todas as páginas.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 업로드', instruction: '이미지로 변환할 PDF 문서를 선택하거나 작업 창으로 끌어옵니다.' },
        { stepNumber: 2, title: '이미지 포맷 및 DPI 선택', instruction: 'PNG 또는 JPG를 선택하고 필요한 해상도(150 또는 300 DPI)를 설정합니다.' },
        { stepNumber: 3, title: '이미지 렌더링 시작', instruction: '이미지 변환 버튼을 클릭하여 브라우저 Canvas에서 래스터화를 진행합니다.' },
        { stepNumber: 4, title: '이미지 파일 다운로드', instruction: '각 페이지별 이미지 또는 전체 페이지가 포함된 ZIP 파일을 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica file PDF', instruction: 'Trascina il documento PDF nella casella o selezionalo dal dispositivo.' },
        { stepNumber: 2, title: 'Seleziona formato e DPI', instruction: 'Scegli il formato PNG o JPG e imposta la risoluzione desiderata (150 o 300 DPI).' },
        { stepNumber: 3, title: 'Converti in immagine', instruction: 'Avvia il rendering delle pagine sul Canvas del browser.' },
        { stepNumber: 4, title: 'Scarica le immagini', instruction: 'Salva le immagini delle singole pagine oppure scarica l’archivio ZIP completo.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Converting an Infographic PDF into Social Media PNGs',
        scenario: 'A content creator has a 2-page graphic PDF and needs crisp 300 DPI PNG graphics to share on professional networks.',
        calculation: 'The tool renders page 1 and page 2 at 300 DPI (2480 x 3508 pixels each) onto HTML5 Canvas elements and converts them into lossless PNG image blobs.',
        result: 'Two ultra-sharp 300 DPI PNG images generated in 2.1 seconds without any privacy leak or third-party server exposure.'
      },
      hi: {
        title: 'इन्फोग्राफिक पीडीएफ को सोशल मीडिया PNG में बदलना',
        scenario: 'एक क्रिएटर के पास 2 पेज की ग्राफिक पीडीएफ है और उसे सोशल मीडिया पर पोस्ट करने के लिए 300 DPI की स्पष्ट PNG तस्वीरें चाहिए।',
        calculation: 'टूल ने दोनों पेजों को 300 DPI (2480 x 3508 पिक्सल) पर कैनवास में रेंडर किया और लॉसलेस PNG इमेज तैयार की।',
        result: 'मात्र 2.1 सेकंड में दो अल्ट्रा-शार्प PNG फोटो तैयार हो गईं, वह भी बिना किसी सर्वर पर डाटा भेजे।'
      },
      es: {
        title: 'Conversión de infografía PDF en imágenes PNG',
        scenario: 'Un diseñador dispone de un PDF de 2 páginas y necesita imágenes PNG nítidas a 300 DPI para redes sociales.',
        calculation: 'El conversor renderiza ambas páginas a 300 DPI (2480 x 3508 px) en el lienzo y genera los archivos PNG sin pérdidas.',
        result: 'Dos imágenes PNG de alta definición creadas en 2,1 segundos con total privacidad.'
      },
      ja: {
        title: 'インフォグラフィックPDFをSNS用PNG画像に変換',
        scenario: '2ページのグラフィックPDF資料を、SNS投稿用に鮮明な300DPIのPNG画像として保存したい場合。',
        calculation: 'HTML5 Canvas上で各ページを300DPI（2480×3508ピクセル）でラスタライズし、高精細PNGバイナリを生成。',
        result: '外部サーバーを介さず、わずか2.1秒で超高精細なPNG画像2枚の出力を完了。'
      },
      fr: {
        title: 'Conversion d’une infographie PDF en images PNG',
        scenario: 'Un responsable communication souhaite extraire 2 pages d’un PDF en fichiers PNG haute résolution (300 DPI) pour LinkedIn.',
        calculation: 'L’outil dessine chaque page à 300 DPI (2480 x 3508 pixels) sur le Canvas et exporte des fichiers PNG sans perte.',
        result: 'Deux images PNG d’une netteté parfaite générées en 2,1 secondes en local.'
      },
      de: {
        title: 'PDF-Infografik in hochwertige Social-Media-PNGs umwandeln',
        scenario: 'Ein Designer benötigt aus einem 2-seitigen PDF gestochen scharfe 300-DPI-Bilder für Marketingkanäle.',
        calculation: 'Das Tool rasterisiert die Seiten mit 300 DPI (2480 x 3508 Pixel) im HTML5-Canvas und exportiert verlustfreie PNG-Dateien.',
        result: 'Zwei brillante PNG-Dateien innerhalb von 2,1 Sekunden rein lokal erzeugt.'
      },
      pt: {
        title: 'Conversão de Infográfico PDF em Imagens PNG',
        scenario: 'Um designer precisa de duas páginas em formato PNG a 300 DPI para publicação em redes sociais.',
        calculation: 'A ferramenta desenha as páginas a 300 DPI (2480 x 3508 px) no Canvas e exporta os arquivos PNG.',
        result: 'Duas imagens PNG de altíssima nitidez geradas em 2,1 segundos sem envio de dados a servidores.'
      },
      ko: {
        title: '인포그래픽 PDF를 고해상도 SNS용 PNG로 변환',
        scenario: '디자이너가 2페이지짜리 PDF 문서를 선명한 300 DPI PNG 이미지로 변환하여 소셜 미디어에 게시하려 합니다.',
        calculation: '각 페이지를 300 DPI(2480 x 3508 픽셀) 해상도로 Canvas에 렌더링하고 무손실 PNG 블롭으로 변환합니다.',
        result: '외부 유출 없이 2.1초 만에 초고해상도 PNG 이미지 2장 생성 완료.'
      },
      it: {
        title: 'Conversione di infografica PDF in immagini PNG nitide',
        scenario: 'Un grafico deve convertire un PDF di 2 pagine in immagini PNG a 300 DPI per la condivisione online.',
        calculation: 'Il programma esegue il rendering a 300 DPI (2480 x 3508 pixel) su Canvas HTML5 ed estrae i file PNG senza compressione.',
        result: 'Due immagini PNG nitide generate in 2,1 secondi senza inviare dati al server.'
      }
    },
    faqs: [
      {
        question: 'Should I choose PNG or JPG format for my extracted pages?',
        answer: 'Choose PNG if your PDF contains diagrams, text, sharp lines, or screenshots to preserve maximum clarity. Choose JPG if the pages contain photographs and you need smaller file sizes.'
      },
      {
        question: 'What resolution should I select (72, 150, or 300 DPI)?',
        answer: '72 DPI is suitable for standard screen viewing, 150 DPI is balanced for presentations and web sharing, and 300 DPI is optimal for high-quality printing and graphic publishing.'
      },
      {
        question: 'Are my pages uploaded to an external image-processing server?',
        answer: 'No. The conversion is performed 100% on your device using Mozilla PDF.js inside your browser. No files are transmitted to any remote server.'
      },
      {
        question: 'How many pages can I convert at one time?',
        answer: 'You can convert documents with dozens of pages. However, for extremely large documents (100+ pages) at 300 DPI, we recommend converting in batches to prevent browser RAM limits.'
      }
    ]
  },

  'image-to-pdf': {
    name: 'Image to PDF',
    formulaTitle: {
      en: 'Client-Side jsPDF Geometric Layout & Binary Object Boxing',
      hi: 'क्लाइंट-साइड jsPDF ज्यामितीय लेआउट और बाइनरी ऑब्जेक्ट बॉक्सिंग',
      es: 'Diseño Geométrico jsPDF y Empaquetado Binario en Cliente',
      ja: 'クライアントサイドjsPDF幾何配置とバイナリオブジェクト格納構造',
      fr: 'Mise en Page Géométrique jsPDF et Encapsulation Binaire Côté Client',
      de: 'Clientseitiges jsPDF-Geometrielayout & Binärobjekt-Boxing',
      pt: 'Layout Geométrico jsPDF e Empacotamento Binário no Navegador',
      ko: '클라이언트 측 jsPDF 기하학적 배치 및 바이너리 객체 패키징 구조',
      it: 'Layout Geometrico jsPDF e Incapsulamento Binario Lato Client'
    },
    formulaDescription: {
      en: 'The converter reads uploaded JPG, PNG, and WebP images, determines native aspect ratios, scales pixel dimensions into standard millimeter page formats (A4 or US Letter) via jsPDF, encapsulates raster byte buffers into PDF image XObjects, and generates a printable PDF document in local memory.',
      hi: 'यह टूल अपलोड की गई JPG, PNG या WebP तस्वीरों को पढ़ता है, उनके आस्पेक्ट रेशियो की गणना करता है और jsPDF के माध्यम से मिलीमीटर में मानक A4 या लेटर पेज पर व्यवस्थित करता है। यह बिना किसी सर्वर का उपयोग किए सीधे ब्राउज़र मेमोरी में प्रिंट-तैयार पीडीएफ बनाता है।',
      es: 'El conversor lee imágenes JPG, PNG o WebP, calcula su relación de aspecto, escala las dimensiones a formatos estándar (A4 o Carta) con jsPDF e inserta los mapas de bits en un archivo PDF descargable.',
      ja: '本変換器はJPG/PNG/WebP画像を読み込み、アスペクト比を自動算出。jsPDFを用いてA4やレター規格のページ枠内にミリ単位でスケーリング配置し、完全なベクター枠組みのPDFをローカルで生成します。',
      fr: 'Le convertisseur analyse les dimensions de vos images JPG, PNG ou WebP, calcule l’échelle adaptée au format A4 ou Lettre via jsPDF, et génère un document PDF prêt pour l’impression sans aucun téléversement.',
      de: 'Der Konverter liest Bilddaten ein, berechnet das Seitenverhältnis und skaliert die Pixelmaße auf Standardformate (A4 oder Letter) mittels jsPDF, um ein druckfertiges PDF rein lokal zu erzeugen.',
      pt: 'O utilitário carrega imagens JPG, PNG ou WebP, ajusta as proporções para formatos como A4 ou Carta via jsPDF e empacota os dados num PDF profissional sem uso de servidores remotos.',
      ko: '본 변환기는 JPG, PNG, WebP 이미지를 읽어 가로세로 비율을 계산하고, jsPDF를 통해 A4 또는 Letter 규격에 맞춰 밀리미터 단위로 배치한 후 인쇄 가능한 PDF 문서를 브라우저 로컬에서 생성합니다.',
      it: 'Il convertitore analizza le immagini caricate, adatta le proporzioni al formato pagina scelto (A4 o Lettera) tramite jsPDF e crea un documento PDF pronto per la stampa direttamente nel browser.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Photos and Images', instruction: 'Drag and drop one or multiple JPG, PNG, or WebP images into the tool.' },
        { stepNumber: 2, title: 'Configure Page Layout', instruction: 'Select page orientation (Portrait or Landscape), page size (A4, Letter, or Fit to Image), and margin size.' },
        { stepNumber: 3, title: 'Arrange Image Sequence', instruction: 'Reorder image cards so your pages appear in the correct chronological sequence.' },
        { stepNumber: 4, title: 'Create and Download PDF', instruction: 'Click Convert to PDF and download the newly packaged document to your device.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो अपलोड करें', instruction: 'एक या कई JPG, PNG या WebP तस्वीरों को अपलोड बॉक्स में खींचें या चुनें।' },
        { stepNumber: 2, title: 'पेज लेआउट सेट करें', instruction: 'पेज ओरिएंटेशन (पोर्ट्रेट या लैंडस्केप), साइज (A4 या लेटर) और मार्जिन का चयन करें।' },
        { stepNumber: 3, title: 'फोटो क्रम व्यवस्थित करें', instruction: 'फोटो कार्ड्स को आगे-पीछे करके सही पेज क्रम में लगाएं।' },
        { stepNumber: 4, title: 'पीडीएफ बनाएं और डाउनलोड करें', instruction: 'कन्वर्ट टू पीडीएफ पर क्लिक करें और तैयार दस्तावेज को अपने डिवाइस पर सुरक्षित सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir imágenes', instruction: 'Arrastre una o varias fotos JPG, PNG o WebP al área indicada.' },
        { stepNumber: 2, title: 'Configurar página', instruction: 'Elija la orientación (Vertical u Horizontal), el tamaño (A4 o Carta) y el margen deseado.' },
        { stepNumber: 3, title: 'Organizar secuencia', instruction: 'Ordene las tarjetas de imagen para definir el orden exacto de las páginas.' },
        { stepNumber: 4, title: 'Generar y descargar PDF', instruction: 'Haga clic en Convertir a PDF y guarde su nuevo documento en el equipo.' }
      ],
      ja: [
        { stepNumber: 1, title: '画像をアップロード', instruction: '1枚または複数のJPG、PNG、WebP画像をドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: 'ページ設定を調整', instruction: '用紙向き（縦・横）、サイズ（A4、レター、画像に合わせる）、余白を設定します。' },
        { stepNumber: 3, title: '画像の並び順を整理', instruction: 'ページ順序に合わせて画像カードをドラッグまたは移動します。' },
        { stepNumber: 4, title: 'PDFを作成してダウンロード', instruction: '「PDFに変換」をクリックし、結合されたPDFファイルを保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Ajouter des images', instruction: 'Sélectionnez ou glissez vos photos JPG, PNG ou WebP dans la zone de dépôt.' },
        { stepNumber: 2, title: 'Définir la mise en page', instruction: 'Configurez l’orientation (Portrait/Paysage), le format (A4/Lettre) et les marges.' },
        { stepNumber: 3, title: 'Ordonner les images', instruction: 'Déplacez les cartes d’images dans l’ordre souhaité pour vos pages.' },
        { stepNumber: 4, title: 'Créer et télécharger le PDF', instruction: 'Cliquez sur Convertir en PDF pour générer et enregistrer votre document.' }
      ],
      de: [
        { stepNumber: 1, title: 'Bilder hinzufügen', instruction: 'Ziehen Sie ein oder mehrere JPG-, PNG- oder WebP-Bilder in das Tool.' },
        { stepNumber: 2, title: 'Seitenlayout konfigurieren', instruction: 'Wählen Sie Ausrichtung (Hoch-/Querformat), Format (A4 oder Letter) und Ränder.' },
        { stepNumber: 3, title: 'Reihenfolge anpassen', instruction: 'Verschieben Sie die Vorschaubilder in die gewünschte Seitenabfolge.' },
        { stepNumber: 4, title: 'PDF erstellen und herunterladen', instruction: 'Klicken Sie auf In PDF umwandeln und speichern Sie das fertige Dokument.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar imagens', instruction: 'Adicione uma ou mais fotos nos formatos JPG, PNG ou WebP.' },
        { stepNumber: 2, title: 'Configurar página', instruction: 'Escolha a orientação (Vertical ou Horizontal), formato (A4 ou Carta) e margens.' },
        { stepNumber: 3, title: 'Organizar sequência de páginas', instruction: 'Ordene as imagens na sequência correta para o documento final.' },
        { stepNumber: 4, title: 'Gerar e baixar PDF', instruction: 'Clique em Converter para PDF e transfira o arquivo diretamente para o seu dispositivo.' }
      ],
      ko: [
        { stepNumber: 1, title: '이미지 업로드', instruction: '하나 이상의 JPG, PNG, WebP 사진을 드래그하거나 선택하여 추가합니다.' },
        { stepNumber: 2, title: '페이지 레이아웃 설정', instruction: '용지 방향(세로/가로), 용지 규격(A4, Letter), 여백 크기를 지정합니다.' },
        { stepNumber: 3, title: '이미지 순서 정렬', instruction: '원하는 페이지 순서에 맞게 이미지 카드 순서를 변경합니다.' },
        { stepNumber: 4, title: 'PDF 생성 및 다운로드', instruction: 'PDF 변환 버튼을 클릭하여 완성된 문서를 기기에 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica immagini', instruction: 'Trascina o seleziona una o più foto in formato JPG, PNG o WebP.' },
        { stepNumber: 2, title: 'Imposta layout pagina', instruction: 'Configura orientamento (Verticale/Orizzontale), formato (A4 o Lettera) e margini.' },
        { stepNumber: 3, title: 'Ordina la sequenza', instruction: 'Disponi le schede delle immagini nell’ordine desiderato.' },
        { stepNumber: 4, title: 'Crea e scarica PDF', instruction: 'Clicca su Converti in PDF e scarica il file generato sul tuo dispositivo.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Compiling Scanned Receipts into an Expense Claim PDF',
        scenario: 'An employee has 6 photo receipts taken with a smartphone camera and must submit them as a single standardized A4 PDF document for reimbursement.',
        calculation: 'The tool imports the 6 receipts, rescales each photo to fit within standard A4 margins (210 x 297 mm) while preserving aspect ratios, and constructs a 6-page PDF using jsPDF.',
        result: 'A 6-page expense claim PDF generated in 1.2 seconds, ready for immediate accounting submission.'
      },
      hi: {
        title: 'खर्च के बिलों को एक A4 पीडीएफ में जोड़ना',
        scenario: 'एक कर्मचारी के पास मोबाइल से खींची गई 6 रसीदें हैं जिन्हें प्रतिपूर्ति के लिए एक मानक A4 पीडीएफ फाइल के रूप में जमा करना है।',
        calculation: 'टूल ने सभी 6 रसीदों को लोड किया, उनके अनुपात को A4 पेज के आकार (210 x 297 मिमी) में सही ढंग से फिट किया और 6 पेजों की पीडीएफ तैयार की।',
        result: 'मात्र 1.2 सेकंड में कंपनी में जमा करने योग्य 6 पेजों का साफ-सुथरा पीडीएफ दस्तावेज तैयार हो गया।'
      },
      es: {
        title: 'Compilación de recibos de gastos en PDF único',
        scenario: 'Un empleado tiene 6 fotos de comprobantes de pago tomadas con el móvil y debe entregarlas en un único archivo A4.',
        calculation: 'La herramienta ajusta las 6 fotos a las proporciones de una hoja A4 estándar y crea un documento de 6 páginas mediante jsPDF.',
        result: 'Documento PDF de 6 páginas generado en 1,2 segundos listo para contabilidad sin transferencias a servidores.'
      },
      ja: {
        title: 'スマホで撮影した領収書を1つの経費申請PDFにまとめる実例',
        scenario: '出張中の社員がスマホカメラで撮影した6枚の領収書写真を、経理提出用に1つのA4規格PDFにまとめたい場合。',
        calculation: '6枚の画像を読み込み、縦横比を維持しながら標準A4（210×297mm）ページ枠内に自動配置して6ページのPDFを構築。',
        result: 'わずか1.2秒で提出規定に合致した6ページの経費申請用PDFが完成。'
      },
      fr: {
        title: 'Compilation de notes de frais en un seul document PDF',
        scenario: 'Un salarié dispose de 6 photos de tickets de caisse et doit les transmettre sous la forme d’un unique PDF A4 à la comptabilité.',
        calculation: 'L’outil met à l’échelle les 6 photos pour les intégrer au format A4 avec marges adaptées et génère un PDF de 6 pages.',
        result: 'Dossier de remboursement de 6 pages créé en 1,2 seconde en toute sécurité.'
      },
      de: {
        title: 'Zusammenstellung von Belegen zu einer Reisekostenabrechnung',
        scenario: 'Ein Mitarbeiter hat 6 Belegfotos auf dem Smartphone und muss diese als ordentliche A4-PDF für die Buchhaltung einreichen.',
        calculation: 'Das Tool passt die 6 Belege maßstabsgetreu an das A4-Format (210 x 297 mm) an und erzeugt ein 6-seitiges PDF.',
        result: 'Einreichungsfertige 6-seitige PDF-Abrechnung innerhalb von 1,2 Sekunden lokal erstellt.'
      },
      pt: {
        title: 'Compilação de Comprovativos para Reembolso',
        scenario: 'Um colaborador precisa transformar 6 fotografias de recibos num único documento A4 para submissão à contabilidade.',
        calculation: 'O conversor redimensiona as 6 imagens para o formato A4 com margens seguras e monta um PDF de 6 páginas.',
        result: 'Ficheiro PDF de 6 páginas gerado em 1,2 segundos com total privacidade.'
      },
      ko: {
        title: '스마트폰 영수증 사진 6장을 하나의 A4 지출 결의서로 변환',
        scenario: '직원이 스마트폰으로 촬영한 6장의 영수증 사진을 회사 정산용 단일 A4 PDF로 제출해야 하는 상황입니다.',
        calculation: '6장의 영수증 비율을 유지하면서 표준 A4 규격(210 x 297 mm)에 맞춰 jsPDF로 6페이지 문서를 빌드합니다.',
        result: '외부 유출 없이 1.2초 만에 회계 제출용 6페이지 PDF 완성.'
      },
      it: {
        title: 'Raccolta di scontrini in un PDF unico per nota spese',
        scenario: 'Un dipendente ha 6 fotografie di ricevute sul telefono e deve riunirle in un unico file A4 per l’amministrazione.',
        calculation: 'Il programma adatta le 6 immagini al formato standard A4 preservando le proporzioni e genera un PDF di 6 pagine.',
        result: 'Fascicolo di 6 pagine pronto per l’invio in soli 1,2 secondi in completa sicurezza.'
      }
    },
    faqs: [
      {
        question: 'What image file formats are supported?',
        answer: 'You can upload standard raster image formats including JPG, JPEG, PNG, and WebP. Transparent PNGs are placed onto clean white backgrounds.'
      },
      {
        question: 'Can I combine multiple different image orientations into one PDF?',
        answer: 'Yes. You can select individual page orientation settings or choose "Fit to Image", which automatically matches each PDF page dimension to each photo.'
      },
      {
        question: 'Are my private photos uploaded to any external server?',
        answer: 'No. Processing is executed 100% locally on your computer or phone using jsPDF. Your receipts, IDs, and personal photos remain strictly on your device.'
      },
      {
        question: 'Will creating a PDF reduce the visual resolution of my photos?',
        answer: 'No. Pixel data is encapsulated directly into the PDF container without aggressive downsampling, ensuring full photographic clarity for printing or inspection.'
      }
    ]
  }
};
