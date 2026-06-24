import React from "react";
import { Dropdown } from "rsuite";
import { useNavigate } from "react-router-dom";

export default function CitizenProfileDropdown({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("citizenToken");
    localStorage.removeItem("citizenEmail");

    setIsLoggedIn(false);
    navigate("/");
  };

  const email = localStorage.getItem("citizenEmail") || "User";
  const initial = email ? email.charAt(0).toUpperCase() : "U";
  return (
    <div className="flex items-center gap-2">
      <div className="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
        {initial}
      </div>

      <Dropdown title="Profile">
        <Dropdown.Item onClick={() => navigate("/my-profile")}>
          My Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={() => navigate("/my-complaints")}>
          My Complaints
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
