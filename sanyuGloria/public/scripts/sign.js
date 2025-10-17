const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const signupBtn = document.getElementById('signupBtn');
const signupSuccess = document.getElementById('signupSuccess');
const closeSuccess = document.getElementById('closeSuccess');

// Validation functions
function validateFullName(name) {
  return name.trim().length >= 3;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

function validatePhone(phone) {
  const phoneDigits = phone.replace(/\D/g, '');
  return phoneDigits.length === 15;
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateConfirmPassword(password, confirmPassword) {
  return password === confirmPassword && confirmPassword.length > 0;
}

// Real-time validation on input
fullName.addEventListener('input', () => {
  if (fullName.value.length > 0) {
    if (validateFullName(fullName.value)) {
      fullName.classList.remove('error');
    } else {
      fullName.classList.add('error');
    }
  } else {
    fullName.classList.remove('error');
  }
});

email.addEventListener('input', () => {
  if (email.value.length > 0) {
    if (validateEmail(email.value)) {
      email.classList.remove('error');
    } else {
      email.classList.add('error');
    }
  } else {
    email.classList.remove('error');
  }
});

phone.addEventListener('input', () => {
  if (phone.value.length > 0) {
    if (validatePhone(phone.value)) {
      phone.classList.remove('error');
    } else {
      phone.classList.add('error');
    }
  } else {
    phone.classList.remove('error');
  }
});

password.addEventListener('input', () => {
  if (password.value.length > 0) {
    if (validatePassword(password.value)) {
      password.classList.remove('error');
    } else {
      password.classList.add('error');
    }
  } else {
    password.classList.remove('error');
  }
  
  // Also revalidate confirm password if it has a value
  if (confirmPassword.value.length > 0) {
    if (validateConfirmPassword(password.value, confirmPassword.value)) {
      confirmPassword.classList.remove('error');
    } else {
      confirmPassword.classList.add('error');
    }
  }
});

confirmPassword.addEventListener('input', () => {
  if (confirmPassword.value.length > 0) {
    if (validateConfirmPassword(password.value, confirmPassword.value)) {
      confirmPassword.classList.remove('error');
    } else {
      confirmPassword.classList.add('error');
    }
  } else {
    confirmPassword.classList.remove('error');
  }
});

signupBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  
  let hasError = false;

  // Clear previous errors
  [fullName, email, phone, password, confirmPassword].forEach(input => {
    input.classList.remove('error');
  });

  // Validate full name
  if (!fullName.value.trim() || !validateFullName(fullName.value)) {
    fullName.classList.add('error');
    hasError = true;
  }

  // Validate email
  if (!email.value.trim() || !validateEmail(email.value)) {
    email.classList.add('error');
    hasError = true;
  }

  // Validate phone
  if (!phone.value.trim() || !validatePhone(phone.value)) {
    phone.classList.add('error');
    hasError = true;
  }

  // Validate password
  if (!password.value.trim() || !validatePassword(password.value)) {
    password.classList.add('error');
    hasError = true;
  }

  // Validate confirm password
  if (!confirmPassword.value.trim() || !validateConfirmPassword(password.value, confirmPassword.value)) {
    confirmPassword.classList.add('error');
    hasError = true;
  }

  if (hasError) return;

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        password: password.value,
        confirmPassword: confirmPassword.value
      })
    });

    const data = await response.json();

    if (data.success) {
      signupSuccess.classList.remove('hidden');
      fullName.value = '';
      email.value = '';
      phone.value = '';
      password.value = '';
      confirmPassword.value = '';
    } else {
      alert(data.message || 'Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});

closeSuccess.addEventListener('click', () => {
  signupSuccess.classList.add('hidden');
});