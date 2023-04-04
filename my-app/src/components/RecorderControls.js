import { formatMinutes, formatSeconds } from "../utils/format-time";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import StopCircleIcon from "@mui/icons-material/StopCircle";

export default function RecorderControls({ recorderState, handlers }) {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const recordButton = {
    backgroundColor: "#219EBC",
    border: "4px solid #323031",
    color: "white",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    width: "94px",
    height: "94px",
    margin: "4px 2px",
    borderRadius: "50%",
    marginTop: "30px",
    alignItems: "center",
    marginBottom: "30px",
  };

  const recordingTime = {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div>
      <div style={containerStyle}>
        <div className="start-button-container">
          {initRecording ? (
            <button
              style={recordButton}
              title="Save recording"
              disabled={recordingSeconds === 0}
              onClick={saveRecording}
            >
              <StopCircleIcon
                sx={{ color: "#323031", fontSize: "50px" }}
              ></StopCircleIcon>
            </button>
          ) : (
            <button
              style={recordButton}
              title="Start recording"
              onClick={startRecording}
            >
              <MicNoneOutlinedIcon
                sx={{ color: "#323031", fontSize: "50px" }}
              ></MicNoneOutlinedIcon>
            </button>
          )}
        </div>

        <div>
          <div style={recordingTime}>
            {initRecording && <div className="recording-indicator"></div>}
            <span>{formatMinutes(recordingMinutes)}</span>
            <span>:</span>
            <span>{formatSeconds(recordingSeconds)}</span>
          </div>
        </div>
        {initRecording && (
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <button
              className="button-style-blk-small"
              title="Cancel recording"
              onClick={cancelRecording}
            >
              <div className="button-text-style1-small">CANCEL</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
