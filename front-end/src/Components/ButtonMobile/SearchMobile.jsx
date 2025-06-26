export default function SearchMobile({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={onChange}
      style={{
        flexGrow: 1,
        padding: "0.3rem 0.5rem",
        borderRadius: "0.25rem",
        border: "1.5px solid #d1d5db",
        outline: "none",
        transition: "border-color 0.2s ease",
       
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#60a5fa")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}
    />
  );
}
