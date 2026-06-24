import React from "react";
import CitizenNavbar from "../components/CitizenNavbar";
import CitizenComplaintForm from "../components/CitizenComplaintForm";

export default function CitizenLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <CitizenNavbar />

      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-800">
              Smart Civic Connect
            </h1>

            <p className="text-lg text-gray-600">
              Report civic issues, track complaint progress, and help improve
              your city through transparent governance.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">
                What You Can Do
              </h3>

              <ul className="space-y-3 text-gray-700">
                <li>✅ Report potholes and road damage</li>
                <li>✅ Report garbage collection issues</li>
                <li>✅ Report water leaks and drainage problems</li>
                <li>✅ Upload photos as evidence</li>
                <li>✅ Add precise location details</li>
                <li>✅ Track complaint status in real-time</li>
                <li>✅ Receive updates from authorities</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                className="border bg-blue-600 border-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
                onClick={() =>
                  document.getElementById("about-section").scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Complaint Form */}
          <CitizenComplaintForm />
        </div>

        <div id="about-section" className="mt-20 p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-4">About Smart Civic Connect</h2>

          <p className="text-gray-600">
            Smart Civic Connect is a platform that allows citizens to report
            civic issues such as potholes, garbage, water leaks, and drainage
            problems directly to municipal authorities.
          </p>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4">How It Works</h3>

            <ol className="list-decimal pl-6 space-y-2">
              <li>Report an issue</li>
              <li>Upload photos</li>
              <li>Provide location</li>
              <li>Officials review complaint</li>
              <li>Track resolution status</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
