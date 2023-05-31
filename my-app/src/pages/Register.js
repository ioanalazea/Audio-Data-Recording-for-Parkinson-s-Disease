import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Background from "../utils/blob-scene-haikei.svg";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config.js";
import Swal from "sweetalert2";
import axios from "axios";
import ReactLoading from "react-loading";



export default function Register() {
  const registerBackground = {
    backgroundImage: "url(" + Background + ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    overflow: "auto",
  };
  const title = {
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "800",
    fontSize: "38px",
    lineHeight: "40px",
    color: "#323031",
  };
  const registerHeader = {
    paddingLeft: "120px",
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "500",
    fontSize: "38px",
    lineHeight: "40px",
    color: "#323031",
  };

  const styleTextField = {
    backgroundColor: "#F6F6F6",
    border: "1px solid #323031",
    borderRadius: "30px",
    paddingRight: "10px",
    paddingLeft: "10px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    display: "block",
    width: "250px",
    align: "center",
  };
  const styleInputProps = {
    disableUnderline: true,
    style: {
      color: "#323031",
      fontFamily: "Metropolis",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "18px",
    },
  };
  const styleSelect = {
    control: (base) => ({
      ...base,
      width: "271px",
      marginTop: "5px",
      boxShadow: "none",
      border: "1px solid #323031",
      borderRadius: "30px",
      paddingRight: "10px",
      paddingLeft: "10px",
      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      align: "center",
    }),
  };

  const counties = [
    { value: "Alba", label: "Alba" },
    { value: "Arad", label: "Arad" },
    { value: "Argeș", label: "Argeș" },
    { value: "Bacău", label: "Bacău" },
    { value: "Bihor", label: "Bihor" },
    { value: "Bistrița-Năsăud", label: "Bistrița-Năsăud" },
    { value: "Botoșani", label: "Botoșani" },
    { value: "Brașov", label: "Brașov" },
    { value: "Brăila", label: "Brăila" },
    { value: "Buzău", label: "Buzău" },
    { value: "București", label: "București" },
    { value: "Caraș-Severin", label: "Caraș-Severin" },
    { value: "Călărași", label: "Călărași" },
    { value: "Cluj", label: "Cluj" },
    { value: "Constanța", label: "Constanța" },
    { value: "Covasna", label: "Covasna" },
    { value: "Dâmbovița", label: "Dâmbovița" },
    { value: "Dolj", label: "Dolj" },
    { value: "Galați", label: "Galați" },
    { value: "Giurgiu", label: "Giurgiu" },
    { value: "Gorj", label: "Gorj" },
    { value: "Harghita", label: "Harghita" },
    { value: "Hunedoara", label: "Hunedoara" },
    { value: "Ialomița", label: "Ialomița" },
    { value: "Iași", label: "Iași" },
    { value: "Ilfov", label: "Ilfov" },
    { value: "Maramureș", label: "Maramureș" },
    { value: "Mehedinți", label: "Mehedinți" },
    { value: "Mureș", label: "Mureș" },
    { value: "Neamț", label: "Neamț" },
    { value: "Olt", label: "Olt" },
    { value: "Prahova", label: "Prahova" },
    { value: "Sate Mare", label: "Satu Mare" },
    { value: "Sălaj", label: "Sălaj" },
    { value: "Sibiu", label: "Sibiu" },
    { value: "Suceava", label: "Suceava" },
    { value: "Teleorman", label: "Teleorman" },
    { value: "Timiș", label: "Timiș" },
    { value: "Tulcea", label: "Tulcea" },
    { value: "Vaslui", label: "Vaslui" },
    { value: "Vâlcea", label: "Vâlcea" },
    { value: "Vrancea", label: "Vrancea" },
  ];

  const medicalSpecialties = [
    {
      value: "Alergologie și imunologie clinică",
      label: "Allergology and Clinical Immunology",
    },
    { value: "Anatomie patologică", label: "Pathological Anatomy" },
    {
      value: "Anestezie și terapie intensivă",
      label: "Anesthesia and Intensive Care",
    },
    { value: "Boli infecțioase", label: "Infectious Diseases" },
    { value: "Cardiologie", label: "Cardiology" },
    { value: "Chirurgie cardiovasculară", label: "Cardiovascular Surgery" },
    { value: "Chirurgie generală", label: "General Surgery" },
    { value: "Chirurgie maxilo-facială", label: "Maxillofacial Surgery" },
    { value: "Chirurgie pediatrică", label: "Pediatric Surgery" },
    {
      value: "Chirurgie plastică, estetică și reconstructivă",
      label: "Plastic, Aesthetic and Reconstructive Surgery",
    },
    { value: "Chirurgie toracică", label: "Thoracic Surgery" },
    { value: "Chirurgie vasculară", label: "Vascular Surgery" },
    {
      value: "Dermatovenerologie",
      label: "Dermatology and Venereology",
    },
    {
      value: "Diabet, nutriție și boli metabolice",
      label: "Diabetes, Nutrition and Metabolic Diseases",
    },
    { value: "Endocrinologie", label: "Endocrinology" },
    { value: "Epidemiologie", label: "Epidemiology" },
    { value: "Farmacologie clinică", label: "Clinical Pharmacology" },
    {
      value: "Gastroenterologie",
      label: "Gastroenterology",
    },
    {
      value: "Gastroenterologie și hepatologie",
      label: "Gastroenterology and Hepatology",
    },
    { value: "Genetică medicală", label: "Medical Genetics" },
    { value: "Geriatrie și gerontologie", label: "Geriatrics and Gerontology" },
    { value: "Hematologie", label: "Hematology" },
    { value: "Igienă", label: "Hygiene" },
    {
      value: "Infecțioase și medicină tropicală",
      label: "Infectious and Tropical Medicine",
    },
    { value: "Medicină de familie", label: "Family Medicine" },
    { value: "Medicină de laborator", label: "Laboratory Medicine" },
    { value: "Medicină de urgență", label: "Emergency Medicine" },
    {
      value: "Medicină fizică și de reabilitare",
      label: "Physical Medicine and Rehabilitation",
    },
    { value: "Medicină generală", label: "General Medicine" },
    { value: "Medicină internă", label: "Internal Medicine" },
    { value: "Medicină legală", label: "Forensic Medicine" },
    { value: "Medicină nucleară", label: "Nuclear Medicine" },
    { value: "Medicină ocupatională", label: "Occupational Medicine" },
    { value: "Medicină sportivă", label: "Sports Medicine" },
    { value: "Neonatologie", label: "Neonatology" },
    { value: "Nefrologie", label: "Nefrology" },
    { value: "Neurochirurgie", label: "Neurosurgery" },
    { value: "Neurologie", label: "Neurology" },
    { value: "Obstetrică-ginecologie", label: "Obstetrics and Gynecology" },
    { value: "Oftalmologie", label: "Ophthalmology" },
    { value: "Oncologie medicală", label: "Medical Oncology" },
    {
      value: "Oncologie și hematologie pediatrică",
      label: "Oncology and Pediatric Hematology",
    },

    {
      value: "Ortopedie și traumatologie",
      label: "Orthopedics and Traumatology",
    },
    { value: "Otorinolaringologie", label: "Otorhinolaryngology" },
    { value: "Pediatrie", label: "Pediatrics" },
    { value: "Pneumologie", label: "Pulmonology" },
    { value: "Psihiatrie", label: "Psychiatry" },
    { value: "Psihiatrie pediatrică", label: "Child Psychiatry" },
    {
      value: "Radiologie - imagistică medicală",
      label: "Radiology and Medical Imaging",
    },
    { value: "Recuperare medicală", label: "Medical Recovery" },
    { value: "Reumatologie", label: "Rheumatology" },
    { value: "Sănătate publică", label: "Public Health" },
    { value: "Transfuzii sanguine", label: "Blood Transfusions" },
    { value: "Urolog", label: "Urology" },
  ];

  const navigate = useNavigate();
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
    specialization: "",
    county: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verifyInputs = (user) => {
    var ok = 1;
    var countEmptyFields = 0;
    let errorMessage = "";

    //Full name can't be empty
    if (user.firstName === "") {
      ok = 0;
      errorMessage = "Please enter first name!";
      countEmptyFields = countEmptyFields + 1;
    }

    //Full name can't be empty
    if (user.lastName === "") {
      ok = 0;
      errorMessage = "Please enter last name!";
      countEmptyFields = countEmptyFields + 1;
    }

    //Email can't be empty
    if (user.email === "") {
      ok = 0;
      errorMessage = "Please enter your email!";
      countEmptyFields = countEmptyFields + 1;
    }

    //Phone number can't be empty
    if (user.phoneNumber === "") {
      ok = 0;
      errorMessage = "Please enter your phone number!";
      countEmptyFields = countEmptyFields + 1;
    }

    //Spec can't be empty
    if (user.specialization === "") {
      ok = 0;
      errorMessage = "Please enter specialization!";
      countEmptyFields = countEmptyFields + 1;
    }

    //County can't be empty
    if (user.county === "") {
      ok = 0;
      errorMessage = "Please enter county!";
      countEmptyFields = countEmptyFields + 1;
    }

    //Password can't be empty
    if (user.password === "") {
      ok = 0;
      errorMessage = "Please enter password!";
      countEmptyFields = countEmptyFields + 1;
    }
    //Confirm password can't be empty
    else if (user.confirmPassword === "") {
      ok = 0;
      errorMessage = "Please enter confirm password!";
      countEmptyFields = countEmptyFields + 1;
    }
    //Password and confirm password do not match
    else if (user.password !== user.confirmPassword) {
      ok = 0;
      errorMessage = "Password and confirm password do not match!";
    }

    //Phone number is not valid
    if (!user.phoneNumber.match("[0-9]{10}")) {
      ok = 0;
      errorMessage = "Please provide a valid phone number!";
    }

    //Email is not valid
    if (!isEmail(user.email)) {
      ok = 0;
      errorMessage = "Please provide a valid email!";
    }

    if (countEmptyFields > 1) {
      ok = 0;
      errorMessage = "Multiple empty fields!";
    }

    if (ok === 0) {
      setError(errorMessage);
    }

    return ok;
  };

  const verifyRegMed = (results) => {
    var errorMessage = "";

    if (results.length === 0) errorMessage = "Doctor does not exist.";
    else {
      for (var i = 0; i < results.length; i++) {
        if (user.county === results[i].judet) {
          var ok = 0;
          const specialitati = results[i].specialitati;

          for (var j = 0; j < specialitati.length; j++) {
            if (
              user.specialization.toLowerCase() ===
              specialitati[j].nume.toLowerCase()
            )
              ok = 1;
          }
          if (ok === 1) errorMessage = "Found.";
          else if (ok === 0) errorMessage = "Wrong specialization.";
        }
        if (errorMessage === "Found.") break;
      }
    }
    if (errorMessage === "") errorMessage = "Wrong county/specialization.";
    if (errorMessage === "Found.") errorMessage = "";

    setError(errorMessage);
    if (errorMessage !== "") return 0;
    else return 1;
  };



  const registerUser = () => {
    if (verifyInputs(user))
      axios
        .get(
          "https://regmed.cmr.ro/api/v2/public/medic/cautare/" +
            user.firstName +
            user.lastName
        )
        .then((response) => {
          const results = response.data.data.results;
          //verifying inputs
          if (verifyRegMed(results) === 1) {
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, user.email, user.password)
              .then((userCredential) => {
                Swal.fire({
                  icon: "success",
                  title: "Account created successfully!",
                  showConfirmButton: false,
                  timer: 2500,
                });
                setTimeout(() => {
                  navigate(-1);
                }, 2500);
                updateProfile(auth.currentUser, {
                  displayName: user.firstName + " " + user.lastName,
                  phoneNumber: user.phoneNumber,
                })
                  .then(() => {
                    console.log("Profile updated successfully!");
                  })
                  .catch((error) => {
                    console.log(error);
                    setError("Error updating profile!");
                  });

                setUser({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  phoneNumber: "",
                  confirmPassword: "",
                });
                setError("");
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                  })
                  .catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
              })
              .catch((err) => {
                if (
                  err.message === "Firebase: Error (auth/email-already-in-use)."
                )
                  setError("E-mail already in use!");
                else if (err.message.includes("auth/weak-password"))
                  setError("Password should be at least 6 characters!");
                else setError(err.message);
              });
            console.log(error);
          }
        })
        .catch((err) => console.log(err));
  };


  return (
    <div style={registerBackground}>
      <div
        style={{
          align: "center",
          display: "flex",
          justifyContent: "center",
          paddingTop: "15px",
          paddingBottom: "10px",
        }}
      >
        <div>
          <div style={title}> Parkinson's </div>
          <div style={title}> Recording App </div>
          <div style={registerHeader}> Register </div>
          {error !== "" ? (
            <div style={{ marginTop: "5px" }}>
              <div
                className="error"
                style={{ fontFamily: "Metropolis", fontWeight: "700" }}
              >
                {error}
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div style={{ marginTop: "20px" }}>
            <label>First name:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) => setUser({ ...user, firstName: e.target.value.trim() })}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Last name:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) => setUser({ ...user, lastName: e.target.value.trim() })}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Email Address:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) => setUser({ ...user, email: e.target.value.trim() })}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Phone number:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value.trim() })
              }
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Specialization:</label>
            <Select
              styles={styleSelect}
              classNamePrefix="select"
              isSearchable={true}
              options={medicalSpecialties}
              onChange={(e) => setUser({ ...user, specialization: e.value })}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>County:</label>
            <Select
              styles={styleSelect}
              classNamePrefix="select"
              isSearchable={true}
              options={counties}
              onChange={(e) => setUser({ ...user, county: e.value })}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Password:</label>
            <TextField
              type="password"
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Confirm password:</label>
            <TextField
              type="password"
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Token:</label>
            <TextField
              type="password"
              style={styleTextField}
              InputProps={styleInputProps}
              //onChange={(e) =>
               // setUser({ ...user, confirmPassword: e.target.value })
             // }
            />
          </div>
          {isLoading ? (
            <div style={{ paddingLeft: "80px" }}>
              <ReactLoading
                type="bubbles"
                color="#219EBC"
                height={70}
                width={100}
              />{" "}
            </div>
          ) : (
            <></>
          )}
          <div style={{ marginTop: "30px" }}>
            <button className="button-style-blk" onClick={() => registerUser()}>
              <div className="button-text-style1">Create account</div>
            </button>
          </div>
          <div style={{ marginTop: "15px", marginLeft: "20px" }}>
            <Link style={{ color: "#323931" }} to="/">
              Already have an account? <b>Sign in.</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
