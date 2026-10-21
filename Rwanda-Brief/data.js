/* Shared data — articles, trends, world news */

const ARTICLES = [
  {
    id: 1,
    title: "Illicit Alcohol Crisis Deepens as Over 500 Treated, 50 Dead in 2026",
    excerpt: "Health facilities report a surge in methanol poisoning cases, with over 100 people losing their eyesight. Youth in rehabilitation centers account for 95% of addiction cases.",
    category: "health",
    emoji: "🍺",
    author: "Health Desk",
    date: "Sep 12, 2026",
    reads: 0,
    likes: 0,
    featured: true,
    trendRank: 1,
    body: `Rwanda's public health authorities are grappling with an escalating crisis linked to illicit alcohol consumption. According to the Ministry of Local Government, over 95% of youth currently in rehabilitation centers are battling addiction to unlicensed alcohol.

In the first half of 2026 alone, health facilities treated more than 500 people for severe complications, resulting in approximately 50 deaths and over 100 cases of permanent vision loss. Medical experts at Butare University Teaching Hospital suspect methanol poisoning as the primary cause.

The government has responded with a crackdown on unlicensed manufacturers and recalls of certain branded spirits, but community leaders say the root causes—poverty, unemployment, and lack of youth engagement—remain unaddressed.

Local officials in Ruhango and Nyanza districts report that illicit brews are often cheaper and more accessible than regulated alternatives, making enforcement particularly challenging in rural areas.`
  },
  {
    id: 2,
    title: "Unemployment Stalls at 13.4% as Youth NEET Rate Approaches 25%",
    excerpt: "The latest Labour Force Survey reveals stark gender and age disparities. Women face 15.5% unemployment versus 11.6% for men, while labour underutilisation hits 56%.",
    category: "economy",
    emoji: "📉",
    author: "Economy Desk",
    date: "Sep 10, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 2,
    body: `Rwanda's unemployment rate remained unchanged at 13.4% in May 2026, according to the latest Labour Force Survey. The figures reveal persistent structural challenges, particularly for young people and women.

Youth aged 16–30 face an unemployment rate of 15.7%, and nearly one in four are not in employment, education, or training (NEET). Women's unemployment stands at 15.5% compared to 11.6% for men, while female labour underutilisation reaches 66.1%.

Economists note that while GDP growth remains positive, it has not translated into sufficient job creation. The informal sector continues to absorb the majority of new entrants, often with low productivity and no social protection.

Government initiatives such as the National Employment Programme and youth entrepreneurship funds aim to address the gap, but analysts say scaling these efforts remains the critical challenge.`
  },
  {
    id: 3,
    title: "Teenage Pregnancy: 23,000 Girls Affected Annually, Health Minister Warns",
    excerpt: "About 63 adolescent girls become pregnant every day. School dropout is the leading risk factor—girls who leave before completing secondary school are five times more likely to conceive.",
    category: "family",
    emoji: "👨‍👩‍👧",
    author: "Family Desk",
    date: "Sep 8, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 3,
    body: `Rwanda's Minister of Health has raised alarm over teenage pregnancy rates, revealing that over 23,000 adolescent girls become pregnant each year—approximately 63 cases daily. The figure represents a 5–8% increase from the 2020–2025 period.

School dropout is identified as the primary risk factor. Girls who leave school before completing secondary education are five times more likely to become pregnant. Community silence around sexuality and lack of parent-child communication further compound the problem.

Health officials warn that adolescent mothers face higher risks of complications during childbirth, and their babies are more vulnerable to low birth weight and developmental challenges. The government is promoting comprehensive sexuality education and keeping girls in school as key interventions.`
  },
  {
    id: 4,
    title: "Judiciary Cuts Case Waiting Time to Four Months, But Backlog Persists",
    excerpt: "Average case hearing time dropped from six to four months, and pending cases fell 25%. However, 17,663 cases remain pending beyond six months.",
    category: "justice",
    emoji: "⚖️",
    author: "Justice Desk",
    date: "Sep 5, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 4,
    body: `Rwanda's judiciary has reported significant progress in reducing case delays. The average case hearing time dropped from six months to four, and the number of pending cases fell by 25% over the past year.

However, the backlog—cases pending for more than six months—still stands at 17,663. Court officials cite growing case volumes without matching increases in staff and infrastructure as the primary constraint.

Citizens continue to report barriers to legal representation, missing case files, and lengthy processes, particularly in rural areas. Correctional facilities remain under pressure, operating at 110% occupancy.

Legal aid organizations are calling for expanded pro bono services and alternative dispute resolution mechanisms to ease the burden on the formal court system.`
  },
  {
    id: 5,
    title: "Land Compensation Delays Frustrate Residents in Kigali and Bugesera",
    excerpt: "Expropriation compensation backlogs—including Rwf4.3 billion in Muvumba—leave families in limbo. Ombudsman reports land disputes dominate complaints.",
    category: "justice",
    emoji: "🏚️",
    author: "Investigations",
    date: "Sep 3, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 6,
    body: `Delays in expropriation compensation are emerging as a major source of grievance across Rwanda. In Bugesera, land-related complaints dominate cases brought to the Ombudsman's office.

The Muvumba water project alone has over Rwf4.3 billion in pending compensation. Residents in Kinyinya Sector, affected by the Kigali Green City project, report prolonged uncertainty disrupting livelihoods and property decisions.

Authorities cite the complexity of the multi-layered expropriation process, including land registration gaps and inheritance disputes, as key challenges. Affected communities are calling for faster valuations, clearer timelines, and better consultation.`
  },
  {
    id: 6,
    title: "Recurring Landslides Destroy Homes and Farmland in Northern Rwanda",
    excerpt: "Nyabihu District residents describe worsening conditions as mudslides claim homes, a primary school, and crops. Government warns of strong El Niño ahead.",
    category: "climate",
    emoji: "🌍",
    author: "Climate Desk",
    date: "Sep 1, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 5,
    body: `Recurring landslides and mudslides in Rwanda's Northern and Western provinces are destroying homes, schools, and farmland, forcing families to relocate repeatedly. In Nyabihu District, residents describe conditions worsening each rainy season.

Climate change is cited as a factor increasing heavy rainfall intensity. The government has warned of a very strong El Niño with a 96% chance during October–December 2026, likely bringing above-average rainfall and elevated flood risk.

Early warning systems and community preparedness programs are being strengthened, but residents in vulnerable areas say they need embankments, drainage infrastructure, and faster relocation support.

Farmers who have lost harvests face food insecurity and income loss, compounding existing economic pressures in rural communities.`
  },
  {
    id: 7,
    title: "World: Global Inflation Eases but Food Prices Remain Stubbornly High",
    excerpt: "International agencies report mixed signals as energy costs fall but staple food prices stay elevated in sub-Saharan Africa.",
    category: "world",
    emoji: "🌐",
    author: "World Desk",
    date: "Sep 11, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 7,
    body: `Global inflation shows signs of easing in major economies, but food prices remain stubbornly high across sub-Saharan Africa, according to international agencies.

Energy costs have declined from 2022 peaks, offering some relief to import-dependent economies. However, staple food prices—maize, rice, beans—continue to strain household budgets, particularly in rural areas.

International financial institutions are urging targeted subsidies and social protection expansions to cushion vulnerable populations. Analysts warn that prolonged food inflation could reverse recent gains in poverty reduction across the region.`
  },
  {
    id: 8,
    title: "World: AI Regulation Talks Intensify as Governments Race to Set Rules",
    excerpt: "Major economies are drafting frameworks for artificial intelligence, balancing innovation with safety, privacy, and labour market concerns.",
    category: "world",
    emoji: "🤖",
    author: "World Desk",
    date: "Sep 9, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 8,
    body: `Governments worldwide are accelerating efforts to regulate artificial intelligence, with major economies drafting frameworks that balance innovation against safety, privacy, and labour market disruption.

The debates centre on transparency requirements for AI models, data protection standards, and protections for workers whose jobs may be displaced by automation. Developing countries, including Rwanda, are watching closely as they position themselves as technology hubs.

Experts caution that regulatory fragmentation across jurisdictions could create compliance burdens for smaller firms, while overly light-touch approaches risk leaving citizens unprotected from harms such as disinformation and algorithmic bias.`
  },
  {
    id: 9,
    title: "Rwanda's Tech Sector Attracts Record Investment Despite Global Slowdown",
    excerpt: "Kigali Innovation City and new startup funds draw international capital, but skills gap and access to finance remain barriers for local entrepreneurs.",
    category: "economy",
    emoji: "💡",
    author: "Business Desk",
    date: "Sep 7, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 9,
    body: `Rwanda's technology sector attracted record investment in 2026, with Kigali Innovation City and new startup funds drawing international capital despite a global slowdown in venture funding.

Local entrepreneurs welcome the momentum but point to persistent barriers: a skills gap in advanced software engineering, limited access to early-stage finance, and regulatory processes that can be slow for fast-moving startups.

Government officials say reforms are underway to streamline business registration and expand digital skills training. The country aims to position itself as a regional tech hub, competing with Nairobi and Lagos for talent and investment.`
  },
  {
    id: 10,
    title: "Community Health Workers Expand Mental Health Support in Rural Areas",
    excerpt: "A new initiative trains thousands of community health workers to screen for depression and anxiety, addressing a severe shortage of specialists.",
    category: "health",
    emoji: "🧠",
    author: "Health Desk",
    date: "Sep 4, 2026",
    reads: 0,
    likes: 0,
    featured: false,
    trendRank: 10,
    body: `Rwanda is expanding mental health support in rural areas through a new initiative that trains community health workers to screen for depression, anxiety, and trauma-related conditions.

The country faces a severe shortage of psychiatrists and clinical psychologists, with most concentrated in Kigali. Community-based screening and referral aims to bridge this gap, particularly for populations affected by the 1994 Genocide against the Tutsi.

Health officials say stigma remains a major barrier, and awareness campaigns are being integrated into the program. Early results show increased identification of cases and improved referral completion rates.`
  }
];

