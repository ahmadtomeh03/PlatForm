import Swal from "sweetalert2";
export default async function MultiInputAlert({
  title = "Enter Details",
  inputs = [],
  validate,
}) {
  const html = inputs
    .map(
      (input) =>
        `<input id="${input.id}" class="swal2-input" placeholder="${
          input.placeholder
        }" type="${input.type || "text"}">`
    )
    .join("");

  const { value } = await Swal.fire({
    title,
    html,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Submit",
    preConfirm: () => {
      const values = {};
      for (const input of inputs) {
        const val = document.getElementById(input.id).value.trim();
        values[input.id] = val;
      }

      if (validate) {
        const errorMessage = validate(values);
        if (errorMessage) {
          Swal.showValidationMessage(errorMessage);
          return;
        }
      } else {
        for (const key in values) {
          if (!values[key]) {
            Swal.showValidationMessage("All fields are required.");
            return;
          }
        }
      }

      return values;
    },
  });

  return value || null;
}
