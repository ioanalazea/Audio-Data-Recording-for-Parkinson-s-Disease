import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Link from "@mui/material/Link";
import Select from "react-select";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { database } from "../firebase/config.js";
import { ref, set } from "firebase/database";
import { auth } from "../firebase/config.js";
import { encryptStorage } from "../encryption/Encrypt.js";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditPatient() {
  const styleTextField = {
    backgroundColor: "#F6F6F6",
    border: "0px solid #219EBC",
    borderRadius: "30px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginTop: "5px",
    filter: "drop-shadow(0px 0px 4px #219EBC)",
    display: "block",
    width: "250px",
    height: "40px",
    align: "center",
  };

  const styleTextFieldMultiline = {
    backgroundColor: "#F6F6F6",
    border: "0px solid #219EBC",
    borderRadius: "30px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginTop: "5px",
    filter: "drop-shadow(0px 0px 4px #219EBC)",
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

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const headerStyle = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };

  const text1 = {
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "400",
    fontSize: "20px",
    lineHeight: "20px",
    color: "#219EBC",
    cursor:"pointer"

  };

  const text2 = {
    paddingRight: "70px",
    paddingLeft: "35px",
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "700",
    fontSize: "32px",
    lineHeight: "32px",
    color: "#323031",
  };

  const styleSelect = {
    control: (base) => ({
      ...base,
      backgroundColor: "#F6F6F6",
      border: "0px solid #219EBC",
      borderRadius: "30px",
      paddingRight: "10px",
      paddingLeft: "10px",
      marginTop: "5px",
      filter: "drop-shadow(0px 0px 4px #219EBC)",
      boxShadow: "none",
    }),
  };

  const styleSelect2 = {
    control: (base) => ({
      ...base,
      width: "250px",
      backgroundColor: "#F6F6F6",
      border: "0px solid #219EBC",
      borderRadius: "30px",
      paddingRight: "10px",
      paddingLeft: "10px",
      marginTop: "5px",
      filter: "drop-shadow(0px 0px 4px #219EBC)",
      boxShadow: "none",
    }),
  };

  const styleAutocomplete = {
    width: "250px",
    backgroundColor: "#F6F6F6",
    border: "0px solid #219EBC",
    borderRadius: "30px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginTop: "5px",
    filter: "drop-shadow(0px 0px 4px #219EBC)",
    boxShadow: "none",
  };

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const optionsS = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ];

  const optionsD = [
    { value: "hc", label: "Healthy - no Parkinson's" },
    { value: "pd1", label: "Stage 1 Parkinson's" },
    { value: "pd2", label: "Stage 2 Parkinson's" },
    { value: "pd3", label: "Stage 3 Parkinson's" },
    { value: "pd4", label: "Stage 4 Parkinson's" },
    { value: "pd5", label: "Stage 5 Parkinson's" },
  ];

  const optionsSymptoms = [
    { value: "tremor", label: "Tremor" },
    { value: "bradykinesia", label: "Slowness of movement (bradykinesia)" },
    { value: "rigidity", label: "Muscle stiffness (rigidity)" },
    { value: "balance", label: "Balance problems" },
    { value: "anosmia", label: "Loss of sense of smell (anosmia)" },
    { value: "nerve", label: "Nerve pain" },
    { value: "urinary", label: "Urinary incontience" },
    { value: "constipation", label: "Constipation" },
    { value: "dizziness", label: "Dizziness" },
    { value: "dysphagia", label: "Swallowing difficulties (dysphagia)" },
    { value: "insomnia", label: "Problems sleeping (insomnia)" },
  ];

  const [comorbidities, setComorbidities] = useState([]);
  const searchDisease = async (searchInput) => {
    console.log(searchInput);
    try {
      const { data } = await axios.get(
        `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&df=code,name&terms=${searchInput}&maxList=500`
      );
      setComorbidities(data[3]);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const [drugs, setDrugs] = useState([]);

  // Function to collect data
  const getApiData = async () => {
    const response = await fetch(
      "https://free214.cs.upt.ro:5000/api/v1/resources/drugs/all"
    )
      .then((response) => response.json())
      .catch((err) => {
        console.log("DRUGBANK", err.message);
      });

    // update the state
    if (response) setDrugs(response);
  };

  useEffect(() => {
    getApiData();
  }, []);
  const location = useLocation();
  // get patient key
  let patientToEdit = location.state.patient;

  const [patient, setPatient] = useState({
    fullName: encryptStorage.decryptValue(patientToEdit.value.fullName),
    telephone: encryptStorage.decryptValue(patientToEdit.value.telephone),
    age: encryptStorage.decryptValue(patientToEdit.value.age),
    sex: patientToEdit.value.sex,
    height: patientToEdit.value.height,
    weight: patientToEdit.value.weight,
    diagnosis: patientToEdit.value.diagnosis,
    symptoms: patientToEdit.value.symptoms,
    comorbidities:
      patientToEdit.value.comorbidities.length === 1
        ? []
        : patientToEdit.value.comorbidities,
    medication: patientToEdit.value.medication.length === 1
    ? []
    : patientToEdit.value.medication,
    postMedication: patientToEdit.value.postMedication,
    therapeuticProc: patientToEdit.value.therapeuticProc,
    batchCount: patientToEdit.value.batchCount,
  });

  const getSymptomsPatientEdit = () => {
    return patient.symptoms.map((symptom) =>
      optionsSymptoms.find((element) => symptom === element.value)
    );
  };
  const handleChangeSymptoms = (data) => {
    let value = Array.from(data, (option) => option.value);
    setPatient({ ...patient, symptoms: value });
  };
  const handleValidation = () => {
    var message = "";
    if (patient.fullName === "")
      message = "Please provide a full name for the patient!";
    else if (!patient.telephone.match("[0-9]{10}"))
      message = "Please provide a valid phone number!";
    else if (patient.age.length > 3 || /^\d+$/.test(patient.age) === false)
      message = "Please provide a valid age!";
    else if (/^[+-]?\d+(\.\d+)?$/.test(patient.height) === false)
      message = "Please provide a valid height! Example: 170.5";
    else if (/^[+-]?\d+(\.\d+)?$/.test(patient.weight) === false)
      message = "Please provide a valid weight! Example: 65.3";
    else if (patient.sex === "") message = "Please provide patient's sex!";
    else if (patient.diagnosis === "")
      message = "Please provide patient's diagnosis!";
    setMessage(message);
    if (message !== "") return 0;
    else return 1;
  };

  const handleEditPatient = () => {
    if (handleValidation() === 1) {
      //encrypting details
      patient.fullName = encryptStorage.encryptValue(patient.fullName);
      patient.telephone = encryptStorage.encryptValue(patient.telephone);
      patient.age = encryptStorage.encryptValue(patient.age);

      //calculating the BMI
      const num =
        (parseFloat(patient.weight) /
          parseFloat(patient.height) /
          parseFloat(patient.height)) *
        10000;
      patient.bmi = num.toString().slice(0, 5);
      if (patient.medication.length === 0) patient.medication = [""];
      if (patient.comorbidities.length === 0) patient.comorbidities = [""];

      console.log(patient);

      //here handle edit the patient
      set(
        ref(
          database,
          "users/" + auth.currentUser.uid + "/patients/" + patientToEdit.key
        ),
        {
          fullName: patient.fullName,
          telephone: patient.telephone,
          age: patient.age,
          sex: patient.sex,
          height: patient.height,
          weight: patient.weight,
          diagnosis: patient.diagnosis,
          symptoms: patient.symptoms,
          comorbidities: patient.comorbidities,
          medication: patient.medication,
          postMedication: patient.postMedication,
          therapeuticProc: patient.therapeuticProc,
          batchCount: patientToEdit.value.batchCount,
        }
      )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Patient updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(-1);
          console.log("Updated successfully!");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! " + error,
            confirmButtonColor: "#219EBC",
          });
        });
    }
  };

  return (
    <div>
      <div style={headerStyle}>
         <Link underline="none" style={text1} onClick={()=>navigate(-1)}>
          Back
        </Link>
        <div style={text2}>Edit patient</div>
      </div>
      {message !== "" ? (
        <div style={{ marginTop: "40px", marginLeft: "15px" }}>
          <div
            className="error"
            style={{ fontFamily: "Metropolis", fontWeight: "700" }}
          >
            {message}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div style={containerStyle}>
        <div style={{ marginTop: "20px" }}>
          <label>Full name:</label>
          <TextField
            value={patient.fullName}
            style={styleTextField}
            InputProps={styleInputProps}
            onChange={(e) => {
              setPatient({ ...patient, fullName: e.target.value });
            }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Telephone number:</label>
          <TextField
            value={patient.telephone}
            style={styleTextField}
            InputProps={styleInputProps}
            onChange={(e) => {
              setPatient({ ...patient, telephone: e.target.value });
            }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Age:</label>
          <TextField
            value={patient.age}
            style={styleTextField}
            InputProps={styleInputProps}
            onChange={(e) => {
              setPatient({ ...patient, age: e.target.value });
            }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Sex:</label>
          <Select
            defaultValue={optionsS.find(
              (element) => element.value === patient.sex
            )}
            styles={styleSelect}
            classNamePrefix="select"
            isSearchable={false}
            options={optionsS}
            onChange={(e) => {
              setPatient({ ...patient, sex: e.value });
            }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Height (in cm):</label>
          <TextField
            value={patient.height}
            style={styleTextField}
            InputProps={styleInputProps}
            onChange={(e) => {
              setPatient({ ...patient, height: e.target.value });
            }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Weight (in kg):</label>
          <TextField
            value={patient.weight}
            style={styleTextField}
            InputProps={styleInputProps}
            onChange={(e) => {
              setPatient({ ...patient, weight: e.target.value });
            }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Diagnosis:</label>
          <Select
            defaultValue={optionsD.find(
              (element) => element.value === patient.diagnosis
            )}
            styles={styleSelect2}
            classNamePrefix="select"
            isSearchable={false}
            options={optionsD}
            onChange={(e) => {
              setPatient({ ...patient, diagnosis: e.value });
            }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Symptoms:</label>
          <Select
            defaultValue={getSymptomsPatientEdit}
            styles={styleSelect2}
            classNamePrefix="select"
            isMulti={true}
            isSearchable={false}
            options={optionsSymptoms}
            onChange={handleChangeSymptoms}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Comorbidities:</label>
          <Autocomplete
            defaultValue={patient.comorbidities}
            sx={styleAutocomplete}
            onInputChange={(e) => {
              searchDisease(e.target.value);
            }}
            onChange={(event, newValue) => {
              setPatient({ ...patient, comorbidities: newValue });
            }}
            multiple
            id="tags-standard"
            options={comorbidities}
            getOptionLabel={(option) => option[0] + " " + option[1]}
            renderOption={(props, option) => (
              <li {...props} style={{ fontFamily: "Metropolis" }}>
                {option.code}&nbsp;&nbsp;&nbsp;{option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  style: {
                    fontFamily: "Metropolis",
                    fontStyle: "normal",
                    fontWeight: "500",
                    marginBlockStart: "4.6px",
                    marginBlockEnd: "4.6px",
                  },
                }}
                variant="standard"
                label=""
                placeholder="Type..."
              />
            )}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Medication:</label>
          <Autocomplete
            defaultValue={patient.medication}
            sx={styleAutocomplete}
            onChange={(event, newValue) => {
              setPatient({ ...patient, medication: newValue });
            }}
            multiple
            id="tags-standard"
            options={drugs}
            getOptionLabel={(option) => option.drugname}
            renderOption={(props, option) => (
              <li {...props} style={{ fontFamily: "Metropolis" }}>
                {option.drugname}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  style: {
                    fontFamily: "Metropolis",
                    fontStyle: "normal",
                    fontWeight: "500",
                    marginBlockStart: "4.6px",
                    marginBlockEnd: "4.6px",
                  },
                }}
                variant="standard"
                label=""
                placeholder="Search..."
              />
            )}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Post-medication effects:</label>
          <TextField
            value={patient.postMedication}
            multiline
            style={styleTextFieldMultiline}
            InputProps={styleInputProps}
            onChange={(e) => {
              setPatient({ ...patient, postMedication: e.target.value });
            }}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Therapeutic procedures:</label>
          <TextField
            value={patient.therapeuticProc}
            multiline
            style={styleTextFieldMultiline}
            InputProps={styleInputProps}
            onChange={(e) => {
              setPatient({ ...patient, therapeuticProc: e.target.value });
            }}
          />
        </div>

        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          <button
            className="button-style-blue"
            onClick={() => handleEditPatient()}
          >
            <div className="button-text-style1">SAVE CHANGES</div>
          </button>
        </div>
      </div>
    </div>
  );
}
