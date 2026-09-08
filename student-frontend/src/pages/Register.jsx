import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/auth/register", {
                email: email,
                password: password
            });

            setSuccess(response.data);

            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error("Registration error:", error);

            if (error.response?.data) {
                setError(error.response.data);
            } else {
                setError("Unable to register. Please try again.");
            }

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="login-container">

            <div className="login-box">

                <h1>Create Account</h1>

                <p>
                    Register as a new user
                </p>

                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>


                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}


                    {success && (
                        <p className="success-message">
                            {success}
                        </p>
                    )}


                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>


                <p className="register-link">

                    Already have an account?

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Register;