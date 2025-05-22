import CardMatirial from "../Card/CardMatirial";
import cpp from "../../assets/c++.png";
import { computerEngineeringMajor } from "./Materials";
export default function Material() {
  const listOfMaterial = computerEngineeringMajor.map((material) => {
    return (
      <CardMatirial
        nameOfCourse={material.name}
        description={material.description}
        logo={cpp}
      />
    );
  });
  return (
    <div
      className="flex flex-row flex-wrap items-center justify-center gap-5"
      style={{ margin: "20px" }}
    >
      {listOfMaterial}
    </div>
  );
}
