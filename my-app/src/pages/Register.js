import React, {useRef} from 'react';
import { Button, TextField} from '@material-ui/core';

export default function Register(){
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const drawingStyle1 = {
        width: windowSize.current[0],
        height: windowSize.current[1],
        //background: 'linear-gradient(180deg, #219EBC 1.07%, rgba(217, 217, 217, 0) 82.4%)',
        background: 'url(./utils/cool-background.svg)'

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
       // <div style={drawingStyle1}>
       <div className='logo'>
        <div style={{align:"center", display: "flex", justifyContent: "center", paddingTop:"130px", paddingBottom:"10px"}}>
         
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
                <div  style={{marginTop:"50px"}}>
                <button className="button-style1"><div className='button-text-style1'>Create account</div></button>
                </div>
                
            </div>
        </div>

        </div>
    );


    

}

