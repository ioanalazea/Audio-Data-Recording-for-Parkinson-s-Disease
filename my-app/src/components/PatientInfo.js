import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from "react-router-dom";
import { encryptStorage } from '../encryption/Encrypt.js';
import Swal from 'sweetalert2'
export default function PatientInfo({patient}){

    const styleBody = {
        width: 310,
        height: 79,
        backgroundColor: "#F6E5D4",
        shadowOpacity: 3,
        shadowRadius: 10,
        border: "4px solid #D4A373",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",   
        marginBottom: "20px"
    }

    const styleSquare = {
        width: "49px",
        height: "49px",
        backgroundColor: "#F6E5D4",
        border: "3px solid #D4A373",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
    }

    const namePhoneContainer = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }

    const buttonsContainer = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "60px"
    }
    const nameStyle = {
        fontFamily: 'Metropolis',
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineheight: "14px",
        color: "#323031",
        paddingLeft:"10px"
    }

    const phoneStyle = {
        fontFamily: 'Metropolis',
        fontSize: "14px",
        lineheight: "14px",
        color: "#323031",
        paddingLeft:"10px"
    }

    const navigate = useNavigate();
    const handleGoToRecording = () =>{
        navigate("recordpatient",  {state: {
            patientKey: patient.key
        }
          });
    }



    const getDiagnosis = (diagnosis) => {
        const optionsD = {
             "hc": "Healthy - no Parkinson's" ,
              "pd1": "Stage 1 Parkinson's" ,
              "pd2": "Stage 2 Parkinson's" ,
              "pd3": "Stage 3 Parkinson's" ,
              "pd4": "Stage 4 Parkinson's" ,
            "pd5": "Stage 5 Parkinson's" ,
        }
        return optionsD[diagnosis]
    }


    const getSymptoms = (symptoms) => {
        
  const optionsSymptoms = {
     "tremor": "Tremor" ,
     "bradykinesia": "Slowness of movement (bradykinesia)",
     "rigidity": "Muscle stiffness (rigidity)" ,
     "balance": "Balance problems" ,
     "anosmia": "Loss of sense of smell (anosmia)" ,
     "nerve": "Nerve pain" ,
     "urinary": "Urinary incontience" ,
     "constipation": "Constipation" ,
     "dizziness": "Dizziness" ,
     "dysphagia": "Swallowing difficulties (dysphagia)" ,
     "insomnia": "Problems sleeping (insomnia)" ,
  }
  if (symptoms[0] === "") return "\n"
        else
  return symptoms.map((value) => "\n" + optionsSymptoms[value] )
    }

    const getComorbidities = (comorb) => {
        if (comorb[0] === "") return "\n"
        else
        return comorb.map((value) => "\n" + value[1] )
    }

    const getMedication = (medication) => {
        if (medication[0] === "") return "\n"
        else
        return medication.map((value) => "\n" + value.drugname )
    }
    const handleShowDetails = () =>{
        var str="Age: ".bold() + encryptStorage.decryptValue(patient.value.age) + "\n" +
        "Sex: ".bold() + patient.value.sex + "\n" +
        "Height: ".bold() + patient.value.height + " cm\n" +
        "Weight: ".bold() + patient.value.weight + " kg\n" +
        "BMI: ".bold() + patient.value.bmi + "\n" +
        "Diagnosis: ".bold() + getDiagnosis(patient.value.diagnosis) + "\n" +
        "Symptoms: ".bold() + getSymptoms(patient.value.symptoms) + "\n" +
        "Comorbidities:".bold() + getComorbidities(patient.value.comorbidities) + "\n" +
        "Medication:".bold() + getMedication(patient.value.medication) + "\n" +
        "Post-medication effects: \n".bold() + patient.value.postMedication + "\n" +
        "Therapeutic procedures: \n".bold() + patient.value.therapeuticProc + "\n"



        Swal.fire({
            title: encryptStorage.decryptValue(patient.value.fullName),
            html: '<pre>' + str + '</pre>',
            width: 600,
            padding: '3em',
            color: '#323031',
            fontFamily:"Metropolis",
            background: '#fff url(/images/trees.png)',
            backdrop: `
              rgba(0,0,0,0.6)
              
              left top
              no-repeat
            `
          })
    }
   
    return(
        <div>
            <div style={styleBody}>
                <div style={styleSquare}>
                    <PersonOutlineOutlinedIcon fontSize="large" sx={{color: "#D4A373"}} ></PersonOutlineOutlinedIcon>
                </div>
                <div style={namePhoneContainer}>
                   <div style={nameStyle}>{encryptStorage.decryptValue(patient.value.fullName)}</div>
                   <div style={phoneStyle}>{encryptStorage.decryptValue(patient.value.telephone)}</div>
                </div>
                <div style={buttonsContainer}>
                <button className='button-style-ver3' onClick={handleGoToRecording}>
                    <div className='button-text-style2'>Record</div>
                </button>
                <button className='button-style-ver3' onClick={handleShowDetails}>
                    <div className='button-text-style2'>Details</div>
                </button>
                </div>
            </div>
        </div>
    )

}