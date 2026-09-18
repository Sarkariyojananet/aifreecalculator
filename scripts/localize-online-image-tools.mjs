import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

// Helper to replace text within HTML tags
function localizeHtml(html, dictionary) {
  let result = html;
  for (const [en, trans] of Object.entries(dictionary)) {
    // Escape regex special chars
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Replace text between tags or standalone
    result = result.replace(new RegExp(escaped, 'g'), trans);
  }
  return result;
}

// ============================================================================
// 1. IMAGE COMPRESSOR
// ============================================================================
function updateImageCompressor() {
  const filePath = path.join(dataDir, 'image-compressor.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const enFaqs = data.en.faqs;
  const enHtml = data.en.contentHtml;

  const faqsByLocale = {
    es: [
      { question: "¿Qué es un compresor de imágenes?", answer: "Es una herramienta que reduce el tamaño de archivo de las fotografías digitales optimizando la codificación y eliminando metadatos innecesarios manteniendo la máxima claridad visual." },
      { question: "¿Cómo comprimir imágenes gratis online?", answer: "Arrastra tu imagen a nuestro compresor gratuito, selecciona el tamaño deseado (20KB, 50KB, 100KB o 200KB) y descarga el resultado optimizado de inmediato." },
      { question: "¿Puedo comprimir una imagen a 50KB?", answer: "Sí. Selecciona la opción '50 KB'. El algoritmo ajustará automáticamente calidad y resolución para situar el archivo por debajo de 50KB." },
      { question: "¿Es posible comprimir a 100KB?", answer: "Sí, es el estándar habitual para portales de empleo, trámites administrativos y tiendas de comercio electrónico." },
      { question: "¿Se puede comprimir a 20KB?", answer: "Sí, ideal para firmas electrónicas y fotografías de pasaporte requeridas en formularios gubernamentales." },
      { question: "¿Puedo comprimir fotos a 200KB?", answer: "Sí, perfecto para banners web, blogs y optimización de velocidad de carga en dispositivos móviles." },
      { question: "¿Afecta la compresión a la calidad de la imagen?", answer: "A niveles moderados de compresión la diferencia es imperceptible para el ojo humano." },
      { question: "¿Se suben mis fotos a algún servidor?", answer: "No. Todo el procesamiento se realiza 100% en tu navegador de forma privada mediante HTML5 Canvas." },
      { question: "¿Qué formatos de imagen son compatibles?", answer: "Es compatible con formatos JPG, JPEG, PNG y WebP con conversión de formato opcional." }
    ],
    fr: [
      { question: "Qu'est-ce qu'un compresseur d'images ?", answer: "C'est un outil qui réduit le poids en kilo-octets des photos numériques en optimisant l'encodage tout en préservant la netteté visuelle." },
      { question: "Comment compresser une image gratuitement en ligne ?", answer: "Déposez votre image, choisissez la taille cible (20 Ko, 50 Ko, 100 Ko ou 200 Ko) et téléchargez le résultat optimisé directement depuis votre navigateur." },
      { question: "Puis-je compresser une image à 50 Ko ?", answer: "Oui. Sélectionnez le préréglage '50 Ko' pour réduire automatiquement le poids sous cette limite exacte." },
      { question: "Est-il possible de compresser à 100 Ko ?", answer: "Oui, c'est le format standard requis pour les formulaires de candidature et les pièces d'identité en ligne." },
      { question: "Peut-on compresser une photo à 20 Ko ?", answer: "Oui, spécialement conçu pour les signatures numériques et les photos d'identité officielles." },
      { question: "Peut-on compresser à 200 Ko ?", answer: "Oui, idéal pour les bannières web, les blogs et un chargement ultra-rapide sur mobile." },
      { question: "La compression réduit-elle la qualité d'image ?", answer: "À des niveaux modérés, la différence visuelle est virtuellement indétectable à l'œil nu." },
      { question: "Mes photos sont-elles téléchargées sur un serveur ?", answer: "Non. Le traitement s'exécute à 100% en local dans votre navigateur en toute confidentialité." },
      { question: "Quels formats d'image sont pris en charge ?", answer: "L'outil prend en charge les formats JPG, JPEG, PNG et WebP avec conversion possible." }
    ],
    de: [
      { question: "Was ist ein Bildkompressor?", answer: "Ein Bildkompressor reduziert die Dateigröße digitaler Bilder durch Optimierung der Codierungsparameter bei gleichbleibender visueller Schärfe." },
      { question: "Wie kann ich ein Bild online kostenlos komprimieren?", answer: "Laden Sie Ihr Bild per Drag & Drop hoch, wählen Sie die Zielgröße (20KB, 50KB, 100KB oder 200KB) und laden Sie die optimierte Datei direkt im Browser herunter." },
      { question: "Kann ich ein Bild auf 50KB komprimieren?", answer: "Ja. Wählen Sie '50 KB', und das Tool passt Qualität und Dimensionen automatisch an, um die Grenze von 50KB einzuhalten." },
      { question: "Ist eine Komprimierung auf 100KB möglich?", answer: "Ja, dies ist der gängige Standard für Bewerbungsportale und behördliche Online-Formulare." },
      { question: "Kann ich ein Bild auf 20KB verkleinern?", answer: "Ja, perfekt geeignet für digitale Unterschriften und Passfotos bei behördlichen Anträgen." },
      { question: "Kann ich Fotos auf 200KB komprimieren?", answer: "Ja, ideal für Webseiten-Banner, Online-Shops und schnelle Ladezeiten auf Mobilgeräten." },
      { question: "Verringert die Komprimierung die Bildqualität?", answer: "Bei moderater Komprimierung ist der Unterschied für das menschliche Auge praktisch unsichtbar." },
      { question: "Werden meine Bilder auf einen Server übertragen?", answer: "Nein. Die gesamte Verarbeitung erfolgt zu 100% lokal im Browser über HTML5 Canvas und bleibt privat." },
      { question: "Welche Bildformate werden unterstützt?", answer: "Unterstützt werden JPG, JPEG, PNG und WebP mit optionaler Formatkonvertierung." }
    ],
    pt: [
      { question: "O que é um compressor de imagens?", answer: "É uma ferramenta que reduz o tamanho dos arquivos de imagem otimizando parâmetros de codificação e preservando a nitidez visual." },
      { question: "Como comprimir imagens grátis online?", answer: "Envie sua foto, escolha o tamanho desejado (20KB, 50KB, 100KB ou 200KB) e baixe a imagem otimizada diretamente no navegador." },
      { question: "Posso comprimir uma imagem para 50KB?", answer: "Sim. Selecione '50 KB' e o algoritmo ajustará qualidade e dimensões para atingir a meta de 50KB ou menos." },
      { question: "É possível comprimir para 100KB?", answer: "Sim, é o padrão exigido na maioria dos portais de emprego e formulários governamentais." },
      { question: "Consigo comprimir para 20KB?", answer: "Sim, perfeito para fotos 3x4 e assinaturas digitais em cadastros oficiais." },
      { question: "Posso comprimir para 200KB?", answer: "Sim, ideal para banners de sites, blogs e e-commerce com carregamento rápido no celular." },
      { question: "A compressão prejudica a qualidade visual?", answer: "Em níveis equilibrados de compressão, a perda visual é imperceptível a olho nu." },
      { question: "As minhas fotos são enviadas para algum servidor?", answer: "Não. O processamento ocorre 100% no seu navegador com total privacidade e segurança." },
      { question: "Quais formatos de imagem são suportados?", answer: "Suporta arquivos JPG, JPEG, PNG e WebP com opção de conversão entre eles." }
    ],
    it: [
      { question: "Che cos'è un compressore di immagini?", answer: "È uno strumento che riduce le dimensioni in kilobyte delle fotografie digitali ottimizzando la codifica e mantenendo la qualità visiva." },
      { question: "Come comprimere un'immagine gratis online?", answer: "Carica la tua foto, seleziona la dimensione desiderata (20KB, 50KB, 100KB o 200KB) e scarica subito l'immagine ottimizzata." },
      { question: "Posso comprimere un'immagine a 50KB?", answer: "Sì. Seleziona l'opzione '50 KB' per consentire all'algoritmo di calibrare risoluzione e qualità sotto la soglia di 50KB." },
      { question: "È possibile comprimere a 100KB?", answer: "Sì, è lo standard richiesto da moduli concorsuali, portali di lavoro e piattaforme scolastiche." },
      { question: "Posso comprimere una foto a 20KB?", answer: "Sì, perfetto per firme digitali e fototessere per documenti d'identità." },
      { question: "Si possono comprimere immagini a 200KB?", answer: "Sì, la soluzione ideale per siti web, blog e negozi online che richiedono massima velocità di caricamento." },
      { question: "La compressione degrada la qualità visiva?", answer: "A livelli moderati la perdita di definizione è praticamente invisibile all'occhio umano." },
      { question: "Le mie immagini vengono inviate a un server?", answer: "No. Tutta l'elaborazione avviene al 100% in locale nel browser garantendo la massima riservatezza." },
      { question: "Quali formati sono supportati?", answer: "Supporta formati JPG, JPEG, PNG e WebP con possibilità di conversione diretta." }
    ],
    ja: [
      { question: "画像圧縮ツールとは何ですか？", answer: "画質を維持しながら、エンコード設定を最適化して画像ファイルの容量（KB/MB）を小さくするオンラインツールです。" },
      { question: "オンラインで画像を無料圧縮するにはどうすればよいですか？", answer: "画像をドラッグ＆ドロップし、目標サイズ（20KB、50KB、100KB、200KB）を選択するだけで、ブラウザ内で即座に最適化して保存できます。" },
      { question: "画像を50KB以下に圧縮できますか？", answer: "はい。「50 KB」を選択すると、アルゴリズムが品質と解像度を自動調整して50KB以内に収めます。" },
      { question: "100KBに圧縮することは可能ですか？", answer: "はい。就職活動の履歴書添付やWebフォームで最も標準的な100KBにワンクリックで最適化できます。" },
      { question: "20KBまで小さく圧縮できますか？", answer: "はい。公的申請書類、電子署名、証明写真などで要求される極小サイズ20KBにも対応しています。" },
      { question: "200KBに圧縮できますか？", answer: "はい。Webサイトのバナーやブログ記事向けに、鮮明さを保ちながら読み込み速度を向上させるのに最適です。" },
      { question: "圧縮すると画質は劣化しますか？", answer: "適切な圧縮率であれば、肉眼ではほとんど見分けがつかない高品質を維持します。" },
      { question: "画像がサーバーにアップロードされる心配はありますか？", answer: "いいえ。すべての処理はブラウザ内で完結（クライアントサイド）するため、サーバーへの送信は一切なく安全です。" },
      { question: "対応している画像形式は何ですか？", answer: "JPG、JPEG、PNG、WebP形式に対応し、相互変換も可能です。" }
    ],
    ko: [
      { question: "이미지 압축기란 무엇인가요?", answer: "선명한 화질을 유지하면서 파일 용량(KB/MB)을 효과적으로 줄여주는 무료 온라인 최적화 도구입니다." },
      { question: "온라인에서 무료로 이미지를 압축하는 방법은?", answer: "이미지를 업로드하고 원하는 용량(20KB, 50KB, 100KB, 200KB)을 선택한 후 압축된 이미지를 즉시 다운로드하세요." },
      { question: "이미지를 50KB로 압축할 수 있나요?", answer: "네. '50 KB' 옵션을 선택하면 알고리즘이 화질과 해상도를 자동 조절하여 50KB 이하로 최적화합니다." },
      { question: "100KB로 압축이 가능한가요?", answer: "네. 입사 지원서류 및 정부 민원 포털에서 가장 널리 요구되는 100KB 규격으로 손쉽게 변환할 수 있습니다." },
      { question: "20KB 초소형 용량으로도 압축되나요?", answer: "네. 공공기관 서식 및 전자 서명, 증명사진 업로드 규격인 20KB 이하로 정확히 맞춰드립니다." },
      { question: "200KB로 압축할 수 있나요?", answer: "네. 웹사이트 배너와 블로그에 최적화된 고화질 200KB 규격을 제공합니다." },
      { question: "압축하면 사진 품질이 저하되나요?", answer: "균형 잡힌 압축 방식을 사용하여 일반 사용자의 육안으로는 구별하기 힘든 선명도를 유지합니다." },
      { question: "내 사진이 외부 서버에 저장되나요?", answer: "아니요. 모든 작업은 브라우저 내부(100% 클라이언트 측)에서 처리되므로 외부 유출 걱정 없이 안전합니다." },
      { question: "지원하는 이미지 포맷은 무엇인가요?", answer: "JPG, JPEG, PNG, WebP 형식을 완벽하게 지원합니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ image-compressor.json FAQs updated for all 9 locales.');
}

// ============================================================================
// 2. IMAGE RESIZER
// ============================================================================
function updateImageResizer() {
  const filePath = path.join(dataDir, 'image-resizer.json');
  const data = JSON.parse(filePath ? fs.readFileSync(filePath, 'utf8') : '{}');

  const faqsByLocale = {
    es: [
      { question: "¿Qué es un redimensionador de imágenes?", answer: "Es una herramienta que modifica las dimensiones físicas en píxeles, centímetros o pulgadas, y ajusta el peso del archivo a objetivos específicos como 50KB." },
      { question: "¿Cómo redimensionar una imagen online gratis?", answer: "Sube tu archivo, define las dimensiones o el peso en KB deseado, ajusta la relación de aspecto y descarga la imagen redimensionada al instante." },
      { question: "¿Cómo redimensionar una foto a 50KB?", answer: "Selecciona el modo 'Por tamaño (KB)', introduce 50 KB y la herramienta optimizará automáticamente las dimensiones y la compresión." },
      { question: "¿Cómo cambiar el tamaño en centímetros o pulgadas?", answer: "Elige el modo 'Por dimensiones físicas (cm/pulgadas)' e introduce los valores deseados con la resolución DPI adecuada para impresión." },
      { question: "¿Qué es DPI y por qué importa?", answer: "DPI (puntos por pulgada) define la densidad de impresión. 300 DPI es el estándar profesional para documentos impresos nítidos, mientras que 72 DPI es habitual en pantallas." },
      { question: "¿Se deforma la imagen al cambiar el tamaño?", answer: "No, siempre que mantengas activada la opción 'Mantener relación de aspecto', la imagen conservará sus proporciones originales." },
      { question: "¿Puedo redimensionar fotos para pasaportes y visados?", answer: "Sí, disponemos de ajustes predefinidos como 3.5x4.5 cm o 2x2 pulgadas que cumplen los estándares oficiales." },
      { question: "¿Se reduce la calidad al ampliar una imagen?", answer: "Aumentar el tamaño de un mapa de bits más allá de su resolución nativa puede causar pixelación; se recomienda redimensionar a la baja." },
      { question: "¿Es seguro este redimensionador?", answer: "Absolutamente seguro. La imagen nunca sale de tu navegador ni se almacena en servidores externos." },
      { question: "¿Qué formatos son compatibles?", answer: "Admite formatos JPG, JPEG, PNG y WebP." }
    ],
    fr: [
      { question: "Qu'est-ce qu'un redimensionneur d'images ?", answer: "C'est un outil permettant d'ajuster les dimensions en pixels ou en centimètres et de calibrer le poids du fichier (ex. 50 Ko) pour vos besoins spécifiques." },
      { question: "Comment redimensionner une image gratuitement en ligne ?", answer: "Importez votre photo, entrez les dimensions ou le poids souhaité en Ko, conservez les proportions et téléchargez le résultat immédiatement." },
      { question: "Comment redimensionner une photo à 50 Ko ?", answer: "Activez le mode 'Par taille (Ko)', définissez 50 Ko et notre outil ajuste automatiquement compression et pixels." },
      { question: "Comment changer la taille en centimètres ou en pouces ?", answer: "Basculez sur le mode 'Dimensions physiques (cm/pouces)' et renseignez les mesures nécessaires avec la résolution DPI voulue." },
      { question: "Qu'est-ce que le DPI et quelle est son importance ?", answer: "Le DPI (points par pouce) détermine la finesse d'impression. 300 DPI est recommandé pour l'impression haute définition, 72 DPI pour le web." },
      { question: "Mon image risque-t-elle d'être déformée ?", answer: "Non, en maintenant le verrouillage du ratio d'aspect activé, les proportions restent parfaitement intactes." },
      { question: "Est-ce adapté pour les photos d'identité et visas ?", answer: "Oui, les formats officiels (3,5x4,5 cm, 2x2 pouces) sont facilement configurables." },
      { question: "La qualité diminue-t-elle lors d'un agrandissement ?", answer: "Agrandir une image matricielle peut créer du flou ; il est toujours préférable de réduire la taille plutôt que de l'augmenter." },
      { question: "Cet outil en ligne est-il confidentiel et sécurisé ?", answer: "Totalement sécurisé. Aucun fichier n'est transmis à un serveur distant, tout est traité localement." },
      { question: "Quels formats d'image sont acceptés ?", answer: "Prend en charge les formats JPG, JPEG, PNG et WebP." }
    ],
    de: [
      { question: "Was ist ein Bildgrößenänderer (Image Resizer)?", answer: "Ein Tool zum Ändern der Bildabmessungen in Pixeln oder Zentimetern sowie zum gezielten Anpassen der Dateigröße auf Vorgaben wie 50KB." },
      { question: "Wie kann ich ein Bild online kostenlos verkleinern?", answer: "Laden Sie Ihr Foto hoch, geben Sie die gewünschten Pixel oder Dateigröße in KB an und laden Sie das skalierte Bild sofort herunter." },
      { question: "Wie skaliere ich ein Foto auf 50KB?", answer: "Wählen Sie den Modus 'Nach Dateigröße (KB)', geben Sie 50 KB ein und das Tool berechnet die passende Kombination aus Abmessung und Kompression." },
      { question: "Wie ändere ich die Bildmaße in Zentimetern oder Zoll?", answer: "Wählen Sie 'Physische Abmessungen (cm/Zoll)' und legen Sie die Maße zusammen mit dem DPI-Wert für den Druck fest." },
      { question: "Was bedeutet DPI und warum ist es wichtig?", answer: "DPI steht für Punkte pro Zoll. Für professionelle Druckerzeugnisse sind 300 DPI Standard, während für Bildschirme 72 DPI genügen." },
      { question: "Verzerrt sich das Bild bei der Größenänderung?", answer: "Nein, solange das Seitenverhältnis gesperrt ist, bleibt das Bild exakt proportional." },
      { question: "Kann ich Passbilder und Visafotos anpassen?", answer: "Ja, Standardmaße wie 3,5x4,5 cm oder 2x2 Zoll lassen sich millimetergenau einstellen." },
      { question: "Geht beim Vergrößern Qualität verloren?", answer: "Ja, das künstliche Hochskalieren von Pixelgrafiken kann Unschärfe erzeugen; Verkleinern bleibt verlustfrei scharf." },
      { question: "Ist die Bildbearbeitung datenschutzsicher?", answer: "Vollständig privat. Bilder werden niemals auf Server hochgeladen, sondern rein lokal verarbeitet." },
      { question: "Welche Bildformate werden unterstützt?", answer: "Unterstützt werden JPG, JPEG, PNG und WebP." }
    ],
    pt: [
      { question: "O que é um redimensionador de imagens?", answer: "É uma ferramenta para alterar a largura e altura de fotos em pixels, centímetros ou polegadas, e ajustar o peso do arquivo para metas como 50KB." },
      { question: "Como redimensionar imagem online grátis?", answer: "Envie sua imagem, defina as novas medidas ou o tamanho em KB desejado e baixe a imagem pronta sem complicações." },
      { question: "Como redimensionar foto para 50KB?", answer: "Selecione o modo 'Por tamanho (KB)', digite 50 KB e o sistema otimiza a escala e compressão automaticamente." },
      { question: "Como mudar o tamanho para centímetros ou polegadas?", answer: "Escolha a opção 'Dimensões físicas (cm/polegadas)' e configure as medidas exatas com a densidade de DPI necessária." },
      { question: "O que é DPI e qual sua importância?", answer: "DPI (pontos por polegada) indica a densidade gráfica para impressão. 300 DPI é ideal para impressos nítidos e 72 DPI para visualização em telas." },
      { question: "A imagem fica distorcida ao redimensionar?", answer: "Não, mantendo a proporção de aspecto travada, a imagem conserva seu enquadramento natural." },
      { question: "Posso criar fotos para passaporte e visto?", answer: "Sim, medidas oficiais como 3x4 cm, 3,5x4,5 cm e 5x7 cm são facilmente configuradas." },
      { question: "Ampliar a foto reduz a qualidade?", answer: "Sim, aumentar imagens rasterizadas além da resolução original pode causar pixelização; diminuir sempre preserva máxima nitidez." },
      { question: "O processo é seguro para fotos pessoais?", answer: "100% seguro. Nenhum arquivo é transferido para servidores web; tudo opera no seu navegador." },
      { question: "Quais formatos posso redimensionar?", answer: "Compatível com JPG, JPEG, PNG e WebP." }
    ],
    it: [
      { question: "Che cos'è uno strumento per ridimensionare immagini?", answer: "Un'utilità per modificare larghezza e altezza di immagini in pixel o centimetri e calibrare il peso del file su valori come 50KB." },
      { question: "Come ridimensionare un'immagine gratis online?", answer: "Seleziona la tua immagine, imposta le dimensioni o i KB desiderati, blocca le proporzioni e scarica il file ottimizzato." },
      { question: "Come ridimensionare una foto a 50KB?", answer: "Usa la modalità 'Per dimensione (KB)', inserisci 50 KB e lo strumento regolerà automaticamente qualità e risoluzione." },
      { question: "Come impostare le dimensioni in centimetri o pollici?", answer: "Seleziona 'Dimensioni fisiche (cm/pollici)' e specifica i valori con il valore DPI corretto per la stampa." },
      { question: "Cosa significa DPI e a cosa serve?", answer: "I DPI rappresentano i punti per pollice. 300 DPI garantiscono stampe cartacee nitide, mentre 72 DPI sono ottimali per il web." },
      { question: "L'immagine rischia di apparire deformata?", answer: "No, mantenendo attivo il vincolo delle proporzioni, la foto non subirà alcuna distorsione." },
      { question: "È utilizzabile per fototessere e visti?", answer: "Certamente, formati standard come 35x45 mm o 2x2 pollici sono pienamente supportati." },
      { question: "Ingrandire l'immagine comporta perdita di nitidezza?", answer: "Sì, scalare verso l'alto genera sgranature; la riduzione invece mantiene dettagli perfetti." },
      { question: "Le immagini caricate sono al sicuro?", answer: "Massima sicurezza: i file non vengono mai inviati a server esterni e rimangono sul tuo computer." },
      { question: "Quali estensioni di file sono gestite?", answer: "Supporta i formati JPG, JPEG, PNG e WebP." }
    ],
    ja: [
      { question: "画像リサイズツールとは何ですか？", answer: "画像の縦横ピクセル数や印刷用センチメートル単位を変更し、必要に応じて50KBなどの指定容量に調整できるツールです。" },
      { question: "無料でオンラインで画像サイズを変更する方法は？", answer: "画像をアップロードし、希望のサイズ（px/cm）または目標KB数を入力してダウンロードするだけです。" },
      { question: "画像を50KBにリサイズするにはどうすればよいですか？", answer: "「ファイルサイズ（KB）指定」モードで50KBと入力すると、画質と寸法が自動調整されます。" },
      { question: "センチメートル（cm）やインチ単位で変更できますか？", answer: "はい。「実寸指定（cm/inch）」モードを選び、印刷用DPI値を設定して正確な寸法で出力できます。" },
      { question: "DPIとは何ですか？なぜ重要なのですか？", answer: "DPI（1インチあたりのドット数）は印刷解像度を表します。高品質印刷には300 DPI、Web用には72 DPIが適しています。" },
      { question: "リサイズすると画像が歪みますか？", answer: "「縦横比を固定」を有効にしておけば、比率が崩れることなく綺麗に拡大縮小されます。" },
      { question: "証明写真やパスポート写真の規格に合わせられますか？", answer: "はい。35×45mmや2×2インチなど、各種申請書類の規格に合わせて正確に調整可能です。" },
      { question: "拡大すると画質は粗くなりますか？", answer: "元の解像度を超えて拡大するとピクセルが荒れるため、縮小調整が最も推奨されます。" },
      { question: "アップロードした画像は安全ですか？", answer: "完全に安全です。処理はすべてお使いのブラウザ内（クライアント側）で行われ、外部送信されません。" },
      { question: "対応している画像形式は何ですか？", answer: "JPG、JPEG、PNG、WebP形式に対応しています。" }
    ],
    ko: [
      { question: "이미지 리사이저란 무엇인가요?", answer: "이미지의 픽셀(px) 크기 및 인쇄용 센티미터(cm) 단위를 조정하고 50KB 등 원하는 용량에 맞출 수 있는 도구입니다." },
      { question: "온라인에서 무료로 이미지 크기를 줄이는 방법은?", answer: "사진을 올리고 원하는 가로/세로 규격이나 목표 용량(KB)을 설정한 후 변경된 파일을 즉시 다운로드하세요." },
      { question: "사진 용량을 50KB로 줄이는 방법은?", answer: "'용량(KB) 기준' 모드에서 50KB를 입력하면 최적의 크기와 압축률이 자동으로 적용됩니다." },
      { question: "센티미터(cm)나 인치(inch) 단위로 조절할 수 있나요?", answer: "네. '실제 인쇄 규격(cm/inch)' 모드를 선택하여 DPI 설정과 함께 정확한 크기로 변환할 수 있습니다." },
      { question: "DPI란 무엇이며 왜 중요한가요?", answer: "DPI(인치당 도트 수)는 인쇄 해상도를 나타냅니다. 인쇄용은 300 DPI, 화면 표시용은 72 DPI가 표준입니다." },
      { question: "크기를 조절하면 사진 비율이 일그러지나요?", answer: "'가로세로 비율 유지' 체크 시 원본 비율이 그대로 보존되어 왜곡이 발생하지 않습니다." },
      { question: "여권 사진 및 이력서 증명사진 규격 맞추기가 가능한가요?", answer: "네. 3.5x4.5cm 여권 사진 규격 및 취업 서류 규격을 정밀하게 설정할 수 있습니다." },
      { question: "이미지를 확대하면 화질이 깨지나요?", answer: "원본보다 크게 확대할 경우 픽셀 계단 현상이 나타날 수 있으므로 축소 변환이 가장 선명합니다." },
      { question: "개인 사진의 보안은 안전한가요?", answer: "100% 안전합니다. 모든 변환 과정이 브라우저에서 직접 수행되며 외부 서버로 전송되지 않습니다." },
      { question: "지원되는 파일 형식은 무엇인가요?", answer: "JPG, JPEG, PNG, WebP 포맷을 지원합니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ image-resizer.json FAQs updated for all 9 locales.');
}

// ============================================================================
// 3. JPG TO PNG
// ============================================================================
function updateJpgToPng() {
  const filePath = path.join(dataDir, 'jpg-to-png.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const faqsByLocale = {
    es: [
      { question: "¿Cómo convertir JPG a PNG?", answer: "Arrastra tus archivos JPG a la zona de subida y haz clic en 'Convertir a PNG'. La conversión se efectúa al instante sin pérdida de definición." },
      { question: "¿La conversión de JPG a PNG añade transparencia?", answer: "El formato PNG admite canal alfa transparente, pero si el JPG original tiene fondo blanco sólido, puedes activar nuestra herramienta de eliminación de fondo." },
      { question: "¿Por qué convertir de JPG a PNG?", answer: "PNG utiliza compresión sin pérdidas (lossless), evitando que gráficos, texto o logotipos pierdan nitidez en sucesivas ediciones." },
      { question: "¿Aumenta el tamaño del archivo al pasar a PNG?", answer: "Generalmente sí, ya que PNG preserva cada píxel con exactitud matemática sin descarte de frecuencias." },
      { question: "¿Es gratis este conversor?", answer: "Completamente gratuito y sin límites de archivos ni marcas de agua." },
      { question: "¿Se pueden convertir varias imágenes a la vez?", answer: "Sí, admite conversión por lotes con descarga individual o en archivo ZIP combinado." },
      { question: "¿Mis fotos están protegidas contra accesos externos?", answer: "Sí, todo el procesamiento se ejecuta en tu propio navegador de forma 100% confidencial." },
      { question: "¿Qué navegadores son compatibles?", answer: "Funciona perfectamente en Chrome, Firefox, Safari, Edge y navegadores móviles modernos." }
    ],
    fr: [
      { question: "Comment convertir une image JPG en PNG ?", answer: "Déposez votre fichier JPG et cliquez sur 'Convertir en PNG' pour obtenir immédiatement un rendu haute fidélité sans compression destructive." },
      { question: "La conversion ajoute-t-elle automatiquement de la transparence ?", answer: "Le PNG gère la transparence, mais le fond d'origine du JPG sera conservé à moins d'utiliser l'option de détourage intégrée." },
      { question: "Pourquoi convertir du JPG vers le PNG ?", answer: "Le format PNG offre une compression sans perte idéale pour les logos, graphiques vectoriels et captures d'écran nettes." },
      { question: "Le fichier PNG est-il plus lourd que le JPG d'origine ?", answer: "Souvent oui, car l'encodage PNG conserve l'intégralité des données chromatiques de chaque pixel." },
      { question: "Ce convertisseur est-il gratuit et illimité ?", answer: "Oui, 100% gratuit, sans filigrane et sans inscription requise." },
      { question: "Peut-on convertir plusieurs images JPG simultanément ?", answer: "Oui, le traitement par lot permet de convertir de multiples images et de les télécharger rapidement." },
      { question: "Mes fichiers restent-ils confidentiels ?", answer: "Absolument. Aucune image n'est envoyée vers un serveur cloud, tout se déroule sur votre machine." },
      { question: "Quels navigateurs sont compatibles ?", answer: "Compatible avec tous les navigateurs modernes sur ordinateur et smartphone." }
    ],
    de: [
      { question: "Wie konvertiere ich JPG in PNG?", answer: "Laden Sie Ihre JPG-Dateien hoch und klicken Sie auf 'In PNG konvertieren'. Die verlustfreie Umwandlung erfolgt blitzschnell im Browser." },
      { question: "Erzeugt die Umwandlung von JPG in PNG Transparenz?", answer: "PNG unterstützt transparente Hintergründe. Falls das JPG einen einfarbigen Hintergrund besitzt, kann dieser mit der Hintergrundentfernungsfunktion transparent gemacht werden." },
      { question: "Warum sollte man JPG in PNG umwandeln?", answer: "PNG bietet verlustfreie Kompression (Lossless), wodurch Icons, Screenshots und Schriftzüge gestochen scharf bleiben." },
      { question: "Wird die PNG-Datei größer als die originale JPG-Datei?", answer: "In der Regel ja, da PNG keine Bilddetails verwirft, um Speicherplatz zu sparen." },
      { question: "Ist der Online-Konverter kostenlos?", answer: "Ja, dauerhaft kostenlos ohne Wasserzeichen oder Mengenbeschränkungen." },
      { question: "Können mehrere Bilder gleichzeitig konvertiert werden?", answer: "Ja, Sie können beliebig viele JPG-Dateien in einem Durchgang stapelweise umwandeln." },
      { question: "Bleiben meine Bilder privat?", answer: "Zu 100% privat: Die Konvertierung findet vollständig lokal auf Ihrem Gerät statt." },
      { question: "Welche Browser werden unterstützt?", answer: "Funktioniert auf allen modernen Browsern wie Chrome, Firefox, Safari und Edge." }
    ],
    pt: [
      { question: "Como converter JPG para PNG?", answer: "Arraste seus arquivos JPG para o conversor e clique em 'Converter para PNG'. O processo é instantâneo e sem perda de detalhes." },
      { question: "A conversão adiciona fundo transparente automaticamente?", answer: "O formato PNG suporta transparência; caso a imagem possua fundo branco fixo, você pode ativar o recurso de remoção de fundo." },
      { question: "Por que converter imagens de JPG para PNG?", answer: "O PNG utiliza compressão sem perdas (lossless), sendo ideal para logotipos, ilustrações e textos nítidos." },
      { question: "O arquivo PNG fica maior que o JPG original?", answer: "Normalmente sim, pois o PNG mantém todos os pixels originais sem descarte de informações." },
      { question: "O conversor é gratuito?", answer: "Sim, totalmente grátis, sem limite de envios e sem marcas d'água." },
      { question: "É possível converter várias imagens ao mesmo tempo?", answer: "Sim, suporte completo a conversão em lote com download direto." },
      { question: "Minhas fotos estão seguras contra vazamentos?", answer: "Segurança total: nada é transmitido para servidores remotos; tudo roda localmente." },
      { question: "Funciona em celulares e tablets?", answer: "Sim, opera com fluidez em dispositivos móveis Android, iOS, Windows e Mac." }
    ],
    it: [
      { question: "Come convertire JPG in PNG?", answer: "Trascina le tue immagini JPG nel box e clicca su 'Converti in PNG' per ottenere file ad altissima fedeltà in pochi secondi." },
      { question: "La conversione crea uno sfondo trasparente?", answer: "PNG supporta la trasparenza alfa; se il JPG ha uno sfondo compatto, puoi utilizzare lo strumento di rimozione sfondo integrato." },
      { question: "Perché conviene convertire da JPG a PNG?", answer: "Il formato PNG adotta una compressione senza perdita (lossless), preservando bordi netti in loghi, testi e grafiche." },
      { question: "Il file PNG risulterà più pesante del JPG?", answer: "Spesso sì, poiché il formato PNG non elimina informazioni cromatiche per comprimere." },
      { question: "Il servizio è gratuito?", answer: "Completamente gratuito, senza registrazione e senza watermark." },
      { question: "Posso convertire più file contemporaneamente?", answer: "Sì, supporta la conversione multipla batch con download rapido." },
      { question: "I miei file sono protetti?", answer: "Assolutamente sì: l'elaborazione avviene nel browser senza memorizzazione su server." },
      { question: "Quali browser sono supportati?", answer: "Pienamente compatibile con Chrome, Safari, Firefox, Edge e browser mobile." }
    ],
    ja: [
      { question: "JPGをPNGに変換するにはどうすればよいですか？", answer: "JPG画像をドラッグ＆ドロップして「PNGに変換」をクリックするだけで、即座に高画質PNGへ変換できます。" },
      { question: "JPGからPNGへの変換で背景は透過されますか？", answer: "PNGは透過に対応していますが、元画像の白背景を透過にするには透過処理オプションをご利用ください。" },
      { question: "なぜJPGからPNGに変換するのですか？", answer: "PNGは可逆圧縮（Lossless）のため、ロゴや文字、イラストのエッジが劣化せず鮮明に保たれるためです。" },
      { question: "PNGに変換するとファイル容量は大きくなりますか？", answer: "一般的に大きくなります。PNGはデータを間引かずにすべてのピクセル情報を保持するためです。" },
      { question: "この変換ツールは無料ですか？", answer: "完全無料です。利用回数の制限や透かし（ウォーターマーク）はありません。" },
      { question: "複数画像をまとめて一括変換できますか？", answer: "はい。バッチ変換に対応しており、複数のJPGファイルを一度にPNGに変換できます。" },
      { question: "画像データのプライバシーは保護されますか？", answer: "はい。ブラウザ内部で処理が完結するため、外部サーバーへのアップロードは一切ありません。" },
      { question: "スマートフォンでも利用できますか？", answer: "iPhoneやAndroidなど、すべての主要ブラウザで快適にご利用いただけます。" }
    ],
    ko: [
      { question: "JPG를 PNG로 변환하는 방법은 무엇인가요?", answer: "JPG 파일을 업로드하고 'PNG로 변환' 버튼을 클릭하면 화질 저하 없이 즉시 고화질 PNG 파일로 변환됩니다." },
      { question: "변환 시 배경 투명화가 자동으로 적용되나요?", answer: "PNG는 투명 배경을 지원하지만 원본 JPG의 단색 배경을 투명하게 만들려면 배경 제거 옵션을 함께 사용하세요." },
      { question: "JPG 대신 PNG 포맷을 사용하는 이유는?", answer: "PNG는 무손실 압축 방식을 사용하여 텍스트, 로고, 아이콘의 윤곽선이 뭉개지지 않고 선명하기 때문입니다." },
      { question: "PNG로 변환하면 용량이 더 커지나요?", answer: "네, 대개의 경우 그렇습니다. PNG는 시각적 데이터 손실을 방지하여 모든 픽셀 정보를 보존합니다." },
      { question: "이 변환 도구는 무료인가요?", answer: "제한 없이 완전 무료이며 워터마크가 생성되지 않습니다." },
      { question: "여러 장의 이미지를 한 번에 변환할 수 있나요?", answer: "네. 대량 일괄 변환 기능을 지원하여 여러 JPG를 한 번에 처리할 수 있습니다." },
      { question: "내 이미지가 외부에 유출될 위험은 없나요?", answer: "전혀 없습니다. 모든 변환이 사용자의 웹 브라우저 내에서만 실행되어 완벽한 보안을 유지합니다." },
      { question: "어떤 기기와 브라우저를 지원하나요?", answer: "PC 및 모바일 환경의 모든 최신 웹 브라우저를 완벽하게 지원합니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ jpg-to-png.json FAQs updated for all 9 locales.');
}

// ============================================================================
// 4. PNG TO JPG
// ============================================================================
function updatePngToJpg() {
  const filePath = path.join(dataDir, 'png-to-jpg.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const faqsByLocale = {
    es: [
      { question: "¿Cómo convertir PNG a JPG?", answer: "Sube tus imágenes PNG, selecciona la calidad de compresión JPG deseada y descarga tus archivos optimizados al instante." },
      { question: "¿Qué ocurre con las áreas transparentes al convertir a JPG?", answer: "Dado que JPG no admite transparencia, las zonas transparentes se rellenan automáticamente con un fondo blanco limpio o el color que elijas." },
      { question: "¿Cuánto se reduce el tamaño del archivo?", answer: "La conversión a JPG suele reducir el peso del archivo entre un 50% y un 80%, facilitando su envío por correo o subida a la web." },
      { question: "¿Se pierde calidad visual al convertir a JPG?", answer: "Con una calidad configurada al 85-90%, la diferencia visual con el PNG original es prácticamente imperceptible." },
      { question: "¿Puedo convertir múltiples archivos PNG a la vez?", answer: "Sí, puedes cargar lotes completos de imágenes PNG para su conversión simultánea." },
      { question: "¿Es gratis este convertidor?", answer: "100% gratuito sin necesidad de registro ni marcas de agua." },
      { question: "¿Se envían mis imágenes a algún servidor?", answer: "No. El proceso transcurre totalmente en tu navegador con total seguridad y privacidad." },
      { question: "¿Cuál es la diferencia entre JPG y JPEG?", answer: "Ninguna en la práctica; son dos extensiones que representan el mismo estándar de compresión de imagen." },
      { question: "¿Puedo elegir el color de fondo para la transparencia?", answer: "Sí, puedes elegir entre fondo blanco, negro o colores personalizados para reemplazar la transparencia." }
    ],
    fr: [
      { question: "Comment convertir un fichier PNG en JPG ?", answer: "Importez vos fichiers PNG, réglez la qualité souhaitée et téléchargez vos images converties immédiatement." },
      { question: "Que deviennent les zones transparentes lors de la conversion ?", answer: "Le format JPG ne gérant pas la transparence, les zones transparentes sont automatiquement remplacées par un fond blanc ou la couleur choisie." },
      { question: "De combien le poids du fichier diminue-t-il ?", answer: "La conversion vers le format JPG réduit généralement la taille de 50% à 80%, idéal pour les formulaires web et emails." },
      { question: "Y a-t-il une dégradation de qualité ?", answer: "À un taux de qualité de 85% à 90%, l'œil humain ne fait pas la différence avec le fichier d'origine." },
      { question: "Peut-on convertir plusieurs PNG simultanément ?", answer: "Oui, la conversion par lot traite plusieurs fichiers en un seul clic." },
      { question: "L'outil est-il gratuit ?", answer: "Entièrement gratuit, illimité et sans aucun filigrane." },
      { question: "Mes photos sont-elles stockées sur vos serveurs ?", answer: "Non. Le traitement s'effectue localement dans votre navigateur sans transfert de données." },
      { question: "Quelle est la différence entre JPG et JPEG ?", answer: "Il n'y a aucune différence technique ; ce sont deux dénominations pour la même norme d'image." },
      { question: "Puis-je personnaliser la couleur de fond ?", answer: "Oui, vous pouvez opter pour un fond blanc, noir ou personnalisé lors du remplacement de la transparence." }
    ],
    de: [
      { question: "Wie konvertiere ich PNG in JPG?", answer: "Laden Sie Ihre PNG-Bilder hoch, stellen Sie die gewünschte Bildqualität ein und laden Sie die optimierten JPG-Dateien herunter." },
      { question: "Was passiert mit transparenten Bereichen beim Konvertieren in JPG?", answer: "Da JPG keine Transparenz unterstützt, werden transparente Bereiche mit einem weißen Hintergrund oder einer Wunschfarbe gefüllt." },
      { question: "Wie viel Speicherplatz wird durch JPG gespart?", answer: "Typischerweise sinkt die Dateigröße um 50% bis 80%, was Ladezeiten und E-Mail-Anhänge deutlich optimiert." },
      { question: "Verliert das Bild bei der Umwandlung an Qualität?", answer: "Bei einer Qualitätseinstellung von 85–90% bleibt das Bild für das Auge gestochen scharf." },
      { question: "Können mehrere PNG-Dateien auf einmal konvertiert werden?", answer: "Ja, die Stapelverarbeitung erlaubt das gleichzeitige Konvertieren mehrerer Bilder." },
      { question: "Ist der PNG-zu-JPG-Konverter kostenlos?", answer: "Ja, völlig kostenlos ohne Registrierung oder Wasserzeichen." },
      { question: "Werden meine Bilddaten online gespeichert?", answer: "Nein. Alle Operationen finden lokal in Ihrem Browser statt und sind zu 100% datenschutzkonform." },
      { question: "Was ist der Unterschied zwischen JPG und JPEG?", answer: "Es gibt keinen technischen Unterschied; beide Bezeichnungen stehen für das gleiche Standardformat." },
      { question: "Kann ich die Hintergrundfarbe selbst festlegen?", answer: "Ja, Sie können Weiß, Schwarz oder individuelle Farbtöne für den transparenten Hintergrund wählen." }
    ],
    pt: [
      { question: "Como converter PNG para JPG?", answer: "Envie suas imagens PNG, regule o nível de qualidade desejado e baixe seus arquivos JPG prontos na hora." },
      { question: "O que acontece com as áreas transparentes no JPG?", answer: "Como o JPG não suporta transparência, o canal alfa é preenchido com fundo branco ou a cor de sua preferência." },
      { question: "Quanto o arquivo diminui de tamanho?", answer: "A conversão para JPG costuma reduzir o tamanho do arquivo em até 80%, acelerando o carregamento na web." },
      { question: "Ocorre perda perceptível de qualidade?", answer: "Com qualidade definida entre 85% e 90%, o resultado visual permanece excelente e nítido." },
      { question: "Posso converter múltiplos arquivos em lote?", answer: "Sim, converta dezenas de imagens PNG em simultâneo com rapidez." },
      { question: "O serviço é gratuito?", answer: "Completamente grátis, sem necessidade de cadastro ou pagamento." },
      { question: "Meus arquivos são enviados para a nuvem?", answer: "Não. A conversão é executada inteiramente no seu dispositivo, sem upload para servidores." },
      { question: "Qual a diferença entre JPG e JPEG?", answer: "Nenhuma. Ambas as siglas referem-se ao mesmo formato padrão de compressão fotográfica." },
      { question: "Posso escolher a cor para preencher a transparência?", answer: "Sim, escolha fundo branco padrão, preto ou qualquer código de cor personalizado." }
    ],
    it: [
      { question: "Come convertire PNG in JPG?", answer: "Carica i tuoi file PNG, imposta il cursore della qualità desiderata e scarica i JPG convertiti all'istante." },
      { question: "Cosa accade allo sfondo trasparente nel formato JPG?", answer: "Non supportando la trasparenza, il formato JPG sostituisce le aree trasparenti con uno sfondo bianco o del colore scelto." },
      { question: "Quanto si riducono le dimensioni del file?", answer: "Il risparmio di spazio varia solitamente tra il 50% e l'80% rispetto al file PNG iniziale." },
      { question: "Si perde qualità durante la conversione?", answer: "Mantenendo la qualità tra l'85% e il 90% il degrado è impercettibile all'occhio umano." },
      { question: "Posso convertire più immagini PNG contemporaneamente?", answer: "Sì, puoi elaborare batch di immagini in un unico passaggio rapido." },
      { question: "Il convertitore è gratuito?", answer: "100% gratuito, senza limiti e senza loghi o filigrane applicati." },
      { question: "I miei dati rimangono privati?", answer: "Sì, l'elaborazione si svolge all'interno del browser senza trasmissione su server remoti." },
      { question: "Che differenza c'è tra JPG e JPEG?", answer: "Nessuna differenza: identificano lo stesso algoritmo e formato di compressione." },
      { question: "È possibile personalizzare il colore di sfondo?", answer: "Sì, puoi selezionare bianco, nero o tinte personalizzate per le aree trasparenti." }
    ],
    ja: [
      { question: "PNGをJPGに変換する方法は？", answer: "PNG画像をアップロードし、画質レベルを調整して「JPGに変換」をクリックするだけで完了します。" },
      { question: "透過PNGをJPGに変換すると背景はどうなりますか？", answer: "JPGは透過に対応していないため、透明な部分は自動的に白背景（または指定した背景色）に置き換えられます。" },
      { question: "ファイルサイズはどのくらい小さくなりますか？", answer: "JPG形式への変換により、通常50%から80%程度の大幅なファイルサイズ削減が可能です。" },
      { question: "変換すると画質は落ちますか？", answer: "品質を85%〜90%に設定すれば、目視では元画像と変わらない美しい仕上がりになります。" },
      { question: "複数のPNG画像をまとめて一括変換できますか？", answer: "はい。大量のPNGファイルもドラッグ＆ドロップで一度にJPGへ変換可能です。" },
      { question: "利用料金はかかりますか？", answer: "完全無料です。利用回数無制限で透かしも入りません。" },
      { question: "画像データが外部に送信される心配はありますか？", answer: "いいえ。すべての処理はご利用中の端末（ブラウザ）内で完結するため安全です。" },
      { question: "JPGとJPEGに違いはありますか？", answer: "本質的な違いはありません。どちらも同じ画像規格を表す拡張子です。" },
      { question: "透過部分の背景色を指定できますか？", answer: "はい。標準の白背景のほか、黒や自由なカスタムカラーを選択可能です。" }
    ],
    ko: [
      { question: "PNG를 JPG로 변환하는 방법은?", answer: "PNG 이미지를 업로드하고 원하는 화질을 선택한 후 변환 버튼을 클릭하여 즉시 저장할 수 있습니다." },
      { question: "투명 배경은 JPG 변환 시 어떻게 처리되나요?", answer: "JPG 포맷은 투명도를 지원하지 않으므로 투명 영역은 깔끔한 흰색 또는 사용자가 지정한 배경색으로 채워집니다." },
      { question: "파일 용량은 얼마나 줄어드나요?", answer: "PNG 대비 최대 50%~80%까지 용량이 감소하여 웹 로딩 속도와 저장 공간을 획기적으로 개선합니다." },
      { question: "화질 저하가 심한가요?", answer: "화질을 85~90% 수준으로 유지하면 육안으로 식별하기 어려울 만큼 뛰어난 품질을 유지합니다." },
      { question: "여러 장의 사진을 동시에 변환할 수 있나요?", answer: "네. 대량 일괄 변환 기능을 통해 수십 장의 PNG도 한 번에 JPG로 바꿀 수 있습니다." },
      { question: "변환 비용이 발생하나요?", answer: "완전 무료 서비스이며 회원가입이나 워터마크가 전혀 없습니다." },
      { question: "내 사진이 서버에 저장되나요?", answer: "아니요. 모든 변환은 브라우저 내부에서 실행되므로 사진이 외부로 유출되지 않습니다." },
      { question: "JPG와 JPEG는 어떤 점이 다른가요?", answer: "이름 표기만 다를 뿐 기술적으로 동일한 이미지 규격입니다." },
      { question: "투명 배경 색상을 직접 바꿀 수 있나요?", answer: "네. 기본 흰색 외에도 검은색이나 원하는 색상 코드로 배경을 채울 수 있습니다." }
    ]
  };

  for (const [loc, faqs] of Object.entries(faqsByLocale)) {
    if (data[loc]) {
      data[loc].faqs = faqs;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ png-to-jpg.json FAQs updated for all 9 locales.');
}

updateImageCompressor();
updateImageResizer();
updateJpgToPng();
updatePngToJpg();
console.log('All 4 image tools updated successfully!');
