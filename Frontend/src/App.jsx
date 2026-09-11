import { BrowserRouter, Routes, Route} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import InterviewSetup from "./pages/InterviewSetup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/register" element={<Register />} />
                 <Route path="/login" element={<Login />} />
                 <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>} />
                 <Route path="/interview-setup" element={
                        <ProtectedRoute>
                            <InterviewSetup />
                        </ProtectedRoute>} />      
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;