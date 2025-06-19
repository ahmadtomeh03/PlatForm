import { useState } from "react";
import Search from "../Search/Search";
import CardNote from "./CardNote";
import NoteForm from "./NoteForm";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function ListCardNote() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !newNoteDescription.trim()) return;

    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      description: newNoteDescription,
      createdAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteDescription("");
    setShowAddForm(false);
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
              onClick={() => setShowAddForm(!showAddForm)}
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
                key={note.id}
                title={note.title}
                description={note.description}
                date={note.createdAt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
