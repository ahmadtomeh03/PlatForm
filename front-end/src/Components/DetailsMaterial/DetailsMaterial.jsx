import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../GoBack/ButtonBack";
import Tabs from "../Tabs/Tabs";
import ButtonUpload from "../ButtonUpload/ButtonUpload";
import { useContext, useState } from "react";
import CardUpload from "../CardUpload/CardUpload";
import Swal from "sweetalert2";
import { UserContext } from "../../Context/UserContext";

export default function DetailsMaterial() {
  const { collegeId } = useParams();
  const { majorId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { isLogin } = useContext(UserContext);
  return (
    <div style={{ margin: "20px" }}>
      <div className="flex flex-row justify-between items-center">
        <div
          onClick={() => {
            navigate(`/college/${collegeId}/${majorId}`);
          }}
        >
          <ButtonBack to={"Back To Courses"} />
        </div>
        <div
          onClick={() => {
            if (isLogin) {
              setShowModal(true);
            } else {
              Swal.fire({
                icon: "warning",
                title: "لا يمكن رفع أي من الملفات ",
                text: "لتتمكن من الإضافة قم بتسجيل الدخول إلى الموقع",
                confirmButtonText: "الذهاب لتسجيل الدخول",
                showCancelButton: true,
                cancelButtonText: "إلغاء",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate(`/acount/${"login"}`);
                }
              });
            }
          }}
        >
          <ButtonUpload />
        </div>
      </div>
      <Tabs />
      {showModal && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full z-40"
            onClick={() => setShowModal(false)}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          ></div>

          <div
            className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[30%]"
            style={{ marginTop: "30px" }}
          >
            <CardUpload onClose={() => setShowModal(false)} />
          </div>
        </>
      )}
    </div>
  );
}
