/**
 * Category-Aware Contextual Feature Cards for CalculatorSEOContent.astro
 * Provides authentic, category-specific capabilities across all 9 supported locales:
 * en, hi, es, ja, fr, de, pt, ko, it.
 */

import type { Locale } from '../config';

export interface FeatureCard {
  icon: string;
  title: string;
  desc: string;
}

export type CategoryFeaturesMap = Record<string, Record<Locale, FeatureCard[]>>;

const categoryFeatures: CategoryFeaturesMap = {
  finance: {
    en: [
      { icon: '📊', title: 'Amortization & Schedule Breakdown', desc: 'Computes principal repayment schedules and cumulative interest progression over the entire tenure' },
      { icon: '📈', title: 'Compound Growth Dynamics', desc: 'Models compound interest growth across standard compounding intervals (monthly, quarterly, annually)' },
      { icon: '🎯', title: 'Scenario & Rate Sensitivity', desc: 'Compare how varying interest rates, tenure lengths, and down payments impact lifetime borrowing costs' },
      { icon: '📐', title: 'Transparent Mathematical Logic', desc: 'Calculates exact values using standard financial equations without hidden lender markups or fees' },
      { icon: '⚖️', title: 'Clear Tax-Scope Boundaries', desc: 'Separates gross quantitative estimates from variable local tax rules, deductions, and surcharge brackets' },
      { icon: '🖨️', title: 'Print & Budget Planning', desc: 'Formatted for instant export and printing, ideal for personal budgeting or loan comparison reviews' }
    ],
    hi: [
      { icon: '📊', title: 'ऋण चुकौती और किस्त विवरण', desc: 'ऋण अवधि के दौरान मूलधन भुगतान और कुल संचित ब्याज की प्रगति का स्पष्ट विश्लेषण प्रदान करता है' },
      { icon: '📈', title: 'चक्रवृद्धि ब्याज गतिशीलता', desc: 'विभिन्न अवधियों (मासिक, त्रैमासिक, वार्षिक) पर चक्रवृद्धि विकास का सटीक गणितीय मॉडल तैयार करता है' },
      { icon: '🎯', title: 'ब्याज दर संवेदनशीलता तुलना', desc: 'विभिन्न ब्याज दरों और समयावधियों का कुल लागत पर पड़ने वाले प्रभाव का तुरंत मूल्यांकन करें' },
      { icon: '📐', title: 'पारदर्शी वित्तीय सूत्र', desc: 'बिना किसी छिपे हुए शुल्क के प्रमाणित बैंकिंग और वित्तीय सूत्रों द्वारा सटीक गणना' },
      { icon: '⚖️', title: 'स्पष्ट कर-दायरा सीमाएं', desc: 'सकल वित्तीय अनुमानों को स्थानीय कर छूट और स्लैब नियमों से अलग रखकर स्पष्टता बनाए रखता है' },
      { icon: '🖨️', title: 'बजट और प्रिंट अनुकूल', desc: 'व्यक्तिगत वित्तीय योजना और ऋण तुलना के लिए साफ-सुथरे प्रिंट और समीक्षा हेतु तैयार' }
    ],
    es: [
      { icon: '📊', title: 'Amortización y Desglose de Pagos', desc: 'Calcula el calendario de amortización del capital y la progresión del interés acumulado' },
      { icon: '📈', title: 'Dinámica de Interés Compuesto', desc: 'Modela el crecimiento patrimonial según frecuencias estándar de capitalización' },
      { icon: '🎯', title: 'Sensibilidad de Plazos y Tasas', desc: 'Evalúa cómo variaciones en tipos de interés y plazos influyen en el coste final de financiación' },
      { icon: '📐', title: 'Fórmulas Financieras Transparentes', desc: 'Cálculos directos mediante ecuaciones verificadas sin recargos bancarios ocultos' },
      { icon: '⚖️', title: 'Alcance Fiscal Delimitado', desc: 'Distingue claramente entre importes brutos proyectados y obligaciones tributarias variables' },
      { icon: '🖨️', title: 'Listo para Imprimir y Planificar', desc: 'Formato limpio para comparar presupuestos familiares, préstamos o inversiones' }
    ],
    fr: [
      { icon: '📊', title: 'Amortissement et Échéancier Déroulé', desc: 'Établit le tableau d’amortissement du capital et le cumul des intérêts sur toute la durée' },
      { icon: '📈', title: 'Dynamique des Intérêts Composés', desc: 'Modélise la progression selon les fréquences de capitalisation (mensuelle, trimestrielle, annuelle)' },
      { icon: '🎯', title: 'Sensibilité aux Taux et Durées', desc: 'Comparez l’impact des variations de taux d’intérêt sur le coût total du financement' },
      { icon: '📐', title: 'Transparence Mathématique Rigoureuse', desc: 'Calculs basés sur les formules financières standard sans frais ni marges masquées' },
      { icon: '⚖️', title: 'Périmètre Fiscal Explicite', desc: 'Distingue clairement les prévisions brutes des déductions fiscales et prélèvements locaux' },
      { icon: '🖨️', title: 'Support de Synthèse Budgétaire', desc: 'Mise en page optimisée pour l’impression et l’analyse comparative d’emprunts' }
    ],
    de: [
      { icon: '📊', title: 'Tilgungs- und Ratenverlauf', desc: 'Ermittelt detaillierte Tilgungspläne mit Aufteilung von Zins und Tilgungsanteil über die Laufzeit' },
      { icon: '📈', title: 'Zinseszins-Wachstumsdynamik', desc: 'Berechnet den Vermögenseffekt anhand standardisierter Zinseszins-Perioden' },
      { icon: '🎯', title: 'Zins- und Laufzeitsensitivität', desc: 'Vergleicht den Einfluss veränderter Zinssätze und Sondertilgungen auf die Gesamtkosten' },
      { icon: '📐', title: 'Nachvollziehbare Finanzmathematik', desc: 'Klare Berechnung nach anerkannten Standards ohne verdeckte Bankgebühren' },
      { icon: '⚖️', title: 'Steuerliche Abgrenzung', desc: 'Trennt mathematische Brutto-Ergebnisse sauber von individuellen Steuer- und Abgabenpflichten' },
      { icon: '🖨️', title: 'Druckfertige Finanzübersicht', desc: 'Optimiert für persönliche Budgetbesprechungen und transparente Kreditvergleiche' }
    ],
    it: [
      { icon: '📊', title: 'Piano di Ammortamento e Rate', desc: 'Sviluppa il piano di rimborso con distinzione tra quota capitale e quota interessi nel tempo' },
      { icon: '📈', title: 'Dinamica dell’Interesse Composto', desc: 'Simula la crescita finanziaria in base alla frequenza di capitalizzazione prescelta' },
      { icon: '🎯', title: 'Sensibilità a Tassi e Scadenze', desc: 'Valuta l’impatto delle variazioni dei tassi di interesse sul costo complessivo del finanziamento' },
      { icon: '📐', title: 'Formule Finanziarie Trasparenti', desc: 'Calcoli matematici conformi agli standard internazionali senza costi o commissioni nascoste' },
      { icon: '⚖️', title: 'Perimetro Fiscale Ben Definito', desc: 'Distingue chiaramente le proiezioni lorde dalle detrazioni e imposte locali variabili' },
      { icon: '🖨️', title: 'Pianificazione di Bilancio Stampabile', desc: 'Formattazione adatta alla stampa per il controllo del budget e la comparazione di mutui' }
    ],
    pt: [
      { icon: '📊', title: 'Amortização e Evolução de Parcelas', desc: 'Calcula o cronograma completo com a divisão entre amortização de capital e juros acumulados' },
      { icon: '📈', title: 'Dinâmica de Juros Compostos', desc: 'Modela o crescimento financeiro conforme períodos de capitalização (mensal, trimestral, anual)' },
      { icon: '🎯', title: 'Sensibilidade de Taxas e Prazos', desc: 'Analise o impacto de diferentes taxas de juros e prazos no custo total da dívida' },
      { icon: '📐', title: 'Matemática Financeira Transparente', desc: 'Equações padronizadas sem acréscimos indevidos ou tarifas ocultas de credores' },
      { icon: '⚖️', title: 'Escopo Fiscal Delimitado', desc: 'Separa projeções brutas de encargos fiscais e deduções tributárias locais' },
      { icon: '🖨️', title: 'Planeamento Prático e Imprimível', desc: 'Layout ideal para análise orçamentária pessoal e comparação formal de propostas' }
    ],
    ja: [
      { icon: '📊', title: '元利均等・元金返済の内訳明示', desc: '返済期間全体にわたる元金償還額と累積利息の推移を詳細にシミュレーション' },
      { icon: '📈', title: '複利効果の数学的モデル', desc: '設定された複利計算周期（月次・四半期・年次）に基づく正確な資産形成・借入推移' },
      { icon: '🎯', title: '金利変動と期間の感応度分析', desc: '借入金利や返済年数の変動が最終的な総支払額に与える影響を即座に比較' },
      { icon: '📐', title: '透明性の高い標準計算式', desc: '金融工学の標準算式を採用し、不透明な手数料を含まない正確な数値を提示' },
      { icon: '⚖️', title: '税務・制度上の適用範囲の明確化', desc: '試算結果はグロス目安であり、個別の税率や控除規定と明確に区分して表示' },
      { icon: '🖨️', title: '印刷・家計比較に対応', desc: '複数のローン条件比較やライフプラン検討に適したクリーンな出力レイアウト' }
    ],
    ko: [
      { icon: '📊', title: '원리금 상환 일정 및 이자 분석', desc: '대출 전 기간에 걸친 원금 상환액과 누적 발생 이자의 점진적 추이를 정밀 계산' },
      { icon: '📈', title: '복리 주기별 자산 증가 모델', desc: '월복리, 분기복리, 연복리 등 다양한 복리 주기에 맞춘 정확한 금융 성장 곡선 산출' },
      { icon: '🎯', title: '금리 및 상환 기간 민감도 비교', desc: '이자율 변동 및 상환 기간 조정이 최종 금융 비용에 미치는 영향을 즉각 평가' },
      { icon: '📐', title: '투명하고 검증된 표준 금융 공식', desc: '금융권 표준 수식을 적용하여 숨겨진 수수료나 왜곡 없이 순수 수치 산출' },
      { icon: '⚖️', title: '명확한 세무·제도적 적용 범위', desc: '세전 총환산 금액과 각 관할지별 변동 세금·공제 항목을 명확히 구분하여 안내' },
      { icon: '🖨️', title: '예산 계획 수립 및 인쇄 최적화', desc: '가계 대출 비교 및 재무 포트폴리오 검토에 최적화된 깔끔한 출력 서식' }
    ]
  },

  construction: {
    en: [
      { icon: '🧱', title: 'Material Quantity Estimation', desc: 'Calculates structural cement, sand, aggregate, and brick units from volumetric measurements' },
      { icon: '⚖️', title: 'Configurable Wastage Margins', desc: 'Accounts for standard 5%–10% on-site cutting, transport, and handling wastage assumptions' },
      { icon: '📐', title: 'Standard Engineering Ratios', desc: 'Applies verified mix ratios (such as M15 1:2:4, M20 1:1.5:3, or brick mortar proportions)' },
      { icon: '💰', title: 'Preliminary BOQ Costing', desc: 'Estimates provisional material costs from localized unit market rates for purchase planning' },
      { icon: '🔄', title: 'Dual Metric & Imperial Units', desc: 'Seamlessly compute quantities in metres, millimetres, feet, inches, cubic metres, or cubic feet' },
      { icon: '👷', title: 'Practical Procurement Benchmarks', desc: 'Provides actionable thumb rules for contractors, site supervisors, and home renovators' }
    ],
    hi: [
      { icon: '🧱', title: 'सटीक निर्माण सामग्री आकलन', desc: 'आयतन और क्षेत्रफल के आधार पर सीमेंट, रेत, गिट्टी और ईंटों की कुल आवश्यक मात्रा की गणना' },
      { icon: '⚖️', title: 'साइट वेस्टेज का प्रावधान', desc: 'साइट पर सामग्री की टूट-फूट और ढुलाई के लिए मानक 5% से 10% वेस्टेज मार्जिन को शामिल करता है' },
      { icon: '📐', title: 'मानक कंक्रीट और मोर्टार अनुपात', desc: 'प्रमाणित इंजीनियरिंग मिश्रण अनुपातों (जैसे M15 1:2:4, M20 1:1.5:3, चुनाई मोर्टार) का सटीक उपयोग' },
      { icon: '💰', title: 'अनुमानित BOQ बजट लागत', desc: 'बाजार दरों के आधार पर खरीद योजना के लिए प्रारंभिक सामग्री बजट का त्वरित अनुमान' },
      { icon: '🔄', title: 'मीट्रिक और इम्पीरियल दोनों इकाइयां', desc: 'मीटर, वर्ग मीटर, घन मीटर या फीट और घन फीट में आसानी से गणना की सुविधा' },
      { icon: '👷', title: 'ठेकेदारों और इंजीनियरों के लिए उपयोगी', desc: 'मटेरियल ऑर्डर करने और निर्माण स्थल पर बर्बादी रोकने के लिए व्यावहारिक थंब रूल' }
    ],
    es: [
      { icon: '🧱', title: 'Estimación de Cantidades de Obra', desc: 'Calcula volúmenes de cemento, arena, grava y ladrillos a partir de medidas estructurales' },
      { icon: '⚖️', title: 'Margen de Desperdicio en Obra', desc: 'Incorpora el margen técnico habitual del 5% al 10% por rotura, corte y manipulación' },
      { icon: '📐', title: 'Dosificaciones de Ingeniería Estándar', desc: 'Aplica proporciones de mezcla verificadas para hormigones y morteros de albañilería' },
      { icon: '💰', title: 'Cálculo Preliminar de Presupuesto (BOQ)', desc: 'Proyecta el coste de adquisición a partir de los precios unitarios de materiales' },
      { icon: '🔄', title: 'Flexibilidad Métrica e Imperial', desc: 'Calcula cómodamente en metros, milímetros, pies, pulgadas, m³ o ft³ sin errores' },
      { icon: '👷', title: 'Criterios Prácticos de Construcción', desc: 'Reglas de estimación de obra fiables para contratistas, técnicos y autoconstructores' }
    ],
    fr: [
      { icon: '🧱', title: 'Métré et Quantités de Matériaux', desc: 'Calcule les volumes de ciment, sable, gravier et briques à partir des cotes de chantier' },
      { icon: '⚖️', title: 'Tolérance de Perte et Chute', desc: 'Intègre une marge réaliste de 5 à 10 % pour les coupes, la manutention et les pertes' },
      { icon: '📐', title: 'Dosages Techniques Validés', desc: 'Applique les ratios de formulation usuels pour bétons de structure et mortiers de pose' },
      { icon: '💰', title: 'Chiffrage Prévisionnel (DQE / BOQ)', desc: 'Permet d’évaluer le coût d’approvisionnement selon les prix unitaires du marché' },
      { icon: '🔄', title: 'Conversion Métrique et Impériale', desc: 'Gestion fluide des dimensions en mètres, centimètres, pieds, pouces et volumes' },
      { icon: '👷', title: 'Repères Fiables pour le Gros Œuvre', desc: 'Formules de calcul pratiques pour artisans, conducteurs de travaux et maîtres d’ouvrage' }
    ],
    de: [
      { icon: '🧱', title: 'Baustoff-Bedarfsberechnung', desc: 'Ermittelt exakte Mengen an Zement, Sand, Kies und Mauersteinen aus den Raummaßen' },
      { icon: '⚖️', title: 'Berücksichtigung von Verschnitt', desc: 'Kalkuliert praxisnahe Sicherheitszuschläge von 5–10 % für Schnitt- und Bruchverluste ein' },
      { icon: '📐', title: 'Anerkannte Mischungsverhältnisse', desc: 'Basiert auf bauüblichen Rezepturen für Konstruktionsbeton und Mauermörtel' },
      { icon: '💰', title: 'Vorkalkulation & Leistungsverzeichnis', desc: 'Schätzt Beschaffungskosten anhand von Materialeinzelpreisen für die Budgetplanung' },
      { icon: '🔄', title: 'Metrische & imperiale Einheiten', desc: 'Rechnet flexibel in Metern, Millimetern, Quadrat- und Kubikmetern sowie Zoll und Fuß' },
      { icon: '👷', title: 'Praxiserprobte Baustellen-Faustformeln', desc: 'Wertvolle Planungshilfe für Bauleiter, Handwerker und Eigenheimbauer' }
    ],
    it: [
      { icon: '🧱', title: 'Computo Metrico dei Materiali', desc: 'Calcola fabbisogni di cemento, sabbia, inerti e laterizi partendo dai volumi di progetto' },
      { icon: '⚖️', title: 'Fragrido e Sfrido di Cantiere', desc: 'Prevede una quota di sicurezza del 5-10% per scarti di taglio, rotture e trasporto' },
      { icon: '📐', title: 'Dosaggi Tecnici Standard', desc: 'Utilizza rapporti di miscelazione verificati per calcestruzzi strutturali e malte' },
      { icon: '💰', title: 'Stima Economica Preliminare', desc: 'Valuta i costi di acquisto applicando i prezzi unitari ai quantitativi calcolati' },
      { icon: '🔄', title: 'Unità Metriche e Imperiali', desc: 'Converte agevolmente misure lineari, superfici e volumi in metri o piedi cubi' },
      { icon: '👷', title: 'Pratico Supporto di Cantiere', desc: 'Parametri operativi per capicantiere, geometri, artigiani e committenti privati' }
    ],
    pt: [
      { icon: '🧱', title: 'Levantamento de Quantitativos', desc: 'Calcula o consumo de cimento, areia, brita e tijolos com base nas dimensões da obra' },
      { icon: '⚖️', title: 'Margem de Perda e Quebra', desc: 'Adiciona margem técnica recomendada de 5% a 10% para cortes e desperdícios no canteiro' },
      { icon: '📐', title: 'Traços de Engenharia Verificados', desc: 'Emprega proporções consagradas para betão estrutural e argamassas de assentamento' },
      { icon: '💰', title: 'Orçamentação Prévia de Materiais', desc: 'Estima custos de compra a partir de cotações unitárias para o planeamento de compras' },
      { icon: '🔄', title: 'Unidades Métricas e Imperiais', desc: 'Flexibilidade para calcular em metros, centímetros, pés, polegadas, m³ e ft³' },
      { icon: '👷', title: 'Parâmetros Práticos para a Obra', desc: 'Regras práticas de construção para mestres de obras, engenheiros e remodeladores' }
    ],
    ja: [
      { icon: '🧱', title: '建築資材の必要数量算出', desc: '躯体寸法および面積からセメント、砂、骨材、レンガ等の所要量を体積計算' },
      { icon: '⚖️', title: '施工ロス率・余剰率の反映', desc: '現場での切断ロスや運搬破損を考慮し、標準的な5〜10%の余裕率を設定可能' },
      { icon: '📐', title: '標準調合理論比の適用', desc: 'コンクリートおよびモルタルの標準的な配合比率（1:2:4、1:1.5:3等）に準拠' },
      { icon: '💰', title: '概算資材コストの試算', desc: '資材単価を入力することで調達計画に必要な概算購入費用をスピーディに算出' },
      { icon: '🔄', title: 'メートル法・ヤードポンド法両対応', desc: 'm、mm、m²、m³はもちろん、必要に応じてインチやフィート単位の換算も容易' },
      { icon: '👷', title: '現場監理・施工計画に直結', desc: '施工管理者、リフォーム発注者、職人が資材過不足を防ぐための実用的な目安' }
    ],
    ko: [
      { icon: '🧱', title: '건축 구조 자재 소요량 산출', desc: '체적 및 면적 치수를 바탕으로 시멘트, 모래, 골재, 벽돌의 정밀한 소요 수량 계산' },
      { icon: '⚖️', title: '현장 시공 할증률(5~10%) 반영', desc: '자재 절단 손실, 운반 파손, 현장 로스를 대비한 5~10% 표준 안전 할증률 적용' },
      { icon: '📐', title: '표준 콘크리트·모르타르 배합비', desc: '구조용 콘크리트 및 조적 모르타르의 검증된 표준 용적 배합비(1:2:4, 1:1.5:3 등) 준수' },
      { icon: '💰', title: '자재 내역서(BOQ) 사전 견적', desc: '단위당 자재 단가를 대입하여 구매 조달에 필요한 예산 규모를 실시간으로 예측' },
      { icon: '🔄', title: '미터법 및 인치·피트 단위 호환', desc: '미터, 밀리미터, 제곱미터, 입방미터(루베) 및 피트 단위 간의 오차 없는 상호 연산' },
      { icon: '👷', title: '현장 실무자를 위한 표준 지침', desc: '시공 기술자, 인테리어 시공자, 발주처가 자재 낭비를 막고 공정을 통제하는 지침 제공' }
    ]
  },

  health: {
    en: [
      { icon: '🔬', title: 'Validated Clinical Equations', desc: 'Employs published physiological formulas (such as Mifflin-St Jeor, WHO, and CDC benchmarks)' },
      { icon: '⚖️', title: 'Standard Biometric Context', desc: 'Places measurements within clear clinical reference categories rather than arbitrary scores' },
      { icon: '🔥', title: 'Caloric & Metabolic Estimation', desc: 'Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) across activity tiers' },
      { icon: '🎯', title: 'Progress Trend Awareness', desc: 'Designed for monitoring long-term lifestyle adaptations rather than single-day fluctuations' },
      { icon: '🛡️', title: 'Client-Side Data Privacy', desc: 'All weight, age, and biometric inputs calculate in local browser memory and are never stored or tracked' },
      { icon: '🩺', title: 'Educational Awareness Scope', desc: 'Clear distinction between screening benchmarks and individualized clinical medical diagnosis' }
    ],
    hi: [
      { icon: '🔬', title: 'वैज्ञानिक और नैदानिक सूत्र', desc: 'डब्ल्यूएचओ (WHO), सीडीसी और मिफलिन-सेंट जियोर जैसे प्रमाणित शारीरिक मानकों पर आधारित' },
      { icon: '⚖️', title: 'स्पष्ट बायोमेट्रिक वर्गीकरण', desc: 'शारीरिक मापों को मनमाने स्कोर के बजाय मानक स्वास्थ्य संदर्भ श्रेणियों में प्रस्तुत करता है' },
      { icon: '🔥', title: 'कैलोरी और ऊर्जा आवश्यकता (TDEE)', desc: 'दैनिक गतिविधि स्तर के अनुसार बेसल मेटाबॉलिक रेट (BMR) और कुल ऊर्जा व्यय का सटीक अनुमान' },
      { icon: '🎯', title: 'दीर्घकालिक स्वास्थ्य रुझान', desc: 'एक दिन के उतार-चढ़ाव के बजाय दीर्घकालिक जीवनशैली सुधार और फिटनेस प्रगति पर केंद्रित' },
      { icon: '🛡️', title: 'पूर्ण बायोमेट्रिक गोपनीयता', desc: 'उम्र, वजन और ऊंचाई जैसी व्यक्तिगत जानकारी ब्राउज़र में ही रहती है, कहीं सेव नहीं होती' },
      { icon: '🩺', title: 'जागरूकता और परामर्श दायरा', desc: 'स्वास्थ्य जागरूकता मानकों और वास्तविक चिकित्सकीय परामर्श के बीच स्पष्ट अंतर बनाए रखता है' }
    ],
    es: [
      { icon: '🔬', title: 'Ecuaciones Fisiológicas Validadas', desc: 'Aplica fórmulas publicadas internacionalmente (Mifflin-St Jeor, OMS y referencias de los CDC)' },
      { icon: '⚖️', title: 'Clasificación Biométrica Objetiva', desc: 'Sitúa los valores en categorías de referencia clínica reconocidas sin calificaciones arbitrarias' },
      { icon: '🔥', title: 'Gasto Energético y Metabólico (TDEE)', desc: 'Calcula la Tasa Metabólica Basal (TMB) y el gasto calórico según el nivel de actividad física' },
      { icon: '🎯', title: 'Enfoque en Tendencias de Salud', desc: 'Ideal para seguir la evolución de hábitos saludables sin obsesionarse con cambios diarios' },
      { icon: '🛡️', title: 'Privacidad Biométrica Total', desc: 'Los datos de peso, edad y medidas se procesan en el navegador y nunca se almacenan' },
      { icon: '🩺', title: 'Ámbito Educativo y Preventivo', desc: 'Distingue claramente entre parámetros informativos y el diagnóstico clínico profesional' }
    ],
    fr: [
      { icon: '🔬', title: 'Équations Physiologiques Établies', desc: 'Utilise les formules reconnues (Mifflin-St Jeor, repères OMS et classifications médicales)' },
      { icon: '⚖️', title: 'Catégorisation Biométrique Claire', desc: 'Positionne vos indices dans des intervalles de référence cliniques rigoureusement définis' },
      { icon: '🔥', title: 'Métabolisme et Dépense Calorique', desc: 'Estime le Métabolisme de Base (MB) et la Dépense Énergétique Journalière (DEJ/TDEE)' },
      { icon: '🎯', title: 'Suivi de Tendance Long Terme', desc: 'Pensé pour observer la régularité des progrès sans se focaliser sur des variations isolées' },
      { icon: '🛡️', title: 'Confidentialité Santé Absolue', desc: 'Aucune donnée physiologique (poids, taille, âge) n’est transmise ni stockée sur serveur' },
      { icon: '🩺', title: 'Démarche Préventive et Éducative', desc: 'Rappelle la distinction essentielle entre indicateurs de bien-être et diagnostic médical' }
    ],
    de: [
      { icon: '🔬', title: 'Anerkannte klinische Formeln', desc: 'Basiert auf wissenschaftlichen Modellen (u. a. Mifflin-St Jeor, WHO- und CDC-Referenzen)' },
      { icon: '⚖️', title: 'Objektive Messwert-Kategorisierung', desc: 'Ordnet biometrische Werte in fundierte medizinische Referenzbereiche ein' },
      { icon: '🔥', title: 'Grundumsatz und Energiebedarf', desc: 'Ermittelt Grundumsatz (BMR) und Gesamtenergiebedarf (TDEE) je nach Aktivitätsniveau' },
      { icon: '🎯', title: 'Fokus auf langfristige Trends', desc: 'Unterstützt eine nachhaltige Lebensstilbegleitung abseits kurzzeitiger Tagesschwankungen' },
      { icon: '🛡️', title: 'Keine Speicherung persönlicher Daten', desc: 'Gewicht, Größe und Alter verbleiben rein lokal im Speicher Ihres Webbrowsers' },
      { icon: '🩺', title: 'Präventiver Informationscharakter', desc: 'Klare Trennung zwischen Orientierungswerten und ärztlicher Individualdiagnose' }
    ],
    it: [
      { icon: '🔬', title: 'Equazioni Fisiologiche Validate', desc: 'Adotta formule cliniche consolidate (tra cui Mifflin-St Jeor, OMS e standard internazionali)' },
      { icon: '⚖️', title: 'Inquadramento Biometrico Rigoroso', desc: 'Inserisce i valori rilevati in fasce di riferimento validate senza giudizi sommari' },
      { icon: '🔥', title: 'Metabolismo Basale e Fabbisogno (TDEE)', desc: 'Stima il Metabolismo Basale (BMR) e il dispendio calorico giornaliero per livello di attività' },
      { icon: '🎯', title: 'Monitoraggio di Trend nel Tempo', desc: 'Progettato per accompagnare uno stile di vita equilibrato valutando la continuità dei progressi' },
      { icon: '🛡️', title: 'Protezione Totale dei Dati Sensibili', desc: 'Parametri corporei, età e peso vengono calcolati solo in locale senza tracciamento alcuno' },
      { icon: '🩺', title: 'Finalità Divulgativa e di Benessere', desc: 'Evidenzia il valore orientativo delle stime rispetto a valutazioni mediche specialistiche' }
    ],
    pt: [
      { icon: '🔬', title: 'Equações Clínicas Reconhecidas', desc: 'Utiliza parâmetros consolidados (fórmulas de Mifflin-St Jeor, referências da OMS e CDC)' },
      { icon: '⚖️', title: 'Classificação Biométrica Objetiva', desc: 'Enquadra as medições em intervalos de referência fidedignos sem pontuações arbitrárias' },
      { icon: '🔥', title: 'Taxa Metabólica e Gasto Calórico (TDEE)', desc: 'Calcula a Taxa Metabólica Basal (TMB) e o gasto energético total diário conforme a rotina' },
      { icon: '🎯', title: 'Acompanhamento de Tendências', desc: 'Direcionado para a consistência de hábitos saudáveis ao invés de oscilações pontuais diárias' },
      { icon: '🛡️', title: 'Privacidade Biométrica no Navegador', desc: 'Dados corporais e medidas pessoais são processados em tempo real sem registo em servidores' },
      { icon: '🩺', title: 'Propósito Informativo e Preventivo', desc: 'Esclarece os limites de parâmetros de rastreio frente a diagnósticos clínicos individuais' }
    ],
    ja: [
      { icon: '🔬', title: '国際的に認知された生理学算式', desc: 'WHO基準やMifflin-St Jeor式など、査読論文で広く用いられる計算式を採用' },
      { icon: '⚖️', title: '標準的な健康指標カテゴリへの分類', desc: '恣意的な数値化ではなく、公的機関が定める臨床参照区分に測定値を正確にマッピング' },
      { icon: '🔥', title: '基礎代謝（BMR）と総消費エネルギー（TDEE）', desc: '身体活動レベルに応じた推定1日エネルギー必要量を多角的に試算' },
      { icon: '🎯', title: '日々の変動にとらわれない長期推移追跡', desc: '単日の体重増減に左右されず、中長期的な健康習慣の改善と進捗把握をサポート' },
      { icon: '🛡️', title: '端末内完結による厳格なデータ保護', desc: '体重、年齢、身長などの身体測定データは外部サーバーに送信・蓄積されません' },
      { icon: '🩺', title: 'ヘルスケア啓発と医療診断の明確な区分', desc: '本計算はセルフケアの目安であり、専門医による医療診断と厳密に区別して運用' }
    ],
    ko: [
      { icon: '🔬', title: '국제 공인 임상 영양학 공식 적용', desc: 'WHO 기준, CDC 지침 및 미플린-세인트 지어(Mifflin-St Jeor) 등 검증된 대사 수식 활용' },
      { icon: '⚖️', title: '체계적인 건강 참조 지표 분류', desc: '자의적인 점수 부여 대신 공인된 생체 지표 기준표에 맞춰 직관적인 건강 구간 제시' },
      { icon: '🔥', title: '기초대사량(BMR) 및 일일 총에너지소비량(TDEE)', desc: '일상 신체 활동 수준을 반영하여 하루에 필요한 실제 유지 칼로리와 영양 균형 예측' },
      { icon: '🎯', title: '단기 변동을 넘어선 지속적 추세 관리', desc: '일일 수분 변동에 일희일비하지 않고 장기적인 체력 관리 및 건강 습관 정착을 유도' },
      { icon: '🛡️', title: '민감 건강 정보의 로컬 처리 원칙', desc: '체중, 신장, 나이 등 사용자의 개인 건강 지표는 브라우저 메모리에서만 연산되고 즉시 소멸' },
      { icon: '🩺', title: '건강 증진 목적과 의료 진단의 경계 명시', desc: '단순 자가 점검 지표와 전문 의료진의 개별 임상 진단을 명확히 구별하여 안전성 확보' }
    ]
  },

  'image-tools': {
    en: [
      { icon: '🎨', title: 'HTML5 Canvas In-Browser Processing', desc: 'All image filtering, cropping, and resampling runs locally on your device via HTMLCanvasElement' },
      { icon: '🔒', title: 'Zero Cloud Uploads & Absolute Privacy', desc: 'Pixel buffers remain strictly in client RAM; private photos, IDs, and graphics never touch a server' },
      { icon: '📐', title: 'Lossless Coordinates & Aspect Ratios', desc: 'Preserves exact pixel matrices, color channel depth, and native aspect ratios during edits' },
      { icon: '⚡', title: 'Instant Real-Time Visual Feedback', desc: 'Inspect adjustments, compression savings, and color conversions live before downloading' },
      { icon: '🔄', title: 'Multi-Format Web Compatibility', desc: 'Seamlessly convert between modern WebP, lossless PNG, high-efficiency JPG, and vector SVG' },
      { icon: '💯', title: 'No Limits, Watermarks, or Quotas', desc: 'Process high-resolution graphics freely without subscription tiers, accounts, or file caps' }
    ],
    hi: [
      { icon: '🎨', title: '100% स्थानीय HTML5 कैनवास प्रोसेसिंग', desc: 'सभी फोटो क्रॉपिंग, रीसाइजिंग और फिल्टरिंग सीधे आपके ब्राउज़र में HTML5 कैनवास पर होती है' },
      { icon: '🔒', title: 'पूर्ण फोटो गोपनीयता (जीरो सर्वर अपलोड)', desc: 'आपकी निजी तस्वीरें, आईडी या संवेदनशील दस्तावेज कभी भी किसी बाहरी सर्वर पर नहीं जाते' },
      { icon: '📐', title: 'पिक्सेल शुद्धता और सटीक आस्पेक्ट रेशियो', desc: 'संपादन के दौरान मूल पिक्सेल स्पष्टता, रंग गहराई और फ्रेम अनुपात पूरी तरह सुरक्षित रहते हैं' },
      { icon: '⚡', title: 'लाइव रीयल-टाइम पूर्वावलोकन', desc: 'डाउनलोड करने से पहले फोटो की स्पष्टता, फाइल साइज की बचत और प्रभावों को तुरंत देखें' },
      { icon: '🔄', title: 'बहु-फॉर्मेट रूपांतरण सुविधा', desc: 'WebP, PNG, JPG और SVG फॉर्मेट्स के बीच आसानी से और तेजी से बदलाव करें' },
      { icon: '💯', title: 'बिना वॉटरमार्क या दैनिक सीमा', desc: 'असीमित उच्च-रिज़ॉल्यूशन फोटो प्रोसेस करें बिना किसी लोगो, खाते या शुल्क के' }
    ],
    es: [
      { icon: '🎨', title: 'Procesamiento Canvas HTML5 Local', desc: 'El recorte, reescalado y filtrado se ejecutan íntegramente en el lienzo del navegador' },
      { icon: '🔒', title: 'Privacidad Absoluta sin Subir Archivos', desc: 'Los mapas de píxeles quedan en la memoria local; sus fotos y documentos privados nunca viajan a servidores' },
      { icon: '📐', title: 'Conservación de Proporciones y Píxeles', desc: 'Mantiene la relación de aspecto, el muestreo cromático y la nitidez original sin deformaciones' },
      { icon: '⚡', title: 'Previsualización Instantánea en Vivo', desc: 'Compruebe el ahorro de espacio y la calidad visual en tiempo real antes de guardar' },
      { icon: '🔄', title: 'Compatibilidad Multiformato Web', desc: 'Conversión rápida y fluida entre formatos estándar: WebP, PNG, JPG y gráficos SVG' },
      { icon: '💯', title: 'Sin Marcas de Agua ni Límites de Uso', desc: 'Edite imágenes de alta definición de forma ilimitada sin registros ni suscripciones de pago' }
    ],
    fr: [
      { icon: '🎨', title: 'Traitement Local HTML5 Canvas', desc: 'Toutes les opérations de recadrage, redimensionnement et filtres s’exécutent dans le navigateur' },
      { icon: '🔒', title: 'Confidentialité Totale Sans Téléversement', desc: 'Vos visuels restent en mémoire locale ; aucune photo ni document confidentiel n’est envoyé sur serveur' },
      { icon: '📐', title: 'Préservation des Proportions et Couleurs', desc: 'Respect rigoureux des dimensions de pixels, des profils colorimétriques et des ratios d’origine' },
      { icon: '⚡', title: 'Aperçu Visuel Instantané', desc: 'Visualisez les gains de compression et le rendu exact en direct avant d’enregistrer le résultat' },
      { icon: '🔄', title: 'Compatibilité Multiformat Complète', desc: 'Passez facilement d’un format à l’autre : WebP optimisé, PNG sans perte, JPG léger et SVG vectoriel' },
      { icon: '💯', title: 'Sans Filigrane ni Restriction de Volume', desc: 'Optimisez vos visuels haute définition sans compte, sans inscription ni logo apposé' }
    ],
    de: [
      { icon: '🎨', title: 'Lokale HTML5-Canvas-Verarbeitung', desc: 'Zuschneiden, Skalieren und Farbfiltern laufen vollständig im lokalen Speicher Ihres Browsers' },
      { icon: '🔒', title: 'Absolute Privatsphäre ohne Server-Upload', desc: 'Bilddaten verlassen Ihr Gerät nicht – vertrauliche Fotos und Dokumente bleiben 100 % privat' },
      { icon: '📐', title: 'Exakte Pixel- und Seitenverhältnisse', desc: 'Schont die Bildschärfe und erhält das originale Seitenverhältnis ohne Verzerrungen' },
      { icon: '⚡', title: 'Echtzeit-Vorschau vor dem Download', desc: 'Prüfen Sie Speicherersparnis und visuelle Qualität unmittelbar vor dem Speichern' },
      { icon: '🔄', title: 'Breite Formatunterstützung für das Web', desc: 'Konvertiert flexibel zwischen modernen WebP-, verlustfreien PNG-, JPG- und SVG-Dateien' },
      { icon: '💯', title: 'Ohne Wasserzeichen oder Nutzungslimits', desc: 'Bearbeiten Sie hochauflösende Grafiken uneingeschränkt ohne kostenpflichtige Konten' }
    ],
    it: [
      { icon: '🎨', title: 'Elaborazione Locale su Canvas HTML5', desc: 'Ritagli, ridimensionamenti e conversioni cromatiche avvengono nel motore grafico del browser' },
      { icon: '🔒', title: 'Massima Riservatezza Senza Caricamenti', desc: 'I pixel restano nella memoria RAM locale: foto private e scansioni non transitano mai sui server' },
      { icon: '📐', title: 'Focalizzazione e Proporzioni Esatte', desc: 'Mantiene nitidezza, profondità di colore e rapporto d’aspetto originario senza alterazioni' },
      { icon: '⚡', title: 'Anteprima Visiva in Tempo Reale', desc: 'Verifica immediatamente la riduzione di peso e la resa finale prima di procedere al download' },
      { icon: '🔄', title: 'Compatibilità Formati Web Standard', desc: 'Converte con agilità tra i formati più diffusi: WebP, PNG senza perdita, JPG e vettori SVG' },
      { icon: '💯', title: 'Senza Watermark né Tetti di Utilizzo', desc: 'Strumenti grafici ad alta risoluzione senza loghi applicati, registrazioni o abbonamenti' }
    ],
    pt: [
      { icon: '🎨', title: 'Processamento Local Canvas HTML5', desc: 'Todas as ações de corte, redimensionamento e filtros ocorrem no próprio motor do navegador' },
      { icon: '🔒', title: 'Privacidade Total Sem Uploads', desc: 'Os dados permanecem na memória do dispositivo: fotos e documentos nunca são enviados a servidores' },
      { icon: '📐', title: 'Respeito às Proporções e Píxeis', desc: 'Preserva a definição original, a profundidade das cores e a proporção de ecrã sem distorções' },
      { icon: '⚡', title: 'Pré-visualização em Tempo Real', desc: 'Avalie a economia de espaço e a fidelidade gráfica instantaneamente antes de descarregar' },
      { icon: '🔄', title: 'Suporte Multiformato para a Web', desc: 'Alterne de forma rápida entre formatos populares: WebP moderno, PNG nítido, JPG e SVG' },
      { icon: '💯', title: 'Sem Marcas de Água ou Cotas Diárias', desc: 'Utilize utilitários gráficos de alta resolução livremente, sem registos ou versões pagas' }
    ],
    ja: [
      { icon: '🎨', title: 'HTML5 Canvasによる端末内高速描画', desc: '切り抜き、リサイズ、色調補正などの全処理がお手元のブラウザのCanvas上で完結' },
      { icon: '🔒', title: 'サーバー送信ゼロ・確実なプライバシー', desc: 'ピクセルデータはローカルメモリ内でのみ処理され、プライベートな写真が外部へ流出しません' },
      { icon: '📐', title: 'アスペクト比と精細度の忠実な保持', desc: '不自然な引き伸ばしを防ぎ、元の縦横比とピクセル座標系を維持したまま高品位に出力' },
      { icon: '⚡', title: 'リアルタイムの即時プレビュー確認', desc: '保存前に容量削減率やトリミング範囲、色彩変化の仕上がりを視覚的に即座に確認可能' },
      { icon: '🔄', title: 'Web標準フォーマットの相互変換', desc: '最新のWebP、可逆圧縮PNG、高効率JPG、ベクターSVG間でスムーズかつ劣化なく変換' },
      { icon: '💯', title: '透かしロゴ・利用回数制限なし', desc: '会員登録や課金プランなしで、高解像度の画像編集機能を何度でも無制限に利用可能' }
    ],
    ko: [
      { icon: '🎨', title: 'HTML5 Canvas 기반 브라우저 내 렌더링', desc: '자르기, 크기 조절, 색상 반전 등 모든 그래픽 처리가 외부 통신 없이 기기 내부에서 동작' },
      { icon: '🔒', title: '서버 업로드 없는 완벽한 개인정보 보호', desc: '이미지 원본 바이트가 외부 클라우드로 전송되지 않아 사생활 사진이나 신분증도 안심 가공' },
      { icon: '📐', title: '종횡비 및 픽셀 좌표계 정밀 보존', desc: '왜곡 없는 화면 비율 유지와 서브샘플링 제어를 통해 선명한 원본 해상도 품질 유지' },
      { icon: '⚡', title: '실시간 가공 미리보기 및 절감률 확인', desc: '다운로드 전에 용량 절감 폭과 화질 상태를 화면에서 즉시 비교 검토할 수 있는 워크벤치' },
      { icon: '🔄', title: '표준 웹 이미지 포맷 완벽 상호 호환', desc: '웹 표준 WebP, 무손실 PNG, 표준 JPG, 벡터 SVG 파일 간의 직관적이고 빠른 포맷 변환' },
      { icon: '💯', title: '워터마크 없는 무제한 무료 편집', desc: '이미지에 로고가 박히지 않으며 가입이나 결제 유도 없이 고화질 편집 기능을 자유롭게 활용' }
    ]
  },

  'pdf-tools': {
    en: [
      { icon: '📄', title: 'Client-Side Stream Manipulation', desc: 'Executes merging, splitting, rotation, and pagination locally via pdf-lib and PDF.js' },
      { icon: '🔒', title: 'Confidential Document Protection', desc: 'Contracts, tax records, and legal briefs never upload to remote servers or cloud storage' },
      { icon: '📐', title: 'Vector Typography & Geometry Intact', desc: 'Preserves crisp scalable font glyphs, vector curves, and bookmarks without raster blur' },
      { icon: '⚡', title: 'Instant In-Memory Assembly', desc: 'Compiles multi-page PDF binaries in milliseconds using browser ArrayBuffer streams' },
      { icon: '🧹', title: 'Stream Deflation & Cleanup', desc: 'Prunes redundant object dictionaries and compresses content streams for compact file sizes' },
      { icon: '🌐', title: 'ISO 32000 Reader Compatibility', desc: 'Produces standard PDF documents compliant with Adobe Acrobat, Apple Preview, and mobile apps' }
    ],
    hi: [
      { icon: '📄', title: 'क्लाइंट-साइड पीडीएफ स्ट्रीम प्रोसेसिंग', desc: 'मर्ज, स्प्लिट, रोटेट और पेज नंबरिंग सीधे pdf-lib द्वारा ब्राउज़र मेमोरी में संपन्न होती है' },
      { icon: '🔒', title: 'दस्तावेजों की पूर्ण गोपनीयता', desc: 'आपके गोपनीय अनुबंध, बैंक स्टेटमेंट और कानूनी दस्तावेज कभी भी सर्वर पर अपलोड नहीं होते' },
      { icon: '📐', title: 'वेक्टर टेक्स्ट और फॉन्ट की मूल गुणवत्ता', desc: 'बिना किसी धुंधलेपन के अक्षरों, फोंट और रेखाचित्रों की मूल गुणवत्ता 100% सुरक्षित रहती है' },
      { icon: '⚡', title: 'मिलीसेकंड में इन-मेमोरी निर्माण', desc: 'ब्राउज़र में सीधे ArrayBuffer के ज़रिये बड़ी फाइलों का निर्माण बिना नेटवर्क देरी के होता है' },
      { icon: '🧹', title: 'अनावश्यक डेटा की सफाई और संपीड़न', desc: 'अनावश्यक मेटाडेटा हटाकर और FlateDecode द्वारा फाइल के आकार को अनुकूलित करता है' },
      { icon: '🌐', title: 'मानक ISO 32000 अनुकूलता', desc: 'Adobe Acrobat, Apple Preview और सभी मोबाइल पीडीएफ रीडर में सुचारू रूप से खुलने योग्य' }
    ],
    es: [
      { icon: '📄', title: 'Manipulación de Flujos en Cliente', desc: 'Une, divide, gira y numera documentos localmente mediante pdf-lib y PDF.js' },
      { icon: '🔒', title: 'Máxima Seguridad en Documentos', desc: 'Contratos, extractos bancarios y expedientes nunca se transfieren a servidores externos' },
      { icon: '📐', title: 'Vectores y Tipografía Intactos', desc: 'Conserva el texto seleccionable, fuentes incrustadas y curvas vectoriales sin rasterizar' },
      { icon: '⚡', title: 'Compilación Rápida en Memoria', desc: 'Genera nuevos binarios PDF en milisegundos trabajando sobre flujos ArrayBuffer' },
      { icon: '🧹', title: 'Limpieza de Objetos Redundantes', desc: 'Elimina metadatos obsoletos y optimiza flujos con FlateDecode para reducir el peso' },
      { icon: '🌐', title: 'Compatibilidad ISO 32000 Estándar', desc: 'Documentos plenamente compatibles con Adobe Acrobat, Apple Preview y visores móviles' }
    ],
    fr: [
      { icon: '📄', title: 'Gestion de Flux PDF Côté Client', desc: 'Fusion, découpe, rotation et pagination traitées en mémoire via pdf-lib et PDF.js' },
      { icon: '🔒', title: 'Protection des Données Confidentielles', desc: 'Vos contrats, relevés et actes légaux ne transitent par aucun serveur distant' },
      { icon: '📐', title: 'Typographie et Vecteurs Préservés', desc: 'Conserve le texte sélectionnable et les tracés vectoriels sans pixellisation' },
      { icon: '⚡', title: 'Génération Instantanée en Mémoire', desc: 'Assemble vos documents PDF en quelques fractions de seconde via des buffers locaux' },
      { icon: '🧹', title: 'Allègement et Nettoyage des Flux', desc: 'Purge les objets orphelins et compresse les dictionnaires pour réduire la taille' },
      { icon: '🌐', title: 'Conformité Norme ISO 32000', desc: 'Fichiers compatibles avec tous les lecteurs : Adobe Acrobat, Aperçu Apple et smartphones' }
    ],
    de: [
      { icon: '📄', title: 'Lokale PDF-Stream-Verarbeitung', desc: 'Zusammenführen, Teilen, Drehen und Nummerieren läuft direkt über pdf-lib und PDF.js' },
      { icon: '🔒', title: 'Keine Weitergabe vertraulicher Akten', desc: 'Verträge, Kontoauszüge und Steuerunterlagen verlassen niemals Ihren Rechner' },
      { icon: '📐', title: 'Vollständiger Erhalt von Vektortexten', desc: 'Keine Rasterverluste: Schriften, Tabellen und Vektoren bleiben gestochen scharf' },
      { icon: '⚡', title: 'Sekundenschnelle Montage im RAM', desc: 'Erstellt neue PDF-Binärdateien direkt im Browser ohne zeitraubende Upload-Wartezeiten' },
      { icon: '🧹', title: 'Objektbereinigung & Kompaktierung', desc: 'Entfernt redundante Wörterbucheinträge und deflatiert Streams für schlanke Dateien' },
      { icon: '🌐', title: 'Standardkonform nach ISO 32000', desc: 'Einwandfrei zu öffnen in Adobe Acrobat, Apple Vorschau und mobilen PDF-Readern' }
    ],
    it: [
      { icon: '📄', title: 'Gestione Flussi PDF Lato Client', desc: 'Unione, divisione, rotazione e numerazione eseguite in locale con pdf-lib e PDF.js' },
      { icon: '🔒', title: 'Protezione di Contratti e Documenti', desc: 'Atti legali, buste paga e documenti riservati non vengono mai caricati su server terzi' },
      { icon: '📐', title: 'Preservazione di Font e Vettori', desc: 'Testo pienamente selezionabile e grafica vettoriale intatta senza sfocature' },
      { icon: '⚡', title: 'Composizione Immediata in Memoria', desc: 'Genera file PDF complessi in pochi millisecondi operando direttamente sui flussi binari' },
      { icon: '🧹', title: 'Ottimizzazione e Pulizia Strutturale', desc: 'Rimuove metadati superflui e ricompatta i dizionari per diminuire il peso del file' },
      { icon: '🌐', title: 'Piena Conformità Standard ISO 32000', desc: 'Documenti leggibili su qualsiasi piattaforma: Adobe Reader, Apple Anteprima e dispositivi mobili' }
    ],
    pt: [
      { icon: '📄', title: 'Manipulação de Fluxos no Navegador', desc: 'Junte, divida, rode e numere páginas localmente com recurso a pdf-lib e PDF.js' },
      { icon: '🔒', title: 'Sigilo Absoluto de Documentos', desc: 'Contratos, relatórios financeiros e certidões nunca são enviados para a nuvem' },
      { icon: '📐', title: 'Integridade Vetorial e de Fontes', desc: 'Mantém o texto pesquisável e as linhas vetoriais perfeitas sem rasterização' },
      { icon: '⚡', title: 'Montagem Ultrarrápida em Memória', desc: 'Produz ficheiros PDF consolidados em frações de segundo através de ArrayBuffers locais' },
      { icon: '🧹', title: 'Otimização e Limpeza Estrutural', desc: 'Descarta objetos órfãos e comprime fluxos de conteúdo para gerar arquivos leves' },
      { icon: '🌐', title: 'Compatibilidade com Padrão ISO 32000', desc: 'Arquivos 100% compatíveis com Adobe Acrobat, Apple Preview e leitores móveis' }
    ],
    ja: [
      { icon: '📄', title: 'ブラウザ内ストリーム直接操作', desc: 'pdf-libおよびPDF.jsにより、ページの結合・分割・回転・ノンブル採番をローカル実行' },
      { icon: '🔒', title: '機密文書・契約書の完全保護', desc: '重要契約書、確定申告書、明細データが外部サーバーへ送信されることは一切ありません' },
      { icon: '📐', title: 'ベクターフォントと解像度の維持', desc: 'ビットマップ化による劣化を起こさず、検索可能なテキスト情報と輪郭ベクターを保持' },
      { icon: '⚡', title: 'インメモリでのミリ秒単位の高速処理', desc: 'ブラウザのArrayBufferバイナリ上で直接ページツリーを組み替え、即座に出力' },
      { icon: '🧹', title: '冗長オブジェクト除去とストリーム圧縮', desc: '不要な未参照辞書やメタデータを整理し、FlateDecodeによる軽量なPDFを再構築' },
      { icon: '🌐', title: '国際規格ISO 32000完全準拠', desc: 'Adobe Acrobat Reader、Mac Preview、各種スマートフォン環境で確実に閲覧可能' }
    ],
    ko: [
      { icon: '📄', title: '브라우저 내 PDF 스트림 직접 제어', desc: 'pdf-lib 및 PDF.js를 통해 페이지 병합, 분할, 회전, 번호 삽입을 로컬 메모리에서 즉시 처리' },
      { icon: '🔒', title: '기밀 계약서 및 금융 문서 원천 보호', desc: '비밀유지계약서, 금융 거래 내역서, 공문서가 외부 원격 서버로 전송되지 않아 유출 방지' },
      { icon: '📐', title: '벡터 서체 및 폰트 레이아웃 무손실 보존', desc: '이미지 래스터화로 인한 글자 번짐 없이 텍스트 검색 가능성과 선명한 벡터 곡선 유지' },
      { icon: '⚡', title: '네트워크 지연 없는 인메모리 고속 조립', desc: 'ArrayBuffer 바이너리 구조를 직접 재배열하여 수 밀리초 만에 새로운 PDF 파일 생성' },
      { icon: '🧹', title: '중복 객체 정리 및 스트림 최적화', desc: '고립된 불필요 메타데이터를 제거하고 FlateDecode 압축을 적용하여 파일 용량 다이어트' },
      { icon: '🌐', title: '국제 표준 ISO 32000 완벽 호환', desc: 'Adobe Acrobat, Apple 미리보기, 스마트폰 기본 뷰어에서 오류 없이 열람 가능한 표준 PDF' }
    ]
  },

  'compiler-tools': {
    en: [
      { icon: '⚡', title: 'Zero-Install Code Execution', desc: 'Run scripts and test syntax immediately without installing local compilers, runtimes, or IDEs' },
      { icon: '🛡️', title: 'Sandboxed In-Browser Runtime', desc: 'Executes safely via client-side WebAssembly (such as Pyodide for Python) or isolated execution contexts' },
      { icon: '💻', title: 'Interactive Standard I/O', desc: 'Full support for standard input prompts and real-time terminal stdout/stderr stream rendering' },
      { icon: '📚', title: 'Algorithm Practice & Templates', desc: 'Pre-loaded starter templates for mathematical algorithms, sorting, and core syntax fundamentals' },
      { icon: '🔒', title: 'Local Execution Privacy', desc: 'Your code snippets, algorithms, and test data execute on your machine and are never logged on our servers' },
      { icon: '💾', title: 'One-Click Source Export', desc: 'Download clean, runnable source code files directly to your machine for offline development' }
    ],
    hi: [
      { icon: '⚡', title: 'बिना सॉफ्टवेयर स्थापना के कोडिंग', desc: 'कंपाइलर या भारी आईडीई स्थापित किए बिना ब्राउज़र में तुरंत कोड चलाएं और सिंटैक्स जांचें' },
      { icon: '🛡️', title: 'सैंडबॉक्स्ड सुरक्षित रनटाइम', desc: 'क्लाइंट-साइड वेब-असेंबली (जैसे Python के लिए Pyodide) या सुरक्षित वातावरण में निष्पादन' },
      { icon: '💻', title: 'इंटरैक्टिव टर्मिनल और इनपुट', desc: 'मानक इनपुट (stdin) और रीयल-टाइम आउटपुट (stdout/stderr) के लिए स्पष्ट टर्मिनल डिस्प्ले' },
      { icon: '📚', title: 'एल्गोरिदम अभ्यास और कोड टेम्पलेट्स', desc: 'शुरुआती कोडिंग, गणितीय एल्गोरिदम और सिंटैक्स सीखने के लिए उपयोगी पूर्व-निर्मित टेम्पलेट्स' },
      { icon: '🔒', title: 'कोड की पूर्ण स्थानीय गोपनीयता', desc: 'आपका कोड और डेटा आपके डिवाइस पर ही चलता है, सर्वर पर कोई कोड स्टोर या ट्रैक नहीं होता' },
      { icon: '💾', title: 'एक-क्लिक में सोर्स कोड डाउनलोड', desc: 'अपने लिखे हुए कोड को सीधे फाइल के रूप में अपने कंप्यूटर या फोन पर सुरक्षित सेव करें' }
    ],
    es: [
      { icon: '⚡', title: 'Ejecución sin Instalaciones Locales', desc: 'Pruebe algoritmos y sintaxis al instante sin configurar compiladores ni entornos pesados' },
      { icon: '🛡️', title: 'Entorno Aislado (Sandbox) en Navegador', desc: 'Ejecución segura mediante WebAssembly (Pyodide para Python) o contextos aislados' },
      { icon: '💻', title: 'Entrada y Salida Estándar Interactiva', desc: 'Soporte completo para entradas stdin y visualización en tiempo real de salidas stdout y stderr' },
      { icon: '📚', title: 'Práctica de Algoritmos y Plantillas', desc: 'Plantillas de código iniciales para repasar estructuras de datos, matemáticas y algoritmos' },
      { icon: '🔒', title: 'Privacidad Absoluta del Código', desc: 'Sus fragmentos y pruebas se ejecutan localmente sin quedar registrados en servidores externos' },
      { icon: '💾', title: 'Descarga Directa de Archivos Fuente', desc: 'Guarde su código fuente con un solo clic para continuar su desarrollo en local' }
    ],
    fr: [
      { icon: '⚡', title: 'Exécution Immédiate Sans Installation', desc: 'Testez la syntaxe et vos algorithmes sans installer de compilateur ni d’environnement lourd' },
      { icon: '🛡️', title: 'Bac à Sable (Sandbox) Sécurisé', desc: 'Exécution locale via WebAssembly (Pyodide pour Python) ou contextes sécurisés dans le navigateur' },
      { icon: '💻', title: 'Flux d’Entrée et Sortie Interactifs', desc: 'Gestion des entrées clavier (stdin) et rendu en direct de la console terminal (stdout/stderr)' },
      { icon: '📚', title: 'Apprentissage et Modèles Inclus', desc: 'Modèles de démarrage pour pratiquer l’algorithmique et maîtriser les structures fondamentales' },
      { icon: '🔒', title: 'Confidentialité Totale des Scripts', desc: 'Vos programmes s’exécutent sur votre machine et ne sont jamais enregistrés sur nos serveurs' },
      { icon: '💾', title: 'Exportation Facile du Code Source', desc: 'Téléchargez vos scripts en un clic pour les intégrer à vos projets hors ligne' }
    ],
    de: [
      { icon: '⚡', title: 'Sofortige Code-Ausführung ohne Setup', desc: 'Syntax und Algorithmen direkt testen, ohne lokale Compiler oder IDEs installieren zu müssen' },
      { icon: '🛡️', title: 'Sichere In-Browser-Sandbox', desc: 'Läuft isoliert über WebAssembly (wie Pyodide für Python) oder geschützte Ausführungskontexte' },
      { icon: '💻', title: 'Interaktive Terminal-Ein-/Ausgabe', desc: 'Unterstützt stdin-Benutzereingaben und zeigt Terminalausgaben (stdout/stderr) in Echtzeit' },
      { icon: '📚', title: 'Praxisnahe Vorlagen & Lernhilfen', desc: 'Integrierte Codebeispiele für mathematische Algorithmen, Datenstrukturen und Schleifen' },
      { icon: '🔒', title: 'Volle Privatsphäre für Ihren Code', desc: 'Ihre Programme laufen rein lokal auf Ihrem Rechner und werden auf keinem Server geloggt' },
      { icon: '💾', title: 'Quellcode-Download mit einem Klick', desc: 'Speichern Sie Ihre Skripte als fertige Quelldateien direkt für die Weiterarbeit lokal ab' }
    ],
    it: [
      { icon: '⚡', title: 'Esecuzione Codice Senza Installazione', desc: 'Testa sintassi e algoritmi all’istante senza configurare compilatori complessi o ambienti pesanti' },
      { icon: '🛡️', title: 'Sandbox Protetta nel Browser', desc: 'Funziona in sicurezza tramite WebAssembly (Pyodide per Python) o contesti isolati client-side' },
      { icon: '💻', title: 'Terminale Interattivo con I/O Standard', desc: 'Supporto per input dell’utente (stdin) e visualizzazione immediata di stdout e messaggi di errore' },
      { icon: '📚', title: 'Esercizi e Modelli Algoritmici', desc: 'Template pronti per lo studio di logica, iterazioni, funzioni e strutture dati fondamentali' },
      { icon: '🔒', title: 'Riservatezza Totale del Codice', desc: 'I tuoi algoritmi vengono elaborati sul dispositivo e non vengono mai salvati su server esterni' },
      { icon: '💾', title: 'Esportazione del Sorgente con 1 Click', desc: 'Scarica i file sorgente direttamente sul tuo computer per proseguire lo sviluppo offline' }
    ],
    pt: [
      { icon: '⚡', title: 'Execução Imediata Sem Instalações', desc: 'Teste códigos e algoritmos diretamente no navegador sem instalar compiladores ou ambientes' },
      { icon: '🛡️', title: 'Ambiente Sandbox Seguro no Navegador', desc: 'Execução isolada por WebAssembly (como Pyodide para Python) ou contextos seguros' },
      { icon: '💻', title: 'Terminal Interativo com I/O Padrão', desc: 'Suporte a entradas stdin e exibição em tempo real de saídas de texto stdout e mensagens de erro' },
      { icon: '📚', title: 'Modelos Iniciais e Prática de Algoritmos', desc: 'Exemplos prontos para treinar laços, ordenação, matemática computacional e sintaxe' },
      { icon: '🔒', title: 'Privacidade Absoluta para os Seus Códigos', desc: 'Seus algoritmos rodam localmente na máquina e nunca são armazenados em servidores remotos' },
      { icon: '💾', title: 'Download Direto do Código-Fonte', desc: 'Guarde seus scripts no computador com apenas um clique para uso em projetos locais' }
    ],
    ja: [
      { icon: '⚡', title: '環境構築不要の即時コード実行', desc: 'コンパイラや重厚な開発環境を導入することなく、ブラウザ上で文法やロジックを即座に検証' },
      { icon: '🛡️', title: 'WebAssemblyによる安全なサンドボックス', desc: 'Pyodide等のクライアント側Wasm技術や隔離フレームにより、安全かつ高速にコードを解釈' },
      { icon: '💻', title: '対話的標準入出力（I/O）対応', desc: 'キーボード入力（stdin）の受け渡しと、リアルタイムの標準出力・エラー出力描画を完備' },
      { icon: '📚', title: 'アルゴリズム学習と初期テンプレート', desc: 'ソート処理、数学的計算、制御構文の学習に役立つ実践的なサンプルコードを多数内包' },
      { icon: '🔒', title: 'ソースコードの端末内秘匿性', desc: '書いたプログラムは手元のブラウザ内でのみ実行され、外部サーバーに記録・送信されません' },
      { icon: '💾', title: 'ワンクリックでのソースファイル保存', desc: '作成したコードはローカルファイルとして即座にダウンロード可能で、オフライン開発へ直結' }
    ],
    ko: [
      { icon: '⚡', title: '별도 설치 없는 즉각적인 코드 실행', desc: '복잡한 컴파일러나 무거운 개발 툴을 깔지 않고도 브라우저에서 즉시 문법 검증 및 알고리즘 실행' },
      { icon: '🛡️', title: 'WebAssembly 기반 안전 샌드박스', desc: 'Python의 Pyodide 등 클라이언트 WebAssembly 및 안전한 격리 환경에서 외부 위협 없이 안전 구동' },
      { icon: '💻', title: '대화형 표준 입출력(I/O) 지원', desc: '사용자 키보드 입력(stdin) 프롬프트와 실시간 콘솔 출력(stdout/stderr) 스트림 완벽 렌더링' },
      { icon: '📚', title: '알고리즘 연습용 스타터 템플릿', desc: '피보나치, 정렬 알고리즘, 리스트 처리 등 기초 문법과 알고리즘 테스트를 돕는 사전 예제 제공' },
      { icon: '🔒', title: '작성 코드의 완벽한 로컬 보안', desc: '사용자가 입력한 소스 코드와 데이터는 사용자 PC 메모리에서만 동작하며 서버에 일절 기록되지 않음' },
      { icon: '💾', title: '원클릭 소스 코드 파일 다운로드', desc: '브라우저에서 작성하고 디버깅한 코드를 즉시 소스 파일 형태로 저장하여 오프라인 작업과 연계' }
    ]
  },

  'time-table-tools': {
    en: [
      { icon: '📅', title: 'Visual Grid Time-Blocking', desc: 'Map hourly and half-hourly commitments across 5-day or 7-day responsive timetable grids' },
      { icon: '🎨', title: 'Custom Categorical Color Tags', desc: 'Assign vibrant colors to lectures, work shifts, fitness sessions, and study blocks for clarity' },
      { icon: '⚖️', title: 'Conflict & Double-Booking Prevention', desc: 'Visual timeline layout highlights overlapping commitments and unbalanced scheduling loads' },
      { icon: '💾', title: 'Persistent Local Storage', desc: 'Schedules automatically persist in your browser’s localStorage across visits without accounts' },
      { icon: '🖨️', title: 'High-Resolution Print Stylesheet', desc: 'Specialized @media print CSS formats your schedule perfectly onto landscape or portrait A4 sheets' },
      { icon: '🔄', title: 'Sustainable Routine Balancing', desc: 'Easily adjust temporal blocks to balance intensive productivity with restorative personal rest' }
    ],
    hi: [
      { icon: '📅', title: 'विजुअल ग्रिड टाइम-ब्लॉकिंग', desc: '5-दिवसीय या 7-दिवसीय रिस्पॉन्सिव ग्रिड पर घंटों और मिनटों के अनुसार अपनी दिनचर्या व्यवस्थित करें' },
      { icon: '🎨', title: 'रंग-कोडित गतिविधि श्रेणियां', desc: 'पढ़ाई, काम, व्यायाम और आराम के लिए अलग-अलग रंग सेट करें ताकि शेड्यूल एक नज़र में समझ आए' },
      { icon: '⚖️', title: 'समय टकराव और ओवरलैपिंग की पहचान', desc: 'विजुअल टाइमलाइन तुरंत दिखाती है कि कहीं दो जरूरी काम एक ही समय पर तो नहीं टकरा रहे हैं' },
      { icon: '💾', title: 'ब्राउज़र में स्वतः सुरक्षित (localStorage)', desc: 'आपका टाइमटेबल बिना किसी लॉगिन के आपके ब्राउज़र में सुरक्षित रहता है और अगली बार वहीं मिलता है' },
      { icon: '🖨️', title: 'A4 प्रिंटिंग के लिए विशेष लेआउट', desc: 'दीवार, स्टडी टेबल या फ़ोल्डर पर लगाने के लिए साफ-सुथरा A4 शीट प्रिंट लेआउट' },
      { icon: '🔄', title: 'संतुलित जीवनशैली और दिनचर्या', desc: 'कठिन कार्य घंटों के साथ पर्याप्त विश्राम और निजी समय का उचित संतुलन बनाएं' }
    ],
    es: [
      { icon: '📅', title: 'Bloques de Tiempo en Cuadrícula Visual', desc: 'Organice actividades en intervalos de 30 o 60 minutos en formatos de 5 o 7 días' },
      { icon: '🎨', title: 'Código de Colores por Categoría', desc: 'Asigne etiquetas de color a clases, turnos de trabajo, ejercicio y tiempo de ocio' },
      { icon: '⚖️', title: 'Prevención de Conflictos de Horario', desc: 'Identifique visualmente solapamientos y desequilibrios en la carga horaria semanal' },
      { icon: '💾', title: 'Guardado Automático Local (localStorage)', desc: 'Sus horarios se conservan en su navegador sin requerir creación de cuentas' },
      { icon: '🖨️', title: 'Formato de Impresión A4 de Alta Calidad', desc: 'Hojas de estilo optimizadas para imprimir en papel A4 vertical u horizontal sin cortes' },
      { icon: '🔄', title: 'Equilibrio de Rutinas Sostenibles', desc: 'Ajuste bloques fácilmente para balancear productividad exigente y descanso reparador' }
    ],
    fr: [
      { icon: '📅', title: 'Organisation Visuelle par Blocs Horaires', desc: 'Structurez vos journées sur 5 ou 7 jours par tranches d’une heure ou de 30 minutes' },
      { icon: '🎨', title: 'Codage Couleur Thématique Intuitif', desc: 'Attribuez des couleurs distinctes aux cours, au travail, au sport et aux moments de détente' },
      { icon: '⚖️', title: 'Prévention des Chevauchements', desc: 'Détectez immédiatement les conflits d’horaires et les surcharges de planning' },
      { icon: '💾', title: 'Sauvegarde Locale Permanente (localStorage)', desc: 'Votre emploi du temps reste mémorisé sur votre appareil sans compte requis' },
      { icon: '🖨️', title: 'Impression A4 Optimisée', desc: 'Feuille de style print dédiée pour des impressions nettes prêtes à afficher' },
      { icon: '🔄', title: 'Équilibre de Vie Respecté', desc: 'Ajustez facilement vos blocs pour concilier rigueur professionnelle et temps personnel' }
    ],
    de: [
      { icon: '📅', title: 'Visuelles Zeitblock-Raster', desc: 'Planen Sie Termine in 30- oder 60-Minuten-Schritten übersichtlich für 5 oder 7 Tage' },
      { icon: '🎨', title: 'Farbcodierte Kategorien', desc: 'Ordnen Sie Vorlesungen, Arbeitsschichten, Sport und Erholung individuelle Farben zu' },
      { icon: '⚖️', title: 'Vermeidung von Terminüberschneidungen', desc: 'Deckt zeitliche Konflikte und Überlastungen im Wochenplan optisch sofort auf' },
      { icon: '💾', title: 'Automatische Browser-Speicherung', desc: 'Pläne bleiben lokal im Browser (localStorage) ohne Registrierung dauerhaft erhalten' },
      { icon: '🖨️', title: 'Druckoptimiertes A4-Layout', desc: 'Druck-CSS skaliert Spalten passgenau auf A4-Blätter für Pinnwand oder Arbeitsplatz' },
      { icon: '🔄', title: 'Nachhaltige Tagesstruktur', desc: 'Ermöglicht die harmonische Balance zwischen konzentrierter Arbeit und Pausenzeiten' }
    ],
    it: [
      { icon: '📅', title: 'Blocchi Temporali su Griglia Visiva', desc: 'Organizza gli impegni a intervalli di 30 o 60 minuti su prospetti da 5 o 7 giorni' },
      { icon: '🎨', title: 'Etichette Cromatiche per Attività', desc: 'Assegna tonalità distinte a studio, turni di lavoro, allenamento e riposo' },
      { icon: '⚖️', title: 'Rilevamento Sovrapposizioni e Conflitti', desc: 'Evidenzia a colpo d’occhio coincidenze di orario e carichi di lavoro eccessivi' },
      { icon: '💾', title: 'Salvataggio Locale Istantaneo (localStorage)', desc: 'La tabella rimane memorizzata nel browser senza dover creare un account' },
      { icon: '🖨️', title: 'Layout di Stampa A4 ad Alta Definizione', desc: 'Regole @media print per ottenere stampe cartacee ordinate per bacheche e cartelline' },
      { icon: '🔄', title: 'Gestione Armonica delle Routine', desc: 'Modifica i blocchi con semplicità per conciliare impegni operativi e rigenerazione' }
    ],
    pt: [
      { icon: '📅', title: 'Planeamento Visual em Blocos de Tempo', desc: 'Distribua compromissos em intervalos de 30 ou 60 minutos em grades de 5 ou 7 dias' },
      { icon: '🎨', title: 'Identificação por Cores Categóricas', desc: 'Defina cores para aulas, turnos de trabalho, treinos e períodos de descanso' },
      { icon: '⚖️', title: 'Prevenção de Conflitos de Agenda', desc: 'Visualize sobreposições e sobrecargas de tarefas para manter a semana equilibrada' },
      { icon: '💾', title: 'Armazenamento Local Persistente', desc: 'Seus dados ficam gravados no localStorage do navegador sem exigência de conta' },
      { icon: '🖨️', title: 'Folha de Impressão A4 Otimizada', desc: 'Folhas de estilo dedicadas para impressão limpa e sem cortes em papel A4' },
      { icon: '🔄', title: 'Equilíbrio e Sustentabilidade da Rotina', desc: 'Reorganize blocos com agilidade para harmonizar produtividade e descanso' }
    ],
    ja: [
      { icon: '📅', title: '視覚的グリッドによる時間ブロッキング', desc: '5日間または7日間表示で、30分・1時間刻みのスケジュールを直感的に配置' },
      { icon: '🎨', title: '目的別のカラーコーディング分類', desc: '講義、勤務シフト、勉強、ワークアウト、余暇を色分けして一目で把握' },
      { icon: '⚖️', title: '予定の重複や過密スケジュールの防止', desc: 'タイムラインの可視化により、予定のバッティングや偏りを事前に発見して調整' },
      { icon: '💾', title: 'ローカルストレージ自動保存（localStorage）', desc: 'アカウント登録不要で、作成した時間割はお手元のブラウザに自動で安全保存' },
      { icon: '🖨️', title: 'A4用紙に最適化された高精細印刷CSS', desc: '専用の@media print設定により、用紙枠内に収まる美しいレイアウトで印刷可能' },
      { icon: '🔄', title: '持続可能な生活リズムの確立', desc: '集中作業時間と休息時間をバランス良く配分し、無理のない習慣化を支援' }
    ],
    ko: [
      { icon: '📅', title: '시각적 타임 블록 그리드 스케줄링', desc: '30분 및 1시간 단위로 5일제 또는 7일제 반응형 그리드에 일정을 직관적으로 배치' },
      { icon: '🎨', title: '활동 범주별 맞춤 컬러 태깅', desc: '강의, 근무 교대, 운동, 개인 학습 등에 고유 색상을 지정하여 일정 가독성 극대화' },
      { icon: '⚖️', title: '일정 중복 및 과밀 시간대 시각적 방지', desc: '시간대별 블록을 통해 일정이 겹치거나 특정 요일에 업무가 쏠리는 현상을 사전 차단' },
      { icon: '💾', title: '브라우저 로컬 저장소(localStorage) 자동 보존', desc: '로그인이나 가입 절차 없이 기기 브라우저에 시간표가 안전하게 자동 저장되어 재방문 시 복원' },
      { icon: '🖨️', title: 'A4 규격 용지 맞춤 고해상도 인쇄 지원', desc: '전용 인쇄 스타일시트(@media print)를 통해 A4 가로/세로 용지에 여백 잘림 없이 완벽 출력' },
      { icon: '🔄', title: '지속 가능한 루틴 밸런스 유지', desc: '생산적인 집중 시간과 충분한 휴식 주기를 자유롭게 조율하여 안정적인 일상 유지' }
    ]
  },

  math: {
    en: [
      { icon: '📐', title: 'Step-by-Step Algebraic Logic', desc: 'Deconstructs complex calculations into clear, verified mathematical stages' },
      { icon: '🎯', title: 'Verified Standard Formulations', desc: 'Built strictly on published algebraic, geometric, and trigonometric equations' },
      { icon: '🔢', title: 'High-Precision Floating-Point Control', desc: 'Maintains exact precision while avoiding erratic floating-point rounding errors' },
      { icon: '⚠️', title: 'Explicit Edge-Case Handling', desc: 'Detects undefined mathematical states such as division by zero or negative radicands' },
      { icon: '🔄', title: 'Rapid Parametric Re-computation', desc: 'Instantly modify numerical coefficients to explore functions and comparative outcomes' },
      { icon: '🎓', title: 'Educational & Technical Utility', desc: 'Ideal for students, educators, engineers, and quantitative professionals' }
    ],
    hi: [
      { icon: '📐', title: 'चरण-दर-चरण बीजगणितीय विधि', desc: 'जटिल गणितीय समस्याओं को स्पष्ट और समझने योग्य चरणों में हल करता है' },
      { icon: '🎯', title: 'प्रमाणित मानक गणितीय सूत्र', desc: 'सत्यापित बीजगणित, ज्यामिति और त्रिकोणमिति सिद्धांतों पर पूरी तरह आधारित' },
      { icon: '🔢', title: 'उच्च दशमलव परिशुद्धता', desc: 'दशमलव और फ्लोटिंग-पॉइंट गणनाओं में सटीकता सुनिश्चित करता है' },
      { icon: '⚠️', title: 'गणितीय सीमाओं और अपवादों की पहचान', desc: 'शून्य से विभाजन या अपरिभाषित स्थितियों को स्पष्ट रूप से इंगित करता है' },
      { icon: '🔄', title: 'मान बदलकर त्वरित तुलना', desc: 'संख्याओं को तुरंत बदलकर विभिन्न समीकरणों और परिणामों का अध्ययन करें' },
      { icon: '🎓', title: 'विद्यार्थियों और शिक्षकों के लिए उपयोगी', desc: 'अकादमिक अध्ययन, इंजीनियरिंग और प्रतियोगी परीक्षाओं की तैयारी के लिए आदर्श' }
    ],
    es: [
      { icon: '📐', title: 'Lógica Algebraica Paso a Paso', desc: 'Desglosa operaciones complejas en secuencias matemáticas claras y ordenadas' },
      { icon: '🎯', title: 'Fórmulas Matemáticas Verificadas', desc: 'Basado estrictamente en principios universales de álgebra, geometría y cálculo' },
      { icon: '🔢', title: 'Control Riguroso de Precisión Decimal', desc: 'Garantiza exactitud numérica previniendo errores de redondeo de punto flotante' },
      { icon: '⚠️', title: 'Detección de Casos Indefinidos', desc: 'Avisa con claridad ante divisiones entre cero, raíces negativas u operaciones inválidas' },
      { icon: '🔄', title: 'Recálculo Paramétrico Instantáneo', desc: 'Ajuste coeficientes y constantes para comparar distintos supuestos al instante' },
      { icon: '🎓', title: 'Apoyo Docente y Científico', desc: 'Excelente herramienta de consulta para estudiantes, profesores e ingenieros' }
    ],
    fr: [
      { icon: '📐', title: 'Démonstration Algébrique Étape par Étape', desc: 'Décompose les calculs complexes en étapes logiques et transparentes' },
      { icon: '🎯', title: 'Formulations Mathématiques Validées', desc: 'Fondé sur les équations reconnues d’algèbre, de trigonométrie et de géométrie' },
      { icon: '🔢', title: 'Haute Précision des Nombres Décimaux', desc: 'Minimise les biais d’arrondi en virgule flottante pour des résultats fiables' },
      { icon: '⚠️', title: 'Gestion Explicite des Cas Limites', desc: 'Signale immédiatement les indéterminations, telles que les divisions par zéro' },
      { icon: '🔄', title: 'Exploration Paramétrique en Direct', desc: 'Modifiez les variables pour analyser immédiatement les variations du modèle' },
      { icon: '🎓', title: 'Ressource Pédagogique et Technique', desc: 'Idéal pour l’apprentissage scolaire, l’enseignement et l’ingénierie' }
    ],
    de: [
      { icon: '📐', title: 'Schrittweise algebraische Lösung', desc: 'Zerlegt anspruchsvolle Rechengänge in nachvollziehbare Teilschritte' },
      { icon: '🎯', title: 'Verifizierte mathematische Grundlagen', desc: 'Strikte Anwendung bewährter Gleichungen aus Algebra, Geometrie und Analysis' },
      { icon: '🔢', title: 'Präzise Gleitkomma-Genauigkeit', desc: 'Verhindert Rundungsfehler und liefert exakte numerische Ergebnisse' },
      { icon: '⚠️', title: 'Erkennung mathematischer Grenzfälle', desc: 'Weist zuverlässig auf undefinierte Zustände wie Division durch Null hin' },
      { icon: '🔄', title: 'Schnelle Parameteranpassung', desc: 'Eingabewerte beliebig variieren, um funktionale Zusammenhänge zu verstehen' },
      { icon: '🎓', title: 'Fundierte Unterstützung für Studium & Beruf', desc: 'Optimale Rechenhilfe für Schüler, Studierende, Lehrkräfte und Ingenieure' }
    ],
    it: [
      { icon: '📐', title: 'Procedimento Algebrico Passo dopo Passo', desc: 'Scompone calcoli articolati in passaggi logici chiari e verificabili' },
      { icon: '🎯', title: 'Formulazioni Matematiche Verificate', desc: 'Basato su equazioni riconosciute di algebra, geometria e trigonometria' },
      { icon: '🔢', title: 'Elevata Accuratezza dei Decimali', desc: 'Controlla con rigore gli arrotondamenti per garantire la massima esattezza' },
      { icon: '⚠️', title: 'Riconoscimento di Casi Indeterminati', desc: 'Identifica condizioni non definite come divisioni per zero o radici impossibili' },
      { icon: '🔄', title: 'Simulazione Parametrica Istantanea', desc: 'Modifica i coefficienti per osservare in tempo reale l’evoluzione del risultato' },
      { icon: '🎓', title: 'Strumento per Studio e Professione', desc: 'Supporto ideale per studenti, docenti, tecnici e ricercatori scientifici' }
    ],
    pt: [
      { icon: '📐', title: 'Raciocínio Algébrico Passo a Passo', desc: 'Desdobra cálculos complexos em fases de resolução claras e demonstráveis' },
      { icon: '🎯', title: 'Princípios Matemáticos Universais', desc: 'Construído rigorosamente sobre equações de álgebra, geometria e trigonometria' },
      { icon: '🔢', title: 'Controle Fino de Precisão Decimal', desc: 'Garante rigor aritmético evitando desvios causados por arredondamentos' },
      { icon: '⚠️', title: 'Tratamento Claro de Casos Indefinidos', desc: 'Sinaliza de imediato inconsistências como divisões por zero ou valores fora do domínio' },
      { icon: '🔄', title: 'Reavaliação Paramétrica Rápida', desc: 'Altere termos e coeficientes para analisar variações numéricas sem demora' },
      { icon: '🎓', title: 'Recurso Pedagógico e Científico', desc: 'Excelente suporte para o meio académico, engenharia e resolução de problemas técnicos' }
    ],
    ja: [
      { icon: '📐', title: 'ステップバイステップの代数的解法', desc: '複雑な計算プロセスを段階的に分解し、計算過程の透明性と理解度を向上' },
      { icon: '🎯', title: '検証された標準数学公式の適用', desc: '代数学、幾何学、三角関数の確立された数学定理と恒等式に厳格に準拠' },
      { icon: '🔢', title: '浮動小数点丸め誤差の抑制', desc: 'コンピュータ特有の微小な端数処理誤差を適切に補正し、正確な解を導出' },
      { icon: '⚠️', title: '未定義ケース・特異点の明確な検出', desc: 'ゼロ除算や負の平方根など、数学的に定義されない入力条件を即座に明示' },
      { icon: '🔄', title: '係数変更による即時シミュレーション', desc: 'パラメータを柔軟に変更して、関数の振る舞いや数値の変動傾向を瞬時に比較' },
      { icon: '🎓', title: '学習・研究・技術業務への貢献', desc: '生徒、教育関係者、エンジニアが数値の裏付けを確認する信頼性の高い計算基盤' }
    ],
    ko: [
      { icon: '📐', title: '단계별 대수학 전개 및 풀이 과정', desc: '복잡한 수식을 직관적인 계산 단계로 분해하여 연산 과정의 투명성과 원리 이해 증진' },
      { icon: '🎯', title: '검증된 수학 표준 정리 및 공식 준수', desc: '대수학, 삼각법, 기하학의 보편적 학술 정리에 기반하여 일관된 참값 도출' },
      { icon: '🔢', title: '부동 소수점 오차 제어 및 고정밀 연산', desc: '컴퓨터 연산 특유의 소수점 자릿수 절삭 및 올림 오차를 엄격히 보정하여 정밀도 유지' },
      { icon: '⚠️', title: '정의되지 않는 수학적 특이점 검출', desc: '0으로 나누기, 음수의 제곱근 등 수학적으로 불능이거나 부정인 조건을 명확히 통보' },
      { icon: '🔄', title: '매개변수 변경에 따른 실시간 값 비교', desc: '입력 계수를 빠르게 바꾸어가며 수식의 결과 변화와 함수의 거동을 즉각 탐색' },
      { icon: '🎓', title: '학습·연구 및 공학 계산의 신뢰할 수 있는 도구', desc: '학생, 교사, 공학자, 연구원이 계산 검증 및 개념 확인을 위해 안심하고 활용' }
    ]
  },

  general: {
    en: [
      { icon: '⚡', title: 'Real-Time Client-Side Calculation', desc: 'Processes quantitative values in milliseconds as you type, without network latency' },
      { icon: '🔒', title: 'In-Browser RAM Privacy', desc: 'Inputs and string buffers calculate locally on your device and are never transmitted to servers' },
      { icon: '📱', title: 'Responsive Multi-Device Layout', desc: 'Tailored for smartphones, tablets, laptops, and large desktop screens' },
      { icon: '💯', title: '100% Unrestricted Utility', desc: 'Unlimited conversions and evaluations with zero registrations, paywalls, or accounts' },
      { icon: '🧩', title: 'Transparent Algorithmic Logic', desc: 'Verifiable rules, character sets, and standards ensure predictable, trustworthy outcomes' },
      { icon: '🔄', title: 'Rapid Iterative Testing', desc: 'Instantly tweak parameters to test alternative scenarios and verify numbers' }
    ],
    hi: [
      { icon: '⚡', title: 'त्वरित स्थानीय गणना', desc: 'मान दर्ज करते ही बिना किसी नेटवर्क देरी के मिलीसेकंड में परिणाम प्रस्तुत करता है' },
      { icon: '🔒', title: 'ब्राउज़र में पूर्ण डेटा गोपनीयता', desc: 'सभी इनपुट सीधे आपके डिवाइस में प्रोसेस होते हैं, सर्वर पर कोई डेटा नहीं भेजा जाता' },
      { icon: '📱', title: 'सभी स्क्रीनों पर सहज अनुभव', desc: 'स्मार्टफोन, टैबलेट और कंप्यूटर की स्क्रीन के अनुसार पूरी तरह अनुकूलित' },
      { icon: '💯', title: '100% निःशुल्क और असीमित', desc: 'बिना किसी खाते, लॉगिन या विज्ञापन रुकावट के जितनी बार चाहें उपयोग करें' },
      { icon: '🧩', title: 'पारदर्शी और सुसंगत परिणाम', desc: 'प्रमाणित तार्किक नियमों और एल्गोरिदम पर आधारित विश्वसनीय परिणाम' },
      { icon: '🔄', title: 'त्वरित पुनरावृत्ति और तुलना', desc: 'संख्याओं को तुरंत बदलकर विभिन्न विकल्पों और परिदृश्यों की तुलना करें' }
    ],
    es: [
      { icon: '⚡', title: 'Cálculo Instantáneo en Cliente', desc: 'Calcula resultados en milisegundos mientras escribe, sin latencia de red' },
      { icon: '🔒', title: 'Privacidad en la Memoria del Navegador', desc: 'Las entradas se procesan localmente en su dispositivo y nunca se transmiten a servidores' },
      { icon: '📱', title: 'Diseño Adaptable Multidispositivo', desc: 'Optimizado para teléfonos móviles, tabletas, portátiles y ordenadores de sobremesa' },
      { icon: '💯', title: 'Utilidad 100% Libre y Sin Restricciones', desc: 'Uso ilimitado de conversiones y cálculos sin registros, cuentas ni muros de pago' },
      { icon: '🧩', title: 'Lógica Algorítmica Transparente', desc: 'Reglas explícitas y métodos contrastados que garantizan resultados fiables y previsibles' },
      { icon: '🔄', title: 'Pruebas Iterativas Inmediatas', desc: 'Ajuste parámetros libremente para comparar diferentes supuestos numéricos' }
    ],
    fr: [
      { icon: '⚡', title: 'Calcul Côté Client Instantané', desc: 'Résultats obtenus en quelques millisecondes à la saisie, sans délai de chargement' },
      { icon: '🔒', title: 'Données Conservées en Mémoire Locale', desc: 'Vos saisies restent sur votre appareil et ne sont jamais transmises à des serveurs' },
      { icon: '📱', title: 'Interface Adaptée à Tous les Écrans', desc: 'Affichage pensé pour smartphones, tablettes, ordinateurs portables et de bureau' },
      { icon: '💯', title: 'Accès Libre et Totalement Gratuit', desc: 'Calculs et conversions illimités sans création de compte ni barrière payante' },
      { icon: '🧩', title: 'Méthodes Algorithmiques Éprouvées', desc: 'Des principes de calcul clairs et vérifiables pour des résultats stables et fiables' },
      { icon: '🔄', title: 'Ajustement et Comparaison Rapides', desc: 'Modifiez vos paramètres à tout moment pour éprouver différents scénarios' }
    ],
    de: [
      { icon: '⚡', title: 'Verzögerungsfreie clientseitige Ausführung', desc: 'Berechnet Ergebnisse in Millisekunden direkt bei der Eingabe ohne Serverlatenz' },
      { icon: '🔒', title: 'Datenschutz im Arbeitsspeicher', desc: 'Eingaben verbleiben lokal in Ihrem Browser und werden nicht an Server gesendet' },
      { icon: '📱', title: 'Plattformübergreifendes Responsive Design', desc: 'Ideal nutzbar auf Smartphones, Tablets, Notebooks und Desktop-Bildschirmen' },
      { icon: '💯', title: '100% uneingeschränkte Nutzung', desc: 'Beliebig viele Umrechnungen und Auswertungen ohne Registrierung oder Kosten' },
      { icon: '🧩', title: 'Verlässliche und klare Rechenwege', desc: 'Eindeutige Algorithmen sorgen für konsistente und transparente Ergebnisse' },
      { icon: '🔄', title: 'Schnelle Vergleichsrechnungen', desc: 'Werte flexibel anpassen, um verschiedene numerische Varianten zu prüfen' }
    ],
    it: [
      { icon: '⚡', title: 'Elaborazione Istantanea Lato Client', desc: 'Restituisce i valori in pochi millisecondi durante la digitazione senza latenza' },
      { icon: '🔒', title: 'Riservatezza Locale nella RAM', desc: 'Gli input rimangono sul tuo dispositivo e non vengono inviati a server esterni' },
      { icon: '📱', title: 'Design Reattivo Multidispositivo', desc: 'Interfaccia ottimizzata per smartphone, tablet, laptop e schermi desktop' },
      { icon: '💯', title: 'Accesso Totalmente Gratuito e Libero', desc: 'Utilizzo illimitato senza vincoli di registrazione, login o formule a pagamento' },
      { icon: '🧩', title: 'Logica Operativa Trasparente', desc: 'Regole chiare e algoritmi collaudati per garantire risultati stabili e attendibili' },
      { icon: '🔄', title: 'Simulazioni Iterative Immediata', desc: 'Modifica i parametri numerici a piacimento per confrontare diverse ipotesi' }
    ],
    pt: [
      { icon: '⚡', title: 'Processamento Instantâneo no Navegador', desc: 'Resultados computados em milissegundos enquanto digita, sem esperas de rede' },
      { icon: '🔒', title: 'Privacidade Total na Memória Local', desc: 'Seus dados e valores permanecem no dispositivo e nunca são enviados a servidores' },
      { icon: '📱', title: 'Design Responsivo para Todos os Ecrãs', desc: 'Interface fluida para telemóveis, tablets, computadores portáteis e monitores' },
      { icon: '💯', title: 'Utilidade 100% Livre e Gratuita', desc: 'Uso irrestrito sem cadastro, subscrições ou qualquer tipo de bloqueio' },
      { icon: '🧩', title: 'Lógica Algorítmica Clara e Estável', desc: 'Regras explícitas e equações consolidadas para assegurar dados confiáveis' },
      { icon: '🔄', title: 'Testes Iterativos Imediatos', desc: 'Altere parâmetros livremente para simular e checar novos cenários numéricos' }
    ],
    ja: [
      { icon: '⚡', title: 'ネットワーク遅延ゼロの即時計算', desc: '数値を入力した瞬間に端末内でミリ秒単位の計算を実行し、待ち時間なく結果を表示' },
      { icon: '🔒', title: 'ブラウザメモリ内での徹底したプライバシー保護', desc: '入力した数値や文字列は端末内でのみ処理され、外部サーバーへ送信・記録されません' },
      { icon: '📱', title: 'スマートフォンから大画面までマルチ対応', desc: 'タッチ操作のモバイル端末から高解像度デスクトップまで快適に利用できるレスポンシブ設計' },
      { icon: '💯', title: '完全無料・利用制限なし', desc: '有料プランやアカウント登録の要求がなく、すべての機能を何度でも無制限に利用可能' },
      { icon: '🧩', title: '透明で検証可能なアルゴリズム', desc: '公知の計算規則と明快な処理フローに基づき、常にブレのない正確な数値を導出' },
      { icon: '🔄', title: 'パラメータの自在な再入力と検証', desc: '条件や数値を瞬時に差し替えて、複数パターンの比較検討をスムーズに実施' }
    ],
    ko: [
      { icon: '⚡', title: '네트워크 대기 없는 실시간 즉각 연산', desc: '입력 즉시 브라우저 클라이언트에서 수 밀리초 만에 신속하게 결과를 계산하여 표시' },
      { icon: '🔒', title: '기기 메모리 기반 철저한 개인정보 보호', desc: '입력한 수치와 텍스트 데이터가 외부 서버로 전송되지 않아 안심하고 안전하게 계산' },
      { icon: '📱', title: '모바일 및 데스크톱 완벽 반응형 UI', desc: '스마트폰, 태블릿, 노트북, 와이드 모니터 화면에 자연스럽게 최적화된 인터페이스' },
      { icon: '💯', title: '가입 없는 100% 완전 무료 서비스', desc: '회원가입, 로그인, 유료 결제 등의 장벽 없이 누구나 자유롭게 무제한으로 사용' },
      { icon: '🧩', title: '투명하고 일관성 있는 알고리즘 로직', desc: '검증된 수학적 공식과 문자 집합 규칙을 엄격히 따라 신뢰할 수 있는 결과값 산출' },
      { icon: '🔄', title: '자유로운 수치 변경 및 비교 분석', desc: '필요할 때마다 언제든 매개변수를 바꾸어 다양한 조건의 결과를 손쉽게 재확인' }
    ]
  }
};

