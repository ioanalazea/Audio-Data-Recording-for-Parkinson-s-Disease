import React from 'react';
import {  TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';


export default function AddPatient(){

    const styleTextField = {
        backgroundColor: "#F6F6F6",
        border: "0px solid #219EBC",
        borderRadius: "30px",
        paddingRight:"10px",
        paddingLeft:"10px",
        marginTop:"5px",
        filter: "drop-shadow(0px 0px 4px #219EBC)",
        display: "block",
        width: "250px",
        height:"40px",
        align:"center",
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


    const containerStyle ={
       
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",   
    }

    const headerStyle ={
        marginTop:"20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",   
    }

    const text1 = {
        fontFamily: 'Metropolis',
        fontStyle: 'bold',
        fontWeight: '400',
        fontSize: '20px',
        lineHeight: '20px',
        color: '#219EBC',
    }

    const text2 = {
        paddingRight:"50px",
        paddingLeft:"50px",
        fontFamily: 'Metropolis',
        fontStyle: 'bold',
        fontWeight: '700',
        fontSize: '32px',
        lineHeight: '32px',
        color: '#323031',
    }
    return (
        <div>

        <div style={headerStyle}>
            <Link style={text1} to="/home"> Back</Link>
            <div style={text2}>Add patient</div>
            <Link style={text1} to="/home/addpatient/recordpatient"> Next</Link>

        </div>
        <div style={containerStyle}>

             <div style={{marginTop:"100px"}}>
                    <label>Full name:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
             </div>
             <div style={{marginTop:"10px"}}>
                    <label>Telephone number:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Age:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Sex:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Height (in cm):</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Weight (in kg):</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Description:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps}/>              
                </div>
        </div>


        </div>

    );

}