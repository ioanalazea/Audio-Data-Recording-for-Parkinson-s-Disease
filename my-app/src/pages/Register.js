import React, {useRef} from 'react';
import {  TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Background from '../utils/blob-scene-haikei.svg';

export default function Register(){
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const drawingStyle1 = {
        backgroundImage: "url(" + Background + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    };
    
    const registerHeader = {
        paddingLeft:'120px',
        fontFamily: 'Metropolis',
        fontStyle: 'bold',
        fontWeight: '700',
        fontSize: '38px',
        lineHeight: '40px',
        /* identical to box height */
        color: '#323031',
    }; 

    const styleTextField = {
        backgroundColor: "#F6F6F6",
        border: "1px solid #323031",
        borderRadius: "30px",
        paddingRight:"10px",
        paddingLeft:"10px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        display: "block",
        width: "250px",
        align:"center"
    }
    const styleInputProps = {
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

    
    return(
       <div style={drawingStyle1}>
       
        <div style={{align:"center", display: "flex", justifyContent: "center", paddingTop:"90px", paddingBottom:"10px"}}>
         
            <div>   
                <div style={registerHeader}> Register </div>

                <div style={{marginTop:"20px"}}>
                    <label>First name:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div style={{marginTop:"20px"}}>
                    <label>Last name:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div  style={{marginTop:"20px"}}>
                    <label>Email Address:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div  style={{marginTop:"20px"}}>
                    <label>Phone number:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div  style={{marginTop:"20px"}}>
                    <label>Password:</label>
                    <TextField  type="password" style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div  style={{marginTop:"20px"}}>
                    <label>Confirm password:</label>
                    <TextField  type="password" style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div  style={{marginTop:"40px"}}>
                <button className="button-style1"><div className='button-text-style1'>Create account</div></button>
                </div>
            <div  style={{marginTop:"15px", marginLeft:"20px"}}>
            <Link style={{color:"#323931"}} to="/">Already have an account? <b>Sign in.</b></Link>
            </div>
            </div>
        </div>

        </div>
    );


    

}

