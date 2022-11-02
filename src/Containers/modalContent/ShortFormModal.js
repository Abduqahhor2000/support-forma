import React from "react";
import career_succes from "../../img/career_succes.png";
import Lottie from "lottie-react";
import animationData from "../../lotties/succes.json";
import { useNavigate } from "react-router-dom";

export const ShortFormModal = ({ setModal, userID }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[240px] lsm:w-[300px] sm:w-[600px] mds:w-[768px] xl:w-[1016px] h-[340px] lsm:h-[420px] xl:h-[552px] flex justify-between items-center bg-white rounded-xl">
      <div className="hidden sm:flex w-1/2 h-full pb-10 xl:pb-20 flex-col justify-between text-center">
        <div className="w-full h-72 xl:h-[360px] flex justify-center items-center">
          <Lottie animationData={animationData} />
        </div>
        <span className="w-full flex flex-col items-center font-semibold tracking-wider text-main-text">
          <span className="text-3xl leading-9">Successfully</span>
          <span className="text-base leading-8">
            Thank you for your enrollment
          </span>
        </span>
      </div>
      <div className="w-full sm:w-1/2 h-full px-6 sm:px-0 py-6 xl:py-10 mr-0 sm:mr-8 xl:mr-12">
        <div className="w-full h-full flex flex-col justify-between items-center border-solid border-[1px] border-input-border rounded-xl">
          <img
            src={career_succes}
            alt=""
            className="w-[230px] xl:w-[340px] object-contain mt-7"
          />
          <p className="leading-5 lsm:leading-7 text-xs lsm:text-base tracking-wider font-semibold text-center w-full px-3 mds:w-80">
            If you want to be first chosen candidates please fill the section
            too
          </p>
          <span
            onClick={() => {
              setModal(false);
              setTimeout(() => {
                navigate(`/career/${userID}`);
                window.scrollTo(0, 0);
              }, 1000);
            }}
            className="text-white font-semibold text-sm lsm:text-lg leading-5 sm:leading-7 py-2 bg-gradient-to-l from-gradient-color-1 to-gradient-color-2 rounded-full px-16 sm:px-24 mb-4 xl:mb-7 cursor-pointer hover:bg-gradient-to-r"
          >
            Next
          </span>
        </div>
      </div>
    </div>
  );
};
