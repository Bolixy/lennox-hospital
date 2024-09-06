const token = getCookie('patientToken');
const doctorToken = getCookie('doctorToken');
const adminToken = getCookie('adminToken');
const checkPatient = () => {
  if (!token) {
    window.location.href = './patients.html'
  }
}

const loginAuthCheck = () => {
  if (token) {
    window.location.href = './profile.html'
  }
}

function getCookie(name) {
  const nameEQ = encodeURIComponent(name) + "=";
  const cookiesArray = document.cookie.split('; '); // Split cookies into an array

  for (let cookie of cookiesArray) {
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null; // Return null if cookie is not found
}

const doctorCheck = () => {
  if (!doctorToken) {
    window.location.href = './signin.html'
  }
}

const doctorLoginAuthCheck = () => {
  if (doctorToken) {
    window.location.href = './'
  }
}

const adminCheck = () => {
  if (!adminToken) {
    window.location.href = `${SITE_URL}/admin`
  }
}

const adminLoginAuthCheck = () => {
  if (adminToken) {
    window.location.href = './dashboard'
  }
}