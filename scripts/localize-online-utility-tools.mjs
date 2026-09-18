import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

// ============================================================================
// 1. QR CODE GENERATOR (8 FAQs)
// ============================================================================
function updateQrCodeGenerator() {
  const filePath = path.join(dataDir, 'qr-code-generator.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const faqsByLocale = {
    es: [
      { question: "¿Cómo creo un código QR gratis?", answer: "Elige el tipo de contenido (URL web, texto, Wi-Fi, email, teléfono o vCard), introduce los datos, personaliza colores y descarga tu código QR en PNG o SVG al instante." },
      { question: "¿Caducan los códigos QR generados aquí?", answer: "No. Nuestro generador crea códigos QR estáticos permanentes. La información se codifica directamente en los módulos sin intermediarios ni caducidad." },
      { question: "¿Qué diferencia hay con los generadores de Adobe o Canva?", answer: "A diferencia de Adobe o Canva, no requerimos suscripciones ni cuentas de usuario. Ofrecemos exportación SVG vectorial y generador por lotes de forma gratuita y 100% privada." },
      { question: "¿Puedo generar múltiples códigos QR en bloque (bulk)?", answer: "Sí. Accede a la pestaña 'Bulk QR Code Generator', pega tu lista de enlaces y genera decenas de códigos QR de una sola vez." },
      { question: "¿Cómo crear un código QR para conexión Wi-Fi automática?", answer: "Selecciona 'Red Wi-Fi', introduce nombre de red (SSID), contraseña y tipo de cifrado. Al escanearlo, el móvil se conectará sin teclear contraseñas." },
      { question: "¿Qué formato descargar: PNG, SVG o JPG?", answer: "PNG para pantallas y redes sociales; SVG vectorial para impresiones profesionales, carteles y papelería sin pixelación." },
      { question: "¿Puedo añadir un logotipo en el centro del código QR?", answer: "Sí. Sube tu logotipo o elige iconos predefinidos. El nivel de corrección de errores se ajusta automáticamente para garantizar su legibilidad." },
      { question: "¿Se guardan mis datos o códigos en algún servidor?", answer: "No. Todo el proceso de generación ocurre de manera 100% local en tu navegador con total privacidad." }
    ],
    fr: [
      { question: "Comment créer un code QR gratuitement ?", answer: "Choisissez le type de contenu (URL, texte, Wi-Fi, email, téléphone ou vCard), saisissez vos informations, personnalisez le style et téléchargez votre QR code en PNG ou SVG." },
      { question: "Les QR codes générés expirent-ils un jour ?", answer: "Non. Ce sont des QR codes statiques permanents. Les données sont directement inscrites dans la matrice sans redirection serveur intermédiaire." },
      { question: "Quelle est la différence avec Adobe et Canva ?", answer: "Aucun compte ni abonnement requis, téléchargement vectoriel SVG gratuit, générateur par lot inclus et exécution 100% locale sans pistage." },
      { question: "Puis-je générer des codes QR en masse (bulk) ?", answer: "Oui, collez votre liste d'URLs ou de textes dans l'onglet 'Générateur par lot' pour créer plusieurs dizaines de codes en un clic." },
      { question: "Comment créer un QR code Wi-Fi à connexion directe ?", answer: "Indiquez le nom du réseau (SSID) et le mot de passe dans l'onglet Wi-Fi pour permettre une connexion automatique au scan." },
      { question: "Quel format de téléchargement privilégier ?", answer: "PNG pour un affichage sur écrans web et réseaux sociaux ; SVG vectoriel pour l'impression haute définition sur tous supports." },
      { question: "Puis-je intégrer mon logo au centre du code QR ?", answer: "Oui, importez votre logo d'entreprise. La correction d'erreur s'adapte automatiquement pour maintenir un scan optimal." },
      { question: "Mes données sont-elles conservées sur un serveur ?", answer: "Non, toute la génération s'exécute localement dans votre navigateur sans aucune transmission de données." }
    ],
    de: [
      { question: "Wie erstelle ich einen kostenlosen QR-Code?", answer: "Wählen Sie den gewünschten Inhaltstyp (Webseite, Text, WLAN, E-Mail, Telefon oder vCard), geben Sie die Daten ein und laden Sie den QR-Code als PNG oder SVG herunter." },
      { question: "Laufen die hier generierten QR-Codes jemals ab?", answer: "Nein. Wir erstellen permanente, statische QR-Codes. Die Zielinformationen sind direkt codiert und bleiben dauerhaft und uneingeschränkt funktionsfähig." },
      { question: "Was unterscheidet dieses Tool von Adobe und Canva?", answer: "Keine Anmeldung, keine Kosten, kostenloser SVG-Vektorexport, integrierter Stapelgenerator und 100% Datenschutz ohne Server-Tracking." },
      { question: "Kann ich mehrere QR-Codes gleichzeitig (Bulk) erstellen?", answer: "Ja, im Tab 'Massen-QR-Code-Generator' können Sie Listen von Webseiten einfügen und stapelweise verarbeiten." },
      { question: "Wie erstelle ich einen automatischen WLAN-QR-Code?", answer: "Geben Sie Netzwerkname (SSID) und Passwort ein. Beim Scannen mit dem Smartphone wird die Verbindung direkt hergestellt." },
      { question: "Welches Format sollte gewählt werden: PNG oder SVG?", answer: "PNG eignet sich ideal für Bildschirme und Präsentationen, SVG für gestochen scharfen Druck in beliebiger Größe." },
      { question: "Kann ich ein Firmenlogo in der Mitte platzieren?", answer: "Ja, laden Sie Ihr Logo hoch. Die Fehlerkorrektur wird automatisch erhöht, um die Lesbarkeit sicherzustellen." },
      { question: "Werden meine Daten auf einem Server gespeichert?", answer: "Nein. Die Erstellung läuft zu 100% lokal in Ihrem Browser ab. Keine Daten verlassen Ihr Gerät." }
    ],
    pt: [
      { question: "Como criar um código QR grátis?", answer: "Escolha o tipo de dado (URL, texto, Wi-Fi, e-mail, telefone ou vCard), preencha as informações e baixe seu código QR em PNG ou SVG na hora." },
      { question: "Os códigos QR gerados têm data de expiração?", answer: "Não. Nosso gerador produz códigos QR estáticos definitivos sem redirecionamentos e que nunca expiram." },
      { question: "Qual a diferença em relação ao Adobe ou Canva?", answer: "Sem exigência de login, sem assinaturas pagas, exportação vetorial SVG gratuita e geração em lote com total privacidade." },
      { question: "É possível gerar códigos QR em massa (bulk)?", answer: "Sim. Cole sua lista de links no modo em lote e processe dezenas de códigos simultaneamente." },
      { question: "Como gerar um QR code para Wi-Fi automático?", answer: "Digite o nome da rede (SSID) e a senha na aba Wi-Fi para que as pessoas se conectem sem precisar digitar a senha." },
      { question: "Qual formato baixar: PNG, SVG ou JPG?", answer: "PNG para redes sociais e websites; SVG vetorial para impressão profissional sem perda de qualidade." },
      { question: "Posso incluir logotipo da minha marca no centro?", answer: "Sim. Faça upload da imagem e o sistema ajustará a correção de erros para garantir leitura perfeita." },
      { question: "Os meus dados ficam salvos em algum servidor?", answer: "Não. Toda a renderização acontece no navegador de forma 100% segura e privada." }
    ],
    it: [
      { question: "Come creare un codice QR gratis?", answer: "Seleziona la tipologia di contenuto (URL web, testo, Wi-Fi, email, telefono o vCard), inserisci i dati e scarica il file PNG o SVG all'istante." },
      { question: "I codici QR generati hanno una scadenza?", answer: "No. Generiamo codici QR statici permanenti che non scadono mai e non dipendono da server intermediari." },
      { question: "In cosa differisce da Adobe e Canva?", answer: "Nessun account obbligatorio, nessun piano a pagamento, esportazione vettoriale SVG inclusa e massima privacy locale." },
      { question: "Posso generare codici QR in blocco (bulk)?", answer: "Sì, incolla un elenco di indirizzi nella scheda per la generazione massiva e scaricali tutti insieme." },
      { question: "Come creare un codice QR per il collegamento Wi-Fi?", answer: "Inserisci SSID e password nella scheda dedicata per consentire l'accesso immediato con la fotocamera." },
      { question: "Quale formato di download conviene scegliere?", answer: "PNG per siti e canali digitali; SVG per cartellonistica, volantini e stampe tipografiche ad alta definizione." },
      { question: "È possibile aggiungere un logo al centro?", answer: "Sì, caricando un logo aziendale la correzione degli errori viene potenziata automaticamente per preservare la scansione." },
      { question: "I miei dati vengono registrati da qualche parte?", answer: "No. Tutto viene elaborato in locale nel tuo browser per garantire la massima riservatezza." }
    ],
    ja: [
      { question: "QRコードジェネレーターとは何ですか？", answer: "WebサイトのURLやテキスト、Wi-Fi接続情報などをスマートフォンで読み取り可能な二次元バーコードに変換するツールです。" },
      { question: "作成したQRコードに有効期限はありますか？", answer: "いいえ。当ツールで生成されるQRコードは恒久的な「静的QRコード」であり、有効期限はなく永久に使用可能です。" },
      { question: "AdobeやCanvaのQRコード作成との違いは何ですか？", answer: "ユーザー登録や有料課金が不要で、高品質なベクターSVG出力や一括生成（バルク生成）を完全無料で利用できます。" },
      { question: "一度に大量のQRコードを一括作成できますか？", answer: "はい。「一括生成」タブから複数のURLを貼り付けるだけで、まとめて生成・ダウンロードが可能です。" },
      { question: "Wi-Fi接続用QRコードの作成方法は？", answer: "Wi-Fiタブを選択し、SSID（ネットワーク名）とパスワードを入力するだけで、スキャン時に自動接続するコードが作れます。" },
      { question: "PNG形式とSVG形式のどちらを選ぶべきですか？", answer: "Webサイトや画面表示にはPNG、チラシ・看板・名刺などの印刷用途には拡大しても劣化しないSVGが最適です。" },
      { question: "QRコードの中央にロゴマークを配置できますか？", answer: "はい。ロゴ画像をアップロード可能で、誤り訂正レベルを自動調整して確実な読み取りを維持します。" },
      { question: "入力したURLやパスワードはサーバーに送信されますか？", answer: "いいえ。すべての処理はお客様の端末（ブラウザ）内で完結するため、安全かつプライバシーが保たれます。" }
    ],
    ko: [
      { question: "무료로 QR 코드를 생성하는 방법은?", answer: "웹사이트 URL, 텍스트, Wi-Fi, 이메일, 명함 등 원하는 유형을 선택하고 정보를 입력한 뒤 고해상도 PNG 또는 SVG로 즉시 다운로드하세요." },
      { question: "생성된 QR 코드에 유효기간이 있나요?", answer: "아니요. 본 도구는 영구적인 정적 QR 코드를 생성하므로 시간이 지나도 만료되지 않고 평생 작동합니다." },
      { question: "Adobe나 Canva QR 코드 도구와의 차이점은?", answer: "회원가입이나 유료 결제 없이 인쇄용 벡터 SVG 무료 다운로드, 대량 생성 기능을 완전히 무료로 제공합니다." },
      { question: "한 번에 여러 개의 QR 코드를 대량(Bulk) 생성할 수 있나요?", answer: "네. 대량 생성 탭에서 링크 목록을 입력하면 수십 개의 QR 코드를 한 번에 생성하고 저장할 수 있습니다." },
      { question: "스캔 시 자동 연결되는 Wi-Fi QR 코드는 어떻게 만드나요?", answer: "네트워크 이름(SSID)과 비밀번호를 입력하면 스마트폰 카메라로 스캔 시 비밀번호 입력 없이 즉시 연결됩니다." },
      { question: "PNG와 SVG 중 어떤 파일 형식으로 저장해야 하나요?", answer: "모바일 화면과 웹 게시용은 PNG, 현수막, 전단지, 명함 등 고품질 인쇄용은 무손실 벡터 SVG를 권장합니다." },
      { question: "QR 코드 중앙에 브랜드 로고를 넣을 수 있나요?", answer: "네. 회사 로고나 맞춤 아이콘을 중앙에 삽입할 수 있으며 오류 복원율을 자동으로 높여 인식률을 유지합니다." },
      { question: "입력한 개인정보나 Wi-Fi 암호가 서버에 저장되나요?", answer: "아니요. 모든 생성 작업은 브라우저 내부에서만 처리되며 어떠한 데이터도 외부 서버로 전송되지 않습니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ qr-code-generator.json FAQs updated for all 9 locales.');
}

// ============================================================================
// 2. WORD COUNTER (11 FAQs)
// ============================================================================
function updateWordCounter() {
  const filePath = path.join(dataDir, 'word-counter.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const faqsByLocale = {
    es: [
      { question: "¿Qué es un contador de palabras?", answer: "Es una herramienta que calcula en tiempo real el número de palabras, caracteres con y sin espacios, frases, párrafos y tiempos estimados de lectura." },
      { question: "¿Cómo se cuentan las palabras?", answer: "Se contabilizan las secuencias de caracteres separadas por espacios en blanco, saltos de línea o signos de puntuación estándar." },
      { question: "¿Cuál es la diferencia entre caracteres con y sin espacios?", answer: "El recuento total incluye los espacios en blanco entre vocablos, mientras que el recuento sin espacios mide únicamente las letras, números y signos gráficos." },
      { question: "¿Cómo se calcula el tiempo de lectura?", answer: "Se basa en una velocidad de lectura media estándar de 200 a 250 palabras por minuto en adultos." },
      { question: "¿Cómo se calcula el tiempo estimado de locución?", answer: "Se toma como referencia una cadencia de habla oral de 130 a 150 palabras por minuto." },
      { question: "¿Cuál es la longitud ideal para publicaciones en redes sociales?", answer: "Para Twitter/X son 280 caracteres; para posts de LinkedIn se recomiendan entre 1.000 y 2.000 caracteres; y para descripciones de Instagram, hasta 2.200 caracteres." },
      { question: "¿Cuál es la extensión recomendada para un artículo de blog o SEO?", answer: "Los artículos completos y competitivos suelen tener entre 1.500 y 2.500 palabras para abordar temas a profundidad." },
      { question: "¿Qué es la densidad de palabras clave?", answer: "Es el porcentaje que representa una palabra o frase clave respecto al total de términos del texto." },
      { question: "¿Hay límite en la cantidad de texto que se puede analizar?", answer: "No, puedes pegar documentos enteros, ensayos universitarios o manuscritos completos sin restricción." },
      { question: "¿Queda registrado mi texto en algún lugar?", answer: "No. El análisis se realiza localmente en la memoria de tu navegador garantizando total confidencialidad." },
      { question: "¿Admite caracteres multilingües y acentos?", answer: "Sí, admite caracteres UTF-8 completos, acentos, caracteres cirílicos, asiáticos y emojis." }
    ],
    fr: [
      { question: "Qu'est-ce qu'un compteur de mots ?", answer: "C'est un outil qui analyse en temps réel le nombre de mots, de caractères (avec et sans espaces), de phrases, de paragraphes et le temps de lecture estimé." },
      { question: "Comment les mots sont-ils comptabilisés ?", answer: "Les mots sont identifiés par les séparateurs usuels tels que les espaces, retours à la ligne et ponctuations." },
      { question: "Quelle est la différence entre caractères avec et sans espaces ?", answer: "Le total avec espaces intègre les blancs typographiques, tandis que le décompte sans espaces ne retient que les symboles et lettres." },
      { question: "Comment est calculé le temps de lecture ?", answer: "Le calcul se base sur une vitesse moyenne de lecture silencieuse de 200 à 250 mots par minute chez l'adulte." },
      { question: "Comment est estimé le temps d'élocution à voix haute ?", answer: "L'estimation repose sur un débit moyen de prise de parole en public de 130 à 150 mots par minute." },
      { question: "Quelle est la longueur idéale pour les réseaux sociaux ?", answer: "280 caractères pour X (Twitter), environ 1 000 à 2 000 caractères pour LinkedIn et jusqu'à 2 200 pour Instagram." },
      { question: "Quelle longueur viser pour un article de blog SEO ?", answer: "Un article de référence se situe généralement entre 1 500 et 2 500 mots pour bien se positionner sur les moteurs de recherche." },
      { question: "Qu'est-ce que la densité des mots-clés ?", answer: "C'est la fréquence relative d'un mot par rapport au volume total de termes présents dans le contenu." },
      { question: "Y a-t-il une limite de volume de texte ?", answer: "Aucune limite : vous pouvez analyser de longs rapports, des mémoires ou des ouvrages entiers." },
      { question: "Mon texte est-il confidentiel ?", answer: "Absolument. Aucune phrase n'est transmise sur Internet, l'analyse reste confinée à votre navigateur." },
      { question: "Gère-t-il les caractères accentués et alphabets non-latins ?", answer: "Oui, prise en charge intégrale de la norme UTF-8, des accents et des caractères internationaux." }
    ],
    de: [
      { question: "Was ist ein Wortzähler (Word Counter)?", answer: "Ein Werkzeug zur Echtzeit-Erfassung von Wörtern, Zeichen (mit/ohne Leerzeichen), Sätzen, Absätzen und Lesezeiten." },
      { question: "Wie werden Wörter gezählt?", answer: "Wörter werden anhand von Leerzeichen, Zeilenumbrüchen und Interpunktionsregeln segmentiert und ermittelt." },
      { question: "Was ist der Unterschied zwischen Zeichen mit und ohne Leerzeichen?", answer: "Zeichen mit Leerzeichen zählen alle Anschläge inklusive Zwischenräume; ohne Leerzeichen werden nur gedruckte Buchstaben und Ziffern erfasst." },
      { question: "Wie wird die Lesezeit berechnet?", answer: "Grundlage ist eine durchschnittliche Lesegeschwindigkeit von 200 bis 250 Wörtern pro Minute." },
      { question: "Wie wird die Sprechzeit ermittelt?", answer: "Für gesprochene Vorträge und Podcasts wird eine Rate von 130 bis 150 Wörtern pro Minute zugrunde gelegt." },
      { question: "Welche Textlängen gelten für soziale Netzwerke?", answer: "280 Zeichen für X/Twitter, 1.000 bis 2.000 Zeichen für LinkedIn-Posts und bis zu 2.200 für Instagram-Beiträge." },
      { question: "Welche Wortanzahl ist ideal für SEO-Artikel?", answer: "Umfassende Blogbeiträge mit starker Suchmaschinenrelevanz umfassen typischerweise 1.500 bis 2.500 Wörter." },
      { question: "Was versteht man unter Keyword-Dichte?", answer: "Der prozentuale Anteil, den ein bestimmter Suchbegriff an der Gesamtwortzahl des Textes ausmacht." },
      { question: "Gibt es eine Obergrenze für Textmengen?", answer: "Nein, Sie können beliebig lange Abhandlungen, Bachelorarbeiten oder Buchkapitel einfügen." },
      { question: "Bleiben meine Texte geschützt?", answer: "Ja, die Textprüfung erfolgt rein lokal im Arbeitsspeicher Ihres Browsers ohne Serverübertragung." },
      { question: "Werden Umlaute und Sonderzeichen korrekt erfasst?", answer: "Ja, vollständige Unterstützung für deutsche Umlaute (ä, ö, ü, ß) und globale Zeichensätze." }
    ],
    pt: [
      { question: "O que é um contador de palavras?", answer: "É uma ferramenta para verificar em tempo real o número de palavras, caracteres (com e sem espaços), frases, parágrafos e estimativa de leitura." },
      { question: "Como as palavras são contabilizadas?", answer: "Identificam-se as palavras a partir de espaços em branco, quebras de parágrafo e divisores de pontuação." },
      { question: "Qual a diferença entre caracteres com e sem espaços?", answer: "Com espaços inclui todos os toques no teclado; sem espaços considera apenas letras, numerais e símbolos gráficos." },
      { question: "Como é calculado o tempo de leitura?", answer: "Utiliza-se a velocidade média de leitura silenciosa de 200 a 250 palavras por minuto." },
      { question: "Como é estimado o tempo de fala?", answer: "Calcula-se com base na velocidade média de oratória de 130 a 150 palavras por minuto." },
      { question: "Qual o tamanho ideal para redes sociais?", answer: "280 caracteres no X/Twitter, entre 1.000 e 2.000 caracteres no LinkedIn e até 2.200 no Instagram." },
      { question: "Quantas palavras deve ter um artigo de blog para SEO?", answer: "Artigos aprofundados e de boa colocação no Google costumam ter entre 1.500 e 2.500 palavras." },
      { question: "O que significa densidade de palavras-chave?", answer: "É a porcentagem que um termo representa em relação ao volume total de vocábulos do texto." },
      { question: "Existe limite de tamanho de texto?", answer: "Não há limites. Pode colar artigos extensos, monografias ou livros inteiros." },
      { question: "Meu texto fica gravado em algum lugar?", answer: "Não. A contagem funciona estritamente no seu navegador garantindo sigilo absoluto." },
      { question: "Suporta acentos e pontuação em português?", answer: "Sim, suporte completo a acentuação gráfica, cedilha e caracteres UTF-8." }
    ],
    it: [
      { question: "Che cos'è un contatore di parole?", answer: "Uno strumento per calcolare all'istante il numero di parole, caratteri (con e senza spazi), frasi, paragrafi e tempo di lettura." },
      { question: "Come vengono calcolate le parole?", answer: "Il conteggio riconosce le parole tramite spazi, a capo e segni di interpunzione." },
      { question: "Qual è la differenza tra caratteri con o senza spazi?", answer: "Il conteggio totale include gli spazi; quello senza spazi misura esclusivamente le lettere e i simboli effettivi." },
      { question: "Come viene calcolato il tempo di lettura?", answer: "Si fa riferimento a un ritmo medio di lettura di circa 200-250 parole al minuto." },
      { question: "Come si calcola il tempo di lettura a voce alta?", answer: "Si assume una cadenza tipica per discorsi e podcast di 130-150 parole al minuto." },
      { question: "Qual è la lunghezza ottimale per i social network?", answer: "280 caratteri per X/Twitter, 1.000-2.000 caratteri per LinkedIn e fino a 2.200 per Instagram." },
      { question: "Quante parole deve contenere un testo per la SEO?", answer: "Articoli approfonditi e ben posizionati contengono normalmente tra le 1.500 e le 2.500 parole." },
      { question: "Cosa si intende per densità delle parole chiave?", answer: "La percentuale di occorrenza di un vocabolo rispetto al totale delle parole presenti nel documento." },
      { question: "C'è un limite al numero di parole analizzabili?", answer: "Nessun limite: puoi incollare saggi accademici, tesi o interi manoscritti." },
      { question: "Il mio testo viene registrato o salvato?", answer: "No, l'elaborazione è interamente locale e confinata nella memoria del tuo browser." },
      { question: "Supporta caratteri accentati ed emoji?", answer: "Sì, supporta pienamente lettere accentate, punteggiatura speciale ed emoji UTF-8." }
    ],
    ja: [
      { question: "文字数カウント（Word Counter）とは何ですか？", answer: "テキストの文字数、単語数、空白の有無による文字数、段落数、読了予想時間をリアルタイムで計測するツールです。" },
      { question: "単語数はどのようにカウントされますか？", answer: "英単語はスペースで区切られた単位で、日本語や中国語などの文字は形態素や文字単位で正確に計測されます。" },
      { question: "「空白あり」と「空白なし」の違いは何ですか？", answer: "「空白あり」はスペースや改行を含めた総文字数で、「空白なし」は純粋な文章記号と文字のみを数えた数値です。" },
      { question: "読了時間（読むのにかかる時間）はどう計算されますか？", answer: "大人の平均的な読書速度（1分あたり400〜600文字、英語なら約200〜250単語）を基準に算出しています。" },
      { question: "スピーチや朗読の所要時間はどう計算されますか？", answer: "標準的なアナウンサーの音声速度（1分あたり約300〜350文字）を目安に計算されます。" },
      { question: "主要SNSの文字数目安はどれくらいですか？", answer: "X（旧Twitter）は全角140文字（半角280文字）、Instagramのキャプションは最大2,200文字が上限です。" },
      { question: "SEO記事やブログ記事の理想的な文字数は？", answer: "検索エンジンで上位表示を狙う専門性の高い解説記事では、2,000〜4,000文字以上が推奨されます。" },
      { question: "キーワード出現頻度（密度）とは何ですか？", answer: "文章全体の中で特定の単語が占める出現割合（パーセンテージ）のことです。" },
      { question: "文字数の入力上限はありますか？", answer: "制限はありません。長文レポート、卒論、小説の全章などを貼り付けて測定可能です。" },
      { question: "入力した文章が外部に保存されることはありますか？", answer: "ありません。すべての解析はお使いのブラウザ内部で行われ、サーバーに送信されません。" },
      { question: "ひらがな、カタカナ、漢字、絵文字に対応していますか？", answer: "はい。全角文字、半角文字、各種記号およびUnicode絵文字に完全対応しています。" }
    ],
    ko: [
      { question: "글자수 세기(Word Counter) 도구란?", answer: "입력한 문장의 글자 수(공백 포함/제외), 단어 수, 문장 수, 문단 수 및 예상 읽기 시간을 실시간으로 분석해주는 도구입니다." },
      { question: "단어 수는 어떻게 측정되나요?", answer: "띄어쓰기 및 줄바꿈 기호를 기준으로 어절 및 단어 단위가 정밀하게 집계됩니다." },
      { question: "공백 포함과 공백 제외의 차이점은?", answer: "공백 포함은 띄어쓰기와 줄바꿈을 포함한 전체 문자 수이며, 공백 제외는 순수 글자 및 문장 부호만을 계산합니다." },
      { question: "예상 독서 시간은 어떻게 계산되나요?", answer: "성인 평균 독서 속도(분당 400~500자 또는 영어 200~250단어)를 기준으로 계산됩니다." },
      { question: "발표 및 스피치 소요 시간 계산 기준은?", answer: "일반적인 프레젠테이션 및 발표 발화 속도(분당 300~350자)를 기준으로 소요 시간을 추정합니다." },
      { question: "SNS 플랫폼별 권장 글자 수는?", answer: "X(트위터)는 한글 140자, 인스타그램 캡션은 최대 2,200자, 블로그는 1,500~2,500자 이상을 추천합니다." },
      { question: "자기소개서 작성 시 공백 포함/제외 중 어느 것을 보나요?", answer: "대부분의 채용 포털 및 대기업 서류는 '공백 포함'을 기준으로 글자 수 제한을 적용합니다." },
      { question: "키워드 밀도(Keyword Density)란 무엇인가요?", answer: "전체 텍스트에서 특정 단어가 차지하는 출현 비율을 뜻합니다." },
      { question: "텍스트 입력량에 제한이 있나요?", answer: "입력 제한이 없어 대용량 리포트나 소설 원고 전체를 붙여넣어도 즉각 분석됩니다." },
      { question: "내가 입력한 글이 서버에 저장되나요?", answer: "아니요. 모든 글자 수 측정은 브라우저 메모리 안에서만 실행되므로 외부 유출 없이 안전합니다." },
      { question: "한글 맞춤법, 특수문자, 이모지도 지원되나요?", answer: "네. UTF-8 표준 규격의 한글 자모, 특수기호 및 이모지까지 완벽하게 지원합니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ word-counter.json FAQs updated for all 9 locales.');
}

// ============================================================================
// 3. JSON FORMATTER (10 FAQs)
// ============================================================================
function updateJsonFormatter() {
  const filePath = path.join(dataDir, 'json-formatter.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const faqsByLocale = {
    es: [
      { question: "¿Qué es un formateador JSON?", answer: "Es una herramienta que organiza estructuras JSON complejas aplicando sangría, formato legible y validación sintáctica de claves y valores." },
      { question: "¿Cómo formatear o embellecer JSON online?", answer: "Pega tu código JSON en el editor y haz clic en 'Formatear / Pretty Print' para estructurarlo con sangría de 2 o 4 espacios." },
      { question: "¿Cuál es la diferencia entre Pretty Print y Minificar?", answer: "Pretty Print añade espacios y saltos de línea para facilitar la lectura humana, mientras que Minificar elimina espacios en blanco para reducir el peso en peticiones de red." },
      { question: "¿Cómo valida este formateador los errores de sintaxis?", answer: "Comprueba comas sobrantes, comillas no cerradas, valores nulos incorrectos y señala la línea exacta donde ocurre el fallo." },
      { question: "¿Es seguro formatear JSON con datos confidenciales?", answer: "Totalmente seguro: el código se procesa de forma local en tu máquina sin enviarse a servidores de terceros." },
      { question: "¿Permite convertir JSON a otros formatos?", answer: "Sí, puedes convertir estructuras JSON a formato XML, CSV o representaciones tabulares limpias." },
      { question: "¿Puede procesar archivos JSON de gran tamaño?", answer: "Sí, gracias a su motor basado en Web Workers procesa grandes volúmenes de datos sin congelar la interfaz." },
      { question: "¿Qué estándares JSON cumple?", answer: "Cumple rigurosamente la especificación RFC 8259 y ECMA-404." },
      { question: "¿Se pueden ordenar las claves alfabéticamente?", answer: "Sí, cuenta con opción para ordenar alfabéticamente las propiedades de cada objeto." },
      { question: "¿Funciona sin conexión a internet?", answer: "Una vez cargada la página, opera perfectamente incluso en entornos sin conexión." }
    ],
    fr: [
      { question: "Qu'est-ce qu'un formateur JSON ?", answer: "C'est un outil qui indente, structure et valide la syntaxe des flux de données JSON pour les rendre parfaitement lisibles." },
      { question: "Comment formater du JSON en ligne ?", answer: "Collez votre code JSON brut et cliquez sur 'Formater' pour obtenir une arborescence claire avec retrait de 2 ou 4 espaces." },
      { question: "Quelle est la différence entre Pretty Print et Minifier ?", answer: "Pretty Print privilégie la clarté visuelle tandis que la minification supprime les espaces superflus pour optimiser le transfert réseau." },
      { question: "Comment détecte-t-il les erreurs de syntaxe ?", answer: "Il repère instantanément les virgules superflues, les guillemets manquants et indique le numéro de ligne précis de l'erreur." },
      { question: "Mes données d'API restent-elles confidentielles ?", answer: "Oui, aucun code n'est transmis sur internet : tout est exécuté localement dans votre navigateur." },
      { question: "Preut-il convertir du JSON en XML ou CSV ?", answer: "Oui, des fonctions d'exportation vers XML et CSV sont intégrées directement." },
      { question: "Peut-on formater des fichiers JSON volumineux ?", answer: "Oui, optimisé pour traiter rapidement des payloads de plusieurs mégaoctets." },
      { question: "Respecte-t-il la norme RFC officielle ?", answer: "Conforme aux normes internationales RFC 8259 et ECMA-404." },
      { question: "Peut-on trier les clés par ordre alphabétique ?", answer: "Oui, une option permet de trier automatiquement les attributs des objets." },
      { question: "Fonctionne-t-il hors ligne ?", answer: "Oui, l'outil fonctionne sans échange serveur une fois la page ouverte." }
    ],
    de: [
      { question: "Was ist ein JSON-Formatierer?", answer: "Ein Werkzeug zum Einrücken, Strukturieren und Validieren von JSON-Daten zur Steigerung der Lesbarkeit und Fehleranalyse." },
      { question: "Wie formatiere ich JSON online?", answer: "Fügen Sie unformatiertes JSON ein und klicken Sie auf 'Formatieren', um saubere Einrückungen mit 2 oder 4 Leerzeichen zu erzeugen." },
      { question: "Was ist der Unterschied zwischen Pretty Print und Minify?", answer: "Pretty Print formatiert für optimale menschliche Lesbarkeit; Minify entfernt alle unnötigen Leerzeichen zur Bandbreitenersparnis." },
      { question: "Wie werden Syntaxfehler angezeigt?", answer: "Fehlende Anführungszeichen oder unzulässige Kommas werden mit genauer Zeilen- und Spaltenangabe markiert." },
      { question: "Ist die Verarbeitung sensibler Daten sicher?", answer: "Vollständig sicher: Die Verarbeitung erfolgt lokal im Browser ohne Übertragung an externe Server." },
      { question: "Kann JSON in XML oder CSV konvertiert werden?", answer: "Ja, Konvertierungen in XML und tabellarische CSV-Formate werden unterstützt." },
      { question: "Können große JSON-Dateien verarbeitet werden?", answer: "Ja, performante Algorithmen verarbeiten auch mehrteilige Datenmengen reibungslos." },
      { question: "Welche Spezifikationen werden eingehalten?", answer: "Erfüllt die offiziellen Standards RFC 8259 und ECMA-404." },
      { question: "Können Objektschlüssel alphabetisch sortiert werden?", answer: "Ja, Schlüssel lassen sich auf Knopfdruck alphabetisch ordnen." },
      { question: "Funktioniert das Tool offline?", answer: "Ja, nach dem Laden der Webseite sind keine Internetanfragen für die Formatierung erforderlich." }
    ],
    pt: [
      { question: "O que é um formatador JSON?", answer: "É uma ferramenta para organizar e alinhar estruturas JSON, aplicando recuos e validando chaves e valores." },
      { question: "Como formatar JSON online?", answer: "Cole seu texto JSON e clique em 'Formatar' para organizar automaticamente o código com espaçamento padronizado." },
      { question: "Qual a diferença entre Pretty Print e Minificar?", answer: "Pretty Print adiciona quebras e recuos legíveis; Minificar elimina espaços para diminuir o tráfego de dados." },
      { question: "Como são identificados erros de sintaxe?", answer: "O validador aponta vírgulas extras, aspas ausentes ou colchetes não fechados com a linha exata do problema." },
      { question: "É seguro analisar dados sigilosos ou chaves de API?", answer: "Sim, segurança máxima: o processamento ocorre no próprio navegador sem upload para servidores." },
      { question: "Suporta conversão para XML ou CSV?", answer: "Sim, converta facilmente estruturas JSON para formatos XML ou tabelas CSV." },
      { question: "Processa arquivos JSON pesados?", answer: "Sim, arquitetura otimizada para trabalhar com grandes volumes de dados sem travamentos." },
      { question: "Segue os padrões oficiais da linguagem?", answer: "Conforme com as especificações RFC 8259 e ECMA-404." },
      { question: "Posso ordenar as propriedades alfabeticamente?", answer: "Sim, conta com opção para ordenar chaves em ordem alfabética." },
      { question: "Funciona sem acesso à internet?", answer: "Sim, opera localmente no navegador após a página ser aberta." }
    ],
    it: [
      { question: "Che cos'è un formattatore JSON?", answer: "Uno strumento per strutturare, indentare e convalidare dati JSON migliorandone la leggibilità." },
      { question: "Come formattare JSON online?", answer: "Incolla il codice grezzo e premi 'Formatta' per ottenere una visualizzazione ordinata a 2 o 4 spazi." },
      { question: "Che differenza c'è tra Pretty Print e Minifica?", answer: "Pretty Print ottimizza la lettura per programmatori; Minifica rimuove spazi e a capo per velocizzare le chiamate API." },
      { question: "Come vengono segnalati gli errori sintattici?", answer: "Il parser individua parentesi non chiuse o virgole superflue evidenziando la riga esatta." },
      { question: "I dati sensibili rimangono protetti?", answer: "Sì, l'analisi avviene al 100% nel tuo browser senza invio su server terzi." },
      { question: "Permette la conversione in XML o CSV?", answer: "Sì, supporta la trasformazione rapida verso XML e file tabellari CSV." },
      { question: "Supporta file JSON di grandi dimensioni?", answer: "Sì, è strutturato per gestire agevolmente file complessi e pesanti." },
      { question: "Quale standard rispetta?", answer: "Pienamente conforme agli standard ufficiali RFC 8259 ed ECMA-404." },
      { question: "Posso ordinare le chiavi in ordine alfabetico?", answer: "Sì, include la funzione di ordinamento alfabetico delle chiavi degli oggetti." },
      { question: "È utilizzabile offline?", answer: "Sì, non richiede connessione dati attiva dopo il caricamento della schermata." }
    ],
    ja: [
      { question: "JSONフォーマッターとは何ですか？", answer: "乱雑になったJSONコードに適切なインデントと改行を適用し、人間が読みやすい構造に整形・検証するツールです。" },
      { question: "オンラインでJSONを整形・整形表示するには？", answer: "テキストボックスにJSONを貼り付けて「フォーマット」をクリックするだけで、綺麗にインデントされたコードが生成されます。" },
      { question: "整形（Pretty Print）と圧縮（Minify）の違いは？", answer: "整形は読みやすさのためにスペースを付加し、圧縮はファイル容量削減のため余分な空白を除去します。" },
      { question: "構文エラーはどのように検出されますか？", answer: "末尾の不要なカンマや閉じ括弧の不足などを瞬時に検出し、エラー行番号とともにハイライト表示します。" },
      { question: "機密データやAPIキーの入力は安全ですか？", answer: "完全に安全です。データはブラウザのJavaScript内でのみ処理され、外部サーバーに送信されることはありません。" },
      { question: "XMLやCSVへの変換機能はありますか？", answer: "はい。JSONからXMLやCSV形式への相互変換機能をサポートしています。" },
      { question: "大容量のJSONファイルも扱えますか？", answer: "はい。Web Workerによる非同期処理により、数メガバイトの巨大なJSONも高速に処理します。" },
      { question: "対応しているJSON規格は何ですか？", answer: "標準仕様であるRFC 8259およびECMA-404に準拠しています。" },
      { question: "キーのアルファベット順ソートは可能ですか？", answer: "はい。オブジェクト内のキーを昇順に並べ替えるソート機能を備えています。" },
      { question: "オフライン環境でも動作しますか？", answer: "はい。ページを読み込んだ後は、インターネット接続が切断されてもそのまま利用可能です。" }
    ],
    ko: [
      { question: "JSON 포맷터(Formatter)란 무엇인가요?", answer: "압축되거나 정렬되지 않은 JSON 데이터에 적절한 들여쓰기와 줄바꿈을 적용하여 가독성을 높여주는 도구입니다." },
      { question: "온라인에서 JSON을 깔끔하게 정리하는 방법은?", answer: "JSON 코드를 붙여넣고 '포맷팅(Pretty Print)' 버튼을 누르면 2칸 또는 4칸 단위로 들여쓰기가 자동 적용됩니다." },
      { question: "Pretty Print와 Minify의 차이점은?", answer: "Pretty Print는 개발자의 가독성을 위해 공백을 추가하는 것이며, Minify는 네트워크 대역폭 절약을 위해 공백을 제거하는 작업입니다." },
      { question: "구문 오류(Syntax Error)는 어떻게 표시되나요?", answer: "닫히지 않은 따옴표나 불필요한 쉼표 등의 오류를 감지하여 정확한 줄 번호와 함께 안내합니다." },
      { question: "API 키나 개인정보가 포함된 JSON도 안전한가요?", answer: "100% 안전합니다. 모든 파싱 작업이 로컬 브라우저 내부에서만 실행되어 외부 서버로 유출되지 않습니다." },
      { question: "JSON을 XML 또는 CSV로 변환할 수 있나요?", answer: "네. 구조화된 JSON 데이터를 XML 또는 스프레드시트용 CSV 형식으로 손쉽게 변환할 수 있습니다." },
      { question: "용량이 큰 JSON 파일도 처리가 가능한가요?", answer: "네. 대용량 데이터도 브라우저 멈춤 현상 없이 원활하게 처리할 수 있도록 최적화되어 있습니다." },
      { question: "어떤 표준 규격을 준수하나요?", answer: "국제 표준인 RFC 8259 및 ECMA-404 사양을 완벽하게 준수합니다." },
      { question: "키(Key) 값을 알파벳 순으로 정렬할 수 있나요?", answer: "네. 오브젝트 내부의 속성 키를 알파벳 순서대로 정렬하는 기능을 지원합니다." },
      { question: "인터넷이 연결되지 않은 상태에서도 작동하나요?", answer: "네. 웹페이지가 로드된 후에는 오프라인 상태에서도 자유롭게 포맷팅할 수 있습니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ json-formatter.json FAQs updated for all 9 locales.');
}

// ============================================================================
// 4. JSON VALIDATOR (10 FAQs)
// ============================================================================
function updateJsonValidator() {
  const filePath = path.join(dataDir, 'json-validator.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const faqsByLocale = {
    es: [
      { question: "¿Qué es un validador JSON?", answer: "Es una herramienta de análisis que comprueba si una estructura de datos cumple rigurosamente con la sintaxis de la especificación JSON." },
      { question: "¿Cómo validar JSON online gratis?", answer: "Pega tu fragmento de código en el panel de validación. La herramienta analizará instantáneamente el texto e indicará si es válido o los errores exactos detectados." },
      { question: "¿Cuáles son los errores sintácticos más comunes en JSON?", answer: "Comas finales sobrantes (trailing commas), uso de comillas simples en lugar de comillas dobles, claves sin entrecomillar y valores undefined." },
      { question: "¿Señala la línea y columna exactas del fallo?", answer: "Sí, el motor analiza el árbol de tokens e indica con precisión el carácter y la línea donde se originó el error." },
      { question: "¿Es seguro validar JSON confidencial?", answer: "Absolutamente seguro: la validación se ejecuta en local mediante el motor JavaScript de tu navegador." },
      { question: "¿Valida esquemas JSON Schema?", answer: "Sí, comprueba tipos de datos requeridos, rangos numéricos y formatos según especificaciones estándar." },
      { question: "¿Permite reparar errores comunes automáticamente?", answer: "Sí, cuenta con una función de autocorrección para comillas simples y comas sobrantes." },
      { question: "¿Qué estándar oficial sigue?", answer: "Sigue los estándares internacionales RFC 8259 y ECMA-404." },
      { question: "¿Tiene límite de caracteres?", answer: "Sin restricciones prácticas de tamaño para proyectos de desarrollo." },
      { question: "¿Funciona en dispositivos móviles?", answer: "Totalmente compatible con navegadores móviles en smartphones y tablets." }
    ],
    fr: [
      { question: "Qu'est-ce qu'un validateur JSON ?", answer: "C'est un outil qui analyse la conformité syntaxique d'une chaîne de données par rapport aux spécifications JSON officielles." },
      { question: "Comment vérifier la validité d'un code JSON en ligne ?", answer: "Insérez votre texte dans le champ de vérification pour obtenir immédiatement le statut de validité et les erreurs éventuelles." },
      { question: "Quelles sont les erreurs JSON les plus fréquentes ?", answer: "Les virgules en trop en fin de liste, l'utilisation d'apostrophes simples à la place de guillemets doubles et les accolades orphelines." },
      { question: "L'outil précise-t-il la ligne de l'erreur ?", answer: "Oui, il affiche le numéro de ligne et de colonne précis du caractère fautif." },
      { question: "Mes données d'entreprise sont-elles sécurisées ?", answer: "Sécurité totale : l'analyse est effectuée exclusivement côté client dans votre navigateur." },
      { question: "Supporte-t-il la validation de schéma JSON ?", answer: "Oui, vérification des types de champs et des structures selon les spécifications." },
      { question: "Existe-t-il une correction automatique des erreurs ?", answer: "Une option permet de convertir automatiquement les guillemets simples et d'éliminer les virgules superflues." },
      { question: "Quelle norme est respectée ?", answer: "Respect strict des spécifications RFC 8259 et ECMA-404." },
      { question: "Y a-t-il une limite de taille ?", answer: "Non, analyse fluide même pour des fichiers volumineux." },
      { question: "Fonctionne-t-il sur smartphone ?", answer: "Oui, interface réactive adaptée aux mobiles et tablettes." }
    ],
    de: [
      { question: "Was ist ein JSON-Validator?", answer: "Ein Prüfprogramm, das Datenstrukturen auf formale Übereinstimmung mit den offiziellen JSON-Syntaxregeln überprüft." },
      { question: "Wie überprüfe ich JSON online auf Fehler?", answer: "Fügen Sie Ihren Code ein; der Validator analysiert die Eingabe in Echtzeit und meldet syntaktische Abweichungen sofort." },
      { question: "Was sind typische Fehlerquellen in JSON?", answer: "Nachgestellte Kommas (Trailing Commas), einfache statt doppelte Anführungszeichen und ungeschlossene Klammern." },
      { question: "Wird die genaue Fehlerposition angegeben?", answer: "Ja, Zeilennummer und Zeichenspalte werden exakt ausgewiesen, um das Problem schnell zu beheben." },
      { question: "Ist die Datenvalidierung privat?", answer: "Vollständig privat: Es werden keinerlei Nutzdaten an externe Server gesendet." },
      { question: "Wird JSON-Schema-Validierung unterstützt?", answer: "Ja, Struktur- und Typüberprüfungen werden zuverlässig unterstützt." },
      { question: "Gibt es eine automatische Fehlerkorrektur?", answer: "Typische Tippfehler wie einfache Anführungszeichen können auf Knopfdruck repariert werden." },
      { question: "Welche RFC-Standards gelten?", answer: "Konform mit den Spezifikationen RFC 8259 und ECMA-404." },
      { question: "Gibt es Größenbeschränkungen?", answer: "Keine praktischen Limits für gängige Entwickler-Payloads." },
      { question: "Ist das Tool auf Mobilgeräten nutzbar?", answer: "Ja, voll funktionsfähig auf allen modernen Smartphones und Tablets." }
    ],
    pt: [
      { question: "O que é um validador JSON?", answer: "É uma ferramenta para verificar se um bloco de dados segue fielmente as regras sintáticas do padrão JSON." },
      { question: "Como validar código JSON online?", answer: "Cole seu trecho de código e receba instantaneamente a confirmação de conformidade ou o detalhamento de erros." },
      { question: "Quais são os erros mais comuns em JSON?", answer: "Vírgulas sobrando no final de listas, uso de aspas simples em vez de duplas e chaves não delimitadas." },
      { question: "Mostra a linha e coluna exatas da falha?", answer: "Sim, o sistema indica com precisão o ponto exato da inconformidade sintática." },
      { question: "Meus dados de desenvolvimento ficam seguros?", answer: "Totalmente seguros: a análise é processada no próprio navegador sem tráfego de rede externo." },
      { question: "Faz validação com JSON Schema?", answer: "Sim, confere tipos de propriedades e regras estruturais." },
      { question: "Permite corrigir erros comuns com um clique?", answer: "Sim, conta com recurso para higienizar aspas simples e vírgulas excedentes." },
      { question: "Qual padrão é seguido?", answer: "Compatibilidade integral com RFC 8259 e ECMA-404." },
      { question: "Existe limite de linhas?", answer: "Sem limitações de volume para arquivos de programação." },
      { question: "Posso usar no celular?", answer: "Sim, design responsivo para smartphones e computadores." }
    ],
    it: [
      { question: "Che cos'è un validatore JSON?", answer: "Un'applicazione che esamina un frammento di testo per verificare la conformità con la sintassi formale JSON." },
      { question: "Come verificare la correttezza di un JSON online?", answer: "Inserisci il codice nel riquadro e ottieni all'istante l'esito della validazione con la mappa dei nodi." },
      { question: "Quali sono gli errori sintattici più frequenti?", answer: "Virgole finali in eccesso, apici singoli al posto di virgolette doppie e parentesi non bilanciate." },
      { question: "Viene indicata la riga precisa dell'errore?", answer: "Sì, l'applicazione segnala riga e colonna esatte dell'anomalia rilevata." },
      { question: "I dati caricati sono protetti?", answer: "Massima privacy: l'analisi è eseguita esclusivamente sul client senza trasferimenti web." },
      { question: "Supporta la validazione dello schema?", answer: "Sì, verifica la coerenza di tipi e strutture in accordo con gli standard." },
      { question: "Dispone di correzione automatica?", answer: "Sì, corregge automaticamente le virgolette non conformi e rimuove virgole superflue." },
      { question: "Quale standard RFC adotta?", answer: "Pienamente conforme a RFC 8259 e alle specifiche ECMA-404." },
      { question: "Ci sono vincoli di capienza?", answer: "Nessun limite restrittivo di caratteri." },
      { question: "Funziona su browser mobili?", answer: "Sì, utilizzabile agevolmente da smartphone e tablet." }
    ],
    ja: [
      { question: "JSONバリデーターとは何ですか？", answer: "データ構造が公式のJSON構文仕様（RFC 8259）に厳密に準拠しているかを検証・診断するツールです。" },
      { question: "オンラインでJSONの構文チェックを行うには？", answer: "コードを貼り付けるだけで、即座に構文の正当性を検証し、不備がある場合は原因を表示します。" },
      { question: "JSONでよくある構文エラーは何ですか？", answer: "末尾の余計なカンマ、ダブルクォーテーションの代わりにシングルクォーテーションを使用すること、括弧の閉じ忘れなどです。" },
      { question: "エラーの発生箇所（行と列）は特定できますか？", answer: "はい。エラーが発生した正確な行番号と文字位置（カラム番号）を明示して素早い修正を支援します。" },
      { question: "個人情報や社内データの検証は安全ですか？", answer: "完全に安全です。検証処理はすべてブラウザ内でローカル実行され、外部への通信は行われません。" },
      { question: "JSON Schema（スキーマ）検証に対応していますか？", answer: "はい。必須フィールドやデータ型の適合性をチェックするスキーマ検証をサポートしています。" },
      { question: "軽微な構文エラーの自動修正はできますか？", answer: "はい。シングルクォートの置換や末尾カンマの除去など、頻出エラーをワンクリックで自動修正できます。" },
      { question: "準拠している国際標準規格は何ですか？", answer: "国際標準であるRFC 8259およびECMA-404に準拠しています。" },
      { question: "文字数やファイル容量の制限はありますか？", answer: "実用上の制限はなく、数千行に及ぶ大規模なJSONコードもスムーズに検証できます。" },
      { question: "スマートフォンでも利用できますか？", answer: "はい。モバイルブラウザに最適化された操作しやすいインターフェースを採用しています。" }
    ],
    ko: [
      { question: "JSON 검증기(Validator)란 무엇인가요?", answer: "작성된 데이터가 표준 JSON 문법 규칙(RFC 8259)을 올바르게 따르고 있는지 검사하는 도구입니다." },
      { question: "온라인에서 무료로 JSON 문법을 확인하는 방법은?", answer: "입력창에 코드를 붙여넣으면 유효성 여부와 함께 구문 오류가 실시간으로 감지됩니다." },
      { question: "JSON 작성 시 가장 흔한 문법 실수는?", answer: "마지막 항목 뒤에 불필요한 쉼표(Trailing Comma)를 넣거나, 큰따옴표 대신 작은따옴표를 사용하는 경우입니다." },
      { question: "오류가 발생한 줄 번호와 위치를 알려주나요?", answer: "네. 구문 오류가 발생한 정확한 줄 번호와 컬럼 위치를 즉각 표시합니다." },
      { question: "민감한 개발 데이터 검증 시 보안 문제는 없나요?", answer: "전혀 없습니다. 모든 검증 프로세스가 사용자 컴퓨터의 브라우저 로컬 환경에서만 수행됩니다." },
      { question: "JSON Schema 검증도 지원하나요?", answer: "네. 지정된 스키마에 맞추어 데이터 형식 및 필수 필드 유효성을 함께 검사할 수 있습니다." },
      { question: "자동 문법 수정(Auto Fix) 기능이 있나요?", answer: "네. 작은따옴표를 큰따옴표로 바꾸거나 불필요한 끝 쉼표를 원클릭으로 정리해줍니다." },
      { question: "어떤 공식 표준을 준수하나요?", answer: "RFC 8259 및 ECMA-404 국제 표준 규격을 완벽하게 따릅니다." },
      { question: "입력 가능한 텍스트 크기에 제한이 있나요?", answer: "실무에서 쓰이는 수만 줄 이상의 대용량 JSON 데이터도 문제없이 검증 가능합니다." },
      { question: "모바일 스마트폰에서도 작동하나요?", answer: "네. 모바일 웹 브라우저 환경에서도 편리하게 이용하실 수 있습니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ json-validator.json FAQs updated for all 9 locales.');
}

// ============================================================================
// 5. PASSWORD GENERATOR (11 FAQs)
// ============================================================================
function updatePasswordGenerator() {
  const filePath = path.join(dataDir, 'password-generator.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const faqsByLocale = {
    es: [
      { question: "¿Qué es un generador de contraseñas seguras?", answer: "Es una herramienta que produce claves criptográficamente seguras combinando mayúsculas, minúsculas, números y símbolos aleatorios." },
      { question: "¿Cómo funciona la generación de contraseñas seguras?", answer: "Utiliza la API Web Crypto del navegador (crypto.getRandomValues), garantizando entropía criptográfica real frente a generadores pseudoaleatorios." },
      { question: "¿Qué longitud debe tener una contraseña segura?", answer: "Se recomienda un mínimo de 14 a 16 caracteres para resistir ataques modernos de fuerza bruta." },
      { question: "¿Por qué incluir símbolos y números?", answer: "Aumenta exponencialmente el espacio de combinaciones posibles, haciendo inviable su descifrado computacional." },
      { question: "¿Se almacenan las contraseñas generadas?", answer: "No. Se generan 100% en la memoria de tu dispositivo y nunca se transmiten ni registran en ningún servidor." },
      { question: "¿Qué es una contraseña fácil de recordar (passphrase)?", answer: "Es una secuencia de palabras aleatorias fáciles de memorizar para humanos pero extremadamente difíciles de vulnerar por computadoras." },
      { question: "¿Cómo verificar la solidez de una clave?", answer: "Nuestro medidor de entropía evalúa la longitud, variedad de caracteres y patrones predecibles en tiempo real." },
      { question: "¿Puedo excluir caracteres ambiguos como 0, O, 1, l?", answer: "Sí, puedes activar la opción 'Excluir caracteres ambiguos' para evitar confusiones tipográficas." },
      { question: "¿Puedo generar varias contraseñas a la vez?", answer: "Sí, puedes generar lotes de múltiples contraseñas para actualizar credenciales masivas." },
      { question: "¿Con qué frecuencia debo cambiar mis claves?", answer: "Se aconseja cambiarlas inmediatamente si sospechas de una brecha de seguridad o al menos de forma periódica." },
      { question: "¿Es compatible con gestores de contraseñas como 1Password o Bitwarden?", answer: "Totalmente compatible con gestores estándar como Bitwarden, 1Password, Dashlane y navegadores." }
    ],
    fr: [
      { question: "Qu'est-ce qu'un générateur de mots de passe sécurisés ?", answer: "C'est un outil qui crée des codes d'accès cryptographiquement robustes à partir de caractères aléatoires et variés." },
      { question: "Comment ce générateur garantit-il la sécurité ?", answer: "Il s'appuie sur l'API native Web Crypto de votre navigateur pour générer une entropie imprévisible." },
      { question: "Quelle est la longueur recommandée pour un mot de passe ?", answer: "Au moins 14 à 16 caractères pour résister aux attaques modernes par dictionnaire et force brute." },
      { question: "Pourquoi intégrer des symboles et des chiffres ?", answer: "Cela multiplie les combinaisons possibles et neutralise les algorithmes d'attaque automatisés." },
      { question: "Les mots de passe créés sont-ils enregistrés ?", answer: "Non. Ils sont générés exclusivement en local dans votre mémoire vive sans aucune transmission réseau." },
      { question: "Qu'est-ce qu'une phrase de passe (passphrase) ?", answer: "Une suite de mots aléatoires faciles à mémoriser pour l'humain mais quasi inviolable pour une machine." },
      { question: "Comment mesurer la robustesse d'un mot de passe ?", answer: "L'indicateur d'entropie calcule en direct la complexité selon les longueurs et jeux de caractères." },
      { question: "Peut-on éliminer les caractères ambigus (0, O, 1, l, I) ?", answer: "Oui, l'option dédiée prévient toute confusion visuelle lors de la frappe manuelle." },
      { question: "Puis-je créer plusieurs mots de passe d'un coup ?", answer: "Oui, la génération en série permet de préparer plusieurs identifiants simultanément." },
      { question: "Quand faut-il renouveler un mot de passe ?", answer: "En cas d'alerte sur un service en ligne ou lors de vérifications périodiques recommandées." },
      { question: "Compatible avec Bitwarden, KeePass ou 1Password ?", answer: "Parfaitement compatible avec tous les gestionnaires de mots de passe reconnus." }
    ],
    de: [
      { question: "Was ist ein sicherer Passwort-Generator?", answer: "Ein Werkzeug zur Erstellung kryptografisch starker Passwörter aus Groß-, Kleinbuchstaben, Zahlen und Sonderzeichen." },
      { question: "Wie funktioniert die Generierung technisch?", answer: "Durch Nutzung der browserinternen Web Crypto API (crypto.getRandomValues) für echte kryptografische Entropie." },
      { question: "Wie lang sollte ein sicheres Passwort sein?", answer: "Experten empfehlen mindestens 14 bis 16 Zeichen gegen moderne Brute-Force-Angriffsmethoden." },
      { question: "Warum sind Sonderzeichen und Ziffern wichtig?", answer: "Sie vergrößern den Suchraum für Angreifer exponentiell und erschweren automatisierte Entschlüsselungen." },
      { question: "Werden die Passwörter irgendwo gespeichert?", answer: "Nein. Die Erstellung erfolgt rein im Arbeitsspeicher Ihres Endgeräts ohne Speicherung auf Servern." },
      { question: "Was ist eine Passphrase?", answer: "Eine Kombination zufälliger Wörter, die man sich leicht merken kann, die jedoch extreme Sicherheit bietet." },
      { question: "Wie wird die Passwortstärke beurteilt?", answer: "Eine integrierte Entropieanzeige bewertet Zeichensatzvielfalt und Vorhersehbarkeit in Echtzeit." },
      { question: "Können leicht verwechselbare Zeichen (0, O, 1, l) ausgeschlossen werden?", answer: "Ja, diese Option verhindert Ablesefehler beim manuellen Eintippen." },
      { question: "Können mehrere Passwörter auf einmal erstellt werden?", answer: "Ja, Sie können Passwortlisten in beliebiger Stückzahl generieren." },
      { question: "Wie oft sollte man Passwörter wechseln?", answer: "Vor allem bei bekannten Sicherheitsvorfällen oder im Rahmen regelmäßiger Kontrollen." },
      { question: "Kompatibel mit Bitwarden, 1Password und KeePass?", answer: "Vollständig kompatibel mit allen gängigen Passwort-Managern." }
    ],
    pt: [
      { question: "O que é um gerador de senhas seguras?", answer: "É uma ferramenta para criar combinações criptograficamente fortes de letras, números e caracteres especiais." },
      { question: "Como funciona a tecnologia de segurança?", answer: "Utiliza a API nativa Web Crypto do navegador para assegurar aleatoriedade criptográfica de alto nível." },
      { question: "Qual deve ser o tamanho mínimo de uma senha?", answer: "Recomenda-se entre 14 e 16 caracteres para proteção robusta contra ataques de força bruta." },
      { question: "Por que usar símbolos e numerais?", answer: "Multiplica o número de permutações possíveis inviabilizando tentativas automáticas de invasão." },
      { question: "As senhas geradas são salvas na nuvem?", answer: "Não. As senhas são geradas na memória local do seu navegador e não passam por servidores." },
      { question: "O que é uma frase-senha (passphrase)?", answer: "Uma sequência de palavras aleatórias fáceis de memorizar para humanos e impenetráveis para softwares." },
      { question: "Como avaliar o nível de segurança da senha?", answer: "O medidor de entropia em tempo real calcula a resistência frente a ataques modernos." },
      { question: "Posso remover caracteres parecidos como 0, O, 1, l?", answer: "Sim, ative a opção para descartar caracteres ambíguos e facilitar a digitação." },
      { question: "Posso gerar várias senhas ao mesmo tempo?", answer: "Sim, crie listas com múltiplas senhas com um só clique." },
      { question: "Com que frequência devo renovar senhas?", answer: "Sempre que houver suspeita de vazamento em serviços utilizados ou em auditorias periódicas." },
      { question: "Funciona com Bitwarden e outros cofres?", answer: "Compatível com Bitwarden, 1Password, KeePass e recursos nativos de navegadores." }
    ],
    it: [
      { question: "Che cos'è un generatore di password sicure?", answer: "Uno strumento che produce chiavi di accesso ad alta complessità crittografica combinando caratteri assortiti." },
      { question: "Quale tecnologia garantisce la robustezza?", answer: "L'uso dell'API Web Crypto integrata nei browser assicura entropia casuale autentica." },
      { question: "Quanto deve essere lunga una password sicura?", answer: "Almeno 14-16 caratteri per respingere attacchi con dizionari e algoritmi di forza bruta." },
      { question: "Perché inserire simboli e numeri?", answer: "Perché espande enormemente il numero di combinazioni necessarie per decifrare la chiave." },
      { question: "Le password vengono memorizzate su un server?", answer: "No. Tutto avviene localmente nella memoria temporanea del browser senza alcuna archiviazione remota." },
      { question: "Cos'è una passphrase mnemonica?", answer: "Una frase composta da parole casuali facile da ricordare ma estremamente sicura." },
      { question: "Come si verifica la forza di una password?", answer: "L'indicatore di sicurezza analizza lunghezza, set di caratteri e assenza di schemi ripetitivi." },
      { question: "Posso escludere caratteri ambigui (es. 0 e O, 1 e l)?", answer: "Sì, puoi rimuoverli per evitare errori di trascrizione visiva." },
      { question: "Posso generare elenchi multipli di password?", answer: "Sì, puoi creare liste complete di codici simultaneamente." },
      { question: "Quando è consigliabile cambiare password?", answer: "In caso di violazioni di sicurezza segnalate o periodicamente per account critici." },
      { question: "È compatibile con Bitwarden e 1Password?", answer: "Assolutamente compatibile con tutti i password manager sul mercato." }
    ],
    ja: [
      { question: "安全なパスワードジェネレーターとは何ですか？", answer: "暗号学的に安全な乱数アルゴリズムを用い、英大文字・小文字・数字・記号を組み合わせた強固なパスワードを自動生成するツールです。" },
      { question: "どのようにして安全性が保証されていますか？", answer: "ブラウザ標準の「Web Crypto API（crypto.getRandomValues）」を採用し、予測不可能な真の乱数エントロピーを確保しています。" },
      { question: "安全なパスワードの推奨文字数は？", answer: "最新の総当たり攻撃（ブルートフォース）を防ぐため、最低でも14〜16文字以上が強く推奨されます。" },
      { question: "記号や数字を混ぜる理由は何ですか？", answer: "取り得る組み合わせパターン数が指数関数的に増大し、解読にかかる時間を天文学的年数に引き延ばすためです。" },
      { question: "生成されたパスワードはサーバーに保存されますか？", answer: "いいえ。生成処理は100%ブラウザのメモリ内でのみ実行され、外部への送信・保存は一切行われません。" },
      { question: "パスフレーズ（覚えやすいパスワード）とは？", answer: "ランダムな単語を複数繋ぎ合わせ、人間が覚えやすくコンピュータには解読されにくい強固なパスワード形式です。" },
      { question: "パスワードの強度はどのように判定されますか？", answer: "文字長、文字種の多様性、予測可能なパターンの有無をリアルタイムでエントロピー計算して判定します。" },
      { question: "見分けにくい文字（0とO、1とlなど）を除外できますか？", answer: "はい。「類似文字の除外」を有効にすることで、手入力時の見間違いを防止できます。" },
      { question: "複数のパスワードをまとめて一括生成できますか？", answer: "はい。アカウント一括管理用に複数のパスワードを同時に作成・コピー可能です。" },
      { question: "パスワードの変更頻度はどうすべきですか？", answer: "サービス側の情報漏洩が発覚した場合や、定期的なセキュリティ見直しの際に更新することが推奨されます。" },
      { question: "1PasswordやBitwardenなどのパスワード管理ツールに対応していますか？", answer: "はい。主要なすべてのパスワードマネージャーと完全な互換性があります。" }
    ],
    ko: [
      { question: "안전한 비밀번호 생성기란 무엇인가요?", answer: "암호학적으로 안전한 무작위 조합을 활용하여 대소문자, 숫자, 특수기호가 결합된 강력한 비밀번호를 생성하는 도구입니다." },
      { question: "보안성은 기술적으로 어떻게 보장되나요?", answer: "최신 웹 브라우저 내장 암호화 API인 Web Crypto API(crypto.getRandomValues)를 사용하여 예측 불가능한 엔트로피를 제공합니다." },
      { question: "안전한 비밀번호의 권장 길이는 얼마인가요?", answer: "무차별 대입 공격(Brute-Force)을 효과적으로 방어하기 위해 최소 14자~16자 이상을 권장합니다." },
      { question: "숫자와 특수문자를 혼합해야 하는 이유는?", answer: "문자 조합의 경우의 수가 기하급수적으로 늘어나 해킹 프로그램의 복호화 연산을 무력화하기 때문입니다." },
      { question: "생성된 비밀번호가 서버에 기록되나요?", answer: "아니요. 모든 생성 과정은 사용자 단말기 브라우저 메모리 내에서만 처리되며 서버로 전송되지 않습니다." },
      { question: "패스프레이즈(Passphrase)란 무엇인가요?", answer: "임의의 단어들을 조합하여 사람은 기억하기 쉽고 컴퓨터는 해킹하기 어렵게 만든 차세대 암호 방식입니다." },
      { question: "비밀번호 보안 강도는 어떻게 측정되나요?", answer: "길이와 사용된 문자 종류, 취약한 패턴을 실시간 엔트로피 공식으로 정밀 분석하여 표시합니다." },
      { question: "헷갈리기 쉬운 문자(0과 O, 1과 l 등)를 제외할 수 있나요?", answer: "네. '유사 문자 제외' 옵션을 선택하여 육안 식별 시 오타를 예방할 수 있습니다." },
      { question: "한 번에 여러 개의 암호를 동시에 생성할 수 있나요?", answer: "네. 다중 생성 기능을 통해 여러 계정용 비밀번호 목록을 손쉽게 생성할 수 있습니다." },
      { question: "비밀번호는 얼마나 자주 변경해야 하나요?", answer: "보안 침해 의심이 발생했을 때 즉시 변경하거나 정기적인 점검 주기에 맞추어 업데이트하는 것이 좋습니다." },
      { question: "Bitwarden, 1Password 등 비밀번호 관리 프로그램과 호환되나요?", answer: "네. 모든 주요 비밀번호 관리 프로그램 및 브라우저 자동 완성 기능과 완벽하게 호환됩니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ password-generator.json FAQs updated for all 9 locales.');
}

// ============================================================================
// 6. PDF MERGE (10 FAQs)
// ============================================================================
function updatePdfMerge() {
  const filePath = path.join(dataDir, 'pdf-merge.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const faqsByLocale = {
    es: [
      { question: "¿Qué es una herramienta para unir PDF (PDF Merge)?", answer: "Es un servicio que permite combinar múltiples documentos PDF independientes en un único archivo consolidado." },
      { question: "¿Cómo unir varios archivos PDF gratis online?", answer: "Arrastra tus documentos PDF a la herramienta, ordénalos según tu preferencia y haz clic en 'Combinar PDF' para descargarlo de inmediato." },
      { question: "¿Puedo cambiar el orden de las páginas antes de unirlas?", answer: "Sí, puedes arrastrar y reorganizar los archivos o eliminar páginas no deseadas antes de la consolidación final." },
      { question: "¿Hay límite de páginas o tamaño de archivo?", answer: "Sin límites estrictos; puedes unir decenas de documentos en un solo paso." },
      { question: "¿Se reduce la calidad de los documentos al combinarlos?", answer: "No. Se preservan intactas las fuentes tipográficas, vectores y calidad de resolución original." },
      { question: "¿Se suben mis archivos confidenciales a servidores externos?", answer: "No. Toda la unión de documentos ocurre en tu propio navegador de forma 100% privada sin subir nada a la nube." },
      { question: "¿Puedo unir PDFs con contraseñas o firmas digitales?", answer: "Los archivos protegidos deben desbloquearse previamente con la contraseña correcta para poder procesar sus páginas." },
      { question: "¿Es gratis o requiere registro?", answer: "Totalmente gratuito, sin suscripciones, sin registros y sin marcas de agua publicitarias." },
      { question: "¿Funciona en teléfonos móviles?", answer: "Sí, funciona de manera fluida en navegadores móviles de smartphones y tablets." },
      { question: "¿Se conservan los enlaces y marcadores originales?", answer: "Sí, los enlaces internos y la estructura de navegación se mantienen en el documento unificado resultante." }
    ],
    fr: [
      { question: "Qu'est-ce qu'un outil de fusion PDF (PDF Merge) ?", answer: "C'est un utilitaire qui permet d'assembler plusieurs documents PDF distincts en un seul fichier cohérent." },
      { question: "Comment fusionner des fichiers PDF gratuitement en ligne ?", answer: "Déposez vos fichiers PDF, organisez leur ordre d'apparition et cliquez sur 'Fusionner les PDF' pour le téléchargement." },
      { question: "Peut-on modifier l'ordre des documents avant fusion ?", answer: "Oui, glissez-déposez les vignettes pour agencer l'ordre exact souhaité." },
      { question: "Y a-t-il une limite sur le nombre de pages ?", answer: "Aucune limite contraignante : combinez librement plusieurs fichiers volumineux." },
      { question: "La qualité du texte et des images est-elle conservée ?", answer: "La fidélité est intégrale : polices vectorielles et résolutions d'origine restent inchangées." },
      { question: "Mes documents confidentiels sont-ils protégés ?", answer: "Absolument : la fusion s'opère dans votre navigateur sans téléversement vers un serveur distant." },
      { question: "Peut-on fusionner des PDF protégés par mot de passe ?", answer: "Le mot de passe doit être saisi pour autoriser la lecture des pages avant l'assemblage." },
      { question: "L'outil est-il gratuit et sans filigrane ?", answer: "100% gratuit, sans inscription préalable et sans ajout de logo promotionnel." },
      { question: "Est-ce compatible avec les appareils mobiles ?", answer: "Entièrement fonctionnel sur iOS, Android, macOS et Windows." },
      { question: "Les signets et liens interactifs sont-ils préservés ?", answer: "Oui, la structure de navigation interne reste active dans le document final." }
    ],
    de: [
      { question: "Was ist ein PDF-Zusammenfügen-Tool (PDF Merge)?", answer: "Ein Werkzeug zum Zusammenführen mehrerer einzelner PDF-Dokumente zu einer einzigen strukturierten Datei." },
      { question: "Wie kann man mehrere PDF-Dateien online kostenlos zusammenfügen?", answer: "PDFs hochladen, per Drag & Drop in die gewünschte Reihenfolge bringen und auf 'PDF zusammenfügen' klicken." },
      { question: "Kann die Seitenreihenfolge vorab geändert werden?", answer: "Ja, Dokumente und Seiten lassen sich beliebig verschieben oder entfernen." },
      { question: "Gibt es Begrenzungen für Dateigröße oder Seitenzahl?", answer: "Keine praktischen Einschränkungen für normale Büro- und Studienunterlagen." },
      { question: "Geht beim Zusammenführen Text- oder Bildqualität verloren?", answer: "Nein, Schriften, Vektoren und Grafiken bleiben in nativer Auflösung erhalten." },
      { question: "Werden vertrauliche Dokumente hochgeladen?", answer: "Nein. Alle Operationen laufen lokal in Ihrem Browser über JavaScript ab; keine Datenübertragung." },
      { question: "Können passwortgeschützte PDFs verbunden werden?", answer: "Geschützte Dateien müssen zuvor mit dem gültigen Passwort freigegeben werden." },
      { question: "Kostet die Nutzung etwas oder entstehen Wasserzeichen?", answer: "Vollständig kostenlos ohne Werbung, Wasserzeichen oder Registrierungszwang." },
      { question: "Funktioniert das Tool auf Smartphones?", answer: "Ja, uneingeschränkt nutzbar auf Android, iPhone und Tablets." },
      { question: "Bleiben Hyperlinks und Lesezeichen erhalten?", answer: "Ja, bestehende Verknüpfungen und Gliederungspunkte werden in das Zieldokument übernommen." }
    ],
    pt: [
      { question: "O que é uma ferramenta de juntar PDF (PDF Merge)?", answer: "É um utilitário para agrupar múltiplos arquivos PDF independentes em um único documento completo." },
      { question: "Como juntar vários arquivos PDF grátis online?", answer: "Arraste seus PDFs para a tela, ordene na sequência desejada e clique em 'Juntar PDF' para salvar." },
      { question: "Posso reordenar as páginas antes de mesclar?", answer: "Sim, reposicione os arquivos arrastando-os facilmente até atingir a ordem desejada." },
      { question: "Há restrição de páginas ou tamanho de arquivo?", answer: "Não há limites rígidos; junte dezenas de páginas com tranquilidade." },
      { question: "A qualidade dos gráficos e fontes é preservada?", answer: "Sim, sem perda de resolução ou distorção tipográfica." },
      { question: "Meus documentos pessoais sobem para algum servidor?", answer: "Não. A mesclagem opera 100% no seu navegador com sigilo e segurança garantidos." },
      { question: "Dá para unir PDFs protegidos por senha?", answer: "Arquivos criptografados exigem a inserção prévia da senha para desbloqueio." },
      { question: "O serviço aplica marcas d'água no PDF final?", answer: "Nenhuma marca d'água é inserida; o arquivo final permanece limpo e profissional." },
      { question: "Funciona no celular?", answer: "Sim, compatibilidade perfeita com smartphones Android e iOS." },
      { question: "Os links e sumários são mantidos?", answer: "Sim, links internos e estrutura documental são preservados no arquivo unificado." }
    ],
    it: [
      { question: "Che cos'è uno strumento per unire PDF (PDF Merge)?", answer: "Un'utilità che permette di fondere più documenti PDF separati in un unico archivio continuo." },
      { question: "Come unire più PDF gratis online?", answer: "Trascina i file PDF nell'interfaccia, imposta l'ordine di lettura e clicca su 'Unisci PDF' per scaricare il risultato." },
      { question: "Posso cambiare la sequenza dei documenti?", answer: "Sì, puoi riordinare o eliminare elementi tramite intuitivo trascinamento." },
      { question: "Esistono limiti al numero di pagine unibili?", answer: "Nessun vincolo restrittivo per la combinazione di più documenti." },
      { question: "La nitidezza del testo viene compromessa?", answer: "Nessun degrado: vettorialità e qualità delle immagini rimangono inalterate." },
      { question: "I documenti vengono trasferiti online?", answer: "No, la procedura si conclude interamente all'interno del browser senza invio di dati." },
      { question: "È possibile unire PDF protetti da password?", answer: "Sì, purché si fornisca la password corretta per consentire la lettura delle pagine." },
      { question: "Il servizio inserisce filigrane nei PDF?", answer: "Assolutamente no: il file generato è pulito e privo di loghi esterni." },
      { question: "È compatibile con smartphone e tablet?", answer: "Sì, fruibile agevolmente da qualsiasi dispositivo mobile." },
      { question: "I segnalibri e i link ipertestuali rimangono attivi?", answer: "Sì, i riferimenti interni e i collegamenti ipertestuali vengono mantenuti." }
    ],
    ja: [
      { question: "PDF結合ツール（PDF Merge）とは何ですか？", answer: "複数の独立したPDFファイルを1つのまとまったPDF文書に結合・統合するオンラインツールです。" },
      { question: "無料で複数のPDFを結合する方法は？", answer: "PDFファイルをドラッグ＆ドロップし、希望の並び順に整えて「PDFを結合」ボタンを押すだけで完了します。" },
      { question: "結合前にページの並び順を変更できますか？", answer: "はい。プレビューをドラッグして直感的に順序を入れ替えたり、不要なファイルを削除できます。" },
      { question: "ページ数やファイルサイズの制限はありますか？", answer: "実質的な制限はなく、多くのページを含む複数ファイルを一度に結合できます。" },
      { question: "結合によって文字や画像の画質は劣化しますか？", answer: "いいえ。フォントのベクター情報や画像解像度は元の品質のまま保持されます。" },
      { question: "機密書類がサーバーにアップロードされる危険はありますか？", answer: "一切ありません。結合処理は100%お使いのブラウザ（ローカル）で処理されるため、極めて安全です。" },
      { question: "パスワード保護されたPDFも結合できますか？", answer: "暗号化されたPDFは、パスワードを入力して解除した後に結合可能となります。" },
      { question: "利用料や透かし（ウォーターマーク）はありますか？", answer: "完全無料です。利用制限や余計な透かしが入ることはありません。" },
      { question: "スマートフォンからでも利用できますか？", answer: "はい。iPhoneやAndroidなどのスマートフォンブラウザからも快適に操作可能です。" },
      { question: "元ファイル内のリンクやしおり（目次）は維持されますか？", answer: "はい。内部ハイパーリンクや文書構造は結合後のファイルにもそのまま引き継がれます。" }
    ],
    ko: [
      { question: "PDF 병합(PDF Merge) 도구는 어떻게 작동하나요?", answer: "여러 개의 개별 PDF 문서를 순서대로 합쳐 하나의 통일된 완성본 PDF로 병합해주는 도구입니다." },
      { question: "온라인에서 무료로 PDF를 합치는 방법은?", answer: "병합할 PDF 파일들을 끌어다 놓고 원하는 순서로 정렬한 뒤 'PDF 병합' 버튼을 누르면 즉시 다운로드됩니다." },
      { question: "병합하기 전에 문서 순서를 변경할 수 있나요?", answer: "네. 마우스 드래그를 통해 페이지 및 파일 순서를 자유롭게 재배치할 수 있습니다." },
      { question: "페이지 수나 파일 용량에 제한이 있나요?", answer: "업무 및 학습용 대용량 문서도 제한 없이 자유롭게 병합할 수 있습니다." },
      { question: "합친 후 텍스트나 이미지 화질이 저하되나요?", answer: "아니요. 원본 문서의 벡터 폰트와 고해상도 그래픽 품질이 그대로 유지됩니다." },
      { question: "개인정보나 중요 문서가 서버로 유출될 위험은 없나요?", answer: "전혀 없습니다. 모든 병합 작업이 사용자의 웹 브라우저 내부에서만 실행되므로 안전합니다." },
      { question: "비밀번호가 걸려 있는 암호화된 PDF도 병합되나요?", answer: "암호화된 문서는 먼저 올바른 비밀번호를 입력하여 잠금을 해제한 후 병합할 수 있습니다." },
      { question: "워터마크가 찍히거나 유료 결제가 필요한가요?", answer: "가입이나 결제 없이 100% 무료이며 어떠한 워터마크도 생성되지 않습니다." },
      { question: "스마트폰이나 태블릿에서도 쓸 수 있나요?", answer: "네. 모바일 기기에서도 동일하게 빠르고 편리하게 이용할 수 있습니다." },
      { question: "문서 내부 링크나 목차 정보가 보존되나요?", answer: "네. 내부 하이퍼링크 및 북마크 구조가 합쳐진 최종 문서에도 그대로 유지됩니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ pdf-merge.json FAQs updated for all 9 locales.');
}

updateQrCodeGenerator();
updateWordCounter();
updateJsonFormatter();
updateJsonValidator();
updatePasswordGenerator();
updatePdfMerge();
console.log('All 6 utility tools updated successfully!');
