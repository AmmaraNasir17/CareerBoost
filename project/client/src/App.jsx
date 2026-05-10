import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleRoute from "./components/auth/RoleRoute";

import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import ApplierDashboard from "./pages/applier/ApplierDashboard";
import ApplierJobs from "./pages/applier/ApplierJobs";
import JobDetail from "./pages/applier/JobDetail";
import SavedJobs from "./pages/applier/SavedJobs";
import ApplierApplications from "./pages/applier/ApplierApplications";
import ApplierProfile from "./pages/applier/ApplierProfile";
import ApplierSettings from "./pages/applier/ApplierSettings";
import ResumeBuilder from "./pages/applier/ResumeBuilder";
import ResumeAnalyzer from "./pages/applier/ResumeAnalyzer";
import QuizList from "./pages/applier/QuizList";
import QuizTake from "./pages/applier/QuizTake";
import QuizResult from "./pages/applier/QuizResult";
import SkillTracker from "./pages/applier/SkillTracker";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import RecruiterPostJob from "./pages/recruiter/RecruiterPostJob";
import RecruiterEditJob from "./pages/recruiter/RecruiterEditJob";
import RecruiterApplications from "./pages/recruiter/RecruiterApplications";
import ApplicantDetail from "./pages/recruiter/ApplicantDetail";
import RecruiterSettings from "./pages/recruiter/RecruiterSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/applier" element={<RoleRoute role="applier"><ApplierDashboard /></RoleRoute>} />
        <Route path="/applier/jobs" element={<RoleRoute role="applier"><ApplierJobs /></RoleRoute>} />
        <Route path="/applier/jobs/:id" element={<RoleRoute role="applier"><JobDetail /></RoleRoute>} />
        <Route path="/applier/saved-jobs" element={<RoleRoute role="applier"><SavedJobs /></RoleRoute>} />
        <Route path="/applier/applications" element={<RoleRoute role="applier"><ApplierApplications /></RoleRoute>} />
        <Route path="/applier/profile" element={<ProtectedRoute><ApplierProfile /></ProtectedRoute>} />
        <Route path="/applier/settings" element={<RoleRoute role="applier"><ApplierSettings /></RoleRoute>} />
        <Route path="/applier/resume-builder" element={<RoleRoute role="applier"><ResumeBuilder /></RoleRoute>} />
        <Route path="/applier/resume-analyzer" element={<RoleRoute role="applier"><ResumeAnalyzer /></RoleRoute>} />
        <Route path="/applier/quizzes" element={<RoleRoute role="applier"><QuizList /></RoleRoute>} />
        <Route path="/applier/quizzes/:id" element={<RoleRoute role="applier"><QuizTake /></RoleRoute>} />
        <Route path="/applier/quizzes/:id/result" element={<RoleRoute role="applier"><QuizResult /></RoleRoute>} />
        <Route path="/applier/skills" element={<RoleRoute role="applier"><SkillTracker /></RoleRoute>} />

        <Route path="/recruiter" element={<RoleRoute role="recruiter"><RecruiterDashboard /></RoleRoute>} />
        <Route path="/recruiter/jobs" element={<RoleRoute role="recruiter"><RecruiterJobs /></RoleRoute>} />
        <Route path="/recruiter/post-job" element={<RoleRoute role="recruiter"><RecruiterPostJob /></RoleRoute>} />
        <Route path="/recruiter/jobs/:id/edit" element={<RoleRoute role="recruiter"><RecruiterEditJob /></RoleRoute>} />
        <Route path="/recruiter/jobs/:id/applicants" element={<RoleRoute role="recruiter"><ApplicantDetail /></RoleRoute>} />
        <Route path="/recruiter/applicants" element={<RoleRoute role="recruiter"><RecruiterApplications /></RoleRoute>} />
        <Route path="/recruiter/settings" element={<RoleRoute role="recruiter"><RecruiterSettings /></RoleRoute>} />
      </Routes>
    </Router>
  );
}

export default App;