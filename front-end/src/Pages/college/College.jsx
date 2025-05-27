import Department from "../../Components/Department/Department";
import { Outlet } from "react-router-dom";

export default function College() {
  return (
    <div className="w-full">
      <Outlet />
      <div className="w-[100%]">
        <Department />
      </div>
    </div>
  );
}
