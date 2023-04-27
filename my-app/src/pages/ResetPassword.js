import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import img from "../utils/icons8-password-reset-68.png";
import Background from "../utils/stacked-waves.svg";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const signInBackground = {
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

  const resetMessage = {
    paddingLeft: "20px",
    paddingTop: "25px",
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "700",
    fontSize: "16px",
    color: "#323031",
    width: "300px",
  };

  const styleTextField = {
    backgroundColor: "#F6F6F6",
    border: "1px solid #323031",
    borderRadius: "30px",
    paddingRight: "10px",
    paddingLeft: "10px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    display: "block",
    width: "300px",
    align: "center",
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSendResetEmail = () => {
    if (email === "") {
      Swal.fire({
        icon: "error",
        title: "Please enter your email!",
        showConfirmButton: false,
        timer: 2500,
      });
    } else
      sendPasswordResetEmail(auth, email)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Password reset email sent!",
            text: "Please check your email and follow the instructions in order to reset your password!",
            showConfirmButton: true,
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.message.includes("auth/invalid-email"))
            Swal.fire({
              icon: "error",
              title: "Invalid email address!",
              showConfirmButton: false,
              timer: 1500,
            });
          else if (error.message.includes("auth/user-not-found"))
            Swal.fire({
              icon: "error",
              title: "No user corresponding to the email address!",
              showConfirmButton: false,
              timer: 2500,
            });
        });
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
          <div style={title}> Forgot password?</div>
          <div className="image-container">
            <img src={img} alt="img" width={90} height={90}></img>
          </div>
          <div style={resetMessage}>
            {" "}
            Please enter your email address and we will email you a link to
            reset your password.
          </div>

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

          <div style={{ marginTop: "25px", paddingLeft: "35px" }}>
            <button
              className="button-style-blk"
              style={{ width: "250px" }}
              onClick={handleSendResetEmail}
            >
              <div className="button-text-style1">Send reset email</div>
            </button>
          </div>
          <div style={{ marginTop: "25px", paddingLeft: "85px" }}>
            <button className="button-style-blk" onClick={() => navigate("/")}>
              <div className="button-text-style1">Go back</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
