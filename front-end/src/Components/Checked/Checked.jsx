import "./Checked.css";
export default function Checked() {
  return (
    <div>
      <label className="custom-checkbox">
        <input name="dummy" type="checkbox" />
        <span class="checkmark"></span>
      </label>
    </div>
  );
}
