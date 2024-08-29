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

      if (!responseData.error) {

        // Set token as cookie with expiration
        // document.cookie = `patientToken=${responseData.data.token}; expires=${new Date(Date.now() + 3600000).toUTCString()}; domain=bolixy.github.io; path=/lennox-hospital; secure=true; sameSite=strict`;
        document.cookie = `patientToken=${responseData.data.token}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/; secure=true; sameSite=strict`;


        feedbackBox.innerHTML = `<p class="bg-green-600 rounded-sm font-semibold text-gray-100 px-4 py-2 text-lg" >${responseData.message}</p>`
        feedbackBox.classList.replace('hidden', 'block')

        setTimeout(() => {
          window.location.href = './profile.html';
        }, 2000)

      } else {
        feedbackBox.innerHTML = `<p class=" bg-red-600 font-semibold text-gray-100 px-4 py-2 text-lg" >${responseData.message}</p>`
        feedbackBox.classList.replace('hidden', 'block')
      }


    }).catch(err => {
      const errorResponse = err.response.data;
      feedbackBox.innerHTML = `<p class=" bg-red-600 font-semibold text-gray-100 px-4 py-2 text-lg" >${errorResponse.message}</p>`
      feedbackBox.classList.replace('hidden', 'block')
    })

    loginbtn.innerText = "Login"
    return;

  } catch (error) {
    console.error(error.message)
    feedbackBox.innerHTML = `<p class=" bg-red-600 font-semibold text-gray-100 px-4 py-2 text-lg" >Network Error</p>`
    // feedbackBox.innerHTML = `<p class=" bg-red-600 font-semibold text-gray-100 px-4 py-2 text-lg" >${error.message}</p>`
    feedbackBox.classList.replace('hidden', 'block')
    loginbtn.innerText = "Login"
    return;
  }
}

function patientLogout() {
  deleteCookie('patientToken')
  // reload page
  window.location.reload();
}

function deleteCookie(name, path = "/") {
  document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=" + path;
}

async function handleAppointmentSchedule(e) {
  e.preventDefault();

  const submitBtn = e.target[4]
  submitBtn.value = 'Please wait...'

  const doctorId = e.target[0].value;
  const date = e.target[1].value;
  const time = e.target[2].value;
  const reason = e.target[3].value;

  const docDetails = {
    doctorId, date, time, reason
  }
  console.log(docDetails)
  console.log(getCookie('patientToken'))
  try {
    await axios.post(`${BASE_URL}/api/patient/appointments/book`, docDetails, {
      headers: {
        Authorization: `Bearer ${getCookie('patientToken')}`
      }
    }).then((res) => {
      console.log(res.data)
      const responseData = res.data;

      submitBtn.value = responseData.message;
    }).catch(err => {
      console.error(err.response.data)
      submitBtn.value = err.response.data.message;
    })

  } catch (error) {
    console.error(error.message)
    submitBtn.value = error.message;
  }
}