import Swal from "sweetalert2";

export default async function SelectAlert({
  material = [],
  placeholder = "Select a course",
  validate,
}) {
  const courseOptions = material
    .map(
      (item) =>
        `<option value="${item.course_id}">${
          item.course_name?.trim() || "Unnamed"
        }</option>`
    )
    .join("");

  const requirementOptions = [
    "University Requirement (Mandatory)",
    "University Requirement (Optional)",
    "College Requirement (Mandatory)",
    "Major Requirement (Mandatory)",
    "Major Requirement (Optional)",
    "Remedial Requirement (Mandatory)",
  ]
    .map((type) => `<option value="${type}">${type}</option>`)
    .join("");

  const html = `
  <select id="swal-course" class="swal2-select" style="margin-bottom:10px;width:90%; min-width:200px;">
    <option value="">${placeholder}</option>
    ${courseOptions}
  </select>
  <select id="swal-requirement" class="swal2-select" style="width:90%; min-width:200px;">
    <option value="">Select requirement type</option>
    ${requirementOptions}
  </select>
`;

  const { value } = await Swal.fire({
    title: "Select Course and Requirement Type",
    html,
    width: "1000px", 
    showCancelButton: true,
    confirmButtonText: "Confirm",
    focusConfirm: false,
    preConfirm: () => {
      const courseId = document.getElementById("swal-course").value;
      const requirementType = document.getElementById("swal-requirement").value;
      if (!courseId || !requirementType) {
        Swal.showValidationMessage(
          "You must select both course and requirement type"
        );
        return;
      }
      if (validate) {
        const error = validate({ courseId, requirementType });
        if (error) {
          Swal.showValidationMessage(error);
          return;
        }
      }
      return { courseId: Number(courseId), requirementType };
    },
  });

  return value || null;
}
