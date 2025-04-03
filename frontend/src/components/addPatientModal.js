import React, { useState, useRef } from "react";
import "../addPatientModal.css";
import { addPatient } from "../services/patientService";
import FileDrop from "./fileDropZone";


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
  const fileInputRef = useRef(null);

  const validate = () => {
    let newErrors = {};

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Incorrecr email";
    }

    if (!formData.fullName || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Only letters allowed";
    }


    if (!formData.documentPhoto) {
      newErrors.documentPhoto = "Photo  of the document required.";
    } else if (!formData.documentPhoto.name.endsWith(".jpg")) {
      newErrors.documentPhoto = "Only .jpg images allowed";
    }

    if (!formData.phoneNumberExtension || !formData.phoneNumber) {
      newErrors.phoneNumberExtension = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFormData({ ...formData, documentPhoto: file });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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
          <div className="form-group email-name-group">
            <div className="email">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </div>

            <div className="email">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </div>

          <div className="form-group phone-group">
            <div className="phone-extension">
              <label>Ext</label>
              <input
                type="number"
                value={formData.phoneNumberExtension}
                onChange={(e) => setFormData({ ...formData, phoneNumberExtension: e.target.value })}
              />
              {errors.phoneNumberExtension && <span className="error">{errors.phoneNumberExtension}</span>}
            </div>
            <div className="phone-number">
              <label>Phone Number</label>
              <input
                type="number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
            </div>
          </div>

          <FileDrop
            onFileSelect={(file) => setFormData((prev) => ({ ...prev, documentPhoto: file }))}
            error={errors.documentPhoto}
          />


          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" className="close-btn" onClick={onClose}>Close</button>
          </div>
        </form>


        {submitStatus === "success" && <p className="success-msg">Patient added successfully!</p>}
        {submitStatus === "error" && <p className="error-msg">{submitError}</p>}
      </div>
    </div>
  );
};

export default AddPatientModal;
