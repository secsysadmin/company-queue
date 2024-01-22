import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCookie } from "./utils";

export default function useAdminLogin() {
  const [adminID, setAdminID] = useState<string>();

  const navigate = useNavigate();
  useEffect(() => {
    const id = getCookie("adminID");
    if (id == null) {
      navigate("/admin/login");
    } else {
      setAdminID(id);
    }
  }, []);
  return { adminID };
}
