/**
 * THROTTLE '26 - BUILD//OUT HACKATHON PORTAL
 * Interactive Engine: Countdown Timer, Problem Statement Modals, FAQ Accordion
 */

// =========================================================================
// CONFIGURATION & OFFICIAL PROBLEM STATEMENTS (FROM PS.PDF)
// =========================================================================
const HACKATHON_CONFIG = {
  // Hackathon Kickoff: Sep 11, 2026, 05:30:00 PM IST
  kickoffTimestamp: new Date("2026-09-11T17:30:00+05:30").getTime(),

  // Target Code Freeze: Sep 12, 2026, 09:30:00 AM IST
  freezeTimestamp: new Date("2026-09-12T09:30:00+05:30").getTime(),

  // SPRINT PROGRESS MODE:
  // 'auto'       -> Uses actual event timestamps (0% before kickoff, 0-100% during the 16 hrs, 100% after freeze).
  // 'simulation' -> Live active simulation of the 16-hour sprint (useful for previewing the moving progress bar).
  // 'manual'     -> Manually set via manualProgressPercent (0 to 100).
  progressMode: 'auto',
  manualProgressPercent: 35,
  
  // MASTER FLAG: Submissions Lock
  // Set to true  -> Submissions open (active cyan button, direct link)
  // Set to false -> Submissions locked (disabled red button, lock indicator)
  submissionsOpen: true,

  // External submission link (Google Form / Devfolio / Portal URL)
  submitUrl: "https://forms.gle/throttle-buildout-submission"
};

