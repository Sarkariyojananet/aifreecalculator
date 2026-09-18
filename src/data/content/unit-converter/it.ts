import type { UnitConverterContent } from './types';

export const itContent: UnitConverterContent = {
  meta: {
    title: 'Convertitore di Unità – Calcolatore Gratuito Metrico e Imperiale',
    description: 'Mega convertitore di unità online gratuito. Converti istantaneamente lunghezza, peso, temperatura, area, volume, velocità, tempo, pressione, energia, potenza e cucina con formule precise.',
    keywords: [
      'convertitore di unita',
      'convertitore metrico imperiale',
      'convertire lunghezza',
      'convertire peso',
      'convertire temperatura',
      'celsius in fahrenheit',
      'kg in libbre',
      'pollici in cm',
      'miglia in km',
      'convertitore area'
    ],
    h1: 'Convertitore di Unità Online',
    intro: 'Converti istantaneamente tra unità metriche, imperiali e standard internazionali in 16 categorie scientifiche e quotidiane. Veloce, 100% eseguito sul tuo dispositivo e preciso fino a 8 decimali.'
  },
  ui: {
    quickConversionsTitle: '⚡ Conversioni Rapide:',
    fromLabel: 'Valore Iniziale',
    toLabel: 'Risultato Convertito',
    swapButton: 'Inverti Unità',
    copyButton: 'Copia Risultato',
    copied: 'Copiato! ✓',
    formulaLabel: 'Formula',
    convertedValueHeader: 'Valore Convertito',
    precisionLabel: 'Precisione',
    precisionValue: 'Fino a 8 decimali',
    standardUnitLabel: 'Unità Standard',
    equivalentHeader: '📋 Equivalente in Altre Unità',
    enterValuePlaceholder: 'Inserisci un valore da convertire...',
    resultPlaceholder: 'Il risultato apparirà qui...',
    indianLandBannerText: 'Cerchi unità terriere tradizionali indiane (Bigha, Gaj, Biswa, Guntha, Acro)? Prova il nostro convertitore dedicato →',
    indianLandBannerBtn: 'Apri Convertitore',
    emptyHeroSub: 'Seleziona le unità e inserisci un valore sopra per calcolare la conversione immediata.'
  },
  categories: [
    { id: 'length', name: 'Lunghezza e Distanza', desc: 'Converti metri, chilometri, miglia, iarde, piedi, pollici e miglia nautiche.' },
    { id: 'area', name: 'Superficie e Area', desc: 'Converti metri quadri, piedi quadri, acri, ettari, chilometri quadri e miglia quadrate.' },
    { id: 'volume', name: 'Volume e Capacità', desc: 'Converti litri, millilitri, galloni USA, galloni imperiali, tazze, pinte e metri cubi.' },
    { id: 'mass', name: 'Massa e Peso', desc: 'Converti chilogrammi, grammi, milligrammi, libbre (lbs), once (oz), stone e tonnellate metriche.' },
    { id: 'temperature', name: 'Temperatura', desc: 'Converti la temperatura tra Celsius (°C), Fahrenheit (°F), Kelvin (K) e Rankine (°R).' },
    { id: 'time', name: 'Tempo e Durata', desc: 'Converti secondi, minuti, ore, giorni, settimane, mesi e anni.' },
    { id: 'speed', name: 'Velocità', desc: 'Converti chilometri orari, miglia orarie, metri al secondo, nodi e mach.' },
    { id: 'pressure', name: 'Pressione', desc: 'Converti pascal, bar, PSI, atmosfere standard (atm), millibar e torr.' },
    { id: 'energy', name: 'Energia e Lavoro', desc: 'Converti joule, chilojoule, calorie, chilocalorie, chilowattora (kWh) e BTU.' },
    { id: 'power', name: 'Potenza', desc: 'Converti watt, chilowatt, megawatt, cavalli vapore meccanici (hp) e cavalli metrici (CV).' },
    { id: 'data', name: 'Memoria Digitale', desc: 'Converti byte, kilobyte (KB), megabyte (MB), gigabyte (GB), terabyte (TB) e petabyte (PB).' },
    { id: 'data_rate', name: 'Velocità di Trasferimento', desc: 'Converti bit per secondo, Mbps, Gbps, megabyte al secondo (MB/s) e gigabyte al secondo.' },
    { id: 'frequency', name: 'Frequenza', desc: 'Converti hertz (Hz), chilohertz (kHz), megahertz (MHz), gigahertz (GHz) e giri/min (RPM).' },
    { id: 'angle', name: 'Angolo Piano', desc: 'Converti gradi (°), radianti (rad), centesimali, primi d’arco, secondi d’arco e rivoluzioni.' },
    { id: 'fuel', name: 'Consumo di Carburante', desc: 'Converti miglia per gallone (MPG USA e UK), chilometri per litro (km/L) e litri per 100 km (L/100km).' },
    { id: 'cooking', name: 'Misure da Cucina', desc: 'Converti cucchiaini, cucchiai, tazze, once liquide, pinte e millilitri per ricette.' }
  ],
  presets: [
    { label: '1 Miglio in Km', cat: 'length', from: 'mile', to: 'kilometer', val: '1' },
    { label: '1 Pollice in cm', cat: 'length', from: 'inch', to: 'centimeter', val: '1' },
    { label: '1 Kg in Libbre', cat: 'mass', from: 'kilogram', to: 'pound', val: '1' },
    { label: '100°C in °F', cat: 'temperature', from: 'celsius', to: 'fahrenheit', val: '100' },
    { label: '1 Acro in Piedi²', cat: 'area', from: 'acre', to: 'sqft', val: '1' },
    { label: '1 GB in MB', cat: 'data', from: 'gigabyte', to: 'megabyte', val: '1' },
    { label: '100 Mbps in MB/s', cat: 'data_rate', from: 'mbps', to: 'mb_per_sec', val: '100' },
    { label: '1 Bar in PSI', cat: 'pressure', from: 'bar', to: 'psi', val: '1' },
    { label: '1 kWh in Joule', cat: 'energy', from: 'kilowatt_hour', to: 'joule', val: '1' },
    { label: '1 Tazza in mL', cat: 'cooking', from: 'cooking_cup', to: 'cooking_ml', val: '1' }
  ],
  article: {
    h2Overview: 'Guida Completa alla Conversione delle Unità: Sistemi Metrico, Imperiale e Scientifico',
    pOverview1: 'Che tu debba risolvere equazioni ingegneristiche, seguire una ricetta da un libro di cucina internazionale, pianificare un viaggio all’estero o gestire lo spazio su server cloud, le conversioni di unità sono essenziali nella vita quotidiana. Il mondo moderno poggia prevalentemente su due grandi sistemi: il Sistema Internazionale di Unità (SI Metrico), adottato da quasi tutti i paesi del mondo, e il Sistema Consuetudinario / Imperiale, utilizzato negli Stati Uniti e nel Regno Unito.',
    pOverview2: 'Questo Mega Convertitore gratuito offre conversioni immediate e affidabili su 16 categorie essenziali. Ogni calcolo viene elaborato localmente nel tuo browser attraverso l’aritmetica a virgola mobile a doppia precisione IEEE 754 fino a 8 cifre decimali.',

    categoriesHeader: 'Analisi Dettagliata delle 16 Categorie di Conversione',
    categoriesList: [
      {
        title: '1. Lunghezza e Distanza',
        description: 'La lunghezza misura la distanza monodimensionale tra due punti nello spazio. L’unità base del SI è il metro (m). Il sistema imperiale si affida a pollici, piedi, iarde e miglia.',
        bulletPoints: [
          '1 Pollice (in) = 2,54 Centimetri (cm) (standard internazionale esatto dal 1959).',
          '1 Piede (ft) = 12 Pollici = 0,3048 Metri (m).',
          '1 Iarda (yd) = 3 Piedi = 0,9144 Metri.',
          '1 Miglio (mi) = 5.280 Piedi = 1.760 Iarde = 1,609344 Chilometri (km).',
          '1 Miglio Nautico (nmi) = 1.852 Metri = 1,15078 Miglia terrestri.'
        ],
        ruleOfThumb: 'Regola pratica per il calcolo a mente: moltiplica i chilometri per 0,62 per stimare le miglia (es. 100 km/h ≈ 62 mph). Dividi i centimetri per 2,54 per ottenere i pollici.'
      },
      {
        title: '2. Superficie e Area',
        description: 'L’area quantifica lo spazio bidimensionale compreso in un perimetro. In ingegneria civile, agronomia e catasto immobiliare, l’accuratezza previene errori costosi.',
        bulletPoints: [
          '1 Metro Quadro (m²) = 10,7639 Piedi Quadri (sq ft).',
          '1 Acro = 43.560 Piedi Quadri = 4.046,8564 Metri Quadri ≈ 0,4047 Ettari.',
          '1 Ettaro (ha) = 10.000 Metri Quadri = 2,47105 Acri.',
          '1 Chilometro Quadro (km²) = 100 Ettari = 0,3861 Miglia Quadrate.',
          '1 Miglio Quadro (mi²) = 640 Acri = 2,58999 Chilometri Quadri.'
        ]
      },
      {
        title: '3. Volume e Capacità',
        description: 'Il volume misura lo spazio tridimensionale occupato da fluidi o solidi. Attenzione: le unità liquide degli Stati Uniti differiscono da quelle imperiali britanniche.',
        bulletPoints: [
          '1 Litro (L) = 1.000 Millilitri (mL) = 0,264172 Galloni USA = 33,814 Once Liquide USA.',
          '1 Gallone Liquido USA = 3,78541 Litri = 128 Once Liquide USA = 4 Quarti = 8 Pinte.',
          '1 Gallone Imperiale Britannico = 4,54609 Litri = 160 Once Liquide UK (~20% più grande del gallone USA).',
          '1 Tazza USA (cup) = 8 Once Liquide = 236,588 Millilitri.',
          '1 Metro Cubo (m³) = 1.000 Litri = 35,3147 Piedi Cubi = 264,172 Galloni USA.'
        ]
      },
      {
        title: '4. Massa e Peso',
        description: 'La massa esprime la quantità intrinseca di materia di un corpo, mentre il peso ne rappresenta la forza gravitazionale. Nel commercio terrestre standard sono considerati equivalenti.',
        bulletPoints: [
          '1 Chilogrammo (kg) = 2,20462 Libbre (lbs) = 1.000 Grammi (g).',
          '1 Libbra (lb) = 16 Once (oz) = 453,59237 Grammi = 0,453592 Chilogrammi.',
          '1 Tonnellata Metrica (t) = 1.000 Chilogrammi ≈ 2.204,62 Libbre.',
          '1 Tonnellata Corta USA = 2.000 Libbre = 907,185 Chilogrammi.',
          '1 Stone (st, UK) = 14 Libbre = 6,35029 Chilogrammi.'
        ]
      },
      {
        title: '5. Temperatura',
        description: 'La temperatura misura l’energia cinetica molecolare media. Poiché le scale hanno origini e zeri differenti, la conversione richiede equazioni affini.',
        bulletPoints: [
          'Celsius in Fahrenheit: °F = (°C × 9/5) + 32',
          'Fahrenheit in Celsius: °C = (°F - 32) × 5/9',
          'Celsius in Kelvin: K = °C + 273,15',
          'Kelvin in Celsius: °C = K - 273,15',
          'Fahrenheit in Rankine: °R = °F + 459,67'
        ]
      },
      {
        title: '6. Tempo e Durata',
        description: 'Il tempo rappresenta l’ordine sequenziale continuo degli eventi. L’unità di base del SI è il secondo, definito mediante le transizioni atomiche del Cesio-133.',
        bulletPoints: [
          '1 Minuto = 60 Secondi.',
          '1 Ora = 60 Minuti = 3.600 Secondi.',
          '1 Giorno = 24 Ore = 1.440 Minuti = 86.400 Secondi.',
          '1 Settimana = 7 Giorni = 168 Ore = 604.800 Secondi.',
          '1 Anno Civile (Gregoriano) = 365 Giorni = 8.760 Ore = 31.536.000 Secondi (anno bisestile: 366 giorni).'
        ]
      },
      {
        title: '7. Velocità',
        description: 'La velocità quantifica lo spazio percorso per unità di tempo trascorso.',
        bulletPoints: [
          '1 Chilometro orario (km/h) = 0,621371 Miglia orarie (mph) = 0,277778 Metri al secondo (m/s).',
          '1 Miglio orario (mph) = 1,609344 km/h = 0,44704 m/s = 0,868976 Nodi.',
          '1 Nodo (kn) = 1 Miglio Nautico orario = 1,852 km/h = 1,15078 mph.',
          'Mach 1 (Velocità del suono a livello del mare, 20°C) ≈ 343 m/s ≈ 1.235 km/h ≈ 767,3 mph.'
        ]
      },
      {
        title: '8. Pressione',
        description: 'La pressione è la forza perpendicolare applicata per unità di superficie. Trova impiego in idraulica, meteorologia e pneumatici auto.',
        bulletPoints: [
          '1 Pascal (Pa) = 1 Newton per metro quadro (N/m²).',
          '1 Bar = 100.000 Pascal (100 kPa) = 14,5038 PSI.',
          '1 Atmosfera Standard (atm) = 101.325 Pa = 1,01325 Bar = 14,6959 PSI.',
          '1 PSI (Libbra per pollice quadro) = 6.894,76 Pascal = 0,0689476 Bar.',
          '1 Torr = 1 mmHg ≈ 133,322 Pascal.'
        ]
      },
      {
        title: '9. Energia e Lavoro',
        description: 'L’energia rappresenta la capacità di compiere lavoro meccanico o trasferire calore.',
        bulletPoints: [
          '1 Joule (J) = 1 Watt-secondo = 1 Newton-metro.',
          '1 Chilowattora (kWh) = 3.600.000 Joule (3,6 MJ).',
          '1 Caloria (termochimica) = 4,184 Joule.',
          '1 Chilocaloria alimentare (kcal) = 1.000 Calorie = 4.184 Joule.',
          '1 British Thermal Unit (BTU) = 1.055,06 Joule = 252,164 Calorie.'
        ]
      },
      {
        title: '10. Potenza',
        description: 'La potenza misura la rapidità con cui viene compiuto un lavoro o trasferita energia nell’unità di tempo.',
        bulletPoints: [
          '1 Watt (W) = 1 Joule al secondo.',
          '1 Chilowatt (kW) = 1.000 Watt = 1,34102 Cavalli vapore meccanici (hp).',
          '1 Cavallo vapore meccanico (Imperial hp) = 745,69987 Watt ≈ 0,746 kW.',
          '1 Cavallo vapore metrico (CV / PS) = 735,49875 Watt ≈ 0,9863 hp imperiale.',
          '1 Megawatt (MW) = 1.000 Chilowatt = 1.000.000 Watt.'
        ]
      },
      {
        title: '11. Memoria Digitale',
        description: 'Misura la capacità di dati elettronici. I produttori di dischi impiegano la notazione decimale (base 10), mentre i sistemi operativi usano quella binaria (base 2).',
        bulletPoints: [
          '1 Byte (B) = 8 Bit (b).',
          '1 Kilobyte (KB) = 1.024 Byte (binario) oppure 1.000 Byte (decimale).',
          '1 Megabyte (MB) = 1.024 KB = 1.048.576 Byte.',
          '1 Gigabyte (GB) = 1.024 MB = 1.073.741.824 Byte.',
          '1 Terabyte (TB) = 1.024 GB = 1.099.511.627.776 Byte.',
          '1 Petabyte (PB) = 1.024 TB.'
        ]
      },
      {
        title: '12. Velocità di Trasferimento Dati',
        description: 'Misura la larghezza di banda o capacità di trasmissione delle reti di comunicazione.',
        bulletPoints: [
          '1 Megabit al secondo (Mbps) = 1.000.000 bit al secondo (velocità della linea).',
          '1 Megabyte al secondo (MB/s) = 8 Megabit al secondo (velocità di download file).',
          '1 Gigabit al secondo (Gbps) = 1.000 Mbps = 125 MB/s.',
          'Una linea da 100 Mbps scarica in condizioni ideali al massimo 12,5 MB/s teorici.'
        ]
      },
      {
        title: '13. Frequenza',
        description: 'Numero di ripetizioni di un evento periodico per unità di tempo.',
        bulletPoints: [
          '1 Hertz (Hz) = 1 ciclo al secondo.',
          '1 Chilohertz (kHz) = 1.000 Hz.',
          '1 Megahertz (MHz) = 1.000.000 Hz (frequenze radio e clock).',
          '1 Gigahertz (GHz) = 1.000.000.000 Hz (clock dei processori e Wi-Fi 5 GHz).',
          '1 RPM (Giri al minuto) = 1/60 Hz ≈ 0,016667 Hz.'
        ]
      },
      {
        title: '14. Angolo Piano',
        description: 'Quantifica l’apertura circolare tra due semirette incidenti.',
        bulletPoints: [
          'Cerchio completo = 360 Gradi (°) = 2π Radianti (≈ 6,283185 rad) = 400 Gradi centesimali.',
          '1 Radiante = 180 / π ≈ 57,2958 Gradi.',
          '1 Grado = π / 180 ≈ 0,0174533 Radianti.',
          '1 Grado = 60 Primi d’arco (′) = 3.600 Secondi d’arco (″).'
        ]
      },
      {
        title: '15. Consumo di Carburante',
        description: 'Rapporto tra la distanza percorsa e il carburante consumato, o il suo inverso.',
        bulletPoints: [
          'Miglia per Gallone (MPG USA) in km/L: km/L = MPG × 0,425144.',
          'MPG USA in L/100km: L/100km = 235,215 / MPG USA (relazione reciproca).',
          'Chilometri per Litro (km/L) in L/100km: L/100km = 100 / (km/L).',
          '1 MPG Imperiale britannico ≈ 1,20095 MPG USA.'
        ]
      },
      {
        title: '16. Misure da Cucina e Pasticceria',
        description: 'Necessario in cucina per adattare ricette internazionali tra cucchiai, tazze e millilitri metrici.',
        bulletPoints: [
          '1 Cucchiaio USA (tbsp) = 3 Cucchiaini (tsp) = 0,5 Once liquide ≈ 14,787 mL.',
          '1 Tazza USA (cup) = 16 Cucchiai = 48 Cucchiaini = 8 Once liquide ≈ 236,588 mL.',
          '1 Tazza metrica standard (Europa/Australia) = 250 mL.',
          '1 Pinta USA = 2 Tazze = 16 Once liquide ≈ 473,176 mL.'
        ]
      }
    ],

    comparisonHeader: 'Metrico vs Imperiale: Differenze Concettuali e di Utilizzo',
    comparisonText: 'Il Sistema Metrico Internazionale (SI) poggia sull’omogeneità decimale: ogni grandezza scala in potenze di dieci con prefissi intuitivi (kilo-, centi-, milli-, micro-). Al contrario, il sistema imperiale deriva da usanze commerciali e agrarie medievali con moltiplicatori eterogenei:',
    comparisonPoints: [
      'Semplicità Decimale: Nel metrico, 1 chilometro equivale a 1.000 metri e 1 metro a 100 centimetri. Nell’imperiale, 1 miglio ha 5.280 piedi e 1 piede ha 12 pollici.',
      'Adozione Scientifica Universale: La ricerca scientifica, l’industria farmaceutica e il settore aerospaziale mondiale adottano esclusivamente il sistema metrico SI.',
      'Persistenza Culturale: Le misure imperiali rimangono fortemente radicate negli USA per il legname edile, la pressione pneumatici (PSI), i limiti stradali (mph) e i terreni agricoli in acri.'
    ],

    formulasHeader: 'Formule Matematiche e Riferimenti Termici',
    formulasIntro: 'Mentre le grandezze lineari si convertono con una semplice moltiplicazione, la temperatura richiede equazioni affini per via dei punti di zero disallineati. La tabella seguente illustra i principali riferimenti fisici:',
    benchmarksTitle: 'Punti Notevoli di Riferimento Termico',
    benchmarksHeaders: {
      condition: 'Fenomeno Fisico',
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      kelvin: 'Kelvin (K)'
    },
    benchmarksRows: [
      { condition: 'Zero Assoluto (Cessazione del moto molecolare)', celsius: '-273,15 °C', fahrenheit: '-459,67 °F', kelvin: '0,00 K' },
      { condition: 'Punto di Congelamento dell’Acqua Pura (1 atm)', celsius: '0,00 °C', fahrenheit: '32,00 °F', kelvin: '273,15 K' },
      { condition: 'Temperatura Ambiente Standard', celsius: '20,00 a 22,00 °C', fahrenheit: '68,00 a 71,60 °F', kelvin: '293,15 a 295,15 K' },
      { condition: 'Temperatura Media del Corpo Umano', celsius: '37,00 °C', fahrenheit: '98,60 °F', kelvin: '310,15 K' },
      { condition: 'Punto di Ebollizione dell’Acqua Pura (1 atm)', celsius: '100,00 °C', fahrenheit: '212,00 °F', kelvin: '373,15 K' }
    ],

    useCasesHeader: 'Applicazioni Pratiche Quotidiane',
    useCasesList: [
      {
        title: 'Viaggi all’Estero e Guida',
        description: 'Guidare un’auto a noleggio oltreconfine richiede conversioni repentine tra km/h e mph, pressione degli pneumatici (bar vs psi) e carburante (litri vs galloni).'
      },
      {
        title: 'Gastronomia e Pasticceria',
        description: 'La pasticceria è una scienza esatta. Confondere le once liquide statunitensi con quelle imperiali compromette l’idratazione degli impasti.'
      },
      {
        title: 'Progetti di Ingegneria e Architettura',
        description: 'Ingegneri e architetti convertono regolarmente quote tra millimetri e piedi/pollici senza compromettere le tolleranze costruttive.'
      },
      {
        title: 'Infrastruttura Informatica e Cloud',
        description: 'Comprendere lo scarto tra i gigabyte decimali dichiarati e i gibibyte binari del sistema operativo assicura il corretto dimensionamento dei server.'
      }
    ],

    limitationsHeader: 'Ipotesi Tecniche e Limiti di Precisione',
    limitationsList: [
      'I calcoli sono eseguiti nel browser mediante numeri a virgola mobile a 64 bit IEEE 754. L’output è arrotondato fino a 8 cifre decimali per eliminare imprecisioni binarie periodiche.',
      'Le equivalenze culinarie assumono la densità standard dell’acqua (1 g/mL). Per ingredienti secchi quali farina o zucchero si consiglia l’uso di una bilancia da cucina.',
      'I valori di pressione e di ebollizione fanno riferimento alla quota media del livello del mare a 101.325 Pa (1 atmosfera).'
    ]
  },
  faqs: [
    {
      question: '1. Quanto è preciso questo convertitore di unità online?',
      answer: 'Tutti i rapporti di conversione derivano dagli standard più recenti del NIST e dell’ISO. I calcoli avvengono sul tuo dispositivo con aritmetica a 64 bit IEEE 754, garantendo un’accuratezza fino a 8 cifre decimali senza alcun ritardo di trasmissione col server.'
    },
    {
      question: '2. Qual è la differenza fondamentale tra il Sistema Metrico e quello Imperiale?',
      answer: 'Il sistema metrico è decimale (potenze di 10), rendendo immediato il passaggio tra millimetri, centimetri, metri e chilometri. Il sistema imperiale ha origini consuetudinarie medievali e impiega fattori non uniformi (12 pollici in un piede, 3 piedi in una iarda, 16 once in una libbra, 5.280 piedi in un miglio).'
    },
    {
      question: '3. Perché il gallone liquido USA è diverso dal gallone imperiale britannico?',
      answer: 'Il gallone liquido USA corrisponde a 231 pollici cubici (~3,7854 litri). Il gallone imperiale britannico è stato fissato nel 1824 come il volume occupato da 10 libbre d’acqua a 62°F (~4,5461 litri). Pertanto, il gallone britannico è circa il 20,09% più capiente di quello statunitense.'
    },
    {
      question: '4. Come si converte la temperatura tra Celsius, Fahrenheit e Kelvin?',
      answer: 'Da Celsius a Fahrenheit: moltiplica per 1,8 e aggiungi 32 [°F = (°C × 1,8) + 32]. Da Fahrenheit a Celsius: sottrai 32 e dividi per 1,8 [°C = (°F - 32) ÷ 1,8]. Da Celsius a Kelvin: aggiungi 273,15 [K = °C + 273,15]. Entrambe le scale coincidono a esattamente -40° (-40°C = -40°F).'
    },
    {
      question: '5. Quanti piedi quadri ci sono in un acro e in un ettaro?',
      answer: 'Un acro corrisponde a esattamente 43.560 piedi quadri (circa 4.046,86 metri quadri). Un ettaro equivale a 10.000 metri quadri, pari a circa 107.639 piedi quadri o 2,47105 acri.'
    },
    {
      question: '6. Perché il mio hard disk da 1 TB viene visualizzato come 931 GB su Windows?',
      answer: 'I produttori usano il gigabyte decimale (1 TB = 1.000.000.000.000 di byte). Windows calcola lo spazio in gibibyte binari (GiB, 1 GiB = 1.073.741.824 byte). Dividendo 1.000.000.000.000 per 1.073.741.824 si ottengono circa 931,32 GiB, che Windows etichetta sinteticamente come "GB".'
    },
    {
      question: '7. Qual è la differenza tra megabit al secondo (Mbps) e megabyte al secondo (MB/s)?',
      answer: 'Mbps (con "b" minuscola) esprime la larghezza di banda e la velocità della connessione di rete. MB/s (con "B" maiuscola) indica la velocità effettiva di download o scrittura file. Poiché 1 byte contiene 8 bit, dividi i Mbps per 8 per ottenere la velocità in MB/s (es. 100 Mbps ÷ 8 = 12,5 MB/s).'
    },
    {
      question: '8. Come funziona la conversione dei consumi tra MPG e L/100km?',
      answer: 'Il rapporto tra MPG USA e L/100km è inverso: un valore MPG più alto indica maggiore risparmio, mentre un valore L/100km più basso esprime maggiore efficienza. La formula è: L/100km = 235,215 ÷ MPG USA (es. 30 MPG equivale a 235,215 ÷ 30 ≈ 7,84 L/100km).'
    },
    {
      question: '9. Quanti cucchiaini ci sono in un cucchiaio e in una tazza da cucina?',
      answer: 'Nelle misure da cucina USA, 1 cucchiaio (tbsp) contiene esattamente 3 cucchiaini (tsp) (~14,79 mL). Una tazza USA contiene 16 cucchiai o 48 cucchiaini (~236,59 mL). Nelle convenzioni metriche internazionali, una tazza è comunemente arrotondata a 250 mL.'
    },
    {
      question: '10. Che differenza c’è tra massa e peso nella fisica e nell’uso comune?',
      answer: 'Dal punto di vista scientifico, la massa (in kg) è una misura intrinseca della quantità di materia, costante ovunque. Il peso (in Newton) è la forza di gravità che agisce su tale massa (P = m × g). Nelle transazioni ordinarie sulla Terra i due termini vengono usati come sinonimi.'
    },
    {
      question: '11. Come si rapportano bar, PSI e atmosfere nella misura della pressione?',
      answer: 'La pressione atmosferica standard a livello del mare (1 atm) corrisponde a 101.325 Pascal, 1,01325 Bar o 14,6959 PSI. Un bar (100.000 Pa) equivale a circa 14,5038 PSI. I manometri delle auto esprimono la pressione relativa al valore atmosferico in PSI o bar.'
    },
    {
      question: '12. Perché gli angoli si misurano sia in gradi che in radianti?',
      answer: 'I gradi (360° nel cerchio) derivano dall’antica astronomia babilonese. Il radiante è l’unità naturale del SI scientifico, definita dalla lunghezza dell’arco pari al raggio (2π rad = 360°), ed è indispensabile nel calcolo infinitesimale e nelle derivate trigonometriche.'
    },
    {
      question: '13. Questo convertitore richiede connessione a Internet o trasmette dati personali?',
      answer: 'No. Il convertitore funziona al 100% in locale nel tuo browser grazie a JavaScript. Nessun valore inserito né alcuna selezione viene inviata attraverso la rete o salvata su server esterni.'
    },
    {
      question: '14. È possibile convertire contemporaneamente verso più unità di misura?',
      answer: 'Sì. Non appena digiti un valore numerico, la tabella "Equivalente in Altre Unità" calcola e visualizza istantaneamente i valori corrispondenti per ciascuna unità disponibile nella categoria attiva in tempo reale.'
    }
  ]
};
