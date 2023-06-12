import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";

export default function FileInput() {
  // FIles States
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  // FIle Picker Ref because we are not useing the standard File picker input
  const filePicekerRef = useRef(null);

  function previewFile(e) {
    // Reading New File (open file Picker Box)
    console.log("1", e.target.files[0]);
    const reader = new FileReader();

    // Gettting Selected File (user can select multiple but we are choosing only one)
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }

    // As the File loaded then set the stage as per the file type
    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("image")) {
        console.log(readerEvent.target.result);
        dispatch({ type: "IMAGE", value: readerEvent.target.result });
        setImagePreview(readerEvent.target.result);
      } else if (selectedFile.type.includes("video")) {
        setVideoPreview(readerEvent.target.result);
      }
    };
  }

  function clearFiles() {
    setImagePreview(null);
    setVideoPreview(null);
  }

  return (
    <div>
      <div className="btn-container">
        <input
          ref={filePicekerRef}
          accept="image/*, video/*"
          onChange={previewFile}
          type="file"
          hidden
        />

        <Button
          variant="contained"
          style={{
            backgroundColor: "#E2E3E4",
            color: "#000",
            margin: "10px",
            width: "100%",
            borderRadius: "50px",
          }}
          onClick={() => filePicekerRef.current.click()}
        >
          Browse FIle
        </Button>
      </div>
    </div>
  );
}
