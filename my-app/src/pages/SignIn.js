import React, { useState } from "react";
import { TextField, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import Background from "../utils/stacked-waves.svg";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const drawingStyle1 = {
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
  };

  const signHeader = {
    paddingLeft: "70px",
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "500",
    fontSize: "38px",
    lineHeight: "40px",
    /* identical to box height */
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignIn = () => {
    if (email === "" || password === "") setError("Empty fields!");
    else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Signed in successfully!");
          if (user.uid === "hR48GeIObJONCigXNt0oAbo58no2")
          navigate("/admin")
          else
          navigate("/home");
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;

          if (errorMessage === "Firebase: Error (auth/invalid-email).")
            setError("Email is invalid!");
          else if (errorMessage === "Firebase: Error (auth/wrong-password).")
            setError("Wrong password!");
          else if (errorMessage === "Firebase: Error (auth/user-not-found).")
          setError("User not found!");

            console.log(errorMessage);
        });
    }
  }


  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent")
  }
 
  return (
    <div style={drawingStyle1}>

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
        <div style={title}> Parkinson's  </div>
        <div style={title}> Recording App  </div>

          <div style={signHeader}> Sign in </div>

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

          <div style={{ marginTop: "20px" }}>
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
          <div style={{ marginTop: "30px" }}>
            <button
              className="button-style-blk"
              to="/home"
              onClick={handleSignIn}
            >
              <div className="button-text-style1">Sign in</div>
            </button>
          </div>


          {error === "Wrong password!"?(<div style={{ marginTop: "10px", marginLeft: "5px" }}>
            <Link style={{ color: "#323931" }} onClick={triggerResetEmail}>
              Forgot password? <b>Click to reset here.</b>
            </Link>
          </div>):(<></>)}
          <div style={{ marginTop: "10px", marginLeft: "10px" }}>
            <Typography
              className="blink"
              style={{ fontFamily: "Metropolis", fontWeight: "700" }}
            >
              {error}
            </Typography>
          </div>
          <div style={{ marginTop: "80px", marginLeft: "5px" }}>
            <Link style={{ color: "#323931" }} to="/register">
              Don't have an account? <b>Register here.</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
