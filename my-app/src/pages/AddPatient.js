import React, {useState, useEffect} from 'react';
import {  TextField} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Autocomplete from '@mui/material/Autocomplete';
import {Typography} from '@material-ui/core';
import axios from "axios";

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

    const styleTextFieldMultiline = {
        backgroundColor: "#F6F6F6",
        border: "0px solid #219EBC",
        borderRadius: "30px",
        paddingRight:"10px",
        paddingLeft:"10px",
        marginTop:"5px",
        filter: "drop-shadow(0px 0px 4px #219EBC)",
        display: "block",
        width: "250px",
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

    const styleSelect = {
        control: base => ({
          ...base,
          backgroundColor: "#F6F6F6",
          border: "0px solid #219EBC",
          borderRadius: "30px",
          paddingRight:"10px",
          paddingLeft:"10px",
          marginTop:"5px",
          filter: "drop-shadow(0px 0px 4px #219EBC)",
          boxShadow: "none"
        })
      };

    const styleSelect2 = {
        control: base => ({
          ...base,
          width:"250px",
          backgroundColor: "#F6F6F6",
          border: "0px solid #219EBC",
          borderRadius: "30px",
          paddingRight:"10px",
          paddingLeft:"10px",
          marginTop:"5px",
          filter: "drop-shadow(0px 0px 4px #219EBC)",
          boxShadow: "none"
        })
      };

    



      const styleAutocomplete = {
        width:"250px",
        backgroundColor: "#F6F6F6",
        border: "0px solid #219EBC",
        borderRadius: "30px",
        paddingRight:"10px",
        paddingLeft:"10px",
        marginTop:"5px",
        filter: "drop-shadow(0px 0px 4px #219EBC)",
        boxShadow: "none"
      
    };
    
    


    const [message, setMessage] = useState("");

    const optionsS = [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' }
      ]
    
    const optionsD = [
        { value: 'hc', label: 'Healthy - no Parkinson\'s' },
        { value: 'pd1', label: 'Stage 1 Parkinson\'s' },
        { value: 'pd2', label: 'Stage 2 Parkinson\'s' },
        { value: 'pd3', label: 'Stage 3 Parkinson\'s' },
        { value: 'pd4', label: 'Stage 4 Parkinson\'s' },
        { value: 'pd5', label: 'Stage 5 Parkinson\'s' },
    ]

    const optionsSymptoms = [
        { value: 'tremor', label: 'Tremor' },
        { value: 'bradykinesia', label: 'Slowness of movement (bradykinesia)' },
        { value: 'rigidity', label: 'Muscle stiffness (rigidity)' },
        { value: 'balance', label: 'Balance problems' },
        { value: 'anosmia', label: 'Loss of sense of smell (anosmia)' },
        { value: 'nerve', label: 'Nerve pain' },
        { value: 'urinary', label: 'Urinary incontience' },
        { value: 'constipation', label: 'Constipation' },
        { value: 'dizziness', label: 'Dizziness' },
        { value: 'dysphagia', label: 'Swallowing difficulties (dysphagia)' },
        { value: 'insomnia', label: 'Problems sleeping (insomnia)' },
    ]

    const [comorbidities, setComorbidities] = useState([]);
    const searchDisease = async(searchInput) =>{
        console.log(searchInput)
          try {
            const { data } = await axios.get(`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&df=code,name&terms=${searchInput}&maxList=500`);
            setComorbidities(data[3]);
            console.log(data)
          } catch (err) {
            console.error(err);
          }
    }


   /*/ const searchMedication = async() =>{
       
          try {
            const { data } = await axios.get(`http://192.168.88.24:5000/api/v1/resources/drugs/all`);
            
            console.log(data)
          } catch (err) {
            console.error(err);
          }
    }
   const [posts, setPosts] = useState([]);
   useEffect(() => {
      fetch('http://192.168.88.24:5000/api/v1/resources/drugs/all')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
/*/




    const [patient, setPatient] = useState({
        fullName:'',
        telephone:'',
        age:'',
        sex:'',
        height:'',
        weight:'',
        bmi:'',
        diagnosis:'',
        symptoms:[],
        comorbidities:[],
        postMedication:'',
        therapeuticProc:''
    })

  
    

    const handleChangeSymptoms = (data) => {
        let value = Array.from(data, option => option.value);
        setPatient({...patient, symptoms:value})
      }
    
    const handleValidation = () => {
        var message = ""
        if (patient.fullName === '')
            message="Please provide a full name for the patient!"
        
        else if( !(patient.telephone.match('[0-9]{10}')) )
            message = "Please provide a valid phone number!"
        else  if  ((patient.age.length > 3) || (/^\d+$/.test(patient.age)===false))
            message = "Please provide a valid age!"
        else if (/^[+-]?\d+(\.\d+)?$/.test(patient.height) === false)
            message = "Please provide a valid height! Example: 170.5"
        else if (/^[+-]?\d+(\.\d+)?$/.test(patient.weight) === false)
            message = "Please provide a valid weight! Example: 65.3"
        else if (patient.sex === '')
            message = "Please provide patient's sex!"
        else if (patient.diagnosis === '')
            message = "Please provide patient's diagnosis!"
        console.log(message)
    }




    const handleAddPatient = () =>{
        handleValidation()
        
        
        console.log(patient)

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
                    <TextField style={styleTextField} InputProps={styleInputProps} onChange={(e) =>  {setPatient({...patient, fullName: e.target.value})}}/>              
             </div>
             <div style={{marginTop:"10px"}}>
                    <label>Telephone number:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps} onChange={(e) =>  {setPatient({...patient, telephone: e.target.value})}}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Age:</label>
                    <TextField style={styleTextField} InputProps={styleInputProps} onChange={(e) =>  {setPatient({...patient, age: e.target.value})}}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Sex:</label>
                        <Select
                            styles={styleSelect}
                            classNamePrefix="select"
                            isSearchable={false}
                            options={optionsS}
                            onChange={(e) =>  {setPatient({...patient, sex: e.value})}}
                        />                
             </div>
                <div style={{marginTop:"10px"}}>
                    <label>Height (in cm):</label>
                    <TextField style={styleTextField} InputProps={styleInputProps} onChange={(e) =>  {setPatient({...patient, height: e.target.value})}}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Weight (in kg):</label>
                    <TextField style={styleTextField} InputProps={styleInputProps} onChange={(e) =>  {setPatient({...patient, weight: e.target.value})}}/>              
                </div>
                <div style={{marginTop:"10px"}}>
                    <label>Diagnosis:</label>
                        <Select
                            styles={styleSelect2}
                            classNamePrefix="select"
                            isSearchable={false}
                            options={optionsD}
                            onChange={(e) =>  {setPatient({...patient, diagnosis: e.value})}}
                        />                
             </div>
             <div style={{marginTop:"10px"}}>
                    <label>Symptoms:</label>
                        <Select
                            styles={styleSelect2}
                            classNamePrefix="select"
                            isMulti={true}
                            isSearchable={false}
                            options={optionsSymptoms}
                            onChange={handleChangeSymptoms}
                           
                        />                
             </div>

             <div style={{marginTop:"10px"}}>
             <label>Comorbidities:</label>     
             <Autocomplete
        sx={styleAutocomplete}
        onInputChange={(e) => {searchDisease(e.target.value)}}
        onChange={(event, newValue) => {
            setPatient({...patient, comorbidities:newValue})
        }}
        multiple
        id="tags-standard"
        options={comorbidities}
       getOptionLabel={(option) => option[0]+" "+option[1]}
       renderOption={(props, option) => (
        <li {...props} style={{fontFamily:"Metropolis"}}>{option.code}&nbsp;&nbsp;&nbsp;{option}</li>
      )}        
      
        renderInput={(params) => (
            <TextField
               {...params}
               InputProps = {{...params.InputProps, disableUnderline: true,style: { fontFamily:"Metropolis", fontStyle:"normal", fontWeight:"500", marginBlockStart:"4.6px", marginBlockEnd:"4.6px" }}}
               variant="standard"
               label=""
               placeholder="..."
               />
          )}
      />
             </div>


              <div style={{marginTop:"10px"}}>
                    <label>Post-medication effects:</label>
                    <TextField multiline style={styleTextFieldMultiline} InputProps={styleInputProps} onChange={(e) =>  {setPatient({...patient, postMedication: e.target.value})}}/>              
             </div>

             <div style={{marginTop:"10px"}}>
                    <label>Therapeutic procedures:</label>
                    <TextField multiline style={styleTextFieldMultiline} InputProps={styleInputProps} onChange={(e) =>  {setPatient({...patient, therapeuticProc: e.target.value})}}/>              
             </div>
                <button onClick={() => handleAddPatient()}>Add patient</button>
        </div>
        
        
        </div>

    );

}