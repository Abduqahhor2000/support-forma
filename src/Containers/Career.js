import React from "react";
import BgMap from "../img/bg_map.png";
import CareerBanner from "../img/career_banner.png"

export default function Career() {
  return (
    <div>
      <div className="min-h-[700px] bg-color-brand relative flex items-center justify-center">
        <div className="absolute h-full w-full max-w-[1442px] inset-0 my-0 mx-auto">
          <img className="w-full h-full block" src={BgMap} alt=""></img>
        </div>
        <div className="max-w-[1200px] flex flex-wrap justify-between z-10">
          <div className="max-w-[650px] text-white mt-14 mr-20">
            <h3 className="font-extrabold tracking-widest text-3xl mb-8">
              Build Your Career along with Support
            </h3>
            <p className="text-lg font-medium leading-7	tracking-widest mb-10">
              Support is a network of talented individuals that collaborate to
              build forward-thinking initiatives. To expand our professional
              teams, we seek individuals with superior interpersonal skills,
              inquiring minds, and a strong desire for self-perfection and
              continuous growth.
            </p>
            <span className="py-2.5 px-20 bg-gradient-to-l tracking-widest from-gradient-color-1 to-gradient-color-2 rounded-full cursor-pointer hover:bg-gradient-to-r">EXPLORE ROLES</span>
          </div>
          <div className="w-[450px] h-[385px]">
            <img className="w-full h-full block" src={CareerBanner} alt=""></img>
          </div>
        </div>
      </div>
    </div>
  );
}
