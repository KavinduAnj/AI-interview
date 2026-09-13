import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold">
                Welcome, {user?.name} 👋
            </h1>

            <p className="mt-2 text-gray-600">
                AI Interview Coach Dashboard
            </p>
            <button
    onClick={() => navigate("/interview-setup")}
    className="bg-black text-white px-6 py-3 rounded-lg"
>
    Start Interview
</button>
            <button className="text-red-700"
    onClick={() => {
        logout();
        navigate("/login");
    }}
>
    Logout
</button>
        </div>
    );
}

export default Dashboard;