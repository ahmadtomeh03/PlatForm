import Department from "../../Components/Department/Department";
import { Outlet } from "react-router-dom";

export default function College() {
  return (
    <div>
      <Outlet />
      <Department />
    </div>
  );
}
