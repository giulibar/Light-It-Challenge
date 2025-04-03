import React, { useState } from "react";
import "../addPatientModal.css";
import { addPatient } from "../services/patientService";

const AddPatientModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    documentPhoto: null,
    phoneNumberExtension: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Only letters allowed.";
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Email must be @gmail.com";
    }

    if (!formData.documentPhoto) {
      newErrors.documentPhoto = "Document photo is required.";
    } else if (!formData.documentPhoto.name.endsWith(".jpg")) {
      newErrors.documentPhoto = "Only .jpg images allowed.";
    }
    if (!formData.phoneNumberExtension || !formData.phoneNumber) {
      newErrors.phoneNumberExtension = "Phone number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFormData({ ...formData, documentPhoto: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const newPatient = new FormData();
      newPatient.append("fullName", formData.fullName);
      newPatient.append("email", formData.email);
      newPatient.append("document", formData.documentPhoto);

      // Concatenar extensión y número
      const fullPhoneNumber = `${formData.phoneNumberExtension}-${formData.phoneNumber}`;
      newPatient.append("phoneNumber", fullPhoneNumber);

      await addPatient(newPatient);

      setSubmitStatus("success");
      onSubmit && onSubmit();
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error.response?.data?.error || "Unexpected error occurred");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Agrupar los dos campos en una misma línea */}
          <div className="form-group phone-group">
            <div className="phone-extension">
              <label>Ext</label>
              <input
                type="text"
                value={formData.phoneNumberExtension}
                onChange={(e) => setFormData({ ...formData, phoneNumberExtension: e.target.value })}
              />
              {errors.phoneNumberExtension && <span className="error">{errors.phoneNumberExtension}</span>}
            </div>
            <div className="phone-number">
              <label>Phone Number</label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </div>
          </div>

          <div className="form-group file-drop" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
            <label>Document Photo (JPG)</label>
            <p>Drag & Drop file here</p>
            {formData.documentPhoto && <span>{formData.documentPhoto.name}</span>}
            {errors.documentPhoto && <span className="error">{errors.documentPhoto}</span>}
          </div>

          <button type="submit">Submit</button>
        </form>

        {submitStatus === "success" && <p className="success-msg">Patient added successfully!</p>}
        {submitStatus === "error" && <p className="error-msg">{submitError}</p>}

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddPatientModal;
