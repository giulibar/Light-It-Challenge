import React, { useState, useEffect } from "react";
import "../patientCard.css";

const PatientCard = ({ fullName, document, email, phoneNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card">
      <div className="topSection">
        <div className="nameContainer">
          <h2 className="name">{fullName}</h2>
          <button onClick={() => setIsExpanded(!isExpanded)} className="toggleButton">
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>

        <div className="imageContainer">
          {document ? (
            <img src={`http://localhost:3000/${document}`} alt="Patient Document" className="image" />
          ) : (
            <p className="noImage">No document</p>
          )}
        </div>
      </div>

      <div className="detailsContainer" style={{ height: isExpanded ? "auto" : "0px" }}>
        {isExpanded && (
          <div className="details">
            <p className="detailText"><strong>Email:</strong> {email}</p>
            <p className="detailText"><strong>Phone:</strong> {phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
