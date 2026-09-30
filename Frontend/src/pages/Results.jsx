import { useLocation } from "react-router-dom";

function Results() {
    const location = useLocation();
    const { answers, setup } = location.state || {};
        
}
