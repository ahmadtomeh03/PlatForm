import { useContext, useEffect, useState } from "react";
import Search from "../Search/Search";
import CardNote from "./CardNote";
import NoteForm from "./NoteForm";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Swal from "sweetalert2";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ListCardNote({ type, selectedId }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const { isLogin } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(selectedId);
  console.log(type);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!selectedId) return;

    axios
      .get("http://localhost:3000/note-list", {
        params: {
          content_type: type,
          content_id: selectedId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setNotes(response.data.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedId, type]);

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !newNoteDescription.trim()) return;
    const newNote = {
      content_type: type,
      content_id: selectedId,
      note_text: newNoteDescription,
      note_title: newNoteTitle,
    };
    axios
      .post(
        "http://localhost:3000/note-create",
        {
          content_type: type,
          content_id: selectedId,
          note_text: newNoteDescription,
          note_title: newNoteTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setNotes([response.data.data, ...notes]);
        setNewNoteTitle("");
        setNewNoteDescription("");
        setShowAddForm(false);
        Swal.fire({
          icon: "success",
          title: "تمت الإضافة للمفضلة",
          timer: 1000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "خطأ في المفضلة",
          text: error.response?.data?.message || "حدث خطأ ما",
        });
      });
  };
  return (
    <div className="containers min-h-screen" style={{ padding: "20px" }}>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          height: "650px",
          display: "flex",
          flexDirection: "column",
          minHeight: "730px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: "20px" }}
          >
            <Search />

            <button
              className="flex items-center gap-1"
              onClick={() => {
                if (isLogin) {
                  setShowAddForm(!showAddForm);
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "لا يمكن إضافة ملاحظات على الملف",
                    text: "لتتمكن من الإضافة قم بتسجيل الدخول إلى الموقع",
                    confirmButtonText: "الذهاب لتسجيل الدخول",
                    showCancelButton: true,
                    cancelButtonText: "إلغاء",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate(`/acount/${"login"}`);
                    }
                  });
                }
              }}
              style={{
                padding: "5px 10px",
                background: "var(--color1)",
                borderRadius: "8px",
              }}
            >
              <AddBoxIcon style={{ color: "white" }} />
              <span style={{ color: "white", fontWeight: "bold" }}>
                {showAddForm ? "Cancel" : "Add Note"}
              </span>
            </button>
          </div>

          <h1
            className="text2 text-2xl font-bold"
            style={{ marginBottom: "20px" }}
          >
            All Notes
          </h1>
        </div>

        {showAddForm && (
          <NoteForm
            title={newNoteTitle}
            description={newNoteDescription}
            onTitleChange={(e) => setNewNoteTitle(e.target.value)}
            onDescriptionChange={(e) => setNewNoteDescription(e.target.value)}
            onSave={handleAddNote}
          />
        )}

        <div
          style={{
            overflowY: "auto",
            maxHeight: "550px",
            paddingRight: "10px",
          }}
        >
          <div className="grid grid-cols-1 gap-4">
            {notes.map((note) => (
              <CardNote
                key={note.note_id}
                note_id={note.note_id}
                title={note.note_title}
                description={note.note_text}
                date={note.updated_at}
                onDelete={() => {
                  setNotes((prev) =>
                    prev.filter((n) => n.note_id !== note.note_id)
                  );
                }}
                onEdit={(updatedNote) => {
                  setNotes((prevNotes) =>
                    prevNotes.map((n) =>
                      n.note_id === updatedNote.note_id
                        ? { ...n, ...updatedNote }
                        : n
                    )
                  );
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
