const token = getCookie('patientToken');
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