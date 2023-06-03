import React, { useState, useEffect } from "react";
import imghome from "../utils/homepic.png";
import Image from "react-image-resizer";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #323031",
    borderRadius: "5%",
    p: 4,
  };

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
      <div style={{ marginTop: "5px" }}>
          <button className="button-style-blk" onClick={handleOpen}>
            <div className="button-text-style1">Info</div>
          </button>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={styleModal}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontFamily: "Metropolis", fontWeight: "600" }}
            >
              Parkinson Database Creator (PDC)
            </Typography>
            <Typography sx={{ mt: 2, fontFamily: "Metropolis" }}>
              PDC is an appplication developed to help and ease the gathering of data so that it
              used in Parkinson's disease research. The ultimate goal of this project is to help,
              even with just a little bit, the process of diagnosing Parkinson's.
            </Typography>
          </Box>
        </Modal>
        <div style={{ marginTop: "20px" }}>
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
