import type { UnitConverterContent } from './types';

export const esContent: UnitConverterContent = {
  meta: {
    title: 'Conversor de Unidades – Calculadora Gratuita Métrico e Imperial',
    description: 'Mega conversor de unidades online gratuito. Convierte al instante longitud, peso, temperatura, área, volumen, velocidad, tiempo, presión, energía, potencia, datos y cocina con fórmulas precisas.',
    keywords: [
      'conversor de unidades',
      'conversor metrico imperial',
      'convertir longitud',
      'convertir peso',
      'convertir temperatura',
      'celsius a fahrenheit',
      'kg a libras',
      'pulgadas a centimetros',
      'millas a kilometros',
      'conversor de area',
      'conversor de volumen'
    ],
    h1: 'Conversor de Unidades Online',
    intro: 'Convierte instantáneamente entre unidades métricas, imperiales y del estándar internacional en 16 categorías científicas y cotidianas. Rápido, 100% en el cliente y con precisión de hasta 8 decimales.'
  },
  ui: {
    quickConversionsTitle: '⚡ Conversiones Rápidas:',
    fromLabel: 'Valor de Origen',
    toLabel: 'Resultado Convertido',
    swapButton: 'Intercambiar Unidades',
    copyButton: 'Copiar Resultado',
    copied: '¡Copiado! ✓',
    formulaLabel: 'Fórmula',
    convertedValueHeader: 'Valor Convertido',
    precisionLabel: 'Precisión',
    precisionValue: 'Hasta 8 decimales',
    standardUnitLabel: 'Unidad Estándar',
    equivalentHeader: '📋 Equivalente en Otras Unidades',
    enterValuePlaceholder: 'Introduce un valor para convertir...',
    resultPlaceholder: 'El resultado aparecerá aquí...',
    indianLandBannerText: '¿Buscas unidades de terreno de la India (Bigha, Gaj, Biswa, Guntha, Acre)? Prueba nuestro conversor dedicado →',
    indianLandBannerBtn: 'Abrir Conversor',
    emptyHeroSub: 'Selecciona las unidades e introduce un valor arriba para calcular la conversión instantánea.'
  },
  categories: [
    { id: 'length', name: 'Longitud', desc: 'Convierte metros, kilómetros, millas, yardas, pies, pulgadas y millas náuticas.' },
    { id: 'area', name: 'Área y Superficie', desc: 'Convierte metros cuadrados, pies cuadrados, acres, hectáreas, kilómetros cuadrados y millas cuadradas.' },
    { id: 'volume', name: 'Volumen y Capacidad', desc: 'Convierte litros, mililitros, galones estadounidenses, galones británicos, tazas, cuartos y metros cúbicos.' },
    { id: 'mass', name: 'Masa y Peso', desc: 'Convierte kilogramos, gramos, miligramos, libras (lbs), onzas (oz), stones y toneladas métricas.' },
    { id: 'temperature', name: 'Temperatura', desc: 'Convierte temperatura entre Celsius (°C), Fahrenheit (°F), Kelvin (K) y Rankine (°R).' },
    { id: 'time', name: 'Tiempo', desc: 'Convierte segundos, minutos, horas, días, semanas, meses y años.' },
    { id: 'speed', name: 'Velocidad', desc: 'Convierte kilómetros por hora, millas por hora, metros por segundo, nudos y mach.' },
    { id: 'pressure', name: 'Presión', desc: 'Convierte pascales, bares, PSI, atmósferas, milibares y torr.' },
    { id: 'energy', name: 'Energía y Trabajo', desc: 'Convierte julios, kilojulios, calorías, kilocalorías, kilovatios-hora (kWh) y BTU.' },
    { id: 'power', name: 'Potencia', desc: 'Convierte vatios, kilovatios, megavatios, caballos de fuerza mecánicos (hp) y caballos de vapor métricos (CV).' },
    { id: 'data', name: 'Almacenamiento Digital', desc: 'Convierte bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB) y petabytes (PB).' },
    { id: 'data_rate', name: 'Velocidad de Transferencia', desc: 'Convierte bits por segundo, Mbps, Gbps, megabytes por segundo (MB/s) y gigabytes por segundo.' },
    { id: 'frequency', name: 'Frecuencia', desc: 'Convierte hercios (Hz), kilohercios (kHz), megahercios (MHz), gigahercios (GHz) y RPM.' },
    { id: 'angle', name: 'Ángulo', desc: 'Convierte grados (°), radianes (rad), gradianes, minutos de arco, segundos de arco y revoluciones.' },
    { id: 'fuel', name: 'Consumo de Combustible', desc: 'Convierte millas por galón (MPG EE.UU. y Reino Unido), kilómetros por litro (km/L) y litros por 100 km (L/100km).' },
    { id: 'cooking', name: 'Volumen de Cocina', desc: 'Convierte cucharaditas, cucharadas, tazas, onzas líquidas, pintas y mililitros para recetas culinarias.' }
  ],
  presets: [
    { label: '1 Milla a Km', cat: 'length', from: 'mile', to: 'kilometer', val: '1' },
    { label: '1 Pulgada a cm', cat: 'length', from: 'inch', to: 'centimeter', val: '1' },
    { label: '1 Kg a Libras', cat: 'mass', from: 'kilogram', to: 'pound', val: '1' },
    { label: '100°C a °F', cat: 'temperature', from: 'celsius', to: 'fahrenheit', val: '100' },
    { label: '1 Acre a Pies²', cat: 'area', from: 'acre', to: 'sqft', val: '1' },
    { label: '1 GB a MB', cat: 'data', from: 'gigabyte', to: 'megabyte', val: '1' },
    { label: '100 Mbps a MB/s', cat: 'data_rate', from: 'mbps', to: 'mb_per_sec', val: '100' },
    { label: '1 Bar a PSI', cat: 'pressure', from: 'bar', to: 'psi', val: '1' },
    { label: '1 kWh a Julios', cat: 'energy', from: 'kilowatt_hour', to: 'joule', val: '1' },
    { label: '1 Taza a mL', cat: 'cooking', from: 'cooking_cup', to: 'cooking_ml', val: '1' }
  ],
  article: {
    h2Overview: 'Guía Exhaustiva de Conversión de Unidades: Sistemas Métrico, Imperial y Científico',
    pOverview1: 'Ya sea que estés resolviendo cálculos de ingeniería, preparando una receta de un libro de cocina internacional, planificando un viaje por carretera en el extranjero o administrando almacenamiento en la nube, las conversiones de unidades son indispensables en la vida diaria. El mundo moderno se apoya en dos grandes marcos de medición: el Sistema Internacional de Unidades (SI Métrico), adoptado por casi todos los países, y el Sistema Anglosajón / Imperial, utilizado predominantemente en Estados Unidos y el Reino Unido.',
    pOverview2: 'Este Mega Conversor de Unidades gratuito proporciona conversiones precisas en tiempo real a través de 16 categorías fundamentales. Cada conversión se calcula en el lado del cliente utilizando aritmética de punto flotante de doble precisión IEEE 754 con hasta 8 decimales para una máxima exactitud científica.',

    categoriesHeader: 'Análisis Detallado de las 16 Categorías de Conversión',
    categoriesList: [
      {
        title: '1. Longitud y Distancia',
        description: 'La longitud mide la distancia unidimensional entre dos puntos espaciales. La unidad base del SI es el metro (m). El sistema imperial emplea pulgadas, pies, yardas y millas terrestres.',
        bulletPoints: [
          '1 Pulgada (in) = 2.54 Centímetros (cm) (estándar internacional exacto desde 1959).',
          '1 Pie (ft) = 12 Pulgadas = 0.3048 Metros (m).',
          '1 Yarda (yd) = 3 Pies = 0.9144 Metros.',
          '1 Milla (mi) = 5,280 Pies = 1,760 Yardas = 1.609344 Kilómetros (km).',
          '1 Milla Náutica (nmi) = 1,852 Metros = 1.15078 Millas terrestres.'
        ],
        ruleOfThumb: 'Cálculo mental rápido: multiplica los kilómetros por 0.62 para estimar millas (p. ej., 100 km/h ≈ 62 mph). Divide los centímetros entre 2.54 para obtener pulgadas.'
      },
      {
        title: '2. Área y Superficie',
        description: 'El área cuantifica el espacio bidimensional dentro de un perímetro. En ingeniería civil, agronomía e inmobiliaria, la precisión evita errores costosos.',
        bulletPoints: [
          '1 Metro Cuadrado (m²) = 10.7639 Pies Cuadrados (sq ft).',
          '1 Acre = 43,560 Pies Cuadrados = 4,046.8564 Metros Cuadrados ≈ 0.4047 Hectáreas.',
          '1 Hectárea (ha) = 10,000 Metros Cuadrados = 2.47105 Acres.',
          '1 Kilómetro Cuadrado (km²) = 100 Hectáreas = 0.3861 Millas Cuadradas.',
          '1 Milla Cuadrada (mi²) = 640 Acres = 2.58999 Kilómetros Cuadrados.'
        ]
      },
      {
        title: '3. Volumen y Capacidad',
        description: 'El volumen mide el espacio tridimensional ocupado por líquidos, gases o sólidos. Ten en cuenta que las unidades de volumen de EE.UU. difieren de las del Reino Unido.',
        bulletPoints: [
          '1 Litro (L) = 1,000 Mililitros (mL) = 0.264172 Galones de EE.UU. = 33.814 Onzas Líquidas de EE.UU.',
          '1 Galón de EE.UU. = 3.78541 Litros = 128 Onzas Líquidas = 4 Cuartos = 8 Pintas.',
          '1 Galón Imperial Británico = 4.54609 Litros = 160 Onzas Líquidas británicas (~20% mayor que el de EE.UU.).',
          '1 Taza de EE.UU. = 8 Onzas Líquidas = 236.588 Mililitros.',
          '1 Metro Cúbico (m³) = 1,000 Litros = 35.3147 Pies Cúbicos = 264.172 Galones de EE.UU.'
        ]
      },
      {
        title: '4. Masa y Peso',
        description: 'La masa representa la cantidad de materia en un cuerpo, mientras que el peso refleja la fuerza gravitatoria. En el comercio terrestre estándar se emplean de forma intercambiable.',
        bulletPoints: [
          '1 Kilogramo (kg) = 2.20462 Libras (lbs) = 1,000 Gramos (g).',
          '1 Libra (lb) = 16 Onzas (oz) = 453.59237 Gramos = 0.453592 Kilogramos.',
          '1 Tonelada Métrica (t) = 1,000 Kilogramos ≈ 2,204.62 Libras.',
          '1 Tonelada Corta (EE.UU.) = 2,000 Libras = 907.185 Kilogramos.',
          '1 Stone (st, Reino Unido) = 14 Libras = 6.35029 Kilogramos.'
        ]
      },
      {
        title: '5. Temperatura',
        description: 'La temperatura mide la energía cinética molecular media. Al tener distintos ceros absolutos y relativos, requiere ecuaciones afines y no simples multiplicaciones.',
        bulletPoints: [
          'Celsius a Fahrenheit: °F = (°C × 9/5) + 32',
          'Fahrenheit a Celsius: °C = (°F - 32) × 5/9',
          'Celsius a Kelvin: K = °C + 273.15',
          'Kelvin a Celsius: °C = K - 273.15',
          'Fahrenheit a Rankine: °R = °F + 459.67'
        ]
      },
      {
        title: '6. Tiempo',
        description: 'El tiempo es la secuencia continua de la existencia. La unidad base del SI es el segundo, definido por transiciones atómicas del Cesio-133.',
        bulletPoints: [
          '1 Minuto = 60 Segundos.',
          '1 Hora = 60 Minutos = 3,600 Segundos.',
          '1 Día = 24 Horas = 1,440 Minutos = 86,400 Segundos.',
          '1 Semana = 7 Días = 168 Horas = 604,800 Segundos.',
          '1 Año Calendario (Gregoriano) = 365 Días = 8,760 Horas = 31,536,000 Segundos (año bisiesto: 366 días).'
        ]
      },
      {
        title: '7. Velocidad',
        description: 'La velocidad mide la distancia recorrida por unidad de tiempo transcurrido.',
        bulletPoints: [
          '1 Kilómetro por Hora (km/h) = 0.621371 Millas por Hora (mph) = 0.277778 Metros por Segundo (m/s).',
          '1 Milla por Hora (mph) = 1.609344 km/h = 0.44704 m/s = 0.868976 Nudos.',
          '1 Nudo (kn) = 1 Milla Náutica por Hora = 1.852 km/h = 1.15078 mph.',
          'Mach 1 (Velocidad del sonido a nivel del mar, 20°C) ≈ 343 m/s ≈ 1,235 km/h ≈ 767.3 mph.'
        ]
      },
      {
        title: '8. Presión',
        description: 'La presión es la fuerza perpendicular aplicada sobre una superficie por unidad de área. Se utiliza en meteorología, hidráulica y neumáticos de automóviles.',
        bulletPoints: [
          '1 Pascal (Pa) = 1 Newton por metro cuadrado (N/m²).',
          '1 Bar = 100,000 Pascales (100 kPa) = 14.5038 PSI.',
          '1 Atmósfera Estándar (atm) = 101,325 Pa = 1.01325 Bar = 14.6959 PSI.',
          '1 PSI (Libra por pulgada cuadrada) = 6,894.76 Pascales = 0.0689476 Bar.',
          '1 Torr = 1 mmHg ≈ 133.322 Pascales.'
        ]
      },
      {
        title: '9. Energía y Trabajo',
        description: 'La energía es la capacidad de realizar un trabajo físico o suministrar calor.',
        bulletPoints: [
          '1 Julio (J) = 1 Vatio-segundo = 1 Newton-metro.',
          '1 Kilovatio-hora (kWh) = 3,600,000 Julios (3.6 MJ).',
          '1 Caloría (termoquímica) = 4.184 Julios.',
          '1 Kilocaloría dietética (kcal, caloría de alimentos) = 1,000 Calorías = 4,184 Julios.',
          '1 Unidad Térmica Británica (BTU) = 1,055.06 Julios = 252.164 Calorías.'
        ]
      },
      {
        title: '10. Potencia',
        description: 'La potencia es la tasa a la que se efectúa un trabajo o se transforma energía por unidad de tiempo.',
        bulletPoints: [
          '1 Vatio (W) = 1 Julio por segundo.',
          '1 Kilovatio (kW) = 1,000 Vatios = 1.34102 Caballos de fuerza mecánicos (hp).',
          '1 Caballo de fuerza mecánico (Imperial hp) = 745.69987 Vatios ≈ 0.746 kW.',
          '1 Caballo de vapor métrico (CV / PS) = 735.49875 Vatios ≈ 0.9863 hp imperial.',
          '1 Megavatio (MW) = 1,000 Kilovatios = 1,000,000 Vatios.'
        ]
      },
      {
        title: '11. Almacenamiento Digital',
        description: 'El almacenamiento digital mide la capacidad de datos electrónicos. Los fabricantes usan el sistema decimal (base 10), mientras que los sistemas operativos emplean el binario (base 2).',
        bulletPoints: [
          '1 Byte (B) = 8 Bits (b).',
          '1 Kilobyte (KB) = 1,024 Bytes (binario) o 1,000 Bytes (decimal).',
          '1 Megabyte (MB) = 1,024 KB = 1,048,576 Bytes.',
          '1 Gigabyte (GB) = 1,024 MB = 1,073,741,824 Bytes.',
          '1 Terabyte (TB) = 1,024 GB = 1,099,511,627,776 Bytes.',
          '1 Petabyte (PB) = 1,024 TB.'
        ]
      },
      {
        title: '12. Velocidad de Transferencia de Datos',
        description: 'Mide el ancho de banda o tasa de transmisión a través de un canal de comunicación de red.',
        bulletPoints: [
          '1 Megabit por segundo (Mbps) = 1,000,000 bits por segundo (velocidad de red).',
          '1 Megabyte por segundo (MB/s) = 8 Megabits por segundo (velocidad de descarga de archivos).',
          '1 Gigabit por segundo (Gbps) = 1,000 Mbps = 125 MB/s.',
          'Una conexión de 100 Mbps descarga como máximo teórico 12.5 MB/s en condiciones óptimas.'
        ]
      },
      {
        title: '13. Frecuencia',
        description: 'La frecuencia es el número de repeticiones de un fenómeno periódico por unidad de tiempo.',
        bulletPoints: [
          '1 Hercio (Hz) = 1 ciclo por segundo.',
          '1 Kilohercio (kHz) = 1,000 Hz.',
          '1 Megahercio (MHz) = 1,000,000 Hz (frecuencias de radio y procesadores).',
          '1 Gigahercio (GHz) = 1,000,000,000 Hz (procesadores modernos y Wi-Fi de 5 GHz).',
          '1 RPM (Revoluciones por minuto) = 1/60 Hz ≈ 0.016667 Hz.'
        ]
      },
      {
        title: '14. Ángulo Plano',
        description: 'Un ángulo mide la apertura circular entre dos líneas o rayos que se intersecan.',
        bulletPoints: [
          'Círculo completo = 360 Grados (°) = 2π Radianes (≈ 6.283185 rad) = 400 Gradianes.',
          '1 Radian = 180 / π ≈ 57.2958 Grados.',
          '1 Grado = π / 180 ≈ 0.0174533 Radianes.',
          '1 Grado = 60 Minutos de arco (′) = 3,600 Segundos de arco (″).'
        ]
      },
      {
        title: '15. Consumo y Economía de Combustible',
        description: 'Calcula la distancia recorrida por volumen de combustible consumido, o el volumen necesario para recorrer una distancia.',
        bulletPoints: [
          'Millas por Galón (MPG EE.UU.) a Kilómetros por Litro: km/L = MPG × 0.425144.',
          'MPG EE.UU. a L/100km: L/100km = 235.215 / MPG EE.UU. (relación recíproca).',
          'Kilómetros por Litro (km/L) a L/100km: L/100km = 100 / (km/L).',
          '1 MPG Imperial del Reino Unido ≈ 1.20095 MPG de EE.UU.'
        ]
      },
      {
        title: '16. Volumen Culinario y de Cocina',
        description: 'La repostería y la gastronomía requieren conversiones volumétricas exactas entre cucharas, tazas y mililitros métricos.',
        bulletPoints: [
          '1 Cucharada de EE.UU. (tbsp) = 3 Cucharaditas (tsp) = 0.5 Onzas Líquidas ≈ 14.787 mL.',
          '1 Taza de EE.UU. = 16 Cucharadas = 48 Cucharaditas = 8 Onzas Líquidas ≈ 236.588 mL.',
          '1 Taza Métrica (recetas de Australia, Reino Unido y Europa) = 250 mL.',
          '1 Pinta de EE.UU. = 2 Tazas = 16 Onzas Líquidas ≈ 473.176 mL.'
        ]
      }
    ],

    comparisonHeader: 'Métrico vs. Imperial: Diferencias Conceptuales y Prácticas Clave',
    comparisonText: 'El Sistema Métrico Internacional (SI) se fundamenta en la coherencia decimal: cada unidad escala en potencias de diez mediante prefijos estandarizados (kilo-, centi-, mili-, micro-). En contraste, los sistemas imperial y anglosajón se desarrollaron orgánicamente a partir de tradiciones comerciales e históricas:',
    comparisonPoints: [
      'Conveniencia Decimal: En el sistema métrico, 1 kilómetro equivale a 1,000 metros y 1 metro a 100 centímetros. En el imperial, 1 milla son 5,280 pies y 1 pie son 12 pulgadas.',
      'Unificación Científica: Prácticamente toda la investigación científica, aeronáutica, dosificación médica y fabricación farmacéutica a nivel mundial utiliza exclusivamente el sistema métrico SI.',
      'Persistencia Cultural: Las medidas imperiales siguen profundamente arraigadas en la construcción estadounidense, presión de neumáticos (PSI), límites de velocidad (mph) y transacciones inmobiliarias en acres.'
    ],

    formulasHeader: 'Fórmulas Matemáticas y Referencias Térmicas',
    formulasIntro: 'Mientras que las conversiones lineales emplean un factor multiplicativo directo (Resultado = Entrada × Factor), la temperatura utiliza escalas afines con orígenes desplazados. La siguiente tabla resume las referencias físicas clave:',
    benchmarksTitle: 'Referencias Físicas Fundamentales de Temperatura',
    benchmarksHeaders: {
      condition: 'Fenómeno Físico',
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      kelvin: 'Kelvin (K)'
    },
    benchmarksRows: [
      { condition: 'Cero Absoluto (Cese de movimiento molecular)', celsius: '-273.15 °C', fahrenheit: '-459.67 °F', kelvin: '0.00 K' },
      { condition: 'Punto de Congelación del Agua Pura (1 atm)', celsius: '0.00 °C', fahrenheit: '32.00 °F', kelvin: '273.15 K' },
      { condition: 'Temperatura Ambiente Estándar', celsius: '20.00 a 22.00 °C', fahrenheit: '68.00 a 71.60 °F', kelvin: '293.15 a 295.15 K' },
      { condition: 'Temperatura Promedio del Cuerpo Humano', celsius: '37.00 °C', fahrenheit: '98.60 °F', kelvin: '310.15 K' },
      { condition: 'Punto de Ebullición del Agua Pura (1 atm)', celsius: '100.00 °C', fahrenheit: '212.00 °F', kelvin: '373.15 K' }
    ],

    useCasesHeader: 'Casos Reales de Uso de Conversión',
    useCasesList: [
      {
        title: 'Viajes Internacionales y Conducción',
        description: 'Alquilar un coche en el extranjero requiere conversiones mentales inmediatas entre km/h y mph, así como entender presiones de neumáticos (bar vs psi) y combustible (litros vs galones).'
      },
      {
        title: 'Gastronomía y Repostería Internacional',
        description: 'La repostería es una ciencia exacta. Confundir onzas líquidas americanas con británicas o de peso seco altera la consistencia y la fermentación de las masas.'
      },
      {
        title: 'Proyectos de Ingeniería y Arquitectura',
        description: 'Ingenieros mecánicos y civiles adaptan planos continuamente entre milímetros métricos y pies/pulgadas sin arriesgar tolerancias estructurales.'
      },
      {
        title: 'Infraestructura Tecnológica y Almacenamiento',
        description: 'Conocer la diferencia entre la capacidad declarada por fabricantes (gigabytes decimales) y la del sistema operativo (gibibytes binarios) previene errores de aprovisionamiento en servidores.'
      }
    ],

    limitationsHeader: 'Supuestos Técnicos y Límites de Precisión',
    limitationsList: [
      'Los cálculos se ejecutan en el navegador utilizando números de punto flotante de 64 bits IEEE 754. Se muestra un redondeo de hasta 8 decimales para evitar artefactos binarios recurrentes.',
      'Las conversiones culinarias asumen densidades estándar de líquidos (aprox. 1 g/mL para agua). Los ingredientes secos como harina o azúcar tienen densidades variables y es mejor pesarlos con balanza.',
      'Los puntos de ebullición y presión atmosférica corresponden a condiciones estándar al nivel del mar de 101,325 Pa (1 atmósfera).'
    ]
  },
  faqs: [
    {
      question: '1. ¿Qué tan preciso es este conversor de unidades online?',
      answer: 'Todas las proporciones de conversión se basan en los estándares internacionales más recientes de NIST e ISO. Los cálculos se efectúan localmente en tu dispositivo mediante aritmética de 64 bits IEEE 754, garantizando una precisión de hasta 8 decimales sin latencia de servidor.'
    },
    {
      question: '2. ¿Cuál es la diferencia fundamental entre el Sistema Métrico y el Imperial?',
      answer: 'El sistema métrico es decimal (potencias de 10), facilitando el paso entre milímetros, centímetros, metros y kilómetros. El sistema imperial tiene raíces históricas anglosajonas con factores no decimales arbitrarios (12 pulgadas en un pie, 3 pies en una yarda, 16 onzas en una libra, 5,280 pies en una milla).'
    },
    {
      question: '3. ¿Por qué el galón estadounidense es diferente al galón imperial británico?',
      answer: 'El galón líquido de EE.UU. se define como 231 pulgadas cúbicas (~3.7854 litros). El galón imperial británico se fijó en 1824 como el volumen de 10 libras de agua a 62°F (~4.5461 litros). Por ello, el galón británico es aproximadamente un 20.09% más grande que el estadounidense.'
    },
    {
      question: '4. ¿Cómo convierto temperaturas entre Celsius, Fahrenheit y Kelvin?',
      answer: 'De Celsius a Fahrenheit: multiplica por 1.8 y suma 32 [°F = (°C × 1.8) + 32]. De Fahrenheit a Celsius: resta 32 y divide entre 1.8 [°C = (°F - 32) ÷ 1.8]. De Celsius a Kelvin: suma 273.15 [K = °C + 273.15]. Ambas escalas coinciden exactamente en -40° (-40°C = -40°F).'
    },
    {
      question: '5. ¿Cuántos pies cuadrados hay en un acre y en una hectárea?',
      answer: 'Un acre equivale exactamente a 43,560 pies cuadrados (aprox. 4,046.86 metros cuadrados). Una hectárea equivale a 10,000 metros cuadrados, lo que corresponde a unos 107,639 pies cuadrados o 2.47105 acres.'
    },
    {
      question: '6. ¿Por qué mi disco duro de 1 TB aparece como 931 GB en Windows?',
      answer: 'Los fabricantes de hardware utilizan gigabytes decimales (1 TB = 1,000,000,000,000 bytes). Microsoft Windows mide el espacio en gibibytes binarios (GiB, 1 GiB = 1,073,741,824 bytes). Al dividir 1 billón de bytes entre 1,073,741,824 se obtienen ~931.32 GiB, etiquetados por Windows como "GB".'
    },
    {
      question: '7. ¿Cuál es la diferencia entre megabits por segundo (Mbps) y megabytes por segundo (MB/s)?',
      answer: 'Mbps (con "b" minúscula) mide el ancho de banda y la velocidad de la red. MB/s (con "B" mayúscula) mide la tasa de transferencia de archivos en disco. Como 1 byte equivale a 8 bits, divide la cifra en Mbps entre 8 para hallar la velocidad de descarga en MB/s (p. ej., 100 Mbps ÷ 8 = 12.5 MB/s).'
    },
    {
      question: '8. ¿Cómo funciona la conversión de consumo de combustible entre MPG y L/100km?',
      answer: 'La relación entre MPG (EE.UU.) y L/100km es recíproca o inversa: un mayor número de MPG indica mayor eficiencia, mientras que un menor valor de L/100km refleja mejor rendimiento. La fórmula es: L/100km = 235.215 ÷ MPG (EE.UU.). Por ejemplo, 30 MPG equivale a 235.215 ÷ 30 ≈ 7.84 L/100km.'
    },
    {
      question: '9. ¿Cuántas cucharaditas hay en una cucharada y en una taza de cocina?',
      answer: 'En el sistema culinario de EE.UU., 1 cucharada sopera (tbsp) contiene exactamente 3 cucharaditas (tsp) (~14.79 mL). Una taza americana contiene 16 cucharadas o 48 cucharaditas (~236.59 mL). En los estándares métricos de cocina, la taza equivale a 250 mL.'
    },
    {
      question: '10. ¿Cuál es la diferencia entre masa y peso en términos científicos frente al uso cotidiano?',
      answer: 'Científicamente, la masa es una propiedad intrínseca que mide la cantidad de materia (en kilogramos) invariable en cualquier lugar. El peso es la fuerza gravitatoria descendente sobre dicha masa (en Newtons: P = m × g). En el comercio terrestre diario, ambos términos se usan de forma sinónima.'
    },
    {
      question: '11. ¿Cómo se mide la presión atmosférica entre bar, psi y atmósferas?',
      answer: 'La presión atmosférica estándar al nivel del mar (1 atm) equivale a 101,325 Pascales, 1.01325 Bar o 14.6959 PSI. Un bar (100,000 Pa) equivale a unos 14.5038 PSI. Los manómetros para neumáticos suelen indicar presión manométrica relativa al ambiente en PSI o bar.'
    },
    {
      question: '12. ¿Por qué los ángulos se miden tanto en grados como en radianes?',
      answer: 'Los grados (360° en una circunferencia) proceden de antiguas divisiones astronómicas babilónicas. Los radianes son la unidad científica natural del SI, definida por la longitud de arco igual al radio del círculo (2π rad = 360°), indispensable para el cálculo diferencial y trigonométrico.'
    },
    {
      question: '13. ¿Requiere este conversor conexión a internet o envía datos a un servidor?',
      answer: 'No. Este conversor funciona al 100% de manera local en tu navegador mediante JavaScript en el cliente. Ningún valor numérico ni opción seleccionada se transmite a través de internet ni se almacena en servidores externos.'
    },
    {
      question: '14. ¿Puedo convertir múltiples unidades simultáneamente?',
      answer: 'Sí. Al introducir un valor, el panel "Equivalente en Otras Unidades" calcula y actualiza al instante los valores correspondientes en todas las unidades de la categoría activa de forma simultánea.'
    }
  ]
};
