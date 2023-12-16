import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";

import RecruiterLogin from "../pages/Recruiter/RecruiterLogin";
import QueuePage from "../pages/Recruiter/QueuePage";
import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";

import StudentLandingPage from "../pages/Student/StudentLandingPage";
import StudentJoinQueue from "../pages/Student/StudentJoinQueue";
import StudentStatus from "../pages/Student/StudentStatus";

import Admin from "../pages/Admin/Admin";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route path="recruiter">
        <Route path="login" element={<RecruiterLogin />}></Route>
        <Route path="queue" element={<QueuePage />}></Route>
        <Route path="dashboard" element={<RecruiterDashboard />}></Route>
      </Route>
      <Route path="student">
        <Route path="join-queue" element={<StudentJoinQueue />}></Route>
        <Route path="status" element={<StudentStatus />}></Route>
        <Route path="landing" element={<StudentLandingPage />}></Route>
      </Route>
      <Route path="admin" element={<Admin />} />
    </Route>
  )
);
