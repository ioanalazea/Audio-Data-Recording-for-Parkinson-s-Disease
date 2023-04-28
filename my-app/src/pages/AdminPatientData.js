import React, { useEffect, useState } from "react";
import { database } from "../firebase/config.js";
import { ref, get } from "firebase/database";
import { CSVLink } from "react-csv";
import AdminSidebar from "../components/AdminSidebar.js";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { encryptStorage } from "../encryption/Encrypt.js";
import PatientDeleteCard from "../components/PatientDeleteCard.js";

const columns = [
  { id: "patientKey", label: "ID", minWidth: 100 },
  { id: "bmi", label: "BMI", minWidth: 100 },
  { id: "sex", label: "Sex", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 100 },
  { id: "symptoms", label: "Symptoms", minWidth: 170 },
  { id: "medication", label: "Medication", minWidth: 180 },
  { id: "comorbidities", label: "Comorbidities", minWidth: 200 },
  { id: "postMedication", label: "Post\u00a0medication", minWidth: 100 },
  {
    id: "therapeuticProc",
    label: "Therapeutic\u00a0procedures",
    minWidth: 100,
  },
  { id: "diagnosis", label: "Diagnosis", minWidth: 100 },
];

export default function AdminPatientData() {
  const title = {
    paddingLeft: "100px",
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "800",
    fontSize: "38px",
    lineHeight: "40px",
    color: "#323031",
    marginBottom: "20px",
  };

  const subTitle = {
    paddingLeft: "100px",
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "800",
    fontSize: "28px",
    lineHeight: "40px",
    color: "#323031",
    marginBottom: "20px",
  };
  const headers = [
    { label: "ID", key: "patientKey" },
    { label: "BMI", key: "bmi" },
    { label: "Sex", key: "sex" },
    { label: "Age", key: "age" },
    { label: "Symptoms", key: "symptoms" },
    { label: "Medication", key: "medication" },
    { label: "Comorbidities", key: "comorbidities" },
    { label: "Post medication", key: "postMedication" },
    { label: "Therapeutic procedures", key: "therapeuticProc" },
    { label: "Diagnosis", key: "diagnosis" },
  ];

  const [patients, setPatients] = useState([]);
  const csvReport = {
    data: patients,
    headers: headers,
    filename: "Parkinsons_Data.csv",
  };

  const getMedication = (array) => {
    var string = "";
    array.forEach((item) => {
      if (item) string = string + item["id"] + ", " + item["drugname"] + "; ";
    });
    return string;
  };
  const getPatientData = () => {
    const dbRef = ref(database, "users/");
    get(dbRef).then(function (snapshot) {
      var patientsArray = [];

      snapshot.forEach(function (item) {
        var itemVal = item.val();
        for (const [key, value] of Object.entries(itemVal["patients"])) {
          patientsArray.push({
            bmi: value["bmi"],
            comorbidities: value["comorbidities"].toString(),
            diagnosis: value["diagnosis"],
            age: encryptStorage.decryptValue(value["age"]),
            medication: getMedication(value["medication"]),
            postMedication: value["postMedication"],
            sex: value["sex"],
            symptoms: value["symptoms"].toString(),
            therapeuticProc: value["therapeuticProc"],
            forDeletion: value["forDeletion"],
            userKey: item.key,
            patientKey: key.toString().substring(1),
            key: key,
          });
        }
      });
      setPatients(patientsArray);
    });
  };

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getPatientData();
  }, [deleted]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ background: "#FAFAFA", width: "100vw", height: "100vh" }}>
      <AdminSidebar></AdminSidebar>

      <div style={title}> Patient data </div>

      <div>
        <div style={subTitle}> Delete requests </div>

        <div style={{ paddingLeft: "100px" }}>
          {patients.map((patient) => {
            if (patient.forDeletion === 1)
              return (
                <PatientDeleteCard
                  key={patient.key}
                  patient={patient}
                  deleted={deleted}
                  setDeleted={setDeleted}
                ></PatientDeleteCard>
              );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{ width: "90%", overflow: "hidden", border: "4px solid black" }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{
                        fontFamily: "Metropolis",
                        fontSize: "20px",
                        fontWeight: 700,
                        background: "#219EBC",
                      }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {patients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{
                                fontFamily: "Metropolis",
                                fontWeight: "400",
                                color: "black",
                                fontSize: "16px",
                              }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={patients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <button
          className="button-style-blue"
          style={{ height: "50px", width: "150px", marginTop: "35px" }}
        >
          <div className="button-text-style1">
            <CSVLink
              className="button-text-style1"
              filename={csvReport.filename}
              data={csvReport.data}
              headers={headers}
            >
              Download as csv
            </CSVLink>
          </div>
        </button>
      </div>
    </div>
  );
}
