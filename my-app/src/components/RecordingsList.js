import useRecordingsList from "../hooks/use-recordings-list";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import { storage } from "../firebase/config.js";
import { ref, uploadBytes } from "firebase/storage";
import { auth } from "../firebase/config.js";

export default function RecordingsList({
  patientKey,
  audio,
  vowel,
  recordedBlob,
}) {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const noRecords = {
    marginTop: "10px",
    fontFamily: "Metropolis",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "32px",
    color: "#323031",
  };

  const yourRecordings = {
    marginTop: "10px",
    fontFamily: "Metropolis",
    fontWeight: "700",
    fontSize: "32px",
    lineHeight: "32px",
    color: "#323031",
  };

  const vowelType = {
    marginTop: "10px",
    fontFamily: "Metropolis",
    fontWeight: "700",
    fontSize: "16px",
    lineHeight: "32px",
    color: "#323031",
    paddingRight: "10px",
  };

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return mm + "." + dd + "." + yyyy;
  };

  const { recordings, deleteAudio } = useRecordingsList(
    audio,
    vowel,
    recordedBlob
  );

  const handleSaveRecordings = () => {
    if (recordings.length < 5) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please record an audio for all of the 5 vowels!",
        confirmButtonColor: "#219EBC",
      });
    } else {
      var today = getDate();
      var success = 0;
      var storageRef = ref(
        storage,
        "users/" + auth.currentUser?.uid + "/patients/" + patientKey
      );

      for (let i = 0; i < 5; i++) {
        var recordingRef = ref(
          storageRef,
          "recording_" +
            patientKey +
            "_" +
            today +
            "_" +
            recordings[i].key +
            ".mp3"
        );

        var metadata = {
          contentType: "audio/mp3",
        };
        uploadBytes(
          ref(recordingRef),
          recordings[i].recordedBlob,
          metadata
        ).then(function (snapshot) {
          success = 1;
          console.log("Uploaded recording succefully!");
        });
        if (success === 1)
          Swal.fire({
            icon: "success",
            title: "Uploaded recordings successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        else
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#219EBC",
          });
      }
    }
  };

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
