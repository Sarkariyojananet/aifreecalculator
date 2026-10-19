// scripts/builders/pdf-part3.mjs
// Part 3: word-to-pdf, delete-pages-from-pdf, reorder-pdf-pages, pdf-to-grayscale

export const pdfPart3 = {
  'word-to-pdf': {
    name: 'Word to PDF',
    formulaTitle: {
      en: 'In-Browser Mammoth.js DOCX Extraction & jsPDF Pagination Engine',
      hi: 'इन-ब्राउज़र Mammoth.js DOCX निष्कर्षण और jsPDF पेजिनेशन इंजन',
      es: 'Extracción DOCX con Mammoth.js y Paginación jsPDF en Cliente',
      ja: 'ブラウザ内Mammoth.js DOCX構造解析とjsPDFページネーションエンジン',
      fr: 'Extraction DOCX par Mammoth.js et Moteur de Pagination jsPDF en Local',
      de: 'Lokale Mammoth.js-DOCX-Verarbeitung & jsPDF-Paginierungs-Engine',
      pt: 'Extração DOCX via Mammoth.js e Motor de Paginação jsPDF no Navegador',
      ko: '브라우저 내 Mammoth.js DOCX 파싱 및 jsPDF 페이지네이션 엔진 구조',
      it: 'Estrazione DOCX con Mammoth.js e Motore di Impaginazione jsPDF nel Browser'
    },
    formulaDescription: {
      en: 'The converter extracts raw document XML relationships, paragraph styles, headings, tables, and ordered lists from the .docx archive using mammoth.js. It maps typography hierarchies to exact millimeter coordinate grids on standard A4 or Letter sheets via jsPDF, generating a print-ready vector PDF document without sending files to external servers.',
      hi: 'यह टूल mammoth.js का उपयोग करके .docx फाइल के आंतरिक XML, हेडिंग, टेबल और पैराग्राफ को डिकोड करता है। इसके बाद यह jsPDF के माध्यम से मिलीमीटर ग्रिड पर मानक A4 या लेटर पेज के रूप में टेक्स्ट और फॉर्मेट को व्यवस्थित करता है और बिना किसी सर्वर पर डाटा भेजे सीधे ब्राउज़र में नई पीडीएफ फाइल बनाता है।',
      es: 'El conversor analiza los estilos, tablas y párrafos del archivo .docx mediante mammoth.js, calcula la tipografía y saltos de página con jsPDF en hojas estándar A4 o Carta y compila un PDF listo para imprimir en la memoria local.',
      ja: '本変換器はブラウザ内でmammoth.jsを使用し、.docxのXML構造から見出し階層、段落、表組みを抽出。jsPDFにより標準A4またはレター規格の用紙グリッド上にミリ単位で再配置し、外部通信を行わずに印刷用ベクターPDFを出力します。',
      fr: 'Le convertisseur extrait la structure XML, les titres, tableaux et paragraphes du fichier .docx avec mammoth.js, puis calibre la mise en page sur format A4 ou Lettre via jsPDF pour exporter un PDF haute fidélité.',
      de: 'Der Konverter analysiert .docx-Archive mit mammoth.js, ermittelt Überschriften, Listen und Textstile und setzt diese mittels jsPDF auf DIN A4- oder Letter-Seiten um – vollständig clientseitig im Browser.',
      pt: 'O conversor processa a estrutura do documento .docx através de mammoth.js, calcula o fluxo de parágrafos e margens com jsPDF e produz um PDF profissional pronto para impressão.',
      ko: '본 변환기는 mammoth.js를 활용하여 .docx 파일의 XML 관계, 단락 서식, 표, 목록을 분석하고 jsPDF를 통해 표준 A4 또는 Letter 규격의 밀리미터 좌표계에 텍스트를 배치하여 출력용 PDF를 생성합니다.',
      it: 'Il convertitore analizza stili, tabelle e paragrafi del file .docx con mammoth.js e organizza la composizione su fogli A4 o Lettera tramite jsPDF, generando il file PDF definitivo direttamente nel browser.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Word Document', instruction: 'Drag and drop your Microsoft Word (.docx) file into the upload zone or click to browse.' },
        { stepNumber: 2, title: 'Configure Page Format and Margins', instruction: 'Select your target sheet size (A4 or US Letter) and margin style (Normal, Narrow, or Wide).' },
        { stepNumber: 3, title: 'Render Document', instruction: 'Click Convert to PDF to initiate in-memory paragraph formatting and page compilation.' },
        { stepNumber: 4, title: 'Download Printable PDF', instruction: 'Save the generated PDF document directly to your device.' }
      ],
      hi: [
        { stepNumber: 1, title: 'वर्ड फाइल अपलोड करें', instruction: 'अपनी माइक्रोसॉफ्ट वर्ड (.docx) फाइल को अपलोड बॉक्स में खींचें या चुनें।' },
        { stepNumber: 2, title: 'पेज साइज और मार्जिन सेट करें', instruction: 'पेज का साइज (A4 या लेटर) और मार्जिन (सामान्य, संकीर्ण, चौड़ा) चुनें।' },
        { stepNumber: 3, title: 'पीडीएफ में बदलें', instruction: 'कन्वर्ट टू पीडीएफ पर क्लिक करें और ब्राउज़र में पेजों का निर्माण शुरू करें।' },
        { stepNumber: 4, title: 'प्रिंट-तैयार पीडीएफ डाउनलोड करें', instruction: 'तैयार पीडीएफ फाइल को अपने कंप्यूटर या फोन पर तुरंत डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir archivo Word', instruction: 'Arrastre su documento .docx al área de carga o selecciónelo en su dispositivo.' },
        { stepNumber: 2, title: 'Configurar página y márgenes', instruction: 'Elija el tamaño de página (A4 o Carta) y el tipo de margen deseado.' },
        { stepNumber: 3, title: 'Procesar conversión', instruction: 'Haga clic en Convertir a PDF para generar las páginas en la memoria local.' },
        { stepNumber: 4, title: 'Descargar PDF resultante', instruction: 'Guarde su nuevo documento PDF directamente en su equipo.' }
      ],
      ja: [
        { stepNumber: 1, title: 'Wordファイルをアップロード', instruction: '変換したいMicrosoft Word（.docx）ファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '用紙規格と余白を設定', instruction: '用紙サイズ（A4またはレター）と余白スタイル（標準、狭い、広い）を選択します。' },
        { stepNumber: 3, title: 'PDFへの変換を実行', instruction: '「PDFに変換」をクリックしてブラウザ内でのページ組版処理を開始します。' },
        { stepNumber: 4, title: '完成したPDFを保存', instruction: '生成された印刷対応PDFファイルをローカルにダウンロードします。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Charger le fichier Word', instruction: 'Importez votre document .docx dans l’espace de conversion.' },
        { stepNumber: 2, title: 'Paramétrer le format et les marges', instruction: 'Sélectionnez le format de page (A4 ou Lettre) et la disposition des marges.' },
        { stepNumber: 3, title: 'Générer le PDF', instruction: 'Cliquez sur Convertir en PDF pour assembler les pages en mémoire locale.' },
        { stepNumber: 4, title: 'Télécharger le document final', instruction: 'Enregistrez le document PDF prêt pour l’impression sur votre appareil.' }
      ],
      de: [
        { stepNumber: 1, title: 'Word-Dokument bereitstellen', instruction: 'Ziehen Sie die .docx-Datei in den Arbeitsbereich oder wählen Sie diese aus.' },
        { stepNumber: 2, title: 'Seitenformat und Ränder festlegen', instruction: 'Wählen Sie A4 oder Letter sowie die gewünschte Randeinstellung.' },
        { stepNumber: 3, title: 'In PDF umwandeln', instruction: 'Klicken Sie auf In PDF konvertieren, um das Dokument lokal zu erstellen.' },
        { stepNumber: 4, title: 'Fertiges PDF herunterladen', instruction: 'Speichern Sie die druckfertige PDF-Datei auf Ihrem Rechner.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar ficheiro Word', instruction: 'Arraste o seu documento .docx para o formulário de conversão.' },
        { stepNumber: 2, title: 'Ajustar formato e margens', instruction: 'Selecione o tamanho (A4 ou Carta) e o estilo de margem pretendido.' },
        { stepNumber: 3, title: 'Converter documento', instruction: 'Clique em Converter para PDF para montar as páginas no navegador.' },
        { stepNumber: 4, title: 'Baixar PDF final', instruction: 'Transfira o arquivo PDF gerado diretamente para o seu dispositivo.' }
      ],
      ko: [
        { stepNumber: 1, title: 'Word 문서 업로드', instruction: '변환할 Microsoft Word(.docx) 문서를 선택하거나 작업 창으로 끌어옵니다.' },
        { stepNumber: 2, title: '용지 규격 및 여백 설정', instruction: '용지 크기(A4 또는 Letter)와 여백 스타일(기본, 좁게, 넓게)을 지정합니다.' },
        { stepNumber: 3, title: 'PDF 변환 시작', instruction: 'PDF 변환 버튼을 클릭하여 브라우저 메모리에서 페이지 조판을 실행합니다.' },
        { stepNumber: 4, title: '완성된 PDF 다운로드', instruction: '인쇄 준비가 완료된 PDF 문서를 기기에 안전하게 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica file Word', instruction: 'Trascina il documento .docx nell’area di conversione o selezionalo.' },
        { stepNumber: 2, title: 'Imposta formato e margini', instruction: 'Scegli la dimensione del foglio (A4 o Lettera) e la larghezza dei margini.' },
        { stepNumber: 3, title: 'Converti in PDF', instruction: 'Clicca su Converti in PDF per comporre il documento nella memoria locale.' },
        { stepNumber: 4, title: 'Scarica PDF pronto', instruction: 'Salva il nuovo file PDF direttamente sul tuo computer o smartphone.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Converting a Resume from Word to PDF for a Job Application',
        scenario: 'A job seeker has updated their 2-page curriculum vitae in Microsoft Word and needs a fixed-layout, universal PDF document for online application systems.',
        calculation: 'The tool extracts headings, bullet points, and dates from the .docx structure, maps them to standard A4 page dimensions (210 x 297 mm), and outputs a 2-page PDF via jsPDF.',
        result: 'A crisp, 2-page vector PDF generated in 1.1 seconds with locked layouts that render identically on any operating system.'
      },
      hi: {
        title: 'नौकरी के आवेदन के लिए रिज्यूमे को वर्ड से पीडीएफ में बदलना',
        scenario: 'एक अभ्यर्थी ने वर्ड में अपना 2 पेज का रिज्यूमे तैयार किया है और उसे कंपनी पोर्टल पर अपलोड करने के लिए निश्चित लेआउट वाली पीडीएफ फाइल चाहिए।',
        calculation: 'टूल ने .docx फाइल से टेक्स्ट, बुलेट पॉइंट्स और हेडिंग्स को पढ़ा, A4 पेज के आकार पर सही मार्जिन के साथ सेट किया और 2 पेज की पीडीएफ बनाई।',
        result: 'मात्र 1.1 सेकंड में 2 पेज की पेशेवर पीडीएफ तैयार हो गई जो किसी भी फोन या कंप्यूटर पर बिल्कुल एक जैसी दिखेगी।'
      },
      es: {
        title: 'Conversión de currículum vitae a PDF para solicitud de empleo',
        scenario: 'Un profesional actualiza su CV de 2 páginas en Word y necesita un formato PDF estandarizado para enviar a procesos de selección.',
        calculation: 'La herramienta extrae el texto, viñetas y fechas del archivo .docx y lo ensambla en hojas A4 mediante jsPDF.',
        result: 'Documento PDF de 2 páginas generado en 1,1 segundos con formato fijo e inalterable en cualquier dispositivo.'
      },
      ja: {
        title: '採用応募用履歴書（職務経歴書）をWordからPDFへ変換する実例',
        scenario: '求職者がWordで作成した2ページの職務経歴書を、レイアウト崩れを防いで企業ポータルに提出するためにPDF化したい場合。',
        calculation: 'mammoth.jsで見出しや箇条書きを解析し、jsPDFで標準A4（210×297mm）枠内に正確に再配置。',
        result: 'どの端末で開いてもレイアウトが一切崩れない高品位な2ページの応募用PDFが1.1秒で完成。'
      },
      fr: {
        title: 'Conversion d’un CV Word en document PDF pour candidature',
        scenario: 'Un candidat a finalisé son CV de 2 pages sous Word et souhaite l’exporter en PDF figé pour répondre à des offres d’emploi.',
        calculation: 'L’outil extrait les puces, polices et dates du fichier .docx et génère un document A4 standardisé avec jsPDF.',
        result: 'Fichier PDF de 2 pages créé en 1,1 seconde garantissant une mise en page identique sur tous les écrans.'
      },
      de: {
        title: 'Umwandlung eines Lebenslaufs von Word in PDF für Bewerbungen',
        scenario: 'Ein Bewerber hat seinen 2-seitigen Lebenslauf in Word aktualisiert und benötigt für Portale ein fixes, unveränderliches PDF-Format.',
        calculation: 'Das Tool liest Textblöcke und Aufzählungen aus der .docx-Datei und ordnet sie auf zwei A4-Seiten mit jsPDF an.',
        result: 'Einwandfreies 2-seitiges PDF in 1,1 Sekunden mit einheitlicher Darstellung auf jedem Endgerät erzeugt.'
      },
      pt: {
        title: 'Conversão de Currículo Word para PDF Profissional',
        scenario: 'Um candidato concluiu o seu CV de 2 páginas no Word e precisa de um ficheiro PDF seguro para submissão em candidaturas.',
        calculation: 'A ferramenta organiza o texto e marcadores em páginas A4 padrão sem envio para servidores externos.',
        result: 'Documento PDF de 2 páginas produzido em 1,1 segundos com layout totalmente protegido.'
      },
      ko: {
        title: '취업 포털 입사 지원용 이력서 Word to PDF 변환 실례',
        scenario: '구직자가 Word로 작성한 2페이지 분량의 이력서 및 경력기술서를 양식 틀어짐 없이 완벽한 서식의 PDF로 제출하려 합니다.',
        calculation: '.docx 파일에서 본문, 불릿 기호, 날짜 항목을 추출하여 표준 A4 규격에 맞춰 jsPDF로 조판합니다.',
        result: '어떤 기기나 운영체제에서도 서식이 어긋나지 않는 2페이지 PDF가 1.1초 만에 완성.'
      },
      it: {
        title: 'Conversione di curriculum vitae da Word a PDF per candidature',
        scenario: 'Un candidato ha compilato il proprio CV di 2 pagine in Word e necessita di un file PDF a layout fisso per l’invio.',
        calculation: 'Il programma converte elenchi puntati e sezioni in pagine standard A4 tramite jsPDF.',
        result: 'Documento PDF di 2 pagine generato in 1,1 secondi con impaginazione stabile su ogni dispositivo.'
      }
    },
    faqs: [
      {
        question: 'Will Word formatting, headings, and bullet points carry over to the PDF?',
        answer: 'Yes. Paragraph structures, heading hierarchies, list numbering, and bold/italic styles are cleanly rendered into the generated PDF.'
      },
      {
        question: 'Is it safe to convert private legal contracts and medical records?',
        answer: 'Yes, 100% safe. Processing takes place exclusively inside your browser. No files, text fragments, or documents are transmitted to our servers.'
      },
      {
        question: 'What Word formats are accepted (.doc vs .docx)?',
        answer: 'The converter accepts standard modern Microsoft Word documents (.docx). Older legacy binary (.doc) files should be saved as .docx before uploading.'
      },
      {
        question: 'Can I select between A4 and US Letter page sizes?',
        answer: 'Yes. You can select either standard international A4 (210 x 297 mm) or North American US Letter (8.5 x 11 inches) page formats.'
      }
    ]
  },

  'delete-pages-from-pdf': {
    name: 'Delete Pages from PDF',
    formulaTitle: {
      en: 'In-Memory Page Catalog Node Removal & Cross-Reference Truncation',
      hi: 'इन-मेमोरी पेज कैटलॉग नोड निष्कासन और संदर्भ संशोधन',
      es: 'Eliminación de Nodos de Catálogo y Truncado de Referencias en Cliente',
      ja: 'インメモリページカタログノード削除とxrefテーブル再構築技術',
      fr: 'Suppression de Nœuds de Pages en Mémoire et Recalcul des Références',
      de: 'Lokale Seitenkatalog-Knotenlöschung & Querverweis-Aktualisierung',
      pt: 'Remoção de Nós de Página na Memória e Ajuste de Referências no Navegador',
      ko: '인메모리 페이지 카탈로그 노드 삭제 및 상호참조 트리 재구성 아키텍처',
      it: 'Rimozione Nodi del Catalogo Pagine in Memoria e Troncamento Riferimenti'
    },
    formulaDescription: {
      en: 'The deletion utility loads the PDF binary via pdf-lib in browser memory, traverses the document Pages tree node, removes the target page dictionary references from the Kids array, updates the Count attribute, recalibrates object cross-reference indices, and serializes the slimmed document locally without uploading data to remote servers.',
      hi: 'यह टूल ब्राउज़र मेमोरी में pdf-lib के माध्यम से आपकी पीडीएफ फाइल को पढ़ता है। यह पेज ट्री में से आपके द्वारा चुने गए पेजों के संदर्भ को हटा देता है, पेज काउंट (Count) को अपडेट करता है और बिना किसी सर्वर का उपयोग किए केवल आवश्यक पेजों वाली नई पीडीएफ फाइल तुरंत तैयार करता है।',
      es: 'La herramienta carga el documento en la memoria local con pdf-lib, retira las referencias de las páginas seleccionadas de la matriz Kids del árbol de páginas, actualiza el contador total y recompila el PDF sin transferencias externas.',
      ja: '本ツールはブラウザメモリ内でpdf-libを起動し、PDFのページツリーから削除対象のページ辞書参照を正確に除外。総ページ数カウントを更新し、相互参照テーブル（xref）を自動再構築して安全にダウンロード用ファイルを生成します。',
      fr: 'L’outil charge le document avec pdf-lib dans le navigateur, supprime les références des pages ciblées de la structure arborescente, met à jour le compteur global de pages et enregistre le document allégé en local.',
      de: 'Das Tool öffnet das Dokument im Speicher, entfernt die Verweise der markierten Seiten aus dem Seitenbaum via pdf-lib, aktualisiert den Zähler und gibt die bereinigte PDF-Datei ohne Serverzugriff aus.',
      pt: 'O utilitário carrega o documento na memória com pdf-lib, remove as referências das páginas marcadas para exclusão, atualiza o total de folhas e gera o PDF final com total privacidade.',
      ko: '본 삭제 도구는 pdf-lib를 통해 페이지 트리를 탐색하고 삭제 대상 페이지의 참조 포인터를 안전하게 분리한 뒤, 총 페이지 수(Count)와 상호참조 인덱스를 갱신하여 가벼워진 PDF를 출력합니다.',
      it: 'Lo strumento apre il documento nella memoria locale con pdf-lib, cancella i riferimenti delle pagine selezionate dall’albero del catalogo e salva il nuovo file senza caricare dati su server esterni.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your PDF document into the page management area or select it from storage.' },
        { stepNumber: 2, title: 'Select Pages to Remove', instruction: 'Click individual page thumbnails to mark them for deletion, or enter page numbers (e.g., "1, 4, 7-9").' },
        { stepNumber: 3, title: 'Confirm Deletion', instruction: 'Click Delete Pages to prune marked nodes from the document tree in local memory.' },
        { stepNumber: 4, title: 'Download Trimmed PDF', instruction: 'Save the finalized document with unwanted pages completely removed.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल अपलोड करें', instruction: 'अपनी पीडीएफ फाइल को पेज प्रबंधन बॉक्स में खींचें या चुनें।' },
        { stepNumber: 2, title: 'हटाने वाले पेज चुनें', instruction: 'थंबनेल पर क्लिक करके उन पेजों को चुनें जिन्हें हटाना है या पेज नंबर (उदा. "1, 4, 7") टाइप करें।' },
        { stepNumber: 3, title: 'हटाने की पुष्टि करें', instruction: 'डिलीट पेजेस पर क्लिक करें और ब्राउज़र में गैर-जरूरी पेजों को निकाल दें।' },
        { stepNumber: 4, title: 'संशोधित पीडीएफ डाउनलोड करें', instruction: 'अनावश्यक पेजों से मुक्त साफ-सुथरी पीडीएफ फाइल को सुरक्षित सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir archivo PDF', instruction: 'Arrastre el documento que desea limpiar al área de miniaturas.' },
        { stepNumber: 2, title: 'Marcar páginas a eliminar', instruction: 'Haga clic en las miniaturas que no necesite o introduzca números de página (ej. "2, 5").' },
        { stepNumber: 3, title: 'Confirmar eliminación', instruction: 'Haga clic en Eliminar páginas para purgar los nodos en la memoria local.' },
        { stepNumber: 4, title: 'Descargar PDF resultante', instruction: 'Guarde el archivo limpio sin las páginas descartadas.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルをアップロード', instruction: 'ページを削除したいPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '削除したいページを選択', instruction: 'サムネイルをクリックして削除対象に指定するか、ページ番号（例: 2, 5, 8）を入力します。' },
        { stepNumber: 3, title: '削除を実行', instruction: '「ページを削除」をクリックし、ブラウザ内でページツリーのノード切り離しを行います。' },
        { stepNumber: 4, title: '調整済みPDFを保存', instruction: '不要なページが完全に除去されたPDFファイルをダウンロードします。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer le document PDF', instruction: 'Chargez votre fichier dans la grille de gestion des pages.' },
        { stepNumber: 2, title: 'Cocher les pages à supprimer', instruction: 'Cliquez sur les vignettes inutiles ou saisissez les numéros de page (ex. 2, 6-8).' },
        { stepNumber: 3, title: 'Valider la suppression', instruction: 'Cliquez sur Supprimer les pages pour retirer les feuilles en mémoire locale.' },
        { stepNumber: 4, title: 'Télécharger le PDF allégé', instruction: 'Enregistrez le document définitif sans les pages superflues.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Datei hochladen', instruction: 'Ziehen Sie das Dokument in die Seitenansicht oder wählen Sie es aus.' },
        { stepNumber: 2, title: 'Zu löschende Seiten markieren', instruction: 'Klicken Sie auf unerwünschte Vorschaubilder oder geben Sie Seitenzahlen ein (z. B. 2, 5).' },
        { stepNumber: 3, title: 'Löschung bestätigen', instruction: 'Klicken Sie auf Seiten löschen, um die Seitenstrukturen lokal zu entfernen.' },
        { stepNumber: 4, title: 'Bereinigte PDF speichern', instruction: 'Laden Sie das überarbeitete Dokument ohne die entfernten Seiten herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar ficheiro PDF', instruction: 'Adicione o documento na área de pré-visualização de páginas.' },
        { stepNumber: 2, title: 'Marcar páginas para remover', instruction: 'Clique nas miniaturas que deseja eliminar ou digite os números (ex: 2, 5).' },
        { stepNumber: 3, title: 'Confirmar exclusão', instruction: 'Clique em Eliminar páginas para processar a remoção no navegador.' },
        { stepNumber: 4, title: 'Baixar PDF limpo', instruction: 'Guarde o ficheiro sem as folhas indesejadas no seu dispositivo.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 업로드', instruction: '페이지를 제거할 PDF 문서를 미리보기 영역에 끌어옵니다.' },
        { stepNumber: 2, title: '삭제할 페이지 선택', instruction: '제거할 썸네일을 직접 클릭하거나 페이지 번호(예: 2, 5, 8)를 입력합니다.' },
        { stepNumber: 3, title: '삭제 실행', instruction: '페이지 삭제 버튼을 눌러 브라우저 로컬에서 대상 페이지를 안전하게 분리합니다.' },
        { stepNumber: 4, title: '정리된 PDF 다운로드', instruction: '불필요한 페이지가 제거된 깔끔한 PDF 문서를 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica file PDF', instruction: 'Trascina il documento nell’area di anteprima delle pagine.' },
        { stepNumber: 2, title: 'Seleziona pagine da eliminare', instruction: 'Fai clic sulle miniature da scartare o digita i numeri di foglio (es. 2, 4-6).' },
        { stepNumber: 3, title: 'Conferma eliminazione', instruction: 'Clicca su Elimina pagine per rimuovere i fogli nella memoria locale.' },
        { stepNumber: 4, title: 'Scarica PDF ripulito', instruction: 'Salva il documento definitivo privo delle pagine indesiderate.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Purging Blank and Duplicate Pages from a 20-Page Contract Scan',
        scenario: 'A legal assistant scanned a 20-page real estate deed, resulting in blank separator sheets at page 7 and page 14 that must be purged before client signature.',
        calculation: 'The tool clones all pages except index 6 and index 13, updates the page catalog count from 20 to 18, and serializes the new PDF.',
        result: 'An 18-page finalized PDF created in 0.6 seconds with zero trace of the blank pages and intact legal text formatting.'
      },
      hi: {
        title: '20 पेजों के अनुबंध से खाली और अनावश्यक पेजों को हटाना',
        scenario: 'एक कानूनी सहायक ने 20 पेज का दस्तावेज स्कैन किया जिसमें पेज 7 और 14 पर खाली शीट आ गईं जिन्हें हस्ताक्षर से पहले हटाना है।',
        calculation: 'टूल ने पेज 7 और 14 को छोड़कर बाकी 18 पेजों को सुरक्षित रखा, पेज काउंट को 18 किया और नई फाइल बनाई।',
        result: 'मात्र 0.6 सेकंड में 18 पेजों का सही और पेशेवर दस्तावेज तैयार हो गया जिसमें मूल टेक्स्ट बिल्कुल सुरक्षित रहा।'
      },
      es: {
        title: 'Eliminación de hojas en blanco en escritura notarial',
        scenario: 'Un asistente legal escanea una escritura de 20 páginas con hojas en blanco accidentales en las páginas 7 y 14.',
        calculation: 'La herramienta omite las páginas 7 y 14, ajusta el contador a 18 y reconstruye el índice del documento.',
        result: 'Documento final de 18 páginas generado en 0,6 segundos manteniendo íntegra la validez del texto.'
      },
      ja: {
        title: '契約書スキャン時の白紙ページ（空白紙）削除実例',
        scenario: '20ページの不動産契約書をスキャンした際、7ページ目と14ページ目に混入した余分な白紙を綺麗に取り除きたい場合。',
        calculation: '7ページ目と14ページ目のノードのみを除外し、総ページ数を20から18へ更新して再出力。',
        result: '文字品質を損なうことなく、わずか0.6秒で不要ページが除去された18ページの完成契約書を出力。'
      },
      fr: {
        title: 'Suppression de pages blanches dans un contrat numérisé',
        scenario: 'Un clerc de notaire numérise un acte de 20 pages contenant deux pages blanches accidentelles aux positions 7 et 14.',
        calculation: 'L’outil extrait les 18 pages utiles, recalcule les index et supprime définitivement les deux feuilles vides.',
        result: 'Document de 18 pages finalisé en 0,6 seconde en toute confidentialité.'
      },
      de: {
        title: 'Entfernung von Leerseiten aus einem 20-seitigen Vertrag',
        scenario: 'Ein Notariatsmitarbeiter scannt einen 20-seitigen Vertrag und muss versehentliche Leerseiten auf Seite 7 und 14 entfernen.',
        calculation: 'Das Tool schließt die Seiten 7 und 14 aus dem Seitenbaum aus und passt die Seitenzählung auf 18 an.',
        result: 'Bereinigtes 18-seitiges Vertragsdokument innerhalb von 0,6 Sekunden lokal erzeugt.'
      },
      pt: {
        title: 'Eliminação de Folhas em Branco num Contrato de 20 Páginas',
        scenario: 'Um assistente digitalizou uma escritura de 20 páginas com folhas em branco indesejadas nas páginas 7 e 14.',
        calculation: 'O utilitário exclui os índices 6 e 13 mantendo a integridade das restantes 18 páginas.',
        result: 'Documento de 18 páginas finalizado em 0,6 segundos com total conformidade.'
      },
      ko: {
        title: '20페이지 계약서 스캔본에서 섞여 들어간 빈 백지 페이지 제거',
        scenario: '법률 사무소에서 20페이지 계약서를 스캔하는 도중 7페이지와 14페이지에 잘못 들어간 백지를 깔끔하게 삭제하려 합니다.',
        calculation: '해당 2개 페이지만 건너뛰고 18개 페이지로 객체 트리를 재구성하여 즉시 내보냅니다.',
        result: '법률 문서 원본 품질 그대로 0.6초 만에 18페이지 분량의 정돈된 PDF 완성.'
      },
      it: {
        title: 'Eliminazione di pagine bianche da contratto scansionato',
        scenario: 'Un assistente notarile ha acquisito un atto da 20 pagine con due fogli bianchi involontari alle pagine 7 e 14.',
        calculation: 'Il software esclude i due fogli vuoti, aggiorna il conteggio totale a 18 e salva il file ripulito.',
        result: 'Documento di 18 pagine pronto all’uso generato in soli 0,6 secondi senza upload esterni.'
      }
    },
    faqs: [
      {
        question: 'Does deleting pages recompress or damage remaining pages?',
        answer: 'No. The remaining pages are copied verbatim as vector streams. Text sharpness, vector diagrams, and high-resolution images are 100% preserved.'
      },
      {
        question: 'Can I delete multiple non-consecutive pages at once?',
        answer: 'Yes. You can click any number of thumbnails or type a comma-separated list of page numbers to delete all of them simultaneously.'
      },
      {
        question: 'Are deleted pages permanently erased from the file?',
        answer: 'Yes. The generated downloadable PDF completely omits the pruned page dictionaries, ensuring private content is removed from the file binary.'
      },
      {
        question: 'Are my confidential documents processed on a remote server?',
        answer: 'No. Page removal runs 100% inside your web browser using JavaScript. No files are uploaded to any external server.'
      }
    ]
  },

  'reorder-pdf-pages': {
    name: 'Reorder PDF Pages',
    formulaTitle: {
      en: 'In-Memory Page Catalog Index Permutation & Array Reordering',
      hi: 'इन-मेमोरी पेज कैटलॉग इंडेक्स पुनर्व्यवस्था और सरणी क्रमपरिवर्तन',
      es: 'Permutación de Índices de Catálogo y Reordenación de Páginas en Cliente',
      ja: 'インメモリページカタログインデックス順列再配置技術',
      fr: 'Permutation d’Index du Catalogue de Pages et Réorganisation en Mémoire',
      de: 'Lokale Seitenkatalog-Indexpermutation & Neuanordnung',
      pt: 'Permutação de Índices do Catálogo de Páginas no Navegador',
      ko: '인메모리 페이지 카탈로그 인덱스 치환 및 순서 재배열 아키텍처',
      it: 'Permutazione Indici del Catalogo Pagine e Riordino in Memoria'
    },
    formulaDescription: {
      en: 'The page reorganizer initializes the PDF binary via pdf-lib in browser memory, reads individual page tree nodes into an addressable array, permutes the node positions to match your requested user sequence, updates internal parent references, and writes the reordered document without altering underlying vector streams or font programs.',
      hi: 'यह टूल ब्राउज़र मेमोरी में pdf-lib के माध्यम से आपकी पीडीएफ के सभी पेजों को एक सरणी (array) में लोड करता है। यह आपके द्वारा चुने गए नए क्रम के अनुसार पेजों की स्थिति को पुनर्व्यवस्थित करता है और बिना मूल सामग्री या फॉन्ट को बदले तुरंत सही क्रम वाली पीडीएफ फाइल तैयार करता है।',
      es: 'La herramienta reorganiza las referencias de las páginas en la memoria local mediante pdf-lib según la nueva secuencia elegida, preservando los flujos de contenido y exportando el PDF ordenado sin tocar servidores.',
      ja: '本ツールはブラウザメモリ内でpdf-libを実行し、全ページのノード参照を配列として保持。ユーザーがドラッグ＆ドロップで指定した新しい順序通りにポインタを再構成し、画質劣化なしで再整列したPDFを出力します。',
      fr: 'L’outil charge les références de pages dans un tableau en mémoire via pdf-lib, les réordonne selon la séquence définie par l’utilisateur et enregistre le document réorganisé sans aucun téléversement.',
      de: 'Das Tool liest die Seitenobjekte mit pdf-lib in ein Array ein, ordnet die Verweise entsprechend der gewünschten Abfolge neu an und erzeugt ein korrekt sortiertes PDF-Dokument vollständig lokal.',
      pt: 'A ferramenta organiza as referências de página na memória local via pdf-lib, reorganizando a ordem de exibição de acordo com as preferências do utilizador com total privacidade.',
      ko: '본 순서 재배열 도구는 pdf-lib를 사용하여 모든 페이지 노드를 배열에 담고, 사용자가 지정한 새 순서에 맞춰 인덱스를 치환한 뒤 원본 화질을 유지하며 새로운 PDF로 저장합니다.',
      it: 'Il programma indicizza gli oggetti pagina in memoria tramite pdf-lib, ne riordina la sequenza in base alle preferenze dell’utente e salva il documento finale nel pieno rispetto della riservatezza.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PDF Document', instruction: 'Drag and drop your PDF into the interactive page organizer workbench.' },
        { stepNumber: 2, title: 'Drag and Drop to Reorder', instruction: 'Rearrange page thumbnail cards into your desired reading or presentation sequence.' },
        { stepNumber: 3, title: 'Apply New Page Order', instruction: 'Click Reorder Pages to reconstruct the internal page catalog in local memory.' },
        { stepNumber: 4, title: 'Download Reorganized PDF', instruction: 'Save your freshly sequenced PDF document directly to your device.' }
      ],
      hi: [
        { stepNumber: 1, title: 'पीडीएफ फाइल अपलोड करें', instruction: 'अपनी पीडीएफ फाइल को पेज आयोजक बॉक्स में खींचें या चुनें।' },
        { stepNumber: 2, title: 'ड्रैग करके क्रम बदलें', instruction: 'पेज थंबनेल को खींचकर अपनी पसंद के सही पढ़ने वाले क्रम में लगाएं।' },
        { stepNumber: 3, title: 'नया क्रम लागू करें', instruction: 'रीऑर्डर पेजेस पर क्लिक करें और ब्राउज़र में पेजों का नया क्रम सुरक्षित करें।' },
        { stepNumber: 4, title: 'पुनर्व्यवस्थित पीडीएफ डाउनलोड करें', instruction: 'सही क्रम में जमी हुई नई पीडीएफ फाइल को अपने डिवाइस पर डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir archivo PDF', instruction: 'Arrastre el documento al organizador interactivo de páginas.' },
        { stepNumber: 2, title: 'Arrastrar para reordenar', instruction: 'Mueva las miniaturas a las posiciones correspondientes al orden deseado.' },
        { stepNumber: 3, title: 'Aplicar nueva secuencia', instruction: 'Haga clic en Reordenar páginas para reconstruir el catálogo en memoria.' },
        { stepNumber: 4, title: 'Descargar PDF ordenado', instruction: 'Guarde su documento con las páginas en el orden exacto.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PDFファイルをアップロード', instruction: 'ページ順を変更したいPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: 'ドラッグ＆ドロップで並べ替え', instruction: 'サムネイルカードを直感的にドラッグして、理想の閲覧順序に並べ替えます。' },
        { stepNumber: 3, title: '新しい順序を適用', instruction: '「ページを並べ替え」をクリックして内部カタログのポインタ配列を更新します。' },
        { stepNumber: 4, title: '並べ替え済みPDFを保存', instruction: '正しく順序が整理されたPDFファイルをローカルにダウンロードします。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer le document PDF', instruction: 'Déposez votre document dans l’organiseur visuel de pages.' },
        { stepNumber: 2, title: 'Glisser-déposer pour ordonner', instruction: 'Déplacez les vignettes pour définir l’ordre de lecture idéal.' },
        { stepNumber: 3, title: 'Appliquer le réordonnancement', instruction: 'Cliquez sur Réorganiser pour mettre à jour l’arbre des pages en mémoire.' },
        { stepNumber: 4, title: 'Télécharger le PDF réorganisé', instruction: 'Enregistrez le document final avec les pages dans le bon ordre.' }
      ],
      de: [
        { stepNumber: 1, title: 'PDF-Dokument hochladen', instruction: 'Ziehen Sie die PDF in den visuellen Seitenmanager.' },
        { stepNumber: 2, title: 'Per Drag & Drop sortieren', instruction: 'Verschieben Sie die Seitenvorschauen in die gewünschte Lesereihenfolge.' },
        { stepNumber: 3, title: 'Neue Abfolge übernehmen', instruction: 'Klicken Sie auf Seiten sortieren, um die interne Struktur zu aktualisieren.' },
        { stepNumber: 4, title: 'Neu sortierte PDF speichern', instruction: 'Laden Sie das geordnete Dokument direkt auf Ihr Gerät herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar ficheiro PDF', instruction: 'Adicione o documento na área visual de organização de páginas.' },
        { stepNumber: 2, title: 'Arrastar e ordenar', instruction: 'Mova as miniaturas até que fiquem na sequência pretendida.' },
        { stepNumber: 3, title: 'Aplicar nova ordem', instruction: 'Clique em Reordenar páginas para atualizar os apontadores no navegador.' },
        { stepNumber: 4, title: 'Baixar PDF reorganizado', instruction: 'Transfira o arquivo com as páginas na ordem correta.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PDF 파일 업로드', instruction: '페이지 순서를 바꿀 PDF 문서를 작업 창에 끌어옵니다.' },
        { stepNumber: 2, title: '드래그하여 순서 재배치', instruction: '페이지 썸네일을 마우스나 터치로 드래그하여 원하는 순서로 정렬합니다.' },
        { stepNumber: 3, title: '새 순서 적용', instruction: '페이지 재정렬 버튼을 눌러 메모리 상의 페이지 배열을 갱신합니다.' },
        { stepNumber: 4, title: '정렬된 PDF 저장', instruction: '순서가 완벽히 정리된 새 PDF 문서를 기기에 다운로드합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica documento PDF', instruction: 'Trascina il file nell’organizzatore visivo delle pagine.' },
        { stepNumber: 2, title: 'Trascina per ordinare', instruction: 'Sposta le anteprime fino a ottenere la successione desiderata.' },
        { stepNumber: 3, title: 'Applica nuovo ordine', instruction: 'Clicca su Riordina pagine per aggiornare l’albero del catalogo in locale.' },
        { stepNumber: 4, title: 'Scarica PDF riordinato', instruction: 'Salva il documento definitivo con la corretta sequenza di lettura.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Fixing Inverted Page Sequence in a Collated Document Scan',
        scenario: 'A user scanned a 10-page legal brief that was accidentally fed backwards into the scanner (pages 10 down to 1).',
        calculation: 'The tool imports the 10 pages, reverses the index array [9, 8, 7, ... 0] back to [0, 1, 2, ... 9], and compiles the PDF.',
        result: 'A corrected 10-page document restored to proper chronological order in 0.5 seconds without quality loss.'
      },
      hi: {
        title: 'उल्टे स्कैन हुए कानूनी दस्तावेज के पेजों को सीधे क्रम में लगाना',
        scenario: 'एक उपयोगकर्ता ने 10 पेज का कानूनी दस्तावेज स्कैन किया जो स्कैनर में उल्टा चला गया और पेज 10 से 1 के क्रम में सेव हो गया।',
        calculation: 'टूल ने सभी 10 पेजों को पढ़ा, उनके क्रम को उलटकर [1, 2, 3... 10] किया और फाइल सेव की।',
        result: 'मात्र 0.5 सेकंड में बिना किसी क्वालिटी नुकसान के सभी 10 पेज सही सीधे क्रम में व्यवस्थित हो गए।'
      },
      es: {
        title: 'Inversión de páginas en escaneo alimentado al revés',
        scenario: 'Un usuario escanea un documento legal de 10 páginas que quedó registrado en orden inverso (de la 10 a la 1).',
        calculation: 'La herramienta invierte la secuencia de índices de página y recompila la estructura del PDF.',
        result: 'Documento de 10 páginas restablecido a su orden cronológico correcto en 0,5 segundos.'
      },
      ja: {
        title: 'スキャナー給紙ミスで逆順（10P〜1P）になった文書の修復実例',
        scenario: '全10ページの提出書類が、スキャナーの裏表取り込みミスで逆順（10ページから1ページへ）に保存されてしまった場合。',
        calculation: 'インデックス配列をワンクリックで反転［0, 1, 2... 9］し、ドキュメントツリーを再保存。',
        result: '画質の劣化なく、わずか0.5秒で正しい昇順（1〜10ページ）に完全復元されたPDFが完成。'
      },
      fr: {
        title: 'Correction d’un document numérisé en ordre inverse',
        scenario: 'Un collaborateur a numérisé un dossier de 10 pages enregistré à l’envers (de la page 10 à la page 1).',
        calculation: 'L’outil inverse l’ordre des index de page et régénère le PDF sans retoucher aux éléments visuels.',
        result: 'Dossier de 10 pages remis dans l’ordre chronologique en 0,5 seconde en local.'
      },
      de: {
        title: 'Wiederherstellung der korrekten Reihenfolge bei Rückwärts-Scan',
        scenario: 'Ein 10-seitiger Schriftsatz wurde versehentlich rückwärts gescannt (von Seite 10 bis Seite 1).',
        calculation: 'Das Tool kehrt die Indexabfolge um und speichert das PDF in der richtigen chronologischen Folge.',
        result: 'Korrekt geordnetes 10-seitiges Dokument in 0,5 Sekunden ohne Datenverlust erzeugt.'
      },
      pt: {
        title: 'Correção de Sequência Invertida num Escaneamento',
        scenario: 'Um utilizador digitalizou um documento de 10 páginas que ficou na ordem contrária (da página 10 à 1).',
        calculation: 'A ferramenta inverte a matriz de páginas e regrava o arquivo na ordem natural.',
        result: 'Documento de 10 páginas restabelecido na sequência correta em 0,5 segundos com total nitidez.'
      },
      ko: {
        title: '스캐너 역순 급지로 10페이지부터 1페이지까지 거꾸로 저장된 문서 복원',
        scenario: '10페이지 분량의 문서를 스캔했는데 급지함에서 역방향으로 들어가 10페이지부터 1페이지 순서로 잘못 저장된 상황입니다.',
        calculation: '페이지 배열 인덱스를 즉시 역순 정렬하여 올바른 1페이지부터 10페이지 순서로 재배열합니다.',
        result: '화질 손상 없이 0.5초 만에 정상적인 순서로 정렬된 10페이지 PDF 문서 완성.'
      },
      it: {
        title: 'Ripristino della sequenza corretta in scansione inversa',
        scenario: 'Un utente ha scansionato un fascicolo da 10 pagine acquisito per sbaglio a ritroso (dalla 10 alla 1).',
        calculation: 'Il programma inverte la sequenza delle pagine e ricompila la struttura interna del PDF.',
        result: 'Fascicolo di 10 pagine ripristinato nel corretto ordine progressivo in 0,5 secondi in locale.'
      }
    },
    faqs: [
      {
        question: 'Does reordering pages alter the visual resolution or font sharpness?',
        answer: 'No. Reordering purely adjusts pointer positions in the document page tree. Underlying vector paths, fonts, and images are untouched and 100% lossless.'
      },
      {
        question: 'Can I reorder very large PDF documents?',
        answer: 'Yes. Documents containing dozens of pages can be easily reordered. Because operations occur in browser memory, smooth operation is guaranteed.'
      },
      {
        question: 'Are my confidential documents uploaded to any remote server?',
        answer: 'No. All reordering takes place locally on your machine using JavaScript. No document content is ever transmitted across the internet.'
      },
      {
        question: 'Can I duplicate or delete pages while reordering?',
        answer: 'This tool focuses on sequencing. To remove pages, please use our dedicated Delete Pages from PDF tool.'
      }
    ]
  },

  'pdf-to-grayscale': {
    name: 'PDF to Grayscale',
    formulaTitle: {
      en: 'In-Browser Rec. 601 Luma Transform & Canvas Monochromatization Pipeline',
      hi: 'इन-ब्राउज़र Rec. 601 ल्यूमा ट्रांसफॉर्म और कैनवास मोनोक्रोम पाइपलाइन',
      es: 'Transformación de Luminancia Rec. 601 y Monocromatización Canvas en Cliente',
      ja: 'ブラウザ内Rec. 601輝度変換とCanvasモノクロ化パイプライン技術',
      fr: 'Transformation de Luminance Rec. 601 et Pipeline de Monochromatisation Canvas',
      de: 'Lokale Rec.-601-Luminanztransformation & Canvas-Monochromatisierung',
      pt: 'Transformação de Luminância Rec. 601 e Monocromatização Canvas no Navegador',
      ko: '브라우저 내 Rec. 601 휘도 변환 및 Canvas 흑백 모노크롬 변환 구조',
      it: 'Trasformazione di Luminanza Rec. 601 e Monocromatizzazione Canvas nel Browser'
    },
    formulaDescription: {
      en: 'The converter uses Mozilla PDF.js to render each PDF page into an HTML5 Canvas, computes standardized Rec. 601 grayscale luminance for every RGB pixel using Y = 0.299*R + 0.587*G + 0.114*B, sets R=G=B=Y across the ImageData buffer, and re-encapsulates the monochrome pages into a clean, ink-efficient PDF document via jsPDF in browser memory.',
      hi: 'यह टूल मोज़िला की PDF.js का उपयोग करके प्रत्येक पेज को HTML5 कैनवास पर रेंडर करता है। यह प्रत्येक पिक्सल के लिए Rec. 601 फॉर्मूला (Y = 0.299*R + 0.587*G + 0.114*B) लागू करके सभी रंगों को ग्रेस्केल (ब्लैक एंड व्हाइट) में बदलता है और jsPDF के माध्यम से बिना किसी सर्वर पर भेजे सीधे आपके डिवाइस पर नई मोनोक्रोम पीडीएफ तैयार करता है।',
      es: 'El conversor renderiza cada página en un lienzo HTML5 con PDF.js, aplica la fórmula de luminancia Rec. 601 (Y = 0,299*R + 0,587*G + 0,114*B) a cada píxel y recompone las páginas monocromáticas en un nuevo PDF mediante jsPDF.',
      ja: '本変換器はMozilla PDF.jsを用いて各ページをHTML5 Canvas上に精密展開。各ピクセルに標準Rec. 601規格の輝度計算式（Y = 0.299R + 0.587G + 0.114B）を適用して完全なグレースケールに変換し、jsPDFでインク節約型PDFをローカル生成します。',
      fr: 'Le convertisseur restitue chaque page sur un Canvas HTML5 via PDF.js, applique la formule de luminance Rec. 601 (Y = 0,299*R + 0,587*G + 0,114*B) sur chaque pixel et assemble un PDF monochrome économique avec jsPDF.',
      de: 'Der Konverter zeichnet jede Seite mit PDF.js in ein HTML5-Canvas, berechnet für jeden Bildpunkt die Rec.-601-Graustufenluminanz (Y = 0,299*R + 0,587*G + 0,114*B) und erstellt mit jsPDF ein tintensparendes Monochrom-PDF.',
      pt: 'O conversor renderiza cada página num Canvas HTML5 com a PDF.js, calcula a luminância Rec. 601 (Y = 0,299*R + 0,587*G + 0,114*B) para cada pixel e monta um novo PDF monocromático via jsPDF com privacidade total.',
      ko: '본 변환기는 Mozilla PDF.js를 통해 각 페이지를 HTML5 Canvas에 렌더링하고, Rec. 601 국제 표준 휘도 공식(Y = 0.299R + 0.587G + 0.114B)을 적용하여 모든 픽셀을 흑백 모노크롬으로 변환한 뒤 jsPDF로 잉크 절약형 PDF를 빌드합니다.',
      it: 'Il convertitore visualizza ogni pagina su Canvas HTML5 con PDF.js, applica la formula di luminanza Rec. 601 (Y = 0,299*R + 0,587*G + 0,114*B) a ciascun pixel e assembla un PDF in scala di grigi con jsPDF nel browser.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Color PDF', instruction: 'Drag and drop your color PDF document into the grayscale converter.' },
        { stepNumber: 2, title: 'Select Output Resolution', instruction: 'Choose DPI settings: 150 DPI (balanced for email and archiving) or 300 DPI (high-fidelity for print).' },
        { stepNumber: 3, title: 'Execute Grayscale Conversion', instruction: 'Click Convert to Grayscale to apply Rec. 601 pixel luminances across all pages.' },
        { stepNumber: 4, title: 'Download Monochrome PDF', instruction: 'Save the black-and-white PDF document directly to your computer or mobile device.' }
      ],
      hi: [
        { stepNumber: 1, title: 'रंगीन पीडीएफ अपलोड करें', instruction: 'अपनी रंगीन पीडीएफ फाइल को ग्रेस्केल कनवर्टर बॉक्स में खींचें या चुनें।' },
        { stepNumber: 2, title: 'आउटपुट रेजोल्यूशन चुनें', instruction: 'DPI सेटिंग्स चुनें: 150 DPI (ईमेल और शेयरिंग के लिए) या 300 DPI (स्पष्ट प्रिंटिंग के लिए)।' },
        { stepNumber: 3, title: 'ग्रेस्केल में बदलें', instruction: 'कन्वर्ट टू ग्रेस्केल पर क्लिक करें और ब्राउज़र में सभी रंगों को ब्लैक एंड व्हाइट में बदलें।' },
        { stepNumber: 4, title: 'मोनोक्रोम पीडीएफ डाउनलोड करें', instruction: 'प्रिंटिंग इंक बचाने वाली ब्लैक एंड व्हाइट पीडीएफ फाइल सुरक्षित डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Subir PDF a color', instruction: 'Arrastre el documento que desea transformar a blanco y negro.' },
        { stepNumber: 2, title: 'Elegir resolución', instruction: 'Seleccione 150 DPI (óptimo para correo) o 300 DPI (calidad de imprenta).' },
        { stepNumber: 3, title: 'Convertir a escala de grises', instruction: 'Inicie la conversión para procesar los píxeles en el lienzo del navegador.' },
        { stepNumber: 4, title: 'Descargar PDF monocromo', instruction: 'Guarde el documento en blanco y negro optimizado para ahorrar tinta.' }
      ],
      ja: [
        { stepNumber: 1, title: 'カラーPDFをアップロード', instruction: '白黒に変換したいカラーPDFファイルをドラッグ＆ドロップまたは選択します。' },
        { stepNumber: 2, title: '出力解像度（DPI）を選択', instruction: '150 DPI（標準・ファイル軽量化）または300 DPI（高精細・印刷用）を選択します。' },
        { stepNumber: 3, title: 'グレースケール変換を実行', instruction: '「グレースケールに変換」をクリックしてブラウザ内輝度変換を開始します。' },
        { stepNumber: 4, title: '白黒PDFをダウンロード', instruction: '印刷インクを節約できるモノクロPDFファイルを保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer le PDF couleur', instruction: 'Sélectionnez le document que vous souhaitez passer en noir et blanc.' },
        { stepNumber: 2, title: 'Choisir la résolution', instruction: 'Optez pour 150 DPI (recommandé pour archivage) ou 300 DPI (qualité d’impression).' },
        { stepNumber: 3, title: 'Convertir en niveaux de gris', instruction: 'Lancez le calcul de luminance sur le Canvas HTML5.' },
        { stepNumber: 4, title: 'Télécharger le PDF monochrome', instruction: 'Enregistrez le document sans couleur prêt pour l’impression économique.' }
      ],
      de: [
        { stepNumber: 1, title: 'Farb-PDF hochladen', instruction: 'Ziehen Sie das farbige PDF-Dokument in den Konverterbereich.' },
        { stepNumber: 2, title: 'Auflösung festlegen', instruction: 'Wählen Sie 150 DPI (für Bildschirm/Mail) oder 300 DPI (für den Druck).' },
        { stepNumber: 3, title: 'In Graustufen umwandeln', instruction: 'Wandeln Sie alle RGB-Pixel im Browser-Canvas in Graustufen um.' },
        { stepNumber: 4, title: 'Monochrom-PDF speichern', instruction: 'Laden Sie das toner- und tintensparende Dokument herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar PDF a cores', instruction: 'Adicione o documento que deseja converter para preto e branco.' },
        { stepNumber: 2, title: 'Definir resolução', instruction: 'Escolha 150 DPI (ideal para e-mail) ou 300 DPI (alta qualidade de impressão).' },
        { stepNumber: 3, title: 'Converter para tons de cinzento', instruction: 'Inicie a transformação de luminância diretamente no navegador.' },
        { stepNumber: 4, title: 'Baixar PDF monocromático', instruction: 'Guarde o ficheiro pronto para poupar tinta de impressão.' }
      ],
      ko: [
        { stepNumber: 1, title: '컬러 PDF 업로드', instruction: '흑백으로 변환할 컬러 PDF 문서를 작업 창에 끌어옵니다.' },
        { stepNumber: 2, title: '출력 해상도(DPI) 선택', instruction: '150 DPI(이메일 및 보관용) 또는 300 DPI(고품질 인쇄용)를 선택합니다.' },
        { stepNumber: 3, title: '흑백 그레이스케일 변환', instruction: '그레이스케일 변환 버튼을 눌러 브라우저 Canvas에서 픽셀 변환을 시작합니다.' },
        { stepNumber: 4, title: '흑백 문서 다운로드', instruction: '프린터 잉크와 토너를 대폭 절약할 수 있는 모노크롬 PDF를 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica PDF a colori', instruction: 'Trascina il documento che desideri convertire in bianco e nero.' },
        { stepNumber: 2, title: 'Seleziona risoluzione', instruction: 'Scegli 150 DPI (ottimale per invio) o 300 DPI (qualità di stampa).' },
        { stepNumber: 3, title: 'Converti in scala di grigi', instruction: 'Avvia l’elaborazione dei pixel su Canvas HTML5 nel browser.' },
        { stepNumber: 4, title: 'Scarica PDF monocromatico', instruction: 'Salva il documento in bianco e nero perfetto per risparmiare inchiostro.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Preparing a 12-Page Color Brief for Black-and-White Legal Filing',
        scenario: 'A law firm needs to file a 12-page legal brief with a judicial court system that strictly mandates monochrome submissions and rejects color graphics.',
        calculation: 'The tool renders the 12 pages onto Canvas elements at 300 DPI, applies Rec. 601 grayscale luminance conversion to strip all chroma channels, and creates a clean monochrome PDF.',
        result: 'A 100% court-compliant 12-page monochrome PDF generated in 2.4 seconds with high-contrast text and zero server transmission.'
      },
      hi: {
        title: 'अदालती रिकॉर्ड के लिए 12 पेजों की रंगीन फाइल को ब्लैक एंड व्हाइट में बदलना',
        scenario: 'एक कानूनी फर्म को कोर्ट में 12 पेजों की फाइल जमा करनी है जहां केवल ब्लैक एंड व्हाइट दस्तावेज ही स्वीकार किए जाते हैं।',
        calculation: 'टूल ने सभी 12 पेजों को 300 DPI पर रेंडर किया, Rec. 601 फॉर्मूला से सभी रंगों को साफ ग्रेस्केल में बदला और नई पीडीएफ बनाई।',
        result: 'मात्र 2.4 सेकंड में कोर्ट के नियमों के 100% अनुकूल 12 पेजों की ब्लैक एंड व्हाइट पीडीएफ तैयार हो गई।'
      },
      es: {
        title: 'Adaptación de escrito judicial a normativa de presentación en blanco y negro',
        scenario: 'Un despacho de abogados debe presentar un escrito de 12 páginas en un juzgado que exige exclusivamente documentos monocromáticos.',
        calculation: 'La herramienta procesa las 12 páginas a 300 DPI, elimina la información cromática mediante la norma Rec. 601 y crea el nuevo PDF.',
        result: 'Documento monocromo de 12 páginas generado en 2,4 segundos 100% conforme a las directrices judiciales.'
      },
      ja: {
        title: '裁判所提出用に12ページのカラー資料を完全モノクロ化する実例',
        scenario: '弁護士事務所が、裁判所の電子申告システムで規定されている「白黒提出基準」に適合させるため、12ページの証拠資料をモノクロ化したい場合。',
        calculation: '全12ページを300DPIでCanvas上に描画し、Rec. 601規格で全ピクセルを忠実な輝度グレースケールに変換。',
        result: '提出規定に完全適合した高コントラストの12ページ白黒PDFが2.4秒で完成。'
      },
      fr: {
        title: 'Mise en conformité d’un mémoire juridique avec les normes noir et blanc',
        scenario: 'Un cabinet d’avocats doit déposer un dossier de 12 pages auprès d’une juridiction qui n’accepte que les pièces monochromes.',
        calculation: 'L’outil traite les 12 pages à 300 DPI, élimine les composantes de couleur via la formule Rec. 601 et génère le PDF.',
        result: 'Document conforme de 12 pages obtenu en 2,4 secondes avec des textes et bordures parfaitement lisibles.'
      },
      de: {
        title: 'Anpassung eines 12-seitigen Dokuments an gerichtliche Monochrom-Vorgaben',
        scenario: 'Eine Kanzlei muss einen 12-seitigen Schriftsatz bei einem Gericht einreichen, das ausschließlich Schwarz-Weiß-Vorlagen akzeptiert.',
        calculation: 'Das Tool wandelt alle 12 Seiten mit 300 DPI über die Rec.-601-Formel in Graustufen um und erzeugt die finale PDF.',
        result: 'Gerichtskonformes 12-seitiges Schwarz-Weiß-Dokument innerhalb von 2,4 Sekunden lokal erzeugt.'
      },
      pt: {
        title: 'Adequação de Peça Jurídica a Padrão Monocromático',
        scenario: 'Um escritório de advocacia precisa submeter uma petição de 12 páginas a um tribunal que exige estritamente arquivos a preto e branco.',
        calculation: 'A ferramenta converte as 12 páginas a 300 DPI para escala de cinzentos Rec. 601 e gera o novo PDF.',
        result: 'Ficheiro de 12 páginas 100% em conformidade gerado em 2,4 segundos com privacidade garantida.'
      },
      ko: {
        title: '법원 전자 소송 제출 규격에 맞춘 12페이지 컬러 증거 자료 흑백 변환 실례',
        scenario: '법률 사무소에서 흑백 문서 제출만 허용하는 법원 전자소송 포털 규격에 맞춰 12페이지 컬러 서증을 변환하려 합니다.',
        calculation: '12개 페이지를 300 DPI로 렌더링하고 Rec. 601 공식으로 채도를 제거하여 흑백 PDF로 패키징합니다.',
        result: '법원 제출 규격을 완벽히 충족하는 선명한 12페이지 흑백 PDF가 2.4초 만에 생성 완료.'
      },
      it: {
        title: 'Adattamento di fascicolo legale agli standard monocromatici del tribunale',
        scenario: 'Uno studio legale deve depositare una memoria di 12 pagine presso una corte che accetta solo atti in bianco e nero.',
        calculation: 'Il programma converte i fogli a 300 DPI in scala di grigi Rec. 601 e compila il PDF monocromatico finale.',
        result: 'Documento conforme di 12 pagine ottenuto in 2,4 secondi con caratteri nitidi e massimo contrasto.'
      }
    },
    faqs: [
      {
        question: 'Why convert color PDFs to grayscale?',
        answer: 'Grayscale documents save expensive colored printer ink or toner, create clean contrast for photocopying, reduce storage footprints, and satisfy official court or government monochrome submission standards.'
      },
      {
        question: 'Is my document uploaded to an external server?',
        answer: 'No. The conversion occurs entirely inside your local browser memory using PDF.js and jsPDF. Your sensitive documents and personal information never leave your machine.'
      },
      {
        question: 'Can I choose the output image quality and DPI?',
        answer: 'Yes. You can choose between 150 DPI (standard for digital storage and email) and 300 DPI (high-resolution print-ready output).'
      },
      {
        question: 'Does grayscale conversion affect vector text searchability?',
        answer: 'Because the pages are re-rendered at chosen DPI onto Canvas to guarantee 100% color elimination across all embedded raster graphics, fonts, and borders, the output is formatted as high-contrast print-ready pages.'
      }
    ]
  }
};