// 5 Official Problem Statements extracted directly from PS.pdf
const PROBLEM_STATEMENTS = [
  {
    id: "PS-01",
    num: "01",
    code: "PROBLEM 01 // PUBLIC TRANSIT",
    domain: "Public Transit Operations",
    title: "The Phantom Fleet",
    tagline: "Real-time operational truth layer for city bus fleets under noisy GPS and route deviations.",
    summary: "Ingest noisy, intermittent GPS traces and static GTFS schedule feeds to classify every trip into operational states (on-track, delayed-but-recoverable, effectively-cancelled, or unverifiable) and recommend reassignment actions within 90 seconds under an 8% reserve constraint.",
    techKeywords: ["GTFS Feeds", "GPS Noise Simulation", "Real-Time Classification", "Leaflet / Mapbox"],
    situation: "A mid-sized Indian city operates a fleet of 1,200 buses across 185 routes. On any given weekday, the operations control room sees an 8–14% discrepancy between the scheduled buses and actual GPS pings. Some are genuine breakdowns, some informal detours, some drivers switching off trackers, and some are 'ghost buses' that never left the depot.",
    theProblem: "The city's transport authority loses an estimated ₹2.1 crore per quarter in revenue leakage and passenger trust erosion because riders at 40% of high-demand stops cannot rely on published ETAs. Existing dashboards show bus locations but cannot distinguish delays from informal rerouting or ghost buses. Dispatchers make reassignment calls that take 12–18 minutes per incident.",
    yourChallenge: "Build a system that ingests noisy, intermittent GPS traces and a static route-and-timetable feed to produce a real-time operational truth layer that classifies every scheduled trip into one of at least four states: on-track, delayed-but-recoverable, effectively-cancelled, or unverifiable. The system must also recommend a reassignment action (pull from reserve, merge with adjacent route, or do nothing) within 90 seconds of detecting an anomaly.",
    constraints: [
      "Hard constraint: The reserve fleet is strictly 8% of total active fleet at any time. You cannot recommend pulling non-existent reserves.",
      "A working demo must process a streaming simulation of at least 30 minutes of bus movement and show real-time state transitions on a live map/dashboard.",
      "The system must handle at least one 'cascading failure' scenario (e.g. 5 buses on the same route dropping out within 10 minutes).",
      "Chaos resilience: Judges may inject additional GPS dropouts or route deviations during the live demo to test robustness."
    ],
    dataSourcing: "No data will be provided. Teams must source their own GTFS static feed from any Indian city publishing one (Delhi, Bangalore, Chennai on data.gov.in or OpenMobilityData) or construct a synthetic route network for at least 20 routes and 100 buses. GPS noise must be self-simulated (dropouts of 3–15 min, route deviations of 500m–2km, depot mismatches).",
    criteria: [
      { name: "Coherence & realism of self-generated simulation", weight: "20%" },
      { name: "Accuracy & speed of trip-state classification", weight: "25%" },
      { name: "Feasibility of reassignment under 8% reserve limit", weight: "20%" },
      { name: "Real-time dashboard UX & clarity of operations view", weight: "20%" },
      { name: "Architecture for handling cascading failures & injected chaos", weight: "15%" }
    ]
  },
  {
    id: "PS-02",
    num: "02",
    code: "PROBLEM 02 // JUDICIAL ADMIN",
    domain: "Judicial Administration",
    title: "The Adjournment Engine",
    tagline: "Intelligent cause-list scheduling and mid-day re-optimization for court complexes.",
    summary: "Build a complete cause-list management application for 12 courtrooms that predicts hearing adjournments, enforces hard legal scheduling rules, and executes mid-day schedule re-optimizations in under 60 seconds.",
    techKeywords: ["Schedule Optimization", "Heuristics / Operations Research", "eCourts Schema", "Reactive UI"],
    situation: "A district court complex in Maharashtra handles ~14,000 active cases across 12 courtrooms, scheduling around 320 hearings daily. Historically, 38–45% of hearings end in adjournment (lawyer no-show, accused not produced, missing documents, or urgent bail pull). Each adjournment delays the next hearing by an average of 22 working days, causing backlogs to grow by 1,100 cases/year.",
    theProblem: "The daily cause list is currently prepared manually using spreadsheets and printed registers without anticipating which hearings will collapse. When an adjournment occurs, judges sit idle for 15–25 minutes while the next case is called. There is no intelligent overbooking mechanism like airlines use.",
    yourChallenge: "Build a complete cause-list management application from case intake to schedule generation to mid-day re-optimization that a court clerk could realistically use. Enter/import case metadata, generate an optimized daily cause list for 12 courtrooms by 6 PM the previous evening, and trigger a mid-day re-shuffle at lunch when morning adjournments materialize.",
    constraints: [
      "Criminal bail matters must be heard before 11:00 AM.",
      "Cases with outstation witnesses (flagged in metadata) cannot be rescheduled within 48 hours.",
      "No judge can hear more than 35 matters in a single day.",
      "Cases older than 5 years must be prioritized over newer cases of the same type.",
      "Mid-day re-optimization must execute in under 60 seconds and produce a revised afternoon list.",
      "Chaos resilience: Judges may inject a burst of 8–10 simultaneous adjournments during the demo."
    ],
    dataSourcing: "No data provided. Teams must design their own case data schema and populate a realistic test corpus of at least 200 active cases across 12 courtrooms. Schema design is a judged deliverable (reference ecourts.gov.in structures).",
    criteria: [
      { name: "Completeness and usability of the clerk-facing application", weight: "30%" },
      { name: "Constraint compliance: zero violations of the 4 hard rules", weight: "25%" },
      { name: "Measurable improvement in simulated judge utilization vs FIFO", weight: "20%" },
      { name: "Speed and coherence of mid-day re-optimization under stress", weight: "15%" },
      { name: "Data schema design and extensibility", weight: "10%" }
    ]
  },
  {
    id: "PS-03",
    num: "03",
    code: "PROBLEM 03 // LEGAL TECH & PROPTECH",
    domain: "Legal Tech / Proptech",
    title: "The Deposit War Room",
    tagline: "Online Dispute Resolution platform for residential tenancy deposits under Karnataka Rent Control Act.",
    summary: "Develop an end-to-end Online Dispute Resolution (ODR) platform that guides tenants and landlords through structured evidence collection, applies statutory deduction rules, facilitates negotiation, and auto-generates binding settlement PDFs.",
    techKeywords: ["ODR State Machine", "Rules Engine", "PDF Generation", "Structured Negotiation"],
    situation: "In Bangalore, average security deposits for a 2BHK are ₹1.5–2.5 lakh (6–10 months rent). When tenancies end, 68% of deposit disputes escalate to Rent Control Court, taking an average of 14 months to resolve. Most common disputes: deductions for painting/cleaning (claimed by 82%, disputed by 71%), fixture damages, and alleged unpaid utility bills.",
    theProblem: "A proptech startup wants an Online Dispute Resolution (ODR) platform that resolves deposit disputes in under 30 days without court involvement. Currently, no such platform exists in India, and the startup's pilot with a 2,000-unit apartment management company in Whitefield is 8 weeks away.",
    yourChallenge: "Build a working prototype of an ODR platform handling the full lifecycle of a single deposit dispute: 1. Intake (separate interfaces for tenant & landlord), 2. Evidence Evaluation (structured manual entry fields for damage photos, agreements, bills), 3. Automated Calculation (applying Karnataka Rent Control Act provisions: 10% annual depreciation cap on fixtures, 1-month notice rule, wear-and-tear prohibition), 4. Negotiation (structured counteroffers with gap visualizer, max 3 rounds), 5. Settlement (auto-generated PDF with digital consent when gap <= 5%).",
    constraints: [
      "Rule engine must correctly handle at least 5 deduction categories: painting, fixtures, utilities, unpaid rent, cleaning.",
      "Negotiation interface must enforce max 3 rounds of counteroffers before escalating to mediator review.",
      "Settlement PDF must include computed breakdown, both parties' names, property address, and digital timestamp.",
      "The demo must walk through one complete dispute from intake to settlement in under 5 minutes.",
      "Note: Computer vision/OCR is NOT required. Structured form fields for evidence data are explicitly permitted."
    ],
    dataSourcing: "No data or legal templates provided. Teams research the Karnataka Rent Control Act provisions (available on indiacode.nic.in) and prepare 2–3 realistic dispute scenarios for the demo.",
    criteria: [
      { name: "Legal accuracy and completeness of rule engine", weight: "30%" },
      { name: "UX quality of the dual-party workflow (intake, negotiation)", weight: "25%" },
      { name: "Robustness of the negotiation state machine", weight: "20%" },
      { name: "Quality and legal formatting of generated settlement PDF", weight: "15%" },
      { name: "Creativity in evidence evaluation workflow", weight: "10%" }
    ]
  },
  {
    id: "PS-04",
    num: "04",
    code: "PROBLEM 04 // HEALTHCARE IOT",
    domain: "Healthcare Logistics / Mobile-First IoT",
    title: "The Cold Chain Handshake",
    tagline: "Verifiable digital chain-of-custody and offline-first temperature logging for last-mile vaccine transport.",
    summary: "Build a mobile-first handover application that pairs with low-cost Bluetooth loggers, logs continuous temperatures during rural two-wheeler transit, buffers through network dropouts, escalates heat breaches, and executes digital handovers at health centres.",
    techKeywords: ["Offline-First Sync", "BLE / WebSocket Mock", "Tamper-Evident Logs", "Mobile UX"],
    situation: "A state health department distributes 2–8°C vaccines to 1,400 Primary Health Centres (PHCs). The last mile (district cold room to PHC by two-wheelers over 15–40 km of rural roads) is unmonitored. In the last fiscal year, 6.2% of vaccine vials (worth ₹4.8 crore) were discarded due to suspected heat exposure, but the department cannot pinpoint where breaches occurred.",
    theProblem: "The department procured 500 low-cost Bluetooth temperature loggers (logging every 2 minutes), but lacks a mobile handover protocol that pairs loggers at dispatch, tracks temperature on field worker phones through intermittent cellular connectivity, escalates temperature breaches, and executes digital handovers at arrival.",
    yourChallenge: "Build a mobile-first last-mile handover application implementing the chain-of-custody protocol: 1. Dispatch (cold room operator scans QR, pairs logger stream, logs starting conditions), 2. Transit (continuous temperature logging, buffering locally during 10–20 min connection dropouts without timestamp loss), 3. Alert Escalation (tiered alert if temp >8°C for >5 cumulative mins: worker -> supervisor -> pharmacist), 4. Handover (pharmacist scans QR, views trajectory & pass/fail verdict, both digitally sign; replacement workflow on failure).",
    constraints: [
      "App must be functional on a physical Android device, high-fidelity emulator, or convincing web simulator with offline buffering.",
      "The temperature log must be tamper-evident: once recorded, it cannot be modified (hash chain or append-only log).",
      "Complete handover cycle must be demonstrable in under 4 minutes.",
      "Teams simulate the Bluetooth logger stream (baseline 4–6°C, occasional spikes to 9–11°C during sun exposure)."
    ],
    dataSourcing: "No data or starter code provided. Teams write a simple script or stream simulator emitting temperature readings every 2 minutes with simulated 10-minute network dropouts.",
    criteria: [
      { name: "Robustness of offline-first data handling (buffering, sync)", weight: "30%" },
      { name: "Completeness & clarity of chain-of-custody workflow", weight: "25%" },
      { name: "Alert escalation logic (correct tiering, no false alerts)", weight: "20%" },
      { name: "Tamper-evidence mechanism for temperature log", weight: "15%" },
      { name: "Mobile UX quality under field conditions", weight: "10%" }
    ]
  },
  {
    id: "PS-05",
    num: "05",
    code: "PROBLEM 05 // ENERGY ECONOMICS",
    domain: "Energy Economics & Grid Management",
    title: "The Microgrid Clearinghouse",
    tagline: "Peer-to-peer 15-minute energy settlement engine with accelerated 24-hour simulation.",
    summary: "Architect a P2P energy settlement engine and live simulator for 600 households that clears single market prices every 15-minute block under transformer capacity and trading constraints, while allocating penalties for solar generation imbalances.",
    techKeywords: ["P2P Market Clearing", "Constraint Optimization", "Accelerated Simulation", "Fast Rendering"],
    situation: "A gated residential township of 600 households in Tamil Nadu has 180 rooftop solar prosumers. During peak hours (10 AM–2 PM), they generate 1.8 MW surplus exported at ₹2.50/kWh, while 420 households import power at ₹7.20/kWh. A pilot license allows P2P trading so prosumers earn ₹5.00/kWh and consumers pay ₹5.00/kWh.",
    theProblem: "The pilot must settle energy trades in 15-minute blocks within ~3 minutes under 3 non-negotiable constraints: 1. Local transformer capacity capped at 2.5 MW; 2. No single prosumer can sell >80% of their generation in any block; 3. Settlement price must be a single clearing price per block. Intermittent cloud cover can suddenly drop solar supply by 30%.",
    yourChallenge: "Build a P2P energy settlement engine with an integrated simulator demonstrating 24 hours of continuous market operation: 1. Simulate realistic profiles for 180 prosumers and 420 consumers, 2. Clear a single market price per block maximizing energy traded within all 3 constraints, 3. Handle imbalances transparently when committed generation drops, 4. Visualize 24 hours on a live dashboard showing prices, energy traded, transformer load, and penalties.",
    constraints: [
      "Settlement engine must process each 15-minute block in under 10 seconds.",
      "Single-clearing-price mechanism must be explicitly justified (uniform price auction, merit-order dispatch, etc.).",
      "Accelerated demo: show 24 simulated hours running at ~1 block every 2 seconds (96 blocks in ~3 min) with a stable, crash-free dashboard UI.",
      "Zero transformer overloads and zero 80%-rule violations across 24 hours.",
      "Chaos resilience: Judges may inject an unannounced 'cloud storm' (60% generation crash for 4 consecutive blocks)."
    ],
    dataSourcing: "No dataset provided. Teams generate synthetic profiles: Solar sinusoidal curve peaking at 10 kW/prosumer at 12:30 PM with Gaussian noise and 2–3 cloud events; Consumer demand base 0.5 kW with morning (2.5 kW) and evening (3.5 kW) peaks.",
    criteria: [
      { name: "Economic efficiency: total energy traded vs theoretical maximum", weight: "25%" },
      { name: "Constraint compliance: zero transformer & 80%-rule violations", weight: "25%" },
      { name: "Imbalance handling: transparency & fairness of penalty allocation", weight: "20%" },
      { name: "Computational performance & UI stability at accelerated speed", weight: "15%" },
      { name: "Mechanism design justification and dashboard clarity", weight: "15%" }
    ]
  }
];

