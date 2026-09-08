import { useEffect, useState } from "react";
import {
    getStudents,
    deleteStudent
} from "../services/studentService";

import StudentForm from "../components/StudentForm";

function Students() {

    const role = (localStorage.getItem("role") || "")
        .trim()
        .toUpperCase();

    const isAdmin = role === "ADMIN";

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [search, setSearch] = useState("");

    // Load students when page opens
    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        try {

            setLoading(true);

            const response = await getStudents();

            setStudents(response.data);

            setError("");

        } catch (error) {

            console.error(error);

            setError("Unable to load students.");

        } finally {

            setLoading(false);

        }
    };

    // Edit student
    const handleEdit = (student) => {

        setEditingStudent(student);

        setShowForm(true);
    };

    // Delete student - ADMIN ONLY
    const handleDelete = async (id) => {

        if (!isAdmin) {
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteStudent(id);

            setStudents((prevStudents) =>
                prevStudents.filter(
                    (student) => student.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Error deleting student:",
                error
            );

            setError("Unable to delete student.");

        }
    };

    // Search
    const filteredStudents = students.filter((student) => {

        const searchText = search.toLowerCase();

        return (
            student.name.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText) ||
            student.course.toLowerCase().includes(searchText)
        );
    });

    return (

        <main className="dashboard">

            {/* Page Header */}

            <div className="page-header">

                <div>

                    <h1>Students</h1>

                    <p className="dashboard-subtitle">
                        Manage all students
                    </p>

                </div>

                {/* ADMIN + USER can ADD */}

                <button
                    className="add-button"
                    onClick={() => {

                        setEditingStudent(null);

                        setShowForm(true);

                    }}
                >
                    + Add Student
                </button>

            </div>


            {/* Student Form */}

            {showForm && (

                <StudentForm

                    student={editingStudent}

                    onStudentAdded={(newStudent) => {

                        setStudents((prevStudents) => [
                            ...prevStudents,
                            newStudent
                        ]);

                        setShowForm(false);

                    }}

                    onStudentUpdated={(updatedStudent) => {

                        setStudents((prevStudents) =>
                            prevStudents.map((student) =>
                                student.id === updatedStudent.id
                                    ? updatedStudent
                                    : student
                            )
                        );

                        setEditingStudent(null);

                        setShowForm(false);

                    }}

                    onCancel={() => {

                        setEditingStudent(null);

                        setShowForm(false);

                    }}

                />

            )}


            {/* Student Container */}

            <div className="student-container">

                {/* Search */}

                <div className="search-section">

                    <input
                        type="text"
                        placeholder="Search by name, email or course..."
                        className="search-input"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                {/* Loading */}

                {loading && (

                    <p>Loading students...</p>

                )}


                {/* Error */}

                {error && (

                    <p className="error-message">
                        {error}
                    </p>

                )}


                {/* Student Table */}

                {!loading && !error && (

                    <table className="student-table">

                        <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Course</th>

                            <th>Actions</th>

                        </tr>

                        </thead>

                        <tbody>

                        {filteredStudents.length === 0 ? (

                            <tr>

                                <td colSpan="5">
                                    No students found.
                                </td>

                            </tr>

                        ) : (

                            filteredStudents.map((student) => (

                                <tr key={student.id}>

                                    <td>{student.studentNumber}</td>

                                    <td>{student.name}</td>

                                    <td>{student.email}</td>

                                    <td>{student.course}</td>

                                    <td>

                                        {/* ADMIN + USER can EDIT */}

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                handleEdit(student)
                                            }
                                        >
                                            Edit
                                        </button>


                                        {/* ADMIN ONLY can DELETE */}

                                        {isAdmin && (

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    handleDelete(student.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))

                        )}

                        </tbody>

                    </table>

                )}

            </div>

        </main>
    );
}

export default Students;