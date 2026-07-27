const API="http://localhost:8081/students";

fetch(API)
    .then(response=>response.json())
    .then(data=>{

        let rows="";

        data.forEach(student=>{

            rows += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
        </tr>
        `;

        });

        document.getElementById("studentTable").innerHTML=rows;

    });