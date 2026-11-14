/* ============================================================
   EdigiX prototype — in-memory data + app logic
   No backend: demo data lives in DB; grades persist in this browser.
   ============================================================ */

const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"];

const DB = {
  schools: [
    { id: "sc1", name: "Bright Future Academy", location: "Lekki, Lagos", generalAdmin: "Amaka Obi", generalAdminEmail: "amaka.general@edigix.demo" },
    { id: "sc2", name: "Chinua Achebe Secondary School", location: "Enugu", generalAdmin: "Femi Balogun" },
    { id: "sc3", name: "Unity Model College", location: "Abuja", generalAdmin: "Grace Danladi" },
  ],
  admins: [
    { id: "ad1", name: "Amaka Obi", email: "amaka.general@edigix.demo", schoolId: "sc1", title: "School Admin" },
    { id: "ad2", name: "Tunde Bakare", email: "tunde.admin@edigix.demo", schoolId: "sc1", title: "Assistant Admin" },
  ],
  tutors: [
    { id: "tu1", name: "Daniel Okafor", email: "daniel.tutor@edigix.demo", phone: "0803 111 2222", subject: "Frontend Development", schoolId: "sc1" },
    { id: "tu2", name: "Ifeoma Nwosu", email: "ifeoma.tutor@edigix.demo", phone: "0807 333 4444", subject: "Graphic Design", schoolId: "sc1" },
  ],
  students: [
    { id: "st1", firstName: "Chidera", lastName: "Umeh", class: "JSS 2", schoolId: "sc1", tutorId: "tu1", email: "chidera.student@edigix.demo",
      guardianName: "Mrs. Ngozi Umeh", guardianEmail: "guardian@edigix.demo", guardianPhone: "0802 555 1010",
      motherName: "Ngozi Umeh", motherEmail: "guardian@edigix.demo", motherPhone: "0802 555 1010",
      attendance: 92, attendanceRecords: [{ date: "Sat, 04 Jul 2026", present: true }, { date: "Sat, 27 Jun 2026", present: true }],
      scores: { "Intro to Programming": 78, "Web Basics": 85 },
      projects: [{ title: "Personal portfolio page", status: "Graded", grade: 85 }, { title: "Logo redesign brief", status: "Submitted", grade: null }] },
    { id: "st2", firstName: "Tobi", lastName: "Umeh", class: "Primary 5", schoolId: "sc1", tutorId: "tu2", email: "tobi.student@edigix.demo",
      guardianName: "Mrs. Ngozi Umeh", guardianEmail: "guardian@edigix.demo", guardianPhone: "0802 555 1010",
      motherName: "Ngozi Umeh", motherEmail: "guardian@edigix.demo", motherPhone: "0802 555 1010",
      attendance: 88, attendanceRecords: [{ date: "Sat, 04 Jul 2026", present: true }, { date: "Sat, 27 Jun 2026", present: false }],
      scores: { "Digital Literacy Basics": 90 },
      projects: [{ title: "Typing practice log", status: "Graded", grade: 90 }] },
    { id: "st3", firstName: "Kelechi", lastName: "Eze", class: "SS 3", schoolId: "sc1", tutorId: "tu1", email: "kelechi.student@edigix.demo",
      guardianName: "Mr. Paul Eze", guardianEmail: "paul.eze@edigix.demo", guardianPhone: "0805 222 9090",
      motherName: "", motherEmail: "", motherPhone: "",
      attendance: 95, attendanceRecords: [{ date: "Sat, 04 Jul 2026", present: true }, { date: "Sat, 27 Jun 2026", present: true }],
      scores: { "Advanced JavaScript": 88, "Capstone Project": 91 },
      projects: [{ title: "Capstone: school portal clone", status: "Graded", grade: 91 }] },
  ],
  curriculum: {
    "Primary 4": [
      { title: "What is a computer?", videoQuery: "what is a computer for kids Nigeria curriculum" },
      { title: "Parts of a computer system", videoQuery: "parts of a computer system primary school" },
      { title: "Keyboard and mouse basics", videoQuery: "keyboard and mouse basics for kids" },
    ],
    "Primary 5": [
      { title: "Typing and word processing", videoQuery: "typing and word processing basics kids" },
      { title: "Staying safe online", videoQuery: "online safety for children basics" },
    ],
    "JSS 1": [
      { title: "Intro to digital technology", videoQuery: "introduction to digital technology JSS1 Nigeria" },
      { title: "Intro to programming concepts", videoQuery: "intro to programming for beginners JSS1" },
    ],
    "JSS 2": [
      { title: "Web Basics: HTML & CSS", videoQuery: "HTML CSS basics for beginners" },
      { title: "Intro to Programming logic", videoQuery: "programming logic basics for teens" },
    ],
    "JSS 3": [
      { title: "Choosing a specialisation", videoQuery: "tech specialisation options for students" },
      { title: "Intro to Graphic Design", videoQuery: "graphic design basics for beginners" },
    ],
    "SS 1": [
      { title: "Applied web projects", videoQuery: "build your first website project tutorial" },
    ],
    "SS 2": [
      { title: "Advanced JavaScript", videoQuery: "advanced javascript tutorial for beginners" },
      { title: "UI/UX fundamentals", videoQuery: "UI UX design fundamentals tutorial" },
    ],
    "SS 3": [
      { title: "Capstone Project", videoQuery: "capstone project planning tutorial students" },
      { title: "Career mapping workshop", videoQuery: "choosing a tech career path guide" },
    ],
  },
  liveSessions: [
    { date: "Sat, 11 Jul 2026", topic: "Web Basics: HTML & CSS — building your first page", grade: "JSS 2", recording: null },
    { date: "Sat, 04 Jul 2026", topic: "Intro to Programming logic — sequences & loops", grade: "JSS 2", recording: "#" },
    { date: "Sat, 27 Jun 2026", topic: "Digital Literacy Basics — typing drills", grade: "Primary 5", recording: "#" },
  ],
  assignments: [
    { id: "as1", studentId: "st1", title: "Build a 3-section personal portfolio page", week: "Week 1", status: "Graded", grade: 85, tutorId: "tu1", submission: "https://github.com/chidera/portfolio-page", submittedAt: "2026-06-20" },
    { id: "as2", studentId: "st1", title: "Redesign a local business logo", week: "Week 2", status: "Submitted", grade: null, tutorId: "tu1", submission: "https://drive.google.com/logo-brief-chidera", submittedAt: "2026-07-05" },
    { id: "as3", studentId: "st3", title: "Capstone: school portal clone", week: "Week 4", status: "Graded", grade: 91, tutorId: "tu1", submission: "https://github.com/kelechi/portal-clone", submittedAt: "2026-06-28" },
    { id: "as4", studentId: "st1", title: "Add a responsive navigation bar", week: "Week 3", status: "Assigned", grade: null, tutorId: "tu1", submission: null, submittedAt: null },
  ],
};

const ASSIGNMENTS_KEY = "edigix.assignments.v1";
const ASSIGNMENT_GRADES_KEY = "edigix.assignmentGrades.v1";
const BUILT_IN_ASSIGNMENT_IDS = new Set(DB.assignments.map(a => a.id));

