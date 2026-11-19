import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await api.post("/auth/signup", form);

            login(data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card shadow border-0">
                <div className="card-body p-4">
                    <h2 className="text-center fw-bold text-primary mb-2">
                        NoteNest
                    </h2>

                    <p className="text-center text-muted mb-4">
                        Create your account
                    </p>

                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            type="password"
                            name="password"
                            placeholder="Password (minimum 6 characters)"
                            value={form.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />

                        <button
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="text-center mt-3 mb-0">
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;