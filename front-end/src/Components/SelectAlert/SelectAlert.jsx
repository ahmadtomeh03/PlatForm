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
  const html = `
  <style>
    @media (max-width: 600px) {
      #swal-course, #swal-requirement {
        width: 100% !important;
        min-width: unset !important;
      }
    }
  </style>
  <select id="swal-course" class="swal2-select" style="margin-bottom:10px;width:90%; min-width:200px;">
    <option value="">${placeholder}</option>
    ${courseOptions}
  </select>
  <input id="swal-requirement" class="swal2-input" placeholder="Enter requirement type" style="width:90%; min-width:200px; margin-top: 10px;" />
`;

  const { value } = await Swal.fire({
    title: "Select Course and Requirement Type",
    html,
    width: "90%",
    customClass: {
      popup: "swal-responsive-popup",
    },
    showCancelButton: true,
    confirmButtonText: "Confirm",
    focusConfirm: false,
    preConfirm: () => {
      const courseId = document.getElementById("swal-course").value;
      const requirementType = document
        .getElementById("swal-requirement")
        .value.trim();
      if (!courseId || !requirementType) {
        Swal.showValidationMessage(
          "You must select both course and enter requirement type"
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
