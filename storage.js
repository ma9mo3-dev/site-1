// التأكد من دخول المستخدم
const currentUser = localStorage.getItem('current_user');
if (!currentUser) {
  window.location.href = 'index.html';
}

// تحميل المستودعات للمستخدم الحالي
function loadRepos() {
  const container = document.getElementById('repos-container');
  const repos = JSON.parse(localStorage.getItem('repos_' + currentUser)) || [];

  container.innerHTML = `<h2><i class="fas fa-database"></i> المستودعات الخاصة بك</h2>`;

  if (repos.length === 0) {
    const btn = document.getElementById('createRepoBtn');
    if (btn) btn.style.display = 'block';
    return;
  } else {
    const btn = document.getElementById('createRepoBtn');
    if (btn) btn.style.display = 'none';
  }

  repos.forEach((repo, index) => {
    const repoDiv = document.createElement('div');
    repoDiv.className = 'repo-item';

    repoDiv.innerHTML = `
      <strong>${repo.name}</strong><br>
      <small>👤 المطور: ${repo.author}</small><br>
      <small>🔗 API: <a href="${repo.api}" target="_blank" style="color:#00ffff">${repo.api}</a></small><br>
      <small>📄 الوصف: ${repo.desc}</small>
      <div class="repo-options" onclick="toggleDropdown(this)">
        <i class="fas fa-ellipsis-v"></i>
        <div class="dropdown">
          <button onclick="editRepo(${index})">✏️ تعديل</button>
          <button onclick="deleteRepo(${index})">🗑️ حذف</button>
        </div>
      </div>
    `;

    container.appendChild(repoDiv);
  });
}

// فتح/غلق الشريط الجانبي
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

// تسجيل الخروج
function logout() {
  localStorage.removeItem('current_user');
  window.location.href = 'index.html';
}

// فتح واجهة إنشاء المستودع
function openCreatePopup() {
  document.getElementById('createPopup').style.display = 'block';
  toggleSidebar();
}

// إغلاق واجهة إنشاء المستودع
function closeCreatePopup() {
  document.getElementById('createPopup').style.display = 'none';
}

// إنشاء مستودع جديد
function createRepo() {
  const name = document.getElementById('repoName').value.trim();
  const desc = document.getElementById('repoDesc').value.trim();
  const api = document.getElementById('repoAPI').value.trim();
  const author = document.getElementById('repoAuthor').value.trim();

  if (!name || !desc || !api || !author) {
    alert("يرجى ملء جميع الحقول");
    return;
  }

  const repo = { name, desc, api, author };
  let repos = JSON.parse(localStorage.getItem('repos_' + currentUser)) || [];
  repos.push(repo);
  localStorage.setItem('repos_' + currentUser, JSON.stringify(repos));

  closeCreatePopup();
  loadRepos();
}

// حذف مستودع
function deleteRepo(index) {
  let repos = JSON.parse(localStorage.getItem('repos_' + currentUser)) || [];
  if (confirm("هل أنت متأكد من حذف هذا المستودع؟")) {
    repos.splice(index, 1);
    localStorage.setItem('repos_' + currentUser, JSON.stringify(repos));
    loadRepos();
  }
}

// تعديل مستودع
function editRepo(index) {
  let repos = JSON.parse(localStorage.getItem('repos_' + currentUser)) || [];
  const repo = repos[index];

  const name = prompt("اسم المستودع:", repo.name);
  const desc = prompt("الوصف:", repo.desc);
  const api = prompt("رابط API:", repo.api);
  const author = prompt("اسم المطور:", repo.author);

  if (!name || !desc || !api || !author) {
    alert("كل الحقول مطلوبة.");
    return;
  }

  repos[index] = { name, desc, api, author };
  localStorage.setItem('repos_' + currentUser, JSON.stringify(repos));
  loadRepos();
}

// فتح أو غلق القائمة المنسدلة
function toggleDropdown(el) {
  const dropdown = el.querySelector('.dropdown');
  const all = document.querySelectorAll('.dropdown');
  all.forEach(d => {
    if (d !== dropdown) d.style.display = 'none';
  });
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

// تحميل المستودعات عند فتح الصفحة
window.onload = loadRepos;
