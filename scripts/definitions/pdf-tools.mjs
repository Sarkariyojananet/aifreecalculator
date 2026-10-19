// scripts/definitions/pdf-tools.mjs
// Auto-assembled PDF tool definitions for all 14 tools across 9 locales

export const pdfToolsDefinitions = {
  "pdf-merge": {
    "name": "PDF Merge",
    "formulaTitle": {
      "en": "Client-Side Binary PDF Stream Concatenation & Object Mapping",
      "hi": "क्लाइंट-साइड बाइनरी पीडीएफ स्ट्रीम संयोजन और ऑब्जेक्ट मैपिंग",
      "es": "Concatenación de Flujos Binarios PDF y Mapeo de Objetos en Cliente",
      "ja": "クライアントサイドPDFバイナリストリーム結合とオブジェクトマッピング",
      "fr": "Concaténation de Flux Binaires PDF et Mappage d’Objets Côté Client",
      "de": "Clientseitige PDF-Stream-Zusammenführung & Objektreferenzierung",
      "pt": "Concatenação de Streams Binários de PDF e Mapeamento de Objetos no Navegador",
      "ko": "클라이언트 측 바이너리 PDF 스트림 병합 및 객체 트리 매핑",
      "it": "Concatenazione Stream Binari PDF e Mappatura Oggetti Lato Client"
    },
    "formulaDescription": {
      "en": "The merger parses multiple PDF ArrayBuffers using pdf-lib in browser memory. It creates a blank PDFDocument, iterates through each source document to copy target pages via copyPages(), updates cross-reference (xref) tables, re-indexes internal dictionary object references, and serializes the merged output to Uint8Array without sending files across the network.",
      "hi": "यह टूल ब्राउज़र मेमोरी में pdf-lib लाइब्रेरी द्वारा कई पीडीएफ ArrayBuffer को प्रोसेस करता है। यह एक नया PDFDocument बनाकर copyPages() के ज़रिये सभी पेजों को क्रमबद्ध रूप से जोड़ता है, आंतरिक संदर्भ तालिकाओं (xref) को री-इंडेक्स करता है और बिना किसी सर्वर पर भेजे सीधे आपके डिवाइस पर नई पीडीएफ तैयार करता है।",
      "es": "El combinador analiza múltiples ArrayBuffers de PDF mediante pdf-lib en la memoria del navegador. Crea un nuevo PDFDocument, copia páginas con copyPages(), reconstruye las tablas de referencias cruzadas (xref) y genera un Uint8Array descargable sin transferir archivos a ningún servidor externo.",
      "ja": "本ツールはブラウザのメモリ内でpdf-libを用いて複数のPDFバイナリ（ArrayBuffer）を解析します。新規PDFDocumentを生成し、copyPages()で各ページの辞書オブジェクトと相互参照テーブル（xref）を安全に再構築して統合PDFを生成。データは外部に送信されません。",
      "fr": "Le fusionneur analyse les ArrayBuffers de vos PDF via pdf-lib dans la mémoire du navigateur. Il initialise un nouveau PDFDocument, copie les pages via copyPages(), recalcule la table des références croisées (xref) et sérialise le document sans aucun transfert vers un serveur.",
      "de": "Der Zusammenführer analysiert mehrere PDF-ArrayBuffers mit pdf-lib im Arbeitsspeicher des Browsers. Er erstellt ein neues PDFDocument, kopiert Seiten via copyPages(), aktualisiert die Querverweistabellen (xref) und serialisiert die Ausgabe als Uint8Array vollständig lokal.",
      "pt": "O mesclador processa múltiplos ArrayBuffers de PDF usando pdf-lib na memória do navegador. Cria um novo PDFDocument, copia páginas via copyPages(), recalcula a tabela de referências cruzadas (xref) e exporta um arquivo Uint8Array sem qualquer upload.",
      "ko": "본 병합기는 브라우저 메모리 상에서 pdf-lib를 활용하여 복수의 PDF ArrayBuffer를 파싱합니다. 신규 PDFDocument를 생성하고 copyPages()를 통해 페이지 트리를 복사한 뒤 상호참조 테이블(xref)을 갱신하여 서버 통신 없이 즉시 단일 PDF로 내보냅니다.",
      "it": "Il programma analizza molteplici ArrayBuffer di PDF tramite pdf-lib nella memoria locale. Crea un nuovo PDFDocument, copia le pagine con copyPages(), aggiorna la tabella dei riferimenti incrociati (xref) e serializza l’output finale in locale senza trasmettere file a server remoti."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Documents",
          "instruction": "Select or drag two or more PDF documents into the upload area."
        },
        {
          "stepNumber": 2,
          "title": "Reorder Document Sequence",
          "instruction": "Drag and drop or use Move Up/Down buttons to arrange files in your desired reading order."
        },
        {
          "stepNumber": 3,
          "title": "Click Merge PDFs",
          "instruction": "Initiate in-browser page tree concatenation and cross-reference table indexing."
        },
        {
          "stepNumber": 4,
          "title": "Download Merged PDF",
          "instruction": "Save the unified document locally to your computer or mobile device."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइलें अपलोड करें",
          "instruction": "दो या दो से अधिक पीडीएफ फाइलों को अपलोड बॉक्स में चुनें या खींचें।"
        },
        {
          "stepNumber": 2,
          "title": "पेज क्रम व्यवस्थित करें",
          "instruction": "दस्तावेजों को अपनी इच्छानुसार ऊपर या नीचे ले जाकर सही क्रम में सेट करें।"
        },
        {
          "stepNumber": 3,
          "title": "मर्ज पीडीएफ पर क्लिक करें",
          "instruction": "ब्राउज़र में सीधे पेजों को जोड़ने की प्रक्रिया शुरू करें।"
        },
        {
          "stepNumber": 4,
          "title": "संयुक्त पीडीएफ डाउनलोड करें",
          "instruction": "तैयार एकीकृत पीडीएफ फाइल को अपने डिवाइस पर सुरक्षित सेव करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir documentos PDF",
          "instruction": "Seleccione o arrastre dos o más archivos PDF al área de carga."
        },
        {
          "stepNumber": 2,
          "title": "Ordenar secuencia",
          "instruction": "Organice el orden de los archivos usando los botones de subir o bajar."
        },
        {
          "stepNumber": 3,
          "title": "Combinar archivos",
          "instruction": "Inicie la unión y reindexación de páginas en la memoria del navegador."
        },
        {
          "stepNumber": 4,
          "title": "Descargar PDF final",
          "instruction": "Guarde el documento resultante de inmediato en su dispositivo."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルを追加",
          "instruction": "結合したい2つ以上のPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "表示順序を並べ替え",
          "instruction": "結合順に合わせてファイルカードを上下に移動して順序を整えます。"
        },
        {
          "stepNumber": 3,
          "title": "結合を実行",
          "instruction": "「PDFを結合」をクリックし、ブラウザ内で高速ストリームマージ処理を開始します。"
        },
        {
          "stepNumber": 4,
          "title": "結合PDFを保存",
          "instruction": "結合が完了したPDFファイルをローカルストレージにダウンロードします。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Importer vos fichiers PDF",
          "instruction": "Sélectionnez ou glissez-déposez au moins deux documents PDF dans la zone dédiée."
        },
        {
          "stepNumber": 2,
          "title": "Organiser l’ordre des documents",
          "instruction": "Ajustez l’ordre des fichiers à l’aide des boutons Monter/Descendre."
        },
        {
          "stepNumber": 3,
          "title": "Fusionner les PDF",
          "instruction": "Lancez l’assemblage local des pages et des dictionnaires PDF."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le document",
          "instruction": "Enregistrez le document complet fusionné directement sur votre appareil."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Dateien hinzufügen",
          "instruction": "Wählen oder ziehen Sie mindestens zwei PDF-Dokumente in den Upload-Bereich."
        },
        {
          "stepNumber": 2,
          "title": "Reihenfolge festlegen",
          "instruction": "Verschieben Sie die Dateien nach oben oder unten, um die gewünschte Seitenabfolge zu erzielen."
        },
        {
          "stepNumber": 3,
          "title": "PDFs zusammenführen",
          "instruction": "Starten Sie die lokale Zusammenführung und Neuindizierung im Browser."
        },
        {
          "stepNumber": 4,
          "title": "Zusammengefügtes PDF speichern",
          "instruction": "Laden Sie das fertige Gesamt-PDF direkt auf Ihren Rechner oder Ihr Mobilgerät herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Adicionar ficheiros PDF",
          "instruction": "Selecione ou arraste dois ou mais documentos PDF para a área de carregamento."
        },
        {
          "stepNumber": 2,
          "title": "Organizar a ordem",
          "instruction": "Utilize os botões para mover os arquivos para cima ou para baixo conforme a ordem final."
        },
        {
          "stepNumber": 3,
          "title": "Mesclar documentos",
          "instruction": "Clique em Mesclar para unir as páginas na memória local do navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF final",
          "instruction": "Guarde o documento consolidado diretamente no seu computador ou telemóvel."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 업로드",
          "instruction": "병합할 2개 이상의 PDF 파일을 선택하거나 드래그하여 추가합니다."
        },
        {
          "stepNumber": 2,
          "title": "문서 순서 정렬",
          "instruction": "위/아래 이동 버튼을 사용하여 최종 병합본에 표시될 문서 순서를 지정합니다."
        },
        {
          "stepNumber": 3,
          "title": "PDF 병합 실행",
          "instruction": "브라우저 메모리에서 객체 트리 복사 및 결합 처리를 시작합니다."
        },
        {
          "stepNumber": 4,
          "title": "완성본 다운로드",
          "instruction": "병합이 완료된 단일 PDF 파일을 기기에 안전하게 다운로드합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica documenti PDF",
          "instruction": "Seleziona o trascina due o più file PDF nell’apposita area."
        },
        {
          "stepNumber": 2,
          "title": "Ordina i documenti",
          "instruction": "Modifica la sequenza di unione spostando i file su o giù."
        },
        {
          "stepNumber": 3,
          "title": "Unisci PDF",
          "instruction": "Avvia la concatenazione e reindicizzazione delle pagine nel browser."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF unito",
          "instruction": "Salva il nuovo documento combinato sul tuo computer o smartphone."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Merging Quarterly Financial Statements",
        "scenario": "A finance manager has four individual quarterly audit reports (Q1 to Q4, 15 pages each) and wants to merge them into a single 60-page annual dossier.",
        "calculation": "The tool reads all 4 files (total size 18 MB), instantiates a master PDFDocument, extracts pages 1–15 from each document sequentially, updates page parent pointers, and writes the 60-page PDF binary.",
        "result": "A unified 60-page annual financial report produced in 1.4 seconds with zero server data exposure."
      },
      "hi": {
        "title": "तिमाही वित्तीय रिपोर्टों का एकीकरण",
        "scenario": "एक एकाउंटेंट के पास 4 अलग-अलग तिमाही ऑडिट रिपोर्ट (प्रत्येक 15 पेज) हैं और उन्हें 60 पेजों की एक वार्षिक फाइल में जोड़ना है।",
        "calculation": "टूल ने चारों फाइलों (कुल 18 MB) को पढ़ा, मास्टर डॉक्यूमेंट में सभी 60 पेजों को क्रमानुसार जोड़ा और नई पीडीएफ तैयार की।",
        "result": "मात्र 1.4 सेकंड में बिना किसी सर्वर पर डाटा भेजे 60 पेजों की वार्षिक रिपोर्ट तैयार हो गई।"
      },
      "es": {
        "title": "Unificación de informes trimestrales",
        "scenario": "Un gestor financiero tiene 4 informes trimestrales (15 páginas cada uno) y necesita consolidarlos en un único documento anual de 60 páginas.",
        "calculation": "La herramienta lee los 4 archivos (18 MB en total), copia las 60 páginas de forma secuencial en un nuevo PDF y recalcula las tablas xref.",
        "result": "Documento anual unificado de 60 páginas generado en 1,4 segundos sin enviar datos fuera del equipo."
      },
      "ja": {
        "title": "四半期財務報告書の統合実例",
        "scenario": "経理担当者が4つの四半期レポート（各15ページ）を、1つの年次報告書（計60ページ）として連結したい場合。",
        "calculation": "4ファイル（合計18MB）をブラウザ内で読み込み、ページツリーを順次連結して相互参照テーブルを再構築。",
        "result": "外部サーバーへ送信することなく、わずか1.4秒で完全な60ページの統合年次報告書が完成。"
      },
      "fr": {
        "title": "Fusion de bilans financiers trimestriels",
        "scenario": "Un analyste dispose de 4 rapports trimestriels de 15 pages chacun et souhaite créer un unique rapport annuel de 60 pages.",
        "calculation": "L’outil charge les 4 documents (18 Mo au total), copie séquentiellement les 60 pages dans un nouveau PDF et réindexe les objets.",
        "result": "Rapport complet de 60 pages obtenu en 1,4 seconde en toute confidentialité."
      },
      "de": {
        "title": "Zusammenführung von Quartalsberichten",
        "scenario": "Ein Finanzleiter möchte 4 Quartalsberichte (je 15 Seiten) zu einem lückenlosen Jahresbericht mit 60 Seiten zusammenfassen.",
        "calculation": "Das Tool lädt die 4 Dateien (insgesamt 18 MB), fügt die 60 Seiten nacheinander in ein neues PDF-Dokument ein und aktualisiert die Baumstruktur.",
        "result": "Vollständiger 60-seitiger Jahresbericht innerhalb von 1,4 Sekunden ohne Datenweitergabe erstellt."
      },
      "pt": {
        "title": "Consolidação de Relatórios Trimestrais",
        "scenario": "Um gestor precisa unificar quatro relatórios de 15 páginas cada em um único dossiê anual de 60 páginas.",
        "calculation": "A ferramenta lê os 4 ficheiros (18 MB), copia as 60 páginas em sequência e recria a tabela de referências.",
        "result": "Relatório anual de 60 páginas gerado em 1,4 segundos com privacidade absoluta."
      },
      "ko": {
        "title": "분기별 재무 보고서 병합 예시",
        "scenario": "재무 담당자가 4개의 분기별 보고서(각 15페이지)를 하나의 60페이지 연간 종합 보고서로 취합하고자 합니다.",
        "calculation": "4개 파일(총 18MB)을 브라우저 메모리에 로드하고 60페이지를 순차 결합하여 객체 트리를 재생성합니다.",
        "result": "외부 유출 위험 없이 1.4초 만에 60페이지 연간 보고서 병합 완료."
      },
      "it": {
        "title": "Unione di rendiconti trimestrali",
        "scenario": "Un responsabile contabile deve unire quattro report trimestrali da 15 pagine ciascuno in un fascicolo unico di 60 pagine.",
        "calculation": "Il sistema carica i 4 file (18 MB totali), unisce le 60 pagine e corregge i puntatori di catalogo.",
        "result": "Documento completo di 60 pagine creato in 1,4 secondi nel totale rispetto della riservatezza."
      }
    },
    "faqs": [
      {
        "question": "Are my confidential documents uploaded to an external server?",
        "answer": "No. Processing is executed 100% locally in your web browser using client-side JavaScript. Your confidential contracts, financial statements, and personal records never leave your device."
      },
      {
        "question": "Is there a limit on file size or the number of PDFs I can merge?",
        "answer": "There is no artificial quota. However, because processing uses local browser RAM, we recommend keeping combined file sizes under 150 MB on mobile devices or 300 MB on desktop computers to avoid browser memory saturation."
      },
      {
        "question": "Can I merge password-protected or encrypted PDF documents?",
        "answer": "No. Password-protected documents have encrypted content streams that prevent page extraction. Please unlock or decrypt the documents using our Unlock PDF tool before merging."
      },
      {
        "question": "Does merging compress or degrade the quality of text and graphics?",
        "answer": "No. Pages are copied verbatim as vector stream objects. Typography, vector curves, bookmarks, and embedded images retain their exact original resolution and fidelity."
      }
    ]
  },
  "pdf-split": {
    "name": "PDF Split",
    "formulaTitle": {
      "en": "Selective Page Tree Extraction & Cross-Reference Truncation",
      "hi": "चयनात्मक पेज ट्री निष्कर्षण और संदर्भ विभाजन",
      "es": "Extracción Selectiva de Árbol de Páginas y División de Referencias",
      "ja": "選択的ページツリー抽出とクロスリファレンス分離技術",
      "fr": "Extraction Sélective de l’Arbre de Pages et Séparation des Références",
      "de": "Selektive Seitenbaum-Extraktion & Querverweis-Trennung",
      "pt": "Extração Seletiva da Árvore de Páginas e Divisão de Referências",
      "ko": "선택적 페이지 트리 추출 및 상호참조 분할 아키텍처",
      "it": "Estrazione Selettiva dell’Albero delle Pagine e Troncatura Riferimenti"
    },
    "formulaDescription": {
      "en": "The splitter loads the target PDF document into browser memory via pdf-lib, traverses the document Pages catalog tree, clones only specified page indexes into discrete PDFDocument instances, isolates font and resource dictionaries, and exports independent PDF binaries.",
      "hi": "यह टूल ब्राउज़र में pdf-lib की मदद से आपकी मूल पीडीएफ फाइल को पढ़ता है, चुने गए पेजों के इंडेक्स को नए PDFDocument में क्लोन करता है और बिना किसी सर्वर पर डाटा भेजे स्वतंत्र अलग-अलग पीडीएफ फाइलों में बांट देता है।",
      "es": "El divisor carga el documento en la memoria local mediante pdf-lib, recorre el árbol de páginas, clona únicamente los índices de página indicados en nuevos documentos independientes y exporta los archivos resultantes.",
      "ja": "本スプリッターはpdf-libを使い、指定されたページインデックスのみを新規PDFDocumentインスタンスに安全に複製。不要なメタデータや無関係なページリソースを排除した独立PDFファイルを生成します。",
      "fr": "Le diviseur charge le document dans la mémoire du navigateur, clone uniquement les pages ciblées dans de nouveaux conteneurs PDF et génère des fichiers allégés et autonomes.",
      "de": "Der Teiler lädt die Datei in den Browserspeicher, isoliert die angegebenen Seitenindizes in neuen Dokumentinstanzen und erzeugt eigenständige PDF-Dateien ohne Serverinteraktion.",
      "pt": "O divisor lê o documento na memória local, clona apenas as páginas selecionadas para instâncias separadas e produz arquivos PDF independentes com total segurança.",
      "ko": "본 분할기는 pdf-lib를 통해 페이지 카탈로그 트리를 탐색하고, 사용자가 지정한 페이지 인덱스만 새 PDFDocument로 복제하여 독립적인 PDF 바이너리로 추출합니다.",
      "it": "Il programma analizza l’albero delle pagine tramite pdf-lib, estrae selettivamente gli intervalli specificati e genera nuovi file PDF del tutto indipendenti in locale."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your PDF file or select it from your local storage."
        },
        {
          "stepNumber": 2,
          "title": "Define Page Range or Split Mode",
          "instruction": "Specify page numbers (e.g., \"1-5, 8, 12-15\") or choose to extract every page as an individual file."
        },
        {
          "stepNumber": 3,
          "title": "Execute Separation",
          "instruction": "Click Split PDF to isolate target pages into standalone documents in browser memory."
        },
        {
          "stepNumber": 4,
          "title": "Download Extracted Files",
          "instruction": "Download your separated PDF file or a ZIP bundle containing all split documents."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल चुनें",
          "instruction": "अपनी पीडीएफ फाइल को अपलोड क्षेत्र में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "पेज रेंज या मोड चुनें",
          "instruction": "आवश्यक पेज नंबर दर्ज करें (उदा. \"1-5, 8\") या हर पेज को अलग करने का विकल्प चुनें।"
        },
        {
          "stepNumber": 3,
          "title": "विभाजन शुरू करें",
          "instruction": "स्प्लिट पीडीएफ पर क्लिक करें और ब्राउज़र में पेजों को अलग करें।"
        },
        {
          "stepNumber": 4,
          "title": "अलग की गई फाइल डाउनलोड करें",
          "instruction": "निकाली गई पीडीएफ फाइल या सभी पेजों की जिप फाइल डाउनलोड करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Cargar archivo PDF",
          "instruction": "Arrastre su documento o selecciónelo desde el explorador de archivos."
        },
        {
          "stepNumber": 2,
          "title": "Definir páginas o rangos",
          "instruction": "Indique los números de página deseados (ej. \"1-4, 7\") o extraiga cada página."
        },
        {
          "stepNumber": 3,
          "title": "Dividir documento",
          "instruction": "Haga clic en Dividir PDF para crear los nuevos archivos en la memoria local."
        },
        {
          "stepNumber": 4,
          "title": "Descargar resultados",
          "instruction": "Guarde el PDF extraído o el archivo comprimido ZIP con todos los documentos."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルをアップロード",
          "instruction": "分割したいPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "分割範囲を指定",
          "instruction": "抽出したいページ番号（例: 1-5, 8）を入力するか、全ページ分割を選択します。"
        },
        {
          "stepNumber": 3,
          "title": "分割を実行",
          "instruction": "「PDFを分割」をクリックしてブラウザ内でのページ抽出を開始します。"
        },
        {
          "stepNumber": 4,
          "title": "分割ファイルを保存",
          "instruction": "抽出されたPDF、または全ページがまとまったZIPファイルをダウンロードします。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Charger le fichier PDF",
          "instruction": "Importez votre document PDF depuis votre ordinateur ou appareil mobile."
        },
        {
          "stepNumber": 2,
          "title": "Sélectionner les pages",
          "instruction": "Indiquez les intervalles de pages souhaités (ex. 1-3, 5) ou séparez chaque page."
        },
        {
          "stepNumber": 3,
          "title": "Lancer l’extraction",
          "instruction": "Cliquez sur Diviser le PDF pour générer les nouveaux documents en mémoire."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger les fichiers",
          "instruction": "Récupérez votre document extrait ou l’archive ZIP complète."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Dokument hochladen",
          "instruction": "Ziehen Sie die PDF-Datei in den Arbeitsbereich oder wählen Sie diese aus."
        },
        {
          "stepNumber": 2,
          "title": "Seitenbereich definieren",
          "instruction": "Geben Sie gewünschte Seitenzahlen ein (z. B. 1-5, 9) oder wählen Sie Einzelseiten-Export."
        },
        {
          "stepNumber": 3,
          "title": "Teilung durchführen",
          "instruction": "Klicken Sie auf PDF teilen, um die Seiten lokal im Speicher zu isolieren."
        },
        {
          "stepNumber": 4,
          "title": "Ergebnis herunterladen",
          "instruction": "Speichern Sie das extrahierte Dokument oder das ZIP-Paket auf Ihrem Gerät."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar ficheiro PDF",
          "instruction": "Selecione ou arraste o seu PDF para o formulário de upload."
        },
        {
          "stepNumber": 2,
          "title": "Definir intervalo de páginas",
          "instruction": "Indique as páginas pretendidas (ex: 1-4, 7) ou divida todas as páginas."
        },
        {
          "stepNumber": 3,
          "title": "Dividir ficheiro",
          "instruction": "Clique em Dividir PDF para extrair as páginas na memória do navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar arquivos",
          "instruction": "Transfira o PDF recortado ou o pacote ZIP com todos os documentos divididos."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 선택",
          "instruction": "분할하고자 하는 PDF 문서를 끌어다 놓거나 선택하여 불러옵니다."
        },
        {
          "stepNumber": 2,
          "title": "페이지 범위 지정",
          "instruction": "추출할 페이지 번호(예: 1-5, 8)를 입력하거나 개별 분할 모드를 선택합니다."
        },
        {
          "stepNumber": 3,
          "title": "분할 시작",
          "instruction": "PDF 분할 버튼을 클릭하여 브라우저 로컬에서 안전하게 추출합니다."
        },
        {
          "stepNumber": 4,
          "title": "분할본 다운로드",
          "instruction": "추출된 PDF 파일 또는 전체 페이지 압축 ZIP 파일을 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica file PDF",
          "instruction": "Trascina il tuo documento o selezionalo dalla memoria del dispositivo."
        },
        {
          "stepNumber": 2,
          "title": "Specifica pagine o intervallo",
          "instruction": "Inserisci le pagine da estrarre (es. 1-3, 6) o separa tutte le pagine."
        },
        {
          "stepNumber": 3,
          "title": "Dividi PDF",
          "instruction": "Avvia l’isolamento e il salvataggio dei singoli fogli nel browser."
        },
        {
          "stepNumber": 4,
          "title": "Scarica i documenti",
          "instruction": "Scarica il file PDF estratto oppure il pacchetto ZIP completo."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Extracting an Executive Summary from an Annual Report",
        "scenario": "A researcher needs only pages 3 through 7 from an 85-page comprehensive market analysis report to email to stakeholders.",
        "calculation": "The splitter inspects the 85-page PDF, creates a new PDF document, clones page references for index [2, 3, 4, 5, 6], retains embedded chart vectors, and outputs a 5-page PDF.",
        "result": "A lightweight 5-page executive summary PDF created in 0.8 seconds without exposing the full confidential dossier."
      },
      "hi": {
        "title": "वार्षिक रिपोर्ट से कार्यकारी सारांश निकालना",
        "scenario": "एक शोधकर्ता को 85 पेजों की बड़ी मार्केट रिपोर्ट में से केवल पेज 3 से 7 तक की जरूरत है ताकि वह इसे टीम को भेज सके।",
        "calculation": "टूल ने 85 पेजों की फाइल में से पेज 3 से 7 को चुना, केवल इन्हीं 5 पेजों को नए दस्तावेज में क्लोन किया और शेष पेजों को छोड़ दिया।",
        "result": "मात्र 0.8 सेकंड में 5 पेजों का हल्का और केंद्रित दस्तावेज तैयार हुआ, जिससे पूरी गोपनीय फाइल सुरक्षित रही।"
      },
      "es": {
        "title": "Extracción de resumen ejecutivo de informe anual",
        "scenario": "Un analista necesita únicamente las páginas 3 a 7 de un informe de 85 páginas para enviarlo por correo electrónico.",
        "calculation": "La herramienta extrae los índices 2 a 6 del PDF original, mantiene los gráficos vectoriales y genera un archivo de 5 páginas.",
        "result": "Documento ligero de 5 páginas obtenido en 0,8 segundos protegiendo la confidencialidad del informe completo."
      },
      "ja": {
        "title": "年次レポートから要約ページのみを抽出",
        "scenario": "全85ページの市場調査資料から、役員会議用に3〜7ページのみを抽出して送付したい場合。",
        "calculation": "85ページのPDFを読み込み、指定された5ページ分のみを新規ドキュメントにクローンし、容量を最適化。",
        "result": "機密を含む全体ファイルを送信することなく、0.8秒で5ページの軽量PDFを抽出完了。"
      },
      "fr": {
        "title": "Extraction de la synthèse d’un rapport d’activité",
        "scenario": "Un consultant souhaite extraire uniquement les pages 3 à 7 d’un document de 85 pages pour diffusion restreinte.",
        "calculation": "L’outil isole les 5 pages demandées, conserve les polices vectorielles et produit un PDF autonome.",
        "result": "Fichier léger de 5 pages généré en 0,8 seconde sans téléversement de données."
      },
      "de": {
        "title": "Auszug einer Management-Zusammenfassung",
        "scenario": "Ein Berater benötigt aus einem 85-seitigen Geschäftsbericht lediglich die Seiten 3 bis 7 für eine Kundenpräsentation.",
        "calculation": "Das Tool klont die 5 Zielseiten in ein neues PDF-Dokument und entfernt alle überflüssigen Ressourcen.",
        "result": "Kompakte 5-seitige Auszug-PDF in 0,8 Sekunden lokal auf dem Gerät erstellt."
      },
      "pt": {
        "title": "Extração de Sumário Executivo",
        "scenario": "Um consultor precisa apenas das páginas 3 a 7 de um relatório de 85 páginas para enviar por e-mail.",
        "calculation": "O utilitário clona as 5 páginas indicadas mantendo vetores e fontes, descartando as 80 páginas restantes.",
        "result": "PDF leve de 5 páginas criado em 0,8 segundos com segurança total."
      },
      "ko": {
        "title": "85페이지 보고서에서 핵심 요약 페이지만 추출",
        "scenario": "연구원이 85페이지에 달하는 방대한 연례 보고서 중 이메일 공유용으로 3페이지부터 7페이지까지만 추출하려 합니다.",
        "calculation": "85페이지 원본에서 대상 5페이지만 골라내어 새 문서로 복제하고 독립적인 PDF로 렌더링합니다.",
        "result": "전체 원본 노출 없이 0.8초 만에 5페이지 분량의 경량 PDF 파일 생성 완료."
      },
      "it": {
        "title": "Estrazione di sintesi da bilancio aziendale",
        "scenario": "Un consulente deve inviare via email solo le pagine da 3 a 7 di un fascicolo di bilancio da 85 pagine.",
        "calculation": "Il software estrae le 5 pagine specificate, preserva i grafici vettoriali e crea un nuovo file leggero.",
        "result": "PDF mirato di 5 pagine ottenuto in 0,8 secondi senza caricare il file su alcun server."
      }
    },
    "faqs": [
      {
        "question": "Does splitting a PDF damage the internal formatting or font rendering?",
        "answer": "No. Target pages are cloned along with their embedded font sub-tables and vector descriptions, guaranteeing identical rendering to the original document."
      },
      {
        "question": "How do I specify multiple distinct page ranges?",
        "answer": "You can use commas and hyphens in the page input field (for example: \"1-3, 5, 8-10\"). The tool will extract only the specified pages in the order provided."
      },
      {
        "question": "Is my file processed locally on my computer?",
        "answer": "Yes, 100% locally. The document is parsed in your browser memory via pdf-lib and is never uploaded to any remote server or third-party cloud."
      },
      {
        "question": "Can I split a scanned PDF that has no selectable text?",
        "answer": "Yes. The tool operates at the PDF page container level, splitting scanned image pages just as cleanly as native digital vector pages."
      }
    ]
  },
  "pdf-compress": {
    "name": "PDF Compress",
    "formulaTitle": {
      "en": "In-Browser FlateDecode Stream Optimization & Redundant Object Pruning",
      "hi": "इन-ब्राउज़र FlateDecode स्ट्रीम अनुकूलन और रिडंडेंट ऑब्जेक्ट प्रूनिंग",
      "es": "Optimización de Flujos FlateDecode y Eliminación de Objetos Redundantes",
      "ja": "ブラウザ内FlateDecodeストリーム最適化と冗長オブジェクト削減技術",
      "fr": "Optimisation des Flux FlateDecode et Suppression des Objets Redondants",
      "de": "Lokale FlateDecode-Stream-Optimierung & Entfernung redundanter Objekte",
      "pt": "Otimização de Streams FlateDecode e Limpeza de Objetos Redundantes",
      "ko": "브라우저 내 FlateDecode 스트림 최적화 및 중복 객체 제거 아키텍처",
      "it": "Ottimizzazione Stream FlateDecode e Rimozione Oggetti Ridondanti"
    },
    "formulaDescription": {
      "en": "The compressor inspects internal PDF dictionaries to eliminate orphaned objects, duplicate font descriptors, unreferenced metadata packets, and structural white-space. It re-encodes raw content streams using FlateDecode deflation while preserving vector glyph coordinates and text searchability.",
      "hi": "यह टूल पीडीएफ के आंतरिक ढांचे का विश्लेषण करता है और गैर-जरूरी मेटाडेटा, डुप्लिकेट फॉन्ट डिस्क्रिप्टर और खाली जगह को हटा देता है। यह FlateDecode डिफ्लेशन के ज़रिये टेक्स्ट और वेक्टर क्वालिटी को बनाए रखते हुए फाइल का वजन काफी कम कर देता है।",
      "es": "El compresor examina los diccionarios internos del PDF para eliminar objetos huérfanos, fuentes duplicadas y metadatos innecesarios, reempaquetando los flujos mediante FlateDecode sin perder nitidez vectorial.",
      "ja": "本ツールはPDFの内部辞書構造をスキャンし、孤立した未参照オブジェクト、重複フォント、不要なメタデータを削除。FlateDecodeによる可逆圧縮を適用してベクターの鮮明さを保ちながらファイルサイズを削減します。",
      "fr": "Le compresseur analyse l’arborescence du PDF pour purger les métadonnées obsolètes, les polices redondantes et les objets orphelins. Il recompacte les flux via l’algorithme FlateDecode sans dégrader les vecteurs.",
      "de": "Der Kompressor prüft interne PDF-Strukturen, eliminiert ungenutzte Metadaten und doppelte Schriftressourcen und komprimiert Datenströme mittels FlateDecode ohne Qualitätsverlust bei Vektorgrafiken.",
      "pt": "O compressor examina a estrutura interna do PDF para remover metadados desnecessários e fontes duplicadas, recomprimindo os fluxos de conteúdo via FlateDecode sem perder a definição de texto.",
      "ko": "본 압축기는 PDF 내부 객체를 정밀 분석하여 고립된 오브젝트, 중복 폰트 테이블, 불필요한 메타데이터를 제거하고 FlateDecode 압축을 통해 텍스트 검색 가능성과 벡터 품질을 온전히 유지합니다.",
      "it": "Il compressore ispeziona i dizionari interni del PDF per rimuovere metadati superflui e oggetti orfani, ricompattando i flussi con FlateDecode senza intaccare la nitidezza del testo vettoriale."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your PDF into the upload area or click to browse."
        },
        {
          "stepNumber": 2,
          "title": "Select Compression Level",
          "instruction": "Choose Low (structure cleanup), Medium (recommended for web sharing), or High (aggressive stream compacting)."
        },
        {
          "stepNumber": 3,
          "title": "Click Compress PDF",
          "instruction": "Execute client-side stream optimization and dictionary cleanup."
        },
        {
          "stepNumber": 4,
          "title": "Download Compressed Document",
          "instruction": "Review the file size savings and save the optimized PDF to your device."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल अपलोड करें",
          "instruction": "अपनी भारी पीडीएफ फाइल को अपलोड बॉक्स में चुनें या खींचें।"
        },
        {
          "stepNumber": 2,
          "title": "कम्प्रेशन स्तर चुनें",
          "instruction": "कम (हल्की सफाई), मध्यम (दैनिक उपयोग के लिए उत्तम), या उच्च (सरकारी पोर्टल अपलोड हेतु) चुनें।"
        },
        {
          "stepNumber": 3,
          "title": "कंप्रेस पीडीएफ पर क्लिक करें",
          "instruction": "ब्राउज़र में सीधे फाइल का आकार कम करने की प्रक्रिया शुरू करें।"
        },
        {
          "stepNumber": 4,
          "title": "छोटी पीडीएफ डाउनलोड करें",
          "instruction": "आकार में हुई कमी की जांच करें और अनुकूलित पीडीएफ सुरक्षित डाउनलोड करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir archivo PDF",
          "instruction": "Arrastre o seleccione el documento que desea reducir de peso."
        },
        {
          "stepNumber": 2,
          "title": "Elegir nivel de compresión",
          "instruction": "Seleccione Bajo, Medio (óptimo para web y correos) o Alto (máxima reducción)."
        },
        {
          "stepNumber": 3,
          "title": "Comprimir PDF",
          "instruction": "Ejecute la optimización de flujos y eliminación de datos residuales."
        },
        {
          "stepNumber": 4,
          "title": "Descargar archivo optimizado",
          "instruction": "Compruebe el ahorro de espacio y guarde el documento."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルを選択",
          "instruction": "容量を小さくしたいPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "圧縮レベルを選択",
          "instruction": "低（構造整理）、中（メール添付推奨）、高（最大サイズ削減）から選択します。"
        },
        {
          "stepNumber": 3,
          "title": "圧縮を開始",
          "instruction": "「PDFを圧縮」をクリックしてブラウザ内での最適化処理を実行します。"
        },
        {
          "stepNumber": 4,
          "title": "最適化PDFをダウンロード",
          "instruction": "削減された容量を確認し、圧縮済みPDFを保存します。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Sélectionner le document PDF",
          "instruction": "Glissez-déposez votre fichier volumineux dans l’espace de chargement."
        },
        {
          "stepNumber": 2,
          "title": "Choisir le profil de compression",
          "instruction": "Optez pour Faible, Moyen (recommandé pour emails) ou Élevé (taille minimale)."
        },
        {
          "stepNumber": 3,
          "title": "Compresser le PDF",
          "instruction": "Lancez le nettoyage des flux et des objets orphelins dans le navigateur."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le fichier allégé",
          "instruction": "Vérifiez le gain de taille et téléchargez le document optimisé."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Datei hochladen",
          "instruction": "Ziehen Sie die zu komprimierende PDF in den Upload-Bereich."
        },
        {
          "stepNumber": 2,
          "title": "Komprimierungsstufe wählen",
          "instruction": "Wählen Sie Niedrig, Mittel (ideal für E-Mail) oder Hoch (maximale Ersparnis)."
        },
        {
          "stepNumber": 3,
          "title": "Kompression starten",
          "instruction": "Optimieren Sie Datenströme und Metadaten direkt im lokalen Speicher."
        },
        {
          "stepNumber": 4,
          "title": "Komprimierte PDF speichern",
          "instruction": "Prüfen Sie die Dateigrößenreduktion und laden Sie das Ergebnis herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar documento PDF",
          "instruction": "Arraste o ficheiro pesado para a zona de carregamento."
        },
        {
          "stepNumber": 2,
          "title": "Escolher nível de compressão",
          "instruction": "Selecione Baixo, Médio (ideal para partilha) ou Alto (redução máxima)."
        },
        {
          "stepNumber": 3,
          "title": "Comprimir PDF",
          "instruction": "Inicie a compactação de fluxos diretamente no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF reduzido",
          "instruction": "Confira a percentagem economizada e transfira o documento."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 업로드",
          "instruction": "용량을 줄이고자 하는 PDF 문서를 드래그하거나 선택하여 불러옵니다."
        },
        {
          "stepNumber": 2,
          "title": "압축 강도 선택",
          "instruction": "낮음, 보통(이메일 전송 추천), 높음(포털 업로드 규격 맞춤) 중 선택합니다."
        },
        {
          "stepNumber": 3,
          "title": "압축 실행",
          "instruction": "브라우저 메모리에서 스트림 최적화 및 중복 데이터 정리를 진행합니다."
        },
        {
          "stepNumber": 4,
          "title": "최적화 파일 다운로드",
          "instruction": "줄어든 용량을 확인하고 최종 PDF를 기기에 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica file PDF",
          "instruction": "Trascina il documento pesante nell’area di caricamento."
        },
        {
          "stepNumber": 2,
          "title": "Seleziona livello di compressione",
          "instruction": "Scegli tra Basso, Medio (ideale per invio email) o Alto (massima riduzione)."
        },
        {
          "stepNumber": 3,
          "title": "Comprimi PDF",
          "instruction": "Avvia l’ottimizzazione locale dei flussi e dei metadati."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF ottimizzato",
          "instruction": "Verifica la percentuale di spazio risparmiata e salva il file."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Optimizing a Scanned Document for Government Portal Upload",
        "scenario": "An applicant has an 8.2 MB scanned document that exceeds the strict 2.0 MB upload cap on an employment portal.",
        "calculation": "The tool parses the document stream, cleans redundant metadata, deflates embedded raster blocks, and rebuilds xref indices.",
        "result": "File size drops from 8.2 MB to 1.4 MB (83% reduction) with text remaining perfectly sharp and compliant with portal constraints."
      },
      "hi": {
        "title": "सरकारी पोर्टल के लिए स्कैन किए गए दस्तावेज को छोटा करना",
        "scenario": "एक अभ्यर्थी के पास 8.2 MB का स्कैन किया हुआ दस्तावेज है जिसे भर्ती पोर्टल पर अपलोड करने के लिए 2.0 MB से कम करना है।",
        "calculation": "टूल ने पीडीएफ की आंतरिक संरचना का विश्लेषण किया, गैर-जरूरी मेटाडेटा हटाया और FlateDecode संपीड़न लागू किया।",
        "result": "फाइल का आकार 8.2 MB से घटकर मात्र 1.4 MB (83% की कमी) रह गया और सभी अक्षर बिल्कुल स्पष्ट रहे।"
      },
      "es": {
        "title": "Optimización de expediente para portal oficial",
        "scenario": "Un usuario dispone de un documento escaneado de 8,2 MB que supera el límite de 2,0 MB exigido en un trámite público.",
        "calculation": "El compresor elimina metadatos obsoletos, comprime flujos binarios y reorganiza la estructura interna.",
        "result": "El tamaño se reduce de 8,2 MB a 1,4 MB (83% de ahorro), manteniendo una legibilidad impecable."
      },
      "ja": {
        "title": "行政ポータル提出用PDFの容量削減実例",
        "scenario": "提出制限が2.0MBまでの就職申請ポータルに、8.2MBのスキャンPDFをアップロードしたい場合。",
        "calculation": "内部の冗長なメタデータや未参照オブジェクトを削除し、データストリームを最適再圧縮。",
        "result": "文字の鮮明さを保ったまま、8.2MBから1.4MB（83%削減）へ劇的に圧縮し、提出基準をクリア。"
      },
      "fr": {
        "title": "Compression d’un dossier pour portail administratif",
        "scenario": "Un candidat doit téléverser un dossier de 8,2 Mo sur un portail limité à 2,0 Mo maximum.",
        "calculation": "L’outil purge les métadonnées inutiles, optimise les flux internes et réorganise les dictionnaires.",
        "result": "Le fichier passe de 8,2 Mo à 1,4 Mo (83 % d’économie) avec un rendu de texte impeccable."
      },
      "de": {
        "title": "Optimierung für Portal-Uploads mit Größenbegrenzung",
        "scenario": "Eine Bewerbungsunterlage ist 8,2 MB groß, darf aber maximal 2,0 MB für den Upload im Behördenportal betragen.",
        "calculation": "Das Tool bereinigt interne Metadaten, deflatiert Binärströme und reorganisiert die Querverweistabellen.",
        "result": "Größenreduktion von 8,2 MB auf 1,4 MB (83 % Ersparnis) bei voller Lesbarkeit und Textschärfe."
      },
      "pt": {
        "title": "Otimização de Documento para Portal de Concurso",
        "scenario": "Um candidato tem um arquivo de 8,2 MB que precisa ficar abaixo de 2,0 MB para validação em edital.",
        "calculation": "A ferramenta remove metadados desnecessários e recompacta os fluxos binários.",
        "result": "Tamanho cai de 8,2 MB para 1,4 MB (83% de redução), pronto para submissão imediata."
      },
      "ko": {
        "title": "공공기관 채용 포털 서류 업로드 용량 최적화",
        "scenario": "지원자의 스캔 증빙 서류 용량이 8.2MB여서 채용 사이트의 2.0MB 제한을 초과하는 상황입니다.",
        "calculation": "내부 구조를 분석하여 불필요한 메타데이터와 중복 스트림을 제거하고 FlateDecode 압축을 수행합니다.",
        "result": "문서 품질 손상 없이 용량이 8.2MB에서 1.4MB(83% 절감)로 감소하여 규격 내 업로드 성공."
      },
      "it": {
        "title": "Ottimizzazione per caricamento su portale pubblico",
        "scenario": "Un utente deve caricare un documento da 8,2 MB su un portale che impone il limite massimo di 2,0 MB.",
        "calculation": "Lo strumento elimina i metadaten ridondanti, comprime i flussi binari e ricompila gli indici.",
        "result": "Il peso scende da 8,2 MB a 1,4 MB (-83%) con caratteri perfettamente definiti e leggibili."
      }
    },
    "faqs": [
      {
        "question": "Will compressing my PDF make text blurry or unreadable?",
        "answer": "No. Our algorithm prioritizes structural stream deflation and object pruning. Native vector text and fonts remain 100% crisp and searchable at any zoom level."
      },
      {
        "question": "Why did my PDF size barely decrease after compression?",
        "answer": "If your PDF is already heavily optimized or contains pre-compressed high-density JPEG scans, further structural compression yields minimal gains without downsampling raster images."
      },
      {
        "question": "Is it safe to compress tax forms or legal agreements here?",
        "answer": "Yes, completely safe. The compression routine runs entirely in your local browser environment using JavaScript. Your files are never sent to our servers or stored in the cloud."
      },
      {
        "question": "Can I compress encrypted or password-protected PDF files?",
        "answer": "Encrypted PDFs cannot have their stream structures rebuilt without unlocking. Please remove the password using Unlock PDF before running compression."
      }
    ]
  },
  "pdf-to-image": {
    "name": "PDF to Image",
    "formulaTitle": {
      "en": "PDF.js Rasterization Engine & Canvas Export Pipeline",
      "hi": "PDF.js रास्टराइज़ेशन इंजन और कैनवास निर्यात पाइपलाइन",
      "es": "Motor de Rasterización PDF.js y Flujo de Exportación Canvas",
      "ja": "PDF.jsラスタライズエンジンとCanvasエクスポートパイプライン",
      "fr": "Moteur de Rastérisation PDF.js et Pipeline d’Exportation Canvas",
      "de": "PDF.js-Rasterisierungs-Engine & Canvas-Export-Pipeline",
      "pt": "Motor de Rasterização PDF.js e Pipeline de Exportação Canvas",
      "ko": "PDF.js 래스터화 렌더링 엔진 및 Canvas 이미지 내보내기 구조",
      "it": "Motore di Rasterizzazione PDF.js e Pipeline di Esportazione Canvas"
    },
    "formulaDescription": {
      "en": "The converter utilizes Mozilla PDF.js to parse PDF font programs, vector paths, and raster XObjects into an off-screen HTML5 Canvas at selected DPI scales (72, 150, or 300 DPI). Each page is serialized into high-fidelity PNG or JPG image blobs entirely in browser memory.",
      "hi": "यह टूल मोज़िला की PDF.js लाइब्रेरी का उपयोग करके पीडीएफ पेजों, फोंट और वेक्टर ग्राफिक्स को HTML5 कैनवास पर 72, 150 या 300 DPI में प्रस्तुत (render) करता है। प्रत्येक पेज को बिना सर्वर पर अपलोड किए स्थानीय रूप से उच्च गुणवत्ता वाले PNG या JPG इमेज में बदल दिया जाता है।",
      "es": "El conversor emplea PDF.js de Mozilla para renderizar rutas vectoriales y fuentes en un lienzo HTML5 con la resolución elegida (72, 150 o 300 DPI), exportando cada página como imagen PNG o JPG en la memoria local.",
      "ja": "本変換器はMozilla PDF.jsエンジンを活用し、PDF内のフォントやベクターパスを指定解像度（72/150/300 DPI）でHTML5 Canvas上に精密描画。各ページを外部通信なしでPNGやJPG画像として書き出します。",
      "fr": "Le convertisseur utilise le moteur PDF.js de Mozilla pour restituer les vecteurs et polices sur un Canvas HTML5 à la résolution sélectionnée, puis exporte chaque page en PNG ou JPG de haute définition.",
      "de": "Der Konverter nutzt Mozilla PDF.js, um Vektoren und Schriften auf einem HTML5-Canvas mit frei wählbarer DPI-Zahl darzustellen. Jede Seite wird rein lokal als hochauflösendes PNG oder JPG exportiert.",
      "pt": "O conversor utiliza a biblioteca PDF.js para desenhar trajetos vetoriais e fontes num Canvas HTML5 na resolução indicada (72, 150 ou 300 DPI), gerando imagens PNG ou JPG no navegador.",
      "ko": "본 변환기는 Mozilla PDF.js 엔진을 활용하여 PDF 내의 벡터 경로와 폰트 글리프를 선택된 해상도(72, 150, 300 DPI)의 HTML5 Canvas에 정밀 렌더링한 후 고품질 PNG/JPG 이미지로 추출합니다.",
      "it": "Il convertitore adotta PDF.js di Mozilla per renderizzare percorsi vettoriali e font su Canvas HTML5 alla risoluzione desiderata (72, 150 o 300 DPI), esportando le pagine come immagini PNG o JPG locali."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your PDF file into the converter area or click to browse."
        },
        {
          "stepNumber": 2,
          "title": "Choose Output Format and DPI",
          "instruction": "Select PNG (lossless clarity) or JPG (smaller file size) and choose your preferred resolution (150 or 300 DPI)."
        },
        {
          "stepNumber": 3,
          "title": "Render Pages",
          "instruction": "Click Convert to Image to rasterize all PDF pages to canvas in browser memory."
        },
        {
          "stepNumber": 4,
          "title": "Download Image Files",
          "instruction": "Download individual page images or grab all rendered pages in a single ZIP package."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल अपलोड करें",
          "instruction": "अपनी पीडीएफ फाइल को कनवर्टर बॉक्स में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "फॉर्मेट और DPI चुनें",
          "instruction": "PNG (उत्कृष्ट स्पष्टता) या JPG (छोटा आकार) चुनें और अपनी पसंद का DPI (150 या 300) सेट करें।"
        },
        {
          "stepNumber": 3,
          "title": "इमेज में बदलें",
          "instruction": "कन्वर्ट पर क्लिक करें और ब्राउज़र में पेजों को इमेज के रूप में रेंडर करें।"
        },
        {
          "stepNumber": 4,
          "title": "फोटो डाउनलोड करें",
          "instruction": "व्यक्तिगत पेज फोटो या सभी पेजों की जिप फाइल को आसानी से सेव करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir archivo PDF",
          "instruction": "Arrastre o seleccione el documento que desea convertir a imagen."
        },
        {
          "stepNumber": 2,
          "title": "Elegir formato y DPI",
          "instruction": "Seleccione PNG o JPG y establezca la resolución de salida (150 o 300 DPI)."
        },
        {
          "stepNumber": 3,
          "title": "Rasterizar páginas",
          "instruction": "Inicie la conversión para dibujar las páginas en el lienzo del navegador."
        },
        {
          "stepNumber": 4,
          "title": "Descargar imágenes",
          "instruction": "Guarde las páginas por separado o descargue un archivo ZIP con todas las imágenes."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルをアップロード",
          "instruction": "画像化したいPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "画像形式とDPIを選択",
          "instruction": "高画質なPNGまたは容量の小さいJPGを選び、解像度（150または300 DPI）を指定します。"
        },
        {
          "stepNumber": 3,
          "title": "画像への変換を実行",
          "instruction": "「画像に変換」をクリックしてブラウザ内Canvasレンダリングを開始します。"
        },
        {
          "stepNumber": 4,
          "title": "画像ファイルを保存",
          "instruction": "個別ページのダウンロード、または全ページをまとめたZIP形式で保存します。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Importer le document PDF",
          "instruction": "Sélectionnez ou glissez votre document dans le champ prévu à cet effet."
        },
        {
          "stepNumber": 2,
          "title": "Sélectionner le format et la résolution",
          "instruction": "Choisissez PNG ou JPG, et réglez la résolution souhaitée (150 ou 300 DPI)."
        },
        {
          "stepNumber": 3,
          "title": "Lancer la conversion",
          "instruction": "Cliquez sur Convertir en image pour restituer chaque page sur le Canvas."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger les images",
          "instruction": "Enregistrez les pages individuellement ou téléchargez l’ensemble dans une archive ZIP."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Datei bereitstellen",
          "instruction": "Ziehen Sie die PDF-Datei in das Konverterfenster oder wählen Sie diese aus."
        },
        {
          "stepNumber": 2,
          "title": "Format und DPI einstellen",
          "instruction": "Wählen Sie PNG oder JPG sowie die gewünschte Druck- oder Webauflösung."
        },
        {
          "stepNumber": 3,
          "title": "Seiten in Bilder umwandeln",
          "instruction": "Klicken Sie auf In Bild konvertieren, um die Seiten im Browser zu zeichnen."
        },
        {
          "stepNumber": 4,
          "title": "Bilder herunterladen",
          "instruction": "Laden Sie Einzelseiten oder das komplette ZIP-Paket aller Seiten herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar ficheiro PDF",
          "instruction": "Selecione ou arraste o seu PDF para a área de conversão."
        },
        {
          "stepNumber": 2,
          "title": "Definir formato e resolução",
          "instruction": "Escolha PNG ou JPG e configure a resolução pretendida (150 ou 300 DPI)."
        },
        {
          "stepNumber": 3,
          "title": "Converter para imagem",
          "instruction": "Inicie a renderização das páginas no Canvas do navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar imagens",
          "instruction": "Descarregue imagens avulsas ou o pacote ZIP com todas as páginas."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 업로드",
          "instruction": "이미지로 변환할 PDF 문서를 선택하거나 작업 창으로 끌어옵니다."
        },
        {
          "stepNumber": 2,
          "title": "이미지 포맷 및 DPI 선택",
          "instruction": "PNG 또는 JPG를 선택하고 필요한 해상도(150 또는 300 DPI)를 설정합니다."
        },
        {
          "stepNumber": 3,
          "title": "이미지 렌더링 시작",
          "instruction": "이미지 변환 버튼을 클릭하여 브라우저 Canvas에서 래스터화를 진행합니다."
        },
        {
          "stepNumber": 4,
          "title": "이미지 파일 다운로드",
          "instruction": "각 페이지별 이미지 또는 전체 페이지가 포함된 ZIP 파일을 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica file PDF",
          "instruction": "Trascina il documento PDF nella casella o selezionalo dal dispositivo."
        },
        {
          "stepNumber": 2,
          "title": "Seleziona formato e DPI",
          "instruction": "Scegli il formato PNG o JPG e imposta la risoluzione desiderata (150 o 300 DPI)."
        },
        {
          "stepNumber": 3,
          "title": "Converti in immagine",
          "instruction": "Avvia il rendering delle pagine sul Canvas del browser."
        },
        {
          "stepNumber": 4,
          "title": "Scarica le immagini",
          "instruction": "Salva le immagini delle singole pagine oppure scarica l’archivio ZIP completo."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Converting an Infographic PDF into Social Media PNGs",
        "scenario": "A content creator has a 2-page graphic PDF and needs crisp 300 DPI PNG graphics to share on professional networks.",
        "calculation": "The tool renders page 1 and page 2 at 300 DPI (2480 x 3508 pixels each) onto HTML5 Canvas elements and converts them into lossless PNG image blobs.",
        "result": "Two ultra-sharp 300 DPI PNG images generated in 2.1 seconds without any privacy leak or third-party server exposure."
      },
      "hi": {
        "title": "इन्फोग्राफिक पीडीएफ को सोशल मीडिया PNG में बदलना",
        "scenario": "एक क्रिएटर के पास 2 पेज की ग्राफिक पीडीएफ है और उसे सोशल मीडिया पर पोस्ट करने के लिए 300 DPI की स्पष्ट PNG तस्वीरें चाहिए।",
        "calculation": "टूल ने दोनों पेजों को 300 DPI (2480 x 3508 पिक्सल) पर कैनवास में रेंडर किया और लॉसलेस PNG इमेज तैयार की।",
        "result": "मात्र 2.1 सेकंड में दो अल्ट्रा-शार्प PNG फोटो तैयार हो गईं, वह भी बिना किसी सर्वर पर डाटा भेजे।"
      },
      "es": {
        "title": "Conversión de infografía PDF en imágenes PNG",
        "scenario": "Un diseñador dispone de un PDF de 2 páginas y necesita imágenes PNG nítidas a 300 DPI para redes sociales.",
        "calculation": "El conversor renderiza ambas páginas a 300 DPI (2480 x 3508 px) en el lienzo y genera los archivos PNG sin pérdidas.",
        "result": "Dos imágenes PNG de alta definición creadas en 2,1 segundos con total privacidad."
      },
      "ja": {
        "title": "インフォグラフィックPDFをSNS用PNG画像に変換",
        "scenario": "2ページのグラフィックPDF資料を、SNS投稿用に鮮明な300DPIのPNG画像として保存したい場合。",
        "calculation": "HTML5 Canvas上で各ページを300DPI（2480×3508ピクセル）でラスタライズし、高精細PNGバイナリを生成。",
        "result": "外部サーバーを介さず、わずか2.1秒で超高精細なPNG画像2枚の出力を完了。"
      },
      "fr": {
        "title": "Conversion d’une infographie PDF en images PNG",
        "scenario": "Un responsable communication souhaite extraire 2 pages d’un PDF en fichiers PNG haute résolution (300 DPI) pour LinkedIn.",
        "calculation": "L’outil dessine chaque page à 300 DPI (2480 x 3508 pixels) sur le Canvas et exporte des fichiers PNG sans perte.",
        "result": "Deux images PNG d’une netteté parfaite générées en 2,1 secondes en local."
      },
      "de": {
        "title": "PDF-Infografik in hochwertige Social-Media-PNGs umwandeln",
        "scenario": "Ein Designer benötigt aus einem 2-seitigen PDF gestochen scharfe 300-DPI-Bilder für Marketingkanäle.",
        "calculation": "Das Tool rasterisiert die Seiten mit 300 DPI (2480 x 3508 Pixel) im HTML5-Canvas und exportiert verlustfreie PNG-Dateien.",
        "result": "Zwei brillante PNG-Dateien innerhalb von 2,1 Sekunden rein lokal erzeugt."
      },
      "pt": {
        "title": "Conversão de Infográfico PDF em Imagens PNG",
        "scenario": "Um designer precisa de duas páginas em formato PNG a 300 DPI para publicação em redes sociais.",
        "calculation": "A ferramenta desenha as páginas a 300 DPI (2480 x 3508 px) no Canvas e exporta os arquivos PNG.",
        "result": "Duas imagens PNG de altíssima nitidez geradas em 2,1 segundos sem envio de dados a servidores."
      },
      "ko": {
        "title": "인포그래픽 PDF를 고해상도 SNS용 PNG로 변환",
        "scenario": "디자이너가 2페이지짜리 PDF 문서를 선명한 300 DPI PNG 이미지로 변환하여 소셜 미디어에 게시하려 합니다.",
        "calculation": "각 페이지를 300 DPI(2480 x 3508 픽셀) 해상도로 Canvas에 렌더링하고 무손실 PNG 블롭으로 변환합니다.",
        "result": "외부 유출 없이 2.1초 만에 초고해상도 PNG 이미지 2장 생성 완료."
      },
      "it": {
        "title": "Conversione di infografica PDF in immagini PNG nitide",
        "scenario": "Un grafico deve convertire un PDF di 2 pagine in immagini PNG a 300 DPI per la condivisione online.",
        "calculation": "Il programma esegue il rendering a 300 DPI (2480 x 3508 pixel) su Canvas HTML5 ed estrae i file PNG senza compressione.",
        "result": "Due immagini PNG nitide generate in 2,1 secondi senza inviare dati al server."
      }
    },
    "faqs": [
      {
        "question": "Should I choose PNG or JPG format for my extracted pages?",
        "answer": "Choose PNG if your PDF contains diagrams, text, sharp lines, or screenshots to preserve maximum clarity. Choose JPG if the pages contain photographs and you need smaller file sizes."
      },
      {
        "question": "What resolution should I select (72, 150, or 300 DPI)?",
        "answer": "72 DPI is suitable for standard screen viewing, 150 DPI is balanced for presentations and web sharing, and 300 DPI is optimal for high-quality printing and graphic publishing."
      },
      {
        "question": "Are my pages uploaded to an external image-processing server?",
        "answer": "No. The conversion is performed 100% on your device using Mozilla PDF.js inside your browser. No files are transmitted to any remote server."
      },
      {
        "question": "How many pages can I convert at one time?",
        "answer": "You can convert documents with dozens of pages. However, for extremely large documents (100+ pages) at 300 DPI, we recommend converting in batches to prevent browser RAM limits."
      }
    ]
  },
  "image-to-pdf": {
    "name": "Image to PDF",
    "formulaTitle": {
      "en": "Client-Side jsPDF Geometric Layout & Binary Object Boxing",
      "hi": "क्लाइंट-साइड jsPDF ज्यामितीय लेआउट और बाइनरी ऑब्जेक्ट बॉक्सिंग",
      "es": "Diseño Geométrico jsPDF y Empaquetado Binario en Cliente",
      "ja": "クライアントサイドjsPDF幾何配置とバイナリオブジェクト格納構造",
      "fr": "Mise en Page Géométrique jsPDF et Encapsulation Binaire Côté Client",
      "de": "Clientseitiges jsPDF-Geometrielayout & Binärobjekt-Boxing",
      "pt": "Layout Geométrico jsPDF e Empacotamento Binário no Navegador",
      "ko": "클라이언트 측 jsPDF 기하학적 배치 및 바이너리 객체 패키징 구조",
      "it": "Layout Geometrico jsPDF e Incapsulamento Binario Lato Client"
    },
    "formulaDescription": {
      "en": "The converter reads uploaded JPG, PNG, and WebP images, determines native aspect ratios, scales pixel dimensions into standard millimeter page formats (A4 or US Letter) via jsPDF, encapsulates raster byte buffers into PDF image XObjects, and generates a printable PDF document in local memory.",
      "hi": "यह टूल अपलोड की गई JPG, PNG या WebP तस्वीरों को पढ़ता है, उनके आस्पेक्ट रेशियो की गणना करता है और jsPDF के माध्यम से मिलीमीटर में मानक A4 या लेटर पेज पर व्यवस्थित करता है। यह बिना किसी सर्वर का उपयोग किए सीधे ब्राउज़र मेमोरी में प्रिंट-तैयार पीडीएफ बनाता है।",
      "es": "El conversor lee imágenes JPG, PNG o WebP, calcula su relación de aspecto, escala las dimensiones a formatos estándar (A4 o Carta) con jsPDF e inserta los mapas de bits en un archivo PDF descargable.",
      "ja": "本変換器はJPG/PNG/WebP画像を読み込み、アスペクト比を自動算出。jsPDFを用いてA4やレター規格のページ枠内にミリ単位でスケーリング配置し、完全なベクター枠組みのPDFをローカルで生成します。",
      "fr": "Le convertisseur analyse les dimensions de vos images JPG, PNG ou WebP, calcule l’échelle adaptée au format A4 ou Lettre via jsPDF, et génère un document PDF prêt pour l’impression sans aucun téléversement.",
      "de": "Der Konverter liest Bilddaten ein, berechnet das Seitenverhältnis und skaliert die Pixelmaße auf Standardformate (A4 oder Letter) mittels jsPDF, um ein druckfertiges PDF rein lokal zu erzeugen.",
      "pt": "O utilitário carrega imagens JPG, PNG ou WebP, ajusta as proporções para formatos como A4 ou Carta via jsPDF e empacota os dados num PDF profissional sem uso de servidores remotos.",
      "ko": "본 변환기는 JPG, PNG, WebP 이미지를 읽어 가로세로 비율을 계산하고, jsPDF를 통해 A4 또는 Letter 규격에 맞춰 밀리미터 단위로 배치한 후 인쇄 가능한 PDF 문서를 브라우저 로컬에서 생성합니다.",
      "it": "Il convertitore analizza le immagini caricate, adatta le proporzioni al formato pagina scelto (A4 o Lettera) tramite jsPDF e crea un documento PDF pronto per la stampa direttamente nel browser."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload Photos and Images",
          "instruction": "Drag and drop one or multiple JPG, PNG, or WebP images into the tool."
        },
        {
          "stepNumber": 2,
          "title": "Configure Page Layout",
          "instruction": "Select page orientation (Portrait or Landscape), page size (A4, Letter, or Fit to Image), and margin size."
        },
        {
          "stepNumber": 3,
          "title": "Arrange Image Sequence",
          "instruction": "Reorder image cards so your pages appear in the correct chronological sequence."
        },
        {
          "stepNumber": 4,
          "title": "Create and Download PDF",
          "instruction": "Click Convert to PDF and download the newly packaged document to your device."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "फोटो अपलोड करें",
          "instruction": "एक या कई JPG, PNG या WebP तस्वीरों को अपलोड बॉक्स में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "पेज लेआउट सेट करें",
          "instruction": "पेज ओरिएंटेशन (पोर्ट्रेट या लैंडस्केप), साइज (A4 या लेटर) और मार्जिन का चयन करें।"
        },
        {
          "stepNumber": 3,
          "title": "फोटो क्रम व्यवस्थित करें",
          "instruction": "फोटो कार्ड्स को आगे-पीछे करके सही पेज क्रम में लगाएं।"
        },
        {
          "stepNumber": 4,
          "title": "पीडीएफ बनाएं और डाउनलोड करें",
          "instruction": "कन्वर्ट टू पीडीएफ पर क्लिक करें और तैयार दस्तावेज को अपने डिवाइस पर सुरक्षित सेव करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir imágenes",
          "instruction": "Arrastre una o varias fotos JPG, PNG o WebP al área indicada."
        },
        {
          "stepNumber": 2,
          "title": "Configurar página",
          "instruction": "Elija la orientación (Vertical u Horizontal), el tamaño (A4 o Carta) y el margen deseado."
        },
        {
          "stepNumber": 3,
          "title": "Organizar secuencia",
          "instruction": "Ordene las tarjetas de imagen para definir el orden exacto de las páginas."
        },
        {
          "stepNumber": 4,
          "title": "Generar y descargar PDF",
          "instruction": "Haga clic en Convertir a PDF y guarde su nuevo documento en el equipo."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "画像をアップロード",
          "instruction": "1枚または複数のJPG、PNG、WebP画像をドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "ページ設定を調整",
          "instruction": "用紙向き（縦・横）、サイズ（A4、レター、画像に合わせる）、余白を設定します。"
        },
        {
          "stepNumber": 3,
          "title": "画像の並び順を整理",
          "instruction": "ページ順序に合わせて画像カードをドラッグまたは移動します。"
        },
        {
          "stepNumber": 4,
          "title": "PDFを作成してダウンロード",
          "instruction": "「PDFに変換」をクリックし、結合されたPDFファイルを保存します。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Ajouter des images",
          "instruction": "Sélectionnez ou glissez vos photos JPG, PNG ou WebP dans la zone de dépôt."
        },
        {
          "stepNumber": 2,
          "title": "Définir la mise en page",
          "instruction": "Configurez l’orientation (Portrait/Paysage), le format (A4/Lettre) et les marges."
        },
        {
          "stepNumber": 3,
          "title": "Ordonner les images",
          "instruction": "Déplacez les cartes d’images dans l’ordre souhaité pour vos pages."
        },
        {
          "stepNumber": 4,
          "title": "Créer et télécharger le PDF",
          "instruction": "Cliquez sur Convertir en PDF pour générer et enregistrer votre document."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "Bilder hinzufügen",
          "instruction": "Ziehen Sie ein oder mehrere JPG-, PNG- oder WebP-Bilder in das Tool."
        },
        {
          "stepNumber": 2,
          "title": "Seitenlayout konfigurieren",
          "instruction": "Wählen Sie Ausrichtung (Hoch-/Querformat), Format (A4 oder Letter) und Ränder."
        },
        {
          "stepNumber": 3,
          "title": "Reihenfolge anpassen",
          "instruction": "Verschieben Sie die Vorschaubilder in die gewünschte Seitenabfolge."
        },
        {
          "stepNumber": 4,
          "title": "PDF erstellen und herunterladen",
          "instruction": "Klicken Sie auf In PDF umwandeln und speichern Sie das fertige Dokument."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar imagens",
          "instruction": "Adicione uma ou mais fotos nos formatos JPG, PNG ou WebP."
        },
        {
          "stepNumber": 2,
          "title": "Configurar página",
          "instruction": "Escolha a orientação (Vertical ou Horizontal), formato (A4 ou Carta) e margens."
        },
        {
          "stepNumber": 3,
          "title": "Organizar sequência de páginas",
          "instruction": "Ordene as imagens na sequência correta para o documento final."
        },
        {
          "stepNumber": 4,
          "title": "Gerar e baixar PDF",
          "instruction": "Clique em Converter para PDF e transfira o arquivo diretamente para o seu dispositivo."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "이미지 업로드",
          "instruction": "하나 이상의 JPG, PNG, WebP 사진을 드래그하거나 선택하여 추가합니다."
        },
        {
          "stepNumber": 2,
          "title": "페이지 레이아웃 설정",
          "instruction": "용지 방향(세로/가로), 용지 규격(A4, Letter), 여백 크기를 지정합니다."
        },
        {
          "stepNumber": 3,
          "title": "이미지 순서 정렬",
          "instruction": "원하는 페이지 순서에 맞게 이미지 카드 순서를 변경합니다."
        },
        {
          "stepNumber": 4,
          "title": "PDF 생성 및 다운로드",
          "instruction": "PDF 변환 버튼을 클릭하여 완성된 문서를 기기에 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica immagini",
          "instruction": "Trascina o seleziona una o più foto in formato JPG, PNG o WebP."
        },
        {
          "stepNumber": 2,
          "title": "Imposta layout pagina",
          "instruction": "Configura orientamento (Verticale/Orizzontale), formato (A4 o Lettera) e margini."
        },
        {
          "stepNumber": 3,
          "title": "Ordina la sequenza",
          "instruction": "Disponi le schede delle immagini nell’ordine desiderato."
        },
        {
          "stepNumber": 4,
          "title": "Crea e scarica PDF",
          "instruction": "Clicca su Converti in PDF e scarica il file generato sul tuo dispositivo."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Compiling Scanned Receipts into an Expense Claim PDF",
        "scenario": "An employee has 6 photo receipts taken with a smartphone camera and must submit them as a single standardized A4 PDF document for reimbursement.",
        "calculation": "The tool imports the 6 receipts, rescales each photo to fit within standard A4 margins (210 x 297 mm) while preserving aspect ratios, and constructs a 6-page PDF using jsPDF.",
        "result": "A 6-page expense claim PDF generated in 1.2 seconds, ready for immediate accounting submission."
      },
      "hi": {
        "title": "खर्च के बिलों को एक A4 पीडीएफ में जोड़ना",
        "scenario": "एक कर्मचारी के पास मोबाइल से खींची गई 6 रसीदें हैं जिन्हें प्रतिपूर्ति के लिए एक मानक A4 पीडीएफ फाइल के रूप में जमा करना है।",
        "calculation": "टूल ने सभी 6 रसीदों को लोड किया, उनके अनुपात को A4 पेज के आकार (210 x 297 मिमी) में सही ढंग से फिट किया और 6 पेजों की पीडीएफ तैयार की।",
        "result": "मात्र 1.2 सेकंड में कंपनी में जमा करने योग्य 6 पेजों का साफ-सुथरा पीडीएफ दस्तावेज तैयार हो गया।"
      },
      "es": {
        "title": "Compilación de recibos de gastos en PDF único",
        "scenario": "Un empleado tiene 6 fotos de comprobantes de pago tomadas con el móvil y debe entregarlas en un único archivo A4.",
        "calculation": "La herramienta ajusta las 6 fotos a las proporciones de una hoja A4 estándar y crea un documento de 6 páginas mediante jsPDF.",
        "result": "Documento PDF de 6 páginas generado en 1,2 segundos listo para contabilidad sin transferencias a servidores."
      },
      "ja": {
        "title": "スマホで撮影した領収書を1つの経費申請PDFにまとめる実例",
        "scenario": "出張中の社員がスマホカメラで撮影した6枚の領収書写真を、経理提出用に1つのA4規格PDFにまとめたい場合。",
        "calculation": "6枚の画像を読み込み、縦横比を維持しながら標準A4（210×297mm）ページ枠内に自動配置して6ページのPDFを構築。",
        "result": "わずか1.2秒で提出規定に合致した6ページの経費申請用PDFが完成。"
      },
      "fr": {
        "title": "Compilation de notes de frais en un seul document PDF",
        "scenario": "Un salarié dispose de 6 photos de tickets de caisse et doit les transmettre sous la forme d’un unique PDF A4 à la comptabilité.",
        "calculation": "L’outil met à l’échelle les 6 photos pour les intégrer au format A4 avec marges adaptées et génère un PDF de 6 pages.",
        "result": "Dossier de remboursement de 6 pages créé en 1,2 seconde en toute sécurité."
      },
      "de": {
        "title": "Zusammenstellung von Belegen zu einer Reisekostenabrechnung",
        "scenario": "Ein Mitarbeiter hat 6 Belegfotos auf dem Smartphone und muss diese als ordentliche A4-PDF für die Buchhaltung einreichen.",
        "calculation": "Das Tool passt die 6 Belege maßstabsgetreu an das A4-Format (210 x 297 mm) an und erzeugt ein 6-seitiges PDF.",
        "result": "Einreichungsfertige 6-seitige PDF-Abrechnung innerhalb von 1,2 Sekunden lokal erstellt."
      },
      "pt": {
        "title": "Compilação de Comprovativos para Reembolso",
        "scenario": "Um colaborador precisa transformar 6 fotografias de recibos num único documento A4 para submissão à contabilidade.",
        "calculation": "O conversor redimensiona as 6 imagens para o formato A4 com margens seguras e monta um PDF de 6 páginas.",
        "result": "Ficheiro PDF de 6 páginas gerado em 1,2 segundos com total privacidade."
      },
      "ko": {
        "title": "스마트폰 영수증 사진 6장을 하나의 A4 지출 결의서로 변환",
        "scenario": "직원이 스마트폰으로 촬영한 6장의 영수증 사진을 회사 정산용 단일 A4 PDF로 제출해야 하는 상황입니다.",
        "calculation": "6장의 영수증 비율을 유지하면서 표준 A4 규격(210 x 297 mm)에 맞춰 jsPDF로 6페이지 문서를 빌드합니다.",
        "result": "외부 유출 없이 1.2초 만에 회계 제출용 6페이지 PDF 완성."
      },
      "it": {
        "title": "Raccolta di scontrini in un PDF unico per nota spese",
        "scenario": "Un dipendente ha 6 fotografie di ricevute sul telefono e deve riunirle in un unico file A4 per l’amministrazione.",
        "calculation": "Il programma adatta le 6 immagini al formato standard A4 preservando le proporzioni e genera un PDF di 6 pagine.",
        "result": "Fascicolo di 6 pagine pronto per l’invio in soli 1,2 secondi in completa sicurezza."
      }
    },
    "faqs": [
      {
        "question": "What image file formats are supported?",
        "answer": "You can upload standard raster image formats including JPG, JPEG, PNG, and WebP. Transparent PNGs are placed onto clean white backgrounds."
      },
      {
        "question": "Can I combine multiple different image orientations into one PDF?",
        "answer": "Yes. You can select individual page orientation settings or choose \"Fit to Image\", which automatically matches each PDF page dimension to each photo."
      },
      {
        "question": "Are my private photos uploaded to any external server?",
        "answer": "No. Processing is executed 100% locally on your computer or phone using jsPDF. Your receipts, IDs, and personal photos remain strictly on your device."
      },
      {
        "question": "Will creating a PDF reduce the visual resolution of my photos?",
        "answer": "No. Pixel data is encapsulated directly into the PDF container without aggressive downsampling, ensuring full photographic clarity for printing or inspection."
      }
    ]
  },
  "protect-pdf": {
    "name": "Protect PDF",
    "formulaTitle": {
      "en": "Standard PDF Security Handler & Cryptographic Access Permutations",
      "hi": "मानक पीडीएफ सुरक्षा हैंडलर और क्रिप्टोग्राफिक एक्सेस परमिट",
      "es": "Controlador de Seguridad Estándar PDF y Criptografía de Acceso",
      "ja": "標準PDFセキュリティハンドラーと暗号化アクセス権限管理構造",
      "fr": "Gestionnaire de Sécurité PDF Standard et Chiffrement Cryptographique",
      "de": "Standard-PDF-Sicherheits-Handler & Kryptografische Zugriffskontrolle",
      "pt": "Manipulador de Segurança Padrão PDF e Permissões Criptográficas",
      "ko": "표준 PDF 보안 핸들러 및 암호화 액세스 권한 제어 구조",
      "it": "Gestore di Sicurezza Standard PDF e Cifratura Crittografica degli Accessi"
    },
    "formulaDescription": {
      "en": "The security utility initializes pdf-lib in browser memory, attaches an encryption dictionary with standard user and owner credentials, sets permission bitmasks (disallowing copying or printing if specified), and derives standard RC4/AES encryption keys to secure content streams without exposing the document or passphrase to any remote server.",
      "hi": "यह टूल ब्राउज़र मेमोरी में pdf-lib के माध्यम से एक सुरक्षित एन्क्रिप्शन डिक्शनरी तैयार करता है। यह उपयोगकर्ता और ओनर पासवर्ड सेट करता है, अनुमतियों (प्रिंटिंग या कॉपी करने पर रोक) को लॉक करता है और बिना किसी सर्वर पर डाटा भेजे आपके डिवाइस पर ही दस्तावेज़ को पूरी तरह सुरक्षित (encrypt) कर देता है।",
      "es": "La utilidad configura un diccionario de cifrado estándar en la memoria local mediante pdf-lib, estableciendo contraseñas de usuario y propietario junto con máscaras de permisos (impresión, copia) sin enviar la clave ni el archivo a la red.",
      "ja": "本セキュリティツールはブラウザのローカルメモリ内でpdf-libを実行し、標準暗号化辞書を設定。ユーザー/所有者パスワードおよびアクセス権限ビットマスク（印刷やテキスト複製の制限）を適用し、通信を行わずに文書を強固に保護します。",
      "fr": "L’outil initialise un dictionnaire de sécurité standard avec mots de passe utilisateur et propriétaire via pdf-lib dans le navigateur, définissant les restrictions de copie et d’impression en toute confidentialité.",
      "de": "Das Sicherheitstool richtet mit pdf-lib ein Standard-Verschlüsselungsverzeichnis im Browser ein, vergibt Benutzer- und Besitzer-Passwörter sowie Berechtigungs-Bits ohne Serverübertragung.",
      "pt": "O utilitário configura um dicionário criptográfico padrão com senhas de utilizador e proprietário via pdf-lib no navegador, aplicando restrições de leitura e impressão sem qualquer envio externo.",
      "ko": "본 보안 도구는 브라우저 메모리에서 pdf-lib를 사용하여 표준 암호화 딕셔너리를 설정하고, 사용자 및 소유자 비밀번호와 복사/인쇄 제한 권한 플래그를 로컬에서 직접 적용합니다.",
      "it": "Lo strumento configura un dizionario di sicurezza standard tramite pdf-lib nella memoria del browser, impostando password di apertura e vincoli di autorizzazione senza trasmettere dati all’esterno."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your unprotected PDF file or select it from your device storage."
        },
        {
          "stepNumber": 2,
          "title": "Enter Strong Password",
          "instruction": "Type a strong passphrase to encrypt the document and confirm it in the verification field."
        },
        {
          "stepNumber": 3,
          "title": "Configure Permission Flags",
          "instruction": "Optionally restrict printing, content extraction, or annotations."
        },
        {
          "stepNumber": 4,
          "title": "Encrypt and Download",
          "instruction": "Click Protect PDF to apply in-browser encryption and save your secured document."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल अपलोड करें",
          "instruction": "अपनी असुरक्षित पीडीएफ फाइल को अपलोड बॉक्स में चुनें या खींचें।"
        },
        {
          "stepNumber": 2,
          "title": "मजबूत पासवर्ड दर्ज करें",
          "instruction": "दस्तावेज को सुरक्षित करने के लिए एक मजबूत पासवर्ड डालें और पुष्टि करें।"
        },
        {
          "stepNumber": 3,
          "title": "अनुमतियां सेट करें",
          "instruction": "यदि चाहें तो प्रिंट करने या टेक्स्ट कॉपी करने पर रोक लगाने का विकल्प चुनें।"
        },
        {
          "stepNumber": 4,
          "title": "सुरक्षित पीडीएफ डाउनलोड करें",
          "instruction": "प्रोटेक्ट पीडीएफ पर क्लिक करें और एन्क्रिप्टेड दस्तावेज सुरक्षित सेव करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir archivo PDF",
          "instruction": "Seleccione o arrastre el documento que desea proteger con contraseña."
        },
        {
          "stepNumber": 2,
          "title": "Introducir contraseña segura",
          "instruction": "Escriba la clave de acceso deseada y confírmela en el campo correspondiente."
        },
        {
          "stepNumber": 3,
          "title": "Ajustar permisos",
          "instruction": "Opcionalmente limite la impresión o el copiado de texto."
        },
        {
          "stepNumber": 4,
          "title": "Descargar PDF protegido",
          "instruction": "Haga clic en Proteger PDF y guarde el archivo cifrado en su equipo."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルをアップロード",
          "instruction": "暗号化したいPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "強力なパスワードを入力",
          "instruction": "閲覧用パスワードを入力し、確認欄に再入力します。"
        },
        {
          "stepNumber": 3,
          "title": "アクセス制限を設定",
          "instruction": "必要に応じて印刷制限やテキストコピーの制限オプションを有効化します。"
        },
        {
          "stepNumber": 4,
          "title": "保護PDFをダウンロード",
          "instruction": "「PDFを保護」をクリックし、暗号化された安全なPDFを保存します。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Importer le document PDF",
          "instruction": "Sélectionnez le fichier que vous souhaitez sécuriser par mot de passe."
        },
        {
          "stepNumber": 2,
          "title": "Définir le mot de passe",
          "instruction": "Saisissez un mot de passe robuste et confirmez-le dans le second champ."
        },
        {
          "stepNumber": 3,
          "title": "Paramétrer les restrictions",
          "instruction": "Interdisez si besoin l’impression ou l’extraction de contenu."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le PDF sécurisé",
          "instruction": "Cliquez sur Protéger le PDF pour chiffrer le document et l’enregistrer."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Datei auswählen",
          "instruction": "Ziehen Sie das ungeschützte Dokument in den Arbeitsbereich."
        },
        {
          "stepNumber": 2,
          "title": "Sicheres Passwort eingeben",
          "instruction": "Geben Sie das gewünschte Öffnungspasswort ein und bestätigen Sie es."
        },
        {
          "stepNumber": 3,
          "title": "Berechtigungen konfigurieren",
          "instruction": "Schränken Sie optional Druck- und Kopierfunktionen ein."
        },
        {
          "stepNumber": 4,
          "title": "Geschützte PDF speichern",
          "instruction": "Klicken Sie auf PDF schützen und laden Sie das verschlüsselte Dokument herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar ficheiro PDF",
          "instruction": "Selecione o documento que pretende encriptar com palavra-passe."
        },
        {
          "stepNumber": 2,
          "title": "Definir senha forte",
          "instruction": "Introduza a senha de acesso pretendida e confirme no campo abaixo."
        },
        {
          "stepNumber": 3,
          "title": "Configurar permissões",
          "instruction": "Opcionalmente restrinja a impressão ou a cópia de texto."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF protegido",
          "instruction": "Clique em Proteger PDF e guarde o ficheiro cifrado no dispositivo."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 업로드",
          "instruction": "암호로 보호할 PDF 문서를 드래그하거나 선택하여 불러옵니다."
        },
        {
          "stepNumber": 2,
          "title": "비밀번호 입력",
          "instruction": "열람에 필요한 안전한 비밀번호를 입력하고 확인란에 다시 입력합니다."
        },
        {
          "stepNumber": 3,
          "title": "권한 옵션 설정",
          "instruction": "필요에 따라 인쇄 금지 및 텍스트 복사 차단 권한을 활성화합니다."
        },
        {
          "stepNumber": 4,
          "title": "보안 PDF 다운로드",
          "instruction": "PDF 보호 버튼을 클릭하여 암호화된 문서를 기기에 안전하게 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica file PDF",
          "instruction": "Trascina il documento PDF da proteggere con password."
        },
        {
          "stepNumber": 2,
          "title": "Inserisci password sicura",
          "instruction": "Digita la chiave di accesso desiderata e confermala nel campo apposito."
        },
        {
          "stepNumber": 3,
          "title": "Imposta autorizzazioni",
          "instruction": "Limita se necessario la stampa o la copia del testo."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF protetto",
          "instruction": "Clicca su Proteggi PDF e salva il file cifrato sul tuo dispositivo."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Encrypting a Client Contract Prior to Email Distribution",
        "scenario": "A consultant needs to secure a sensitive non-disclosure agreement with a 12-character passphrase before sending it over unencrypted email.",
        "calculation": "The tool embeds the passphrase into the document encryption dictionary, enables 128-bit/256-bit security standards, disables unauthorized printing, and compiles the secured binary.",
        "result": "A password-locked PDF generated in 0.9 seconds that strictly prompts for credentials in Adobe Reader, Apple Preview, and browsers."
      },
      "hi": {
        "title": "ईमेल से पहले ग्राहक अनुबंध को पासवर्ड से सुरक्षित करना",
        "scenario": "एक सलाहकार को संवेदनशील अनुबंध को ईमेल पर भेजने से पहले 12 अक्षरों के मजबूत पासवर्ड से लॉक करना है।",
        "calculation": "टूल ने पीडीएफ में 128/256-बिट सुरक्षा मानकों को लागू किया, अनाधिकृत प्रिंटिंग को ब्लॉक किया और पासवर्ड सुरक्षा जोड़ी।",
        "result": "मात्र 0.9 सेकंड में पासवर्ड-सुरक्षित पीडीएफ तैयार हुई जो किसी भी पीडीएफ रीडर में बिना पासवर्ड के नहीं खुलेगी।"
      },
      "es": {
        "title": "Cifrado de contrato mercantil antes de su envío",
        "scenario": "Un asesor legal necesita proteger un acuerdo confidencial con una clave robusta antes de compartirlo por correo.",
        "calculation": "La herramienta aplica el cifrado estándar, bloquea la copia no autorizada de texto y recompila el archivo en memoria.",
        "result": "Documento PDF protegido generado en 0,9 segundos que exige contraseña en cualquier visor estándar."
      },
      "ja": {
        "title": "メール送信前の機密契約書暗号化実例",
        "scenario": "コンサルタントが秘密保持契約書（NDA）をメール添付する前に、安全なパスワードで閲覧制限をかけたい場合。",
        "calculation": "ブラウザ内で暗号化辞書を構築し、128/256ビット規格のアクセス制御と印刷制限フラグを埋め込み。",
        "result": "わずか0.9秒で暗号化が完了し、Adobe Readerや各ブラウザで確実にパスワードを要求する安全なPDFが完成。"
      },
      "fr": {
        "title": "Sécurisation d’un contrat commercial avant envoi par courriel",
        "scenario": "Un juriste souhaite verrouiller un accord de confidentialité avec une clé complexe avant transmission électronique.",
        "calculation": "L’outil applique le dictionnaire de chiffrement standard, désactive l’impression non autorisée et génère le fichier protégé.",
        "result": "PDF crypté obtenu en 0,9 seconde, demandant impérativement le mot de passe à l’ouverture."
      },
      "de": {
        "title": "Verschlüsselung eines Kundenvertrags vor Mailversand",
        "scenario": "Ein Berater muss eine vertrauliche Vereinbarung mit einem sicheren Passwort schützen, bevor sie versendet wird.",
        "calculation": "Das Tool integriert den Sicherheitsschlüssel in die Dokumentstruktur und setzt Berechtigungsbeschränkungen.",
        "result": "Verschlüsseltes PDF in 0,9 Sekunden erstellt, das in allen gängigen PDF-Readern ein Passwort verlangt."
      },
      "pt": {
        "title": "Bloqueio de Contrato Confidencial com Senha",
        "scenario": "Um consultor precisa proteger um contrato comercial com uma senha forte antes de o enviar por e-mail.",
        "calculation": "A ferramenta aplica a encriptação padrão e bloqueia a impressão sem transferir os dados para servidores.",
        "result": "PDF protegido gerado em 0,9 segundos com exigência estrita de palavra-passe para leitura."
      },
      "ko": {
        "title": "이메일 발송 전 기밀 계약서 비밀번호 암호화 실례",
        "scenario": "컨설턴트가 비밀유지계약서(NDA)를 외부 이메일로 발송하기 전 12자리 암호로 안전하게 잠그고자 합니다.",
        "calculation": "문서 보안 딕셔너리에 암호화 키를 적용하고 비인가 인쇄/복사 차단 플래그를 로컬에서 즉시 설정합니다.",
        "result": "모든 PDF 뷰어에서 암호를 필수로 요구하는 보안 PDF 문서가 0.9초 만에 생성 완료."
      },
      "it": {
        "title": "Cifratura di accordo commerciale per invio email",
        "scenario": "Un consulente deve proteggere un documento riservato con password sicura prima della trasmissione via posta elettronica.",
        "calculation": "Lo strumento imposta la crittografia standard e blocca la copia di testo non autorizzata direttamente in locale.",
        "result": "PDF protetto generado in 0,9 secondi che richiede necessariamente la password per la consultazione."
      }
    },
    "faqs": [
      {
        "question": "Does your server know or log my document password?",
        "answer": "No. The encryption process occurs entirely on your machine using JavaScript. Neither the PDF document nor the passphrase is ever transmitted across the internet."
      },
      {
        "question": "What happens if I forget the password I set on the document?",
        "answer": "Because PDF encryption uses industry-standard cryptographic algorithms, forgotten passwords cannot be recovered by anyone. Please record your passphrase securely."
      },
      {
        "question": "Will the protected PDF open in Adobe Acrobat and smartphone apps?",
        "answer": "Yes. The output adheres to ISO standard PDF encryption and is fully compatible with Adobe Acrobat Reader, Apple Books/Preview, Google Chrome, and Android viewers."
      },
      {
        "question": "Can I set separate permissions for printing and copying?",
        "answer": "Yes. You can configure permission masks that permit standard screen reading while preventing text copying or high-resolution printing."
      }
    ]
  },
  "unlock-pdf": {
    "name": "Unlock PDF",
    "formulaTitle": {
      "en": "In-Memory PDF Decryption & Permission Bitmask Clearing",
      "hi": "इन-मेमोरी पीडीएफ डिक्रिप्शन और अनुमति प्रतिबंध हटाना",
      "es": "Descifrado en Memoria y Eliminación de Restricciones PDF",
      "ja": "インメモリPDF復号と権限制限解除アーキテクチャ",
      "fr": "Déchiffrement en Mémoire et Suppression des Restrictions PDF",
      "de": "Lokale PDF-Entschlüsselung & Bereinigungs-Handler",
      "pt": "Desencriptação na Memória e Remoção de Restrições no Navegador",
      "ko": "인메모리 PDF 복호화 및 권한 제한 해제 아키텍처",
      "it": "Decifratura in Memoria ed Eliminazione dei Vincoli di Protezione"
    },
    "formulaDescription": {
      "en": "The unlocking utility receives user credentials, authenticates against the PDF encryption trailer dictionary using pdf-lib in browser memory, reconstructs unencrypted content streams, wipes the /Encrypt dictionary, and compiles an unrestricted PDF binary locally.",
      "hi": "यह टूल आपके द्वारा दिए गए पासवर्ड के ज़रिये ब्राउज़र मेमोरी में पीडीएफ के एन्क्रिप्शन डिक्शनरी को प्रमाणित करता है। यह कंटेंट स्ट्रीम को डिक्रिप्ट करता है, /Encrypt डिक्शनरी को पूरी तरह हटा देता है और बिना किसी सर्वर का उपयोग किए प्रतिबंध-मुक्त पीडीएफ तैयार करता है।",
      "es": "La herramienta autentica la clave ingresada frente al diccionario de cifrado con pdf-lib en la memoria local, descifra los flujos protegidos y elimina el diccionario /Encrypt para exportar un PDF libre de trabas.",
      "ja": "本ツールはブラウザのメモリ内で入力されたパスワードと暗号化辞書を照合。pdf-libを用いて保護ストリームを復号し、/Encrypt辞書を完全除去して編集や印刷の制限がない独立PDFを生成します。",
      "fr": "L’outil valide le mot de passe saisi contre le dictionnaire de chiffrement via pdf-lib dans le navigateur, décrypte les flux de contenu et supprime la section /Encrypt pour produire un document sans aucune restriction.",
      "de": "Das Tool überprüft das eingegebene Passwort lokal im Browser, entschlüsselt die Datenströme mittels pdf-lib und entfernt den /Encrypt-Eintrag vollständig, um ein unbeschränktes PDF zu erzeugen.",
      "pt": "A ferramenta autentica a senha fornecida na memória local via pdf-lib, decifra os fluxos protegidos e apaga o dicionário /Encrypt, gerando um documento livre de restrições.",
      "ko": "본 도구는 입력된 비밀번호를 바탕으로 브라우저 내에서 암호화 딕셔너리를 검증하고, pdf-lib를 통해 콘텐츠 스트림을 복호화한 후 /Encrypt 항목을 제거하여 제한 없는 자유로운 PDF로 재구성합니다.",
      "it": "Il programma verifica la password fornita con pdf-lib direttamente nel browser, decifra i flussi di dati e rimuove il dizionario /Encrypt, restituendo un PDF del tutto privo di vincoli."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload Protected PDF",
          "instruction": "Drag and drop your password-locked PDF document into the unlocking tool."
        },
        {
          "stepNumber": 2,
          "title": "Enter Correct Password",
          "instruction": "Type the valid user or owner password required to decrypt document streams."
        },
        {
          "stepNumber": 3,
          "title": "Execute In-Memory Decryption",
          "instruction": "Click Unlock PDF to strip encryption dictionaries in local browser memory."
        },
        {
          "stepNumber": 4,
          "title": "Download Unlocked Document",
          "instruction": "Save the unlocked PDF file to edit, print, or merge without passwords."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "सुरक्षित पीडीएफ अपलोड करें",
          "instruction": "अपनी पासवर्ड-युक्त पीडीएफ फाइल को अनलॉक टूल में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "सही पासवर्ड दर्ज करें",
          "instruction": "दस्तावेज को खोलने के लिए मान्य पासवर्ड दर्ज करें।"
        },
        {
          "stepNumber": 3,
          "title": "डिक्रिप्शन शुरू करें",
          "instruction": "अनलॉक पीडीएफ पर क्लिक करें और ब्राउज़र में सुरक्षा प्रतिबंध हटाएं।"
        },
        {
          "stepNumber": 4,
          "title": "खुली पीडीएफ डाउनलोड करें",
          "instruction": "बिना पासवर्ड वाली पीडीएफ फाइल सेव करें जिसे कहीं भी आसानी से उपयोग किया जा सके।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir PDF protegido",
          "instruction": "Arrastre su documento bloqueado con clave al área de trabajo."
        },
        {
          "stepNumber": 2,
          "title": "Ingresar contraseña",
          "instruction": "Escriba la clave correcta de apertura o edición del documento."
        },
        {
          "stepNumber": 3,
          "title": "Descifrar documento",
          "instruction": "Haga clic en Desbloquear PDF para eliminar el cifrado en la memoria local."
        },
        {
          "stepNumber": 4,
          "title": "Descargar archivo libre",
          "instruction": "Guarde el documento sin contraseñas para imprimir o editar libremente."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "保護されたPDFを追加",
          "instruction": "パスワードでロックされているPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "正しいパスワードを入力",
          "instruction": "文書の閲覧または所有者パスワードを入力します。"
        },
        {
          "stepNumber": 3,
          "title": "制限解除を実行",
          "instruction": "「PDFのロックを解除」をクリックし、ブラウザ内で復号処理を行います。"
        },
        {
          "stepNumber": 4,
          "title": "解除済みPDFを保存",
          "instruction": "パスワード要求のない自由なPDFファイルをダウンロードします。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Charger le PDF protégé",
          "instruction": "Sélectionnez le document verrouillé par mot de passe."
        },
        {
          "stepNumber": 2,
          "title": "Saisir le mot de passe valide",
          "instruction": "Renseignez le mot de passe de lecture ou d’administration."
        },
        {
          "stepNumber": 3,
          "title": "Supprimer le verrouillage",
          "instruction": "Cliquez sur Déverrouiller le PDF pour purger le chiffrement en mémoire."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le PDF libre",
          "instruction": "Enregistrez le document sans mot de passe pour consultation ou impression libre."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "Geschützte PDF hochladen",
          "instruction": "Ziehen Sie die gesperrte PDF-Datei in das Entsperrwerkzeug."
        },
        {
          "stepNumber": 2,
          "title": "Passwort eingeben",
          "instruction": "Geben Sie das gültige Dokumentpasswort zur Entschlüsselung ein."
        },
        {
          "stepNumber": 3,
          "title": "Entsperrung durchführen",
          "instruction": "Klicken Sie auf PDF entsperren, um die Verschlüsselung lokal zu entfernen."
        },
        {
          "stepNumber": 4,
          "title": "Entsperrte PDF speichern",
          "instruction": "Laden Sie die unbeschränkte PDF-Datei herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar PDF protegido",
          "instruction": "Arraste o documento bloqueado com senha para a ferramenta."
        },
        {
          "stepNumber": 2,
          "title": "Inserir palavra-passe correta",
          "instruction": "Digite a senha válida para autorizar a desencriptação."
        },
        {
          "stepNumber": 3,
          "title": "Desbloquear ficheiro",
          "instruction": "Clique em Desbloquear PDF para limpar as restrições no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF desbloqueado",
          "instruction": "Transfira o arquivo sem proteção para impressão e edição livres."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "잠긴 PDF 파일 업로드",
          "instruction": "비밀번호가 걸려 있는 PDF 문서를 작업 창에 끌어옵니다."
        },
        {
          "stepNumber": 2,
          "title": "올바른 비밀번호 입력",
          "instruction": "문서 열람 또는 권한 해제에 필요한 유효한 비밀번호를 입력합니다."
        },
        {
          "stepNumber": 3,
          "title": "복호화 및 잠금 해제",
          "instruction": "PDF 잠금 해제 버튼을 눌러 브라우저 로컬에서 암호화 항목을 제거합니다."
        },
        {
          "stepNumber": 4,
          "title": "자유 문서 다운로드",
          "instruction": "비밀번호 입력 없이 자유롭게 인쇄 및 편집 가능한 PDF를 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica PDF protetto",
          "instruction": "Trascina il documento PDF bloccato con password."
        },
        {
          "stepNumber": 2,
          "title": "Inserisci la password corretta",
          "instruction": "Digita la chiave di accesso valida per decifrare il file."
        },
        {
          "stepNumber": 3,
          "title": "Rimuovi protezione",
          "instruction": "Clicca su Sblocca PDF per eliminare i vincoli nella memoria del browser."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF libero",
          "instruction": "Salva il documento sbloccato per stamparlo o modificarlo senza limiti."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Removing Password from a Monthly Bank Statement for Archival",
        "scenario": "A user downloads an encrypted bank statement that requires entering their date of birth on every opening and wants to save an unencrypted copy for their tax binder.",
        "calculation": "The tool uses the provided password to authenticate and decrypt the byte streams, deletes the /Encrypt catalog header, and exports an unencumbered PDF.",
        "result": "An unlocked PDF produced in 0.7 seconds that opens instantly in all viewers without password prompts."
      },
      "hi": {
        "title": "मासिक बैंक स्टेटमेंट से पासवर्ड हटाना",
        "scenario": "एक उपयोगकर्ता अपने बैंक स्टेटमेंट को हर बार खोलने पर जन्मतिथि डालने से परेशान है और टैक्स फाइल के लिए पासवर्ड-मुक्त कॉपी बनाना चाहता है।",
        "calculation": "टूल ने दर्ज किए गए पासवर्ड से फाइल को डिक्रिप्ट किया, /Encrypt हेडर हटाया और नई स्वतंत्र फाइल बनाई।",
        "result": "मात्र 0.7 सेकंड में खुली पीडीएफ तैयार हुई जिसे बिना किसी पासवर्ड के सीधे खोला और प्रिंट किया जा सकता है।"
      },
      "es": {
        "title": "Eliminación de clave en extracto bancario para archivo personal",
        "scenario": "Un usuario necesita archivar su extracto mensual sin tener que escribir su fecha de nacimiento cada vez que lo consulta.",
        "calculation": "La herramienta descifra los datos con la clave facilitada, retira el encabezado de cifrado y exporta el archivo.",
        "result": "PDF desbloqueado en 0,7 segundos que se abre al instante en cualquier dispositivo sin requerir contraseña."
      },
      "ja": {
        "title": "毎月の銀行取引明細書から閲覧パスワードを恒久解除",
        "scenario": "閲覧のたびに生年月日パスワードの入力を求められる銀行明細書を、確定申告用にパスワード不要のPDFとして保管したい場合。",
        "calculation": "提供されたパスワードでストリームを正常復号し、/Encrypt辞書ヘッダーを安全に削除。",
        "result": "0.7秒でパスワード解除が完了し、以後はダブルクリックだけで即座に閲覧可能なPDFが完成。"
      },
      "fr": {
        "title": "Suppression du mot de passe d’un relevé bancaire pour archivage",
        "scenario": "Un particulier souhaite conserver son relevé de compte sans devoir saisir son identifiant à chaque consultation.",
        "calculation": "L’outil déchiffre les flux à l’aide du mot de passe fourni et supprime l’en-tête de sécurité du fichier.",
        "result": "Document PDF déverrouillé en 0,7 seconde, consultable immédiatement sans mot de passe."
      },
      "de": {
        "title": "Passwortentfernung bei einem Kontoauszug zur Steuerarchivierung",
        "scenario": "Ein Nutzer möchte seinen monatlichen Auszug archivieren, ohne jedes Mal das Geburtsdatum als Passwort eingeben zu müssen.",
        "calculation": "Das Tool entschlüsselt die Datenströme mit dem eingegebenen Passwort und löscht den Verschlüsselungs-Header.",
        "result": "Entsperrte PDF in 0,7 Sekunden erstellt, die ohne Passwortabfrage sofort geöffnet werden kann."
      },
      "pt": {
        "title": "Remoção de Senha de Extrato Bancário para Arquivo",
        "scenario": "Um cliente bancário deseja guardar cópia do extrato sem ter de digitar a data de nascimento a cada consulta.",
        "calculation": "A ferramenta decifra o arquivo com a senha inserida e apaga o cabeçalho de proteção.",
        "result": "PDF desbloqueado gerado em 0,7 segundos pronto para uso sem qualquer exigência de palavra-passe."
      },
      "ko": {
        "title": "세무 보관용 은행 명세서의 열람 비밀번호 영구 해제",
        "scenario": "열람할 때마다 생년월일을 입력해야 하는 보안 은행 거래 명세서를 세무 증빙 폴더에 비밀번호 없이 보관하려 합니다.",
        "calculation": "입력된 비밀번호로 스트림을 복호화하고 암호화 헤더를 영구 제거하여 새 바이너리로 출력합니다.",
        "result": "비밀번호 입력 창 없이 바로 열리는 자유 PDF가 0.7초 만에 로컬에서 생성 완료."
      },
      "it": {
        "title": "Rimozione password da estratto conto per archivio fiscale",
        "scenario": "Un utente vuole conservare l’estratto conto senza dover digitare la data di nascita a ogni consultazione.",
        "calculation": "Il programma decifra il file con la password fornita ed elimina l’intestazione di blocco crittografico.",
        "result": "PDF sbloccato generato in 0,7 secondi, consultabile immediatamente senza alcuna richiesta di credenziali."
      }
    },
    "faqs": [
      {
        "question": "Can this tool crack or bypass a password if I do not know it?",
        "answer": "No. This tool is designed to decrypt legitimately owned documents by providing the authorized password. It does not perform brute-force attacks or violate cryptography."
      },
      {
        "question": "Is my secret password stored or sent anywhere?",
        "answer": "No. The password authentication takes place entirely inside your web browser. Neither your file nor your password is ever transmitted across the internet."
      },
      {
        "question": "Will unlocking remove printing and copying restrictions?",
        "answer": "Yes. Supplying the valid password strips all internal access restrictions, enabling uninhibited printing, editing, and page extraction."
      },
      {
        "question": "Can I unlock multiple files at the same time?",
        "answer": "For security and verification reasons, documents are processed individually so you can confirm credentials for each distinct file."
      }
    ]
  },
  "rotate-pdf": {
    "name": "Rotate PDF",
    "formulaTitle": {
      "en": "PDF Dictionary /Rotate Attribute Modification & Viewport Transformation",
      "hi": "पीडीएफ डिक्शनरी /Rotate विशेषता संशोधन और व्यूपोर्ट परिवर्तन",
      "es": "Modificación del Atributo /Rotate del Diccionario PDF y Transformación",
      "ja": "PDF辞書/Rotate属性変更とビューポート座標変換技術",
      "fr": "Modification de l’Attribut /Rotate du Dictionnaire PDF et Transformation",
      "de": "Änderung des /Rotate-Attributs im PDF-Wörterbuch & Transformation",
      "pt": "Modificação do Atributo /Rotate no Dicionário PDF e Transformação de Visualização",
      "ko": "PDF 딕셔너리 /Rotate 속성 변경 및 뷰포트 좌표 변환 아키텍처",
      "it": "Modifica dell’Attributo /Rotate nel Dizionario PDF e Trasformazione Viewport"
    },
    "formulaDescription": {
      "en": "The rotator inspects the target PDF Page objects in browser memory via pdf-lib, updates the integer angle of the /Rotate dictionary attribute in 90-degree increments (0°, 90°, 180°, 270°), recalculates the bounding MediaBox viewport, and serializes the modified PDF structure without re-encoding raster graphics or re-sampling text streams.",
      "hi": "यह टूल ब्राउज़र मेमोरी में pdf-lib द्वारा पीडीएफ पेजों के /Rotate एट्रिब्यूट को 90 डिग्री के गुणकों (90°, 180°, 270°) में बदलता है। यह बिना किसी फोटो या टेक्स्ट की क्वालिटी कम किए केवल ओरिएंटेशन कोण को अपडेट करता है, जिससे प्रक्रिया तुरंत और बिना किसी सर्वर के पूरी होती है।",
      "es": "El rotador modifica el valor entero del atributo /Rotate en incrementos de 90° (0°, 90°, 180°, 270°) en los objetos de página del PDF mediante pdf-lib, ajustando la orientación sin recodificar imágenes ni textos.",
      "ja": "本ローテーターはブラウザメモリ内で各ページの/Rotate属性の角度（90度刻み: 0°、90°、180°、270°）を書き換えます。テキストや画像を再圧縮せず、辞書の回転属性のみを高速に変更するため完全可逆で劣化がありません。",
      "fr": "L’outil met à jour l’attribut /Rotate des objets de page par incréments de 90° via pdf-lib dans le navigateur, ajustant l’orientation du document sans ré-encodage ni perte de qualité visuelle.",
      "de": "Der Rotierer passt das /Rotate-Attribut der Seitenobjekte in 90°-Schritten an (0°, 90°, 180°, 270°) und verändert die Ausrichtung rein strukturell ohne Neuberechnung von Rasterbildern.",
      "pt": "O utilitário altera o valor do atributo /Rotate em passos de 90° no dicionário da página com pdf-lib no navegador, reorientando a visualização sem recodificar elementos.",
      "ko": "본 회전기는 pdf-lib를 사용하여 각 페이지 객체의 /Rotate 속성값을 90도 단위(0°, 90°, 180°, 270°)로 갱신합니다. 텍스트와 이미지를 재압축하지 않고 회전 메타데이터만 변경하므로 화질 손실이 전혀 없습니다.",
      "it": "Lo strumento aggiorna l’attributo /Rotate degli oggetti pagina con incrementi di 90° tramite pdf-lib nel browser, correggendo l’orientamento senza alcuna perdita qualitativa."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your PDF file into the rotation workbench."
        },
        {
          "stepNumber": 2,
          "title": "Select Rotation Angle and Pages",
          "instruction": "Rotate all pages simultaneously or select individual inverted pages to rotate 90°, 180°, or 270° clockwise."
        },
        {
          "stepNumber": 3,
          "title": "Apply Rotation",
          "instruction": "Click Apply Rotation to update dictionary rotation flags in local memory."
        },
        {
          "stepNumber": 4,
          "title": "Download Corrected PDF",
          "instruction": "Save the permanently oriented PDF document directly to your device."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल अपलोड करें",
          "instruction": "अपनी उल्टी या तिरछी पीडीएफ फाइल को वर्कस्पेस में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "रोटेशन कोण और पेज चुनें",
          "instruction": "सभी पेजों को एक साथ घुमाएं या किसी खास पेज को 90°, 180°, या 270° पर घुमाने का विकल्प चुनें।"
        },
        {
          "stepNumber": 3,
          "title": "रोटेशन लागू करें",
          "instruction": "अप्लाई रोटेशन पर क्लिक करें और ब्राउज़र में पेज का ओरिएंटेशन सही करें।"
        },
        {
          "stepNumber": 4,
          "title": "सही पीडीएफ डाउनलोड करें",
          "instruction": "स्थायी रूप से सीधी की गई पीडीएफ फाइल को अपने डिवाइस पर सुरक्षित सेव करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir archivo PDF",
          "instruction": "Arrastre el documento con páginas invertidas o apaisadas al área de carga."
        },
        {
          "stepNumber": 2,
          "title": "Seleccionar ángulo y páginas",
          "instruction": "Gire todas las páginas o seleccione páginas sueltas en giros de 90°, 180° o 270°."
        },
        {
          "stepNumber": 3,
          "title": "Aplicar rotación",
          "instruction": "Actualice los atributos de rotación en la memoria del navegador."
        },
        {
          "stepNumber": 4,
          "title": "Descargar PDF corregido",
          "instruction": "Guarde el documento con la orientación definitiva en su equipo."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルをアップロード",
          "instruction": "向きを修正したいPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "回転角度と対象ページを選択",
          "instruction": "全ページ一括または個別ページを選択し、90°、180°、270°時計回りに回転させます。"
        },
        {
          "stepNumber": 3,
          "title": "回転を適用",
          "instruction": "「回転を適用」をクリックして内部属性の角度情報を即座に更新します。"
        },
        {
          "stepNumber": 4,
          "title": "修正PDFをダウンロード",
          "instruction": "正しい向きで固定されたPDFファイルを保存します。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Charger le fichier PDF",
          "instruction": "Importez le document comportant des pages mal orientées."
        },
        {
          "stepNumber": 2,
          "title": "Définir l’angle de rotation",
          "instruction": "Faites pivoter toutes les pages ou ciblez des feuilles spécifiques à 90°, 180° ou 270°."
        },
        {
          "stepNumber": 3,
          "title": "Appliquer l’orientation",
          "instruction": "Cliquez pour modifier les métadonnées de rotation en mémoire locale."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le PDF orienté",
          "instruction": "Enregistrez le document parfaitement aligné sur votre appareil."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Datei hochladen",
          "instruction": "Ziehen Sie das Dokument mit falsch ausgerichteten Seiten in das Tool."
        },
        {
          "stepNumber": 2,
          "title": "Drehwinkel und Seiten festlegen",
          "instruction": "Drehen Sie alle Seiten oder gezielt Einzelseiten um 90°, 180° oder 270°."
        },
        {
          "stepNumber": 3,
          "title": "Drehung anwenden",
          "instruction": "Aktualisieren Sie die Orientierungsdaten im lokalen Arbeitsspeicher."
        },
        {
          "stepNumber": 4,
          "title": "Gedrehte PDF speichern",
          "instruction": "Laden Sie das dauerhaft korrekt ausgerichtete Dokument herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar documento PDF",
          "instruction": "Arraste o arquivo com páginas invertidas para a ferramenta."
        },
        {
          "stepNumber": 2,
          "title": "Escolher ângulo e páginas",
          "instruction": "Rode todas as páginas ou apenas páginas pontuais em 90°, 180° ou 270°."
        },
        {
          "stepNumber": 3,
          "title": "Aplicar rotação",
          "instruction": "Atualize os metadados de orientação diretamente no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF corrigido",
          "instruction": "Guarde o ficheiro na orientação correta para leitura e impressão."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 업로드",
          "instruction": "회전이 필요한 거꾸로 된 PDF 문서를 작업 창에 끌어옵니다."
        },
        {
          "stepNumber": 2,
          "title": "회전 각도 및 대상 페이지 지정",
          "instruction": "전체 페이지 일괄 회전 또는 특정 페이지만 90°, 180°, 270° 시계 방향으로 회전합니다."
        },
        {
          "stepNumber": 3,
          "title": "회전 적용",
          "instruction": "브라우저 메모리에서 페이지 회전 속성값을 즉시 갱신합니다."
        },
        {
          "stepNumber": 4,
          "title": "회전된 PDF 저장",
          "instruction": "방향이 완벽히 바로잡힌 PDF 문서를 기기에 다운로드합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica documento PDF",
          "instruction": "Trascina il file con pagine capovolte o inclinate."
        },
        {
          "stepNumber": 2,
          "title": "Scegli angolo e pagine",
          "instruction": "Ruota tutte le pagine o singoli fogli a 90°, 180° o 270° in senso orario."
        },
        {
          "stepNumber": 3,
          "title": "Applica rotazione",
          "instruction": "Aggiorna i metadati di orientamento nella memoria del browser."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF corretto",
          "instruction": "Salva il documento con l’orientamento permanente sul tuo computer."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Fixing Upside-Down Scans in an Official Certificate PDF",
        "scenario": "A user scanned a 4-page academic degree certificate where page 2 and page 4 were fed upside-down into the sheet feeder (180° orientation).",
        "calculation": "The tool reads the 4-page PDF, identifies page indices 1 and 3, applies a 180° increment to their /Rotate attributes, and compiles the document.",
        "result": "All 4 pages display in upright vertical portrait orientation in 0.5 seconds with zero raster degradation."
      },
      "hi": {
        "title": "स्कैन किए गए प्रमाणपत्र के उल्टे पेजों को सीधा करना",
        "scenario": "एक छात्र ने 4 पेज का डिग्री सर्टिफिकेट स्कैन किया जिसमें पेज 2 और पेज 4 स्कैनर में उल्टे (180°) स्कैन हो गए।",
        "calculation": "टूल ने पीडीएफ खोली, पेज 2 और 4 के /Rotate एट्रिब्यूट में 180° रोटेशन जोड़ा और फाइल सेव की।",
        "result": "मात्र 0.5 सेकंड में सभी 4 पेज पूरी तरह सीधे और पढ़ने योग्य हो गए, वह भी बिना किसी फोटो खराबी के।"
      },
      "es": {
        "title": "Corrección de páginas invertidas en título universitario",
        "scenario": "Un usuario escanea un título de 4 páginas y detecta que las páginas 2 y 4 quedaron boca abajo (giradas 180°).",
        "calculation": "La herramienta actualiza el atributo /Rotate de las páginas 2 y 4 sumando 180° y recompila el PDF.",
        "result": "Las 4 páginas quedan perfectamente orientadas en 0,5 segundos manteniendo la nitidez original."
      },
      "ja": {
        "title": "スキャナー給紙ミスによる逆向きページの修正実例",
        "scenario": "全4ページの卒業証明書スキャンで、2ページ目と4ページ目が上下逆さま（180度反転）に読み込まれてしまった場合。",
        "calculation": "2ページ目と4ページ目の/Rotate属性を180°更新し、ドキュメントツリーを再保存。",
        "result": "画質劣化ゼロでわずか0.5秒で全ページが正しい縦向きに修正されたPDFが完成。"
      },
      "fr": {
        "title": "Redressement de pages inversées dans un diplôme numérisé",
        "scenario": "Un candidat a scanné un document de 4 pages dont les pages 2 et 4 sont orientées à l’envers (180°).",
        "calculation": "L’outil modifie l’attribut /Rotate des pages concernées de 180° sans rééchantillonner les images.",
        "result": "Document de 4 pages redressé en 0,5 seconde avec une clarté vectorielle intacte."
      },
      "de": {
        "title": "Korrektur von kopfstehenden Scan-Seiten",
        "scenario": "Beim Scannen eines 4-seitigen Dokuments wurden Seite 2 und 4 verkehrt herum (180° gedreht) eingezogen.",
        "calculation": "Das Tool passt den Drehwinkel der betroffenen Seiten im Seitenbaum an und speichert das Ergebnis.",
        "result": "Alle 4 Seiten innerhalb von 0,5 Sekunden verlustfrei in aufrechter Ausrichtung dargestellt."
      },
      "pt": {
        "title": "Correção de Páginas Invertidas num Certificado Escaneado",
        "scenario": "Um formando digitalizou um diploma de 4 páginas e as páginas 2 e 4 ficaram de cabeça para baixo (180°).",
        "calculation": "O utilitário ajusta o atributo de rotação das duas páginas em 180° sem recodificar o arquivo.",
        "result": "Documento corrigido em 0,5 segundos com qualidade gráfica idêntica à original."
      },
      "ko": {
        "title": "스캐너 급지 오류로 거꾸로 들어간 학위 증명서 페이지 보정",
        "scenario": "4페이지 학위 증명서를 스캔했는데 2페이지와 4페이지가 상하 반전(180도 회전)되어 저장된 상황입니다.",
        "calculation": "해당 2개 페이지의 /Rotate 속성을 180도 회전값으로 수정하고 메타데이터를 저장합니다.",
        "result": "화질 손상 없이 0.5초 만에 모든 페이지가 똑바로 정렬된 PDF 완성."
      },
      "it": {
        "title": "Correzione di pagine capovolte in un certificato scansionato",
        "scenario": "Un utente ha acquisito un documento di 4 pagine in cui i fogli 2 e 4 sono finiti capovolti di 180°.",
        "calculation": "Il programma modifica l’attributo /Rotate delle pagine interessate senza toccare i pixel.",
        "result": "Tutte le 4 pagine tornano dritte in soli 0,5 secondi senza alcuna perdita di dettaglio."
      }
    },
    "faqs": [
      {
        "question": "Does rotating pages decrease the text or image quality?",
        "answer": "No. Rotating simply changes the orientation metadata flag in the PDF dictionary. Not a single pixel is recompressed, ensuring 100% lossless output."
      },
      {
        "question": "Can I rotate only specific odd or even pages?",
        "answer": "Yes. You can select specific pages individually in the preview grid and apply rotation only to the chosen items."
      },
      {
        "question": "Is the rotation permanent when opened in third-party readers?",
        "answer": "Yes. The /Rotate attribute is a standard ISO 32000 specification. When saved, the document will open in the corrected orientation in Adobe Reader, Apple Preview, and browsers."
      },
      {
        "question": "Are my confidential documents uploaded to any server during rotation?",
        "answer": "No. The entire process takes place inside your browser memory using JavaScript. No document data is ever transmitted across the internet."
      }
    ]
  },
  "add-page-numbers-to-pdf": {
    "name": "Add Page Numbers to PDF",
    "formulaTitle": {
      "en": "Vector Font Embedding & Content Stream Append Engine",
      "hi": "वेक्टर फॉन्ट एम्बेडिंग और कंटेंट स्ट्रीम अपेंड इंजन",
      "es": "Incrustación de Fuentes Vectoriales y Motor de Anexado de Flujos",
      "ja": "ベクターフォント埋め込みとコンテンツストリーム追加エンジン",
      "fr": "Intégration de Polices Vectorielles et Moteur d’Ajout de Flux",
      "de": "Vektor-Schrifteinbettung & Content-Stream-Append-Engine",
      "pt": "Incorporação de Fontes Vetoriais e Motor de Adição de Conteúdo",
      "ko": "벡터 폰트 임베딩 및 콘텐츠 스트림 텍스트 오버레이 구조",
      "it": "Incorporamento Font Vettoriali e Motore di Aggiunta Contenuti"
    },
    "formulaDescription": {
      "en": "The numbering tool loads the PDF via pdf-lib in browser memory, embeds a standard Type1/TrueType font program (such as Helvetica), iterates across every page to calculate precise bottom/top coordinates relative to the page MediaBox, appends a text operator stream (BT /F1 size Tf x y Td (string) Tj ET), and writes the modified PDF without altering underlying page graphics.",
      "hi": "यह टूल ब्राउज़र मेमोरी में pdf-lib के माध्यम से मानक फॉन्ट (जैसे Helvetica) को एम्बेड करता है। यह प्रत्येक पेज के MediaBox के अनुसार सही को-ऑर्डिनेट (ऊपर या नीचे) की गणना करता है, टेक्स्ट स्ट्रीम (Page X of Y) जोड़ता है और बिना मूल सामग्री को नुकसान पहुंचाए नंबरिंग वाली पीडीएफ तैयार करता है।",
      "es": "La herramienta incrusta una fuente vectorial estándar mediante pdf-lib en la memoria local, calcula las coordenadas según el MediaBox de cada página, añade los operadores de texto con el formato deseado y genera el PDF numerado sin alterar el contenido original.",
      "ja": "本ツールはpdf-libを用いて標準フォントを埋め込み、各ページのMediaBox座標系に基づいて天・地の余白位置を計算。元のグラフィックを保持したまま「ページ X / Y」等のテキスト描画ストリームを末尾に追加して出力します。",
      "fr": "L’outil intègre une police standard via pdf-lib dans le navigateur, calcule les coordonnées en fonction des marges de chaque page, ajoute les opérateurs de texte numérotés et compile le document sans altérer les éléments sous-jacents.",
      "de": "Das Tool bettet Standardschriften mit pdf-lib ein, berechnet exakte Kopf- oder Fußzeilen-Koordinaten im MediaBox-System jeder Seite und fügt den Seitenzahlen-Textstrom verlustfrei hinzu.",
      "pt": "O utilitário incorpora fontes padrão via pdf-lib no navegador, calcula as coordenadas relativas ao MediaBox e insere a numeração de páginas sem mexer no conteúdo existente.",
      "ko": "본 번호 매기기 도구는 pdf-lib를 통해 표준 글꼴을 문서에 임베딩하고, 각 페이지의 MediaBox 좌표계에 맞춰 상단/하단 여백에 정확한 위치를 계산한 뒤 텍스트 스트림을 오버레이하여 번호가 매겨진 PDF를 출력합니다.",
      "it": "Il programma incorpora un font standard tramite pdf-lib nel browser, calcola le coordinate esatte in testata o piè di pagina per ogni foglio e aggiunge la numerazione senza toccare il layout preesistente."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your unnumbered PDF document into the numbering workbench."
        },
        {
          "stepNumber": 2,
          "title": "Configure Number Position and Format",
          "instruction": "Choose placement (Bottom-Center, Bottom-Right, Top-Right) and numbering format (e.g., \"1\", \"Page 1\", \"Page 1 of 10\")."
        },
        {
          "stepNumber": 3,
          "title": "Set Font and Margins",
          "instruction": "Select font style, font size (10–14pt), and margin distance from the page edge."
        },
        {
          "stepNumber": 4,
          "title": "Apply Numbers and Download",
          "instruction": "Click Add Page Numbers to render the pagination overlay and save your document."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल अपलोड करें",
          "instruction": "अपनी बिना पेज नंबर वाली पीडीएफ फाइल को अपलोड बॉक्स में चुनें या खींचें।"
        },
        {
          "stepNumber": 2,
          "title": "नंबर स्थिति और प्रारूप चुनें",
          "instruction": "नंबर का स्थान (नीचे बीच में, नीचे दाएं, ऊपर दाएं) और प्रारूप (उदा. \"1\", \"Page 1 of 10\") चुनें।"
        },
        {
          "stepNumber": 3,
          "title": "फॉन्ट और मार्जिन सेट करें",
          "instruction": "फॉन्ट का आकार (10-14pt) और पेज के किनारे से दूरी निर्धारित करें।"
        },
        {
          "stepNumber": 4,
          "title": "नंबर जोड़ें और डाउनलोड करें",
          "instruction": "ऐड पेज नंबर्स पर क्लिक करें और नंबर लगी हुई पीडीएफ फाइल सुरक्षित डाउनलोड करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir archivo PDF",
          "instruction": "Arrastre el documento que desea paginar al área de trabajo."
        },
        {
          "stepNumber": 2,
          "title": "Elegir posición y formato",
          "instruction": "Seleccione la ubicación (inferior centrado, inferior derecha) y el formato (\"Página 1 de N\")."
        },
        {
          "stepNumber": 3,
          "title": "Ajustar fuente y márgenes",
          "instruction": "Configure el tamaño de tipografía (10 a 14 pt) y la separación del borde."
        },
        {
          "stepNumber": 4,
          "title": "Aplicar y descargar",
          "instruction": "Haga clic en Añadir números de página y guarde el documento actualizado."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルをアップロード",
          "instruction": "ページ番号を追加したいPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "配置位置と書式を設定",
          "instruction": "配置（下部中央、下部右、上部右など）および番号書式（例: 1, Page 1 of 10）を選択します。"
        },
        {
          "stepNumber": 3,
          "title": "フォントと余白を調整",
          "instruction": "文字サイズ（10〜14pt）や用紙端からのマージン距離を設定します。"
        },
        {
          "stepNumber": 4,
          "title": "番号を追加してダウンロード",
          "instruction": "「ページ番号を追加」をクリックし、ページ番号が印字されたPDFを保存します。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Importer le fichier PDF",
          "instruction": "Sélectionnez le document à numéroter depuis votre appareil."
        },
        {
          "stepNumber": 2,
          "title": "Choisir l’emplacement et le format",
          "instruction": "Définissez la position (bas centré, bas droite) et le libellé (\"Page 1 sur N\")."
        },
        {
          "stepNumber": 3,
          "title": "Régler la police et les marges",
          "instruction": "Ajustez la taille du texte (10-14 pt) et la distance par rapport aux bords."
        },
        {
          "stepNumber": 4,
          "title": "Appliquer et télécharger",
          "instruction": "Cliquez sur Ajouter les numéros de page pour obtenir le document paginé."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Dokument hochladen",
          "instruction": "Ziehen Sie die unnummerierte PDF-Datei in den Arbeitsbereich."
        },
        {
          "stepNumber": 2,
          "title": "Position und Format wählen",
          "instruction": "Legen Sie die Platzierung (unten zentriert, unten rechts) und das Format (\"Seite 1 von N\") fest."
        },
        {
          "stepNumber": 3,
          "title": "Schriftgröße und Ränder einstellen",
          "instruction": "Wählen Sie Schriftgröße (10–14 pt) und den Abstand zum Seitenrand."
        },
        {
          "stepNumber": 4,
          "title": "Nummerierung anwenden und speichern",
          "instruction": "Klicken Sie auf Seitenzahlen hinzufügen und laden Sie die fertige PDF herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar documento PDF",
          "instruction": "Selecione o ficheiro que precisa de paginação no formulário."
        },
        {
          "stepNumber": 2,
          "title": "Definir posição e formato",
          "instruction": "Escolha a localização (rodapé centro, rodapé direita) e o modelo (\"Página 1 de N\")."
        },
        {
          "stepNumber": 3,
          "title": "Ajustar fonte e margens",
          "instruction": "Configure o tamanho do tipo de letra (10 a 14 pt) e o espaçamento."
        },
        {
          "stepNumber": 4,
          "title": "Aplicar e descarregar",
          "instruction": "Clique em Adicionar números de página e guarde o documento paginado."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 업로드",
          "instruction": "페이지 번호가 없는 PDF 문서를 작업 창에 끌어옵니다."
        },
        {
          "stepNumber": 2,
          "title": "위치 및 번호 양식 선택",
          "instruction": "번호 위치(하단 중앙, 하단 우측, 상단 우측) 및 표시 형식(\"1\", \"Page 1 of 10\")을 지정합니다."
        },
        {
          "stepNumber": 3,
          "title": "글꼴 크기 및 여백 조정",
          "instruction": "폰트 크기(10~14pt)와 용지 가장자리로부터의 여백 거리를 설정합니다."
        },
        {
          "stepNumber": 4,
          "title": "번호 추가 및 저장",
          "instruction": "페이지 번호 추가 버튼을 눌러 번호가 삽입된 문서를 즉시 다운로드합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica documento PDF",
          "instruction": "Trascina il file senza numerazione nell’area di caricamento."
        },
        {
          "stepNumber": 2,
          "title": "Seleziona posizione e formato",
          "instruction": "Scegli la collocazione (in basso al centro, in basso a destra) e il formato desiderato."
        },
        {
          "stepNumber": 3,
          "title": "Imposta carattere e margini",
          "instruction": "Regola la dimensione del font (10-14 pt) e la distanza dal bordo del foglio."
        },
        {
          "stepNumber": 4,
          "title": "Applica e scarica PDF",
          "instruction": "Clicca su Aggiungi numeri di pagina e salva il documento impaginato."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Numbering a 45-Page Academic Dissertation for Submission",
        "scenario": "A graduate student has a 45-page master’s thesis and must add formal pagination (\"Page X of 45\") in the bottom-center margin before final printing.",
        "calculation": "The tool reads the 45 pages, inserts an embedded Helvetica font stream, computes bottom-center coordinates for each page, and writes the pagination text.",
        "result": "A 45-page paginated PDF generated in 1.1 seconds with crystal-clear vector typography ready for graduation binding."
      },
      "hi": {
        "title": "अंतिम प्रस्तुति के लिए 45 पेजों के शोध प्रबंध में पेज नंबर जोड़ना",
        "scenario": "एक शोधार्थी के पास 45 पेजों की थीसिस है जिसमें प्रिंटिंग से पहले नीचे बीच में औपचारिक पेज नंबर (\"Page X of 45\") जोड़ना अनिवार्य है।",
        "calculation": "टूल ने सभी 45 पेजों को स्कैन किया, प्रत्येक पेज के निचले केंद्र बिंदु की गणना की और स्पष्ट फॉन्ट में पेज नंबर जोड़ दिए।",
        "result": "मात्र 1.1 सेकंड में 45 पेजों की सुंदर नंबरिंग वाली थीसिस तैयार हो गई जो सीधे प्रिंट के लिए उपयुक्त है।"
      },
      "es": {
        "title": "Paginación de tesis académica de 45 páginas",
        "scenario": "Un estudiante de posgrado necesita numerar las 45 páginas de su tesis con el formato \"Página X de 45\" en el pie de página.",
        "calculation": "La herramienta calcula las coordenadas inferiores de cada página e inserta el texto tipográfico con la numeración secuencial.",
        "result": "Documento de 45 páginas completamente numerado en 1,1 segundos listo para encuadernación."
      },
      "ja": {
        "title": "提出用45ページの修士論文へのノンブル（ページ番号）追加実例",
        "scenario": "大学院生が製本提出用に、45ページの論文下部中央に「Page X of 45」の形式で一括採番したい場合。",
        "calculation": "全45ページの座標系を読み取り、下端マージンの中央にベクターフォントによるページ番号描画コマンドを追加。",
        "result": "わずか1.1秒で全ページに美しいページ番号が印刷品質で追加されたPDFが完成。"
      },
      "fr": {
        "title": "Numérotation d’un mémoire universitaire de 45 pages",
        "scenario": "Un étudiant doit numéroter son mémoire au format \"Page X sur 45\" en bas de page avant dépôt officiel.",
        "calculation": "L’outil intègre la police vectorielle et calcule la position centrale basse de chaque feuille pour y inscrire la pagination.",
        "result": "Document paginé de 45 pages produit en 1,1 seconde avec une netteté irréprochable."
      },
      "de": {
        "title": "Seitennummerierung einer 45-seitigen Masterarbeit",
        "scenario": "Ein Student muss seine 45-seitige Abschlussarbeit vor dem Druck mit einer einheitlichen Paginierung (\"Seite X von 45\") versehen.",
        "calculation": "Das Tool berechnet die exakten Fußzeilenkoordinaten für jede Seite und fügt den nummerierten Textstrom ein.",
        "result": "Druckfertige paginierte PDF in 1,1 Sekunden mit einwandfreier Vektortypografie erzeugt."
      },
      "pt": {
        "title": "Numeração de Tese Académica de 45 Páginas",
        "scenario": "Um estudante precisa paginar um trabalho de 45 páginas com a menção \"Página X de 45\" no rodapé central.",
        "calculation": "A ferramenta calcula o centro inferior de cada folha e imprime a numeração vetorial em cada página.",
        "result": "Ficheiro de 45 páginas completamente paginado em 1,1 segundos com qualidade profissional."
      },
      "ko": {
        "title": "제출용 45페이지 석사 학위 논문에 일괄 페이지 번호 삽입",
        "scenario": "대학원생이 최종 인쇄 제본 전 45페이지 분량의 논문 하단 중앙에 \"Page X of 45\" 형식으로 페이지 번호를 추가해야 하는 상황입니다.",
        "calculation": "45개 페이지의 하단 중앙 좌표를 자동 계산하고 선명한 벡터 폰트로 페이지 번호 스트림을 오버레이합니다.",
        "result": "문서 깨짐 없이 1.1초 만에 깔끔한 페이지 번호가 매겨진 인쇄용 PDF 완성."
      },
      "it": {
        "title": "Numerazione di tesi di laurea da 45 pagine",
        "scenario": "Uno studente universitario deve inserire la dicitura \"Pagina X di 45\" a piè di pagina su un documento di 45 fogli.",
        "calculation": "Il programma calcola la posizione al centro della base di ogni foglio e inserisce il testo vettoriale di numerazione.",
        "result": "Documento completo di 45 pagine impaginato in 1,1 secondi pronto per la stampa della tesi."
      }
    },
    "faqs": [
      {
        "question": "Can I choose to skip numbering on the first cover page?",
        "answer": "Yes. You can configure the numbering to start on page 2 or specify custom starting page offsets so your title page and table of contents remain clean."
      },
      {
        "question": "Will adding numbers overwrite or obscure my existing document text?",
        "answer": "Page numbers are rendered within the margins (usually 15–20mm from the sheet edge). You can adjust margin distances to prevent overlapping existing footer text."
      },
      {
        "question": "Is my PDF uploaded to any cloud server?",
        "answer": "No. The numbering engine runs 100% inside your browser using pdf-lib. Your confidential dissertation, legal brief, or accounting ledger never leaves your computer."
      },
      {
        "question": "Can I customize the numbering format (e.g., Roman numerals)?",
        "answer": "You can choose between Arabic numerals (1, 2, 3), prefixed styles (\"Page 1\"), or total page counts (\"Page 1 of 10\")."
      }
    ]
  },
  "pdf-to-word": {
    "name": "PDF to Word",
    "formulaTitle": {
      "en": "In-Browser PDF.js Text Run Extraction & OpenXML DOCX Packaging",
      "hi": "इन-ब्राउज़र PDF.js टेक्स्ट रन निष्कर्षण और OpenXML DOCX पैकेजिंग",
      "es": "Extracción de Texto con PDF.js y Empaquetado OpenXML DOCX",
      "ja": "ブラウザ内PDF.jsテキスト構造解析とOpenXML DOCXパッケージング技術",
      "fr": "Extraction de Texte PDF.js et Assemblage OpenXML DOCX dans le Navigateur",
      "de": "Lokale PDF.js-Textextraktion & OpenXML-DOCX-Paketierung",
      "pt": "Extração de Texto via PDF.js e Montagem OpenXML DOCX no Navegador",
      "ko": "브라우저 내 PDF.js 텍스트 런 추출 및 OpenXML DOCX 패키징 구조",
      "it": "Estrazione Testo con PDF.js e Assemblaggio OpenXML DOCX nel Browser"
    },
    "formulaDescription": {
      "en": "The converter executes Mozilla PDF.js in browser memory to parse font metrics, character glyph placements, line breaks, and paragraph groupings. It maps these text runs into valid ECMA-376 Microsoft Word OpenXML markup (word/document.xml) and compresses them into a standard .docx container using JSZip without uploading sensitive documents to an external server.",
      "hi": "यह टूल मोज़िला की PDF.js का उपयोग करके ब्राउज़र मेमोरी में पीडीएफ के अक्षरों, फोंट और पैराग्राफ को समझता है। यह निकाले गए टेक्स्ट को ECMA-376 माइक्रोसॉफ्ट वर्ड OpenXML फॉर्मेट में बदलता है और JSZip के माध्यम से बिना किसी सर्वर का उपयोग किए सीधे आपके डिवाइस पर पूरी तरह एडिटेबल .docx फाइल तैयार करता है।",
      "es": "El conversor utiliza PDF.js en el navegador para extraer líneas, fuentes y párrafos del PDF, generando la estructura OpenXML (ECMA-376) de Microsoft Word y empaquetándola en un archivo .docx mediante JSZip sin transferencias a servidores.",
      "ja": "本変換器はMozilla PDF.jsを用いてブラウザ内で文字コード、フォント情報、段落の改行位置を精確に抽出。ECMA-376規格のWord OpenXML構造（document.xml）にマッピングし、JSZipで圧縮して完全編集可能な.docxファイルをローカル生成します。",
      "fr": "Le convertisseur analyse les polices, positions de glyphes et paragraphes avec PDF.js dans le navigateur, les convertit en balises OpenXML (ECMA-376) et les assemble dans un fichier .docx via JSZip sans téléversement.",
      "de": "Der Konverter nutzt PDF.js, um Textzeilen, Schriftmetriken und Absätze im Browser zu analysieren, generiert die OpenXML-Struktur (ECMA-376) und packt diese mit JSZip zu einer bearbeitbaren .docx-Datei ohne Serverkontakt.",
      "pt": "O conversor utiliza a PDF.js no navegador para extrair texto, fontes e quebras de linha, montando o padrão OpenXML (ECMA-376) do Word e gerando o arquivo .docx via JSZip sem envio a servidores remotos.",
      "ko": "본 변환기는 Mozilla PDF.js를 통해 브라우저 메모리에서 텍스트 좌표, 폰트 정보, 단락 구분을 파싱한 뒤 ECMA-376 표준 Word OpenXML 마크업으로 변환하고 JSZip으로 패키징하여 편집 가능한 .docx 파일로 출력합니다.",
      "it": "Il convertitore adotta PDF.js nel browser per estrarre blocchi di testo, font e paragrafi dal PDF, costruendo la struttura OpenXML (ECMA-376) e comprimendo il file in formato .docx con JSZip in modo riservato."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your digital vector PDF into the converter area or click to browse."
        },
        {
          "stepNumber": 2,
          "title": "Extract Text and Paragraphs",
          "instruction": "The browser runs PDF.js to parse text streams, font weights, and line heights."
        },
        {
          "stepNumber": 3,
          "title": "Compile OpenXML DOCX Structure",
          "instruction": "Click Convert to Word to synthesize the paragraphs into valid Microsoft Word OpenXML format."
        },
        {
          "stepNumber": 4,
          "title": "Download Editable DOCX",
          "instruction": "Save the .docx document and edit freely in Microsoft Word, Google Docs, or LibreOffice."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल अपलोड करें",
          "instruction": "अपनी डिजिटल पीडीएफ फाइल को कनवर्टर बॉक्स में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "टेक्स्ट और पैराग्राफ निकालें",
          "instruction": "ब्राउज़र PDF.js के माध्यम से टेक्स्ट लाइनों, फोंट और पैराग्राफ को स्कैन करता है।"
        },
        {
          "stepNumber": 3,
          "title": "वर्ड DOCX में बदलें",
          "instruction": "कन्वर्ट टू वर्ड पर क्लिक करें और सामग्री को एडिटेबल माइक्रोसॉफ्ट वर्ड फॉर्मेट में व्यवस्थित करें।"
        },
        {
          "stepNumber": 4,
          "title": "एडिटेबल DOCX डाउनलोड करें",
          "instruction": "वर्ड फाइल डाउनलोड करें और इसे Microsoft Word, Google Docs या LibreOffice में एडिट करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir documento PDF",
          "instruction": "Arrastre el archivo PDF con texto seleccionable al área de conversión."
        },
        {
          "stepNumber": 2,
          "title": "Escanear texto y párrafos",
          "instruction": "PDF.js analiza en el navegador los tipos de letra, espaciados y párrafos."
        },
        {
          "stepNumber": 3,
          "title": "Generar estructura DOCX",
          "instruction": "Haga clic en Convertir a Word para construir el archivo compatible con Office."
        },
        {
          "stepNumber": 4,
          "title": "Descargar Word editable",
          "instruction": "Abra y edite el archivo .docx en Microsoft Word, Google Docs o LibreOffice."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルをアップロード",
          "instruction": "文字選択が可能なデジタルPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "テキストと段落を抽出",
          "instruction": "ブラウザ内のPDF.jsがフォント情報、文字配置、改行位置を精密解析します。"
        },
        {
          "stepNumber": 3,
          "title": "DOCX形式へ変換",
          "instruction": "「Wordに変換」をクリックし、ECMA-376規格のWord文書構造を生成します。"
        },
        {
          "stepNumber": 4,
          "title": "編集可能なDOCXを保存",
          "instruction": "ダウンロードした.docxファイルをWordやGoogleドキュメントで自由に編集できます。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Importer le document PDF",
          "instruction": "Glissez-déposez votre fichier contenant du texte sélectionnable."
        },
        {
          "stepNumber": 2,
          "title": "Analyser les lignes et paragraphes",
          "instruction": "Le navigateur extrait les styles de police et les blocs de texte."
        },
        {
          "stepNumber": 3,
          "title": "Compiler le document DOCX",
          "instruction": "Cliquez sur Convertir en Word pour assembler la structure OpenXML."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le fichier Word",
          "instruction": "Modifiez librement votre fichier .docx dans Microsoft Word ou Google Docs."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Datei bereitstellen",
          "instruction": "Ziehen Sie das PDF mit auswählbarem Text in den Konverterbereich."
        },
        {
          "stepNumber": 2,
          "title": "Text und Absätze analysieren",
          "instruction": "PDF.js scannt Schriftarten, Zeilenumbrüche und Absatzstrukturen im Browser."
        },
        {
          "stepNumber": 3,
          "title": "In DOCX-Struktur überführen",
          "instruction": "Klicken Sie auf In Word konvertieren, um das Word-Dokument zusammenzusetzen."
        },
        {
          "stepNumber": 4,
          "title": "Bearbeitbare DOCX herunterladen",
          "instruction": "Öffnen und bearbeiten Sie die .docx-Datei in Microsoft Word oder LibreOffice."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar ficheiro PDF",
          "instruction": "Adicione o documento PDF que contenha texto selecionável."
        },
        {
          "stepNumber": 2,
          "title": "Processar texto e parágrafos",
          "instruction": "A PDF.js analisa os estilos, tamanhos de letra e parágrafos no navegador."
        },
        {
          "stepNumber": 3,
          "title": "Gerar documento DOCX",
          "instruction": "Clique em Converter para Word para montar o ficheiro Microsoft Word."
        },
        {
          "stepNumber": 4,
          "title": "Baixar Word editável",
          "instruction": "Abra e edite o seu arquivo .docx no Word, Google Docs ou LibreOffice."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 문서 업로드",
          "instruction": "텍스트 선택이 가능한 전자 PDF 문서를 드래그하거나 선택하여 불러옵니다."
        },
        {
          "stepNumber": 2,
          "title": "텍스트 및 단락 구문 분석",
          "instruction": "브라우저 내 PDF.js 엔진이 글꼴 스타일, 줄 바꿈, 문단을 정밀 추출합니다."
        },
        {
          "stepNumber": 3,
          "title": "DOCX 구조로 빌드",
          "instruction": "Word 변환 버튼을 클릭하여 ECMA-376 표준 Word 문서로 조립합니다."
        },
        {
          "stepNumber": 4,
          "title": "편집 가능한 DOCX 다운로드",
          "instruction": "생성된 .docx 파일을 Microsoft Word나 한글, Google Docs에서 편집합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica documento PDF",
          "instruction": "Trascina il file PDF con testo selezionabile nell’area di conversione."
        },
        {
          "stepNumber": 2,
          "title": "Analizza testo e paragrafi",
          "instruction": "PDF.js estrae caratteri, dimensioni dei font e interlinea nel browser."
        },
        {
          "stepNumber": 3,
          "title": "Compila file DOCX",
          "instruction": "Clicca su Converti in Word per creare il file compatibile con Microsoft Word."
        },
        {
          "stepNumber": 4,
          "title": "Scarica Word modificabile",
          "instruction": "Modifica il file .docx ottenuto in Word, Google Documenti o LibreOffice."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Converting a Policy Document into an Editable Word Proposal",
        "scenario": "An HR manager needs to update an 8-page company policy manual that exists only as an exported PDF file.",
        "calculation": "The tool extracts 8 pages of text runs, classifies headings, bullet lists, and standard paragraphs, and wraps them into a valid .docx package using JSZip.",
        "result": "A fully editable 8-page Microsoft Word (.docx) document generated in 1.8 seconds with zero server upload."
      },
      "hi": {
        "title": "कंपनी पॉलिसी पीडीएफ को एडिटेबल वर्ड डॉक्यूमेंट में बदलना",
        "scenario": "एक एचआर मैनेजर को 8 पेज की कंपनी नीति पुस्तिका को अपडेट करना है जो केवल पीडीएफ फॉर्मेट में उपलब्ध है।",
        "calculation": "टूल ने सभी 8 पेजों के टेक्स्ट, हेडिंग और पैराग्राफ को निकाला और JSZip द्वारा एक मान्य .docx फाइल बनाई।",
        "result": "मात्र 1.8 सेकंड में पूरी तरह एडिटेबल 8 पेज का वर्ड (.docx) दस्तावेज तैयार हुआ जिसे आसानी से अपडेट किया जा सकता है।"
      },
      "es": {
        "title": "Conversión de manual de políticas a documento Word editable",
        "scenario": "Un responsable de recursos humanos debe actualizar un manual de 8 páginas que solo conservaba en formato PDF.",
        "calculation": "La herramienta extrae el texto de las 8 páginas, organiza encabezados y párrafos y genera el paquete .docx con JSZip.",
        "result": "Archivo Word (.docx) de 8 páginas 100% editable obtenido en 1,8 segundos sin subir datos a ningún servidor."
      },
      "ja": {
        "title": "社内規程PDFを編集可能なWord文書に変換する実例",
        "scenario": "人事担当者が、手元にPDF形式しか残っていない8ページの就業規則をWordで加筆修正したい場合。",
        "calculation": "PDF.jsで8ページ分のテキスト要素、見出し階層、箇条書きを抽出し、JSZipで標準.docxファイルにパッケージング。",
        "result": "サーバーへの情報漏洩の心配なく、わずか1.8秒で編集可能な8ページのWordファイルが完成。"
      },
      "fr": {
        "title": "Conversion d’un règlement intérieur PDF en document Word modifiable",
        "scenario": "Un responsable RH doit actualiser une note de service de 8 pages disponible uniquement sous forme de PDF.",
        "calculation": "L’outil extrait les 8 pages de texte, organise les titres et paragraphes et les exporte en fichier .docx via JSZip.",
        "result": "Document Word de 8 pages parfaitement modifiable généré en 1,8 seconde en local."
      },
      "de": {
        "title": "Umwandlung einer PDF-Richtlinie in ein bearbeitbares Word-Dokument",
        "scenario": "Ein Personalverantwortlicher muss ein 8-seitiges Handbuch überarbeiten, das nur als PDF-Datei vorliegt.",
        "calculation": "Das Tool extrahiert alle Textzeilen, strukturiert Überschriften und Absätze und erzeugt eine valide .docx-Datei mit JSZip.",
        "result": "Vollständig bearbeitbare 8-seitige Word-Datei innerhalb von 1,8 Sekunden lokal auf dem Gerät erstellt."
      },
      "pt": {
        "title": "Conversão de Regulamento PDF em Documento Word Editável",
        "scenario": "Um gestor de RH precisa atualizar um regulamento interno de 8 páginas arquivado apenas em PDF.",
        "calculation": "A ferramenta extrai as linhas de texto, títulos e parágrafos das 8 páginas e gera o arquivo .docx com JSZip.",
        "result": "Ficheiro Microsoft Word (.docx) de 8 páginas totalmente editável criado em 1,8 segundos."
      },
      "ko": {
        "title": "PDF 사규 문서를 편집 가능한 Word 제안서로 변환 실례",
        "scenario": "인사 담당자가 PDF 파일로만 보관되어 있는 8페이지짜리 취업규칙 개정안을 Word에서 직접 수정하고자 합니다.",
        "calculation": "PDF.js를 통해 8페이지의 본문 텍스트, 제목, 단락 구조를 추출하고 JSZip으로 표준 .docx 파일로 빌드합니다.",
        "result": "외부 서버 전송 없이 1.8초 만에 즉시 수정 가능한 8페이지 Word(.docx) 파일 변환 완료."
      },
      "it": {
        "title": "Conversione di regolamento PDF in documento Word modificabile",
        "scenario": "Un responsabile del personale deve aggiornare un manuale aziendale di 8 pagine disponibile solo in PDF.",
        "calculation": "Il programma estrae i blocchi di testo, riconosce i titoli e confeziona il file .docx tramite JSZip.",
        "result": "Documento Word (.docx) da 8 pagine pronto per la modifica generato in 1,8 secondi in locale."
      }
    },
    "faqs": [
      {
        "question": "Will the generated DOCX file work in Microsoft Word, Google Docs, and LibreOffice?",
        "answer": "Yes. The output conforms to the ISO/IEC 29500 (ECMA-376) OpenXML standard and opens seamlessly in all modern office suites."
      },
      {
        "question": "Can this tool extract text from scanned, image-only PDF documents?",
        "answer": "This tool extracts native digital vector text. If your PDF is a flat image scan without embedded OCR text layers, you will need an OCR utility to synthesize characters before converting."
      },
      {
        "question": "Are my confidential business documents uploaded to an external server?",
        "answer": "No. All text parsing, layout assembly, and DOCX compression happen entirely inside your web browser. Your confidential records never leave your computer."
      },
      {
        "question": "Will tables and complex multi-column layouts be preserved?",
        "answer": "Text paragraphs and formatting flows are cleanly reconstructed. For intricate multi-column newspaper layouts, slight manual margin adjustments in Word may be beneficial."
      }
    ]
  },
  "word-to-pdf": {
    "name": "Word to PDF",
    "formulaTitle": {
      "en": "In-Browser Mammoth.js DOCX Extraction & jsPDF Pagination Engine",
      "hi": "इन-ब्राउज़र Mammoth.js DOCX निष्कर्षण और jsPDF पेजिनेशन इंजन",
      "es": "Extracción DOCX con Mammoth.js y Paginación jsPDF en Cliente",
      "ja": "ブラウザ内Mammoth.js DOCX構造解析とjsPDFページネーションエンジン",
      "fr": "Extraction DOCX par Mammoth.js et Moteur de Pagination jsPDF en Local",
      "de": "Lokale Mammoth.js-DOCX-Verarbeitung & jsPDF-Paginierungs-Engine",
      "pt": "Extração DOCX via Mammoth.js e Motor de Paginação jsPDF no Navegador",
      "ko": "브라우저 내 Mammoth.js DOCX 파싱 및 jsPDF 페이지네이션 엔진 구조",
      "it": "Estrazione DOCX con Mammoth.js e Motore di Impaginazione jsPDF nel Browser"
    },
    "formulaDescription": {
      "en": "The converter extracts raw document XML relationships, paragraph styles, headings, tables, and ordered lists from the .docx archive using mammoth.js. It maps typography hierarchies to exact millimeter coordinate grids on standard A4 or Letter sheets via jsPDF, generating a print-ready vector PDF document without sending files to external servers.",
      "hi": "यह टूल mammoth.js का उपयोग करके .docx फाइल के आंतरिक XML, हेडिंग, टेबल और पैराग्राफ को डिकोड करता है। इसके बाद यह jsPDF के माध्यम से मिलीमीटर ग्रिड पर मानक A4 या लेटर पेज के रूप में टेक्स्ट और फॉर्मेट को व्यवस्थित करता है और बिना किसी सर्वर पर डाटा भेजे सीधे ब्राउज़र में नई पीडीएफ फाइल बनाता है।",
      "es": "El conversor analiza los estilos, tablas y párrafos del archivo .docx mediante mammoth.js, calcula la tipografía y saltos de página con jsPDF en hojas estándar A4 o Carta y compila un PDF listo para imprimir en la memoria local.",
      "ja": "本変換器はブラウザ内でmammoth.jsを使用し、.docxのXML構造から見出し階層、段落、表組みを抽出。jsPDFにより標準A4またはレター規格の用紙グリッド上にミリ単位で再配置し、外部通信を行わずに印刷用ベクターPDFを出力します。",
      "fr": "Le convertisseur extrait la structure XML, les titres, tableaux et paragraphes du fichier .docx avec mammoth.js, puis calibre la mise en page sur format A4 ou Lettre via jsPDF pour exporter un PDF haute fidélité.",
      "de": "Der Konverter analysiert .docx-Archive mit mammoth.js, ermittelt Überschriften, Listen und Textstile und setzt diese mittels jsPDF auf DIN A4- oder Letter-Seiten um – vollständig clientseitig im Browser.",
      "pt": "O conversor processa a estrutura do documento .docx através de mammoth.js, calcula o fluxo de parágrafos e margens com jsPDF e produz um PDF profissional pronto para impressão.",
      "ko": "본 변환기는 mammoth.js를 활용하여 .docx 파일의 XML 관계, 단락 서식, 표, 목록을 분석하고 jsPDF를 통해 표준 A4 또는 Letter 규격의 밀리미터 좌표계에 텍스트를 배치하여 출력용 PDF를 생성합니다.",
      "it": "Il convertitore analizza stili, tabelle e paragrafi del file .docx con mammoth.js e organizza la composizione su fogli A4 o Lettera tramite jsPDF, generando il file PDF definitivo direttamente nel browser."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload Word Document",
          "instruction": "Drag and drop your Microsoft Word (.docx) file into the upload zone or click to browse."
        },
        {
          "stepNumber": 2,
          "title": "Configure Page Format and Margins",
          "instruction": "Select your target sheet size (A4 or US Letter) and margin style (Normal, Narrow, or Wide)."
        },
        {
          "stepNumber": 3,
          "title": "Render Document",
          "instruction": "Click Convert to PDF to initiate in-memory paragraph formatting and page compilation."
        },
        {
          "stepNumber": 4,
          "title": "Download Printable PDF",
          "instruction": "Save the generated PDF document directly to your device."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "वर्ड फाइल अपलोड करें",
          "instruction": "अपनी माइक्रोसॉफ्ट वर्ड (.docx) फाइल को अपलोड बॉक्स में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "पेज साइज और मार्जिन सेट करें",
          "instruction": "पेज का साइज (A4 या लेटर) और मार्जिन (सामान्य, संकीर्ण, चौड़ा) चुनें।"
        },
        {
          "stepNumber": 3,
          "title": "पीडीएफ में बदलें",
          "instruction": "कन्वर्ट टू पीडीएफ पर क्लिक करें और ब्राउज़र में पेजों का निर्माण शुरू करें।"
        },
        {
          "stepNumber": 4,
          "title": "प्रिंट-तैयार पीडीएफ डाउनलोड करें",
          "instruction": "तैयार पीडीएफ फाइल को अपने कंप्यूटर या फोन पर तुरंत डाउनलोड करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir archivo Word",
          "instruction": "Arrastre su documento .docx al área de carga o selecciónelo en su dispositivo."
        },
        {
          "stepNumber": 2,
          "title": "Configurar página y márgenes",
          "instruction": "Elija el tamaño de página (A4 o Carta) y el tipo de margen deseado."
        },
        {
          "stepNumber": 3,
          "title": "Procesar conversión",
          "instruction": "Haga clic en Convertir a PDF para generar las páginas en la memoria local."
        },
        {
          "stepNumber": 4,
          "title": "Descargar PDF resultante",
          "instruction": "Guarde su nuevo documento PDF directamente en su equipo."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "Wordファイルをアップロード",
          "instruction": "変換したいMicrosoft Word（.docx）ファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "用紙規格と余白を設定",
          "instruction": "用紙サイズ（A4またはレター）と余白スタイル（標準、狭い、広い）を選択します。"
        },
        {
          "stepNumber": 3,
          "title": "PDFへの変換を実行",
          "instruction": "「PDFに変換」をクリックしてブラウザ内でのページ組版処理を開始します。"
        },
        {
          "stepNumber": 4,
          "title": "完成したPDFを保存",
          "instruction": "生成された印刷対応PDFファイルをローカルにダウンロードします。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Charger le fichier Word",
          "instruction": "Importez votre document .docx dans l’espace de conversion."
        },
        {
          "stepNumber": 2,
          "title": "Paramétrer le format et les marges",
          "instruction": "Sélectionnez le format de page (A4 ou Lettre) et la disposition des marges."
        },
        {
          "stepNumber": 3,
          "title": "Générer le PDF",
          "instruction": "Cliquez sur Convertir en PDF pour assembler les pages en mémoire locale."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le document final",
          "instruction": "Enregistrez le document PDF prêt pour l’impression sur votre appareil."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "Word-Dokument bereitstellen",
          "instruction": "Ziehen Sie die .docx-Datei in den Arbeitsbereich oder wählen Sie diese aus."
        },
        {
          "stepNumber": 2,
          "title": "Seitenformat und Ränder festlegen",
          "instruction": "Wählen Sie A4 oder Letter sowie die gewünschte Randeinstellung."
        },
        {
          "stepNumber": 3,
          "title": "In PDF umwandeln",
          "instruction": "Klicken Sie auf In PDF konvertieren, um das Dokument lokal zu erstellen."
        },
        {
          "stepNumber": 4,
          "title": "Fertiges PDF herunterladen",
          "instruction": "Speichern Sie die druckfertige PDF-Datei auf Ihrem Rechner."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar ficheiro Word",
          "instruction": "Arraste o seu documento .docx para o formulário de conversão."
        },
        {
          "stepNumber": 2,
          "title": "Ajustar formato e margens",
          "instruction": "Selecione o tamanho (A4 ou Carta) e o estilo de margem pretendido."
        },
        {
          "stepNumber": 3,
          "title": "Converter documento",
          "instruction": "Clique em Converter para PDF para montar as páginas no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF final",
          "instruction": "Transfira o arquivo PDF gerado diretamente para o seu dispositivo."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "Word 문서 업로드",
          "instruction": "변환할 Microsoft Word(.docx) 문서를 선택하거나 작업 창으로 끌어옵니다."
        },
        {
          "stepNumber": 2,
          "title": "용지 규격 및 여백 설정",
          "instruction": "용지 크기(A4 또는 Letter)와 여백 스타일(기본, 좁게, 넓게)을 지정합니다."
        },
        {
          "stepNumber": 3,
          "title": "PDF 변환 시작",
          "instruction": "PDF 변환 버튼을 클릭하여 브라우저 메모리에서 페이지 조판을 실행합니다."
        },
        {
          "stepNumber": 4,
          "title": "완성된 PDF 다운로드",
          "instruction": "인쇄 준비가 완료된 PDF 문서를 기기에 안전하게 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica file Word",
          "instruction": "Trascina il documento .docx nell’area di conversione o selezionalo."
        },
        {
          "stepNumber": 2,
          "title": "Imposta formato e margini",
          "instruction": "Scegli la dimensione del foglio (A4 o Lettera) e la larghezza dei margini."
        },
        {
          "stepNumber": 3,
          "title": "Converti in PDF",
          "instruction": "Clicca su Converti in PDF per comporre il documento nella memoria locale."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF pronto",
          "instruction": "Salva il nuovo file PDF direttamente sul tuo computer o smartphone."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Converting a Resume from Word to PDF for a Job Application",
        "scenario": "A job seeker has updated their 2-page curriculum vitae in Microsoft Word and needs a fixed-layout, universal PDF document for online application systems.",
        "calculation": "The tool extracts headings, bullet points, and dates from the .docx structure, maps them to standard A4 page dimensions (210 x 297 mm), and outputs a 2-page PDF via jsPDF.",
        "result": "A crisp, 2-page vector PDF generated in 1.1 seconds with locked layouts that render identically on any operating system."
      },
      "hi": {
        "title": "नौकरी के आवेदन के लिए रिज्यूमे को वर्ड से पीडीएफ में बदलना",
        "scenario": "एक अभ्यर्थी ने वर्ड में अपना 2 पेज का रिज्यूमे तैयार किया है और उसे कंपनी पोर्टल पर अपलोड करने के लिए निश्चित लेआउट वाली पीडीएफ फाइल चाहिए।",
        "calculation": "टूल ने .docx फाइल से टेक्स्ट, बुलेट पॉइंट्स और हेडिंग्स को पढ़ा, A4 पेज के आकार पर सही मार्जिन के साथ सेट किया और 2 पेज की पीडीएफ बनाई।",
        "result": "मात्र 1.1 सेकंड में 2 पेज की पेशेवर पीडीएफ तैयार हो गई जो किसी भी फोन या कंप्यूटर पर बिल्कुल एक जैसी दिखेगी।"
      },
      "es": {
        "title": "Conversión de currículum vitae a PDF para solicitud de empleo",
        "scenario": "Un profesional actualiza su CV de 2 páginas en Word y necesita un formato PDF estandarizado para enviar a procesos de selección.",
        "calculation": "La herramienta extrae el texto, viñetas y fechas del archivo .docx y lo ensambla en hojas A4 mediante jsPDF.",
        "result": "Documento PDF de 2 páginas generado en 1,1 segundos con formato fijo e inalterable en cualquier dispositivo."
      },
      "ja": {
        "title": "採用応募用履歴書（職務経歴書）をWordからPDFへ変換する実例",
        "scenario": "求職者がWordで作成した2ページの職務経歴書を、レイアウト崩れを防いで企業ポータルに提出するためにPDF化したい場合。",
        "calculation": "mammoth.jsで見出しや箇条書きを解析し、jsPDFで標準A4（210×297mm）枠内に正確に再配置。",
        "result": "どの端末で開いてもレイアウトが一切崩れない高品位な2ページの応募用PDFが1.1秒で完成。"
      },
      "fr": {
        "title": "Conversion d’un CV Word en document PDF pour candidature",
        "scenario": "Un candidat a finalisé son CV de 2 pages sous Word et souhaite l’exporter en PDF figé pour répondre à des offres d’emploi.",
        "calculation": "L’outil extrait les puces, polices et dates du fichier .docx et génère un document A4 standardisé avec jsPDF.",
        "result": "Fichier PDF de 2 pages créé en 1,1 seconde garantissant une mise en page identique sur tous les écrans."
      },
      "de": {
        "title": "Umwandlung eines Lebenslaufs von Word in PDF für Bewerbungen",
        "scenario": "Ein Bewerber hat seinen 2-seitigen Lebenslauf in Word aktualisiert und benötigt für Portale ein fixes, unveränderliches PDF-Format.",
        "calculation": "Das Tool liest Textblöcke und Aufzählungen aus der .docx-Datei und ordnet sie auf zwei A4-Seiten mit jsPDF an.",
        "result": "Einwandfreies 2-seitiges PDF in 1,1 Sekunden mit einheitlicher Darstellung auf jedem Endgerät erzeugt."
      },
      "pt": {
        "title": "Conversão de Currículo Word para PDF Profissional",
        "scenario": "Um candidato concluiu o seu CV de 2 páginas no Word e precisa de um ficheiro PDF seguro para submissão em candidaturas.",
        "calculation": "A ferramenta organiza o texto e marcadores em páginas A4 padrão sem envio para servidores externos.",
        "result": "Documento PDF de 2 páginas produzido em 1,1 segundos com layout totalmente protegido."
      },
      "ko": {
        "title": "취업 포털 입사 지원용 이력서 Word to PDF 변환 실례",
        "scenario": "구직자가 Word로 작성한 2페이지 분량의 이력서 및 경력기술서를 양식 틀어짐 없이 완벽한 서식의 PDF로 제출하려 합니다.",
        "calculation": ".docx 파일에서 본문, 불릿 기호, 날짜 항목을 추출하여 표준 A4 규격에 맞춰 jsPDF로 조판합니다.",
        "result": "어떤 기기나 운영체제에서도 서식이 어긋나지 않는 2페이지 PDF가 1.1초 만에 완성."
      },
      "it": {
        "title": "Conversione di curriculum vitae da Word a PDF per candidature",
        "scenario": "Un candidato ha compilato il proprio CV di 2 pagine in Word e necessita di un file PDF a layout fisso per l’invio.",
        "calculation": "Il programma converte elenchi puntati e sezioni in pagine standard A4 tramite jsPDF.",
        "result": "Documento PDF di 2 pagine generato in 1,1 secondi con impaginazione stabile su ogni dispositivo."
      }
    },
    "faqs": [
      {
        "question": "Will Word formatting, headings, and bullet points carry over to the PDF?",
        "answer": "Yes. Paragraph structures, heading hierarchies, list numbering, and bold/italic styles are cleanly rendered into the generated PDF."
      },
      {
        "question": "Is it safe to convert private legal contracts and medical records?",
        "answer": "Yes, 100% safe. Processing takes place exclusively inside your browser. No files, text fragments, or documents are transmitted to our servers."
      },
      {
        "question": "What Word formats are accepted (.doc vs .docx)?",
        "answer": "The converter accepts standard modern Microsoft Word documents (.docx). Older legacy binary (.doc) files should be saved as .docx before uploading."
      },
      {
        "question": "Can I select between A4 and US Letter page sizes?",
        "answer": "Yes. You can select either standard international A4 (210 x 297 mm) or North American US Letter (8.5 x 11 inches) page formats."
      }
    ]
  },
  "delete-pages-from-pdf": {
    "name": "Delete Pages from PDF",
    "formulaTitle": {
      "en": "In-Memory Page Catalog Node Removal & Cross-Reference Truncation",
      "hi": "इन-मेमोरी पेज कैटलॉग नोड निष्कासन और संदर्भ संशोधन",
      "es": "Eliminación de Nodos de Catálogo y Truncado de Referencias en Cliente",
      "ja": "インメモリページカタログノード削除とxrefテーブル再構築技術",
      "fr": "Suppression de Nœuds de Pages en Mémoire et Recalcul des Références",
      "de": "Lokale Seitenkatalog-Knotenlöschung & Querverweis-Aktualisierung",
      "pt": "Remoção de Nós de Página na Memória e Ajuste de Referências no Navegador",
      "ko": "인메모리 페이지 카탈로그 노드 삭제 및 상호참조 트리 재구성 아키텍처",
      "it": "Rimozione Nodi del Catalogo Pagine in Memoria e Troncamento Riferimenti"
    },
    "formulaDescription": {
      "en": "The deletion utility loads the PDF binary via pdf-lib in browser memory, traverses the document Pages tree node, removes the target page dictionary references from the Kids array, updates the Count attribute, recalibrates object cross-reference indices, and serializes the slimmed document locally without uploading data to remote servers.",
      "hi": "यह टूल ब्राउज़र मेमोरी में pdf-lib के माध्यम से आपकी पीडीएफ फाइल को पढ़ता है। यह पेज ट्री में से आपके द्वारा चुने गए पेजों के संदर्भ को हटा देता है, पेज काउंट (Count) को अपडेट करता है और बिना किसी सर्वर का उपयोग किए केवल आवश्यक पेजों वाली नई पीडीएफ फाइल तुरंत तैयार करता है।",
      "es": "La herramienta carga el documento en la memoria local con pdf-lib, retira las referencias de las páginas seleccionadas de la matriz Kids del árbol de páginas, actualiza el contador total y recompila el PDF sin transferencias externas.",
      "ja": "本ツールはブラウザメモリ内でpdf-libを起動し、PDFのページツリーから削除対象のページ辞書参照を正確に除外。総ページ数カウントを更新し、相互参照テーブル（xref）を自動再構築して安全にダウンロード用ファイルを生成します。",
      "fr": "L’outil charge le document avec pdf-lib dans le navigateur, supprime les références des pages ciblées de la structure arborescente, met à jour le compteur global de pages et enregistre le document allégé en local.",
      "de": "Das Tool öffnet das Dokument im Speicher, entfernt die Verweise der markierten Seiten aus dem Seitenbaum via pdf-lib, aktualisiert den Zähler und gibt die bereinigte PDF-Datei ohne Serverzugriff aus.",
      "pt": "O utilitário carrega o documento na memória com pdf-lib, remove as referências das páginas marcadas para exclusão, atualiza o total de folhas e gera o PDF final com total privacidade.",
      "ko": "본 삭제 도구는 pdf-lib를 통해 페이지 트리를 탐색하고 삭제 대상 페이지의 참조 포인터를 안전하게 분리한 뒤, 총 페이지 수(Count)와 상호참조 인덱스를 갱신하여 가벼워진 PDF를 출력합니다.",
      "it": "Lo strumento apre il documento nella memoria locale con pdf-lib, cancella i riferimenti delle pagine selezionate dall’albero del catalogo e salva il nuovo file senza caricare dati su server esterni."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your PDF document into the page management area or select it from storage."
        },
        {
          "stepNumber": 2,
          "title": "Select Pages to Remove",
          "instruction": "Click individual page thumbnails to mark them for deletion, or enter page numbers (e.g., \"1, 4, 7-9\")."
        },
        {
          "stepNumber": 3,
          "title": "Confirm Deletion",
          "instruction": "Click Delete Pages to prune marked nodes from the document tree in local memory."
        },
        {
          "stepNumber": 4,
          "title": "Download Trimmed PDF",
          "instruction": "Save the finalized document with unwanted pages completely removed."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल अपलोड करें",
          "instruction": "अपनी पीडीएफ फाइल को पेज प्रबंधन बॉक्स में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "हटाने वाले पेज चुनें",
          "instruction": "थंबनेल पर क्लिक करके उन पेजों को चुनें जिन्हें हटाना है या पेज नंबर (उदा. \"1, 4, 7\") टाइप करें।"
        },
        {
          "stepNumber": 3,
          "title": "हटाने की पुष्टि करें",
          "instruction": "डिलीट पेजेस पर क्लिक करें और ब्राउज़र में गैर-जरूरी पेजों को निकाल दें।"
        },
        {
          "stepNumber": 4,
          "title": "संशोधित पीडीएफ डाउनलोड करें",
          "instruction": "अनावश्यक पेजों से मुक्त साफ-सुथरी पीडीएफ फाइल को सुरक्षित सेव करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir archivo PDF",
          "instruction": "Arrastre el documento que desea limpiar al área de miniaturas."
        },
        {
          "stepNumber": 2,
          "title": "Marcar páginas a eliminar",
          "instruction": "Haga clic en las miniaturas que no necesite o introduzca números de página (ej. \"2, 5\")."
        },
        {
          "stepNumber": 3,
          "title": "Confirmar eliminación",
          "instruction": "Haga clic en Eliminar páginas para purgar los nodos en la memoria local."
        },
        {
          "stepNumber": 4,
          "title": "Descargar PDF resultante",
          "instruction": "Guarde el archivo limpio sin las páginas descartadas."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルをアップロード",
          "instruction": "ページを削除したいPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "削除したいページを選択",
          "instruction": "サムネイルをクリックして削除対象に指定するか、ページ番号（例: 2, 5, 8）を入力します。"
        },
        {
          "stepNumber": 3,
          "title": "削除を実行",
          "instruction": "「ページを削除」をクリックし、ブラウザ内でページツリーのノード切り離しを行います。"
        },
        {
          "stepNumber": 4,
          "title": "調整済みPDFを保存",
          "instruction": "不要なページが完全に除去されたPDFファイルをダウンロードします。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Importer le document PDF",
          "instruction": "Chargez votre fichier dans la grille de gestion des pages."
        },
        {
          "stepNumber": 2,
          "title": "Cocher les pages à supprimer",
          "instruction": "Cliquez sur les vignettes inutiles ou saisissez les numéros de page (ex. 2, 6-8)."
        },
        {
          "stepNumber": 3,
          "title": "Valider la suppression",
          "instruction": "Cliquez sur Supprimer les pages pour retirer les feuilles en mémoire locale."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le PDF allégé",
          "instruction": "Enregistrez le document définitif sans les pages superflues."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Datei hochladen",
          "instruction": "Ziehen Sie das Dokument in die Seitenansicht oder wählen Sie es aus."
        },
        {
          "stepNumber": 2,
          "title": "Zu löschende Seiten markieren",
          "instruction": "Klicken Sie auf unerwünschte Vorschaubilder oder geben Sie Seitenzahlen ein (z. B. 2, 5)."
        },
        {
          "stepNumber": 3,
          "title": "Löschung bestätigen",
          "instruction": "Klicken Sie auf Seiten löschen, um die Seitenstrukturen lokal zu entfernen."
        },
        {
          "stepNumber": 4,
          "title": "Bereinigte PDF speichern",
          "instruction": "Laden Sie das überarbeitete Dokument ohne die entfernten Seiten herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar ficheiro PDF",
          "instruction": "Adicione o documento na área de pré-visualização de páginas."
        },
        {
          "stepNumber": 2,
          "title": "Marcar páginas para remover",
          "instruction": "Clique nas miniaturas que deseja eliminar ou digite os números (ex: 2, 5)."
        },
        {
          "stepNumber": 3,
          "title": "Confirmar exclusão",
          "instruction": "Clique em Eliminar páginas para processar a remoção no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF limpo",
          "instruction": "Guarde o ficheiro sem as folhas indesejadas no seu dispositivo."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 업로드",
          "instruction": "페이지를 제거할 PDF 문서를 미리보기 영역에 끌어옵니다."
        },
        {
          "stepNumber": 2,
          "title": "삭제할 페이지 선택",
          "instruction": "제거할 썸네일을 직접 클릭하거나 페이지 번호(예: 2, 5, 8)를 입력합니다."
        },
        {
          "stepNumber": 3,
          "title": "삭제 실행",
          "instruction": "페이지 삭제 버튼을 눌러 브라우저 로컬에서 대상 페이지를 안전하게 분리합니다."
        },
        {
          "stepNumber": 4,
          "title": "정리된 PDF 다운로드",
          "instruction": "불필요한 페이지가 제거된 깔끔한 PDF 문서를 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica file PDF",
          "instruction": "Trascina il documento nell’area di anteprima delle pagine."
        },
        {
          "stepNumber": 2,
          "title": "Seleziona pagine da eliminare",
          "instruction": "Fai clic sulle miniature da scartare o digita i numeri di foglio (es. 2, 4-6)."
        },
        {
          "stepNumber": 3,
          "title": "Conferma eliminazione",
          "instruction": "Clicca su Elimina pagine per rimuovere i fogli nella memoria locale."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF ripulito",
          "instruction": "Salva il documento definitivo privo delle pagine indesiderate."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Purging Blank and Duplicate Pages from a 20-Page Contract Scan",
        "scenario": "A legal assistant scanned a 20-page real estate deed, resulting in blank separator sheets at page 7 and page 14 that must be purged before client signature.",
        "calculation": "The tool clones all pages except index 6 and index 13, updates the page catalog count from 20 to 18, and serializes the new PDF.",
        "result": "An 18-page finalized PDF created in 0.6 seconds with zero trace of the blank pages and intact legal text formatting."
      },
      "hi": {
        "title": "20 पेजों के अनुबंध से खाली और अनावश्यक पेजों को हटाना",
        "scenario": "एक कानूनी सहायक ने 20 पेज का दस्तावेज स्कैन किया जिसमें पेज 7 और 14 पर खाली शीट आ गईं जिन्हें हस्ताक्षर से पहले हटाना है।",
        "calculation": "टूल ने पेज 7 और 14 को छोड़कर बाकी 18 पेजों को सुरक्षित रखा, पेज काउंट को 18 किया और नई फाइल बनाई।",
        "result": "मात्र 0.6 सेकंड में 18 पेजों का सही और पेशेवर दस्तावेज तैयार हो गया जिसमें मूल टेक्स्ट बिल्कुल सुरक्षित रहा।"
      },
      "es": {
        "title": "Eliminación de hojas en blanco en escritura notarial",
        "scenario": "Un asistente legal escanea una escritura de 20 páginas con hojas en blanco accidentales en las páginas 7 y 14.",
        "calculation": "La herramienta omite las páginas 7 y 14, ajusta el contador a 18 y reconstruye el índice del documento.",
        "result": "Documento final de 18 páginas generado en 0,6 segundos manteniendo íntegra la validez del texto."
      },
      "ja": {
        "title": "契約書スキャン時の白紙ページ（空白紙）削除実例",
        "scenario": "20ページの不動産契約書をスキャンした際、7ページ目と14ページ目に混入した余分な白紙を綺麗に取り除きたい場合。",
        "calculation": "7ページ目と14ページ目のノードのみを除外し、総ページ数を20から18へ更新して再出力。",
        "result": "文字品質を損なうことなく、わずか0.6秒で不要ページが除去された18ページの完成契約書を出力。"
      },
      "fr": {
        "title": "Suppression de pages blanches dans un contrat numérisé",
        "scenario": "Un clerc de notaire numérise un acte de 20 pages contenant deux pages blanches accidentelles aux positions 7 et 14.",
        "calculation": "L’outil extrait les 18 pages utiles, recalcule les index et supprime définitivement les deux feuilles vides.",
        "result": "Document de 18 pages finalisé en 0,6 seconde en toute confidentialité."
      },
      "de": {
        "title": "Entfernung von Leerseiten aus einem 20-seitigen Vertrag",
        "scenario": "Ein Notariatsmitarbeiter scannt einen 20-seitigen Vertrag und muss versehentliche Leerseiten auf Seite 7 und 14 entfernen.",
        "calculation": "Das Tool schließt die Seiten 7 und 14 aus dem Seitenbaum aus und passt die Seitenzählung auf 18 an.",
        "result": "Bereinigtes 18-seitiges Vertragsdokument innerhalb von 0,6 Sekunden lokal erzeugt."
      },
      "pt": {
        "title": "Eliminação de Folhas em Branco num Contrato de 20 Páginas",
        "scenario": "Um assistente digitalizou uma escritura de 20 páginas com folhas em branco indesejadas nas páginas 7 e 14.",
        "calculation": "O utilitário exclui os índices 6 e 13 mantendo a integridade das restantes 18 páginas.",
        "result": "Documento de 18 páginas finalizado em 0,6 segundos com total conformidade."
      },
      "ko": {
        "title": "20페이지 계약서 스캔본에서 섞여 들어간 빈 백지 페이지 제거",
        "scenario": "법률 사무소에서 20페이지 계약서를 스캔하는 도중 7페이지와 14페이지에 잘못 들어간 백지를 깔끔하게 삭제하려 합니다.",
        "calculation": "해당 2개 페이지만 건너뛰고 18개 페이지로 객체 트리를 재구성하여 즉시 내보냅니다.",
        "result": "법률 문서 원본 품질 그대로 0.6초 만에 18페이지 분량의 정돈된 PDF 완성."
      },
      "it": {
        "title": "Eliminazione di pagine bianche da contratto scansionato",
        "scenario": "Un assistente notarile ha acquisito un atto da 20 pagine con due fogli bianchi involontari alle pagine 7 e 14.",
        "calculation": "Il software esclude i due fogli vuoti, aggiorna il conteggio totale a 18 e salva il file ripulito.",
        "result": "Documento di 18 pagine pronto all’uso generato in soli 0,6 secondi senza upload esterni."
      }
    },
    "faqs": [
      {
        "question": "Does deleting pages recompress or damage remaining pages?",
        "answer": "No. The remaining pages are copied verbatim as vector streams. Text sharpness, vector diagrams, and high-resolution images are 100% preserved."
      },
      {
        "question": "Can I delete multiple non-consecutive pages at once?",
        "answer": "Yes. You can click any number of thumbnails or type a comma-separated list of page numbers to delete all of them simultaneously."
      },
      {
        "question": "Are deleted pages permanently erased from the file?",
        "answer": "Yes. The generated downloadable PDF completely omits the pruned page dictionaries, ensuring private content is removed from the file binary."
      },
      {
        "question": "Are my confidential documents processed on a remote server?",
        "answer": "No. Page removal runs 100% inside your web browser using JavaScript. No files are uploaded to any external server."
      }
    ]
  },
  "reorder-pdf-pages": {
    "name": "Reorder PDF Pages",
    "formulaTitle": {
      "en": "In-Memory Page Catalog Index Permutation & Array Reordering",
      "hi": "इन-मेमोरी पेज कैटलॉग इंडेक्स पुनर्व्यवस्था और सरणी क्रमपरिवर्तन",
      "es": "Permutación de Índices de Catálogo y Reordenación de Páginas en Cliente",
      "ja": "インメモリページカタログインデックス順列再配置技術",
      "fr": "Permutation d’Index du Catalogue de Pages et Réorganisation en Mémoire",
      "de": "Lokale Seitenkatalog-Indexpermutation & Neuanordnung",
      "pt": "Permutação de Índices do Catálogo de Páginas no Navegador",
      "ko": "인메모리 페이지 카탈로그 인덱스 치환 및 순서 재배열 아키텍처",
      "it": "Permutazione Indici del Catalogo Pagine e Riordino in Memoria"
    },
    "formulaDescription": {
      "en": "The page reorganizer initializes the PDF binary via pdf-lib in browser memory, reads individual page tree nodes into an addressable array, permutes the node positions to match your requested user sequence, updates internal parent references, and writes the reordered document without altering underlying vector streams or font programs.",
      "hi": "यह टूल ब्राउज़र मेमोरी में pdf-lib के माध्यम से आपकी पीडीएफ के सभी पेजों को एक सरणी (array) में लोड करता है। यह आपके द्वारा चुने गए नए क्रम के अनुसार पेजों की स्थिति को पुनर्व्यवस्थित करता है और बिना मूल सामग्री या फॉन्ट को बदले तुरंत सही क्रम वाली पीडीएफ फाइल तैयार करता है।",
      "es": "La herramienta reorganiza las referencias de las páginas en la memoria local mediante pdf-lib según la nueva secuencia elegida, preservando los flujos de contenido y exportando el PDF ordenado sin tocar servidores.",
      "ja": "本ツールはブラウザメモリ内でpdf-libを実行し、全ページのノード参照を配列として保持。ユーザーがドラッグ＆ドロップで指定した新しい順序通りにポインタを再構成し、画質劣化なしで再整列したPDFを出力します。",
      "fr": "L’outil charge les références de pages dans un tableau en mémoire via pdf-lib, les réordonne selon la séquence définie par l’utilisateur et enregistre le document réorganisé sans aucun téléversement.",
      "de": "Das Tool liest die Seitenobjekte mit pdf-lib in ein Array ein, ordnet die Verweise entsprechend der gewünschten Abfolge neu an und erzeugt ein korrekt sortiertes PDF-Dokument vollständig lokal.",
      "pt": "A ferramenta organiza as referências de página na memória local via pdf-lib, reorganizando a ordem de exibição de acordo com as preferências do utilizador com total privacidade.",
      "ko": "본 순서 재배열 도구는 pdf-lib를 사용하여 모든 페이지 노드를 배열에 담고, 사용자가 지정한 새 순서에 맞춰 인덱스를 치환한 뒤 원본 화질을 유지하며 새로운 PDF로 저장합니다.",
      "it": "Il programma indicizza gli oggetti pagina in memoria tramite pdf-lib, ne riordina la sequenza in base alle preferenze dell’utente e salva il documento finale nel pieno rispetto della riservatezza."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload PDF Document",
          "instruction": "Drag and drop your PDF into the interactive page organizer workbench."
        },
        {
          "stepNumber": 2,
          "title": "Drag and Drop to Reorder",
          "instruction": "Rearrange page thumbnail cards into your desired reading or presentation sequence."
        },
        {
          "stepNumber": 3,
          "title": "Apply New Page Order",
          "instruction": "Click Reorder Pages to reconstruct the internal page catalog in local memory."
        },
        {
          "stepNumber": 4,
          "title": "Download Reorganized PDF",
          "instruction": "Save your freshly sequenced PDF document directly to your device."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "पीडीएफ फाइल अपलोड करें",
          "instruction": "अपनी पीडीएफ फाइल को पेज आयोजक बॉक्स में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "ड्रैग करके क्रम बदलें",
          "instruction": "पेज थंबनेल को खींचकर अपनी पसंद के सही पढ़ने वाले क्रम में लगाएं।"
        },
        {
          "stepNumber": 3,
          "title": "नया क्रम लागू करें",
          "instruction": "रीऑर्डर पेजेस पर क्लिक करें और ब्राउज़र में पेजों का नया क्रम सुरक्षित करें।"
        },
        {
          "stepNumber": 4,
          "title": "पुनर्व्यवस्थित पीडीएफ डाउनलोड करें",
          "instruction": "सही क्रम में जमी हुई नई पीडीएफ फाइल को अपने डिवाइस पर डाउनलोड करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir archivo PDF",
          "instruction": "Arrastre el documento al organizador interactivo de páginas."
        },
        {
          "stepNumber": 2,
          "title": "Arrastrar para reordenar",
          "instruction": "Mueva las miniaturas a las posiciones correspondientes al orden deseado."
        },
        {
          "stepNumber": 3,
          "title": "Aplicar nueva secuencia",
          "instruction": "Haga clic en Reordenar páginas para reconstruir el catálogo en memoria."
        },
        {
          "stepNumber": 4,
          "title": "Descargar PDF ordenado",
          "instruction": "Guarde su documento con las páginas en el orden exacto."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "PDFファイルをアップロード",
          "instruction": "ページ順を変更したいPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "ドラッグ＆ドロップで並べ替え",
          "instruction": "サムネイルカードを直感的にドラッグして、理想の閲覧順序に並べ替えます。"
        },
        {
          "stepNumber": 3,
          "title": "新しい順序を適用",
          "instruction": "「ページを並べ替え」をクリックして内部カタログのポインタ配列を更新します。"
        },
        {
          "stepNumber": 4,
          "title": "並べ替え済みPDFを保存",
          "instruction": "正しく順序が整理されたPDFファイルをローカルにダウンロードします。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Importer le document PDF",
          "instruction": "Déposez votre document dans l’organiseur visuel de pages."
        },
        {
          "stepNumber": 2,
          "title": "Glisser-déposer pour ordonner",
          "instruction": "Déplacez les vignettes pour définir l’ordre de lecture idéal."
        },
        {
          "stepNumber": 3,
          "title": "Appliquer le réordonnancement",
          "instruction": "Cliquez sur Réorganiser pour mettre à jour l’arbre des pages en mémoire."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le PDF réorganisé",
          "instruction": "Enregistrez le document final avec les pages dans le bon ordre."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "PDF-Dokument hochladen",
          "instruction": "Ziehen Sie die PDF in den visuellen Seitenmanager."
        },
        {
          "stepNumber": 2,
          "title": "Per Drag & Drop sortieren",
          "instruction": "Verschieben Sie die Seitenvorschauen in die gewünschte Lesereihenfolge."
        },
        {
          "stepNumber": 3,
          "title": "Neue Abfolge übernehmen",
          "instruction": "Klicken Sie auf Seiten sortieren, um die interne Struktur zu aktualisieren."
        },
        {
          "stepNumber": 4,
          "title": "Neu sortierte PDF speichern",
          "instruction": "Laden Sie das geordnete Dokument direkt auf Ihr Gerät herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar ficheiro PDF",
          "instruction": "Adicione o documento na área visual de organização de páginas."
        },
        {
          "stepNumber": 2,
          "title": "Arrastar e ordenar",
          "instruction": "Mova as miniaturas até que fiquem na sequência pretendida."
        },
        {
          "stepNumber": 3,
          "title": "Aplicar nova ordem",
          "instruction": "Clique em Reordenar páginas para atualizar os apontadores no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF reorganizado",
          "instruction": "Transfira o arquivo com as páginas na ordem correta."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "PDF 파일 업로드",
          "instruction": "페이지 순서를 바꿀 PDF 문서를 작업 창에 끌어옵니다."
        },
        {
          "stepNumber": 2,
          "title": "드래그하여 순서 재배치",
          "instruction": "페이지 썸네일을 마우스나 터치로 드래그하여 원하는 순서로 정렬합니다."
        },
        {
          "stepNumber": 3,
          "title": "새 순서 적용",
          "instruction": "페이지 재정렬 버튼을 눌러 메모리 상의 페이지 배열을 갱신합니다."
        },
        {
          "stepNumber": 4,
          "title": "정렬된 PDF 저장",
          "instruction": "순서가 완벽히 정리된 새 PDF 문서를 기기에 다운로드합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica documento PDF",
          "instruction": "Trascina il file nell’organizzatore visivo delle pagine."
        },
        {
          "stepNumber": 2,
          "title": "Trascina per ordinare",
          "instruction": "Sposta le anteprime fino a ottenere la successione desiderata."
        },
        {
          "stepNumber": 3,
          "title": "Applica nuovo ordine",
          "instruction": "Clicca su Riordina pagine per aggiornare l’albero del catalogo in locale."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF riordinato",
          "instruction": "Salva il documento definitivo con la corretta sequenza di lettura."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Fixing Inverted Page Sequence in a Collated Document Scan",
        "scenario": "A user scanned a 10-page legal brief that was accidentally fed backwards into the scanner (pages 10 down to 1).",
        "calculation": "The tool imports the 10 pages, reverses the index array [9, 8, 7, ... 0] back to [0, 1, 2, ... 9], and compiles the PDF.",
        "result": "A corrected 10-page document restored to proper chronological order in 0.5 seconds without quality loss."
      },
      "hi": {
        "title": "उल्टे स्कैन हुए कानूनी दस्तावेज के पेजों को सीधे क्रम में लगाना",
        "scenario": "एक उपयोगकर्ता ने 10 पेज का कानूनी दस्तावेज स्कैन किया जो स्कैनर में उल्टा चला गया और पेज 10 से 1 के क्रम में सेव हो गया।",
        "calculation": "टूल ने सभी 10 पेजों को पढ़ा, उनके क्रम को उलटकर [1, 2, 3... 10] किया और फाइल सेव की।",
        "result": "मात्र 0.5 सेकंड में बिना किसी क्वालिटी नुकसान के सभी 10 पेज सही सीधे क्रम में व्यवस्थित हो गए।"
      },
      "es": {
        "title": "Inversión de páginas en escaneo alimentado al revés",
        "scenario": "Un usuario escanea un documento legal de 10 páginas que quedó registrado en orden inverso (de la 10 a la 1).",
        "calculation": "La herramienta invierte la secuencia de índices de página y recompila la estructura del PDF.",
        "result": "Documento de 10 páginas restablecido a su orden cronológico correcto en 0,5 segundos."
      },
      "ja": {
        "title": "スキャナー給紙ミスで逆順（10P〜1P）になった文書の修復実例",
        "scenario": "全10ページの提出書類が、スキャナーの裏表取り込みミスで逆順（10ページから1ページへ）に保存されてしまった場合。",
        "calculation": "インデックス配列をワンクリックで反転［0, 1, 2... 9］し、ドキュメントツリーを再保存。",
        "result": "画質の劣化なく、わずか0.5秒で正しい昇順（1〜10ページ）に完全復元されたPDFが完成。"
      },
      "fr": {
        "title": "Correction d’un document numérisé en ordre inverse",
        "scenario": "Un collaborateur a numérisé un dossier de 10 pages enregistré à l’envers (de la page 10 à la page 1).",
        "calculation": "L’outil inverse l’ordre des index de page et régénère le PDF sans retoucher aux éléments visuels.",
        "result": "Dossier de 10 pages remis dans l’ordre chronologique en 0,5 seconde en local."
      },
      "de": {
        "title": "Wiederherstellung der korrekten Reihenfolge bei Rückwärts-Scan",
        "scenario": "Ein 10-seitiger Schriftsatz wurde versehentlich rückwärts gescannt (von Seite 10 bis Seite 1).",
        "calculation": "Das Tool kehrt die Indexabfolge um und speichert das PDF in der richtigen chronologischen Folge.",
        "result": "Korrekt geordnetes 10-seitiges Dokument in 0,5 Sekunden ohne Datenverlust erzeugt."
      },
      "pt": {
        "title": "Correção de Sequência Invertida num Escaneamento",
        "scenario": "Um utilizador digitalizou um documento de 10 páginas que ficou na ordem contrária (da página 10 à 1).",
        "calculation": "A ferramenta inverte a matriz de páginas e regrava o arquivo na ordem natural.",
        "result": "Documento de 10 páginas restabelecido na sequência correta em 0,5 segundos com total nitidez."
      },
      "ko": {
        "title": "스캐너 역순 급지로 10페이지부터 1페이지까지 거꾸로 저장된 문서 복원",
        "scenario": "10페이지 분량의 문서를 스캔했는데 급지함에서 역방향으로 들어가 10페이지부터 1페이지 순서로 잘못 저장된 상황입니다.",
        "calculation": "페이지 배열 인덱스를 즉시 역순 정렬하여 올바른 1페이지부터 10페이지 순서로 재배열합니다.",
        "result": "화질 손상 없이 0.5초 만에 정상적인 순서로 정렬된 10페이지 PDF 문서 완성."
      },
      "it": {
        "title": "Ripristino della sequenza corretta in scansione inversa",
        "scenario": "Un utente ha scansionato un fascicolo da 10 pagine acquisito per sbaglio a ritroso (dalla 10 alla 1).",
        "calculation": "Il programma inverte la sequenza delle pagine e ricompila la struttura interna del PDF.",
        "result": "Fascicolo di 10 pagine ripristinato nel corretto ordine progressivo in 0,5 secondi in locale."
      }
    },
    "faqs": [
      {
        "question": "Does reordering pages alter the visual resolution or font sharpness?",
        "answer": "No. Reordering purely adjusts pointer positions in the document page tree. Underlying vector paths, fonts, and images are untouched and 100% lossless."
      },
      {
        "question": "Can I reorder very large PDF documents?",
        "answer": "Yes. Documents containing dozens of pages can be easily reordered. Because operations occur in browser memory, smooth operation is guaranteed."
      },
      {
        "question": "Are my confidential documents uploaded to any remote server?",
        "answer": "No. All reordering takes place locally on your machine using JavaScript. No document content is ever transmitted across the internet."
      },
      {
        "question": "Can I duplicate or delete pages while reordering?",
        "answer": "This tool focuses on sequencing. To remove pages, please use our dedicated Delete Pages from PDF tool."
      }
    ]
  },
  "pdf-to-grayscale": {
    "name": "PDF to Grayscale",
    "formulaTitle": {
      "en": "In-Browser Rec. 601 Luma Transform & Canvas Monochromatization Pipeline",
      "hi": "इन-ब्राउज़र Rec. 601 ल्यूमा ट्रांसफॉर्म और कैनवास मोनोक्रोम पाइपलाइन",
      "es": "Transformación de Luminancia Rec. 601 y Monocromatización Canvas en Cliente",
      "ja": "ブラウザ内Rec. 601輝度変換とCanvasモノクロ化パイプライン技術",
      "fr": "Transformation de Luminance Rec. 601 et Pipeline de Monochromatisation Canvas",
      "de": "Lokale Rec.-601-Luminanztransformation & Canvas-Monochromatisierung",
      "pt": "Transformação de Luminância Rec. 601 e Monocromatização Canvas no Navegador",
      "ko": "브라우저 내 Rec. 601 휘도 변환 및 Canvas 흑백 모노크롬 변환 구조",
      "it": "Trasformazione di Luminanza Rec. 601 e Monocromatizzazione Canvas nel Browser"
    },
    "formulaDescription": {
      "en": "The converter uses Mozilla PDF.js to render each PDF page into an HTML5 Canvas, computes standardized Rec. 601 grayscale luminance for every RGB pixel using Y = 0.299*R + 0.587*G + 0.114*B, sets R=G=B=Y across the ImageData buffer, and re-encapsulates the monochrome pages into a clean, ink-efficient PDF document via jsPDF in browser memory.",
      "hi": "यह टूल मोज़िला की PDF.js का उपयोग करके प्रत्येक पेज को HTML5 कैनवास पर रेंडर करता है। यह प्रत्येक पिक्सल के लिए Rec. 601 फॉर्मूला (Y = 0.299*R + 0.587*G + 0.114*B) लागू करके सभी रंगों को ग्रेस्केल (ब्लैक एंड व्हाइट) में बदलता है और jsPDF के माध्यम से बिना किसी सर्वर पर भेजे सीधे आपके डिवाइस पर नई मोनोक्रोम पीडीएफ तैयार करता है।",
      "es": "El conversor renderiza cada página en un lienzo HTML5 con PDF.js, aplica la fórmula de luminancia Rec. 601 (Y = 0,299*R + 0,587*G + 0,114*B) a cada píxel y recompone las páginas monocromáticas en un nuevo PDF mediante jsPDF.",
      "ja": "本変換器はMozilla PDF.jsを用いて各ページをHTML5 Canvas上に精密展開。各ピクセルに標準Rec. 601規格の輝度計算式（Y = 0.299R + 0.587G + 0.114B）を適用して完全なグレースケールに変換し、jsPDFでインク節約型PDFをローカル生成します。",
      "fr": "Le convertisseur restitue chaque page sur un Canvas HTML5 via PDF.js, applique la formule de luminance Rec. 601 (Y = 0,299*R + 0,587*G + 0,114*B) sur chaque pixel et assemble un PDF monochrome économique avec jsPDF.",
      "de": "Der Konverter zeichnet jede Seite mit PDF.js in ein HTML5-Canvas, berechnet für jeden Bildpunkt die Rec.-601-Graustufenluminanz (Y = 0,299*R + 0,587*G + 0,114*B) und erstellt mit jsPDF ein tintensparendes Monochrom-PDF.",
      "pt": "O conversor renderiza cada página num Canvas HTML5 com a PDF.js, calcula a luminância Rec. 601 (Y = 0,299*R + 0,587*G + 0,114*B) para cada pixel e monta um novo PDF monocromático via jsPDF com privacidade total.",
      "ko": "본 변환기는 Mozilla PDF.js를 통해 각 페이지를 HTML5 Canvas에 렌더링하고, Rec. 601 국제 표준 휘도 공식(Y = 0.299R + 0.587G + 0.114B)을 적용하여 모든 픽셀을 흑백 모노크롬으로 변환한 뒤 jsPDF로 잉크 절약형 PDF를 빌드합니다.",
      "it": "Il convertitore visualizza ogni pagina su Canvas HTML5 con PDF.js, applica la formula di luminanza Rec. 601 (Y = 0,299*R + 0,587*G + 0,114*B) a ciascun pixel e assembla un PDF in scala di grigi con jsPDF nel browser."
    },
    "steps": {
      "en": [
        {
          "stepNumber": 1,
          "title": "Upload Color PDF",
          "instruction": "Drag and drop your color PDF document into the grayscale converter."
        },
        {
          "stepNumber": 2,
          "title": "Select Output Resolution",
          "instruction": "Choose DPI settings: 150 DPI (balanced for email and archiving) or 300 DPI (high-fidelity for print)."
        },
        {
          "stepNumber": 3,
          "title": "Execute Grayscale Conversion",
          "instruction": "Click Convert to Grayscale to apply Rec. 601 pixel luminances across all pages."
        },
        {
          "stepNumber": 4,
          "title": "Download Monochrome PDF",
          "instruction": "Save the black-and-white PDF document directly to your computer or mobile device."
        }
      ],
      "hi": [
        {
          "stepNumber": 1,
          "title": "रंगीन पीडीएफ अपलोड करें",
          "instruction": "अपनी रंगीन पीडीएफ फाइल को ग्रेस्केल कनवर्टर बॉक्स में खींचें या चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "आउटपुट रेजोल्यूशन चुनें",
          "instruction": "DPI सेटिंग्स चुनें: 150 DPI (ईमेल और शेयरिंग के लिए) या 300 DPI (स्पष्ट प्रिंटिंग के लिए)।"
        },
        {
          "stepNumber": 3,
          "title": "ग्रेस्केल में बदलें",
          "instruction": "कन्वर्ट टू ग्रेस्केल पर क्लिक करें और ब्राउज़र में सभी रंगों को ब्लैक एंड व्हाइट में बदलें।"
        },
        {
          "stepNumber": 4,
          "title": "मोनोक्रोम पीडीएफ डाउनलोड करें",
          "instruction": "प्रिंटिंग इंक बचाने वाली ब्लैक एंड व्हाइट पीडीएफ फाइल सुरक्षित डाउनलोड करें।"
        }
      ],
      "es": [
        {
          "stepNumber": 1,
          "title": "Subir PDF a color",
          "instruction": "Arrastre el documento que desea transformar a blanco y negro."
        },
        {
          "stepNumber": 2,
          "title": "Elegir resolución",
          "instruction": "Seleccione 150 DPI (óptimo para correo) o 300 DPI (calidad de imprenta)."
        },
        {
          "stepNumber": 3,
          "title": "Convertir a escala de grises",
          "instruction": "Inicie la conversión para procesar los píxeles en el lienzo del navegador."
        },
        {
          "stepNumber": 4,
          "title": "Descargar PDF monocromo",
          "instruction": "Guarde el documento en blanco y negro optimizado para ahorrar tinta."
        }
      ],
      "ja": [
        {
          "stepNumber": 1,
          "title": "カラーPDFをアップロード",
          "instruction": "白黒に変換したいカラーPDFファイルをドラッグ＆ドロップまたは選択します。"
        },
        {
          "stepNumber": 2,
          "title": "出力解像度（DPI）を選択",
          "instruction": "150 DPI（標準・ファイル軽量化）または300 DPI（高精細・印刷用）を選択します。"
        },
        {
          "stepNumber": 3,
          "title": "グレースケール変換を実行",
          "instruction": "「グレースケールに変換」をクリックしてブラウザ内輝度変換を開始します。"
        },
        {
          "stepNumber": 4,
          "title": "白黒PDFをダウンロード",
          "instruction": "印刷インクを節約できるモノクロPDFファイルを保存します。"
        }
      ],
      "fr": [
        {
          "stepNumber": 1,
          "title": "Importer le PDF couleur",
          "instruction": "Sélectionnez le document que vous souhaitez passer en noir et blanc."
        },
        {
          "stepNumber": 2,
          "title": "Choisir la résolution",
          "instruction": "Optez pour 150 DPI (recommandé pour archivage) ou 300 DPI (qualité d’impression)."
        },
        {
          "stepNumber": 3,
          "title": "Convertir en niveaux de gris",
          "instruction": "Lancez le calcul de luminance sur le Canvas HTML5."
        },
        {
          "stepNumber": 4,
          "title": "Télécharger le PDF monochrome",
          "instruction": "Enregistrez le document sans couleur prêt pour l’impression économique."
        }
      ],
      "de": [
        {
          "stepNumber": 1,
          "title": "Farb-PDF hochladen",
          "instruction": "Ziehen Sie das farbige PDF-Dokument in den Konverterbereich."
        },
        {
          "stepNumber": 2,
          "title": "Auflösung festlegen",
          "instruction": "Wählen Sie 150 DPI (für Bildschirm/Mail) oder 300 DPI (für den Druck)."
        },
        {
          "stepNumber": 3,
          "title": "In Graustufen umwandeln",
          "instruction": "Wandeln Sie alle RGB-Pixel im Browser-Canvas in Graustufen um."
        },
        {
          "stepNumber": 4,
          "title": "Monochrom-PDF speichern",
          "instruction": "Laden Sie das toner- und tintensparende Dokument herunter."
        }
      ],
      "pt": [
        {
          "stepNumber": 1,
          "title": "Carregar PDF a cores",
          "instruction": "Adicione o documento que deseja converter para preto e branco."
        },
        {
          "stepNumber": 2,
          "title": "Definir resolução",
          "instruction": "Escolha 150 DPI (ideal para e-mail) ou 300 DPI (alta qualidade de impressão)."
        },
        {
          "stepNumber": 3,
          "title": "Converter para tons de cinzento",
          "instruction": "Inicie a transformação de luminância diretamente no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Baixar PDF monocromático",
          "instruction": "Guarde o ficheiro pronto para poupar tinta de impressão."
        }
      ],
      "ko": [
        {
          "stepNumber": 1,
          "title": "컬러 PDF 업로드",
          "instruction": "흑백으로 변환할 컬러 PDF 문서를 작업 창에 끌어옵니다."
        },
        {
          "stepNumber": 2,
          "title": "출력 해상도(DPI) 선택",
          "instruction": "150 DPI(이메일 및 보관용) 또는 300 DPI(고품질 인쇄용)를 선택합니다."
        },
        {
          "stepNumber": 3,
          "title": "흑백 그레이스케일 변환",
          "instruction": "그레이스케일 변환 버튼을 눌러 브라우저 Canvas에서 픽셀 변환을 시작합니다."
        },
        {
          "stepNumber": 4,
          "title": "흑백 문서 다운로드",
          "instruction": "프린터 잉크와 토너를 대폭 절약할 수 있는 모노크롬 PDF를 저장합니다."
        }
      ],
      "it": [
        {
          "stepNumber": 1,
          "title": "Carica PDF a colori",
          "instruction": "Trascina il documento che desideri convertire in bianco e nero."
        },
        {
          "stepNumber": 2,
          "title": "Seleziona risoluzione",
          "instruction": "Scegli 150 DPI (ottimale per invio) o 300 DPI (qualità di stampa)."
        },
        {
          "stepNumber": 3,
          "title": "Converti in scala di grigi",
          "instruction": "Avvia l’elaborazione dei pixel su Canvas HTML5 nel browser."
        },
        {
          "stepNumber": 4,
          "title": "Scarica PDF monocromatico",
          "instruction": "Salva il documento in bianco e nero perfetto per risparmiare inchiostro."
        }
      ]
    },
    "workedExample": {
      "en": {
        "title": "Preparing a 12-Page Color Brief for Black-and-White Legal Filing",
        "scenario": "A law firm needs to file a 12-page legal brief with a judicial court system that strictly mandates monochrome submissions and rejects color graphics.",
        "calculation": "The tool renders the 12 pages onto Canvas elements at 300 DPI, applies Rec. 601 grayscale luminance conversion to strip all chroma channels, and creates a clean monochrome PDF.",
        "result": "A 100% court-compliant 12-page monochrome PDF generated in 2.4 seconds with high-contrast text and zero server transmission."
      },
      "hi": {
        "title": "अदालती रिकॉर्ड के लिए 12 पेजों की रंगीन फाइल को ब्लैक एंड व्हाइट में बदलना",
        "scenario": "एक कानूनी फर्म को कोर्ट में 12 पेजों की फाइल जमा करनी है जहां केवल ब्लैक एंड व्हाइट दस्तावेज ही स्वीकार किए जाते हैं।",
        "calculation": "टूल ने सभी 12 पेजों को 300 DPI पर रेंडर किया, Rec. 601 फॉर्मूला से सभी रंगों को साफ ग्रेस्केल में बदला और नई पीडीएफ बनाई।",
        "result": "मात्र 2.4 सेकंड में कोर्ट के नियमों के 100% अनुकूल 12 पेजों की ब्लैक एंड व्हाइट पीडीएफ तैयार हो गई।"
      },
      "es": {
        "title": "Adaptación de escrito judicial a normativa de presentación en blanco y negro",
        "scenario": "Un despacho de abogados debe presentar un escrito de 12 páginas en un juzgado que exige exclusivamente documentos monocromáticos.",
        "calculation": "La herramienta procesa las 12 páginas a 300 DPI, elimina la información cromática mediante la norma Rec. 601 y crea el nuevo PDF.",
        "result": "Documento monocromo de 12 páginas generado en 2,4 segundos 100% conforme a las directrices judiciales."
      },
      "ja": {
        "title": "裁判所提出用に12ページのカラー資料を完全モノクロ化する実例",
        "scenario": "弁護士事務所が、裁判所の電子申告システムで規定されている「白黒提出基準」に適合させるため、12ページの証拠資料をモノクロ化したい場合。",
        "calculation": "全12ページを300DPIでCanvas上に描画し、Rec. 601規格で全ピクセルを忠実な輝度グレースケールに変換。",
        "result": "提出規定に完全適合した高コントラストの12ページ白黒PDFが2.4秒で完成。"
      },
      "fr": {
        "title": "Mise en conformité d’un mémoire juridique avec les normes noir et blanc",
        "scenario": "Un cabinet d’avocats doit déposer un dossier de 12 pages auprès d’une juridiction qui n’accepte que les pièces monochromes.",
        "calculation": "L’outil traite les 12 pages à 300 DPI, élimine les composantes de couleur via la formule Rec. 601 et génère le PDF.",
        "result": "Document conforme de 12 pages obtenu en 2,4 secondes avec des textes et bordures parfaitement lisibles."
      },
      "de": {
        "title": "Anpassung eines 12-seitigen Dokuments an gerichtliche Monochrom-Vorgaben",
        "scenario": "Eine Kanzlei muss einen 12-seitigen Schriftsatz bei einem Gericht einreichen, das ausschließlich Schwarz-Weiß-Vorlagen akzeptiert.",
        "calculation": "Das Tool wandelt alle 12 Seiten mit 300 DPI über die Rec.-601-Formel in Graustufen um und erzeugt die finale PDF.",
        "result": "Gerichtskonformes 12-seitiges Schwarz-Weiß-Dokument innerhalb von 2,4 Sekunden lokal erzeugt."
      },
      "pt": {
        "title": "Adequação de Peça Jurídica a Padrão Monocromático",
        "scenario": "Um escritório de advocacia precisa submeter uma petição de 12 páginas a um tribunal que exige estritamente arquivos a preto e branco.",
        "calculation": "A ferramenta converte as 12 páginas a 300 DPI para escala de cinzentos Rec. 601 e gera o novo PDF.",
        "result": "Ficheiro de 12 páginas 100% em conformidade gerado em 2,4 segundos com privacidade garantida."
      },
      "ko": {
        "title": "법원 전자 소송 제출 규격에 맞춘 12페이지 컬러 증거 자료 흑백 변환 실례",
        "scenario": "법률 사무소에서 흑백 문서 제출만 허용하는 법원 전자소송 포털 규격에 맞춰 12페이지 컬러 서증을 변환하려 합니다.",
        "calculation": "12개 페이지를 300 DPI로 렌더링하고 Rec. 601 공식으로 채도를 제거하여 흑백 PDF로 패키징합니다.",
        "result": "법원 제출 규격을 완벽히 충족하는 선명한 12페이지 흑백 PDF가 2.4초 만에 생성 완료."
      },
      "it": {
        "title": "Adattamento di fascicolo legale agli standard monocromatici del tribunale",
        "scenario": "Uno studio legale deve depositare una memoria di 12 pagine presso una corte che accetta solo atti in bianco e nero.",
        "calculation": "Il programma converte i fogli a 300 DPI in scala di grigi Rec. 601 e compila il PDF monocromatico finale.",
        "result": "Documento conforme di 12 pagine ottenuto in 2,4 secondi con caratteri nitidi e massimo contrasto."
      }
    },
    "faqs": [
      {
        "question": "Why convert color PDFs to grayscale?",
        "answer": "Grayscale documents save expensive colored printer ink or toner, create clean contrast for photocopying, reduce storage footprints, and satisfy official court or government monochrome submission standards."
      },
      {
        "question": "Is my document uploaded to an external server?",
        "answer": "No. The conversion occurs entirely inside your local browser memory using PDF.js and jsPDF. Your sensitive documents and personal information never leave your machine."
      },
      {
        "question": "Can I choose the output image quality and DPI?",
        "answer": "Yes. You can choose between 150 DPI (standard for digital storage and email) and 300 DPI (high-resolution print-ready output)."
      },
      {
        "question": "Does grayscale conversion affect vector text searchability?",
        "answer": "Because the pages are re-rendered at chosen DPI onto Canvas to guarantee 100% color elimination across all embedded raster graphics, fonts, and borders, the output is formatted as high-contrast print-ready pages."
      }
    ]
  }
};
