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

const columns = [
  { id: "bmi", label: "BMI", minWidth: 100 },
  { id: "comorbidities", label: "Comorbidities", minWidth: 170 },
  { id: "diagnosis", label: "Diagnosis", minWidth: 100 },
  { id: "height", label: "Height", minWidth: 100 },
  { id: "medication", label: "Medication", minWidth: 170 },
  { id: "comorbidities", label: "Comorbidities", minWidth: 100 },
  { id: "postMedication", label: "Post\u00a0medication", minWidth: 100 },
  { id: "therapeuticProc", label: "Therapeutic\u00a0procedures", minWidth: 100 },
  { id: "sex", label: "Sex", minWidth: 100 },
  { id: "symptoms", label: "Symptoms", minWidth: 170 },
  { id: "weight", label: "Weight", minWidth: 100 },
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
  const headers = [
    { label: "BMI", key: "bmi" },
    { label: "Comorbidities", key: "comorbidities" },
    { label: "Diagnosis", key: "diagnosis" },
    { label: "Height", key: "height" },
    { label: "Medication", key: "medication" },
    { label: "Post medication", key: "postMedication" },
    { label: "Sex", key: "sex" },
    { label: "Symptoms", key: "symptoms" },
    { label: "Therapeutic procedures", key: "therapeuticProc" },
    { label: "Weight", key: "weight" },
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
      console.log(item);
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
            height: value["height"],
            medication: getMedication(value["medication"]),
            postMedication: value["postMedication"],
            sex: value["sex"],
            symptoms: value["symptoms"].toString(),
            therapeuticProc: value["therapeuticProc"],
            weight: value["weight"],
          });
        }
      });
      setPatients(patientsArray);
    });
  };
  useEffect(() => {
    getPatientData();
    console.log(csvReport.data);
  }, []);

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
