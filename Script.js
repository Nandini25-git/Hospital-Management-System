// Store data
let patients = JSON.parse(localStorage.getItem("patients")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];


// Show selected section
function showSection(sectionId) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    updateDashboard();
}


// Patient Registration
document.getElementById("patientForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let patient = {

        id: Date.now(),

        name: document.getElementById("patientName").value,

        age: document.getElementById("patientAge").value,

        gender: document.getElementById("patientGender").value,

        disease: document.getElementById("patientDisease").value,

        phone: document.getElementById("patientPhone").value
    };

    patients.push(patient);

    localStorage.setItem("patients", JSON.stringify(patients));

    alert("Patient registered successfully!");

    this.reset();

    displayPatients();

    updateDashboard();
});


// Display Patients
function displayPatients() {

    let table = document.getElementById("patientTable");

    table.innerHTML = "";

    patients.forEach((patient, index) => {

        let row = `
            <tr>

                <td>${index + 1}</td>

                <td>${patient.name}</td>

                <td>${patient.age}</td>

                <td>${patient.gender}</td>

                <td>${patient.disease}</td>

                <td>${patient.phone}</td>

                <td>
                    <button class="delete-btn"
                    onclick="deletePatient(${patient.id})">
                    Delete
                    </button>
                </td>

            </tr>
        `;

        table.innerHTML += row;
    });
}


// Delete Patient
function deletePatient(id) {

    if (confirm("Are you sure you want to delete this patient?")) {

        patients = patients.filter(patient => patient.id !== id);

        localStorage.setItem("patients", JSON.stringify(patients));

        displayPatients();

        updateDashboard();
    }
}


// Appointment Booking
document.getElementById("appointmentForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let appointment = {

        id: Date.now(),

        patient:
        document.getElementById("appointmentPatient").value,

        doctor:
        document.getElementById("appointmentDoctor").value,

        date:
        document.getElementById("appointmentDate").value,

        time:
        document.getElementById("appointmentTime").value
    };

    appointments.push(appointment);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    alert("Appointment booked successfully!");

    this.reset();

    displayAppointments();

    updateDashboard();
});


// Display Appointments
function displayAppointments() {

    let table = document.getElementById("appointmentTable");

    table.innerHTML = "";

    appointments.forEach(appointment => {

        let row = `
            <tr>

                <td>${appointment.patient}</td>

                <td>${appointment.doctor}</td>

                <td>${appointment.date}</td>

                <td>${appointment.time}</td>

                <td>
                    <button class="delete-btn"
                    onclick="deleteAppointment(${appointment.id})">
                    Delete
                    </button>
                </td>

            </tr>
        `;

        table.innerHTML += row;
    });
}


// Delete Appointment
function deleteAppointment(id) {

    if (confirm("Delete this appointment?")) {

        appointments =
            appointments.filter(
                appointment => appointment.id !== id
            );

        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );

        displayAppointments();

        updateDashboard();
    }
}


// Update Dashboard
function updateDashboard() {

    document.getElementById("patientCount").innerText =
        patients.length;

    document.getElementById("appointmentCount").innerText =
        appointments.length;
}


// Load data when page opens
displayPatients();
displayAppointments();
updateDashboard();