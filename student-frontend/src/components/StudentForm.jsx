import { useEffect, useState } from "react";
import { addStudent, updateStudent } from "../services/studentService";

function StudentForm({ student, onStudentAdded, onStudentUpdated, onCancel }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Load existing student data when editing
    useEffect(() => {

        if (student) {
            setName(student.name || "");
            setEmail(student.email || "");
            setCourse(student.course || "");
        } else {
            setName("");
            setEmail("");
            setCourse("");
        }

    }, [student]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        // Name validation
        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        if (name.trim().length < 3) {
            setError("Name must contain at least 3 characters.");
            return;
        }

        // Email validation
        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Course validation
        if (!course.trim()) {
            setError("Course is required.");
            return;
        }

        try {

            setLoading(true);

            const studentData = {
                name: name.trim(),
                email: email.trim(),
                course: course.trim()
            };

            if (student) {

                // UPDATE
                const response = await updateStudent(
                    student.id,
                    studentData
                );

                onStudentUpdated(response.data);

            } else {

                // ADD
                const response = await addStudent(studentData);

                onStudentAdded(response.data);

            }

        } catch (error) {

            console.error("Error:", error);

            setError(
                student
                    ? "Unable to update student."
                    : "Unable to add student."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="form-container">

            <h2>
                {student ? "Edit Student" : "Add New Student"}
            </h2>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>Name</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter student name"
                    />

                </div>


                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />

                </div>


                <div className="form-group">

                    <label>Course</label>

                    <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        placeholder="Enter course"
                    />

                </div>


                <div className="form-buttons">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="add-button"
                    >
                        {loading
                            ? "Saving..."
                            : student
                                ? "Update Student"
                                : "Add Student"}
                    </button>

                </div>

            </form>

        </div>

    );
}

export default StudentForm;