function restoreCreatedAssignments() {
  let savedAssignments;
  try {
    savedAssignments = localStorage.getItem(ASSIGNMENTS_KEY);
  } catch (error) {
    console.error("Could not read saved assignments", error);
    showToast("Saved assignments are unavailable in this browser");
    return;
  }
  if (savedAssignments === null) return;

  let assignments;
  try {
    assignments = JSON.parse(savedAssignments);
  } catch (error) {
    console.error("Could not parse saved assignments", error);
    showToast("Saved assignments could not be loaded");
    return;
  }
  if (!Array.isArray(assignments)) {
    console.error("Saved assignments are not in the expected format");
    showToast("Saved assignments could not be loaded");
    return;
  }

  assignments.forEach(assignment => {
    if (!assignment || typeof assignment.id !== "string" ||
        typeof assignment.studentId !== "string" || typeof assignment.tutorId !== "string" ||
        typeof assignment.title !== "string" || !WEEKS.includes(assignment.week) ||
        !["Assigned", "Submitted", "Graded"].includes(assignment.status) ||
        !(assignment.grade === null || (Number.isInteger(assignment.grade) && assignment.grade >= 0 && assignment.grade <= 100)) ||
        !(assignment.submission === null || typeof assignment.submission === "string") ||
        !(assignment.submittedAt === null || typeof assignment.submittedAt === "string")) {
      console.error("Skipping invalid saved assignment", assignment);
      return;
    }
    if (BUILT_IN_ASSIGNMENT_IDS.has(assignment.id) ||
        !DB.students.some(student => student.id === assignment.studentId) ||
        !DB.tutors.some(tutor => tutor.id === assignment.tutorId)) return;

    const existing = DB.assignments.find(item => item.id === assignment.id);
    if (existing) Object.assign(existing, assignment);
    else DB.assignments.push(assignment);

    const idNumber = Number(assignment.id.replace(/^as/, ""));
    if (Number.isInteger(idNumber)) idCounter = Math.max(idCounter, idNumber + 1);
  });
}

function saveCreatedAssignments() {
  const assignments = DB.assignments.filter(a => !BUILT_IN_ASSIGNMENT_IDS.has(a.id));
  try {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
    return true;
  } catch (error) {
    console.error("Could not save assignments", error);
    showToast("Assignment is visible for this session, but could not be saved on this device");
    return false;
  }
}

function restoreAssignmentGrades() {
  let savedGrades;
  try {
    savedGrades = localStorage.getItem(ASSIGNMENT_GRADES_KEY);
  } catch (error) {
    console.error("Could not read saved assignment grades", error);
    showToast("Saved grades are unavailable in this browser");
    return;
  }
  if (savedGrades === null) return;

  let grades;
  try {
    grades = JSON.parse(savedGrades);
  } catch (error) {
    console.error("Could not parse saved assignment grades", error);
    showToast("Saved grades could not be loaded");
    return;
  }
  if (!Array.isArray(grades)) {
    console.error("Saved assignment grades are not in the expected format");
    showToast("Saved grades could not be loaded");
    return;
  }

  grades.forEach(entry => {
    if (!entry || typeof entry.assignmentId !== "string" || !Number.isInteger(entry.grade) || entry.grade < 0 || entry.grade > 100) {
      console.error("Skipping invalid saved assignment grade", entry);
      return;
    }
    const assignment = DB.assignments.find(a => a.id === entry.assignmentId);
    if (!assignment) return;
    const student = DB.students.find(s => s.id === assignment.studentId);
    if (!student) return;
    assignment.status = "Graded";
    assignment.grade = entry.grade;
    student.scores[assignment.title] = entry.grade;
  });
}

function saveAssignmentGrades() {
  const grades = DB.assignments
    .filter(a => a.status === "Graded" && Number.isInteger(a.grade) && a.grade >= 0 && a.grade <= 100)
    .map(a => ({ assignmentId: a.id, grade: a.grade }));
  try {
    localStorage.setItem(ASSIGNMENT_GRADES_KEY, JSON.stringify(grades));
    return true;
  } catch (error) {
    console.error("Could not save assignment grades", error);
    showToast("Grade is visible for this session, but could not be saved on this device");
    return false;
  }
}

let idCounter = 100;
const nextId = (prefix) => `${prefix}${idCounter++}`;

// current session
let session = { role: null, userId: null, schoolId: null };
let uiState = { activeChildId: null, dashboardView: null };

// ---------------------------------------------------------------
// Screen navigation
// ---------------------------------------------------------------
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}
function goToMarketing() { showScreen("screen-marketing"); }
function goToLogin() { showScreen("screen-login"); renderRolePicker(); }

// ---------------------------------------------------------------
// Login
// ---------------------------------------------------------------
const ROLE_META = {
  superadmin: { label: "Super Admin", emoji: "⌂", sub: "Full system access", idLabel: "Email", demo: "superadmin@edigix.demo" },
  general: { label: "School Admin/Teacher", emoji: "⚙", sub: "One school portal", idLabel: "Email", demo: "amaka.general@edigix.demo" },
  tutor: { label: "Tech Tutor", emoji: "✎", sub: "Teach & grade", idLabel: "Email or phone", demo: "daniel.tutor@edigix.demo" },
  student: { label: "Student", emoji: "▣", sub: "Learn & submit", idLabel: "Email", demo: "chidera.student@edigix.demo" },
  parent: { label: "Parent / Guardian", emoji: "♥", sub: "Track a child", idLabel: "Email or phone", demo: "guardian@edigix.demo" },
};
let pickedRole = null;

function renderRolePicker() {
  const grid = document.getElementById("rolePickGrid");
  grid.innerHTML = Object.entries(ROLE_META).map(([key, m]) => `
    <button class="role-tile ${pickedRole === key ? "active" : ""}" onclick="pickRole('${key}')">
      <div class="role-emoji">${m.emoji}</div>
      <div class="role-title">${m.label}</div>
      <div class="role-sub">${m.sub}</div>
    </button>`).join("");
}
function pickRole(key) {
  pickedRole = key;
  renderRolePicker();
  const m = ROLE_META[key];
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("loginIdLabel").textContent = m.idLabel;
  document.getElementById("loginId").value = m.demo;
  document.getElementById("loginPass").value = "";
  const hints = {
    superadmin: "Demo super admin account pre-filled — any password works.",
    general: "Enter the email used when the super admin created your school — any password works. Demo account pre-filled.",
    tutor: "Enter the email the super admin registered you with — any password works. Demo account pre-filled.",
    student: "Enter the email your school admin registered you with — any password works. Demo account pre-filled.",
    parent: "Enter the email you gave at your child's registration — any password works. Demo account pre-filled.",
  };
  document.getElementById("loginHint").textContent = hints[key];
}
function attemptLogin() {
  if (!pickedRole) { showToast("Choose a portal first"); return; }
  const enteredId = document.getElementById("loginId").value.trim().toLowerCase();
  session.role = pickedRole;
  if (pickedRole === "superadmin") { session.userId = "super"; }
  if (pickedRole === "general") {
    const admin = DB.admins.find(a => a.email.toLowerCase() === enteredId && a.title === "School Admin")
      || DB.admins.find(a => a.email.toLowerCase() === enteredId)
      || DB.admins.find(a => a.id === "ad1");
    session.userId = admin.id; session.schoolId = admin.schoolId;
  }
  if (pickedRole === "tutor") {
    const tutor = DB.tutors.find(t => t.email.toLowerCase() === enteredId) || DB.tutors.find(t => t.id === "tu1");
    session.userId = tutor.id; session.schoolId = tutor.schoolId;
  }
  if (pickedRole === "student") {
    const student = DB.students.find(s => s.email && s.email.toLowerCase() === enteredId) || DB.students.find(s => s.id === "st1");
    session.userId = student.id; session.schoolId = student.schoolId;
  }
  if (pickedRole === "parent") {
    const child = DB.students.find(s => (s.guardianEmail && s.guardianEmail.toLowerCase() === enteredId) || (s.motherEmail && s.motherEmail.toLowerCase() === enteredId))
      || DB.students.find(s => s.id === "st1");
    const matchedEmail = (child.guardianEmail && child.guardianEmail.toLowerCase() === enteredId) ? child.guardianEmail
      : (child.motherEmail && child.motherEmail.toLowerCase() === enteredId) ? child.motherEmail
      : child.guardianEmail;
    session.userId = matchedEmail; session.schoolId = child.schoolId; uiState.activeChildId = child.id;
  }
  enterDashboard();
}
function logout() {
  session = { role: null, userId: null, schoolId: null };
  pickedRole = null;
  goToLogin();
}

