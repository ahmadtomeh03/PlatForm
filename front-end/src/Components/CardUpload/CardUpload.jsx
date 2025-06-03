import { useRef, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import "./CardUpload.css";
import DetailsUpload from "./DetailsUpload";

export default function CardUpload() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  return (
      <div className="modal">
        <div className="modal-header">
          <div className="modal-logo">
            <span className="logo-circle">
              <DriveFolderUploadIcon />
            </span>
          </div>
        </div>
        <DetailsUpload />
        <div className="modal-body">
          <p className="modal-title">Upload a file</p>
          <p className="modal-description">Attach the file below</p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <button className="upload-area" onClick={handleClick}>
            {!selectedFile ? (
              <>
                <span className="upload-area-icon">
                  <UploadFileIcon className="text-black" />
                </span>
                <span className="upload-area-title">
                  Drag file here to upload.
                </span>
                <span className="upload-area-description">
                  Alternatively, you can select a file by <br />
                  <strong className="text-[#1cc972]">clicking here</strong>
                </span>
              </>
            ) : (
              <div className="flex flex-row items-center justify-center text-black">
                <p className="">{selectedFile.name}</p>
                <button
                  className="remove-file-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            )}
          </button>
        </div>

        <div className="modal-footer">
          <button className="btn-primary">Upload File</button>
        </div>
      </div>
  );
}
