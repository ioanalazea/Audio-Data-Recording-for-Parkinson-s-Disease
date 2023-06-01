import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Background from "../utils/blob-scene-haikei.svg";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config.js";
import { database } from "../firebase/config.js";
import { ref, get, update } from "firebase/database";
import Swal from "sweetalert2";
import axios from "axios";
import ReactLoading from "react-loading";
import { counties } from "../utils/counties";
import { medicalSpecialties } from "../utils/medicalSpecialties";
import { countries } from "../utils/countries";
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
    country: "",
    specialization: "",
    county: "",
    token: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
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

    if (user.country === "RO") {
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
    //Token can't be empty
    else if (user.token === "") {
      ok = 0;
      errorMessage = "Please enter token!";
      countEmptyFields = countEmptyFields + 1;
    }
    //Password and confirm password do not match
    else if (user.password !== user.confirmPassword) {
      ok = 0;
      errorMessage = "Password and confirm password do not match!";
    }

    //Phone number is not valid
    if (
      !user.phoneNumber.match(
        "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
      )
    ) {
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

  const verifyToken = (token) => {
    var errorMessage = "";
    var tokenUid = "";

    //verifying and finding the token
    for (const key in tokens) {
      if (tokens.hasOwnProperty(key)) {
        const value = tokens[key];
        if (token !== value.token) {
          errorMessage = "Wrong token!";
        } else {
          if (value.used === 1) errorMessage = "Token used already!";
          else {
            tokenUid = key;
            errorMessage = "";
          }
          break;
        }
      }
    }

    if (tokenUid != "") {
      update(ref(database, "tokens/" + tokenUid), {
        used: 1,
      }).catch((error) => {
        console.log(error);
      });
    }

    return errorMessage;
  };

  const verifyRegMedAndToken = (results, token) => {
    var errorMessage = "";

    //verifying the medic if it is from romania
    if (user.country === "RO") {
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
      if (errorMessage === "")
        errorMessage = "Wrong county, specialization or name is incomplete.";
      if (errorMessage === "Found.") {
        const errToken = verifyToken(token);
        if (errToken === "") errorMessage = "";
        else errorMessage = errToken;
      }
    } else errorMessage = verifyToken(token);

    setError(errorMessage);
    if (errorMessage !== "") return 0;
    else return 1;
  };

  //Get the tokens
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    // Retrieve the token data from Firebase
    const fetchData = async () => {
      const dbRef = ref(database, "tokens/");
      const snapshot = await get(dbRef);
      setTokens(snapshot.val());
    };

    fetchData();
  }, []);

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
          const regMed = verifyRegMedAndToken(results, user.token);
          if (regMed === 1) {
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
                  token: "",
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
              onChange={(e) =>
                setUser({ ...user, firstName: e.target.value.trim() })
              }
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Last name:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) =>
                setUser({ ...user, lastName: e.target.value.trim() })
              }
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Email Address:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value.trim() })
              }
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
            <label>Country:</label>
            <Select
              styles={styleSelect}
              classNamePrefix="select"
              isSearchable={true}
              options={countries}
              onChange={(e) => setUser({ ...user, country: e.value })}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Specialization:</label>
            <Select
              isDisabled={user.country !== "RO"}
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
              isDisabled={user.country !== "RO"}
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
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              style={styleTextField}
              InputProps={{
                ...styleInputProps,
                ...{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              onChange={(e) =>
                setUser({ ...user, token: e.target.value.trim() })
              }
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
