import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Register() {
  const registerBackground = {
    backgroundImage: "url(" + Background + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };
  const title = {
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "800",
    fontSize: "38px",
    lineHeight: "40px",
    color: "#323031",
  }
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

  const navigate = useNavigate();
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const verifyingInputs = () => {
    let ok = 1;
    let errorMessage = "";

    //Full name can't be empty
    if (user.displayName === "") {
      ok = 0;
      errorMessage = "Please enter your name!";
    }

    //Phone number can't be empty
    if (user.phoneNumber === "") {
      ok = 0;
      errorMessage = "Please enter your phone number!";
    }

    //Confirm password can't be empty
    if (user.confirmPassword === "") {
      ok = 0;
      errorMessage = "Please enter confirm password!";
    }

    //Password and confirm password do not match
    if (user.password !== user.confirmPassword) {
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

    //User did not enter email and password
    if (user.email === "" || user.password === "") {
      ok = 0;
      errorMessage = "Enter details to register!";
    }

    if (ok === 0) {
      setError(errorMessage);
    }

    return ok;
  };

  const registerUser = () => {
    //verifying inputs
    if (verifyingInputs() === 1) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          Swal.fire({
            icon: "success",
            title: "Account created successfully!",
            showConfirmButton: false,
            timer: 2500,
          });
          navigate(-1);
          updateProfile(auth.currentUser, {
            displayName: user.displayName,
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
            displayName: "",
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
          if (err.message === "Firebase: Error (auth/email-already-in-use).")
            setError("E-mail already in use!");
          else if (err.message.includes("auth/weak-password"))
            setError("Password should be at least 6 characters!");
          else setError(err.message);
        });
      console.log(error);
    }
  };

  return (
    <div style={registerBackground}>
      <div
        style={{
          align: "center",
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
          paddingBottom: "10px",
        }}
      >
        <div>
        <div style={title}> Parkinson's </div>
          <div style={title}> Recording App </div>
          <div style={registerHeader}> Register </div>

          <div style={{ marginTop: "20px" }}>
            <label>Full name:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) =>
                setUser({ ...user, displayName: e.target.value })
              }
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Email Address:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Phone number:</label>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
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
          <div style={{ marginTop: "40px" }}>
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
      {error !== "" ? (
        <div style={{ marginTop: "15px", marginLeft: "15px" }}>
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
    </div>
  );
}
