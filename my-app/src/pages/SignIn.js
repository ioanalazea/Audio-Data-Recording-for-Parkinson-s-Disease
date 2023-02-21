import React, {useState} from 'react';
import {  TextField, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Background from '../utils/stacked-waves.svg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase/config.js";
import { useNavigate  } from "react-router-dom";

export default function SignIn(){

    const drawingStyle1 = {
        backgroundImage: "url(" + Background + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    };
    
    const signHeader = {
    paddingLeft:'70px',
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
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [error, setError] = useState('');

    const handleSignIn = () => {
        if (email === '' || password === '')
            setError('Empty fields!')
        else{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Signed in successfully!')
                navigate("/home")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorMessage === "Firebase: Error (auth/invalid-email).")
                    setError("Email is invalid!")
                else if (errorMessage === "Firebase: Error (auth/wrong-password).")
                    setError("Wrong password!")
                console.log(errorMessage)
            })
        }
    }
    return(
        <div style={drawingStyle1}>
       
        <div style={{align:"center", display: "flex", justifyContent: "center", paddingTop:"280px", paddingBottom:"10px"}}>
         
            <div>   
                <div style={signHeader}> Sign in </div>

               
                <div  style={{marginTop:"20px"}}>
                    <label>Email Address:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps} onChange = {(e) => setEmail(e.target.value)}/>              
                </div>
                
                <div  style={{marginTop:"20px"}}>
                    <label>Password:</label>
                    <TextField  type="password" style={styleTextField} InputProps={styleInputProps} onChange = {(e) => setPassword(e.target.value)}/>              
                </div>
                <div  style={{marginTop:"30px"}}>
                <button className="button-style1" to="/home" onClick={handleSignIn}>
                    <div className='button-text-style1' >Sign in</div>
                </button>
                </div>
                <div  style={{marginTop:"10px", marginLeft:"10px"}}>
                        <Typography className='blink' style={{fontFamily:"Metropolis", fontWeight: "700"}}>{error}</Typography>            
                </div>
            <div  style={{marginTop:"130px", marginLeft:"5px"}}>
            <Link style={{color:"#323931"}} to="/register">Don't have an account? <b>Register here.</b></Link>
            </div>
            
            </div>
        </div>

        </div>
    );


    
}