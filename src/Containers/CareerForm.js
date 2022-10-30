import React, { useEffect, useState } from "react";
import { true_input, plus_icon, error_input } from "../img/svg";
import { useParams } from "react-router-dom";
import { https } from "../axios";
import { Select, Input } from "antd";
import { DatePicker } from "antd";
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

const langLevel = [
  {
    id: 0,
    level: "A1",
  },
  {
    id: 1,
    level: "A2",
  },
  {
    id: 2,
    level: "B1",
  },
  {
    id: 3,
    level: "B2",
  },
  {
    id: 4,
    level: "C1",
  },
  {
    id: 5,
    level: "C2",
  },
];

export default function CareerForm() {
  const params = useParams();
  const [isNext, setIsNext] = useState(false);
  const [langString, setLangString] = useState([]);
  const [educations, setEducations] = useState([
    {
      id: new Date().getMilliseconds(),
      values: {
        city: "",
        faculty: "",
        department: "",
        graduation_year: "",
      },
      touched: {},
      errors: {},
    },
  ]);
  const [languages, setLanguages] = useState([
    {
      id: new Date().getMilliseconds(),
      values: {
        language_id: "",
        level: "",
      },
      touched: {},
      errors: {},
    },
  ]);
  const [experiences, setExperiences] = useState([
    {
      id: new Date().getMilliseconds(),
      values: {
        company_name: "",
        position: "",
        start_date: "",
        end_date: "",
        comment: "",
      },
      touched: {},
      errors: {},
    },
  ]);

  // console.log(moment(experiences[0].values.start_date, 'YYYY-MM-DD').format())

  useEffect(() => {
    https
      .get("/v1/languages")
      .then((data) => {
        setLangString(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addStudy = () => {
    setEducations([
      ...educations,
      {
        id: new Date().getMilliseconds(),
        values: {
          city: "",
          faculty: "",
          department: "",
          graduation_year: "",
        },
        touched: {},
        errors: {},
      },
    ]);
  };
  const addLang = () => {
    setLanguages([
      ...languages,
      {
        id: new Date().getMilliseconds(),
        values: {
          language_id: "",
          level: "",
        },
        touched: {},
        errors: {},
      },
    ]);
  };
  const addExp = () => {
    setExperiences([
      ...experiences,
      {
        id: new Date().getMilliseconds(),
        values: {
          company_name: "",
          position: "",
          start_date: "",
          end_date: "",
          comment: "",
        },
        touched: {},
        errors: {},
      },
    ]);
  };

  const removeStudy = (id) => {
    let filtered = educations.filter((edu) => edu.id !== id);
    setEducations(filtered);
  };
  const removeLang = (id) => {
    let filtered = languages.filter((lang) => lang.id !== id);
    setLanguages(filtered);
  };
  const removeExp = (id) => {
    let filtered = experiences.filter((exp) => exp.id !== id);
    setExperiences(filtered);
  };

  const changeStudyValue = (name, value, id) => {
    let currentChange = educations.map((edu) => {
      if (edu.id !== id) {
        return edu;
      }

      edu.values[name] = value;

      edu.errors = {};

      if (!edu.values.city) {
        edu.errors.city = "Required!";
      } else if (edu.values.city.length < 4) {
        edu.errors.city = "Invalid value!";
      }
      if (!edu.values.faculty) {
        edu.errors.faculty = "Required!";
      } else if (edu.values.faculty.length < 4) {
        edu.errors.faculty = "Invalid value!";
      }
      if (!edu.values.department) {
        edu.errors.department = "Required!";
      } else if (edu.values.department.length < 4) {
        edu.errors.department = "Invalid value!";
      }
      if (!edu.values.graduation_year) {
        edu.errors.graduation_year = "Required!";
      } else if (edu.values.graduation_year.length < 4) {
        edu.errors.graduation_year = "Invalid value!";
      }

      return edu;
    });

    let currentSelect = languages.map((lang) => {
      lang.errors = {};

      if (!lang.values.language_id) {
        lang.errors.language_id = "Required!";
      }
      if (!lang.values.level) {
        lang.errors.level = "Required!";
      }

      return lang;
    });

    setLanguages(currentSelect);
    setEducations(currentChange);
  };

  const changeLangValue = (name, value, id) => {
    let currentChange = languages.map((lang) => {
      if (lang.id !== id) {
        return lang;
      }

      lang.values[name] = value;

      lang.errors = {};

      if (!lang.values.language_id) {
        lang.errors.language_id = "Required!";
      }
      if (!lang.values.level) {
        lang.errors.level = "Required!";
      }

      return lang;
    });

    setLanguages(currentChange);
  };
  function changeExpValue(name, value, id) {
    let currentChange = experiences.map((exp) => {
      if (exp.id !== id) {
        return exp;
      }

      exp.values[name] = value;

      exp.errors = {};

      if (!exp.values.company_name) {
        exp.errors.company_name = "Required!";
      }
      if (!exp.values.position) {
        exp.errors.position = "Required!";
      }
      if (!exp.values.start_date) {
        exp.errors.start_date = "Required!";
      }
      if (!exp.values.end_date) {
        exp.errors.end_date = "Required!";
      }
      if (!exp.values.comment) {
        exp.errors.comment = "Required!";
      }

      return exp;
    });

    setExperiences(currentChange);
  }

  const changeStudyTouch = (name, id) => {
    let currentChange = educations.map((edu) => {
      if (edu.id !== id) {
        return edu;
      }
      edu.touched[name] = true;
      return edu;
    });
    setEducations(currentChange);
  };

  const changeLangTouch = (name, id) => {
    let currentChange = languages.map((lang) => {
      if (lang.id !== id) {
        return lang;
      }
      lang.touched[name] = true;
      return lang;
    });
    setLanguages(currentChange);
  };
  const changeExpTouch = (name, id) => {
    let currentChange = experiences.map((exp) => {
      if (exp.id !== id) {
        return exp;
      }
      exp.touched[name] = true;
      return exp;
    });
    setExperiences(currentChange);
  };

  const checkedValues = (e) => {
    e.preventDefault();

    let finderEdu = educations.filter(
      (edu) =>
        edu.errors.city ||
        edu.errors.department ||
        edu.errors.faculty ||
        edu.errors.graduation_year ||
        false
    );
    if (finderEdu.length > 0) {
      return;
    }

    let allTouched = languages.map((lang) => {
      lang.touched.language_id = true;
      lang.touched.level = true;
      return lang;
    });

    setLanguages(allTouched);

    let finderLang = languages.filter(
      (lang) => lang.errors.language_id || lang.errors.level || false
    );
    if (finderLang.length > 0) {
      return;
    }

    setIsNext(true);
    window.scrollTo(0, 0);
  };
  const checkedValues2 = (e) => {
    e.preventDefault();

    let allTouched = experiences.map((exp) => {
      exp.touched.start_date = true;
      exp.touched.end_date = true;
      return exp;
    });

    setExperiences(allTouched);

    let finderExp = experiences.filter(
      (exp) =>
        exp.errors.company_name ||
        exp.errors.position ||
        exp.errors.start_date ||
        exp.errors.end_date ||
        exp.errors.comment ||
        false
    );
    if (finderExp.length > 0) {
      return;
    }

    console.log(experiences);
    let eduFetch = educations.map((edu) => {
      console.log("edu", edu.id);
      https
        .post("/v1/educations", {
          city: edu.values.city,
          faculty: edu.values.faculty,
          department: edu.values.department,
          is_present_studying: true,
          graduation_year: edu.values.graduation_year / 1,
          applicant_id: params.userID / 1,
        })
        .then(() => {
          console.log("success");
        })
        .catch((e) => {
          console.log(e);
          // console.log("error");
        });
      return null;
    });
    let langFetch = languages.map((lang) => {
      console.log("lang", lang.id);
      https
        .post("/v1/language-skills", {
          language_id: lang.values.language_id,
          level: "beginner",
          applicant_id: params.userID / 1,
        })
        .then(() => {
          console.log("success");
        })
        .catch((e) => {
          console.log(e);
          // console.log("error");
        });
      return null;
    });
    let expFetch = experiences.map((exp) => {
      console.log("exp", exp.id);
      https
        .post("/v1/work-experiences", {
          company_name: exp.values.company_name,
          position: exp.values.position,
          applicant_id: params.userID / 1,
          start_date: moment(exp.values.start_date, 'YYYY-MM-DD').format(),
          end_date: moment(exp.values.end_date, 'YYYY-MM-DD').format(),
          is_present_working: false,
          comment: exp.values.comment,
        })
        .then(() => {
          console.log("success");
        })
        .catch((e) => {
          console.log(e);
          // console.log("error");
        });
      return null;
    });
    console.log(eduFetch, langFetch, expFetch);
  };

  return (
    <div className="bg-form-bg">
      <div className="max-w-[1160px] mx-auto min-h-[500px] pb-16">
        <div
          className={`flex relative mb-[70px] text-2xl font-semibold tracking-widest pt-14 pb-5 border-b-[4px] after:content-[""] after:block after:bg-border-active after:h-1 after:w-1/2 after:absolute after:-bottom-1 after:duration-500 ${
            isNext ? "after:left-1/2" : "after:left-0"
          } border-solid border-form-border`}
        >
          <span
            onClick={() => setIsNext(false)}
            className="w-1/2 text-main-text text-center"
          >
            Education
          </span>
          <span
            onClick={() => setIsNext(true)}
            className="w-1/2 text-main-text text-center"
          >
            Working experience
          </span>
        </div>
        <div className="max-w-[1000px] mx-auto px-3">
          <div className={`${isNext ? "hidden" : "block"}`}>
            <form onSubmit={checkedValues}>
              <div>
                <div className="text-2xl text-main-text tracking-wider font-semibold">
                  Education process
                </div>
                {educations.map((edu) => {
                  return (
                    <div key={edu.id}>
                      <div className="flex pt-5 justify-between flex-wrap">
                        <div className={`relative w-5/12 mb-7`}>
                          <input
                            type="text"
                            name="city"
                            onChange={(e) =>
                              changeStudyValue(
                                e.target.name,
                                e.target.value,
                                edu.id
                              )
                            }
                            onFocus={(e) =>
                              changeStudyValue(
                                e.target.name,
                                e.target.value,
                                edu.id
                              )
                            }
                            onBlur={(e) =>
                              changeStudyTouch(e.target.name, edu.id)
                            }
                            value={edu.values.city}
                            autoComplete="off"
                            maxLength={30}
                            required
                            className={`peer border-[1px] rounded-[20px] border-solid h-11 w-full outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${
                              edu.values.city && !edu.errors.city
                                ? "border-input-succes"
                                : edu.errors.city && edu.touched.city
                                ? "border-input-error"
                                : "border-input-border"
                            }`}
                          />
                          <span
                            className={`absolute top-3 left-4 peer-focus:-top-2 ${
                              edu.values.city ? "-top-2" : ""
                            } bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none`}
                          >
                            City of study*
                          </span>
                          <span
                            className={`absolute peer-focus:opacity-0 top-2.5 duration-200 right-3 ${
                              edu.values.city && !edu.errors.city
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {true_input}
                          </span>
                          {edu.errors.city && edu.touched.city ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {edu.errors.city}
                            </span>
                          ) : null}
                        </div>
                        <div className={`relative w-5/12 mb-7`}>
                          <input
                            type="text"
                            name="faculty"
                            onChange={(e) =>
                              changeStudyValue(
                                e.target.name,
                                e.target.value,
                                edu.id
                              )
                            }
                            onFocus={(e) =>
                              changeStudyValue(
                                e.target.name,
                                e.target.value,
                                edu.id
                              )
                            }
                            onBlur={(e) =>
                              changeStudyTouch(e.target.name, edu.id)
                            }
                            value={edu.values.faculty}
                            autoComplete="off"
                            maxLength={30}
                            required
                            className={`peer border-[1px] rounded-[20px] border-solid h-11 w-full outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${
                              edu.values.faculty && !edu.errors.faculty
                                ? "border-input-succes"
                                : edu.errors.faculty && edu.touched.faculty
                                ? "border-input-error"
                                : "border-input-border"
                            }`}
                          />
                          <span
                            className={`absolute top-3 left-4 peer-focus:-top-2 ${
                              edu.values.faculty ? "-top-2" : ""
                            } bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none`}
                          >
                            Faculty*
                          </span>
                          <span
                            className={`absolute peer-focus:opacity-0 top-2.5 duration-200 right-3 ${
                              edu.values.faculty && !edu.errors.faculty
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {true_input}
                          </span>
                          {edu.errors.faculty && edu.touched.faculty ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {edu.errors.faculty}
                            </span>
                          ) : null}
                        </div>
                        <div className={`relative w-5/12 mb-7`}>
                          <input
                            type="text"
                            name="department"
                            onChange={(e) =>
                              changeStudyValue(
                                e.target.name,
                                e.target.value,
                                edu.id
                              )
                            }
                            onFocus={(e) =>
                              changeStudyValue(
                                e.target.name,
                                e.target.value,
                                edu.id
                              )
                            }
                            onBlur={(e) =>
                              changeStudyTouch(e.target.name, edu.id)
                            }
                            value={edu.values.department}
                            autoComplete="off"
                            maxLength={30}
                            required
                            className={`peer border-[1px] rounded-[20px] border-solid h-11 w-full outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${
                              edu.values.department && !edu.errors.department
                                ? "border-input-succes"
                                : edu.errors.department &&
                                  edu.touched.department
                                ? "border-input-error"
                                : "border-input-border"
                            }`}
                          />
                          <span
                            className={`absolute top-3 left-4 peer-focus:-top-2 ${
                              edu.values.department ? "-top-2" : ""
                            } bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none`}
                          >
                            Department*
                          </span>
                          <span
                            className={`absolute peer-focus:opacity-0 top-2.5 duration-200 right-3 ${
                              edu.values.department && !edu.errors.department
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {true_input}
                          </span>
                          {edu.errors.department && edu.touched.department ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {edu.errors.department}
                            </span>
                          ) : null}
                        </div>
                        <div className={`relative w-5/12 mb-7`}>
                          <DatePicker
                            picker="year"
                            onChange={(date, string) =>{
                              changeStudyValue("graduation_year", string, edu.id)
                            }}
                            onFocus={() =>
                              changeStudyValue(
                                "graduation_year",
                                edu.values.graduation_year,
                                edu.id
                              )
                            }
                            onBlur={() =>
                              changeStudyTouch("graduation_year", edu.id)
                            }
                            placeholder="Graduation year*"
                            className={`border-[1px] text-placeholder appearance-none placeholder:text-yellow-900 rounded-[20px] border-solid h-11 w-full px-4 shadow-none duration-150 ${
                              edu.values.graduation_year &&
                              !edu.errors.graduation_year
                                ? "border-input-succes"
                                : edu.errors.graduation_year &&
                                  edu.touched.graduation_year
                                ? "border-input-error"
                                : "border-input-border focus:border-input-focus"
                            }`}
                          />
                          {edu.errors.graduation_year &&
                          edu.touched.graduation_year ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {edu.errors.graduation_year}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      {educations.length > 1 ? (
                        <div className="max-w-[1000px] mx-auto px-3 relative -top-5 text-base text-input-error tracking-wider flex items-center">
                          <span
                            className="cursor-pointer"
                            onClick={() => removeStudy(edu.id)}
                          >
                            Remove education
                          </span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              {educations.length < 11 ? (
                <div className="max-w-[1000px] mx-auto px-3 text-base text-main-text tracking-wider">
                  <span
                    onClick={() => addStudy()}
                    className="cursor-pointer flex items-center max-w-max"
                  >
                    {plus_icon}&nbsp;Add education
                  </span>
                </div>
              ) : null}

              <div className="max-w-[1000px] px-3 mt-16 mx-auto">
                <div className="text-2xl tracking-wider text-main-text font-semibold">
                  Language skills
                </div>
                {languages.map((lang) => {
                  return (
                    <div key={lang.id}>
                      <div className="flex pt-5 justify-between flex-wrap">
                        <div
                          className={`relative w-5/12 mb-5 ${
                            lang.errors.language_id ? "mb-3" : ""
                          }`}
                        >
                          <Select
                            onChange={(value) => {
                              changeLangValue("language_id", value, lang.id);
                            }}
                            onBlur={() => {
                              changeLangTouch("language_id", lang.id);
                              changeLangValue(
                                "language_id",
                                lang.values.language_id,
                                lang.id
                              );
                            }}
                            value={lang.values.language_id}
                            className={`peer border-[1px] text-placeholder appearance-none rounded-[20px] border-solid h-11 w-full duration-150 ${
                              lang.values.language_id &&
                              !lang.errors.language_id
                                ? "border-input-succes"
                                : lang.errors.language_id &&
                                  lang.touched.language_id
                                ? "border-input-error"
                                : "border-input-border focus:border-input-focus"
                            }`}
                          >
                            <Option
                              className="text-placeholder"
                              hidden
                              value=""
                            >
                              Language*
                            </Option>
                            {langString.map((langu) => {
                              return (
                                <Option
                                  key={langu.id}
                                  className="text-placeholder"
                                  hidden={
                                    languages.filter(
                                      (l) => l.values.language_id === langu.id
                                    ).length > 0
                                      ? true
                                      : false
                                  }
                                  value={langu.id}
                                >
                                  {langu.name}
                                </Option>
                              );
                              // }
                            })}
                          </Select>
                          {lang.errors.language_id &&
                          lang.touched.language_id ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {lang.errors.language_id}
                            </span>
                          ) : null}
                        </div>
                        <div
                          className={`relative w-5/12 mb-5 ${
                            lang.errors.level ? "mb-3" : ""
                          }`}
                        >
                          <Select
                            disabled={!lang.values.language_id ? true : false}
                            onChange={(value) => {
                              changeLangValue("level", value, lang.id);
                            }}
                            onBlur={() => changeLangTouch("level", lang.id)}
                            value={lang.values.level}
                            className={`peer border-[1px] text-placeholder appearance-none rounded-[20px] border-solid h-11 w-full  duration-150 ${
                              lang.values.level && !lang.errors.level
                                ? "border-input-succes"
                                : lang.errors.level && lang.touched.level
                                ? "border-input-error"
                                : "border-input-border focus:border-input-focus"
                            }`}
                          >
                            <Option
                              className="text-placeholder"
                              hidden
                              value=""
                            >
                              Level*
                            </Option>
                            {langLevel.map((lang) => {
                              return (
                                <Option
                                  key={lang.id}
                                  className="text-placeholder"
                                  value={lang.level}
                                >
                                  {lang.level}
                                </Option>
                              );
                            })}
                          </Select>
                          {lang.errors.level && lang.touched.level ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {lang.errors.level}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      {languages.length > 1 ? (
                        <div className="max-w-[1000px] mx-auto px-3 relative -top-5 text-base text-input-error tracking-wider flex items-center">
                          <span
                            onClick={() => removeLang(lang.id)}
                            className="cursor-pointer"
                          >
                            &nbsp;Remove language
                          </span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              {languages.length < langString.length ? (
                <div className="max-w-[1000px] mx-auto px-3 text-base text-main-text tracking-wider ">
                  <span
                    className="flex max-w-max items-center cursor-pointer"
                    onClick={() => addLang()}
                  >
                    {plus_icon}&nbsp;Add language
                  </span>
                </div>
              ) : null}
              <button
                type="submit"
                className="text-white font-semibold block text-lg mt-16 mx-auto max-w-min leading-7 py-2 bg-gradient-to-l from-gradient-color-1 to-gradient-color-2 rounded-full px-24 mb-7 cursor-pointer hover:bg-gradient-to-r"
              >
                Next
              </button>
            </form>
          </div>
          <div className={`${isNext ? "block" : "hidden"}`}>
            <form onSubmit={checkedValues2}>
              <div>
                <div className="text-2xl text-main-text tracking-wider font-semibold">
                  Work at place{" "}
                </div>
                {experiences.map((exp) => {
                  return (
                    <div key={exp.id}>
                      <div className="flex pt-5 justify-between flex-wrap">
                        <div className={`relative w-5/12 mb-7`}>
                          <input
                            type="text"
                            name="company_name"
                            onChange={(e) =>
                              changeExpValue(
                                e.target.name,
                                e.target.value,
                                exp.id
                              )
                            }
                            onFocus={(e) =>
                              changeExpValue(
                                e.target.name,
                                e.target.value,
                                exp.id
                              )
                            }
                            onBlur={(e) =>
                              changeExpTouch(e.target.name, exp.id)
                            }
                            value={exp.values.company_name}
                            autoComplete="off"
                            maxLength={30}
                            required
                            className={`peer border-[1px] rounded-[20px] border-solid h-11 w-full outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${
                              exp.values.company_name &&
                              !exp.errors.company_name
                                ? "border-input-succes"
                                : exp.errors.company_name &&
                                  exp.touched.company_name
                                ? "border-input-error"
                                : "border-input-border"
                            }`}
                          />
                          <span
                            className={`absolute top-3 left-4 peer-focus:-top-2 ${
                              exp.values.company_name ? "-top-2" : ""
                            } bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none`}
                          >
                            Company name*{" "}
                          </span>
                          <span
                            className={`absolute peer-focus:opacity-0 top-2.5 duration-200 right-3 ${
                              exp.values.company_name &&
                              !exp.errors.company_name
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {true_input}
                          </span>
                          {exp.errors.company_name &&
                          exp.touched.company_name ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {exp.errors.company_name}
                            </span>
                          ) : null}
                        </div>
                        <div className={`relative w-5/12 mb-7`}>
                          <input
                            type="text"
                            name="position"
                            onChange={(e) =>
                              changeExpValue(
                                e.target.name,
                                e.target.value,
                                exp.id
                              )
                            }
                            onFocus={(e) =>
                              changeExpValue(
                                e.target.name,
                                e.target.value,
                                exp.id
                              )
                            }
                            onBlur={(e) =>
                              changeExpTouch(e.target.name, exp.id)
                            }
                            value={exp.values.position}
                            autoComplete="off"
                            maxLength={30}
                            required
                            className={`peer border-[1px] rounded-[20px] border-solid h-11 w-full outline-none focus:border-input-focus duration-150 pl-4 pr-10 ${
                              exp.values.position && !exp.errors.position
                                ? "border-input-succes"
                                : exp.errors.position && exp.touched.position
                                ? "border-input-error"
                                : "border-input-border"
                            }`}
                          />
                          <span
                            className={`absolute top-3 left-4 peer-focus:-top-2 ${
                              exp.values.position ? "-top-2" : ""
                            } bg-white px-0.5 text-sm text-placeholder duration-200 pointer-events-none`}
                          >
                            Position*{" "}
                          </span>
                          <span
                            className={`absolute peer-focus:opacity-0 top-2.5 duration-200 right-3 ${
                              exp.values.position && !exp.errors.position
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          >
                            {true_input}
                          </span>
                          {exp.errors.position && exp.touched.position ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {exp.errors.position}
                            </span>
                          ) : null}
                        </div>
                        <div className={`relative w-5/12 mb-7`}>
                          <DatePicker
                            onChange={(date, string) => {
                              changeExpValue("start_date", string, exp.id);
                            }}
                            onFocus={() => {
                              changeExpValue(
                                "start_date",
                                exp.values.start_date,
                                exp.id
                              );
                            }}
                            onBlur={() => changeExpTouch("start_date", exp.id)}
                            placeholder="Start date*"
                            className={`border-[1px] text-placeholder appearance-none placeholder:text-yellow-900 rounded-[20px] border-solid h-11 w-full px-4 shadow-none duration-150 ${
                              exp.values.start_date && !exp.errors.start_date
                                ? "border-input-succes"
                                : exp.errors.start_date &&
                                  exp.touched.start_date
                                ? "border-input-error"
                                : "border-input-border focus:border-input-focus"
                            }`}
                          />
                          {exp.errors.start_date && exp.touched.start_date ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {exp.errors.start_date}
                            </span>
                          ) : null}
                        </div>
                        <div className={`relative w-5/12 mb-7`}>
                          <DatePicker
                            onChange={(date, string) => {
                              changeExpValue("end_date", string, exp.id);
                            }}
                            onFocus={() => {
                              changeExpValue(
                                "end_date",
                                exp.values.end_date,
                                exp.id
                              );
                            }}
                            onBlur={() => changeExpTouch("end_date", exp.id)}
                            placeholder="End date*"
                            className={`border-[1px] text-placeholder appearance-none placeholder:text-yellow-900 rounded-[20px] border-solid h-11 w-full px-4 shadow-none duration-150 ${
                              exp.values.end_date && !exp.errors.end_date
                                ? "border-input-succes"
                                : exp.errors.end_date && exp.touched.end_date
                                ? "border-input-error"
                                : "border-input-border focus:border-input-focus"
                            }`}
                          />
                          {exp.errors.end_date && exp.touched.end_date ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {exp.errors.end_date}
                            </span>
                          ) : null}
                        </div>
                        <div className={`relative w-5/12 mb-7`}>
                          <TextArea
                            required
                            rows={5}
                            name="comment"
                            onChange={(e) => {
                              changeExpValue(
                                e.target.name,
                                e.target.value,
                                exp.id
                              );
                            }}
                            onFocus={() => {
                              changeExpValue(
                                "comment",
                                exp.values.comment,
                                exp.id
                              );
                            }}
                            onBlur={() => changeExpTouch("comment", exp.id)}
                            placeholder="Comment*"
                            className={`border-[1px] text-placeholder appearance-none pl-4 placeholder:text-placeholder shadow-none rounded-[20px] border-solid w-full duration-150 ${
                              exp.values.comment && !exp.errors.comment
                                ? "border-input-succes"
                                : exp.errors.comment && exp.touched.comment
                                ? "border-input-error"
                                : "border-input-border focus:border-input-focus"
                            }`}
                          />
                          {exp.errors.comment && exp.touched.comment ? (
                            <span className="text-input-error flex items-center">
                              {error_input}
                              {exp.errors.comment}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      {experiences.length > 1 ? (
                        <div className="max-w-[1000px] mx-auto px-3 relative -top-5 text-base text-input-error tracking-wider flex items-center">
                          <span
                            className="cursor-pointer"
                            onClick={() => removeExp(exp.id)}
                          >
                            Remove workplace
                          </span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              {experiences.length < 11 ? (
                <div className="max-w-[1000px] mx-auto px-3 text-base text-main-text tracking-wider">
                  <span
                    onClick={() => addExp()}
                    className="cursor-pointer flex items-center max-w-max"
                  >
                    {plus_icon}&nbsp;Add workplace
                  </span>
                </div>
              ) : null}
              <button
                type="submit"
                className="text-white font-semibold block text-lg mt-16 mx-auto max-w-min leading-7 py-2 bg-gradient-to-l from-gradient-color-1 to-gradient-color-2 rounded-full px-24 mb-7 cursor-pointer hover:bg-gradient-to-r"
              >
                Finish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
