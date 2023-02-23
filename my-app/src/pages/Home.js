import React, {useRef} from "react";
import imghome from '../utils/homepic.png';
import Image from 'react-image-resizer';
import { Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';
import {  signOut } from 'firebase/auth';
import { auth } from "../firebase/config.js";
import { useNavigate } from "react-router-dom";

export default function Home(){

    const welcomeText = {
        fontFamily: 'Metropolis',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: "36px",
        lineHeight: "36px",
        color: "#219EBC",
        paddingLeft: "50px",
        paddingTop: "50px"
    }

    const nameText = {
        fontFamily: 'Metropolis',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "36px",
        lineHeight: "36px",
        color: "#323031",
        paddingLeft: "70px",
    }

    const navigate = useNavigate();

   
    const handleSignOut = () => {   
          signOut(auth)
          .then(() => {
            navigate("/")
          })
          .catch(error => alert(error.message))
      }
      

    return(
        <div className="homediv">
        <div className="header">
            <div className="headerText">Home</div>
        </div>

        <div style={welcomeText}>Welcome,</div>
        <div style={nameText}>{auth.currentUser?.displayName}!</div>
       
        <div className="image-container">
                <Image img src={imghome} alt="img" class="center" width={362} height={217}></Image>
                
        </div>
        <div className="button-container">
                <div  style={{marginTop:"40px"}}>
                <button className="button-style-blk"><div className='button-text-style1'>View patients</div></button>
                </div>  
                <div  style={{marginTop:"20px"}}>
                <button className="button-style-blk">
                <Link className='button-text-style1' to="/home/addpatient"> Add patient</Link>
                </button>
                </div>  
                <div  style={{marginTop:"20px"}}>
                <button className="button-style-blk" onClick={handleSignOut}>
                <div className='button-text-style1' >Log out</div>
                </button>
                </div>  
        </div>
        </div>
    );
}  