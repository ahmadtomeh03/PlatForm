// Students.jsx
import React, { useState } from "react";

function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "Alice", username: "alice123", email: "alice@example.com", date: "2024-01-01" },
    { id: 2, name: "Bob", username: "bobster", email: "bob@example.com", date: "2024-02-15" }
  ]);
  const [form, setForm] = useState({ name: "", username: "", email: "", date: "" });
  const [searchBy, setSearchBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [invalidFields, setInvalidFields] = useState({});
  const [confirmId, setConfirmId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, [e.target.name]: false });
  };

  const handleSubmit = () => {
    const { name, username, email, date } = form;
    const newInvalid = {
      name: !name,
      username: !username,
      email: !email,
      date: !date
    };
    setInvalidFields(newInvalid);
    const hasError = Object.values(newInvalid).some((val) => val);
    if (hasError) return;
    setStudents([...students, { ...form, id: students.length + 1 }]);
    setForm({ name: "", username: "", email: "", date: "" });
  };

  const confirmDelete = (id) => {
    setConfirmId(id);
  };

  const handleDelete = () => {
    setStudents(students.filter((student) => student.id !== confirmId));
    setConfirmId(null);
  };

  const cancelDelete = () => {
    setConfirmId(null);
  };

  const filteredStudents = students.filter((student) =>
    student[searchBy].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputStyle = (field) => ({
    border: "1px solid #ccc",
    padding: "8px",
    marginBottom: "4px",
    borderColor: invalidFields[field] ? "red" : "#ccc",
    display: "block",
    width: "100%",
    maxWidth: "300px"
  });

  const filterStyle = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  };

  const deleteButtonStyle = {
    backgroundColor: "transparent",
    color: "#f44336",
    border: "none",
    padding: "4px 8px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 999
  };

  return (
    <div>
      <h1>Students</h1>
      <div>
        <input style={inputStyle("name")} name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        {invalidFields.name && <small style={{ color: "red" }}>Please fill in the name</small>}
      </div>
      <div>
        <input style={inputStyle("username")} name="username" value={form.username} onChange={handleChange} placeholder="Username" />
        {invalidFields.username && <small style={{ color: "red" }}>Please fill in the username</small>}
      </div>
      <div>
        <input style={inputStyle("email")} name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        {invalidFields.email && <small style={{ color: "red" }}>Please fill in the email</small>}
      </div>
      <div>
        <input style={inputStyle("date")} name="date" type="date" value={form.date} onChange={handleChange} placeholder="Date of Register" />
        {invalidFields.date && <small style={{ color: "red" }}>Please fill in the date</small>}
      </div>
      <button onClick={handleSubmit}>Add Student</button>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <label htmlFor="filter">Filter:</label>
        <select
          id="filter"
          style={filterStyle}
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
          <option value="date">Date</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchBy}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ ...filterStyle, flexGrow: 1 }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date of Register</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.username}</td>
              <td>{s.email}</td>
              <td>{s.date}</td>
              <td>
                <button style={deleteButtonStyle} onClick={() => confirmDelete(s.id)}>✖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmId && (
        <>
          <div style={overlayStyle} onClick={cancelDelete}></div>
          <div style={modalStyle}>
            <p>Are you sure you want to delete this student?</p>
            <button onClick={handleDelete} style={{ marginRight: "10px" }}>Yes, Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Students;
