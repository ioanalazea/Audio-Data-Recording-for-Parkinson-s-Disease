import { useState, useEffect } from "react";
import { deleteAudio } from "../handlers/recordings-list";
import generateKey from "../utils/generate-key";

export default function useRecordingsList(audio, vowel) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio){
      var exists = 0
      recordings.map((record) => {
        if (record.key === vowel)
        exists = 1
      }
      )
      if (exists === 0)
      setRecordings((prevState) => {
        return [...prevState, { key: vowel, audio }];
      });
      else{
        setRecordings(existingRecordings => {

          return existingRecordings.map((record) => {
      
            return record.key === vowel? {key:vowel, audio}: record;
      
          })
        })
      }
    }
    
    
    
  }, [audio]);

  return {
    recordings,
    deleteAudio: (audioKey) => deleteAudio(audioKey, setRecordings),
  };
}