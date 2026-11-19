import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom px-4 py-3">
            <div className="container">
                <span
                    className="navbar-brand fw-bold fs-4 text-primary"
                    role="button"
                    onClick={() => navigate("/")}
                >
                    NoteNest
                </span>

                <div className="d-flex align-items-center gap-3">
                    <span className="text-secondary">
                        Hi, {user?.name}
                    </span>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;