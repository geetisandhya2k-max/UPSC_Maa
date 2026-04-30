/* flashcards.js — 60 flashcards + render */
const FLASHCARDS = [
  {sub:'Polity',q:'What is the 73rd Constitutional Amendment?',a:'Panchayati Raj Institutions. Part IX added, 11th Schedule (29 subjects). Mandatory elections, 1/3 reservation for women, SC/ST. 1992.'},
  {sub:'Polity',q:'What is Basic Structure Doctrine?',a:'Kesavananda Bharati 1973. Parliament cannot destroy: democracy, federalism, secularism, judicial review, fundamental rights, free elections.'},
  {sub:'Polity',q:'Article 32 vs Article 226?',a:'Art 32: SC only, for FR violation, itself a FR. Art 226: HC, broader jurisdiction, any legal right. Art 32 is Basic Structure.'},
  {sub:'Polity',q:'What are the 5 constitutional writs?',a:'Habeas Corpus (produce body), Mandamus (command duty), Prohibition (stop lower court), Certiorari (quash order), Quo Warranto (by what authority).'},
  {sub:'Polity',q:'Money Bill vs Financial Bill?',a:'Money Bill: only Art 110 items, only LS, RS delays 14 days, Speaker certifies. Financial Bill: broader, either house, RS has equal powers.'},
  {sub:'Polity',q:'Art 356 – President Rule key facts?',a:'Imposed when state machinery fails. Governor report. Parliament approval within 2 months. Max 3 years. Bommai case: SC can review, floor test needed.'},
  {sub:'Polity',q:'What are Fundamental Duties?',a:'Art 51A. Added 42nd Amendment 1976. 11 duties (11th added by 86th Amendment 2002: education for children 6-14). Non-justiciable.'},
  {sub:'History',q:'Dandi March key facts?',a:'12 March–5 April 1930. 241 miles (388 km). Sabarmati to Dandi, Gujarat. 78 volunteers. Gandhi broke salt law. Started Civil Disobedience Movement.'},
  {sub:'History',q:'Who founded Indian National Congress?',a:'A.O. Hume (retired British ICS). Founded 1885. First session: Bombay (Gokuldas Tejpal College). First president: W.C. Bonnerjee.'},
  {sub:'History',q:'What was Doctrine of Lapse?',a:'Policy by Dalhousie (1848). If Indian ruler died without natural heir, state lapsed to British. Affected Satara, Jhansi, Nagpur. Major cause of 1857 revolt.'},
  {sub:'History',q:'"Do or Die" slogan?',a:'Mahatma Gandhi, Quit India Movement, August 8 1942. Gowalia Tank Maidan, Bombay. "We shall either free India or die in the attempt."'},
  {sub:'History',q:'What was Subsidiary Alliance?',a:"Wellesley's policy 1798. Indian ruler maintains British troops + pays for them + British resident at court + no foreign relations. Created dependency."},
  {sub:'History',q:'Battle of Plassey 1757 – significance?',a:'British (Clive) defeated Siraj-ud-Daulah (Nawab of Bengal). Started British political control. Mir Jafar betrayal. Foundation of British Empire in India.'},
  {sub:'History',q:'What was Non-Cooperation Movement?',a:'Gandhi 1920-22. Boycott schools, courts, foreign goods. Surrendered titles. Suspended after Chauri Chaura (5 Feb 1922 – mob killed 22 policemen).'},
  {sub:'Geography',q:"India's 4 Biodiversity Hotspots?",a:'1. Western Ghats 2. Eastern Himalayas 3. Indo-Burma Region (NE India) 4. Sundaland (A&N Islands). Criterion: 1500+ endemic plants + 70%+ habitat lost.'},
  {sub:'Geography',q:'Bhabar, Terai, Bhangar, Khadar zones?',a:'North to south: Bhabar (porous gravel, rivers disappear) → Terai (waterlogged, dense forest) → Bhangar (old alluvium, kankars) → Khadar (new alluvium, most fertile).'},
  {sub:'Geography',q:'El Nino vs La Nina on India?',a:'El Nino: Warming E Pacific → weakens SW monsoon → drought risk. La Nina: Cooling → strengthens monsoon → floods. ENSO = both phenomena.'},
  {sub:'Geography',q:'8 types of Indian soils?',a:'Alluvial (N plains, fertile), Black/Regur (Deccan, cotton), Red & Yellow (iron oxide), Laterite (leached), Arid/Desert, Saline/Alkaline, Peaty/Marshy, Forest.'},
  {sub:'Geography',q:'Western Ghats vs Eastern Ghats?',a:'Western: continuous, higher (Anamudi 2695m), orographic rain, biodiversity hotspot, rivers flow east. Eastern: discontinuous, lower, rivers cut through them.'},
  {sub:'Geography',q:'Indian Monsoon onset and retreat?',a:'SW monsoon onset: Kerala June 1 (normal). Covers all India by July 15. Retreats: NW India September, peninsular India December. NE monsoon: Oct-Dec in Tamil Nadu.'},
  {sub:'Economy',q:'GDP vs GNP vs National Income?',a:'GDP: within borders. GNP=GDP+NFIA. NNP=GNP-Depreciation. National Income=NNP at Factor Cost=NNP(MP)-Net Indirect Taxes. Per capita=NI/population.'},
  {sub:'Economy',q:'What is fiscal deficit?',a:'Total Expenditure − (Revenue Receipts + Non-debt Capital Receipts). Shows govt borrowing. FRBM target: 3% of GDP. High FD = inflation + crowding out.'},
  {sub:'Economy',q:'Repo Rate vs Reverse Repo Rate?',a:'Repo: RBI lends to banks (short-term). Higher repo = costlier loans = less money = lower inflation. Reverse Repo: banks park money with RBI. Currently ~6.5% / ~6.25%.'},
  {sub:'Economy',q:'What is GST?',a:'Goods & Services Tax. Replaced 17+ indirect taxes. CGST+SGST or IGST. 4 slabs: 5%, 12%, 18%, 28%. GST Council: all state + central Finance Ministers.'},
  {sub:'Economy',q:'What is Current Account Deficit?',a:'Imports of goods + services + income > exports. India generally has CAD (oil + gold imports). Funded by capital account surplus (FDI, FII). Rupee depreciation risk.'},
  {sub:'Environment',q:'In-situ vs Ex-situ conservation?',a:'In-situ: natural habitat (NPs, WLSs, Biosphere Reserves, Sacred Groves). Ex-situ: outside habitat (Zoos, Botanical Gardens, Gene Banks, Seed Banks, Cryopreservation).'},
  {sub:'Environment',q:"India's first and largest National Park?",a:'First: Jim Corbett, Uttarakhand (1936). Largest: Hemis NP, Ladakh (~4400 sq km). Most tigers: MP. Total: 106 NPs + 567 Sanctuaries + 18 Biosphere Reserves.'},
  {sub:'Environment',q:'10% Energy Law?',a:"Lindeman's Law 1942. Only 10% energy transfers per trophic level. 90% lost as heat/respiration. Limits food chains to 4-5 levels."},
  {sub:'Environment',q:'Paris Agreement key facts?',a:'2015, COP21. Goal: limit warming to 1.5°C. NDCs (Nationally Determined Contributions) by each country. India: 50% non-fossil electricity by 2030, net zero by 2070.'},
  {sub:'Environment',q:'Ramsar Convention?',a:'1971. Wetlands of International Importance. India: 75+ Ramsar sites (highest in Asia). First Indian site: Chilika Lake, Odisha (1981). Largest inland salt lake: Sambhar, Rajasthan.'},
  {sub:'Science',q:'Chandrayaan-3 achievement?',a:'Launched 14 July 2023. Landed Moon South Pole (Shiv Shakti Point) 23 August 2023. India = 4th nation on Moon, 1st on South Pole. Vikram lander + Pragyan rover.'},
  {sub:'Science',q:'What is Gaganyaan?',a:"India's first human spaceflight by ISRO. 3 Indian astronauts (Vyomanauts) to 400km orbit for 3 days. Expected 2025. Crew includes Group Captain Shubhanshu Shukla."},
  {sub:'Science',q:'CRISPR-Cas9?',a:'Gene editing tool. Cas9 = molecular scissors. CRISPR guides it to specific DNA location. Cut + repair/replace genes. Applications: disease treatment, GM crops. Ethical concerns: designer babies.'},
  {sub:'Science',q:'What is Aditya-L1?',a:'India first solar mission. Launched 2 Sept 2023. Placed at L1 Lagrange Point (1.5 million km from Earth). Studies solar corona, solar wind, CMEs. VELC main payload.'},
  {sub:'Governance',q:'Key Constitutional bodies?',a:'CAG (Art 148): audit all govt. UPSC (Art 315): civil service recruitment. EC (Art 324): elections. All independent, removed only by Parliament resolution.'},
  {sub:'Governance',q:'What is QUAD?',a:'Quadrilateral Security Dialogue: India, USA, Australia, Japan. Revival 2017, leader-level 2021. Goals: free Indo-Pacific, vaccines, climate, infrastructure, critical tech.'},
  {sub:'Governance',q:'What is RTI Act 2005?',a:'Right to Information. Citizens seek info from public authorities. 30-day response (48 hrs for life/liberty). CIC at Centre, SIC at State. 2019: changed CIC/IC service conditions.'},
  {sub:'Governance',q:"India's Foreign Policy pillars?",a:'1. Panchsheel (1954) 2. Non-Alignment 3. Neighbourhood First 4. Act East Policy 5. QUAD 6. Strategic Autonomy 7. Multi-alignment 8. Diaspora diplomacy 9. Soft power'},
  {sub:'Governance',q:'What is Left Wing Extremism (LWE)?',a:'Naxalites/Maoists in red corridor (Chhattisgarh, Jharkhand, Odisha, MP). SAMADHAN policy by govt. Combination of security + development approach.'},
  {sub:'Ethics',q:"Kant's Categorical Imperative?",a:'Act only according to maxim you could will to be universal law. Duty regardless of outcome. Example: if everyone lied, trust collapses → lying self-defeating → duty not to lie.'},
  {sub:'Ethics',q:"Rawls's Theory of Justice?",a:'Veil of Ignorance: design society without knowing your position. Two principles: 1. Equal basic liberties. 2. Difference principle: inequalities allowed only if they benefit least advantaged.'},
  {sub:'Ethics',q:"Goleman's 5 Emotional Intelligence components?",a:'1. Self-awareness (know your emotions) 2. Self-regulation (control impulses) 3. Motivation (inner drive) 4. Empathy (understand others) 5. Social Skills (manage relationships).'},
  {sub:'Ethics',q:'Civil Service Values – UPSC expects?',a:'Integrity, Impartiality, Objectivity, Non-partisanship, Dedication to public service, Empathy, Compassion, Tolerance, Perseverance, Spirit of service.'},
  {sub:'Ethics',q:'IDEAL method for case studies?',a:'I–Identify ethical dilemma. D–Define all stakeholders. E–Evaluate all options ethically (consequences, duties, rights). A–Act & justify choice. L–Learn & suggest safeguards.'},
  {sub:'Polity',q:'What is DPSP – 3 types?',a:'1. Socialistic (Art 38-43A): welfare state principles 2. Gandhian (Art 40-48): panchayats, cottage industries 3. Liberal-Intellectual (Art 44-51): UCC, separation, international peace. Non-justiciable but fundamental to governance.'},
  {sub:'History',q:'What was Cabinet Mission Plan 1946?',a:'3-tier federation plan: Union (Defence/Foreign/Communications), Groups (A/B/C), Provinces. Constituent Assembly to draft Constitution. Both INC and ML accepted then disagreed on interpretation → led to partition.'},
  {sub:'Economy',q:'Priority Sector Lending norms?',a:'RBI mandates 40% of ANBC to priority sectors: Agriculture (18%), MSMEs, education, housing, renewable energy, weaker sections. Ensures credit to underserved.'},
  {sub:'Geography',q:'Why Western Ghats a Biodiversity Hotspot?',a:'5000+ flowering plants (1700 endemic), 139 mammal species (16 endemic), 508 birds, 179 amphibians. UNESCO World Heritage Site 2012. Threatened by deforestation + development.'},
  {sub:'Environment',q:'Project Tiger facts?',a:'Launched 1973. NTCA oversees. 53 Tiger Reserves (2023). India tiger population: 3167 (2022 census) = 75% of world wild tigers. Highest in MP, Karnataka, Uttarakhand.'},
  {sub:'Science',q:'National missions for technology?',a:'1. NM-QTA: Quantum (Rs 8000cr) 2. National Green Hydrogen Mission: 5MT by 2030 3. India Semiconductor Mission: Tata, Micron fabs 4. IndiaAI Mission: Rs 10,371cr'},
  {sub:'History',q:'Gupta Empire – Golden Age facts?',a:'320-550 AD. Samudra Gupta: Allahabad Pillar. Chandragupta II = Vikramaditya. Science: Aryabhata (zero, heliocentric), Varahamihira, Charaka (medicine), Kalidasa (literature).'},
  {sub:'Polity',q:'National Emergency (Art 352) key facts?',a:'Grounds: War/External aggression/Armed rebellion. Cabinet written recommendation to President. Lok Sabha special majority (2/3 present + majority). Suspends Art 19. FRs can be restricted.'},
  {sub:'Economy',q:'What is India Stack?',a:'Digital public infrastructure: Aadhaar (identity) + UPI (payments) + DigiLocker (documents) + Account Aggregator (financial data). Model for digital financial inclusion worldwide.'},
  {sub:'Geography',q:'India river systems – Himalayan vs Peninsular?',a:'Himalayan: perennial (snow + rain), Indus/Ganga/Brahmaputra systems. Peninsular: seasonal (rain-fed), mostly flow east (Godavari, Krishna, Kaveri, Mahanadi). Exception: Narmada, Tapi flow west.'},
  {sub:'Governance',q:'NEP 2020 key features?',a:'School: 5+3+3+4 structure (replacing 10+2). Multiple entry-exit in higher ed. Emphasis on mother tongue until Class 5. CUET for central universities. Vocational education from Class 6.'},
  {sub:'Environment',q:'India NDC targets (Paris Agreement)?',a:'1. Reduce GDP emissions intensity by 45% by 2030 (vs 2005) 2. 50% cumulative electricity from non-fossil sources by 2030 3. Create carbon sink of 2.5-3 billion tonnes via forests 4. Net zero by 2070.'},
  {sub:'Ethics',q:"Gandhi's ethical philosophy?",a:'Truth (Satya) + Non-violence (Ahimsa) = Satyagraha. Trusteeship: wealthy are trustees of society. Means = as important as ends. Sarvodaya (welfare of all). Swadeshi (self-reliance).'},
];

const Flashcards = {
  render() {
    document.getElementById('fcC').innerHTML =
      FLASHCARDS.map((f,i) =>
        `<div class="fc" id="fc${i}" onclick="Flashcards.flip(${i})">
          <div class="fc-subj-label">${f.sub}</div>
          <div class="fq">❓ ${f.q}</div>
          <div class="fa">✅ ${f.a}</div>
          <div class="fhint">Tap to reveal answer</div>
        </div>`
      ).join('')
      + `<p style="text-align:center;font-size:10px;color:var(--muted);padding:8px 0;">
         ${FLASHCARDS.length} cards across 8 subjects 💪 Review daily!</p>`;
  },
  flip(i) { document.getElementById('fc'+i).classList.toggle('flipped'); }
};
