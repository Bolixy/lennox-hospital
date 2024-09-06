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




async function fetchDoctorsForAdmin() {
  const doctorDiv = document.getElementById('doctorDiv')
  const doctorList = document.getElementById('doctorList')
  try {
    await axios.get(`${BASE_URL}/api/doctor`, {
    }).then((res) => {
      const responseData = res.data;
      console.log(responseData)

      if (!responseData.error) {
        const doctors = responseData.data.doctors;

        doctors.forEach(doctor => {
          doctorList.innerHTML += `
          <tr class="bg-white border-b">
              <td class="px-4 py-2">${doctor.fullName}</td>
              <td class="px-4 py-2">${doctor.specialization}</td>
              <td class="px-4 py-2">${doctor.experience}</td>
              <td class="px-4 py-2">${doctor.qualification}</td>
              <td class="px-4 py-2">${doctor.phone}</td>
              <td class="px-4 py-2">${doctor.address}</td>
              <td class="px-4 py-2 flex justify-center">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="deleteDoctor('${doctor.doctorNo}')">
                  Delete
                </button>
              </td>
            </tr>
          `
        })

      } else {
        doctorDiv.innerHTML = `<p class="text-lg font-semibold text-red-600">${responseData.message}</p>`
      }
    }).catch(err => {
      console.error(err.response.data)
      doctorDiv.innerHTML = `<p class="text-lg font-semibold text-red-600">${err.response.data.message}</p>`
    })
  } catch (error) {
    console.error(error.message)
    doctorDiv.innerHTML = `<p class="text-lg font-semibold text-red-600">${error.message}</p>`
  }
}