import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { encryptStorage } from "../encryption/Encrypt.js";
import { database } from "../firebase/config.js";
import { auth } from "../firebase/config.js";
import { ref as refDatabase, update } from "firebase/database";
import Swal from "sweetalert2";
export default function PatientInfo({ patient, refresh, setRefresh }) {
  const styleBody = {
    minWidth: "310px",
    height: "160px",
    backgroundColor: "#F6E5D4",
    shadowOpacity: 3,
    shadowRadius: 10,
    border: "4px solid #D4A373",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "30px",
  };

  const styleSquare = {
    width: "49px",
    height: "49px",
    backgroundColor: "#F6E5D4",
    border: "3px solid #D4A373",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const namePhoneContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const buttonsContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "60px",
    paddingRight: "10px",
  };
  const nameStyle = {
    fontFamily: "Metropolis",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "16px",
    lineheight: "14px",
    color: "#323031",
    paddingLeft: "10px",
    wordWrap: "break-word",
    width:"100px"
  
  };

  const phoneStyle = {
    fontFamily: "Metropolis",
    fontSize: "15px",
    lineheight: "14px",
    color: "rgba(50, 48, 49,0.5)",
    fontWeight: 700,
    paddingLeft: "10px",
  };

  const navigate = useNavigate();
  const handleGoToRecording = () => {
    navigate("recordpatient", {
      state: {
        patientKey: patient.key,
        batchCount: patient.value.batchCount,
        diagnosis: patient.value.diagnosis,
      },
    });
  };

  const handleGoToEdit = () => {
    navigate("editpatient", {
      state: {
        patient: patient,
      },
    });
  };

  const handleSendDeleteRequest = () => {
    patient.value.forDeletion
      ? Swal.fire({
          title: "Do you want to revoke deletion for this patient?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Help",
          denyButtonText: `Revoke`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire(
              "Help",
              "This will revoke the delete request sent to the admin.",
              "info"
            );
          } else if (result.isDenied) {
            setRefresh(!refresh);
            Swal.fire("Request sent!", "", "success");
            update(
              refDatabase(
                database,
                "users/" + auth.currentUser.uid + "/patients/" + patient.key
              ),
              {
                forDeletion: 0,
              }
            ).catch((error) => {
              console.log(error);
            });
          }
        })
      : Swal.fire({
          title: "Do you want to request a deletion for this patient?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Help",
          denyButtonText: `Delete`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire(
              "Help",
              "This will send a delete request to the admin. The admin will approve or deny it.",
              "info"
            );
          } else if (result.isDenied) {
            Swal.fire("Request sent!", "", "success");
            setRefresh(!refresh);
            update(
              refDatabase(
                database,
                "users/" + auth.currentUser.uid + "/patients/" + patient.key
              ),
              {
                forDeletion: 1,
              }
            ).catch((error) => {
              console.log(error);
            });
          }
        });
  };
  const getDiagnosis = (diagnosis) => {
    const optionsD = {
      hc: "Healthy - no Parkinson's",
      pd1: "Stage 1 Parkinson's",
      pd2: "Stage 2 Parkinson's",
      pd3: "Stage 3 Parkinson's",
      pd4: "Stage 4 Parkinson's",
      pd5: "Stage 5 Parkinson's",
    };
    return optionsD[diagnosis];
  };

  const getSymptoms = (symptoms) => {
    const optionsSymptoms = {
      tremor: "Tremor",
      bradykinesia: "Slowness of movement (bradykinesia)",
      rigidity: "Muscle stiffness (rigidity)",
      balance: "Balance problems",
      anosmia: "Loss of sense of smell (anosmia)",
      nerve: "Nerve pain",
      urinary: "Urinary incontience",
      constipation: "Constipation",
      dizziness: "Dizziness",
      dysphagia: "Swallowing difficulties (dysphagia)",
      insomnia: "Problems sleeping (insomnia)",
    };
    if (symptoms[0] === "") return "<br/>";
    else return symptoms.map((value) => "<br/>" + optionsSymptoms[value]);
  };

  const getComorbidities = (comorb) => {
    if (comorb[0] === "") return "<br/>";
    else return comorb.map((value) => "<br/><br/>" + value[1]);
  };

  const getMedication = (medication) => {
    if (medication[0] === "") return "<br/>";
    else return medication.map((value) => "<br/>" + value.drugname);
  };

  const getDetails = () => {
    var str =
      "Age: ".bold() +
      encryptStorage.decryptValue(patient.value.age) +
      "<br/>" +
      "Sex: ".bold() +
      patient.value.sex +
      "<br/>" +
      "Height: ".bold() +
      patient.value.height +
      " cm<br/>" +
      "Weight: ".bold() +
      patient.value.weight +
      " kg<br/>" +
      "BMI: ".bold() +
      patient.value.bmi +
      "<br/>" +
      "Diagnosis: ".bold() +
      getDiagnosis(patient.value.diagnosis) +
      "<br/>" +
      "Symptoms: ".bold() +
      getSymptoms(patient.value.symptoms) +
      "<br/>" +
      "Comorbidities:".bold() +
      getComorbidities(patient.value.comorbidities) +
      "<br/>" +
      "Medication:".bold() +
      getMedication(patient.value.medication) +
      "<br/>" +
      "Post-medication effects: <br/>".bold() +
      patient.value.postMedication +
      "<br/>" +
      "Therapeutic procedures: <br/>".bold() +
      patient.value.therapeuticProc +
      "<br/>";

    return str;
  };
  const handleShowDetails = () => {
    var str = getDetails();
    Swal.fire({
      title: encryptStorage.decryptValue(patient.value.fullName),
     html: `<div style="overflow-x: scroll;   word-wrap: break-word;
     ">`+ str+`
     </div>`,
      width: 600,
      confirmButtonColor: "#219EBC",
      color: "#323031",
      background: "#fff url(/images/trees.png)",
      backdrop: `
              rgba(0,0,0,0.6)
              
              left top
              no-repeat
            `,
    });
  };

  return (
    <div>
      <div style={styleBody}>
        <div style={{ paddingLeft: "10px" }}>
          <div style={styleSquare}>
            <PersonOutlineOutlinedIcon
              fontSize="large"
              sx={{ color: "#D4A373" }}
            ></PersonOutlineOutlinedIcon>
          </div>
        </div>
        <div style={namePhoneContainer}>
          <div style={nameStyle}>
            {encryptStorage.decryptValue(patient.value.fullName).slice(0, 60)}
            {encryptStorage.decryptValue(patient.value.fullName).length > 60 ? <>...</> :<></>}
          </div>
          <div style={phoneStyle}>
            {encryptStorage.decryptValue(patient.value.telephone)}
          </div>
        </div>
        <div style={buttonsContainer}>
          <button className="button-style-ver3" onClick={handleGoToRecording}>
            <div className="button-text-style2">Record</div>
          </button>
          <button
            style={{ marginTop: "20px" }}
            className="button-style-ver3"
            onClick={handleShowDetails}
          >
            <div className="button-text-style2">Details</div>
          </button>
          <button
            style={{ marginTop: "20px" }}
            className="button-style-ver3"
            onClick={handleGoToEdit}
          >
            <div className="button-text-style2">Edit</div>
          </button>
          <button
            style={{
              marginTop: "15px",
              backgroundColor: "#c95960",
              border: "1px solid #c95960",
            }}
            className="button-style-ver3"
            onClick={handleSendDeleteRequest}
          >
            <div className="button-text-style2">
              {patient.value.forDeletion ? "Revoke" : "Delete"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
