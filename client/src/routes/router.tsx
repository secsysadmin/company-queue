import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RecruiterLogin from "../pages/Recruiter/RecruiterLogin";
import CompanyQueuePage from "../pages/Recruiter/CompanyQueuePage";
import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import ErrorPage from "../pages/ErrorPage";
import StudentLogin from "../pages/Student/StudentLogin";
import Admin from "../pages/Admin/Admin";
import StudentStatusController from "../pages/Student/StudentStatusController";
import LandingPage from "../pages/Student/LandingPage";


export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
        <Route path="recruiter">
            <Route path="login" element={<RecruiterLogin />}></Route>
            <Route path="queue" element={<CompanyQueuePage />}></Route>
            <Route path="dashboard" element={<RecruiterDashboard />}></Route>
        </Route>
        <Route path="student">
            <Route path='login' element={<StudentLogin />}></Route>
            <Route path='status' element={<StudentStatusController/>}></Route>
            <Route path='landing' element={<LandingPage/>}></Route>
        </Route>
        <Route path="admin" element={<Admin />} />
    </Route>
));
