function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold">
                Welcome, {user?.name} 👋
            </h1>

            <p className="mt-2 text-gray-600">
                AI Interview Coach Dashboard
            </p>
        </div>
    );
}

export default Dashboard;