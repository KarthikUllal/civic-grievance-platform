import React, { useState } from "react";
import CitizenLogin from "../../auth/CitizenLogin";
import CitizenProfileDropdown from "./CitizenProfileDropdown";

function CitizenNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("citizenToken")));

  const handleSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Civic Grievance Platform
        </h1>
        {isLoggedIn ? (
          <CitizenProfileDropdown setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        )}
       
      </div>
      {showLogin && <CitizenLogin onClose={() => setShowLogin(!showLogin)} onLoginSuccess={handleSuccess} />}
    </nav>
  );
}

export default CitizenNavbar;
