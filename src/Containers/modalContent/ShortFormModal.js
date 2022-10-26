import React from "react";
import career_succes from "../../img/career_succes.png";

export const ShortFormModal = () => {
  return (
    <div className="w-[1016px] h-[552px] flex justify-between items-center bg-white rounded-xl">
      <div className="w-[400px] min-h-[470px] ml-12"></div>
      <div className="w-[410px] min-h-[470px] flex flex-col justify-between items-center mr-12 border-solid border-[1px] border-input-border rounded-xl">
        <img src={career_succes} alt="" className="w-[340px] h-[230px] mt-7" />
        <p className="leading-7 text-base tracking-wider font-semibold text-center w-80">
          If you want to be first chosen candidates please fill the section too
        </p>
        <span className="text-white font-semibold text-lg leading-7 py-2 bg-gradient-to-l from-gradient-color-1 to-gradient-color-2 rounded-full px-24 mb-7 cursor-pointer hover:bg-gradient-to-r">Next</span>
      </div>
    </div>
  );
};
