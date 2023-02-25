import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import PatientInfo from '../components/PatientInfo';

export default function ViewPatients(){

    const navigate = useNavigate();
    const handleGoToHome = () =>{
        navigate("/home");
    }
    return(
        <div className="homediv">
        <div className="header">
            <HomeIcon 
            className='a'
            color="primary" 
            fontSize='large' 
            sx={{ paddingLeft:"10px",color: "#FFFFFF"}}
            onClick={handleGoToHome} 
            >
            </HomeIcon>
            <div className="headerText" style={{paddingTop:"17px"}}>Your patients</div>
        </div>
        <div>
            <PatientInfo></PatientInfo>
        </div>
        </div>
    )
}