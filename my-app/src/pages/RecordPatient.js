import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useLocation } from "react-router-dom";
 
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

import RecorderControls from "../components/RecorderControls";
import RecordingsList from "../components/RecordingsList";
import useRecorder from "../hooks/useRecorder.js";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #323031',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: 
        'Metropolis',
      '&:focus': {
        borderRadius: 4,
        borderColor: "#219EBC",
        boxShadow: '0 0 0 0.2rem rgba(33, 158, 188,.25)',
      },
    },
  }));
  
export default function RecordPatient(){
   
    const headerStyle ={
        marginTop:"20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",   
    }

    const textBack = {
        fontFamily: 'Metropolis',
        fontStyle: 'bold',
        fontWeight: '400',
        fontSize: '20px',
        lineHeight: '20px',
        color: '#219EBC',
    }

    const textRecord = {
        paddingRight:"50px",
        paddingLeft:"25px",
        fontFamily: 'Metropolis',
        fontStyle: 'bold',
        fontWeight: '700',
        fontSize: '32px',
        lineHeight: '32px',
        color: '#323031',
    }

    const containerStyle ={
       
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",   
    }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #323031',
    borderRadius:"5%",
    p: 4,
  };






  const location = useLocation();
  // get patient key
  let patientKey = location.state.patientKey;

  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const [vowel, setVowel] = useState("A");

  const handleSelectVowel = (e) => {
    e.preventDefault();
    setVowel(e.target.value)
  };

 
    return(
        <div>

            <div style={headerStyle}>
                <Link style={textBack} to="/home/viewpatients"> Back </Link>
                <div style={textRecord}>Record patient</div>
            </div>

            <div style={containerStyle}>
            <RecorderControls recorderState={recorderState} handlers={handlers} />

                <Button onClick={handleOpen}>
                    <HelpOutlineOutlinedIcon sx={{ color:  "#323031", fontSize:"40px"}} ></HelpOutlineOutlinedIcon>
                    <div style={{fontFamily:"Metropolis", fontWeight:"600", fontSize:"16px", color:"#323031", marginLeft:"10px"}}>How do I record?</div>
                </Button>

                <Modal
                open={open}
                onClose={handleClose}
                >
                    <Box sx={styleModal}>
                        <Typography  variant="h6" component="h2" sx={{fontFamily:"Metropolis", fontWeight:"600"}}>
                            How do I record?
                        </Typography>
                        <Typography  sx={{ mt: 2, fontFamily:"Metropolis"}}>
                            To record, please first select the vowel that you want to record an audio for. Afterwards, the patient should pronunce the given vowel. Listen to the audio again to make sure everything is alright. If not, 
                        you can delete it and record again.
                        </Typography>
                    </Box>
                </Modal>





                <FormControl sx={{ m: 1,minWidth: 230}} variant="standard">
                    <InputLabel style={{fontFamily:"Metropolis", fontWeight:"600", fontSize:"20px", color:"#219EBC"}}>Select vowel</InputLabel>
                    <Select
                    input={<BootstrapInput />}
                    value={vowel}
                    onChange={handleSelectVowel}
                    >
                        <MenuItem value={"A"} style={{fontFamily:"Metropolis", fontWeight:"400"}}>A</MenuItem>
                        <MenuItem value={"E"} style={{fontFamily:"Metropolis", fontWeight:"400"}}>E</MenuItem>
                        <MenuItem value={"I"} style={{fontFamily:"Metropolis", fontWeight:"400"}}>I</MenuItem>
                        <MenuItem value={"O"} style={{fontFamily:"Metropolis", fontWeight:"400"}}>O</MenuItem>
                        <MenuItem value={"U"} style={{fontFamily:"Metropolis", fontWeight:"400"}}>U</MenuItem>
                    </Select>
                </FormControl>

                
            </div>

        <RecordingsList patientKey={patientKey} audio={audio} vowel={vowel}/>
        </div>
    );
}