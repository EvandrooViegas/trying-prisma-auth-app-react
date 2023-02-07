import { ReactNode } from "react";
import { Link } from "react-router-dom"

export default function Default({ children }: { children: ReactNode }) {
    return (
        <div>
            <nav style={{
                display: "flex",
                gap: "20px"
            }}>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <button onClick={() => {
                    localStorage.removeItem("token")
                    location.href = "/login"
                }}>Logout</button>
            </nav>
            {children}
        </div>
    )
}