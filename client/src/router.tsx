import { createBrowserRouter } from "react-router-dom";
import CompanyList from "./pages/CompanyList";

const router = createBrowserRouter([
  {
    path: "/company",
    element: <CompanyList />,
  },
  {
    path: "/join",
    element: <div>Join a queue</div>,
  },
]);

export default router;
