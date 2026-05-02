/* lessons.js — Full UPSC lesson content for all subjects */
var LESSONS = {
  history:{
    title:'Indian History – Complete Notes',
    sub:'Spectrum + NCERTs + Laxmikanth | GS Paper 1',
    html:`<h4>📌 Ancient India – Key Civilisations</h4>
<ul>
<li><strong>Indus Valley (2500–1750 BC)</strong> – Urban; Harappa, Mohenjo-daro; grid towns; no iron; Great Bath; undeciphered script; no temples found; trade with Mesopotamia</li>
<li><strong>Vedic Age</strong> – Rig Vedic: tribal, pastoral, women respected (Gargi, Maitreyi); Later Vedic: settled agriculture, caste rigid, 16 Mahajanapadas emerge</li>
<li><strong>Maurya Empire (322–185 BC)</strong> – Chandragupta (founder), Arthashastra by Chanakya (4 upayas: sam, dam, dand, bhed). Ashoka Dhamma: non-violence, tolerance, welfare. Decline: weak successors</li>
<li><strong>Gupta Age (320–550 AD)</strong> – Golden Age. Samudra Gupta: Allahabad pillar. Chandragupta II: Vikramaditya. Science: Aryabhata (zero, pi, heliocentric), Varahamihira, Charaka, Sushruta, Kalidasa</li>
</ul>
<div class="hl">💡 <strong>PYQ Pattern:</strong> (1) Administrative systems (2) Religious movements (3) Art & architecture (4) Economic conditions. Always read all 4 dimensions!</div>
<h4>📌 Medieval India – Dynasty Comparison</h4>
<table>
<tr><th>Dynasty</th><th>Period</th><th>Key Ruler</th><th>Notable Achievement</th></tr>
<tr><td>Delhi Sultanate</td><td>1206–1526</td><td>Alauddin Khilji</td><td>Market reforms, Mongol repulsion</td></tr>
<tr><td>Vijayanagara</td><td>1336–1646</td><td>Krishna Deva Raya</td><td>Amuktamalyada, prosperous trade</td></tr>
<tr><td>Mughal Empire</td><td>1526–1857</td><td>Akbar</td><td>Din-i-Ilahi, Mansabdari, Sulh-i-kul</td></tr>
<tr><td>Maratha</td><td>1674–1818</td><td>Shivaji</td><td>Ashtapradhan, guerrilla warfare</td></tr>
</table>
<h4>📌 Modern India – Freedom Struggle Timeline</h4>
<ul>
<li><strong>1857</strong> – First War of Independence. Meerut, May 10. Bahadur Shah Zafar. Multiple centres: Delhi, Kanpur (Nana Sahib), Jhansi (Lakshmi Bai), Lucknow (Begum Hazrat Mahal)</li>
<li><strong>1885</strong> – INC founded, Bombay, A.O. Hume. Moderate phase 1885–1905: petition politics</li>
<li><strong>1905</strong> – Partition of Bengal → Swadeshi. Extremists rise: Tilak, Bipin Pal, Lajpat Rai (Lal-Bal-Pal)</li>
<li><strong>1919</strong> – Rowlatt Act → Jallianwala Bagh (April 13, 379 killed officially, thousands wounded)</li>
<li><strong>1920–22</strong> – Non-Cooperation Movement. Programme: boycott schools, courts, councils, foreign goods. Suspended: Chauri Chaura (Feb 5, 1922)</li>
<li><strong>1930</strong> – Civil Disobedience. Dandi March: March 12, 241 miles, 78 volunteers, broke salt law</li>
<li><strong>1942</strong> – Quit India. "Do or Die." August 8, Gowalia Tank, Bombay. Underground: Aruna Asaf Ali, Ram Manohar Lohia</li>
<li><strong>1947</strong> – Independence. Partition. Mountbatten Plan (June 3). Two nations. 14-15 August.</li>
</ul>
<div class="hl">🎯 <strong>Maa's Memory Trick:</strong> Gandhi's movements = NCQ – Never Cheat, Quick! Non-Cooperation (1920) → Civil Disobedience (1930) → Quit India (1942). Each 12 years apart!</div>`,
    quiz:[
      {q:'Dandi March covered how many miles?',opts:['100 miles','151 miles','241 miles','300 miles'],ans:2},
      {q:'Arthashastra was written by?',opts:['Chandragupta','Chanakya','Ashoka','Megasthenes'],ans:1},
      {q:'Gupta Age is called Golden Age mainly because of?',opts:['Military conquest','Cultural & scientific achievements','Trade prosperity','Land revenue'],ans:1},
      {q:'First session of INC was held in?',opts:['Calcutta','Lahore','Bombay','Madras'],ans:2},
      {q:'Chauri Chaura incident happened in which year?',opts:['1919','1920','1922','1930'],ans:2},
    ]
  },
  polity:{
    title:'Indian Polity – Complete Notes',
    sub:'M. Laxmikanth | GS Paper 2',
    html:`<h4>📌 Key Constitutional Numbers</h4>
<table>
<tr><th>Item</th><th>Original (1950)</th><th>Current</th></tr>
<tr><td>Articles</td><td>395</td><td>448+</td></tr>
<tr><td>Schedules</td><td>8</td><td>12</td></tr>
<tr><td>Parts</td><td>22</td><td>25</td></tr>
<tr><td>Amendments</td><td>—</td><td>106+</td></tr>
</table>
<h4>📌 Parliament – Must-Know Facts</h4>
<ul>
<li>Lok Sabha – max 552 (530 states + 20 UTs + 2 Anglo-Indian – <strong>abolished by 104th Amendment 2020</strong>)</li>
<li>Rajya Sabha – max 250 (238 elected + 12 nominated). Permanent — <strong>cannot be dissolved</strong></li>
<li><strong>Quorum</strong> – 1/10th of total membership</li>
<li><strong>Joint Sitting</strong> – Art 108; only for Ordinary Bills; <strong>Speaker of Lok Sabha</strong> presides</li>
<li><strong>Money Bill</strong> – Art 110; only in Lok Sabha; RS can delay max <strong>14 days</strong>; Speaker certifies</li>
<li><strong>Constitutional Amendment</strong> – Art 368: simple / special majority / + state ratification (half)</li>
</ul>
<h4>📌 Fundamental Rights – 6 Categories (Art 12–35)</h4>
<ul>
<li>Art 14–18: Right to Equality (equality before law, no discrimination, abolish untouchability)</li>
<li>Art 19–22: Right to Freedom (6 freedoms under 19; protection on arrest Art 22)</li>
<li>Art 23–24: Right against Exploitation (no human trafficking, no child labour under 14)</li>
<li>Art 25–28: Right to Freedom of Religion</li>
<li>Art 29–30: Cultural & Educational Rights (minority rights)</li>
<li><strong>Art 32: Right to Constitutional Remedies</strong> — "Heart & Soul of Constitution" – Ambedkar. 5 writs issued by SC</li>
</ul>
<div class="hl">🎯 <strong>Basic Structure Doctrine (1973):</strong> Kesavananda Bharati case. Parliament CANNOT amend: democracy, federalism, secularism, judicial review, FRs, free & fair elections, sovereignty, unity, dignity of individual</div>
<h4>📌 Emergency Provisions</h4>
<table>
<tr><th>Type</th><th>Article</th><th>Grounds</th><th>Parliament Approval</th></tr>
<tr><td>National</td><td>352</td><td>War/Armed rebellion</td><td>Special majority within 1 month</td></tr>
<tr><td>State (President Rule)</td><td>356</td><td>Constitutional breakdown</td><td>Simple majority within 2 months</td></tr>
<tr><td>Financial</td><td>360</td><td>Financial stability threat</td><td>Simple majority, no time limit</td></tr>
</table>`,
    quiz:[
      {q:'Which article is called "Heart and Soul" of Constitution by Ambedkar?',opts:['Art 14','Art 19','Art 21','Art 32'],ans:3},
      {q:'Money Bill can only be introduced in?',opts:['Rajya Sabha','Lok Sabha','Either house','Joint sitting'],ans:1},
      {q:'Basic Structure Doctrine was established in?',opts:['Golaknath case','Kesavananda Bharati case','Maneka Gandhi case','Minerva Mills case'],ans:1},
      {q:'104th Constitutional Amendment abolished?',opts:['Lokpal','Anglo-Indian seats','OBC reservation','Article 370'],ans:1},
    ]
  },
  geography:{
    title:'Geography – Complete Notes',
    sub:'NCERT 11th & 12th | GS Paper 1',
    html:`<h4>📌 India Physiography – 5 Divisions</h4>
<ul>
<li><strong>Himalayas</strong> – 3 ranges: Trans-Himalaya (Karakoram, Ladakh), Greater (highest, Everest 8848m), Lesser (Pir Panjal, Mahabharat), Outer (Shiwalik). Passes: Zoji La, Shipki La, Nathu La, Bom Di La</li>
<li><strong>Northern Plains</strong> – 2400 km long. Formed by Indus-Ganga-Brahmaputra. 4 zones: Bhabar (coarse gravel) → Terai (waterlogged) → Bhangar (old alluvium, kankars) → Khadar (new alluvium, most fertile)</li>
<li><strong>Peninsular Plateau</strong> – Oldest landmass (Gondwanaland). Deccan Plateau (lava, black soil), Central Highlands (Vindhyas, Satpura). Western Ghats: continuous, high, biodiversity hotspot. Eastern Ghats: discontinuous</li>
<li><strong>Coastal Plains</strong> – Western: narrow, straight, lagoons (Vembanad, Chilika). Eastern: wide, deltaic, fertile deltas (Mahanadi-Godavari-Krishna-Kaveri)</li>
<li><strong>Islands</strong> – A&N Islands (Bay of Bengal, volcanic + coral, 572 islands). Lakshadweep (Arabian Sea, 36 coral atolls)</li>
</ul>
<h4>📌 Indian Monsoon – Complete Guide</h4>
<ul>
<li><strong>SW Monsoon onset</strong>: Kerala June 1 (normal), covers all India by July 15</li>
<li><strong>Arabian Sea branch</strong>: hits Western Ghats → heavy rain (windward); rain shadow (leeward: Pune, Nashik drier)</li>
<li><strong>Bay of Bengal branch</strong>: NE India first (Assam very heavy) → moves west along Gangetic plain</li>
<li><strong>Mawsynram</strong> – Highest rainfall in world (~11,871 mm/year). Meghalaya (Khasi Hills)</li>
<li><strong>El Niño</strong> – Warming of E Pacific → weakens Indian SW monsoon → drought risk in India</li>
<li><strong>La Niña</strong> – Cooling of E Pacific → strengthens monsoon → floods in India</li>
</ul>
<h4>📌 Indian Soils – 8 Types</h4>
<table>
<tr><th>Soil</th><th>Location</th><th>Best Crop</th><th>Key Feature</th></tr>
<tr><td>Alluvial</td><td>N plains (Ganga belt)</td><td>Wheat, Rice</td><td>Most fertile, Khadar newer</td></tr>
<tr><td>Black (Regur)</td><td>Deccan Plateau</td><td>Cotton</td><td>Self-ploughing, retains moisture</td></tr>
<tr><td>Red & Yellow</td><td>Peninsular India</td><td>Rice, Millets</td><td>Iron oxide (red colour)</td></tr>
<tr><td>Laterite</td><td>High rainfall areas</td><td>Tea, Coffee</td><td>Leaching, acidic</td></tr>
<tr><td>Arid/Desert</td><td>Rajasthan</td><td>Bajra</td><td>Sandy, saline, low humus</td></tr>
<tr><td>Saline/Alkaline</td><td>Arid/semi-arid</td><td>—</td><td>Reh/usar, needs reclamation</td></tr>
<tr><td>Peaty/Marshy</td><td>Kerala, Sundarbans</td><td>Rice</td><td>Organic rich, waterlogged</td></tr>
<tr><td>Forest Soil</td><td>Himalayan, hill areas</td><td>Temperate crops</td><td>Thin, acidic in high altitude</td></tr>
</table>
<div class="hl">🗺️ <strong>Map Tip:</strong> Practice marking on blank map: 28 states + all major rivers + national parks + mountain passes + dams. This alone = 3–4 extra marks in Prelims!</div>`,
    quiz:[
      {q:'Which soil is known as "self-ploughing"?',opts:['Alluvial','Black/Regur','Laterite','Red soil'],ans:1},
      {q:'Mawsynram (highest rainfall) is in which state?',opts:['Assam','Arunachal Pradesh','Meghalaya','Sikkim'],ans:2},
      {q:'El Nino causes what effect on Indian Monsoon?',opts:['Strengthens','Weakens','No effect','Earlier onset'],ans:1},
      {q:'Khadar soil is best described as?',opts:['Old alluvium with kankars','New fertile alluvium','Coarse gravel near Himalayas','Waterlogged soil'],ans:1},
    ]
  },
  economy:{
    title:'Indian Economy – Complete Notes',
    sub:'Ramesh Singh + NCERT 12th Macro | GS Paper 3',
    html:`<h4>📌 National Income – Key Formula Chain</h4>
<div class="hl">GDP → (+NFIA) → GNP → (−Depreciation) → NNP(MP) → (−Net Indirect Tax) → NNP(FC) = <strong>National Income</strong></div>
<ul>
<li><strong>GDP</strong> = Market value of all final goods/services produced within India in a year</li>
<li><strong>GNP</strong> = GDP + Net Factor Income from Abroad (NFIA)</li>
<li><strong>NNP(FC) = National Income</strong>. Per Capita = NI / Population</li>
<li><strong>Real GDP</strong> = Nominal GDP adjusted for inflation (base year: 2011-12)</li>
</ul>
<h4>📌 Monetary Policy – RBI Tools</h4>
<table>
<tr><th>Tool</th><th>Approx Rate</th><th>Effect of ↑ Rate</th></tr>
<tr><td>Repo Rate</td><td>~6.5%</td><td>Loans costlier, inflation ↓</td></tr>
<tr><td>Reverse Repo</td><td>Repo −0.25%</td><td>Banks park more with RBI</td></tr>
<tr><td>CRR</td><td>~4%</td><td>Money supply ↓ directly</td></tr>
<tr><td>SLR</td><td>~18%</td><td>Liquid assets ↑ with banks</td></tr>
<tr><td>Bank Rate</td><td>~6.75%</td><td>Long-term borrowing cost ↑</td></tr>
<tr><td>MSF</td><td>Repo +0.25%</td><td>Emergency overnight borrowing</td></tr>
</table>
<h4>📌 Budget Deficits – All Types</h4>
<ul>
<li><strong>Revenue Deficit</strong> = Revenue Expenditure − Revenue Receipts</li>
<li><strong>Fiscal Deficit</strong> = Total Expenditure − (Revenue Receipts + Non-debt Capital Receipts) ← Most important</li>
<li><strong>Primary Deficit</strong> = Fiscal Deficit − Interest Payments (shows current fiscal management)</li>
<li><strong>Effective Revenue Deficit</strong> = Revenue Deficit − Grants for Capital formation</li>
<li><strong>FRBM Act 2003</strong>: Fiscal Deficit target ≤ 3% of GDP</li>
</ul>
<h4>📌 Important Economic Institutions</h4>
<table>
<tr><th>Institution</th><th>Established</th><th>HQ</th><th>Key Role</th></tr>
<tr><td>RBI</td><td>1935</td><td>Mumbai</td><td>Central bank, monetary policy, forex</td></tr>
<tr><td>SEBI</td><td>1992</td><td>Mumbai</td><td>Securities market regulator</td></tr>
<tr><td>NABARD</td><td>1982</td><td>Mumbai</td><td>Rural credit, agricultural finance</td></tr>
<tr><td>SIDBI</td><td>1990</td><td>Lucknow</td><td>MSME financing</td></tr>
<tr><td>NDB (BRICS Bank)</td><td>2014</td><td>Shanghai</td><td>BRICS development financing</td></tr>
<tr><td>AIIB</td><td>2016</td><td>Beijing</td><td>Asian infrastructure</td></tr>
</table>`,
    quiz:[
      {q:'National Income = NNP at?',opts:['Market Price','Factor Cost','Constant Price','Current Price'],ans:1},
      {q:'FRBM Act 2003 targets fiscal deficit at?',opts:['2% of GDP','3% of GDP','4% of GDP','5% of GDP'],ans:1},
      {q:'When RBI increases CRR, money supply?',opts:['Increases','Decreases','Unchanged','Doubles'],ans:1},
      {q:'NABARD primarily finances?',opts:['Large industries','Agriculture & rural sector','Urban development','Export-import trade'],ans:1},
    ]
  },
  environment:{
    title:'Environment & Ecology – Complete Notes',
    sub:'Shankar IAS Environment | GS Paper 3',
    html:`<h4>📌 Ecosystem Fundamentals</h4>
<ul>
<li><strong>Food Chain Energy (10% Law)</strong> – Lindeman 1942. Only 10% energy transfers per trophic level. 90% lost as heat/respiration. Limits food chains to 4-5 levels.</li>
<li><strong>Ecological Succession</strong> – Primary (bare rock/new land) → Secondary (disturbed ecosystem). Sere = succession stages. Climax = stable final community</li>
<li><strong>Ecological Services</strong> – Provisioning (food, water), Regulating (climate, flood), Cultural (recreation), Supporting (soil formation, nutrient cycling)</li>
</ul>
<h4>📌 Biodiversity – India Facts</h4>
<table>
<tr><th>Category</th><th>India Count</th><th>% of World</th></tr>
<tr><td>Flowering plants</td><td>~18,000</td><td>7%</td></tr>
<tr><td>Mammals</td><td>~500</td><td>8.9%</td></tr>
<tr><td>Birds</td><td>~1300</td><td>13%</td></tr>
<tr><td>Reptiles</td><td>~521</td><td>6%</td></tr>
<tr><td>Fish</td><td>~2546</td><td>11.7%</td></tr>
</table>
<h4>📌 Key International Conventions</h4>
<table>
<tr><th>Convention</th><th>Year</th><th>Location</th><th>Focus</th></tr>
<tr><td>CBD</td><td>1992</td><td>Rio</td><td>Biodiversity conservation</td></tr>
<tr><td>CITES</td><td>1963</td><td>Washington</td><td>Trade in endangered species</td></tr>
<tr><td>Ramsar</td><td>1971</td><td>Iran</td><td>Wetlands protection</td></tr>
<tr><td>UNFCCC</td><td>1992</td><td>Rio</td><td>Climate change framework</td></tr>
<tr><td>Paris Agreement</td><td>2015</td><td>COP21</td><td>1.5°C goal, NDCs</td></tr>
<tr><td>Montreal Protocol</td><td>1987</td><td>Montreal</td><td>Ozone: phase out CFCs</td></tr>
<tr><td>Nagoya Protocol</td><td>2010</td><td>Nagoya</td><td>Access & benefit sharing (CBD)</td></tr>
<tr><td>Basel Convention</td><td>1989</td><td>Basel</td><td>Hazardous waste trans-boundary</td></tr>
<tr><td>Sendai Framework</td><td>2015</td><td>Sendai</td><td>Disaster risk reduction 2015-30</td></tr>
</table>
<div class="hl">🌿 India has <strong>75+ Ramsar wetland sites</strong> (highest in Asia). First Indian Ramsar site: <strong>Chilika Lake, Odisha (1981)</strong>. Largest inland salt lake: <strong>Sambhar, Rajasthan</strong>.</div>`,
    quiz:[
      {q:'10% Energy Law was given by?',opts:['Darwin','Lindeman','Haeckel','Odum'],ans:1},
      {q:"India's first National Park is?",opts:['Gir','Kaziranga','Jim Corbett','Bandipur'],ans:2},
      {q:'How many Tiger Reserves does India have (approx 2023)?',opts:['30','43','53','65'],ans:2},
      {q:'Ramsar Convention deals with?',opts:['Climate change','Wetlands','Marine pollution','Desertification'],ans:1},
    ]
  },
  science:{
    title:'Science & Technology – Complete Notes',
    sub:'Current Affairs + PIB + ISRO | GS Paper 3',
    html:`<h4>📌 ISRO Missions – Complete List</h4>
<table>
<tr><th>Mission</th><th>Year</th><th>Key Achievement</th></tr>
<tr><td>Chandrayaan-1</td><td>2008</td><td>Discovered water molecules on Moon (MIP impactor)</td></tr>
<tr><td>Mangalyaan (MOM)</td><td>2013</td><td>Mars orbit in 1st attempt; cheapest Mars mission ($74M)</td></tr>
<tr><td>Chandrayaan-2</td><td>2019</td><td>Orbiter successful; Vikram lander crash-landed</td></tr>
<tr><td>Chandrayaan-3</td><td>2023</td><td>Soft-landed Moon South Pole; India = 4th nation; Pragyan rover</td></tr>
<tr><td>Aditya-L1</td><td>2023</td><td>First solar mission; at L1 Lagrange point; VELC payload</td></tr>
<tr><td>XPoSat</td><td>2024</td><td>First dedicated X-ray polarimetry satellite</td></tr>
<tr><td>Gaganyaan</td><td>Upcoming</td><td>India first human spaceflight; 3 Vyomanauts to 400km orbit</td></tr>
</table>
<h4>📌 Key Defence Systems</h4>
<ul>
<li><strong>Agni-V</strong> – ICBM, range >5500 km, MIRV capable, surface-to-surface, nuclear deterrent</li>
<li><strong>BrahMos</strong> – India-Russia joint (BrahMos Aerospace). Supersonic cruise missile. 290-450 km range. Air, ship, submarine, land launched</li>
<li><strong>Tejas (LCA)</strong> – Indigenous light combat aircraft. Mark-1A for IAF. DRDO/HAL.</li>
<li><strong>INS Vikrant</strong> – India first indigenous aircraft carrier (2022). 45,000 tonnes. Made in India.</li>
<li><strong>S-400 Triumf</strong> – Air defence system from Russia. Despite CAATSA threat from USA.</li>
</ul>
<h4>📌 Emerging Technologies – UPSC Focus</h4>
<ul>
<li><strong>AI</strong> – NITI Aayog National AI Strategy; IndiaAI Mission Rs 10,371 cr (2024); AI in governance</li>
<li><strong>5G</strong> – Launched Oct 2022 (Jio, Airtel); 700MHz/3.5GHz/26GHz bands; use cases: smart cities</li>
<li><strong>Quantum</strong> – NM-QTA Rs 8000 cr; quantum encryption, communication, computing</li>
<li><strong>Semiconductor</strong> – India Semiconductor Mission; Tata (Dholera), Micron (Sanand), CG Power; Rs 76,000 cr outlay</li>
<li><strong>Green Hydrogen</strong> – National Green Hydrogen Mission 2023; 5 MT by 2030; SIGHT programme</li>
</ul>`,
    quiz:[
      {q:'Chandrayaan-3 landed on?',opts:['Moon equator','Moon North Pole','Moon South Pole','Mars'],ans:2},
      {q:'BrahMos is a joint venture with?',opts:['USA','Israel','France','Russia'],ans:3},
      {q:'Aditya-L1 studies?',opts:['Moon surface','Mars atmosphere','Sun and solar phenomena','Exoplanets'],ans:2},
      {q:'INS Vikrant was commissioned in?',opts:['2019','2020','2022','2024'],ans:2},
    ]
  },
  governance:{
    title:'Governance, IR & Security – Notes',
    sub:'Laxmikanth + Pavneet Singh | GS Paper 2 & 3',
    html:`<h4>📌 Key Governance Institutions</h4>
<table>
<tr><th>Body</th><th>Type</th><th>Article/Act</th><th>Key Role</th></tr>
<tr><td>CAG</td><td>Constitutional</td><td>Art 148</td><td>Audit all govt accounts</td></tr>
<tr><td>UPSC</td><td>Constitutional</td><td>Art 315</td><td>Recruitment civil services</td></tr>
<tr><td>Election Commission</td><td>Constitutional</td><td>Art 324</td><td>Conduct elections</td></tr>
<tr><td>Finance Commission</td><td>Constitutional</td><td>Art 280</td><td>Centre-state revenue sharing</td></tr>
<tr><td>Lokpal</td><td>Statutory</td><td>2013 Act</td><td>Anti-corruption: central officials</td></tr>
<tr><td>CVC</td><td>Statutory</td><td>2003 Act</td><td>Central vigilance</td></tr>
<tr><td>CIC</td><td>Statutory</td><td>RTI 2005</td><td>RTI appeals at Centre</td></tr>
<tr><td>NHRC</td><td>Statutory</td><td>1993 Act</td><td>Human rights protection</td></tr>
</table>
<h4>📌 India Foreign Policy – Pillars</h4>
<ul>
<li><strong>Panchsheel (1954)</strong> – 5 principles with China: non-aggression, non-interference, equality, peaceful coexistence, mutual respect</li>
<li><strong>Neighbourhood First</strong> – SAARC + bilateral focus. Connectivity, trade, people-to-people</li>
<li><strong>Act East Policy</strong> – Replaced Look East. ASEAN, Japan, Australia. Indo-Pacific focus.</li>
<li><strong>QUAD</strong> – India, USA, Australia, Japan. Free & open Indo-Pacific. Not a military alliance officially</li>
<li><strong>SCO</strong> – India full member 2017. Shanghai Cooperation Organisation. Eurasia focus</li>
<li><strong>I2U2</strong> – India, Israel, UAE, USA. Food security, energy, water, transport</li>
<li><strong>BRICS+</strong> – 2024 expanded: Iran, Egypt, UAE, Ethiopia, Saudi Arabia added</li>
</ul>
<h4>📌 Internal Security Threats</h4>
<ul>
<li><strong>LWE/Naxalism</strong> – Red corridor (Chhattisgarh, Jharkhand, Odisha, MP). SAMADHAN policy. Declining trend.</li>
<li><strong>UAPA</strong> – Unlawful Activities Prevention Act. NIA investigates. Stringent bail conditions.</li>
<li><strong>Coastal Security</strong> – Post 26/11 Mumbai attacks. Coastal surveillance network. Marine Police.</li>
</ul>`,
    quiz:[
      {q:'CAG is a Constitutional body under which Article?',opts:['Art 114','Art 148','Art 315','Art 324'],ans:1},
      {q:'QUAD members are?',opts:['India, China, USA, Russia','India, USA, Australia, Japan','India, Japan, S.Korea, Australia','India, USA, UK, Japan'],ans:1},
      {q:'SAMADHAN policy is related to?',opts:['Border security','Naxalism/LWE','Cyber security','Coastal security'],ans:1},
    ]
  },
  ethics:{
    title:'Ethics & Integrity – GS Paper 4',
    sub:'Lexicon (G. Subba Rao) + UPSC Model Answers',
    html:`<h4>📌 Ethical Theories – Quick Reference</h4>
<table>
<tr><th>Theory</th><th>Thinker</th><th>Core Idea</th><th>Civil Service Use</th></tr>
<tr><td>Utilitarianism</td><td>Bentham, J.S. Mill</td><td>Greatest good for greatest number</td><td>Policy decisions, public welfare</td></tr>
<tr><td>Deontology</td><td>Immanuel Kant</td><td>Duty regardless of outcome; Categorical Imperative</td><td>Rule-following, integrity</td></tr>
<tr><td>Virtue Ethics</td><td>Aristotle</td><td>Virtuous character; eudaimonia (flourishing)</td><td>Civil servant character</td></tr>
<tr><td>Care Ethics</td><td>Carol Gilligan</td><td>Relationships & context matter</td><td>Empathy in administration</td></tr>
<tr><td>Social Contract</td><td>Hobbes, Locke, Rousseau</td><td>State by consent of governed</td><td>Democratic accountability</td></tr>
<tr><td>Justice Theory</td><td>John Rawls</td><td>Veil of ignorance; difference principle</td><td>Equity in resource allocation</td></tr>
</table>
<h4>📌 Emotional Intelligence – Goleman's 5 Components</h4>
<ul>
<li><strong>Self-awareness</strong> – Recognise your emotions, strengths, limitations, values</li>
<li><strong>Self-regulation</strong> – Control impulses; think before acting; stay composed under pressure</li>
<li><strong>Motivation</strong> – Inner drive to achieve; resilience; goal-orientation beyond money</li>
<li><strong>Empathy</strong> – Understand others' feelings; essential for public service delivery</li>
<li><strong>Social Skills</strong> – Build relationships; lead effectively; manage conflict; communicate</li>
</ul>
<h4>📌 Civil Service Values</h4>
<ul>
<li>Integrity (no corruption even under extreme pressure)</li>
<li>Impartiality (no political/religious/caste bias in decisions)</li>
<li>Objectivity (evidence-based decisions, not prejudice)</li>
<li>Non-partisanship (serve ALL governments equally)</li>
<li>Empathy & Compassion (especially for vulnerable groups)</li>
<li>Accountability (answerable to public + superiors)</li>
</ul>
<div class="hl">📝 <strong>Case Study Formula (IDEAL):</strong><br>
I – Identify the ethical dilemma precisely<br>
D – Define all stakeholders and their interests<br>
E – Evaluate ALL options (consequentialist + deontological + virtue ethics lens)<br>
A – Act: choose best option + justify clearly<br>
L – Learn: suggest systemic safeguards to prevent recurrence</div>`,
    quiz:[
      {q:'"Greatest happiness of greatest number" was given by?',opts:['Aristotle','Kant','Bentham & Mill','Rawls'],ans:2},
      {q:'Which component of EI involves controlling impulses?',opts:['Self-awareness','Self-regulation','Empathy','Motivation'],ans:1},
      {q:'Categorical Imperative is a concept of?',opts:['Aristotle','Bentham','Immanuel Kant','Rawls'],ans:2},
      {q:'Rawls Theory of Justice is based on?',opts:['Utility maximisation','Veil of ignorance','Divine command','Virtue'],ans:1},
    ]
  },
  current:{
    title:'Current Affairs Strategy',
    sub:'Daily habit of every UPSC topper',
    html:`<h4>📌 What Toppers Read (Priority Order)</h4>
<ul>
<li>📰 <strong>The Hindu</strong> – Editorial (must), National, International. Skip: sports, entertainment, advertisements</li>
<li>📢 <strong>PIB (pib.gov.in)</strong> – All government press releases. Very direct UPSC syllabus material</li>
<li>📋 <strong>PRS Legislative (prsindia.org)</strong> – All bills and acts in Parliament. Essential for Mains GS2</li>
<li>📘 <strong>Yojana Magazine</strong> – Monthly. In-depth govt schemes. Excellent for Mains answers</li>
<li>📊 <strong>Economic Survey + Budget</strong> – Annual. Data for Mains economy answers</li>
<li>🔬 <strong>Science Reporter</strong> – CSIR. S&T current affairs. UPSC-friendly language</li>
</ul>
<div class="hl">⏰ <strong>Daily Time Budget:</strong> Morning 45 min (Hindu editorial + headlines) + Evening 20 min (PIB + 5-item notes). Never read everything — filter ruthlessly by syllabus!</div>
<h4>📌 Maa's Note Template (per news item)</h4>
<ul>
<li><strong>Headline:</strong> One crisp line</li>
<li><strong>GS Paper:</strong> GS1/GS2/GS3/GS4 (sometimes multiple)</li>
<li><strong>Syllabus Tag:</strong> e.g. "Environment → Climate change → Paris Agreement"</li>
<li><strong>Static Context:</strong> 2-line background (what you already know)</li>
<li><strong>Key Fact:</strong> 1 quotable data point for Mains answer</li>
<li><strong>Way Forward:</strong> Policy suggestion (your opinion for Mains writing)</li>
</ul>`,
    quiz:[
      {q:'Which source is best for government scheme current affairs?',opts:['Times of India','PIB','Hindustan Times','NDTV'],ans:1},
      {q:'PRS Legislative India tracks?',opts:['Sports news','Bills and acts in Parliament','Stock markets','Foreign affairs only'],ans:1},
    ]
  },
  pyq:{
    title:'Previous Year Questions – Strategy',
    sub:'The MOST important resource for UPSC',
    html:`<h4>📌 PYQ Weightage – Prelims GS Paper 1 (avg per year)</h4>
<table>
<tr><th>Subject</th><th>Questions</th><th>Priority</th></tr>
<tr><td>History + Art & Culture</td><td>15–22</td><td>🔴 Highest</td></tr>
<tr><td>Current Affairs</td><td>15–20</td><td>🔴 Highest</td></tr>
<tr><td>Polity</td><td>12–18</td><td>🔴 High</td></tr>
<tr><td>Economy</td><td>12–16</td><td>🟡 High</td></tr>
<tr><td>Environment</td><td>10–15</td><td>🟡 High</td></tr>
<tr><td>Geography</td><td>10–14</td><td>🟡 Medium</td></tr>
<tr><td>Science & Tech</td><td>8–12</td><td>🟢 Medium</td></tr>
</table>
<h4>📌 UPSC MCQ Technique</h4>
<ul>
<li><strong>Cover options first</strong> – Read question, think of answer, then see options</li>
<li><strong>Elimination</strong> – Cross out 2 obviously wrong options</li>
<li><strong>Keyword watch</strong> – "Only", "Always", "Never" = usually wrong in social sciences</li>
<li><strong>Statement-based</strong> – Check EACH statement independently: True or False?</li>
<li><strong>Speed target</strong> – 72 seconds per question. 100Q in 120 min. Practice this!</li>
<li><strong>Negative marking</strong> – 1/3 mark deducted. Skip if less than 50% confident</li>
</ul>
<div class="hl">🏆 Solve last 10 years Prelims (2015–2024). Topic-wise PYQs = better pattern recognition. Free on UPSC official website: upsc.gov.in</div>`,
    quiz:[
      {q:'UPSC Prelims GS Paper 1 has how many questions?',opts:['80','100','120','150'],ans:1},
      {q:'Negative marking in UPSC Prelims is?',opts:['1/4 mark','1/3 mark','1/2 mark','No negative marking'],ans:1},
    ]
  },
  writing:{
    title:'Answer Writing – Mains Strategy',
    sub:'The skill that decides your final rank',
    html:`<h4>📌 UPSC Answer Structure</h4>
<ul>
<li><strong>Introduction (2-3 lines)</strong> – Define / give context / quote data / cite constitutional provision / current news hook</li>
<li><strong>Body (multiple dimensions)</strong> – Economic + Social + Political + Environmental + Historical + Constitutional + Comparative</li>
<li><strong>Conclusion (2-3 lines)</strong> – Way forward / policy suggestion / committee recommendation / SC judgement / optimistic note</li>
</ul>
<div class="hl">✍️ <strong>Time Budget:</strong> 150w answer = 7-8 min | 250w answer = 12-13 min | Write legibly | Use headings | Draw diagrams | Never exceed word limit | Write 10-15% more than required</div>
<h4>📌 Directive Words – What They Mean</h4>
<table>
<tr><th>Word</th><th>What to Write</th></tr>
<tr><td>Discuss</td><td>All aspects, pros & cons, balanced view</td></tr>
<tr><td>Critically examine/analyse</td><td>Pros + Cons + Your balanced opinion with evidence</td></tr>
<tr><td>Evaluate</td><td>Judge merit/worth + give your verdict with reasoning</td></tr>
<tr><td>Explain</td><td>Clarify with reasons, examples, cause-effect</td></tr>
<tr><td>Enumerate</td><td>List items with brief description of each</td></tr>
<tr><td>Comment</td><td>Your view with reasons briefly (more personal)</td></tr>
<tr><td>Illustrate</td><td>Use examples/case studies/diagrams to explain</td></tr>
</table>
<h4>📌 Marks Booster Techniques</h4>
<ul>
<li>Underline key terms and concepts</li>
<li>Cite: "As per the __th Constitutional Amendment"</li>
<li>Quote committees: "As recommended by the __ Committee report"</li>
<li>Use data: "According to NFHS-5 / Economic Survey 2024..."</li>
<li>Mention recent SC judgements for Polity/Governance</li>
<li>End with positive, constructive conclusion always</li>
</ul>`,
    quiz:[
      {q:'For 150-word UPSC Mains answer, ideal time is?',opts:['3-4 min','7-8 min','12-15 min','20 min'],ans:1},
      {q:'"Critically examine" requires?',opts:['Only positives','Only negatives','Pros + Cons + Your balanced view','Just define the term'],ans:2},
    ]
  },
  revision:{
    title:'Revision Strategy – Remember More',
    sub:'Spaced repetition science for UPSC',
    html:`<h4>📌 Ebbinghaus Forgetting Curve</h4>
<ul>
<li>Without revision: forget 40% in 20 min → 70% in 1 day → 90% in 7 days</li>
<li><strong>Spaced repetition</strong>: Revise on Day 1 → Day 3 → Day 7 → Day 21 → Day 60. This moves info to long-term memory permanently</li>
</ul>
<h4>📌 Best Revision Techniques (Ranked)</h4>
<ul>
<li><strong>1. Active Recall</strong> – Close book, write everything you remember → BEST method</li>
<li><strong>2. Flashcards</strong> – Use Revise tab daily! Front = question, Back = answer</li>
<li><strong>3. Feynman Technique</strong> – Explain topic in simple language as if teaching a child</li>
<li><strong>4. Mind Maps</strong> – Draw connections between topics visually on paper</li>
<li><strong>5. Cornell Notes</strong> – Main notes + summary + questions column</li>
<li><strong>6. Interleaving</strong> – Mix subjects in one revision session for better retention</li>
</ul>
<h4>📌 Maa's Weekly Ritual (Every Sunday)</h4>
<ul>
<li>2-hour revision of all 7 topics studied this week</li>
<li>Solve 20 PYQs on week's subjects</li>
<li>Update flashcards: add new points discovered</li>
<li>Write 1-page summary for each topic</li>
<li>Mark weak topics → re-read next Monday morning</li>
</ul>`,
    quiz:[
      {q:'According to Ebbinghaus, we forget how much in 1 day without revision?',opts:['20%','40%','70%','90%'],ans:2},
      {q:'Which revision technique is considered most effective?',opts:['Re-reading','Highlighting','Active recall','Listening'],ans:2},
    ]
  },
  csat:{
    title:'CSAT Paper 2 – Complete Strategy',
    sub:'Qualifying 33% — but never ignore it!',
    html:`<h4>📌 CSAT Paper Pattern</h4>
<ul>
<li><strong>80 questions, 200 marks, 2 hours</strong></li>
<li>Negative marking: 1/3 per wrong answer</li>
<li>Qualifying: <strong>33% = 66 marks minimum</strong> out of 200</li>
<li>Marks NOT counted for merit – only GS Paper 1 counts for cutoff</li>
<li>⚠️ Warning: 20,000+ students fail CSAT every year! Never ignore!</li>
</ul>
<h4>📌 Reading Comprehension Strategy</h4>
<ul>
<li>Read passage once for gist, then read questions, then re-read for specific answers</li>
<li>Inference questions: stay within what passage states. No external knowledge!</li>
<li>Tone questions: positive/negative/neutral/critical/sarcastic?</li>
<li>Main idea questions: eliminate too specific and too broad options</li>
<li>Practice: 2 passages daily for 30 days = CSAT RC secured</li>
</ul>
<h4>📌 Logical Reasoning – Key Types</h4>
<ul>
<li><strong>Syllogisms</strong>: All A are B. Some B are C. → Some A may be C (NOT definite)</li>
<li><strong>Blood relations</strong>: Always draw a family tree diagram on paper</li>
<li><strong>Direction sense</strong>: Always draw compass (N/S/E/W) at start</li>
<li><strong>Coding-decoding</strong>: Find the pattern letter by letter or word by word</li>
</ul>
<div class="hl">🎯 If you struggle with CSAT: Spend 1 hour/day on it in last 2 months. Focus on: RC (guaranteed marks) + Arithmetic (scoring) + Logical Reasoning (practice-based). Total needed: just 66/200!</div>`,
    quiz:[
      {q:'CSAT Paper 2 qualifying marks are?',opts:['25% = 50 marks','33% = 66 marks','40% = 80 marks','50% = 100 marks'],ans:1},
      {q:'CSAT marks are used for?',opts:['Final merit ranking','Qualifying only (not merit)','Mains cutoff','Interview shortlist'],ans:1},
    ]
  },
  quiz:{
    title:'Mock Quiz – Practice Session',
    sub:'Maa demands 70%+ — no excuses! 🔥',
    html:`<h4>📌 MCQ Solving Formula (UPSC Topper Method)</h4>
<ul>
<li><strong>Step 1:</strong> Read the question stem carefully — underline keywords</li>
<li><strong>Step 2:</strong> Cover the options — think of your answer first</li>
<li><strong>Step 3:</strong> Eliminate — rule out 2 most obviously wrong options</li>
<li><strong>Step 4:</strong> Compare remaining 2 — which is MORE precisely correct?</li>
<li><strong>Step 5:</strong> Mark if >50% confident. Skip if not (come back later)</li>
</ul>
<div class="hl">⚡ Speed target: 72 seconds per question. Practice this with timer. If stuck after 45 sec: SKIP and return. Returning with fresh eyes helps!</div>
<h4>📌 Common MCQ Traps</h4>
<ul>
<li>"Only" in options = almost always wrong in social sciences</li>
<li>"All of the above" = often correct if all 3 individual statements are verified true</li>
<li>"None of the above" = test by verifying each option first</li>
<li>Partially correct option = WRONG option (if even 1 word is incorrect)</li>
<li>Distractors: similar-sounding year/name/place — read very carefully</li>
</ul>`,
    quiz:[
      {q:'UPSC Prelims: 100 questions in 120 min = time per question?',opts:['60 sec','72 sec','80 sec','90 sec'],ans:1},
    ]
  },
  general:{
    title:'UPSC Complete Overview',
    sub:'Everything about the exam — start here',
    html:`<h4>📌 UPSC Civil Services Exam Pattern</h4>
<table>
<tr><th>Stage</th><th>Papers</th><th>Marks</th><th>Type</th></tr>
<tr><td>Prelims</td><td>GS Paper 1 + CSAT</td><td>200+200=400</td><td>MCQ (qualifying)</td></tr>
<tr><td>Mains</td><td>Essay + GS1+GS2+GS3+GS4 + Optional Paper 1&2 + Language Papers</td><td>1750</td><td>Descriptive</td></tr>
<tr><td>Interview</td><td>Personality Test</td><td>275</td><td>Oral</td></tr>
<tr><td><strong>Total (Mains+Interview)</strong></td><td></td><td><strong>2025</strong></td><td>Final merit</td></tr>
</table>
<h4>📌 Must-Read Books</h4>
<table>
<tr><th>Subject</th><th>Book</th><th>Author</th></tr>
<tr><td>Polity</td><td>Indian Polity</td><td>M. Laxmikanth</td></tr>
<tr><td>Modern History</td><td>A Brief History of Modern India</td><td>Spectrum / Rajiv Ahir</td></tr>
<tr><td>Ancient/Medieval</td><td>NCERT 6th, 7th, 11th, 12th History</td><td>NCERT</td></tr>
<tr><td>Geography</td><td>NCERT 11th + 12th Geography</td><td>NCERT</td></tr>
<tr><td>Economy</td><td>Indian Economy</td><td>Ramesh Singh</td></tr>
<tr><td>Environment</td><td>Environment</td><td>Shankar IAS Academy</td></tr>
<tr><td>Ethics (GS4)</td><td>Lexicon for Ethics</td><td>G. Subba Rao & P.N. Roy Chowdhury</td></tr>
<tr><td>Current Affairs</td><td>The Hindu (daily)</td><td>Newspaper</td></tr>
<tr><td>CSAT</td><td>CSAT Manual 2024</td><td>Disha / Arihant</td></tr>
</table>
<h4>📌 1-Year Preparation Strategy</h4>
<ul>
<li><strong>Months 1-3 (Foundation):</strong> All NCERTs 6th–12th for all subjects</li>
<li><strong>Months 4-6 (Core):</strong> Standard books + detailed notes making</li>
<li><strong>Months 7-9 (Revision):</strong> Revision + current affairs consolidation</li>
<li><strong>Months 10-11 (Practice):</strong> Mock tests + answer writing daily</li>
<li><strong>Month 12 (Final):</strong> Rapid revision + PYQ solving</li>
</ul>`,
    quiz:[
      {q:'UPSC Mains has how many papers?',opts:['6','7','9','11'],ans:2},
      {q:'Interview (Personality Test) is worth?',opts:['200 marks','250 marks','275 marks','300 marks'],ans:2},
    ]
  }
};