// ---------------------------------------------------------------
// Dashboard shell
// ---------------------------------------------------------------
const NAV_CONFIG = {
  superadmin: [
    { id: "overview", label: "Overview", ic: "◆" },
    { id: "schools", label: "Schools", ic: "⌂" },
    { id: "tutors", label: "Tech tutors", ic: "✎" },
    { id: "system", label: "System settings", ic: "⚙" },
  ],
  general: [
    { id: "overview", label: "Overview", ic: "◆" },
    { id: "students", label: "Students", ic: "▣" },
    { id: "tutors", label: "Tech tutors", ic: "✎" },
    { id: "projects", label: "Submitted projects", ic: "▤" },
    { id: "admins", label: "Admins", ic: "☺" },
    { id: "scores", label: "Scores & projects", ic: "▤" },
  ],
  tutor: [
    { id: "overview", label: "Overview", ic: "◆" },
    { id: "roster", label: "My students", ic: "▣" },
    { id: "assignments", label: "Assignments & grading", ic: "✎" },
    { id: "attendance", label: "Attendance", ic: "◐" },
    { id: "curriculum", label: "Curriculum", ic: "▤" },
    { id: "live", label: "Live sessions", ic: "●" },
  ],
  student: [
    { id: "overview", label: "Overview", ic: "◆" },
    { id: "curriculum", label: "Curriculum", ic: "▤" },
    { id: "live", label: "Live sessions", ic: "●" },
    { id: "assignments", label: "My assignments", ic: "✎" },
    { id: "ai", label: "AI guidance", ic: "✦" },
  ],
  parent: [
    { id: "overview", label: "Overview", ic: "◆" },
    { id: "performance", label: "Performance", ic: "▤" },
    { id: "assignments", label: "Assignments", ic: "✎" },
    { id: "attendance", label: "Attendance", ic: "◐" },
  ],
};

function enterDashboard() {
  showScreen("screen-dashboard");
  const meta = ROLE_META[session.role];
  document.getElementById("sidebarRoleLabel").textContent = meta.label;
  document.getElementById("topbarBadge").textContent = meta.label.toUpperCase();
  document.getElementById("topbarAvatar").textContent = getUserInitials();
  renderSidebarNav();
  const first = NAV_CONFIG[session.role][0].id;
  setDashboardView(first);
}
function getUserInitials() {
  if (session.role === "superadmin") return "SA";
  if (session.role === "general") return "AO";
  if (session.role === "tutor") { const t = DB.tutors.find(t => t.id === session.userId); return t ? t.name.split(" ").map(n=>n[0]).join("") : "TT"; }
  if (session.role === "student") { const s = DB.students.find(s => s.id === session.userId); return s ? (s.firstName[0]+s.lastName[0]) : "ST"; }
  if (session.role === "parent") return "PG";
  return "??";
}
function renderSidebarNav() {
  const nav = NAV_CONFIG[session.role];
  document.getElementById("sidebarNav").innerHTML = nav.map(item => `
    <li><button data-view="${item.id}" onclick="setDashboardView('${item.id}')"><span class="ic">${item.ic}</span>${item.label}</button></li>
  `).join("");
}
function setDashboardView(viewId) {
  uiState.dashboardView = viewId;
  document.querySelectorAll("#sidebarNav button").forEach(b => b.classList.toggle("active", b.dataset.view === viewId));
  const nav = NAV_CONFIG[session.role].find(n => n.id === viewId);
  document.getElementById("topbarTitle").innerHTML = `${nav.label}<span class="sub">${ROLE_META[session.role].label} portal</span>`;
  const renderers = {
    superadmin: { overview: renderSA_Overview, schools: renderSA_Schools, tutors: renderSA_Tutors, system: renderSA_System },
    general: { overview: renderGA_Overview, students: renderGA_Students, tutors: renderGA_Tutors, projects: renderGA_Projects, admins: renderGA_Admins, scores: renderGA_Scores },
    tutor: { overview: renderTU_Overview, roster: renderTU_Roster, assignments: renderTU_Assignments, attendance: renderTU_Attendance, curriculum: renderTU_Curriculum, live: renderTU_Live },
    student: { overview: renderST_Overview, curriculum: renderST_Curriculum, live: renderST_Live, assignments: renderST_Assignments, ai: renderST_AI },
    parent: { overview: renderPA_Overview, performance: renderPA_Performance, assignments: renderPA_Assignments, attendance: renderPA_Attendance },
  };
  renderers[session.role][viewId]();
  toggleSidebar(false);
}
function toggleSidebar(open) {
  document.getElementById("sidebar").classList.toggle("open", open);
  document.getElementById("sidebarOverlay").classList.toggle("show", open);
}
function mainContent(html) { document.getElementById("mainContent").innerHTML = html; }

// ---------------------------------------------------------------
// Toast + modal helpers
// ---------------------------------------------------------------
function showToast(msg) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2800);
}
function openModal(html) {
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modalBackdrop").classList.add("show");
}
function closeModal() { document.getElementById("modalBackdrop").classList.remove("show"); }

