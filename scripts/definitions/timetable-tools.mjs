/**
 * Timetable Tools Definitions (All 9 Tools x 9 Locales)
 * timetable-maker, cute-timetable-maker, study-timetable-maker, weekly-timetable-maker,
 * daily-timetable-maker, work-shift-schedule-maker, workout-timetable-maker,
 * meal-timetable-planner, monthly-time-table-maker
 */

export const timetableToolsDefinitions = {
  "timetable-maker": {
    "en": {
      "formulaTitle": "Temporal Block Allocation & Responsive Grid Scheduling Architecture",
      "formulaDescription": "The timetable maker maps hourly time-blocks across a 7-day responsive visual grid directly in browser memory. It validates overlapping temporal intervals, assigns categorical CSS color tags, and serializes state to client localStorage and high-resolution print stylesheets (@media print) without server database queries.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choose Grid View",
          "instruction": "Select 5-day (Mon–Fri) or 7-day (Mon–Sun) mode, and choose hourly or 30-minute time intervals."
        },
        {
          "stepNumber": 2,
          "title": "Add Activity Slots",
          "instruction": "Click any empty cell or the Add Event button to assign title, start/end time, and location."
        },
        {
          "stepNumber": 3,
          "title": "Customize Color Coding",
          "instruction": "Assign distinct colors to work, study, meetings, and personal relaxation blocks for visual clarity."
        },
        {
          "stepNumber": 4,
          "title": "Print or Save",
          "instruction": "Click Print / PDF to generate an ink-friendly print sheet or save your schedule locally in browser storage."
        }
      ],
      "workedExample": {
        "title": "Weekly College Course Schedule Organization",
        "scenario": "Scheduling 18 lecture hours and 10 study hours across Monday through Friday with distinct subject tags.",
        "calculation": "5 weekdays × 8 active hours (09:00 to 17:00). 18h lectures color-coded Blue, 10h library study Green, 5h lunch breaks Amber.",
        "result": "Balanced 40-hour academic week mapped visually with zero overlapping conflicts ready for A4 printing."
      },
      "faqs": [
        {
          "question": "Is my timetable saved when I close the browser?",
          "answer": "Yes. The timetable automatically persists in your browser's local storage (localStorage). It will reappear whenever you revisit the page on the same device."
        },
        {
          "question": "Can I print the timetable on standard A4 paper without cutting off columns?",
          "answer": "Yes. Our specialized print stylesheet (@media print) automatically scales grid columns to fit portrait or landscape A4 and US Letter sheets perfectly."
        },
        {
          "question": "Are any schedules or personal activities uploaded to a server?",
          "answer": "No. All schedule data stays 100% inside your browser's local storage with zero cloud transmissions."
        },
        {
          "question": "Can I clear the schedule and start fresh?",
          "answer": "Yes. Click the Reset / Clear button to empty all time slots and create a brand-new timetable."
        }
      ]
    },
    "hi": {
      "formulaTitle": "समय ब्लॉक आवंटन और अनुकूली ग्रिड शेड्यूलिंग संरचना",
      "formulaDescription": "यह टाइमटेबल मेकर 7-दिवसीय विज़ुअल ग्रिड में घंटों के ब्लॉक को सीधे ब्राउज़र मेमोरी में मैप करता है। यह समय अंतराल के टकराव की जांच करता है, श्रेणीबद्ध रंग टैग लगाता है और बिना किसी सर्वर डेटाबेस के स्थानीय रूप से प्रिंट योग्य शीट तैयार करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "ग्रिड व्यू चुनें",
          "instruction": "5-दिन (सोम–शुक्र) या 7-दिन (सोम–रवि) मोड चुनें और 1 घंटे या 30 मिनट का अंतराल सेट करें।"
        },
        {
          "stepNumber": 2,
          "title": "गतिविधियां जोड़ें",
          "instruction": "शीर्षक, समय और स्थान जोड़ने के लिए किसी भी खाली सेल या \"इवेंट जोड़ें\" पर क्लिक करें।"
        },
        {
          "stepNumber": 3,
          "title": "रंग कोड निर्धारित करें",
          "instruction": "काम, पढ़ाई और आराम के लिए अलग-अलग रंग चुनें ताकि टाइमटेबल समझना आसान हो।"
        },
        {
          "stepNumber": 4,
          "title": "प्रिंट करें या सेव करें",
          "instruction": "प्रिंट / PDF बटन दबाकर प्रिंट करने योग्य शीट डाउनलोड करें या ब्राउज़र में सेव रखें।"
        }
      ],
      "workedExample": {
        "title": "कॉलेज साप्ताहिक अध्ययन समय सारिणी उदाहरण",
        "scenario": "सोमवार से शुक्रवार के बीच 18 घंटे की कक्षाएं और 10 घंटे का सेल्फ-स्टडी सत्र व्यवस्थित करना।",
        "calculation": "5 कार्यदिवस × 8 घंटे (सुबह 9 से शाम 5)। कक्षाएं नीला रंग, सेल्फ-स्टडी हरा रंग, लंच ब्रेक पीला रंग।",
        "result": "बिना किसी समय टकराव के 40 घंटे का संतुलित साप्ताहिक टाइमटेबल A4 प्रिंटिंग के लिए तैयार।"
      },
      "faqs": [
        {
          "question": "क्या ब्राउज़र बंद करने पर टाइमटेबल सुरक्षित रहता है?",
          "answer": "हाँ। टाइमटेबल आपके ब्राउज़र के स्थानीय स्टोरेज (localStorage) में अपने आप सेव रहता है और दोबारा खोलने पर वापस आ जाता है।"
        },
        {
          "question": "क्या इसे सामान्य A4 पेपर पर बिना कटे प्रिंट किया जा सकता है?",
          "answer": "हाँ। हमारा प्रिंट लेआउट (@media print) टाइमटेबल को A4 पेपर के आकार में पूरी तरह फिट कर देता है।"
        },
        {
          "question": "क्या मेरी व्यक्तिगत दिनचर्या किसी सर्वर पर अपलोड होती है?",
          "answer": "नहीं। सभी डेटा केवल आपके डिवाइस पर सुरक्षित रहता है।"
        },
        {
          "question": "क्या मैं सब कुछ हटाकर नया टाइमटेबल बना सकता हूँ?",
          "answer": "हाँ। रीसेट बटन दबाकर आप एक क्लिक में सभी स्लॉट खाली कर सकते हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Asignación de Bloques Temporales y Planificación en Cuadrícula Dinámica",
      "formulaDescription": "El creador de horarios organiza bloques temporales en una cuadrícula de 7 días dentro del navegador. Valida intervalos solapados, asigna etiquetas de color categóricas y exporta hojas imprimibles en alta resolución sin servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Elegir formato de cuadrícula",
          "instruction": "Seleccione modo de 5 días o 7 días y defina intervalos de 30 o 60 minutos."
        },
        {
          "stepNumber": 2,
          "title": "Añadir actividades",
          "instruction": "Haga clic en una celda para asignar nombre, horario y lugar de la tarea."
        },
        {
          "stepNumber": 3,
          "title": "Asignar colores temáticos",
          "instruction": "Destaque clases, reuniones y descansos con colores diferenciados para rápida lectura."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir o guardar",
          "instruction": "Pulse Imprimir / PDF para generar una hoja limpia lista para el aula o escritorio."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Horario Universitario Semanal",
        "scenario": "Planificar 18 horas de clase y 10 horas de estudio de lunes a viernes.",
        "calculation": "5 días × 8 horas diarias. Clases en azul, biblioteca en verde y comidas en amarillo.",
        "result": "Semana académica equilibrada sin solapamientos lista para imprimir en A4."
      },
      "faqs": [
        {
          "question": "¿Se guarda el horario si cierro el navegador?",
          "answer": "Sí. Se almacena automáticamente en el almacenamiento local del navegador (localStorage) para futuras visitas."
        },
        {
          "question": "¿Se puede imprimir en papel A4 sin cortes?",
          "answer": "Sí. Los estilos de impresión específicos adaptan la cuadrícula para encajar en folios A4 u oficio."
        },
        {
          "question": "¿Los datos personales se suben a la nube?",
          "answer": "No. Toda la información se conserva estrictamente en su equipo."
        },
        {
          "question": "¿Cómo puedo empezar un horario desde cero?",
          "answer": "Haga clic en el botón Restablecer para vaciar las casillas y crear una nueva plantilla."
        }
      ]
    },
    "ja": {
      "formulaTitle": "時間枠ブロック配分およびレスポンシブグリッドスケジュール構造",
      "formulaDescription": "本タイムテーブル作成ツールは、ブラウザのメモリ上で7日間のレスポンシブグリッドに時間ブロックを展開。重複する時間枠の検証やカラータグ分けを行い、印刷用スタイル（@media print）へサーバー送信なしで即座に変換します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "表示形式の選択",
          "instruction": "平日5日間または全7日間の表示モードを選び、30分または1時間の枠刻みを設定します。"
        },
        {
          "stepNumber": 2,
          "title": "スケジュールの追加",
          "instruction": "空き枠をクリックして、科目名やタスク名、開始・終了時刻、場所を入力します。"
        },
        {
          "stepNumber": 3,
          "title": "カラータグ分け",
          "instruction": "授業、仕事、休憩、プライベートの各予定に視認性の高い配色を設定します。"
        },
        {
          "stepNumber": 4,
          "title": "印刷または保存",
          "instruction": "「印刷 / PDF」ボタンから、A4用紙に最適化された綺麗な時間割表を出力します。"
        }
      ],
      "workedExample": {
        "title": "大学講義と自習時間の週間時間割作成例",
        "scenario": "月曜から金曜の間に講義18時間と自習10時間をバランス良く配置する例。",
        "calculation": "平日5日間 × 1日8時間（9:00〜17:00）。講義を青、自習を緑、昼休みを黄色に色分け。",
        "result": "重複のない合計40時間の整然とした週間スケジュール表がA4印刷形式で完成。"
      },
      "faqs": [
        {
          "question": "ブラウザを閉じても作成した時間割は保持されますか？",
          "answer": "はい。ブラウザのローカルストレージ（localStorage）に自動保存されるため、同じ端末で再訪した際に復元されます。"
        },
        {
          "question": "A4用紙に枠切れせず綺麗に印刷できますか？",
          "answer": "はい。専用の印刷スタイルシート（@media print）が自動適用され、A4サイズの用紙幅に収まるよう自動調整されます。"
        },
        {
          "question": "予定や個人情報が外部サーバーに送信されますか？",
          "answer": "いいえ。すべてのスケジュールデータはお使いの端末内にのみ安全に保存されます。"
        },
        {
          "question": "時間割を初期化して最初から作り直せますか？",
          "answer": "はい。「リセット」ボタンをクリックすることで、登録枠をクリアして新規作成できます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Allocation de Créneaux Horaires et Grille de Planification Réactive",
      "formulaDescription": "Le planificateur organise les créneaux horaires sur une grille visuelle de 7 jours dans le navigateur. Il vérifie les chevauchements, attribue des codes couleur et génère des feuilles d'impression haute résolution sans serveur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choisir la vue",
          "instruction": "Sélectionnez le mode 5 jours ou 7 jours et réglez l'intervalle horaire."
        },
        {
          "stepNumber": 2,
          "title": "Ajouter des créneaux",
          "instruction": "Cliquez sur une case pour définir l'intitulé, les horaires et la salle."
        },
        {
          "stepNumber": 3,
          "title": "Appliquer des couleurs",
          "instruction": "Attribuez des couleurs distinctes par matière ou activité pour une lecture immédiate."
        },
        {
          "stepNumber": 4,
          "title": "Imprimer ou enregistrer",
          "instruction": "Cliquez sur Imprimer / PDF pour exporter votre emploi du temps."
        }
      ],
      "workedExample": {
        "title": "Exemple d'Emploi du Temps Universitaire",
        "scenario": "Organisation de 18 heures de cours et 10 heures d'étude du lundi au vendredi.",
        "calculation": "5 jours × 8 heures (09h00 à 17h00). Cours en bleu, travail personnel en vert, pauses en jaune.",
        "result": "Planning hebdomadaire de 40 heures parfaitement équilibré prêt pour l'impression A4."
      },
      "faqs": [
        {
          "question": "Mon emploi du temps est-il conservé si je quitte la page ?",
          "answer": "Oui. Les données sont sauvegardées dans le stockage local de votre navigateur (localStorage)."
        },
        {
          "question": "Peut-on imprimer en A4 sans que les colonnes soient tronquées ?",
          "answer": "Oui. La feuille de style d'impression adapte automatiquement la grille au format A4 portrait ou paysage."
        },
        {
          "question": "Mes données sont-elles envoyées sur un serveur ?",
          "answer": "Non. Vos activités restent 100 % confidentielles sur votre appareil."
        },
        {
          "question": "Comment réinitialiser le tableau ?",
          "answer": "Le bouton Réinitialiser permet d'effacer tous les créneaux en un clic pour repartir à zéro."
        }
      ]
    },
    "de": {
      "formulaTitle": "Zeitblock-Zuweisung & Responsive Raster-Terminplanungsarchitektur",
      "formulaDescription": "Der Terminplaner strukturiert Zeitblöcke über ein 7-Tage-Raster im Browser-Speicher. Er prüft Überschneidungen, vergibt Farbkategorien und exportiert druckfertige Formate ohne Serverdatenbank.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Rasteransicht wählen",
          "instruction": "Wählen Sie 5-Tage- oder 7-Tage-Woche und die gewünschte Zeiteinteilung."
        },
        {
          "stepNumber": 2,
          "title": "Aktivitäten eintragen",
          "instruction": "Klicken Sie in ein Feld, um Titel, Zeiten und Raumangaben zu hinterlegen."
        },
        {
          "stepNumber": 3,
          "title": "Farbkodierung nutzen",
          "instruction": "Heben Sie Kategorien wie Studium, Arbeit und Pausen farblich hervor."
        },
        {
          "stepNumber": 4,
          "title": "Drucken oder speichern",
          "instruction": "Klicken Sie auf Drucken / PDF für einen sauberen A4-Ausdruck."
        }
      ],
      "workedExample": {
        "title": "Beispiel für einen Uni-Wochenplan",
        "scenario": "Strukturierung von 18 Vorlesungsstunden und 10 Lernstunden von Montag bis Freitag.",
        "calculation": "5 Wochentage × 8 Stunden. Vorlesungen blau, Selbststudium grün, Pausen gelb.",
        "result": "Ausgewogener 40-Stunden-Plan ohne Zeitkonflikte im A4-Druckformat fertiggestellt."
      },
      "faqs": [
        {
          "question": "Bleibt der Plan beim Schließen des Browsers erhalten?",
          "answer": "Ja. Die Einträge werden automatisch im lokalen Browserspeicher (localStorage) gesichert."
        },
        {
          "question": "Lässt sich der Plan sauber auf A4 ausdrucken?",
          "answer": "Ja. Spezielle Druck-Stylesheets passen die Spalten exakt an das A4-Format an."
        },
        {
          "question": "Werden Termine auf externe Server übertragen?",
          "answer": "Nein. Alle Planungsdaten verbleiben ausschließlich auf Ihrem Rechner."
        },
        {
          "question": "Kann der Plan geleert werden?",
          "answer": "Ja. Über die Zurücksetzen-Funktion können Sie alle Felder mit einem Klick leeren."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Alocação de Blocos de Tempo e Agendamento em Grade Responsiva",
      "formulaDescription": "O criador de horários organiza blocos em uma grade de 7 dias na memória local do navegador. Detecta choques de horário, organiza categorias por cor e gera folhas de impressão em alta definição sem intermediários.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escolher formato",
          "instruction": "Selecione a visualização de 5 ou 7 dias e o intervalo de tempo desejado."
        },
        {
          "stepNumber": 2,
          "title": "Inserir atividades",
          "instruction": "Clique no horário para adicionar título, horários e local da tarefa."
        },
        {
          "stepNumber": 3,
          "title": "Personalizar cores",
          "instruction": "Diferencie aulas, reuniões e lazer com etiquetas coloridas de fácil leitura."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir ou salvar",
          "instruction": "Clique em Imprimir / PDF para obter uma folha pronta para colar na mesa."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Grade Horária Universitária",
        "scenario": "Organização de 18 horas de aulas e 10 horas de estudos de segunda a sexta-feira.",
        "calculation": "5 dias úteis × 8 horas diárias. Aulas em azul, estudos em verde e almoço em amarelo.",
        "result": "Semana de 40 horas estruturada e sem conflitos pronta para impressão em papel A4."
      },
      "faqs": [
        {
          "question": "Os dados continuam salvos ao fechar o navegador?",
          "answer": "Sim. A programação fica salva no armazenamento local do navegador (localStorage) para a próxima visita."
        },
        {
          "question": "Dá para imprimir em folha A4 sem cortar as bordas?",
          "answer": "Sim. O estilo de impressão ajusta automaticamente a tabela para folhas A4 e Carta."
        },
        {
          "question": "Meus compromissos vão para algum servidor?",
          "answer": "Não. Os horários ficam gravados apenas no seu próprio computador ou celular."
        },
        {
          "question": "Como limpar todos os horários?",
          "answer": "Basta clicar no botão Redefinir para limpar todos os horários e recomeçar."
        }
      ]
    },
    "ko": {
      "formulaTitle": "시간 블록 배분 및 반응형 그리드 스케줄링 구조",
      "formulaDescription": "본 시간표 플래너는 브라우저 메모리 내에서 7일간의 반응형 시각 격자에 시간 블록을 매핑합니다. 겹치는 일정을 자동 감지하고 카테고리별 색상 태그를 부여하며, 서버 통신 없이 인쇄용 고해상도 규격으로 즉시 렌더링합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "시간표 형식 선택",
          "instruction": "주 5일(월~금) 또는 주 7일(월~일) 모드를 고르고 30분 또는 1시간 단위 단위를 설정합니다."
        },
        {
          "stepNumber": 2,
          "title": "일정 블록 추가",
          "instruction": "빈 셀을 클릭하여 과목명이나 업무 제목, 시작/종료 시간, 장소를 입력합니다."
        },
        {
          "stepNumber": 3,
          "title": "색상 테마 지정",
          "instruction": "학습, 업무, 휴식 등 범주별로 색상을 지정하여 한눈에 파악할 수 있도록 정돈합니다."
        },
        {
          "stepNumber": 4,
          "title": "인쇄 및 저장",
          "instruction": "인쇄 / PDF 버튼을 눌러 A4 용지 규격에 최적화된 깔끔한 스케줄 시트를 출력합니다."
        }
      ],
      "workedExample": {
        "title": "대학생 주간 강의 및 자습 시간표 구성 실전 예시",
        "scenario": "월요일부터 금요일까지 전공 강의 18시간과 도서관 자습 10시간을 효율적으로 배치.",
        "calculation": "주 5일 × 일일 8시간 (09:00~17:00). 강의는 파란색, 자습은 초록색, 점심은 노란색으로 구분.",
        "result": "일정 충돌 없이 균형 잡힌 주 40시간 학업 스케줄이 A4 출력용으로 즉시 완성."
      },
      "faqs": [
        {
          "question": "브라우저를 닫아도 작성한 시간표가 유지되나요?",
          "answer": "네. 브라우저 로컬 스토리지(localStorage)에 실시간 자동 저장되어 재방문 시 언제든 다시 열람할 수 있습니다."
        },
        {
          "question": "A4 용지에 잘림 없이 깔끔하게 인쇄되나요?",
          "answer": "네. 전용 인쇄 스타일(@media print)이 적용되어 A4 표준 용지 규격에 맞춰 격자가 자동 축소/배치됩니다."
        },
        {
          "question": "개인 일정 데이터가 외부 서버로 전송되나요?",
          "answer": "아닙니다. 모든 시간표 데이터는 사용자 기기 내부 저장소에만 보관됩니다."
        },
        {
          "question": "시간표를 초기화하고 새로 만들 수 있나요?",
          "answer": "네. 초기화(Reset) 버튼을 클릭하면 등록된 모든 시간 블록을 한 번에 비우고 새로 시작할 수 있습니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Allocazione dei Blocchi Orari e Pianificazione a Griglia Reattiva",
      "formulaDescription": "Il creatore di orari mappa i blocchi temporali su una griglia visiva di 7 giorni nel browser. Rileva sovrapposizioni di orario, assegna categorie di colore ed esporta fogli stampabili ad alta risoluzione in locale.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scegliere la visualizzazione",
          "instruction": "Seleziona la modalità a 5 o 7 giorni e l'intervallo orario desiderato."
        },
        {
          "stepNumber": 2,
          "title": "Aggiungere le attività",
          "instruction": "Fai clic su uno spazio vuoto per inserire titolo, orari e luogo."
        },
        {
          "stepNumber": 3,
          "title": "Codifica a colori",
          "instruction": "Usa colori distinti per studio, lavoro e tempo libero per una rapida consultazione."
        },
        {
          "stepNumber": 4,
          "title": "Stampare o salvare",
          "instruction": "Fai clic su Stampa / PDF per esportare l'orario settimanale pronto su carta."
        }
      ],
      "workedExample": {
        "title": "Esempio di Orario Universitario Settimanale",
        "scenario": "Pianificazione di 18 ore di lezione e 10 ore di studio individuale da lunedì a venerdì.",
        "calculation": "5 giorni feriali × 8 ore. Lezioni in blu, studio in verde e pause pranzo in giallo.",
        "result": "Settimana accademica di 40 ore priva di sovrapposizioni pronta per la stampa A4."
      },
      "faqs": [
        {
          "question": "L'orario rimane salvato se chiudo la scheda?",
          "answer": "Sì. Viene memorizzato in automatico nel localStorage del browser per la prossima visita."
        },
        {
          "question": "Si può stampare su foglio A4 senza ritagliare le colonne?",
          "answer": "Sì. Le regole di stampa dedicate adattano la griglia al foglio A4 in verticale o orizzontale."
        },
        {
          "question": "I miei impegni vengono caricati su internet?",
          "answer": "No. Le informazioni restano confidenziali sul tuo dispositivo."
        },
        {
          "question": "Posso azzerare la tabella per ricominciare?",
          "answer": "Sì. Premi il pulsante di ripristino per cancellare tutte le caselle in un istante."
        }
      ]
    }
  },
  "cute-timetable-maker": {
    "en": {
      "formulaTitle": "Aesthetic Pastel Color Harmony & Visual Daily Routine Scheduling",
      "formulaDescription": "The cute timetable maker pairs gentle pastel HSL color palettes (rose, mint, lavender, cream) with emoji visual iconography directly in browser CSS. It constructs motivating daily habits and study intervals, providing soothing aesthetics for bullet journal planners without server dependency.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Select Pastel Theme",
          "instruction": "Choose from Cherry Blossom, Mint Lavender, Soft Peach, or Sky Blue aesthetic themes."
        },
        {
          "stepNumber": 2,
          "title": "Add Cute Activity Blocks",
          "instruction": "Input tasks, self-care routines, lectures, or reading sessions with matching emoji icons."
        },
        {
          "stepNumber": 3,
          "title": "Decorate with Stickers & Notes",
          "instruction": "Include motivational quotes, water intake reminders, and daily goals in dedicated side-notes."
        },
        {
          "stepNumber": 4,
          "title": "Print or Save Wallpaper",
          "instruction": "Export your adorable timetable as an A4 printable sheet or tablet lock-screen wallpaper."
        }
      ],
      "workedExample": {
        "title": "Pastel Study & Self-Care Routine Schedule",
        "scenario": "Designing a soothing weekly routine balancing study sessions with gentle self-care.",
        "calculation": "Theme: Soft Lavender (#E6E6FA) & Mint (#E0F2E9). Morning Yoga 07:30 🌿, Creative Study 09:00 🌸, Matcha Break 11:30 🍵.",
        "result": "Motivating aesthetic routine exported to printable A4 sheet with zero clashing colors."
      },
      "faqs": [
        {
          "question": "What makes pastel color schemes beneficial for studying?",
          "answer": "Soft, desaturated pastel tones reduce visual fatigue and screen glare, creating a calm mental environment that encourages longer focus and better task retention."
        },
        {
          "question": "Can I print cute timetables in color?",
          "answer": "Yes. The print styles preserve gentle pastel backgrounds and emoji glyphs for color inkjet and laser printers."
        },
        {
          "question": "Are my cute designs saved automatically?",
          "answer": "Yes. All text, colors, and stickers are saved in your browser's local storage."
        },
        {
          "question": "Does this tool work on tablets like iPad?",
          "answer": "Yes. The interface is optimized for touch interactions on iPads, Android tablets, and phones."
        }
      ]
    },
    "hi": {
      "formulaTitle": "एस्थेटिक पेस्टल रंग सामंजस्य और दृश्य दैनिक दिनचर्या शेड्यूलिंग संरचना",
      "formulaDescription": "यह क्यूट टाइमटेबल मेकर कोमल पेस्टल HSL रंगों (गुलाबी, मिंट, लैवेंडर, क्रीम) और इमोजी आइकन को सीधे ब्राउज़र CSS में जोड़ता है। यह बिना सर्वर पर निर्भर हुए अध्ययन और व्यक्तिगत दिनचर्या के लिए सुंदर और प्रेरणादायक टाइमटेबल बनाता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "पेस्टल थीम चुनें",
          "instruction": "चेरी ब्लॉसम, मिंट लैवेंडर या सॉफ्ट पीच में से अपनी पसंदीदा थीम चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "क्यूट एक्टिविटी ब्लॉक जोड़ें",
          "instruction": "सुंदर इमोजी के साथ पढ़ाई, ध्यान, रीडिंग या वॉक के स्लॉट जोड़ें।"
        },
        {
          "stepNumber": 3,
          "title": "नोट्स और लक्ष्य लिखें",
          "instruction": "प्रेरणादायक विचार और दैनिक पानी पीने के रिमाइंडर साइडबार में जोड़ें।"
        },
        {
          "stepNumber": 4,
          "title": "प्रिंट करें या वॉलपेपर बनाएं",
          "instruction": "प्यारे टाइमटेबल को A4 प्रिंट शीट या मोबाइल वॉलपेपर के रूप में डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "पेस्टल अध्ययन और सेल्फ-केयर रूटीन उदाहरण",
        "scenario": "पढ़ाई और मानसिक शांति के बीच संतुलन बनाने वाला सुंदर साप्ताहिक टाइमटेबल बनाना।",
        "calculation": "थीम: लैवेंडर व मिंट। योग 07:30 🌿, अध्ययन 09:00 🌸, टी-ब्रेक 11:30 🍵।",
        "result": "सॉफ्ट पेस्टल रंगों वाला सुंदर टाइमटेबल A4 प्रिंट के लिए तैयार।"
      },
      "faqs": [
        {
          "question": "पढ़ाई के लिए पेस्टल रंग क्यों फायदेमंद हैं?",
          "answer": "हल्के पेस्टल रंग आंखों की थकान और स्क्रीन की चमक को कम करते हैं, जिससे तनाव कम होता है और पढ़ाई में मन लगता है।"
        },
        {
          "question": "क्या इसे रंगीन प्रिंट किया जा सकता है?",
          "answer": "हाँ। प्रिंट लेआउट पेस्टल बैकग्राउंड और इमोजी रंगों को प्रिंटर के लिए सुरक्षित रखता है।"
        },
        {
          "question": "क्या मेरा टाइमटेबल अपने आप सेव होता है?",
          "answer": "हाँ। आपके सभी टेक्स्ट और रंग आपके डिवाइस के लोकल स्टोरेज में सेव रहते हैं।"
        },
        {
          "question": "क्या यह iPad या टैबलेट पर काम करता है?",
          "answer": "हाँ। यह टैबलेट और मोबाइल स्क्रीन पर टच फ्रेंडली तरीके से बहुत अच्छे से काम करता है।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Armonía de Colores Pastel y Planificación Estética de Rutinas",
      "formulaDescription": "El planificador estético combina suaves paletas de color pastel HSL (rosa, menta, lavanda) con emoticonos visuales en el navegador. Organiza hábitos diarios con diseño de diario creativo sin servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Elegir tema pastel",
          "instruction": "Seleccione entre Sakura, Menta Lavanda, Melocotón Suave o Azul Cielo."
        },
        {
          "stepNumber": 2,
          "title": "Añadir bloques con emojis",
          "instruction": "Incorpore sesiones de estudio, lecturas y descanso con iconos alegres."
        },
        {
          "stepNumber": 3,
          "title": "Incluir notas de ánimo",
          "instruction": "Añada metas del día y recordatorios de bienestar en el margen del horario."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir o guardar",
          "instruction": "Descargue su horario pastel listo para imprimir o para fondo de pantalla."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Rutina Pastel de Estudio y Bienestar",
        "scenario": "Crear una rutina relajante combinando horas de lectura y cuidado personal.",
        "calculation": "Tema: Lavanda y Menta. Yoga matinal 07:30 🌿, Estudio 09:00 🌸, Té matcha 11:30 🍵.",
        "result": "Horario estético y equilibrado listo para imprimir o compartir."
      },
      "faqs": [
        {
          "question": "¿Por qué los tonos pastel ayudan a estudiar?",
          "answer": "Los colores pastel reducen el cansancio visual y la sobreestimulación, favoreciendo la concentración."
        },
        {
          "question": "¿Se imprime bien en impresoras a color?",
          "answer": "Sí. Los estilos conservan los fondos suaves y los iconos listos para impresión."
        },
        {
          "question": "¿Se guarda automáticamente el diseño?",
          "answer": "Sí. Toda la información queda almacenada en la memoria local de su navegador."
        },
        {
          "question": "¿Funciona en tabletas táctiles?",
          "answer": "Sí. Está totalmente optimizado para iPad y tabletas Android."
        }
      ]
    },
    "ja": {
      "formulaTitle": "パステルカラー調和理論およびビジュアル日課スケジューリング構造",
      "formulaDescription": "本ツールは、淡く優しいパステル調のHSL配色（サクラ、ミント、ラベンダー）と絵文字アイコンをブラウザCSS上で融合。勉強や自分磨きのルーティンを、サーバー不要で心地よいデザインの時間割として作成できます。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "パステルテーマの選択",
          "instruction": "サクラピンク、ミントラベンダー、ピーチ、スカイブルーなど好みの可愛いテーマを選びます。"
        },
        {
          "stepNumber": 2,
          "title": "絵文字付きブロックの配置",
          "instruction": "読書、勉強、カフェタイム、スキンケアなどの日課を絵文字と共に入力します。"
        },
        {
          "stepNumber": 3,
          "title": "目標やメモの追加",
          "instruction": "今週の目標や自分へのメッセージ、水分補給チェックをメモ欄に記載します。"
        },
        {
          "stepNumber": 4,
          "title": "印刷または壁紙保存",
          "instruction": "可愛い時間割表をA4用紙に印刷するか、タブレットの壁紙として保存します。"
        }
      ],
      "workedExample": {
        "title": "パステル調の勉強＆自分磨きルーティン時間割実例",
        "scenario": "集中できる勉強時間と心落ち着くセルフケアを両立した週間時間割を作成する例。",
        "calculation": "配色テーマ: ラベンダー＆ミント。朝ヨガ 07:30 🌿、集中学習 09:00 🌸、お茶休憩 11:30 🍵。",
        "result": "目に優しくモチベーションが上がるA4対応の可愛いスケジュールシートが完成。"
      },
      "faqs": [
        {
          "question": "パステルカラーが学習計画に適している理由は何ですか？",
          "answer": "彩度を抑えたパステルカラーは目の疲労や画面の眩しさを軽減し、リラックスした状態で集中力を長く維持できる心理効果があります。"
        },
        {
          "question": "カラープリンターで綺麗に印刷できますか？",
          "answer": "はい。淡い背景色と絵文字アイコンが用紙上に鮮明に再現されるよう印刷CSSが調整されています。"
        },
        {
          "question": "デザインは自動的に保存されますか？",
          "answer": "はい。設定した配色やテキストはお使いのブラウザ内に自動保存されます。"
        },
        {
          "question": "iPadなどのタブレットでも快適に使えますか？",
          "answer": "はい。タッチ操作に最適化されており、iPadやスマートフォンでも直感的に編集できます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Harmonie de Couleurs Pastel et Planification Visuelle de Routine",
      "formulaDescription": "Ce planificateur associe des palettes pastel douces (rose poudré, menthe, lavande) et des icônes emojis directement dans le navigateur, créant des routines motivantes sans serveur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choisir le thème pastel",
          "instruction": "Optez pour Fleur de cerisier, Menthe lavande ou Pêche douce."
        },
        {
          "stepNumber": 2,
          "title": "Ajouter les activités",
          "instruction": "Intégrez vos créneaux d'étude et de détente avec des emojis adaptés."
        },
        {
          "stepNumber": 3,
          "title": "Personnaliser les notes",
          "instruction": "Ajoutez des citations motivantes et rappels de bien-être sur le côté."
        },
        {
          "stepNumber": 4,
          "title": "Imprimer ou télécharger",
          "instruction": "Exportez votre planning esthétique au format A4 ou image fond d'écran."
        }
      ],
      "workedExample": {
        "title": "Exemple de Routine Pastel Étude et Bien-Être",
        "scenario": "Création d'un planning doux équilibrant révisions et moments pour soi.",
        "calculation": "Thème : Lavande et Menthe. Yoga 07h30 🌿, Révisions 09h00 🌸, Pause thé 11h30 🍵.",
        "result": "Emploi du temps inspirant exportable en haute définition."
      },
      "faqs": [
        {
          "question": "Pourquoi privilégier les tons pastel pour l'étude ?",
          "answer": "Les teintes pastel douces diminuent la fatigue oculaire et créent une ambiance propice à la sérénité et à la mémorisation."
        },
        {
          "question": "L'impression couleur est-elle fidèle ?",
          "answer": "Oui. Les styles d'impression préservent les nuances pastel et les émojis."
        },
        {
          "question": "Mes créations sont-elles sauvegardées ?",
          "answer": "Oui. Tout est conservé dans le stockage local de votre navigateur."
        },
        {
          "question": "L'outil est-il adapté aux tablettes ?",
          "answer": "Oui. L'interface réagit parfaitement aux écrans tactiles iPad et Android."
        }
      ]
    },
    "de": {
      "formulaTitle": "Ästhetische Pastell-Farbharmonie & Visuelle Routine-Planung",
      "formulaDescription": "Der ästhetische Planer kombiniert sanfte Pastellfarben (Rosa, Minze, Lavendel) mit Emojis im Browser. Er strukturiert Alltagsroutinen im Bullet-Journal-Stil ohne Serververbindung.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Pastell-Design wählen",
          "instruction": "Wählen Sie Kirschblüte, Minze-Lavendel oder zartes Pfirsich."
        },
        {
          "stepNumber": 2,
          "title": "Blöcke mit Emojis anlegen",
          "instruction": "Tragen Sie Lernzeiten, Entspannung und Hobbys mit niedlichen Emojis ein."
        },
        {
          "stepNumber": 3,
          "title": "Notizen & Ziele ergänzen",
          "instruction": "Fügen Sie tägliche Erinnerungen und motivierende Notizen hinzu."
        },
        {
          "stepNumber": 4,
          "title": "Drucken oder als Wallpaper sichern",
          "instruction": "Laden Sie den Planer für den Druck oder als Bildschirmhintergrund herunter."
        }
      ],
      "workedExample": {
        "title": "Beispiel für einen sanften Lern- und Wohlfühlplan",
        "scenario": "Gestaltung einer harmonischen Woche mit Lernzeiten und Achtsamkeitsphasen.",
        "calculation": "Farben: Lavendel & Minze. Morgen-Yoga 07:30 🌿, Lernen 09:00 🌸, Teepause 11:30 🍵.",
        "result": "Ästhetischer A4-Planer für mehr Motivation im Alltag."
      },
      "faqs": [
        {
          "question": "Warum sind Pastelltöne beim Lernen hilfreich?",
          "answer": "Sanfte Pastellfarben schonen die Augen, mindern Stress und fördern die Konzentration."
        },
        {
          "question": "Funktioniert der Farbdruck einwandfrei?",
          "answer": "Ja. Die Druckansicht stellt zarte Hintergrundfarben und Symbole originalgetreu dar."
        },
        {
          "question": "Wird der Plan automatisch gesichert?",
          "answer": "Ja. Alle Angaben bleiben im lokalen Browserspeicher erhalten."
        },
        {
          "question": "Ist die Nutzung auf Tablets möglich?",
          "answer": "Ja. Das Design ist für Touchbedienung auf Tablets und Smartphones optimiert."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Harmonia de Cores Pastel e Planejamento Visual de Rotinas",
      "formulaDescription": "O planejador estético une tons pastéis suaves (rosa, menta, lavanda) com emojis na interface do navegador. Organiza rotinas de estudo e hábitos pessoais com design acolhedor sem servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escolher tema pastel",
          "instruction": "Selecione Cerejeira, Menta Lavanda ou Pêssego Suave."
        },
        {
          "stepNumber": 2,
          "title": "Adicionar blocos fofos",
          "instruction": "Insira estudos, pausas para café e leituras com emojis ilustrativos."
        },
        {
          "stepNumber": 3,
          "title": "Adicionar metas diárias",
          "instruction": "Escreva frases motivadoras e lembretes de autocuidado nas notas."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir ou salvar",
          "instruction": "Baixe sua grade fofa para imprimir ou usar como papel de parede."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Rotina Pastel de Estudos e Bem-Estar",
        "scenario": "Montagem de uma rotina suave unindo foco acadêmico e autocuidado.",
        "calculation": "Tema: Lavanda e Menta. Yoga 07:30 🌿, Estudo 09:00 🌸, Chá 11:30 🍵.",
        "result": "Grade estética harmoniosa pronta para imprimir e colar na parede."
      },
      "faqs": [
        {
          "question": "Por que tons pastel são benéficos para os estudos?",
          "answer": "Cores suaves cansam menos a visão e reduzem o estresse, melhorando a assimilação dos conteúdos."
        },
        {
          "question": "A impressão sai bonita em cores?",
          "answer": "Sim. Os estilos preservam os fundos delicados e os desenhos dos emojis na folha."
        },
        {
          "question": "Meu horário fica salvo sozinho?",
          "answer": "Sim. Os dados ficam gravados no armazenamento do seu próprio navegador."
        },
        {
          "question": "Funciona bem em iPads e tablets?",
          "answer": "Sim. Totalmente responsivo para comandos por toque na tela."
        }
      ]
    },
    "ko": {
      "formulaTitle": "파스텔 컬러 하모니 및 비주얼 일과 루틴 스케줄링 구조",
      "formulaDescription": "본 큐트 시간표 제작기는 부드러운 파스텔 HSL 색상(로즈, 민트, 라벤더, 크림)과 이모지 시각 기호를 브라우저 CSS에서 조화롭게 구성합니다. 서버 통신 없이 다이어리 꾸미기 감성의 예쁜 시간표를 완성할 수 있습니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "파스텔 테마 선택",
          "instruction": "벚꽃 핑크, 민트 라벤더, 소프트 피치, 스카이 블루 등 감성 테마를 지정합니다."
        },
        {
          "stepNumber": 2,
          "title": "귀여운 이모지 일정 등록",
          "instruction": "공부, 독서, 티타임, 운동 일정을 귀여운 이모지와 함께 등록합니다."
        },
        {
          "stepNumber": 3,
          "title": "다이어리 메모 추가",
          "instruction": "오늘의 다짐, 수분 섭취 체크리스트, 목표 문구를 사이드 노트에 기록합니다."
        },
        {
          "stepNumber": 4,
          "title": "출력 또는 배경화면 저장",
          "instruction": "완성된 예쁜 시간표를 A4로 출력하거나 태블릿 배경화면 이미지로 저장합니다."
        }
      ],
      "workedExample": {
        "title": "파스텔톤 학업 및 힐링 루틴 시간표 실전 예시",
        "scenario": "부담 없는 학습 시간과 기분 좋은 셀프케어를 결합한 주간 루틴 기획.",
        "calculation": "테마: 소프트 라벤더 & 민트. 모닝 요가 07:30 🌿, 집중 공부 09:00 🌸, 티 타임 11:30 🍵.",
        "result": "공부 의욕을 높여주는 다이어리 감성의 A4 맞춤형 예쁜 시간표 완성."
      },
      "faqs": [
        {
          "question": "파스텔 배색이 공부 계획표에 좋은 이유는 무엇인가요?",
          "answer": "채도가 부드러운 파스텔 톤은 눈의 피로와 시각적 자극을 줄여주어 차분하고 편안한 마음으로 학업에 몰입할 수 있도록 돕습니다."
        },
        {
          "question": "컬러 프린터로 예쁘게 출력되나요?",
          "answer": "네. 은은한 파스텔 배경색과 이모지가 용지에 깔끔하게 인쇄되도록 전용 프린트 CSS가 적용되어 있습니다."
        },
        {
          "question": "작성한 내용이 자동으로 저장되나요?",
          "answer": "네. 브라우저 로컬 저장소에 실시간 보관되므로 언제든 다시 확인하고 수정할 수 있습니다."
        },
        {
          "question": "아이패드 등 태블릿에서도 편리하게 쓸 수 있나요?",
          "answer": "네. 터치 인터페이스에 맞춰 반응형으로 설계되어 태블릿이나 스마트폰에서도 손쉽게 다룰 수 있습니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Armonia dei Colori Pastello e Pianificazione Visiva della Routine",
      "formulaDescription": "Questo pianificatore abbina rilassanti tonalità pastello (rosa, menta, lavanda) a simpatiche emoji nel browser. Organizza le abitudini quotidiane in stile bullet journal senza server remoti.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scegliere il tema pastello",
          "instruction": "Seleziona tra Ciliegio, Menta Lavanda, Pesca o Celeste."
        },
        {
          "stepNumber": 2,
          "title": "Aggiungere le attività con emoji",
          "instruction": "Inserisci studio, cura personale e relax con simpatiche icone."
        },
        {
          "stepNumber": 3,
          "title": "Personalizzare le note",
          "instruction": "Aggiungi frasi motivazionali e promemoria quotidiani nei riquadri."
        },
        {
          "stepNumber": 4,
          "title": "Stampare o salvare",
          "instruction": "Esporta l'orario da stampare o da usare come sfondo per il tablet."
        }
      ],
      "workedExample": {
        "title": "Esempio di Routine Pastello Studio e Benessere",
        "scenario": "Creazione di un piano settimanale che unisce studio e relax.",
        "calculation": "Tema: Lavanda e Menta. Yoga 07:30 🌿, Studio 09:00 🌸, Pausa tè 11:30 🍵.",
        "result": "Orario grazioso e ordinato pronto da stampare su foglio A4."
      },
      "faqs": [
        {
          "question": "Perché i colori pastello favoriscono lo studio?",
          "answer": "I toni pastello riducono l'affaticamento visivo e favoriscono la calma mentale e la concentrazione."
        },
        {
          "question": "La stampa a colori risulta fedele?",
          "answer": "Sì. La grafica è ottimizzata per riprodurre fedelmente sfondi delicati ed emoji."
        },
        {
          "question": "Le modifiche si salvano in automatico?",
          "answer": "Sì. Tutti i dati restano nel browser locale del dispositivo."
        },
        {
          "question": "Funziona bene su iPad e tablet?",
          "answer": "Sì. L'interfaccia supporta al meglio i comandi touch di tablet e smartphone."
        }
      ]
    }
  },
  "study-timetable-maker": {
    "en": {
      "formulaTitle": "Spaced Repetition & Pomodoro Academic Interval Scheduling Architecture",
      "formulaDescription": "The study timetable maker applies cognitive learning principles (Pomodoro 25/5 or 50/10 intervals and Hermann Ebbinghaus spaced review curves) directly within a weekly schedule grid. It tracks subject workload balances and revision slots client-side with zero remote database dependencies.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "List Academic Subjects",
          "instruction": "Enter all your courses (Math, Physics, History, Literature) with weekly target hours."
        },
        {
          "stepNumber": 2,
          "title": "Apply Pomodoro Intervals",
          "instruction": "Divide study blocks into 25-minute or 50-minute focused sessions followed by short rest breaks."
        },
        {
          "stepNumber": 3,
          "title": "Schedule Spaced Revisions",
          "instruction": "Place dedicated review sessions 1 day, 3 days, and 7 days after primary lecture blocks."
        },
        {
          "stepNumber": 4,
          "title": "Print Study Plan",
          "instruction": "Generate an ink-friendly printout to post on your study desk for daily accountability."
        }
      ],
      "workedExample": {
        "title": "Final Exam Preparation Schedule",
        "scenario": "Preparing for 3 comprehensive university exams across a 4-week study period.",
        "calculation": "24 weekly study hours: 10h Calculus, 8h Physics, 6h Organic Chemistry. 4 Pomodoro cycles/day with 15-min recovery intervals.",
        "result": "Rigorous yet sustainable study schedule balancing intense technical problem solving with rest breaks."
      },
      "faqs": [
        {
          "question": "Why is the Pomodoro technique recommended for exam preparation?",
          "answer": "Studying in focused 25-minute or 50-minute bursts followed by 5-to-10-minute mental resets prevents dopamine depletion, curbs procrastination, and maintains peak alertness."
        },
        {
          "question": "How does spaced repetition fit into a weekly timetable?",
          "answer": "Rather than cramming a single topic once, you schedule smaller review blocks at staggered intervals across Monday, Wednesday, and Saturday to shift facts into long-term memory."
        },
        {
          "question": "Can I color-code different subjects?",
          "answer": "Yes. You can assign unique visual colors to each course for immediate recognition."
        },
        {
          "question": "Is my study plan saved locally?",
          "answer": "Yes. All timetable data is stored in your device's local storage."
        }
      ]
    },
    "hi": {
      "formulaTitle": "स्पेस्ड रिपीटीशन और पोमोडोरो अकादमिक अंतराल शेड्यूलिंग संरचना",
      "formulaDescription": "यह अध्ययन टाइमटेबल मेकर संज्ञानात्मक सीखने के सिद्धांतों (पोमोडोरो 25/5 या 50/10 अंतराल और एबिंगहॉस दोहराव वक्र) को सीधे साप्ताहिक ग्रिड में लागू करता है। यह बिना किसी सर्वर के विषयों के अध्ययन घंटों का सही संतुलन बनाता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "अध्ययन विषय दर्ज करें",
          "instruction": "अपने सभी विषय (गणित, विज्ञान, इतिहास) और उनके साप्ताहिक घंटे दर्ज करें।"
        },
        {
          "stepNumber": 2,
          "title": "पोमोडोरो अंतराल लगाएं",
          "instruction": "अध्ययन को 25 या 50 मिनट के सत्रों में बांटें और बीच में 5-10 मिनट का ब्रेक रखें।"
        },
        {
          "stepNumber": 3,
          "title": "रिवीजन स्लॉट तय करें",
          "instruction": "पढ़े गए पाठों को 1 दिन, 3 दिन और 7 दिन बाद दोहराने के लिए स्लॉट जोड़ें।"
        },
        {
          "stepNumber": 4,
          "title": "स्टडी प्लान प्रिंट करें",
          "instruction": "स्टडी टेबल पर लगाने के लिए साफ प्रिंटआउट निकालें।"
        }
      ],
      "workedExample": {
        "title": "वार्षिक परीक्षा तैयारी समय सारिणी उदाहरण",
        "scenario": "3 प्रमुख विषयों के लिए 4 सप्ताह की गहन तैयारी का टाइमटेबल बनाना।",
        "calculation": "24 साप्ताहिक घंटे: 10 घंटे गणित, 8 घंटे भौतिकी, 6 घंटे रसायन विज्ञान। प्रतिदिन 4 पोमोडोरो चक्र।",
        "result": "बिना मानसिक तनाव के परीक्षा की तैयारी के लिए संतुलित और प्रभावी योजना तैयार।"
      },
      "faqs": [
        {
          "question": "परीक्षा की तैयारी के लिए पोमोडोरो तकनीक क्यों उपयोगी है?",
          "answer": "25 या 50 मिनट के छोटे सत्रों में पढ़ने और बीच में 5 मिनट का ब्रेक लेने से दिमाग थकता नहीं है और ध्यान केंद्रित रहता है।"
        },
        {
          "question": "टाइमटेबल में स्पेस्ड रिपीटीशन कैसे काम करता है?",
          "answer": "एक ही दिन सब कुछ रटने के बजाय, उसी विषय को 2-3 दिन बाद दोबारा दोहराने से जानकारी स्थायी याददाश्त में बदल जाती है।"
        },
        {
          "question": "क्या विषयों को अलग-अलग रंगों में बांट सकते हैं?",
          "answer": "हाँ। प्रत्येक विषय के लिए अलग रंग सेट किया जा सकता है।"
        },
        {
          "question": "क्या मेरा डेटा डिवाइस में सेव रहता है?",
          "answer": "हाँ। टाइमटेबल पूरी तरह से आपके ब्राउज़र स्टोरेज में सुरक्षित रहता है।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Programación de Intervalos Académicos Pomodoro y Repetición Espaciada",
      "formulaDescription": "El creador de horarios de estudio aplica técnicas de aprendizaje cognitivo (intervalos Pomodoro y curvas de repaso espaciado) en una cuadrícula semanal sin depender de servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Listar asignaturas",
          "instruction": "Indique sus materias y las horas semanales necesarias para cada una."
        },
        {
          "stepNumber": 2,
          "title": "Aplicar bloques Pomodoro",
          "instruction": "Divida el estudio en bloques de 25 o 50 minutos con descansos breves."
        },
        {
          "stepNumber": 3,
          "title": "Programar repasos espaciados",
          "instruction": "Reserve sesiones de repaso a los 1, 3 y 7 días de cada tema."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir plan de estudio",
          "instruction": "Obtenga una copia impresa clara para colocar en su escritorio."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Preparación para Exámenes Finales",
        "scenario": "Organizar el estudio de 3 asignaturas universitarias en 4 semanas.",
        "calculation": "24 horas semanales: 10 h Cálculo, 8 h Física, 6 h Química con ciclos Pomodoro diarios.",
        "result": "Plan de estudio riguroso y sostenible sin riesgo de agotamiento mental."
      },
      "faqs": [
        {
          "question": "¿Por qué la técnica Pomodoro mejora el rendimiento?",
          "answer": "Estudiar en bloques de 25 o 50 minutos con breves pausas evita el agotamiento mental y combate la procrastinación."
        },
        {
          "question": "¿Cómo aplicar la repetición espaciada?",
          "answer": "En lugar de estudiar un tema una sola vez, programe revisiones breves a lo largo de la semana para consolidar la memoria a largo plazo."
        },
        {
          "question": "¿Se pueden asignar colores por asignatura?",
          "answer": "Sí. Puede personalizar cada materia con un color distintivo."
        },
        {
          "question": "¿Queda guardado el horario en mi dispositivo?",
          "answer": "Sí. Todos los datos se conservan en la memoria local del navegador."
        }
      ]
    },
    "ja": {
      "formulaTitle": "分散学習（間隔反復）およびポモドーロ学習配分スケジューリング構造",
      "formulaDescription": "本学習時間割ツールは、ポモドーロ時間配分（25分集中/5分休憩等）やエビングハウスの忘却曲線に基づく復習サイクルをブラウザ上で視覚化。教科ごとの偏りを防ぎ、効率的な受験勉強・試験対策スケジュールを構築します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "学習科目の登録",
          "instruction": "数学、物理、英語など学習が必要な科目と目標時間を設定します。"
        },
        {
          "stepNumber": 2,
          "title": "ポモドーロ時間枠の設定",
          "instruction": "25分または50分の集中セッションと5〜10分の小休憩を交互に配置します。"
        },
        {
          "stepNumber": 3,
          "title": "復習サイクルの確保",
          "instruction": "新規インプットの翌日、3日後、7日後に復習枠を組み込み定着率を高めます。"
        },
        {
          "stepNumber": 4,
          "title": "学習計画表の印刷",
          "instruction": "勉強机に貼るための見やすいA4時間割表を印刷出力します。"
        }
      ],
      "workedExample": {
        "title": "大学定期試験に向けた直前学習時間割の実例",
        "scenario": "4週間の試験期間中に重要3科目を万全に仕上げるためのスケジュール例。",
        "calculation": "週間24時間学習: 微積分10時間、物理8時間、化学6時間。1日4回のポモドーロ集中サイクル。",
        "result": "疲労を蓄積させずに高い知識定着率を維持できる持続可能な学習計画が完成。"
      },
      "faqs": [
        {
          "question": "ポモドーロテクニックが試験勉強に効果的な理由は何ですか？",
          "answer": "25分または50分の集中と適度な小休憩を挟むことで、脳の集中力低下や先延ばしを防ぎ、高い学習効率を持続できるためです。"
        },
        {
          "question": "分散学習（間隔反復）はどのようにスケジュールへ組み込みますか？",
          "answer": "一度に長時間の詰め込みを行うのではなく、数日おきに短い復習スロットを設けることで、知識を長期記憶へと定着させます。"
        },
        {
          "question": "科目ごとに色分けできますか？",
          "answer": "はい。教科ごとに異なる色を設定して視覚的に整理できます。"
        },
        {
          "question": "作成した計画はブラウザに保存されますか？",
          "answer": "はい。端末内のローカルストレージに自動保存されます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Planification d'Intervalles d'Étude Pomodoro et Répétition Espacée",
      "formulaDescription": "Ce planificateur intègre les techniques d'apprentissage éprouvées (cycles Pomodoro et révisions espacées) dans une grille hebdomadaire gérée localement dans le navigateur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Lister les matières",
          "instruction": "Indiquez vos cours et le volume horaire hebdomadaire ciblé."
        },
        {
          "stepNumber": 2,
          "title": "Définir les sessions Pomodoro",
          "instruction": "Alternez des périodes d'étude de 25 ou 50 minutes avec de courtes pauses."
        },
        {
          "stepNumber": 3,
          "title": "Planifier les révisions",
          "instruction": "Prévoyez des séances de révision à J+1, J+3 et J+7."
        },
        {
          "stepNumber": 4,
          "title": "Imprimer le planning",
          "instruction": "Téléchargez une version imprimable à afficher au-dessus de votre bureau."
        }
      ],
      "workedExample": {
        "title": "Exemple de Révision pour Examens Finaux",
        "scenario": "Préparation intensive de 3 examens universitaires sur 4 semaines.",
        "calculation": "24 heures par semaine : 10h Mathématiques, 8h Physique, 6h Chimie avec méthode Pomodoro.",
        "result": "Programme structuré garantissant une assimilation approfondie sans surmenage."
      },
      "faqs": [
        {
          "question": "Pourquoi la méthode Pomodoro est-elle recommandée ?",
          "answer": "Travailler par blocs de 25 ou 50 minutes entrecoupés de courtes pauses évite la fatigue cérébrale et renforce la concentration."
        },
        {
          "question": "Comment fonctionne la répétition espacée dans le planning ?",
          "answer": "En espaçant les rappels de cours sur plusieurs jours, vous ancrez durablement les notions dans votre mémoire à long terme."
        },
        {
          "question": "Peut-on colorer chaque matière ?",
          "answer": "Oui. Chaque discipline peut avoir sa propre couleur d'identification."
        },
        {
          "question": "Le planning est-il enregistré localement ?",
          "answer": "Oui. Tout est conservé dans le stockage de votre navigateur."
        }
      ]
    },
    "de": {
      "formulaTitle": "Intervall-Lernplanung mit Pomodoro & Spaced Repetition Architektur",
      "formulaDescription": "Der Studienplaner setzt auf kognitive Lernprinzipien wie Pomodoro-Intervalle und Wiederholungskurven im Wochenraster – komplett lokal im Browser ohne Serverabhängigkeit.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Fächer eintragen",
          "instruction": "Geben Sie Ihre Studienfächer und das geplante Wochenpensum ein."
        },
        {
          "stepNumber": 2,
          "title": "Pomodoro-Zeiten nutzen",
          "instruction": "Teilen Sie die Einheiten in 25- oder 50-Minuten-Phasen mit Pausen ein."
        },
        {
          "stepNumber": 3,
          "title": "Wiederholungen einplanen",
          "instruction": "Setzen Sie feste Wiederholungsblöcke nach 1, 3 und 7 Tagen an."
        },
        {
          "stepNumber": 4,
          "title": "Lernplan ausdrucken",
          "instruction": "Drucken Sie Ihren fertigen Plan für Ihren Schreibtisch aus."
        }
      ],
      "workedExample": {
        "title": "Beispiel für Klausurvorbereitung",
        "scenario": "Vorbereitung auf 3 Hochschulprüfungen über einen 4-Wochen-Zeitraum.",
        "calculation": "24 Wochenstunden: 10h Mathe, 8h Physik, 6h Chemie, aufgeteilt in Pomodoro-Blöcke.",
        "result": "Strukturierter Lernplan mit optimalem Gleichgewicht aus Tiefe und Erholung."
      },
      "faqs": [
        {
          "question": "Warum hilft die Pomodoro-Methode bei der Prüfungsvorbereitung?",
          "answer": "Fokussierte 25- oder 50-Minuten-Intervalle verhindern Ermüdungserscheinungen und steigern die Produktivität."
        },
        {
          "question": "Wie funktioniert Spaced Repetition im Wochenplan?",
          "answer": "Durch gezielte Wiederholungen im Abstand mehrerer Tage wandern Lerninhalte sicher ins Langzeitgedächtnis."
        },
        {
          "question": "Können Fächer farblich markiert werden?",
          "answer": "Ja. Jedes Fach kann mit einer individuellen Farbe versehen werden."
        },
        {
          "question": "Bleiben die Daten lokal gespeichert?",
          "answer": "Ja. Alle Angaben liegen im Browserspeicher Ihres Geräts."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Programação de Intervalos de Estudo Pomodoro e Repetição Espaçada",
      "formulaDescription": "O planejador de estudos utiliza métodos cognitivos (ciclos Pomodoro e curvas de repetição espaçada) em uma grade semanal para equilibrar matérias sem servidores na nuvem.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Listar disciplinas",
          "instruction": "Adicione suas matérias de estudo e a meta semanal de horas."
        },
        {
          "stepNumber": 2,
          "title": "Criar blocos Pomodoro",
          "instruction": "Alterne sessões de foco de 25 ou 50 minutos com intervalos curtos."
        },
        {
          "stepNumber": 3,
          "title": "Agendar revisões espaçadas",
          "instruction": "Defina revisões periódicas 1, 3 e 7 dias após o primeiro contato."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir rotina de estudos",
          "instruction": "Imprima a folha de acompanhamento para afixar na mesa de estudos."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Cronograma para Provas Finais",
        "scenario": "Revisão intensiva de 3 matérias universitárias ao longo de 4 semanas.",
        "calculation": "24 horas semanais: 10h Cálculo, 8h Física, 6h Química com técnica Pomodoro diária.",
        "result": "Rotina de estudos produtiva e sustentável pronta para execução diária."
      },
      "faqs": [
        {
          "question": "Por que o método Pomodoro é recomendado para concursos e provas?",
          "answer": "Estudar em ciclos de 25 ou 50 minutos com pausas regulares mantém o foco e diminui o cansaço mental."
        },
        {
          "question": "Como aplicar a repetição espaçada na grade semanal?",
          "answer": "Distribuindo pequenos blocos de revisão ao longo dos dias para consolidar o conteúdo na memória de longo prazo."
        },
        {
          "question": "Dá para colorir as disciplinas de forma diferente?",
          "answer": "Sim. Cada matéria pode receber uma cor personalizada."
        },
        {
          "question": "O cronograma fica gravado no meu aparelho?",
          "answer": "Sim. Os dados são salvos no armazenamento local do navegador."
        }
      ]
    },
    "ko": {
      "formulaTitle": "간격 반복 학습 및 뽀모도로 학업 블록 스케줄링 구조",
      "formulaDescription": "본 스터디 시간표 플래너는 뽀모도로(25분 공부/5분 휴식) 집중 주기와 에빙하우스 망각 곡선에 기반한 주기적 복습 타임라인을 주간 그리드에 매핑합니다. 과목별 학습량 편차를 방지하고 최적의 시험 대비 일정을 로컬에서 완성합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "학습 과목 및 목표 시간 등록",
          "instruction": "수학, 영어, 전공 서적 등 학습 대상 과목과 주간 목표 공부 시간을 설정합니다."
        },
        {
          "stepNumber": 2,
          "title": "뽀모도로 집중 주기 적용",
          "instruction": "25분 또는 50분 집중 공부와 5~10분 휴식 주기를 교대로 배치합니다."
        },
        {
          "stepNumber": 3,
          "title": "망각 방지 누적 복습 일정 배분",
          "instruction": "처음 배운 날로부터 1일 후, 3일 후, 7일 후에 복습 블록을 지정합니다."
        },
        {
          "stepNumber": 4,
          "title": "스터디 플랜 출력",
          "instruction": "독서실이나 공부 책상에 붙여둘 수 있는 깔끔한 A4 플래너를 인쇄합니다."
        }
      ],
      "workedExample": {
        "title": "대학 기말고사 시험 대비 집중 학습 시간표 실전 예시",
        "scenario": "4주간 3개 핵심 과목 시험을 완벽하게 대비하기 위한 주간 시간표.",
        "calculation": "주간 24시간: 미적분 10시간, 물리학 8시간, 유기화학 6시간. 일일 4세트 뽀모도로 루틴 적용.",
        "result": "번아웃 없이 높은 암기 유지율을 보장하는 지속 가능한 학습 계획 완성."
      },
      "faqs": [
        {
          "question": "뽀모도로 기법이 수험 공부에 효과적인 이유는 무엇인가요?",
          "answer": "25분 또는 50분 단위의 몰입 후 5~10분의 뇌 휴식을 부여함으로써 집중력 저하와 미루는 습관을 예방하고 학습 효율을 극대화하기 때문입니다."
        },
        {
          "question": "망각 방지 누적 복습을 시간표에 어떻게 적용하나요?",
          "answer": "한 번에 몰아서 공부하기보다, 며칠 간격으로 짧은 복습 블록을 주중에 고르게 분산 배치하여 장기 기억으로 전환시킵니다."
        },
        {
          "question": "과목별로 색상을 다르게 지정할 수 있나요?",
          "answer": "네. 과목별로 뚜렷한 색상 태그를 지정하여 시각적으로 쉽게 구별할 수 있습니다."
        },
        {
          "question": "학습 계획표가 로컬에 안전하게 저장되나요?",
          "answer": "네. 브라우저 내부 로컬 스토리지에 자동 저장되므로 언제든 다시 열어볼 수 있습니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Pianificazione degli Intervalli di Studio Pomodoro e Ripetizione Dilazionata",
      "formulaDescription": "Il pianificatore di studio applica principi cognitivi (tecnica Pomodoro e curve di revisione distanziata) su una griglia settimanale gestita interamente nel browser.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Inserire le materie",
          "instruction": "Elenca gli esami da preparare con il monte ore settimanale previsto."
        },
        {
          "stepNumber": 2,
          "title": "Impostare i blocchi Pomodoro",
          "instruction": "Alterna sessioni di studio di 25 o 50 minuti a pause brevi."
        },
        {
          "stepNumber": 3,
          "title": "Pianificare le revisioni",
          "instruction": "Inserisci momenti di ripasso a distanza di 1, 3 e 7 giorni."
        },
        {
          "stepNumber": 4,
          "title": "Stampare il piano di studio",
          "instruction": "Esporta il calendario stampabile da tenere sulla scrivania."
        }
      ],
      "workedExample": {
        "title": "Esempio di Preparazione Sessione d'Esami",
        "scenario": "Organizzazione dello studio per 3 esami universitari in 4 settimane.",
        "calculation": "24 ore settimanali: 10h Analisi, 8h Fisica, 6h Chimica con cicli Pomodoro.",
        "result": "Piano di ripasso intenso ed efficace per ottenere ottimi risultati."
      },
      "faqs": [
        {
          "question": "Perché la tecnica Pomodoro è indicata per gli esami?",
          "answer": "Sessioni di 25 o 50 minuti con brevi intervalli mantengono alta la concentrazione ed evitano il sovraccarico mentale."
        },
        {
          "question": "Come si applica la ripetizione dilazionata?",
          "answer": "Programmando brevi ripassi a distanza di giorni per fissare i concetti nella memoria a lungo termine."
        },
        {
          "question": "Posso colorare le diverse materie?",
          "answer": "Sì. Puoi assegnare un colore specifico a ogni corso."
        },
        {
          "question": "Il piano resta memorizzato sul dispositivo?",
          "answer": "Sì. I dati sono salvati nel localStorage del tuo browser."
        }
      ]
    }
  },
  "weekly-timetable-maker": {
    "en": {
      "formulaTitle": "7-Day Cyclical Workload Balancing & Recurring Block Architecture",
      "formulaDescription": "The weekly timetable maker maps 168 hours of weekly temporal capacity across work, education, household management, and restorative rest. It prevents cognitive overload by computing weekly category summaries and rendering responsive multi-day schedules client-side without cloud transmissions.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Define Weekly Goals",
          "instruction": "Identify recurring commitments across Monday through Sunday (office hours, gym, classes)."
        },
        {
          "stepNumber": 2,
          "title": "Populate Time Blocks",
          "instruction": "Insert activity slots with start and end times across weekdays and weekends."
        },
        {
          "stepNumber": 3,
          "title": "Balance Categories",
          "instruction": "Review the weekly summary to ensure sleep (49–56h) and relaxation are safeguarded."
        },
        {
          "stepNumber": 4,
          "title": "Export Weekly Sheet",
          "instruction": "Print your 7-day schedule on an A4 sheet or save it to your browser storage."
        }
      ],
      "workedExample": {
        "title": "Full 168-Hour Balanced Weekly Allocation",
        "scenario": "Distributing a professional workweek, fitness sessions, and family time across 7 days.",
        "calculation": "Total: 168h. Sleep: 56h (8h/day). Work: 40h. Commute/Meals: 21h. Fitness: 6h. Family/Leisure: 30h. Unallocated buffer: 15h.",
        "result": "Completely balanced 7-day schedule with zero scheduling conflicts and adequate rest buffers."
      },
      "faqs": [
        {
          "question": "Why plan in a 168-hour weekly framework?",
          "answer": "Daily planning can feel cramped and demoralizing when unexpected interruptions occur. A 168-hour weekly lens allows flexibility to absorb delays while keeping long-term goals on track."
        },
        {
          "question": "Can I export a weekly PDF schedule for my fridge or binder?",
          "answer": "Yes. The Print / PDF button formats the 7-day grid to fit landscape A4 sheets cleanly."
        },
        {
          "question": "Is my schedule synced to any cloud service?",
          "answer": "No. Everything stays private in your browser's local storage."
        },
        {
          "question": "Can I toggle between 5-day workweeks and full 7-day views?",
          "answer": "Yes. Switch between Mon–Fri and Mon–Sun views with a single click."
        }
      ]
    },
    "hi": {
      "formulaTitle": "7-दिवसीय चक्रीय कार्यभार संतुलन और आवर्ती ब्लॉक संरचना",
      "formulaDescription": "यह साप्ताहिक टाइमटेबल मेकर 168 घंटों की साप्ताहिक क्षमता को काम, पढ़ाई और व्यक्तिगत विश्राम में संतुलित करता है। यह श्रेणीवार घंटों की गणना करता है और बिना सर्वर के सीधे ब्राउज़र में सुव्यवस्थित प्लानर तैयार करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "साप्ताहिक लक्ष्य तय करें",
          "instruction": "सोमवार से रविवार तक के नियमित कार्य (ऑफिस, जिम, पढ़ाई) निर्धारित करें।"
        },
        {
          "stepNumber": 2,
          "title": "समय स्लॉट भरें",
          "instruction": "सप्ताह के दिनों और सप्ताहांत के लिए समय ब्लॉक जोड़ें।"
        },
        {
          "stepNumber": 3,
          "title": "संतुलन की जांच करें",
          "instruction": "जांचें कि पर्याप्त नींद (49-56 घंटे) और आराम के लिए समय सुरक्षित है।"
        },
        {
          "stepNumber": 4,
          "title": "साप्ताहिक शीट प्रिंट करें",
          "instruction": "अपने 7-दिवसीय शेड्यूल को A4 पेपर पर प्रिंट करें या डिवाइस में सुरक्षित रखें।"
        }
      ],
      "workedExample": {
        "title": "168 घंटे का संतुलित साप्ताहिक विभाजन उदाहरण",
        "scenario": "काम, फिटनेस और पारिवारिक समय को 7 दिनों में सही तरीके से बांटना।",
        "calculation": "कुल 168 घंटे: नींद 56 घंटे (8 घंटे/दिन), काम 40 घंटे, भोजन 21 घंटे, फिटनेस 6 घंटे, परिवार 30 घंटे, बफर 15 घंटे।",
        "result": "तनावमुक्त और संतुलित 7-दिवसीय दिनचर्या A4 प्रिंटिंग के लिए तैयार।"
      },
      "faqs": [
        {
          "question": "168 घंटे के साप्ताहिक फ्रेमवर्क में योजना क्यों बनाएं?",
          "answer": "दैनिक योजनाओं में अचानक आए काम से तनाव हो सकता है। 168 घंटे का साप्ताहिक दृश्य आपको लचीलापन देता है और लक्ष्यों को पूरा करने में मदद करता है।"
        },
        {
          "question": "क्या मैं फ्रिज या स्टडी टेबल पर लगाने के लिए PDF निकाल सकता हूँ?",
          "answer": "हाँ। प्रिंट बटन 7-दिवसीय ग्रिड को A4 लैंडस्केप पेपर पर बिल्कुल सही तरीके से सेट करता है।"
        },
        {
          "question": "क्या मेरा डेटा किसी क्लाउड पर जाता है?",
          "answer": "नहीं। सभी जानकारी आपके ब्राउज़र में सुरक्षित रहती है।"
        },
        {
          "question": "क्या 5-दिन और 7-दिन व्यू में बदला जा सकता है?",
          "answer": "हाँ। आप एक क्लिक में 5-दिन या पूरे 7-दिन के दृश्य में बदल सकते हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Equilibrio Cíclico de Carga de Trabajo de 7 Días y Bloques Recurrentes",
      "formulaDescription": "El creador de horarios semanales distribuye las 168 horas semanales entre trabajo, estudio y descanso. Calcula totales por categoría y genera calendarios responsivos en el cliente sin transferir datos.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Fijar objetivos semanales",
          "instruction": "Identifique compromisos fijos de lunes a domingo (trabajo, clases, ejercicio)."
        },
        {
          "stepNumber": 2,
          "title": "Completar los días",
          "instruction": "Rellene los bloques con horas de inicio y fin en días laborales y fines de semana."
        },
        {
          "stepNumber": 3,
          "title": "Equilibrar descanso y tareas",
          "instruction": "Compruebe que reserva suficientes horas para sueño (49-56 h) y ocio."
        },
        {
          "stepNumber": 4,
          "title": "Exportar calendario",
          "instruction": "Imprima su hoja semanal en A4 o guárdela en el navegador."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Distribución de 168 Horas Semanales",
        "scenario": "Equilibrar jornada laboral, entrenamientos y vida familiar en 7 días.",
        "calculation": "Total 168 h: Sueño 56 h, Trabajo 40 h, Comidas 21 h, Deporte 6 h, Familia 30 h, Margen libre 15 h.",
        "result": "Horario semanal completo con margen de descanso sin solapamientos."
      },
      "faqs": [
        {
          "question": "¿Por qué planificar en un marco de 168 horas semanales?",
          "answer": "Permite absorber imprevistos diarios con flexibilidad sin perder de vista los objetivos generales de la semana."
        },
        {
          "question": "¿Se puede exportar en PDF apaisado para la nevera o carpeta?",
          "answer": "Sí. El botón de impresión ajusta la cuadrícula de 7 días al formato A4 horizontal."
        },
        {
          "question": "¿Se envía mi agenda a servidores externos?",
          "answer": "No. Permanece totalmente privada en el almacenamiento local del navegador."
        },
        {
          "question": "¿Permite alternar entre 5 y 7 días?",
          "answer": "Sí. Puede cambiar entre semana laboral y semana completa con un solo clic."
        }
      ]
    },
    "ja": {
      "formulaTitle": "7日間周期ワークロード均衡化および反復タイムブロック構造",
      "formulaDescription": "本週間スケジュール作成ツールは、1週間（168時間）の枠内で仕事、学習、家庭、休息のバランスを可視化。各カテゴリの週間合計時間を自動集計し、過密日程を防ぐ健全なスケジュールをローカルで構築します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "週間目標の設定",
          "instruction": "月曜から日曜までの固定予定（勤務、講義、トレーニング等）を整理します。"
        },
        {
          "stepNumber": 2,
          "title": "ブロックの入力",
          "instruction": "平日と週末にそれぞれの予定枠を開始・終了時刻とともに配置します。"
        },
        {
          "stepNumber": 3,
          "title": "休養バランスの確認",
          "instruction": "健康維持に必要な睡眠時間（週49〜56時間）やリフレッシュ時間が確保されているか点検します。"
        },
        {
          "stepNumber": 4,
          "title": "週間シートの出力",
          "instruction": "見やすいA4サイズの用紙に印刷するか、ブラウザに保存します。"
        }
      ],
      "workedExample": {
        "title": "週間168時間の完全調和スケジュール実例",
        "scenario": "仕事、フィットネス、家族との時間を7日間にわたり無理なく配分する例。",
        "calculation": "総時間168h: 睡眠56h（1日8時間）、仕事40h、食事・移動21h、運動6h、余暇30h、予備枠15h。",
        "result": "突発的な予定変更にも対応できる余白を備えた完璧な週間スケジュールが完成。"
      },
      "faqs": [
        {
          "question": "なぜ168時間の週間フレームで計画するのですか？",
          "answer": "1日単位の計画は突発的な用事で崩れやすいのに対し、週168時間単位で捉えることで柔軟にリカバリーでき、挫折を防げるためです。"
        },
        {
          "question": "冷蔵庫や手帳に貼るための横向きA4印刷に対応していますか？",
          "answer": "はい。印刷機能により、横向きA4サイズに美しくフィットする時間割が出力されます。"
        },
        {
          "question": "スケジュールがクラウドに保存される心配はありますか？",
          "answer": "いいえ。すべてのデータはお使いの端末のブラウザ内にのみ保持されます。"
        },
        {
          "question": "平日5日表示と全7日表示を切り替えられますか？",
          "answer": "はい。ボタン一つで平日表示と週末を含む全表示を切り替え可能です。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Équilibrage Hebdomadaire de Charge de Travail et Blocs Récurrents",
      "formulaDescription": "Le planificateur hebdomadaire répartit les 168 heures de la semaine entre travail, apprentissage et repos. Il calcule les totaux par catégorie localement sans échange réseau.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Définir les objectifs",
          "instruction": "Listez vos engagements fixes du lundi au dimanche."
        },
        {
          "stepNumber": 2,
          "title": "Remplir les créneaux",
          "instruction": "Ajoutez les blocs d'activité pour les jours de semaine et le week-end."
        },
        {
          "stepNumber": 3,
          "title": "Vérifier l'équilibre",
          "instruction": "Assurez-vous de préserver un temps de sommeil suffisant (49 à 56 h par semaine)."
        },
        {
          "stepNumber": 4,
          "title": "Exporter la grille",
          "instruction": "Imprimez votre semaine sur feuille A4 ou conservez-la dans le navigateur."
        }
      ],
      "workedExample": {
        "title": "Exemple de Répartition des 168 Heures Semaine",
        "scenario": "Équilibre entre vie professionnelle, sport et temps libre sur 7 jours.",
        "calculation": "Total 168h : Sommeil 56h, Travail 40h, Repas 21h, Sport 6h, Loisirs 30h, Réserve 15h.",
        "result": "Semaine harmonieuse et sans conflit horaire prête à l'emploi."
      },
      "faqs": [
        {
          "question": "Pourquoi planifier sur une base de 168 heures ?",
          "answer": "Cette vision hebdomadaire offre la souplesse nécessaire pour compenser les imprévus quotidiens sans se décourager."
        },
        {
          "question": "L'export A4 paysage est-il possible ?",
          "answer": "Oui. Le bouton Imprimer formate la semaine pour une impression horizontale parfaite."
        },
        {
          "question": "Mes données sont-elles partagées en ligne ?",
          "answer": "Non. Vos horaires restent stockés localement sur votre ordinateur ou mobile."
        },
        {
          "question": "Peut-on basculer de 5 à 7 jours facilement ?",
          "answer": "Oui. Vous pouvez afficher 5 ou 7 colonnes selon vos besoins en un clic."
        }
      ]
    },
    "de": {
      "formulaTitle": "7-Tage-Zyklische Arbeitslastverteilung & Wiederkehrende Block-Architektur",
      "formulaDescription": "Der Wochenplaner verteilt das Wochenkontingent von 168 Stunden auf Beruf, Studium und Erholung. Er berechnet Stundensummen je Kategorie direkt im Browser ohne Datenübertragung.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Wochenziele festlegen",
          "instruction": "Erfassen Sie feste Termine von Montag bis Sonntag."
        },
        {
          "stepNumber": 2,
          "title": "Zeitblöcke füllen",
          "instruction": "Tragen Sie Aufgaben mit Start- und Endzeit für die gesamte Woche ein."
        },
        {
          "stepNumber": 3,
          "title": "Work-Life-Balance prüfen",
          "instruction": "Achten Sie auf ausreichend Schlaf (49–56 Stunden) und Erholungszeiten."
        },
        {
          "stepNumber": 4,
          "title": "Wochenplan exportieren",
          "instruction": "Drucken Sie Ihren 7-Tage-Plan auf A4 aus oder sichern Sie ihn im Speicher."
        }
      ],
      "workedExample": {
        "title": "Beispiel für 168-Stunden-Wochenbalance",
        "scenario": "Verteilung von Beruf, Sport und Freizeit auf 7 Tage.",
        "calculation": "Gesamt 168h: Schlaf 56h, Arbeit 40h, Mahlzeiten 21h, Sport 6h, Familie 30h, Puffer 15h.",
        "result": "Ausgewogener Wochenplan mit ausreichend Freiraum für Erholung."
      },
      "faqs": [
        {
          "question": "Warum ist ein 168-Stunden-Plan sinnvoll?",
          "answer": "Tagespläne geraten bei unvorhergesehenen Ereignissen schnell durcheinander; die Wochenperspektive bietet nötige Flexibilität."
        },
        {
          "question": "Ist der Ausdruck im Querformat möglich?",
          "answer": "Ja. Die Druckoptimierung passt das 7-Tage-Raster ideal an das A4-Querformat an."
        },
        {
          "question": "Werden Termine in der Cloud gespeichert?",
          "answer": "Nein. Alles bleibt lokal im Speicher Ihres Browsers gesichert."
        },
        {
          "question": "Kann zwischen 5 und 7 Tagen gewechselt werden?",
          "answer": "Ja. Sie können flexibel zwischen Werktagen und voller Woche umschalten."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Equilíbrio Cíclico de Carga de Trabalho de 7 Dias e Blocos Recorrentes",
      "formulaDescription": "O planejador semanal distribui as 168 horas da semana entre compromissos profissionais, estudos e descanso. Soma as horas por categoria na memória do navegador com total privacidade.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Definir metas da semana",
          "instruction": "Mapeie seus compromissos fixos de segunda a domingo."
        },
        {
          "stepNumber": 2,
          "title": "Preencher horários",
          "instruction": "Insira as atividades nos dias úteis e no fim de semana."
        },
        {
          "stepNumber": 3,
          "title": "Checar equilíbrio",
          "instruction": "Certifique-se de reservar horas suficientes de sono (49 a 56h) e lazer."
        },
        {
          "stepNumber": 4,
          "title": "Exportar grade",
          "instruction": "Imprima sua semana completa em A4 ou salve no navegador."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Divisão das 168 Horas da Semana",
        "scenario": "Equilibrar trabalho, academia e vida pessoal ao longo dos 7 dias.",
        "calculation": "Total 168h: Sono 56h, Trabalho 40h, Refeições 21h, Exercícios 6h, Família 30h, Folga 15h.",
        "result": "Grade semanal completa e realista sem conflitos de horário."
      },
      "faqs": [
        {
          "question": "Por que organizar a vida em um ciclo de 168 horas?",
          "answer": "Permite acomodar imprevistos com calma, equilibrando obrigações e descanso sem cobranças excessivas."
        },
        {
          "question": "Consigo imprimir em folha A4 na horizontal?",
          "answer": "Sim. A função de impressão ajusta o layout para A4 paisagem com perfeição."
        },
        {
          "question": "Meus compromissos vão para algum servidor?",
          "answer": "Não. Ficam gravados somente no armazenamento local do navegador."
        },
        {
          "question": "Posso alternar entre 5 e 7 dias?",
          "answer": "Sim. Alterne entre dias úteis e semana completa com um clique."
        }
      ]
    },
    "ko": {
      "formulaTitle": "7일 주기 업무 부하 균형화 및 반복 타임 블록 구조",
      "formulaDescription": "본 주간 시간표 플래너는 1주일 168시간의 가용 시간을 업무, 학업, 가사, 휴식 등으로 체계적으로 분배합니다. 범주별 주간 총 시간을 자동 산출하여 번아웃을 방지하고 균형 잡힌 주간 계획을 로컬에서 완성합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "주간 목표 및 고정 일정 정의",
          "instruction": "월요일부터 일요일까지의 고정 일정(근무, 강의, 운동 등)을 파악합니다."
        },
        {
          "stepNumber": 2,
          "title": "주간 시간 블록 배치",
          "instruction": "평일과 주말의 시작 및 종료 시간에 맞춰 활동 블록을 입력합니다."
        },
        {
          "stepNumber": 3,
          "title": "활동-휴식 균형 점검",
          "instruction": "건강을 위한 충분한 수면 시간(주당 49~56시간)과 여가가 확보되었는지 확인합니다."
        },
        {
          "stepNumber": 4,
          "title": "주간 계획표 출력",
          "instruction": "A4 용지에 맞게 주간 일정을 인쇄하거나 브라우저에 저장합니다."
        }
      ],
      "workedExample": {
        "title": "주간 168시간 균형 배분 실전 예시",
        "scenario": "업무, 운동, 가족과의 시간을 일주일 7일 동안 조화롭게 배치.",
        "calculation": "총 168시간: 수면 56시간(일 8시간), 업무 40시간, 식사/이동 21시간, 운동 6시간, 여가 30시간, 여유 버퍼 15시간.",
        "result": "무리한 일정 없이 번아웃을 예방하는 완벽한 주간 계획 완성."
      },
      "faqs": [
        {
          "question": "왜 168시간 주간 단위로 계획을 세워야 하나요?",
          "answer": "하루 단위 계획은 돌발 상황에 쉽게 무너지지만, 주간 168시간 관점으로 접근하면 유연하게 일정을 재조정하여 목표를 달성할 수 있기 때문입니다."
        },
        {
          "question": "벽이나 냉장고에 붙일 수 있는 가로형 A4 PDF 출력이 가능한가요?",
          "answer": "네. 인쇄 버튼을 누르면 7일 격자가 가로형 A4 규격에 완벽히 맞춰져 출력됩니다."
        },
        {
          "question": "일정이 클라우드에 전송되나요?",
          "answer": "아닙니다. 모든 데이터는 기기 브라우저 로컬 저장소에 안전하게 유지됩니다."
        },
        {
          "question": "주 5일과 주 7일 보기를 전환할 수 있나요?",
          "answer": "네. 버튼 하나로 평일 근무 모드와 주말 포함 전체 모드를 자유롭게 전환할 수 있습니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Bilanciamento Ciclico del Carico di Lavoro a 7 Giorni e Blocchi Ricorrenti",
      "formulaDescription": "Il creatore di orari settimanali distribuisce le 168 ore della settimana tra lavoro, studio e riposo, calcolando i totali per categoria nel browser in modo sicuro.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Definire gli obiettivi",
          "instruction": "Individua gli impegni fissi da lunedì a domenica."
        },
        {
          "stepNumber": 2,
          "title": "Inserire i blocchi",
          "instruction": "Aggiungi le attività nei giorni feriali e nel fine settimana."
        },
        {
          "stepNumber": 3,
          "title": "Bilanciare il riposo",
          "instruction": "Verifica di dedicare abbastanza tempo al sonno (49-56 ore) e allo stacco mentale."
        },
        {
          "stepNumber": 4,
          "title": "Esportare l'orario",
          "instruction": "Stampa la tua settimana su foglio A4 o conservala nel browser."
        }
      ],
      "workedExample": {
        "title": "Esempio di Gestione delle 168 Ore Settimanali",
        "scenario": "Conciliazione di lavoro, attività fisica e vita privata su 7 giorni.",
        "calculation": "Totale 168h: Sonno 56h, Lavoro 40h, Pasti 21h, Sport 6h, Relax 30h, Margine 15h.",
        "result": "Pianificazione settimanale equilibrata e sostenibile pronta da stampare."
      },
      "faqs": [
        {
          "question": "Qual è il vantaggio dell'approccio a 168 ore?",
          "answer": "Fornisce la flessibilità per assorbire imprevisti giornalieri senza perdere di vista gli obiettivi settimanali."
        },
        {
          "question": "Si può stampare in formato A4 orizzontale?",
          "answer": "Sì. La pagina di stampa formatta la settimana per adattarsi al foglio A4 orizzontale."
        },
        {
          "question": "I dati vengono inviati su server remoti?",
          "answer": "No. Tutto rimane memorizzato localmente nel browser."
        },
        {
          "question": "Si può alternare tra vista a 5 e 7 giorni?",
          "answer": "Sì. È possibile cambiare visualizzazione con un semplice clic."
        }
      ]
    }
  },
  "daily-timetable-maker": {
    "en": {
      "formulaTitle": "Chronological Hourly Time-Blocking & Priority Quadrant Architecture",
      "formulaDescription": "The daily timetable maker implements high-resolution hourly time-blocking (from 06:00 to 23:00) paired with an Eisenhower Priority Matrix (Urgent vs Important). It eliminates decision fatigue by scheduling single-task focus windows and calculating completed daily velocity metrics client-side without cloud transmission.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Define Top 3 Priorities",
          "instruction": "List the three critical non-negotiable tasks that must be accomplished today."
        },
        {
          "stepNumber": 2,
          "title": "Block Hourly Intervals",
          "instruction": "Assign focus blocks from morning to evening, dedicating morning hours to complex tasks."
        },
        {
          "stepNumber": 3,
          "title": "Insert Rest Buffers",
          "instruction": "Schedule 15-minute buffers between blocks for meals, hydration, and mental de-cluttering."
        },
        {
          "stepNumber": 4,
          "title": "Review & Print Daily Sheet",
          "instruction": "Print your daily agenda or keep it active in an open browser tab throughout the day."
        }
      ],
      "workedExample": {
        "title": "High-Performance Executive Daily Time-Blocking",
        "scenario": "Scheduling a 12-hour high-output workday with strategic deep work windows.",
        "calculation": "06:30 Exercise 🏃, 08:00 Deep Work Sprint 1 💻, 10:30 Team Standup 📞, 12:00 Lunch & Walk 🥗, 13:30 Deep Work Sprint 2 📊, 16:00 Email Batching ✉️, 18:00 Evening Wind-down 🌅.",
        "result": "Structured daily blueprint preventing ad-hoc distractions and maximizing deep work velocity."
      },
      "faqs": [
        {
          "question": "Why is time-blocking superior to a traditional to-do list?",
          "answer": "To-do lists create an illusion of infinite time without allocating finite temporal capacity. Time-blocking forces realistic estimation, protects focus windows, and eliminates decision fatigue."
        },
        {
          "question": "Can I print today's schedule on half-letter or A5 sheets?",
          "answer": "Yes. The layout scales cleanly to compact planner notebooks (A5 and half-letter sizes) using browser print settings."
        },
        {
          "question": "Are my daily tasks saved if I refresh the page?",
          "answer": "Yes. All time blocks and priority checkboxes remain intact in browser localStorage."
        },
        {
          "question": "What should I do when an unexpected fire drills disrupts my schedule?",
          "answer": "Adjust remaining afternoon blocks directly on screen to protect evening rest without guilt."
        }
      ]
    },
    "hi": {
      "formulaTitle": "कालानुक्रमिक प्रति घंटा टाइम-ब्लॉकिंग और प्राथमिकता क्वाड्रेंट संरचना",
      "formulaDescription": "यह दैनिक टाइमटेबल मेकर सुबह 06:00 से रात 23:00 तक घंटे-वार टाइम-ब्लॉकिंग और आइजनहावर प्राथमिकता मैट्रिक्स लागू करता है। यह बिना किसी क्लाउड सर्वर के दिन के कार्यों को व्यवस्थित और ट्रैक करने में मदद करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "शीर्ष 3 प्राथमिकताएं तय करें",
          "instruction": "आज पूरे किए जाने वाले तीन सबसे महत्वपूर्ण कार्यों की सूची बनाएं।"
        },
        {
          "stepNumber": 2,
          "title": "घंटे-वार ब्लॉक बनाएं",
          "instruction": "सुबह से शाम तक के लिए समय ब्लॉक निर्धारित करें (कठिन काम सुबह रखें)।"
        },
        {
          "stepNumber": 3,
          "title": "बफर और ब्रेक जोड़ें",
          "instruction": "भोजन, पानी और विश्राम के लिए कार्यों के बीच 15 मिनट का अंतर रखें।"
        },
        {
          "stepNumber": 4,
          "title": "दैनिक शीट प्रिंट करें",
          "instruction": "अपने सामने रखने के लिए दिन की कार्यसूची प्रिंट करें या ब्राउज़र में खुली रखें।"
        }
      ],
      "workedExample": {
        "title": "दैनिक टाइम-ब्लॉकिंग उदाहरण",
        "scenario": "12 घंटे के दिन को उत्पादक और संतुलित तरीके से व्यवस्थित करना।",
        "calculation": "06:30 व्यायाम 🏃, 08:00 डीप वर्क 💻, 10:30 मीटिंग 📞, 12:00 लंच 🥗, 13:30 मुख्य प्रोजेक्ट 📊, 16:00 ईमेल ✉️, 18:00 विश्राम 🌅।",
        "result": "बिना भटकाव के महत्वपूर्ण कार्यों को समय पर पूरा करने वाला दैनिक प्लान तैयार।"
      },
      "faqs": [
        {
          "question": "पारंपरिक टू-डू लिस्ट की तुलना में टाइम-ब्लॉकिंग बेहतर क्यों है?",
          "answer": "टू-डू लिस्ट में समय का अंदाजा नहीं होता। टाइम-ब्लॉकिंग हर काम के लिए निश्चित समय तय करती है जिससे काम समय पर पूरे होते हैं।"
        },
        {
          "question": "क्या मैं इसे छोटी डायरी (A5 साइज) पर प्रिंट कर सकता हूँ?",
          "answer": "हाँ। यह लेआउट छोटी डायरी या नोटबुक साइज पर भी आसानी से फिट हो जाता है।"
        },
        {
          "question": "क्या पेज रीफ्रेश करने पर काम सुरक्षित रहते हैं?",
          "answer": "हाँ। सभी कार्य आपके ब्राउज़र के लोकल स्टोरेज में सुरक्षित रहते हैं।"
        },
        {
          "question": "यदि अचानक कोई नया काम आ जाए तो क्या करें?",
          "answer": "आप स्क्रीन पर बचे हुए समय के ब्लॉक को तुरंत बदलकर नया समय निर्धारित कर सकते हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Bloques de Tiempo Horarios Cronológicos y Matriz de Prioridades",
      "formulaDescription": "El planificador diario implementa bloques de tiempo por horas (de 06:00 a 23:00) junto con la matriz de prioridades de Eisenhower. Reduce la fatiga de decisión organizando tareas clave sin servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Definir 3 prioridades clave",
          "instruction": "Identifique las tres tareas fundamentales que debe completar hoy."
        },
        {
          "stepNumber": 2,
          "title": "Asignar bloques horarios",
          "instruction": "Reserve las primeras horas de la mañana para el trabajo de mayor concentración."
        },
        {
          "stepNumber": 3,
          "title": "Incluir márgenes de descanso",
          "instruction": "Añada descansos de 15 minutos para comer, hidratarse y desconectar."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir agenda del día",
          "instruction": "Imprima su hoja de tareas diaria para tenerla visible en su mesa."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Planificación Diaria por Bloques",
        "scenario": "Estructurar una jornada de 12 horas con alta concentración y descansos estratégicos.",
        "calculation": "06:30 Ejercicio 🏃, 08:00 Trabajo enfocado 💻, 10:30 Reuniones 📞, 12:00 Comida 🥗, 13:30 Proyecto principal 📊, 16:00 Correos ✉️, 18:00 Desconexión 🌅.",
        "result": "Jornada diaria organizada que minimiza interrupciones y maximiza resultados."
      },
      "faqs": [
        {
          "question": "¿Por qué el time-blocking supera a las listas de tareas?",
          "answer": "Las listas no consideran el tiempo real disponible. Asignar horas concretas a cada tarea combate la postergación y da estructura al día."
        },
        {
          "question": "¿Se puede imprimir en tamaño cuartilla (A5)?",
          "answer": "Sí. Se adapta con facilidad a libretas y agendas en formato A5."
        },
        {
          "question": "¿Se conservan las tareas si recargo la web?",
          "answer": "Sí. Todo se guarda automáticamente en el almacenamiento local del navegador."
        },
        {
          "question": "¿Qué hacer si surge un imprevisto?",
          "answer": "Ajuste los bloques de la tarde en la pantalla para reprogramar sin estrés."
        }
      ]
    },
    "ja": {
      "formulaTitle": "時系列タイムブロッキングおよび優先度マトリックス構成構造",
      "formulaDescription": "本日課スケジュール作成ツールは、朝6時から夜23時までの時系列タイムブロッキングとアイゼンハワー優先度マトリックスを統合。マルチタスクによる集中力散漫を防ぎ、1日のタスク達成度をローカルで管理します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "今日の最優先3タスク決定",
          "instruction": "今日中に必ず完了させるべき重要タスクを3つリストアップします。"
        },
        {
          "stepNumber": 2,
          "title": "時間枠のブロッキング",
          "instruction": "朝から晩までの予定をブロック化し、最も思考力が必要なタスクを午前に配置します。"
        },
        {
          "stepNumber": 3,
          "title": "休憩バッファの確保",
          "instruction": "タスク間に15分の余裕時間を設け、水分補給やリフレッシュを行います。"
        },
        {
          "stepNumber": 4,
          "title": "デイリーシートの出力",
          "instruction": "デスクに置いて進捗を確認できる見やすいデイリープランを印刷します。"
        }
      ],
      "workedExample": {
        "title": "高効率デイリータイムブロッキングの実例",
        "scenario": "集中作業と会議、休憩をメリハリ良く配置した1日のスケジュール例。",
        "calculation": "06:30 運動 🏃、08:00 ディープワーク1 💻、10:30 朝会 📞、12:00 昼食・散歩 🥗、13:30 ディープワーク2 📊、16:00 メール処理 ✉️、18:00 業務終了 🌅。",
        "result": "気が散る要因を排除し、最重要課題を確実に完了できる日課プランが完成。"
      },
      "faqs": [
        {
          "question": "ToDoリストよりもタイムブロッキングが優れている理由は何ですか？",
          "answer": "単なる箇条書きリストは時間の制約を無視しがちですが、タイムブロッキングは1日の有限な枠にタスクを割り当てるため、実現可能性の高い行動計画になります。"
        },
        {
          "question": "手帳用のA5サイズ用紙にも印刷できますか？",
          "answer": "はい。プリンタ設定でA5やB5などの小型用紙にも綺麗に縮小印刷可能です。"
        },
        {
          "question": "ページを更新しても入力データは消えませんか？",
          "answer": "はい。端末のローカルストレージに常時保存されているため消えません。"
        },
        {
          "question": "急な割り込み仕事が入った場合はどうすればいいですか？",
          "answer": "午後のブロックを画面上でスライドさせ、休息時間を守りながら柔軟に組み直せます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Blocage Temporel Chronologique et Matrice de Priorités Quotidienne",
      "formulaDescription": "Ce planificateur quotidien combine un découpage horaire de 06h00 à 23h00 avec la matrice d'Eisenhower. Il clarifie les priorités du jour directement dans le navigateur sans serveur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Fixer 3 priorités clés",
          "instruction": "Notez les 3 objectifs indispensables à accomplir aujourd'hui."
        },
        {
          "stepNumber": 2,
          "title": "Bloquer les heures de la journée",
          "instruction": "Allouez des blocs horaires en réservant la matinée aux tâches complexes."
        },
        {
          "stepNumber": 3,
          "title": "Prévoir des temps de pause",
          "instruction": "Insérez 15 minutes de battement pour les repas et la détente."
        },
        {
          "stepNumber": 4,
          "title": "Imprimer la feuille du jour",
          "instruction": "Imprimez votre planning quotidien pour rester concentré."
        }
      ],
      "workedExample": {
        "title": "Exemple de Découpage Horaire Quotidien",
        "scenario": "Organisation d'une journée productive équilibrant travail de fond et réunions.",
        "calculation": "06h30 Sport 🏃, 08h00 Travail profond 💻, 10h30 Point d'équipe 📞, 12h00 Déjeuner 🥗, 13h30 Projets 📊, 16h00 E-mails ✉️, 18h00 Bilan 🌅.",
        "result": "Structure journalière claire limitant la dispersion mentale."
      },
      "faqs": [
        {
          "question": "En quoi le time-blocking surpasse-t-il la simple to-do list ?",
          "answer": "Une liste de tâches ne tient pas compte du temps imparti. Bloquer des créneaux oblige à évaluer la durée réelle des actions et favorise le passage à l'acte."
        },
        {
          "question": "Peut-on imprimer au format A5 pour carnet ?",
          "answer": "Oui. La mise en page s'adapte sans problème aux petits formats d'agenda."
        },
        {
          "question": "Les données sont-elles conservées après rechargement ?",
          "answer": "Oui. Vos blocs de tâches restent enregistrés dans le navigateur."
        },
        {
          "question": "Comment gérer un imprévu ?",
          "answer": "Déplacez simplement vos blocs de l'après-midi pour réajuster votre journée sans stress."
        }
      ]
    },
    "de": {
      "formulaTitle": "Chronologisches Stündliches Time-Blocking & Prioritäten-Matrix",
      "formulaDescription": "Der Tagesplaner kombiniert stundenweises Time-Blocking (06:00 bis 23:00 Uhr) mit der Eisenhower-Matrix. Er steigert die tägliche Produktivität rein lokal im Browser.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Top-3-Prioritäten festlegen",
          "instruction": "Bestimmen Sie die drei wichtigsten Aufgaben des heutigen Tages."
        },
        {
          "stepNumber": 2,
          "title": "Stundenblöcke belegen",
          "instruction": "Planen Sie schwierige Aufgaben am besten für den Vormittag ein."
        },
        {
          "stepNumber": 3,
          "title": "Erholungspausen einfügen",
          "instruction": "Planen Sie 15-minütige Puffer zwischen den Aufgabenblöcken ein."
        },
        {
          "stepNumber": 4,
          "title": "Tagesplan ausdrucken",
          "instruction": "Drucken Sie Ihren Tagesplan für den Schreibtisch aus."
        }
      ],
      "workedExample": {
        "title": "Beispiel für Tages-Time-Blocking",
        "scenario": "Strukturierung eines produktiven 12-Stunden-Tages mit festen Fokusphasen.",
        "calculation": "06:30 Sport 🏃, 08:00 Fokusarbeit 💻, 10:30 Abstimmung 📞, 12:00 Pause 🥗, 13:30 Projektzeit 📊, 16:00 E-Mails ✉️, 18:00 Feierabend 🌅.",
        "result": "Strukturierter Tagesablauf für maximale Konzentration ohne Ablenkungen."
      },
      "faqs": [
        {
          "question": "Warum ist Time-Blocking besser als eine To-Do-Liste?",
          "answer": "To-Do-Listen vernachlässigen den Faktor Zeit. Feste Zeitfenster zwingen zu realistischer Planung und schützen vor Überlastung."
        },
        {
          "question": "Lässt sich der Planer auf A5 für Notizbücher drucken?",
          "answer": "Ja. Das Layout lässt sich problemlos auf A5-Format skalieren."
        },
        {
          "question": "Gehen Einträge beim Neuladen verloren?",
          "answer": "Nein. Sämtliche Daten bleiben im lokalen Speicher gesichert."
        },
        {
          "question": "Wie reagiere ich auf dringende Zwischenfälle?",
          "answer": "Passen Sie die nachfolgenden Blöcke direkt auf dem Bildschirm an."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Time-Blocking Horário Cronológico e Matriz de Prioridades Diárias",
      "formulaDescription": "O planejador diário organiza o dia em blocos horários (das 06:00 às 23:00) integrados à matriz de Eisenhower, garantindo clareza e foco em tarefas essenciais sem servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Definir 3 prioridades do dia",
          "instruction": "Escolha as três tarefas essenciais que não podem passar de hoje."
        },
        {
          "stepNumber": 2,
          "title": "Organizar blocos de foco",
          "instruction": "Dedique o período da manhã para as atividades que exigem mais raciocínio."
        },
        {
          "stepNumber": 3,
          "title": "Inserir pequenas pausas",
          "instruction": "Deixe intervalos de 15 minutos para lanche, água e descanso visual."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir roteiro diário",
          "instruction": "Imprima sua folha do dia para acompanhar cada etapa na mesa."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Time-Blocking para o Dia a Dia",
        "scenario": "Estruturação de um dia produtivo com blocos de trabalho focado e pausas.",
        "calculation": "06:30 Exercícios 🏃, 08:00 Trabalho profundo 💻, 10:30 Reuniões 📞, 12:00 Almoço 🥗, 13:30 Projetos 📊, 16:00 E-mails ✉️, 18:00 Descanso 🌅.",
        "result": "Roteiro diário claro que evita distrações e acelera a entrega de metas."
      },
      "faqs": [
        {
          "question": "Por que o time-blocking é superior a uma lista comum de tarefas?",
          "answer": "Listas não mostram a duração real das tarefas. Ao reservar um bloco de horas para cada atividade, você elimina o estresse e cumpre o cronograma."
        },
        {
          "question": "É possível imprimir no formato A5 para planner de bolsa?",
          "answer": "Sim. A escala de impressão se ajusta perfeitamente a papéis A5 e cadernos."
        },
        {
          "question": "Os dados somem se eu atualizar a página?",
          "answer": "Não. Ficam salvos na memória local do navegador."
        },
        {
          "question": "Como agir diante de imprevistos?",
          "answer": "Basta reorganizar os blocos da tarde na tela para salvar o dia com tranquilidade."
        }
      ]
    },
    "ko": {
      "formulaTitle": "시간대별 타임 블로킹 및 아이젠하워 우선순위 매트릭스 구조",
      "formulaDescription": "본 일일 시간표 플래너는 오전 6시부터 밤 23시까지의 세밀한 시간대별 타임 블로킹과 아이젠하워 우선순위 매트릭스를 결합합니다. 멀티태스킹 혼란을 방지하고 당일 완수도를 브라우저 로컬에서 체계적으로 관리합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "오늘의 핵심 3대 우선순위 선정",
          "instruction": "오늘 반드시 끝마쳐야 할 가장 중요하고 긴급한 과제 3가지를 정합니다."
        },
        {
          "stepNumber": 2,
          "title": "시간대별 집중 블록 할당",
          "instruction": "오전 시간을 고난도 집중 작업에 우선 배정하고 순차적으로 시간을 배분합니다."
        },
        {
          "stepNumber": 3,
          "title": "휴식 및 완충 시간 확보",
          "instruction": "식사, 수분 섭취, 환기를 위해 블록 사이에 15분 단위 여유를 둡니다."
        },
        {
          "stepNumber": 4,
          "title": "일일 플래너 인쇄",
          "instruction": "책상 위에 세워두고 체크할 수 있는 깔끔한 A4 데일리 계획표를 출력합니다."
        }
      ],
      "workedExample": {
        "title": "고효율 데일리 타임 블로킹 실전 예시",
        "scenario": "몰입 작업 시간과 회의, 휴식을 전략적으로 안배한 12시간 일과표.",
        "calculation": "06:30 모닝 운동 🏃, 08:00 딥워크 몰입 💻, 10:30 팀 미팅 📞, 12:00 점심 및 산책 🥗, 13:30 핵심 프로젝트 📊, 16:00 메일 정리 ✉️, 18:00 일과 마무리 🌅.",
        "result": "불필요한 스마트폰 유혹과 산만함을 차단하고 핵심 과제를 당일 완수하는 계획 수립."
      },
      "faqs": [
        {
          "question": "일반 투두리스트보다 타임 블로킹이 왜 훨씬 효과적인가요?",
          "answer": "할 일 목록은 시간 제약을 고려하지 않아 과도한 목표를 세우기 쉽지만, 타임 블로킹은 한정된 24시간 내에 블록을 할당하므로 실행력이 비약적으로 높아집니다."
        },
        {
          "question": "A5 다이어리 속지 규격으로 인쇄할 수 있나요?",
          "answer": "네. 브라우저 인쇄 옵션을 통해 A5나 B5 등 소형 다이어리 용지에도 잘림 없이 인쇄됩니다."
        },
        {
          "question": "페이지를 새로고침하면 입력한 일정이 지워지나요?",
          "answer": "아닙니다. 브라우저 내부 로컬 스토리지에 실시간 저장되므로 새로고침해도 그대로 유지됩니다."
        },
        {
          "question": "예상치 못한 급한 일이 생기면 어떻게 대처하나요?",
          "answer": "화면에서 오후 시간대 블록을 즉시 조정하여 저녁 휴식 시간을 침범하지 않도록 유연하게 대처할 수 있습니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Time-Blocking Orario Cronologico e Matrice delle Priorità Giornaliere",
      "formulaDescription": "Il pianificatore giornaliero adotta il time-blocking orario (dalle 06:00 alle 23:00) associato alla matrice di Eisenhower per gestire con chiarezza le priorità del giorno in locale.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Fissare 3 priorità chiave",
          "instruction": "Definisci i tre compiti fondamentali da completare assolutamente oggi."
        },
        {
          "stepNumber": 2,
          "title": "Bloccare le fasce orarie",
          "instruction": "Dedica la mattina ai lavori complessi che richiedono massima lucidità."
        },
        {
          "stepNumber": 3,
          "title": "Inserire pause di recupero",
          "instruction": "Prevedi 15 minuti di stacco tra i blocchi per ricaricare le energie."
        },
        {
          "stepNumber": 4,
          "title": "Stampare l'agenda del giorno",
          "instruction": "Stampa il foglio giornaliero da tenere ben visibile sulla scrivania."
        }
      ],
      "workedExample": {
        "title": "Esempio di Time-Blocking Giornaliero",
        "scenario": "Organizzazione di una giornata produttiva con fasce di lavoro ad alta concentrazione.",
        "calculation": "06:30 Attività fisica 🏃, 08:00 Lavoro profondo 💻, 10:30 Riunioni 📞, 12:00 Pranzo 🥗, 13:30 Progetti 📊, 16:00 Email ✉️, 18:00 Chiusura 🌅.",
        "result": "Programma chiaro che previene distrazioni e massimizza l'efficienza."
      },
      "faqs": [
        {
          "question": "Perché il time-blocking è più efficace della lista cose da fare?",
          "answer": "Le semplici liste non considerano il tempo disponibile. Assegnare ore specifiche costringe a pianificare in modo realistico e focalizzato."
        },
        {
          "question": "Si può stampare in formato A5 per agenda?",
          "answer": "Sì. La grafica si adatta perfettamente ai formati tascabili A5."
        },
        {
          "question": "Le informazioni restano salvate dopo il ricaricamento?",
          "answer": "Sì. Tutto rimane memorizzato nel browser locale."
        },
        {
          "question": "Cosa fare se sopraggiunge un imprevisto?",
          "answer": "Riorganizza velocemente i blocchi pomeridiani a schermo per non perdere il controllo."
        }
      ]
    }
  },
  "work-shift-schedule-maker": {
    "en": {
      "formulaTitle": "Rotational Shift Pattern Scheduling & Mandatory Rest Interval Architecture",
      "formulaDescription": "The shift schedule maker configures cyclical shift rotations (Day, Evening, Night/Graveyard, Off) across multi-week rosters. It validates regulatory minimum rest intervals (minimum 11 hours between shifts under standard labor guidelines) and computes total working hours client-side without cloud transmission.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choose Shift Pattern",
          "instruction": "Select 2-shift, 3-shift (Morning/Evening/Night), 4-on-4-off, or DuPont rotation patterns."
        },
        {
          "stepNumber": 2,
          "title": "Assign Employee Roster",
          "instruction": "Enter staff names and assign shift codes (D, E, N, OFF) across weekly dates."
        },
        {
          "stepNumber": 3,
          "title": "Verify Rest Intervals",
          "instruction": "Check the automatic alert system to ensure no employee has back-to-back night-into-day shifts."
        },
        {
          "stepNumber": 4,
          "title": "Download or Print Roster",
          "instruction": "Print a clean monthly or bi-weekly team roster for notice boards or staff distribution."
        }
      ],
      "workedExample": {
        "title": "Healthcare 3-Shift 24/7 Nursing Roster",
        "scenario": "Scheduling a 12-nurse emergency unit across Morning (07:00-15:30), Evening (15:00-23:30), and Night (23:00-07:30) shifts.",
        "calculation": "24/7 coverage = 3 shifts/day × 7 days = 21 shift slots. 4 nurses per active shift + mandatory 48-hour recovery window post-night shift.",
        "result": "Fatigue-safe nursing roster with certified 11-hour inter-shift rest compliance printed on A4 landscape."
      },
      "faqs": [
        {
          "question": "What is the mandatory rest period between working shifts?",
          "answer": "Under international labor standards and EU Working Time Directives, employees are entitled to a minimum of 11 consecutive hours of rest per 24-hour period between shifts."
        },
        {
          "question": "Why are quick turnarounds (Night shift followed immediately by Day shift) hazardous?",
          "answer": "Short turnaround intervals truncate circadian sleep rhythms, dramatically increasing fatigue-related workplace injuries and clinical errors."
        },
        {
          "question": "Can I print the roster on landscape A4 sheets?",
          "answer": "Yes. The schedule table is styled to automatically occupy the full width of an A4 landscape page."
        },
        {
          "question": "Is confidential staff data uploaded to external servers?",
          "answer": "No. All employee names and shifts are stored purely within your local browser memory."
        }
      ]
    },
    "hi": {
      "formulaTitle": "घूर्णन शिफ्ट पैटर्न शेड्यूलिंग और अनिवार्य विश्राम अंतराल संरचना",
      "formulaDescription": "यह वर्क शिफ्ट शेड्यूल मेकर रोटेशनल शिफ्ट्स (डे, इवनिंग, नाइट, ऑफ) को कई हफ्तों के रोस्टर में व्यवस्थित करता है। यह दो शिफ्टों के बीच अनिवार्य आराम (मानक 11 घंटे) की जांच करता है और कुल कार्य घंटों की गणना सीधे ब्राउज़र में करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "शिफ्ट पैटर्न चुनें",
          "instruction": "2-शिफ्ट, 3-शिफ्ट (सुबह/शाम/रात) या 4-दिन कार्य व 4-दिन अवकाश पैटर्न चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "स्टाफ रोस्टर भरें",
          "instruction": "कर्मचारियों के नाम दर्ज करें और कैलेंडर में शिफ्ट कोड (D, E, N, OFF) भरें।"
        },
        {
          "stepNumber": 3,
          "title": "आराम का समय जांचें",
          "instruction": "सुनिश्चित करें कि किसी भी कर्मचारी को रात की शिफ्ट के तुरंत बाद सुबह की शिफ्ट न मिले।"
        },
        {
          "stepNumber": 4,
          "title": "रोस्टर प्रिंट करें",
          "instruction": "नोटिस बोर्ड पर लगाने के लिए स्वच्छ रोस्टर शीट प्रिंट करें या PDF डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "अस्पताल नर्सिंग 3-शिफ्ट रोस्टर उदाहरण",
        "scenario": "12 नर्सों के लिए सुबह, शाम और रात की 24/7 अस्पताल इमरजेंसी ड्यूटी बनाना।",
        "calculation": "24/7 कवरेज = 3 शिफ्ट प्रतिदिन। रात की शिफ्ट के बाद 48 घंटे का अनिवार्य रिकवरी समय।",
        "result": "थकावट मुक्त और 11 घंटे के अनिवार्य आराम नियमों का पालन करने वाला रोस्टर तैयार।"
      },
      "faqs": [
        {
          "question": "दो शिफ्टों के बीच अनिवार्य आराम का समय कितना होना चाहिए?",
          "answer": "श्रम मानकों के अनुसार कर्मचारियों को 24 घंटे की अवधि में दो शिफ्टों के बीच कम से कम 11 घंटे का निरंतर आराम मिलना चाहिए।"
        },
        {
          "question": "रात की ड्यूटी के तुरंत बाद सुबह की ड्यूटी खतरनाक क्यों है?",
          "answer": "इससे नींद पूरी नहीं होती और शारीरिक थकान के कारण कार्यस्थल पर गलतियों और दुर्घटनाओं का खतरा बढ़ जाता है।"
        },
        {
          "question": "क्या इसे A4 लैंडस्केप पेपर पर प्रिंट कर सकते हैं?",
          "answer": "हाँ। यह रोस्टर A4 लैंडस्केप पेपर पर पूरी चौड़ाई में बिल्कुल साफ प्रिंट होता है।"
        },
        {
          "question": "क्या कर्मचारियों के नाम सर्वर पर जाते हैं?",
          "answer": "नहीं। सभी डेटा केवल आपके ब्राउज़र की मेमोरी में सुरक्षित रहता है।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Programación de Patrones de Turnos Rotativos e Intervalos de Descanso",
      "formulaDescription": "El generador de turnos de trabajo organiza rotaciones cíclicas (Mañana, Tarde, Noche, Libre). Valida los descansos mínimos obligatorios (mínimo 11 horas entre turnos) y calcula horas trabajadas en el navegador sin servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Seleccionar patrón de turnos",
          "instruction": "Elija rotaciones de 2 o 3 turnos (Mañana/Tarde/Noche) o esquemas 4x4."
        },
        {
          "stepNumber": 2,
          "title": "Asignar personal",
          "instruction": "Introduzca nombres y códigos de turno (M, T, N, L) para cada día del mes."
        },
        {
          "stepNumber": 3,
          "title": "Comprobar descanso legal",
          "instruction": "Asegúrese de respetar el descanso mínimo de 11 horas entre jornadas consecutivas."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir cuadrante",
          "instruction": "Exporte la tabla mensual para el tablón de anuncios o distribución al equipo."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Cuadrante Hospitalario de 3 Turnos",
        "scenario": "Organizar turnos continuos para un equipo de enfermería de 12 personas.",
        "calculation": "Cobertura 24/7 en 3 turnos diarios con 48 h de descanso tras el turno nocturno.",
        "result": "Cuadrante sin solapamientos irregulares y con descansos legales garantizados."
      },
      "faqs": [
        {
          "question": "¿Cuál es el descanso obligatorio entre jornadas?",
          "answer": "La normativa laboral estipula un descanso mínimo de 11 horas consecutivas entre el final de una jornada y el inicio de la siguiente."
        },
        {
          "question": "¿Por qué evitar enlazar un turno de noche con uno de mañana?",
          "answer": "Altera el ritmo circadiano y provoca fatiga severa, multiplicando los riesgos de accidentes laborales."
        },
        {
          "question": "¿Se imprime bien en formato apaisado?",
          "answer": "Sí. El diseño está preparado para ajustarse a folios A4 horizontales."
        },
        {
          "question": "¿Los nombres del personal van a servidores externos?",
          "answer": "No. Todos los datos se quedan en el navegador de su equipo."
        }
      ]
    },
    "ja": {
      "formulaTitle": "交替勤務パターン編成および法定インターバル休息管理構造",
      "formulaDescription": "本シフト表作成ツールは、日勤・準夜勤・夜勤・休日の交替勤務ローテーションを編成。労働安全基準に沿った勤務間インターバル（11時間以上の休息）の遵守をチェックし、月間労働時間をローカルで自動計算します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "シフトパターンの選択",
          "instruction": "2交替、3交替（日勤/遅番/夜勤）、4勤4休など職場の勤務体系を選択します。"
        },
        {
          "stepNumber": 2,
          "title": "スタッフの配置",
          "instruction": "従業員名を入力し、日付ごとにシフト記号（日、遅、夜、休）を割り当てます。"
        },
        {
          "stepNumber": 3,
          "title": "勤務間インターバルの点検",
          "instruction": "夜勤明けの直後に日勤が入るなど、過重労働となる不適切な連直がないか確認します。"
        },
        {
          "stepNumber": 4,
          "title": "シフト表の出力・印刷",
          "instruction": "掲示板やスタッフ配布用に最適なA4横形式の月間シフト表を印刷します。"
        }
      ],
      "workedExample": {
        "title": "医療機関向け24時間3交替看護師シフト表作成実例",
        "scenario": "12名の看護スタッフを日勤・遅番・夜勤の3交替で公平にローテーションする例。",
        "calculation": "24時間体制 = 1日3交替。夜勤明け後は最低48時間のリカバリー休暇を自動確保。",
        "result": "過労事故を防ぐ法定11時間以上のインターバルを順守した安心のA4横シフト表が完成。"
      },
      "faqs": [
        {
          "question": "勤務間インターバル制度の法定基準は何時間ですか？",
          "answer": "労働基準法および各国の安全衛生ガイドラインに基づき、勤務終了から次の勤務開始まで最低11時間以上の休息を確保することが強く推奨されています。"
        },
        {
          "question": "夜勤明け直後の日勤（いわゆる逆連直）が危険な理由は何ですか？",
          "answer": "体内時計（概日リズム）が著しく乱れ、睡眠不足による医療過誤や現場事故の発生率が急激に跳ね上がるためです。"
        },
        {
          "question": "A4横向きサイズで綺麗に印刷できますか？",
          "answer": "はい。A4横向き印刷に最適化されたグリッドレイアウトを採用しています。"
        },
        {
          "question": "スタッフの個人情報が外部に漏れる心配はありませんか？",
          "answer": "いいえ。すべてのデータはお使いの端末のブラウザ内でのみ処理されます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Planification des Horaires Décalés et Gestion des Temps de Repos",
      "formulaDescription": "Le gestionnaire de plannings en équipes organise les rotations (Matin, Soir, Nuit, Repos). Il vérifie le temps de repos obligatoire (minimum 11 heures) et totalise les heures sans serveur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choisir le cycle de travail",
          "instruction": "Sélectionnez un modèle en 2x8, 3x8 ou rotation 4 jours travaillés / 4 jours de repos."
        },
        {
          "stepNumber": 2,
          "title": "Compléter le planning",
          "instruction": "Affectez les codes (M, S, N, R) pour chaque salarié sur la période."
        },
        {
          "stepNumber": 3,
          "title": "Contrôler les temps de repos",
          "instruction": "Vérifiez l'absence d'enchaînement nuit/matin non conforme aux normes."
        },
        {
          "stepNumber": 4,
          "title": "Imprimer le tableau",
          "instruction": "Exportez le planning mensuel pour l'affichage en entreprise."
        }
      ],
      "workedExample": {
        "title": "Exemple de Planning Hospitalier en 3x8",
        "scenario": "Organisation des rotations pour une équipe soignante de 12 personnes.",
        "calculation": "Continuité 24h/24 en 3 équipes avec repos de 48h après les gardes de nuit.",
        "result": "Planning sécurisé respectant les 11 heures de repos consécutives."
      },
      "faqs": [
        {
          "question": "Quelle est la durée du repos obligatoire entre deux postes ?",
          "answer": "Le Code du travail et les directives européennes imposent un repos quotidien d'au moins 11 heures consécutives."
        },
        {
          "question": "Pourquoi interdire l'enchaînement nuit-matin ?",
          "answer": "Ce type de roulement prive le travailleur d'un sommeil réparateur, augmentant fortement les risques professionnels."
        },
        {
          "question": "L'impression paysage est-elle disponible ?",
          "answer": "Oui. Le tableau s'adapte automatiquement au format A4 horizontal."
        },
        {
          "question": "Les noms des salariés sont-ils protégés ?",
          "answer": "Oui. Aucune information ne quitte votre ordinateur."
        }
      ]
    },
    "de": {
      "formulaTitle": "Schichtplan-Mustererstellung & Gesetzliche Ruhezeit-Architektur",
      "formulaDescription": "Der Schichtplaner strukturiert rollierende Arbeitszeiten (Früh-, Spät-, Nachtschicht, Frei). Er prüft gesetzliche Mindestruhezeiten (11 Stunden) und summiert Arbeitsstunden direkt im Browser.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Schichtmodell festlegen",
          "instruction": "Wählen Sie 2-Schicht-, 3-Schicht-Systeme oder 4-Tage-Rotationsmodelle."
        },
        {
          "stepNumber": 2,
          "title": "Mitarbeiter einteilen",
          "instruction": "Tragen Sie Namen und Schichtkürzel (F, S, N, Frei) im Kalender ein."
        },
        {
          "stepNumber": 3,
          "title": "Ruhezeiten einhalten",
          "instruction": "Prüfen Sie, dass zwischen Schichten mindestens 11 Stunden Ruhezeit liegen."
        },
        {
          "stepNumber": 4,
          "title": "Dienstplan drucken",
          "instruction": "Geben Sie den Dienstplan im A4-Querformat für den Aushang aus."
        }
      ],
      "workedExample": {
        "title": "Beispiel für Krankenhaus-Schichtplan im 3-Schicht-System",
        "scenario": "Einteilung von 12 Pflegekräften im 24/7-Betrieb (Früh, Spät, Nacht).",
        "calculation": "24/7-Abdeckung in 3 Schichten mit 48 Stunden Regenerationszeit nach Nachtschichten.",
        "result": "Rechtssicherer Dienstplan mit garantierten 11 Stunden Mindestruhezeit."
      },
      "faqs": [
        {
          "question": "Wie lang muss die gesetzliche Ruhezeit zwischen Schichten sein?",
          "answer": "Nach dem Arbeitszeitgesetz müssen Arbeitnehmer nach Beendigung der täglichen Arbeitszeit eine ununterbrochene Ruhezeit von mindestens 11 Stunden haben."
        },
        {
          "question": "Warum sind kurze Schichtwechsel gefährlich?",
          "answer": "Sie stören den Biorhythmus massiv und führen zu chronischer Übermüdung und Unfallgefahr."
        },
        {
          "question": "Ist der Ausdruck im A4-Querformat möglich?",
          "answer": "Ja. Die Tabelle ist für A4-Querformat optimiert."
        },
        {
          "question": "Bleiben Personaldaten geschützt?",
          "answer": "Ja. Die Speicherung erfolgt ausschließlich lokal im Browser."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Escala de Turnos Rotativos e Gestão de Intervalos de Descanso",
      "formulaDescription": "O gerador de escalas organiza turnos rotativos (Manhã, Tarde, Noite, Folga). Verifica o intervalo interjornada de descanso legal (mínimo de 11 horas) e calcula horas trabalhadas com total privacidade.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escolher modelo de escala",
          "instruction": "Selecione escalas 12x36, 6x1 ou revezamento 3 turnos (Manhã, Tarde, Noite)."
        },
        {
          "stepNumber": 2,
          "title": "Alocar colaboradores",
          "instruction": "Preencha os nomes dos funcionários e códigos de turno (M, T, N, F)."
        },
        {
          "stepNumber": 3,
          "title": "Verificar descanso interjornada",
          "instruction": "Confirme o cumprimento das 11 horas mínimas de intervalo entre turnos."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir escala de serviço",
          "instruction": "Imprima a escala do mês em A4 para o mural da empresa ou envio à equipe."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Escala Hospitalar de Enfermagem em 3 Turnos",
        "scenario": "Organização de 12 enfermeiros em plantões de manhã, tarde e noite em pronto-socorro.",
        "calculation": "Cobertura 24 horas por dia em 3 turnos com 48h de folga pós-plantão noturno.",
        "result": "Escala de serviço regularizada com cumprimento do intervalo de 11h de descanso."
      },
      "faqs": [
        {
          "question": "Qual o intervalo mínimo entre jornadas de trabalho (interjornada)?",
          "answer": "A legislação trabalhista estabelece um descanso mínimo de 11 horas consecutivas entre o término de um turno e o início do próximo."
        },
        {
          "question": "Por que a dobra de turno sem descanso é prejudicial?",
          "answer": "Desregula o ciclo biológico, provocando esgotamento físico e elevando o risco de acidentes de trabalho."
        },
        {
          "question": "É possível imprimir em formato paisagem (A4 horizontal)?",
          "answer": "Sim. A escala se ajusta perfeitamente à largura do papel A4 horizontal."
        },
        {
          "question": "Os dados dos funcionários são enviados para a internet?",
          "answer": "Não. Os nomes e escalas ficam guardados apenas no navegador local."
        }
      ]
    },
    "ko": {
      "formulaTitle": "교대근무 순환 패턴 편성 및 법정 휴게 시간 관리 구조",
      "formulaDescription": "본 교대근무 스케줄러는 주간, 야간, 심야, 비번 등 순환 교대 로스터를 편성합니다. 표준 근로 지침에 따른 근무 간 최소 휴게 시간(11시간 이상)을 점검하고 주간 및 월간 총 근로시간을 브라우저 로컬에서 자동 산출합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "교대근무 형태 선택",
          "instruction": "2교대, 3교대(주간/오후/야간), 4조 3교대 또는 4勤4休 등 사업장 형태를 선택합니다."
        },
        {
          "stepNumber": 2,
          "title": "근무자별 로스터 배정",
          "instruction": "근무자 이름을 등록하고 일자별 근무 코드(주, 야, 비, 휴)를 배정합니다."
        },
        {
          "stepNumber": 3,
          "title": "법정 휴게 인터벌 점검",
          "instruction": "야간 근무 직후 다음 날 주간 근무 배정 등 위법한 연속 배치가 없는지 검증합니다."
        },
        {
          "stepNumber": 4,
          "title": "근무표 인쇄 및 배포",
          "instruction": "사내 게시판 부착 및 직원 공유용 A4 가로형 근무표를 출력하거나 PDF로 저장합니다."
        }
      ],
      "workedExample": {
        "title": "병원 24시간 3교대 간호사 근무표 편성 실전 예시",
        "scenario": "12명의 간호 인력을 대상으로 주간, 야간, 심야 3교대 응급실 로스터 편성.",
        "calculation": "24시간 연속 가동 = 일일 3교대 배정. 심야 근무(Night) 종료 후 48시간 회복 휴무 보장.",
        "result": "근무자 피로를 최소화하고 11시간 휴게 규정을 준수한 안전한 A4 가로형 근무표 완성."
      },
      "faqs": [
        {
          "question": "교대근무 간 법정 최소 휴게 시간은 몇 시간인가요?",
          "answer": "근로기준법 및 국제 노동 기준에 따라 연속된 근무 사이에는 최소 11시간 이상의 연속 휴게 시간이 법적으로 보장되어야 합니다."
        },
        {
          "question": "야간 근무 직후 다음 날 주간 근무 배치가 왜 위험한가요?",
          "answer": "수면 생체 리듬이 파괴되어 만성 피로와 면역력 저하를 유발하며, 집중력 저하로 인한 산업재해 발생률이 급증하기 때문입니다."
        },
        {
          "question": "A4 가로 방향으로 인쇄할 수 있나요?",
          "answer": "네. 월간 근무표가 A4 가로 규격에 꽉 차게 인쇄되도록 레이아웃이 설정되어 있습니다."
        },
        {
          "question": "직원 명단이 외부 서버로 유출될 염려가 없나요?",
          "answer": "안전합니다. 모든 직원 이름과 근무 일정은 사용자 브라우저 메모리에만 국한되어 저장됩니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Pianificazione dei Turni Rotativi e Gestione del Riposo Obbligatorio",
      "formulaDescription": "Il creatore di turni gestisce rotazioni complesse (Mattina, Pomeriggio, Notte, Riposo). Verifica l'intervallo minimo di riposo (almeno 11 ore) e conteggia le ore di lavoro nel browser.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scegliere il modello di turno",
          "instruction": "Seleziona turni in 2x8, 3x8 o rotazioni 4 giorni di lavoro e 4 di riposo."
        },
        {
          "stepNumber": 2,
          "title": "Assegnare i dipendenti",
          "instruction": "Inserisci i nomi del personale e le sigle di turno (M, P, N, R) nei giorni."
        },
        {
          "stepNumber": 3,
          "title": "Controllare il riposo di legge",
          "instruction": "Accertati che tra due turni consecutivi intercorrano almeno 11 ore."
        },
        {
          "stepNumber": 4,
          "title": "Stampare il tabellone turni",
          "instruction": "Stampa il prospetto mensile per la bacheca aziendale o i collaboratori."
        }
      ],
      "workedExample": {
        "title": "Esempio di Turnazione Infermieristica Ospedaliera in 3x8",
        "scenario": "Copertura continuativa h24 per un reparto di pronto soccorso con 12 infermieri.",
        "calculation": "3 turni giornalieri con 48 ore di distacco dopo il turno di notte.",
        "result": "Tabellone conforme alle norme europee sul riposo di 11 ore consecutive."
      },
      "faqs": [
        {
          "question": "Qual è il riposo minimo obbligatorio tra due turni?",
          "answer": "Le direttive stabiliscono un periodo di riposo consecutivo non inferiore a 11 ore ogni 24 ore."
        },
        {
          "question": "Perché i cambi turno ravvicinati sono pericolosi?",
          "answer": "Infrangono il ritmo sonno-veglia, favorendo distrazioni e infortuni sul posto di lavoro."
        },
        {
          "question": "La stampa orizzontale è supportata?",
          "answer": "Sì. La tabella dei turni occupa in modo ottimale la pagina A4 orizzontale."
        },
        {
          "question": "I dati del personale restano riservati?",
          "answer": "Sì. Tutte le informazioni rimangono sul computer locale."
        }
      ]
    }
  },
  "workout-timetable-maker": {
    "en": {
      "formulaTitle": "Hypertrophy Muscle Recovery Windows & Weekly Split Architecture",
      "formulaDescription": "The workout timetable maker structures resistance training splits (Push/Pull/Legs, Upper/Lower, Full Body) alongside cardiovascular intervals. It calculates 48-to-72-hour muscle protein synthesis recovery windows client-side, ensuring targeted muscle groups regenerate adequately without cloud tracking.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choose Workout Split",
          "instruction": "Select Push/Pull/Legs (PPL), Upper/Lower 4-day split, or Full Body 3-day routine."
        },
        {
          "stepNumber": 2,
          "title": "Assign Target Exercises",
          "instruction": "Input compound lifts (squats, bench, deadlifts) and accessory volume across training days."
        },
        {
          "stepNumber": 3,
          "title": "Integrate Rest & Cardio Days",
          "instruction": "Ensure each major muscle group receives 48 to 72 hours of recovery before being trained again."
        },
        {
          "stepNumber": 4,
          "title": "Print Workout Card",
          "instruction": "Export a pocket-sized gym card or A4 print sheet to take to the weight room."
        }
      ],
      "workedExample": {
        "title": "4-Day Upper/Lower Strength Hypertrophy Split",
        "scenario": "Balancing heavy compound barbell strength with hypertrophy accessory volume across 4 weekly gym days.",
        "calculation": "Mon: Upper Body Heavy (Chest/Back) -> Tue: Lower Body Heavy (Quads/Hamstrings) -> Wed: Rest -> Thu: Upper Hypertrophy -> Fri: Lower Hypertrophy -> Sat/Sun: Active Recovery.",
        "result": "Scientifically validated routine guaranteeing 72h recovery between identical muscle sessions."
      },
      "faqs": [
        {
          "question": "Why is 48 to 72 hours of recovery between muscle sessions necessary?",
          "answer": "Resistance training induces micro-tears in muscle fibers. Muscle protein synthesis (MPS) remains elevated for 24 to 48 hours post-workout. Retraining too early impairs growth and elevates overtraining injury risk."
        },
        {
          "question": "Should cardio be performed before or after resistance training?",
          "answer": "For hypertrophy and strength goals, perform resistance training first while glycogen stores and central nervous system alertness are highest, followed by low-intensity steady-state cardio."
        },
        {
          "question": "Is this printable for the gym?",
          "answer": "Yes. The Print / PDF view scales cleanly to fit compact workout log clipboards."
        },
        {
          "question": "Are workout logs saved in the browser?",
          "answer": "Yes. All routines and exercises persist in local storage."
        }
      ]
    },
    "hi": {
      "formulaTitle": "मांसपेशी रिकवरी समय और साप्ताहिक कसरत विभाजन संरचना",
      "formulaDescription": "यह वर्कआउट टाइमटेबल मेकर स्ट्रेंथ ट्रेनिंग (Push/Pull/Legs, Upper/Lower) और कार्डियो सत्रों को व्यवस्थित करता है। यह मांसपेशियों की 48 से 72 घंटे की रिकवरी अवधि को ध्यान में रखते हुए बिना किसी सर्वर के व्यक्तिगत फिटनेस प्लान तैयार करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "कसरत विभाजन चुनें",
          "instruction": "Push/Pull/Legs (PPL), अपर/लोअर 4-दिवसीय या फुल बॉडी 3-दिवसीय स्प्लिट चुनें।"
        },
        {
          "stepNumber": 2,
          "title": "व्यायाम और सेट्स दर्ज करें",
          "instruction": "कंपाउंड एक्सरसाइज (स्क्वैट, बेंच प्रेस, डेडलिफ्ट) को उपयुक्त दिनों में जोड़ें।"
        },
        {
          "stepNumber": 3,
          "title": "विश्राम और कार्डियो दिन जोड़ें",
          "instruction": "मांसपेशियों को दोबारा ट्रेन करने से पहले 48 से 72 घंटे का आराम देना सुनिश्चित करें।"
        },
        {
          "stepNumber": 4,
          "title": "जिम कार्ड प्रिंट करें",
          "instruction": "जिम में साथ ले जाने के लिए साफ A4 वर्कआउट शीट या मोबाइल फ्रेंडली कार्ड डाउनलोड करें।"
        }
      ],
      "workedExample": {
        "title": "4-दिवसीय अपर/लोअर स्ट्रेंथ वर्कआउट उदाहरण",
        "scenario": "सप्ताह में 4 दिन जिम जाकर भारी लिफ्टिंग और हाइपरट्रॉफी में संतुलन बनाना।",
        "calculation": "सोम: अपर बॉडी -> मंगल: लोअर बॉडी -> बुध: आराम -> गुरु: अपर बॉडी -> शुक्र: लोअर बॉडी -> शनि/रवि: एक्टिव रिकवरी।",
        "result": "प्रत्येक मांसपेशी को 72 घंटे का पूरा आराम देने वाला वैज्ञानिक वर्कआउट प्लान तैयार।"
      },
      "faqs": [
        {
          "question": "कसरत के बाद 48 से 72 घंटे का आराम क्यों जरूरी है?",
          "answer": "भारी वजन उठाने से मांसपेशियों के फाइबर टूटते हैं। नए फाइबर बनने में 24 से 48 घंटे लगते हैं। बिना आराम दोबारा कसरत करने से चोट लग सकती है।"
        },
        {
          "question": "कार्डियो वजन उठाने से पहले करना चाहिए या बाद में?",
          "answer": "मांसपेशियों के विकास और ताकत के लिए पहले वजन उठाना चाहिए और उसके बाद हल्का कार्डियो करना सबसे अच्छा होता है।"
        },
        {
          "question": "क्या इसे जिम ले जाने के लिए प्रिंट कर सकते हैं?",
          "answer": "हाँ। यह जिम क्लिपबोर्ड पर लगाने के लिए उपयुक्त आकार में प्रिंट होता है।"
        },
        {
          "question": "क्या कसरत का डेटा डिवाइस में सेव रहता है?",
          "answer": "हाँ। सभी एक्सरसाइज आपके ब्राउज़र स्टोरेज में सुरक्षित रहती हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Ventanas de Recuperación Muscular y Rutinas Divididas Semanales",
      "formulaDescription": "El planificador de entrenamientos organiza rutinas divididas (Empuje/Tirón/Pierna, Torso/Pierna) y cardio. Contempla ventanas de recuperación de 48 a 72 horas para hipertrofia en el navegador sin servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Elegir división de entrenamiento",
          "instruction": "Seleccione Empuje/Tirón/Pierna (PPL), Torso/Pierna o Cuerpo Completo."
        },
        {
          "stepNumber": 2,
          "title": "Añadir ejercicios clave",
          "instruction": "Incorpore ejercicios multiarticulares (sentadillas, press de banca, peso muerto) y accesorios."
        },
        {
          "stepNumber": 3,
          "title": "Respetar días de descanso",
          "instruction": "Asegúrese de dejar entre 48 y 72 horas de recuperación por grupo muscular."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir ficha de gimnasio",
          "instruction": "Descargue su ficha en tamaño A4 para llevarla al entrenamiento."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Rutina Torso/Pierna de 4 Días",
        "scenario": "Compaginar fuerza e hipertrofia con 4 días de entrenamiento semanales.",
        "calculation": "Lunes: Torso -> Martes: Pierna -> Miércoles: Descanso -> Jueves: Torso -> Viernes: Pierna -> Sábado/Domingo: Descanso activo.",
        "result": "Planificación que respeta 72 horas de recuperación entre sesiones idénticas."
      },
      "faqs": [
        {
          "question": "¿Por qué se requieren de 48 a 72 horas de descanso por músculo?",
          "answer": "El entrenamiento genera microrroturas fibrilares. La síntesis proteica tarda entre 24 y 48 horas en reparar el tejido. Entrenar sin descanso frena el crecimiento."
        },
        {
          "question": "¿Conviene hacer cardio antes o después de las pesas?",
          "answer": "Para fuerza e hipertrofia es preferible hacer pesas primero con el glucógeno intacto y el cardio suave al final."
        },
        {
          "question": "¿Es fácil de imprimir para el gimnasio?",
          "answer": "Sí. El botón de impresión genera una hoja clara para llevar en la mochila."
        },
        {
          "question": "¿Se guarda el entrenamiento automáticamente?",
          "answer": "Sí. Todo se almacena localmente en su navegador."
        }
      ]
    },
    "ja": {
      "formulaTitle": "筋肥大回復インターバル理論および週間スプリットルーティン構造",
      "formulaDescription": "本ワークアウト作成ツールは、筋力トレーニングの分割法（PPL法、上半身/下半身、全身法）と有酸素運動を体系的に配置。筋肉痛や疲労を回復させる48〜72時間の超回復インターバルを考慮した週間運動表をローカルで作成します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "トレーニング分割法の選択",
          "instruction": "PPL法（胸・背中・脚）、上半身/下半身2分割、週3回全身法などから選択します。"
        },
        {
          "stepNumber": 2,
          "title": "種目の配置",
          "instruction": "スクワット、ベンチプレス、デッドリフトなどの主要複合種目を曜日ごとに割り振ります。"
        },
        {
          "stepNumber": 3,
          "title": "休息日と有酸素運動の確保",
          "instruction": "同一筋肉部位に対し、48時間〜72時間の回復期間（超回復）が確保されているか確認します。"
        },
        {
          "stepNumber": 4,
          "title": "ジム用シートの印刷",
          "instruction": "トレーニングジムに持参しやすいA4サイズの運動メニュー表を印刷します。"
        }
      ],
      "workedExample": {
        "title": "週4日制上半身・下半身分割筋トレ計画の実例",
        "scenario": "高重量コンパウンド種目と筋肥大種目を組み合わせた週4回のジムルーティン例。",
        "calculation": "月: 上半身（胸・背中） -> 火: 下半身（大腿四頭筋・ハム） -> 水: 完全休養 -> 木: 上半身肥大 -> 金: 下半身肥大 -> 土日: 軽散歩。",
        "result": "同一筋群に72時間の超回復期間を確保した科学的根拠に基づくメニューが完成。"
      },
      "faqs": [
        {
          "question": "なぜ同一筋肉部位に48〜72時間の回復期間が必要なのですか？",
          "answer": "ウエイトトレーニングで傷ついた筋線維は、24〜48時間かけてタンパク質を再合成して強く修復（超回復）されます。回復前に再負荷をかけると筋肥大が阻害され怪我のリスクが高まるためです。"
        },
        {
          "question": "有酸素運動は筋トレの前と後、どちらが適していますか？",
          "answer": "筋力向上や筋肥大が目標なら、筋グリコーゲンが充実している状態で先にウエイトトレーニングを行い、その後に軽い有酸素運動を行うのが理想的です。"
        },
        {
          "question": "ジムに持参しやすい形式で印刷できますか？",
          "answer": "はい。クリップボードに挟んで使いやすいA4サイズで綺麗に出力されます。"
        },
        {
          "question": "トレーニングメニューは保存されますか？",
          "answer": "はい。設定した種目やスケジュールはお使いの端末に保存されます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Fenêtres de Récupération Musculaire et Planification Hebdomadaire",
      "formulaDescription": "Ce planificateur de musculation gère les routines d'entraînement (Push/Pull/Legs, Haut/Bas du corps). Il intègre les temps de récupération musculaire de 48 à 72 heures sans serveur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choisir la répartition",
          "instruction": "Optez pour un Push/Pull/Legs (PPL), un split Haut/Bas ou du Full Body."
        },
        {
          "stepNumber": 2,
          "title": "Planifier les exercices",
          "instruction": "Intégrez les mouvements polyarticulaires (squat, développé couché) et isolation."
        },
        {
          "stepNumber": 3,
          "title": "Gérer la récupération",
          "instruction": "Laissez 48 à 72 heures de repos à chaque groupe musculaire avant de le solliciter à nouveau."
        },
        {
          "stepNumber": 4,
          "title": "Imprimer la fiche",
          "instruction": "Exportez votre programme au format A4 à emporter à la salle de sport."
        }
      ],
      "workedExample": {
        "title": "Exemple de Split Haut/Bas du Corps sur 4 Jours",
        "scenario": "Organisation de 4 séances hebdomadaires conciliant force et volume musculaire.",
        "calculation": "Lundi : Haut -> Mardi : Bas -> Mercredi : Repos -> Jeudi : Haut -> Vendredi : Bas -> Week-end : Récupération.",
        "result": "Programme équilibré assurant 72 heures de repos entre séances identiques."
      },
      "faqs": [
        {
          "question": "Pourquoi respecter 48 à 72 heures de repos par muscle ?",
          "answer": "La musculation crée des micro-lésions. La synthèse protéique dure 24 à 48 heures. Solliciter un muscle trop tôt freine son développement et risque la blessure."
        },
        {
          "question": "Faut-il faire le cardio avant ou après la musculation ?",
          "answer": "Pour développer la force et le volume, réalisez la musculation en premier et terminez par du cardio modéré."
        },
        {
          "question": "La feuille est-elle facile à emporter en salle ?",
          "answer": "Oui. Le format d'impression A4 est pensé pour le presse-papier d'entraînement."
        },
        {
          "question": "Mon programme reste-t-il enregistré ?",
          "answer": "Oui. Tout est conservé dans le stockage local de votre navigateur."
        }
      ]
    },
    "de": {
      "formulaTitle": "Hypertrophie-Muskelregenerationszeiten & Wöchentliche Split-Architektur",
      "formulaDescription": "Der Trainingsplaner strukturiert Krafttrainings-Splits (Push/Pull/Legs, Ober-/Unterkörper) und Ausdauereinheiten. Er berücksichtigt 48- bis 72-stündige Muskelregenerationsphasen rein lokal.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Trainings-Split wählen",
          "instruction": "Wählen Sie Push/Pull/Legs, 2er-Split (Ober-/Unterkörper) oder Ganzkörpertraining."
        },
        {
          "stepNumber": 2,
          "title": "Übungen zuordnen",
          "instruction": "Tragen Sie Grundübungen (Kniebeugen, Bankdrücken, Kreuzheben) und Isolationsübungen ein."
        },
        {
          "stepNumber": 3,
          "title": "Ruhetage einplanen",
          "instruction": "Gewähren Sie jedem Muskel 48 bis 72 Stunden Pause für optimalen Muskelaufbau."
        },
        {
          "stepNumber": 4,
          "title": "Trainingsplan drucken",
          "instruction": "Drucken Sie Ihren Trainingsplan für das Fitnessstudio aus."
        }
      ],
      "workedExample": {
        "title": "Beispiel für 4-Tage-Ober-/Unterkörper-Split",
        "scenario": "Kombination aus Kraft- und Hypertrophietraining an 4 Trainingstagen.",
        "calculation": "Mo: Oberkörper -> Di: Unterkörper -> Mi: Pause -> Do: Oberkörper -> Fr: Unterkörper -> Sa/So: Aktive Erholung.",
        "result": "Wissenschaftlich fundierter Trainingsplan mit 72 Stunden Regenerationszeit."
      },
      "faqs": [
        {
          "question": "Warum sind 48 bis 72 Stunden Pause pro Muskelgruppe nötig?",
          "answer": "Krafttraining erzeugt Mikrorisse im Gewebe. Die Muskelproteinsynthese läuft 24 bis 48 Stunden. Zu frühes Weitertrainieren verhindert Muskelwachstum."
        },
        {
          "question": "Cardio vor oder nach dem Krafttraining?",
          "answer": "Für Muskelaufbau sollte das Krafttraining mit vollen Glykogenspeichern an erster Stelle stehen, gefolgt von moderatem Ausdauertraining."
        },
        {
          "question": "Kann der Plan für das Gym ausgedruckt werden?",
          "answer": "Ja. Die Druckversion passt genau auf Klemmbretter im Fitnessstudio."
        },
        {
          "question": "Bleibt der Trainingsplan gespeichert?",
          "answer": "Ja. Alle Übungen bleiben im lokalen Browserspeicher gesichert."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Janelas de Recuperação Muscular e Divisão Semanal de Treinos",
      "formulaDescription": "O planejador de treinos estrutura divisões musculares (Push/Pull/Legs, Superior/Inferior) e cardio. Respeita a janela de recuperação de 48 a 72 horas para hipertrofia sem enviar dados para a nuvem.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escolher divisão de treino",
          "instruction": "Selecione Push/Pull/Legs (PPL), Superior/Inferior ou Treino Full Body."
        },
        {
          "stepNumber": 2,
          "title": "Listar exercícios",
          "instruction": "Distribua agachamento, supino, levantamento terra e exercícios isoladores."
        },
        {
          "stepNumber": 3,
          "title": "Garantir descanso muscular",
          "instruction": "Reserve de 48 a 72 horas de intervalo para recuperação de cada músculo trabalhado."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir ficha de treino",
          "instruction": "Gere uma folha prática para levar à academia e registrar cargas."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Treino Superior/Inferior de 4 Dias",
        "scenario": "Equilíbrio entre força e hipertrofia muscular com 4 treinos semanais na academia.",
        "calculation": "Seg: Superior -> Ter: Inferior -> Qua: Descanso -> Qui: Superior -> Sex: Inferior -> Sáb/Dom: Descanso.",
        "result": "Rotina eficiente com 72 horas de recuperação entre treinos do mesmo grupo muscular."
      },
      "faqs": [
        {
          "question": "Por que o descanso de 48 a 72 horas é essencial para o músculo?",
          "answer": "O treino causa microlesões nas fibras musculares. A recuperação e síntese proteica levam até 48h. Treinar sem descanso impede a hipertrofia e causa lesões."
        },
        {
          "question": "É melhor fazer aeróbico antes ou depois da musculação?",
          "answer": "Para hipertrofia, faça o treino de musculação primeiro com energia máxima e deixe o cardio leve para o final."
        },
        {
          "question": "Dá para imprimir para levar à academia?",
          "answer": "Sim. A impressão sai formatada para pranchetas de treino."
        },
        {
          "question": "A ficha de exercícios fica salva?",
          "answer": "Sim. Todos os dados permanecem salvos no navegador do aparelho."
        }
      ]
    },
    "ko": {
      "formulaTitle": "근비대 회복 주기 및 주간 분할 운동 루틴 스케줄링 구조",
      "formulaDescription": "본 운동 시간표 플래너는 3분할(Push/Pull/Legs), 2분할(상체/하체), 무분할 등 근력 운동 루틴과 유산소 운동을 체계적으로 배분합니다. 근육 합성과 초회복에 필요한 48~72시간의 휴식 주기를 반영하여 안전한 주간 운동 일정을 완성합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "운동 분할 방식 선택",
          "instruction": "3분할(Push/Pull/Legs), 상체/하체 2분할, 주 3회 무분할 중 체력에 맞는 방식을 선택합니다."
        },
        {
          "stepNumber": 2,
          "title": "목표 운동 종목 배치",
          "instruction": "스쿼트, 벤치프레스, 데드리프트 등 핵심 다관절 복합 운동과 고립 운동을 요일별로 배정합니다."
        },
        {
          "stepNumber": 3,
          "title": "초회복 휴식일 설정",
          "instruction": "동일 근육 부위가 재운동 전 48~72시간 동안 충분히 회복되도록 휴식일을 배치합니다."
        },
        {
          "stepNumber": 4,
          "title": "헬스장용 루틴표 출력",
          "instruction": "헬스장에 휴대하여 세트 수와 중량을 기록할 수 있는 깔끔한 A4 운동 카드를 인쇄합니다."
        }
      ],
      "workedExample": {
        "title": "주 4일 상체/하체 2분할 근비대 운동 루틴 실전 예시",
        "scenario": "고중량 프리웨이트와 머신 고립 운동을 조화롭게 배분한 4일 주기 피트니스 계획.",
        "calculation": "월: 상체 중량 -> 화: 하체 중량 -> 수: 완전 휴식 -> 목: 상체 볼륨 -> 금: 하체 볼륨 -> 주말: 산책 및 스트레칭.",
        "result": "동일 부위 재운동 시 72시간의 초회복 기간을 철저히 보장하는 과학적 루틴 완성."
      },
      "faqs": [
        {
          "question": "동일 부위 재운동 시 왜 48~72시간의 휴식이 필수적인가요?",
          "answer": "근력 운동은 근섬유에 미세 손상을 유발하며, 단백질 재합성과 초회복에는 24~48시간 이상이 소요됩니다. 충분한 휴식 없이 운동하면 근손실과 오버트레이닝 부상이 발생합니다."
        },
        {
          "question": "유산소 운동은 웨이트 트레이닝 전과 후 중 언제 하는 것이 좋은가요?",
          "answer": "근비대와 근력 증가가 목표라면 글리코겐이 충분한 운동 초반에 웨이트를 먼저 수행하고, 마무리로 저강도 유산소를 하는 것이 가장 효과적입니다."
        },
        {
          "question": "헬스장에서 보며 운동할 수 있게 인쇄되나요?",
          "answer": "네. A4 한 장에 깔끔하게 정돈되어 클립보드에 끼워 운동 중 확인하기에 최적화되어 있습니다."
        },
        {
          "question": "운동 프로그램이 브라우저에 저장되나요?",
          "answer": "네. 입력한 종목과 요일별 설정이 로컬 스토리지에 안전하게 보관됩니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Finestre di Recupero Muscolare e Schede Settimanali di Allenamento",
      "formulaDescription": "Il pianificatore di allenamento organizza schede in multifrequenza (Push/Pull/Legs, Upper/Lower) e cardio, garantendo il recupero muscolare di 48-72 ore direttamente nel browser.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Scegliere la scheda split",
          "instruction": "Seleziona Push/Pull/Legs, Upper/Lower a 4 giorni o Full Body su 3 giorni."
        },
        {
          "stepNumber": 2,
          "title": "Inserire gli esercizi chiave",
          "instruction": "Assegna squat, panca piana, stacco da terra ed esercizi complementari."
        },
        {
          "stepNumber": 3,
          "title": "Pianificare il riposo",
          "instruction": "Consenti da 48 a 72 ore di recupero a ciascun distretto muscolare."
        },
        {
          "stepNumber": 4,
          "title": "Stampare la scheda",
          "instruction": "Esporta la scheda in formato A4 da portare con te in sala pesi."
        }
      ],
      "workedExample": {
        "title": "Esempio di Scheda Upper/Lower a 4 Giorni",
        "scenario": "Allenamento su 4 giorni combinando forza e ipertrofia muscolare.",
        "calculation": "Lunedì: Upper -> Martedì: Lower -> Mercoledì: Riposo -> Giovedì: Upper -> Venerdì: Lower -> Fine settimana: Recupero.",
        "result": "Scheda con 72 ore di riposo garantito tra allenamenti dello stesso gruppo."
      },
      "faqs": [
        {
          "question": "Perché sono necessarie 48-72 ore di riposo per muscolo?",
          "answer": "L'allenamento crea microlesioni muscolari. La sintesi proteica lavora per 24-48 ore. Allenarsi troppo presto blocca l'ipertrofia e aumenta il rischio di infortuni."
        },
        {
          "question": "Il cardio va fatto prima o dopo i pesi?",
          "answer": "Per l'ipertrofia conviene sollevare pesi all'inizio con il massimo delle energie e fare cardio leggero a fine seduta."
        },
        {
          "question": "Si può stampare comodamente per la palestra?",
          "answer": "Sì. La stampa genera una scheda pratica da portare con sé."
        },
        {
          "question": "La scheda rimane salvata?",
          "answer": "Sì. Tutte le impostazioni restano nel browser del dispositivo."
        }
      ]
    }
  },
  "meal-timetable-planner": {
    "en": {
      "formulaTitle": "Nutritional Macronutrient Balancing & Weekly Meal Prep Architecture",
      "formulaDescription": "The meal planner coordinates weekly dietary menus across breakfast, lunch, dinner, and snacks. It balances macronutrient profiles (protein, complex carbohydrates, healthy fats) and synthesizes consolidated grocery shopping lists directly inside browser memory without uploading personal dietary choices to cloud servers.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Define Nutritional Goals",
          "instruction": "Set daily dietary targets (high-protein, Mediterranean, balanced maintenance, or deficit)."
        },
        {
          "stepNumber": 2,
          "title": "Plan 7-Day Meal Blocks",
          "instruction": "Fill breakfast, lunch, dinner, and snacks for each day from Monday to Sunday."
        },
        {
          "stepNumber": 3,
          "title": "Generate Grocery List",
          "instruction": "Consolidate needed fresh produce, proteins, and pantry staples into a unified checklist."
        },
        {
          "stepNumber": 4,
          "title": "Print Menu & Shopping List",
          "instruction": "Print the weekly menu for your refrigerator door and take the shopping checklist to the store."
        }
      ],
      "workedExample": {
        "title": "7-Day High-Protein Meal Prep Plan",
        "scenario": "Planning 21 nutritious meals for a busy couple focused on healthy cooking and minimizing food waste.",
        "calculation": "Mon–Wed: Batch-prepped Grilled Salmon & Quinoa Bowls. Thu–Fri: Turkey Chili & Brown Rice. Sat–Sun: Fresh Stir-Fries.",
        "result": "Weekly grocery list with exact portion quantities eliminating midweek grocery runs and takeout spending."
      },
      "faqs": [
        {
          "question": "How does meal planning reduce household grocery expenses?",
          "answer": "Planning 7 days of meals allows buying ingredients in bulk, prevents spontaneous convenience store purchases, and eliminates forgotten spoiled vegetables from the bottom of the crisper."
        },
        {
          "question": "Can I print both the weekly menu and the grocery checklist?",
          "answer": "Yes. The Print / PDF view outputs a two-column clean sheet with the menu on top and the categorized shopping list below."
        },
        {
          "question": "Is my dietary data private?",
          "answer": "Yes. All recipes and notes remain strictly inside your browser local storage."
        },
        {
          "question": "Can I customize meal categories (e.g. adding pre-workout snacks)?",
          "answer": "Yes. You can add or rename custom meal blocks to suit your routine."
        }
      ]
    },
    "hi": {
      "formulaTitle": "पोषण मैक्रोन्यूट्रिएंट संतुलन और साप्ताहिक भोजन तैयारी संरचना",
      "formulaDescription": "यह भोजन योजनाकार नाश्ते, दोपहर के भोजन, रात के खाने और स्नैक्स के साप्ताहिक मेनू को व्यवस्थित करता है। यह पोषक तत्वों (प्रोटीन, कार्ब्स, फैट्स) का संतुलन बनाता है और बिना सर्वर अपलोड के सीधे किराने की खरीदारी सूची तैयार करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "पोषण लक्ष्य निर्धारित करें",
          "instruction": "अपने आहार का लक्ष्य तय करें (उच्च प्रोटीन, संतुलित आहार या वजन घटाना)।"
        },
        {
          "stepNumber": 2,
          "title": "7-दिन का भोजन मेनू बनाएं",
          "instruction": "सोमवार से रविवार तक नाश्ता, दोपहर का खाना और रात का खाना तय करें।"
        },
        {
          "stepNumber": 3,
          "title": "किराने की सूची बनाएं",
          "instruction": "आवश्यक सब्जियों, दालों और राशन सामग्री की खरीदारी सूची तैयार करें।"
        },
        {
          "stepNumber": 4,
          "title": "प्रिंट करें",
          "instruction": "फ्रिज पर लगाने के लिए मेनू और खरीदारी सूची को A4 पेपर पर प्रिंट करें।"
        }
      ],
      "workedExample": {
        "title": "7-दिवसीय हाई-प्रोटीन भोजन योजना उदाहरण",
        "scenario": "स्वस्थ भोजन और भोजन की बर्बादी रोकने के लिए पूरे सप्ताह का संतुलित मेनू बनाना।",
        "calculation": "सोम–बुध: पनीर व दाल पुलाव। गुरु–शुक्र: सोयाबीन करी और रोटी। शनि–रवि: ताजी हरी सब्जियां व सलाद।",
        "result": "बिना किसी परेशानी के पूरे सप्ताह की भोजन सूची और किराने का सामान तैयार।"
      },
      "faqs": [
        {
          "question": "भोजन की पहले से योजना बनाने से पैसे कैसे बचते हैं?",
          "answer": "हफ्ते भर का मेनू तय होने से केवल जरूरत का सामान खरीदा जाता है, बाहर का खाना कम होता है और सब्जियां खराब होकर फेंकने से बचती हैं।"
        },
        {
          "question": "क्या मेनू और राशन सूची दोनों एक साथ प्रिंट हो सकते हैं?",
          "answer": "हाँ। प्रिंट लेआउट में ऊपर हफ्ते का मेनू और नीचे किराने की सूची साफ दिखाई देती है।"
        },
        {
          "question": "क्या मेरी खान-पान की जानकारी सुरक्षित है?",
          "answer": "हाँ। सभी रेसिपी और मेनू केवल आपके डिवाइस में सुरक्षित रहते हैं।"
        },
        {
          "question": "क्या नए स्नैक या शेक के लिए अतिरिक्त समय जोड़ा जा सकता है?",
          "answer": "हाँ। आप अपनी पसंद से नए भोजन या स्नैक्स स्लॉट जोड़ सकते हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Equilibrio de Macronutrientes y Planificación Semanal de Comidas",
      "formulaDescription": "El planificador de comidas organiza el menú semanal (desayuno, almuerzo, cena y meriendas). Equilibra macronutrientes y elabora listas de la compra en la memoria del navegador sin enviar datos personales.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Fijar objetivos nutricionales",
          "instruction": "Defina su enfoque dietético (alto en proteínas, mediterráneo, déficit calórico)."
        },
        {
          "stepNumber": 2,
          "title": "Planificar los 7 días",
          "instruction": "Indique desayuno, comida, cena y tentempiés de lunes a domingo."
        },
        {
          "stepNumber": 3,
          "title": "Elaborar lista de la compra",
          "instruction": "Agrupe verduras, carnes y legumbres necesarias para la semana."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir menú y lista",
          "instruction": "Imprima el menú semanal para colgar en la nevera y compre sin despilfarro."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Plan Semanal de Comidas Saludables",
        "scenario": "Planificar 21 comidas nutritivas para ahorrar tiempo entre semana y evitar comida rápida.",
        "calculation": "Lunes a miércoles: Salmón con quinoa. Jueves y viernes: Lentejas estofadas. Fin de semana: Salteados frescos.",
        "result": "Lista de la compra exacta que reduce el desperdicio y el gasto en comida precocinada."
      },
      "faqs": [
        {
          "question": "¿Cómo ayuda la planificación de comidas a ahorrar dinero?",
          "answer": "Evita compras impulsivas y comidas a domicilio de última hora, permitiendo aprovechar todos los ingredientes antes de que caduquen."
        },
        {
          "question": "¿Se puede imprimir el menú y la lista de la compra juntos?",
          "answer": "Sí. La vista de impresión organiza el menú arriba y la lista de ingredientes abajo."
        },
        {
          "question": "¿Son privados mis datos de alimentación?",
          "answer": "Sí. Toda la información permanece en el almacenamiento local de su navegador."
        },
        {
          "question": "¿Permite añadir meriendas o snacks adicionales?",
          "answer": "Sí. Puede personalizar y renombrar los bloques según sus hábitos diarios."
        }
      ]
    },
    "ja": {
      "formulaTitle": "三大栄養素バランス設計および週間ミールプレップ管理構造",
      "formulaDescription": "本献立プランナーは、朝食・昼食・夕食・間食の週間メニューを体系化。PFCバランス（タンパク質・脂質・炭水化物）を意識した健康管理と、必要な食材の買い物リスト作成をサーバー送信なしでローカルに実現します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "栄養目標の設定",
          "instruction": "高タンパク、カロリー制限、バランス維持など健康目標を決めます。"
        },
        {
          "stepNumber": 2,
          "title": "7日間の献立入力",
          "instruction": "月曜から日曜までの朝食・昼食・夕食・間食のメニューを登録します。"
        },
        {
          "stepNumber": 3,
          "title": "買い物リストの自動整理",
          "instruction": "必要な生鮮食品、肉・魚、調味料をカテゴリー別にリストアップします。"
        },
        {
          "stepNumber": 4,
          "title": "献立表とリストの印刷",
          "instruction": "冷蔵庫に貼れる週間献立表とスーパー用の買い物リストを印刷します。"
        }
      ],
      "workedExample": {
        "title": "高タンパク週間作り置き（ミールプレップ）実例",
        "scenario": "平日の自炊の手間を省き、外食費を抑えながら健康的な21食を準備する例。",
        "calculation": "月〜水: 鮭のホイル焼きと玄米弁当。木〜金: 鶏むね肉のラタトゥイユ。土日: 旬野菜のパスタ。",
        "result": "食材ロスをゼロにし、毎日の献立悩みを解消する週間買い物リストと献立表が完成。"
      },
      "faqs": [
        {
          "question": "献立を事前に決めることで食費はどのように節約できますか？",
          "answer": "必要な食材だけを無駄なく購入できるため食材の廃棄（フードロス）がなくなり、平日の割高な外食やコンビニ弁当への依存を減らせます。"
        },
        {
          "question": "献立表と買い物リストをまとめて印刷できますか？",
          "answer": "はい。A4用紙の上段に週間献立表、下段に買い物チェックリストが綺麗に並ぶよう印刷CSSが設定されています。"
        },
        {
          "question": "食事内容は外部サーバーに送信されますか？",
          "answer": "いいえ。すべてのレシピやメモはお使いの端末内にのみ安全に保存されます。"
        },
        {
          "question": "筋トレ前後の軽食スロットを追加できますか？",
          "answer": "はい。間食やプロテイン補給枠などを自由にカスタム追加できます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Équilibrage des Macronutriments et Planification des Repas Hebdomadaire",
      "formulaDescription": "Ce planificateur de repas coordonne les menus hebdomadaires (matin, midi, soir, encas). Il veille à l'équilibre des macronutriments et génère la liste de courses localement sans serveur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Définir les objectifs",
          "instruction": "Choisissez votre type d'alimentation (riche en protéines, équilibrée, végétale)."
        },
        {
          "stepNumber": 2,
          "title": "Planifier les 7 jours",
          "instruction": "Remplissez les déjeuners, dîners et collations de la semaine."
        },
        {
          "stepNumber": 3,
          "title": "Établir la liste de courses",
          "instruction": "Rassemblez les ingrédients nécessaires pour éviter le gaspillage alimentaire."
        },
        {
          "stepNumber": 4,
          "title": "Imprimer le menu",
          "instruction": "Affichez votre planning sur le réfrigérateur pour des repas sereins."
        }
      ],
      "workedExample": {
        "title": "Exemple de Planning de Repas Équilibrés",
        "scenario": "Organisation de 21 repas sains pour gagner du temps et réduire les plats industriels.",
        "calculation": "Lun–Mer : Saumon grillé et quinoa. Jeu–Ven : Dahl de lentilles. Sam–Dim : Légumes frais de saison.",
        "result": "Liste de courses précise évitant le gaspillage et simplifiant les soirées de semaine."
      },
      "faqs": [
        {
          "question": "Comment le planning de repas réduit-il le budget courses ?",
          "answer": "En achetant uniquement les ingrédients nécessaires, vous éliminez le gaspillage alimentaire et les commandes de livraison imprévues."
        },
        {
          "question": "Peut-on imprimer le menu et la liste de courses ensemble ?",
          "answer": "Oui. Le document A4 réunit le menu de la semaine et la liste des ingrédients associés."
        },
        {
          "question": "Mes choix alimentaires restent-ils confidentiels ?",
          "answer": "Oui. Toutes les données sont enregistrées localement dans votre navigateur."
        },
        {
          "question": "Peut-on ajouter des collations personnalisées ?",
          "answer": "Oui. Vous pouvez ajouter et renommer des blocs selon votre rythme de vie."
        }
      ]
    },
    "de": {
      "formulaTitle": "Makronährstoff-Ausgewogenheit & Wöchentliche Meal-Prep-Planung",
      "formulaDescription": "Der Mahlzeitenplaner koordiniert das Wochenmenü von Frühstück bis Abendessen. Er unterstützt eine ausgewogene Nährstoffverteilung und erstellt Einkaufslisten lokal im Browser.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Ernährungsziele festlegen",
          "instruction": "Wählen Sie Ihren Ernährungsstil (proteinreich, mediterran, ausgewogen)."
        },
        {
          "stepNumber": 2,
          "title": "Wochenmenü zusammenstellen",
          "instruction": "Tragen Sie Frühstück, Mittag- und Abendessen für 7 Tage ein."
        },
        {
          "stepNumber": 3,
          "title": "Einkaufsliste erstellen",
          "instruction": "Fassen Sie benötigte Zutaten strukturiert zusammen."
        },
        {
          "stepNumber": 4,
          "title": "Plan & Einkaufszettel drucken",
          "instruction": "Drucken Sie den Plan für den Kühlschrank und die Liste für den Einkauf aus."
        }
      ],
      "workedExample": {
        "title": "Beispiel für wöchentliches Meal-Prep",
        "scenario": "Planung von 21 vollwertigen Mahlzeiten zur Zeiteinsparung unter der Woche.",
        "calculation": "Mo–Mi: Lachsfilet mit Quinoa. Do–Fr: Linseneintopf mit Reis. Sa–So: Frische Pfannengerichte.",
        "result": "Präzise Einkaufsliste, die Lebensmittelverschwendung stoppt und Geld spart."
      },
      "faqs": [
        {
          "question": "Wie hilft Meal-Planning beim Sparen?",
          "answer": "Gezielte Einkäufe verhindern Spontankäufe und das Verderben von Lebensmitteln im Kühlschrank."
        },
        {
          "question": "Können Wochenmenü und Einkaufsliste zusammen gedruckt werden?",
          "answer": "Ja. Die Druckversion zeigt oben den Wochenplan und unten die strukturierte Einkaufsliste."
        },
        {
          "question": "Bleiben meine Ernährungsdaten privat?",
          "answer": "Ja. Alle Einträge verbleiben im lokalen Speicher Ihres Browsers."
        },
        {
          "question": "Können zusätzliche Snacks ergänzt werden?",
          "answer": "Ja. Sie können Mahlzeiten-Kategorien individuell anpassen."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Equilíbrio de Macronutrientes e Planejamento Semanal de Refeições",
      "formulaDescription": "O planejador de refeições organiza o cardápio da semana (café da manhã, almoço, jantar e lanches). Equilibra macronutrientes e compila listas de compras no próprio navegador sem servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Definir metas alimentares",
          "instruction": "Estabeleça seu foco nutricional (hipertrofia, emagrecimento, equilíbrio)."
        },
        {
          "stepNumber": 2,
          "title": "Planejar cardápio semanal",
          "instruction": "Defina café da manhã, almoço, jantar e lanches para cada dia da semana."
        },
        {
          "stepNumber": 3,
          "title": "Gerar lista de compras",
          "instruction": "Junte carnes, verduras e mantimentos necessários para evitar desperdícios."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir cardápio para geladeira",
          "instruction": "Imprima o menu semanal e leve a lista de compras ao supermercado."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Cardápio Semanal de Marmitas Saudáveis",
        "scenario": "Organização de 21 refeições balanceadas para economizar tempo e evitar delivery.",
        "calculation": "Seg–Qua: Salmão com arroz integral. Qui–Sex: Frango com legumes assados. Sáb–Dom: Saladas e grelhados.",
        "result": "Lista de compras exata que economiza dinheiro e facilita o preparo das refeições."
      },
      "faqs": [
        {
          "question": "Como planejar o cardápio reduz os gastos no supermercado?",
          "answer": "Permite comprar apenas as quantidades certas, eliminando o desperdício de comida estragada e o uso de delivery caro."
        },
        {
          "question": "Consigo imprimir o cardápio e a lista de compras na mesma folha?",
          "answer": "Sim. A impressão organiza o cardápio no topo e a lista de compras na parte inferior."
        },
        {
          "question": "Minhas informações de dieta são privadas?",
          "answer": "Sim. Tudo fica gravado exclusivamente no navegador do seu dispositivo."
        },
        {
          "question": "Dá para adicionar lanches pré-treino?",
          "answer": "Sim. Você pode personalizar e renomear os blocos de refeição livremente."
        }
      ]
    },
    "ko": {
      "formulaTitle": "3대 영양소 밸런스 설계 및 주간 식단 밀프랩(Meal-Prep) 구조",
      "formulaDescription": "본 식단 플래너는 아침, 점심, 저녁 및 건강 간식의 주간 식단을 체계적으로 관리합니다. 탄수화물, 단백질, 지방의 영양 균형을 맞추고 식재료 장보기 목록을 브라우저 로컬에서 서버 전송 없이 자동 정리합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "영양 및 식단 목표 설정",
          "instruction": "고단백 식단, 지중해식 식단, 다이어트 등 이번 주 목표를 설정합니다."
        },
        {
          "stepNumber": 2,
          "title": "주간 7일 식단표 구성",
          "instruction": "월요일부터 일요일까지 아침, 점심, 저녁, 건강 간식 메뉴를 기재합니다."
        },
        {
          "stepNumber": 3,
          "title": "장보기 체크리스트 정리",
          "instruction": "식단 조리에 필요한 채소, 단백질원, 양념 재료를 장보기 목록으로 취합합니다."
        },
        {
          "stepNumber": 4,
          "title": "냉장고 부착용 식단표 출력",
          "instruction": "냉장고 문에 붙여둘 주간 식단표와 마트용 장보기 리스트를 A4로 인쇄합니다."
        }
      ],
      "workedExample": {
        "title": "주간 21끼 고단백 밀프랩(식단 준비) 실전 예시",
        "scenario": "바쁜 평일 배달 음식을 줄이고 건강한 식사를 유지하기 위한 7일 식단 기획.",
        "calculation": "월~수: 연어 구이와 퀴노아 샐러드 런치박스, 목~금: 닭가슴살 토마토 스튜, 주말: 제철 신선 나물 밥상.",
        "result": "식재료 낭비와 불필요한 장보기를 없애주는 일주일 치 냉장고 식단표 완성."
      },
      "faqs": [
        {
          "question": "식단을 미리 계획하면 식비를 어떻게 아낄 수 있나요?",
          "answer": "필요한 식재료만 정확히 장바구니에 담아 냉장고에서 상해 버려지는 채소를 없애고, 잦은 배달 음식 지출을 획기적으로 줄일 수 있습니다."
        },
        {
          "question": "주간 메뉴표와 장보기 목록을 한 장에 같이 인쇄할 수 있나요?",
          "answer": "네. A4 용지 상단에는 주간 식단표, 하단에는 식재료 체크리스트가 정돈되어 인쇄됩니다."
        },
        {
          "question": "식단 정보가 외부에 노출되지 않나요?",
          "answer": "안전합니다. 사용자가 입력한 식단과 레시피 메모는 기기 브라우저 로컬 저장소에만 보관됩니다."
        },
        {
          "question": "운동 전후 간식 등 식사 블록을 추가할 수 있나요?",
          "answer": "네. 개인의 식습관에 맞춰 간식이나 단백질 셰이크 시간대를 자유롭게 추가하고 이름을 바꿀 수 있습니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Bilanciamento dei Macronutrienti e Pianificazione Settimanale dei Pasti",
      "formulaDescription": "Il pianificatore pasti coordina il menu settimanale dalla colazione alla cena. Bilancia i macronutrienti e compila la lista della spesa nella memoria del browser con riservatezza.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Fissare gli obiettivi nutrizionali",
          "instruction": "Imposta il tuo regime alimentare (iperproteico, equilibrato, ipocalorico)."
        },
        {
          "stepNumber": 2,
          "title": "Pianificare i pasti per 7 giorni",
          "instruction": "Compila colazione, pranzo, cena e spuntini da lunedì a domenica."
        },
        {
          "stepNumber": 3,
          "title": "Generare la lista della spesa",
          "instruction": "Raggruppa gli ingredienti freschi e di dispensa per evitare sprechi."
        },
        {
          "stepNumber": 4,
          "title": "Stampare menu e lista spesa",
          "instruction": "Appendi il menu sul frigorifero e porta con te la lista al supermercato."
        }
      ],
      "workedExample": {
        "title": "Esempio di Menù Settimanale Sano e Bilanciato",
        "scenario": "Pianificazione di 21 pasti nutrienti per cucinare con facilità e risparmiare sulla spesa.",
        "calculation": "Lun–Mer: Salmone al vapore e riso venere. Gio–Ven: Pollo ai ferri e verdure. Sab–Dom: Primi freschi.",
        "result": "Lista della spesa precisa che azzera gli sprechi e organizza la cucina per tutta la settimana."
      },
      "faqs": [
        {
          "question": "In che modo pianificare i pasti fa risparmiare sulla spesa?",
          "answer": "Evita acquisti impulsivi al supermercato e cene da asporto dell'ultimo minuto, azzerando gli sprechi alimentari."
        },
        {
          "question": "Posso stampare menu e lista della spesa insieme?",
          "answer": "Sì. La stampa impagina il menù in alto e la lista della spesa ordinata in basso."
        },
        {
          "question": "Le mie abitudini alimentari restano private?",
          "answer": "Sì. I dati rimangono salvati esclusivamente nel tuo browser."
        },
        {
          "question": "Posso inserire spuntini aggiuntivi?",
          "answer": "Sì. Puoi aggiungere e personalizzare i pasti in base alle tue esigenze."
        }
      ]
    }
  },
  "monthly-time-table-maker": {
    "en": {
      "formulaTitle": "30-Day Calendar Matrix & Long-Horizon Milestone Scheduling Architecture",
      "formulaDescription": "The monthly timetable maker structures 28 to 31 calendar day cells into a responsive monthly matrix. It tracks major academic milestones, project deliverables, bill due dates, and habit streaks client-side, compiling high-resolution printable calendar sheets without server database overhead.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Select Target Month & Year",
          "instruction": "Choose the month and year to dynamically populate correct starting weekday offsets."
        },
        {
          "stepNumber": 2,
          "title": "Pin Deadlines & Milestones",
          "instruction": "Add exams, product releases, bill dues, and vacations with distinct color badges."
        },
        {
          "stepNumber": 3,
          "title": "Track Monthly Habit Goals",
          "instruction": "Set daily streak markers (e.g. daily exercise, reading 30 min, meditation) across the grid."
        },
        {
          "stepNumber": 4,
          "title": "Print Wall Calendar Sheet",
          "instruction": "Click Print / PDF to generate a wall-ready monthly calendar poster for your room or office."
        }
      ],
      "workedExample": {
        "title": "30-Day University Semester Exam & Project Sprint",
        "scenario": "Tracking 2 major research project submissions, 3 midterm exams, and weekend study camps across November.",
        "calculation": "Nov 1–30 calendar grid. Nov 8: Economics Midterm 📝. Nov 14: Computer Science Draft 💻. Nov 22: Statistics Exam 📊. Nov 28: Final Paper Submission 🎓.",
        "result": "Clear 30-day visual roadmap preventing last-minute all-nighters, formatted for landscape A4 printing."
      },
      "faqs": [
        {
          "question": "Why use a monthly timetable in addition to daily or weekly planners?",
          "answer": "A monthly calendar provides altitude and foresight. It allows spotting deadline clusters two to three weeks in advance so you can start preparing long before panic sets in."
        },
        {
          "question": "Can I print this on a single A4 landscape sheet?",
          "answer": "Yes. The 5-to-6-week monthly grid is specifically engineered to fit landscape A4 and US Letter dimensions."
        },
        {
          "question": "Are calendar notes saved if I close my browser?",
          "answer": "Yes. All events and streak markers persist in browser localStorage."
        },
        {
          "question": "Can I jump to past or future months?",
          "answer": "Yes. Use the month navigation arrows to plan upcoming semesters and project quarters."
        }
      ]
    },
    "hi": {
      "formulaTitle": "30-दिवसीय कैलेंडर मैट्रिक्स और दीर्घकालिक मील का पत्थर शेड्यूलिंग संरचना",
      "formulaDescription": "यह मासिक टाइमटेबल मेकर 28 से 31 दिनों के कैलेंडर ग्रिड को व्यवस्थित करता है। यह परीक्षा तिथियों, प्रोजेक्ट समयसीमा, बिल भुगतान और दैनिक आदतों को ट्रैक करता है और बिना सर्वर के उच्च-गुणवत्ता वाली प्रिंट करने योग्य कैलेंडर शीट तैयार करता है।",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "महीना और वर्ष चुनें",
          "instruction": "महीना और साल चुनें जिससे कैलेंडर में दिनों की शुरुआत सही दिन से हो सके।"
        },
        {
          "stepNumber": 2,
          "title": "महत्वपूर्ण तारीखें जोड़ें",
          "instruction": "परीक्षाएं, प्रोजेक्ट सबमिशन, बिल की अंतिम तिथि और छुट्टियां रंगों के साथ जोड़ें।"
        },
        {
          "stepNumber": 3,
          "title": "मासिक आदतें ट्रैक करें",
          "instruction": "प्रतिदिन व्यायाम या रीडिंग जैसी आदतों को मार्क करने के लिए चेकबॉक्स बनाएं।"
        },
        {
          "stepNumber": 4,
          "title": "कैलेंडर प्रिंट करें",
          "instruction": "दीवार या ऑफिस डेस्क पर लगाने के लिए सुंदर मासिक कैलेंडर शीट प्रिंट करें।"
        }
      ],
      "workedExample": {
        "title": "30-दिवसीय विश्वविद्यालय परीक्षा और प्रोजेक्ट रोडमैप उदाहरण",
        "scenario": "नवंबर माह के दौरान 2 बड़े प्रोजेक्ट और 3 मुख्य परीक्षाओं की तारीखों को ट्रैक करना।",
        "calculation": "1 से 30 नवंबर का कैलेंडर। 8 नव: अर्थशास्त्र परीक्षा 📝, 14 नव: कंप्यूटर प्रोजेक्ट 💻, 22 नव: सांख्यिकी परीक्षा 📊, 28 नव: फाइनल सबमिशन 🎓।",
        "result": "पूरे महीने का स्पष्ट रोडमैप जो अंतिम समय की हड़बड़ी को रोकता है, A4 प्रिंट के लिए तैयार।"
      },
      "faqs": [
        {
          "question": "दैनिक या साप्ताहिक योजना के अलावा मासिक टाइमटेबल क्यों जरूरी है?",
          "answer": "मासिक कैलेंडर आपको दूरदर्शी दृष्टिकोण देता है। इससे आप 2-3 हफ्ते पहले ही आने वाली परीक्षाओं और प्रोजेक्ट्स को देखकर समय पर तैयारी शुरू कर सकते हैं।"
        },
        {
          "question": "क्या यह एक ही A4 लैंडस्केप पेपर पर प्रिंट हो जाता है?",
          "answer": "हाँ। यह 30 दिनों का कैलेंडर ग्रिड A4 लैंडस्केप पेपर पर बिल्कुल सही और साफ प्रिंट होता है।"
        },
        {
          "question": "क्या ब्राउज़र बंद करने पर नोट्स सुरक्षित रहते हैं?",
          "answer": "हाँ। सभी तारीखें और नोट्स आपके ब्राउज़र के लोकल स्टोरेज में सुरक्षित रहते हैं।"
        },
        {
          "question": "क्या मैं आगे या पिछले महीनों का कैलेंडर देख सकता हूँ?",
          "answer": "हाँ। नेविगेशन बटनों से आप आने वाले महीनों की योजना आसानी से बना सकते हैं।"
        }
      ]
    },
    "es": {
      "formulaTitle": "Matriz de Calendario de 30 Días y Planificación de Hitos a Largo Plazo",
      "formulaDescription": "El creador de horarios mensuales organiza una cuadrícula de 28 a 31 días. Permite supervisar hitos de proyectos, exámenes, pagos de facturas y hábitos en el cliente sin servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Seleccionar mes y año",
          "instruction": "Elija el mes y año para alinear los días de la semana de forma automática."
        },
        {
          "stepNumber": 2,
          "title": "Marcar fechas clave",
          "instruction": "Añada exámenes, entregas de proyectos, pagos y vacaciones con colores."
        },
        {
          "stepNumber": 3,
          "title": "Registrar hábitos diarios",
          "instruction": "Haga seguimiento de lectura, deporte o meditación a lo largo del mes."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir calendario",
          "instruction": "Exporte una lámina mensual en formato A4 para colocar en la pared o escritorio."
        }
      ],
      "workedExample": {
        "title": "Ejemplo de Calendario Mensual de Exámenes",
        "scenario": "Planificar entregas de proyectos y exámenes universitarios durante un mes completo.",
        "calculation": "Mes de 30 días: Día 8 Examen de Economía 📝, Día 14 Proyecto 💻, Día 22 Estadística 📊, Día 28 Entrega final 🎓.",
        "result": "Hoja de ruta visual que evita prisas de última hora, lista para imprimir en A4 apaisado."
      },
      "faqs": [
        {
          "question": "¿Por qué conviene tener un calendario mensual además del semanal?",
          "answer": "Aporta perspectiva a medio plazo, permitiendo detectar acumulación de exámenes o entregas con semanas de antelación."
        },
        {
          "question": "¿Se puede imprimir en una sola hoja A4 horizontal?",
          "answer": "Sí. El diseño encaja perfectamente en una hoja A4 apaisada para colocar en la pared."
        },
        {
          "question": "¿Las notas se guardan al salir del navegador?",
          "answer": "Sí. Todos los eventos quedan guardados en el almacenamiento local del equipo."
        },
        {
          "question": "¿Permite planificar meses futuros?",
          "answer": "Sí. Puede navegar a meses venideros para preparar cuatrimestres o proyectos."
        }
      ]
    },
    "ja": {
      "formulaTitle": "30日間カレンダーマトリックスおよび長期マイルストーン管理構造",
      "formulaDescription": "本月間スケジュール作成ツールは、28〜31日間の月間カレンダーグリッドを展開。試験日程、プロジェクト締切、定期的な支払日、習慣トラッカーを管理し、A4横向きの綺麗な印刷シートをローカルで即座に出力します。",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "年月を選択",
          "instruction": "対象となる年月を指定し、曜日と日時の開始位置を自動展開します。"
        },
        {
          "stepNumber": 2,
          "title": "重要期日・イベントの登録",
          "instruction": "試験日、納期、締め切り、有給休暇、記念日をカラーバッジで登録します。"
        },
        {
          "stepNumber": 3,
          "title": "習慣トラッカーの連動",
          "instruction": "運動や読書など毎日継続したい習慣の達成マークをマス目に記録します。"
        },
        {
          "stepNumber": 4,
          "title": "月間カレンダーの印刷",
          "instruction": "壁やデスクに貼るのに最適なA4横向きの月間ポスターカレンダーを印刷します。"
        }
      ],
      "workedExample": {
        "title": "月間大学試験＆課題提出スプリント計画の実例",
        "scenario": "1か月間に集中する2つのレポート提出と3科目の定期試験を俯瞰して管理する例。",
        "calculation": "30日間グリッド。8日: 経済学試験 📝、14日: 情報科学レポート 💻、22日: 統計学試験 📊、28日: 卒業論文提出 🎓。",
        "result": "一夜漬けを防ぎ着実に準備を進められるA4横向きの月間ロードマップが完成。"
      },
      "faqs": [
        {
          "question": "日別や週間計画に加えて月間カレンダーを使う利点は何ですか？",
          "answer": "月間視点を持つことで、2〜3週間先に重なる締め切りや試験のピークを事前に把握し、余裕を持って前倒しで準備できるためです。"
        },
        {
          "question": "A4横向き1枚に綺麗に印刷できますか？",
          "answer": "はい。A4横向きの用紙サイズにぴったり収まるよう専用の印刷スタイルが適用されています。"
        },
        {
          "question": "ブラウザを閉じても入力した予定は保持されますか？",
          "answer": "はい。すべての予定データは端末内のローカルストレージに安全に保管されます。"
        },
        {
          "question": "来月や過去の月のスケジュールも管理できますか？",
          "answer": "はい。月送りボタンで任意の年月へ自由に移動して計画できます。"
        }
      ]
    },
    "fr": {
      "formulaTitle": "Matrice de Calendrier 30 Jours et Planification de Jalons à Long Terme",
      "formulaDescription": "Ce planificateur mensuel structure une grille de 28 à 31 jours. Il suit les dates d'examens, échéances de projets et habitudes directement dans le navigateur sans serveur.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Choisir le mois et l'année",
          "instruction": "Définissez la période pour afficher les jours de la semaine aux bonnes cases."
        },
        {
          "stepNumber": 2,
          "title": "Inscrire les échéances",
          "instruction": "Ajoutez dates d'examens, livraisons de projets et congés avec des étiquettes de couleur."
        },
        {
          "stepNumber": 3,
          "title": "Suivre les habitudes",
          "instruction": "Cochez vos objectifs quotidiens (sport, lecture) tout au long du mois."
        },
        {
          "stepNumber": 4,
          "title": "Imprimer le calendrier",
          "instruction": "Générez un poster mensuel au format A4 à afficher dans votre bureau."
        }
      ],
      "workedExample": {
        "title": "Exemple de Planning Mensuel d'Échéances",
        "scenario": "Suivi de 2 rapports de recherche et 3 partiels sur l'ensemble du mois.",
        "calculation": "Grille de 30 jours : Jour 8 Partiel 📝, Jour 14 Rendu 💻, Jour 22 Examen 📊, Jour 28 Rapport final 🎓.",
        "result": "Feuille de route mensuelle évitant les nuits blanches, prête pour l'impression A4."
      },
      "faqs": [
        {
          "question": "Quel est l'intérêt d'une vue mensuelle par rapport à la semaine ?",
          "answer": "Le calendrier mensuel donne une vue d'ensemble indispensable pour anticiper les périodes d'examens ou de livraisons importantes plusieurs semaines à l'avance."
        },
        {
          "question": "L'impression tient-elle sur une seule feuille A4 paysage ?",
          "answer": "Oui. La grille mensuelle est calibrée pour occuper exactement une page A4 horizontale."
        },
        {
          "question": "Mes notes sont-elles sauvegardées ?",
          "answer": "Oui. Toutes les entrées restent stockées localement dans votre navigateur."
        },
        {
          "question": "Peut-on naviguer vers les mois suivants ?",
          "answer": "Oui. Les flèches de navigation permettent de planifier vos prochains semestres."
        }
      ]
    },
    "de": {
      "formulaTitle": "30-Tage-Kalendermatrix & Langfristige Meilenstein-Planungsarchitektur",
      "formulaDescription": "Der Monatsplaner baut ein flexibles Kalenderraster für 28 bis 31 Tage auf. Er erfasst Prüfungen, Meilensteine, Rechnungen und Gewohnheiten vollständig lokal im Browser.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Monat und Jahr wählen",
          "instruction": "Wählen Sie den Zeitraum zur automatischen Ausrichtung der Wochentage."
        },
        {
          "stepNumber": 2,
          "title": "Meilensteine eintragen",
          "instruction": "Erfassen Sie Abgabetermine, Prüfungen und Urlaubstage mit Farbkennzeichnung."
        },
        {
          "stepNumber": 3,
          "title": "Gewohnheiten festhalten",
          "instruction": "Dokumentieren Sie tägliche Ziele wie Laufen oder Lesen im Monatsverlauf."
        },
        {
          "stepNumber": 4,
          "title": "Wandkalender drucken",
          "instruction": "Drucken Sie Ihren Monatskalender auf A4-Querformat für die Wand aus."
        }
      ],
      "workedExample": {
        "title": "Beispiel für einen Monats-Meilensteinplan",
        "scenario": "Erfassung von 2 Projektarbeiten und 3 Zwischenprüfungen im Monatsverlauf.",
        "calculation": "30-Tage-Monatsraster: 8. Klausur 📝, 14. Projektabgabe 💻, 22. Prüfung 📊, 28. Endabgabe 🎓.",
        "result": "Übersichtlicher Monatsplan, der Hektik vor Abgabeterminen verhindert."
      },
      "faqs": [
        {
          "question": "Warum ist ein Monatsplaner zusätzlich zur Wochenansicht sinnvoll?",
          "answer": "Er bietet Weitblick, um Terminhäufungen und Prüfungsphasen Wochen im Voraus zu erkennen und Engpässe zu vermeiden."
        },
        {
          "question": "Passt der Monatskalender auf eine einzige A4-Querformat-Seite?",
          "answer": "Ja. Das Layout ist exakt auf einseitigen A4-Querformatdruck ausgelegt."
        },
        {
          "question": "Bleiben Termine beim Schließen des Browsers erhalten?",
          "answer": "Ja. Alle Einträge werden dauerhaft im lokalen Speicher gesichert."
        },
        {
          "question": "Kann man in zukünftige Monate wechseln?",
          "answer": "Ja. Nutzen Sie die Pfeiltasten für die langfristige Semesterplanung."
        }
      ]
    },
    "pt": {
      "formulaTitle": "Matriz de Calendário de 30 Dias e Agendamento de Metas de Longo Prazo",
      "formulaDescription": "O planejador mensal estrutura um calendário de 28 a 31 dias. Acompanha entregas de projetos, datas de provas e hábitos diários sem transferência de dados para servidores.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Escolher mês e ano",
          "instruction": "Defina o período para posicionar os dias da semana corretamente na grade."
        },
        {
          "stepNumber": 2,
          "title": "Marcar datas importantes",
          "instruction": "Insira provas, prazos de entrega de projetos e folgas com destaque colorido."
        },
        {
          "stepNumber": 3,
          "title": "Acompanhar hábitos",
          "instruction": "Marque metas diárias de exercícios ou estudos para acompanhar seu progresso."
        },
        {
          "stepNumber": 4,
          "title": "Imprimir folha mensal",
          "instruction": "Gere uma folha de calendário mensal em A4 para colocar no mural de avisos."
        }
      ],
      "workedExample": {
        "title": "Exemplo de Cronograma Mensal de Provas e Entregas",
        "scenario": "Acompanhamento de 2 trabalhos de pesquisa e 3 provas universitárias durante o mês.",
        "calculation": "Grade de 30 dias: Dia 8 Prova 📝, Dia 14 Trabalho 💻, Dia 22 Exame 📊, Dia 28 Entrega final 🎓.",
        "result": "Visão panorâmica do mês que evita correria de última hora em folha A4 paisagem."
      },
      "faqs": [
        {
          "question": "Qual a vantagem de usar o planejador mensal além do semanal?",
          "answer": "Ele oferece uma visão panorâmica antecipada, permitindo identificar acúmulo de provas e entregas com semanas de antecedência."
        },
        {
          "question": "O calendário cabe em uma única folha A4 horizontal?",
          "answer": "Sim. A grade foi desenhada para caber em uma folha A4 paisagem pronta para pendurar."
        },
        {
          "question": "As anotações continuam salvas ao fechar a aba?",
          "answer": "Sim. Ficam salvas com segurança no armazenamento local do navegador."
        },
        {
          "question": "Posso planejar os meses seguintes?",
          "answer": "Sim. As setas de navegação permitem navegar entre os meses do ano livremente."
        }
      ]
    },
    "ko": {
      "formulaTitle": "30일 캘린더 매트릭스 및 중장기 마일스톤 스케줄링 구조",
      "formulaDescription": "본 월간 시간표 플래너는 28일에서 31일까지의 날짜 셀을 반응형 월간 달력 격자로 구성합니다. 학기 시험 일정, 프로젝트 마감일, 공과금 납부일 및 습관 달성률을 브라우저 로컬에서 추적하고 고해상도 A4 가로 캘린더로 즉각 출력합니다.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "해당 연도 및 월 선택",
          "instruction": "원하는 연월을 지정하여 시작 요일에 맞춰 달력 그리드를 자동 정렬합니다."
        },
        {
          "stepNumber": 2,
          "title": "주요 마감일 및 기념일 등록",
          "instruction": "시험 기간, 프로젝트 제출 마감, 공과금 납부일, 휴가 일정을 색상별로 등록합니다."
        },
        {
          "stepNumber": 3,
          "title": "월간 습관 형성 체크",
          "instruction": "매일 30분 운동, 독서 등 지속하고 싶은 습관 달성 여부를 달력에 체크합니다."
        },
        {
          "stepNumber": 4,
          "title": "벽걸이형 캘린더 출력",
          "instruction": "방 벽이나 사무실 책상에 부착할 수 있는 깔끔한 A4 가로형 월간 달력을 인쇄합니다."
        }
      ],
      "workedExample": {
        "title": "월간 30일 학기 시험 및 프로젝트 마일스톤 실전 예시",
        "scenario": "한 달 동안 몰려있는 2개 리포트 제출과 3개 과목 시험 일정을 달력에 한눈에 정리.",
        "calculation": "30일 캘린더 그리드: 8일 경제학 중간고사 📝, 14일 전산 과제 초안 💻, 22일 통계학 시험 📊, 28일 최종 논문 제출 🎓.",
        "result": "벼락치기를 막고 체계적으로 일정을 완수할 수 있는 A4 가로형 월간 로드맵 달력 완성."
      },
      "faqs": [
        {
          "question": "일일/주간 계획표 외에 월간 시간표를 함께 쓰는 이점은 무엇인가요?",
          "answer": "월간 달력은 시야를 넓혀주어 2~3주 뒤에 몰려 있는 시험이나 마감일을 미리 확인하고 여유 있게 대처할 수 있도록 도와줍니다."
        },
        {
          "question": "A4 가로 1장에 깔끔하게 인쇄되나요?",
          "answer": "네. 30일 격자가 A4 가로 규격 한 장에 꼭 맞게 출력되도록 인쇄 스타일이 최적화되어 있습니다."
        },
        {
          "question": "브라우저를 닫아도 기록한 일정이 남아있나요?",
          "answer": "네. 모든 일정과 메모는 사용자 기기 내부 로컬 스토리지에 지속적으로 보관됩니다."
        },
        {
          "question": "다음 달이나 이전 달 일정으로 이동할 수 있나요?",
          "answer": "네. 월 이동 버튼을 통해 다음 학기나 향후 분기 일정을 자유롭게 미리 계획할 수 있습니다."
        }
      ]
    },
    "it": {
      "formulaTitle": "Matrice di Calendario a 30 Giorni e Pianificazione di Obiettivi a Lungo Termine",
      "formulaDescription": "Il creatore di orari mensili gestisce una griglia di calendario da 28 a 31 giorni. Tiene traccia di scadenze, esami e abitudini direttamente nel browser senza server remoti.",
      "stepByStep": [
        {
          "stepNumber": 1,
          "title": "Selezionare mese e anno",
          "instruction": "Imposta il mese desiderato per allineare correttamente i giorni della settimana."
        },
        {
          "stepNumber": 2,
          "title": "Segnare le scadenze chiave",
          "instruction": "Aggiungi esami, consegne di lavoro e ferie con etichette colorate."
        },
        {
          "stepNumber": 3,
          "title": "Monitorare le abitudini",
          "instruction": "Registra le costanze giornaliere di allenamento o lettura durante il mese."
        },
        {
          "stepNumber": 4,
          "title": "Stampare il calendario mensile",
          "instruction": "Esporta un pratico calendario murale A4 da appendere in camera o in ufficio."
        }
      ],
      "workedExample": {
        "title": "Esempio di Mappa Mensile di Esami e Progetti",
        "scenario": "Monitoraggio di 2 relazioni e 3 esami universitari distribuiti nell'arco di un mese.",
        "calculation": "Griglia di 30 giorni: Giorno 8 Esame 📝, Giorno 14 Progetto 💻, Giorno 22 Test 📊, Giorno 28 Consegna finale 🎓.",
        "result": "Quadro panoramico del mese per prevenire l'ansia da scadenze in formato A4 orizzontale."
      },
      "faqs": [
        {
          "question": "Qual è l'utilità del calendario mensile rispetto a quello settimanale?",
          "answer": "Offre una visione d'insieme strategica per accorgersi di scadenze o esami ravvicinati con largo anticipo."
        },
        {
          "question": "Si stampa su un unico foglio A4 orizzontale?",
          "answer": "Sì. La griglia mensile si adatta esattamente alle dimensioni di una pagina A4 orizzontale."
        },
        {
          "question": "Gli eventi restano memorizzati se chiudo il browser?",
          "answer": "Sì. Tutto rimane custodito nel localStorage del browser."
        },
        {
          "question": "Posso pianificare i mesi futuri?",
          "answer": "Sì. I pulsanti freccia consentono di spostarsi nei mesi successivi con facilità."
        }
      ]
    }
  }
};
