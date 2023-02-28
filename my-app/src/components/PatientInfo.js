import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from "react-router-dom";
import { encryptStorage } from '../encryption/Encrypt.js';

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
                <button className='button-style-ver3'>
                    <div className='button-text-style2'>Details</div>
                </button>
                </div>
            </div>
        </div>
    )

}