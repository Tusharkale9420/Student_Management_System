import { useEffect, useState } from "react";
import { getStudents } from "../services/studentService";

function Dashboard() {

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


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

            setError("Unable to load dashboard data.");

        } finally {

            setLoading(false);

        }

    };


    // Total students
    const totalStudents = students.length;


    // Find unique courses
    const uniqueCourses = [
        ...new Set(
            students.map((student) => student.course)
        )
    ];

    const totalCourses = uniqueCourses.length;


    // Latest student
    const latestStudent =
        students.length > 0
            ? students[students.length - 1]
            : null;


    if (loading) {

        return (
            <main className="dashboard">

                <h1>Dashboard</h1>

                <p>Loading dashboard...</p>

            </main>
        );

    }


    if (error) {

        return (
            <main className="dashboard">

                <h1>Dashboard</h1>

                <p className="error-message">
                    {error}
                </p>

            </main>
        );

    }


    return (

        <main className="dashboard">

            <div className="dashboard-header">

                <h1>Dashboard</h1>

                <p className="dashboard-subtitle">
                    Student Management System Overview
                </p>

            </div>


            {/* Statistics */}

            <div className="stats-container">


                {/* Total Students */}

                <div className="stat-card">

                    <div className="stat-info">

                        <p>Total Students</p>

                        <h2>{totalStudents}</h2>

                    </div>

                </div>


                {/* Total Courses */}

                <div className="stat-card">

                    <div className="stat-info">

                        <p>Total Courses</p>

                        <h2>{totalCourses}</h2>

                    </div>

                </div>


                {/* Latest Student */}

                <div className="stat-card">

                    <div className="stat-info">

                        <p>Latest Student</p>

                        <h2>
                            {latestStudent
                                ? latestStudent.name
                                : "No students"}
                        </h2>

                    </div>

                </div>

            </div>


            {/* Recent Students */}

            <div className="recent-students">

                <div className="section-header">

                    <h2>Recent Students</h2>

                </div>


                {students.length === 0 ? (

                    <p>No students available.</p>

                ) : (

                    <table className="student-table">

                        <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Course</th>

                        </tr>

                        </thead>


                        <tbody>

                        {students
                            .slice(-5)
                            .reverse()
                            .map((student) => (

                                <tr key={student.id}>

                                    <td>{student.id}</td>

                                    <td>{student.name}</td>

                                    <td>{student.email}</td>

                                    <td>{student.course}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

        </main>

    );

}

export default Dashboard;