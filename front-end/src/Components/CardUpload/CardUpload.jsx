import { useContext, useRef, useState } from "react";
import axios from "axios";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import "./CardUpload.css";
import DetailsUpload from "./DetailsUpload";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Swal from "sweetalert2";

export default function CardUpload({ onClose }) {
  const [showCard, setShowCard] = useState(true);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameOfDoctor, setNameOfDoctor] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadValue, setUploadValue] = useState({
    upload_name: "",
    doctor_name: "",
    uploaded_type: "",
    description: "",
    course_id: "",
  });
  const { materialId } = useParams();
  const student_id = localStorage.getItem("student_id");
  const token = localStorage.getItem("token");
  const { role } = useContext(UserContext);
  const handleClick = () => fileInputRef.current.click();

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
  function logFormData(fd) {
    const obj = {};
    for (let [key, value] of fd.entries()) {
      obj[key] = value;
    }
    console.log(obj);
  }
  const handleUpload = async () => {
    if (!selectedFile || !nameOfDoctor || !type || !description) {
      alert("يرجى تعبئة جميع الحقول واختيار ملف.");
      return;
    }
    if (!token || (role !== "student" && role !== "superadmin")) {
      alert("غير مصرح لك برفع الملفات. الرجاء تسجيل الدخول بحساب صالح.");
      return;
    }

    const formData = new FormData();
    if (role == "superadmin") {
      formData.append(`${type}_name`, selectedFile.name);
      formData.append("doctor_name", nameOfDoctor);
      formData.append("description", description);
      formData.append("course_id", materialId);
      formData.append("file", selectedFile);
      try {
        setLoading(true);
        const res = await axios.post(
          `http://localhost:3000/admin/${type}-create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ تم الرفع بنجاح:", res.data);
        Swal.fire({
          icon: "success",
          title: "تم رفع الملف بنجاح",
          showConfirmButton: false,
          timer: 2000,
        });
        onClose();
      } catch (err) {
        console.error("❌ فشل في الرفع:", err.response?.data || err.message);
        alert("حدث خطأ أثناء رفع الملف");
      } finally {
        setLoading(false);
      }
    } else {
      formData.append("upload_name", selectedFile.name);
      formData.append("doctor_name", nameOfDoctor);
      formData.append("uploaded_type", type);
      formData.append("description", description);
      formData.append("course_id", materialId);
      formData.append("file", selectedFile);

      try {
        setLoading(true);
        const res = await axios.post(
          "http://localhost:3000/student/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("✅ تم الرفع بنجاح:", res.data);
        Swal.fire({
          icon: "success",
          title: "تم رفع الملف بنجاح",
          text: "تم إرسال الملف للمشرف وبانتظار الموافقة.",
          showConfirmButton: false,
          timer: 3000,
        });
        onClose();
      } catch (err) {
        console.error("❌ فشل في الرفع:", err.response?.data || err.message);
        alert("حدث خطأ أثناء رفع الملف");
      } finally {
        setLoading(false);
      }
    }
  };
  if (!showCard) return null;
  return (
    <div className="modal">
      <div className="modal-header">
        <div className="modal-logo">
          <span className="logo-circle">
            <DriveFolderUploadIcon />
          </span>
        </div>
      </div>

      <DetailsUpload
        nameOfDoctor={nameOfDoctor}
        setNameOfDoctor={setNameOfDoctor}
        type={type}
        setType={setType}
        description={description}
        setDescription={setDescription}
      />

      <div className="modal-body">
        <p className="modal-title">Upload a file</p>
        <p className="modal-description">Attach the file below</p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <div
          className="upload-area"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
        >
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
              <p>{selectedFile.name}</p>
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
        </div>
      </div>

      <div className="modal-footer">
        <button
          className="btn-primary"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </div>
  );
}
