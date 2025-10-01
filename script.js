// تبديل بين واجهة تسجيل الدخول وإنشاء الحساب
function toggleForm() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
}

// إنشاء حساب جديد
function register() {
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;
  const terms = document.getElementById('reg-terms').checked;

  if (!username || !password || !confirm) {
    alert('يرجى تعبئة جميع الحقول');
    return;
  }

  if (password !== confirm) {
    alert('كلمتا المرور غير متطابقتين');
    return;
  }

  if (!terms) {
    alert('يجب الموافقة على شروط الاستخدام');
    return;
  }

  let users = JSON.parse(localStorage.getItem('devs_users')) || [];

  if (users.find(u => u.username === username)) {
    alert('اسم المستخدم مستخدم من قبل');
    return;
  }

  users.push({ username, password });
  localStorage.setItem('devs_users', JSON.stringify(users));
  localStorage.setItem('current_user', username);

  window.location.href = 'dashboard.html';
}

// تسجيل الدخول
function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  if (!username || !password) {
    alert('يرجى إدخال اسم المستخدم وكلمة المرور');
    return;
  }

  let users = JSON.parse(localStorage.getItem('devs_users')) || [];

  let user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert('بيانات الدخول غير صحيحة');
    return;
  }

  localStorage.setItem('current_user', username);
  window.location.href = 'dashboard.html';
}
