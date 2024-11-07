import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PuzzleDemo from "./Components/PuzzleDemo/PuzzleDemo";

const AppRoutes = (props) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PuzzleDemo {...props} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes