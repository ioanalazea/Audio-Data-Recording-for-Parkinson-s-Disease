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

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const columns = [
  { id: "patientKey", label: "ID", minWidth: 110 },
  { id: "bmi", label: "BMI", minWidth: 100 },
  { id: "sex", label: "Sex", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 100 },
  { id: "symptoms", label: "Symptoms", minWidth: 170 },
  { id: "medication", label: "Medication", minWidth: 180 },
  { id: "comorbidities", label: "Comorbidities", minWidth: 200 },
  { id: "postMedication", label: "Post\u00a0medication", minWidth: 150 },
  {
    id: "therapeuticProc",
    label: "Therapeutic\u00a0procedures",
    minWidth: 130,
  },
  { id: "diagnosis", label: "Diagnosis", minWidth: 110 },
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
  const [statistics, setStatistics] = useState({});
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
        if (itemVal["patients"])
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
      setStatistics(getStatistics(patientsArray));
    });
  };

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getPatientData();
    setStatistics(getStatistics(patients));
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

  const getStatistics = (patients) => {
    var youngest = 200;
    var oldest = -1;
    var countMale = 0;
    var countFemale = 0;
    var countHealthy = 0;
    var countPd = 0;

    var forDeletion = 0;

    var fh = 0;
    var f1 = 0;
    var f2 = 0;
    var f3 = 0;
    var f4 = 0;
    var f5 = 0;

    var mh = 0;
    var m1 = 0;
    var m2 = 0;
    var m3 = 0;
    var m4 = 0;
    var m5 = 0;

    patients.forEach(function (patient) {
      if (patient.sex === "male") {
        countMale = countMale + 1;

        if (patient.diagnosis === "hc") mh = mh + 1;
        if (patient.diagnosis === "pd1") m1 = m1 + 1;
        if (patient.diagnosis === "pd2") m2 = m2 + 1;
        if (patient.diagnosis === "pd3") m3 = m3 + 1;
        if (patient.diagnosis === "pd4") m4 = m4 + 1;
        if (patient.diagnosis === "pd5") m5 = m5 + 1;
      }

      if (patient.sex === "female") {
        countFemale = countFemale + 1;

        if (patient.diagnosis === "hc") fh = fh + 1;
        if (patient.diagnosis === "pd1") f1 = f1 + 1;
        if (patient.diagnosis === "pd2") f2 = f2 + 1;
        if (patient.diagnosis === "pd3") f3 = f3 + 1;
        if (patient.diagnosis === "pd4") f4 = f4 + 1;
        if (patient.diagnosis === "pd5") f5 = f5 + 1;
      }

      if (patient.diagnosis === "hc") countHealthy = countHealthy + 1;
      else countPd = countPd + 1;

      if (patient.age < youngest) youngest = patient.age;

      if (patient.age > oldest) oldest = patient.age;

      if (patient.forDeletion === 1) forDeletion = 1;
    });

    return {
      youngest: youngest,
      oldest: oldest,
      countMale: countMale,
      countFemale: countFemale,
      countHealthy: countHealthy,
      countPd: countPd,
      forDeletion: forDeletion,
      mh: mh,
      m1: m1,
      m2: m2,
      m3: m3,
      m4: m4,
      m5: m5,
      fh: fh,
      f1: f1,
      f2: f2,
      f3: f3,
      f4: f4,
      f5: f5,
    };
  };

  return (
    <div
      style={{
        background: "#FAFAFA",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <AdminSidebar></AdminSidebar>

      <div style={title}> Patients </div>

      <div>
        <div style={subTitle}> Delete requests </div>

        <div style={{ paddingLeft: "100px" }}>
          {statistics.forDeletion === 0 ? (
            <div style={{ paddingBottom: "30px" }}>
              You don't have any delete requests...
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <div style={subTitle}> Overview </div>

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
      <div style={subTitle}> Statistics </div>
      <div style={{ paddingLeft: "100px" }}>
        <div>
          <b>Youngest patient:</b> {statistics.youngest} years old
        </div>
        <div>
          <b>Oldest patient:</b> {statistics.oldest} years old
        </div>
        <div style={{ marginTop: "20px" }}>
          <b>Female count:</b> {statistics.countFemale}
        </div>
        <div>
          <b>Male count:</b> {statistics.countMale}
        </div>
        <div style={{ marginTop: "20px" }}>
          <b>Healthy patients count:</b> {statistics.countHealthy}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <b>Parkinson patients count:</b> {statistics.countPd}
        </div>

        <BarChart
          width={500}
          height={300}
          data={[
            {
              name: "Healthy",
              female: statistics.fh,
              male: statistics.mh,
            },
            {
              name: "PD1",
              female: statistics.f1,
              male: statistics.m1,
            },
            {
              name: "PD2",
              female: statistics.f2,
              male: statistics.m2,
            },
            {
              name: "PD3",
              female: statistics.f3,
              male: statistics.m3,
            },
            {
              name: "PD4",
              female: statistics.f4,
              male: statistics.m4,
            },
            {
              name: "PD5",
              female: statistics.f5,
              male: statistics.m5,
            },
          ]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="female" fill="#219EBC" />
          <Bar dataKey="male" fill="#D4A373" />
        </BarChart>
      </div>
    </div>
  );
}
