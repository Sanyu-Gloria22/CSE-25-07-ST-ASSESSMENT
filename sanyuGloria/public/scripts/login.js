const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');

// Validation functions
function validateEmailOrPhone(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = input.replace(/\D/g, '');
  
  // Check if it's a valid email or a valid phone (15 digits)
  return emailRegex.test(input.trim()) || phoneDigits.length === 15;
}

function validatePassword(password) {
  return password.length >= 6;
}

// Real-time validation on input
loginEmail.addEventListener('input', () => {
  if (loginEmail.value.length > 0) {
    if (validateEmailOrPhone(loginEmail.value)) {
      loginEmail.classList.remove('error');
    } else {
      loginEmail.classList.add('error');
    }
  } else {
    loginEmail.classList.remove('error');
  }
});

loginPassword.addEventListener('input', () => {
  if (loginPassword.value.length > 0) {
    if (validatePassword(loginPassword.value)) {
      loginPassword.classList.remove('error');
    } else {
      loginPassword.classList.add('error');
    }
  } else {
    loginPassword.classList.remove('error');
  }
});

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  let hasError = false;

  // Clear previous errors
  loginEmail.classList.remove('error');
  loginPassword.classList.remove('error');

  // Validate email or phone
  if (!loginEmail.value.trim() || !validateEmailOrPhone(loginEmail.value)) {
    loginEmail.classList.add('error');
    hasError = true;
  }

  // Validate password
  if (!loginPassword.value.trim() || !validatePassword(loginPassword.value)) {
    loginPassword.classList.add('error');
    hasError = true;
  }

  if (hasError) return;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginEmail.value.trim(),
        password: loginPassword.value
      })
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = data.redirect || '/landing';
    } else {
      alert(data.message || 'Login failed. Please check your credentials.');
      loginEmail.classList.add('error');
      loginPassword.classList.add('error');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});