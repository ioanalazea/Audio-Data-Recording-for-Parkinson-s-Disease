import React, { useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { database } from "../firebase/config.js";
import { storage } from "../firebase/config.js";
import { ref, remove } from "firebase/database";
import { ref as refStorage, listAll, deleteObject } from "firebase/storage";

import Swal from "sweetalert2";
export default function PatientDeleteCard({ patient, deleted, setDeleted }) {
  const styleBody = {
    overflow: "auto",
    width: "390px",
    height: "80px",
    backgroundColor: "#9bd9e8",
    shadowOpacity: 3,
    shadowRadius: 10,
    border: "4px solid #219EBC",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "20px",
  };

  const styleSquare = {
    width: "49px",
    height: "49px",
    backgroundColor: "#9bd9e8",
    border: "3px solid #219EBC",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const nameContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const buttonsContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "10px",
  };
  const nameStyle = {
    fontFamily: "Metropolis",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "14px",
    lineheight: "14px",
    color: "#323031",
    paddingLeft: "10px",
  };

  const deletePatient = (patient) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#219EBC",
      cancelButtonColor: "#b0373f",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Get a reference to the node you want to delete
        const dbRef = ref(
          database,
          "users/" + patient.userKey + "/patients/" + patient.key
        );

        // Delete the node
        remove(dbRef)
          .then(() => {
            console.log("Node deleted successfully.");
          })
          .catch((error) => {
            console.error("Error deleting node:", error);
          });

        //DELETE all recordings of that patient
        const listRef = refStorage(storage, "recordings/");
        // Find all the prefixes and items.
        listAll(listRef).then((res) => {
          res.items.forEach((itemRef) => {
            var recordingName = itemRef.name;

            if (recordingName.includes(patient.key)) {
              //delete recording here
              // Delete the file
              deleteObject(itemRef)
                .then(() => {
                  console.log("File deleted successfully.");
                  // File deleted successfully
                })
                .catch((error) => {
                  console.error("Error deleting file:", error);
                  // Uh-oh, an error occurred!
                });
            }
          });
        });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Patient has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
        setDeleted(!deleted);
      }
    });
  };

  return (
    <div>
      <div style={styleBody}>
        <div style={{ paddingLeft: "10px" }}>
          <div style={styleSquare}>
            <PersonOutlineOutlinedIcon
              fontSize="large"
              sx={{ color: "#219EBC" }}
            ></PersonOutlineOutlinedIcon>
          </div>
        </div>
        <div style={nameContainer}>
          <div style={nameStyle}>
            Patient
            {patient.key}
          </div>
        </div>
        <div style={buttonsContainer}>
          <button
            className="button-style-ver3"
            style={{ backgroundColor: "#b0373f", border: "1px solid #b0373f" }}
            onClick={() => deletePatient(patient)}
          >
            <div className="button-text-style2" style={{ color: "#ffffff" }}>
              Delete
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