const RWANDA_TRENDS = [
  { rank: 1, text: "Illicit alcohol deaths", meta: "0 reads · Health" },
  { rank: 2, text: "Youth unemployment 13.4%", meta: "0 reads · Economy" },
  { rank: 3, text: "Teen pregnancy 23K/year", meta: "0 reads · Family" },
  { rank: 4, text: "Court backlog 17,663", meta: "0 reads · Justice" },
  { rank: 5, text: "El Niño flood warning", meta: "0 reads · Climate" },
  { rank: 6, text: "Muvumba compensation", meta: "0 reads · Justice" },
  { rank: 7, text: "Kigali tech investment", meta: "0 reads · Economy" },
  { rank: 8, text: "Mental health outreach", meta: "0 reads · Health" }
];

const WORLD_NEWS = [
  { flag: "🌐", text: "Global inflation eases, food prices stay high" },
  { flag: "🤖", text: "AI regulation talks intensify worldwide" },
  { flag: "🌍", text: "Sub-Saharan growth forecast revised upward" },
  { flag: "🇺🇳", text: "UN climate summit preparations underway" },
  { flag: "📱", text: "Mobile money expansion across East Africa" },
  { flag: "💊", text: "Global health fund announces new pledges" }
];

const TICKER_ITEMS = [
  "Illicit alcohol: 50 dead, 100+ blinded in 2026",
  "Unemployment steady at 13.4% — youth hardest hit",
  "23,000 teen pregnancies recorded annually",
  "Court backlog falls 25% but 17,663 cases still pending",
  "El Niño: 96% chance of heavy rains Oct–Dec",
  "Muvumba compensation: Rwf4.3bn outstanding",
  "Kigali tech investment hits record high",
  "World: AI regulation frameworks accelerate"
];

