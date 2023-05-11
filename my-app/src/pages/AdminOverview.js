import React, { useEffect, useState } from "react";
import { storage } from "../firebase/config.js";
import { ref, listAll } from "firebase/storage";
import AdminSidebar from "../components/AdminSidebar.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";
export default function AdminOverview() {
  const title = {
    paddingLeft: "100px",
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "800",
    fontSize: "38px",
    lineHeight: "40px",
    color: "#323031",
  };

  const [recordings, setRecordings] = useState([]);
  const extractMonthRecName = (name) => {
    const date = name.split("~")[2];
    const month = date.split(".")[0];
    if (month === "01") return "Jan";
    else if (month === "02") return "Feb";
    else if (month === "03") return "Mar";
    else if (month === "04") return "Apr";
    else if (month === "05") return "May";
    else if (month === "06") return "Jun";
    else if (month === "07") return "Jul";
    else if (month === "08") return "Aug";
    else if (month === "09") return "Sep";
    else if (month === "10") return "Oct";
    else if (month === "11") return "Nov";
    else if (month === "12") return "Dec";
  };

  const extractYearRecName = (name) => {
    const date = name.split("~")[2];
    const year = date.split(".")[1];
    return year;
  };

  const extractVowel = (name) => {
    const str = name.split("~")[5];
    const vowel = str.split(".")[0];
    return vowel;
  };

  const extractDiagnosis = (name) => {
    const str = name.split("~")[4];
    return str;
  };

  const getRecsPerMonth = (recordings) => {
    var data = [
      {
        name: "Jan",
        nrRec: 0,
      },
      {
        name: "Feb",
        nrRec: 0,
      },
      {
        name: "Mar",
        nrRec: 0,
      },
      {
        name: "Apr",
        nrRec: 0,
      },
      {
        name: "May",
        nrRec: 0,
      },
      {
        name: "Jun",
        nrRec: 0,
      },
      {
        name: "Jul",
        nrRec: 0,
      },
      {
        name: "Sep",
        nrRec: 0,
      },
      {
        name: "Oct",
        nrRec: 0,
      },
      {
        name: "Nov",
        nrRec: 0,
      },
      {
        name: "Dec",
        nrRec: 0,
      },
    ];
    recordings.forEach((item) => {
      const month = extractMonthRecName(item);
      const year = extractYearRecName(item);
      data.forEach((i) => {
        if (i.name === month && year == new Date().getFullYear())
          i.nrRec = i.nrRec + 1;
      });
    });
    return data;
  };

  const getRecsBasedOnVowels = (recordings) => {
    var data = [
      {
        name: "A",
        nrRec: 0,
      },
      {
        name: "E",
        nrRec: 0,
      },
      {
        name: "I",
        nrRec: 0,
      },
      {
        name: "O",
        nrRec: 0,
      },
      {
        name: "U",
        nrRec: 0,
      },
    ];
    recordings.forEach((item) => {
      const vowel = extractVowel(item);

      data.forEach((i) => {
        if (i.name === vowel) i.nrRec = i.nrRec + 1;
      });
    });
    return data;
  };

  const getRecsBasedOnDiagnosis = (recordings) => {
    var data = [
      {
        name: "PD Stage 1",
        short: "pd1",
        nrRec: 0,
      },
      {
        name: "PD Stage 2",
        short: "pd2",
        nrRec: 0,
      },
      {
        name: "PD Stage 3",
        short: "pd3",
        nrRec: 0,
      },
      {
        name: "PD Stage 4",
        short: "pd4",
        nrRec: 0,
      },
      {
        name: "PD Stage 5",
        short: "pd5",
        nrRec: 0,
      },
      {
        name: "Healthy Control",
        short: "hc",
        nrRec: 0,
      },
    ];
    recordings.forEach((item) => {
      const diagnosis = extractDiagnosis(item);

      data.forEach((i) => {
        if (i.short === diagnosis) i.nrRec = i.nrRec + 1;
      });
    });
    return data;
  };

  const getRecordingsInfo = () => {
    const recRef = ref(storage, "recordings/");

    // Find all the prefixes and items.
    listAll(recRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          setRecordings((oldArray) => [...oldArray, itemRef.name]);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  useEffect(() => {
    getRecordingsInfo();
  }, []);

  return (
    <div style={{ background: "#FAFAFA", width: "100vw", height: "100vh" }}>
      <AdminSidebar></AdminSidebar>
      <div style={title}> Overview </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#e8e8e8",
          marginLeft: "100px",
          marginRight: "100px",
          paddingTop: "20px",
          paddingBottom: "50px",
          borderRadius: "10px",
        }}
      >
        <Card
          sx={{
            width: "258px",
            height: "134px",
            justifyContent: "center",
            display: "flex",
            ":hover": {
              boxShadow: 10,
              border: "3px solid #219EBC",
            },
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography
              sx={{ fontFamily: "Metropolis", fontSize: 17, fontWeight: 700 }}
              color="text.secondary"
              gutterBottom
            >
              Total number of recordings
            </Typography>

            <Typography
              sx={{ fontFamily: "Metropolis", fontSize: 40, fontWeight: 700 }}
              color="text.secondary"
            >
              {recordings.length}
            </Typography>
          </CardContent>
        </Card>
        <div style={{ paddingTop: "30px" }}>
          <Typography
            sx={{ fontFamily: "Metropolis", fontSize: 17, fontWeight: 700 }}
            color="text.secondary"
            gutterBottom
          >
            Number of recordings each month in {new Date().getFullYear()}
          </Typography>

          <BarChart width={730} height={250} data={getRecsPerMonth(recordings)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="nrRec" fill="#D4A373" />
          </BarChart>
        </div>

        <div style={{ paddingTop: "100px" }}>
          <Typography
            sx={{ fontFamily: "Metropolis", fontSize: 17, fontWeight: 700 }}
            color="text.secondary"
            gutterBottom
          >
            Number of recordings for each vowel
          </Typography>

          <BarChart
            width={730}
            height={250}
            data={getRecsBasedOnVowels(recordings)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="nrRec" fill="#219EBC" />
          </BarChart>
        </div>

        <div style={{ paddingTop: "100px" }}>
          <Typography
            sx={{ fontFamily: "Metropolis", fontSize: 17, fontWeight: 700 }}
            color="text.secondary"
            gutterBottom
          >
            Number of recordings for each diagnosis
          </Typography>

          <BarChart
            width={730}
            height={250}
            data={getRecsBasedOnDiagnosis(recordings)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="nrRec" fill="#D4A373" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
