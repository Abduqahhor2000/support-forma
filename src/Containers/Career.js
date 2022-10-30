import React, { useState, useEffect } from "react";
import BgMap from "../img/bg_map.png";
import CareerBanner from "../img/career_banner.png";
import {
  true_input,
  error_input,
  drop_icon,
  resume_exit_icon,
} from "../img/svg";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik } from "formik";
import { Select } from "antd";
import pdf_img from "../img/pdf_img.png";
import "./style.css";
import ModalBox from "./ModalBox";
import { ShortFormModal } from "./modalContent/ShortFormModal";
import { AnimatePresence } from "framer-motion";
import { https } from "../axios";

const { Option } = Select;
const SUPPORTED_FORMATS = ["pdf", "docx"];

export default function Career() {
  const [selectedFile, setSelectedFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [modal, setModal] = useState(false);
  const [majority, setMajority] = useState([]);
  const [degree, setDegree] = useState([]);
  const [userID, setUserID] = useState("");

  function selected(file) {
    const fileFormat = file.name.split(".").pop(); 
    if (!SUPPORTED_FORMATS.includes(fileFormat)) {
      setFileError(
        "Uploaded file has unsupported format. Please! Send the file in PDF or Docx format."
      );
      return;
    } else if (selectedFile.size > 5242880) {
      setFileError(
        "Uploaded file is too big. Please! File size should not exceed 5 MB"
      );
      return;
    }

    let cutedName = file.name;
    if (file.name.length > 16) {
      cutedName = file.name.substring(0, 10) + "... ." + fileFormat;
    }
    setFileName(cutedName);
    setSelectedFile(file);
  }

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  useEffect(() => {
    if (majority.length < 1) {
      https
        .get("/v1/professions")
        .then((data) => {
          setMajority(data.data);
        })
        .catch((err) => console.log(err));
    }
    if (degree.length < 1) {
      https
        .get("/v1/degrees")
        .then((data) => {
          setDegree(data.data);
        })
        .catch((err) => console.log(err));
    }
  });

  useEffect(() => {
    let bodyTag = document.querySelector("body");
    if (modal) {
      bodyTag.classList.add("overflow-y-hidden");
      bodyTag.classList.add("h-screen");
      bodyTag.classList.add("p-0");
      bodyTag.classList.add("m-0");
    } else {
      bodyTag.classList.remove("overflow-y-hidden");
      bodyTag.classList.remove("h-screen");
      bodyTag.classList.remove("p-0");
      bodyTag.classList.remove("m-0");
    }
  }, [modal]); 

  return (
    <div>
      <div className="min-h-[700px] bg-color-brand relative flex items-center justify-center">
        <div className="absolute h-full w-full max-w-[1442px] inset-0 my-0 mx-auto">
          <img className="w-full h-full block" src={BgMap} alt=""></img>
        </div>
        <div className="max-w-[1160px] flex flex-wrap justify-between z-10">
          <div className="max-w-[650px] text-white mt-14 mr-20">
            <h3 className="font-extrabold tracking-widest text-3xl text-white mb-8">
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
          <div className="w-[430px] h-[385px]">
            <img
              className="w-full h-full block"
              src={CareerBanner}
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <div className="min-h-[600px] max-w-[1200px] mx-auto flex justify-between items-center">
        <div>
          <h2 className="w-[470px] text-[40px] font-bold">
            We will be happy if you are comformed to our team!
          </h2>
        </div>
        <div className="relative w-[630px] h-32">
          <div className="absolute w-full shadow-cardJob bg-white -top-[335px] rounded-[10px] duration-200 p-8">
            <h3 className="text-3xl text-center tracking-wider font-bold mb-8">
              Our Jobs
            </h3>
            <Formik
              initialValues={{
                fullName: "",
                phone: "",
                email: "",
                majority: "",
                focusOn: "",
                degree: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.fullName) {
                  errors.fullName = "Required";
                } else if (values.fullName.length < 6) {
                  errors.fullName = "Invalid fullName!";
                }

                if (!values.phone) {
                  errors.phone = "Required";
                } else if (values.phone.length < 9) {
                  errors.phone = "Invalid phone number!";
                }

                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.majority) {
                  errors.majority = "Required";
                }
                if (!values.focusOn) {
                  errors.focusOn = "Required";
                }
                if (!values.degree) {
                  errors.degree = "Required";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append("tag", "resume");
                formData.append("files", selectedFile);

                https
                  .post("/v1/medias", formData)
                  .then((data) => 
                    https.post("/v1/applicants", {
                      full_name: values.fullName,
                      phone: values.phone,
                      email: values.email,
                      majority: values.majority,
                      focus_on: values.focusOn,
                      degree: values.degree,
                      file_resume: data.data.files[0],
                      source: "web",
                    })
                ) 
                  .then((data) =>{
                    console.log(data.data)
                    setUserID(data.data.applicant[0].id)
                    setModal(true)
                  }) 
                  .catch((e) => console.log(e)); 

                setSubmitting(false); 
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap justify-between mb-7">
                    <div
                      className={`relative w-[275px] mb-5 ${
                        errors.fullName && touched.fullName ? "mb-3" : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullName}
                        autoComplete="off"
                        maxLength={30}
                        required
                        className={`peer  border-[1px] rounded-[20px] border-solid h-11 w-full outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${
                          values.fullName && !errors.fullName
                            ? "border-input-succes"
                            : errors.fullName && touched.fullName
                            ? "border-input-error"
                            : "border-input-border"
                        }`}
                      />
                      <span
                        className={`absolute top-3 left-4 peer-focus:-top-2 ${
                          values.fullName ? "-top-2" : ""
                        } bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none`}
                      >
                        Full name*
                      </span>
                      <span
                        className={`absolute ${
                          values.fullName && !errors.fullName
                            ? "opacity-100"
                            : "opacity-0"
                        } peer-focus:opacity-0 top-2.5 duration-200 right-3`}
                      >
                        {true_input}
                      </span>
                      {errors.fullName && touched.fullName ? (
                        <span className="text-input-error flex items-center">
                          {error_input}
                          {errors.fullName}
                        </span>
                      ) : null}
                    </div>
                    <div
                      className={`relative w-[275px] mb-5 ${
                        errors.phone && touched.phone ? "mb-3" : ""
                      }`}
                    >
                      <input
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        autoComplete="off"
                        maxLength={20}
                        required
                        className={`peer  border-[1px] rounded-[20px] border-solid h-11 w-full outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${
                          values.phone && !errors.phone
                            ? "border-input-succes"
                            : errors.phone && touched.phone
                            ? "border-input-error"
                            : "border-input-border"
                        }`}
                      />
                      <span
                        className={`absolute top-3 left-4 peer-focus:-top-2 ${
                          values.phone ? "-top-2" : ""
                        } bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none`}
                      >
                        Phone number*
                      </span>
                      <span
                        className={`absolute ${
                          values.phone && !errors.phone
                            ? "opacity-100"
                            : "opacity-0"
                        } peer-focus:opacity-0 top-2.5 duration-200 right-3`}
                      >
                        {true_input}
                      </span>
                      {errors.phone && touched.phone ? (
                        <span className="text-input-error flex items-center">
                          {error_input}
                          {errors.phone}
                        </span>
                      ) : null}
                    </div>
                    <div
                      className={`relative w-[275px] mb-5 ${
                        errors.email && touched.email ? "mb-3" : ""
                      }`}
                    >
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        autoComplete="off"
                        maxLength={50}
                        required
                        className={`peer  border-[1px] rounded-[20px] border-solid h-11 w-full outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${
                          values.email && !errors.email
                            ? "border-input-succes"
                            : errors.email && touched.email
                            ? "border-input-error"
                            : "border-input-border"
                        }`}
                      />
                      <span
                        className={`absolute top-3 left-4 peer-focus:-top-2 ${
                          values.email ? "-top-2" : ""
                        } bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none`}
                      >
                        Email*
                      </span>
                      <span
                        className={`absolute ${
                          values.email && !errors.email
                            ? "opacity-100"
                            : "opacity-0"
                        } peer-focus:opacity-0 top-2.5 duration-200 right-3`}
                      >
                        {true_input}
                      </span>
                      {errors.email && touched.email ? (
                        <span className="text-input-error flex items-center">
                          {error_input}
                          {errors.email}
                        </span>
                      ) : null}
                    </div>
                    <div
                      className={`relative w-[275px] mb-5 ${
                        errors.majority ? "mb-3" : ""
                      }`}
                    >
                      <Select
                        onChange={(value) => {
                          handleChange({ target: { value, name: "majority" } });
                        }}
                        onBlur={() =>
                          handleBlur({ target: { name: "majority" } })
                        }
                        value={values.majority}
                        className={`peer border-[1px] text-placeholder appearance-none rounded-[20px] border-solid h-11 w-full  duration-150 ${
                          values.majority && !errors.majority
                            ? "border-input-succes"
                            : errors.majority && touched.majority
                            ? "border-input-error"
                            : "border-input-border focus:border-input-focus"
                        }`}
                      >
                        <Option className="text-placeholder" hidden value="">
                          Majority
                        </Option>
                        {
                          majority.map(major => {
                            if(major.all.length < 1){
                              return null;
                            }
                            return(
                              <Option key={major.id} className="text-placeholder" value={major.name}>
                                {major.name}
                              </Option>
                            )
                          })
                        }
                      </Select>
                      {errors.majority && touched.majority ? (
                        <span className="text-input-error flex items-center">
                          {error_input}
                          {errors.majority}
                        </span>
                      ) : null}
                    </div>
                    <div
                      className={`relative w-[275px] duration-300 overflow-hidden ${
                        values.majority ? "mb-5" : "h-0 mb-0"
                      } `}
                    >
                      <Select
                        onChange={(value) => {
                          handleChange({ target: { value, name: "focusOn" } });
                        }}
                        onBlur={() =>
                          handleBlur({ target: { name: "focusOn" } })
                        }
                        value={values.focusOn}
                        className={`peer border-[1px] text-placeholder appearance-none rounded-[20px] border-solid h-11 w-full duration-150 ${
                          values.focusOn && !errors.focusOn
                            ? "border-input-succes"
                            : errors.focusOn && touched.focusOn
                            ? "border-input-error"
                            : "border-input-border focus:border-input-focus"
                        }`}
                      >
                        <Option className="text-placeholder" hidden value="">
                          Focus on
                        </Option>
                        {/* {console.log(majority[values?.majority])} */}
                        {
                          majority.map(major => {
                            if(major.name !== values.majority) {return null}
                            let arr = [];
                            major.all.map((focus, index) => {
                              arr.push(
                                <Option key={index} className="text-placeholder" value={focus.name}>
                                  {focus.name}
                                </Option>
                              )
                              return null;
                            })
                            return arr;
                          })
                        }
                       
                      </Select>
                      {errors.focusOn && touched.focusOn ? (
                        <span className="text-input-error flex items-center">
                          {error_input}
                          {errors.focusOn}
                        </span>
                      ) : null}
                    </div>
                    <div
                      className={`relative duration-300 overflow-hidden mb-5 ${
                        values.majority ? "" : "h-0"
                      } ${values.focusOn ? "w-[275px]" : "w-0 mb-0"}`}
                    >
                      <Select
                        onChange={(value) =>
                          handleChange({ target: { value, name: "degree" } })
                        }
                        onBlur={() =>
                          handleBlur({ target: { name: "degree" } })
                        }
                        value={values.degree}
                        className={`peer border-[1px] text-placeholder appearance-none rounded-[20px] border-solid h-11 w-full duration-150 ${
                          values.degree && !errors.degree
                            ? "border-input-succes"
                            : errors.degree && touched.degree
                            ? "border-input-error"
                            : "border-input-border focus:border-input-focus"
                        }`}
                      >
                        <Option className="text-placeholder" hidden value="">
                          Degree
                        </Option>
                        {degree.map((deg) => {
                          return (
                            <Option key={deg.id} className="text-placeholder" value={deg.id}>
                              {deg.name}
                            </Option>
                          )
                        })}
                        
                      
                      </Select>
                      {errors.degree && touched.degree ? (
                        <span className="text-input-error flex items-center">
                          {error_input}
                          {errors.degree}
                        </span>
                      ) : null}
                    </div>
                    <div className="w-full px-4 pt-4 pb-5 border-[1px] border-solid border-input-border rounded-lg">
                      <div className="text-sm text-resume mb-4 flex justify-between">
                        <span>Download resume</span>
                        <span>Maximum file size is 5 MB</span>
                      </div>
                      <div
                        className={`relative w-full h-[122px] border-[1px] border-dashed rounded-lg flex flex-col justify-center items-center ${
                          fileError ? "border-input-error" : "border-resume"
                        } `}
                      >
                        <div>{drop_icon}</div>
                        <div className="text-sm cursor-pointer text-placeholder rounded mt-3 py-1.5 px-2.5 border-[1px] border-solid border-input-border">
                          Upload resume
                        </div>
                        <input
                          type="file"
                          name="resume"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              selected(e.target.files[0]);
                            }
                          }}
                          className="absolute file:hidden text-transparent w-full h-full top-0 left-0 rounded-lg cursor-pointer after:hidden before:hidden"
                        />
                        {selectedFile ? (
                          <span className="absolute top-0 bottom-0 my-auto left-2 h-[106px] w-[106px] rounded-lg border-[1px] border-solid border-input-border">
                            <span
                              onClick={() => {
                                setSelectedFile("");
                              }}
                              className="absolute right-2 top-2 cursor-pointer"
                            >
                              {resume_exit_icon}
                            </span>
                            <img
                              className="w-11 h-14 absolute inset-x-0 mx-auto top-4"
                              src={pdf_img}
                              alt=""
                            />
                            <span className="text-[10px] max-w-min whitespace-nowrap absolute bottom-2.5 inset-x-0 mx-auto">
                              {fileName}
                            </span>
                          </span>
                        ) : null}
                      </div>
                      <span
                        className={`text-xs text-input-error duration-200 flex overflow-hidden items-center ${
                          fileError ? "" : "h-0"
                        }`}
                      >
                        {error_input}
                        {fileError}
                      </span>
                    </div>
                  </div>
                  <ReCAPTCHA
                    sitekey="6LfXMMYiAAAAALZ2u4WWOR3jssjBxuvUj8eBa8v5"
                    onChange={onChange}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-block pt-2 pb-2.5 text-lg text-white px-20 mt-5 bg-gradient-to-l tracking-widest from-gradient-color-1 to-gradient-color-2 rounded-full cursor-pointer hover:bg-gradient-to-r"
                  >
                    Send request
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modal ? (
          <ModalBox setModal={setModal}>
            <ShortFormModal setModal={setModal} userId={userID} />
          </ModalBox>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
