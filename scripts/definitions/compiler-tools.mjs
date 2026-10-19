/**
 * Compiler Tools Definitions (8 Tools x 9 Locales)
 * python-compiler, javascript-compiler, html-editor, cpp-compiler,
 * java-compiler, csharp-compiler, php-compiler, sql-editor
 */

export const compilerToolsDefinitions = {
  "python-compiler": {
    "en": {
      "formulaTitle": "Pyodide WebAssembly In-Browser Python 3 Runtime Architecture",
      "formulaDescription": "The compiler runs true Python 3 code directly within your client browser using Pyodide (CPython compiled to WebAssembly via Emscripten). Standard input/output streams are mapped to visual terminal widgets, executing scripts locally without transferring code to remote servers.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Write or Select Code",
          "instruction": "Type your Python 3 code in the editor or select a starter template (Hello World, Math, Fibonacci, Sorting)."
        },
        {
          "stepNumber": 2,
          "title": "Provide Optional Stdin",
          "instruction": "Enter input values in the Stdin box if your script uses input() calls."
        },
        {
          "stepNumber": 3,
          "title": "Run Code",
          "instruction": "Click Run Code or press Ctrl+Enter to initialize the Pyodide WebAssembly runtime and execute instructions."
        },
        {
          "stepNumber": 4,
          "title": "Inspect Output & Download",
          "instruction": "Review the terminal stdout/stderr stream and click Download to save your script as main.py."
        }
      ],
      "workedExample": {
        "title": "Fibonacci Calculation & List Comprehension Example",
        "scenario": "Computing the first 10 Fibonacci numbers and filtering even terms in Python 3.",
        "calculation": "def fib(n): return [0, 1] if n<=2 else ... fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]. Even filter: [x for x in seq if x % 2 == 0].",
        "result": "Terminal Output: Fibonacci sequence computed in 12ms inside browser WebAssembly memory."
      },
      "faqs": [
        {
          "question": "Does code execution require an external backend server?",
          "answer": "No. Python executes entirely inside your browser using the Pyodide WebAssembly runtime. Your code and inputs never leave your device."
        },
        {
          "question": "Can I access local files or network sockets?",
          "answer": "Due to standard browser WebAssembly security sandboxing, raw POSIX sockets and native OS file access are blocked. In-memory virtual file systems (MEMFS) are supported."
        },
        {
          "question": "Which Python standard library modules are supported?",
          "answer": "Core modules including math, json, re, statistics, itertools, datetime, collections, and random are fully supported."
        },
        {
          "question": "Why does the initial run take 2 to 3 seconds?",
          "answer": "On your first execution, the browser downloads and initializes the Pyodide WebAssembly binaries (~12MB). Subsequent executions run instantly from local cache."
        }
      ]
    },
    "hi": {
      "formulaTitle": "Pyodide वेबअसेंबली इन-ब्राउज़र पायथन 3 रनटाइम संरचना",
      "formulaDescription": "यह कंपाइलर Pyodide (Emscripten द्वारा वेबअसेंबली में संकलित CPython) के माध्यम से सीधे आपके ब्राउज़र में वास्तविक पायथन 3 कोड चलाता है। सभी स्क्रिप्ट बिना किसी रिमोट सर्वर के स्थानीय रूप से निष्पादित होती हैं।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "कोड लिखें या टेम्पलेट चुनें",
          "instruction": "एडिटर में अपना पायथन कोड लिखें या रेडीमेड टेम्पलेट (हैलो वर्ल्ड, गणित, सॉर्टिंग) चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "वैकल्पिक इनपुट (Stdin) दें",
          "instruction": "यदि आपके कोड में input() का उपयोग हुआ है तो Stdin बॉक्स में आवश्यक मान दर्ज करें।"
        },
        {
          "stepNumber": 3,
          "title": "कोड निष्पादित करें",
          "instruction": "रन कोड बटन दबाएं या Ctrl+Enter दबाकर ब्राउज़र वेबअसेंबली में कोड चलाएं।"
        },
        {
          "stepNumber": 4,
          "title": "आउटपुट देखें और डाउनलोड करें",
          "instruction": "कंसोल टर्मिनल में परिणाम देखें और मुख्य कोड को main.py फाइल के रूप में डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "फाइबोनैचि गणना और लिस्ट कॉम्प्रिहेंशन उदाहरण",
        "scenario": "पायथन 3 में पहले 10 फाइबोनैचि अंक निकालना और सम संख्याओं को फ़िल्टर करना।",
        "calculation": "def fib(n): ... fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]। सम संख्याएं: [0, 2, 8, 34]।",
        "result": "टर्मिनल आउटपुट: ब्राउज़र वेबअसेंबली मेमोरी में 12ms के भीतर सटीक परिणाम प्राप्त।"
      },
      "faqs": [
        {
          "question": "क्या कोड चलाने के लिए किसी बाहरी सर्वर की आवश्यकता है?",
          "answer": "नहीं। पायथन पूरी तरह से Pyodide वेबअसेंबली द्वारा आपके ब्राउज़र में चलता है। आपका कोड कभी भी आपके डिवाइस से बाहर नहीं जाता।"
        },
        {
          "question": "क्या मैं लोकल फाइलों या नेटवर्क सॉकेट्स को एक्सेस कर सकता हूँ?",
          "answer": "ब्राउज़र सैंडबॉक्स सुरक्षा के कारण सीधे OS फाइल और सॉकेट एक्सेस प्रतिबंधित हैं। हालांकि इन-मेमोरी वर्चुअल फाइल सिस्टम पूरी तरह समर्थित है।"
        },
        {
          "question": "कौन-कौन से मानक पायथन मॉड्यूल उपलब्ध हैं?",
          "answer": "math, json, re, statistics, itertools, datetime, collections और random जैसे मुख्य मॉड्यूल पूर्णतः समर्थित हैं।"
        },
        {
          "question": "पहली बार कोड चलने में 2-3 सेकंड का समय क्यों लगता है?",
          "answer": "पहली बार Pyodide वेबअसेंबली इंजन डाउनलोड और इनिशियलाइज़ होता है। इसके बाद सभी कोड स्थानीय कैश से तुरंत चलते हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Arquitectura de Tiempo de Ejecución Python 3 en Navegador con Pyodide WebAssembly",
      "formulaDescription": "El compilador ejecuta código Python 3 real directamente en el navegador mediante Pyodide (CPython compilado a WebAssembly con Emscripten). Los scripts se procesan en su equipo sin enviarse a servidores remotos.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escribir o elegir plantilla",
          "instruction": "Escriba su código Python 3 o cargue una plantilla inicial (Hola Mundo, Fibonacci, ordenación)."
        },
        {
          "stepNumber": 2,
          "title": "Configurar entrada Stdin",
          "instruction": "Añada valores en el panel Stdin si su programa utiliza llamadas a input()."
        },
        {
          "stepNumber": 3,
          "title": "Ejecutar código",
          "instruction": "Pulse Ejecutar o presione Ctrl+Intro para iniciar el entorno Pyodide WebAssembly."
        },
        {
          "stepNumber": 4,
          "title": "Ver terminal y descargar",
          "instruction": "Inspeccione la salida en la consola y descargue el archivo como main.py."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Secuencia de Fibonacci en Python 3",
        "scenario": "Generar los primeros 10 términos de Fibonacci y filtrar números pares.",
        "calculation": "def fib(n): ... fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]. Pares: [0, 2, 8, 34].",
        "result": "Salida de terminal: Ejecutado en 12 ms en la memoria WebAssembly del navegador."
      },
      "faqs": [
        {
          "question": "¿La ejecución de código requiere un servidor backend?",
          "answer": "No. Python se ejecuta íntegramente en el navegador con Pyodide WebAssembly. Su código y datos nunca salen del dispositivo."
        },
        {
          "question": "¿Puedo acceder al sistema de archivos local o abrir sockets de red?",
          "answer": "Por seguridad del navegador, los sockets y el sistema de archivos del sistema operativo están bloqueados. Se admite el sistema de archivos virtual en memoria."
        },
        {
          "question": "¿Qué módulos de la biblioteca estándar están disponibles?",
          "answer": "Módulos como math, json, re, statistics, itertools, datetime y random funcionan sin problemas."
        },
        {
          "question": "¿Por qué la primera ejecución tarda unos segundos?",
          "answer": "La primera vez se descarga e inicializa el binario WebAssembly de Pyodide. Las siguientes ejecuciones son casi instantáneas."
        }
      ]
    },
    "ja": {
      "formulaTitle": "Pyodide WebAssemblyブラウザ内Python 3実行環境アーキテクチャ",
      "formulaDescription": "本コンパイラは、EmscriptenによりWebAssemblyにコンパイルされたCPython（Pyodide）を採用。コードをリモートサーバーに送信することなく、お使いのブラウザ内部で本物のPython 3スクリプトを高速実行します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "コード作成またはテンプレート選択",
          "instruction": "エディタに直接Python 3コードを記述するか、プリセット（Hello World、数学計算、ソート等）を読み込みます。"
        },
        {
          "stepNumber": 2,
          "title": "標準入力（Stdin）の指定",
          "instruction": "input()関数を使用するスクリプトの場合は、Stdin入力欄にパラメータを指定します。"
        },
        {
          "stepNumber": 3,
          "title": "コードの実行",
          "instruction": "「Run Code」をクリックするかCtrl+Enterキーを押してPyodide WebAssemblyで即座に実行します。"
        },
        {
          "stepNumber": 4,
          "title": "出力結果の確認と保存",
          "instruction": "ターミナル画面で標準出力と実行時間を確認し、必要に応じて「Download」ボタンからmain.pyを保存します。"
        }
      ],
      "workedExample": {
        "title": "フィボナッチ数列算出とリスト内包表記の実例",
        "scenario": "Python 3で最初の10項のフィボナッチ数列を生成し、偶数要素のみを抽出する例。",
        "calculation": "fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]。偶数抽出: [0, 2, 8, 34]。",
        "result": "ターミナル出力: ブラウザWebAssemblyメモリ内でわずか12msで高速演算完了。"
      },
      "faqs": [
        {
          "question": "実行に外部サーバーは必要ですか？",
          "answer": "いいえ。Pyodide WebAssemblyエンジンによりブラウザ内部で完結して実行されます。記述したコードがサーバーに送信されることはありません。"
        },
        {
          "question": "ローカルファイルやネットワークソケットにアクセスできますか？",
          "answer": "ブラウザのセキュリティサンドボックスにより、ローカルOSのファイルシステムやRAWソケット通信は制限されています（メモリ内仮想ファイルシステムは利用可能）。"
        },
        {
          "question": "利用可能な標準ライブラリには何がありますか？",
          "answer": "math、json、re、statistics、itertools、datetime、collections、randomなど主要な標準モジュールを完全にサポートしています。"
        },
        {
          "question": "初回の実行に数秒かかるのはなぜですか？",
          "answer": "初回のみPyodideのWebAssemblyバイナリを読み込むため初期化時間を要します。2回目以降はキャッシュされ瞬時に実行されます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Architecture d'Exécution Python 3 en Navigateur via Pyodide WebAssembly",
      "formulaDescription": "Ce compilateur exécute du code Python 3 réel directement dans votre navigateur via Pyodide (CPython compilé en WebAssembly). Les flux d'entrée/sortie sont gérés localement sans envoi de code sur un serveur tiers.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Écrire ou charger du code",
          "instruction": "Saisissez votre code Python 3 ou choisissez un modèle préconfiguré dans la liste déroulante."
        },
        {
          "stepNumber": 2,
          "title": "Renseigner l'entrée Stdin",
          "instruction": "Ajoutez les entrées requises dans la boîte Stdin si votre programme utilise input()."
        },
        {
          "stepNumber": 3,
          "title": "Exécuter le script",
          "instruction": "Cliquez sur Run Code ou appuyez sur Ctrl+Entrée pour démarrer l'interpréteur WebAssembly."
        },
        {
          "stepNumber": 4,
          "title": "Examiner et télécharger",
          "instruction": "Consultez la sortie dans le terminal et téléchargez le fichier source sous main.py."
        }
      ],
      "workedExample": {
        "title": "Exemple de Suite de Fibonacci et Compréhension de Liste",
        "scenario": "Calcul des 10 premiers termes de Fibonacci et extraction des nombres pairs.",
        "calculation": "fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]. Nombres pairs filtrés : [0, 2, 8, 34].",
        "result": "Sortie terminal : Résultat calculé en 12 ms via WebAssembly dans le navigateur."
      },
      "faqs": [
        {
          "question": "L'exécution nécessite-t-elle un serveur distant ?",
          "answer": "Non. Python s'exécute localement dans le navigateur grâce à Pyodide WebAssembly. Vos données ne quittent jamais votre machine."
        },
        {
          "question": "Puis-je accéder aux fichiers locaux ou au réseau ?",
          "answer": "Le bac à sable du navigateur bloque les accès disques directs et les sockets réseau. Un système de fichiers virtuel en mémoire est disponible."
        },
        {
          "question": "Quels modules standard sont supportés ?",
          "answer": "Les modules math, json, re, statistics, itertools, datetime, collections et random sont pleinement pris en charge."
        },
        {
          "question": "Pourquoi la première exécution prend-elle quelques secondes ?",
          "answer": "Le navigateur doit initialiser les fichiers WebAssembly de Pyodide au premier chargement. Les exécutions suivantes sont immédiates."
        }
      ]
    },
    "de": {
      "formulaTitle": "Pyodide WebAssembly In-Browser Python 3 Laufzeitarchitektur",
      "formulaDescription": "Der Compiler führt echten Python-3-Code über Pyodide (mit Emscripten zu WebAssembly kompiliertes CPython) direkt im Browser aus. Alle Skripte laufen lokal ohne Serverübertragung.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Code verfassen oder Vorlage wählen",
          "instruction": "Geben Sie Ihren Python-3-Code in den Editor ein oder wählen Sie ein Code-Beispiel."
        },
        {
          "stepNumber": 2,
          "title": "Standardeingabe (Stdin) ergänzen",
          "instruction": "Tragen Sie bei Programmen mit input()-Abfragen die Eingabewerte in das Stdin-Feld ein."
        },
        {
          "stepNumber": 3,
          "title": "Code ausführen",
          "instruction": "Klicken Sie auf Run Code oder drücken Sie Strg+Enter für die lokale WebAssembly-Ausführung."
        },
        {
          "stepNumber": 4,
          "title": "Ergebnis prüfen & speichern",
          "instruction": "Sehen Sie die Terminalausgabe ein und laden Sie das Skript bei Bedarf als main.py herunter."
        }
      ],
      "workedExample": {
        "title": "Beispiel für Fibonacci-Berechnung in Python 3",
        "scenario": "Erzeugung der ersten 10 Fibonacci-Zahlen und Filtern gerader Zahlen.",
        "calculation": "fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]. Gefiltert: [0, 2, 8, 34].",
        "result": "Terminalausgabe: In 12 ms im lokalen WebAssembly-Speicher des Browsers berechnet."
      },
      "faqs": [
        {
          "question": "Benötigt die Ausführung einen Server im Hintergrund?",
          "answer": "Nein. Python läuft vollständig im Browser über die Pyodide-WebAssembly-Laufzeitumgebung. Ihr Code bleibt vertraulich auf dem Gerät."
        },
        {
          "question": "Kann auf lokale Festplatten oder Netzwerksockets zugegriffen werden?",
          "answer": "Durch die Browser-Sandbox sind direkte Systemdateizugriffe und Raw-Sockets gesperrt. Virtuelle Dateisysteme im Speicher werden unterstützt."
        },
        {
          "question": "Welche Standardmodule werden unterstützt?",
          "answer": "Wichtige Module wie math, json, re, statistics, itertools, datetime, collections und random sind voll einsatzbereit."
        },
        {
          "question": "Warum benötigt der erste Start wenige Sekunden?",
          "answer": "Beim ersten Start wird die Pyodide-WebAssembly-Engine geladen. Nachfolgende Skripte starten unmittelbar."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Arquitetura de Execução Python 3 no Navegador com Pyodide WebAssembly",
      "formulaDescription": "O compilador roda código Python 3 autêntico no próprio navegador por meio do Pyodide (CPython compilado em WebAssembly). O processamento ocorre 100% no seu dispositivo sem envio a servidores remotos.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escrever ou carregar código",
          "instruction": "Digite seu código Python 3 no editor ou carregue modelos prontos de estudo."
        },
        {
          "stepNumber": 2,
          "title": "Preencher Stdin opcional",
          "instruction": "Insira dados na caixa Stdin caso seu script solicite valores via input()."
        },
        {
          "stepNumber": 3,
          "title": "Executar código",
          "instruction": "Clique em Run Code ou use o atalho Ctrl+Enter para rodar via WebAssembly."
        },
        {
          "stepNumber": 4,
          "title": "Conferir saída e baixar",
          "instruction": "Analise os resultados no console e salve o arquivo fonte como main.py."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Sequência de Fibonacci em Python 3",
        "scenario": "Cálculo dos 10 primeiros termos de Fibonacci e filtragem de números pares.",
        "calculation": "fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]. Pares: [0, 2, 8, 34].",
        "result": "Console: Script finalizado em 12 ms na memória WebAssembly do navegador."
      },
      "faqs": [
        {
          "question": "A execução precisa de servidor na nuvem?",
          "answer": "Não. Python roda no navegador através do WebAssembly Pyodide. Seu código e variáveis nunca são enviados para servidores externos."
        },
        {
          "question": "Posso acessar arquivos do sistema operacional ou abrir conexões de rede?",
          "answer": "O sandbox de segurança do navegador bloqueia sockets e acesso a discos físicos. Um sistema de arquivos em memória é suportado."
        },
        {
          "question": "Quais módulos da biblioteca padrão estão ativos?",
          "answer": "Módulos essenciais como math, json, re, statistics, itertools, datetime e random funcionam perfeitamente."
        },
        {
          "question": "Por que a primeira execução demora um pouco?",
          "answer": "O navegador precisa inicializar os binários WebAssembly do Pyodide na primeira vez. As execuções seguintes ocorrem em milissegundos."
        }
      ]
    },
    "ko": {
      "formulaTitle": "Pyodide WebAssembly 브라우저 내 Python 3 런타임 구조",
      "formulaDescription": "본 컴파일러는 Emscripten을 통해 WebAssembly로 빌드된 CPython(Pyodide) 엔진을 탑재하여 외부 서버 전송 없이 브라우저 내에서 완벽한 Python 3 스크립트를 즉시 실행합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "코드 작성 또는 템플릿 선택",
          "instruction": "에디터에 Python 3 코드를 직접 작성하거나 기본 예제 템플릿을 불러옵니다."
        },
        {
          "stepNumber": 2,
          "title": "표준 입력(Stdin) 지정",
          "instruction": "코드 내에 input() 함수 호출이 있는 경우 Stdin 창에 입력값을 미리 기재합니다."
        },
        {
          "stepNumber": 3,
          "title": "코드 실행",
          "instruction": "Run Code 버튼 또는 Ctrl+Enter를 눌러 Pyodide WebAssembly 런타임에서 즉시 컴파일 및 실행합니다."
        },
        {
          "stepNumber": 4,
          "title": "콘솔 확인 및 파일 저장",
          "instruction": "터미널 표준 출력 결과를 확인하고 Download 버튼을 눌러 main.py 파일로 저장합니다."
        }
      ],
      "workedExample": {
        "title": "피보나치 수열 계산 및 리스트 컴프리헨션 실전 예시",
        "scenario": "Python 3 환경에서 피보나치 수열 10개 항을 구하고 짝수 원소만 필터링.",
        "calculation": "fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]. 짝수 추출: [0, 2, 8, 34].",
        "result": "터미널 출력: 브라우저 WebAssembly 메모리 내에서 12ms 만에 정확한 연산 완료."
      },
      "faqs": [
        {
          "question": "코드 실행 시 외부 백엔드 서버가 필요한가요?",
          "answer": "아닙니다. Pyodide WebAssembly 런타임을 통해 사용자 브라우저 내에서 직접 실행되므로 작성한 코드가 외부 서버로 유출되지 않습니다."
        },
        {
          "question": "로컬 하드디스크 파일이나 네트워크 소켓에 접근할 수 있나요?",
          "answer": "브라우저 보안 샌드박스 정책에 따라 실제 OS 파일 시스템 및 네트워크 소켓 접근은 차단되며, 인메모리 가상 파일 시스템(MEMFS)이 제공됩니다."
        },
        {
          "question": "지원되는 표준 라이브러리 모듈은 무엇인가요?",
          "answer": "math, json, re, statistics, itertools, datetime, collections, random 등 핵심 표준 라이브러리가 완벽하게 구동됩니다."
        },
        {
          "question": "최초 실행 시 2~3초의 대기 시간이 발생하는 이유는 무엇인가요?",
          "answer": "첫 실행 시 약 12MB의 Pyodide WebAssembly 엔진을 브라우저 메모리에 로드하기 때문이며, 두 번째 실행부터는 캐시되어 즉각 실행됩니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Architettura di Esecuzione Python 3 nel Browser con Pyodide WebAssembly",
      "formulaDescription": "Il compilatore esegue codice Python 3 reale nel browser attraverso Pyodide (CPython compilato in WebAssembly con Emscripten), garantendo esecuzione locale senza inviare dati a server esterni.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scrivere o scegliere codice",
          "instruction": "Digita il codice Python 3 nell'editor oppure seleziona uno dei template disponibili."
        },
        {
          "stepNumber": 2,
          "title": "Impostare lo Stdin facoltativo",
          "instruction": "Inserisci i dati nel riquadro Stdin se il programma include chiamate a input()."
        },
        {
          "stepNumber": 3,
          "title": "Eseguire il programma",
          "instruction": "Fai clic su Run Code o premi Ctrl+Invio per avviare il runtime WebAssembly."
        },
        {
          "stepNumber": 4,
          "title": "Verificare l'output e scaricare",
          "instruction": "Ispeziona la console di output e scarica lo script come file main.py."
        }
      ],
      "workedExample": {
        "title": "Esempio di Calcolo Fibonacci in Python 3",
        "scenario": "Generazione dei primi 10 numeri di Fibonacci e selezione dei termini pari.",
        "calculation": "fib(10) -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]. Termini pari: [0, 2, 8, 34].",
        "result": "Output console: Esecuzione completata in 12 ms nella memoria WebAssembly locale."
      },
      "faqs": [
        {
          "question": "L'esecuzione richiede un server backend remoto?",
          "answer": "No. Python viene eseguito interamente nel browser tramite WebAssembly Pyodide. Il codice e gli input non lasciano il computer."
        },
        {
          "question": "È possibile accedere a file locali o socket di rete?",
          "answer": "Per ragioni di sicurezza della sandbox del browser, l'accesso al disco e ai socket è inibito. È disponibile un file system virtuale in memoria."
        },
        {
          "question": "Quali moduli della libreria standard sono supportati?",
          "answer": "Moduli come math, json, re, statistics, itertools, datetime, collections e random sono pienamente funzionanti."
        },
        {
          "question": "Perché la prima esecuzione richiede qualche secondo?",
          "answer": "Al primo avvio il browser scarica e inizializza i binari WebAssembly di Pyodide. Le esecuzioni successive sono immediate."
        }
      ]
    }
  },
  "javascript-compiler": {
    "en": {
      "formulaTitle": "V8 Sandboxed Evaluation & Real-Time Console Stream Interception",
      "formulaDescription": "The compiler evaluates modern ECMAScript directly inside an isolated browser execution context. Native console methods (log, error, warn, table) are safely intercepted and redirected to the on-screen terminal emulator with execution timing benchmarks.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Write JavaScript Code",
          "instruction": "Type or paste ES6+ JavaScript code into the editor or load a built-in snippet."
        },
        {
          "stepNumber": 2,
          "title": "Set Custom Arguments",
          "instruction": "Use standard console.log() calls to inspect variables, objects, arrays, and promises."
        },
        {
          "stepNumber": 3,
          "title": "Click Run Script",
          "instruction": "Execute your code instantly (or press Ctrl+Enter) to evaluate logic in the local JS engine."
        },
        {
          "stepNumber": 4,
          "title": "Inspect Output & Performance",
          "instruction": "Review outputs and execution duration in milliseconds, and copy or download the script."
        }
      ],
      "workedExample": {
        "title": "Async Promise & Array Map-Reduce Example",
        "scenario": "Simulating an asynchronous fetch pipeline and computing totals with Array.reduce().",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((acc, v) => acc + v, 0); const avg = sum / data.length;",
        "result": "Terminal Output: \"Total Sum: 90 | Average: 22.5\" executed in 2ms."
      },
      "faqs": [
        {
          "question": "Is my JavaScript code uploaded to an external server?",
          "answer": "No. Code execution occurs strictly within your browser's local JavaScript engine. No code is transmitted across the internet."
        },
        {
          "question": "Can the script access cookies or sensitive browser storage?",
          "answer": "No. The execution environment is sandboxed to prevent malicious reads from localStorage, cookies, or parent document nodes."
        },
        {
          "question": "What happens if I write an infinite loop (e.g., while(true))?",
          "answer": "An infinite loop can temporarily freeze the execution thread until the browser's script timeout interrupts execution or you close the tab."
        },
        {
          "question": "Are modern ES6+ features supported?",
          "answer": "Yes. Arrow functions, async/await, destructuring, classes, Promises, and optional chaining are fully supported by your browser's native V8/SpiderMonkey engine."
        }
      ]
    },
    "hi": {
      "formulaTitle": "V8 सैंडबॉक्स्ड मूल्यांकन और रीयल-टाइम कंसोल स्ट्रीम इंटरसेप्शन",
      "formulaDescription": "यह कंपाइलर आधुनिक ECMAScript कोड को एक सुरक्षित ब्राउज़र सैंडबॉक्स में निष्पादित करता है। मूल कंसोल विधियों (log, error, warn) को स्क्रीन पर दिखने वाले टर्मिनल एमुलेटर में पुनर्निर्देशित किया जाता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "जावास्क्रिप्ट कोड लिखें",
          "instruction": "एडिटर में ES6+ जावास्क्रिप्ट कोड लिखें या बिल्ट-इन स्निपेट चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "लॉगिंग स्टेटमेंट जोड़ें",
          "instruction": "वेरिएबल, ऑब्जेक्ट और एरे देखने के लिए console.log() का उपयोग करें।"
        },
        {
          "stepNumber": 3,
          "title": "रन स्क्रिप्ट पर क्लिक करें",
          "instruction": "ब्राउज़र इंजन में तुरंत कोड चलाने के लिए रन बटन दबाएं या Ctrl+Enter दबाएं।"
        },
        {
          "stepNumber": 4,
          "title": "आउटपुट और समय जांचें",
          "instruction": "कंसोल में परिणाम और निष्पादन समय देखें, और स्क्रिप्ट को डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "एसिंक्रोनस प्रॉमिस और एरे रिड्यूस उदाहरण",
        "scenario": "जावास्क्रिप्ट में डेटा एरे का योग और औसत Array.reduce() से निकालना।",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((acc, v) => acc + v, 0);",
        "result": "टर्मिनल आउटपुट: \"Total Sum: 90 | Average: 22.5\" (2ms में निष्पादित)।"
      },
      "faqs": [
        {
          "question": "क्या मेरा जावास्क्रिप्ट कोड किसी सर्वर पर भेजा जाता है?",
          "answer": "नहीं। कोड सीधे आपके ब्राउज़र के जावास्क्रिप्ट इंजन में चलता है और कोई भी डेटा बाहर नहीं भेजा जाता।"
        },
        {
          "question": "क्या स्क्रिप्ट कुकीज या लोकल स्टोरेज को पढ़ सकती है?",
          "answer": "नहीं। सैंडबॉक्स सुरक्षा वातावरण कुकीज या लोकल स्टोरेज के अनधिकृत उपयोग को रोकता है।"
        },
        {
          "question": "अनंत लूप (infinite loop) लिखने पर क्या होगा?",
          "answer": "अनंत लूप ब्राउज़र थ्रेड को कुछ समय के लिए रोक सकता है जब तक कि ब्राउज़र का स्क्रिप्ट टाइमआउट उसे बंद न कर दे।"
        },
        {
          "question": "क्या ES6+ के नए फीचर्स समर्थित हैं?",
          "answer": "हाँ। एरो फंक्शन्स, async/await, क्लासेस और प्रॉमिस जैसे सभी आधुनिक फीचर्स पूरी तरह समर्थित हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Evaluación Aislada V8 e Intercepción de Flujos de Consola",
      "formulaDescription": "El compilador evalúa código ECMAScript moderno en un contexto aislado del navegador. Los métodos de consola (log, error, warn) son interceptados y redirigidos al emulador de terminal en pantalla.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escribir código JavaScript",
          "instruction": "Escriba o pegue código JS moderno en el editor o cargue un ejemplo."
        },
        {
          "stepNumber": 2,
          "title": "Añadir llamadas de depuración",
          "instruction": "Utilice console.log() para examinar objetos, arrays y promesas."
        },
        {
          "stepNumber": 3,
          "title": "Pulsar Ejecutar",
          "instruction": "Ejecute el script al instante en el motor del navegador con Ctrl+Intro."
        },
        {
          "stepNumber": 4,
          "title": "Revisar consola",
          "instruction": "Compruebe la salida y el tiempo de respuesta en milisegundos."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Procesamiento de Arrays con reduce()",
        "scenario": "Calcular la suma y el promedio de un conjunto de datos numéricos en JavaScript.",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((a, b) => a + b, 0);",
        "result": "Salida de consola: \"Total Sum: 90 | Average: 22.5\" ejecutado en 2 ms."
      },
      "faqs": [
        {
          "question": "¿El código se sube a servidores remotos?",
          "answer": "No. La ejecución ocurre íntegramente en el motor JavaScript de su navegador de forma confidencial."
        },
        {
          "question": "¿Puede el script acceder a cookies o almacenamiento local?",
          "answer": "No. El entorno aislado impide el acceso a cookies o datos confidenciales del navegador."
        },
        {
          "question": "¿Qué ocurre si escribo un bucle infinito?",
          "answer": "Un bucle infinito puede congelar momentáneamente la pestaña hasta que el navegador detenga la ejecución por exceso de tiempo."
        },
        {
          "question": "¿Se admiten funciones modernas de ES6+?",
          "answer": "Sí. Arrow functions, async/await, clases, destructuración y Promesas están totalmente soportadas."
        }
      ]
    },
    "ja": {
      "formulaTitle": "V8サンドボックス実行とリアルタイムコンソールストリーム捕捉技術",
      "formulaDescription": "本ツールはブラウザのJavaScriptエンジン内で最新のECMAScriptを安全に実行。console.logやconsole.errorなどの標準メソッドをフックし、画面上のターミナルエミュレータへリアルタイムに出力します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "JavaScriptコードの記述",
          "instruction": "最新のES6+構文でスクリプトを入力するか、サンプルコードを選択します。"
        },
        {
          "stepNumber": 2,
          "title": "ログ出力の設定",
          "instruction": "変数やオブジェクトの内容を確認するためconsole.log()を適宜配置します。"
        },
        {
          "stepNumber": 3,
          "title": "実行ボタンのクリック",
          "instruction": "「Run」ボタンまたはCtrl+Enterキーでローカルエンジンにて即座に実行します。"
        },
        {
          "stepNumber": 4,
          "title": "コンソール結果の確認",
          "instruction": "ミリ秒単位の処理時間とターミナル出力を確認し、コードを保存します。"
        }
      ],
      "workedExample": {
        "title": "非同期処理と配列集計（reduce）の実例",
        "scenario": "配列データの総和と平均値をArray.prototype.reduce()を用いて算出する例。",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((acc, v) => acc + v, 0);",
        "result": "ターミナル出力: 「Total Sum: 90 | Average: 22.5」わずか2msで演算終了。"
      },
      "faqs": [
        {
          "question": "コードは外部サーバーに送信されますか？",
          "answer": "いいえ。すべての処理はお使いのブラウザ内部のJavaScriptエンジンで安全に実行されます。"
        },
        {
          "question": "Cookieやローカルストレージにアクセスできますか？",
          "answer": "いいえ。セキュリティサンドボックスにより、ブラウザのCookieや親ドキュメントへの不正アクセスは遮断されています。"
        },
        {
          "question": "無限ループ（while(true)等）を記述した場合はどうなりますか？",
          "answer": "ブラウザのスクリプト実行制限（タイムアウト）により自動停止されるまで一時的にタブの応答が遅くなる場合があります。"
        },
        {
          "question": "ES6+の最新機能は動作しますか？",
          "answer": "はい。アロー関数、async/await、クラス構文、分割代入など最新のECMAScript仕様に完全対応しています。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Évaluation en Bac à Sable V8 et Capture des Flux de Console",
      "formulaDescription": "Le compilateur évalue le code ECMAScript moderne dans un environnement isolé du navigateur. Les appels de console (log, error, warn) sont capturés et affichés dans le terminal virtuel.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Saisir le code JavaScript",
          "instruction": "Tapez votre script ES6+ dans l'éditeur ou sélectionnez un exemple pratique."
        },
        {
          "stepNumber": 2,
          "title": "Utiliser console.log",
          "instruction": "Insérez des appels console.log() pour inspecter l'état de vos variables."
        },
        {
          "stepNumber": 3,
          "title": "Cliquer sur Exécuter",
          "instruction": "Lancez l'évaluation immédiate dans le moteur JavaScript de votre navigateur."
        },
        {
          "stepNumber": 4,
          "title": "Vérifier la sortie",
          "instruction": "Consultez les résultats dans le terminal et téléchargez le fichier .js."
        }
      ],
      "workedExample": {
        "title": "Exemple de Réduction de Tableau en JavaScript",
        "scenario": "Calcul de la somme et de la moyenne d'un tableau numérique avec reduce().",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((acc, v) => acc + v, 0);",
        "result": "Sortie terminal : \"Total Sum: 90 | Average: 22.5\" calculé en 2 ms."
      },
      "faqs": [
        {
          "question": "Le code est-il transmis à un serveur ?",
          "answer": "Non. Tout s'exécute localement dans le moteur JavaScript de votre propre navigateur."
        },
        {
          "question": "Le script peut-il lire les cookies ?",
          "answer": "Non. Le bac à sable sécurisé empêche tout accès aux cookies ou au stockage local."
        },
        {
          "question": "Que se passe-t-il en cas de boucle infinie ?",
          "answer": "Le fil d'exécution peut se bloquer brièvement jusqu'à l'interruption automatique par le navigateur."
        },
        {
          "question": "Les fonctionnalités ES6+ sont-elles gérées ?",
          "answer": "Oui. Les fonctions fléchées, async/await, Promesses et classes sont nativement prises en charge."
        }
      ]
    },
    "de": {
      "formulaTitle": "V8-Sandbox-Ausführung & Echtzeit-Konsolenstrom-Erfassung",
      "formulaDescription": "Der Compiler führt modernen ECMAScript-Code in einem isolierten Browser-Kontext aus. Konsolenmethoden (log, error, warn) werden abgefangen und im Bildschirmterminal dargestellt.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "JavaScript eingeben",
          "instruction": "Schreiben Sie modernen ES6+-Code in das Editorfeld oder nutzen Sie Vorlagen."
        },
        {
          "stepNumber": 2,
          "title": "Ausgaben platzieren",
          "instruction": "Nutzen Sie console.log(), um Werte, Objekte und Arrays anzuzeigen."
        },
        {
          "stepNumber": 3,
          "title": "Skript ausführen",
          "instruction": "Starten Sie die Ausführung mit Klick auf Ausführen oder mit Strg+Enter."
        },
        {
          "stepNumber": 4,
          "title": "Ausgabe analysieren",
          "instruction": "Überprüfen Sie Ausgaben und Laufzeiten im Terminalbereich."
        }
      ],
      "workedExample": {
        "title": "Beispiel für Array-Verarbeitung mit reduce()",
        "scenario": "Berechnung von Summe und Durchschnitt eines numerischen Arrays.",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((acc, v) => acc + v, 0);",
        "result": "Terminalausgabe: \"Total Sum: 90 | Average: 22.5\" in 2 ms berechnet."
      },
      "faqs": [
        {
          "question": "Wird der Code an einen Server übertragen?",
          "answer": "Nein. Die Ausführung erfolgt zu 100 % lokal in der JavaScript-Engine Ihres Browsers."
        },
        {
          "question": "Kann das Skript Cookies oder Speicher auslesen?",
          "answer": "Nein. Die Sandbox-Umgebung unterbindet Zugriffe auf Cookies und localStorage."
        },
        {
          "question": "Was passiert bei einer Endlosschleife?",
          "answer": "Eine Endlosschleife kann den Tab kurzzeitig anhalten, bis der Browser die Skriptausführung abbricht."
        },
        {
          "question": "Werden moderne ES6+-Syntaxelemente unterstützt?",
          "answer": "Ja. Async/Await, Klassen, Promises und Arrow Functions werden nativ unterstützt."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Execução Isolada V8 e Interceptação em Tempo Real do Console",
      "formulaDescription": "O compilador executa ECMAScript moderno em um contexto isolado no navegador. Métodos de console (log, error, warn) são capturados e exibidos no terminal virtual com medição de tempo.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escrever código JS",
          "instruction": "Insira código JavaScript ES6+ no editor ou carregue um exemplo pronto."
        },
        {
          "stepNumber": 2,
          "title": "Configurar saídas",
          "instruction": "Use console.log() para inspecionar variáveis, objetos e matrizes."
        },
        {
          "stepNumber": 3,
          "title": "Executar script",
          "instruction": "Clique em Run ou pressione Ctrl+Enter para testar o código no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Examinar console",
          "instruction": "Analise os dados impressos e o tempo de execução em milissegundos."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Redução de Matriz com reduce()",
        "scenario": "Cálculo de soma e média de valores numéricos em JavaScript moderno.",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((acc, v) => acc + v, 0);",
        "result": "Console: \"Total Sum: 90 | Average: 22.5\" processado em 2 ms."
      },
      "faqs": [
        {
          "question": "O código é enviado para algum servidor?",
          "answer": "Não. O script roda diretamente no motor JavaScript local do seu navegador."
        },
        {
          "question": "O código consegue acessar cookies ou dados salvos?",
          "answer": "Não. O isolamento do sandbox impede a leitura de cookies ou localStorage."
        },
        {
          "question": "O que ocorre em caso de loop infinito?",
          "answer": "O navegador pode pausar a execução temporariamente até que o limite de tempo seja atingido."
        },
        {
          "question": "Recursos modernos do ES6+ funcionam normalmente?",
          "answer": "Sim. Classes, Promises, async/await e desestruturação são suportados nativamente."
        }
      ]
    },
    "ko": {
      "formulaTitle": "V8 샌드박스 실행 환경 및 실시간 콘솔 스트림 캡처 구조",
      "formulaDescription": "본 컴파일러는 격리된 브라우저 컨텍스트 내에서 최신 ECMAScript 코드를 실행합니다. console.log, error, warn 등의 콘솔 출력을 가로채어 화면의 터미널 에뮬레이터에 실시간으로 표시합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "자바스크립트 코드 작성",
          "instruction": "에디터에 최신 ES6+ 자바스크립트 코드를 작성하거나 예제를 선택합니다."
        },
        {
          "stepNumber": 2,
          "title": "콘솔 출력문 구성",
          "instruction": "객체, 배열, 프로미스 상태를 확인하기 위해 console.log() 함수를 작성합니다."
        },
        {
          "stepNumber": 3,
          "title": "스크립트 실행",
          "instruction": "Run 버튼 또는 Ctrl+Enter를 눌러 브라우저 엔진에서 즉시 코드를 평가합니다."
        },
        {
          "stepNumber": 4,
          "title": "터미널 결과 확인",
          "instruction": "밀리초 단위의 실행 시간과 출력 로그를 확인하고 스크립트를 다운로드합니다."
        }
      ],
      "workedExample": {
        "title": "배열 집계(reduce) 및 비동기 처리 실전 예시",
        "scenario": "Array.reduce()를 활용하여 숫자 데이터의 합계와 평균을 즉시 산출.",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((acc, v) => acc + v, 0);",
        "result": "터미널 출력: \"Total Sum: 90 | Average: 22.5\" (실행 시간 2ms)."
      },
      "faqs": [
        {
          "question": "작성한 자바스크립트 코드가 외부 서버로 전송되나요?",
          "answer": "아닙니다. 브라우저의 로컬 자바스크립트 엔진에서 즉시 실행되며 인터넷으로 코드가 전송되지 않습니다."
        },
        {
          "question": "쿠키나 로컬 스토리지에 접근할 수 있나요?",
          "answer": "샌드박스 보안 정책에 따라 상위 문서나 민감한 브라우저 쿠키, 스토리지 접근이 차단됩니다."
        },
        {
          "question": "무한 루프(while(true))를 실행하면 어떻게 되나요?",
          "answer": "브라우저 스크립트 실행 제한 시간이 도달하여 강제 중단될 때까지 일시적으로 탭 응답이 지연될 수 있습니다."
        },
        {
          "question": "ES6+ 최신 문법을 지원하나요?",
          "answer": "네. 화살표 함수, async/await, 구조 분해 할당, 프로미스 등 최신 자바스크립트 기능이 브라우저에서 완벽히 지원됩니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Esecuzione Isolata V8 e Intercettazione dei Flussi di Console",
      "formulaDescription": "Il compilatore valuta il codice ECMAScript moderno in un contesto protetto del browser. I metodi di console (log, error, warn) vengono intercettati e mostrati nel terminale a schermo.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scrivere codice JavaScript",
          "instruction": "Digita il codice ES6+ nell'editor o carica un frammento di esempio."
        },
        {
          "stepNumber": 2,
          "title": "Inserire console.log",
          "instruction": "Usa console.log() per ispezionare lo stato di variabili e oggetti."
        },
        {
          "stepNumber": 3,
          "title": "Eseguire lo script",
          "instruction": "Avvia l'esecuzione nel motore JavaScript locale con un clic o Ctrl+Invio."
        },
        {
          "stepNumber": 4,
          "title": "Controllare la console",
          "instruction": "Ispeziona la console di testo e scarica il file script pronto."
        }
      ],
      "workedExample": {
        "title": "Esempio di Elaborazione Array con reduce()",
        "scenario": "Calcolo di totale e media su un array di valori numerici.",
        "calculation": "const data = [10, 25, 40, 15]; const sum = data.reduce((acc, v) => acc + v, 0);",
        "result": "Console: \"Total Sum: 90 | Average: 22.5\" elaborato in 2 ms."
      },
      "faqs": [
        {
          "question": "Il codice JavaScript viene inviato a server esterni?",
          "answer": "No. L'esecuzione avviene per intero nel motore JavaScript locale del browser."
        },
        {
          "question": "Lo script può accedere a cookie o memoria locale?",
          "answer": "No. La sandbox di sicurezza impedisce la lettura di dati sensibili del browser."
        },
        {
          "question": "Cosa accade se scrivo un ciclo infinito?",
          "answer": "Il thread di esecuzione potrebbe bloccarsi temporaneamente fino all'intervento del timeout del browser."
        },
        {
          "question": "Le novità di ES6+ sono supportate?",
          "answer": "Sì. Funzioni a freccia, async/await, classi e Promises sono pienamente operative."
        }
      ]
    }
  },
  "html-editor": {
    "en": {
      "formulaTitle": "Real-Time DOM Virtualization & Sandboxed Iframe Preview Architecture",
      "formulaDescription": "The editor provides a responsive three-pane development environment (HTML, CSS, JavaScript) that serializes source markup directly into a sandboxed <iframe> (using sandbox=\"allow-scripts\") via Blob URL and srcdoc injection, rendering DOM updates in real time with zero server latency.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Write HTML Structure",
          "instruction": "Structure elements (headings, containers, buttons, cards) in the HTML editor pane."
        },
        {
          "stepNumber": 2,
          "title": "Style with CSS",
          "instruction": "Add layout rules, flexbox/grid containers, and color schemes in the CSS pane."
        },
        {
          "stepNumber": 3,
          "title": "Add Dynamic JavaScript",
          "instruction": "Write interactive DOM manipulation scripts or event listeners in the JS pane."
        },
        {
          "stepNumber": 4,
          "title": "Inspect Live Preview & Export",
          "instruction": "Observe instant live updates in the preview frame and download a standalone index.html file."
        }
      ],
      "workedExample": {
        "title": "Interactive Counter Widget Creation",
        "scenario": "Building a responsive card component with a button that increments an on-screen counter.",
        "calculation": "HTML button & display span -> CSS card styling & hover animations -> JS document.querySelector('#btn').addEventListener('click', () => count++).",
        "result": "Fully functioning interactive UI rendered in real time within the browser preview window."
      },
      "faqs": [
        {
          "question": "Is my HTML/CSS/JS code stored on a server?",
          "answer": "No. The preview frame is rendered directly in memory via your browser's native rendering engine. No data is stored externally."
        },
        {
          "question": "Can the preview iframe affect or steal data from the parent website?",
          "answer": "No. The preview operates inside an isolated <iframe> with strict sandbox protections that block access to parent window cookies and storage."
        },
        {
          "question": "Can I include external CDN libraries (e.g., FontAwesome, Google Fonts)?",
          "answer": "Yes. You can link external CSS stylesheets and fonts via standard <link> tags in the HTML header."
        },
        {
          "question": "How can I save my project?",
          "answer": "Click the Download button to receive a self-contained index.html file that includes all HTML, styles, and scripts ready for deployment."
        }
      ]
    },
    "hi": {
      "formulaTitle": "रीयल-टाइम DOM वर्चुअलाइजेशन और सैंडबॉक्स्ड आईफ्रेम प्रीव्यू संरचना",
      "formulaDescription": "यह संपादक HTML, CSS और जावास्क्रिप्ट को एक सुरक्षित <iframe> में रीयल-टाइम रेंडर करता है। यह बिना किसी सर्वर विलंबता के सीधे आपके ब्राउज़र में वेब पेजों का लाइव पूर्वावलोकन प्रदान करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "HTML संरचना लिखें",
          "instruction": "HTML पैन में हेडिंग, बटन, कार्ड और कंटेनर आदि तत्व जोड़ें।"
        },
        {
          "stepNumber": 2,
          "title": "CSS से सजाएं",
          "instruction": "CSS पैन में रंग, फॉन्ट, फ्लेक्सबॉक्स और ग्रिड शैलियाँ लागू करें।"
        },
        {
          "stepNumber": 3,
          "title": "जावास्क्रिप्ट जोड़ें",
          "instruction": "JS पैन में इवेंट लिसनर्स और इंटरएक्टिव कार्यक्षमता जोड़ें।"
        },
        {
          "stepNumber": 4,
          "title": "लाइव प्रीव्यू देखें और डाउनलोड करें",
          "instruction": "प्रीव्यू विंडो में तुरंत बदलाव देखें और पूरी फाइल को index.html के रूप में डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "इंटरएक्टिव काउंटर विजेट निर्माण उदाहरण",
        "scenario": "एक ऐसा वेब कार्ड बनाना जिसमें बटन दबाने पर संख्या बढ़ती है।",
        "calculation": "HTML बटन और स्पैन -> CSS कार्ड स्टाइलिंग -> JS addEventListener('click', ...)।",
        "result": "ब्राउज़र प्रीव्यू विंडो में तुरंत काम करने वाला इंटरएक्टिव UI तैयार।"
      },
      "faqs": [
        {
          "question": "क्या मेरा कोड किसी सर्वर पर सेव होता है?",
          "answer": "नहीं। प्रीव्यू पूरी तरह से आपके ब्राउज़र की मेमोरी में रेंडर होता है। कोई भी डेटा बाहरी सर्वर पर नहीं भेजा जाता।"
        },
        {
          "question": "क्या प्रीव्यू आईफ्रेम मुख्य वेबसाइट को प्रभावित कर सकता है?",
          "answer": "नहीं। यह sandbox सुरक्षा नियमों के साथ अलग आईफ्रेम में चलता है जिससे मुख्य वेबसाइट पूरी तरह सुरक्षित रहती है।"
        },
        {
          "question": "क्या मैं बाहरी लाइब्रेरी और फॉन्ट (जैसे Google Fonts) जोड़ सकता हूँ?",
          "answer": "हाँ। आप HTML के भीतर मानक <link> टैग लगाकर बाहरी CSS और फॉन्ट्स का उपयोग कर सकते हैं।"
        },
        {
          "question": "मैं अपने प्रोजेक्ट को कैसे डाउनलोड कर सकता हूँ?",
          "answer": "डाउनलोड बटन पर क्लिक करके आप पूरी तरह तैयार index.html फाइल अपने डिवाइस पर प्राप्त कर सकते हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Virtualización DOM en Tiempo Real y Vista Previa en Iframe Aislado",
      "formulaDescription": "El editor integra un entorno de desarrollo para HTML, CSS y JavaScript que inyecta el código en un <iframe> aislado con sandbox=\"allow-scripts\", actualizando el DOM en tiempo real sin latencia de servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Estructurar con HTML",
          "instruction": "Escriba encabezados, botones, tarjetas y elementos en el panel HTML."
        },
        {
          "stepNumber": 2,
          "title": "Estilizar con CSS",
          "instruction": "Añada reglas de diseño, colores, fuentes y flexbox en el panel CSS."
        },
        {
          "stepNumber": 3,
          "title": "Añadir interactividad JS",
          "instruction": "Programe eventos y lógica de interacción en el panel JavaScript."
        },
        {
          "stepNumber": 4,
          "title": "Ver vista previa y descargar",
          "instruction": "Observe la representación en vivo y descargue el archivo index.html listo."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Creación de Widget Contador Interactivo",
        "scenario": "Desarrollar una tarjeta interactiva con botón que incrementa un contador visual.",
        "calculation": "Botón y span en HTML -> Estilos CSS con sombras y bordes -> JS con escuchador de eventos de clic.",
        "result": "Componente web funcional e interactivo renderizado en vivo en la pantalla."
      },
      "faqs": [
        {
          "question": "¿El código se almacena en algún servidor?",
          "answer": "No. La vista previa se genera localmente en la memoria del navegador sin registros externos."
        },
        {
          "question": "¿Puede el iframe acceder a datos de la página principal?",
          "answer": "No. El marco cuenta con aislamiento estricto que impide lecturas no autorizadas."
        },
        {
          "question": "¿Es posible usar tipografías externas como Google Fonts?",
          "answer": "Sí. Puede incorporar enlaces a fuentes y estilos externos mediante etiquetas <link> en el HTML."
        },
        {
          "question": "¿Cómo guardo el proyecto completo?",
          "answer": "Haga clic en Descargar para obtener un archivo index.html independiente listo para usar."
        }
      ]
    },
    "ja": {
      "formulaTitle": "リアルタイムDOM仮想化とサンドボックスiframeプレビュー構造",
      "formulaDescription": "本エディタは、HTML・CSS・JavaScriptの各コードをsandbox=\"allow-scripts\"が設定された安全なiframe内へBlob URL経由で注入。サーバー通信なしでお使いのブラウザ上でリアルタイムにWebページを描画します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "HTML構造の記述",
          "instruction": "HTMLペインに見出し、ボタン、カードなどの要素マークアップを記述します。"
        },
        {
          "stepNumber": 2,
          "title": "CSSによるスタイリング",
          "instruction": "CSSペインで配色、フォント、FlexboxやGridなどのレイアウトを指定します。"
        },
        {
          "stepNumber": 3,
          "title": "JavaScriptによる動的処理",
          "instruction": "JSペインでクリックイベントやDOM操作のスクリプトを組み込みます。"
        },
        {
          "stepNumber": 4,
          "title": "リアルタイムプレビューと保存",
          "instruction": "プレビュー枠で実際の画面表示を確認し、単一のindex.htmlとして保存します。"
        }
      ],
      "workedExample": {
        "title": "インタラクティブなカウンターウィジェット作成例",
        "scenario": "クリックするたびに数値がカウントアップするカードUIを実装する例。",
        "calculation": "HTML要素（ボタンと表示領域） -> CSSによるカード装飾 -> JSのaddEventListenerによる加算処理。",
        "result": "プレビュー画面上でボタンを押すとリアルタイムに数値が更新される完全なUIが完成。"
      },
      "faqs": [
        {
          "question": "編集中のコードはサーバーに保存されますか？",
          "answer": "いいえ。すべてのDOMレンダリングは端末のブラウザ内でのみ処理されます。"
        },
        {
          "question": "プレビュー内のスクリプトが親サイトに悪影響を及ぼすことはありますか？",
          "answer": "いいえ。厳格なsandbox属性が付与されたiframe内で動作するため、親ページのデータに干渉することは不可能です。"
        },
        {
          "question": "Google Fontsなどの外部フォントやCSSは利用できますか？",
          "answer": "はい。HTML内に通常の<link>タグを記述することで、外部Webフォントやスタイルシートを読み込めます。"
        },
        {
          "question": "作成したWebページを保存するには？",
          "answer": "ダウンロードボタンをクリックすると、HTML・CSS・JSが統合された完成版index.htmlを即座に保存できます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Virtualisation DOM en Temps Réel et Prévisualisation en Iframe Sécurisée",
      "formulaDescription": "Cet éditeur intègre un environnement de développement web (HTML, CSS, JS) injectant le code dans une <iframe> sécurisée avec sandbox=\"allow-scripts\", offrant un rendu DOM instantané sans serveur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Structurer en HTML",
          "instruction": "Rédigez les balises et conteneurs dans le panneau HTML."
        },
        {
          "stepNumber": 2,
          "title": "Mettre en forme avec CSS",
          "instruction": "Définissez les couleurs, polices et dispositions dans le panneau CSS."
        },
        {
          "stepNumber": 3,
          "title": "Ajouter du code JavaScript",
          "instruction": "Programmez les interactions et écouteurs d'événements dans le panneau JS."
        },
        {
          "stepNumber": 4,
          "title": "Visualiser et télécharger",
          "instruction": "Contrôlez le rendu en direct et téléchargez votre page sous index.html."
        }
      ],
      "workedExample": {
        "title": "Exemple de Widget Compteur Interactif",
        "scenario": "Création d'une carte avec bouton incrémentant un compteur visuel.",
        "calculation": "Bouton HTML -> Styles CSS modernes -> Script JS écoutant l'événement click.",
        "result": "Composant fonctionnel et réactif affiché immédiatement dans l'aperçu."
      },
      "faqs": [
        {
          "question": "Mon code est-il sauvegardé sur un serveur ?",
          "answer": "Non. La prévisualisation s'effectue en mémoire locale dans le moteur de rendu de votre navigateur."
        },
        {
          "question": "L'iframe peut-elle interagir avec la page principale ?",
          "answer": "Non. Le bac à sable sécurisé empêche toute interaction avec le document parent."
        },
        {
          "question": "Puis-je charger des polices comme Google Fonts ?",
          "answer": "Oui. Il suffit d'ajouter les balises <link> adéquates dans le bloc HTML."
        },
        {
          "question": "Comment exporter mon travail ?",
          "answer": "Le bouton Télécharger génère un fichier index.html autonome prêt pour l'hébergement web."
        }
      ]
    },
    "de": {
      "formulaTitle": "Echtzeit-DOM-Virtualisierung & Sandbox-Iframe-Vorschauarchitektur",
      "formulaDescription": "Der Editor bietet eine Web-Entwicklungsumgebung für HTML, CSS und JavaScript, die Quellcode direkt in einen abgesicherten <iframe> mit sandbox=\"allow-scripts\" einspeist – für verzögerungsfreie Live-Vorschauen.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "HTML-Struktur aufbauen",
          "instruction": "Definieren Sie Überschriften, Schaltflächen und Abschnitte im HTML-Bereich."
        },
        {
          "stepNumber": 2,
          "title": "Mit CSS gestalten",
          "instruction": "Wenden Sie Farben, Abstände und Flexbox-Layouts im CSS-Bereich an."
        },
        {
          "stepNumber": 3,
          "title": "JavaScript ergänzen",
          "instruction": "Integrieren Sie Event-Listener und interaktive Funktionen im JS-Bereich."
        },
        {
          "stepNumber": 4,
          "title": "Live-Vorschau prüfen & exportieren",
          "instruction": "Prüfen Sie das Ergebnis in Echtzeit und laden Sie die fertige index.html herunter."
        }
      ],
      "workedExample": {
        "title": "Beispiel für ein interaktives Zähler-Widget",
        "scenario": "Erstellung einer responsiven Karte mit Klickzähler-Funktionalität.",
        "calculation": "HTML-Elemente -> CSS-Karten-Design -> JS-Klick-Event zur Werterhöhung.",
        "result": "Voll funktionsfähige interaktive UI direkt im Browser-Vorschaufenster gerendert."
      },
      "faqs": [
        {
          "question": "Wird mein Code auf einem Server gespeichert?",
          "answer": "Nein. Das Rendering läuft komplett lokal im Arbeitsspeicher Ihres Webbrowsers."
        },
        {
          "question": "Kann das Iframe Daten der Hauptseite abrufen?",
          "answer": "Nein. Strikte Sandbox-Regeln schirmen die Vorschau vollständig von der Host-Seite ab."
        },
        {
          "question": "Können Webfonts eingebunden werden?",
          "answer": "Ja. Fügen Sie reguläre <link>-Tags für Webfonts in den HTML-Code ein."
        },
        {
          "question": "Wie speichere ich die fertige Webseite?",
          "answer": "Über die Download-Schaltfläche erhalten Sie eine vollwertige index.html zur freien Verwendung."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Virtualização DOM em Tempo Real e Pré-visualização em Iframe Isolado",
      "formulaDescription": "O editor integra um ambiente para HTML, CSS e JavaScript que projeta o código em um <iframe> isolado com sandbox=\"allow-scripts\", exibindo atualizações de tela instantaneamente no navegador.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Estruturar em HTML",
          "instruction": "Insira títulos, botões e cartões na área de edição HTML."
        },
        {
          "stepNumber": 2,
          "title": "Estilizar com CSS",
          "instruction": "Defina cores, tipografia e regras de alinhamento no painel CSS."
        },
        {
          "stepNumber": 3,
          "title": "Programar em JavaScript",
          "instruction": "Adicione manipuladores de eventos e interatividade no painel JS."
        },
        {
          "stepNumber": 4,
          "title": "Acompanhar prévia e baixar",
          "instruction": "Verifique a página no painel de visualização e salve seu index.html."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Widget Contador Interativo",
        "scenario": "Construção de um cartão visual com botão que soma cliques na tela.",
        "calculation": "Botão HTML -> Estilos CSS de cartão -> Script JS manipulando evento de clique.",
        "result": "Interface interativa renderizada em tempo real no painel de visualização."
      },
      "faqs": [
        {
          "question": "O código fica gravado em algum servidor?",
          "answer": "Não. A pré-visualização é gerada exclusivamente na memória do navegador."
        },
        {
          "question": "O iframe de teste tem acesso à página externa?",
          "answer": "Não. Ele é protegido por regras de sandbox que isolam completamente a execução."
        },
        {
          "question": "É possível vincular fontes do Google Fonts?",
          "answer": "Sim. Basta adicionar tags <link> padrão no cabeçalho HTML do código."
        },
        {
          "question": "Como baixar o projeto final?",
          "answer": "Clique no botão Baixar para obter um arquivo index.html completo e funcional."
        }
      ]
    },
    "ko": {
      "formulaTitle": "실시간 DOM 가상화 및 샌드박스 Iframe 라이브 프리뷰 구조",
      "formulaDescription": "본 에디터는 HTML, CSS, JavaScript 소스코드를 sandbox=\"allow-scripts\"가 적용된 격리된 <iframe>에 실시간 주입하여 서버 지연 없이 브라우저에서 즉각적인 반응형 웹 페이지 렌더링을 제공합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "HTML 구조 마크업",
          "instruction": "HTML 편집 창에 제목, 버튼, 컨테이너 등의 태그 요소를 작성합니다."
        },
        {
          "stepNumber": 2,
          "title": "CSS 스타일 적용",
          "instruction": "CSS 편집 창에서 색상, 폰트, Flexbox 및 Grid 레이아웃 속성을 정의합니다."
        },
        {
          "stepNumber": 3,
          "title": "JavaScript 인터랙션 추가",
          "instruction": "JS 창에서 이벤트 리스너와 동적 DOM 조작 코드를 연결합니다."
        },
        {
          "stepNumber": 4,
          "title": "실시간 프리뷰 확인 및 저장",
          "instruction": "실시간으로 렌더링되는 웹 화면을 점검하고 index.html 파일로 다운로드합니다."
        }
      ],
      "workedExample": {
        "title": "인터랙티브 카운터 위젯 제작 실전 예시",
        "scenario": "버튼을 클릭할 때마다 화면의 숫자가 1씩 증가하는 반응형 웹 컴포넌트 구현.",
        "calculation": "HTML 버튼 및 숫자 영역 -> CSS 카드 스타일 및 전환 효과 -> JS 클릭 이벤트 리스너 연동.",
        "result": "프리뷰 창에서 버튼 클릭 시 즉각 반응하는 완성도 높은 웹 인터페이스 실시간 구현."
      },
      "faqs": [
        {
          "question": "작성 중인 웹 코드가 서버에 저장되나요?",
          "answer": "아닙니다. 모든 렌더링은 브라우저 메모리 내에서 직접 수행되며 외부에 저장되지 않습니다."
        },
        {
          "question": "프리뷰 iframe이 상위 웹사이트에 영향을 줄 수 있나요?",
          "answer": "안전합니다. 엄격한 sandbox 보안 규칙이 적용되어 상위 사이트의 정보에 접근할 수 없습니다."
        },
        {
          "question": "Google Fonts 등 외부 웹폰트를 불러올 수 있나요?",
          "answer": "네. HTML 입력란에 표준 <link> 태그를 추가하여 외부 스타일시트나 폰트를 자유롭게 활용할 수 있습니다."
        },
        {
          "question": "완성된 웹페이지는 어떻게 내보내나요?",
          "answer": "다운로드 버튼을 누르면 HTML, CSS, JS가 모두 포함된 독립형 index.html 파일이 즉시 저장됩니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Virtualizzazione DOM in Tempo Reale e Anteprima in Iframe Isolato",
      "formulaDescription": "L'editor integra un ambiente per HTML, CSS e JavaScript che inietta il markup in un <iframe> protetto con sandbox=\"allow-scripts\", aggiornando il DOM in tempo reale senza server remoti.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Definire l'HTML",
          "instruction": "Inserisci titoli, contenitori e pulsanti nel pannello HTML."
        },
        {
          "stepNumber": 2,
          "title": "Applicare il CSS",
          "instruction": "Imposta stili, colori e layout flessibili nel riquadro CSS."
        },
        {
          "stepNumber": 3,
          "title": "Aggiungere JavaScript",
          "instruction": "Scrivi gli script di interazione e gestione eventi nel riquadro JS."
        },
        {
          "stepNumber": 4,
          "title": "Visualizzare e scaricare",
          "instruction": "Controlla l'anteprima istantanea e salva il codice come index.html."
        }
      ],
      "workedExample": {
        "title": "Esempio di Widget Contatore Interattivo",
        "scenario": "Creazione di un componente a scheda con pulsante che incrementa un contatore.",
        "calculation": "Elementi HTML -> Stili CSS per bordi e colori -> JS con listener sul click.",
        "result": "Interfaccia dinamica e funzionante mostrata istantaneamente nell'anteprima."
      },
      "faqs": [
        {
          "question": "Il codice viene salvato su server remoti?",
          "answer": "No. L'anteprima viene elaborata localmente dal motore di rendering del tuo browser."
        },
        {
          "question": "L'iframe può interferire con il sito ospitante?",
          "answer": "No. La protezione di isolamento sandbox blocca ogni accesso indebito."
        },
        {
          "question": "Posso includere fogli di stile e font esterni?",
          "answer": "Sì. Puoi inserire i consueti tag <link> all'interno del codice HTML."
        },
        {
          "question": "Come posso salvare il progetto?",
          "answer": "Fai clic su Scarica per ottenere un file index.html completo pronto per il web."
        }
      ]
    }
  },
  "cpp-compiler": {
    "en": {
      "formulaTitle": "In-Browser C++ Syntax Parser & Educational Execution Architecture",
      "formulaDescription": "This tool provides an in-browser code editor and intelligent syntax evaluator for C++ programming practice. It validates int main() entry structure, standard streams (std::cout, std::cin), control flow, and fundamental algorithms, delivering instant terminal feedback without requiring local g++ or clang toolchains.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Write C++ Program",
          "instruction": "Compose your C++ code containing an int main() entry function and standard libraries (#include <iostream>)."
        },
        {
          "stepNumber": 2,
          "title": "Provide Stdin Data",
          "instruction": "Input values in the Stdin box if your program reads data via std::cin."
        },
        {
          "stepNumber": 3,
          "title": "Click Run Code",
          "instruction": "Press Run Code (or Ctrl+Enter) to evaluate code syntax, variables, loops, and stream outputs."
        },
        {
          "stepNumber": 4,
          "title": "Inspect Console & Export",
          "instruction": "Review the terminal output panel and click Download to save main.cpp for your native IDE."
        }
      ],
      "workedExample": {
        "title": "Basic Arithmetic & Console Output in C++",
        "scenario": "Testing variable declarations, integer division, and output formatting with std::cout.",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b) << std::endl;",
        "result": "Terminal Output: \"Quotient: 3, Remainder: 3\" evaluated in 1ms."
      },
      "faqs": [
        {
          "question": "Does this compiler run a native g++ or clang binary on a server?",
          "answer": "No. This educational environment evaluates C++ syntax and output patterns inside your browser sandbox. Code is not sent to remote compilation servers."
        },
        {
          "question": "Why is an int main() function required?",
          "answer": "In compliance with ANSI/ISO C++ standards, every standalone C++ program requires an entry-point function named int main() from which execution begins."
        },
        {
          "question": "Are multi-file projects or Makefile builds supported?",
          "answer": "This tool is focused on single-file algorithm practice and syntax learning. For large multi-file architectures, download main.cpp to a desktop IDE."
        },
        {
          "question": "Are graphics or sound libraries (e.g., OpenGL, SFML) supported?",
          "answer": "No. The runner supports text-based console output streams only."
        }
      ]
    },
    "hi": {
      "formulaTitle": "इन-ब्राउज़र C++ सिंटैक्स पार्सर और शैक्षिक निष्पादन संरचना",
      "formulaDescription": "यह टूल C++ प्रोग्रामिंग अभ्यास के लिए ब्राउज़र-आधारित कोड एडिटर और सिंटैक्स मूल्यांकन प्रदान करता है। यह int main(), std::cout, std::cin और एल्गोरिदम को सत्यापित करके बिना स्थानीय g++ या clang कंपाइलर के त्वरित परिणाम दिखाता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "C++ कोड लिखें",
          "instruction": "एडिटर में int main() फ़ंक्शन और #include <iostream> के साथ अपना प्रोग्राम लिखें।"
        },
        {
          "stepNumber": 2,
          "title": "इनपुट (Stdin) भरें",
          "instruction": "यदि प्रोग्राम std::cin का उपयोग करता है तो Stdin बॉक्स में मान दर्ज करें।"
        },
        {
          "stepNumber": 3,
          "title": "रन कोड पर क्लिक करें",
          "instruction": "सिंटैक्स और लॉजिक जांचने के लिए रन कोड बटन या Ctrl+Enter दबाएं।"
        },
        {
          "stepNumber": 4,
          "title": "आउटपुट देखें और डाउनलोड करें",
          "instruction": "टर्मिनल में परिणाम देखें और मुख्य कोड को main.cpp फाइल के रूप में डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "बुनियादी अंकगणित और आउटपुट उदाहरण",
        "scenario": "C++ में वेरिएबल घोषणा, भागफल और शेषफल की गणना करना।",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b) << std::endl;",
        "result": "टर्मिनल आउटपुट: \"Quotient: 3, Remainder: 3\" (1ms में निष्पादित)।"
      },
      "faqs": [
        {
          "question": "क्या यह किसी सर्वर पर g++ या clang कंपाइलर चलाता है?",
          "answer": "नहीं। यह शैक्षिक वातावरण आपके ब्राउज़र के भीतर C++ सिंटैक्स और आउटपुट का मूल्यांकन करता है। कोड सर्वर पर नहीं भेजा जाता।"
        },
        {
          "question": "int main() फ़ंक्शन की आवश्यकता क्यों है?",
          "answer": "ISO C++ मानकों के अनुसार, प्रत्येक स्टैंडअलोन C++ प्रोग्राम को शुरू करने के लिए int main() मुख्य प्रविष्टि फ़ंक्शन होना अनिवार्य है।"
        },
        {
          "question": "क्या मल्टी-फाइल प्रोजेक्ट समर्थित हैं?",
          "answer": "यह टूल सिंगल-फाइल एल्गोरिदम अभ्यास के लिए बनाया गया है। बड़े प्रोजेक्ट्स के लिए आप कोड डाउनलोड करके स्थानीय IDE में उपयोग कर सकते हैं।"
        },
        {
          "question": "क्या ग्राफिक्स या गेम लाइब्रेरी समर्थित हैं?",
          "answer": "नहीं। यह टूल केवल टेक्स्ट-आधारित कंसोल इनपुट और आउटपुट का समर्थन करता है।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Analizador de Sintaxis C++ en Navegador y Arquitectura Educativa",
      "formulaDescription": "Esta herramienta proporciona un editor y analizador sintáctico de C++ para aprendizaje. Valida la función int main(), flujos estándar (std::cout, std::cin) y algoritmos básicos sin requerir g++ ni clang locales.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escribir programa en C++",
          "instruction": "Redacte su código incluyendo la función int main() y las librerías necesarias."
        },
        {
          "stepNumber": 2,
          "title": "Introducir datos en Stdin",
          "instruction": "Añada valores en el cuadro Stdin si utiliza lecturas con std::cin."
        },
        {
          "stepNumber": 3,
          "title": "Ejecutar código",
          "instruction": "Pulse Run Code o Ctrl+Intro para evaluar la sintaxis y salidas por consola."
        },
        {
          "stepNumber": 4,
          "title": "Comprobar resultado y descargar",
          "instruction": "Examine el terminal y descargue su archivo como main.cpp."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Aritmética Básica en C++",
        "scenario": "Verificar operaciones de división entera y módulo con std::cout.",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b);",
        "result": "Salida de consola: \"Quotient: 3, Remainder: 3\"."
      },
      "faqs": [
        {
          "question": "¿Ejecuta un binario g++ o clang en servidores remotos?",
          "answer": "No. Es un entorno educativo que analiza la sintaxis y salidas dentro del navegador sin enviar código a la nube."
        },
        {
          "question": "¿Por qué es indispensable la función int main()?",
          "answer": "Siguiendo el estándar ANSI C++, la ejecución de todo programa independiente comienza en la función int main()."
        },
        {
          "question": "¿Se admiten proyectos de múltiples archivos?",
          "answer": "Está diseñado para practicar algoritmos en un solo archivo. Puede descargar el código fuente para proyectos mayores."
        },
        {
          "question": "¿Soporta librerías gráficas como OpenGL?",
          "answer": "No. El soporte está enfocado en salidas de terminal de texto estándar."
        }
      ]
    },
    "ja": {
      "formulaTitle": "ブラウザ内C++構文解析および学習用実行エンジン構造",
      "formulaDescription": "本ツールは、C++の構文やアルゴリズム学習をブラウザ上で即座に実践できる学習用実行環境です。int main()エントリー関数、std::cout/cin入出力、制御構文を検証し、ローカル環境の構築なしでターミナル結果を確認できます。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "C++コードの作成",
          "instruction": "int main()関数および#include <iostream>を含むC++コードを記述します。"
        },
        {
          "stepNumber": 2,
          "title": "標準入力（Stdin）の入力",
          "instruction": "std::cinによるデータ入力を行う場合は、Stdin欄に必要な値を記載します。"
        },
        {
          "stepNumber": 3,
          "title": "実行ボタンのクリック",
          "instruction": "Run CodeまたはCtrl+Enterキーで構文と出力を解析し実行結果を取得します。"
        },
        {
          "stepNumber": 4,
          "title": "結果の確認とエクスポート",
          "instruction": "ターミナル画面で出力結果を確認し、main.cppとしてダウンロードします。"
        }
      ],
      "workedExample": {
        "title": "基本演算と標準出力（std::cout）の実例",
        "scenario": "整数除算と剰余算を計算し、std::coutでコンソールに出力する例。",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b) << std::endl;",
        "result": "ターミナル出力: 「Quotient: 3, Remainder: 3」即座に正しく表示。"
      },
      "faqs": [
        {
          "question": "リモートサーバー上でネイティブのg++やclangが動作していますか？",
          "answer": "いいえ。本ツールは学習用のブラウザ完結型構文エンジンを採用しており、コードが外部サーバーに送信されることはありません。"
        },
        {
          "question": "なぜint main()関数が必須なのですか？",
          "answer": "ISO C++規格に準拠し、すべての独立したC++プログラムの実行起点としてint main()が定義されている必要があるためです。"
        },
        {
          "question": "複数ファイルのプロジェクトやMakefileに対応していますか？",
          "answer": "単一ファイルでのアルゴリズム学習を目的としています。大規模プロジェクトにはソースコードを保存してローカルIDEをご利用ください。"
        },
        {
          "question": "OpenGLなどのグラフィック描画に対応していますか？",
          "answer": "いいえ。テキストベースの標準入出力コンソールに特化した仕様となっています。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Analyseur de Syntaxe C++ en Navigateur et Moteur Éducatif",
      "formulaDescription": "Cet outil propose un éditeur et analyseur syntaxique C++ pour l'apprentissage. Il valide la fonction int main(), les flux std::cout/cin et les algorithmes sans nécessiter de chaîne g++ ou clang locale.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Rédiger le code C++",
          "instruction": "Écrivez votre code avec la fonction int main() et les en-têtes nécessaires."
        },
        {
          "stepNumber": 2,
          "title": "Remplir le champ Stdin",
          "instruction": "Indiquez les données d'entrée si votre programme fait appel à std::cin."
        },
        {
          "stepNumber": 3,
          "title": "Lancer l'analyse",
          "instruction": "Cliquez sur Run Code ou faites Ctrl+Entrée pour afficher la sortie console."
        },
        {
          "stepNumber": 4,
          "title": "Consulter et sauvegarder",
          "instruction": "Vérifiez la console et téléchargez le fichier source au format main.cpp."
        }
      ],
      "workedExample": {
        "title": "Exemple d'Opérations Arithmétiques en C++",
        "scenario": "Calcul de la division entière et du reste avec affichage std::cout.",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b) << std::endl;",
        "result": "Sortie terminal : \"Quotient: 3, Remainder: 3\"."
      },
      "faqs": [
        {
          "question": "Le code est-il compilé par un serveur distant g++ ?",
          "answer": "Non. Cet environnement pédagogique analyse la syntaxe directement dans votre navigateur sans transfert de données."
        },
        {
          "question": "Pourquoi la fonction int main() est-elle obligatoire ?",
          "answer": "Selon les normes C++, le point d'entrée de tout programme exécutable autonome doit être la fonction int main()."
        },
        {
          "question": "Les projets multifichiers sont-ils pris en charge ?",
          "answer": "L'outil est optimisé pour l'apprentissage sur un fichier unique. Téléchargez main.cpp pour vos projets plus complexes."
        },
        {
          "question": "Les bibliothèques graphiques sont-elles supportées ?",
          "answer": "Non. L'outil prend en charge uniquement les flux texte de la console standard."
        }
      ]
    },
    "de": {
      "formulaTitle": "In-Browser C++ Syntax-Parser & Didaktische Ausführungsarchitektur",
      "formulaDescription": "Dieses Werkzeug bietet einen C++-Editor mit intelligenter Syntaxprüfung für Lernzwecke. Es überprüft int main(), Datenströme (std::cout, std::cin) und Kontrollstrukturen ohne lokale g++-Installation.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "C++-Quelltext schreiben",
          "instruction": "Schreiben Sie Ihr C++-Programm mit int main() und #include <iostream>."
        },
        {
          "stepNumber": 2,
          "title": "Stdin-Werte angeben",
          "instruction": "Füllen Sie das Stdin-Feld aus, falls das Programm std::cin verwendet."
        },
        {
          "stepNumber": 3,
          "title": "Code ausführen",
          "instruction": "Klicken Sie auf Run Code oder drücken Sie Strg+Enter zur Syntaxauswertung."
        },
        {
          "stepNumber": 4,
          "title": "Ausgabe prüfen & herunterladen",
          "instruction": "Sehen Sie das Terminal-Ergebnis ein und laden Sie main.cpp herunter."
        }
      ],
      "workedExample": {
        "title": "Beispiel für Arithmetik in C++",
        "scenario": "Berechnung von Quotient und Rest bei ganzzahliger Division.",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b) << std::endl;",
        "result": "Terminalausgabe: \"Quotient: 3, Remainder: 3\"."
      },
      "faqs": [
        {
          "question": "Läuft ein nativer g++-Compiler auf einem Server?",
          "answer": "Nein. Diese didaktische Umgebung wertet die C++-Syntax direkt im Browser-Sandbox-Modus aus."
        },
        {
          "question": "Warum ist int main() zwingend erforderlich?",
          "answer": "Gemäß ISO-C++-Standard beginnt die Ausführung jedes eigenständigen Programms an der Einstiegsfunktion int main()."
        },
        {
          "question": "Werden Multi-File-Projekte unterstützt?",
          "answer": "Das Werkzeug ist auf Einzelseiten-Algorithmen und Syntaxübungen ausgelegt."
        },
        {
          "question": "Funktionieren Grafik-Bibliotheken wie OpenGL?",
          "answer": "Nein. Der Terminalbereich unterstützt reine Textausgaben."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Analisador de Sintaxe C++ no Navegador e Motor Educativo",
      "formulaDescription": "Esta ferramenta oferece um editor e validador de sintaxe C++ para fins educativos. Analisa int main(), fluxos padrão (std::cout, std::cin) e algoritmos sem exigir instalação local de g++ ou clang.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escrever código C++",
          "instruction": "Crie seu programa contendo a função int main() e bibliotecas padrão."
        },
        {
          "stepNumber": 2,
          "title": "Inserir dados no Stdin",
          "instruction": "Preencha o campo Stdin se o programa utilizar comandos std::cin."
        },
        {
          "stepNumber": 3,
          "title": "Executar programa",
          "instruction": "Clique em Run Code ou use Ctrl+Enter para testar a lógica do algoritmo."
        },
        {
          "stepNumber": 4,
          "title": "Examinar console e salvar",
          "instruction": "Confira as linhas no terminal e baixe o código fonte como main.cpp."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Operações Aritméticas em C++",
        "scenario": "Verificação de divisão inteira e resto usando std::cout.",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b) << std::endl;",
        "result": "Console: \"Quotient: 3, Remainder: 3\"."
      },
      "faqs": [
        {
          "question": "O código é compilado por g++ em servidores externos?",
          "answer": "Não. Trata-se de um ambiente educativo que avalia a sintaxe C++ localmente no navegador."
        },
        {
          "question": "Por que a função int main() é obrigatória?",
          "answer": "Pelo padrão oficial do C++, todo programa executável independente tem início na função int main()."
        },
        {
          "question": "Projetos com múltiplos arquivos são suportados?",
          "answer": "A ferramenta é voltada para estudo de algoritmos em arquivo único. Salve o arquivo para projetos avançados."
        },
        {
          "question": "Bibliotecas gráficas ou de áudio funcionam?",
          "answer": "Não. O sistema processa apenas streams de texto padrão de console."
        }
      ]
    },
    "ko": {
      "formulaTitle": "브라우저 내 C++ 구문 파서 및 학습용 코드 실행 구조",
      "formulaDescription": "본 도구는 C++ 학습을 위한 브라우저 코드 에디터 및 구문 분석 엔진입니다. int main() 진입점, std::cout/cin 표준 입출력, 제어문 및 알고리즘을 검증하여 로컬 컴파일러 설치 없이 즉각적인 학습 환경을 제공합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "C++ 프로그램 작성",
          "instruction": "int main() 진입 함수와 #include <iostream>을 포함한 C++ 코드를 작성합니다."
        },
        {
          "stepNumber": 2,
          "title": "표준 입력(Stdin) 작성",
          "instruction": "std::cin을 통해 입력을 받는 코드인 경우 Stdin 입력란에 값을 기입합니다."
        },
        {
          "stepNumber": 3,
          "title": "코드 실행",
          "instruction": "Run Code 버튼 또는 Ctrl+Enter를 눌러 구문 검증 및 출력을 수행합니다."
        },
        {
          "stepNumber": 4,
          "title": "결과 확인 및 파일 저장",
          "instruction": "터미널 결과를 점검하고 Download 버튼을 눌러 main.cpp 파일로 저장합니다."
        }
      ],
      "workedExample": {
        "title": "C++ 기초 산술 연산 및 표준 출력 실전 예시",
        "scenario": "정수 나눗셈과 나머지 연산을 수행하고 std::cout으로 콘솔에 출력.",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b) << std::endl;",
        "result": "터미널 출력: \"Quotient: 3, Remainder: 3\" (즉각 연산 완료)."
      },
      "faqs": [
        {
          "question": "서버에서 실제 g++이나 clang 컴파일러가 동작하나요?",
          "answer": "아닙니다. 본 도구는 학습 목적으로 브라우저 내부에서 C++ 구문과 출력 패턴을 분석하는 로컬 환경입니다."
        },
        {
          "question": "int main() 함수가 반드시 필요한 이유는 무엇인가요?",
          "answer": "표준 C++ 규격에 따라 독립된 모든 C++ 실행 프로그램의 시작 지점은 int main()이어야 하기 때문입니다."
        },
        {
          "question": "여러 개의 소스 파일로 구성된 프로젝트도 빌드할 수 있나요?",
          "answer": "본 도구는 단일 파일 알고리즘 실습에 최적화되어 있습니다. 대규모 프로젝트는 main.cpp를 다운로드하여 로컬 IDE에서 사용하세요."
        },
        {
          "question": "OpenGL 등 그래픽 라이브러리를 사용할 수 있나요?",
          "answer": "아닙니다. 텍스트 기반 표준 입출력 콘솔만을 지원합니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Parser Sintattico C++ nel Browser e Motore di Esecuzione Didattico",
      "formulaDescription": "Questo strumento fornisce un editor e analizzatore sintattico C++ per lo studio del codice. Verifica int main(), flussi std::cout/cin e strutture di controllo senza bisogno di toolchain g++ locali.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scrivere il codice C++",
          "instruction": "Componi il programma con la funzione int main() e l'inclusione di <iostream>."
        },
        {
          "stepNumber": 2,
          "title": "Compilare il campo Stdin",
          "instruction": "Inserisci i dati in Stdin se il codice richiede valori con std::cin."
        },
        {
          "stepNumber": 3,
          "title": "Avviare la simulazione",
          "instruction": "Premi Run Code o Ctrl+Invio per verificare la sintassi e la console."
        },
        {
          "stepNumber": 4,
          "title": "Leggere l'output e scaricare",
          "instruction": "Ispeziona i risultati e salva il file sorgente come main.cpp."
        }
      ],
      "workedExample": {
        "title": "Esempio di Calcolo Aritmetico in C++",
        "scenario": "Verifica di quoziente e resto in divisione intera con std::cout.",
        "calculation": "int a = 15, b = 4; std::cout << \"Quotient: \" << (a / b) << \", Remainder: \" << (a % b) << std::endl;",
        "result": "Output console: \"Quotient: 3, Remainder: 3\"."
      },
      "faqs": [
        {
          "question": "Il codice viene inviato a un server g++ esterno?",
          "answer": "No. È un simulatore didattico che verifica la sintassi C++ interamente nel browser."
        },
        {
          "question": "Perché la funzione int main() è necessaria?",
          "answer": "Secondo le specifiche C++, l'avvio di qualsiasi programma standalone richiede la funzione int main()."
        },
        {
          "question": "I progetti su più file sono supportati?",
          "answer": "L'ambiente è ottimizzato per esercizi e algoritmi a singolo file."
        },
        {
          "question": "Posso usare librerie grafiche?",
          "answer": "No. Sono supportati esclusivamente i flussi di testo della console standard."
        }
      ]
    }
  },
  "java-compiler": {
    "en": {
      "formulaTitle": "In-Browser Java Class Structure & Object-Oriented Syntax Analysis",
      "formulaDescription": "The Java compiler tool provides an interactive browser-based learning environment for Java syntax. It validates class declarations, the public static void main(String[] args) entry point, System.out.println output streams, loops, and OOP constructs without requiring a local JDK installation.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Define Main Class",
          "instruction": "Declare a public class containing public static void main(String[] args) as the entry point."
        },
        {
          "stepNumber": 2,
          "title": "Add Logic & Variables",
          "instruction": "Write variables, loops, methods, and System.out.println() statements."
        },
        {
          "stepNumber": 3,
          "title": "Execute Code",
          "instruction": "Click Run Code or press Ctrl+Enter to evaluate syntax and execute instructions locally."
        },
        {
          "stepNumber": 4,
          "title": "View Output & Download",
          "instruction": "Inspect the terminal output console and click Download to save Main.java."
        }
      ],
      "workedExample": {
        "title": "Java Array Processing & Statistics Example",
        "scenario": "Computing maximum value and sum from an array of integers in Java.",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56; System.out.println(\"Sum: \" + sum + \", Max: \" + max);",
        "result": "Terminal Output: \"Sum: 56, Max: 25\" evaluated in 1ms."
      },
      "faqs": [
        {
          "question": "Is a full Java Virtual Machine (JVM) running on your server?",
          "answer": "No. This educational tool processes and evaluates Java syntax inside your browser sandbox. No code is transmitted to cloud servers."
        },
        {
          "question": "What filename should be used when downloading Java code?",
          "answer": "In Java, the public class name must match the source filename. For public class Main, download the file as Main.java."
        },
        {
          "question": "Can I import external third-party JARs (e.g., Spring or Hibernate)?",
          "answer": "No. The runner supports core Java language constructs and basic standard libraries. Enterprise frameworks require a local IDE."
        },
        {
          "question": "Does this tool support Java packages?",
          "answer": "Yes, package declarations are recognized, but for quick single-file practice, the default package is recommended."
        }
      ]
    },
    "hi": {
      "formulaTitle": "इन-ब्राउज़र जावा क्लास संरचना और ऑब्जेक्ट-ओरिएंटेड सिंटैक्स विश्लेषण",
      "formulaDescription": "यह जावा टूल जावा सिंटैक्स सीखने के लिए एक इंटरएक्टिव इन-ब्राउज़र वातावरण प्रदान करता है। यह क्लास घोषणा, public static void main विधि, System.out.println और लूप्स को बिना स्थानीय JDK इंस्टॉल किए सत्यापित करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "मुख्य क्लास बनाएं",
          "instruction": "public static void main(String[] args) वाली एक पब्लिक क्लास परिभाषित करें।"
        },
        {
          "stepNumber": 2,
          "title": "लॉजिक और वेरिएबल्स जोड़ें",
          "instruction": "वेरिएबल्स, लूप्स और System.out.println() स्टेटमेंट लिखें।"
        },
        {
          "stepNumber": 3,
          "title": "कोड निष्पादित करें",
          "instruction": "रन कोड बटन दबाएं या Ctrl+Enter दबाकर स्थानीय रूप से कोड चलाएं।"
        },
        {
          "stepNumber": 4,
          "title": "आउटपुट देखें और डाउनलोड करें",
          "instruction": "कंसोल में परिणाम देखें और कोड को Main.java के रूप में डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "जावा एरे प्रोसेसिंग उदाहरण",
        "scenario": "जावा में पूर्णांक एरे का योग और अधिकतम मान निकालना।",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56;",
        "result": "टर्मिनल आउटपुट: \"Sum: 56, Max: 25\" (1ms में निष्पादित)।"
      },
      "faqs": [
        {
          "question": "क्या आपके सर्वर पर पूरा जावा वर्चुअल मशीन (JVM) चल रहा है?",
          "answer": "नहीं। यह शैक्षिक टूल आपके ब्राउज़र के भीतर जावा सिंटैक्स का मूल्यांकन करता है। कोड सर्वर पर नहीं भेजा जाता।"
        },
        {
          "question": "जावा कोड डाउनलोड करते समय फाइल का नाम क्या होना चाहिए?",
          "answer": "जावा में पब्लिक क्लास का नाम फाइल के नाम से मेल खाना चाहिए। जैसे public class Main के लिए फाइल का नाम Main.java होगा।"
        },
        {
          "question": "क्या बाहरी JAR लाइब्रेरी (जैसे Spring) जोड़ी जा सकती हैं?",
          "answer": "नहीं। यह टूल कोर जावा सिंटैक्स के लिए है। बड़े फ्रेमवर्क के लिए स्थानीय IDE का उपयोग करें।"
        },
        {
          "question": "क्या पैकेज घोषणा (package declaration) समर्थित है?",
          "answer": "हाँ, लेकिन त्वरित अभ्यास के लिए बिना पैकेज के डिफॉल्ट पैकेज में कोड लिखना सबसे आसान है।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Estructura de Clases Java y Análisis Sintáctico Orientado a Objetos",
      "formulaDescription": "Esta herramienta proporciona un entorno interactivo para practicar Java en el navegador. Valida clases, el método public static void main(String[] args) y salidas System.out.println sin necesidad de instalar un JDK.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Definir la clase principal",
          "instruction": "Declare una clase con el método public static void main(String[] args)."
        },
        {
          "stepNumber": 2,
          "title": "Escribir lógica y variables",
          "instruction": "Añada variables, bucles y sentencias System.out.println()."
        },
        {
          "stepNumber": 3,
          "title": "Ejecutar programa",
          "instruction": "Pulse Run Code o Ctrl+Intro para evaluar la lógica en el navegador."
        },
        {
          "stepNumber": 4,
          "title": "Revisar consola y descargar",
          "instruction": "Examine la salida de terminal y guarde el código como Main.java."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Búsqueda de Máximo en Java",
        "scenario": "Determinar la suma y el valor máximo de un array de enteros.",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56;",
        "result": "Salida de consola: \"Sum: 56, Max: 25\"."
      },
      "faqs": [
        {
          "question": "¿Se ejecuta una JVM completa en servidores remotos?",
          "answer": "No. El analizador evalúa el código dentro del navegador sin conexión a servidores en la nube."
        },
        {
          "question": "¿Qué nombre debe tener el archivo descargado?",
          "answer": "En Java, el nombre de la clase pública debe coincidir con el archivo. Para public class Main, use Main.java."
        },
        {
          "question": "¿Se pueden importar paquetes JAR externos?",
          "answer": "No. Soporta la sintaxis y tipos estándar de Java. Proyectos empresariales requieren un IDE como IntelliJ o Eclipse."
        },
        {
          "question": "¿Es compatible con declaraciones de paquetes?",
          "answer": "Sí, pero para pruebas rápidas es preferible trabajar en el paquete predeterminado."
        }
      ]
    },
    "ja": {
      "formulaTitle": "ブラウザ内Javaクラス構造およびオブジェクト指向構文解析構造",
      "formulaDescription": "本ツールは、JDKをPCにインストールすることなくJavaの構文やクラス構造を学習できるブラウザ環境です。public static void main(String[] args)エントリーポイント、System.out.println出力、オブジェクト指向構文を検証します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "メインクラスの宣言",
          "instruction": "public static void main(String[] args)を持つクラスを定義します。"
        },
        {
          "stepNumber": 2,
          "title": "ロジックの記述",
          "instruction": "変数、反復処理（for/while）、System.out.println()呼び出しを記述します。"
        },
        {
          "stepNumber": 3,
          "title": "コードの実行",
          "instruction": "Run CodeまたはCtrl+Enterキーで構文を解析し結果を表示します。"
        },
        {
          "stepNumber": 4,
          "title": "結果確認とダウンロード",
          "instruction": "ターミナル出力欄で動作を確認し、Main.javaとして保存します。"
        }
      ],
      "workedExample": {
        "title": "Java配列集計と最大値探索の実例",
        "scenario": "整数配列から合計値と最大値を計算して表示する例。",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56;",
        "result": "ターミナル出力: 「Sum: 56, Max: 25」正確に算出。"
      },
      "faqs": [
        {
          "question": "サーバー上で本格的なJVM（Java仮想マシン）が起動していますか？",
          "answer": "いいえ。本ツールはブラウザ内部で構文と出力を評価する学習用エンジンであり、コードがサーバーに送信されることはありません。"
        },
        {
          "question": "ダウンロード時のファイル名に関する注意点は？",
          "answer": "Javaの規約上、publicクラス名とファイル名は一致する必要があります（public class MainならMain.java）。"
        },
        {
          "question": "外部のJARライブラリ（Spring等）をインポートできますか？",
          "answer": "いいえ。標準的なJava構文とアルゴリズム学習に特化しています。"
        },
        {
          "question": "パッケージ宣言は利用可能ですか？",
          "answer": "はい。ただし手軽な単一ファイルの学習ではデフォルトパッケージでの記述をおすすめします。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Structure de Classes Java et Analyse Syntaxique Objet en Navigateur",
      "formulaDescription": "Cet outil propose un environnement d'apprentissage interactif pour Java dans le navigateur. Il valide la déclaration des classes, la méthode main() et System.out.println sans nécessiter de JDK local.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Déclarer la classe principale",
          "instruction": "Créez une classe contenant la méthode public static void main(String[] args)."
        },
        {
          "stepNumber": 2,
          "title": "Ajouter la logique métier",
          "instruction": "Insérez vos variables, boucles et instructions System.out.println()."
        },
        {
          "stepNumber": 3,
          "title": "Lancer l'exécution",
          "instruction": "Cliquez sur Run Code ou faites Ctrl+Entrée pour voir le résultat."
        },
        {
          "stepNumber": 4,
          "title": "Consulter et exporter",
          "instruction": "Vérifiez la console et téléchargez le fichier source sous Main.java."
        }
      ],
      "workedExample": {
        "title": "Exemple de Traitement de Tableau en Java",
        "scenario": "Calcul de la somme et de la valeur maximale d'un tableau d'entiers.",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56;",
        "result": "Sortie terminal : \"Sum: 56, Max: 25\"."
      },
      "faqs": [
        {
          "question": "Une JVM complète tourne-t-elle sur vos serveurs ?",
          "answer": "Non. Cet outil pédagogique évalue le code localement dans le navigateur sans transmission sur le cloud."
        },
        {
          "question": "Quel nom donner au fichier téléchargé ?",
          "answer": "En Java, le nom de la classe publique doit correspondre au fichier : Main.java pour public class Main."
        },
        {
          "question": "Peut-on utiliser des bibliothèques JAR externes ?",
          "answer": "Non. L'outil est dédié aux fondamentaux du langage Java et aux algorithmes classiques."
        },
        {
          "question": "Les déclarations de package sont-elles gérées ?",
          "answer": "Oui, mais le package par défaut est conseillé pour les exercices rapides."
        }
      ]
    },
    "de": {
      "formulaTitle": "In-Browser Java-Klassenstruktur & Objektorientierte Syntaxprüfung",
      "formulaDescription": "Das Tool ermöglicht das Üben von Java-Programmcode direkt im Browser. Es überprüft Klassendefinitionen, die main()-Methode und System.out.println-Ausgaben ohne lokale JDK-Installation.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Hauptklasse definieren",
          "instruction": "Deklarieren Sie eine Klasse mit public static void main(String[] args)."
        },
        {
          "stepNumber": 2,
          "title": "Logik einfügen",
          "instruction": "Fügen Sie Variablen, Schleifen und System.out.println()-Befehle ein."
        },
        {
          "stepNumber": 3,
          "title": "Code starten",
          "instruction": "Klicken Sie auf Run Code oder drücken Sie Strg+Enter zur Auswertung."
        },
        {
          "stepNumber": 4,
          "title": "Ergebnis prüfen & speichern",
          "instruction": "Sehen Sie das Ergebnis im Terminal und laden Sie Main.java herunter."
        }
      ],
      "workedExample": {
        "title": "Beispiel für Array-Verarbeitung in Java",
        "scenario": "Ermittlung von Summe und Maximalwert eines Integer-Arrays.",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56;",
        "result": "Terminalausgabe: \"Sum: 56, Max: 25\"."
      },
      "faqs": [
        {
          "question": "Läuft eine vollständige JVM auf dem Server?",
          "answer": "Nein. Das Lernwerkzeug analysiert den Code lokal im Browser ohne Serververbindung."
        },
        {
          "question": "Welcher Dateiname muss beim Download gewählt werden?",
          "answer": "In Java muss der Name der öffentlichen Klasse mit dem Dateinamen übereinstimmen (Main.java für public class Main)."
        },
        {
          "question": "Können externe JARs eingebunden werden?",
          "answer": "Nein. Das Tool konzentriert sich auf die Java-Grundlagen und Standardbibliotheken."
        },
        {
          "question": "Funktionieren Package-Deklarationen?",
          "answer": "Ja, für schnelle Tests empfiehlt sich jedoch das Standard-Package."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Estrutura de Classes Java e Análise Sintática Orientada a Objetos",
      "formulaDescription": "Esta ferramenta oferece um ambiente para praticar sintaxe Java no navegador. Valida declarações de classes, o método main() e saídas System.out.println sem precisar instalar o JDK.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Declarar classe principal",
          "instruction": "Crie uma classe contendo o método public static void main(String[] args)."
        },
        {
          "stepNumber": 2,
          "title": "Programar lógica",
          "instruction": "Insira variáveis, laços de repetição e System.out.println()."
        },
        {
          "stepNumber": 3,
          "title": "Executar código",
          "instruction": "Clique em Run Code ou use Ctrl+Enter para testar o código no navegador."
        },
        {
          "stepNumber": 4,
          "title": "Conferir terminal e baixar",
          "instruction": "Analise o resultado e baixe o arquivo fonte como Main.java."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Processamento de Vetor em Java",
        "scenario": "Cálculo de soma e valor máximo de uma lista de números inteiros.",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56;",
        "result": "Console: \"Sum: 56, Max: 25\"."
      },
      "faqs": [
        {
          "question": "Existe uma máquina virtual JVM rodando no servidor?",
          "answer": "Não. Este ambiente educativo avalia o código diretamente no navegador com total privacidade."
        },
        {
          "question": "Qual o nome correto para salvar o arquivo?",
          "answer": "Em Java, o nome da classe pública deve ser o nome do arquivo (ex.: Main.java para public class Main)."
        },
        {
          "question": "É possível carregar arquivos JAR de terceiros?",
          "answer": "Não. O suporte abrange apenas os recursos fundamentais e bibliotecas padrão da linguagem."
        },
        {
          "question": "Declarações de pacote são aceitas?",
          "answer": "Sim, mas para exercícios rápidos recomenda-se o pacote padrão sem declaração."
        }
      ]
    },
    "ko": {
      "formulaTitle": "브라우저 내 Java 클래스 구조 및 객체 지향 문법 분석 엔진",
      "formulaDescription": "본 Java 도구는 JDK 설치 없이 브라우저에서 Java 문법과 클래스 구조를 실습할 수 있는 학습 환경입니다. public static void main(String[] args) 메서드, System.out.println 출력 및 객체 지향 원리를 검증합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "메인 클래스 선언",
          "instruction": "public static void main(String[] args) 메서드가 포함된 클래스를 작성합니다."
        },
        {
          "stepNumber": 2,
          "title": "변수 및 로직 작성",
          "instruction": "변수 선언, 반복문, System.out.println() 출력 명령을 구성합니다."
        },
        {
          "stepNumber": 3,
          "title": "코드 실행",
          "instruction": "Run Code 버튼 또는 Ctrl+Enter를 눌러 브라우저 로컬에서 즉시 실행합니다."
        },
        {
          "stepNumber": 4,
          "title": "콘솔 확인 및 저장",
          "instruction": "터미널 결과를 확인하고 Download 버튼을 눌러 Main.java로 저장합니다."
        }
      ],
      "workedExample": {
        "title": "Java 배열 처리 및 최댓값 탐색 실전 예시",
        "scenario": "정수 배열에서 원소들의 총합과 최댓값을 구하여 출력.",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56;",
        "result": "터미널 출력: \"Sum: 56, Max: 25\" (1ms 소요)."
      },
      "faqs": [
        {
          "question": "서버에서 실제 Java 가상 머신(JVM)이 구동되나요?",
          "answer": "아닙니다. 본 교육용 도구는 브라우저 내부에서 Java 문법을 분석하고 결과를 에뮬레이트하는 로컬 엔진입니다."
        },
        {
          "question": "다운로드할 소스 파일 이름 규칙은 무엇인가요?",
          "answer": "Java 표준 규칙에 따라 public 클래스명과 파일명이 같아야 하므로 public class Main은 Main.java로 저장해야 합니다."
        },
        {
          "question": "외부 JAR 라이브러리(Spring 등)를 불러올 수 있나요?",
          "answer": "아닙니다. 단일 파일 기반 Java 기초 문법 및 알고리즘 학습에 최적화되어 있습니다."
        },
        {
          "question": "패키지(package) 선언이 가능한가요?",
          "answer": "네. 다만 빠른 단일 파일 실습을 위해서는 기본(default) 패키지 사용을 권장합니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Struttura delle Classi Java e Analisi Sintattica a Oggetti nel Browser",
      "formulaDescription": "Questo strumento offre un ambiente per esercitarsi con la sintassi Java nel browser. Verifica classi, il metodo main() e System.out.println senza richiedere l'installazione del JDK.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Dichiarare la classe",
          "instruction": "Crea una classe con public static void main(String[] args)."
        },
        {
          "stepNumber": 2,
          "title": "Scrivere la logica",
          "instruction": "Aggiungi variabili, cicli e istruzioni System.out.println()."
        },
        {
          "stepNumber": 3,
          "title": "Eseguire il programma",
          "instruction": "Fai clic su Run Code o premi Ctrl+Invio per visualizzare l'output."
        },
        {
          "stepNumber": 4,
          "title": "Leggere la console e salvare",
          "instruction": "Controlla i risultati a video e scarica il file Main.java."
        }
      ],
      "workedExample": {
        "title": "Esempio di Elaborazione Vettore in Java",
        "scenario": "Calcolo di totale e valore massimo in un array di numeri interi.",
        "calculation": "int[] nums = {4, 12, 8, 25, 7}; int max = 25, sum = 56;",
        "result": "Console: \"Sum: 56, Max: 25\"."
      },
      "faqs": [
        {
          "question": "Viene avviata una vera JVM su server remoti?",
          "answer": "No. Il codice viene verificato in un ambiente didattico isolato all'interno del tuo browser."
        },
        {
          "question": "Come deve essere nominato il file sorgente?",
          "answer": "In Java il nome della classe pubblica deve coincidere con il file (Main.java per public class Main)."
        },
        {
          "question": "Si possono caricare librerie esterne JAR?",
          "answer": "No. È pensato per l'apprendimento dei fondamenti della sintassi e della logica Java."
        },
        {
          "question": "I package Java sono supportati?",
          "answer": "Sì, ma per prove rapide è preferibile il package predefinito."
        }
      ]
    }
  },
  "csharp-compiler": {
    "en": {
      "formulaTitle": "In-Browser C# .NET Syntax Analysis & Execution Architecture",
      "formulaDescription": "The C# compiler tool enables quick in-browser practice of .NET C# language constructs. It verifies Program class declarations, static void Main() entry points, Console.WriteLine streams, control flow, and data structures without requiring Visual Studio or the .NET SDK.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Compose C# Code",
          "instruction": "Write your C# code with a class containing static void Main(string[] args)."
        },
        {
          "stepNumber": 2,
          "title": "Add Console Output",
          "instruction": "Use Console.WriteLine() to inspect results and format strings."
        },
        {
          "stepNumber": 3,
          "title": "Run Code",
          "instruction": "Click Run Code or press Ctrl+Enter to evaluate syntax and execution flow."
        },
        {
          "stepNumber": 4,
          "title": "Inspect & Download",
          "instruction": "Review the output console and click Download to save Program.cs."
        }
      ],
      "workedExample": {
        "title": "C# String Interpolation & Loop Example",
        "scenario": "Formatting temperature conversions using string interpolation and loops in C#.",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "Terminal Output: \"C: 0 -> F: 32\nC: 10 -> F: 50\nC: 20 -> F: 68\" evaluated in 1ms."
      },
      "faqs": [
        {
          "question": "Does this tool compile native CLR binaries on a cloud server?",
          "answer": "No. This educational environment evaluates C# syntax patterns locally within your browser sandbox. Code never leaves your machine."
        },
        {
          "question": "Are modern C# features like string interpolation and LINQ supported?",
          "answer": "Yes. Standard string interpolation ($\"\"), classes, loops, and core algorithm constructs are recognized and evaluated."
        },
        {
          "question": "Can I build Windows Forms or WPF desktop applications here?",
          "answer": "No. This runner is designed for console applications and algorithmic logic only."
        },
        {
          "question": "What filename is standard when downloading C# code?",
          "answer": "The standard entry file in .NET console applications is named Program.cs."
        }
      ]
    },
    "hi": {
      "formulaTitle": "इन-ब्राउज़र C# .NET सिंटैक्स विश्लेषण और निष्पादन संरचना",
      "formulaDescription": "यह C# कंपाइलर टूल ब्राउज़र में .NET C# भाषा का अभ्यास करने की सुविधा देता है। यह Program क्लास, static void Main(), Console.WriteLine और डेटा संरचनाओं को बिना .NET SDK के स्थानीय रूप से जांचता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "C# कोड लिखें",
          "instruction": "static void Main(string[] args) वाली क्लास के साथ अपना C# प्रोग्राम लिखें।"
        },
        {
          "stepNumber": 2,
          "title": "आउटपुट स्टेटमेंट जोड़ें",
          "instruction": "परिणाम देखने के लिए Console.WriteLine() का उपयोग करें।"
        },
        {
          "stepNumber": 3,
          "title": "कोड निष्पादित करें",
          "instruction": "रन कोड बटन दबाएं या Ctrl+Enter दबाकर स्थानीय रूप से चलाएं।"
        },
        {
          "stepNumber": 4,
          "title": "आउटपुट देखें और डाउनलोड करें",
          "instruction": "कंसोल में परिणाम देखें और Program.cs फाइल डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "C# स्ट्रिंग इंटरपोलेशन और लूप उदाहरण",
        "scenario": "C# में सेल्सियस से फ़ारेनहाइट तापमान रूपांतरण लूप चलाना।",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "टर्मिनल आउटपुट: \"C: 0 -> F: 32 | C: 10 -> F: 50 | C: 20 -> F: 68\" (1ms में निष्पादित)।"
      },
      "faqs": [
        {
          "question": "क्या यह क्लाउड सर्वर पर .NET CLR चलाता है?",
          "answer": "नहीं। यह शैक्षिक टूल सीधे आपके ब्राउज़र में C# सिंटैक्स का मूल्यांकन करता है। कोई भी कोड बाहर नहीं जाता।"
        },
        {
          "question": "क्या स्ट्रिंग इंटरपोलेशन ($) जैसी आधुनिक सुविधाएं समर्थित हैं?",
          "answer": "हाँ। स्ट्रिंग इंटरपोलेशन, क्लासेस, लूप्स और बुनियादी एल्गोरिदम पूरी तरह समर्थित हैं।"
        },
        {
          "question": "क्या Windows Forms या WPF ऐप्स बनाए जा सकते हैं?",
          "answer": "नहीं। यह टूल केवल टेक्स्ट कंसोल प्रोग्राम्स के लिए है।"
        },
        {
          "question": "C# कोड डाउनलोड करते समय मानक फाइल नाम क्या है?",
          "answer": ".NET कंसोल एप्लिकेशन के लिए मानक फाइल नाम Program.cs होता है।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Análisis de Sintaxis C# .NET y Arquitectura de Ejecución en Navegador",
      "formulaDescription": "Esta herramienta permite practicar C# de .NET en el navegador. Valida la clase Program, el punto de entrada static void Main() y Console.WriteLine sin requerir Visual Studio ni .NET SDK.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escribir código C#",
          "instruction": "Escriba su programa con una clase y el método static void Main()."
        },
        {
          "stepNumber": 2,
          "title": "Añadir salidas",
          "instruction": "Use Console.WriteLine() para imprimir variables y cadenas."
        },
        {
          "stepNumber": 3,
          "title": "Ejecutar código",
          "instruction": "Pulse Run Code o Ctrl+Intro para evaluar la lógica al instante."
        },
        {
          "stepNumber": 4,
          "title": "Comprobar y descargar",
          "instruction": "Revise la salida en el terminal y guarde el archivo Program.cs."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Conversión de Temperaturas en C#",
        "scenario": "Convertir grados Celsius a Fahrenheit usando un bucle for e interpolación de cadenas.",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "Salida de consola: Muestra los valores calculados con precisión."
      },
      "faqs": [
        {
          "question": "¿Compila binarios .NET en un servidor remoto?",
          "answer": "No. Es un analizador local en el navegador que verifica el código sin transmitirlo a la red."
        },
        {
          "question": "¿Soporta interpolación de cadenas ($\"\")?",
          "answer": "Sí. Permite usar interpolación de cadenas, clases, estructuras de control y algoritmos."
        },
        {
          "question": "¿Se pueden crear aplicaciones con interfaz gráfica WPF?",
          "answer": "No. Está enfocado exclusivamente en programas de consola de texto."
        },
        {
          "question": "¿Cuál es el nombre de archivo habitual al descargar?",
          "answer": "El archivo estándar de entrada en aplicaciones de consola C# es Program.cs."
        }
      ]
    },
    "ja": {
      "formulaTitle": "ブラウザ内C# .NET構文解析および学習用実行構造",
      "formulaDescription": "本ツールは、Visual Studioや.NET SDKのインストール不要でC#の構文を学習できるブラウザ実行環境です。Programクラス、static void Main()エントリーポイント、Console.WriteLine出力を検証します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "C#コードの入力",
          "instruction": "static void Main(string[] args)を持つクラス構成を記述します。"
        },
        {
          "stepNumber": 2,
          "title": "コンソール出力の設定",
          "instruction": "結果を表示するためにConsole.WriteLine()ステートメントを追加します。"
        },
        {
          "stepNumber": 3,
          "title": "コードの実行",
          "instruction": "Run CodeまたはCtrl+Enterキーで構文と出力を検証します。"
        },
        {
          "stepNumber": 4,
          "title": "結果確認とダウンロード",
          "instruction": "ターミナル画面で結果を確認し、Program.csとして保存します。"
        }
      ],
      "workedExample": {
        "title": "C#文字列補間と反復処理の実例",
        "scenario": "摂氏から華氏への温度換算をループ処理と文字列補間（$\"\"）で出力する例。",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "ターミナル出力: 「C: 0 -> F: 32」「C: 10 -> F: 50」「C: 20 -> F: 68」を即時表示。"
      },
      "faqs": [
        {
          "question": "クラウドサーバーで.NET CLRが実行されていますか？",
          "answer": "いいえ。ブラウザ内のサンドボックス環境でC#構文を評価する学習用エンジンです。"
        },
        {
          "question": "文字列補間（$\"\"）などの最新記法は使えますか？",
          "answer": "はい。文字列補間、クラス定義、各種ループ構文をサポートしています。"
        },
        {
          "question": "WPFやWindows FormsなどのGUIアプリは作れますか？",
          "answer": "いいえ。コンソール出力ベースの構文およびアルゴリズム学習に特化しています。"
        },
        {
          "question": "ダウンロード時の標準的なファイル名は何ですか？",
          "answer": ".NETコンソールアプリの標準的なエントリファイル名であるProgram.csとして保存されます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Analyse de Syntaxe C# .NET et Moteur d'Exécution en Navigateur",
      "formulaDescription": "Cet outil permet de s'exercer en C# (.NET) dans le navigateur. Il valide la classe Program, le point d'entrée Main() et Console.WriteLine sans nécessiter le SDK .NET.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Rédiger le code C#",
          "instruction": "Créez votre classe avec la méthode static void Main(string[] args)."
        },
        {
          "stepNumber": 2,
          "title": "Ajouter les sorties",
          "instruction": "Utilisez Console.WriteLine() pour afficher vos données."
        },
        {
          "stepNumber": 3,
          "title": "Lancer l'exécution",
          "instruction": "Cliquez sur Run Code ou faites Ctrl+Entrée pour voir la console."
        },
        {
          "stepNumber": 4,
          "title": "Consulter et sauvegarder",
          "instruction": "Examinez la sortie et téléchargez le fichier Program.cs."
        }
      ],
      "workedExample": {
        "title": "Exemple d'Interpolation et Boucle en C#",
        "scenario": "Conversion de températures Celsius en Fahrenheit avec interpolation de chaînes.",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "Sortie terminal : Résultats formatés affichés en 1 ms."
      },
      "faqs": [
        {
          "question": "Le code est-il compilé sur un serveur .NET distant ?",
          "answer": "Non. Cet environnement d'apprentissage évalue la syntaxe C# en local dans votre navigateur."
        },
        {
          "question": "L'interpolation de chaînes ($\"\") est-elle gérée ?",
          "answer": "Oui. Les fonctionnalités de base comme l'interpolation, les classes et les boucles sont supportées."
        },
        {
          "question": "Peut-on concevoir des applications graphiques WPF ?",
          "answer": "Non. L'outil est strictement dédié aux applications en mode console."
        },
        {
          "question": "Quel est le nom de fichier par défaut ?",
          "answer": "Le fichier source principal est exporté sous le nom standard Program.cs."
        }
      ]
    },
    "de": {
      "formulaTitle": "In-Browser C# .NET Syntaxprüfung & Ausführungsarchitektur",
      "formulaDescription": "Das C#-Tool ermöglicht das Erlernen von .NET C# direkt im Browser. Es überprüft die Klasse Program, die Methode static void Main() und Console.WriteLine-Ausgaben ohne .NET-SDK.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "C#-Programm verfassen",
          "instruction": "Erstellen Sie Ihre Klasse mit der Methode static void Main()."
        },
        {
          "stepNumber": 2,
          "title": "Ausgaben einbinden",
          "instruction": "Nutzen Sie Console.WriteLine() für Text- und Variablenanzeigen."
        },
        {
          "stepNumber": 3,
          "title": "Code ausführen",
          "instruction": "Klicken Sie auf Run Code oder drücken Sie Strg+Enter."
        },
        {
          "stepNumber": 4,
          "title": "Prüfen & herunterladen",
          "instruction": "Lesen Sie das Terminal und laden Sie die Datei Program.cs herunter."
        }
      ],
      "workedExample": {
        "title": "Beispiel für String-Interpolation in C#",
        "scenario": "Temperaturumrechnung von Celsius in Fahrenheit mit einer for-Schleife.",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "Terminalausgabe: Präzise formatiert in 1 ms ausgegeben."
      },
      "faqs": [
        {
          "question": "Läuft die Kompilierung auf einem .NET-Server?",
          "answer": "Nein. Die Auswertung findet lokal in der Browser-Sandbox ohne Serverkontakt statt."
        },
        {
          "question": "Wird String-Interpolation ($\"\") unterstützt?",
          "answer": "Ja. String-Interpolation, Klassen und grundlegende Kontrollstrukturen werden unterstützt."
        },
        {
          "question": "Können Desktop-GUIs (WPF/WinForms) erstellt werden?",
          "answer": "Nein. Das Werkzeug ist auf Konsolenprogramme ausgerichtet."
        },
        {
          "question": "Wie lautet der Standard-Dateiname beim Download?",
          "answer": "Der empfohlene Dateiname für Konsolenanwendungen lautet Program.cs."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Análise de Sintaxe C# .NET e Arquitetura de Execução no Navegador",
      "formulaDescription": "Esta ferramenta permite praticar a linguagem C# no navegador. Analisa a classe Program, o método Main() e chamadas Console.WriteLine sem exigir o .NET SDK.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escrever código C#",
          "instruction": "Estruture o programa com uma classe e static void Main()."
        },
        {
          "stepNumber": 2,
          "title": "Adicionar impressões",
          "instruction": "Utilize Console.WriteLine() para mostrar os resultados."
        },
        {
          "stepNumber": 3,
          "title": "Executar script",
          "instruction": "Clique em Run Code ou use Ctrl+Enter para testar."
        },
        {
          "stepNumber": 4,
          "title": "Conferir e baixar",
          "instruction": "Verifique o terminal e salve o arquivo como Program.cs."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Interpolação de Strings em C#",
        "scenario": "Conversão de temperaturas Celsius para Fahrenheit com laço de repetição.",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "Console: Exibição imediata das temperaturas convertidas."
      },
      "faqs": [
        {
          "question": "O código é compilado em servidores .NET na nuvem?",
          "answer": "Não. O processamento ocorre no próprio navegador para fins de estudo com total privacidade."
        },
        {
          "question": "Suporta interpolação de strings ($\"\")?",
          "answer": "Sim. Interpolação, classes, laços e variáveis funcionam normalmente."
        },
        {
          "question": "É possível criar interfaces gráficas Desktop?",
          "answer": "Não. O foco do sistema é o aprendizado de programas para console de texto."
        },
        {
          "question": "Qual o nome padrão do arquivo ao fazer download?",
          "answer": "O arquivo fonte principal em C# é nomeado como Program.cs."
        }
      ]
    },
    "ko": {
      "formulaTitle": "브라우저 내 C# .NET 문법 분석 및 학습용 실행 엔진 구조",
      "formulaDescription": "본 C# 도구는 Visual Studio나 .NET SDK 설치 없이 브라우저에서 C# 문법을 연습할 수 있는 환경입니다. Program 클래스, static void Main() 진입점, Console.WriteLine 출력을 검증합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "C# 코드 작성",
          "instruction": "static void Main(string[] args) 메서드가 포함된 클래스를 구성합니다."
        },
        {
          "stepNumber": 2,
          "title": "콘솔 출력문 추가",
          "instruction": "결과 확인을 위해 Console.WriteLine() 문을 작성합니다."
        },
        {
          "stepNumber": 3,
          "title": "코드 실행",
          "instruction": "Run Code 버튼 또는 Ctrl+Enter를 눌러 즉시 실행합니다."
        },
        {
          "stepNumber": 4,
          "title": "결과 확인 및 다운로드",
          "instruction": "터미널 출력을 검토하고 Program.cs 파일로 저장합니다."
        }
      ],
      "workedExample": {
        "title": "C# 문자열 보간 및 반복문 실전 예시",
        "scenario": "for 반복문과 문자열 보간($)을 활용하여 섭씨-화씨 온도 변환표 출력.",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "터미널 출력: \"C: 0 -> F: 32\nC: 10 -> F: 50\nC: 20 -> F: 68\" 즉시 산출."
      },
      "faqs": [
        {
          "question": "클라우드 서버에서 .NET 런타임이 실행되나요?",
          "answer": "아닙니다. 브라우저 로컬 샌드박스에서 C# 구문을 평가하는 교육용 환경입니다."
        },
        {
          "question": "문자열 보간($) 등 최신 문법이 지원되나요?",
          "answer": "네. 문자열 보간, 클래스 정의, 제어문 및 핵심 알고리즘 구조가 지원됩니다."
        },
        {
          "question": "WPF나 WinForms 등 윈도우 GUI 앱을 제작할 수 있나요?",
          "answer": "아닙니다. 콘솔 텍스트 입출력 기반의 로직 학습에 특화되어 있습니다."
        },
        {
          "question": "C# 소스 코드 저장 시 표준 파일명은 무엇인가요?",
          "answer": ".NET 콘솔 프로젝트의 표준 진입 파일명인 Program.cs로 다운로드됩니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Analisi Sintattica C# .NET ed Esecuzione nel Browser",
      "formulaDescription": "Questo strumento consente di esercitarsi con C# (.NET) nel browser. Verifica la classe Program, il metodo Main() e Console.WriteLine senza SDK .NET locale.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scrivere il codice C#",
          "instruction": "Definisci la classe con il metodo static void Main()."
        },
        {
          "stepNumber": 2,
          "title": "Aggiungere output",
          "instruction": "Usa Console.WriteLine() per visualizzare i risultati."
        },
        {
          "stepNumber": 3,
          "title": "Eseguire il programma",
          "instruction": "Premi Run Code o Ctrl+Invio per avviare il test."
        },
        {
          "stepNumber": 4,
          "title": "Verificare e salvare",
          "instruction": "Controlla la console e scarica il file Program.cs."
        }
      ],
      "workedExample": {
        "title": "Esempio di Interpolazione di Stringhe in C#",
        "scenario": "Conversione di temperature da Celsius a Fahrenheit con ciclo for.",
        "calculation": "for (int c = 0; c <= 20; c += 10) { double f = (c * 9.0 / 5.0) + 32; Console.WriteLine($\"C: {c} -> F: {f}\"); }",
        "result": "Output console: Sequenza di valori formattata in 1 ms."
      },
      "faqs": [
        {
          "question": "Il codice viene compilato su un server .NET remoto?",
          "answer": "No. L'analisi viene eseguita localmente nel browser a scopo di apprendimento."
        },
        {
          "question": "L'interpolazione di stringhe ($\"\") è supportata?",
          "answer": "Sì. L'interpolazione, le classi e i costrutti standard sono riconosciuti."
        },
        {
          "question": "Posso creare applicazioni desktop con grafica WPF?",
          "answer": "No. Il runner è progettato unicamente per programmi a riga di comando."
        },
        {
          "question": "Qual è il nome standard del file scaricato?",
          "answer": "Il file viene salvato con il nome standard Program.cs."
        }
      ]
    }
  },
  "php-compiler": {
    "en": {
      "formulaTitle": "In-Browser PHP Script Tokenization & Echo Stream Architecture",
      "formulaDescription": "This tool provides a client-side PHP execution and syntax testing sandbox. It tokenizes standard <?php ... ?> tags, parses associative arrays, functions, loops, and echo output streams, executing code in browser memory without requiring Apache, Nginx, or remote PHP-FPM servers.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Open PHP Script Tag",
          "instruction": "Start your code with <?php and write variables ($var), functions, and arrays."
        },
        {
          "stepNumber": 2,
          "title": "Add Echo Statements",
          "instruction": "Use echo or print to send formatted text or calculation results to output."
        },
        {
          "stepNumber": 3,
          "title": "Execute Code",
          "instruction": "Click Run Code or press Ctrl+Enter to evaluate the PHP script in the local sandbox."
        },
        {
          "stepNumber": 4,
          "title": "Inspect Output & Download",
          "instruction": "Review the terminal stream and click Download to save index.php."
        }
      ],
      "workedExample": {
        "title": "PHP Associative Array & Foreach Loop Example",
        "scenario": "Iterating over an associative array of student grades and calculating the class average.",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "Terminal Output: \"Alice: 90\nBob: 85\nCarol: 95\nAverage: 90.0\" evaluated in 1ms."
      },
      "faqs": [
        {
          "question": "Does this tool connect to a remote Apache or PHP-FPM web server?",
          "answer": "No. This educational environment evaluates PHP code syntax and execution locally inside your browser sandbox."
        },
        {
          "question": "Can I connect to MySQL or PostgreSQL databases?",
          "answer": "No. Database network drivers (pdo_mysql, mysqli) are not active in the browser sandbox. Use our SQL Editor tool for database queries."
        },
        {
          "question": "Is the <?php opening tag required?",
          "answer": "Yes. In accordance with PHP specifications, PHP scripts must begin with the <?php opening tag."
        },
        {
          "question": "What filename is standard for downloading PHP code?",
          "answer": "The standard entry filename for PHP scripts is index.php."
        }
      ]
    },
    "hi": {
      "formulaTitle": "इन-ब्राउज़र PHP स्क्रिप्ट टोकनाइजेशन और इको स्ट्रीम संरचना",
      "formulaDescription": "यह टूल क्लाइंट-साइड PHP निष्पादन और सिंटैक्स परीक्षण सैंडबॉक्स प्रदान करता है। यह <?php ... ?> टैग, एरे, फ़ंक्शन और echo आउटपुट को बिना Apache या रिमोट PHP सर्वर के सीधे ब्राउज़र में चलाता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "PHP टैग शुरू करें",
          "instruction": "<?php से कोड शुरू करें और वेरिएबल्स ($var), फ़ंक्शन और एरे लिखें।"
        },
        {
          "stepNumber": 2,
          "title": "Echo स्टेटमेंट जोड़ें",
          "instruction": "परिणाम प्रदर्शित करने के लिए echo या print का उपयोग करें।"
        },
        {
          "stepNumber": 3,
          "title": "कोड निष्पादित करें",
          "instruction": "रन कोड बटन दबाएं या Ctrl+Enter दबाकर स्थानीय सैंडबॉक्स में चलाएं।"
        },
        {
          "stepNumber": 4,
          "title": "आउटपुट देखें और डाउनलोड करें",
          "instruction": "टर्मिनल में परिणाम देखें और index.php फाइल डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "PHP एसोसिएटिव एरे और फोरईच लूप उदाहरण",
        "scenario": "छात्रों के अंकों के एरे पर लूप चलाकर औसत अंक निकालना।",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "टर्मिनल आउटपुट: \"Alice: 90 | Bob: 85 | Carol: 95 | Average: 90.0\" (1ms में निष्पादित)।"
      },
      "faqs": [
        {
          "question": "क्या यह किसी रिमोट Apache या PHP सर्वर से जुड़ा है?",
          "answer": "नहीं। यह टूल सीधे आपके ब्राउज़र में PHP सिंटैक्स का मूल्यांकन करता है। कोड पूरी तरह सुरक्षित रहता है।"
        },
        {
          "question": "क्या मैं MySQL डेटाबेस कनेक्ट कर सकता हूँ?",
          "answer": "नहीं। ब्राउज़र सैंडबॉक्स में बाहरी डेटाबेस ड्राइवर सक्रिय नहीं हैं। डेटाबेस के लिए हमारे SQL Editor टूल का उपयोग करें।"
        },
        {
          "question": "क्या <?php टैग लगाना अनिवार्य है?",
          "answer": "हाँ। PHP मानकों के अनुसार कोड की शुरुआत <?php टैग से होनी चाहिए।"
        },
        {
          "question": "PHP कोड डाउनलोड करते समय मानक फाइल नाम क्या है?",
          "answer": "PHP के लिए मानक फाइल नाम index.php होता है।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Tokenización de Scripts PHP y Arquitectura de Salida Echo en Navegador",
      "formulaDescription": "Esta herramienta permite probar sintaxis PHP en el cliente. Procesa etiquetas <?php ... ?>, matrices asociativas, funciones y salidas echo en el navegador sin necesitar Apache ni servidores remotos.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Abrir etiqueta PHP",
          "instruction": "Comience su código con <?php y declare variables ($var), funciones y arrays."
        },
        {
          "stepNumber": 2,
          "title": "Añadir sentencias echo",
          "instruction": "Utilice echo o print para mostrar información formateada."
        },
        {
          "stepNumber": 3,
          "title": "Ejecutar script",
          "instruction": "Pulse Run Code o Ctrl+Intro para evaluar el código en el navegador."
        },
        {
          "stepNumber": 4,
          "title": "Comprobar y descargar",
          "instruction": "Examine la salida de terminal y descargue su archivo como index.php."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Array Asociativo y Bucle Foreach en PHP",
        "scenario": "Recorrer una lista de calificaciones de estudiantes y calcular la media.",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "Salida de consola: Muestra la lista de alumnos y el promedio final."
      },
      "faqs": [
        {
          "question": "¿Se conecta a un servidor Apache o PHP-FPM remoto?",
          "answer": "No. Es un analizador local que evalúa el código dentro del navegador sin enviar datos a servidores externos."
        },
        {
          "question": "¿Puedo conectar bases de datos MySQL?",
          "answer": "No. Los controladores de red de bases de datos no están disponibles en el sandbox. Para consultas use nuestro Editor SQL."
        },
        {
          "question": "¿Es obligatoria la etiqueta <?php?",
          "answer": "Sí. Los scripts en PHP deben iniciarse con la etiqueta formal de apertura <?php."
        },
        {
          "question": "¿Cuál es el nombre de archivo habitual al descargar?",
          "answer": "El archivo descargado se nombra habitualmente como index.php."
        }
      ]
    },
    "ja": {
      "formulaTitle": "ブラウザ内PHPスクリプトトークナイズおよび出力処理構造",
      "formulaDescription": "本ツールは、ApacheやPHP-FPMなどのWebサーバーを用意することなく、ブラウザ上でPHP構文を手軽に試せる学習環境です。<?php ... ?>タグ、連想配列、関数、echo出力をローカルで処理します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "PHPタグの開始",
          "instruction": "<?phpでコードを開始し、変数（$var）、関数、配列を定義します。"
        },
        {
          "stepNumber": 2,
          "title": "echoによる出力",
          "instruction": "計算結果や文字列を表示するためechoやprintステートメントを追加します。"
        },
        {
          "stepNumber": 3,
          "title": "コードの実行",
          "instruction": "Run CodeまたはCtrl+Enterキーでローカル環境にて即座に実行します。"
        },
        {
          "stepNumber": 4,
          "title": "結果確認とダウンロード",
          "instruction": "ターミナル画面で結果を確認し、index.phpとして保存します。"
        }
      ],
      "workedExample": {
        "title": "PHP連想配列とforeachループの実例",
        "scenario": "生徒のテスト成績を格納した連想配列を走査し、平均点を計算して出力する例。",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "ターミナル出力: 「Alice: 90」「Bob: 85」「Carol: 95」「Average: 90.0」を出力。"
      },
      "faqs": [
        {
          "question": "外部のApacheやPHP-FPMサーバーと通信していますか？",
          "answer": "いいえ。ブラウザ内部でPHP構文を解釈する学習用サンドボックスであり、外部通信は行いません。"
        },
        {
          "question": "MySQLなどのデータベースに接続できますか？",
          "answer": "いいえ。ブラウザ環境のため外部DB接続ドライバは無効化されています。DB学習には「SQL Editor」ツールをご利用ください。"
        },
        {
          "question": "開始タグ<?phpは必須ですか？",
          "answer": "はい。PHPの公式文法に則り、コードの先頭に<?phpタグを記述する必要があります。"
        },
        {
          "question": "ダウンロード時の標準ファイル名は何ですか？",
          "answer": "一般的なWebサーバーのエントリポイントであるindex.phpとして保存されます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Tokenisation de Scripts PHP et Gestion du Flux Echo en Navigateur",
      "formulaDescription": "Cet outil offre un environnement de test pour scripts PHP dans le navigateur. Il interprète les balises <?php ... ?>, les tableaux associatifs, fonctions et sorties echo sans serveur Apache ou Nginx.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Ouvrir la balise PHP",
          "instruction": "Débutez votre code avec <?php et déclarez vos variables ($var) et fonctions."
        },
        {
          "stepNumber": 2,
          "title": "Insérer des instructions echo",
          "instruction": "Utilisez echo ou print pour afficher vos données dans le terminal."
        },
        {
          "stepNumber": 3,
          "title": "Lancer l'exécution",
          "instruction": "Cliquez sur Run Code ou faites Ctrl+Entrée pour voir le résultat."
        },
        {
          "stepNumber": 4,
          "title": "Vérifier et télécharger",
          "instruction": "Examinez la sortie console et téléchargez le fichier source index.php."
        }
      ],
      "workedExample": {
        "title": "Exemple de Tableau Associatif et Boucle Foreach",
        "scenario": "Parcours d'un tableau de notes d'étudiants et calcul de la moyenne en PHP.",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "Sortie terminal : Liste des étudiants et moyenne affichée en 1 ms."
      },
      "faqs": [
        {
          "question": "L'outil est-il relié à un serveur Apache ou PHP distant ?",
          "answer": "Non. Cet environnement évalue le code localement dans votre navigateur en toute confidentialité."
        },
        {
          "question": "Peut-on se connecter à une base de données MySQL ?",
          "answer": "Non. Les pilotes réseau de bases de données sont désactivés dans le bac à sable. Utilisez notre outil SQL Editor."
        },
        {
          "question": "La balise <?php est-elle obligatoire ?",
          "answer": "Oui. Tout script PHP standard doit s'ouvrir avec la balise <?php."
        },
        {
          "question": "Quel est le nom de fichier par défaut ?",
          "answer": "Le fichier téléchargé est nommé par défaut index.php."
        }
      ]
    },
    "de": {
      "formulaTitle": "In-Browser PHP-Skript-Tokenisierung & Echo-Ausgabe-Architektur",
      "formulaDescription": "Das Tool bietet eine PHP-Lernumgebung direkt im Browser. Es verarbeitet <?php ... ?>-Tags, assoziative Arrays, Funktionen und echo-Ausgaben ohne Apache- oder PHP-FPM-Server.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "PHP-Tag öffnen",
          "instruction": "Beginnen Sie den Quelltext mit <?php und deklarieren Sie Variablen ($var)."
        },
        {
          "stepNumber": 2,
          "title": "Echo-Befehle einfügen",
          "instruction": "Verwenden Sie echo oder print für die Ausgabe von Texten und Ergebnissen."
        },
        {
          "stepNumber": 3,
          "title": "Code ausführen",
          "instruction": "Klicken Sie auf Run Code oder drücken Sie Strg+Enter zur Auswertung."
        },
        {
          "stepNumber": 4,
          "title": "Ergebnis prüfen & speichern",
          "instruction": "Prüfen Sie das Terminal und laden Sie die Datei index.php herunter."
        }
      ],
      "workedExample": {
        "title": "Beispiel für Assoziative Arrays in PHP",
        "scenario": "Durchlaufen eines Noten-Arrays und Ermittlung des Notendurchschnitts.",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "Terminalausgabe: Alle Einträge und der Durchschnitt sauber dargestellt."
      },
      "faqs": [
        {
          "question": "Verbindet sich das Tool mit einem externen Apache-Server?",
          "answer": "Nein. Die Auswertung erfolgt zu 100 % lokal in der Browser-Sandbox."
        },
        {
          "question": "Kann eine MySQL-Datenbank angebunden werden?",
          "answer": "Nein. Netzwerk-Treiber für Datenbanken sind im Browser nicht verfügbar. Nutzen Sie hierfür unseren SQL Editor."
        },
        {
          "question": "Ist das einleitende <?php erforderlich?",
          "answer": "Ja. PHP-Skripte müssen mit dem Standard-Tag <?php eingeleitet werden."
        },
        {
          "question": "Wie lautet der empfohlene Dateiname beim Download?",
          "answer": "Der typische Dateiname für PHP-Webskripte lautet index.php."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Tokenização de Scripts PHP e Arquitetura de Saída Echo no Navegador",
      "formulaDescription": "Esta ferramenta oferece um ambiente para testar scripts PHP no navegador. Processa tags <?php ... ?>, matrizes associativas, funções e saídas echo sem necessitar de servidor Apache ou Nginx.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Abrir tag PHP",
          "instruction": "Inicie com <?php e defina variáveis com cifrão ($var), funções e matrizes."
        },
        {
          "stepNumber": 2,
          "title": "Inserir comandos echo",
          "instruction": "Use echo ou print para enviar textos e valores ao terminal."
        },
        {
          "stepNumber": 3,
          "title": "Executar código",
          "instruction": "Clique em Run Code ou use o atalho Ctrl+Enter para testar."
        },
        {
          "stepNumber": 4,
          "title": "Conferir e baixar",
          "instruction": "Verifique a saída no console e baixe o arquivo fonte index.php."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Matriz Associativa e Loop Foreach",
        "scenario": "Leitura de notas de alunos e cálculo de média geral em PHP.",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "Console: Nomes, notas e média exibidos instantaneamente."
      },
      "faqs": [
        {
          "question": "O código roda em um servidor Apache externo?",
          "answer": "Não. Este ambiente de estudo avalia o código localmente no próprio navegador."
        },
        {
          "question": "É possível conectar bancos de dados MySQL?",
          "answer": "Não. Drivers de banco de dados não operam dentro do sandbox do navegador. Utilize nosso Editor SQL."
        },
        {
          "question": "A tag <?php é obrigatória?",
          "answer": "Sim. Scripts em PHP exigem a tag de abertura <?php para correta interpretação."
        },
        {
          "question": "Qual o nome sugerido para o arquivo?",
          "answer": "O arquivo fonte é salvo por padrão com o nome index.php."
        }
      ]
    },
    "ko": {
      "formulaTitle": "브라우저 내 PHP 스크립트 토큰화 및 Echo 출력 처리 구조",
      "formulaDescription": "본 도구는 Apache나 PHP-FPM 웹 서버 설정 없이 브라우저에서 PHP 문법을 테스트할 수 있는 학습용 환경입니다. <?php ... ?> 태그, 연관 배열, 사용자 정의 함수, echo 출력을 로컬에서 평가합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "PHP 태그 선언",
          "instruction": "<?php 태그로 시작하여 변수($var), 배열, 함수를 구성합니다."
        },
        {
          "stepNumber": 2,
          "title": "echo 출력문 작성",
          "instruction": "연산 결과나 텍스트를 화면에 출력하기 위해 echo 또는 print를 작성합니다."
        },
        {
          "stepNumber": 3,
          "title": "코드 실행",
          "instruction": "Run Code 버튼 또는 Ctrl+Enter를 눌러 브라우저 로컬에서 즉시 실행합니다."
        },
        {
          "stepNumber": 4,
          "title": "결과 확인 및 다운로드",
          "instruction": "터미널 결과를 점검하고 Download 버튼을 눌러 index.php로 저장합니다."
        }
      ],
      "workedExample": {
        "title": "PHP 연관 배열 및 foreach 반복문 실전 예시",
        "scenario": "학생 성적이 담긴 연관 배열을 순회하며 개별 점수와 전체 평균 출력.",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "터미널 출력: \"Alice: 90\nBob: 85\nCarol: 95\nAverage: 90.0\" 즉각 계산 완료."
      },
      "faqs": [
        {
          "question": "원격 Apache나 PHP-FPM 서버와 통신하나요?",
          "answer": "아닙니다. 브라우저 내부 샌드박스에서 PHP 문법을 로컬로 평가하는 학습용 도구입니다."
        },
        {
          "question": "MySQL 등 외부 데이터베이스와 연동할 수 있나요?",
          "answer": "브라우저 보안상 외부 DB 소켓 연결은 지원되지 않습니다. 데이터베이스 쿼리 실습은 당사 SQL Editor를 이용해 주세요."
        },
        {
          "question": "시작 태그 <?php가 필수인가요?",
          "answer": "네. 표준 PHP 규격에 따라 모든 스크립트는 <?php 태그로 시작해야 합니다."
        },
        {
          "question": "다운로드 시 기본 파일명은 무엇인가요?",
          "answer": "웹 서버의 표준 엔트리 파일명인 index.php로 저장됩니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Tokenizzazione di Script PHP e Gestione dell'Output Echo nel Browser",
      "formulaDescription": "Questo strumento fornisce un ambiente di test per PHP direttamente nel browser. Interpreta i tag <?php ... ?>, array associativi, funzioni ed echo senza richiedere Apache o server remoti.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Aprire il tag PHP",
          "instruction": "Inizia con <?php e definisci variabili ($var), funzioni e array."
        },
        {
          "stepNumber": 2,
          "title": "Usare l'istruzione echo",
          "instruction": "Usa echo o print per inviare testo e dati all'output."
        },
        {
          "stepNumber": 3,
          "title": "Avviare il codice",
          "instruction": "Premi Run Code o Ctrl+Invio per valutare lo script nel browser."
        },
        {
          "stepNumber": 4,
          "title": "Leggere l'output e scaricare",
          "instruction": "Ispeziona i risultati e scarica lo script come index.php."
        }
      ],
      "workedExample": {
        "title": "Esempio di Array Associativo e Ciclo Foreach in PHP",
        "scenario": "Scansione dei voti di una classe e calcolo della media finale.",
        "calculation": "$grades = [\"Alice\" => 90, \"Bob\" => 85, \"Carol\" => 95]; foreach($grades as $s => $g) echo \"$s: $g\n\";",
        "result": "Output console: Riepilogo dei voti e media calcolata in 1 ms."
      },
      "faqs": [
        {
          "question": "Lo script si collega a un server Apache remoto?",
          "answer": "No. L'analisi viene effettuata in locale nel browser per fini didattici."
        },
        {
          "question": "Posso collegare un database MySQL?",
          "answer": "No. I driver di rete per i database non sono attivi nella sandbox. Usa il nostro SQL Editor."
        },
        {
          "question": "Il tag di apertura <?php è obbligatorio?",
          "answer": "Sì. Tutti gli script PHP devono iniziare formalmente con <?php."
        },
        {
          "question": "Qual è il nome standard del file salvato?",
          "answer": "Il file viene esportato con il nome standard index.php."
        }
      ]
    }
  },
  "sql-editor": {
    "en": {
      "formulaTitle": "In-Memory Relational Engine & ANSI SQL Query Execution Architecture",
      "formulaDescription": "The SQL editor provides an in-browser relational database query runner. It parses and executes standard ANSI SQL statements (CREATE TABLE, INSERT INTO, SELECT, WHERE, JOIN, GROUP BY, ORDER BY) against an isolated in-memory relational schema, rendering results as interactive data tables with zero server communication.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choose or Write SQL Schema",
          "instruction": "Load a sample schema (Employees, Orders, Products) or write your own CREATE TABLE and INSERT statements."
        },
        {
          "stepNumber": 2,
          "title": "Compose SQL Queries",
          "instruction": "Write SELECT queries with WHERE filters, JOIN clauses, aggregation functions, and ORDER BY."
        },
        {
          "stepNumber": 3,
          "title": "Execute Query",
          "instruction": "Click Run Query or press Ctrl+Enter to execute statements in the in-memory engine."
        },
        {
          "stepNumber": 4,
          "title": "Inspect Results & Export",
          "instruction": "Review rows and columns in the interactive table grid and click Download to save queries as script.sql."
        }
      ],
      "workedExample": {
        "title": "Department Salary Aggregation with SQL JOIN",
        "scenario": "Joining employees and departments tables to compute average salary per department.",
        "calculation": "SELECT d.name, COUNT(e.id) AS count, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name ORDER BY avg_sal DESC;",
        "result": "Results Grid: Rendered 3 rows (Engineering, Marketing, Sales) with formatted currency columns in 2ms."
      },
      "faqs": [
        {
          "question": "Is this connected to a live production database server?",
          "answer": "No. The SQL editor operates an isolated in-memory relational schema inside your browser. Your queries and records never touch external database servers."
        },
        {
          "question": "Do database tables persist when the browser page is refreshed?",
          "answer": "No. Because tables reside in temporary browser memory, reloading the page resets the schema to initial sample data."
        },
        {
          "question": "Which SQL dialects and clauses are supported?",
          "answer": "Standard ANSI SQL syntax is supported, including SELECT, INSERT INTO, UPDATE, DELETE, CREATE TABLE, WHERE, JOIN (INNER, LEFT), GROUP BY, HAVING, and ORDER BY."
        },
        {
          "question": "Can I export the query results or SQL script?",
          "answer": "Yes. You can copy table rows to your clipboard or download your written queries as a standalone .sql script file."
        }
      ]
    },
    "hi": {
      "formulaTitle": "इन-मेमोरी रिलेशनल इंजन और ANSI SQL क्वेरी निष्पादन संरचना",
      "formulaDescription": "यह SQL संपादक इन-ब्राउज़र रिलेशनल डेटाबेस क्वेरी रनर प्रदान करता है। यह CREATE TABLE, INSERT INTO, SELECT, JOIN और GROUP BY जैसे मानक ANSI SQL स्टेटमेंट्स को इन-मेमोरी स्कीमा पर बिना किसी बाहरी सर्वर के निष्पादित करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "स्कीमा चुनें या बनाएं",
          "instruction": "सैंपल स्कीमा (Employees, Products) चुनें या अपने CREATE TABLE और INSERT स्टेटमेंट लिखें।"
        },
        {
          "stepNumber": 2,
          "title": "SQL क्वेरी लिखें",
          "instruction": "WHERE फिल्टर, JOIN क्लॉज, SUM/AVG और ORDER BY के साथ SELECT क्वेरी लिखें।"
        },
        {
          "stepNumber": 3,
          "title": "क्वेरी चलाएं",
          "instruction": "रन क्वेरी बटन दबाएं या Ctrl+Enter दबाकर इन-मेमोरी इंजन में क्वेरी निष्पादित करें।"
        },
        {
          "stepNumber": 4,
          "title": "परिणाम देखें और डाउनलोड करें",
          "instruction": "डेटा टेबल में पंक्तियाँ और कॉलम देखें और क्वेरी को script.sql के रूप में डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "SQL JOIN द्वारा विभागवार औसत वेतन गणना उदाहरण",
        "scenario": "कर्मचारी और विभाग तालिकाओं को जोड़कर प्रत्येक विभाग का औसत वेतन निकालना।",
        "calculation": "SELECT d.name, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name;",
        "result": "परिणाम ग्रिड: 3 पंक्तियाँ (इंजीनियरिंग, मार्केटिंग, सेल्स) 2ms में तालिका के रूप में तैयार।"
      },
      "faqs": [
        {
          "question": "क्या यह किसी लाइव प्रोडक्शन डेटाबेस से जुड़ा है?",
          "answer": "नहीं। यह आपके ब्राउज़र की मेमोरी में अलग से चलता है। आपकी क्वेरी या डेटा कभी भी किसी बाहरी सर्वर पर नहीं जाता।"
        },
        {
          "question": "पेज रीफ्रेश करने पर क्या डेटा सुरक्षित रहता है?",
          "answer": "नहीं। चूंकि डेटा अस्थायी ब्राउज़र मेमोरी में रहता है, पेज रीफ्रेश करने पर स्कीमा पुनः डिफ़ॉल्ट स्थिति में आ जाता है।"
        },
        {
          "question": "कौन-कौन से SQL कमांड समर्थित हैं?",
          "answer": "SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, WHERE, INNER/LEFT JOIN, GROUP BY और ORDER BY जैसे मानक ANSI SQL कमांड समर्थित हैं।"
        },
        {
          "question": "क्या मैं परिणामों या SQL स्क्रिप्ट को डाउनलोड कर सकता हूँ?",
          "answer": "हाँ। आप परिणामों को कॉपी कर सकते हैं या क्वेरी को .sql फाइल के रूप में डाउनलोड कर सकते हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Motor Relacional en Memoria y Arquitectura de Consultas ANSI SQL",
      "formulaDescription": "El editor SQL ofrece un entorno para ejecutar consultas relacionales en el navegador. Procesa sentencias ANSI SQL estándar (CREATE, INSERT, SELECT, JOIN, GROUP BY) en un esquema en memoria sin enviar datos a servidores externos.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Elegir o crear esquema",
          "instruction": "Cargue un esquema de ejemplo o redacte sus sentencias CREATE TABLE e INSERT."
        },
        {
          "stepNumber": 2,
          "title": "Escribir consultas SQL",
          "instruction": "Redacte consultas SELECT con filtros WHERE, cláusulas JOIN y ordenación."
        },
        {
          "stepNumber": 3,
          "title": "Ejecutar consulta",
          "instruction": "Pulse Run Query o Ctrl+Intro para procesar las sentencias en memoria."
        },
        {
          "stepNumber": 4,
          "title": "Examinar tabla y descargar",
          "instruction": "Consulte las filas en la cuadrícula de datos y descargue su archivo script.sql."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Agregación y JOIN en SQL",
        "scenario": "Combinar tablas de empleados y departamentos para obtener el salario promedio.",
        "calculation": "SELECT d.name, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name;",
        "result": "Cuadrícula de resultados: 3 filas generadas con columnas formateadas en 2 ms."
      },
      "faqs": [
        {
          "question": "¿Está conectado a una base de datos de producción?",
          "answer": "No. El motor opera un esquema en memoria aislado dentro del navegador, sin transmitir datos por internet."
        },
        {
          "question": "¿Persisten los datos si actualizo la página?",
          "answer": "No. Como residen en la memoria temporal del navegador, al recargar la página se restablecen los datos de ejemplo iniciales."
        },
        {
          "question": "¿Qué comandos SQL son compatibles?",
          "answer": "Admite sintaxis ANSI SQL habitual: SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, JOINs, GROUP BY y ORDER BY."
        },
        {
          "question": "¿Se pueden exportar las consultas?",
          "answer": "Sí. Puede copiar los resultados o descargar el archivo completo con extensión .sql."
        }
      ]
    },
    "ja": {
      "formulaTitle": "インメモリリレーショナルエンジンおよびANSI SQLクエリ実行構造",
      "formulaDescription": "本SQLエディタは、ブラウザ内部で動作するインメモリのリレーショナルデータベース実行環境です。CREATE TABLE、INSERT INTO、SELECT、JOIN、GROUP BYなどの標準ANSI SQL文を解釈し、サーバー通信なしで表形式の結果を表示します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "スキーマの選択または作成",
          "instruction": "サンプルスキーマ（社員一覧、注文履歴等）を読み込むか、独自のCREATE TABLE文を記述します。"
        },
        {
          "stepNumber": 2,
          "title": "SQLクエリの記述",
          "instruction": "WHERE条件、JOIN結合、GROUP BY集計、ORDER BYを含むSELECT文を作成します。"
        },
        {
          "stepNumber": 3,
          "title": "クエリの実行",
          "instruction": "Run QueryまたはCtrl+Enterキーでインメモリデータベースへクエリを発行します。"
        },
        {
          "stepNumber": 4,
          "title": "結果表の確認と保存",
          "instruction": "画面に展開されたレコード表を確認し、クエリをscript.sqlとしてダウンロードします。"
        }
      ],
      "workedExample": {
        "title": "SQL JOIN結合と部門別給与集計の実例",
        "scenario": "社員テーブルと部門テーブルを結合（JOIN）し、部門ごとの平均給与を集計する例。",
        "calculation": "SELECT d.name, COUNT(e.id) AS count, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name;",
        "result": "結果グリッド: エンジニアリング・営業・マーケティングの3行が2msで即座に表展開。"
      },
      "faqs": [
        {
          "question": "本番環境のデータベースサーバーと通信していますか？",
          "answer": "いいえ。ブラウザのメモリ上で仮想的なリレーショナルデータベースを動作させており、外部通信は一切発生しません。"
        },
        {
          "question": "ページを再読み込みしてもテーブルデータは保持されますか？",
          "answer": "いいえ。ブラウザの一時メモリで管理されているため、ページをリロードすると初期のサンプルデータにリセットされます。"
        },
        {
          "question": "対応しているSQL文や句には何がありますか？",
          "answer": "SELECT、INSERT、UPDATE、DELETE、CREATE TABLE、INNER/LEFT JOIN、GROUP BY、HAVING、ORDER BYなど標準的なANSI SQLに対応しています。"
        },
        {
          "question": "実行結果やSQLスクリプトを保存できますか？",
          "answer": "はい。結果表をコピーしたり、作成したSQL文を.sqlファイルとしてダウンロード可能です。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Moteur Relationnel en Mémoire et Architecture de Requêtes ANSI SQL",
      "formulaDescription": "Cet éditeur SQL intègre un moteur relationnel en mémoire dans le navigateur. Il exécute les requêtes ANSI SQL (CREATE, INSERT, SELECT, JOIN, GROUP BY) et affiche les tables de données sans échange réseau.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choisir ou créer un schéma",
          "instruction": "Chargez une table d'exemple ou rédigez vos commandes CREATE TABLE et INSERT."
        },
        {
          "stepNumber": 2,
          "title": "Rédiger les requêtes SQL",
          "instruction": "Formulez vos requêtes SELECT avec filtres WHERE, jointures JOIN et tris."
        },
        {
          "stepNumber": 3,
          "title": "Exécuter la requête",
          "instruction": "Cliquez sur Run Query ou faites Ctrl+Entrée pour lancer l'analyse en mémoire."
        },
        {
          "stepNumber": 4,
          "title": "Consulter la grille de données",
          "instruction": "Parcourez les enregistrements et téléchargez votre script sous script.sql."
        }
      ],
      "workedExample": {
        "title": "Exemple de Jointure et Agrégation SQL",
        "scenario": "Jointure des tables employés et départements pour calculer le salaire moyen par service.",
        "calculation": "SELECT d.name, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name;",
        "result": "Grille de données : 3 lignes calculées et affichées en 2 ms."
      },
      "faqs": [
        {
          "question": "L'éditeur est-il connecté à une base de données distante ?",
          "answer": "Non. Il utilise un moteur relationnel en mémoire dans le navigateur. Aucune donnée ne quitte votre terminal."
        },
        {
          "question": "Les données sont-elles conservées après rechargement de page ?",
          "answer": "Non. Les tables étant stockées dans la mémoire vive de l'onglet, le rechargement réinitialise le jeu d'essai."
        },
        {
          "question": "Quelles clauses SQL sont prises en charge ?",
          "answer": "La norme ANSI SQL est gérée : SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, JOIN, GROUP BY, HAVING et ORDER BY."
        },
        {
          "question": "Peut-on exporter les requêtes et résultats ?",
          "answer": "Oui. Vous pouvez copier les enregistrements ou télécharger le code sous forme de fichier .sql."
        }
      ]
    },
    "de": {
      "formulaTitle": "In-Memory Relationale Engine & ANSI-SQL-Abfragearchitektur",
      "formulaDescription": "Der SQL-Editor bietet eine relationale Abfrageumgebung direkt im Browser. Er verarbeitet ANSI-SQL-Befehle (CREATE TABLE, INSERT INTO, SELECT, JOIN) auf einem In-Memory-Schema ohne Serverkommunikation.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Schema wählen oder anlegen",
          "instruction": "Laden Sie Beispieldaten oder formulieren Sie eigene CREATE- und INSERT-Befehle."
        },
        {
          "stepNumber": 2,
          "title": "SQL-Abfragen schreiben",
          "instruction": "Schreiben Sie SELECT-Abfragen mit WHERE-Bedingungen, JOINs und Sortierungen."
        },
        {
          "stepNumber": 3,
          "title": "Abfrage starten",
          "instruction": "Klicken Sie auf Run Query oder drücken Sie Strg+Enter für die lokale Ausführung."
        },
        {
          "stepNumber": 4,
          "title": "Datentabelle prüfen & exportieren",
          "instruction": "Sehen Sie die Zeilen in der Ergebnistabelle ein und speichern Sie script.sql."
        }
      ],
      "workedExample": {
        "title": "Beispiel für SQL-JOIN und Aggregation",
        "scenario": "Verknüpfung von Mitarbeiter- und Abteilungstabellen zur Berechnung des Durchschnittsgehalts.",
        "calculation": "SELECT d.name, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name;",
        "result": "Ergebnistabelle: 3 Abteilungszeilen innerhalb von 2 ms übersichtlich gerendert."
      },
      "faqs": [
        {
          "question": "Besteht eine Verbindung zu einer produktiven Datenbank?",
          "answer": "Nein. Der SQL-Editor arbeitet auf einem isolierten In-Memory-Schema im Browser ohne Netzwerkverbindung."
        },
        {
          "question": "Bleiben Tabellen beim Neuladen der Seite erhalten?",
          "answer": "Nein. Da die Daten im flüchtigen Browser-Speicher liegen, wird das Schema beim Neuladen zurückgesetzt."
        },
        {
          "question": "Welche SQL-Befehle werden unterstützt?",
          "answer": "Gängige ANSI-SQL-Befehle wie SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, JOINs und GROUP BY werden unterstützt."
        },
        {
          "question": "Können die Abfragen exportiert werden?",
          "answer": "Ja. Sie können Abfragen als .sql-Datei herunterladen und Ergebnisse in die Zwischenablage kopieren."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Motor Relacional em Memória e Arquitetura de Consultas ANSI SQL",
      "formulaDescription": "O editor SQL fornece um executor de consultas relacionais em memória no próprio navegador. Executa instruções ANSI SQL padrão (CREATE, INSERT, SELECT, JOIN) gerando tabelas interativas sem contato com servidores externos.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escolher ou criar esquema",
          "instruction": "Carregue uma tabela de exemplo ou escreva comandos CREATE TABLE e INSERT."
        },
        {
          "stepNumber": 2,
          "title": "Elaborar consultas SQL",
          "instruction": "Crie consultas SELECT com filtros WHERE, junções JOIN e ordenação."
        },
        {
          "stepNumber": 3,
          "title": "Executar consulta",
          "instruction": "Clique em Run Query ou use Ctrl+Enter para rodar no motor em memória."
        },
        {
          "stepNumber": 4,
          "title": "Ver tabela e baixar",
          "instruction": "Examine as linhas resultantes na grade e salve o arquivo como script.sql."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Consulta SQL com JOIN e GROUP BY",
        "scenario": "Junção de tabelas de funcionários e departamentos para calcular média salarial.",
        "calculation": "SELECT d.name, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name;",
        "result": "Grade de dados: 3 linhas geradas com métricas completas em 2 ms."
      },
      "faqs": [
        {
          "question": "Existe conexão com bancos de dados em produção?",
          "answer": "Não. O editor roda em uma estrutura em memória no navegador com segurança e total privacidade."
        },
        {
          "question": "Os dados permanecem se eu atualizar a página?",
          "answer": "Não. Por estarem na memória volátil da aba, ao recarregar a página as tabelas voltam ao modelo inicial."
        },
        {
          "question": "Quais comandos SQL são suportados?",
          "answer": "Suporta a sintaxe ANSI SQL: SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, JOINs, GROUP BY e ORDER BY."
        },
        {
          "question": "É possível baixar as consultas digitadas?",
          "answer": "Sim. Você pode exportar seu script completo em formato de arquivo .sql."
        }
      ]
    },
    "ko": {
      "formulaTitle": "인메모리 관계형 엔진 및 ANSI SQL 쿼리 실행 구조",
      "formulaDescription": "본 SQL 에디터는 브라우저 내부에서 동작하는 인메모리 관계형 데이터베이스 쿼리 실행기입니다. CREATE TABLE, INSERT INTO, SELECT, JOIN, GROUP BY 등의 표준 ANSI SQL 문을 즉각 실행하여 표 형태의 결과를 실시간 렌더링합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "스키마 선택 또는 정의",
          "instruction": "샘플 테이블(직원, 주문 등)을 불러오거나 직접 CREATE TABLE 및 INSERT 문을 작성합니다."
        },
        {
          "stepNumber": 2,
          "title": "SQL 쿼리문 작성",
          "instruction": "WHERE 조건, JOIN 결합, GROUP BY 집계, ORDER BY 정렬이 포함된 SELECT 문을 작성합니다."
        },
        {
          "stepNumber": 3,
          "title": "쿼리 실행",
          "instruction": "Run Query 버튼 또는 Ctrl+Enter를 눌러 인메모리 엔진에서 즉시 쿼리를 수행합니다."
        },
        {
          "stepNumber": 4,
          "title": "결과 테이블 확인 및 저장",
          "instruction": "그리드 표로 출력된 데이터 레코드를 점검하고 script.sql 파일로 다운로드합니다."
        }
      ],
      "workedExample": {
        "title": "SQL JOIN 결합 및 부서별 평균 급여 집계 실전 예시",
        "scenario": "직원(employees) 테이블과 부서(departments) 테이블을 JOIN하여 부서별 인원수 및 평균 급여 산출.",
        "calculation": "SELECT d.name, COUNT(e.id) AS count, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name;",
        "result": "결과 그리드: 3개 부서별 집계 데이터가 2ms 만에 인터랙티브 표 형태로 즉각 표시."
      },
      "faqs": [
        {
          "question": "외부 운영 데이터베이스 서버와 연결되어 동작하나요?",
          "answer": "아닙니다. 브라우저 내부 임시 메모리에서만 동작하는 가상 관계형 엔진이므로 쿼리와 데이터가 외부에 유출되지 않습니다."
        },
        {
          "question": "웹페이지를 새로고침해도 작성한 테이블이 유지되나요?",
          "answer": "브라우저 휘발성 메모리에 저장되므로 페이지 새로고침 시 초기 샘플 데이터 상태로 재설정됩니다."
        },
        {
          "question": "어떤 표준 SQL 구문들을 지원하나요?",
          "answer": "SELECT, INSERT INTO, UPDATE, DELETE, CREATE TABLE, INNER/LEFT JOIN, GROUP BY, HAVING, ORDER BY 등 표준 ANSI SQL 문법이 지원됩니다."
        },
        {
          "question": "작성한 쿼리문이나 결과 테이블을 내보낼 수 있나요?",
          "answer": "네. 표 데이터를 클립보드에 복사하거나 작성한 SQL 스크립트를 .sql 파일로 즉시 다운로드할 수 있습니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Motore Relazionale in Memoria ed Esecuzione Query ANSI SQL",
      "formulaDescription": "L'editor SQL offre un motore relazionale in memoria direttamente nel browser. Esegue istruzioni ANSI SQL (CREATE TABLE, INSERT, SELECT, JOIN) e mostra i risultati in tabelle ordinate senza connessioni a server remoti.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scegliere o creare lo schema",
          "instruction": "Carica tabelle di esempio oppure scrivi istruzioni CREATE TABLE e INSERT."
        },
        {
          "stepNumber": 2,
          "title": "Comporre la query SQL",
          "instruction": "Scrivi query SELECT con filtri WHERE, clausole JOIN e ordinamento."
        },
        {
          "stepNumber": 3,
          "title": "Eseguire la query",
          "instruction": "Premi Run Query o Ctrl+Invio per elaborare i dati nel motore in memoria."
        },
        {
          "stepNumber": 4,
          "title": "Esaminare la tabella e salvare",
          "instruction": "Consulta le righe nella griglia e scarica lo script come script.sql."
        }
      ],
      "workedExample": {
        "title": "Esempio di JOIN e Aggregazione in SQL",
        "scenario": "Unione delle tabelle dipendenti e reparti per determinare lo stipendio medio per reparto.",
        "calculation": "SELECT d.name, AVG(e.salary) AS avg_sal FROM departments d JOIN employees e ON d.id = e.dept_id GROUP BY d.name;",
        "result": "Griglia risultati: 3 righe elaborate e mostrate in tabella in 2 ms."
      },
      "faqs": [
        {
          "question": "Il tool è connesso a un database in produzione?",
          "answer": "No. Il motore opera su uno schema in memoria nel browser con completa riservatezza dei dati."
        },
        {
          "question": "I dati restano memorizzati se ricarico la pagina?",
          "answer": "No. La memoria è temporanea: ricaricando la scheda si ripristina lo schema di esempio."
        },
        {
          "question": "Quali comandi SQL sono utilizzabili?",
          "answer": "Tutti i principali comandi ANSI SQL: SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, JOIN, GROUP BY e ORDER BY."
        },
        {
          "question": "Posso salvare le query scritte?",
          "answer": "Sì. Puoi copiare le righe o scaricare lo script completo come file .sql."
        }
      ]
    }
  }
};
