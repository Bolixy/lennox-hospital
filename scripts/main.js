async function handlePatientLogin(e) {
  e.preventDefault();
  const loginbtn = document.getElementById('patientLoginBtn')

  loginbtn.innerText = "Please Wait..."


  const patientNo = e.target[0].value;
  const password = e.target[1].value;

  const requestBody = {
    patientNo, password
  };

  const feedbackBox = document.getElementById('feedbackBox')

  try {

    await axios.post(`${BASE_URL}/api/auth/patient/signin`, requestBody).then((res) => {
      const responseData = res.data;

      feedbackBox.innerHTML = `<p class="bg-green-600 rounded-sm font-semibold text-gray-100 px-4 py-2 text-lg" >${responseData.message}</p>`
      feedbackBox.classList.replace('hidden', 'block')

    }).catch(err => {
      const errorResponse = err.response.data;
      feedbackBox.innerHTML = `<p class=" bg-red-600 font-semibold text-gray-100 px-4 py-2 text-lg" >${errorResponse.message}</p>`
      feedbackBox.classList.replace('hidden', 'block')
    })

    loginbtn.innerText = "Login"
    return;

  } catch (error) {
    console.error(error.message)
    feedbackBox.innerHTML = `<p class=" bg-red-600 font-semibold text-gray-100 px-4 py-2 text-lg" >${error.message}</p>`
    feedbackBox.classList.replace('hidden', 'block')
    loginbtn.innerText = "Login"
    return;
  }
}