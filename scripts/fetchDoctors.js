/**
 * The function fetchDoctors asynchronously fetches doctor data from a specified API endpoint and
 * dynamically populates a select element with the retrieved doctor information.
 */
async function fetchDoctors() {
  try {
    await axios.get(`${BASE_URL}/api/doctor`)
      .then(res => {
        const responseData = res.data
        console.log(responseData.message)

        const doctors = responseData.data.doctors;
        const selectSpace = document.getElementById('doctor')
        doctors.forEach(doctor => {
          // console.log(doctor)
          let doctorId = doctor.doctorId, doctorFullName = doctor.fullName, doctorSpecialization = doctor.specialization, doctorExperience = doctor.experience
          // console.log(doctorId, doctorFullName)

          selectSpace.innerHTML += `<option value="${doctorId}">${doctorFullName} (${doctorSpecialization}) - ${doctorExperience} Year(s) Experience</option>`
        });
      })
      .catch(err => {
        console.log(err)
      })
  } catch (error) {
    console.log(error.message)
  }
}

fetchDoctors()