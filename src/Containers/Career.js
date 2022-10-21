import React, {useState} from "react";
import BgMap from "../img/bg_map.png";
import CareerBanner from "../img/career_banner.png";
import { true_input } from "../img/svg";

export default function Career() {
  const [inputTrue, setInputTrue] = useState(false);
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
            <span className="py-2.5 px-20 bg-gradient-to-l tracking-widest from-gradient-color-1 to-gradient-color-2 rounded-full cursor-pointer hover:bg-gradient-to-r">
              EXPLORE ROLES
            </span>
          </div>
          <div className="w-[450px] h-[385px]">
            <img
              className="w-full h-full block"
              src={CareerBanner}
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <div className="min-h-[600px] flex">
        <div>
          <h2 className="w-[470px] text-[40px] font-semibold">
            Let’s discuss how can we help you
          </h2>
        </div>
        <div className="relative">
          <div className="absolute w-[630px] shadow-cardJob rounded-lg p-8">
            <h3 className="text-3xl text-center tracking-wider font-semibold">
              Our Jobs
            </h3>
            <div className="flex flex-wrap justify-between">
              <div className="relative">
                <input type="text" required className={`peer border-input-border border-[1px] rounded-3xl border-solid h-11 w-[275px] outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${inputTrue ? "border-input-succes": "border-input"}`} />
                <span className="absolute top-3 left-4 peer-focus:-top-2 peer-valid:-top-2 bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none">
                  Full name*
                </span>
                <span className="absolute peer-focus:opacity-0 top-2.5 duration-200 right-3">{true_input}</span>
              </div>
              <input type="tel" />
              <input type="email" />
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
