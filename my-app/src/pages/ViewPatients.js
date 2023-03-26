import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import {  TextField } from '@material-ui/core';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import PatientInfo from '../components/PatientInfo';
import { database } from "../firebase/config.js";
import { ref, get} from 'firebase/database';
import { auth } from "../firebase/config.js";
import { encryptStorage } from "../encryption/Encrypt.js";

export default function ViewPatients(){

    const navigate = useNavigate();
    const handleGoToHome = () =>{
        navigate("/home");
    }

    const styleTextField = {
        backgroundColor: "rgba(212, 163, 115, 0.2)",
       // border: "1px solid #323031",
        borderRadius: "10px",
        paddingRight:"10px",
        paddingLeft:"10px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        display: "block",
        width: "250px",
        align:"center",
        marginBottom:"50px"
    }
    const styleInputProps = {
        startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
        disableUnderline: true,
        style: {
            color: "#323031",
            fontFamily: 'Metropolis',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight:"18px",
        }
    }
    const containerStyle ={
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",   
        marginTop: "100px"
    }

    const [myPatients, setMyPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredList = myPatients.filter((item) => {
        return encryptStorage.decryptValue(item.value.fullName).includes(searchTerm);
    })

    const getMyPatients = () => {
       
      var goalsRef = ref(database,'users/' + auth.currentUser.uid + "/patients")
      get(goalsRef).then( function(snapshot) {
        var myPatientsArray = []
        
        snapshot.forEach(function(item) {
          var itemVal = item.val();
            myPatientsArray.push({"key":item.key,"value":itemVal})      
        }); 

        setMyPatients(myPatientsArray);
      });

    }

    useEffect(()=>{
        getMyPatients();
    },[navigate]);

    
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
        <div style={containerStyle}>
        <TextField style={styleTextField} InputProps={styleInputProps}  onChange={(e) => setSearchTerm(e.target.value)}/>              

      {filteredList.map((item, index) => (
        <PatientInfo key={index} patient={item}/>
      ))}

        
        </div>
        </div>
    )
}