// =========================================================================
// INITIALIZATION
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initCountdownTimer();
  renderProblemStatements();
  initProblemModal();
  initMobileMenu();
  initFaqAccordion();
  initCustomCursor();
  initSubmitButton();
});

// =========================================================================
// SPRINT COUNTDOWN TIMER & LIVE PROGRESS BAR
// =========================================================================
function initCountdownTimer() {
  const hoursEl = document.getElementById("timer-hours");
  const minutesEl = document.getElementById("timer-minutes");
  const secondsEl = document.getElementById("timer-seconds");
  const progressFill = document.getElementById("sprint-progress-bar");
  const progressPercentEl = document.getElementById("progress-percent-val");
  const statusIndicator = document.getElementById("timer-status-text");

  if (!hoursEl || !minutesEl || !secondsEl) return;

  const totalSprintDurationMs = 16 * 60 * 60 * 1000; // 16 Hours = 57,600,000 ms

  function updateTimer() {
    const now = Date.now();
    let percent = 0;
    let hours = 0, minutes = 0, seconds = 0;

    if (HACKATHON_CONFIG.progressMode === 'simulation') {
      // Simulate an active 16-hour sprint anchored to current time
      const cycleElapsed = (now % totalSprintDurationMs);
      const remainingMs = totalSprintDurationMs - cycleElapsed;
      percent = (cycleElapsed / totalSprintDurationMs) * 100;
      hours = Math.floor(remainingMs / (1000 * 60 * 60));
      minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
      if (statusIndicator) statusIndicator.textContent = "SIMULATED SPRINT ACTIVE // SUBMISSIONS OPEN";
    } else if (HACKATHON_CONFIG.progressMode === 'manual') {
      // Manual test override (0 - 100)
      percent = Math.min(100, Math.max(0, HACKATHON_CONFIG.manualProgressPercent));
      const remainingMs = totalSprintDurationMs * ((100 - percent) / 100);
      hours = Math.floor(remainingMs / (1000 * 60 * 60));
      minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
    } else {
      // Real-time automatic mode
      const kickoff = HACKATHON_CONFIG.kickoffTimestamp;
      const freeze = HACKATHON_CONFIG.freezeTimestamp;

      if (now < kickoff) {
        // Before event start: Countdown to freeze, progress bar at 0%
        const diff = freeze - now;
        hours = Math.floor(diff / (1000 * 60 * 60));
        minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((diff % (1000 * 60)) / 1000);
        percent = 0;
        if (statusIndicator) statusIndicator.textContent = "COUNTDOWN TO CODE FREEZE";
      } else if (now >= freeze) {
        // Event ended: 100% complete, timer at 00:00:00
        hours = 0;
        minutes = 0;
        seconds = 0;
        percent = 100;
        if (statusIndicator) statusIndicator.textContent = "CODE FREEZE REACHED // SUBMISSIONS LOCKED";
      } else {
        // Active 16-hour sprint (Between Sep 11 5:30 PM and Sep 12 9:30 AM)
        const elapsed = now - kickoff;
        const remaining = freeze - now;
        percent = Math.min(100, Math.max(0, (elapsed / totalSprintDurationMs) * 100));
        hours = Math.floor(remaining / (1000 * 60 * 60));
        minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        if (statusIndicator) {
          statusIndicator.textContent = hours < 1 ? "FINAL SPRINT // CODE FREEZE IMMINENT" : "SPRINT ACTIVE // SUBMISSIONS OPEN";
        }
      }
    }

    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

    if (progressFill) {
      progressFill.style.width = `${percent.toFixed(1)}%`;
    }
    if (progressPercentEl) {
      progressPercentEl.textContent = `${percent.toFixed(1)}%`;
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Browser console testing helpers for progress bar
window.setSprintProgress = (percent) => {
  HACKATHON_CONFIG.progressMode = 'manual';
  HACKATHON_CONFIG.manualProgressPercent = Number(percent);
  console.log(`[THROTTLE] Progress bar set to: ${percent}%`);
};

window.toggleSimulationMode = (enableSimulation) => {
  HACKATHON_CONFIG.progressMode = enableSimulation ? 'simulation' : 'auto';
  console.log(`[THROTTLE] Progress bar mode set to: ${HACKATHON_CONFIG.progressMode}`);
};

// =========================================================================
// RENDER 5 PROBLEM STATEMENTS (MID SECTION)
// =========================================================================
function renderProblemStatements() {
  const container = document.getElementById("problems-list");
  if (!container) return;

  container.innerHTML = PROBLEM_STATEMENTS.map(ps => `
    <div class="problem-card glass-card" id="card-${ps.id}">
      <div class="ps-id-col">
        <span class="ps-number">${ps.num}</span>
        <span class="ps-domain-tag">${ps.domain}</span>
      </div>

      <div class="ps-info-col">
        <h3 class="ps-title">${ps.title}</h3>
        <p class="ps-tagline">${ps.tagline}</p>
        <p class="ps-summary">${ps.summary}</p>
        <div class="ps-tags-row">
          ${ps.techKeywords.map(tag => `<span class="ps-tech-badge">${tag}</span>`).join("")}
        </div>
      </div>

      <div class="ps-action-col">
        <button class="btn-decrypt-spec" onclick="openProblemModal('${ps.id}')">
          <span>VIEW DETAILS</span>
          <span>↗</span>
        </button>
      </div>
    </div>
  `).join("");
}

// =========================================================================
// PROBLEM DETAIL MODAL
// =========================================================================
function initProblemModal() {
  const modal = document.getElementById("spec-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", closeProblemModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProblemModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProblemModal();
  });
}

window.openProblemModal = function(id) {
  const ps = PROBLEM_STATEMENTS.find(p => p.id === id);
  if (!ps) return;

  const modal = document.getElementById("spec-modal");
  const codeEl = document.getElementById("modal-ps-code");
  const titleEl = document.getElementById("modal-title");
  const bodyEl = document.getElementById("modal-body-content");
  const submitTargetBtn = document.getElementById("modal-submit-target-btn");

  if (codeEl) codeEl.textContent = `${ps.code} — ${ps.domain}`;
  if (titleEl) titleEl.textContent = ps.title;

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="modal-section-block">
        <h4 class="spec-section-title">The Situation & Problem</h4>
        <p class="spec-p">${ps.situation}</p>
        <p class="spec-p" style="margin-top:0.6rem;">${ps.theProblem}</p>
      </div>

      <div class="modal-section-block">
        <h4 class="spec-section-title">Your Challenge</h4>
        <p class="spec-p">${ps.yourChallenge}</p>
      </div>

      <div class="modal-section-block">
        <h4 class="spec-section-title">Constraints & Requirements</h4>
        <ul class="spec-list">
          ${ps.constraints.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="modal-section-block">
        <h4 class="spec-section-title">Data & Sourcing</h4>
        <p class="spec-p">${ps.dataSourcing}</p>
      </div>

      <div class="modal-section-block">
        <h4 class="spec-section-title">Judging Criteria</h4>
        <div class="criteria-table-wrap">
          <table class="modal-criteria-table">
            <thead>
              <tr>
                <th>Evaluation Criterion</th>
                <th style="text-align:right;">Weight</th>
              </tr>
            </thead>
            <tbody>
              ${ps.criteria.map(c => `
                <tr>
                  <td>${c.name}</td>
                  <td style="text-align:right; font-weight:700; color:var(--corrupt-cyan);">${c.weight}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if (submitTargetBtn) {
    submitTargetBtn.onclick = () => {
      closeProblemModal();
      document.getElementById("submit")?.scrollIntoView({ behavior: "smooth" });
    };
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeProblemModal = function() {
  const modal = document.getElementById("spec-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
};

// =========================================================================
// SUBMISSION BUTTON & LOCK STATE CONTROLLER
// =========================================================================
function initSubmitButton() {
  updateSubmissionState();
}

function updateSubmissionState() {
  const mainBtn = document.getElementById("main-submit-btn");
  const navBtn = document.querySelector(".nav-cta-btn");
  const modalBtn = document.getElementById("modal-submit-target-btn");
  const card = document.querySelector(".submission-redirect-card");
  const isOpen = Boolean(HACKATHON_CONFIG.submissionsOpen);

  if (mainBtn) {
    if (isOpen) {
      mainBtn.classList.remove("btn-locked");
      mainBtn.removeAttribute("aria-disabled");
      mainBtn.href = HACKATHON_CONFIG.submitUrl;
      mainBtn.target = "_blank";
      mainBtn.innerHTML = `<span>SUBMIT YOUR PROJECT</span><span class="btn-arrow">↗</span>`;
      mainBtn.onclick = null;
    } else {
      mainBtn.classList.add("btn-locked");
      mainBtn.setAttribute("aria-disabled", "true");
      mainBtn.removeAttribute("href");
      mainBtn.target = "";
      mainBtn.innerHTML = `<span>🔒 SUBMISSIONS LOCKED // DEADLINE REACHED</span>`;
      mainBtn.onclick = (e) => { e.preventDefault(); return false; };
    }
  }

  if (navBtn) {
    if (isOpen) {
      navBtn.classList.remove("btn-locked");
      navBtn.href = "#submit";
      navBtn.innerHTML = `<span>SUBMIT SOLUTION</span><span>↗</span>`;
    } else {
      navBtn.classList.add("btn-locked");
      navBtn.removeAttribute("href");
      navBtn.innerHTML = `<span>🔒 LOCKED</span>`;
    }
  }

  if (modalBtn) {
    if (isOpen) {
      modalBtn.classList.remove("btn-locked");
      modalBtn.innerHTML = `<span>SUBMIT FOR THIS PROBLEM</span><span>→</span>`;
    } else {
      modalBtn.classList.add("btn-locked");
      modalBtn.innerHTML = `<span>🔒 SUBMISSIONS CLOSED</span>`;
    }
  }

  if (card) {
    if (isOpen) {
      card.classList.remove("locked");
    } else {
      card.classList.add("locked");
    }
  }
}

// Live console helper for organizers to toggle submission lock
window.toggleSubmissions = (isOpen) => {
  HACKATHON_CONFIG.submissionsOpen = Boolean(isOpen);
  updateSubmissionState();
  console.log(`[THROTTLE] Submissions status: ${HACKATHON_CONFIG.submissionsOpen ? 'OPEN' : 'LOCKED'}`);
};

// =========================================================================
// MOBILE MENU & FAQ ACCORDION
// =========================================================================
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      const navbar = document.getElementById("navbar");
      if (navbar && !navbar.contains(e.target) && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  }
}

function initFaqAccordion() {
  document.querySelectorAll(".faq-question-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(other => {
        if (other !== item) other.classList.remove("active");
      });

      item.classList.toggle("active", !isOpen);
    });
  });
}

// =========================================================================
// CUSTOM CURSOR
// =========================================================================
function initCustomCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor || window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

  let mouseX = -100, mouseY = -100;
  let rafId = null;

  const updatePos = () => {
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    rafId = null;
  };

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = "1";
    if (!rafId) rafId = requestAnimationFrame(updatePos);
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });

  // Delegated hover effects for all current and dynamically created interactive elements
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, .glass-card, [role='button'], input, select, textarea, .faq-question-btn, .mobile-menu-btn")) {
      cursor.textContent = ">_";
      cursor.style.color = "var(--corrupt-cyan)";
      cursor.style.textShadow = "0 0 10px var(--corrupt-cyan)";
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, .glass-card, [role='button'], input, select, textarea, .faq-question-btn, .mobile-menu-btn")) {
      cursor.textContent = "█";
      cursor.style.color = "var(--corrupt-cyan)";
      cursor.style.textShadow = "var(--cyan-glow-sm)";
    }
  });
}
