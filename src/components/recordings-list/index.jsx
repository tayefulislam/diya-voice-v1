import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import useRecordingsList from "../../hooks/use-recordings-list";
import "./styles.css";

export default function RecordingsList({ audio }) {
  const { recordings, deleteAudio } = useRecordingsList(audio);

  const blob = recordings[0]?.audio;

  console.log(blob);

  const sendAudioFile = (file) => {
    const formData = new FormData();
    formData.append("audiofile", file);
    return fetch("https://diyavoicev1.priyopathshala.com/uploadAudio", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  };

  return (
    <div className="recordings-container">
      {recordings.length > 0 ? (
        <>
          <h1>Your recordings</h1>
          <div className="recordings-list">
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                <audio controls src={window.URL.createObjectURL(blob)} />
                <div className="delete-button-container">
                  <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button onClick={() => sendAudioFile(blob)}>Send</button>
          </div>
        </>
      ) : (
        <div className="no-records">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            size="2x"
            color="#f2ea02"
          />
          <span>You don't have records</span>
        </div>
      )}
    </div>
  );
}
