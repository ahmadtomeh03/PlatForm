import "./Search.css";
export default function Search({ placeholder, value, onChange }) {
  return (
    <div>
      <input
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={onChange}
        type="text"
        name="text"
        className="input w-[150px] sm:w-[200px] md:w-[250px] lg:w[300px]"
      ></input>
    </div>
  );
}
