import React, { useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import Link from "@mui/material/Link";
import Background from "../utils/stacked-waves.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function SignIn() {
  const signInBackground = {
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

  const signInHeader = {
    paddingLeft: "70px",
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

  const navigate = useNavigate();

  const adminUid = "hR48GeIObJONCigXNt0oAbo58no2";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignIn = () => {
    if (email === "" || password === "") setError("Empty fields!");
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Signed in successfully!");
          if (user.uid === adminUid) navigate("/admin/dashboard");
          else navigate("/home");
        })
        .catch((error) => {
          const errorMessage = error.message;

          if (errorMessage === "Firebase: Error (auth/invalid-email).")
            setError("Email is invalid!");
          else if (errorMessage === "Firebase: Error (auth/wrong-password).")
            setError("Wrong password!");
          else if (errorMessage === "Firebase: Error (auth/user-not-found).")
            setError("User not found!");
          else if (errorMessage.includes("(auth/too-many-requests)"))
          {
            setError(
              "Access temporarily disabled."
            );
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
            })
          }
            

          console.log(errorMessage);
        });
    }
  };

  return (
    <div style={signInBackground}>
      <div
        style={{
          align: "center",
          display: "flex",
          justifyContent: "center",
          paddingTop: "230px",
          paddingBottom: "10px",
        }}
      >
        <div>
          <div style={title}> Parkinson's </div>
          <div style={title}> Recording App </div>

          <div style={signInHeader}> Sign in </div>

          <div style={{ marginTop: "20px" }}>
            <label>Email Address:</label>
            <TextField
              style={styleTextField}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <label>Password:</label>
            <TextField
              type="password"
              style={styleTextField}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "20px", marginLeft: "5px" }}>
            <Link
              underline="hover"
              style={{ color: "#323931", fontWeight: 700 }}
              href={"resetpassword"}
            >
              <b>Forgot your password?</b>
            </Link>
          </div>

          <div style={{ marginTop: "30px" }}>
              <button
                className="button-style-blk"
                to="/home"
                onClick={handleSignIn}
              >
                <div className="button-text-style1">Sign in</div>
              </button>
           
          </div>

          <div style={{ marginTop: "10px", marginLeft: "10px" }}>
            <Typography
              className="blink"
              align="justify"
              style={{
                fontFamily: "Metropolis",
                fontWeight: "700",
                width: "250px",
              }}
            >
              {error}
            </Typography>
          </div>
          <div style={{ marginTop: "40px", marginLeft: "5px" }}>
            <Link style={{ color: "#323931" }} href="/register">
              Don't have an account? <b>Register here.</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
