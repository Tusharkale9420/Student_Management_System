import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-menu">

                <Link to="/" className="menu-item">
                    Dashboard
                </Link>

                <Link to="/students" className="menu-item">
                    Students
                </Link>

                <div className="menu-item">
                    Add Student
                </div>

                <div className="menu-item logout">
                    Logout
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;