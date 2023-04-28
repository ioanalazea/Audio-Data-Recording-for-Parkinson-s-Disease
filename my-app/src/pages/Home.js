import React, { useState, useEffect } from "react";
import imghome from "../utils/homepic.png";
import Image from "react-image-resizer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const welcomeText = {
    fontFamily: "Metropolis",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "36px",
    color: "#219EBC",
    paddingLeft: "50px",
    paddingTop: "50px",
  };

  const nameText = {
    fontFamily: "Metropolis",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "36px",
    lineHeight: "36px",
    color: "#323031",
    paddingLeft: "70px",
  };

  const navigate = useNavigate();

  const handleClickAddPatient = () => {
    navigate("addpatient");
  };

  const handleClickViewPatient = () => {
    navigate("viewpatients");
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };
  const [username, setUserName] = useState(null);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        setUserName(auth.currentUser?.displayName);
      } else {
        // not logged in
      }
    });
  }, []);
  return (
    <div className="homediv">
      <div className="header">
        <div className="headerText">Home</div>
      </div>

      <div style={welcomeText}>Welcome,</div>
      <div style={nameText}>{username}!</div>

      <div className="image-container">
        <Image
          img
          src={imghome}
          alt="img"
          class="center"
          width={362}
          height={217}
        ></Image>
      </div>
      <div className="button-container">
        <div style={{ marginTop: "40px" }}>
          <button className="button-style-blk" onClick={handleClickViewPatient}>
            <div className="button-text-style1">View patients</div>
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button className="button-style-blk" onClick={handleClickAddPatient}>
            <div className="button-text-style1">Add patient</div>
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button className="button-style-blk" onClick={handleSignOut}>
            <div className="button-text-style1">Log out</div>
          </button>
        </div>
      </div>
    </div>
  );
}
