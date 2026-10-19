import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, '..', 'definitions');

// First load existing 3 tools from image-tools.mjs if present
let existingDefs = {};
try {
  const currentModule = await import('../definitions/image-tools.mjs');
  existingDefs = currentModule.imageToolsDefinitions || {};
} catch (e) {
  console.log('No existing image-tools.mjs found, will generate fresh.');
}

// 10 new image tools definitions
const newTools = {
  'image-compressor': {
    name: 'Image Compressor',
    formulaTitle: {
      en: 'HTML5 Canvas Quantization & Lossy Discrete Cosine Compression',
      hi: 'HTML5 कैनवास क्वांटाइजेशन और लॉसी डिस्क्रिट कोसाइन कम्प्रेशन',
      es: 'Cuantización Canvas HTML5 y Compresión por Coseno Discreto',
      ja: 'HTML5 Canvas離散コサイン変換と量子化圧縮アルゴリズム',
      fr: 'Quantification HTML5 Canvas et Compression par Transformée en Cosinus Discret',
      de: 'HTML5-Canvas-Quantisierung & Diskrete Kosinustransformation Kompression',
      pt: 'Quantização HTML5 Canvas e Compressão por Cosseno Discreto',
      ko: 'HTML5 Canvas 양자화 및 이산 코사인 변환 손실 압축 구조',
      it: 'Quantizzazione Canvas HTML5 e Compressione per Coseno Discreto'
    },
    formulaDescription: {
      en: 'The compressor draws raster pixel data into an HTML5 Canvas and applies quality scaling via HTMLCanvasElement.toBlob(callback, "image/jpeg", quality). It adjusts quantization tables and chroma sub-sampling (4:2:0) locally in browser memory without sending image bytes to any server.',
      hi: 'यह कंप्रेसर फोटो को HTML5 कैनवास पर ड्रा करता है और HTMLCanvasElement.toBlob() के माध्यम से स्थानीय रूप से गुणवत्ता को अनुकूलित करता है। यह बिना किसी सर्वर पर फोटो भेजे क्रोमा सब-सैंपलिंग (4:2:0) द्वारा फाइल का आकार काफी कम कर देता है।',
      es: 'El compresor dibuja los píxeles en un lienzo HTML5 y ajusta la calidad mediante HTMLCanvasElement.toBlob(). Optimiza las tablas de cuantización y submuestreo de croma (4:2:0) en la memoria local del navegador sin transferir archivos.',
      ja: '本コンプレッサーは、HTML5 Canvas上にピクセルを描画し、HTMLCanvasElement.toBlob()を用いて品質パラメータを調整。ブラウザ内部で色差間引き（4:2:0）と量子化を行い、サーバー通信なしで容量を大幅に削減します。',
      fr: 'Le compresseur dessine les pixels sur un Canvas HTML5 et applique la réduction de qualité via HTMLCanvasElement.toBlob(). Il ajuste les matrices de quantification localement sans téléversement de fichiers.',
      de: 'Der Kompressor zeichnet Rasterpixel auf ein HTML5-Canvas und steuert die Dateigröße über HTMLCanvasElement.toBlob(). Quantisierung und Farbunterabtastung (4:2:0) laufen rein lokal im Browser ab.',
      pt: 'O compressor desenha a imagem em um Canvas HTML5 e ajusta o fator de qualidade via HTMLCanvasElement.toBlob(). A quantização e subamostragem ocorrem no navegador sem envio a servidores remotos.',
      ko: '본 압축기는 HTML5 Canvas에 원본 픽셀을 배치한 후 HTMLCanvasElement.toBlob() 품질 스케일링을 통해 브라우저 로컬에서 색차 서브샘플링(4:2:0) 및 양자화 압축을 적용하여 서버 전송 없이 용량을 대폭 줄입니다.',
      it: 'Il compressore disegna i pixel su Canvas HTML5 e applica il ridimensionamento della qualità tramite HTMLCanvasElement.toBlob(), gestendo tabelle di quantizzazione e sottocampionamento in locale.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Image', instruction: 'Drag and drop your JPG, PNG, or WebP photo into the upload box or select it from your device.' },
        { stepNumber: 2, title: 'Adjust Compression Slider', instruction: 'Set the target quality percentage (70%–85% provides an optimal balance between file size and clarity).' },
        { stepNumber: 3, title: 'Inspect Real-Time Savings', instruction: 'Compare original file size against the estimated compressed size and review visual fidelity in the live preview.' },
        { stepNumber: 4, title: 'Download Compressed Image', instruction: 'Click Download to save the compressed image directly to your local file system.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो अपलोड करें', instruction: 'अपनी JPG, PNG या WebP फोटो को बॉक्स में खींचें या अपने डिवाइस से चुनें।' },
        { stepNumber: 2, title: 'कम्प्रेशन स्लाइडर सेट करें', instruction: 'क्वालिटी प्रतिशत चुनें (70% से 85% का स्तर स्पष्टता और आकार में सबसे अच्छा संतुलन देता है)।' },
        { stepNumber: 3, title: 'बचत और आकार की तुलना करें', instruction: 'मूल आकार और नए कंप्रेस्ड आकार की तुलना करें तथा लाइव प्रीव्यू में फोटो की स्पष्टता देखें।' },
        { stepNumber: 4, title: 'डाउनलोड करें', instruction: 'कंप्रेस की गई फोटो को अपने डिवाइस पर तुरंत डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar imagen', instruction: 'Arrastre su foto JPG, PNG o WebP al recuadro o selecciónela desde su equipo.' },
        { stepNumber: 2, title: 'Ajustar nivel de compresión', instruction: 'Configure el control deslizante de calidad (un 70%–85% ofrece excelente nitidez con menor peso).' },
        { stepNumber: 3, title: 'Comparar tamaños', instruction: 'Compruebe la reducción de peso frente al original y revise la calidad en la vista previa.' },
        { stepNumber: 4, title: 'Descargar imagen', instruction: 'Haga clic en Descargar para guardar el archivo comprimido en su dispositivo.' }
      ],
      ja: [
        { stepNumber: 1, title: '画像の選択・アップロード', instruction: 'JPG、PNG、WebP形式の画像ファイルを画面にドラッグ＆ドロップまたはファイル選択します。' },
        { stepNumber: 2, title: '圧縮率スライダーの調整', instruction: '品質スライダー（推奨: 70%〜85%）を調整し、画質とファイル容量のバランスを設定します。' },
        { stepNumber: 3, title: '圧縮効果の確認', instruction: '元サイズと圧縮後サイズの削減率を比較し、プレビュー画面で画質の劣化がないか確認します。' },
        { stepNumber: 4, title: '画像のダウンロード', instruction: '「Download」をクリックして圧縮済み画像を端末へ保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Téléverser l\'image', instruction: 'Glissez-déposez votre image JPG, PNG ou WebP dans la zone prévue.' },
        { stepNumber: 2, title: 'Régler la compression', instruction: 'Ajustez le curseur de qualité (70% à 85% conseillés pour un résultat optimal).' },
        { stepNumber: 3, title: 'Comparer la taille', instruction: 'Visualisez l\'estimation du gain d\'espace et vérifiez la netteté sur l\'aperçu.' },
        { stepNumber: 4, title: 'Télécharger le fichier', instruction: 'Cliquez sur Télécharger pour enregistrer l\'image optimisée sans attendre.' }
      ],
      de: [
        { stepNumber: 1, title: 'Bild auswählen', instruction: 'Ziehen Sie Ihre JPG-, PNG- oder WebP-Datei per Drag-and-Drop in den Upload-Bereich.' },
        { stepNumber: 2, title: 'Qualität einstellen', instruction: 'Wählen Sie mit dem Schieberegler die Zielqualität (70 %–85 % für bestes Verhältnis).' },
        { stepNumber: 3, title: 'Dateigröße prüfen', instruction: 'Vergleichen Sie die ursprüngliche und komprimierte Dateigröße in der Vorschau.' },
        { stepNumber: 4, title: 'Komprimiertes Bild speichern', instruction: 'Klicken Sie auf Download, um das optimierte Bild lokal zu sichern.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Selecionar imagem', instruction: 'Arraste sua foto JPG, PNG ou WebP ou carregue-a do seu dispositivo.' },
        { stepNumber: 2, title: 'Definir qualidade', instruction: 'Ajuste o seletor entre 70% e 85% para reduzir o peso mantendo ótima nitidez.' },
        { stepNumber: 3, title: 'Inspecionar redução', instruction: 'Compare o tamanho original com o arquivo comprimido na pré-visualização.' },
        { stepNumber: 4, title: 'Baixar imagem', instruction: 'Clique em Download para salvar a foto comprimida no seu computador ou celular.' }
      ],
      ko: [
        { stepNumber: 1, title: '이미지 업로드', instruction: 'JPG, PNG, WebP 사진을 업로드 영역으로 드래그하거나 기기에서 선택합니다.' },
        { stepNumber: 2, title: '압축 품질 슬라이더 조절', instruction: '품질 비율을 조절합니다(70%~85% 수준이 선명도와 용량 절감의 균형에 가장 이상적입니다).' },
        { stepNumber: 3, title: '용량 절감률 확인', instruction: '원본 크기와 압축 후 예상 용량을 비교하고 라이브 프리뷰를 통해 화질을 점검합니다.' },
        { stepNumber: 4, title: '압축 이미지 다운로드', instruction: '다운로드 버튼을 클릭하여 가벼워진 최적화 이미지를 기기에 즉시 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare l\'immagine', instruction: 'Trascina la foto JPG, PNG o WebP nell\'area di caricamento o selezionala dal dispositivo.' },
        { stepNumber: 2, title: 'Regolare la qualità', instruction: 'Imposta la percentuale di compressione (consigliato 70%-85% per preservare i dettagli).' },
        { stepNumber: 3, title: 'Confrontare le dimensioni', instruction: 'Verifica la riduzione di peso rispetto all\'originale nell\'anteprima istantanea.' },
        { stepNumber: 4, title: 'Scaricare l\'immagine', instruction: 'Fai clic su Scarica per salvare la foto compressa sul tuo dispositivo.' }
      ]
    },
    example: {
      en: {
        title: 'High-Resolution Smartphone Photo Compression',
        scenario: 'Compressing a 4.2 MB mobile photograph for fast web upload without visible artifacting.',
        calculation: 'Original: 4,200 KB JPEG. Quality set to 80%. Canvas quantization downsamples high-frequency DCT coefficients.',
        result: 'Compressed size: 840 KB (80% file size reduction, 0 noticeable artifacts on mobile displays).'
      },
      hi: {
        title: 'स्मार्टफोन फोटो कम्प्रेशन उदाहरण',
        scenario: '4.2 MB की मोबाइल फोटो को वेब उपयोग के लिए बिना गुणवत्ता खोए छोटा करना।',
        calculation: 'मूल आकार: 4,200 KB। 80% गुणवत्ता पर कैनवास क्वांटाइजेशन द्वारा कम्प्रेशन।',
        result: 'नया आकार: 840 KB (80% आकार में कमी, स्पष्टता बिल्कुल मूल जैसी)।'
      },
      es: {
        title: 'Ejemplo de Compresión de Foto Móvil',
        scenario: 'Reducir una foto de 4,2 MB tomada con smartphone para publicarla en la web.',
        calculation: 'Original: 4.200 KB JPEG. Calidad fijada al 80%. Cuantización de altas frecuencias.',
        result: 'Tamaño resultante: 840 KB (reducción del 80% sin pérdida visual apreciable).'
      },
      ja: {
        title: 'スマートフォン撮影写真の容量圧縮実例',
        scenario: 'スマホで撮影した4.2MBのJPEG写真をWeb投稿用に画質を維持したまま縮小する例。',
        calculation: '元サイズ: 4,200KB。品質設定: 80%。高周波成分の離散コサイン量子化を実施。',
        result: '圧縮後サイズ: 840KB（約80%の容量削減、画面表示上の劣化なし）。'
      },
      fr: {
        title: 'Exemple de Compression d\'une Photo Mobile',
        scenario: 'Réduire le poids d\'une photo de 4,2 Mo pour un envoi par courriel rapide.',
        calculation: 'Taille initiale : 4 200 Ko. Réglage qualité à 80 % via l\'algorithme de quantification Canvas.',
        result: 'Taille finale : 840 Ko (gain de 80 % sans perte de netteté visible).'
      },
      de: {
        title: 'Beispiel für Smartphone-Fotokompression',
        scenario: 'Reduzierung eines 4,2 MB großen Urlaubsfotos für schnellen Web-Upload.',
        calculation: 'Originalgröße: 4.200 KB. Zielqualität 80 % mit lokaler DCT-Quantisierung.',
        result: 'Komprimierte Größe: 840 KB (80 % Einsparung ohne erkennbare Artefakte).'
      },
      pt: {
        title: 'Exemplo de Compressão de Foto de Smartphone',
        scenario: 'Diminuir uma foto de 4,2 MB para envio rápido por e-mail ou redes sociais.',
        calculation: 'Tamanho inicial: 4.200 KB. Qualidade ajustada a 80% com quantização Canvas.',
        result: 'Tamanho final: 840 KB (80% de redução no peso com alta definição mantida).'
      },
      ko: {
        title: '스마트폰 고화질 사진 압축 실전 예시',
        scenario: '4.2MB 크기의 모바일 촬영 사진을 화질 손상 없이 웹 업로드용으로 압축.',
        calculation: '원본 크기: 4,200KB JPEG. 압축 품질 80% 설정 후 캔버스 이산 코사인 양자화 적용.',
        result: '압축 후 크기: 840KB (약 80% 용량 다이어트 성공, 모바일 화면에서 선명도 완벽 유지).'
      },
      it: {
        title: 'Esempio di Compressione Foto Smartphone',
        scenario: 'Riduzione di una foto da 4,2 MB per renderla leggera e facile da inviare.',
        calculation: 'Dimensione originale: 4.200 KB. Qualità impostata all\'80% su Canvas.',
        result: 'Dimensione finale: 840 KB (riduzione dell\'80% senza artefatti visibili).'
      }
    },
    faqs: {
      en: [
        { question: 'Does compressing images upload them to remote servers?', answer: 'No. The entire compression process occurs inside your browser\'s local HTML5 Canvas memory. No image bytes are sent over the network.' },
        { question: 'What is the optimal compression percentage?', answer: 'Between 70% and 85% delivers the best balance, typically shrinking file size by 60% to 80% while retaining crisp visual details.' },
        { question: 'What is the maximum image resolution supported?', answer: 'Images up to 4000×4000 pixels process smoothly on modern devices. Extremely large images (>8000px) may exceed mobile browser GPU canvas memory allocations.' },
        { question: 'Can I compress PNG files with transparent backgrounds?', answer: 'Yes, but converting transparent PNGs to JPEG fills the transparency with white. To keep transparency, choose WebP output.' }
      ],
      hi: [
        { question: 'क्या फोटो कंप्रेस करते समय किसी सर्वर पर अपलोड होती है?', answer: 'बिल्कुल नहीं। संपूर्ण कम्प्रेशन सीधे आपके ब्राउज़र की HTML5 कैनवास मेमोरी में होता है। डेटा कभी भी डिवाइस से बाहर नहीं जाता।' },
        { question: 'सबसे अच्छा कम्प्रेशन प्रतिशत क्या है?', answer: '70% से 85% का स्तर सबसे बेहतरीन माना जाता है, जो फाइल का आकार 60% से 80% तक कम कर देता है और स्पष्टता बनाए रखता है।' },
        { question: 'अधिकतम कितने बड़े रिज़ॉल्यूशन का फोटो कंप्रेस किया जा सकता है?', answer: '4000×4000 पिक्सेल तक की फोटो आसानी से प्रोसेस होती हैं। बहुत बड़ी फोटो (>8000px) मोबाइल ब्राउज़र मेमोरी सीमा को पार कर सकती हैं।' },
        { question: 'क्या पारदर्शी बैकग्राउंड वाली PNG फोटो कंप्रेस की जा सकती है?', answer: 'हाँ, लेकिन यदि आप JPEG में बदलेंगे तो पारदर्शी भाग सफेद हो जाएगा। पारदर्शिता बनाए रखने के लिए WebP फॉर्मेट चुनें।' }
      ],
      es: [
        { question: '¿Las imágenes se suben a servidores remotos?', answer: 'No. Todo el proceso ocurre en el lienzo local del navegador sin transferir archivos a la red.' },
        { question: '¿Cuál es el porcentaje de compresión recomendado?', answer: 'Entre el 70% y el 85% se logra el equilibrio perfecto, ahorrando del 60% al 80% de espacio sin pérdida perceptible.' },
        { question: '¿Existe un límite en la resolución de imagen?', answer: 'Resoluciones de hasta 4000×4000 px funcionan con total fluidez. Fotos superiores a 8000 px pueden sobrepasar la memoria gráfica en móviles.' },
        { question: '¿Qué ocurre con la transparencia de los archivos PNG?', answer: 'Si se comprime a JPEG, el fondo transparente se convierte en blanco. Para conservar transparencia, mantenga formato WebP.' }
      ],
      ja: [
        { question: '画像ファイルは外部サーバーに送信されますか？', answer: 'いいえ。ブラウザのHTML5 Canvasメモリ内でのみ処理されます。プライベートな写真も安心して圧縮できます。' },
        { question: '推奨される圧縮率はどのくらいですか？', answer: '70%〜85%の設定が最も推奨され、肉眼での劣化を感じさせずにファイルサイズを60%〜80%削減できます。' },
        { question: '処理できる最大画像解像度はどれくらいですか？', answer: '一般的な端末で4000×4000px程度まで快適に処理できます。8000pxを超える巨大なパノラマ画像等はスマートフォンのメモリ制限にかかる場合があります。' },
        { question: '透過PNGの透明度を維持したまま圧縮できますか？', answer: 'JPEG出力では透過部分が白になりますが、WebP形式を選択することで透明度を保持したまま軽量化が可能です。' }
      ],
      fr: [
        { question: 'Mes images sont-elles envoyées sur un serveur ?', answer: 'Non. La compression s\'exécute entièrement dans la mémoire locale de votre navigateur sans aucun téléversement.' },
        { question: 'Quel niveau de compression privilégier ?', answer: 'Une valeur de 70% à 85% permet de réduire le fichier de 60% à 80% sans dégradation visible.' },
        { question: 'Quelle est la taille d\'image maximale supportée ?', answer: 'Les images jusqu\'à 4000×4000 px sont traitées rapidement. Au-delà de 8000 px, la mémoire GPU des téléphones peut être saturée.' },
        { question: 'La transparence des fichiers PNG est-elle préservée ?', answer: 'En sortie JPEG, la transparence devient blanche. Pour la conserver, optez pour une compression au format WebP.' }
      ],
      de: [
        { question: 'Werden Bilder auf externe Server geladen?', answer: 'Nein. Der gesamte Vorgang läuft lokal im HTML5-Canvas-Speicher Ihres Browsers ab.' },
        { question: 'Welcher Kompressionswert ist ideal?', answer: 'Werte zwischen 70 % und 85 % sparen meist 60 % bis 80 % Speicherplatz bei hervorragender Schärfe.' },
        { question: 'Gibt es Begrenzungen bei der Bildauflösung?', answer: 'Bilder bis 4000×4000 Pixel lassen sich problemlos verarbeiten. Sehr große Fotos (>8000 Pixel) können auf Mobilgeräten an Grenzen stoßen.' },
        { question: 'Bleibt Transparenz bei PNG-Dateien erhalten?', answer: 'Bei JPEG-Ausgabe wird Transparenz weiß dargestellt. Wählen Sie WebP, um Transparenz beizubehalten.' }
      ],
      pt: [
        { question: 'A imagem é enviada para algum servidor?', answer: 'Não. Todo o processo roda na memória local do navegador pelo Canvas HTML5 sem tráfego de dados externo.' },
        { question: 'Qual a taxa de compressão indicada?', answer: 'Entre 70% e 85% você obtém a melhor relação de economia de espaço (60% a 80%) com nitidez perfeita.' },
        { question: 'Qual a resolução máxima aceita?', answer: 'Fotos de até 4000×4000 pixels rodam perfeitamente. Imagens acima de 8000 px podem atingir limites de memória em smartphones.' },
        { question: 'A transparência de arquivos PNG é mantida?', answer: 'Se exportar em JPEG, áreas transparentes ganham fundo branco. Para manter transparência, utilize o formato WebP.' }
      ],
      ko: [
        { question: '사진 압축 시 이미지가 외부 서버로 전송되나요?', answer: '전혀 아닙니다. 모든 압축 연산은 브라우저의 HTML5 Canvas 메모리 내에서 로컬로 실행되므로 외부 유출이 없습니다.' },
        { question: '가장 권장되는 압축률은 얼마인가요?', answer: '70%~85% 구간이 가장 이상적이며, 화질 손상 없이 파일 용량을 60%~80% 이상 획기적으로 줄여줍니다.' },
        { question: '처리 가능한 최대 해상도 규격은 얼마인가요?', answer: '일반적인 기기에서 4000×4000px까지 원활히 처리되며, 8000px 이상의 초고화질 사진은 모바일 캔버스 메모리 한계에 도달할 수 있습니다.' },
        { question: '투명 배경의 PNG 파일도 압축할 수 있나요?', answer: '가능하지만 JPEG로 변환 시 투명 영역이 흰색으로 채워집니다. 투명도를 유지하려면 WebP 포맷 출력을 권장합니다.' }
      ],
      it: [
        { question: 'Le immagini vengono trasmesse a un server esterno?', answer: 'No. L\'intero processo avviene sul Canvas HTML5 locale del browser senza alcun upload.' },
        { question: 'Quale livello di compressione è preferibile?', answer: 'Tra il 70% e l\'85% si ottiene il miglior risparmio di spazio (60%-80%) senza imperfezioni visibili.' },
        { question: 'Qual è la risoluzione massima consigliata?', answer: 'Fino a 4000×4000 pixel l\'elaborazione è fluida. Immagini superiori a 8000 px possono saturare la memoria su smartphone.' },
        { question: 'Cosa accade alla trasparenza dei file PNG?', answer: 'Con l\'esportazione JPEG la trasparenza diventa bianca. Per conservarla, esporta in formato WebP.' }
      ]
    }
  },

  'image-resizer': {
    name: 'Image Resizer',
    formulaTitle: {
      en: 'Bicubic Canvas Interpolation & Aspect Ratio Scaling Architecture',
      hi: 'बाइक्यूबिक कैनवास इंटरपोलेशन और आस्पेक्ट रेशियो स्केलिंग संरचना',
      es: 'Interpolación Bicúbica en Lienzo y Escalado Proporcional',
      ja: 'Bicubic補間アルゴリズムとアスペクト比同期リサイズ構造',
      fr: 'Interpolation Bicubique sur Canvas et Redimensionnement Proportionnel',
      de: 'Bikubische Canvas-Interpolation & Seitenverhältnis-Skalierung',
      pt: 'Interpolação Bicúbica em Canvas e Redimensionamento Proporcional',
      ko: 'Bicubic 캔버스 보간 및 화면 비율 동기화 리사이징 구조',
      it: 'Interpolazione Bicubica su Canvas e Ridimensionamento in Scala'
    },
    formulaDescription: {
      en: 'Image resizing operates client-side using CanvasRenderingContext2D interpolation filters. It dynamically recalculates target pixel boundaries (newWidth = origWidth × ratio) while preserving native aspect ratios or applying custom dimensions, outputting sharp graphics without server latency.',
      hi: 'फोटो का आकार बदलना CanvasRenderingContext2D इंटरपोलेशन द्वारा सीधे ब्राउज़र में होता है। यह मूल आस्पेक्ट रेशियो को बनाए रखते हुए या कस्टम पिक्सेल मान दर्ज करने पर नए पिक्सेल की गणना करता है और बिना सर्वर विलंबता के स्पष्ट फोटो तैयार करता है।',
      es: 'El redimensionamiento de imágenes se realiza en el cliente mediante filtros de interpolación en Canvas. Recalcula las dimensiones en píxeles preservando la proporción original o permitiendo ajustes libres sin servidores.',
      ja: '画像リサイズ処理は、CanvasRenderingContext2Dの補間フィルタを用いてブラウザ内で実行されます。縦横比（アスペクト比）の固定計算や自由なピクセル指定に対応し、サーバー通信なしで鮮明な縮小・拡大画像を出力します。',
      fr: 'Le redimensionnement d\'image utilise les filtres d\'interpolation Canvas dans le navigateur. Il recalcule les dimensions en conservant les proportions d\'origine ou selon vos valeurs personnalisées sans serveur.',
      de: 'Die Bildskalierung erfolgt clientseitig über Canvas-Interpolationsfilter. Sie berechnet Pixelmaße wahlweise unter Beibehaltung des Seitenverhältnisses oder mit freien Werten – völlig ohne Serverübertragung.',
      pt: 'O redimensionamento opera no navegador com filtros de interpolação Canvas. Recalcula as medidas em pixels mantendo a proporção original ou aplicando dimensões personalizadas sem intermediários.',
      ko: '이미지 리사이즈는 브라우저 내부 CanvasRenderingContext2D 보간 필터를 통해 실행됩니다. 원본 가로세로 비율을 완벽하게 유지하거나 원하는 픽셀 수치를 지정하여 서버 지연 없이 선명한 크기 조절 이미지를 생성합니다.',
      it: 'Il ridimensionamento delle immagini impiega i filtri di interpolazione Canvas nel browser, ricalcolando le proporzioni originali o applicando dimensioni personalizzate senza invio a server esterni.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Select Image', instruction: 'Upload or drag your JPG, PNG, or WebP picture into the tool.' },
        { stepNumber: 2, title: 'Choose Target Dimensions', instruction: 'Enter desired width or height in pixels, or select a percentage scaling preset (25%, 50%, 75%).' },
        { stepNumber: 3, title: 'Lock or Unlock Aspect Ratio', instruction: 'Keep the aspect ratio lock checked to prevent image distortion and stretching.' },
        { stepNumber: 4, title: 'Download Resized Image', instruction: 'Review the live preview dimensions and click Download to save the new image.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो चुनें', instruction: 'अपनी JPG, PNG या WebP फोटो को टूल में अपलोड करें।' },
        { stepNumber: 2, title: 'नया आकार (पिक्सेल या %) चुनें', instruction: 'वांछित चौड़ाई या ऊंचाई पिक्सेल में दर्ज करें या 25%, 50%, 75% स्केलिंग चुनें।' },
        { stepNumber: 3, title: 'आस्पेक्ट रेशियो लॉक रखें', instruction: 'फोटो को विकृत या खिंचाव से बचाने के लिए आस्पेक्ट रेशियो लॉक चालू रखें।' },
        { stepNumber: 4, title: 'डाउनलोड करें', instruction: 'लाइव प्रीव्यू जांचें और नए आकार की फोटो तुरंत डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Seleccionar imagen', instruction: 'Cargue su imagen JPG, PNG o WebP en la herramienta.' },
        { stepNumber: 2, title: 'Introducir dimensiones', instruction: 'Indique el ancho o alto deseado en píxeles, o seleccione un porcentaje (25%, 50%, 75%).' },
        { stepNumber: 3, title: 'Mantener proporción', instruction: 'Conserve el bloqueo de relación de aspecto para evitar deformaciones.' },
        { stepNumber: 4, title: 'Descargar imagen', instruction: 'Revise la vista previa y guarde la imagen redimensionada.' }
      ],
      ja: [
        { stepNumber: 1, title: '画像の選択', instruction: 'JPG、PNG、WebPファイルを画面に読み込みます。' },
        { stepNumber: 2, title: '変更寸法の指定', instruction: '変更したい幅または高さをピクセル単位で入力するか、パーセント縮小（25%、50%、75%）を選びます。' },
        { stepNumber: 3, title: '縦横比の固定', instruction: '画像の歪みや引き伸ばしを防ぐため、アスペクト比固定チェックを維持します。' },
        { stepNumber: 4, title: 'リサイズ画像の保存', instruction: 'プレビューで寸法を確認し、ダウンロードボタンを押して保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Choisir une image', instruction: 'Chargez votre fichier JPG, PNG ou WebP dans l\'interface.' },
        { stepNumber: 2, title: 'Définir les dimensions', instruction: 'Indiquez la largeur ou hauteur en pixels, ou choisissez un ratio (25%, 50%, 75%).' },
        { stepNumber: 3, title: 'Conserver les proportions', instruction: 'Laissez le verrouillage du ratio coché pour éviter toute déformation.' },
        { stepNumber: 4, title: 'Télécharger le résultat', instruction: 'Contrôlez l\'aperçu et téléchargez l\'image aux nouvelles dimensions.' }
      ],
      de: [
        { stepNumber: 1, title: 'Bild laden', instruction: 'Wählen Sie eine JPG-, PNG- oder WebP-Datei aus.' },
        { stepNumber: 2, title: 'Zielmaße festlegen', instruction: 'Geben Sie Breite oder Höhe in Pixeln ein oder wählen Sie eine Prozentstufe.' },
        { stepNumber: 3, title: 'Seitenverhältnis sperren', instruction: 'Belassen Sie das Schloss aktiv, um Verzerrungen zu vermeiden.' },
        { stepNumber: 4, title: 'Skaliertes Bild herunterladen', instruction: 'Prüfen Sie die Vorschau und speichern Sie das skalierte Bild ab.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar imagem', instruction: 'Selecione sua foto JPG, PNG ou WebP no dispositivo.' },
        { stepNumber: 2, title: 'Informar novas medidas', instruction: 'Digite a largura ou altura em pixels, ou escolha uma escala percentual.' },
        { stepNumber: 3, title: 'Bloquear proporção', instruction: 'Mantenha a proporção travada para evitar distorções no resultado final.' },
        { stepNumber: 4, title: 'Baixar arquivo', instruction: 'Verifique a pré-visualização e salve a foto redimensionada.' }
      ],
      ko: [
        { stepNumber: 1, title: '이미지 선택', instruction: 'JPG, PNG, WebP 사진 파일을 도구 화면에 불러옵니다.' },
        { stepNumber: 2, title: '목표 규격 입력', instruction: '원하는 가로 또는 세로 픽셀 크기를 입력하거나 비율 축소(25%, 50%, 75%)를 선택합니다.' },
        { stepNumber: 3, title: '화면 비율 유지 잠금', instruction: '이미지 왜곡이나 찌그러짐을 방지하기 위해 가로세로 비율 고정 옵션을 유지합니다.' },
        { stepNumber: 4, title: '리사이즈 이미지 저장', instruction: '변경 수치가 반영된 미리보기를 확인하고 다운로드 버튼을 눌러 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Scegliere l\'immagine', instruction: 'Carica la foto JPG, PNG o WebP nell\'interfaccia.' },
        { stepNumber: 2, title: 'Specificare le dimensioni', instruction: 'Inserisci larghezza o altezza in pixel, oppure seleziona una percentuale.' },
        { stepNumber: 3, title: 'Bloccare le proporzioni', instruction: 'Mantieni il lucchetto attivo per evitare deformazioni allungate.' },
        { stepNumber: 4, title: 'Scaricare il file', instruction: 'Controlla l\'anteprima e scarica l\'immagine ridimensionata.' }
      ]
    },
    example: {
      en: {
        title: 'Blog Header Dimension Scaling',
        scenario: 'Downscaling a 3840×2160 4K wallpaper to 1200×675 for a blog post featured image.',
        calculation: 'Original aspect ratio: 16:9 (3840 / 2160 = 1.777). Target width: 1200 px -> Target height = 1200 ÷ 1.777 = 675 px.',
        result: 'Rendered at exact 1200×675 px dimensions with sharp typography and zero distortion in 45ms.'
      },
      hi: {
        title: 'ब्लॉग हेडर के लिए फोटो का आकार बदलना',
        scenario: '3840×2160 4K वॉलपेपर को ब्लॉग के लिए 1200×675 पिक्सेल में बदलना।',
        calculation: 'मूल अनुपात: 16:9। लक्ष्य चौड़ाई 1200px -> लक्ष्य ऊंचाई = 1200 ÷ 1.777 = 675px।',
        result: 'बिना किसी खिंचाव के सटीक 1200×675 पिक्सेल आकार में स्पष्ट फोटो तैयार।'
      },
      es: {
        title: 'Ejemplo de Redimensionado para Cabecera Web',
        scenario: 'Reducir una imagen 4K de 3840×2160 a 1200×675 px para la cabecera de un blog.',
        calculation: 'Relación 16:9. Ancho objetivo: 1200 px -> Alto = 1200 ÷ 1,777 = 675 px.',
        result: 'Imagen generada exactamente a 1200×675 px con gran nitidez en 45 ms.'
      },
      ja: {
        title: 'ブログ見出し用画像の縮小リサイズ実例',
        scenario: '3840×2160の4K壁紙画像をブログのアイキャッチ規格（1200×675px）へリサイズする例。',
        calculation: 'アスペクト比 16:9。横幅目標: 1200px -> 算出縦幅 = 1200 ÷ 1.777 = 675px。',
        result: '歪みなく正確に1200×675pxへ縮小され、文字や境界のシャープさを保持したまま45msで出力。'
      },
      fr: {
        title: 'Exemple de Redimensionnement pour Article Web',
        scenario: 'Réduction d\'une image 4K de 3840×2160 px vers 1200×675 px pour un en-tête d\'article.',
        calculation: 'Ratio 16:9. Largeur cible : 1200 px -> Hauteur = 1200 ÷ 1,777 = 675 px.',
        result: 'Rendu précis à 1200×675 px avec des contours nets obtenu en 45 ms.'
      },
      de: {
        title: 'Beispiel für Blog-Header-Skalierung',
        scenario: 'Skalierung eines 3840×2160 4K-Bildes auf 1200×675 Pixel für einen Blogartikel.',
        calculation: 'Seitenverhältnis 16:9. Zielbreite: 1200 px -> Zielhöhe = 1200 ÷ 1,777 = 675 px.',
        result: 'Exakt auf 1200×675 px skaliert mit optimaler Schärfe in 45 ms.'
      },
      pt: {
        title: 'Exemplo de Redimensionamento para Blog',
        scenario: 'Redução de imagem 4K de 3840×2160 para 1200×675 px para banner de publicação.',
        calculation: 'Proporção 16:9. Largura: 1200 px -> Altura = 1200 ÷ 1,777 = 675 px.',
        result: 'Imagem gerada com 1200×675 px sem deformação em 45 ms.'
      },
      ko: {
        title: '블로그 헤더 규격 이미지 리사이징 실전 예시',
        scenario: '3840×2160 크기의 4K 배경 사진을 블로그 메인 이미지 규격인 1200×675px로 축소.',
        calculation: '16:9 비율 유지: 목표 가로 1200px -> 계산된 세로 = 1200 ÷ 1.777 = 675px.',
        result: '왜곡 없이 정확히 1200×675px로 선명하게 조절된 이미지가 45ms 만에 완성.'
      },
      it: {
        title: 'Esempio di Ridimensionamento per Articolo Web',
        scenario: 'Riduzione di un\'immagine 4K da 3840×2160 a 1200×675 px per testata blog.',
        calculation: 'Rapporto 16:9. Larghezza: 1200 px -> Altezza = 1200 ÷ 1,777 = 675 px.',
        result: 'File generato esattamente a 1200×675 px nitido e pronto in 45 ms.'
      }
    },
    faqs: {
      en: [
        { question: 'Does resizing images cause quality loss or blurriness?', answer: 'Downscaling retains high visual fidelity using browser bicubic smoothing. Upscaling beyond 150% of native resolution may result in visible pixelation since new pixel data must be interpolated.' },
        { question: 'Why is locking aspect ratio recommended?', answer: 'Locking aspect ratio ensures the proportional ratio between width and height is kept constant, preventing photos from appearing squished or stretched.' },
        { question: 'Are files sent to any remote server?', answer: 'No. Resizing takes place 100% inside your browser\'s local Canvas memory.' },
        { question: 'What file formats are supported?', answer: 'Standard web formats including JPEG, PNG, WebP, and SVG can be resized and exported.' }
      ],
      hi: [
        { question: 'क्या फोटो का आकार बदलने से धुंधलापन आता है?', answer: 'छोटा (डाउनस्केल) करने पर फोटो बहुत साफ रहती है। मूल आकार से 150% से अधिक बड़ा करने पर पिक्सेल दिख सकते हैं क्योंकि नए पिक्सेल का अनुमान लगाना पड़ता है।' },
        { question: 'आस्पेक्ट रेशियो लॉक रखने की सलाह क्यों दी जाती है?', answer: 'यह चौड़ाई और ऊंचाई के अनुपात को बराबर रखता है, जिससे फोटो खिंची हुई या चपटी नहीं दिखती।' },
        { question: 'क्या फाइलें किसी बाहरी सर्वर पर भेजी जाती हैं?', answer: 'नहीं। आकार बदलने की पूरी प्रक्रिया आपके अपने ब्राउज़र में स्थानीय रूप से होती है।' },
        { question: 'कौन से फाइल प्रारूप समर्थित हैं?', answer: 'JPEG, PNG, WebP और SVG फाइलों का आकार बदला और डाउनलोड किया जा सकता है।' }
      ],
      es: [
        { question: '¿Redimensionar produce pérdida de calidad o desenfoque?', answer: 'Reducir el tamaño mantiene gran nitidez con suavizado bicúbico. Ampliar por encima del 150% del original puede mostrar píxeles visibles.' },
        { question: '¿Por qué conviene bloquear la relación de aspecto?', answer: 'Garantiza que ancho y alto varíen proporcionalmente, impidiendo deformaciones en personas u objetos.' },
        { question: '¿Los archivos se envían a algún servidor?', answer: 'No. El cálculo se ejecuta 100% en la memoria de su navegador.' },
        { question: '¿Qué formatos son compatibles?', answer: 'Soporta archivos JPEG, PNG, WebP y SVG para redimensionar y guardar.' }
      ],
      ja: [
        { question: 'リサイズによって画質が低下したりぼやけたりしますか？', answer: '縮小処理はBicubic補間により鮮明に保たれます。元サイズの150%を超える大幅な拡大処理を行う場合は、ピクセル補間により輪郭がやや粗くなることがあります。' },
        { question: 'アスペクト比の固定が推奨される理由は何ですか？', answer: '縦横の比率を維持することで、人物や風景が不自然に横伸び・縦伸びする歪みを防ぐためです。' },
        { question: '画像がサーバーへ送信されることはありますか？', answer: 'いいえ。すべての処理はお使いのブラウザ内部で安全に行われます。' },
        { question: '対応しているファイル形式は何ですか？', answer: 'JPEG、PNG、WebP、SVGなど主要なWeb画像フォーマットに対応しています。' }
      ],
      fr: [
        { question: 'Le redimensionnement dégrade-t-il la qualité ?', answer: 'La réduction préserve une netteté remarquable. Un agrandissement au-delà de 150 % peut en revanche faire apparaître les pixels.' },
        { question: 'Pourquoi verrouiller le ratio d\'aspect ?', answer: 'Pour conserver les proportions naturelles et éviter d\'écraser ou d\'étirer l\'image.' },
        { question: 'Les fichiers sont-ils envoyés sur un serveur ?', answer: 'Non. Tout s\'exécute localement dans votre navigateur en toute confidentialité.' },
        { question: 'Quels formats sont acceptés ?', answer: 'Les formats JPEG, PNG, WebP et SVG sont pleinement pris en charge.' }
      ],
      de: [
        { question: 'Führt das Skalieren zu Unschärfe?', answer: 'Das Verkleinern bleibt durch bikubische Glättung gestochen scharf. Starkes Vergrößern (>150 %) kann zu Pixelbildung führen.' },
        { question: 'Warum sollte das Seitenverhältnis gesperrt bleiben?', answer: 'Damit Breite und Höhe proportional bleiben und das Bild nicht verzerrt oder gestaucht wird.' },
        { question: 'Werden Bilder über das Netzwerk übertragen?', answer: 'Nein. Die Verarbeitung erfolgt vollständig lokal im Browser-Canvas.' },
        { question: 'Welche Dateiformate werden unterstützt?', answer: 'Gängige Formate wie JPEG, PNG, WebP und SVG werden unterstützt.' }
      ],
      pt: [
        { question: 'Redimensionar diminui a nitidez da foto?', answer: 'Reduções mantêm excelente definição. Ampliações acima de 150% do original podem apresentar serrilhado.' },
        { question: 'Por que é importante manter o aspecto travado?', answer: 'Para assegurar que largura e altura variem juntas, evitando que a imagem fique esticada.' },
        { question: 'Meus arquivos são enviados para algum servidor?', answer: 'Não. O processamento roda 100% no navegador do seu próprio aparelho.' },
        { question: 'Quais extensões são compatíveis?', answer: 'Suporta os formatos mais comuns da web: JPEG, PNG, WebP e SVG.' }
      ],
      ko: [
        { question: '크기를 조절하면 화질이 깨지거나 흐려지나요?', answer: '축소 작업은 보간 필터를 통해 매우 선명하게 유지됩니다. 다만 원본의 150% 이상으로 확대할 경우 픽셀 보간에 따른 약간의 흐림 현상이 나타날 수 있습니다.' },
        { question: '가로세로 비율 고정을 추천하는 이유는 무엇인가요?', answer: '사진의 가로와 세로 비율을 일정하게 유지하여 인물이나 사물이 옆으로 늘어나거나 찌그러지는 왜곡을 방지하기 위함입니다.' },
        { question: '파일이 외부 서버로 전송되나요?', answer: '아닙니다. 브라우저의 로컬 Canvas 메모리 내에서 100% 안전하게 처리됩니다.' },
        { question: '지원되는 이미지 포맷은 무엇인가요?', answer: 'JPEG, PNG, WebP, SVG 등 주요 웹 이미지 규격을 모두 지원합니다.' }
      ],
      it: [
        { question: 'Il ridimensionamento provoca perdita di nitidezza?', answer: 'La riduzione mantiene contorni definiti. Un ingrandimento superiore al 150% può provocare una leggera sgranatura dei pixel.' },
        { question: 'Perché bloccare il rapporto di forma?', answer: 'Per garantire che le proporzioni rimangano costanti, evitando allungamenti innaturali.' },
        { question: 'I file vengono inviati su server remoti?', answer: 'No. Il processo si svolge interamente sul Canvas locale del browser.' },
        { question: 'Quali formati sono supportati?', answer: 'JPEG, PNG, WebP e SVG sono tutti compatibili per ridimensionamento e salvataggio.' }
      ]
    }
  },

  'jpg-to-png': {
    name: 'JPG to PNG',
    formulaTitle: {
      en: 'Discrete Cosine Decoding to Lossless PNG Deflate Architecture',
      hi: 'डिस्क्रिट कोसाइन डिकोडिंग से लॉसलेस PNG डिफ्लेट संरचना',
      es: 'Decodificación Coseno Discreto a Estructura PNG Sin Pérdida Deflate',
      ja: '離散コサイン逆変換からPNG可逆Deflate圧縮への変換構造',
      fr: 'Décodage Cosenus Discret vers Architecture PNG Sans Perte Deflate',
      de: 'Diskrete Kosinus-Dekodierung zu Verlustfreiem PNG-Deflate',
      pt: 'Decodificação Cosseno Discreto para Arquitetura PNG Sem Perdas Deflate',
      ko: '이산 코사인 디코딩 기반 무손실 PNG Deflate 변환 구조',
      it: 'Decodifica Coseno Discreto in Architettura PNG Senza Perdite Deflate'
    },
    formulaDescription: {
      en: 'The converter decodes standard JPEG Discrete Cosine Transform (DCT) raster blocks onto an HTML5 CanvasRenderingContext2D surface, then serializes the uncompressed RGBA pixel buffer into lossless Portable Network Graphics (PNG) format using the DEFLATE algorithm, preventing further compression artifacts.',
      hi: 'यह कनवर्टर JPEG फोटो को HTML5 कैनवास पर डीकोड करता है और फिर RGBA पिक्सेल बफर को DEFLATE एल्गोरिदम द्वारा लॉसलेस PNG में बदलता है। इससे फोटो को दोबारा सेव करने पर गुणवत्ता में कोई गिरावट नहीं आती।',
      es: 'El convertidor decodifica los bloques JPEG en un lienzo HTML5 y serializa el búfer RGBA en formato PNG sin pérdida mediante compresión DEFLATE, evitando degradaciones adicionales.',
      ja: '本変換機能は、JPEGの離散コサイン変換（DCT）ブロックをHTML5 Canvas上にデコード展開し、RGBAピクセルバッファを可逆Deflateアルゴリズムを用いて高品位PNGとして再構築します。',
      fr: 'Le convertisseur décode les blocs JPEG sur Canvas HTML5 puis sérialise le tampon RGBA en format PNG sans perte via l\'algorithme DEFLATE, stoppant toute dégradation visuelle.',
      de: 'Der Konverter dekodiert JPEG-Kosinusblöcke auf ein HTML5-Canvas und exportiert den RGBA-Puffer verlustfrei als PNG mittels DEFLATE-Kompression ohne weitere Qualitätsverluste.',
      pt: 'O conversor decodifica blocos JPEG no Canvas HTML5 e serializa os pixels RGBA no formato PNG sem perdas com algoritmo DEFLATE, eliminando novas perdas de compressão.',
      ko: '본 변환기는 JPEG 이산 코사인 블록을 HTML5 Canvas에 디코딩한 뒤, 무손실 DEFLATE 알고리즘을 통해 RGBA 픽셀 버퍼를 순수 PNG 규격으로 직렬화하여 추가적인 화질 저하를 방지합니다.',
      it: 'Il convertitore decodifica i blocchi JPEG su Canvas HTML5 e serializza i pixel RGBA in formato PNG senza perdite con algoritmo DEFLATE, evitando artefatti aggiuntivi.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload JPG File', instruction: 'Drag and drop your JPG or JPEG image into the dropzone.' },
        { stepNumber: 2, title: 'Inspect Image Preview', instruction: 'Confirm image dimensions and verify that colors render accurately.' },
        { stepNumber: 3, title: 'Convert to PNG', instruction: 'The tool extracts uncompressed pixel data and packages it into lossless PNG format instantly.' },
        { stepNumber: 4, title: 'Download PNG', instruction: 'Click Download to receive your pristine, lossless PNG file.' }
      ],
      hi: [
        { stepNumber: 1, title: 'JPG फाइल चुनें', instruction: 'अपनी JPG या JPEG फोटो को ड्रॉपज़ोन में खींचें या चुनें।' },
        { stepNumber: 2, title: 'फोटो का पूर्वावलोकन देखें', instruction: 'फोटो का आकार और रंगों की स्पष्टता जांचें।' },
        { stepNumber: 3, title: 'PNG में बदलें', instruction: 'टूल तुरंत पिक्सेल डेटा निकालकर इसे बिना किसी नुकसान के PNG में बदल देता है।' },
        { stepNumber: 4, title: 'डाउनलोड करें', instruction: 'तैयार PNG फाइल को अपने डिवाइस पर तुरंत डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar JPG', instruction: 'Arrastre su imagen JPG o JPEG al área de carga.' },
        { stepNumber: 2, title: 'Comprobar vista previa', instruction: 'Verifique dimensiones y fidelidad de color.' },
        { stepNumber: 3, title: 'Convertir a PNG', instruction: 'El sistema empaqueta los píxeles en formato PNG sin pérdida.' },
        { stepNumber: 4, title: 'Descargar PNG', instruction: 'Guarde su archivo PNG listo para editar o publicar.' }
      ],
      ja: [
        { stepNumber: 1, title: 'JPG画像の選択', instruction: 'JPGまたはJPEGファイルを画面にドラッグ＆ドロップします。' },
        { stepNumber: 2, title: 'プレビュー確認', instruction: '解像度と色合いが正しく反映されているか確認します。' },
        { stepNumber: 3, title: 'PNGへ高速変換', instruction: '展開されたピクセルデータを可逆PNG形式に即座に再エンコードします。' },
        { stepNumber: 4, title: 'PNGの保存', instruction: 'ダウンロードボタンをクリックして高品位PNGファイルを保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Déposer le JPG', instruction: 'Glissez votre fichier JPG ou JPEG dans la zone de dépôt.' },
        { stepNumber: 2, title: 'Vérifier l\'aperçu', instruction: 'Contrôlez les dimensions et les couleurs à l\'écran.' },
        { stepNumber: 3, title: 'Convertir en PNG', instruction: 'Le système convertit instantanément les pixels en PNG sans perte.' },
        { stepNumber: 4, title: 'Télécharger le PNG', instruction: 'Enregistrez votre nouvelle image PNG sur votre appareil.' }
      ],
      de: [
        { stepNumber: 1, title: 'JPG hochladen', instruction: 'Ziehen Sie Ihre JPG- oder JPEG-Datei in das Ablagefeld.' },
        { stepNumber: 2, title: 'Vorschau prüfen', instruction: 'Überprüfen Sie Bildabmessungen und Farbwiedergabe.' },
        { stepNumber: 3, title: 'In PNG umwandeln', instruction: 'Pixeldaten werden unmittelbar als verlustfreies PNG kodiert.' },
        { stepNumber: 4, title: 'PNG herunterladen', instruction: 'Speichern Sie das fertige PNG-Bild auf Ihrem Gerät.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Enviar JPG', instruction: 'Arraste seu arquivo JPG ou JPEG para a área indicada.' },
        { stepNumber: 2, title: 'Checar prévia', instruction: 'Confira as medidas e a fidelidade das cores.' },
        { stepNumber: 3, title: 'Converter para PNG', instruction: 'Os pixels são compilados no padrão PNG sem perdas.' },
        { stepNumber: 4, title: 'Baixar PNG', instruction: 'Clique no botão para salvar o arquivo PNG no computador.' }
      ],
      ko: [
        { stepNumber: 1, title: 'JPG 파일 업로드', instruction: 'JPG 또는 JPEG 이미지 파일을 업로드 영역에 끌어다 놓습니다.' },
        { stepNumber: 2, title: '미리보기 점검', instruction: '사진 해상도와 색상이 정상적으로 표시되는지 확인합니다.' },
        { stepNumber: 3, title: 'PNG 포맷 변환', instruction: '디코딩된 픽셀을 무손실 PNG 규격으로 즉각 재인코딩합니다.' },
        { stepNumber: 4, title: 'PNG 다운로드', instruction: '다운로드 버튼을 클릭하여 깨끗한 PNG 파일을 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare il file JPG', instruction: 'Trascina l\'immagine JPG o JPEG nell\'apposito riquadro.' },
        { stepNumber: 2, title: 'Verificare l\'anteprima', instruction: 'Controlla dimensioni e fedeltà dei colori a video.' },
        { stepNumber: 3, title: 'Convertire in PNG', instruction: 'I dati dei pixel vengono ricodificati in formato PNG senza perdite.' },
        { stepNumber: 4, title: 'Scaricare il PNG', instruction: 'Salva il nuovo file PNG pronto per l\'uso.' }
      ]
    },
    example: {
      en: {
        title: 'Lossless Conversion for Graphic Design Workflow',
        scenario: 'Converting a compressed JPG company logo to PNG format before adding vector overlays in design software.',
        calculation: 'Input: 180 KB lossy JPG. Canvas decoding extracts 800×600 RGBA buffer. PNG encoder writes lossless IHDR and IDAT chunks.',
        result: 'Output: 340 KB lossless PNG preserving all original edge definitions without introducing secondary compression loss.'
      },
      hi: {
        title: 'ग्राफिक डिजाइन के लिए JPG से PNG रूपांतरण',
        scenario: 'डिजाइन सॉफ्टवेयर में उपयोग से पहले JPG लोगो को PNG में बदलना ताकि आगे गुणवत्ता न घटे।',
        calculation: 'इनपुट: 180 KB JPG। कैनवास डीकोडिंग 800×600 RGBA बफर निकालती है और लॉसलेस PNG बनाती है।',
        result: 'आउटपुट: 340 KB का साफ PNG फाइल जो बिना किसी नए कम्प्रेशन लॉस के सुरक्षित है।'
      },
      es: {
        title: 'Ejemplo de Conversión para Diseño Gráfico',
        scenario: 'Convertir un logotipo JPG a PNG antes de retocarlo en programas de edición.',
        calculation: 'Entrada: JPG de 180 KB. Extracción de búfer RGBA de 800×600 px en Canvas.',
        result: 'Salida: Archivo PNG de 340 KB sin pérdidas secundarias para edición continua.'
      },
      ja: {
        title: 'デザイン編集用JPGからPNGへの変換実例',
        scenario: '再編集時の画質劣化を防ぐため、JPGロゴ画像をPNGへ変換する例。',
        calculation: '入力: 180KBのJPG。800×600pxのRGBAピクセルデータを展開し、可逆PNGへ再構成。',
        result: '出力: 340KBの高品位PNGファイル。以後の保存による再圧縮劣化を完全防止。'
      },
      fr: {
        title: 'Exemple de Conversion pour Graphisme',
        scenario: 'Conversion d\'un logo JPG en PNG avant retouche dans un logiciel de PAO.',
        calculation: 'Entrée : JPG de 180 Ko. Décodage Canvas 800×600 px et encodage PNG DEFLATE.',
        result: 'Sortie : PNG de 340 Ko sans dégradation pour une manipulation fluide.'
      },
      de: {
        title: 'Beispiel für Grafikdesign-Konvertierung',
        scenario: 'Umwandlung eines JPG-Logos in PNG vor der Weiterbearbeitung.',
        calculation: 'Eingabe: 180 KB JPG. Canvas-Puffer 800×600 Pixel verlustfrei als PNG serialisiert.',
        result: 'Ausgabe: 340 KB PNG ohne zusätzliche Kompressionsartefakte.'
      },
      pt: {
        title: 'Exemplo de Conversão para Design Gráfico',
        scenario: 'Conversão de logotipo JPG para PNG para evitar perdas em edições futuras.',
        calculation: 'Entrada: JPG de 180 KB. Extração de matriz RGBA de 800×600 px no Canvas.',
        result: 'Saída: Arquivo PNG de 340 KB perfeito para softwares de edição.'
      },
      ko: {
        title: '그래픽 디자인 작업을 위한 JPG의 PNG 변환 실전 예시',
        scenario: '포토샵 등 디자인 툴에서 재작업 시 추가 손실을 막기 위해 JPG 로고를 PNG로 변환.',
        calculation: '입력: 180KB JPG. 800×600 RGBA 픽셀 버퍼를 추출하여 무손실 PNG 청크로 직렬화.',
        result: '출력: 340KB 무손실 PNG 파일 생성 (반복 저장에 따른 2차 압축 노이즈 원천 방지).'
      },
      it: {
        title: 'Esempio di Conversione per Grafica',
        scenario: 'Conversione di un logo JPG in PNG prima dell\'editing in software vettoriali.',
        calculation: 'Input: JPG da 180 KB. Decodifica Canvas 800×600 pixel e output PNG.',
        result: 'Output: File PNG da 340 KB senza artefatti da compressione secondaria.'
      }
    },
    faqs: {
      en: [
        { question: 'Does converting JPG to PNG create transparent backgrounds automatically?', answer: 'No. JPG format has no transparency channel (alpha). Converting to PNG creates a solid lossless image. Transparent pixels must be added via an image editor.' },
        { question: 'Why is the PNG file often larger than the original JPG?', answer: 'PNG uses lossless compression (DEFLATE), storing exact pixel values, whereas JPG uses lossy compression that discards subtle frequency data.' },
        { question: 'Is the conversion executed locally in the browser?', answer: 'Yes. 100% of processing happens in your browser\'s Canvas memory. No files are uploaded to our servers.' },
        { question: 'Will converting improve the original photo quality?', answer: 'No conversion can restore data previously discarded by JPG compression, but PNG prevents further quality degradation during subsequent saves.' }
      ],
      hi: [
        { question: 'क्या JPG से PNG में बदलने पर बैकग्राउंड अपने आप पारदर्शी हो जाता है?', answer: 'नहीं। JPG में पारदर्शिता (अल्फा चैनल) नहीं होती। PNG में बदलने से साफ लॉसलेस फोटो बनती है, लेकिन बैकग्राउंड हटाने के लिए एडिटर की आवश्यकता होती है।' },
        { question: 'PNG फाइल का आकार अक्सर मूल JPG से बड़ा क्यों होता है?', answer: 'PNG लॉसलेस कम्प्रेशन का उपयोग करता है और हर पिक्सेल का सटीक डेटा रखता है, जबकि JPG डेटा हटाकर फाइल को छोटा करता है।' },
        { question: 'क्या रूपांतरण सीधे ब्राउज़र में होता है?', answer: 'हाँ। पूरी प्रक्रिया 100% आपके ब्राउज़र की कैनवास मेमोरी में होती है। कोई फाइल सर्वर पर नहीं जाती।' },
        { question: 'क्या बदलने से मूल फोटो की गुणवत्ता बढ़ जाती है?', answer: 'कोई भी टूल JPG में पहले से खोए हुए विवरण वापस नहीं ला सकता, लेकिन PNG आगे किसी भी गिरावट को रोकता है।' }
      ],
      es: [
        { question: '¿La conversión genera transparencias automáticamente?', answer: 'No. El formato JPG carece de canal alfa. La imagen PNG resultante será opaca y sin pérdidas.' },
        { question: '¿Por qué el archivo PNG pesa más que el JPG?', answer: 'PNG almacena cada píxel de forma exacta y sin pérdida, mientras que JPG descarta información para reducir espacio.' },
        { question: '¿La conversión es 100% local en el navegador?', answer: 'Sí. Todo se procesa en la memoria del navegador sin subir archivos a la red.' },
        { question: '¿Mejora la calidad de una foto borrosa?', answer: 'No recupera detalles eliminados en la compresión JPG previa, pero evita pérdidas adicionales al volver a guardar.' }
      ],
      ja: [
        { question: 'JPGからPNGに変換すると背景が自動的に透明になりますか？', answer: 'いいえ。JPG規格には透明度情報（アルファチャンネル）が存在しないため、透過処理は行われず不透明なPNGとして出力されます。' },
        { question: 'PNGファイルの容量がJPGより大きくなるのはなぜですか？', answer: 'JPGが視覚情報を間引く「非可逆圧縮」であるのに対し、PNGは全ピクセルを完全保持する「可逆圧縮」を採用しているためです。' },
        { question: '変換処理は完全にブラウザ内で行われますか？', answer: 'はい。外部サーバーを介さずにお使いの端末内で100%安全に処理されます。' },
        { question: '画質は元の写真より向上しますか？', answer: 'JPG圧縮時にすでに失われたディテールを復元することはできませんが、今後の再保存による劣化を防ぐことができます。' }
      ],
      fr: [
        { question: 'La conversion rend-elle le fond transparent automatiquement ?', answer: 'Non. Le format JPEG ne possède pas de canal alpha. L\'image PNG produite reste opaque.' },
        { question: 'Pourquoi le fichier PNG est-il plus lourd que le JPG ?', answer: 'Le format PNG applique une compression sans perte (DEFLATE), préservant chaque pixel au lieu d\'en éliminer.' },
        { question: 'La conversion s\'effectue-t-elle en local ?', answer: 'Oui. Le traitement s\'opère intégralement dans la mémoire de votre navigateur sans transfert de données.' },
        { question: 'La qualité visuelle est-elle améliorée ?', answer: 'Les données perdues lors de la compression JPEG initiale ne peuvent être recréées, mais le PNG fige la netteté sans dégradation future.' }
      ],
      de: [
        { question: 'Wird der Hintergrund automatisch transparent?', answer: 'Nein. JPEG-Dateien besitzen keinen Transparenzkanal. Das PNG wird ohne Transparenz verlustfrei erzeugt.' },
        { question: 'Warum ist die PNG-Datei größer als das JPG?', answer: 'PNG speichert alle Bildpunkte exakt und verlustfrei ab, während JPEG Bildinformationen unwiderruflich verwirft.' },
        { question: 'Findet die Umwandlung lokal im Browser statt?', answer: 'Ja. Zu 100 % im Arbeitsspeicher Ihres Browsers ohne Serverübertragung.' },
        { question: 'Wird die Bildqualität dadurch besser?', answer: 'Früherer Qualitätsverlust des JPGs lässt sich nicht rückgängig machen, aber PNG verhindert weitere Einbußen.' }
      ],
      pt: [
        { question: 'O fundo fica transparente de forma automática?', answer: 'Não. O formato JPG não possui canal de transparência. A imagem PNG resultante é sólida e sem perdas.' },
        { question: 'Por que o arquivo PNG fica mais pesado que o JPG?', answer: 'O PNG utiliza compressão sem perdas (DEFLATE), guardando cada pixel com fidelidade total.' },
        { question: 'A conversão roda localmente no navegador?', answer: 'Sim. Todo o cálculo ocorre no seu aparelho via Canvas, sem envio de arquivos para a nuvem.' },
        { question: 'A conversão melhora a nitidez de fotos ruins?', answer: 'Não recupera dados que o JPG original já descartou, mas impede novas perdas em edições futuras.' }
      ],
      ko: [
        { question: 'JPG를 PNG로 바꾸면 배경이 자동으로 투명해지나요?', answer: '아닙니다. JPG 규격에는 투명도(알파 채널) 정보가 없으므로 불투명한 무손실 PNG로 변환됩니다.' },
        { question: 'PNG 파일의 용량이 원래 JPG보다 큰 이유는 무엇인가요?', answer: 'JPG는 눈에 잘 안 띄는 색상 정보를 버리는 손실 압축인 반면, PNG는 모든 픽셀 데이터를 온전히 보존하는 무손실 압축이기 때문입니다.' },
        { question: '변환이 브라우저 로컬에서 안전하게 처리되나요?', answer: '네. 모든 변환 과정이 사용자 기기의 브라우저 메모리 내에서 100% 로컬로 실행됩니다.' },
        { question: '변환하면 원본 화질이 더 좋아지나요?', answer: '기존 JPG에서 이미 소실된 디테일을 되살릴 수는 없지만, 향후 반복 저장 시 발생하는 추가 화질 저하를 완벽히 막아줍니다.' }
      ],
      it: [
        { question: 'La conversione rende lo sfondo trasparente in automatico?', answer: 'No. Il formato JPG non ha canale alfa. Il PNG risultante sarà opaco e privo di perdite.' },
        { question: 'Perché il file PNG pesa spesso più del JPG originale?', answer: 'Il PNG adotta una compressione senza perdite conservando tutti i pixel, mentre il JPG scarta informazioni.' },
        { question: 'La procedura si svolge in locale nel browser?', answer: 'Sì. Tutto il processo avviene nella memoria del browser con massima riservatezza.' },
        { question: 'La qualità della foto originale migliora?', answer: 'Non è possibile ripristinare dati già persi nella compressione JPG, ma il PNG previene ulteriori cali di definizione.' }
      ]
    }
  },

  'png-to-jpg': {
    name: 'PNG to JPG',
    formulaTitle: {
      en: 'Alpha Flattening & Discrete Cosine JPEG Encoding Architecture',
      hi: 'अल्फा फ्लैटनिंग और डिस्क्रिट कोसाइन JPEG एन्कोडिंग संरचना',
      es: 'Aplanado de Canal Alfa y Codificación JPEG por Coseno Discreto',
      ja: 'アルファチャンネル白背景合成およびJPEG離散コサイン符号化構造',
      fr: 'Aplatissement du Canal Alpha et Encodage JPEG par Cosinus Discret',
      de: 'Alpha-Kanal-Glättung & Diskrete Kosinus-JPEG-Kodierungsarchitektur',
      pt: 'Aplainamento do Canal Alfa e Codificação JPEG por Cosseno Discreto',
      ko: '알파 채널 평탄화 및 이산 코사인 JPEG 인코딩 변환 구조',
      it: 'Appiattimento del Canale Alfa e Codifica JPEG per Coseno Discreto'
    },
    formulaDescription: {
      en: 'PNG to JPG conversion composites the source RGBA image over a solid white (#FFFFFF) background surface on an HTML5 Canvas, eliminating transparency artifacts. The merged pixel buffer is then encoded into JPEG format with 92% quality quantization directly in browser memory.',
      hi: 'PNG से JPG रूपांतरण स्रोत RGBA फोटो को HTML5 कैनवास पर साफ सफेद (#FFFFFF) बैकग्राउंड पर कम्पोजिट करता है जिससे काले धब्बे नहीं आते। इसके बाद 92% उच्च गुणवत्ता के साथ JPEG में बदला जाता है।',
      es: 'La conversión de PNG a JPG combina la imagen RGBA sobre un fondo blanco sólido (#FFFFFF) en el lienzo HTML5, eliminando fondos negros indeseados antes de codificar en JPEG al 92% de calidad.',
      ja: '本変換機能は、透過PNGのRGBA画像をHTML5 Canvas上で純白（#FFFFFF）の背景に合成。黒ずみなどの透過表示不良を排除した上で、92%の高品質JPEGデータへとローカル変換します。',
      fr: 'La conversion de PNG en JPG applique un fond blanc opaque (#FFFFFF) sous l\'image pour éviter tout aplat noir, puis encode le résultat en JPEG à 92% de qualité directement dans le navigateur.',
      de: 'Die Konvertierung überlagert transparente PNG-Bereiche mit neutralem Weiß (#FFFFFF) im HTML5-Canvas und kodiert das Bild mit 92 % Qualität als kompaktes JPEG lokal im Browser.',
      pt: 'A conversão de PNG para JPG mescla a imagem com um fundo branco sólido (#FFFFFF) no Canvas HTML5, eliminando falhas de transparência e gerando um JPEG a 92% de qualidade no navegador.',
      ko: 'PNG to JPG 변환기는 투명한 RGBA 픽셀 영역 아래에 순백색(#FFFFFF) 캔버스 레이어를 자동 합성하여 검은색 배경 결함을 원천 차단한 후 92% 고품질 양자화 JPEG로 브라우저에서 직접 인코딩합니다.',
      it: 'La conversione da PNG a JPG fonde l\'immagine RGBA su uno sfondo bianco puro (#FFFFFF) nel Canvas, evitando riquadri neri e codificando un JPEG al 92% di qualità in locale.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload PNG', instruction: 'Drag and drop your PNG image into the upload box or select it from your device.' },
        { stepNumber: 2, title: 'Inspect Solid Background Merge', instruction: 'Verify that transparent areas blend smoothly onto the neutral white background.' },
        { stepNumber: 3, title: 'Adjust Output Quality', instruction: 'Keep the standard 92% quality setting or customize compression factor.' },
        { stepNumber: 4, title: 'Download JPG', instruction: 'Click Download to receive your lightweight, universally compatible JPG image.' }
      ],
      hi: [
        { stepNumber: 1, title: 'PNG फोटो अपलोड करें', instruction: 'अपनी PNG फोटो को अपलोड बॉक्स में खींचें या चुनें।' },
        { stepNumber: 2, title: 'सफेद बैकग्राउंड देखें', instruction: 'जांचें कि पारदर्शी हिस्से साफ सफेद बैकग्राउंड के साथ सही दिख रहे हैं।' },
        { stepNumber: 3, title: 'क्वालिटी सेट करें', instruction: 'मानक 92% गुणवत्ता बनाए रखें या अपनी आवश्यकतानुसार बदलें।' },
        { stepNumber: 4, title: 'JPG डाउनलोड करें', instruction: 'डाउनलोड बटन दबाकर अपनी हल्की और सार्वभौमिक JPG फोटो प्राप्त करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar PNG', instruction: 'Arrastre su imagen PNG al recuadro o selecciónela desde su dispositivo.' },
        { stepNumber: 2, title: 'Comprobar fondo blanco', instruction: 'Verifique que las transparencias se hayan rellenado correctamente.' },
        { stepNumber: 3, title: 'Ajustar calidad', instruction: 'Mantenga el ajuste estándar al 92% o personalice la compresión.' },
        { stepNumber: 4, title: 'Descargar JPG', instruction: 'Haga clic en Descargar para guardar su archivo JPG ligero.' }
      ],
      ja: [
        { stepNumber: 1, title: 'PNG画像の選択', instruction: '変換したいPNGファイルを画面上にドラッグ＆ドロップします。' },
        { stepNumber: 2, title: '白背景プレビューの確認', instruction: '透明部分が自然な白背景に馴染んでいるかプレビューで確認します。' },
        { stepNumber: 3, title: '出力品質の設定', instruction: '標準の92%高品位設定を確認し、必要に応じて圧縮率を微調整します。' },
        { stepNumber: 4, title: 'JPGのダウンロード', instruction: '「Download」をクリックして軽量なJPGファイルを保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Téléverser le PNG', instruction: 'Déposez votre fichier PNG dans la fenêtre de conversion.' },
        { stepNumber: 2, title: 'Vérifier l\'arrière-plan', instruction: 'Assurez-vous que les zones transparentes apparaissent bien sur fond blanc.' },
        { stepNumber: 3, title: 'Choisir la qualité', instruction: 'Conservez le réglage standard de 92% pour une clarté optimale.' },
        { stepNumber: 4, title: 'Télécharger le JPG', instruction: 'Enregistrez le fichier JPG prêt pour le web ou l\'impression.' }
      ],
      de: [
        { stepNumber: 1, title: 'PNG-Datei wählen', instruction: 'Laden Sie Ihre PNG-Grafik in den Umwandlungsbereich.' },
        { stepNumber: 2, title: 'Weißen Hintergrund prüfen', instruction: 'Stellen Sie sicher, dass transparente Bereiche sauber weiß dargestellt werden.' },
        { stepNumber: 3, title: 'Qualität bestätigen', instruction: 'Nutzen Sie die bewährte 92 %-Qualitätseinstellung.' },
        { stepNumber: 4, title: 'JPG herunterladen', instruction: 'Klicken Sie auf Download, um die schlanke JPG-Datei zu speichern.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Enviar arquivo PNG', instruction: 'Selecione ou arraste sua imagem PNG para o conversor.' },
        { stepNumber: 2, title: 'Checar fundo branco', instruction: 'Observe como áreas vazias ganharam preenchimento branco limpo.' },
        { stepNumber: 3, title: 'Configurar qualidade', instruction: 'Mantenha o padrão de 92% para preservar as cores da foto.' },
        { stepNumber: 4, title: 'Baixar imagem JPG', instruction: 'Salve a nova imagem leve e pronta para redes sociais.' }
      ],
      ko: [
        { stepNumber: 1, title: 'PNG 사진 업로드', instruction: '변환할 PNG 이미지 파일을 업로드 영역에 등록합니다.' },
        { stepNumber: 2, title: '흰색 배경 합성 확인', instruction: '투명했던 영역이 깨끗한 흰색 배경으로 매끄럽게 처리되었는지 확인합니다.' },
        { stepNumber: 3, title: '출력 품질 선택', instruction: '선명도 유지를 위해 기본 92% 고품질 인코딩 설정을 적용합니다.' },
        { stepNumber: 4, title: 'JPG 파일 다운로드', instruction: '다운로드 버튼을 클릭하여 가볍고 호환성 높은 JPG 파일을 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare il file PNG', instruction: 'Seleziona o trascina la tua immagine PNG nel riquadro.' },
        { stepNumber: 2, title: 'Verificare lo sfondo bianco', instruction: 'Accertati che le aree trasparenti risultino bianche e uniformi.' },
        { stepNumber: 3, title: 'Impostare la qualità', instruction: 'Mantieni l\'impostazione predefinita al 92% per la massima nitidezza.' },
        { stepNumber: 4, title: 'Scaricare il JPG', instruction: 'Salva l\'immagine JPG compatibile con ogni dispositivo.' }
      ]
    },
    example: {
      en: {
        title: 'E-Commerce Product Photo Size Reduction',
        scenario: 'Converting a 3.4 MB transparent PNG product photo to JPG for fast marketplace listing.',
        calculation: 'Input: 3,400 KB PNG. Canvas applies white background fill and 92% DCT quantization.',
        result: 'Output: 420 KB JPG (88% size reduction, compatible with strict marketplace photo upload rules).'
      },
      hi: {
        title: 'ई-कॉमर्स उत्पाद फोटो आकार घटाना',
        scenario: 'मार्केटप्लेस के लिए 3.4 MB की PNG फोटो को हल्के JPG में बदलना।',
        calculation: 'इनपुट: 3,400 KB PNG। कैनवास पर सफेद बैकग्राउंड और 92% DCT कम्प्रेशन।',
        result: 'आउटपुट: 420 KB JPG (88% आकार में कमी, सभी वेबसाइटों पर तेजी से लोड होने योग्य)।'
      },
      es: {
        title: 'Ejemplo de Optimización para Tienda Online',
        scenario: 'Pasar una foto de producto de 3,4 MB en PNG a JPG para reducir el tiempo de carga.',
        calculation: 'Entrada: PNG de 3.400 KB. Fondo blanco y compresión JPEG al 92%.',
        result: 'Salida: JPG de 420 KB (reducción del 88% ideal para plataformas de comercio electrónico).'
      },
      ja: {
        title: 'ECサイト商品写真の容量軽量化実例',
        scenario: '3.4MBの透過PNG商品画像を、出品規定に合わせてJPGへ変換し容量を削減する例。',
        calculation: '入力: 3,400KBのPNG。Canvas上で白背景合成と92%品質エンコードを実行。',
        result: '出力: 420KBのJPG（約88%の劇的な容量軽量化を達成し、商品ページの高速表示を実現）。'
      },
      fr: {
        title: 'Exemple d\'Optimisation pour Boutique en Ligne',
        scenario: 'Conversion d\'une photo de produit PNG de 3,4 Mo en JPG pour accélérer le site marchand.',
        calculation: 'Entrée : 3 400 Ko PNG. Application du fond blanc et encodage JPEG à 92 %.',
        result: 'Sortie : 420 Ko JPG (88 % d\'économie de bande passante).'
      },
      de: {
        title: 'Beispiel für Produktfoto-Optimierung',
        scenario: 'Umwandlung eines 3,4 MB großen PNG-Bildes in JPG für schnelle Shop-Ladezeiten.',
        calculation: 'Eingabe: 3.400 KB PNG. Weißer Canvas-Hintergrund und 92 % DCT-Kompression.',
        result: 'Ausgabe: 420 KB JPG (88 % kleiner bei voller Schärfe).'
      },
      pt: {
        title: 'Exemplo de Otimização para E-Commerce',
        scenario: 'Conversão de foto de produto de 3,4 MB em PNG para JPG para acelerar a loja virtual.',
        calculation: 'Entrada: PNG de 3.400 KB. Fundo branco aplicado e qualidade JPEG a 92%.',
        result: 'Saída: JPG com 420 KB (88% de economia de espaço com excelente definição).'
      },
      ko: {
        title: '쇼핑몰 상품 상세 페이지 사진 경량화 실전 예시',
        scenario: '3.4MB 용량의 투명 PNG 상품 사진을 오픈마켓 규격에 맞춰 가벼운 JPG로 변환.',
        calculation: '입력: 3,400KB PNG. 캔버스 흰색 배경 레이어 합성 및 92% DCT 압축.',
        result: '출력: 420KB JPG (약 88% 용량 감축, e커머스 상품 페이지 로딩 속도 극대화).'
      },
      it: {
        title: 'Esempio di Ottimizzazione per E-Commerce',
        scenario: 'Trasformazione di una foto prodotto da 3,4 MB da PNG a JPG per siti veloci.',
        calculation: 'Input: PNG da 3.400 KB. Fusione su bianco e compressione JPEG al 92%.',
        result: 'Output: JPG da 420 KB (riduzione dell\'88% ideale per cataloghi online).'
      }
    },
    faqs: {
      en: [
        { question: 'Why does my transparent PNG background turn white in JPG?', answer: 'JPEG format does not support transparency channels (alpha). The converter composites transparent areas onto a clean white background to avoid black rectangles.' },
        { question: 'Will I lose image quality during conversion?', answer: 'We apply a high-grade 92% quality setting that preserves photographic vibrancy while achieving substantial file size reduction.' },
        { question: 'Is there a limit on how many photos I can convert?', answer: 'No. Conversions run on your local device memory with zero server quotas or daily limitations.' },
        { question: 'Does this tool process files securely?', answer: 'Yes. All image processing executes strictly within your web browser. No files are transferred to remote servers.' }
      ],
      hi: [
        { question: 'JPG में पारदर्शी बैकग्राउंड सफेद क्यों हो जाता है?', answer: 'JPEG फॉर्मेट पारदर्शिता को सपोर्ट नहीं करता। इसलिए टूल पारदर्शी हिस्सों पर साफ सफेद रंग भर देता है ताकि फोटो में काले धब्बे न दिखें।' },
        { question: 'क्या रूपांतरण के दौरान फोटो की गुणवत्ता कम होती है?', answer: 'हम 92% उच्च गुणवत्ता एन्कोडिंग का उपयोग करते हैं जिससे फोटो के रंग और स्पष्टता बिल्कुल मूल जैसी बनी रहती है।' },
        { question: 'क्या फोटो बदलने की कोई सीमा है?', answer: 'नहीं। सभी कार्य आपके डिवाइस पर स्थानीय रूप से होते हैं, इसलिए आप असीमित फोटो मुफ्त में बदल सकते हैं।' },
        { question: 'क्या मेरी फोटो सुरक्षित है?', answer: 'हाँ, 100% सुरक्षित। फोटो कभी भी किसी सर्वर पर अपलोड नहीं की जाती।' }
      ],
      es: [
        { question: '¿Por qué la transparencia se vuelve blanca en JPG?', answer: 'JPEG no admite canal alfa de transparencia. El conversor añade automáticamente un fondo blanco limpio para evitar recuadros negros.' },
        { question: '¿Se pierde calidad perceptible durante la conversión?', answer: 'Se emplea una calidad de codificación al 92% que garantiza colores vivos sin artefactos visibles.' },
        { question: '¿Hay límite de imágenes?', answer: 'No. Como se ejecuta en su navegador, no hay límites diarios ni suscripciones.' },
        { question: '¿Se procesan las fotos de forma segura?', answer: 'Totalmente. Sus imágenes nunca salen de su ordenador o teléfono.' }
      ],
      ja: [
        { question: '透過PNGの透明部分はなぜ白背景になるのですか？', answer: 'JPEG規格には透明度情報が存在しないため、黒い枠や不具合が生じないよう自動的に自然な白背景が合成されます。' },
        { question: '画質の劣化はありますか？', answer: '92%の高品位エンコードを採用しており、細部の鮮明さを損なわずに大幅な軽量化が可能です。' },
        { question: '変換枚数に制限はありますか？', answer: 'いいえ。端末のメモリで処理されるため、枚数制限や利用上限はありません。' },
        { question: 'プライバシーは保護されますか？', answer: 'はい。外部サーバーへの画像アップロードは一切行われません。' }
      ],
      fr: [
        { question: 'Pourquoi le fond transparent devient-il blanc en JPG ?', answer: 'Le JPEG ne gérant pas la transparence, un fond blanc propre est inséré pour éviter tout cadre noir.' },
        { question: 'La qualité est-elle altérée ?', answer: 'La qualité est maintenue à 92 %, ce qui offre une netteté remarquable tout en réduisant le poids.' },
        { question: 'Combien d\'images puis-je convertir ?', answer: 'Autant que vous le souhaitez, sans aucune restriction ni abonnement.' },
        { question: 'Mes photos sont-elles confidentielles ?', answer: 'Oui. Le traitement s\'effectue à 100 % dans votre navigateur.' }
      ],
      de: [
        { question: 'Warum wird transparente Fläche in JPG weiß?', answer: 'Das JPEG-Format unterstützt keine Transparenz. Ein sauberer weißer Hintergrund verhindert schwarze Ränder.' },
        { question: 'Verliert das Bild an Schärfe?', answer: 'Dank 92 % Qualitätsstufe bleiben Farben und Details optisch unbeeinträchtigt erhalten.' },
        { question: 'Gibt es Nutzungslimits?', answer: 'Nein. Da die Umwandlung lokal im Browser erfolgt, können Sie unbegrenzt viele Dateien verarbeiten.' },
        { question: 'Ist die Verarbeitung datenschutzsicher?', answer: 'Ja. Ihre Bilder verlassen Ihr Gerät zu keinem Zeitpunkt.' }
      ],
      pt: [
        { question: 'Por que o fundo transparente vira branco no JPG?', answer: 'O JPG não aceita transparência. O conversor aplica fundo branco neutro para evitar fundos pretos.' },
        { question: 'A qualidade da foto diminui?', answer: 'Com o fator de qualidade a 92%, a imagem retém excelente definição visual.' },
        { question: 'Existe limite na quantidade de fotos?', answer: 'Não. Você pode converter quantos arquivos quiser sem restrições.' },
        { question: 'O processo é confidencial?', answer: 'Sim. Todo o processamento ocorre no próprio navegador do usuário.' }
      ],
      ko: [
        { question: 'PNG의 투명한 배경이 왜 JPG에서는 흰색으로 바뀌나요?', answer: 'JPG 규격은 투명도를 지원하지 않으므로, 투명 영역 뒤에 깨끗한 흰색 배경을 합성하여 검은색 여백이 생기는 문제를 방지합니다.' },
        { question: '변환 시 화질 저하가 심한가요?', answer: '92% 고품질 압축 알고리즘을 적용하여 원본의 색감과 선명도를 충실하게 보존합니다.' },
        { question: '변환할 수 있는 이미지 수량 제한이 있나요?', answer: '제한이 없습니다. 사용자 기기 메모리를 활용하므로 무제한으로 이용 가능합니다.' },
        { question: '사진이 외부로 유출될 우려가 없나요?', answer: '안전합니다. 모든 처리는 브라우저 로컬에서만 실행되며 서버로 전송되지 않습니다.' }
      ],
      it: [
        { question: 'Perché la trasparenza diventa bianca nel file JPG?', answer: 'Il formato JPEG non include canali di trasparenza. Viene applicato uno sfondo bianco per evitare aloni scuri.' },
        { question: 'La qualità della foto viene compromessa?', answer: 'La compressione al 92% garantisce un risultato nitido e identico all\'originale.' },
        { question: 'Ci sono limiti di utilizzo giornaliero?', answer: 'Nessun limite. L\'operazione è illimitata e gratuita.' },
        { question: 'La privacy dei miei file è garantita?', answer: 'Sì. Le immagini vengono elaborate interamente all\'interno del tuo browser.' }
      ]
    }
  },

  'svg-to-png': {
    name: 'SVG to PNG',
    formulaTitle: {
      en: 'Vector XML Rasterization & High-DPI Canvas Rendering Architecture',
      hi: 'वेक्टर XML रेखापुंज और उच्च-DPI कैनवास रेंडरिंग संरचना',
      es: 'Rasterización de Vectores XML y Renderizado en Lienzo de Alta Resolución',
      ja: 'ベクターXMLラスタライズおよび高解像度Canvasレンダリング構造',
      fr: 'Pixellisation de Vecteurs XML et Rendu Canvas Haute Résolution',
      de: 'Vektor-XML-Rasterung & High-DPI-Canvas-Rendering-Architektur',
      pt: 'Rasterização de Vetor XML e Renderização em Canvas de Alta Resolução',
      ko: '벡터 XML 래스터화 및 고해상도 High-DPI Canvas 렌더링 구조',
      it: 'Rasterizzazione Vettoriale XML e Rendering Canvas ad Alta Risoluzione'
    },
    formulaDescription: {
      en: 'The converter serializes vector SVG markup into an in-memory Blob URL (image/svg+xml), renders mathematical bezier curves and paths onto an HTML5 Canvas at custom scaling factors (1x, 2x, 4x for Retina/High-DPI displays), and exports lossless PNG pixel buffers with intact alpha transparency.',
      hi: 'यह कनवर्टर SVG मार्कअप को इन-मेमोरी ब्लॉब URL में बदलता है, बेज़ियर वक्रों को उच्च स्केलिंग कारकों (1x, 2x, 4x) के साथ HTML5 कैनवास पर रेंडर करता है, और पूरी पारदर्शिता के साथ उच्च-रिज़ॉल्यूशन PNG फाइल बनाता है।',
      es: 'El convertidor transforma el código vectorial SVG en una URL Blob en memoria, renderiza curvas de Bézier en el lienzo a factores de escala personalizados (1x, 2x, 4x) y exporta imágenes PNG con transparencia perfecta.',
      ja: '本変換機能は、ベクターSVGのパスや曲線をメモリ内Blob URL経由でHTML5 Canvasへ描画。Retinaディスプレイ対応の高解像度スケール（1x、2x、4x）を指定可能で、透明度を保った美しいPNGを出力します。',
      fr: 'Le convertisseur transforme le code SVG vectoriel en Blob mémoire, calcule les tracés sur Canvas à des échelles configurables (1x, 2x, 4x) et exporte un fichier PNG net avec canal de transparence complet.',
      de: 'Der Konverter überführt Vektor-SVG-Quelltexte über eine Blob-URL auf das HTML5-Canvas. Pfade werden mit frei wählbaren Skalierungsfaktoren (1x, 2x, 4x) hochauflösend als transparentes PNG gerendert.',
      pt: 'O conversor processa o código SVG vetorial em um Blob na memória, projeta curvas Bézier no Canvas em escalas personalizadas (1x, 2x, 4x) e exporta um PNG de alta definição com transparência total.',
      ko: '본 변환기는 벡터 SVG 마크업을 메모리 내 Blob URL로 변환하여 베지에 곡선과 패스를 HTML5 Canvas에 고밀도 배율(1x, 2x, 4x)로 렌더링한 후, 투명 채널이 보존된 선명한 무손실 PNG 파일로 출력합니다.',
      it: 'Il convertitore trasforma il codice vettoriale SVG in un Blob in memoria, proietta i tracciati su Canvas con fattori di scala personalizzati (1x, 2x, 4x) ed esporta un file PNG nitido con trasparenza.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload SVG Vector', instruction: 'Upload or drop your .svg vector illustration or icon file into the workspace.' },
        { stepNumber: 2, title: 'Select Output Resolution Scale', instruction: 'Choose standard 1x, 2x (HD), or 4x (Ultra HD for Retina displays and print).' },
        { stepNumber: 3, title: 'Confirm Transparency', instruction: 'Review the checkered preview to confirm vector paths render crisply over the transparent background.' },
        { stepNumber: 4, title: 'Download PNG', instruction: 'Click Download PNG to save your crisp, high-resolution raster asset.' }
      ],
      hi: [
        { stepNumber: 1, title: 'SVG फाइल अपलोड करें', instruction: 'अपनी .svg वेक्टर फाइल या आइकन को वर्कस्पेस में अपलोड करें।' },
        { stepNumber: 2, title: 'रिज़ॉल्यूशन स्केल चुनें', instruction: 'मानक 1x, 2x (HD) या 4x (रेटिना डिस्प्ले व प्रिंटिंग के लिए अल्ट्रा HD) चुनें।' },
        { stepNumber: 3, title: 'पारदर्शिता की जांच करें', instruction: 'चेकर्ड प्रीव्यू में देखें कि वेक्टर डिज़ाइन पारदर्शी बैकग्राउंड पर साफ दिख रहा है।' },
        { stepNumber: 4, title: 'PNG डाउनलोड करें', instruction: 'डाउनलोड बटन दबाकर उच्च-रिज़ॉल्यूशन PNG फाइल प्राप्त करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar archivo SVG', instruction: 'Arrastre su ilustración o icono vectorial .svg al panel de trabajo.' },
        { stepNumber: 2, title: 'Elegir escala de resolución', instruction: 'Seleccione 1x, 2x (HD) o 4x (Ultra HD para pantallas Retina e impresión).' },
        { stepNumber: 3, title: 'Comprobar transparencia', instruction: 'Inspeccione la cuadrícula de fondo para verificar que los bordes se mantengan limpios.' },
        { stepNumber: 4, title: 'Descargar PNG', instruction: 'Guarde su nuevo archivo PNG de alta resolución.' }
      ],
      ja: [
        { stepNumber: 1, title: 'SVGベクターの選択', instruction: '.svg形式のイラストやアプリアイコンファイルを画面に読み込みます。' },
        { stepNumber: 2, title: '解像度スケールの指定', instruction: '標準の1x、2x（高精細HD）、または4x（Retina画面・印刷向けUltra HD）を選択します。' },
        { stepNumber: 3, title: '透過状態の確認', instruction: '市松模様のプレビュー画面で、輪郭が滑らかに透過描画されているか確認します。' },
        { stepNumber: 4, title: 'PNGの保存', instruction: '「Download PNG」をクリックして高画質なラスタライズ画像を保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Charger le fichier SVG', instruction: 'Déposez votre icône ou illustration vectorielle .svg dans l\'outil.' },
        { stepNumber: 2, title: 'Sélectionner l\'échelle', instruction: 'Choisissez 1x, 2x (HD) ou 4x (Ultra HD pour écrans Retina et impression).' },
        { stepNumber: 3, title: 'Vérifier la transparence', instruction: 'Contrôlez sur la grille de transparence la netteté parfaite des tracés.' },
        { stepNumber: 4, title: 'Télécharger le PNG', instruction: 'Cliquez sur Télécharger pour obtenir votre image matricielle nette.' }
      ],
      de: [
        { stepNumber: 1, title: 'SVG-Vektordatei laden', instruction: 'Ziehen Sie Ihre .svg-Illustration oder Ihr Icon in das Werkzeug.' },
        { stepNumber: 2, title: 'Auflösungsskalierung wählen', instruction: 'Wählen Sie 1x, 2x (HD) oder 4x (Ultra-HD für Retina-Displays und Druck).' },
        { stepNumber: 3, title: 'Transparenz prüfen', instruction: 'Überzeugen Sie sich im Schachbrett-Muster von sauberen Kanten.' },
        { stepNumber: 4, title: 'PNG herunterladen', instruction: 'Speichern Sie die gestochen scharfe Rastergrafik mit Klick auf Download.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar arquivo SVG', instruction: 'Insira sua ilustração ou ícone vetorial .svg no sistema.' },
        { stepNumber: 2, title: 'Definir resolução', instruction: 'Escolha entre 1x, 2x (HD) ou 4x (Ultra HD para telas Retina e impressão).' },
        { stepNumber: 3, title: 'Verificar transparência', instruction: 'Observe na prévia xadrez se os contornos mantêm fundo transparente.' },
        { stepNumber: 4, title: 'Baixar PNG', instruction: 'Clique em Download para salvar o arquivo de imagem nítido.' }
      ],
      ko: [
        { stepNumber: 1, title: 'SVG 벡터 파일 업로드', instruction: '.svg 규격의 아이콘 또는 일러스트 파일을 업로드합니다.' },
        { stepNumber: 2, title: '해상도 배율 선택', instruction: '기본 1x, 2x(HD), 4x(레티나 디스플레이 및 인쇄용 Ultra HD) 중 선택합니다.' },
        { stepNumber: 3, title: '투명도 및 곡선 확인', instruction: '격자무늬 배경 위에서 벡터 외곽선이 깨짐 없이 선명한지 확인합니다.' },
        { stepNumber: 4, title: 'PNG 파일 다운로드', instruction: '다운로드 버튼을 클릭하여 투명도가 유지된 고해상도 PNG를 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare il file SVG', instruction: 'Trascina l\'icona o illustrazione vettoriale .svg nell\'area di lavoro.' },
        { stepNumber: 2, title: 'Scegliere la risoluzione', instruction: 'Seleziona 1x, 2x (HD) o 4x (Ultra HD per schermi Retina e stampa).' },
        { stepNumber: 3, title: 'Controllare la trasparenza', instruction: 'Verifica sulla griglia che i tracciati risultino nitidi e trasparenti.' },
        { stepNumber: 4, title: 'Scaricare il PNG', instruction: 'Salva l\'immagine raster PNG ad altissima definizione sul tuo dispositivo.' }
      ]
    },
    example: {
      en: {
        title: 'App Icon Vector Scaling to 4x Retina PNG',
        scenario: 'Rasterizing a 128×128 vector SVG app icon into a 512×512 PNG at 4x scale for app store listing.',
        calculation: 'Input: 128×128 SVG. Multiplier: 4x -> Rendered at 512×512 px on Canvas. Alpha channel preserved.',
        result: 'Output: Sharp 512×512 px PNG with perfectly smooth curves and transparent background in 30ms.'
      },
      hi: {
        title: 'ऐप आइकन 4x रेटिना PNG स्केलिंग उदाहरण',
        scenario: '128×128 के SVG आइकन को ऐप स्टोर के लिए 512×512 PNG में 4x स्केल पर बदलना।',
        calculation: 'इनपुट: 128×128 SVG। 4x मल्टीप्लायर -> 512×512 पिक्सेल पर कैनवास रेंडरिंग।',
        result: 'आउटपुट: बिना किसी पिक्सेलेशन के 512×512 पिक्सेल का साफ पारदर्शी PNG तैयार।'
      },
      es: {
        title: 'Ejemplo de Icono para Tienda de Aplicaciones',
        scenario: 'Rasterizar un icono vectorial de 128×128 a escala 4x para obtener un PNG de 512×512 px.',
        calculation: 'Escala 4x: 128×128 px a 512×512 px renderizado en lienzo con canal alfa intacto.',
        result: 'Resultado: Archivo PNG de 512×512 px con curvas perfectamente definidas en 30 ms.'
      },
      ja: {
        title: 'アプリ用ベクターアイコンの4倍Retina高解像度化実例',
        scenario: '128×128pxのベクターSVGアイコンを、ストア登録用に4倍スケール（512×512px）のPNGへ変換する例。',
        calculation: '入力: 128×128px SVG。スケール: 4x -> Canvas上で512×512pxで再描画。透過チャンネル保持。',
        result: '出力: ジャギー（粗さ）が一切ない極めて鮮明な512×512pxの透過PNGが30msで完成。'
      },
      fr: {
        title: 'Exemple d\'Icône Vectorielle vers PNG 4x Retina',
        scenario: 'Pixellisation d\'une icône SVG de 128×128 px en PNG de 512×512 px à l\'échelle 4x.',
        calculation: 'Facteur 4x : Rendu Canvas à 512×512 px avec conservation intégrale du canal alpha.',
        result: 'Sortie : PNG de 512×512 px aux contours parfaitement lisses obtenu en 30 ms.'
      },
      de: {
        title: 'Beispiel für App-Icon-Skalierung auf 4x Retina',
        scenario: 'Rasterung eines 128×128 SVG-Icons zu einem 512×512 PNG im 4x-Faktor für Stores.',
        calculation: 'Skalierung 4x: 128×128 SVG auf 512×512 Pixel Canvas gerendert.',
        result: 'Ausgabe: Kristallklares 512×512 PNG mit intakter Transparenz in 30 ms.'
      },
      pt: {
        title: 'Exemplo de Ícone Vetorial para PNG 4x Retina',
        scenario: 'Transformar um ícone SVG de 128×128 px em PNG de 512×512 px para publicação.',
        calculation: 'Multiplicador 4x: 128×128 px expandido para 512×512 px no Canvas.',
        result: 'Saída: Arquivo PNG de 512×512 px com curvas suaves e fundo transparente em 30 ms.'
      },
      ko: {
        title: '앱 스토어 등록용 4x 레티나 PNG 변환 실전 예시',
        scenario: '128×128px 벡터 SVG 앱 아이콘을 4배 확대(512×512px)하여 고해상도 투명 PNG로 제작.',
        calculation: '입력: 128×128 SVG, 배율: 4x -> Canvas 512×512px 밀도 래스터화, 알파 투명도 유지.',
        result: '출력: 곡선 깨짐이나 계단 현상 없이 매끄러운 512×512px 투명 PNG가 30ms 만에 생성.'
      },
      it: {
        title: 'Esempio di Icona Vettoriale a 4x Retina in PNG',
        scenario: 'Rasterizzazione di un\'icona SVG da 128×128 a 512×512 px con scala 4x.',
        calculation: 'Fattore 4x: rendering a 512×512 pixel su Canvas mantenendo il canale alfa.',
        result: 'Output: PNG nitido da 512×512 pixel con curve lisce e sfondo trasparente.'
      }
    },
    faqs: {
      en: [
        { question: 'Will rasterizing SVG vector graphics make them blurry?', answer: 'No. Because SVGs are defined mathematically by XML coordinates, you can scale them to 2x, 4x, or higher resolutions before rasterizing, ensuring ultra-crisp output.' },
        { question: 'Is alpha transparency preserved?', answer: 'Yes. Unless your SVG explicitly defines a background rect or fill, transparent areas remain fully transparent in the exported PNG.' },
        { question: 'Are complex SVG gradients and CSS filters supported?', answer: 'Yes. The browser\'s native SVG rendering engine processes standard linear/radial gradients, clip paths, and vector transforms.' },
        { question: 'Does the conversion require an internet connection?', answer: 'No. The conversion executes entirely within your browser memory using the native HTML5 Canvas API.' }
      ],
      hi: [
        { question: 'क्या SVG को PNG में बदलने से फोटो धुंधली हो जाएगी?', answer: 'नहीं। चूंकि SVG गणितीय समीकरणों से बना होता है, आप इसे 2x या 4x तक बड़ा करके बदल सकते हैं जिससे यह बेहद साफ रहता है।' },
        { question: 'क्या पारदर्शी बैकग्राउंड बना रहता है?', answer: 'हाँ। यदि SVG में कोई बैकग्राउंड रंग नहीं दिया गया है तो तैयार PNG में बैकग्राउंड पूरी तरह पारदर्शी रहेगा।' },
        { question: 'क्या ग्रेडिएंट और शैडो इफेक्ट्स समर्थित हैं?', answer: 'हाँ। ब्राउज़र का मूल इंजन लीनियर/रेडियल ग्रेडिएंट और क्लिप पाथ को सही तरीके से दिखाता है।' },
        { question: 'क्या इसके लिए इंटरनेट कनेक्शन की आवश्यकता है?', answer: 'नहीं। पूरी प्रक्रिया सीधे आपके ब्राउज़र में स्थानीय रूप से होती है।' }
      ],
      es: [
        { question: '¿La rasterización hace que el gráfico pierda nitidez?', answer: 'No. Al tratarse de vectores matemáticos, puede elegir una escala de 2x o 4x para obtener una definición perfecta.' },
        { question: '¿Se mantiene la transparencia original?', answer: 'Sí. Los fondos transparentes del archivo SVG se conservan intactos en el PNG exportado.' },
        { question: '¿Soporta degradados y filtros de estilo?', answer: 'Sí. El motor del navegador interpreta correctamente gradientes lineales, radiales y trazados complejos.' },
        { question: '¿Funciona sin conexión a internet?', answer: 'Sí. Toda la conversión se efectúa en la memoria local del navegador.' }
      ],
      ja: [
        { question: 'ベクターをラスタライズすると輪郭がぼやけますか？', answer: 'いいえ。SVGは数式座標で定義されているため、2倍や4倍の高倍率を指定して描画すれば極めてシャープな高解像度PNGが得られます。' },
        { question: '透過背景は維持されますか？', answer: 'はい。SVG内に背景色タグがない限り、透過状態を完全に維持した透過PNGが出力されます。' },
        { question: 'グラデーションやクリッピングパスに対応していますか？', answer: 'はい。ブラウザ標準のSVG描画エンジンが、線形・円形グラデーションやクリップパスを忠実に再現します。' },
        { question: 'オフラインでも動作しますか？', answer: 'はい。ページ読み込み後は、外部通信なしでブラウザ内部のCanvas APIのみで実行されます。' }
      ],
      fr: [
        { question: 'La pixellisation rend-elle le visuel flou ?', answer: 'Non. Les vecteurs étant mathématiques, vous pouvez choisir une échelle 2x ou 4x pour obtenir un rendu d\'une netteté parfaite.' },
        { question: 'La transparence est-elle conservée ?', answer: 'Oui. Les zones transparentes du fichier SVG restent parfaitement transparentes dans le PNG.' },
        { question: 'Les dégradés complexes sont-ils gérés ?', answer: 'Oui. Le moteur du navigateur prend en charge les dégradés linéaires, radiaux et masques vectoriels.' },
        { question: 'L\'outil nécessite-t-il une connexion internet ?', answer: 'Non. Tout s\'exécute localement dans la mémoire de votre navigateur via l\'API Canvas.' }
      ],
      de: [
        { question: 'Wird die Grafik durch das Rastern unscharf?', answer: 'Nein. Da SVGs mathematisch definiert sind, liefert die 2x- oder 4x-Skalierung gestochen scharfe Ergebnisse.' },
        { question: 'Bleibt die Transparenz erhalten?', answer: 'Ja. Transparente Bereiche im SVG bleiben im exportierten PNG vollständig transparent.' },
        { question: 'Funktionieren Farbverläufe und Vektormasken?', answer: 'Ja. Der Browser rendert lineare und radiale Verläufe sowie Schnittmasken präzise.' },
        { question: 'Funktioniert die Umwandlung ohne Internetverbindung?', answer: 'Ja. Die Verarbeitung erfolgt vollständig lokal im Browser-Speicher.' }
      ],
      pt: [
        { question: 'O gráfico perde nitidez ao ser rasterizado?', answer: 'Não. Por ser um formato vetorial matemático, você pode renderizar em escala 2x ou 4x garantindo traços perfeitos.' },
        { question: 'A transparência original é mantida?', answer: 'Sim. Áreas transparentes do SVG permanecem transparentes no PNG exportado.' },
        { question: 'Gradientes e máscaras são suportados?', answer: 'Sim. O navegador renderiza gradientes lineares, radiais e caminhos de corte com perfeição.' },
        { question: 'Funciona sem internet?', answer: 'Sim. O processamento roda exclusivamente no motor Canvas do seu próprio navegador.' }
      ],
      ko: [
        { question: '벡터를 PNG로 래스터화하면 외곽선이 흐려지나요?', answer: '아닙니다. SVG는 수학적 좌표 기반이므로 2배, 4배 등 높은 해상도 배율을 지정하여 렌더링하면 초고화질의 선명한 결과를 얻을 수 있습니다.' },
        { question: '투명 배경이 그대로 유지되나요?', answer: '네. SVG 자체에 배경색이 칠해져 있지 않은 한, 투명 영역이 온전히 보존된 PNG로 저장됩니다.' },
        { question: '그라데이션이나 클리핑 패스 등 복잡한 효과도 렌더링되나요?', answer: '네. 브라우저 네이티브 SVG 렌더링 엔진이 선형/방사형 그라데이션 및 벡터 마스크를 정확히 재현합니다.' },
        { question: '인터넷 연결 없이도 작동하나요?', answer: '네. 모든 변환 과정이 사용자 기기 내부의 Canvas API를 통해 로컬에서 실행됩니다.' }
      ],
      it: [
        { question: 'La rasterizzazione rende l\'immagine sgranata?', answer: 'No. Essendo una grafica vettoriale, impostando la scala a 2x o 4x si ottiene un PNG nitidissimo.' },
        { question: 'La trasparenza originale viene conservata?', answer: 'Sì. Le aree trasparenti del file SVG rimangono trasparenti nel file PNG generato.' },
        { question: 'I gradienti e le maschere vettoriali sono supportati?', answer: 'Sì. Il motore del browser gestisce fedelmente sfumature e tracciati complessi.' },
        { question: 'È richiesta una connessione a internet?', answer: 'No. Tutto il processo avviene nella memoria locale del browser tramite Canvas.' }
      ]
    }
  },

  'black-and-white-image': {
    name: 'Black and White Image',
    formulaTitle: {
      en: 'ITU-R BT.601 Luma Desaturation & Grayscale Matrix Architecture',
      hi: 'ITU-R BT.601 ल्यूमा डिसेचुरेशन और ग्रेस्केल मैट्रिक्स संरचना',
      es: 'Desaturación de Luminancia ITU-R BT.601 y Matriz en Escala de Grises',
      ja: 'ITU-R BT.601規格輝度計算およびグレースケール変換構造',
      fr: 'Désaturation de Luminance ITU-R BT.601 et Matrice Niveaux de Gris',
      de: 'ITU-R BT.601 Luma-Entsättigung & Graustufen-Matrix-Architektur',
      pt: 'Dessaturação de Luminância ITU-R BT.601 e Matriz em Tons de Cinza',
      ko: 'ITU-R BT.601 표준 휘도 연산 및 그레이스케일 변환 구조',
      it: 'Desaturazione di Luminanza ITU-R BT.601 e Matrice in Scala di Grigi'
    },
    formulaDescription: {
      en: 'The converter transforms full-color RGB pixel arrays into monochromatic grayscale by calculating the perceived human photometric luminance (Y = 0.299R + 0.587G + 0.114B) for every pixel in the HTML5 Canvas ImageData buffer, preserving photographic tonal balance with zero server uploads.',
      hi: 'यह टूल फोटो के प्रत्येक पिक्सेल पर मानक ल्यूमिनेंस फॉर्मूला (Y = 0.299R + 0.587G + 0.114B) लागू करके रंगीन फोटो को मोनोक्रोमैटिक ब्लैक एंड व्हाइट में बदलता है। यह बिना सर्वर अपलोड के प्राकृतिक टोनल कंट्रास्ट बनाए रखता है।',
      es: 'El conversor transforma la imagen a escala de grises calculando la luminancia fotométrica percibida (Y = 0,299R + 0,587G + 0,114B) para cada píxel en el lienzo HTML5, manteniendo el equilibrio tonal sin subir archivos.',
      ja: '本ツールは、人間の視覚感度特性に基づく測光標準輝度計算式（Y = 0.299R + 0.587G + 0.114B）を全ピクセルに適用。サーバー通信なしで自然な階調の美しいモノクロ写真へと瞬時に変換します。',
      fr: 'Le convertisseur applique la formule de luminance photométrique (Y = 0,299R + 0,587G + 0,114B) sur chaque pixel du tampon Canvas, assurant un rendu noir et blanc équilibré sans serveur tiers.',
      de: 'Das Werkzeug wandelt RGB-Pixel über die genormte Helligkeitsformel (Y = 0,299R + 0,587G + 0,114B) in Schwarz-Weiß um. Kontraste und Zwischentöne bleiben lokal im Browser ohne Serverkontakt erhalten.',
      pt: 'O conversor aplica o cálculo de luminância fotométrica (Y = 0,299R + 0,587G + 0,114B) em cada pixel no Canvas HTML5, gerando uma imagem preto e branco de tom equilibrado sem tráfego de dados.',
      ko: '본 도구는 인간의 시각 인지 특성을 반영한 국제 표준 휘도 공식(Y = 0.299R + 0.587G + 0.114B)을 HTML5 Canvas 픽셀 버퍼에 적용하여 서버 전송 없이 자연스러운 계조의 흑백 사진으로 즉각 변환합니다.',
      it: 'Il convertitore trasforma i pixel RGB calcolando la luminanza standard (Y = 0,299R + 0,587G + 0,114B) su ogni pixel nel Canvas, offrendo una resa monocromatica bilanciata in locale.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Image', instruction: 'Drag and drop your color JPG, PNG, or WebP photo into the editor.' },
        { stepNumber: 2, title: 'Adjust Contrast / Threshold', instruction: 'Fine-tune contrast and exposure sliders to achieve classic silver-halide or high-contrast noir aesthetics.' },
        { stepNumber: 3, title: 'Inspect Monochrome Preview', instruction: 'Verify shadow details and highlights in the instant live preview canvas.' },
        { stepNumber: 4, title: 'Download B&W Photo', instruction: 'Click Download to save your high-resolution black and white photo immediately.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो अपलोड करें', instruction: 'अपनी रंगीन JPG, PNG या WebP फोटो को एडिटर में खींचें या चुनें।' },
        { stepNumber: 2, title: 'कंट्रास्ट व ब्राइटनेस सेट करें', instruction: 'क्लासिक या डार्क नोयर लुक के लिए कंट्रास्ट स्लाइडर को समायोजित करें।' },
        { stepNumber: 3, title: 'मोनोक्रोम प्रीव्यू देखें', instruction: 'लाइव प्रीव्यू में फोटो के शेड्स और हाइलाइट्स की जांच करें।' },
        { stepNumber: 4, title: 'ब्लैक एंड व्हाइट फोटो डाउनलोड करें', instruction: 'डाउनलोड बटन दबाकर अपनी नई फोटो तुरंत सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar fotografía', instruction: 'Arrastre su foto en color JPG, PNG o WebP al editor.' },
        { stepNumber: 2, title: 'Ajustar contraste', instruction: 'Modifique los controles de contraste y brillo para lograr el estilo en blanco y negro deseado.' },
        { stepNumber: 3, title: 'Revisar vista previa', instruction: 'Inspeccione las sombras y luces en el lienzo en tiempo real.' },
        { stepNumber: 4, title: 'Descargar imagen', instruction: 'Haga clic en Descargar para guardar su foto monocromática en alta resolución.' }
      ],
      ja: [
        { stepNumber: 1, title: 'カラー画像の選択', instruction: 'カラーのJPG、PNG、WebPファイルを画面に読み込みます。' },
        { stepNumber: 2, title: 'コントラストの微調整', instruction: 'クラシックなモノクロ調やドラマチックなハイコントラスト調など好みのトーンに調整します。' },
        { stepNumber: 3, title: 'モノクロプレビューの確認', instruction: '明暗のグラデーションや影のディテールが綺麗に出ているか確認します。' },
        { stepNumber: 4, title: '白黒画像の保存', instruction: 'ダウンロードボタンをクリックして高解像度モノクロ写真を保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer l\'image', instruction: 'Glissez votre photo couleur JPG, PNG ou WebP dans l\'éditeur.' },
        { stepNumber: 2, title: 'Régler le contraste', instruction: 'Ajustez les curseurs pour obtenir un rendu classique ou très contrasté.' },
        { stepNumber: 3, title: 'Vérifier le rendu', instruction: 'Examinez les ombres et hautes lumières dans l\'aperçu instantané.' },
        { stepNumber: 4, title: 'Télécharger la photo', instruction: 'Cliquez sur Télécharger pour sauvegarder votre cliché en noir et blanc.' }
      ],
      de: [
        { stepNumber: 1, title: 'Farbbild laden', instruction: 'Ziehen Sie Ihre JPG-, PNG- oder WebP-Aufnahme in das Tool.' },
        { stepNumber: 2, title: 'Kontrast anpassen', instruction: 'Passen Sie Kontrast und Belichtung für den gewünschten Schwarz-Weiß-Look an.' },
        { stepNumber: 3, title: 'Monochrom-Vorschau prüfen', instruction: 'Beurteilen Sie Lichter und Schatten im Live-Vorschaubild.' },
        { stepNumber: 4, title: 'Schwarz-Weiß-Bild speichern', instruction: 'Klicken Sie auf Download, um die Aufnahme hochauflösend zu sichern.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar foto colorida', instruction: 'Insira sua foto JPG, PNG ou WebP na área de trabalho.' },
        { stepNumber: 2, title: 'Ajustar contraste e luz', instruction: 'Mova os seletores para atingir o visual preto e branco desejado.' },
        { stepNumber: 3, title: 'Conferir prévia', instruction: 'Analise os tons de cinza e a nitidez dos detalhes na tela.' },
        { stepNumber: 4, title: 'Baixar foto P&B', instruction: 'Clique em Download para salvar a imagem monocromática final.' }
      ],
      ko: [
        { stepNumber: 1, title: '컬러 사진 업로드', instruction: 'JPG, PNG, WebP 형식의 컬러 사진을 화면에 불러옵니다.' },
        { stepNumber: 2, title: '대비 및 밝기 조절', instruction: '클래식한 은염 사진 느낌이나 고대비 흑백 톤으로 슬라이더를 미세 조절합니다.' },
        { stepNumber: 3, title: '흑백 미리보기 확인', instruction: '암부와 명부의 음영 디테일이 자연스럽게 표현되었는지 확인합니다.' },
        { stepNumber: 4, title: '흑백 이미지 다운로드', instruction: '다운로드 버튼을 클릭하여 완성된 고해상도 흑백 사진을 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare l\'immagine a colori', instruction: 'Trascina la foto JPG, PNG o WebP nell\'editor.' },
        { stepNumber: 2, title: 'Regolare il contrasto', instruction: 'Modifica i cursori per calibrare luci e ombre in bianco e nero.' },
        { stepNumber: 3, title: 'Ispezionare l\'anteprima', instruction: 'Verifica la resa delle sfumature monocromatiche a video.' },
        { stepNumber: 4, title: 'Scaricare la foto B/N', instruction: 'Fai clic su Scarica per salvare l\'immagine sul tuo dispositivo.' }
      ]
    },
    example: {
      en: {
        title: 'Architectural Portrait Desaturation Example',
        scenario: 'Converting an urban street portrait with distracting neon backgrounds into a timeless black and white composition.',
        calculation: 'Input pixel (R: 220, G: 80, B: 40). Y = (0.299×220) + (0.587×80) + (0.114×40) = 65.78 + 46.96 + 4.56 = 117.3 -> Output pixel (117, 117, 117).',
        result: 'Natural tonal gradation with uniform luminosity across skin tones and architectural textures in 25ms.'
      },
      hi: {
        title: 'शहरी पोर्ट्रेट फोटो को ब्लैक एंड व्हाइट बनाना',
        scenario: 'उलझन भरे रंगीन बैकग्राउंड वाले स्ट्रीट पोर्ट्रेट को क्लासिक ब्लैक एंड व्हाइट में बदलना।',
        calculation: 'इनपुट पिक्सेल (R: 220, G: 80, B: 40)। Y = 0.299×220 + 0.587×80 + 0.114×40 = 117.3 -> ग्रेस्केल (117, 117, 117)।',
        result: 'चेहरे और बैकग्राउंड के बीच संतुलित कंट्रास्ट के साथ सुंदर मोनोक्रोम फोटो तैयार।'
      },
      es: {
        title: 'Ejemplo de Retrato Urbano en Blanco y Negro',
        scenario: 'Convertir un retrato callejero con colores distractores en una fotografía artística atemporal.',
        calculation: 'Píxel: (R: 220, G: 80, B: 40). Luminancia = 117,3 -> Salida monocroma (117, 117, 117).',
        result: 'Gradación tonal armónica y texturas nítidas procesadas en 25 ms.'
      },
      ja: {
        title: '人物ポートレート写真のモノクロ変換実例',
        scenario: '背景のネオンサインの色被りを抑え、人物を引き立たせるクラシックな白黒写真へ変換する例。',
        calculation: '画素 (R: 220, G: 80, B: 40) に対し Y = (0.299×220) + (0.587×80) + (0.114×40) = 117.3 -> (117, 117, 117) を代入。',
        result: '肌のトーンや建造物の陰影が極めて自然に階調表現されたモノクロ写真が25msで出力。'
      },
      fr: {
        title: 'Exemple de Portrait Urbain en Noir et Blanc',
        scenario: 'Transformation d\'une photo de rue colorée en composition artistique noir et blanc.',
        calculation: 'Pixel (R: 220, G: 80, B: 40) -> Y = 117,3 -> Pixel de sortie (117, 117, 117).',
        result: 'Équilibre des tons parfaits et textures bien définies obtenus en 25 ms.'
      },
      de: {
        title: 'Beispiel für Porträt-Entsättigung',
        scenario: 'Umwandlung eines Straßenporträts mit unruhigem Farbhintergrund in ein zeitloses Schwarz-Weiß-Motiv.',
        calculation: 'Pixel (R: 220, G: 80, B: 40) -> Y = 117,3 -> Grauwert (117, 117, 117).',
        result: 'Gleichmäßige Helligkeitsverläufe und saubere Tonwerte in 25 ms generiert.'
      },
      pt: {
        title: 'Exemplo de Retrato Artístico em Preto e Branco',
        scenario: 'Conversão de um retrato urbano com cores excessivas em fotografia clássica atemporal.',
        calculation: 'Pixel (R: 220, G: 80, B: 40) -> Luminância Y = 117,3 -> Saída (117, 117, 117).',
        result: 'Excelente profundidade de sombras e realces gerada em 25 ms.'
      },
      ko: {
        title: '인물 스냅 사진 흑백 변환 실전 예시',
        scenario: '산만한 배경 색상이 포함된 인물 스냅 사진을 깊이감 있는 흑백 감성 사진으로 변환.',
        calculation: '입력 픽셀 (R: 220, G: 80, B: 40) -> 휘도 공식 Y = 117.3 적용 -> 그레이스케일 (117, 117, 117).',
        result: '인물의 피부 톤과 배경 그림자가 자연스럽게 어우러진 흑백 사진이 25ms 만에 완성.'
      },
      it: {
        title: 'Esempio di Ritratto Urbano in Bianco e Nero',
        scenario: 'Conversione di un ritratto con sfondo colorato in una foto artistica senza tempo.',
        calculation: 'Pixel (R: 220, G: 80, B: 40) -> Y = 117,3 -> Valore grigio (117, 117, 117).',
        result: 'Gradazione tonale armonica e dettagli nitidi generati in 25 ms.'
      }
    },
    faqs: {
      en: [
        { question: 'Why does human perceived luminance (BT.601) look better than simple averaging (R+G+B)/3?', answer: 'Human eyes have peak sensitivity to green wavelengths and low sensitivity to blue. Weighting green at 58.7%, red at 29.9%, and blue at 11.4% mirrors real human vision, preventing blue skies from appearing unnaturally dark or foliage from becoming mud.' },
        { question: 'Are original color photos permanently modified?', answer: 'No. All processing operates on an in-memory duplicate canvas buffer. Your original photo remains untouched.' },
        { question: 'Can I re-export as PNG to keep transparency?', answer: 'Yes. The converter supports exporting in both JPG and transparent PNG formats.' },
        { question: 'Is my photograph uploaded to any cloud server?', answer: 'No. The pixel luminance calculation runs 100% inside your browser memory.' }
      ],
      hi: [
        { question: 'साधारण औसत (R+G+B)/3 की तुलना में BT.601 फॉर्मूला बेहतर क्यों दिखता है?', answer: 'मानव आँखें हरे रंग के प्रति सबसे संवेदनशील और नीले रंग के प्रति कम संवेदनशील होती हैं। 58.7% हरा, 29.9% लाल और 11.4% नीला अनुपात प्राकृतिक दृश्य प्रभाव देता है।' },
        { question: 'क्या मेरी मूल रंगीन फोटो पर कोई स्थायी प्रभाव पड़ता है?', answer: 'नहीं। सभी बदलाव केवल ब्राउज़र मेमोरी में होते हैं। आपकी मूल फोटो पूरी तरह सुरक्षित रहती है।' },
        { question: 'क्या पारदर्शी PNG फोटो को भी ब्लैक एंड व्हाइट में बदल सकते हैं?', answer: 'हाँ। टूल पारदर्शी PNG और JPG दोनों फॉर्मेट में सेव करने की सुविधा देता है।' },
        { question: 'क्या मेरी फोटो किसी क्लाउड सर्वर पर भेजी जाती है?', answer: 'नहीं। संपूर्ण गणना आपके अपने ब्राउज़र में स्थानीय रूप से होती है।' }
      ],
      es: [
        { question: '¿Por qué la fórmula BT.601 es superior a promediar (R+G+B)/3?', answer: 'El ojo humano es más sensible a las longitudes de onda del verde y menos al azul. Ponderar el verde en 58,7%, el rojo en 29,9% y el azul en 11,4% genera tonos mucho más naturales.' },
        { question: '¿Se modifica la foto original?', answer: 'No. Se trabaja sobre una copia en memoria sin alterar el archivo original de su equipo.' },
        { question: '¿Conserva la transparencia en archivos PNG?', answer: 'Sí. Puede exportar en formato PNG manteniendo intactas las zonas transparentes.' },
        { question: '¿Se envía la imagen a servidores?', answer: 'No. La transformación se realiza en el navegador con total privacidad.' }
      ],
      ja: [
        { question: '単純平均(R+G+B)/3よりもBT.601規格が優れている理由は何ですか？', answer: '人間の視覚は緑色光に最も敏感で青色光には鈍感です。緑に58.7%、赤に29.9%、青に11.4%の重み付けを行うことで、人間の目で見た通りの自然な明暗差を再現できます。' },
        { question: '元のカラー写真は上書きされますか？', answer: 'いいえ。ブラウザのメモリ内でのみコピー処理されるため、端末内の元画像には一切影響ありません。' },
        { question: '透過PNGの透明度を維持したままモノクロ化できますか？', answer: 'はい。PNG形式で保存すれば、背景の透明度を保ったまま白黒に変換できます。' },
        { question: '写真データはサーバーに送信されますか？', answer: 'いいえ。すべてお使いのパソコンやスマートフォンのメモリ内で完結します。' }
      ],
      fr: [
        { question: 'Pourquoi la formule BT.601 est-elle meilleure que la moyenne simple ?', answer: 'L\'œil humain est bien plus sensible au vert qu\'au bleu. La pondération (58,7% vert, 29,9% rouge, 11,4% bleu) reproduit fidèlement la perception naturelle.' },
        { question: 'La photo originale est-elle altérée ?', answer: 'Non. Le traitement s\'opère sur un duplicata temporaire en mémoire sans toucher à votre fichier.' },
        { question: 'La transparence PNG est-elle préservée ?', answer: 'Oui. Vous pouvez exporter l\'image en PNG pour conserver l\'arrière-plan transparent.' },
        { question: 'Mes images sont-elles envoyées sur internet ?', answer: 'Non. L\'ensemble du calcul s\'effectue à 100 % localement dans votre navigateur.' }
      ],
      de: [
        { question: 'Warum ist die BT.601-Formel besser als der Durchschnitt (R+G+B)/3?', answer: 'Das menschliche Auge reagiert sensibler auf Grün als auf Blau. Die Gewichtung (58,7 % Grün, 29,9 % Rot, 11,4 % Blau) liefert natürliche Grauabstufungen.' },
        { question: 'Wird das Originalbild verändert?', answer: 'Nein. Alle Operationen erfolgen auf einer Arbeitskopie im flüchtigen Browser-Speicher.' },
        { question: 'Bleibt PNG-Transparenz erhalten?', answer: 'Ja. Bei PNG-Export bleibt der Alphakanal voll erhalten.' },
        { question: 'Erfolgt ein Server-Upload?', answer: 'Nein. Die Umrechnung der Pixelwerte läuft vollständig im lokalen Browser ab.' }
      ],
      pt: [
        { question: 'Por que o padrão BT.601 é melhor que a média simples?', answer: 'A visão humana capta melhor o verde do que o azul. A proporção ponderada de 58,7% verde, 29,9% vermelho e 11,4% azul recria o brilho fotográfico real.' },
        { question: 'A foto original é alterada?', answer: 'Não. O processamento ocorre em uma cópia na memória, preservando seu arquivo original.' },
        { question: 'É possível salvar mantendo fundo transparente?', answer: 'Sim. Exportando em PNG, as áreas transparentes continuam preservadas.' },
        { question: 'As imagens são salvas em servidores?', answer: 'Não. Todo o cálculo é processado no próprio navegador.' }
      ],
      ko: [
        { question: '단순 산술평균보다 BT.601 휘도 공식이 뛰어난 이유는 무엇인가요?', answer: '인간의 망막은 녹색 파장에 가장 민감하고 청색에는 둔감합니다. 녹색 58.7%, 적색 29.9%, 청색 11.4%로 가중치를 부여해야 푸른 하늘이나 녹색 잎이 자연스러운 명암으로 표현됩니다.' },
        { question: '원본 사진 파일이 변경되나요?', answer: '아닙니다. 브라우저 임시 메모리의 복사본에서만 작업이 이루어지므로 원본은 안전합니다.' },
        { question: '투명 배경의 PNG도 흑백으로 변환할 수 있나요?', answer: '네. PNG 포맷으로 저장하면 투명도를 그대로 유지한 채 흑백으로 출력됩니다.' },
        { question: '사진이 서버로 전송되나요?', answer: '아닙니다. 모든 픽셀 휘도 연산은 사용자 브라우저 로컬에서만 100% 실행됩니다.' }
      ],
      it: [
        { question: 'Perché la formula BT.601 è migliore della media semplice?', answer: 'L\'occhio umano è più reattivo al verde che al blu. La formula ponderata (58,7% verde, 29,9% rosso, 11,4% blu) rispecchia la percezione reale.' },
        { question: 'La foto originale viene modificata?', answer: 'No. La modifica avviene su una copia provvisoria nella memoria del browser.' },
        { question: 'Posso mantenere la trasparenza?', answer: 'Sì. Salvando in formato PNG le zone trasparenti rimangono tali.' },
        { question: 'I file vengono caricati su server esterni?', answer: 'No. Il calcolo avviene al 100% all\'interno del tuo browser.' }
      ]
    }
  },

  'invert-image-colors': {
    name: 'Invert Image Colors',
    formulaTitle: {
      en: 'Bitwise 8-Bit RGB Color Complement Inversion Architecture',
      hi: 'बिटवाइज़ 8-बिट RGB रंग पूरक प्रतिलोमन संरचना',
      es: 'Inversión de Complemento de Color RGB de 8 Bits por Píxel',
      ja: '8ビットRGB補色ビット反転およびネガ調処理構造',
      fr: 'Inversion de Complément de Couleur RVB 8 Bits par Pixel',
      de: 'Bitweise 8-Bit-RGB-Farbinversion & Negativ-Architektur',
      pt: 'Inversão de Cores Complementares RGB de 8 Bits por Pixel',
      ko: '8비트 RGB 보색 비트 반전 및 네거티브 필름 변환 구조',
      it: 'Inversione dei Colori Complementari RGB a 8 Bit per Pixel'
    },
    formulaDescription: {
      en: 'The color inverter calculates the complementary chromatic negative of every pixel by applying bitwise inversion (R\' = 255 - R, G\' = 255 - G, B\' = 255 - B) directly across the 32-bit Uint8ClampedArray pixel buffer while keeping the alpha transparency channel (A\' = A) intact with zero server interaction.',
      hi: 'यह टूल फोटो के प्रत्येक पिक्सेल पर पूरक रंग सूत्र (R\' = 255 - R, G\' = 255 - G, B\' = 255 - B) लागू करता है। यह पारदर्शिता (A) को बनाए रखते हुए तुरंत नेगेटिव प्रभाव तैयार करता है।',
      es: 'El inversor calcula el negativo cromático aplicando la fórmula (R\' = 255 - R, G\' = 255 - G, B\' = 255 - B) sobre el búfer Uint8ClampedArray en el lienzo, preservando el canal alfa sin comunicarse con servidores.',
      ja: '本ツールは、HTML5 CanvasのUint8ClampedArray配列に対し、補色反転演算（R\' = 255 - R、G\' = 255 - G、B\' = 255 - B）を全ピクセルに直接適用。透明度（A）を維持したまま、ネガフィルム効果を瞬時に生成します。',
      fr: 'L\'inverseur calcule le négatif de chaque pixel selon la formule (R\' = 255 - R, G\' = 255 - G, B\' = 255 - B) sur le tampon Canvas tout en préservant le canal alpha sans transmission réseau.',
      de: 'Der Farbinvertierer berechnet das fotografische Negativ über die Formel (R\' = 255 - R, G\' = 255 - G, B\' = 255 - B) im Uint8ClampedArray-Puffer unter Erhalt des Alphakanals lokal im Browser.',
      pt: 'O inversor calcula o negativo cromático de cada pixel pela fórmula (R\' = 255 - R, G\' = 255 - G, B\' = 255 - B) no Canvas HTML5, mantendo o canal de transparência sem contato com servidores.',
      ko: '본 도구는 HTML5 Canvas의 32비트 Uint8ClampedArray 버퍼에서 보색 반전 공식(R\' = 255 - R, G\' = 255 - G, B\' = 255 - B)을 연산하여 투명도(A)를 손상시키지 않고 네거티브 필름 효과를 로컬에서 즉시 완성합니다.',
      it: 'L\'invertitore calcola il negativo cromatico applicando la formula (R\' = 255 - R, G\' = 255 - G, B\' = 255 - B) sui pixel del Canvas, conservando la trasparenza senza inviare dati a server esterni.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Image', instruction: 'Upload or drop your photo, illustration, or graphic into the inversion tool.' },
        { stepNumber: 2, title: 'Inspect Inversion Effect', instruction: 'Observe the instant negative transformation in the live comparison viewport.' },
        { stepNumber: 3, title: 'Toggle Channels if Needed', instruction: 'Verify that color contrasts and transparency masks render accurately.' },
        { stepNumber: 4, title: 'Download Inverted Image', instruction: 'Click Download to save the inverted graphic in full resolution.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो अपलोड करें', instruction: 'अपनी फोटो, लोगो या ग्राफिक को टूल में अपलोड करें।' },
        { stepNumber: 2, title: 'नेगेटिव प्रभाव देखें', instruction: 'लाइव व्यूपोर्ट में तुरंत उलटे हुए रंगों का प्रभाव देखें।' },
        { stepNumber: 3, title: 'चैनल और पारदर्शिता जांचें', instruction: 'जांचें कि विपरीत रंग और बैकग्राउंड सही दिख रहे हैं।' },
        { stepNumber: 4, title: 'डाउनलोड करें', instruction: 'डाउनलोड बटन दबाकर अपनी उलटी की गई फोटो सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar imagen', instruction: 'Suba o arrastre su foto, logotipo o ilustración al conversor.' },
        { stepNumber: 2, title: 'Observar efecto negativo', instruction: 'Compruebe la inversión instantánea de colores en el visor.' },
        { stepNumber: 3, title: 'Comprobar transparencia', instruction: 'Verifique que las máscaras transparentes se mantengan intactas.' },
        { stepNumber: 4, title: 'Descargar imagen', instruction: 'Pulse Descargar para guardar su archivo invertido.' }
      ],
      ja: [
        { stepNumber: 1, title: '画像の選択', instruction: '写真、ロゴ、グラフィックファイルを画面に読み込みます。' },
        { stepNumber: 2, title: 'ネガ反転効果の確認', instruction: 'プレビュー画面で瞬時に計算された補色ネガ表示を確認します。' },
        { stepNumber: 3, title: '透過状態の点検', instruction: 'アイコン等の透過マスクが正常に保持されているか確認します。' },
        { stepNumber: 4, title: '反転画像の保存', instruction: 'ダウンロードボタンをクリックして保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer l\'image', instruction: 'Déposez votre photo ou logo dans l\'outil.' },
        { stepNumber: 2, title: 'Observer l\'inversion', instruction: 'Visualisez l\'effet négatif immédiat sur l\'aperçu.' },
        { stepNumber: 3, title: 'Contrôler la transparence', instruction: 'Vérifiez la bonne préservation du canal alpha.' },
        { stepNumber: 4, title: 'Télécharger le résultat', instruction: 'Cliquez sur Télécharger pour enregistrer l\'image inversée.' }
      ],
      de: [
        { stepNumber: 1, title: 'Bild einfügen', instruction: 'Laden Sie Ihre Grafik oder Ihr Foto in den Invertierer.' },
        { stepNumber: 2, title: 'Negativ-Effekt prüfen', instruction: 'Sehen Sie die umgekehrten Farben direkt im Vorschaufenster.' },
        { stepNumber: 3, title: 'Kanäle kontrollieren', instruction: 'Überprüfen Sie, ob transparente Zonen erhalten geblieben sind.' },
        { stepNumber: 4, title: 'Invertiertes Bild laden', instruction: 'Speichern Sie das Ergebnis in voller Auflösung ab.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar imagem', instruction: 'Arraste sua foto ou logotipo para a janela de inversão.' },
        { stepNumber: 2, title: 'Avaliar efeito negativo', instruction: 'Observe a transformação instantânea das cores na tela.' },
        { stepNumber: 3, title: 'Verificar transparência', instruction: 'Certifique-se de que as áreas transparentes continuam preservadas.' },
        { stepNumber: 4, title: 'Baixar arquivo', instruction: 'Clique em Download para salvar a imagem invertida.' }
      ],
      ko: [
        { stepNumber: 1, title: '이미지 업로드', instruction: '사진, 일러스트, 그래픽 파일을 도구 창에 등록합니다.' },
        { stepNumber: 2, title: '네거티브 반전 효과 확인', instruction: '실시간 프리뷰 화면에서 즉시 변환된 보색 반전 결과를 확인합니다.' },
        { stepNumber: 3, title: '투명 채널 점검', instruction: '로고 등의 투명 마스크 영역이 손상 없이 보존되었는지 검토합니다.' },
        { stepNumber: 4, title: '반전 이미지 다운로드', instruction: '다운로드 버튼을 클릭하여 고해상도 반전 이미지를 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare l\'immagine', instruction: 'Inserisci foto, grafiche o loghi nell\'interfaccia.' },
        { stepNumber: 2, title: 'Osservare l\'effetto negativo', instruction: 'Controlla l\'inversione cromatica immediata a video.' },
        { stepNumber: 3, title: 'Verificare la trasparenza', instruction: 'Accertati che il canale alfa sia rimasto inalterato.' },
        { stepNumber: 4, title: 'Scaricare l\'immagine', instruction: 'Fai clic su Scarica per salvare il file a colori invertiti.' }
      ]
    },
    example: {
      en: {
        title: 'Dark Mode Inversion for Scientific Diagram',
        scenario: 'Inverting a black-on-white schematic diagram to a dark-mode friendly white-on-black graphic.',
        calculation: 'Input pixel: Black (0, 0, 0) -> R\' = 255 - 0 = 255, G\' = 255, B\' = 255 (White). White background (255, 255, 255) -> Black (0, 0, 0).',
        result: 'Pristine dark-mode graphic with inverted text and diagram lines processed in 18ms.'
      },
      hi: {
        title: 'डार्क मोड के लिए डायग्राम का रंग उलटना',
        scenario: 'सफेद बैकग्राउंड वाले ब्लैक डायग्राम को डार्क मोड में आसानी से देखने योग्य बनाना।',
        calculation: 'काला पिक्सेल (0, 0, 0) -> 255 - 0 = 255 (सफेद)। सफेद बैकग्राउंड -> काला (0, 0, 0)।',
        result: 'डार्क मोड के अनुकूल स्पष्ट डायग्राम 18ms में तैयार।'
      },
      es: {
        title: 'Ejemplo de Inversión para Modo Oscuro',
        scenario: 'Invertir un esquema con líneas negras sobre fondo blanco para integrarlo en una interfaz oscura.',
        calculation: 'Negro (0, 0, 0) pasa a blanco (255, 255, 255) y fondo blanco a negro (0, 0, 0).',
        result: 'Gráfico adaptado al modo oscuro con líneas perfectamente legibles en 18 ms.'
      },
      ja: {
        title: 'ダークモード用回路図の白黒反転実例',
        scenario: '白地に黒線で描かれた回路図を、ダークモード画面に適した黒地に白線の画像へ反転する例。',
        calculation: '黒画素 (0, 0, 0) -> (255, 255, 255) 白へ変換。白背景 (255, 255, 255) -> (0, 0, 0) 黒へ変換。',
        result: '文字や配線ラインがシャープに保たれたダークモード対応図面が18msで完成。'
      },
      fr: {
        title: 'Exemple d\'Inversion pour Mode Sombre',
        scenario: 'Inversion d\'un schéma noir sur fond blanc en graphique blanc sur fond noir.',
        calculation: 'Noir (0, 0, 0) -> Blanc (255, 255, 255). Fond blanc (255, 255, 255) -> Noir (0, 0, 0).',
        result: 'Schéma parfaitement lisible adapté aux thèmes sombres obtenu en 18 ms.'
      },
      de: {
        title: 'Beispiel für Dark-Mode-Diagrammanpassung',
        scenario: 'Invertierung eines schwarz-weißen Schaltplans für dunkle Benutzeroberflächen.',
        calculation: 'Schwarz (0, 0, 0) wird zu Weiß (255, 255, 255). Weißer Hintergrund wird schwarz (0, 0, 0).',
        result: 'Optimal lesbare Grafik für den Dark Mode in 18 ms erzeugt.'
      },
      pt: {
        title: 'Exemplo de Inversão para Tema Escuro',
        scenario: 'Inversão de um diagrama técnico de fundo branco para uso em apresentações com fundo escuro.',
        calculation: 'Preto (0, 0, 0) -> Branco (255, 255, 255). Branco (255, 255, 255) -> Preto (0, 0, 0).',
        result: 'Esquema gráfico com traços nítidos pronto para o modo escuro em 18 ms.'
      },
      ko: {
        title: '다크 모드 배색 적용을 위한 회로도 반전 실전 예시',
        scenario: '흰색 배경에 검은 선으로 작성된 기술 도면을 다크 모드용 검은 배경-흰 선 그래픽으로 반전.',
        calculation: '검은색 픽셀 (0, 0, 0) -> 255 - 0 = 흰색 (255, 255, 255), 흰색 배경 -> 검은색 (0, 0, 0).',
        result: '도면의 선명한 외곽선과 기호가 그대로 유지된 다크 모드 도면이 18ms 만에 생성.'
      },
      it: {
        title: 'Esempio di Inversione per Modalità Scura',
        scenario: 'Inversione di uno schema tecnico con linee nere su fondo bianco per interfacce scure.',
        calculation: 'Nero (0, 0, 0) -> Bianco (255, 255, 255). Bianco -> Nero (0, 0, 0).',
        result: 'Grafica ad alto contrasto adatta al dark mode elaborata in 18 ms.'
      }
    },
    faqs: {
      en: [
        { question: 'Does inverting an image twice restore the original exactly?', answer: 'Yes. Inversion is a mathematically symmetrical operation: 255 - (255 - X) = X. Re-inverting produces the exact original pixel values.' },
        { question: 'What happens to the transparent background of a PNG?', answer: 'The alpha transparency channel is left untouched (A\' = A), meaning transparent sections remain fully transparent.' },
        { question: 'Is my picture uploaded to external servers?', answer: 'No. The bitwise pixel calculations run entirely inside your browser\'s local Canvas memory.' },
        { question: 'What file formats can be inverted and exported?', answer: 'You can upload JPG, PNG, or WebP files and export the result in JPG or lossless PNG.' }
      ],
      hi: [
        { question: 'क्या दो बार फोटो उलटने पर मूल फोटो वापस मिल जाती है?', answer: 'हाँ। यह गणितीय रूप से सममित प्रक्रिया है: 255 - (255 - X) = X। दोबारा उलटने से बिल्कुल मूल फोटो प्राप्त होती है।' },
        { question: 'PNG फोटो के पारदर्शी बैकग्राउंड का क्या होता है?', answer: 'पारदर्शिता चैनल (Alpha) को बदला नहीं जाता, जिससे पारदर्शी हिस्से पारदर्शी ही रहते हैं।' },
        { question: 'क्या फोटो किसी सर्वर पर अपलोड होती है?', answer: 'नहीं। सभी पिक्सेल गणनाएं पूरी तरह से आपके ब्राउज़र की मेमोरी में होती हैं।' },
        { question: 'किन-किन फॉर्मेट को सपोर्ट किया जाता है?', answer: 'JPG, PNG और WebP फॉर्मेट को इनवर्ट और डाउनलोड किया जा सकता है।' }
      ],
      es: [
        { question: '¿Invertir dos veces devuelve la imagen original?', answer: 'Sí. Es una operación simétrica: 255 - (255 - X) = X. Al reinvertir se obtienen exactamente los valores iniciales.' },
        { question: '¿Qué ocurre con la transparencia en archivos PNG?', answer: 'El canal alfa no se altera, por lo que las zonas transparentes permanecen intactas.' },
        { question: '¿La imagen se sube a servidores?', answer: 'No. El cálculo se ejecuta 100% en la memoria de su navegador.' },
        { question: '¿Qué formatos admite?', answer: 'Admite JPG, PNG y WebP tanto para cargar como para exportar.' }
      ],
      ja: [
        { question: '画像を2回反転すると元の画像に完全に戻りますか？', answer: 'はい。計算式 255 - (255 - X) = X により、再反転することで元のピクセル値と100%完全に一致します。' },
        { question: '透過PNGの透明部分は反転されますか？', answer: 'いいえ。アルファチャンネル（透過度）は変更されないため、背景の透過状態はそのまま保持されます。' },
        { question: '画像は外部サーバーに送信されますか？', answer: 'いいえ。ブラウザのCanvasメモリ内で即座に計算され、外部送信はありません。' },
        { question: '対応している画像形式は何ですか？', answer: 'JPG、PNG、WebP形式の読み込みおよびダウンロードに対応しています。' }
      ],
      fr: [
        { question: 'Inverser deux fois restaure-t-il l\'image d\'origine ?', answer: 'Oui. L\'opération est symétrique : 255 - (255 - X) = X. Une seconde inversion redonne le fichier d\'origine.' },
        { question: 'Qu\'advient-il de la transparence PNG ?', answer: 'Le canal alpha n\'est pas modifié, la transparence reste donc parfaitement préservée.' },
        { question: 'Mon image est-elle envoyée sur un serveur ?', answer: 'Non. Le calcul s\'exécute entièrement dans la mémoire locale de votre navigateur.' },
        { question: 'Quels formats sont pris en charge ?', answer: 'Les formats JPG, PNG et WebP sont entièrement gérés.' }
      ],
      de: [
        { question: 'Stellt zweifaches Invertieren das Original wieder her?', answer: 'Ja. Durch die Symmetrie 255 - (255 - X) = X entspricht das Ergebnis exakt den Originalwerten.' },
        { question: 'Was geschieht mit transparenten Bereichen?', answer: 'Der Alphakanal bleibt unverändert, sodass transparente Flächen erhalten bleiben.' },
        { question: 'Werden Bilddaten übertragen?', answer: 'Nein. Die Verarbeitung erfolgt vollständig lokal in der Canvas-Engine Ihres Browsers.' },
        { question: 'Welche Formate können exportiert werden?', answer: 'Das Werkzeug unterstützt JPG, PNG und WebP.' }
      ],
      pt: [
        { question: 'Inverter a imagem duas vezes recupera a original?', answer: 'Sim. A operação é simétrica: 255 - (255 - X) = X. Ao inverter novamente, os pixels voltam ao valor original.' },
        { question: 'O que acontece com a transparência do PNG?', answer: 'O canal alfa não é alterado, mantendo a transparência intacta.' },
        { question: 'A imagem é transferida pela internet?', answer: 'Não. Todo o cálculo ocorre localmente no navegador.' },
        { question: 'Quais formatos são aceitos?', answer: 'Suporta importação e exportação em JPG, PNG e WebP.' }
      ],
      ko: [
        { question: '반전 작업을 두 번 반복하면 원본과 완전히 똑같아지나요?', answer: '네. 255 - (255 - X) = X라는 대칭적 연산 공식에 따라 재반전 시 원본 픽셀 값으로 100% 정확하게 복원됩니다.' },
        { question: 'PNG의 투명 배경은 어떻게 처리되나요?', answer: '투명도를 담당하는 알파 채널(A)은 연산에서 제외되므로 투명 영역은 그대로 유지됩니다.' },
        { question: '사진이 서버로 전송되나요?', answer: '아닙니다. 브라우저의 Canvas 메모리 내에서 로컬로 비트 연산이 실행됩니다.' },
        { question: '지원되는 파일 형식은 무엇인가요?', answer: 'JPG, PNG, WebP 형식을 불러와 반전한 후 저장할 수 있습니다.' }
      ],
      it: [
        { question: 'Invertendo l\'immagine due volte si ripristina l\'originale?', answer: 'Sì. Grazie alla simmetria matematica 255 - (255 - X) = X, una seconda inversione ripristina i valori esatti.' },
        { question: 'La trasparenza del PNG viene modificata?', answer: 'No. Il canale alfa viene preservato e lo sfondo trasparente non subisce alterazioni.' },
        { question: 'I file vengono inviati su server remoti?', answer: 'No. Il calcolo si svolge interamente nel browser locale.' },
        { question: 'Quali formati sono supportati?', answer: 'Puoi utilizzare ed esportare file JPG, PNG e WebP.' }
      ]
    }
  },

  'flip-rotate-image': {
    name: 'Flip & Rotate Image',
    formulaTitle: {
      en: '2D Affine Transformation Matrix & Angular Canvas Rotation Architecture',
      hi: '2D एफाइन ट्रांसफॉर्मेशन मैट्रिक्स और एंगुलर कैनवास रोटेशन संरचना',
      es: 'Matriz de Transformación Afín 2D y Rotación Angular en Lienzo',
      ja: '2次元アフィン変換行列およびCanvas座標回転アーキテクチャ',
      fr: 'Matrice de Transformation Affine 2D et Rotation Angulaire sur Canvas',
      de: '2D-Affine Transformationsmatrix & Winkel-Canvas-Rotation',
      pt: 'Matriz de Transformação Afim 2D e Rotação Angular em Canvas',
      ko: '2D 아핀 변환 행렬 및 Canvas 각도 회전 처리 구조',
      it: 'Matrice di Trasformazione Affine 2D e Rotazione Angolare su Canvas'
    },
    formulaDescription: {
      en: 'The transformation engine applies 2D affine matrix coordinates via CanvasRenderingContext2D (translate, rotate, and scale(-1, 1)). It swivels images at 90°, 180°, and 270° increments or mirrors them horizontally and vertically without re-encoding quality loss or server uploads.',
      hi: 'यह टूल CanvasRenderingContext2D (translate, rotate, scale) के माध्यम से 2D एफाइन मैट्रिक्स लागू करता है। यह फोटो को 90°, 180°, 270° घुमाने और क्षैतिज/लंबवत पलटने का कार्य बिना गुणवत्ता खोए सीधे आपके डिवाइस में करता है।',
      es: 'El motor de transformación aplica matrices afines 2D mediante CanvasRenderingContext2D (translate, rotate y scale(-1, 1)). Permite rotar en 90°, 180° o 270° e invertir horizontal o verticalmente sin degradar la calidad.',
      ja: '本変換機能は、CanvasRenderingContext2Dのアフィン変換（translate、rotate、scale）を用いて画像を操作。90度・180度・270度の回転や水平・垂直反転を、再圧縮による劣化やサーバー通信なしで瞬時に実行します。',
      fr: 'Le moteur applique des transformations affines 2D via Canvas (translate, rotate, scale(-1, 1)). Il fait pivoter l\'image à 90°, 180°, 270° ou crée un effet miroir horizontal/vertical sans perte.',
      de: 'Das Transformationswerkzeug nutzt 2D-Affine-Matrizen im Canvas (translate, rotate, scale). Bilder lassen sich verlustfrei um 90°, 180° oder 270° drehen sowie horizontal und vertikal spiegeln.',
      pt: 'O motor de transformação aplica matrizes afins 2D no Canvas (translate, rotate, scale). Gira fotos a 90°, 180° e 270° ou espelha horizontal e verticalmente sem perda de qualidade.',
      ko: '본 회전 변환기는 CanvasRenderingContext2D의 아핀 변환(translate, rotate, scale(-1, 1))을 적용하여 90도, 180도, 270도 각도 회전 및 좌우/상하 대칭 반전을 화질 손상 없이 브라우저 로컬에서 즉시 수행합니다.',
      it: 'Il motore di trasformazione applica matrici affini 2D su Canvas (translate, rotate, scale). Ruota le immagini a 90°, 180° o 270° ed esegue il ribaltamento orizzontale o verticale senza perdita.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Image', instruction: 'Upload your sideways or upside-down photo into the orientation tool.' },
        { stepNumber: 2, title: 'Rotate Left or Right', instruction: 'Click Rotate 90° Clockwise or Counter-Clockwise to orient the image correctly.' },
        { stepNumber: 3, title: 'Flip Horizontally or Vertically', instruction: 'Click Flip Horizontal (mirror) or Flip Vertical if needed for selfie correction or creative compositions.' },
        { stepNumber: 4, title: 'Download Oriented Image', instruction: 'Verify dimensions and click Download to save the perfectly aligned file.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो अपलोड करें', instruction: 'अपनी तिरछी या उल्टी फोटो को टूल में अपलोड करें।' },
        { stepNumber: 2, title: 'दाएं या बाएं घुमाएं', instruction: 'फोटो को सही दिशा में लाने के लिए 90° दक्षिणावर्त या वामावर्त घुमाएं।' },
        { stepNumber: 3, title: 'क्षैतिज या लंबवत पलटें', instruction: 'मिरर इफ़ेक्ट या सेल्फ़ी सुधार के लिए फ्लिप हॉरिजॉन्टल या फ्लिप वर्टिकल चुनें।' },
        { stepNumber: 4, title: 'डाउनलोड करें', instruction: 'परिणाम जांचें और सही दिशा वाली फोटो तुरंत डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar imagen', instruction: 'Suba su foto invertida o ladeada a la herramienta.' },
        { stepNumber: 2, title: 'Rotar a izquierda o derecha', instruction: 'Pulse Rotar 90° en sentido horario o antihorario para enderezarla.' },
        { stepNumber: 3, title: 'Voltear en espejo', instruction: 'Seleccione Voltear horizontal o vertical según su preferencia creativa.' },
        { stepNumber: 4, title: 'Descargar imagen', instruction: 'Haga clic en Descargar para guardar su archivo orientado.' }
      ],
      ja: [
        { stepNumber: 1, title: '画像の選択', instruction: '向きが横向きや逆さまになった写真を画面に読み込みます。' },
        { stepNumber: 2, title: '左右への90度回転', instruction: '「時計回りに90°」または「反時計回りに90°」ボタンを押して正しい向きに正します。' },
        { stepNumber: 3, title: '左右・上下の反転（ミラー）', instruction: '自撮り写真の左右反転補正などの目的に応じて「水平反転」「垂直反転」を適用します。' },
        { stepNumber: 4, title: '正しい向きで保存', instruction: 'プレビューで縦横比を確認し、ダウンロードボタンをクリックして保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer la photo', instruction: 'Chargez votre image mal orientée dans l\'outil.' },
        { stepNumber: 2, title: 'Pivoter à 90°', instruction: 'Tournez l\'image de 90° vers la droite ou la gauche pour la remettre droit.' },
        { stepNumber: 3, title: 'Effet miroir', instruction: 'Appliquez un retournement horizontal ou vertical si nécessaire.' },
        { stepNumber: 4, title: 'Télécharger le fichier', instruction: 'Enregistrez l\'image redressée en pleine résolution.' }
      ],
      de: [
        { stepNumber: 1, title: 'Foto auswählen', instruction: 'Laden Sie Ihr falsch ausgerichtetes Bild in das Werkzeug.' },
        { stepNumber: 2, title: 'Um 90° drehen', instruction: 'Drehen Sie das Bild im oder gegen den Uhrzeigersinn in die richtige Position.' },
        { stepNumber: 3, title: 'Horizontal/Vertikal spiegeln', instruction: 'Nutzen Sie die Spiegelungsoptionen für Korrekturen oder Effekte.' },
        { stepNumber: 4, title: 'Ausgerichtetes Bild speichern', instruction: 'Laden Sie das perfekt gedrehte Bild herunter.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar foto', instruction: 'Selecione a foto invertida ou de lado no seu dispositivo.' },
        { stepNumber: 2, title: 'Girar 90 graus', instruction: 'Clique em Girar 90° para a direita ou esquerda até aprumar a imagem.' },
        { stepNumber: 3, title: 'Espelhar imagem', instruction: 'Aplique espelhamento horizontal ou vertical conforme desejar.' },
        { stepNumber: 4, title: 'Baixar imagem pronta', instruction: 'Clique no botão de download para salvar a foto corrigida.' }
      ],
      ko: [
        { stepNumber: 1, title: '사진 파일 업로드', instruction: '가로로 누워있거나 거꾸로 뒤집힌 사진을 화면에 불러옵니다.' },
        { stepNumber: 2, title: '90도 좌우 회전', instruction: '시계 방향 또는 반시계 방향 90도 회전 버튼을 눌러 올바른 방향으로 교정합니다.' },
        { stepNumber: 3, title: '좌우 및 상하 반전', instruction: '셀카 거울 모드 보정 등을 위해 좌우 대칭 또는 상하 대칭 반전을 적용합니다.' },
        { stepNumber: 4, title: '교정된 사진 저장', instruction: '정상 방향으로 정렬된 사진을 확인하고 다운로드 버튼을 눌러 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare la foto', instruction: 'Inserisci l\'immagine orientata in modo errato.' },
        { stepNumber: 2, title: 'Ruotare di 90°', instruction: 'Fai clic su Ruota di 90° in senso orario o antiorario per raddrizzarla.' },
        { stepNumber: 3, title: 'Ribaltare a specchio', instruction: 'Applica il ribaltamento orizzontale o verticale secondo necessità.' },
        { stepNumber: 4, title: 'Scaricare l\'immagine', instruction: 'Salva il file con il corretto orientamento sul tuo computer o cellulare.' }
      ]
    },
    example: {
      en: {
        title: 'Smartphone Landscape Photo Rotation',
        scenario: 'Correcting an improperly saved vertical photo (1080×1920) taken in landscape orientation.',
        calculation: 'Input: 1080×1920 px. Canvas swaps dimension bounds to 1920×1080 px, translates center origin, and rotates +90°.',
        result: 'Output: Perfectly upright 1920×1080 px landscape photo with zero compression loss in 15ms.'
      },
      hi: {
        title: 'स्मार्टफोन लैंडस्केप फोटो रोटेशन उदाहरण',
        scenario: 'गलत ओरिएंटेशन में सेव हुई 1080×1920 फोटो को सही 1920×1080 लैंडस्केप में बदलना।',
        calculation: 'इनपुट: 1080×1920। कैनवास आयाम बदलकर 1920×1080 करता है और 90° घुमाता है।',
        result: 'आउटपुट: बिना किसी गुणवत्ता गिरावट के सही 1920×1080 पिक्सेल की फोटो तैयार।'
      },
      es: {
        title: 'Ejemplo de Corrección de Orientación',
        scenario: 'Enderezar una foto vertical (1080×1920) tomada en formato panorámico.',
        calculation: 'Dimensiones intercambiadas a 1920×1080 px con rotación afín de 90°.',
        result: 'Foto orientada correctamente a 1920×1080 px en 15 ms.'
      },
      ja: {
        title: 'スマホ横向き撮影写真の回転補正実例',
        scenario: '横向き撮影したのに縦長（1080×1920px）で誤認識された写真を正しい横向きへ補正する例。',
        calculation: 'Canvas領域を1920×1080pxへ反転調整し、中心点を原点として90度回転アフィン変換を実行。',
        result: '画質劣化ゼロで正しい1920×1080pxの横向き写真へ15msで補正完了。'
      },
      fr: {
        title: 'Exemple de Redressement de Photo Mobile',
        scenario: 'Correction d\'une photo paysage enregistrée par erreur en portrait (1080×1920 px).',
        calculation: 'Inversion des dimensions en 1920×1080 px et rotation angulaire de +90°.',
        result: 'Photo parfaitement orientée en 1920×1080 px obtenue en 15 ms.'
      },
      de: {
        title: 'Beispiel für Fotoausrichtungskorrektur',
        scenario: 'Korrektur eines Querformatfotos, das fälschlicherweise als Hochformat (1080×1920) abgespeichert wurde.',
        calculation: 'Dimensionstausch auf 1920×1080 Pixel mit +90°-Canvas-Transformation.',
        result: 'Einwandfrei ausgerichtetes Foto ohne Verluste in 15 ms.'
      },
      pt: {
        title: 'Exemplo de Correção de Orientação de Foto',
        scenario: 'Correção de foto vertical (1080×1920) capturada na verdade na horizontal.',
        calculation: 'Ajuste de medidas para 1920×1080 px com rotação de 90° no Canvas.',
        result: 'Foto perfeitamente alinhada na horizontal sem perda de qualidade em 15 ms.'
      },
      ko: {
        title: '스마트폰 가로 사진 회전 방향 교정 실전 예시',
        scenario: '가로로 촬영했으나 세로(1080×1920px)로 잘못 저장된 사진을 정상 가로 방향으로 회전 교정.',
        calculation: '캔버스 가로세로 규격을 1920×1080px로 치환 후 90도 회전 아핀 행렬 적용.',
        result: '화질 손실 없이 올바른 1920×1080px 가로 사진으로 15ms 만에 완벽 복구.'
      },
      it: {
        title: 'Esempio di Correzione Orientamento Foto',
        scenario: 'Raddrizzamento di una foto orizzontale registrata per errore in verticale (1080×1920).',
        calculation: 'Scambio dimensioni a 1920×1080 px e rotazione di +90° sul Canvas.',
        result: 'Foto correttamente orientata a 1920×1080 pixel in soli 15 ms.'
      }
    },
    faqs: {
      en: [
        { question: 'Why do smartphone cameras sometimes save photos in the wrong orientation?', answer: 'Smartphones record orientation in EXIF metadata tags. When shared or displayed in apps lacking EXIF interpretation, photos appear sideways. Rotating re-renders the true pixel grid, fixing orientation permanently.' },
        { question: 'Does flipping an image reverse text inside the photo?', answer: 'Yes. Horizontal flipping creates a mirror reflection, which inverts text glyphs. It is useful for un-mirroring front-facing selfie cameras.' },
        { question: 'Is my picture uploaded to external servers?', answer: 'No. All rotational transformations happen inside your browser\'s local Canvas memory.' },
        { question: 'Does rotating degrade photo resolution?', answer: 'No. Rotations at right angles (90°, 180°, 270°) preserve exact pixel mappings without blurring or downscaling.' }
      ],
      hi: [
        { question: 'स्मार्टफोन कभी-कभी फोटो को गलत दिशा में क्यों सेव करते हैं?', answer: 'स्मार्टफोन ओरिएंटेशन को EXIF मेटाडेटा में लिखते हैं। जिन ऐप्स में EXIF सपोर्ट नहीं होता, वे फोटो को तिरछा दिखाते हैं। यह टूल पिक्सेल को सही दिशा में दोबारा सेट कर देता है।' },
        { question: 'क्या फोटो पलटने से उसमें लिखा टेक्स्ट भी उल्टा हो जाता है?', answer: 'हाँ। हॉरिजॉन्टल फ्लिप से मिरर इफ़ेक्ट बनता है जिससे टेक्स्ट उल्टा हो जाता है। यह सेल्फी कैमरे की फोटो ठीक करने के लिए बहुत उपयोगी है।' },
        { question: 'क्या फोटो किसी सर्वर पर जाती है?', answer: 'नहीं। सभी प्रक्रिया सीधे आपके ब्राउज़र में स्थानीय रूप से होती है।' },
        { question: 'क्या घुमाने से फोटो का रिज़ॉल्यूशन कम होता है?', answer: 'नहीं। 90°, 180° या 270° पर घुमाने से पिक्सेल की स्पष्टता बिल्कुल पहले जैसी बनी रहती है।' }
      ],
      es: [
        { question: '¿Por qué las fotos del móvil a veces aparecen giradas?', answer: 'Los teléfonos guardan la orientación en etiquetas EXIF. Si una web no lee esas etiquetas, la imagen se muestra ladeada. Esta herramienta reordena los píxeles definitivamente.' },
        { question: '¿Voltear la foto invierte los textos?', answer: 'Sí. El volteo horizontal crea un reflejo especular. Resulta ideal para corregir fotos de la cámara frontal.' },
        { question: '¿Se transmiten las imágenes por internet?', answer: 'No. Las operaciones se realizan íntegramente en el navegador.' },
        { question: '¿Rotar reduce la resolución?', answer: 'No. Las rotaciones a 90°, 180° o 270° mantienen intacta la resolución original.' }
      ],
      ja: [
        { question: 'スマホで撮った写真が横向きになってしまう原因は何ですか？', answer: 'スマートフォンは向き情報をEXIFメタデータに記録します。EXIFに対応していない環境では写真が横倒しになります。本ツールで回転することでピクセル自体を正しく再配置できます。' },
        { question: '水平反転すると文字も鏡文字になりますか？', answer: 'はい。鏡のように左右が反転するため文字も反転します。インカメラ（自撮り）の反転補正に最適です。' },
        { question: '写真がサーバーへ送られる心配はありませんか？', answer: 'はい。処理は100%お使いのブラウザ内部で完結するため安全です。' },
        { question: '回転によって解像度が劣化しますか？', answer: 'いいえ。90度単位の直角回転はピクセルの座標入れ替えのみを行うため、解像度は完全に維持されます。' }
      ],
      fr: [
        { question: 'Pourquoi les photos de smartphone sont-elles parfois de travers ?', answer: 'Les téléphones stockent l\'orientation dans les métadonnées EXIF. Sans lecture EXIF, l\'image tourne. Cet outil réaligne physiquement les pixels.' },
        { question: 'L\'effet miroir inverse-t-il le texte ?', answer: 'Oui. Le retournement horizontal crée une image miroir, idéale pour corriger les selfies pris avec la caméra avant.' },
        { question: 'Les photos sont-elles conservées sur un serveur ?', answer: 'Non. Le traitement est réalisé localement dans la mémoire du navigateur.' },
        { question: 'La rotation altère-t-elle la résolution ?', answer: 'Non. Les rotations orthogonales (90°, 180°, 270°) n\'entraînent aucune dégradation de résolution.' }
      ],
      de: [
        { question: 'Warum speichern Handys Fotos manchmal falsch ausgerichtet ab?', answer: 'Smartphones nutzen EXIF-Tags. Fehlt Programmen die EXIF-Unterstützung, liegt das Foto quer. Die Rotation ordnet die Bildpunkte dauerhaft neu an.' },
        { question: 'Spiegelt die horizontale Drehung auch Texte?', answer: 'Ja. Die horizontale Spiegelung erzeugt ein Spiegelbild, was perfekt für Frontkamera-Selfies ist.' },
        { question: 'Werden Bilder ins Internet geladen?', answer: 'Nein. Alles geschieht lokal im Speicher Ihres Webbrowsers.' },
        { question: 'Geht beim Drehen Bildqualität verloren?', answer: 'Nein. Drehungen in 90°-Schritten behalten die volle Pixelgenauigkeit bei.' }
      ],
      pt: [
        { question: 'Por que fotos de celular às vezes ficam deitadas?', answer: 'Os celulares gravam a orientação em metadados EXIF. Esta ferramenta reorganiza os pixels fisicamente, corrigindo a foto em definitivo.' },
        { question: 'O espelhamento inverte o texto na foto?', answer: 'Sim. A inversão horizontal cria o efeito de espelho, ideal para fotos de câmera frontal (selfie).' },
        { question: 'A imagem é enviada a algum servidor?', answer: 'Não. Todo o processo roda localmente no navegador.' },
        { question: 'Rotacionar diminui a resolução da imagem?', answer: 'Não. Giros em 90°, 180° e 270° mantêm 100% da resolução e nitidez original.' }
      ],
      ko: [
        { question: '스마트폰으로 찍은 사진이 왜 옆으로 누워서 열리나요?', answer: '스마트폰 카메라는 사진 방향을 EXIF 메타데이터에 기록합니다. EXIF를 지원하지 않는 플랫폼에서는 사진이 누워 보이는데, 본 툴은 픽셀 자체를 재정렬하여 영구 교정합니다.' },
        { question: '좌우 반전 시 사진 속 글자도 뒤집히나요?', answer: '네. 거울 모드 대칭이 적용되므로 글자도 함께 반전됩니다. 전면 셀카 사진의 좌우를 바르게 잡는 데 유용합니다.' },
        { question: '사진이 외부 서버로 전송되나요?', answer: '아닙니다. 브라우저의 Canvas 메모리 내에서 로컬로 안전하게 회전 처리됩니다.' },
        { question: '회전하면 사진 해상도가 떨어지나요?', answer: '아닙니다. 90도 직각 단위 회전은 픽셀 좌표 재배치 연산이므로 원본 해상도와 화질이 100% 온전히 유지됩니다.' }
      ],
      it: [
        { question: 'Perché le foto dello smartphone a volte appaiono ruotate?', answer: 'Gli smartphone salvano l\'orientamento nei tag EXIF. Questo strumento riposiziona fisicamente i pixel risolvendo il problema in modo permanente.' },
        { question: 'Il ribaltamento speculare inverte anche i testi?', answer: 'Sì. Il ribaltamento orizzontale crea un effetto specchio, ideale per correggere i selfie.' },
        { question: 'Le foto vengono trasmesse su internet?', answer: 'No. Il processo è interamente locale nel browser.' },
        { question: 'La rotazione diminuisce la risoluzione?', answer: 'No. Le rotazioni a 90°, 180° e 270° conservano la piena definizione originale.' }
      ]
    }
  },

  'blur-image': {
    name: 'Blur Image',
    formulaTitle: {
      en: 'Gaussian Convolution Kernel & Spatial Canvas Filter Architecture',
      hi: 'गॉसियन कनवल्शन कर्नेल और स्पैशियल कैनवास फिल्टर संरचना',
      es: 'Núcleo de Convolución Gaussiana y Filtro Espacial en Lienzo',
      ja: 'ガウス畳み込みカーネルおよびCanvas空間フィルタリング構造',
      fr: 'Noyau de Convolution Gaussienne et Filtre Spatial sur Canvas',
      de: 'Gaußscher Faltungskern & Räumliche Canvas-Filterarchitektur',
      pt: 'Núcleo de Convolução Gaussiana e Filtragem Espacial em Canvas',
      ko: '가우시안 합성곱 커널 및 Canvas 공간 필터링 구조',
      it: 'Kernel di Convoluzione Gaussiana e Filtro Spaziale su Canvas'
    },
    formulaDescription: {
      en: 'Image blurring applies spatial 2D Gaussian approximation filters via CanvasRenderingContext2D.filter = "blur(Xpx)". It distributes pixel chromatic intensity across neighboring coordinates using a bell-shaped Gaussian distribution curve, smoothing high-frequency noise and anonymizing sensitive visual areas without server uploads.',
      hi: 'यह टूल CanvasRenderingContext2D.filter = "blur(Xpx)" द्वारा 2D गॉसियन फिल्टर लागू करता है। यह पिक्सेल के रंगों को आसपास के पिक्सेल के साथ गॉसियन कर्व के अनुसार फैलाकर चेहरे, लाइसेंस प्लेट या संवेदनशील हिस्सों को सुरक्षित और धुंधला बनाता है।',
      es: 'El desenfoque de imagen aplica filtros de aproximación gaussiana 2D mediante CanvasRenderingContext2D.filter = "blur(Xpx)". Suaviza las frecuencias altas distribuyendo la intensidad cromática entre píxeles vecinos sin subir archivos.',
      ja: '画像ぼかし機能は、CanvasRenderingContext2D.filter = "blur(Xpx)"を用いて2次元ガウス分布に基づく空間フィルタを適用。周辺画素へ滑らかに輝度を分散させることで、個人情報や背景をサーバー送信なしで自然にぼかします。',
      fr: 'Le flou d\'image applique un filtre gaussien 2D via CanvasRenderingContext2D.filter = "blur(Xpx)". Il diffuse la couleur des pixels voisins pour masquer des éléments sensibles sans serveur.',
      de: 'Die Unschärfefunktion wendet 2D-Gaußsche Faltungsfilter über CanvasRenderingContext2D.filter = "blur(Xpx)" an. Bildrauschen und sensible Details werden lokal im Browser weichgezeichnet.',
      pt: 'O efeito de desfoque utiliza aproximação gaussiana 2D no Canvas com a propriedade filter = "blur(Xpx)". Distribui a cor entre pixels vizinhos para anonimizar dados confidenciais com privacidade.',
      ko: '본 이미지 블러 도구는 CanvasRenderingContext2D.filter = "blur(Xpx)"를 통해 2D 가우시안 공간 필터링을 적용합니다. 주변 픽셀 좌표로 색상 강도를 종형 분포 곡선에 따라 고르게 분산시켜 개인정보나 얼굴, 배경을 로컬에서 안전하게 모자이크 및 블러 처리합니다.',
      it: 'L\'effetto sfocatura impiega filtri gaussiani 2D tramite CanvasRenderingContext2D.filter = "blur(Xpx)". Distribuisce l\'intensità cromatica sui pixel adiacenti per proteggere dati sensibili in locale.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Picture', instruction: 'Upload or drop your photo into the blur tool.' },
        { stepNumber: 2, title: 'Adjust Blur Radius', instruction: 'Use the slider to control the blur radius in pixels (1px for gentle softening, 15px–30px for total privacy redaction).' },
        { stepNumber: 3, title: 'Inspect Live Softening', instruction: 'Review the live canvas preview to verify that sensitive faces, text, or background elements are adequately obscured.' },
        { stepNumber: 4, title: 'Download Blurred Photo', instruction: 'Click Download to save the anonymized high-resolution image.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो अपलोड करें', instruction: 'अपनी फोटो को ब्लर टूल में अपलोड करें।' },
        { stepNumber: 2, title: 'ब्लर रेडियस सेट करें', instruction: 'स्लाइडर से पिक्सेल रेडियस सेट करें (हल्के प्रभाव के लिए 1-5px, पूरी गोपनीयता के लिए 15-30px)।' },
        { stepNumber: 3, title: 'लाइव प्रीव्यू देखें', instruction: 'जांचें कि संवेदनशील चेहरे, नंबर प्लेट या टेक्स्ट पर्याप्त रूप से छिप गए हैं।' },
        { stepNumber: 4, title: 'डाउनलोड करें', instruction: 'डाउनलोड बटन दबाकर सुरक्षित की गई फोटो तुरंत सेव करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar imagen', instruction: 'Suba su foto al panel de desenfoque.' },
        { stepNumber: 2, title: 'Ajustar radio de desenfoque', instruction: 'Mueva el control deslizante (1-5 px para suavizar, 15-30 px para anonimizar datos).' },
        { stepNumber: 3, title: 'Comprobar vista previa', instruction: 'Asegúrese de que matrículas, rostros o textos queden bien protegidos.' },
        { stepNumber: 4, title: 'Descargar imagen', instruction: 'Guarde su archivo desenfocado en alta resolución.' }
      ],
      ja: [
        { stepNumber: 1, title: '画像の選択', instruction: 'ぼかしを適用したい写真を画面に読み込みます。' },
        { stepNumber: 2, title: 'ぼかし強度の調整', instruction: 'スライダーで半径（1px〜5px: 自然なソフト効果、15px〜30px: 個人情報保護用の強加工）を調整します。' },
        { stepNumber: 3, title: 'プレビューでの確認', instruction: '顔やナンバープレート、機密テキストが適切に隠れているか確認します。' },
        { stepNumber: 4, title: 'ぼかし画像の保存', instruction: 'ダウンロードボタンをクリックして保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer la photo', instruction: 'Déposez votre cliché dans l\'éditeur de flou.' },
        { stepNumber: 2, title: 'Régler le rayon de flou', instruction: 'Ajustez le curseur (1 à 5 px pour adoucir, 15 à 30 px pour masquer les visages).' },
        { stepNumber: 3, title: 'Vérifier le masquage', instruction: 'Contrôlez que les détails sensibles sont bien illisibles.' },
        { stepNumber: 4, title: 'Télécharger l\'image', instruction: 'Enregistrez votre photo anonymisée.' }
      ],
      de: [
        { stepNumber: 1, title: 'Bild einfügen', instruction: 'Laden Sie Ihre Datei in das Weichzeichner-Werkzeug.' },
        { stepNumber: 2, title: 'Unschärferadius einstellen', instruction: 'Wählen Sie die Stärke (1–5 Pixel für sanfte Effekte, 15–30 Pixel für Datenschutz).' },
        { stepNumber: 3, title: 'Vorschau prüfen', instruction: 'Prüfen Sie, ob Gesichter, Kennzeichen oder Texte unkenntlich sind.' },
        { stepNumber: 4, title: 'Weichgezeichnetes Bild speichern', instruction: 'Klicken Sie auf Download, um die Datei zu sichern.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar foto', instruction: 'Selecione a imagem que deseja desfocar.' },
        { stepNumber: 2, title: 'Definir intensidade', instruction: 'Ajuste o controle (1-5 px para suavização leve, 15-30 px para anonimização).' },
        { stepNumber: 3, title: 'Verificar prévia', instruction: 'Confirme se placas de veículos, rostos ou dados ficaram ocultos.' },
        { stepNumber: 4, title: 'Baixar imagem', instruction: 'Clique em Download para salvar o arquivo final.' }
      ],
      ko: [
        { stepNumber: 1, title: '사진 파일 업로드', instruction: '블러 효과를 적용할 사진을 도구에 불러옵니다.' },
        { stepNumber: 2, title: '블러 강도(반경) 설정', instruction: '슬라이더를 조절합니다(1~5px: 은은한 포커스 효과, 15~30px: 개인정보 비식별화).' },
        { stepNumber: 3, title: '가림 효과 미리보기 점검', instruction: '얼굴, 차량 번호판, 민감한 텍스트가 식별 불가능하도록 가려졌는지 확인합니다.' },
        { stepNumber: 4, title: '블러 사진 다운로드', instruction: '다운로드 버튼을 클릭하여 안전하게 보정된 사진을 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare la foto', instruction: 'Inserisci l\'immagine da sfocare nell\'interfaccia.' },
        { stepNumber: 2, title: 'Regolare il raggio di sfocatura', instruction: 'Imposta il raggio (1-5 px per ammorbidire, 15-30 px per la privacy).' },
        { stepNumber: 3, title: 'Controllare l\'anteprima', instruction: 'Verifica che targhe, volti o testi siano resi illeggibili.' },
        { stepNumber: 4, title: 'Scaricare l\'immagine', instruction: 'Salva la foto anonimizzata sul tuo dispositivo.' }
      ]
    },
    example: {
      en: {
        title: 'Vehicle License Plate Anonymization',
        scenario: 'Blurring a vehicle registration number plate in a classified ad listing to protect owner privacy.',
        calculation: 'Filter radius set to 20px. Gaussian kernel convolves 20-pixel radius neighborhood around alphanumeric glyphs.',
        result: 'Text glyphs converted to completely unreadable continuous color gradients in 35ms.'
      },
      hi: {
        title: 'वाहन नंबर प्लेट छिपाने का उदाहरण',
        scenario: 'गोपनीयता के लिए ऑनलाइन विज्ञापन में गाड़ी की नंबर प्लेट को धुंधला करना।',
        calculation: '20px गॉसियन फिल्टर द्वारा अक्षरों को आसपास के पिक्सेल में फैलाया गया।',
        result: 'नंबर प्लेट पूरी तरह से अपठनीय और सुरक्षित रूप में 35ms में तैयार।'
      },
      es: {
        title: 'Ejemplo de Anonimización de Matrícula',
        scenario: 'Desenfocar la matrícula de un coche para su venta en un portal de anuncios.',
        calculation: 'Radio de filtro en 20 px: convolución gaussiana de 20 px alrededor de los caracteres.',
        result: 'Texto completamente ilegible y protegido en 35 ms.'
      },
      ja: {
        title: '車両ナンバープレートの個人情報保護実例',
        scenario: '中古車出品写真に写り込んだナンバープレートを読み取り不能に加工する例。',
        calculation: 'ぼかし半径20pxを指定し、ナンバー文字周辺にガウス畳み込みフィルタを適用。',
        result: '文字情報が完全に判読不能な滑らかなグラデーションへと35msで変換完了。'
      },
      fr: {
        title: 'Exemple de Floutage de Plaque d\'Immatriculation',
        scenario: 'Masquage de la plaque d\'une voiture avant mise en ligne sur un site de petites annonces.',
        calculation: 'Rayon de flou à 20 px : lissage des caractères par convolution gaussienne.',
        result: 'Plaque d\'immatriculation rendue totalement illisible en 35 ms.'
      },
      de: {
        title: 'Beispiel für Kennzeichen-Verpixelung',
        scenario: 'Weichzeichnen eines Autokennzeichens vor dem Einstellen in Online-Kleinanzeigen.',
        calculation: 'Filterradius auf 20 Pixel gesetzt: Gaußscher Kern verwischt alphanumerische Zeichen.',
        result: 'Vollständig unleserliches Kennzeichen in 35 ms erzeugt.'
      },
      pt: {
        title: 'Exemplo de Anonimização de Placa de Veículo',
        scenario: 'Ocultar a placa de um automóvel antes de publicar o anúncio de venda na internet.',
        calculation: 'Raio de desfoque ajustado em 20 px: convolução gaussiana sobre os caracteres.',
        result: 'Placa tornada totalmente ilegível com total privacidade em 35 ms.'
      },
      ko: {
        title: '자동차 번호판 개인정보 비식별화 실전 예시',
        scenario: '중고차 매매 게시글 등록을 위해 차량 번호판을 식별 불가능하도록 가리는 블러 작업.',
        calculation: '블러 반경 20px 적용: 번호판 숫자 주변에 가우시안 합성곱 필터 연산.',
        result: '차량 번호가 완벽하게 판독 불가능한 부드러운 그라데이션으로 35ms 만에 변환 완료.'
      },
      it: {
        title: 'Esempio di Oscuramento Targa Veicolo',
        scenario: 'Sfocatura della targa di un\'auto prima della pubblicazione di un annuncio.',
        calculation: 'Raggio impostato a 20 px: convoluzione gaussiana sui caratteri alfanumerici.',
        result: 'Targa resa completamente illeggibile in soli 35 ms.'
      }
    },
    faqs: {
      en: [
        { question: 'Can blurred text or faces be un-blurred by artificial intelligence?', answer: 'Strong Gaussian blurs (radius > 15px) permanently merge neighboring pixel values, destroying the underlying spatial information. Reconstructing original text is mathematically impossible when sufficient radius is used.' },
        { question: 'Is my photo sent to any server while blurring?', answer: 'No. The filtering algorithm runs 100% inside your browser\'s local GPU/Canvas pipeline.' },
        { question: 'What is the recommended blur radius for obscuring phone numbers or faces?', answer: 'A radius of 15px to 25px is recommended to fully destroy readable letter strokes and facial landmarks.' },
        { question: 'Can I export the blurred picture as transparent PNG?', answer: 'Yes. If your original file has transparent regions, they remain transparent in the exported PNG.' }
      ],
      hi: [
        { question: 'क्या AI द्वारा ब्लर किए गए टेक्स्ट या चेहरे को दोबारा ठीक किया जा सकता है?', answer: 'मजबूत गॉसियन ब्लर (15px से अधिक) पिक्सेल डेटा को स्थायी रूप से मिला देता है, जिससे मूल डेटा नष्ट हो जाता है और इसे दोबारा निकालना गणितीय रूप से असंभव है।' },
        { question: 'क्या ब्लर करते समय फोटो सर्वर पर जाती है?', answer: 'नहीं। सभी फिल्टर सीधे आपके ब्राउज़र में स्थानीय रूप से काम करते हैं।' },
        { question: 'चेहरा या फोन नंबर छिपाने के लिए कितना ब्लर सही है?', answer: '15px से 25px का रेडियस पूरी तरह से छिपाने के लिए सबसे उपयुक्त है।' },
        { question: 'क्या पारदर्शी PNG में एक्सपोर्ट कर सकते हैं?', answer: 'हाँ, पारदर्शिता पूरी तरह सुरक्षित रहती है।' }
      ],
      es: [
        { question: '¿Puede la IA revertir un texto desenfocado?', answer: 'Un desenfoque gaussiano suficiente (radio superior a 15 px) destruye la información de frecuencias de forma irreversible.' },
        { question: '¿Se envía la imagen a servidores?', answer: 'No. El filtrado se ejecuta totalmente en la GPU/Canvas de su navegador.' },
        { question: '¿Qué radio se aconseja para ocultar rostros o números?', answer: 'Se recomienda un radio de entre 15 y 25 píxeles para garantizar que no queden rasgos legibles.' },
        { question: '¿Conserva la transparencia en PNG?', answer: 'Sí. Las áreas transparentes originales se mantienen en la exportación.' }
      ],
      ja: [
        { question: 'ぼかした文字や顔はAIによって復元されてしまいますか？', answer: '十分な強度（半径15px以上）のガウスぼかしを適用すると、ピクセルの情報が完全に混ざり合い不可逆的に破壊されるため、復元は数学的に不可能です。' },
        { question: '画像がサーバーへ送信されることはありますか？', answer: 'いいえ。ブラウザ内のGPU/Canvasパイプラインで直接処理されます。' },
        { question: '電話番号や顔を完全に隠すための推奨強度は？', answer: '15px〜25px以上の半径を指定すれば、文字の線や顔の特徴量が完全に消去されます。' },
        { question: '透過PNG形式で保存できますか？', answer: 'はい。元の透明度を保ったまま保存可能です。' }
      ],
      fr: [
        { question: 'Une IA peut-elle déflouter un texte confidentiel ?', answer: 'Un flou gaussien suffisant (rayon > 15 px) détruit définitivement l\'information spatiale, rendant la reconstruction impossible.' },
        { question: 'L\'image transite-t-elle par un serveur ?', answer: 'Non. Le calcul de flou est effectué 100 % localement dans votre navigateur.' },
        { question: 'Quel rayon choisir pour masquer un visage ?', answer: 'Un rayon de 15 à 25 pixels garantit la suppression de tout trait distinctif.' },
        { question: 'Puis-je exporter en PNG transparent ?', answer: 'Oui. Le canal de transparence est intégralement respecté.' }
      ],
      de: [
        { question: 'Kann KI weichgezeichnete Texte wiederherstellen?', answer: 'Ein starker Gaußscher Weichzeichner (>15 Pixel) zerstört die Bildinformationen unwiederbringlich.' },
        { question: 'Werden Fotos an einen Server übertragen?', answer: 'Nein. Die Filterung läuft vollständig im lokalen Browser ab.' },
        { question: 'Welcher Radius wird für sensible Daten empfohlen?', answer: 'Ein Radius von 15 bis 25 Pixeln wird empfohlen, um Texte und Gesichter unkenntlich zu machen.' },
        { question: 'Bleibt PNG-Transparenz erhalten?', answer: 'Ja. Transparente Zonen bleiben im PNG-Export transparent.' }
      ],
      pt: [
        { question: 'A inteligência artificial consegue reverter o desfoque?', answer: 'Desfoques com raio acima de 15 px fundem os dados de forma irreversível, tornando a recuperação impossível.' },
        { question: 'Minhas fotos passam por algum servidor?', answer: 'Não. O processamento ocorre diretamente no seu dispositivo.' },
        { question: 'Qual o raio recomendado para ocultar dados?', answer: 'Recomenda-se entre 15 e 25 px para apagar completamente textos e rostos.' },
        { question: 'É possível salvar com fundo transparente?', answer: 'Sim. Exportando em PNG a transparência é mantida.' }
      ],
      ko: [
        { question: '블러 처리한 텍스트나 얼굴을 AI로 다시 복원할 수 있나요?', answer: '충분한 강도(반경 15px 이상)의 가우시안 블러는 픽셀 간 정보를 영구적으로 뒤섞어 원본 신호를 파괴하므로 수학적으로 복원이 불가능합니다.' },
        { question: '작업 중 사진이 서버로 전송되나요?', answer: '아닙니다. 브라우저 내부 GPU 및 Canvas 가속을 통해 기기 내에서만 처리됩니다.' },
        { question: '전화번호나 얼굴을 완전히 가리려면 어느 정도의 수치가 필요한가요?', answer: '글자의 획이나 이목구비 윤곽을 완벽하게 지우려면 15px~25px 이상의 반경 설정을 권장합니다.' },
        { question: '투명 배경 PNG로 저장할 수 있나요?', answer: '네. 원본의 투명 영역이 유지된 채로 PNG 파일 저장이 가능합니다.' }
      ],
      it: [
        { question: 'L\'intelligenza artificiale può ripristinare il testo sfocato?', answer: 'Una sfocatura gaussiana marcata (raggio > 15 px) fonde i pixel in modo irreversibile, rendendo impossibile la ricostruzione.' },
        { question: 'L\'immagine viene inviata su server remoti?', answer: 'No. Il filtro viene applicato sul Canvas locale del browser.' },
        { question: 'Qual è il raggio consigliato per nascondere volti o numeri?', answer: 'Un raggio tra 15 e 25 pixel è perfetto per eliminare qualsiasi dettaglio leggibile.' },
        { question: 'Posso salvare in PNG trasparente?', answer: 'Sì. Le zone trasparenti rimangono inalterate nel salvataggio in formato PNG.' }
      ]
    }
  },

  'image-color-palette': {
    name: 'Image Color Palette',
    formulaTitle: {
      en: 'RGB Median-Cut Color Quantization & Dominant Palette Extraction Architecture',
      hi: 'RGB मीडियन-कट रंग क्वांटाइजेशन और डोमिनेंट पैलेट निष्कर्षण संरचना',
      es: 'Cuantización de Color Median-Cut y Extracción de Paleta Dominante',
      ja: 'RGBメディアンカット量子化および主要カラーパレット抽出構造',
      fr: 'Quantification de Couleur Median-Cut et Extraction de Palette Dominante',
      de: 'RGB-Median-Cut-Farbquantisierung & Dominante Palettenextraktion',
      pt: 'Quantização de Cor Median-Cut e Extração de Paleta Dominante',
      ko: 'RGB 미디언 컷 색상 양자화 및 지배적 컬러 팔레트 추출 구조',
      it: 'Quantizzazione del Colore Median-Cut ed Estrazione della Palette Dominante'
    },
    formulaDescription: {
      en: 'The palette extractor parses HTML5 Canvas image pixel data into 3D RGB color space and executes a recursive Median-Cut color quantization algorithm. It clusters chromatic frequencies into dominant tonal swatches, outputting accurate Hex (#RRGGBB) and RGB codes with direct one-click clipboard copying without external server calls.',
      hi: 'यह टूल फोटो के सभी पिक्सेल को 3D RGB स्पेस में पार्स करता है और मीडियन-कट क्वांटाइजेशन एल्गोरिदम चलाता है। यह फोटो में सबसे प्रमुख रंगों की पहचान करके सटीक हेक्स (#RRGGBB) और RGB कोड निकालता है जिसे आप एक क्लिक में कॉपी कर सकते हैं।',
      es: 'El extractor analiza los píxeles del lienzo en un espacio cromático 3D y aplica el algoritmo de cuantización Median-Cut. Agrupa frecuencias y extrae las tonalidades dominantes con códigos hexadecimales (#RRGGBB) y RGB sin servidores.',
      ja: '本パレット抽出ツールは、Canvas上のピクセルデータを3次元RGB色空間へ展開し、メディアンカット量子化アルゴリズムを再帰的に適用。画像中の主要な代表色をクラスタリングし、1クリックでコピー可能なHEX（#RRGGBB）およびRGB値を出力します。',
      fr: 'L\'extracteur analyse les pixels Canvas dans l\'espace 3D RVB et applique l\'algorithme de quantification Median-Cut. Il identifie les teintes dominantes avec codes Hex (#RRGGBB) et RVB sans appel serveur.',
      de: 'Der Palettenextraktor analysiert Bildpixel im 3D-RGB-Farbraum und wendet den Median-Cut-Quantisierungsalgorithmus an. Er isoliert dominante Farbtöne und liefert präzise Hex- (#RRGGBB) und RGB-Werte lokal im Browser.',
      pt: 'O extrator analisa os pixels do Canvas no espaço cromático 3D aplicando o algoritmo Median-Cut. Agrupa as cores dominantes gerando códigos hexadecimais (#RRGGBB) e RGB com cópia rápida.',
      ko: '본 컬러 팔레트 추출기는 HTML5 Canvas의 픽셀 데이터를 3차원 RGB 색 공간에 매핑한 후 미디언 컷(Median-Cut) 색상 양자화 알고리즘을 적용합니다. 사진의 주요 대표 색상들을 클러스터링하여 원클릭 복사가 가능한 정확한 Hex(#RRGGBB) 및 RGB 색상 코드를 로컬에서 추출합니다.',
      it: 'L\'estrattore analizza i pixel su Canvas nello spazio 3D RGB applicando l\'algoritmo Median-Cut. Raggruppa i colori dominanti fornendo codici esadecimali (#RRGGBB) e RGB senza server remoti.'
    },
    steps: {
      en: [
        { stepNumber: 1, title: 'Upload Image', instruction: 'Upload your photo, website mockup, or brand graphic into the palette extractor.' },
        { stepNumber: 2, title: 'Choose Swatch Count', instruction: 'Select how many dominant colors to extract (typically 5 to 8 swatches for a brand palette).' },
        { stepNumber: 3, title: 'Inspect Hex & RGB Codes', instruction: 'Review the visual color chips showing exact hexadecimal (#RRGGBB) and RGB color coordinates.' },
        { stepNumber: 4, title: 'Copy or Export Palette', instruction: 'Click any color swatch to copy its Hex code immediately, or export the full CSS variables palette.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो अपलोड करें', instruction: 'अपनी फोटो, वेबसाइट डिज़ाइन या लोगो को टूल में अपलोड करें।' },
        { stepNumber: 2, title: 'रंगों की संख्या चुनें', instruction: 'चुनें कि कितने प्रमुख रंग निकालने हैं (ब्रांड पैलेट के लिए 5 से 8 रंग आदर्श हैं)।' },
        { stepNumber: 3, title: 'Hex और RGB कोड देखें', instruction: 'तैयार रंग पैलेट में सटीक हेक्साडेसिमल (#RRGGBB) और RGB कोड देखें।' },
        { stepNumber: 4, title: 'कॉपी करें या एक्सपोर्ट करें', instruction: 'किसी भी रंग पर क्लिक करके उसका कोड तुरंत कॉपी करें या पूरी CSS पैलेट डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Cargar imagen', instruction: 'Suba su foto, diseño o logotipo a la herramienta.' },
        { stepNumber: 2, title: 'Elegir número de muestras', instruction: 'Seleccione cuántos colores dominantes desea extraer (habitualmente de 5 a 8).' },
        { stepNumber: 3, title: 'Consultar códigos Hex y RGB', instruction: 'Examine las muestras con sus valores hexadecimales (#RRGGBB) exactos.' },
        { stepNumber: 4, title: 'Copiar o exportar', instruction: 'Haga clic en cualquier muestra para copiar su código o exportar la paleta en CSS.' }
      ],
      ja: [
        { stepNumber: 1, title: '画像の選択', instruction: '写真、Webデザインのカンプ、ブランドロゴなどを読み込みます。' },
        { stepNumber: 2, title: '抽出色数の指定', instruction: '抽出したい代表色の数（一般的なブランドパレットでは5〜8色）を選択します。' },
        { stepNumber: 3, title: 'カラーコードの確認', instruction: '各カラースウォッチに表示されたHEXコード（#RRGGBB）やRGB値を確認します。' },
        { stepNumber: 4, title: 'コピーと書き出し', instruction: 'スウォッチをクリックしてコードを即座にコピーするか、CSS変数形式で保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Importer l\'image', instruction: 'Chargez votre photo ou maquette graphique dans l\'outil.' },
        { stepNumber: 2, title: 'Choisir le nombre de teintes', instruction: 'Définissez le nombre de couleurs dominantes à extraire (de 5 à 8 généralement).' },
        { stepNumber: 3, title: 'Consulter les codes Hex', instruction: 'Observez les pastilles de couleur affichant les codes hexadécimaux précis.' },
        { stepNumber: 4, title: 'Copier ou exporter', instruction: 'Cliquez sur une teinte pour copier son code ou exportez le code CSS.' }
      ],
      de: [
        { stepNumber: 1, title: 'Bild hochladen', instruction: 'Laden Sie Ihr Foto, Logo oder Mockup in den Palettenextraktor.' },
        { stepNumber: 2, title: 'Anzahl der Farbtöne wählen', instruction: 'Wählen Sie, wie viele Hauptfarben ermittelt werden sollen (meist 5–8).' },
        { stepNumber: 3, title: 'Hex- und RGB-Werte prüfen', instruction: 'Sehen Sie die exakten Farbcodes (#RRGGBB) der ermittelten Palettenfarben ein.' },
        { stepNumber: 4, title: 'Farbcode kopieren', instruction: 'Klicken Sie auf ein Farbfeld, um den Code direkt in die Zwischenablage zu übernehmen.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Carregar imagem', instruction: 'Selecione sua foto ou arte gráfica para extração.' },
        { stepNumber: 2, title: 'Definir quantidade de cores', instruction: 'Escolha quantos tons dominantes deseja listar (geralmente de 5 a 8).' },
        { stepNumber: 3, title: 'Visualizar códigos Hex', instruction: 'Examine os cartões de cores com códigos hexadécimais (#RRGGBB).' },
        { stepNumber: 4, title: 'Copiar código', instruction: 'Clique em qualquer cor para copiar o valor Hex diretamente para a área de transferência.' }
      ],
      ko: [
        { stepNumber: 1, title: '이미지 업로드', instruction: '사진, 웹디자인 시안, 브랜드 로고 이미지를 불러옵니다.' },
        { stepNumber: 2, title: '추출할 색상 개수 선택', instruction: '추출하고자 하는 대표 색상 수(일반적인 브랜드 팔레트의 경우 5~8개)를 지정합니다.' },
        { stepNumber: 3, title: 'Hex 및 RGB 코드 확인', instruction: '화면에 정렬된 컬러 칩에서 정확한 16진수(#RRGGBB) 및 RGB 수치를 점검합니다.' },
        { stepNumber: 4, title: '원클릭 복사 및 CSS 내보내기', instruction: '색상 칩을 클릭하여 클립보드에 바로 복사하거나 CSS 변수 코드로 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Caricare l\'immagine', instruction: 'Inserisci foto, grafiche o layout nell\'estrattore.' },
        { stepNumber: 2, title: 'Scegliere il numero di colori', instruction: 'Seleziona quante tinte dominanti estrarre (consigliati 5-8 campioni).' },
        { stepNumber: 3, title: 'Leggere i codici esadecimali', instruction: 'Consulta i valori Hex (#RRGGBB) e RGB generati per ogni colore.' },
        { stepNumber: 4, title: 'Copiare o esportare', instruction: 'Fai clic sul campione per copiare il codice negli appunti o salvare in CSS.' }
      ]
    },
    example: {
      en: {
        title: 'Sunset Landscape Palette Extraction',
        scenario: 'Extracting a 5-color harmonious design palette from a golden-hour beach sunset photograph.',
        calculation: 'Median-Cut splits RGB space across 5 iterations -> Primary: #F27D52 (Warm Coral), Secondary: #F4D06F (Golden Sand), Accents: #392F5A (Deep Twilight), #8E44AD (Soft Purple), #E76F51 (Terracotta).',
        result: '5 coordinated color swatches extracted with copyable Hex codes and CSS variables in 30ms.'
      },
      hi: {
        title: 'सूर्यास्त फोटो से रंग पैलेट निकालना',
        scenario: 'शाम के सूर्यास्त की फोटो से 5 सुंदर रंगों का सामंजस्यपूर्ण पैलेट निकालना।',
        calculation: 'मीडियन-कट एल्गोरिदम द्वारा 5 प्रमुख रंग निकाले गए: #F27D52, #F4D06F, #392F5A, #8E44AD, #E76F51।',
        result: 'कॉपी करने योग्य हेक्स कोड के साथ 5 प्रमुख रंगों का पैलेट 30ms में तैयार।'
      },
      es: {
        title: 'Ejemplo de Paleta a partir de Puesta de Sol',
        scenario: 'Extraer una paleta de 5 colores armónicos a partir de una foto de playa al atardecer.',
        calculation: 'Algoritmo Median-Cut aplicado: #F27D52 (coral), #F4D06F (arena dorada), #392F5A (crepúsculo), #8E44AD (violeta), #E76F51 (terracota).',
        result: '5 muestras coordinadas listas para usar en diseño en 30 ms.'
      },
      ja: {
        title: '夕焼け風景写真からのカラーパレット抽出実例',
        scenario: '夕暮れのビーチ写真から、Webデザインに活用できる5色の美しい調和パレットを抽出する例。',
        calculation: 'メディアンカット量子化を適用: #F27D52（夕陽コーラル）、#F4D06F（砂浜ゴールド）、#392F5A（宵闇トワイライト）、#8E44AD（薄紫）、#E76F51（テラコッタ）。',
        result: '即座にコピー可能なHEXコード付きカラーパレット5色が30msで生成。'
      },
      fr: {
        title: 'Exemple d\'Extraction de Palette Coucher de Soleil',
        scenario: 'Extraction de 5 teintes harmonieuses à partir d\'un paysage marin au coucher du soleil.',
        calculation: 'Quantification Median-Cut : #F27D52 (corail), #F4D06F (or), #392F5A (indigo), #8E44AD (pourpre), #E76F51 (terre cuite).',
        result: 'Palette de 5 nuances avec codes Hex prête pour l\'intégration web en 30 ms.'
      },
      de: {
        title: 'Beispiel für Farbpaletten-Extraktion',
        scenario: 'Ermittlung einer 5-Farben-Palette aus einer Sonnenuntergangs-Landschaftsaufnahme.',
        calculation: 'Median-Cut-Algorithmus: #F27D52 (Koralle), #F4D06F (Gold), #392F5A (Dämmerung), #8E44AD (Lila), #E76F51 (Terrakotta).',
        result: '5 harmonische Farbtöne mit Hex-Codes in 30 ms extrahiert.'
      },
      pt: {
        title: 'Exemplo de Paleta de Pôr do Sol',
        scenario: 'Extração de 5 cores coordenadas a partir de uma foto de praia ao entardecer.',
        calculation: 'Algoritmo Median-Cut: #F27D52 (coral), #F4D06F (dourado), #392F5A (azul crepúsculo), #8E44AD (roxo), #E76F51 (terracota).',
        result: 'Paleta com 5 tons prontos para projetos de identidade visual em 30 ms.'
      },
      ko: {
        title: '노을 풍경 사진의 5색 조화 팔레트 추출 실전 예시',
        scenario: '해변 일몰 풍경 사진에서 브랜드 디자인에 활용 가능한 5가지 감성 컬러 팔레트 추출.',
        calculation: '미디언 컷 색 공간 분할: #F27D52 (노을 코랄), #F4D06F (모래 골드), #392F5A (황혼 인디고), #8E44AD (소프트 퍼플), #E76F51 (테라코타).',
        result: '원클릭으로 복사할 수 있는 5개 대표 컬러 칩과 CSS 변수가 30ms 만에 생성.'
      },
      it: {
        title: 'Esempio di Palette da Tramonto',
        scenario: 'Estrazione di 5 tonalità armoniche da una foto di paesaggio al tramonto.',
        calculation: 'Quantizzazione Median-Cut: #F27D52 (corallo), #F4D06F (oro), #392F5A (crepuscolo), #8E44AD (viola), #E76F51 (terracotta).',
        result: '5 campioni cromatici con codici Hex pronti per la grafica in 30 ms.'
      }
    },
    faqs: {
      en: [
        { question: 'How does the Median-Cut color quantization algorithm work?', answer: 'The algorithm encloses all pixel RGB values in a 3D bounding box, sorts points along the axis with greatest variation, and splits it at the median. Repeating this recursively generates clusters representing true dominant colors.' },
        { question: 'Can I copy Hex codes directly for use in CSS/Figma?', answer: 'Yes. Clicking any color chip copies its exact Hex value (e.g. #F27D52) directly to your clipboard.' },
        { question: 'Is my photograph uploaded to any server?', answer: 'No. The pixel sampling and clustering algorithms execute 100% inside your browser\'s local JavaScript engine.' },
        { question: 'What image formats can I analyze?', answer: 'Any standard image format supported by web browsers, including JPG, PNG, WebP, and SVG files.' }
      ],
      hi: [
        { question: 'मीडियन-कट एल्गोरिदम कैसे काम करता है?', answer: 'यह एल्गोरिदम सभी पिक्सेल को 3D RGB बॉक्स में रखकर सबसे बड़े अंतर वाले अक्ष पर विभाजित करता है। बार-बार ऐसा करने से फोटो के सबसे प्रमुख रंगों के समूह तैयार होते हैं।' },
        { question: 'क्या मैं सीधे CSS या Figma के लिए Hex कोड कॉपी कर सकता हूँ?', answer: 'हाँ। किसी भी रंग पर क्लिक करने पर उसका हेक्स कोड (जैसे #F27D52) सीधे क्लिपबोर्ड पर कॉपी हो जाता है।' },
        { question: 'क्या मेरी फोटो सर्वर पर भेजी जाती है?', answer: 'नहीं। सभी पिक्सेल विश्लेषण सीधे आपके ब्राउज़र में स्थानीय रूप से होते हैं।' },
        { question: 'कौन-कौन से फाइल फॉर्मेट का विश्लेषण किया जा सकता है?', answer: 'JPG, PNG, WebP और SVG फाइलों का आसानी से विश्लेषण किया जा सकता है।' }
      ],
      es: [
        { question: '¿Cómo funciona el algoritmo de corte de mediana (Median-Cut)?', answer: 'El algoritmo divide recursivamente el espacio tridimensional de colores por el eje de mayor dispersión, aislando los grupos de color más representativos.' },
        { question: '¿Puedo copiar los códigos Hex para Figma o CSS?', answer: 'Sí. Al hacer clic sobre cualquier muestra se copia su código hexadecimal directamente al portapapeles.' },
        { question: '¿La foto se envía a algún servidor?', answer: 'No. El análisis de píxeles se ejecuta en la memoria local del navegador.' },
        { question: '¿Qué formatos son compatibles?', answer: 'Permite analizar archivos JPG, PNG, WebP y SVG.' }
      ],
      ja: [
        { question: 'メディアンカット量子化アルゴリズムとは何ですか？', answer: 'RGB色空間において画素のばらつきが最も大きい軸の中央値（メディアン）で空間を再帰的に2分割し、各領域の重心から最も代表的な色を抽出する手法です。' },
        { question: 'FigmaやCSS用にカラーコードをすぐコピーできますか？', answer: 'はい。色チップをクリックするだけで、#F27D52などのHEXコードがクリップボードに即座にコピーされます。' },
        { question: '画像がサーバーへ送信されることはありますか？', answer: 'いいえ。すべてのピクセル集計処理はお使いのブラウザ内部で完結します。' },
        { question: 'どのような画像形式を解析できますか？', answer: 'JPG、PNG、WebP、SVGなどブラウザで表示可能な主要形式すべてに対応しています。' }
      ],
      fr: [
        { question: 'Comment fonctionne l\'algorithme Median-Cut ?', answer: 'Il divise l\'espace chromatique 3D selon l\'axe de plus grande dispersion, isolant ainsi les groupes de couleurs les plus représentatifs.' },
        { question: 'Puis-je copier les codes pour Figma ou le CSS ?', answer: 'Oui. Un clic sur une pastille copie instantanément son code hexadécimal dans le presse-papiers.' },
        { question: 'L\'image est-elle envoyée sur un serveur ?', answer: 'Non. L\'analyse des couleurs s\'effectue localement dans votre navigateur.' },
        { question: 'Quels formats sont acceptés ?', answer: 'Vous pouvez analyser des fichiers JPG, PNG, WebP et SVG.' }
      ],
      de: [
        { question: 'Wie funktioniert der Median-Cut-Algorithmus?', answer: 'Er unterteilt den 3D-Farbraum schrittweise entlang der Achse mit der größten Farbstreuung, um die dominanten Farbgruppen zu bündeln.' },
        { question: 'Können Hex-Codes direkt für CSS kopiert werden?', answer: 'Ja. Ein Klick auf ein Farbfeld kopiert den Hex-Wert unmittelbar in die Zwischenablage.' },
        { question: 'Werden Bilder an einen Server gesendet?', answer: 'Nein. Die Analyse läuft vollständig lokal im Browser ab.' },
        { question: 'Welche Dateiformate werden unterstützt?', answer: 'Das Tool analysiert JPG, PNG, WebP und SVG.' }
      ],
      pt: [
        { question: 'Como funciona o algoritmo Median-Cut?', answer: 'Ele divide o espaço de cores 3D sucessivamente no eixo de maior variação, agrupando os tons mais marcantes da foto.' },
        { question: 'Posso copiar os códigos Hex para o Figma ou CSS?', answer: 'Sim. Basta clicar em qualquer amostra para copiar o código hexadécimal na hora.' },
        { question: 'Minhas imagens vão para algum servidor?', answer: 'Não. Toda a análise roda diretamente no navegador do seu aparelho.' },
        { question: 'Quais extensões posso utilizar?', answer: 'Compatível com formatos comuns como JPG, PNG, WebP e SVG.' }
      ],
      ko: [
        { question: '미디언 컷(Median-Cut) 색상 양자화 알고리즘의 원리는 무엇인가요?', answer: '3차원 RGB 색 공간에서 가장 분포 편차가 큰 축의 중앙값(Median)을 기준으로 공간을 재귀적으로 분할하여 사진 속 가장 지배적인 색상 군집을 찾아내는 알고리즘입니다.' },
        { question: 'Figma나 CSS에 사용할 Hex 코드를 바로 복사할 수 있나요?', answer: '네. 화면의 색상 칩을 클릭하면 즉시 #F27D52와 같은 16진수 코드가 클립보드에 복사됩니다.' },
        { question: '분석 과정에서 사진이 서버로 전송되나요?', answer: '아닙니다. 모든 픽셀 샘플링과 양자화 연산은 브라우저 로컬 자바스크립트 엔진에서만 실행됩니다.' },
        { question: '어떤 이미지 파일 형식을 지원하나요?', answer: 'JPG, PNG, WebP, SVG 등 웹 표준 이미지 규격을 모두 지원합니다.' }
      ],
      it: [
        { question: 'Come funziona l\'algoritmo Median-Cut?', answer: 'Divide ricorsivamente lo spazio colore 3D lungo l\'asse di maggiore dispersione, isolando i gruppi di tonalità dominanti.' },
        { question: 'Posso copiare i codici per Figma o CSS?', answer: 'Sì. Basta fare clic su un campione per copiare il codice esadecimale negli appunti.' },
        { question: 'L\'immagine viene caricata su server remoti?', answer: 'No. L\'analisi dei pixel avviene unicamente nella memoria locale del browser.' },
        { question: 'Quali formati sono supportati?', answer: 'Puoi analizzare immagini JPG, PNG, WebP e file SVG.' }
      ]
    }
  }
};

