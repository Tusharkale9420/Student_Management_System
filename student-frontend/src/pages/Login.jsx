import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:8081/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (!response.ok) {
                setError("Invalid email or password.");
                setLoading(false);
                return;
            }

            const data = await response.json();

            // Store JWT token
            localStorage.setItem("token", data.token);

            // Keep this for frontend protection
            localStorage.setItem("isLoggedIn", "true");

            // Store user information
            localStorage.setItem("email", data.email);
            localStorage.setItem("role", data.role);

            navigate("/");

        } catch (error) {

            console.error("Login error:", error);

            setError(
                "Unable to connect to server. Please make sure backend is running."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Student Management System</h1>

                <h2>Login</h2>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin}>

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

                        <label>Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />

                    </div>


                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>


                {/* Register link */}

                <div className="register-section">

                    <p>
                        Don't have an account?
                    </p>

                    <button
                        type="button"
                        className="register-button"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </button>

                </div>

            </div>

        </div>

    );
}

export default Login;