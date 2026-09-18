import type { UnitConverterContent } from './types';

export const ptContent: UnitConverterContent = {
  meta: {
    title: 'Conversor de Unidades – Calculadora Gratuita Métrico e Imperial',
    description: 'Mega conversor de unidades online gratuito. Converta instantaneamente comprimento, peso, temperatura, área, volume, velocidade, tempo, pressão, energia, potência, dados e culinária com fórmulas precisas.',
    keywords: [
      'conversor de unidades',
      'conversor metrico imperial',
      'converter comprimento',
      'converter peso',
      'converter temperatura',
      'celsius para fahrenheit',
      'kg para libras',
      'polegadas para cm',
      'milhas para km',
      'conversor de area'
    ],
    h1: 'Conversor de Unidades Online',
    intro: 'Converta instantaneamente entre unidades métricas, imperiais e do padrão internacional em 16 categorias científicas e do dia a dia. Rápido, 100% no seu navegador e preciso até 8 casas decimais.'
  },
  ui: {
    quickConversionsTitle: '⚡ Conversões Rápidas:',
    fromLabel: 'Valor de Origem',
    toLabel: 'Resultado Convertido',
    swapButton: 'Inverter Unidades',
    copyButton: 'Copiar Resultado',
    copied: 'Copiado! ✓',
    formulaLabel: 'Fórmula',
    convertedValueHeader: 'Valor Convertido',
    precisionLabel: 'Precisão',
    precisionValue: 'Até 8 casas decimais',
    standardUnitLabel: 'Unidade Padrão',
    equivalentHeader: '📋 Equivalente em Outras Unidades',
    enterValuePlaceholder: 'Digite um valor para converter...',
    resultPlaceholder: 'O resultado aparecerá aqui...',
    indianLandBannerText: 'Procurando unidades tradicionais de terra da Índia (Bigha, Gaj, Biswa, Guntha, Acre)? Conheça nosso conversor dedicado →',
    indianLandBannerBtn: 'Abrir Conversor',
    emptyHeroSub: 'Selecione as unidades e digite um valor acima para calcular a conversão instantânea.'
  },
  categories: [
    { id: 'length', name: 'Comprimento e Distância', desc: 'Converta metros, quilômetros, milhas, jardas, pés, polegadas e milhas náuticas.' },
    { id: 'area', name: 'Área e Superfície', desc: 'Converta metros quadrados, pés quadrados, acres, hectares, quilômetros quadrados e milhas quadradas.' },
    { id: 'volume', name: 'Volume e Capacidade', desc: 'Converta litros, mililitros, galões dos EUA, galões britânicos, xícaras, quartos e metros cúbicos.' },
    { id: 'mass', name: 'Massa e Peso', desc: 'Converta quilogramas, gramas, miligramas, libras (lbs), onças (oz), stones e toneladas métricas.' },
    { id: 'temperature', name: 'Temperatura', desc: 'Converta temperatura entre Celsius (°C), Fahrenheit (°F), Kelvin (K) e Rankine (°R).' },
    { id: 'time', name: 'Tempo e Duração', desc: 'Converta segundos, minutos, horas, dias, semanas, meses e anos.' },
    { id: 'speed', name: 'Velocidade', desc: 'Converta quilômetros por hora, milhas por hora, metros por segundo, nós e mach.' },
    { id: 'pressure', name: 'Pressão', desc: 'Converta pascais, bar, PSI, atmosferas padrão (atm), milibares e torr.' },
    { id: 'energy', name: 'Energia e Trabalho', desc: 'Converta joules, quilojoules, calorias, quilocalorias, quilowatt-hora (kWh) e BTU.' },
    { id: 'power', name: 'Potência', desc: 'Converta watts, quilowatts, megawatts, cavalos de força mecânicos (hp) e cavalos-vapor métricos (cv).' },
    { id: 'data', name: 'Armazenamento Digital', desc: 'Converta bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), terabytes (TB) e petabytes (PB).' },
    { id: 'data_rate', name: 'Taxa de Transferência', desc: 'Converta bits por segundo, Mbps, Gbps, megabytes por segundo (MB/s) e gigabytes por segundo.' },
    { id: 'frequency', name: 'Frequência', desc: 'Converta hertz (Hz), quilohertz (kHz), megahertz (MHz), gigahertz (GHz) e RPM.' },
    { id: 'angle', name: 'Ângulo Plano', desc: 'Converta graus (°), radianos (rad), grados, minutos de arco, segundos de arco e rotações.' },
    { id: 'fuel', name: 'Consumo de Combustível', desc: 'Converta milhas por galão (MPG EUA e UK), quilômetros por litro (km/L) e litros por 100 km (L/100km).' },
    { id: 'cooking', name: 'Medidas Culinárias', desc: 'Converta colheres de chá, colheres de sopa, xícaras, onças fluidas, pintas e mililitros para receitas.' }
  ],
  presets: [
    { label: '1 Milha em Km', cat: 'length', from: 'mile', to: 'kilometer', val: '1' },
    { label: '1 Polegada em cm', cat: 'length', from: 'inch', to: 'centimeter', val: '1' },
    { label: '1 Kg em Libras', cat: 'mass', from: 'kilogram', to: 'pound', val: '1' },
    { label: '100°C em °F', cat: 'temperature', from: 'celsius', to: 'fahrenheit', val: '100' },
    { label: '1 Acre em Pés²', cat: 'area', from: 'acre', to: 'sqft', val: '1' },
    { label: '1 GB em MB', cat: 'data', from: 'gigabyte', to: 'megabyte', val: '1' },
    { label: '100 Mbps em MB/s', cat: 'data_rate', from: 'mbps', to: 'mb_per_sec', val: '100' },
    { label: '1 Bar em PSI', cat: 'pressure', from: 'bar', to: 'psi', val: '1' },
    { label: '1 kWh em Joules', cat: 'energy', from: 'kilowatt_hour', to: 'joule', val: '1' },
    { label: '1 Xícara em mL', cat: 'cooking', from: 'cooking_cup', to: 'cooking_ml', val: '1' }
  ],
  article: {
    h2Overview: 'Guia Completo de Conversão de Unidades: Sistemas Métrico, Imperial e Científico',
    pOverview1: 'Seja para resolver cálculos de engenharia, preparar uma receita de um livro de culinária internacional, planejar uma viagem de carro no exterior ou gerenciar espaço de armazenamento em nuvem, a conversão de unidades é fundamental. O mundo contemporâneo apoia-se em dois grandes sistemas de medição: o Sistema Internacional de Unidades (SI Métrico), adotado em quase todos os países, e o Sistema Imperial / Consuetudinário Americano, predominante nos Estados Unidos e no Reino Unido.',
    pOverview2: 'Este Mega Conversor de Unidades gratuito oferece conversões precisas e em tempo real em 16 categorias fundamentais. Cada conversão é calculada no cliente via aritmética de ponto flutuante de precisão dupla IEEE 754 com até 8 casas decimais para máxima exatidão.',

    categoriesHeader: 'Detalhamento das 16 Categorias de Conversão',
    categoriesList: [
      {
        title: '1. Comprimento e Distância',
        description: 'Mede a distância unidimensional entre dois pontos no espaço. A unidade base do SI é o metro (m). O sistema imperial utiliza polegadas, pés, jardas e milhas.',
        bulletPoints: [
          '1 Polegada (in) = 2,54 Centímetros (cm) (padrão internacional exato desde 1959).',
          '1 Pé (ft) = 12 Polegadas = 0,3048 Metro (m).',
          '1 Jarda (yd) = 3 Pés = 0,9144 Metro.',
          '1 Milha (mi) = 5.280 Pés = 1.760 Jardas = 1,609344 Quilômetro (km).',
          '1 Milha Náutica (nmi) = 1.852 Metros = 1,15078 Milha terrestre.'
        ],
        ruleOfThumb: 'Cálculo mental rápido: multiplique quilômetros por 0,62 para estimar milhas (ex.: 100 km/h ≈ 62 mph). Divida centímetros por 2,54 para obter polegadas.'
      },
      {
        title: '2. Área e Superfície',
        description: 'Quantifica o espaço bidimensional dentro de um perímetro. Na engenharia civil, agronomia e no setor imobiliário, a precisão evita divergências financeiras.',
        bulletPoints: [
          '1 Metro Quadrado (m²) = 10,7639 Pés Quadrados (sq ft).',
          '1 Acre = 43.560 Pés Quadrados = 4.046,8564 Metros Quadrados ≈ 0,4047 Hectare.',
          '1 Hectare (ha) = 10.000 Metros Quadrados = 2,47105 Acres.',
          '1 Quilômetro Quadrado (km²) = 100 Hectares = 0,3861 Milha Quadrada.',
          '1 Milha Quadrada (mi²) = 640 Acres = 2,58999 Quilômetros Quadrados.'
        ]
      },
      {
        title: '3. Volume e Capacidade',
        description: 'Mede o espaço tridimensional ocupado por líquidos, gases ou sólidos. Note que o galão dos EUA difere significativamente do galão imperial britânico.',
        bulletPoints: [
          '1 Litro (L) = 1.000 Mililitros (mL) = 0,264172 Galão dos EUA = 33,814 Onças Fluidas dos EUA.',
          '1 Galão dos EUA = 3,78541 Litros = 128 Onças Fluidas dos EUA = 4 Quartos = 8 Pintas.',
          '1 Galão Imperial Britânico = 4,54609 Litros = 160 Onças Fluidas UK (~20% maior que o dos EUA).',
          '1 Xícara dos EUA (cup) = 8 Onças Fluidas = 236,588 Mililitros.',
          '1 Metro Cúbico (m³) = 1.000 Litros = 35,3147 Pés Cúbicos = 264,172 Galões dos EUA.'
        ]
      },
      {
        title: '4. Massa e Peso',
        description: 'Massa representa a quantidade de matéria de um corpo, enquanto o peso reflete a força gravitacional. No comércio cotidiano terrestre, são tratados como equivalentes.',
        bulletPoints: [
          '1 Quilograma (kg) = 2,20462 Libras (lbs) = 1.000 Gramas (g).',
          '1 Libra (lb) = 16 Onças (oz) = 453,59237 Gramas = 0,453592 Quilograma.',
          '1 Tonelada Métrica (t) = 1.000 Quilogramas ≈ 2.204,62 Libras.',
          '1 Tonelada Curta dos EUA = 2.000 Libras = 907,185 Quilogramas.',
          '1 Stone (st, UK) = 14 Libras = 6,35029 Quilogramas.'
        ]
      },
      {
        title: '5. Temperatura',
        description: 'Mede a energia cinética molecular média. Devido aos diferentes pontos de zero, as escalas necessitam de equações afins e não apenas multiplicação.',
        bulletPoints: [
          'Celsius para Fahrenheit: °F = (°C × 9/5) + 32',
          'Fahrenheit para Celsius: °C = (°F - 32) × 5/9',
          'Celsius para Kelvin: K = °C + 273,15',
          'Kelvin para Celsius: °C = K - 273,15',
          'Fahrenheit para Rankine: °R = °F + 459,67'
        ]
      },
      {
        title: '6. Tempo e Duração',
        description: 'O tempo é a dimensão sequencial contínua da realidade. A unidade base do SI é o segundo, definido pelas transições atômicas do Césio-133.',
        bulletPoints: [
          '1 Minuto = 60 Segundos.',
          '1 Hora = 60 Minutos = 3.600 Segundos.',
          '1 Dia = 24 Horas = 1.440 Minutos = 86.400 Segundos.',
          '1 Semana = 7 Dias = 168 Horas = 604.800 Segundos.',
          '1 Ano Calendário (Gregoriano) = 365 Dias = 8.760 Horas = 31.536.000 Segundos (ano bissexto: 366 dias).'
        ]
      },
      {
        title: '7. Velocidade',
        description: 'Mede a distância percorrida por unidade de tempo decorrido.',
        bulletPoints: [
          '1 Quilômetro por Hora (km/h) = 0,621371 Milha por Hora (mph) = 0,277778 Metro por Segundo (m/s).',
          '1 Milha por Hora (mph) = 1,609344 km/h = 0,44704 m/s = 0,868976 Nó.',
          '1 Nó (kn) = 1 Milha Náutica por Hora = 1,852 km/h = 1,15078 mph.',
          'Mach 1 (Velocidade do som ao nível do mar, 20°C) ≈ 343 m/s ≈ 1.235 km/h ≈ 767,3 mph.'
        ]
      },
      {
        title: '8. Pressão',
        description: 'Pressão é a força perpendicular aplicada por unidade de área de uma superfície.',
        bulletPoints: [
          '1 Pascal (Pa) = 1 Newton por metro quadrado (N/m²).',
          '1 Bar = 100.000 Pascais (100 kPa) = 14,5038 PSI.',
          '1 Atmosfera Padrão (atm) = 101.325 Pa = 1,01325 Bar = 14,6959 PSI.',
          '1 PSI (Libra por polegada quadrada) = 6.894,76 Pascais = 0,0689476 Bar.',
          '1 Torr = 1 mmHg ≈ 133,322 Pascais.'
        ]
      },
      {
        title: '9. Energia e Trabalho',
        description: 'A energia é a capacidade de realizar trabalho mecânico ou transferir calor.',
        bulletPoints: [
          '1 Joule (J) = 1 Watt-segundo = 1 Newton-metro.',
          '1 Quilowatt-hora (kWh) = 3.600.000 Joules (3,6 MJ).',
          '1 Caloria (termoquímica) = 4,184 Joules.',
          '1 Quilocaloria alimentar (kcal) = 1.000 Calorias = 4.184 Joules.',
          '1 British Thermal Unit (BTU) = 1.055,06 Joules = 252,164 Calorias.'
        ]
      },
      {
        title: '10. Potência',
        description: 'Potência é a taxa com que o trabalho é executado ou a energia é transferida por unidade de tempo.',
        bulletPoints: [
          '1 Watt (W) = 1 Joule por segundo.',
          '1 Quilowatt (kW) = 1.000 Watts = 1,34102 Cavalo de força mecânico (hp).',
          '1 Cavalo de força mecânico (Imperial hp) = 745,69987 Watts ≈ 0,746 kW.',
          '1 Cavalo-vapor métrico (cv / PS) = 735,49875 Watts ≈ 0,9863 Imperial hp.',
          '1 Megawatt (MW) = 1.000 Quilowatts = 1.000.000 Watts.'
        ]
      },
      {
        title: '11. Armazenamento Digital',
        description: 'Mede a capacidade de dados eletrônicos. Fabricantes de discos adotam a notação decimal (base 10), enquanto sistemas operacionais utilizam a binária (base 2).',
        bulletPoints: [
          '1 Byte (B) = 8 Bits (b).',
          '1 Kilobyte (KB) = 1.024 Bytes (binário) ou 1.000 Bytes (decimal).',
          '1 Megabyte (MB) = 1.024 KB = 1.048.576 Bytes.',
          '1 Gigabyte (GB) = 1.024 MB = 1.073.741.824 Bytes.',
          '1 Terabyte (TB) = 1.024 GB = 1.099.511.627.776 Bytes.',
          '1 Petabyte (PB) = 1.024 TB.'
        ]
      },
      {
        title: '12. Taxa de Transferência de Dados',
        description: 'Capacidade de transmissão e velocidade em canais de comunicação de redes.',
        bulletPoints: [
          '1 Megabit por segundo (Mbps) = 1.000.000 bits por segundo (velocidade da conexão).',
          '1 Megabyte por segundo (MB/s) = 8 Megabits por segundo (velocidade de download de arquivos).',
          '1 Gigabit por segundo (Gbps) = 1.000 Mbps = 125 MB/s.',
          'Uma conexão de 100 Mbps baixa no máximo teórico cerca de 12,5 MB/s.'
        ]
      },
      {
        title: '13. Frequência',
        description: 'Número de repetições de um ciclo ou evento periódico por unidade de tempo.',
        bulletPoints: [
          '1 Hertz (Hz) = 1 ciclo por segundo.',
          '1 Quilohertz (kHz) = 1.000 Hz.',
          '1 Megahertz (MHz) = 1.000.000 Hz (frequências de transmissão de rádio).',
          '1 Gigahertz (GHz) = 1.000.000.000 Hz (processadores modernos e Wi-Fi 5 GHz).',
          '1 RPM (Rotações por minuto) = 1/60 Hz ≈ 0,016667 Hz.'
        ]
      },
      {
        title: '14. Ângulo Plano',
        description: 'Mede a abertura circular entre duas retas ou semirretas que se cruzam.',
        bulletPoints: [
          'Círculo completo = 360 Graus (°) = 2π Radianos (≈ 6,283185 rad) = 400 Grados.',
          '1 Radiano = 180 / π ≈ 57,2958 Graus.',
          '1 Grau = π / 180 ≈ 0,0174533 Radiano.',
          '1 Grau = 60 Minutos de arco (′) = 3.600 Segundos de arco (″).'
        ]
      },
      {
        title: '15. Consumo de Combustível',
        description: 'Relação entre a distância percorrida e o volume de combustível gasto, ou seu inverso.',
        bulletPoints: [
          'Milhas por Galão (MPG EUA) para Quilômetros por Litro: km/L = MPG × 0,425144.',
          'MPG EUA para L/100km: L/100km = 235,215 / MPG EUA (relação recíproca).',
          'Quilômetros por Litro (km/L) para L/100km: L/100km = 100 / (km/L).',
          '1 MPG Imperial britânico ≈ 1,20095 MPG dos EUA.'
        ]
      },
      {
        title: '16. Medidas Culinárias e de Cozinha',
        description: 'Essencial para a confeitaria e a gastronomia ao adaptar receitas internacionais entre colheres, xícaras e mililitros.',
        bulletPoints: [
          '1 Colher de sopa dos EUA (tbsp) = 3 Colheres de chá (tsp) = 0,5 Onça fluida ≈ 14,787 mL.',
          '1 Xícara dos EUA (cup) = 16 Colheres de sopa = 48 Colheres de chá = 8 Onças fluidas ≈ 236,588 mL.',
          '1 Xícara métrica padrão (Brasil, Austrália, Reino Unido) = 240 ou 250 mL.',
          '1 Pinta dos EUA = 2 Xícaras = 16 Onças fluidas ≈ 473,176 mL.'
        ]
      }
    ],

    comparisonHeader: 'Métrico vs Imperial: Principais Diferenças Teóricas e Práticas',
    comparisonText: 'O Sistema Métrico Internacional (SI) fundamenta-se na coerência decimal: cada unidade escala em potências de dez através de prefixos universais (quilo-, centi-, mili-, micro-). Por outro lado, os sistemas imperial e consuetudinário derivam de antigas tradições mercantis e agrárias anglo-saxãs:',
    comparisonPoints: [
      'Facilidade Decimal: No sistema métrico, 1 quilômetro possui 1.000 metros e 1 metro possui 100 centímetros. No imperial, 1 milha tem 5.280 pés e 1 pé tem 12 polegadas.',
      'Padronização Científica: A comunidade científica global, a farmacologia, o setor aeroespacial e as dosagens médicas adotam o sistema métrico SI como padrão absoluto.',
      'Herança Cultural: As medidas consuetudinárias continuam enraizadas nos Estados Unidos na construção civil, calibragem de pneus (PSI), limites de velocidade (mph) e terrenos rurais em acres.'
    ],

    formulasHeader: 'Fórmulas Matemáticas e Referências Térmicas',
    formulasIntro: 'Enquanto conversões lineares empregam um fator multiplicador direto (Resultado = Entrada × Fator), temperaturas utilizam funções afins com pontos de zero distintos. A tabela abaixo resume os referenciais físicos fundamentais:',
    benchmarksTitle: 'Pontos Físicos Notáveis de Temperatura',
    benchmarksHeaders: {
      condition: 'Fenômeno Físico',
      celsius: 'Celsius (°C)',
      fahrenheit: 'Fahrenheit (°F)',
      kelvin: 'Kelvin (K)'
    },
    benchmarksRows: [
      { condition: 'Zero Absoluto (Cessação do movimento molecular)', celsius: '-273,15 °C', fahrenheit: '-459,67 °F', kelvin: '0,00 K' },
      { condition: 'Ponto de Congelamento da Água Pura (1 atm)', celsius: '0,00 °C', fahrenheit: '32,00 °F', kelvin: '273,15 K' },
      { condition: 'Temperatura Ambiente Típica', celsius: '20,00 a 22,00 °C', fahrenheit: '68,00 a 71,60 °F', kelvin: '293,15 a 295,15 K' },
      { condition: 'Temperatura Média do Corpo Humano', celsius: '37,00 °C', fahrenheit: '98,60 °F', kelvin: '310,15 K' },
      { condition: 'Ponto de Ebulição da Água Pura (1 atm)', celsius: '100,00 °C', fahrenheit: '212,00 °F', kelvin: '373,15 K' }
    ],

    useCasesHeader: 'Casos Reais de Aplicação',
    useCasesList: [
      {
        title: 'Viagens Internacionais e Condução',
        description: 'Alugar um veículo em outro país exige rápida conversão mental entre km/h e mph, além de conferir pressão de pneus (bar vs psi) e combustível (litros vs galões).'
      },
      {
        title: 'Culinária e Confeitaria Internacional',
        description: 'A confeitaria é uma ciência química exata. Confundir onças fluidas americanas com imperiais ou gramas altera o equilíbrio das receitas.'
      },
      {
        title: 'Engenharia e Plantas Arquitetônicas',
        description: 'Engenheiros e arquitetos convertem cotas habitualmente entre milímetros e pés/polegadas sem arriscar erros de tolerância construtiva.'
      },
      {
        title: 'Infraestrutura de TI e Armazenamento',
        description: 'Compreender a diferença entre a capacidade nominal de discos (gigabytes decimais) e o sistema operacional (gibibytes binários) evita erros de dimensionamento.'
      }
    ],

    limitationsHeader: 'Premissas Técnicas e Limitações de Precisão',
    limitationsList: [
      'Os cálculos rodam inteiramente no navegador em ponto flutuante de 64 bits IEEE 754. Os resultados exibidos são arredondados em até 8 casas decimais para suprimir dízimas binárias.',
      'Conversões de culinária presumem densidade líquida padrão (1 g/mL para água). Ingredientes secos como farinha e açúcar variam em densidade e devem ser pesados em balança.',
      'As referências de pressão e ponto de ebulição consideram o nível padrão do mar a 101.325 Pa (1 atmosfera).'
    ]
  },
  faqs: [
    {
      question: '1. Quão preciso é este conversor de unidades online?',
      answer: 'Todas as taxas de conversão seguem as normas mais recentes do NIST e da ISO. Os cálculos são processados localmente no seu dispositivo através de aritmética de 64 bits IEEE 754, garantindo precisão de até 8 casas decimais sem atrasos de servidor.'
    },
    {
      question: '2. Qual é a diferença fundamental entre o Sistema Métrico e o Imperial?',
      answer: 'O sistema métrico é baseado em potências de 10, tornando a conversão entre milímetros, centímetros, metros e quilômetros intuitiva. O sistema imperial tem raízes medievais e emprega múltiplos irregulares (12 polegadas no pé, 3 pés na jarda, 16 onças na libra, 5.280 pés na milha).'
    },
    {
      question: '3. Por que o galão dos EUA difere do galão imperial britânico?',
      answer: 'O galão líquido dos EUA é definido como 231 polegadas cúbicas (~3,7854 litros). O galão imperial britânico foi redefinido em 1824 como o volume de 10 libras de água a 62°F (~4,5461 litros). Dessa forma, o galão do Reino Unido é aproximadamente 20,09% maior que o dos EUA.'
    },
    {
      question: '4. Como converter temperaturas entre Celsius, Fahrenheit e Kelvin?',
      answer: 'De Celsius para Fahrenheit: multiplique por 1,8 e some 32 [°F = (°C × 1,8) + 32]. De Fahrenheit para Celsius: subtraia 32 e divida por 1,8 [°C = (°F - 32) ÷ 1,8]. De Celsius para Kelvin: some 273,15 [K = °C + 273,15]. Ambas as escalas se cruzam exatamente em -40° (-40°C = -40°F).'
    },
    {
      question: '5. Quantos pés quadrados existem em 1 acre e em 1 hectare?',
      answer: 'Um acre possui exatamente 43.560 pés quadrados (cerca de 4.046,86 metros quadrados). Um hectare possui 10.000 metros quadrados, o que equivale a aproximadamente 107.639 pés quadrados ou 2,47105 acres.'
    },
    {
      question: '6. Por que meu HD de 1 TB aparece como apenas 931 GB no Windows?',
      answer: 'Fabricantes de armazenamento utilizam gigabytes decimais (1 TB = 1.000.000.000.000 de bytes). O Windows calcula o espaço em gibibytes binários (GiB, 1 GiB = 1.073.741.824 bytes). Dividindo 1 trilhão por 1.073.741.824 obtêm-se cerca de 931,32 GiB, rotulados no Windows como "GB".'
    },
    {
      question: '7. Qual é a diferença entre megabits por segundo (Mbps) e megabytes por segundo (MB/s)?',
      answer: 'Mbps (com "b" minúsculo) mede a largura de banda da conexão de internet. MB/s (com "B" maiúsculo) mede a velocidade de download de arquivos no disco. Como 1 byte tem 8 bits, divida o valor em Mbps por 8 para encontrar a taxa em MB/s (ex.: 100 Mbps ÷ 8 = 12,5 MB/s).'
    },
    {
      question: '8. Como funciona a conversão de consumo de combustível entre MPG e L/100km?',
      answer: 'A relação entre MPG dos EUA e L/100km é recíproca (inversa): um MPG maior reflete maior economia, enquanto um valor menor de L/100km significa maior eficiência. A fórmula é: L/100km = 235,215 ÷ MPG EUA (ex.: 30 MPG equivale a 235,215 ÷ 30 ≈ 7,84 L/100km).'
    },
    {
      question: '9. Quantas colheres de chá equivalem a uma colher de sopa e uma xícara?',
      answer: 'Nas medidas culinárias dos EUA, 1 colher de sopa (tbsp) contém exatamente 3 colheres de chá (tsp) (~14,79 mL). Uma xícara dos EUA contém 16 colheres de sopa ou 48 colheres de chá (~236,59 mL). Nas receitas métricas padrão (Brasil e outros países), a xícara é comumente arredondada para 240 ou 250 mL.'
    },
    {
      question: '10. Qual a diferença entre massa e peso cientificamente e no cotidiano?',
      answer: 'Cientificamente, massa (em kg) é a quantidade de matéria de um objeto e não se altera com a gravidade. Peso (em Newtons) é a força de atração gravitacional atuando nessa massa (P = m × g). No comércio diário na Terra, ambos os termos são usados com o mesmo sentido.'
    },
    {
      question: '11. Como a pressão atmosférica se relaciona entre bar, psi e atmosferas?',
      answer: 'A pressão atmosférica normal ao nível do mar (1 atm) equivale a 101.325 Pascais, 1,01325 Bar ou 14,6959 PSI. Um bar (100.000 Pa) equivale a aproximadamente 14,5038 PSI. Calibradores de pneus normalmente mostram a pressão manométrica em PSI ou bar.'
    },
    {
      question: '12. Por que medimos ângulos tanto em graus quanto em radianos?',
      answer: 'Os graus (360° em uma volta completa) remontam à astronomia babilônica. O radiano é a unidade científica natural do SI, definida pelo comprimento de arco igual ao raio do círculo (2π rad = 360°), sendo essencial para fórmulas de cálculo diferencial e derivadas trigonométricas.'
    },
    {
      question: '13. Este conversor precisa de conexão com a internet ou envia dados para um servidor?',
      answer: 'Não. Este conversor executa 100% de forma local no seu navegador web utilizando JavaScript no lado do cliente. Nenhum número, valor digitado ou seleção é transmitido pela internet nem armazenado em servidores externos.'
    },
    {
      question: '14. É possível converter para várias unidades simultaneamente?',
      answer: 'Sim. Ao inserir um valor, a tabela "Equivalente em Outras Unidades" calcula e atualiza instantaneamente os valores equivalentes em todas as unidades disponíveis na categoria selecionada em tempo real.'
    }
  ]
};
