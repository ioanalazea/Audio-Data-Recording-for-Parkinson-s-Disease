import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { TextField, Typography } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import PatientInfo from "../components/PatientInfo";
import { database } from "../firebase/config.js";
import { ref, get } from "firebase/database";
import { auth } from "../firebase/config.js";
import { encryptStorage } from "../encryption/Encrypt.js";
import ReactLoading from "react-loading";
import imgsad from "../utils/sad.png";
import Image from "react-image-resizer";

export default function ViewPatients() {
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate("/home");
  };

  const styleTextField = {
    backgroundColor: "rgba(212, 163, 115, 0.2)",
    borderRadius: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    display: "block",
    width: "320px",
    align: "center",
    marginBottom: "50px",
  };
  const styleInputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
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
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
  };
  const [isLoading, setIsLoading] = useState(false);

  const [myPatients, setMyPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredList = myPatients.filter((item) => {
    return encryptStorage
      .decryptValue(item.value.fullName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const getMyPatients = () => {
    var goalsRef = ref(database, "users/" + auth.currentUser.uid + "/patients");
    get(goalsRef).then(function (snapshot) {
      var myPatientsArray = [];

      snapshot.forEach(function (item) {
        var itemVal = item.val();
        myPatientsArray.push({ key: item.key, value: itemVal });
      });

      setMyPatients(myPatientsArray);
      setIsLoading(false);
    });
  };

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        // logged in, use authObj
        setIsLoading(true);
        getMyPatients();
      } else {
        // not logged in
      }
    });
  }, [refresh]);

  return (
    <div className="homediv">
      <div className="header">
        <HomeIcon
          className="a"
          color="primary"
          fontSize="large"
          sx={{ paddingLeft: "10px", color: "#FFFFFF" }}
          onClick={handleGoToHome}
        ></HomeIcon>
        <div className="headerText" style={{ paddingTop: "17px" }}>
          Your patients
        </div>
      </div>
      <div style={containerStyle}>
        {isLoading ? (
          <ReactLoading
            type="spinningBubbles"
            color="#219EBC"
            height={100}
            width={100}
          />
        ) : (
          <div>
            <TextField
              style={styleTextField}
              InputProps={styleInputProps}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {myPatients.length === 0 ? (
              <div>
                <Typography
                  style={{
                    fontFamily: "Metropolis",
                    fontStyle: "normal",
                    fontWeight: "400",
                    marginLeft: "50px",
                    marginBottom: "10px",
                  }}
                >
                  You do not have any patients!
                  <br />
                  Go to <b> Add patient </b> to add one.
                </Typography>
                <Image
                  img
                  src={imgsad}
                  alt="img"
                  class="center"
                  width={320}
                  height={150}
                ></Image>
              </div>
            ) : (
              <></>
            )}
            {filteredList.map((item, index) => (
              <PatientInfo
                key={index}
                patient={item}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
