import React, { useState, useRef } from "react";
import "../addPatientModal.css";

const FileDrop = ({ onFileSelect, error }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const acceptedFormats = [".jpg"];
    const label = "Document Photo";

    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (validateFile(file)) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (validateFile(file)) {
            setSelectedFile(file);
            onFileSelect(file);
        }
    };

    const validateFile = (file) => {
        if (!file) return false;
        return file.type === "image/jpeg"; 
    };

    return (
        <div className="file-drop" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
            <label>{label} ({acceptedFormats.join(", ")})</label>
            <p>Drag & Drop file here</p>
            
            {selectedFile && <span className="file-name">{selectedFile.name}</span>}

            {error && <span className="error">{error}</span>}

            <button type="button" onClick={() => fileInputRef.current.click()}>Select File</button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={acceptedFormats.join(",")}
                style={{ display: "none" }}
            />
        </div>
    );
};

export default FileDrop;