// Assemble all 13 tools
const LOCALES = ['en', 'hi', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
const finalImageTools = { ...existingDefs };

for (const [slug, def] of Object.entries(newTools)) {
  finalImageTools[slug] = {};
  for (const loc of LOCALES) {
    finalImageTools[slug][loc] = {
      formulaTitle: def.formulaTitle[loc] || def.formulaTitle.en,
      formulaDescription: def.formulaDescription[loc] || def.formulaDescription.en,
      stepByStep: def.steps[loc] || def.steps.en,
      workedExample: def.example[loc] || def.example.en,
      faqs: def.faqs[loc] || def.faqs.en
    };
  }
}

const fileContent = `/**
 * Image Tools Definitions (All 13 Tools x 9 Locales)
 * crop-image, webp-to-png, webp-to-jpg, image-compressor, image-resizer,
 * jpg-to-png, png-to-jpg, svg-to-png, black-and-white-image, invert-image-colors,
 * flip-rotate-image, blur-image, image-color-palette
 */

export const imageToolsDefinitions = ${JSON.stringify(finalImageTools, null, 2)};
`;

fs.writeFileSync(path.join(outDir, 'image-tools.mjs'), fileContent, 'utf8');
console.log(`Successfully generated scripts/definitions/image-tools.mjs for all ${Object.keys(finalImageTools).length} tools across 9 locales!`);
