export default function NoteForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSave,
}) {
  return (
    <div
      style={{
        backgroundColor: "#F5F7FA", 
        border: "1px solid #D6DBE0", 
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={onTitleChange}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          border: "1px solid #BCC4D1", 
          borderRadius: "8px",
          backgroundColor: "#FFFFFF", 
          color: "#3A3F51", 
        }}
      />
      <textarea
        placeholder="Note Description"
        value={description}
        onChange={onDescriptionChange}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #BCC4D1",
          borderRadius: "8px",
          marginBottom: "10px",
          resize: "none",
          height: "100px",
          backgroundColor: "#FFFFFF",
          color: "#3A3F51",
        }}
      ></textarea>
      <button
        onClick={onSave}
        style={{
          background: "#7B8D93", 
          color: "#F0F4F8", 
          padding: "8px 16px",
          borderRadius: "8px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Note
      </button>
    </div>
  );
}
