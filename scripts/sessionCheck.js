const checkPatient = () => {
  const token = localStorage.getItem('patientToken');
  if (!token) {
    window.location.href = './patients.html'
  }
}