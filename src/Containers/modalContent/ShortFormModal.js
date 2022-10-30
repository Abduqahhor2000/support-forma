import React from "react";
import career_succes from "../../img/career_succes.png";
import Lottie from "lottie-react";
import animationData from "../../lotties/succes.json";
import { useNavigate } from "react-router-dom";

export const ShortFormModal = ({setModal, userID}) => {
  const navigate = useNavigate();
  return (
    <div className="w-[1016px] h-[552px] flex justify-between items-center bg-white rounded-xl">
      <div className="w-[400px] min-h-[470px] flex flex-col justify-between text-center ml-12">
        <div className="w-[387px] h-[360px] flex justify-center items-center">
          <Lottie animationData={animationData} className="scale-125" />
        </div>
        <span className="w-full flex flex-col items-center font-semibold tracking-wider text-main-text">
          <span className="text-3xl leading-9">Successfully</span>
          <span className="text-base leading-8">
            Thank you for your enrollment
          </span>
        </span>
      </div>
      <div className="w-[410px] min-h-[470px] flex flex-col justify-between items-center mr-12 border-solid border-[1px] border-input-border rounded-xl">
        <img src={career_succes} alt="" className="w-[340px] h-[230px] mt-7" />
        <p className="leading-7 text-base tracking-wider font-semibold text-center w-80">
          If you want to be first chosen candidates please fill the section too
        </p>
        <span
          onClick={() => {
            setModal(false)
            setTimeout(() => {
              navigate(`/career/${userID}`);
            }, 1000);
          }}
          className="text-white font-semibold text-lg leading-7 py-2 bg-gradient-to-l from-gradient-color-1 to-gradient-color-2 rounded-full px-24 mb-7 cursor-pointer hover:bg-gradient-to-r"
        >
          Next
        </span>
      </div>
    </div>
  );
};
