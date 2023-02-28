import useRecordingsList from "../hooks/use-recordings-list";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { storage } from "../firebase/config.js";
import { ref, uploadBytes } from 'firebase/storage';
import { auth } from "../firebase/config.js";

export default function RecordingsList({patientKey, audio, vowel }) {


    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",   
    }

    const noRecords = {
        marginTop:"10px",
        fontFamily: 'Metropolis',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '32px',
        color: '#323031',
        
    }

    const yourRecordings = {
      marginTop:"10px",
      fontFamily: 'Metropolis',
      fontWeight: '700',
      fontSize: '32px',
      lineHeight: '32px',
      color: '#323031',
      
  }

  const vowelType = {
    marginTop:"10px",
    fontFamily: 'Metropolis',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '32px',
    color: '#323031',
    paddingRight:"10px"
    
}



  const { recordings, deleteAudio } = useRecordingsList(audio, vowel);

  
  const handleSaveRecordings = () => {
   /* if (recordings.length < 5){
      alert('Please record audios for all the vowels!')
    }
    else{

    }*/
   // uploadBytes(ref(storage, 'users/'),recordings[0].audio).then(function(snapshot) {
    //  console.log('Uploaded a blob or file!');
 //  })    
 
 //uploadBytes(ref(storage, 'users/'),recordings[0]).then(function(snapshot) {
  // console.log('Uploaded a blob or file!')})

  }

  return (
    <div style={containerStyle}>
      {recordings.length > 0 ? (
        <>
          <h1 style={yourRecordings}>Recordings</h1>
          <div className="recordings-list">
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                <div style={vowelType}>{record.key}: </div>
                <audio controls src={record.audio} />
                <div className="delete-button-container">
                   { console.log(record.audio)}
                  <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                    <DeleteForeverIcon></DeleteForeverIcon>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="button-style-blk" onClick={handleSaveRecordings}>
            <div className="button-text-style1">Save</div>
          </button>
        </>
      ) : (
        <div style={noRecords}>
          <span>You don't have any recordings.</span>
        </div>
      )}
    </div>
  );
}