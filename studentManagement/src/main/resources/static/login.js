const API_URL = "http://localhost:8081/students";

function saveStudent() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value.trim();
    const message = document.getElementById("message");

    // Validation
    if (name === "" || email === "" || course === "") {
        message.style.color = "red";
        message.innerHTML = "Please fill all fields.";
        return;
    }

    const student = {
        name: name,
        email: email,
        course: course
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to save student.");
            }
            return response.json();
        })
        .then(data => {

            message.style.color = "green";
            message.innerHTML = "Student Saved Successfully!";

            // Clear form
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("course").value = "";

            console.log(data);

            // Optional: Redirect to dashboard after 2 seconds
            // setTimeout(() => {
            //     window.location.href = "dashboard.html";
            // }, 2000);

        })
        .catch(error => {

            console.error(error);

            message.style.color = "red";
            message.innerHTML = "Error Saving Student!";
        });
}