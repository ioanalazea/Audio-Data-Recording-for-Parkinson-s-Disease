import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import PatientInfo from '../components/PatientInfo';
import { database } from "../firebase/config.js";
import { ref, get} from 'firebase/database';
import { auth } from "../firebase/config.js";
export default function ViewPatients(){

    const navigate = useNavigate();
    const handleGoToHome = () =>{
        navigate("/home");
    }

    const containerStyle ={
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",   
        marginTop: "100px"
    }

    const [myPatients, setMyPatients] = useState([]);
    const [deleted ,setDeleted] = useState(false)
    const getMyPatients = () => {
       
      var goalsRef = ref(database,'users/' + auth.currentUser.uid + "/patients")
      get(goalsRef).then( function(snapshot) {
        var myPatientsArray = []
        
        snapshot.forEach(function(item) {
          var itemVal = item.val();
            myPatientsArray.push({"key":item.key,"value":itemVal})      
        }); 

        setMyPatients(myPatientsArray);
        console.log(myPatientsArray)
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
        {myPatients.map((item)=>{
                        return(<PatientInfo key={item.key} patient={item}/>)
                    })}
        </div>
        </div>
    )
}