// ---------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------
function schoolStudents(schoolId) { return DB.students.filter(s => s.schoolId === schoolId); }
function schoolTutors(schoolId) { return DB.tutors.filter(t => t.schoolId === schoolId); }
function schoolAdmins(schoolId) { return DB.admins.filter(a => a.schoolId === schoolId); }
function recomputeAttendance(student) {
  if (!student.attendanceRecords || !student.attendanceRecords.length) return;
  const present = student.attendanceRecords.filter(r => r.present).length;
  student.attendance = Math.round((present / student.attendanceRecords.length) * 100);
}
function groupByWeek(list) {
  const groups = {};
  WEEKS.forEach(w => groups[w] = []);
  list.forEach(a => { const w = a.week || "Unscheduled"; if (!groups[w]) groups[w] = []; groups[w].push(a); });
  return groups;
}
function avgScore(student) {
  const vals = Object.values(student.scores);
  if (!vals.length) return null;
  return Math.round(vals.reduce((a,b)=>a+b,0) / vals.length);
}
function pillForGrade(v) {
  if (v === null || v === undefined) return `<span class="pill pill-gray">Pending</span>`;
  if (v >= 80) return `<span class="pill pill-teal">${v}</span>`;
  if (v >= 60) return `<span class="pill pill-coral">${v}</span>`;
  return `<span class="pill pill-pink">${v}</span>`;
}
function downloadCSV(filename, rows) {
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* =================================================================
   SUPER ADMIN VIEWS
   ================================================================= */
function renderSA_Overview() {
  const totalStudents = DB.students.length;
  const totalTutors = DB.tutors.length;
  mainContent(`
    <div class="view-head"><div><h2>Network overview</h2><p>Every school currently onboarded to EdigiX.</p></div>
      <button class="btn btn-primary btn-sm" onclick="openAddSchoolModal()">+ Add school</button></div>
    <div class="stat-row">
      <div class="stat-card"><div class="stat-label">Schools</div><div class="stat-value teal">${DB.schools.length}</div></div>
      <div class="stat-card"><div class="stat-label">Students</div><div class="stat-value coral">${totalStudents}</div></div>
      <div class="stat-card"><div class="stat-label">Tech tutors</div><div class="stat-value pink">${totalTutors}</div></div>
      <div class="stat-card"><div class="stat-label">Live sessions logged</div><div class="stat-value">${DB.liveSessions.length}</div></div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Schools</h3><p>Full add / edit / delete rights across the network</p></div>
      <div class="table-scroll"><table><thead><tr><th>School</th><th>Location</th><th>School Admin/Teacher</th><th>Login email</th><th>Students</th><th>Tech tutors</th><th></th></tr></thead>
      <tbody>${DB.schools.map(s => `<tr><td><b>${s.name}</b></td><td>${s.location}</td><td>${s.generalAdmin}</td><td class="mono" style="font-size:12.5px;">${s.generalAdminEmail || "—"}</td><td>${schoolStudents(s.id).length}</td><td>${schoolTutors(s.id).length}</td>
        <td><button class="btn btn-outline-dark btn-sm" onclick="deleteSchool('${s.id}')">Delete</button></td></tr>`).join("")}</tbody></table></div>
    </div>
  `);
}
function renderSA_Schools() { renderSA_Overview(); }
function renderSA_System() {
  mainContent(`
    <div class="view-head"><div><h2>System settings</h2><p>Network-wide configuration super admins control.</p></div></div>
    <div class="panel">
      <div class="panel-head"><h3>Curriculum coverage</h3><p>Grades currently mapped on the platform</p></div>
      <div style="display:flex; flex-wrap:wrap; gap:8px;">${Object.keys(DB.curriculum).map(g => `<span class="chip-btn">${g}</span>`).join("")}</div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Platform-wide permissions</h3></div>
      <table><thead><tr><th>Capability</th><th>Super admin</th><th>General admin</th></tr></thead>
      <tbody>
        <tr><td>Create / delete schools</td><td><span class="pill pill-teal">Yes</span></td><td><span class="pill pill-gray">No</span></td></tr>
        <tr><td>Register students & tutors</td><td><span class="pill pill-teal">Yes</span></td><td><span class="pill pill-teal">Yes</span></td></tr>
        <tr><td>Edit curriculum</td><td><span class="pill pill-teal">Yes</span></td><td><span class="pill pill-gray">No</span></td></tr>
      </tbody></table>
    </div>
  `);
}
function renderSA_Tutors() {
  mainContent(`
    <div class="view-head"><div><h2>Tech tutors</h2><p>Add industry practitioners and assign them to any school's portal.</p></div>
      <button class="btn btn-primary btn-sm" onclick="openAddTutorSAModal()">+ Add tech tutor</button></div>
    <div class="panel"><div class="table-scroll"><table><thead><tr><th>Name</th><th>Specialism</th><th>School</th><th>Email</th><th>Phone</th><th>Students assigned</th></tr></thead>
    <tbody>${DB.tutors.map(t => {
      const school = DB.schools.find(s => s.id === t.schoolId);
      return `<tr><td><b>${t.name}</b></td><td>${t.subject}</td><td>${school ? school.name : "—"}</td><td class="mono" style="font-size:12.5px;">${t.email}</td><td>${t.phone}</td><td>${DB.students.filter(s=>s.tutorId===t.id).length}</td></tr>`;
    }).join("") || `<tr><td colspan="6"><div class="empty-state">No tutors yet</div></td></tr>`}</tbody></table></div></div>
  `);
}
function openAddTutorSAModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>Add a tech tutor</h3><p class="modal-sub">Assign this industry practitioner to a school's portal.</p>
    <div class="form-grid">
      <div class="field-l full"><label>Full name</label><input id="f_satname"></div>
      <div class="field-l full"><label>School</label><select id="f_satschool">${DB.schools.map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}</select></div>
      <div class="field-l full"><label>Specialism</label><input id="f_satsubject" placeholder="e.g. Graphic Design"></div>
      <div class="field-l"><label>Email</label><input id="f_sattemail"></div>
      <div class="field-l"><label>Phone</label><input id="f_sattphone"></div>
    </div>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="addTutorSA()">Create tutor account</button>
  `);
}
function addTutorSA() {
  const name = document.getElementById("f_satname").value.trim();
  const schoolId = document.getElementById("f_satschool").value;
  const subject = document.getElementById("f_satsubject").value.trim();
  const email = document.getElementById("f_sattemail").value.trim();
  if (!name || !email) { showToast("Name and email are required"); return; }
  DB.tutors.push({ id: nextId("tu"), name, subject: subject || "General tech", email, phone: document.getElementById("f_sattphone").value.trim(), schoolId });
  closeModal(); showToast(`${name} added to ${DB.schools.find(s=>s.id===schoolId).name}`); renderSA_Tutors();
}
function openAddSchoolModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>Add a new school</h3><p class="modal-sub">Creates the school's portal and its school admin/teacher login.</p>
    <div class="form-grid">
      <div class="field-l full"><label>School name</label><input id="f_schoolName" placeholder="e.g. Greenfield College"></div>
      <div class="field-l"><label>Location</label><input id="f_schoolLoc" placeholder="e.g. Ibadan"></div>
      <div class="field-l"><label>School admin/teacher name</label><input id="f_gaName" placeholder="e.g. Sade Bello"></div>
      <div class="field-l full"><label>School admin/teacher email</label><input id="f_gaEmail" placeholder="used to log in to the school portal"></div>
    </div>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="addSchool()">Create school portal</button>
  `);
}
function addSchool() {
  const name = document.getElementById("f_schoolName").value.trim();
  const loc = document.getElementById("f_schoolLoc").value.trim();
  const ga = document.getElementById("f_gaName").value.trim();
  const gaEmail = document.getElementById("f_gaEmail").value.trim();
  if (!name || !ga || !gaEmail) { showToast("School name, admin name and admin email are required"); return; }
  const school = { id: nextId("sc"), name, location: loc || "—", generalAdmin: ga, generalAdminEmail: gaEmail };
  DB.schools.push(school);
  DB.admins.push({ id: nextId("ad"), name: ga, email: gaEmail, schoolId: school.id, title: "School Admin" });
  closeModal(); showToast(`${name} added — ${ga} can now log in with ${gaEmail}`); renderSA_Overview();
}
function deleteSchool(id) {
  const s = DB.schools.find(s => s.id === id);
  DB.schools = DB.schools.filter(s => s.id !== id);
  showToast(`${s.name} removed`); renderSA_Overview();
}

/* =================================================================
   GENERAL ADMIN VIEWS
   ================================================================= */
