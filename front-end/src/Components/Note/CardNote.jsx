import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import axios from "axios";
import Swal from "sweetalert2";
import MultiInputAlert from "../MultiInputAlert/MultiInputAlert";

export default function CardNote({
  title,
  description,
  date,
  note_id,
  onDelete,
  onEdit,
}) {
  const token = localStorage.getItem("token");
  const handleToEdit = async () => {
    const result = await MultiInputAlert({
      title: "تعديل الملاحظة",
      inputs: [
        {
          id: "note_title",
          label: "عنوان الملاحظة",
          placeholder: "أدخل العنوان الجديد",
          value: title,
        },
        {
          id: "note_text",
          label: "تفاصيل الملاحظة",
          placeholder: "أدخل التفاصيل الجديدة",
          value: description,
        },
      ],
      validate: () => null,
    });

    if (result) {
      try {
        await axios.put(
          `http://localhost:3000/note-update/${note_id}`,
          {
            note_title: result.note_title,
            note_text: result.note_text,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onEdit({
          note_id,
          note_title: result.note_title,
          note_text: result.note_text,
          updated_at: new Date().toISOString(),
        });
        Swal.fire({
          icon: "success",
          title: "تم تعديل الملاحظة",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error updating note", error);
        Swal.fire({
          icon: "error",
          title: "فشل التعديل",
          text: error.response?.data?.message || "حدث خطأ ما",
        });
      }
    }
  };
  const handleToDelete = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لا يمكنك التراجع عن هذه العملية!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/note-delete/${note_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("note deleted successfully", response.data);
            if (onDelete) onDelete();
            Swal.fire({
              icon: "success",
              title: "تم حذف الملاحظة بنجاح ",
              timer: 1000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            console.error("Error deleting note", error);
            Swal.fire({
              icon: "error",
              title: "حدث خطأ أثناء الحذف",
              text: error.response?.data?.message || "حاول مرة أخرى لاحقًا",
            });
          });
      }
    });
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      style={{
        backgroundColor: "#FFF7F4",
        border: "1px solid #F6E0D9",
        borderRadius: "0.75rem",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)")
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#914632",
              margin: 0,
            }}
          >
            {title}
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#4B5563", margin: 0 }}>
            {description}
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.75rem",
          fontSize: "0.875rem",
          color: "#6B7280",
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          ✍️ {formatDate(date)}
        </span>

        <IconButton
          onClick={handleToEdit}
          size="small"
          sx={{
            color: "#6B7280",
            "&:hover": { color: "#374151" },
          }}
        >
          <EditNoteIcon fontSize="medium" />
        </IconButton>

        <ButtonDelete handleToDelete={handleToDelete} />
      </div>
    </div>
  );
}
