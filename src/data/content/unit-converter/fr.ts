import type { UnitConverterContent } from './types';

export const frContent: UnitConverterContent = {
  meta: {
    title: 'Convertisseur d’Unités – Calculatrice Gratuite Métrique et Impérial',
    description: 'Convertisseur d’unités en ligne gratuit et complet. Convertissez instantanément longueur, poids, température, surface, volume, vitesse, temps, pression, énergie, puissance et cuisine avec des formules précises.',
    keywords: [
      'convertisseur d unites',
      'convertisseur metrique imperial',
      'convertir longueur',
      'convertir poids',
      'convertir temperature',
      'celsius en fahrenheit',
      'kg en livres',
      'pouces en cm',
      'miles en km',
      'convertisseur surface'
    ],
    h1: 'Convertisseur d’Unités en Ligne',
    intro: 'Convertissez instantanément entre les unités métriques, impériales et internationales à travers 16 catégories scientifiques et pratiques. Rapide, 100% exécuté sur votre appareil et précis jusqu’à 8 décimales.'
  },
  ui: {
    quickConversionsTitle: '⚡ Conversions Rapides :',
    fromLabel: 'Valeur Initiale',
    toLabel: 'Résultat Converti',
    swapButton: 'Inverser les Unités',
    copyButton: 'Copier le Résultat',
    copied: 'Copié ! ✓',
    formulaLabel: 'Formule',
    convertedValueHeader: 'Valeur Convertie',
    precisionLabel: 'Précision',
    precisionValue: 'Jusqu’à 8 décimales',
    standardUnitLabel: 'Unité Standard',
    equivalentHeader: '📋 Équivalences dans d’Autres Unités',
    enterValuePlaceholder: 'Entrez une valeur à convertir...',
    resultPlaceholder: 'Le résultat s’affichera ici...',
    indianLandBannerText: 'Vous recherchez des unités foncières traditionnelles indiennes (Bigha, Gaj, Biswa, Guntha, Acre) ? Essayez notre convertisseur dédié →',
    indianLandBannerBtn: 'Ouvrir l’outil',
    emptyHeroSub: 'Sélectionnez des unités et saisissez une valeur ci-dessus pour calculer la conversion immédiate.'
  },
  categories: [
    { id: 'length', name: 'Longueur et Distance', desc: 'Convertissez mètres, kilomètres, miles, yards, pieds, pouces et milles marins.' },
    { id: 'area', name: 'Superficie et Aire', desc: 'Convertissez mètres carrés, pieds carrés, acres, hectares, kilomètres carrés et miles carrés.' },
    { id: 'volume', name: 'Volume et Capacité', desc: 'Convertissez litres, millilitres, gallons US, gallons impériaux, tasses, pintes et mètres cubes.' },
    { id: 'mass', name: 'Masse et Poids', desc: 'Convertissez kilogrammes, grammes, milligrammes, livres (lbs), onces (oz), stones et tonnes métriques.' },
    { id: 'temperature', name: 'Température', desc: 'Convertissez la température entre Celsius (°C), Fahrenheit (°F), Kelvin (K) et Rankine (°R).' },
    { id: 'time', name: 'Temps et Durée', desc: 'Convertissez secondes, minutes, heures, jours, semaines, mois et années.' },
    { id: 'speed', name: 'Vitesse', desc: 'Convertissez kilomètres par heure, miles par heure, mètres par seconde, nœuds et mach.' },
    { id: 'pressure', name: 'Pression', desc: 'Convertissez pascals, bars, PSI, atmosphères (atm), millibars et torr.' },
    { id: 'energy', name: 'Énergie et Travail', desc: 'Convertissez joules, kilojoules, calories, kilocalories, kilowattheures (kWh) et BTU.' },
    { id: 'power', name: 'Puissance', desc: 'Convertissez watts, kilowatts, mégawatts, chevaux-vapeur mécaniques (hp) et chevaux métriques (ch).' },
    { id: 'data', name: 'Stockage Numérique', desc: 'Convertissez octets, kilo-octets (Ko), mégaoctets (Mo), gigaoctets (Go), téraoctets (To) et pétaoctets (Po).' },
    { id: 'data_rate', name: 'Débit de Données', desc: 'Convertissez bits par seconde, Mbps, Gbps, mégaoctets par seconde (Mo/s) et gigaoctets par seconde.' },
    { id: 'frequency', name: 'Fréquence', desc: 'Convertissez hertz (Hz), kilohertz (kHz), mégahertz (MHz), gigahertz (GHz) et tr/min.' },
    { id: 'angle', name: 'Angle Plan', desc: 'Convertissez degrés (°), radians (rad), grades, minutes d’arc, secondes d’arc et tours.' },
    { id: 'fuel', name: 'Consommation de Carburant', desc: 'Convertissez miles par gallon (MPG US et UK), kilomètres par litre (km/L) et litres aux 100 km (L/100km).' },
    { id: 'cooking', name: 'Mesures Culinaires', desc: 'Convertissez cuillères à café, cuillères à soupe, tasses, onces liquides, pintes et millilitres.' }
  ],
  presets: [
    { label: '1 Mile en Km', cat: 'length', from: 'mile', to: 'kilometer', val: '1' },
    { label: '1 Pouce en cm', cat: 'length', from: 'inch', to: 'centimeter', val: '1' },
    { label: '1 Kg en Livres', cat: 'mass', from: 'kilogram', to: 'pound', val: '1' },
    { label: '100°C en °F', cat: 'temperature', from: 'celsius', to: 'fahrenheit', val: '100' },
    { label: '1 Acre en Pieds²', cat: 'area', from: 'acre', to: 'sqft', val: '1' },
    { label: '1 Go en Mo', cat: 'data', from: 'gigabyte', to: 'megabyte', val: '1' },
    { label: '100 Mbps en Mo/s', cat: 'data_rate', from: 'mbps', to: 'mb_per_sec', val: '100' },
    { label: '1 Bar en PSI', cat: 'pressure', from: 'bar', to: 'psi', val: '1' },
    { label: '1 kWh en Joules', cat: 'energy', from: 'kilowatt_hour', to: 'joule', val: '1' },
    { label: '1 Tasse en mL', cat: 'cooking', from: 'cooking_cup', to: 'cooking_ml', val: '1' }
  ],
  article: {
    h2Overview: 'Guide Complet des Conversions d’Unités : Systèmes Métrique, Impérial et Scientifique',
    pOverview1: 'Que vous résolviez des équations d’ingénierie, prépariez une recette d’un livre de cuisine étranger, planifiiez un road trip à l’étranger ou gériez du stockage sur le cloud, les conversions d’unités sont indispensables au quotidien. Le monde moderne repose principalement sur deux systèmes majeurs : le Système International d’Unités (SI Métrique), adopté par la quasi-totalité des pays, et le Système Impérial / Coutumier américain, encore largement utilisé aux États-Unis et au Royaume-Uni.',
    pOverview2: 'Ce convertisseur universel gratuit offre des calculs instantanés et fiables sur 16 catégories clés. Chaque conversion est effectuée côté client à l’aide d’une arithmétique en virgule flottante double précision IEEE 754 jusqu’à 8 décimales pour une rigueur scientifique irréprochable.',

    categoriesHeader: 'Analyse Détaillée des 16 Catégories de Conversion',
    categoriesList: [
      {
        title: '1. Longueur et Distance',
        description: 'La longueur mesure la distance unidimensionnelle entre deux repères spatiaux. L’unité de base du SI est le mètre (m). Le système impérial fait usage des pouces, pieds, yards et miles.',
        bulletPoints: [
          '1 Pouce (in) = 2,54 Centimètres (cm) (standard international exact depuis 1959).',
          '1 Pied (ft) = 12 Pouces = 0,3048 Mètre (m).',
          '1 Yard (yd) = 3 Pieds = 0,9144 Mètre.',
          '1 Mile (mi) = 5 280 Pieds = 1 760 Yards = 1,609344 Kilomètre (km).',
          '1 Mille marin (nmi) = 1 852 Mètres = 1,15078 Mile terrestre.'
        ],
        ruleOfThumb: 'Règle de calcul mental rapide : Multipliez les kilomètres par 0,62 pour obtenir les miles (ex. 100 km/h ≈ 62 mph). Divisez les centimètres par 2,54 pour trouver les pouces.'
      },
      {
        title: '2. Superficie et Aire',
        description: 'L’aire quantifie l’espace bidimensionnel contenu dans un périmètre. En génie civil, agronomie et transaction immobilière, l’exactitude prévient les litiges.',
        bulletPoints: [
          '1 Mètre carré (m²) = 10,7639 Pieds carrés (sq ft).',
          '1 Acre = 43 560 Pieds carrés = 4 046,8564 Mètres carrés ≈ 0,4047 Hectare.',
          '1 Hectare (ha) = 10 000 Mètres carrés = 2,47105 Acres.',
          '1 Kilomètre carré (km²) = 100 Hectares = 0,3861 Mile carré.',
          '1 Mile carré (mi²) = 640 Acres = 2,58999 Kilomètres carrés.'
        ]
      },
      {
        title: '3. Volume et Capacité',
        description: 'Le volume mesure l’espace tridimensionnel occupé par un fluide ou un solide. Il est crucial de distinguer le gallon américain du gallon impérial britannique.',
        bulletPoints: [
          '1 Litre (L) = 1 000 Millilitres (mL) = 0,264172 Gallon US = 33,814 Onces liquides US.',
          '1 Gallon liquide US = 3,78541 Litres = 128 Onces liquides US = 4 Quarts = 8 Pintes.',
          '1 Gallon impérial britannique = 4,54609 Litres = 160 Onces liquides UK (~20% plus grand que l’US).',
          '1 Tasse US (cup) = 8 Onces liquides = 236,588 Millilitres.',
          '1 Mètre cube (m³) = 1 000 Litres = 35,3147 Pieds cubes = 264,172 Gallons US.'
        ]
      },
      {
        title: '4. Masse et Poids',
        description: 'La masse quantifie la quantité de matière contenue dans un corps, tandis que le poids correspond à la force gravitationnelle. Dans le commerce courant, les termes sont assimilés.',
        bulletPoints: [
          '1 Kilogramme (kg) = 2,20462 Livres (lbs) = 1 000 Grammes (g).',
          '1 Livre (lb) = 16 Onces (oz) = 453,59237 Grammes = 0,453592 Kilogramme.',
          '1 Tonne métrique (t) = 1 000 Kilogrammes ≈ 2 204,62 Livres.',
          '1 Tonne courte américaine = 2 000 Livres = 907,185 Kilogrammes.',
          '1 Stone (st, UK) = 14 Livres = 6,35029 Kilogrammes.'
        ]
      },
      {
        title: '5. Température',
        description: 'La température mesure l’énergie cinétique moyenne des particules. Comme les échelles possèdent des zéros décalés, la conversion utilise des équations affines.',
        bulletPoints: [
          'Celsius vers Fahrenheit : °F = (°C × 9/5) + 32',
          'Fahrenheit vers Celsius : °C = (°F - 32) × 5/9',
          'Celsius vers Kelvin : K = °C + 273,15',
          'Kelvin vers Celsius : °C = K - 273,15',
          'Fahrenheit vers Rankine : °R = °F + 459,67'
        ]
      },
      {
        title: '6. Temps et Durée',
        description: 'Le temps représente l’enchaînement continu des événements. L’unité fondamentale du SI est la seconde, calibrée sur les transitions atomiques du Césium-133.',
        bulletPoints: [
          '1 Minute = 60 Secondes.',
          '1 Heure = 60 Minutes = 3 600 Secondes.',
          '1 Jour = 24 Heures = 1 440 Minutes = 86 400 Secondes.',
          '1 Semaine = 7 Jours = 168 Heures = 604 800 Secondes.',
          '1 Année civile (calendrier grégorien) = 365 Jours = 8 760 Heures = 31 536 000 Secondes (année bissextile : 366 jours).'
        ]
      },
      {
        title: '7. Vitesse',
        description: 'La vitesse est l’amplitude de la distance parcourue par unité de temps.',
        bulletPoints: [
          '1 Kilomètre par heure (km/h) = 0,621371 Mile par heure (mph) = 0,277778 Mètre par seconde (m/s).',
          '1 Mile par heure (mph) = 1,609344 km/h = 0,44704 m/s = 0,868976 Nœud.',
          '1 Nœud (kn) = 1 Mille marin par heure = 1,852 km/h = 1,15078 mph.',
          'Mach 1 (Vitesse du son au niveau de la mer, 20°C) ≈ 343 m/s ≈ 1 235 km/h ≈ 767,3 mph.'
        ]
      },
      {
        title: '8. Pression',
        description: 'La pression est la force perpendiculaire appliquée par unité de surface. Utilisée en météorologie, plongée et gonflage automobile.',
        bulletPoints: [
          '1 Pascal (Pa) = 1 Newton par mètre carré (N/m²).',
          '1 Bar = 100 000 Pascals (100 kPa) = 14,5038 PSI.',
          '1 Atmosphère normale (atm) = 101 325 Pa = 1,01325 Bar = 14,6959 PSI.',
          '1 PSI (Livre par pouce carré) = 6 894,76 Pascals = 0,0689476 Bar.',
          '1 Torr = 1 mmHg ≈ 133,322 Pascals.'
        ]
      },
      {
        title: '9. Énergie et Travail',
        description: 'L’énergie est la grandeur caractérisant la capacité d’un système à produire un travail mécanique ou thermique.',
        bulletPoints: [
          '1 Joule (J) = 1 Watt-seconde = 1 Newton-mètre.',
          '1 Kilowattheure (kWh) = 3 600 000 Joules (3,6 MJ).',
          '1 Calorie (thermochimique) = 4,184 Joules.',
          '1 Kilocalorie alimentaire (kcal) = 1 000 Petites Calories = 4 184 Joules.',
          '1 British Thermal Unit (BTU) = 1 055,06 Joules = 252,164 Calories.'
        ]
      },
      {
        title: '10. Puissance',
        description: 'La puissance correspond au débit d’énergie consommée ou de travail produit par unité de temps.',
        bulletPoints: [
          '1 Watt (W) = 1 Joule par seconde.',
          '1 Kilowatt (kW) = 1 000 Watts = 1,34102 Cheval-vapeur mécanique (hp).',
          '1 Cheval-vapeur mécanique (hp impérial) = 745,69987 Watts ≈ 0,746 kW.',
          '1 Cheval-vapeur métrique (ch / PS) = 735,49875 Watts ≈ 0,9863 hp impérial.',
          '1 Mégawatt (MW) = 1 000 Kilowatts = 1 000 000 Watts.'
        ]
      },
      {
        title: '11. Stockage Numérique',
        description: 'Mesure de la capacité des mémoires électroniques. Les constructeurs appliquent la base décimale (base 10), alors que les systèmes d’exploitation calculent en base binaire (base 2).',
        bulletPoints: [
          '1 Octet (B) = 8 Bits (b).',
          '1 Kilo-octet (Ko) = 1 024 Octets (binaire) ou 1 000 Octets (décimal).',
          '1 Mégaoctet (Mo) = 1 024 Ko = 1 048 576 Octets.',
          '1 Gigaoctet (Go) = 1 024 Mo = 1 073 741 824 Octets.',
          '1 Téraoctet (To) = 1 024 Go = 1 099 511 627 776 Octets.',
          '1 Pétaoctet (Po) = 1 024 To.'
        ]
      },
      {
        title: '12. Débit de Données (Bande Passante)',
        description: 'Mesure la capacité d’acheminement d’un réseau de télécommunication au cours du temps.',
        bulletPoints: [
          '1 Mégabit par seconde (Mbps) = 1 000 000 bits par seconde (vitesse de connexion Internet).',
          '1 Mégaoctet par seconde (Mo/s) = 8 Mégabits par seconde (vitesse de téléchargement de fichiers).',
          '1 Gigabit par seconde (Gbps) = 1 000 Mbps = 125 Mo/s.',
          'Une connexion de 100 Mbps permet de télécharger au maximum 12,5 Mo/s en conditions idéales.'
        ]
      },
      {
        title: '13. Fréquence',
        description: 'Nombre d’occurrences d’un phénomène périodique par unité de temps.',
        bulletPoints: [
          '1 Hertz (Hz) = 1 cycle par seconde.',
          '1 Kilohertz (kHz) = 1 000 Hz.',
          '1 Mégahertz (MHz) = 1 000 000 Hz (ondes radio et processeurs).',
          '1 Gigahertz (GHz) = 1 000 000 000 Hz (fréquences processeurs modernes et Wi-Fi 5 GHz).',
          '1 tr/min (Tour par minute) = 1/60 Hz ≈ 0,016667 Hz.'
        ]
      },
      {
        title: '14. Angle Plan',
        description: 'L’angle mesure l’inclinaison circulaire entre deux demi-droites sécantes.',
        bulletPoints: [
          'Cercle complet = 360 Degrés (°) = 2π Radians (≈ 6,283185 rad) = 400 Grades.',
          '1 Radian = 180 / π ≈ 57,2958 Degrés.',
          '1 Degré = π / 180 ≈ 0,0174533 Radian.',
          '1 Degré = 60 Minutes d’arc (′) = 3 600 Secondes d’arc (″).'
        ]
      },
      {
        title: '15. Consommation et Économie de Carburant',
        description: 'Mesure la distance parcourue par volume de carburant, ou le volume nécessaire pour parcourir une distance donnée.',
        bulletPoints: [
          'Miles par Gallon (MPG US) en Kilomètres par Litre : km/L = MPG × 0,425144.',
          'MPG US en L/100km : L/100km = 235,215 / MPG US (relation inverse).',
          'Kilomètres par Litre (km/L) en L/100km : L/100km = 100 / (km/L).',
          '1 MPG impérial britannique ≈ 1,20095 MPG US.'
        ]
      },
      {
        title: '16. Mesures Culinaires et Pâtisserie',
        description: 'La pâtisserie exige une rigueur volumétrique pour adapter les recettes internationales entre cuillères, tasses et millilitres.',
        bulletPoints: [
          '1 Cuillère à soupe US (tbsp) = 3 Cuillères à café (tsp) = 0,5 Once liquide ≈ 14,787 mL.',
          '1 Tasse US (cup) = 16 Cuillères à soupe = 48 Cuillères à café = 8 Onces liquides ≈ 236,588 mL.',
          '1 Tasse métrique (recettes européennes et australiennes) = 250 mL.',
          '1 Pinte US = 2 Tasses = 16 Onces liquides ≈ 473,176 mL.'
        ]
      }
    ],

    comparisonHeader: 'Métrique vs Impérial : Différences Fondamentales et Pratiques',
    comparisonText: 'Le Système Métrique International (SI) repose sur une logique décimale harmonieuse : chaque échelon est une puissance de dix identifiée par un préfixe clair (kilo-, centi-, milli-, micro-). À l’inverse, le système impérial anglo-saxon découle d’anciens usages corporatifs et agraires :',
    comparisonPoints: [
      'Simplicité décimale : En métrique, 1 kilomètre vaut 1 000 mètres et 1 mètre vaut 100 centimètres. En impérial, 1 mile vaut 5 280 pieds et 1 pied vaut 12 pouces.',
      'Homogénéité scientifique : La recherche mondiale, le spatial, le secteur pharmaceutique et l’aéronautique s’appuient universellement sur le système métrique SI.',
      'Persistance d’usage : Les mesures coutumières restent enracinées aux États-Unis pour le bois de charpente, la pression des pneumatiques (PSI), la vitesse routière (mph) et l’immobilier en acres.'
    ],

    formulasHeader: 'Formules Mathématiques et Repères Thermiques',
    formulasIntro: 'Tandis que les grandeurs linéaires se convertissent par simple coefficient multiplicateur, les températures suivent des fonctions affines avec origines décalées. Voici les repères physiques fondamentaux :',
    benchmarksTitle: 'Points de Repère Thermiques Majeurs',
    benchmarksHeaders: {
      condition: 'Phénomène Physique',
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      kelvin: 'Kelvin (K)'
    },
    benchmarksRows: [
      { condition: 'Zéro Absolu (Arrêt de toute agitation moléculaire)', celsius: '-273,15 °C', fahrenheit: '-459,67 °F', kelvin: '0,00 K' },
      { condition: 'Point de Congélation de l’Eau Pure (1 atm)', celsius: '0,00 °C', fahrenheit: '32,00 °F', kelvin: '273,15 K' },
      { condition: 'Température Ambiante Standard', celsius: '20,00 à 22,00 °C', fahrenheit: '68,00 à 71,60 °F', kelvin: '293,15 à 295,15 K' },
      { condition: 'Température Moyenne du Corps Humain', celsius: '37,00 °C', fahrenheit: '98,60 °F', kelvin: '310,15 K' },
      { condition: 'Point d’Ébullition de l’Eau Pure (1 atm)', celsius: '100,00 °C', fahrenheit: '212,00 °F', kelvin: '373,15 K' }
    ],

    useCasesHeader: 'Applications Concrètes au Quotidien',
    useCasesList: [
      {
        title: 'Voyages Internationaux et Conduite',
        description: 'La location de véhicule à l’étranger requiert une conversion instantanée entre km/h et mph, ainsi que pour la pression des pneus (bar vs psi) et le carburant (litres vs gallons).'
      },
      {
        title: 'Gastronomie et Pâtisserie',
        description: 'La pâtisserie repose sur des réactions chimiques sensibles. Confondre les onces liquides américaines et impériales modifie l’hydratation des pâtes.'
      },
      {
        title: 'Ingénierie et Plans d’Architecture',
        description: 'Les bureaux d’études transposent régulièrement des cotes architecturales entre millimètres métriques et pieds/pouces sans risquer d’erreurs dimensionnelles.'
      },
      {
        title: 'Infrastructures Informatiques et Cloud',
        description: 'Comprendre l’écart entre la taille commerciale des disques (gigaoctets décimaux) et l’allocation système (gibioctets binaires) fiabilise le dimensionnement des serveurs.'
      }
    ],

    limitationsHeader: 'Hypothèses Techniques et Limites de Précision',
    limitationsList: [
      'Les calculs s’exécutent dans votre navigateur via des nombres en virgule flottante 64 bits IEEE 754. L’affichage est arrondi jusqu’à 8 décimales pour neutraliser les artéfacts binaires.',
      'Les équivalences culinaires supposent une masse volumique égale à l’eau (1 g/mL). Pour les poudres comme la farine ou le sucre, l’usage d’une balance de cuisine est recommandé.',
      'Les références de pression et de température sont données au niveau moyen de la mer sous 101 325 Pa (1 atmosphère).'
    ]
  },
  faqs: [
    {
      question: '1. Quelle est la précision de ce convertisseur d’unités en ligne ?',
      answer: 'Tous les ratios de conversion sont conformes aux référentiels internationaux les plus stricts (NIST et ISO). Les calculs s’effectuent en local sur votre appareil via l’arithmétique 64 bits IEEE 754, garantissant une précision jusqu’à 8 décimales sans temps de chargement serveur.'
    },
    {
      question: '2. Quelle est la différence fondamentale entre les systèmes Métrique et Impérial ?',
      answer: 'Le système métrique est décimal (fondé sur les puissances de 10), rendant le passage entre millimètres, centimètres, mètres et kilomètres intuitif. Le système impérial découle de coutumes médiévales avec des ratios variables (12 pouces par pied, 3 pieds par yard, 16 onces par livre, 5 280 pieds par mile).'
    },
    {
      question: '3. Pourquoi le gallon liquide américain est-il différent du gallon impérial britannique ?',
      answer: 'Le gallon liquide américain est défini comme 231 pouces cubes (~3,7854 litres). Le gallon impérial britannique a été fixé en 1824 comme le volume de 10 livres d’eau distillée à 62°F (~4,5461 litres). Par conséquent, le gallon britannique est environ 20,09% plus grand que le gallon américain.'
    },
    {
      question: '4. Comment convertir les températures entre Celsius, Fahrenheit et Kelvin ?',
      answer: 'De Celsius à Fahrenheit : multipliez par 1,8 et ajoutez 32 [°F = (°C × 1,8) + 32]. De Fahrenheit à Celsius : soustrayez 32 et divisez par 1,8 [°C = (°F - 32) ÷ 1,8]. De Celsius à Kelvin : ajoutez 273,15 [K = °C + 273,15]. Les échelles Celsius et Fahrenheit se croisent à exactement -40° (-40°C = -40°F).'
    },
    {
      question: '5. Combien de pieds carrés y a-t-il dans un acre et dans un hectare ?',
      answer: 'Un acre équivaut exactement à 43 560 pieds carrés (environ 4 046,86 mètres carrés). Un hectare compte 10 000 mètres carrés, ce qui correspond à environ 107 639 pieds carrés ou 2,47105 acres.'
    },
    {
      question: '6. Pourquoi mon disque dur de 1 To n’affiche-t-il que 931 Go sous Windows ?',
      answer: 'Les constructeurs de supports de stockage utilisent le gigaoctet décimal (1 To = 1 000 000 000 000 octets). Windows emploie le gibioctet binaire (1 Gio = 1 073 741 824 octets). En divisant 1 000 000 000 000 par 1 073 741 824, on obtient environ 931,32 Gio, que Windows abrège sous la mention "Go".'
    },
    {
      question: '7. Quelle est la différence entre mégabits par seconde (Mbps) et mégaoctets par seconde (Mo/s) ?',
      answer: 'Le Mbps (avec "b" minuscule pour bit) exprime la bande passante d’un réseau de télécommunication. Le Mo/s (avec "o" ou "B" pour octet/byte) mesure le volume de transfert de fichiers. Comme un octet compte 8 bits, divisez le débit en Mbps par 8 pour connaître la vitesse de téléchargement en Mo/s (ex. 100 Mbps ÷ 8 = 12,5 Mo/s).'
    },
    {
      question: '8. Comment fonctionne la conversion de consommation entre MPG et L/100km ?',
      answer: 'La relation entre MPG US et L/100km est réciproque (inverse) : une valeur MPG élevée traduit une faible consommation, alors qu’une valeur L/100km faible traduit une meilleure sobriété. La formule est : L/100km = 235,215 ÷ MPG US. Par exemple, 30 MPG donne 235,215 ÷ 30 ≈ 7,84 L/100km.'
    },
    {
      question: '9. Combien de cuillères à café contient une cuillère à soupe et une tasse de cuisine ?',
      answer: 'En cuisine américaine, 1 cuillère à soupe (tbsp) contient exactement 3 cuillères à café (tsp) (~14,79 mL). Une tasse US contient 16 cuillères à soupe ou 48 cuillères à café (~236,59 mL). En standard métrique international, une tasse rase est arrondie à 250 mL.'
    },
    {
      question: '10. Quelle est la nuance entre masse et poids sur le plan scientifique et dans la vie courante ?',
      answer: 'Scientifiquement, la masse (en kg) est une grandeur intrinsèque qui caractérise la quantité de matière d’un objet, invariable où que l’on soit. Le poids (en Newtons) est la force de pesanteur exercée sur cette masse (P = m × g). Dans la vie commerciale quotidienne sur Terre, les deux termes sont couramment assimilés.'
    },
    {
      question: '11. Comment se compare la pression atmosphérique entre bar, psi et atmosphères ?',
      answer: 'La pression atmosphérique normale au niveau de la mer (1 atm) équivaut à 101 325 Pascals, 1,01325 Bar ou 14,6959 PSI. Un bar (100 000 Pa) correspond à environ 14,5038 PSI. Les manomètres de pneus de voiture expriment généralement la pression relative en PSI ou en bar.'
    },
    {
      question: '12. Pourquoi mesure-t-on les angles à la fois en degrés et en radians ?',
      answer: 'Le degré (360° pour un cercle complet) provient des premières observations astronomiques babyloniennes. Le radian est l’unité scientifique naturelle du SI, définie par la longueur d’arc égale au rayon du cercle (2π rad = 360°), indispensable en analyse mathématique et calcul trigonométrique.'
    },
    {
      question: '13. Ce convertisseur nécessite-t-il une connexion Internet ou transmet-il des données ?',
      answer: 'Non. Ce convertisseur fonctionne à 100% en local dans votre navigateur web à l’aide de JavaScript. Aucune des données numériques saisies n’est transmise sur un réseau ni enregistrée sur un serveur distant.'
    },
    {
      question: '14. Est-il possible de convertir simultanément vers plusieurs unités ?',
      answer: 'Oui. Dès que vous saisissez une valeur, le tableau "Équivalences dans d’Autres Unités" calcule et affiche en temps réel les équivalences exactes dans l’ensemble des unités de la catégorie sélectionnée.'
    }
  ]
};
