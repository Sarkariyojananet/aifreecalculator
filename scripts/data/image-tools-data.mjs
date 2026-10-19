/**
 * P1 Task 1: Image Tools Educational Content Data
 * Covers all 13 Image Tools across 9 locales: en, hi, es, ja, fr, de, pt, ko, it
 */

export const imageToolsData = {
  'crop-image': {
    formulaTitle: {
      en: 'HTML5 Canvas Coordinate-Based Cropping Architecture',
      hi: 'HTML5 कैनवास निर्देशांक-आधारित क्रॉपिंग तकनीक',
      es: 'Arquitectura de Recorte Basada en Coordenadas de Lienzo HTML5',
      ja: 'HTML5 Canvas座標基準クロッピング処理技術',
      fr: 'Architecture de Recadrage par Coordonnées HTML5 Canvas',
      de: 'HTML5-Canvas Koordinatenbasierte Zuschneide-Architektur',
      pt: 'Arquitetura de Recorte Baseada em Coordenadas HTML5 Canvas',
      ko: 'HTML5 Canvas 좌표 기반 이미지 크롭 처리 구조',
      it: 'Architettura di Ritaglio Basata su Coordinate Canvas HTML5'
    },
    formulaDescription: {
      en: 'Cropping operates entirely inside your browser by reading source pixel data via CanvasRenderingContext2D.drawImage() with source (sx, sy, sWidth, sHeight) and destination clipping boundaries, outputting an uncompressed lossless canvas buffer without server round-trips.',
      hi: 'क्रॉपिंग पूरी तरह से आपके ब्राउज़र के भीतर CanvasRenderingContext2D.drawImage() के माध्यम से मूल पिक्सेल डेटा पढ़कर स्रोत (sx, sy) और गंतव्य सीमाओं को ट्रिम करती है, जिससे बिना सर्वर अपलोड के मूल गुणवत्ता सुरक्षित रहती है।',
      es: 'El recorte se ejecuta completamente en su navegador leyendo los datos de píxeles mediante CanvasRenderingContext2D.drawImage() con coordenadas de origen (sx, sy) y destino, generando un búfer limpio sin transferir archivos a servidores.',
      ja: 'クロッピングはお使いのブラウザ内部でCanvasRenderingContext2D.drawImage()を用いて元画像のピクセル座標(sx, sy, sWidth, sHeight)を切り出し、サーバー送信なしで高精度な描画バッファを出力します。',
      fr: 'Le recadrage s\'exécute entièrement dans votre navigateur via CanvasRenderingContext2D.drawImage() en définissant les coordonnées source (sx, sy) et de destination, exportant un fichier net sans téléversement sur des serveurs tiers.',
      de: 'Das Zuschneiden erfolgt vollständig im Browser über CanvasRenderingContext2D.drawImage() anhand präziser Quellkoordinaten (sx, sy, sWidth, sHeight) und Zielgrenzen, wodurch Bilddaten ohne Server-Upload lokal verarbeitet werden.',
      pt: 'O recorte opera diretamente no navegador lendo os dados de pixels pelo CanvasRenderingContext2D.drawImage() com coordenadas de corte de origem e destino, produzindo uma imagem nítida sem tráfego de dados para servidores.',
      ko: '크롭 기능은 CanvasRenderingContext2D.drawImage()를 통해 원본 픽셀 좌표(sx, sy, sWidth, sHeight)를 추출하여 브라우저 로컬에서 직접 실행되며, 서버 전송 없이 무손실 캔버스 버퍼를 생성합니다.',
      it: 'Il ritaglio opera interamente nel browser leggendo i pixel tramite CanvasRenderingContext2D.drawImage() con coordinate sorgente (sx, sy) e destinazione, esportando l\'area selezionata senza inviare file a server esterni.'
    },
    stepByStep: {
      en: [
        { stepNumber: 1, title: 'Upload Your Image', instruction: 'Drag and drop your JPG, PNG, or WebP photo into the upload box or select it from your device.' },
        { stepNumber: 2, title: 'Choose Aspect Ratio or Freeform', instruction: 'Select a standard preset (1:1 Square, 16:9 Landscape, 4:3 Standard, 9:16 Story) or choose Freeform for manual cropping.' },
        { stepNumber: 3, title: 'Adjust the Crop Box', instruction: 'Drag the corner handles and reposition the bounding frame over the exact focal area you wish to keep.' },
        { stepNumber: 4, title: 'Preview & Download', instruction: 'Verify the pixel dimensions in the live preview and click Download Cropped Image to save the result instantly.' }
      ],
      hi: [
        { stepNumber: 1, title: 'फोटो चुनें या अपलोड करें', instruction: 'अपनी JPG, PNG या WebP फोटो को बॉक्स में खींचें या अपने डिवाइस से चुनें।' },
        { stepNumber: 2, title: 'आस्पेक्ट रेशियो चुनें', instruction: '1:1 (स्क्वायर), 16:9 (वाइडस्क्रीन), 4:3 या फ्रीफॉर्म में से अपनी पसंद का अनुपात चुनें।' },
        { stepNumber: 3, title: 'क्रॉप बॉक्स को एडजस्ट करें', instruction: 'कॉर्नर हैंडल को खींचकर फोटो के जिस हिस्से को रखना चाहते हैं उसे फ्रेम में सेट करें।' },
        { stepNumber: 4, title: 'प्रीव्यू देखें और डाउनलोड करें', instruction: 'पिक्सेल आकार जांचें और क्रॉप्ड फोटो को अपने डिवाइस पर तुरंत डाउनलोड करें।' }
      ],
      es: [
        { stepNumber: 1, title: 'Seleccionar o arrastrar imagen', instruction: 'Arrastre su archivo JPG, PNG o WebP al recuadro o selecciónelo desde su dispositivo.' },
        { stepNumber: 2, title: 'Elegir proporción o formato libre', instruction: 'Seleccione un ajuste preestablecido (1:1 Cuadrado, 16:9 Panorámico, 4:3, 9:16 Vertical) o elija modo libre.' },
        { stepNumber: 3, title: 'Ajustar el marco de corte', instruction: 'Arrastre los controladores de las esquinas para encuadrar exactamente la zona que desea conservar.' },
        { stepNumber: 4, title: 'Previsualizar y descargar', instruction: 'Compruebe las dimensiones finales y haga clic en Descargar Imagen Recortada para guardarla.' }
      ],
      ja: [
        { stepNumber: 1, title: '画像をアップロード', instruction: 'JPG、PNG、WebP画像を選択するか、ドラッグ＆ドロップで枠内に配置します。' },
        { stepNumber: 2, title: 'アスペクト比を選択', instruction: '1:1（正方形）、16:9（横長）、4:3、9:16（縦長）、または自由変形を選択します。' },
        { stepNumber: 3, title: 'トリミング枠を調整', instruction: '四隅のハンドルをドラッグして、残したい領域を正確に囲みます。' },
        { stepNumber: 4, title: '確認してダウンロード', instruction: '仕上がりサイズを確認し、「切り抜き画像をダウンロード」をクリックして保存します。' }
      ],
      fr: [
        { stepNumber: 1, title: 'Sélectionner une photo', instruction: 'Glissez-déposez votre image JPG, PNG ou WebP ou parcourez les dossiers de votre appareil.' },
        { stepNumber: 2, title: 'Définir le ratio d\'aspect', instruction: 'Choisissez un préréglage (1:1 Carré, 16:9 Paysage, 4:3, 9:16 Story) ou le recadrage libre.' },
        { stepNumber: 3, title: 'Ajuster la zone de sélection', instruction: 'Déplacez les poignées d\'angle pour cadrer précisément la zone du sujet principal.' },
        { stepNumber: 4, title: 'Vérifier et télécharger', instruction: 'Vérifiez les dimensions en pixels et cliquez sur Télécharger pour enregistrer l\'image recadrée.' }
      ],
      de: [
        { stepNumber: 1, title: 'Bilddatei auswählen', instruction: 'Ziehen Sie ein JPG-, PNG- oder WebP-Bild per Drag-and-Drop in den Bereich oder wählen Sie es lokal aus.' },
        { stepNumber: 2, title: 'Seitenverhältnis festlegen', instruction: 'Wählen Sie ein Format (1:1 Quadrat, 16:9 Breitbild, 4:3, 9:16 Hochformat) oder den freien Modus.' },
        { stepNumber: 3, title: 'Zuschnittrahmen anpassen', instruction: 'Verschieben Sie die Ecken des Rahmens, um den gewünschten Bildausschnitt exakt festzulegen.' },
        { stepNumber: 4, title: 'Vorschau & Herunterladen', instruction: 'Prüfen Sie die Pixelmaße und klicken Sie auf Zugeschnittenes Bild herunterladen.' }
      ],
      pt: [
        { stepNumber: 1, title: 'Selecionar a imagem', instruction: 'Arraste seu arquivo JPG, PNG ou WebP para a área indicada ou selecione no seu dispositivo.' },
        { stepNumber: 2, title: 'Definir proporção da tela', instruction: 'Escolha uma proporção pré-definida (1:1 Quadrado, 16:9 Paisagem, 4:3, 9:16) ou corte livre.' },
        { stepNumber: 3, title: 'Ajustar a área de corte', instruction: 'Arraste os cantos da caixa delimitadora para focar exatamente no assunto desejado.' },
        { stepNumber: 4, title: 'Visualizar e baixar', instruction: 'Verifique as dimensões finais e clique em Baixar Imagem Recortada para salvar o arquivo.' }
      ],
      ko: [
        { stepNumber: 1, title: '이미지 파일 불러오기', instruction: 'JPG, PNG, WebP 이미지를 드래그하여 놓거나 기기에서 파일을 선택합니다.' },
        { stepNumber: 2, title: '가로세로 비율 선택', instruction: '1:1(정사각형), 16:9(와이드), 4:3, 9:16(세로형) 또는 자유 비율 중 선택합니다.' },
        { stepNumber: 3, title: '크롭 영역 지정', instruction: '조절 핸들을 드래그하여 유지하고자 하는 중심 피사체 영역을 프레임에 맞춥니다.' },
        { stepNumber: 4, title: '미리보기 및 다운로드', instruction: '최종 픽셀 크기를 확인한 후 잘라낸 이미지를 기기에 즉시 저장합니다.' }
      ],
      it: [
        { stepNumber: 1, title: 'Carica la tua immagine', instruction: 'Trascina una foto JPG, PNG o WebP nel riquadro o selezionala dalla memoria del dispositivo.' },
        { stepNumber: 2, title: 'Seleziona proporzioni', instruction: 'Scegli un rapporto preimpostato (1:1 Quadrato, 16:9 Panoramico, 4:3, 9:16) o ritaglio libero.' },
        { stepNumber: 3, title: 'Regola i bordi di ritaglio', instruction: 'Trascina le maniglie per inquadrare con precisione il soggetto che intendi mantenere.' },
        { stepNumber: 4, title: 'Anteprima e download', instruction: 'Controlla la risoluzione e clicca su Scarica Immagine Ritagliata per salvare il file.' }
      ]
    },
    workedExample: {
      en: {
        title: 'Avatar Profile Photo Cropping (1:1 Square)',
        scenario: 'A user needs a centered 1:1 square profile picture for an account avatar from a wide 1920×1080 holiday photo.',
        calculation: 'Input: 1920×1080 px; Selected Region: x=420, y=0, width=1080, height=1080; Aspect Ratio: 1:1; Target Output: 1080×1080 px',
        result: 'Cropped 1080×1080 px crisp square photo ready for profile upload without distortion or black letterbox bars.'
      },
      hi: {
        title: 'प्रोफाइल अवतार फोटो क्रॉपिंग (1:1 स्क्वायर)',
        scenario: 'उपयोगकर्ता को 1920×1080 की चौड़ी तस्वीर से सोशल मीडिया प्रोफाइल के लिए 1:1 वर्गाकार अवतार की आवश्यकता है।',
        calculation: 'इनपुट: 1920×1080 पिक्सेल; चयनित क्षेत्र: चौड़ाई=1080, ऊंचाई=1080; अनुपात: 1:1 स्क्वायर',
        result: 'बिना किसी खिंचाव या काले किनारों के 1080×1080 पिक्सेल की स्पष्ट प्रोफाइल फोटो तैयार।'
      },
      es: {
        title: 'Recorte de Foto de Perfil (Cuadrado 1:1)',
        scenario: 'Un usuario necesita una imagen de perfil cuadrada 1:1 a partir de una fotografía horizontal de 1920×1080.',
        calculation: 'Entrada: 1920×1080 px; Área de recorte: 1080×1080 px centrada; Proporción: 1:1',
        result: 'Imagen cuadrada nítida de 1080×1080 px lista para redes sociales sin distorsión ni bandas negras.'
      },
      ja: {
        title: 'SNS用プロフィール写真のクロッピング（1:1 正方形）',
        scenario: '1920×1080pxの横長スナップ写真から、SNSアイコン用の正方形画像を切り抜く例です。',
        calculation: '入力解像度: 1920×1080px; 選択枠: x=420, y=0, 幅=1080px, 高さ=1080px; 比率: 1:1',
        result: '歪みや余白のない、くっきりとした1080×1080pxの正方形アイコン用画像が出力されます。'
      },
      fr: {
        title: 'Recadrage Photo de Profil (Carré 1:1)',
        scenario: 'Extraction d\'un avatar carré 1:1 au centre d\'une photo de vacances au format 1920×1080.',
        calculation: 'Source : 1920×1080 px ; Sélection : 1080×1080 px centrée ; Ratio : 1:1',
        result: 'Photo carrée nette de 1080×1080 px prête pour avatar sans déformation ni bordures noires.'
      },
      de: {
        title: 'Profilbild-Zuschnitt (1:1 Quadrat)',
        scenario: 'Erstellung eines quadratischen 1:1 Profilbildes aus einem Querformat-Foto mit 1920×1080 Pixeln.',
        calculation: 'Eingabe: 1920×1080 px; Zuschnittbereich: 1080×1080 px mittig; Seitenverhältnis: 1:1',
        result: 'Scharfes 1080×1080 px Quadratfoto ohne Verzerrung oder schwarze Ränder, ideal für Profil-Uploads.'
      },
      pt: {
        title: 'Recorte de Foto de Perfil (Quadrado 1:1)',
        scenario: 'Extrair uma imagem quadrada 1:1 para avatar a partir de uma foto horizontal de 1920×1080 px.',
        calculation: 'Entrada: 1920×1080 px; Região selecionada: 1080×1080 px centralizada; Proporção: 1:1',
        result: 'Foto quadrada nítida de 1080×1080 px pronta para uso em perfis sem distorções visuais.'
      },
      ko: {
        title: '프로필 아바타 사진 크롭 (1:1 정사각형)',
        scenario: '1920×1080 가로형 사진에서 SNS 프로필용 1:1 정사각형 사진을 추출하는 작업입니다.',
        calculation: '입력 해상도: 1920×1080 px; 선택 영역: 1080×1080 px 중심부; 비율: 1:1 정사각형',
        result: '왜곡이나 여백 없이 선명한 1080×1080 px 정사각형 프로필 이미지가 완성됩니다.'
      },
      it: {
        title: 'Ritaglio Foto Profilo (Quadrato 1:1)',
        scenario: 'Creazione di un avatar quadrato 1:1 al centro di una foto orizzontale da 1920×1080 pixel.',
        calculation: 'Sorgente: 1920×1080 px; Area selezionata: 1080×1080 px; Rapporto: 1:1',
        result: 'Foto quadrata nitida da 1080×1080 px pronta per il caricamento su profili social senza distorsioni.'
      }
    },
    faqs: {
      en: [
        { question: 'What file size and resolution limits apply when cropping?', answer: 'The tool handles standard web images up to 50MB and up to 8000×8000 pixels. Extremely large raw photos may be constrained by your device’s available browser RAM.' },
        { question: 'Does cropping reduce photo clarity or pixel quality?', answer: 'No. Cropping only removes unselected outer pixel coordinates. The retained inner area maintains its original optical clarity.' },
        { question: 'Are my images uploaded to any remote server?', answer: 'No. The entire process takes place 100% locally in your browser memory using the HTML5 Canvas API.' },
        { question: 'What should I do if the image appears blank or distorted after crop?', answer: 'Ensure your original image is a valid JPG, PNG, or WebP file without corrupted EXIF headers. Refresh the page to clear browser memory if working with multiple high-resolution photos.' }
      ],
      hi: [
        { question: 'क्रॉप करते समय अधिकतम फाइल साइज और सीमाएं क्या हैं?', answer: 'यह टूल 50MB तक की इमेज और 8000×8000 पिक्सेल तक की फाइलों को आसानी से संभालता है। बहुत बड़ी फाइलों में डिवाइस की रैम के अनुसार समय लग सकता है।' },
        { question: 'क्या फोटो क्रॉप करने से उसकी क्वालिटी घटती है?', answer: 'नहीं। केवल बाहर का अनचाहा हिस्सा हटाया जाता है, चयनित मुख्य भाग की गुणवत्ता और स्पष्टता बिल्कुल मूल जैसी बनी रहती है।' },
        { question: 'क्या मेरी फोटो सर्वर पर अपलोड होती है?', answer: 'नहीं। संपूर्ण प्रक्रिया 100% आपके वेब ब्राउज़र में स्थानीय रूप से होती है और कोई भी डेटा हमारे सर्वर पर नहीं भेजा जाता।' },
        { question: 'यदि क्रॉप के बाद फोटो खाली या विकृत दिखे तो क्या करें?', answer: 'जांचें कि आपकी मूल फोटो सही JPG, PNG या WebP फॉर्मेट में है। ब्राउज़र मेमोरी खाली करने के लिए पेज रीफ्रेश करके दोबारा प्रयास करें।' }
      ],
      es: [
        { question: '¿Cuáles son los límites de tamaño y resolución para recortar?', answer: 'El recortador admite imágenes de hasta 50MB y resoluciones de hasta 8000×8000 píxeles, sujeto a la memoria RAM disponible en su navegador.' },
        { question: '¿El recorte degrada la nitidez o calidad de la imagen?', answer: 'No. El recorte únicamente elimina las coordenadas de píxeles descartadas; el área interna conservada mantiene su calidad óptica original.' },
        { question: '¿Se cargan mis imágenes en servidores externos?', answer: 'No. El procesamiento es 100% local en la memoria de su navegador mediante la API HTML5 Canvas.' },
        { question: '¿Qué hacer si la imagen se ve en blanco o deformada?', answer: 'Compruebe que el archivo original no esté corrupto y sea formato JPG, PNG o WebP válido. Si maneja fotos de gran tamaño, recargue la pestaña para liberar memoria.' }
      ],
      ja: [
        { question: '画像のファイルサイズや解像度の上限はありますか？', answer: '一般的なWeb画像（最大約50MB、8000×8000px程度）まで快適に処理できます。極端に大きな一眼レフRAW現像画像はお使いの端末のメモリ残量に依存します。' },
        { question: 'トリミングによって画質は劣化しますか？', answer: 'いいえ。トリミングは選択範囲外のピクセル座標をカットする処理のため、選択した内部領域の鮮明さは維持されます。' },
        { question: '画像は外部サーバーに送信されますか？', answer: 'いいえ。すべての処理はHTML5 Canvas APIを利用してお使いの端末のブラウザ内（ローカル）で完結します。' },
        { question: '切り抜き後に画像が真っ白になったり崩れる場合の対処法は？', answer: '画像ファイルが破損していない正規のJPG/PNG/WebPであることを確認し、ブラウザのタブを再読み込みしてメモリを解放してから再試行してください。' }
      ],
      fr: [
        { question: 'Quelles sont les limites de taille et de résolution ?', answer: 'L\'outil prend en charge les images jusqu\'à 50 Mo et 8000×8000 pixels, dans la limite de la mémoire vive disponible dans votre navigateur.' },
        { question: 'Le recadrage altère-t-il la netteté de l\'image ?', answer: 'Non. Le recadrage supprime uniquement les pixels extérieurs non retenus. La zone centrale sélectionnée conserve sa résolution et sa clarté natives.' },
        { question: 'Mes photos sont-elles envoyées sur un serveur distant ?', answer: 'Non. L\'opération s\'effectue à 100% localement dans votre navigateur via l\'API HTML5 Canvas.' },
        { question: 'Que faire si l\'image obtenue est vide ou déformée ?', answer: 'Vérifiez que votre fichier est un format JPG, PNG ou WebP valide et non corrompu. Actualisez la page pour vider la mémoire tampon si vous traitez des photos lourdes.' }
      ],
      de: [
        { question: 'Welche Dateigrößen- und Auflösungsgrenzen gelten?', answer: 'Das Tool verarbeitet Web-Bilder bis zu 50 MB und 8000×8000 Pixel problemlos, abhängig vom verfügbaren Arbeitsspeicher (RAM) Ihres Geräts.' },
        { question: 'Verschlechtert das Zuschneiden die Bildqualität?', answer: 'Nein. Es werden lediglich die außerhalb des Rahmens liegenden Pixel entfernt. Der gewählte Bildausschnitt behält seine originale Auflösung.' },
        { question: 'Werden Bilder auf externe Server hochgeladen?', answer: 'Nein. Der gesamte Vorgang läuft zu 100 % lokal im Speicher Ihres Browsers mithilfe der HTML5-Canvas-Schnittstelle ab.' },
        { question: 'Was tun, wenn das Bild nach dem Zuschnitt fehlerhaft angezeigt wird?', answer: 'Stellen Sie sicher, dass die Quelldatei ein intaktes JPG, PNG oder WebP ist. Laden Sie den Tab neu, um temporären Browserspeicher freizugeben.' }
      ],
      pt: [
        { question: 'Quais são os limites de tamanho e resolução ao recortar?', answer: 'Suporta arquivos de até 50MB e resoluções de até 8000×8000 pixels, condicionado à memória RAM disponível no seu navegador.' },
        { question: 'O recorte reduz a nitidez da foto?', answer: 'Não. O recorte apenas descarta os pixels fora da área escolhida; o interior preserva integralmente a fidelidade original.' },
        { question: 'Minhas imagens são enviadas para algum servidor?', answer: 'Não. Todo o processamento ocorre 100% localmente no navegador via API HTML5 Canvas.' },
        { question: 'O que fazer se o resultado ficar em branco ou distorcido?', answer: 'Confirme se o arquivo é um JPG, PNG ou WebP válido. Em fotos muito pesadas, atualize a página para limpar o cache da memória.' }
      ],
      ko: [
        { question: '자르기 작업 시 파일 크기나 해상도 제한이 있나요?', answer: '최대 50MB, 8000×8000 픽셀 수준의 표준 이미지를 원활하게 지원하며, 초대형 파일은 기기의 가용 브라우저 RAM에 영향을 받을 수 있습니다.' },
        { question: '이미지를 잘라내면 원본 화질이 저하되나요?', answer: '아닙니다. 선택 영역 바깥의 픽셀 좌표만 제거되므로 남겨진 중심 영역의 해상도와 화질은 원본 그대로 유지됩니다.' },
        { question: '작업 중인 사진이 외부 서버로 전송되나요?', answer: '전혀 전송되지 않습니다. 모든 그래픽 연산은 HTML5 Canvas API를 통해 사용자 브라우저 내부 메모리에서만 100% 안전하게 처리됩니다.' },
        { question: '크롭 후 이미지가 빈 화면으로 나오면 어떻게 해결하나요?', answer: '손상되지 않은 정상적인 JPG, PNG, WebP 파일인지 확인하고, 대용량 파일 작업 후에는 브라우저 탭을 새로고침하여 메모리를 확보해 주세요.' }
      ],
      it: [
        { question: 'Quali sono i limiti di dimensione e risoluzione?', answer: 'Il convertitore gestisce immagini fino a 50MB e 8000×8000 pixel, in base alla memoria RAM disponibile nel browser del dispositivo.' },
        { question: 'Il ritaglio riduce la nitidezza o qualità della foto?', answer: 'No. Il ritaglio elimina solo i pixel esterni non inclusi; l\'area ritagliata mantiene inalterata la nitidezza originaria.' },
        { question: 'Le mie immagini vengono caricate su server esterni?', answer: 'No. L\'intero processo si svolge al 100% in locale nel browser tramite l\'API HTML5 Canvas.' },
        { question: 'Cosa fare se l\'immagine appare vuota o distorta?', answer: 'Verifica che il file originale sia un JPG, PNG o WebP valido e non corrotto. Ricarica la scheda per liberare memoria temporanea.' }
      ]
    }
  }
};
