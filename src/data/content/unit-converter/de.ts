import type { UnitConverterContent } from './types';

export const deContent: UnitConverterContent = {
  meta: {
    title: 'Einheitenumrechner – Kostenloser Online-Rechner für Metrisch & Imperial',
    description: 'Kostenloser Online-Mega-Einheitenumrechner. Rechnen Sie Länge, Gewicht, Temperatur, Fläche, Volumen, Geschwindigkeit, Zeit, Druck, Energie, Leistung und Kocheinheiten sofort um.',
    keywords: [
      'einheitenumrechner',
      'einheiten umrechnen',
      'metrisch imperial umrechner',
      'länge umrechnen',
      'gewicht umrechnen',
      'temperatur umrechnen',
      'celsius in fahrenheit',
      'kg in pfund',
      'zoll in cm',
      'meilen in km',
      'flächenumrechner'
    ],
    h1: 'Online-Einheitenumrechner',
    intro: 'Konvertieren Sie sofort zwischen metrischen, imperialen und internationalen Standardeinheiten in 16 wissenschaftlichen und alltäglichen Kategorien. Schnell, 100% clientseitig und präzise bis auf 8 Nachkommastellen.'
  },
  ui: {
    quickConversionsTitle: '⚡ Schnellumrechnungen:',
    fromLabel: 'Ausgangswert',
    toLabel: 'Umgerechnetes Ergebnis',
    swapButton: 'Einheiten tauschen',
    copyButton: 'Ergebnis kopieren',
    copied: 'Kopiert! ✓',
    formulaLabel: 'Formel',
    convertedValueHeader: 'Umgerechneter Wert',
    precisionLabel: 'Präzision',
    precisionValue: 'Bis zu 8 Dezimalstellen',
    standardUnitLabel: 'Standardeinheit',
    equivalentHeader: '📋 Entsprechung in anderen Einheiten',
    enterValuePlaceholder: 'Wert zum Umrechnen eingeben...',
    resultPlaceholder: 'Ergebnis wird hier angezeigt...',
    indianLandBannerText: 'Suchen Sie nach indischen Landflächeneinheiten (Bigha, Gaj, Biswa, Guntha, Acre)? Nutzen Sie unseren speziellen Rechner →',
    indianLandBannerBtn: 'Rechner öffnen',
    emptyHeroSub: 'Wählen Sie oben Einheiten aus und geben Sie einen Wert ein, um sofortige Umrechnungen zu berechnen.'
  },
  categories: [
    { id: 'length', name: 'Länge und Distanz', desc: 'Rechnen Sie Meter, Kilometer, Meilen, Yards, Fuß, Zoll und Seemeilen um.' },
    { id: 'area', name: 'Fläche und Grundstück', desc: 'Rechnen Sie Quadratmeter, Quadratfuß, Hektar, Acre, Quadratkilometer und Quadratmeilen um.' },
    { id: 'volume', name: 'Volumen und Hohlmaß', desc: 'Rechnen Sie Liter, Milliliter, US-Gallonen, UK-Gallonen, Tassen, Pints und Kubikmeter um.' },
    { id: 'mass', name: 'Masse und Gewicht', desc: 'Rechnen Sie Kilogramm, Gramm, Milligramm, Pfund (lbs), Unzen (oz), Stones und Tonnen um.' },
    { id: 'temperature', name: 'Temperatur', desc: 'Rechnen Sie Temperaturen zwischen Celsius (°C), Fahrenheit (°F), Kelvin (K) und Rankine (°R) um.' },
    { id: 'time', name: 'Zeit und Dauer', desc: 'Rechnen Sie Sekunden, Minuten, Stunden, Tage, Wochen, Monate und Jahre um.' },
    { id: 'speed', name: 'Geschwindigkeit', desc: 'Rechnen Sie km/h, mph, m/s, Knoten und Mach um.' },
    { id: 'pressure', name: 'Druck', desc: 'Rechnen Sie Pascal, Bar, PSI, physikalische Atmosphären (atm), Millibar und Torr um.' },
    { id: 'energy', name: 'Energie und Arbeit', desc: 'Rechnen Sie Joule, Kilojoule, Kalorien, Kilokalorien, Kilowattstunden (kWh) und BTU um.' },
    { id: 'power', name: 'Leistung', desc: 'Rechnen Sie Watt, Kilowatt, Megawatt, Pferdestärken (PS) und mechanische Horsepower (hp) um.' },
    { id: 'data', name: 'Digitaler Speicher', desc: 'Rechnen Sie Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB) und Petabytes (PB) um.' },
    { id: 'data_rate', name: 'Datenübertragungsrate', desc: 'Rechnen Sie Bits pro Sekunde, Mbps, Gbps, Megabytes pro Sekunde (MB/s) und Gigabytes pro Sekunde um.' },
    { id: 'frequency', name: 'Frequenz', desc: 'Rechnen Sie Hertz (Hz), Kilohertz (kHz), Megahertz (MHz), Gigahertz (GHz) und U/min um.' },
    { id: 'angle', name: 'Winkel', desc: 'Rechnen Sie Grad (°), Bogenmaß/Radiant (rad), Gon, Bogenminuten, Bogensekunden und Umdrehungen um.' },
    { id: 'fuel', name: 'Kraftstoffverbrauch', desc: 'Rechnen Sie Meilen pro Gallone (MPG US & UK), km/L und Liter pro 100 km (L/100km) um.' },
    { id: 'cooking', name: 'Kochen und Backen', desc: 'Rechnen Sie Teelöffel, Esslöffel, Tassen, Flüssigunzen, Pints und Milliliter für Rezepte um.' }
  ],
  presets: [
    { label: '1 Meile in km', cat: 'length', from: 'mile', to: 'kilometer', val: '1' },
    { label: '1 Zoll in cm', cat: 'length', from: 'inch', to: 'centimeter', val: '1' },
    { label: '1 kg in Pfund', cat: 'mass', from: 'kilogram', to: 'pound', val: '1' },
    { label: '100°C in °F', cat: 'temperature', from: 'celsius', to: 'fahrenheit', val: '100' },
    { label: '1 Acre in Quadratfuß', cat: 'area', from: 'acre', to: 'sqft', val: '1' },
    { label: '1 GB in MB', cat: 'data', from: 'gigabyte', to: 'megabyte', val: '1' },
    { label: '100 Mbps in MB/s', cat: 'data_rate', from: 'mbps', to: 'mb_per_sec', val: '100' },
    { label: '1 Bar in PSI', cat: 'pressure', from: 'bar', to: 'psi', val: '1' },
    { label: '1 kWh in Joule', cat: 'energy', from: 'kilowatt_hour', to: 'joule', val: '1' },
    { label: '1 Tasse in mL', cat: 'cooking', from: 'cooking_cup', to: 'cooking_ml', val: '1' }
  ],
  article: {
    h2Overview: 'Ausführlicher Leitfaden zur Einheitenumrechnung: Metrische, imperiale und wissenschaftliche Systeme',
    pOverview1: 'Ob bei ingenieurwissenschaftlichen Berechnungen, beim Nachkochen internationaler Rezepte, bei der Planung von Auslandsreisen oder bei der Verwaltung von Cloud-Speicherplatz – Einheitenumrechnungen gehören zu den unverzichtbaren Grundlagen des Alltags. Die moderne Welt basiert im Wesentlichen auf zwei maßgeblichen Maßsystemen: dem Internationalen Einheitensystem (SI-Metrik), das nahezu weltweit verbindlich ist, und dem angloamerikanischen Maßsystem (Imperial / US Customary), das vor allem in den USA und im Vereinigten Königreich verbreitet ist.',
    pOverview2: 'Dieser kostenlose Einheitenumrechner ermöglicht schnelle und exakte Berechnungen über 16 zentrale Fachbereiche hinweg. Jede Umrechnung wird direkt im Webbrowser mittels IEEE 754 64-Bit-Gleitkommaarithmetik mit einer Genauigkeit von bis zu 8 Nachkommastellen durchgeführt.',

    categoriesHeader: 'Detaillierte Übersicht der 16 Umrechnungskategorien',
    categoriesList: [
      {
        title: '1. Länge und Distanz',
        description: 'Länge beschreibt den eindimensionalen Abstand zwischen zwei Punkten im Raum. Die SI-Basiseinheit ist das Meter (m). Das imperiale System nutzt Zoll (Inches), Fuß (Feet), Yards und Meilen.',
        bulletPoints: [
          '1 Zoll / Inch (in) = 2,54 Zentimeter (cm) (exakte internationale Vereinbarung seit 1959).',
          '1 Fuß (ft) = 12 Zoll = 0,3048 Meter (m).',
          '1 Yard (yd) = 3 Fuß = 0,9144 Meter.',
          '1 Meile (mi) = 5.280 Fuß = 1.760 Yards = 1,609344 Kilometer (km).',
          '1 Seemeile (nmi) = 1.852 Meter = 1,15078 Landmeilen.'
        ],
        ruleOfThumb: 'Faustformel für das Kopfrechnen: Multiplizieren Sie Kilometer mit 0,62, um Meilen anzunähern (z. B. 100 km/h ≈ 62 mph). Teilen Sie Zentimeter durch 2,54 für Zoll.'
      },
      {
        title: '2. Fläche und Grundstücke',
        description: 'Fläche quantifiziert die zweidimensionale Ausdehnung innerhalb einer Begrenzung. In der Architektur, Landwirtschaft und Immobilienwirtschaft verhindert Genauigkeit gravierende Planungsfehler.',
        bulletPoints: [
          '1 Quadratmeter (m²) = 10,7639 Quadratfuß (sq ft).',
          '1 Acre = 43.560 Quadratfuß = 4.046,8564 Quadratmeter ≈ 0,4047 Hektar.',
          '1 Hektar (ha) = 10.000 Quadratmeter = 2,47105 Acre.',
          '1 Quadratkilometer (km²) = 100 Hektar = 0,3861 Quadratmeilen.',
          '1 Quadratmeile (mi²) = 640 Acre = 2,58999 Quadratkilometer.'
        ]
      },
      {
        title: '3. Volumen und Hohlmaß',
        description: 'Volumen beschreibt den dreidimensionalen Raum, den Flüssigkeiten, Gase oder Festkörper einnehmen. US-amerikanische Flüssigunzen unterscheiden sich erheblich vom britischen Imperial-Standard.',
        bulletPoints: [
          '1 Liter (L) = 1.000 Milliliter (mL) = 0,264172 US-Gallonen = 33,814 US-Flüssigunzen.',
          '1 US-Flüssiggallone = 3,78541 Liter = 128 US-Flüssigunzen = 4 Quarts = 8 Pints.',
          '1 UK-Imperial-Gallone = 4,54609 Liter = 160 UK-Flüssigunzen (~20% größer als die US-Gallone).',
          '1 US-Tasse (Cup) = 8 Flüssigunzen = 236,588 Milliliter.',
          '1 Kubikmeter (m³) = 1.000 Liter = 35,3147 Kubikfuß = 264,172 US-Gallonen.'
        ]
      },
      {
        title: '4. Masse und Gewicht',
        description: 'Masse kennzeichnet die unveränderliche Stoffmenge eines Körpers, während Gewicht die örtliche Schwerkraftwirkung darstellt. Im Alltag auf der Erde werden beide Begriffe gleichgesetzt.',
        bulletPoints: [
          '1 Kilogramm (kg) = 2,20462 Pfund (lbs) = 1.000 Gramm (g).',
          '1 Pfund (lb) = 16 Unzen (oz) = 453,59237 Gramm = 0,453592 Kilogramm.',
          '1 Metrische Tonne (t) = 1.000 Kilogramm ≈ 2.204,62 Pfund.',
          '1 US-Short-Ton = 2.000 Pfund = 907,185 Kilogramm.',
          '1 Stone (st, UK) = 14 Pfund = 6,35029 Kilogramm.'
        ]
      },
      {
        title: '5. Temperatur',
        description: 'Temperatur spiegelt die mittlere kinetische Energie von Teilchen wider. Da die Temperaturskalen verschobene Nullpunkte aufweisen, erfolgt die Umrechnung affin über Formeln.',
        bulletPoints: [
          'Celsius in Fahrenheit: °F = (°C × 9/5) + 32',
          'Fahrenheit in Celsius: °C = (°F - 32) × 5/9',
          'Celsius in Kelvin: K = °C + 273,15',
          'Kelvin in Celsius: °C = K - 273,15',
          'Fahrenheit in Rankine: °R = °F + 459,67'
        ]
      },
      {
        title: '6. Zeit und Dauer',
        description: 'Zeit beschreibt das kontinuierliche Fortschreiten von Ereignissen. Die SI-Basiseinheit ist die Sekunde, definiert über atomare Übergänge von Cäsium-133.',
        bulletPoints: [
          '1 Minute = 60 Sekunden.',
          '1 Stunde = 60 Minuten = 3.600 Sekunden.',
          '1 Tag = 24 Stunden = 1.440 Minuten = 86.400 Sekunden.',
          '1 Woche = 7 Tage = 168 Stunden = 604.800 Sekunden.',
          '1 Kalenderjahr (Gregorianisch) = 365 Tage = 8.760 Stunden = 31.536.000 Sekunden (Schaltjahr: 366 Tage).'
        ]
      },
      {
        title: '7. Geschwindigkeit',
        description: 'Geschwindigkeit ist der zurückgelegte Weg bezogen auf die dafür benötigte Zeit.',
        bulletPoints: [
          '1 Kilometer pro Stunde (km/h) = 0,621371 Meilen pro Stunde (mph) = 0,277778 Meter pro Sekunde (m/s).',
          '1 Meile pro Stunde (mph) = 1,609344 km/h = 0,44704 m/s = 0,868976 Knoten.',
          '1 Knoten (kn) = 1 Seemeile pro Stunde = 1,852 km/h = 1,15078 mph.',
          'Mach 1 (Schallgeschwindigkeit bei 20°C auf Meereshöhe) ≈ 343 m/s ≈ 1.235 km/h ≈ 767,3 mph.'
        ]
      },
      {
        title: '8. Druck',
        description: 'Druck ist die senkrecht auf eine Fläche wirkende Kraft je Flächeneinheit. Verwendung in Pneumatik, Wetterkunde und Reifenpflege.',
        bulletPoints: [
          '1 Pascal (Pa) = 1 Newton pro Quadratmeter (N/m²).',
          '1 Bar = 100.000 Pascal (100 kPa) = 14,5038 PSI.',
          '1 Physikalische Atmosphäre (atm) = 101.325 Pa = 1,01325 Bar = 14,6959 PSI.',
          '1 PSI (Pound-force per square inch) = 6.894,76 Pascal = 0,0689476 Bar.',
          '1 Torr = 1 mmHg ≈ 133,322 Pascal.'
        ]
      },
      {
        title: '9. Energie und Arbeit',
        description: 'Energie beschreibt die Fähigkeit eines Systems, mechanische Arbeit zu verrichten oder Wärme abzugeben.',
        bulletPoints: [
          '1 Joule (J) = 1 Wattsekunde = 1 Newtonmeter.',
          '1 Kilowattstunde (kWh) = 3.600.000 Joule (3,6 MJ).',
          '1 Kalorie (thermo) = 4,184 Joule.',
          '1 Kilokalorie (kcal, Lebensmittelenergie) = 1.000 Kalorien = 4.184 Joule.',
          '1 British Thermal Unit (BTU) = 1.055,06 Joule = 252,164 Kalorien.'
        ]
      },
      {
        title: '10. Leistung',
        description: 'Leistung ist der Energieumsatz bzw. die verrichtete Arbeit bezogen auf das Zeitintervall.',
        bulletPoints: [
          '1 Watt (W) = 1 Joule pro Sekunde.',
          '1 Kilowatt (kW) = 1.000 Watt = 1,34102 mechanische Horsepower (hp).',
          '1 Mechanische Horsepower (Imperial hp) = 745,69987 Watt ≈ 0,746 kW.',
          '1 Metrische Pferdestärke (PS / DIN) = 735,49875 Watt ≈ 0,9863 Imperial hp.',
          '1 Megawatt (MW) = 1.000 Kilowatt = 1.000.000 Watt.'
        ]
      },
      {
        title: '11. Digitaler Speicher',
        description: 'Elektronische Datenkapazität. Hardwarehersteller rechnen dezimal (Basis 10), während Betriebssysteme binär (Basis 2) adressieren.',
        bulletPoints: [
          '1 Byte (B) = 8 Bits (b).',
          '1 Kilobyte (KB) = 1.024 Bytes (binär) bzw. 1.000 Bytes (dezimal).',
          '1 Megabyte (MB) = 1.024 KB = 1.048.576 Bytes.',
          '1 Gigabyte (GB) = 1.024 MB = 1.073.741.824 Bytes.',
          '1 Terabyte (TB) = 1.024 GB = 1.099.511.627.776 Bytes.',
          '1 Petabyte (PB) = 1.024 TB.'
        ]
      },
      {
        title: '12. Datenübertragungsrate (Bandbreite)',
        description: 'Maß für die Durchsatzkapazität von Telekommunikationskanälen pro Zeiteinheit.',
        bulletPoints: [
          '1 Megabit pro Sekunde (Mbps) = 1.000.000 Bits pro Sekunde (Leitungsgeschwindigkeit).',
          '1 Megabyte pro Sekunde (MB/s) = 8 Megabits pro Sekunde (Dateidownload).',
          '1 Gigabit pro Sekunde (Gbps) = 1.000 Mbps = 125 MB/s.',
          'Ein 100-Mbps-Anschluss lädt unter Idealbedingungen rechnerisch bis zu 12,5 MB/s herunter.'
        ]
      },
      {
        title: '13. Frequenz',
        description: 'Anzahl der Wiederholungen eines periodischen Vorgangs pro Sekunde.',
        bulletPoints: [
          '1 Hertz (Hz) = 1 Schwingung pro Sekunde.',
          '1 Kilohertz (kHz) = 1.000 Hz.',
          '1 Megahertz (MHz) = 1.000.000 Hz (Funkwellen und Taktraten).',
          '1 Gigahertz (GHz) = 1.000.000.000 Hz (Prozessortakt und 5-GHz-WLAN).',
          '1 U/min (Umdrehungen pro Minute) = 1/60 Hz ≈ 0,016667 Hz.'
        ]
      },
      {
        title: '14. Ebene Winkel',
        description: 'Maß für die Spreizung zwischen zwei sich schneidenden Linien oder Strahlen.',
        bulletPoints: [
          'Vollkreis = 360 Grad (°) = 2π Bogenmaß/Radiant (≈ 6,283185 rad) = 400 Neugrad (Gon).',
          '1 Radiant = 180 / π ≈ 57,2958 Grad.',
          '1 Grad = π / 180 ≈ 0,0174533 Radiant.',
          '1 Grad = 60 Bogenminuten (′) = 3.600 Bogensekunden (″).'
        ]
      },
      {
        title: '15. Kraftstoffverbrauch',
        description: 'Verhältnis von Fahrtstrecke zu benötigtem Treibstoffvolumen bzw. Kehrwert.',
        bulletPoints: [
          'Meilen pro Gallone (US MPG) in km/L: km/L = MPG × 0,425144.',
          'US MPG in L/100km: L/100km = 235,215 / US MPG (reziprokes Verhältnis).',
          'km/L in L/100km: L/100km = 100 / (km/L).',
          '1 UK-Imperial MPG ≈ 1,20095 US MPG.'
        ]
      },
      {
        title: '16. Kochen und Backen',
        description: 'Genaue Volumenumrechnung von Löffel- und Tassenmaßen für internationale Rezepte.',
        bulletPoints: [
          '1 US-Esslöffel (tbsp) = 3 Teelöffel (tsp) = 0,5 Flüssigunzen ≈ 14,787 mL.',
          '1 US-Tasse (Cup) = 16 Esslöffel = 48 Teelöffel = 8 Flüssigunzen ≈ 236,588 mL.',
          '1 Metrische Tasse (in Australien/Großbritannien) = 250 mL.',
          '1 US-Pint = 2 Tassen = 16 Flüssigunzen ≈ 473,176 mL.'
        ]
      }
    ],

    comparisonHeader: 'Metrisch vs. Imperial: Systematische und praktische Unterschiede',
    comparisonText: 'Das Internationale Einheitensystem (SI) zeichnet sich durch dezimale Kohärenz aus: Jede Maßeinheit skaliert in Zehnerpotenzen mit einheitlichen Präfixen (Kilo-, Zenti-, Milli-, Mikro-). Demgegenüber entstanden die angloamerikanischen Maßeinheiten aus gewachsenen Handels- und Landwirtschaftstraditionen:',
    comparisonPoints: [
      'Dezimaler Vorteil: Im metrischen System entspricht 1 Kilometer genau 1.000 Metern und 1 Meter 100 Zentimetern. Im imperialen System hat 1 Meile 5.280 Fuß und 1 Fuß 12 Zoll.',
      'Wissenschaftlicher Standard: Die weltweite Forschung, Pharmazie, Luftfahrtinstrumente und Dosierungen basieren einheitlich auf dem SI-System.',
      'Kulturelle Festigung: US-amerikanische Baustoffmaße, Reifendruck (PSI), Geschwindigkeitsbeschränkungen (mph) und Grundstücksangaben (Acre) bleiben fest im imperialen System verankert.'
    ],

    formulasHeader: 'Mathematische Formeln und Temperatur-Fixpunkte',
    formulasIntro: 'Während lineare Umrechnungen über einen einfachen Faktor erfolgen (Ergebnis = Eingabe × Faktor), erfordern Temperaturen affine Funktionen mit versetzten Nullpunkten. Die folgende Tabelle veranschaulicht grundlegende physikalische Vergleichspunkte:',
    benchmarksTitle: 'Wichtige physikalische Temperatur-Fixpunkte',
    benchmarksHeaders: {
      condition: 'Physikalischer Zustand',
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      kelvin: 'Kelvin (K)'
    },
    benchmarksRows: [
      { condition: 'Absoluter Nullpunkt (Stillstand molekularer Bewegung)', celsius: '-273,15 °C', fahrenheit: '-459,67 °F', kelvin: '0,00 K' },
      { condition: 'Gefrierpunkt von reinem Wasser (1 atm)', celsius: '0,00 °C', fahrenheit: '32,00 °F', kelvin: '273,15 K' },
      { condition: 'Standard-Raumtemperatur', celsius: '20,00 bis 22,00 °C', fahrenheit: '68,00 bis 71,60 °F', kelvin: '293,15 bis 295,15 K' },
      { condition: 'Durchschnittliche Körpertemperatur des Menschen', celsius: '37,00 °C', fahrenheit: '98,60 °F', kelvin: '310,15 K' },
      { condition: 'Siedepunkt von reinem Wasser (1 atm)', celsius: '100,00 °C', fahrenheit: '212,00 °F', kelvin: '373,15 K' }
    ],

    useCasesHeader: 'Praktische Einsatzbereiche im Alltag',
    useCasesList: [
      {
        title: 'Internationale Reisen und Autofahren',
        description: 'Beim Fahren im Ausland müssen km/h und mph, Reifendrücke (Bar vs. PSI) und Kraftstoffmengen (Liter vs. Gallonen) rasch verglichen werden.'
      },
      {
        title: 'Kulinarik und Backkunst',
        description: 'Backen ist eine präzise chemische Angelegenheit. Die Verwechslung von US-Flüssigunzen mit imperialen Hohlmaßen kann Teige und Reaktionen beeinträchtigen.'
      },
      {
        title: 'Architektur- und Ingenieurwesen',
        description: 'Ingenieure übertragen Planungsunterlagen routinemäßig zwischen Millimetern und Fuß/Zoll, ohne Toleranz- und Rundungsverluste zu riskieren.'
      },
      {
        title: 'IT-Infrastruktur und Cloud-Speicher',
        description: 'Die Unterscheidung zwischen Dezimal-Gigabyte von Herstellern und Binär-Gibibyte des Betriebssystems schützt vor Fehlplanungen bei Servern.'
      }
    ],

    limitationsHeader: 'Technische Annahmen und Genauigkeitsgrenzen',
    limitationsList: [
      'Berechnungen erfolgen im Webbrowser mittels IEEE 754 64-Bit-Gleitkommazahlen. Die Ausgabe wird auf bis zu 8 Dezimalstellen gerundet, um Rechenartefakte zu vermeiden.',
      'Koch- und Backumrechnungen setzen die Standarddichte von Wasser (1 g/mL) voraus. Trockene Zutaten wie Mehl oder Zucker sollten für maximale Präzision mit einer Küchenwaage gewogen werden.',
      'Druck- und Siedepunktangaben beziehen sich auf den mittleren Meeresspiegeldruck von 101.325 Pa (1 physikalische Atmosphäre).'
    ]
  },
  faqs: [
    {
      question: '1. Wie genau rechnet dieser Online-Einheitenumrechner?',
      answer: 'Alle Umrechnungsverhältnisse beruhen auf den aktuellen Standards des NIST (National Institute of Standards and Technology) und der ISO. Die Berechnungen werden lokal auf Ihrem Gerät mit 64-Bit IEEE 754 Gleitkommaarithmetik durchgeführt, was eine Genauigkeit bis auf 8 Dezimalstellen sicherstellt.'
    },
    {
      question: '2. Was ist der grundlegende Unterschied zwischen dem metrischen und dem imperialen System?',
      answer: 'Das metrische System basiert auf Zehnerpotenzen, wodurch Umrechnungen zwischen Millimetern, Zentimetern, Metern und Kilometern besonders logisch sind. Das imperiale System gründet auf historischen angloamerikanischen Maßen mit ungleichmäßigen Teilern (12 Zoll pro Fuß, 3 Fuß pro Yard, 16 Unzen pro Pfund, 5.280 Fuß pro Meile).'
    },
    {
      question: '3. Warum weicht eine US-Gallone von einer britischen Imperial-Gallone ab?',
      answer: 'Die US-Flüssiggallone ist als 231 Kubikzoll (~3,7854 Liter) definiert. Die britische Imperial-Gallone wurde 1824 auf das Volumen von 10 Pfund Wasser bei 62°F (~4,5461 Liter) festgelegt. Dadurch ist die britische Gallone um etwa 20,09% größer als die US-Gallone.'
    },
    {
      question: '4. Wie rechne ich Temperaturen zwischen Celsius, Fahrenheit und Kelvin um?',
      answer: 'Celsius in Fahrenheit: mit 1,8 multiplizieren und 32 addieren [°F = (°C × 1,8) + 32]. Fahrenheit in Celsius: 32 abziehen und durch 1,8 teilen [°C = (°F - 32) ÷ 1,8]. Celsius in Kelvin: 273,15 addieren [K = °C + 273,15]. Bei exakt -40° schneiden sich beide Skalen (-40°C = -40°F).'
    },
    {
      question: '5. Wie viele Quadratfuß entsprechen einem Acre und einem Hektar?',
      answer: 'Ein Acre entspricht exakt 43.560 Quadratfuß (rund 4.046,86 Quadratmetern). Ein Hektar umfasst 10.000 Quadratmeter, was etwa 107.639 Quadratfuß oder rund 2,47105 Acre entspricht.'
    },
    {
      question: '6. Warum zeigt eine 1-TB-Festplatte unter Windows nur etwa 931 GB an?',
      answer: 'Hersteller geben Speicherkapazitäten im Dezimalsystem an (1 TB = 1.000.000.000.000 Bytes). Windows berechnet Speicherplatz jedoch in binären Gibibytes (GiB, 1 GiB = 1.073.741.824 Bytes). Teilt man 1 Billion durch 1.073.741.824, erhält man rund 931,32 GiB, was Windows verkürzt als "GB" bezeichnet.'
    },
    {
      question: '7. Worin liegt der Unterschied zwischen Megabits pro Sekunde (Mbps) und Megabytes pro Sekunde (MB/s)?',
      answer: 'Mbps (mit kleinem "b") misst die Netzwerk- und Internetbandbreite. MB/s (mit großem "B") misst die Übertragungsrate beim Speichern und Herunterladen von Dateien. Da 1 Byte aus 8 Bits besteht, teilt man die Mbps-Angabe durch 8, um die Downloadrate in MB/s zu erhalten (z. B. 100 Mbps ÷ 8 = 12,5 MB/s).'
    },
    {
      question: '8. Wie funktioniert die Verbrauchsumrechnung zwischen MPG und L/100km?',
      answer: 'Die Beziehung zwischen US MPG und L/100km ist reziprok (umgekehrt proportional): Ein höherer MPG-Wert bedeutet höhere Sparsamkeit, während ein niedrigerer L/100km-Wert bessere Effizienz anzeigt. Die Formel lautet: L/100km = 235,215 ÷ US MPG (z. B. 30 MPG ≈ 7,84 L/100km).'
    },
    {
      question: '9. Wie viele Teelöffel passen in einen Esslöffel und eine Tasse?',
      answer: 'Im US-Küchenmaß fasst 1 Esslöffel (tbsp) genau 3 Teelöffel (tsp) (~14,79 mL). Eine US-Tasse (Cup) enthält 16 Esslöffel oder 48 Teelöffel (~236,59 mL). In internationalen metrischen Rezepten wird eine Tasse üblicherweise mit 250 mL bemessen.'
    },
    {
      question: '10. Worin unterscheidet sich Masse von Gewicht im wissenschaftlichen Vergleich?',
      answer: 'Wissenschaftlich ist Masse (in kg) eine unveränderliche Eigenschaft, die die Menge der Materie beschreibt. Das Gewicht (in Newton) ist die Gravitationskraft, die auf diese Masse wirkt (F = m × g). Im alltäglichen Handel auf der Erde werden beide Begriffe gleichbedeutend verwendet.'
    },
    {
      question: '11. Wie verhalten sich bar, PSI und physikalische Atmosphären zueinander?',
      answer: 'Der mittlere Luftdruck auf Meereshöhe (1 atm) entspricht 101.325 Pascal, 1,01325 Bar bzw. 14,6959 PSI. Ein Bar (100.000 Pa) entspricht ungefähr 14,5038 PSI. Reifendruckprüfer zeigen in der Regel den Überdruck gegenüber der Atmosphäre in PSI oder Bar an.'
    },
    {
      question: '12. Warum werden Winkel sowohl in Grad als auch in Radiant (Bogenmaß) angegeben?',
      answer: 'Das Gradmaß (360° im Kreis) stammt aus babylonischen astronomischen Zählweisen. Der Radiant ist die natürliche wissenschaftliche SI-Einheit der Winkelmessung, definiert durch die Kreisbogenlänge im Verhältnis zum Radius (2π rad = 360°), und für die Infinitesimalrechnung unerlässlich.'
    },
    {
      question: '13. Benötigt dieser Rechner eine Internetverbindung oder überträgt er Eingabedaten?',
      answer: 'Nein. Dieser Umrechner läuft vollständig lokal in Ihrem Webbrowser mittels clientseitigem JavaScript. Keine Ihrer Eingaben oder Zahlenwerte werden an externe Server übertragen oder gespeichert.'
    },
    {
      question: '14. Kann ich mehrere Einheiten gleichzeitig umrechnen?',
      answer: 'Ja. Sobald Sie einen Wert eingeben, ermittelt die Tabelle "Entsprechung in anderen Einheiten" automatisch und in Echtzeit die passenden Werte für sämtliche Einheiten der ausgewählten Kategorie.'
    }
  ]
};