function renderGA_Overview() {
  const students = schoolStudents(session.schoolId);
  const tutors = schoolTutors(session.schoolId);
  const school = DB.schools.find(s => s.id === session.schoolId);
  mainContent(`
    <div class="view-head"><div><h2>${school.name}</h2><p>General admin overview for your school portal.</p></div></div>
    <div class="stat-row">
      <div class="stat-card"><div class="stat-label">Students</div><div class="stat-value teal">${students.length}</div></div>
      <div class="stat-card"><div class="stat-label">Tech tutors</div><div class="stat-value coral">${tutors.length}</div></div>
      <div class="stat-card"><div class="stat-label">Admins</div><div class="stat-value pink">${schoolAdmins(session.schoolId).length}</div></div>
      <div class="stat-card"><div class="stat-label">Avg. attendance</div><div class="stat-value">${Math.round(students.reduce((a,s)=>a+s.attendance,0)/(students.length||1))}%</div></div>
    </div>
    <div class="two-col">
      <div class="panel">
        <div class="panel-head"><h3>Recently registered students</h3></div>
        <div class="table-scroll"><table><thead><tr><th>Name</th><th>Class</th><th>Guardian</th><th>Avg. score</th></tr></thead>
        <tbody>${students.slice(-5).reverse().map(s => `<tr><td>${s.firstName} ${s.lastName}</td><td>${s.class}</td><td>${s.guardianName}</td><td>${pillForGrade(avgScore(s))}</td></tr>`).join("")}</tbody></table></div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Tech tutors</h3></div>
        ${tutors.map(t => `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid var(--paper-dim);"><div><b style="font-size:13.5px;">${t.name}</b><div style="font-size:12px; color:var(--ink-soft);">${t.subject}</div></div></div>`).join("")}
      </div>
    </div>
  `);
}
function renderGA_Students() {
  const students = schoolStudents(session.schoolId);
  const tutors = schoolTutors(session.schoolId);
  mainContent(`
    <div class="view-head"><div><h2>Students</h2><p>Register students, issue logins, and assign each one to a tech tutor.</p></div>
      <button class="btn btn-primary btn-sm" onclick="openAddStudentModal()">+ Register student</button></div>
    <div class="panel">
      <div class="table-scroll"><table><thead><tr><th>Name</th><th>Class</th><th>Login email</th><th>Guardian / father</th><th>Assigned tutor</th><th></th></tr></thead>
      <tbody>${students.map(s => {
        const currentTutor = DB.tutors.find(t => t.id === s.tutorId);
        return `<tr><td><b>${s.firstName} ${s.lastName}</b></td><td>${s.class}</td><td class="mono" style="font-size:12.5px;">${s.email || "—"}</td><td>${s.guardianName}</td>
        <td>
          <select onchange="assignTutorToStudent('${s.id}', this.value)" style="padding:6px 8px; border-radius:8px; border:1px solid var(--line); font-size:13px;">
            <option value="">— Unassigned —</option>
            ${tutors.map(t => `<option value="${t.id}" ${t.id === s.tutorId ? "selected" : ""}>${t.name} (${t.subject})</option>`).join("")}
          </select>
        </td>
        <td><button class="btn btn-outline-dark btn-sm" onclick="issueCredentials('${s.id}')">Issue login</button></td></tr>`;
      }).join("") || `<tr><td colspan="6"><div class="empty-state">No students registered yet</div></td></tr>`}</tbody></table></div>
    </div>
  `);
}
function assignTutorToStudent(studentId, tutorId) {
  const s = DB.students.find(s => s.id === studentId);
  s.tutorId = tutorId || null;
  const t = DB.tutors.find(t => t.id === tutorId);
  showToast(t ? `${s.firstName} assigned to ${t.name}` : `${s.firstName} unassigned from tutor`);
  renderGA_Students();
}
function openAddStudentModal() {
  const classes = Object.keys(DB.curriculum);
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>Register a student</h3><p class="modal-sub">The student email becomes their portal login; guardian details create the parent portal login.</p>
    <div class="form-grid">
      <div class="field-l"><label>First name</label><input id="f_fn"></div>
      <div class="field-l"><label>Surname</label><input id="f_ln"></div>
      <div class="field-l full"><label>Class</label><select id="f_class">${classes.map(c=>`<option>${c}</option>`).join("")}</select></div>
      <div class="field-l full"><label>Student email</label><input id="f_semail" placeholder="used for the student portal login"></div>
      <div class="field-l"><label>Father / guardian name</label><input id="f_gname"></div>
      <div class="field-l"><label>Father / guardian phone</label><input id="f_gphone"></div>
      <div class="field-l full"><label>Father / guardian email</label><input id="f_gemail" placeholder="used for the parent portal login"></div>
      <div class="field-l"><label>Mother's name (optional)</label><input id="f_mname"></div>
      <div class="field-l"><label>Mother's phone (optional)</label><input id="f_mphone"></div>
      <div class="field-l full"><label>Mother's email (optional)</label><input id="f_memail"></div>
    </div>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="addStudent()">Register student</button>
  `);
}
function addStudent() {
  const fn = document.getElementById("f_fn").value.trim();
  const ln = document.getElementById("f_ln").value.trim();
  const semail = document.getElementById("f_semail").value.trim();
  const gname = document.getElementById("f_gname").value.trim();
  const gemail = document.getElementById("f_gemail").value.trim();
  if (!fn || !ln || !semail || !gname || !gemail) { showToast("Name, student email, guardian name and guardian email are required"); return; }
  DB.students.push({
    id: nextId("st"), firstName: fn, lastName: ln, class: document.getElementById("f_class").value,
    schoolId: session.schoolId, tutorId: null, email: semail,
    guardianName: gname, guardianEmail: gemail, guardianPhone: document.getElementById("f_gphone").value.trim(),
    motherName: document.getElementById("f_mname").value.trim(), motherEmail: document.getElementById("f_memail").value.trim(), motherPhone: document.getElementById("f_mphone").value.trim(),
    attendance: 100, attendanceRecords: [], scores: {}, projects: [],
  });
  closeModal(); showToast(`${fn} ${ln} registered — they can log in with ${semail}`); renderGA_Students();
}
function issueCredentials(id) {
  const s = DB.students.find(s => s.id === id);
  showToast(`Login issued to ${s.firstName} — they'll sign in with ${s.email || "their registered email"}`);
}
function renderGA_Tutors() {
  const tutors = schoolTutors(session.schoolId);
  mainContent(`
    <div class="view-head"><div><h2>Tech tutors</h2><p>Industry practitioners the super admin has added to your portal — assign students to them from the Students tab.</p></div></div>
    <div class="panel"><div class="table-scroll"><table><thead><tr><th>Name</th><th>Specialism</th><th>Email</th><th>Phone</th><th>Students assigned</th></tr></thead>
    <tbody>${tutors.map(t => `<tr><td><b>${t.name}</b></td><td>${t.subject}</td><td class="mono" style="font-size:12.5px;">${t.email}</td><td>${t.phone}</td><td>${DB.students.filter(s=>s.tutorId===t.id).length}</td></tr>`).join("") || `<tr><td colspan="5"><div class="empty-state">No tutors yet — ask the super admin to add one to this school.</div></td></tr>`}</tbody></table></div></div>
  `);
}
function renderGA_Projects() {
  const students = schoolStudents(session.schoolId);
  const studentIds = students.map(s => s.id);
  const submitted = DB.assignments.filter(a => studentIds.includes(a.studentId) && (a.status === "Submitted" || a.status === "Graded"));
  mainContent(`
    <div class="view-head"><div><h2>Submitted projects</h2><p>Everything students in your school have turned in, across all tutors.</p></div></div>
    <div class="panel"><div class="table-scroll"><table><thead><tr><th>Student</th><th>Task</th><th>Week</th><th>Tutor</th><th>Status</th><th>Grade</th><th>Submission</th></tr></thead>
    <tbody>${submitted.map(a => {
      const s = DB.students.find(s => s.id === a.studentId);
      const t = DB.tutors.find(t => t.id === a.tutorId);
      return `<tr><td>${s ? s.firstName+" "+s.lastName : "—"}</td><td>${a.title}</td><td>${a.week || "—"}</td><td>${t ? t.name : "—"}</td>
        <td><span class="pill ${a.status==='Graded'?'pill-teal':'pill-coral'}">${a.status}</span></td><td>${pillForGrade(a.grade)}</td>
        <td>${a.submission ? `<a href="${a.submission}" target="_blank" rel="noopener">View submission</a>` : "—"}</td></tr>`;
    }).join("") || `<tr><td colspan="7"><div class="empty-state">No submissions yet</div></td></tr>`}</tbody></table></div></div>
  `);
}
function renderGA_Admins() {
  const admins = schoolAdmins(session.schoolId);
  mainContent(`
    <div class="view-head"><div><h2>Admins</h2><p>Other admin accounts you have appointed within this school.</p></div>
      <button class="btn btn-primary btn-sm" onclick="openAddAdminModal()">+ Add admin</button></div>
    <div class="panel"><table><thead><tr><th>Name</th><th>Title</th><th>Email</th></tr></thead>
    <tbody>${admins.map(a => `<tr><td><b>${a.name}</b></td><td>${a.title}</td><td class="mono" style="font-size:12.5px;">${a.email}</td></tr>`).join("")}</tbody></table></div>
  `);
}
function openAddAdminModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>Add an admin</h3><p class="modal-sub">Delegate day-to-day tasks within your school portal.</p>
    <div class="form-grid">
      <div class="field-l full"><label>Full name</label><input id="f_aname"></div>
      <div class="field-l"><label>Title</label><input id="f_atitle" placeholder="e.g. Records Admin"></div>
      <div class="field-l"><label>Email</label><input id="f_aemail"></div>
    </div>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="addAdmin()">Create admin account</button>
  `);
}
function addAdmin() {
  const name = document.getElementById("f_aname").value.trim();
  const email = document.getElementById("f_aemail").value.trim();
  if (!name || !email) { showToast("Name and email are required"); return; }
  DB.admins.push({ id: nextId("ad"), name, email, schoolId: session.schoolId, title: document.getElementById("f_atitle").value.trim() || "Admin" });
  closeModal(); showToast(`${name} added as admin`); renderGA_Admins();
}
function renderGA_Scores() {
  const students = schoolStudents(session.schoolId);
  mainContent(`
    <div class="view-head"><div><h2>Scores & projects</h2><p>Everything tutors have graded across your school.</p></div>
      <button class="btn btn-outline-dark btn-sm" onclick="exportScoresCSV()">⬇ Export CSV</button></div>
    <div class="panel"><div class="table-scroll"><table><thead><tr><th>Student</th><th>Class</th><th>Avg. score</th><th>Projects</th><th>Attendance</th></tr></thead>
    <tbody>${students.map(s => `<tr><td><b>${s.firstName} ${s.lastName}</b></td><td>${s.class}</td><td>${pillForGrade(avgScore(s))}</td><td>${s.projects.length}</td><td>${s.attendance}%</td></tr>`).join("")}</tbody></table></div></div>
  `);
}
function exportScoresCSV() {
  const students = schoolStudents(session.schoolId);
  const rows = [["First name","Surname","Class","Average score","Attendance %","Projects"]];
  students.forEach(s => rows.push([s.firstName, s.lastName, s.class, avgScore(s) ?? "", s.attendance, s.projects.length]));
  downloadCSV("edigix-scores.csv", rows);
  showToast("CSV downloaded");
}

/* =================================================================
   TECH TUTOR VIEWS
   ================================================================= */
function myStudents() { return DB.students.filter(s => s.tutorId === session.userId); }
function renderTU_Overview() {
  const tutor = DB.tutors.find(t => t.id === session.userId);
  const students = myStudents();
  mainContent(`
    <div class="view-head"><div><h2>Welcome, ${tutor.name.split(" ")[0]}</h2><p>${tutor.subject} · ${students.length} students assigned to you.</p></div></div>
    <div class="stat-row">
      <div class="stat-card"><div class="stat-label">My students</div><div class="stat-value teal">${students.length}</div></div>
      <div class="stat-card"><div class="stat-label">Assignments to grade</div><div class="stat-value coral">${DB.assignments.filter(a=>a.tutorId===session.userId && a.status==="Submitted").length}</div></div>
      <div class="stat-card"><div class="stat-label">Next live session</div><div class="stat-value" style="font-size:16px;">${DB.liveSessions[0].date}</div></div>
      <div class="stat-card"><div class="stat-label">Curriculum grades covered</div><div class="stat-value">${Object.keys(DB.curriculum).length}</div></div>
    </div>
    <div class="panel"><div class="panel-head"><h3>My students</h3></div>
    <table><thead><tr><th>Name</th><th>Class</th><th>Avg. score</th></tr></thead>
    <tbody>${students.map(s => `<tr><td>${s.firstName} ${s.lastName}</td><td>${s.class}</td><td>${pillForGrade(avgScore(s))}</td></tr>`).join("")}</tbody></table></div>
  `);
}
function renderTU_Roster() {
  const students = myStudents();
  mainContent(`
    <div class="view-head"><div><h2>My students</h2><p>Track performance for students assigned to you.</p></div></div>
    <div class="panel"><div class="table-scroll"><table><thead><tr><th>Name</th><th>Class</th><th>Attendance</th><th>Avg. score</th><th>Projects</th></tr></thead>
    <tbody>${students.map(s => `<tr><td><b>${s.firstName} ${s.lastName}</b></td><td>${s.class}</td><td>${s.attendance}%</td><td>${pillForGrade(avgScore(s))}</td><td>${s.projects.length}</td></tr>`).join("")}</tbody></table></div></div>
  `);
}
function renderTU_Assignments() {
  const assignments = DB.assignments.filter(a => a.tutorId === session.userId);
  const groups = groupByWeek(assignments);
  mainContent(`
    <div class="view-head"><div><h2>Assignments & grading</h2><p>Assign tasks by week, review what students have submitted, and grade their work.</p></div>
      <button class="btn btn-primary btn-sm" onclick="openAssignTaskModal()">+ Assign task</button></div>
    ${Object.keys(groups).filter(w => groups[w].length).map(week => `
      <div class="panel">
        <div class="panel-head"><h3>${week}</h3></div>
        <div class="table-scroll"><table><thead><tr><th>Student</th><th>Task</th><th>Status</th><th>Submission</th><th>Grade</th><th></th></tr></thead>
        <tbody>${groups[week].map(a => {
          const s = DB.students.find(s=>s.id===a.studentId);
          return `<tr><td>${s ? s.firstName+" "+s.lastName : "—"}</td><td>${a.title}</td><td><span class="pill ${a.status==='Graded'?'pill-teal':a.status==='Submitted'?'pill-coral':'pill-gray'}">${a.status}</span></td>
          <td>${a.submission ? `<a href="${a.submission}" target="_blank" rel="noopener">View submission</a>` : "—"}</td><td>${pillForGrade(a.grade)}</td>
          <td>${a.status === 'Submitted' ? `<button class="btn btn-outline-dark btn-sm" onclick="openGradeModal('${a.id}')">Grade</button>` : ""}</td></tr>`;
        }).join("")}</tbody></table></div>
      </div>`).join("") || `<div class="panel"><div class="empty-state">No assignments yet</div></div>`}
  `);
}
function openAssignTaskModal() {
  const students = myStudents();
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>Assign a task</h3><p class="modal-sub">The task appears in the student's assignment list immediately, under the chosen week.</p>
    <div class="form-grid">
      <div class="field-l full"><label>Student</label><select id="f_taskStudent">${students.map(s=>`<option value="${s.id}">${s.firstName} ${s.lastName} — ${s.class}</option>`).join("")}</select></div>
      <div class="field-l full"><label>Week</label><select id="f_taskWeek">${WEEKS.map(w=>`<option>${w}</option>`).join("")}</select></div>
      <div class="field-l full"><label>Task title</label><input id="f_taskTitle" placeholder="e.g. Build a responsive nav bar"></div>
    </div>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="assignTask()">Assign task</button>
  `);
}
function assignTask() {
  const studentId = document.getElementById("f_taskStudent").value;
  const week = document.getElementById("f_taskWeek").value;
  const title = document.getElementById("f_taskTitle").value.trim();
  if (!title) { showToast("Task title is required"); return; }
  DB.assignments.push({ id: nextId("as"), studentId, title, week, status: "Assigned", grade: null, tutorId: session.userId, submission: null, submittedAt: null });
  closeModal();
  if (saveCreatedAssignments()) showToast("Task assigned");
  renderTU_Assignments();
}
function openGradeModal(assignmentId) {
  const a = DB.assignments.find(a => a.id === assignmentId);
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>Grade task</h3><p class="modal-sub">${a.title}${a.submission ? ` — <a href="${a.submission}" target="_blank" rel="noopener">view submission</a>` : ""}</p>
    <div class="field-l"><label>Score (0–100)</label><input type="number" min="0" max="100" id="f_gradeScore"></div>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="submitGrade('${a.id}')">Save grade</button>
  `);
}
function submitGrade(assignmentId) {
  const score = document.getElementById("f_gradeScore").valueAsNumber;
  if (!Number.isInteger(score) || score < 0 || score > 100) { showToast("Enter a score from 0 to 100"); return; }
  const a = DB.assignments.find(a => a.id === assignmentId);
  if (!a || a.status !== "Submitted") { showToast("This assignment is no longer awaiting a grade"); return; }
  a.status = "Graded"; a.grade = score;
  const student = DB.students.find(s => s.id === a.studentId);
  if (student) { student.scores[a.title] = score; }
  closeModal();
  const assignmentSaved = saveCreatedAssignments();
  const gradeSaved = saveAssignmentGrades();
  if (assignmentSaved && gradeSaved) showToast("Grade saved");
  renderTU_Assignments();
}
function renderTU_Attendance() {
  const students = myStudents();
  const nextSession = DB.liveSessions[0];
  mainContent(`
    <div class="view-head"><div><h2>Attendance</h2><p>Mark who joined the live practical on ${nextSession.date}.</p></div></div>
    <div class="panel">
      <div class="table-scroll"><table><thead><tr><th>Student</th><th>Class</th><th>Overall attendance</th><th>Mark for ${nextSession.date}</th></tr></thead>
      <tbody>${students.map(s => {
        const already = (s.attendanceRecords || []).find(r => r.date === nextSession.date);
        return `<tr><td><b>${s.firstName} ${s.lastName}</b></td><td>${s.class}</td><td>${s.attendance}%</td>
        <td>
          <button class="btn btn-sm ${already && already.present ? 'btn-primary' : 'btn-outline-dark'}" onclick="markAttendance('${s.id}', true)">Present</button>
          <button class="btn btn-sm ${already && !already.present ? 'btn-danger' : 'btn-outline-dark'}" onclick="markAttendance('${s.id}', false)" style="margin-left:6px;">Absent</button>
        </td></tr>`;
      }).join("") || `<tr><td colspan="4"><div class="empty-state">No students assigned to you yet</div></td></tr>`}</tbody></table></div>
    </div>
  `);
}
function markAttendance(studentId, present) {
  const s = DB.students.find(s => s.id === studentId);
  const sessionDate = DB.liveSessions[0].date;
  if (!s.attendanceRecords) s.attendanceRecords = [];
  const existing = s.attendanceRecords.find(r => r.date === sessionDate);
  if (existing) { existing.present = present; } else { s.attendanceRecords.push({ date: sessionDate, present }); }
  recomputeAttendance(s);
  showToast(`${s.firstName} marked ${present ? "present" : "absent"} for ${sessionDate}`);
  renderTU_Attendance();
}
function renderTU_Curriculum() { mainContent(curriculumAccordionHTML("Curriculum reference", "Browse topics to reference while teaching.")); }
function renderTU_Live() { mainContent(liveSessionsHTML()); }

/* =================================================================
   STUDENT VIEWS
   ================================================================= */
function currentStudent() { return DB.students.find(s => s.id === session.userId); }
function renderST_Overview() {
  const s = currentStudent();
  mainContent(`
    <div class="view-head"><div><h2>Welcome back, ${s.firstName}</h2><p>${s.class} · keep up the momentum.</p></div></div>
    <div class="stat-row">
      <div class="stat-card"><div class="stat-label">Average score</div><div class="stat-value teal">${avgScore(s) ?? "—"}</div></div>
      <div class="stat-card"><div class="stat-label">Attendance</div><div class="stat-value coral">${s.attendance}%</div></div>
      <div class="stat-card"><div class="stat-label">Assignments</div><div class="stat-value pink">${DB.assignments.filter(a=>a.studentId===s.id).length}</div></div>
      <div class="stat-card"><div class="stat-label">Next live session</div><div class="stat-value" style="font-size:16px;">Sat</div></div>
    </div>
    ${liveSessionsHTML(true)}
  `);
}
function renderST_Curriculum() {
  const s = currentStudent();
  mainContent(curriculumAccordionHTML("My curriculum", `Every topic for ${s.class}, and the grades around it, linked to curated videos.`, s.class));
}
function renderST_Live() { mainContent(liveSessionsHTML()); }
function renderST_Assignments() {
  const s = currentStudent();
  const assignments = DB.assignments.filter(a => a.studentId === s.id);
  const groups = groupByWeek(assignments);
  mainContent(`
    <div class="view-head"><div><h2>My assignments</h2><p>Tasks set by your tech tutor, organised by week.</p></div></div>
    ${Object.keys(groups).filter(w => groups[w].length).map(week => `
      <div class="panel">
        <div class="panel-head"><h3>${week}</h3></div>
        <div class="table-scroll"><table><thead><tr><th>Task</th><th>Status</th><th>Grade</th><th></th></tr></thead>
        <tbody>${groups[week].map(a => `<tr><td>${a.title}</td><td><span class="pill ${a.status==='Graded'?'pill-teal':a.status==='Submitted'?'pill-coral':'pill-gray'}">${a.status}</span></td><td>${pillForGrade(a.grade)}</td>
          <td>${a.status === 'Assigned' ? `<button class="btn btn-primary btn-sm" onclick="openSubmitTaskModal('${a.id}')">Submit</button>` : (a.submission ? `<a href="${a.submission}" target="_blank" rel="noopener">View submission</a>` : "")}</td></tr>`).join("")}</tbody></table></div>
      </div>`).join("") || `<div class="panel"><div class="empty-state">Nothing assigned yet</div></div>`}
  `);
}
function openSubmitTaskModal(assignmentId) {
  const a = DB.assignments.find(a => a.id === assignmentId);
  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>Submit task</h3><p class="modal-sub">${a.title}</p>
    <div class="field-l full"><label>Link to your work (Drive, GitHub, etc.)</label><input id="f_submissionLink" placeholder="https://..."></div>
    <button class="btn btn-primary btn-block" style="margin-top:20px;" onclick="submitTask('${a.id}')">Submit for grading</button>
  `);
}
function submitTask(assignmentId) {
  const link = document.getElementById("f_submissionLink").value.trim();
  if (!link) { showToast("Add a link to your work first"); return; }
  const a = DB.assignments.find(a => a.id === assignmentId);
  a.status = "Submitted"; a.submission = link; a.submittedAt = new Date().toISOString().slice(0,10);
  closeModal();
  if (saveCreatedAssignments()) showToast("Task submitted — your tutor will grade it");
  renderST_Assignments();
}
function renderST_AI() {
  mainContent(`
    <div class="view-head"><div><h2>AI guidance</h2><p>Fill the end-of-term form to get matched to a holiday program, or a career path if you're graduating.</p></div></div>
    <div class="two-col">
      <div class="panel">
        <div class="panel-head"><h3>Holiday program matcher</h3><p>Runs at the end of every term</p></div>
        <div class="form-grid">
          <div class="field-l"><label>Preferred format</label><select id="f_aiFormat"><option>Online</option><option>Physical</option><option>Either</option></select></div>
          <div class="field-l"><label>Budget range</label><select id="f_aiBudget"><option>Under ₦20,000</option><option>₦20,000–₦50,000</option><option>Above ₦50,000</option></select></div>
          <div class="field-l full"><label>Area you most want to improve</label><input id="f_aiArea" placeholder="e.g. UI design, JavaScript"></div>
        </div>
        <button class="btn btn-primary btn-block" style="margin-top:18px;" onclick="runHolidayMatch()">Find my match</button>
        <div id="aiHolidayResult"></div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Career mapping</h3><p>For students completing JSS3 or SS3</p></div>
        <p style="font-size:14px; color:var(--ink-soft); margin-bottom:16px;">Based on your performance and current in-demand tech skills, EdigiX will recommend a career path and a training centre with strength in that area.</p>
        <button class="btn btn-outline-dark btn-block" onclick="runCareerMatch()">Run career mapping</button>
        <div id="aiCareerResult"></div>
      </div>
    </div>
  `);
}
function runHolidayMatch() {
  const format = document.getElementById("f_aiFormat").value;
  const area = document.getElementById("f_aiArea").value.trim() || "general tech skills";
  document.getElementById("aiHolidayResult").innerHTML = `
    <div class="panel" style="margin-top:16px; background:var(--paper-dim); border:none;">
      <p style="font-size:13.5px;"><b>Matched:</b> ${format} program focused on <b>${area}</b> at <b>CodeHub Youth Academy</b>, rated strong in this area and within your budget.</p>
      <p style="font-size:13px; color:var(--ink-soft); margin-top:8px;"><b>Program dates:</b> Starts Mon, 03 Aug 2026 · Ends Fri, 28 Aug 2026</p>
      <a class="btn btn-coral btn-sm" style="margin-top:12px; display:inline-flex;" href="https://edigix.demo/apply/codehub-youth-academy" target="_blank" rel="noopener">Apply for this program →</a>
    </div>`;
}
function runCareerMatch() {
  const s = currentStudent();
  const avg = avgScore(s) ?? 75;
  const career = avg >= 85 ? "Frontend Software Engineer" : avg >= 70 ? "UI/UX Designer" : "Digital Marketing Associate";
  document.getElementById("aiCareerResult").innerHTML = `
    <div class="panel" style="margin-top:16px; background:var(--paper-dim); border:none;">
      <p style="font-size:13.5px;"><b>Recommended path:</b> ${career}. <b>Suggested training centre:</b> Ingressive Learning Hub.</p>
      <p style="font-size:13px; color:var(--ink-soft); margin-top:8px;"><b>Next intake:</b> Starts Mon, 17 Aug 2026 · Ends Fri, 06 Nov 2026</p>
      <a class="btn btn-coral btn-sm" style="margin-top:12px; display:inline-flex;" href="https://edigix.demo/apply/ingressive-learning-hub" target="_blank" rel="noopener">Apply for this program →</a>
    </div>`;
}

