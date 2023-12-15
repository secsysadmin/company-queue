import StudentStatus from "./StudentStatus";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SERVER_ENDPOINT } from "../../utils/consts";
import { Major } from "../../utils/interfaces";

export default function StudentStatusController() {
  const navigate = useNavigate();
  const location = useLocation();

  // get url params
  const searchParams = new URLSearchParams(location.search);
  const companyName = searchParams.get("companyName");
  const phoneNumber = searchParams.get("phoneNumber");
  const ticketNumber = searchParams.get("ticketNumber");
  const major = searchParams.get("major");

  // navigate away if incorrect query params
  if (!companyName) {
    navigate("/student/login");
  } else if (companyName && (!phoneNumber || !ticketNumber)) {
    navigate({
      pathname: "/student/login?company=" + companyName,
      search: createSearchParams({
        company: companyName,
      }).toString(),
    });
  }

  const leaveQueue = async () => {
    const url =
      SERVER_ENDPOINT + `/api/company-queue/leave?ticketNumber=${ticketNumber}`;
    fetch(url, {
      method: "DELETE",
    }).then(res => {
      if (res.ok) {
        navigate("/student/landing");
      }
    });
  };

  useEffect(() => {
    const url =
      SERVER_ENDPOINT +
      `/api/company-queue/check-student?phoneNumber=${phoneNumber}`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        if (data != "true") {
          navigate("/student/login?company=" + companyName);
        }
      })
      .catch();
  }, [phoneNumber]);

  return (
    <StudentStatus
      companyName={companyName!}
      ticketNumber={ticketNumber!}
      major={major!}
      leaveQueue={leaveQueue}></StudentStatus>
  );
}
