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

function doctorLogout() {
  deleteCookie('doctorToken')
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

async function getAppoinmentHistory() {
  const appointmentHistory = document.getElementById('appointmentHistory')
  try {
    await axios.get(`${BASE_URL}/api/patient/appointments/view`, {
      headers: {
        Authorization: `Bearer ${getCookie('patientToken')}`
      }
    }).then((res) => {
      const responseData = res.data;
      console.log(responseData.message)

      if (!responseData.error) {
        appointmentHistory.innerHTML = responseData.data.appointments.map((appointment) => {
          return `
          <div class="flex flex-col gap-2 bg-gray-100 rounded-md p-4">
            <h3 class="text-lg font-semibold">Appointment Details</h3>            
            <p class="text-sm">Doctor ID: ${appointment.doctorId}</p>
            <p class="text-sm">Date: ${appointment.appointmentDate}</p>
            <p class="text-sm">Time: ${appointment.appointmentTime}</p>
            <p class="text-sm">Reason: ${appointment.appointmentReason}</p>
            <p class="text-sm">Status: ${appointment.appointmentStatus}</p>
          </div>
          `
        }).join('')
      } else {
        appointmentHistory.innerHTML = `<p class="text-lg font-semibold text-red-600">${responseData.message}</p>`
      }
    }).catch(err => {
      console.error(err.response.data)
      appointmentHistory.innerHTML = `<p class="text-lg font-semibold text-red-600">${err.response.data.message}</p>`
    })
  } catch (error) {
    console.error(error.message)
    appointmentHistory.innerHTML = `<p class="text-lg font-semibold text-red-600">${error.message}</p>`
  }
}

async function registerPatient(e) {
  e.preventDefault();

  try {
    const submitBtn = document.getElementById('patientRegisterBtn')
    submitBtn.innerText = 'Please wait...'

    const formdata = new FormData(e.target)
    const data = Object.fromEntries(formdata.entries())

    // verify that both passwords match
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match')
      submitBtn.innerText = 'Submit';
      return;
    }


    // remove teh confirmPassword property from the data object
    delete data.confirmPassword

    await axios.post(`${BASE_URL}/api/auth/patient/signup`, data).then((res) => {
      console.log(res.data)
      const responseData = res.data;

      if (!responseData.error) {
        const pdDisplay = document.getElementById('pdDisplay');
        const patientNoDisplay = document.getElementById('patientNoDisplay');
        patientNoDisplay.innerText = responseData.data.patientNo;
        pdDisplay.classList.remove('hidden');
      }
      alert(responseData.message);
      submitBtn.innerText = 'Submit';
      return;
    }).catch(err => {
      console.error(err.response.data)
      alert(err.response.data.message);
      submitBtn.innerText = 'Submit';
      return;
    })
  } catch (error) {
    console.error(error.message)
    alert(error.message);
    submitBtn.innerText = 'Submit';
    return;
  }
}

async function doctorLogin(e) {
  e.preventDefault();
  const doctorSigninBtn = document.getElementById('doctorSigninBtn')
  doctorSigninBtn.innerText = 'Please wait...'

  const formdata = new FormData(e.target)
  const data = Object.fromEntries(formdata.entries())

  try {
    await axios.post(`${BASE_URL}/api/auth/doctor/signin`, data).then((res) => {
      console.log(res.data)
      const responseData = res.data;

      if (!responseData.error) {

        // Set token as cookie with expiration
        document.cookie = `doctorToken=${responseData.data.token}; expires=${new Date(Date.now() + 3600000).toUTCString()}; path=/; secure=true; sameSite=strict`;

        window.location.href = './';
      }
      alert(responseData.message);
      doctorSigninBtn.innerText = 'Login';
      return;
    }).catch(err => {
      console.error(err.response.data)
      alert(err.response.data.message);
      doctorSigninBtn.innerText = 'Login';
      return;
    })
  } catch (error) {
    console.error(error.message)
    alert(error.message);
    doctorSigninBtn.innerText = 'Login';
    return;
  }
}

async function getDoctorAppointment() {
  const appointmentHistory = document.getElementById('docAppointmentHistory')
  const appointmentTemplate = document.getElementById('appointmentTemplate');
  try {
    await axios.get(`${BASE_URL}/api/doctor/appointmentHistory`, {
      headers: {
        Authorization: `Bearer ${getCookie('doctorToken')}`
      }
    }).then((res) => {
      const responseData = res.data;
      console.log(responseData)

      if (!responseData.error) {

        const appointments = responseData.data.appointments;

        appointments.forEach(appointment => {
          const appointmentCard = appointmentTemplate.content.cloneNode(true);

          appointmentCard.querySelector('.patient-id').textContent = appointment.patientId;
          appointmentCard.querySelector('.appointment-date').textContent = appointment.appointmentDate;
          appointmentCard.querySelector('.appointment-time').textContent = appointment.appointmentTime;
          appointmentCard.querySelector('.appointment-reason').textContent = appointment.appointmentReason;
          appointmentCard.querySelector('.appointment-status').textContent = appointment.appointmentStatus;

          const cancelButton = appointmentCard.querySelector('.cancel-appointment');
          cancelButton.addEventListener('click', () => cancelAppointment(appointment.id));

          appointmentHistory.appendChild(appointmentCard);
        })

      } else {
        appointmentHistory.innerHTML = `<p class="text-lg font-semibold text-red-600">${responseData.message}</p>`
      }
    }).catch(err => {
      console.error(err.response.data)
      appointmentHistory.innerHTML = `<p class="text-lg font-semibold text-red-600">${err.response.data.message}</p>`
    })
  } catch (error) {
    console.error(error.message)
    appointmentHistory.innerHTML = `<p class="text-lg font-semibold text-red-600">${error.message}</p>`
  }
}