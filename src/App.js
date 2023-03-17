import React from "react";
import Langing from "./Langing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
import LangingPage from "./LangingPage";
import SubmittedApplications from "./SubmittedApplications";
function App() {
  return (
    <Router>
      <LangingPage />
      <Routes>
        <Route path="/" element={<LangingPage />} />
        <Route path="/FormPage" element={<FormPage />} />
        <Route
          path="/SubmittedApplications"
          element={<SubmittedApplications />}
        />
        <Route path="*" element={<div>Nothing Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
