import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ApplierDashboard from "./pages/ApplierDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ApplierJobs from "./pages/applier/ApplierJobs";
import ApplierApplications from "./pages/applier/ApplierApplications";
import ApplierSettings from "./pages/applier/ApplierSettings";
import SavedJobs from "./pages/applier/SavedJobs";
import Messages from "./pages/applier/Messages";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import RecruiterApplications from "./pages/recruiter/RecruiterApplications";
import RecruiterSettings from "./pages/recruiter/RecruiterSettings";
import Team from "./pages/recruiter/Team";
import CommonProfile from "./pages/common/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/applier"
          element={
            <ProtectedRoute role="applier">
              <ApplierDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applier/jobs"
          element={
            <ProtectedRoute role="applier">
              <ApplierJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applier/applications"
          element={
            <ProtectedRoute role="applier">
              <ApplierApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applier/saved-jobs"
          element={
            <ProtectedRoute role="applier">
              <SavedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applier/messages"
          element={
            <ProtectedRoute role="applier">
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applier/settings"
          element={
            <ProtectedRoute role="applier">
              <ApplierSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/jobs"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/applicants"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/team"
          element={
            <ProtectedRoute role="recruiter">
              <Team />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/settings"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <CommonProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