/* =================================================================
   PARENT VIEWS
   ================================================================= */
function myChildren() { return DB.students.filter(s => s.guardianEmail === session.userId || s.motherEmail === session.userId); }
function childTabsHTML() {
  const kids = myChildren();
  return `<div class="child-tab">${kids.map(k => `<button class="${uiState.activeChildId===k.id?'active':''}" onclick="setActiveChild('${k.id}')">${k.firstName} — ${k.class}</button>`).join("")}</div>`;
}
function setActiveChild(id) { uiState.activeChildId = id; setDashboardView(uiState.dashboardView); }
function activeChild() { return DB.students.find(s => s.id === uiState.activeChildId) || myChildren()[0]; }
function renderPA_Overview() {
  const c = activeChild();
  mainContent(`
    <div class="view-head"><div><h2>Family overview</h2><p>Tracking ${myChildren().length} child${myChildren().length>1?'ren':''} on EdigiX.</p></div></div>
    ${childTabsHTML()}
    <div class="stat-row">
      <div class="stat-card"><div class="stat-label">${c.firstName}'s class</div><div class="stat-value" style="font-size:20px;">${c.class}</div></div>
      <div class="stat-card"><div class="stat-label">Average score</div><div class="stat-value teal">${avgScore(c) ?? "—"}</div></div>
      <div class="stat-card"><div class="stat-label">Attendance</div><div class="stat-value coral">${c.attendance}%</div></div>
      <div class="stat-card"><div class="stat-label">Projects</div><div class="stat-value pink">${c.projects.length}</div></div>
    </div>
    <div class="panel"><div class="panel-head"><h3>Recent projects</h3></div>
    <table><thead><tr><th>Project</th><th>Status</th><th>Grade</th></tr></thead>
    <tbody>${c.projects.map(p => `<tr><td>${p.title}</td><td><span class="pill ${p.status==='Graded'?'pill-teal':'pill-coral'}">${p.status}</span></td><td>${pillForGrade(p.grade)}</td></tr>`).join("")}</tbody></table></div>
  `);
}
function renderPA_Performance() {
  const c = activeChild();
  const entries = Object.entries(c.scores);
  mainContent(`
    <div class="view-head"><div><h2>Performance</h2><p>Score breakdown by topic for ${c.firstName}.</p></div></div>
    ${childTabsHTML()}
    <div class="panel">
      ${entries.length ? entries.map(([topic, score]) => `
        <div style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; font-size:13.5px; margin-bottom:6px;"><span>${topic}</span><b>${score}</b></div>
          <div class="progress-bar"><div style="width:${score}%;"></div></div>
        </div>`).join("") : `<div class="empty-state">No scores recorded yet</div>`}
    </div>
  `);
}
function renderPA_Assignments() {
  const c = activeChild();
  const assignments = DB.assignments.filter(a => a.studentId === c.id);
  const groups = groupByWeek(assignments);
  mainContent(`
    <div class="view-head"><div><h2>Assignments</h2><p>Tasks ${c.firstName} has submitted, by week.</p></div></div>
    ${childTabsHTML()}
    ${Object.keys(groups).filter(w => groups[w].length).map(week => `
      <div class="panel">
        <div class="panel-head"><h3>${week}</h3></div>
        <div class="table-scroll"><table><thead><tr><th>Task</th><th>Status</th><th>Grade</th><th>Submission</th></tr></thead>
        <tbody>${groups[week].map(a => `<tr><td>${a.title}</td><td><span class="pill ${a.status==='Graded'?'pill-teal':a.status==='Submitted'?'pill-coral':'pill-gray'}">${a.status}</span></td><td>${pillForGrade(a.grade)}</td>
          <td>${a.submission ? `<a href="${a.submission}" target="_blank" rel="noopener">View submission</a>` : "—"}</td></tr>`).join("")}</tbody></table></div>
      </div>`).join("") || `<div class="panel"><div class="empty-state">No assignments yet</div></div>`}
  `);
}
function renderPA_Attendance() {
  const c = activeChild();
  mainContent(`
    <div class="view-head"><div><h2>Attendance</h2><p>Live session participation for ${c.firstName}.</p></div></div>
    ${childTabsHTML()}
    <div class="panel">
      <div style="display:flex; align-items:center; gap:20px;">
        <div style="width:90px;height:90px;border-radius:50%;background:conic-gradient(var(--teal) ${c.attendance*3.6}deg, var(--paper-dim) 0deg); display:flex; align-items:center; justify-content:center;">
          <div style="width:66px;height:66px;border-radius:50%;background:var(--white); display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-weight:700;">${c.attendance}%</div>
        </div>
        <p style="font-size:14px; color:var(--ink-soft); max-width:38ch;">${c.firstName} has attended ${c.attendance}% of live Saturday practicals this term.</p>
      </div>
    </div>
    <div class="panel"><div class="panel-head"><h3>Session log</h3></div>
    <table><thead><tr><th>Date</th><th>Topic</th><th>Recording</th></tr></thead>
    <tbody>${DB.liveSessions.map(ls => `<tr><td>${ls.date}</td><td>${ls.topic}</td><td>${ls.recording ? '<a href="#" onclick="return false;">Watch replay</a>' : '<span class="pill pill-gray">Upcoming</span>'}</td></tr>`).join("")}</tbody></table></div>
  `);
}