/**
 * Returns 6 category-aware, authentic feature cards for a given tool category and locale.
 */
export function getCategoryFeatures(categoryKey: string, lang: Locale): FeatureCard[] {
  const normKey = categoryKey.toLowerCase().replace(/\s+/g, '-');

  let targetCat = 'general';
  if (categoryFeatures[normKey]) {
    targetCat = normKey;
  } else if (normKey.includes('finance') || normKey.includes('loan') || normKey.includes('tax') || normKey.includes('mortgage') || normKey.includes('investment')) {
    targetCat = 'finance';
  } else if (normKey.includes('construction') || normKey.includes('civil') || normKey.includes('concrete')) {
    targetCat = 'construction';
  } else if (normKey.includes('health') || normKey.includes('fitness') || normKey.includes('bmi') || normKey.includes('calorie')) {
    targetCat = 'health';
  } else if (normKey.includes('image')) {
    targetCat = 'image-tools';
  } else if (normKey.includes('pdf')) {
    targetCat = 'pdf-tools';
  } else if (normKey.includes('compiler') || normKey.includes('code') || normKey.includes('editor')) {
    targetCat = 'compiler-tools';
  } else if (normKey.includes('time-table') || normKey.includes('timetable') || normKey.includes('schedule')) {
    targetCat = 'time-table-tools';
  } else if (normKey.includes('math') || normKey.includes('algebra') || normKey.includes('geometry')) {
    targetCat = 'math';
  }

  const categoryCards = categoryFeatures[targetCat] || categoryFeatures.general;
  const localizedCards = categoryCards[lang] || categoryCards.en;
  return localizedCards;
}