/* =================================================================
   SHARED: curriculum accordion + live sessions
   ================================================================= */
function curriculumAccordionHTML(title, sub, highlightGrade) {
  const grades = Object.keys(DB.curriculum);
  return `
    <div class="view-head"><div><h2>${title}</h2><p>${sub}</p></div></div>
    ${grades.map((g, i) => `
      <div class="accordion-item ${highlightGrade===g ? 'open' : ''}" id="acc-${i}">
        <button class="accordion-head" onclick="toggleAccordion(${i})">
          <span><span class="grade-tag">${g}</span>${DB.curriculum[g].length} topics</span>
          <span class="chev">⌄</span>
        </button>
        <div class="accordion-body">
          ${DB.curriculum[g].map(t => `
            <div class="topic-row">
              <span>${t.title}</span>
              <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(t.videoQuery)}" target="_blank" rel="noopener">▶ Curated videos</a>
            </div>`).join("")}
        </div>
      </div>`).join("")}
  `;
}
function toggleAccordion(i) { document.getElementById(`acc-${i}`).classList.toggle("open"); }
function liveSessionsHTML(compact) {
  const next = DB.liveSessions[0];
  const past = DB.liveSessions.slice(1);
  return `
    ${!compact ? `<div class="view-head"><div><h2>Live sessions</h2><p>Weekly Saturday practicals covering that week's curriculum topic.</p></div></div>` : `<div class="panel-head" style="margin-bottom:12px;"><h3>Live sessions</h3></div>`}
    <div class="session-card">
      <div><span class="label">Next Saturday practical</span><h4>${next.topic}</h4><div class="meta">${next.date} · ${next.grade}</div></div>
      <button class="btn btn-coral">Join session</button>
    </div>
    ${!compact ? `
    <div class="panel" style="margin-top:20px;"><div class="panel-head"><h3>Past sessions & recordings</h3></div>
    <table><thead><tr><th>Date</th><th>Topic</th><th>Grade</th><th>Recording</th></tr></thead>
    <tbody>${past.map(ls => `<tr><td>${ls.date}</td><td>${ls.topic}</td><td>${ls.grade}</td><td>${ls.recording ? '<a href="#" onclick="return false;">Watch replay</a>' : '—'}</td></tr>`).join("")}</tbody></table></div>` : ""}
  `;
}

// ---------------------------------------------------------------
// Init
// ---------------------------------------------------------------
restoreCreatedAssignments();
restoreAssignmentGrades();
window.addEventListener("storage", event => {
  if (event.key !== ASSIGNMENTS_KEY && event.key !== ASSIGNMENT_GRADES_KEY) return;
  restoreCreatedAssignments();
  restoreAssignmentGrades();
  if (session.role && document.getElementById("screen-dashboard").classList.contains("active")) {
    setDashboardView(uiState.dashboardView);
  }
});
renderRolePicker();
