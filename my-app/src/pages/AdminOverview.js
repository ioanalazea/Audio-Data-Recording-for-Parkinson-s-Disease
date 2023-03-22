import React, { useEffect, useState } from "react";
import { storage } from "../firebase/config.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
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
    /* identical to box height */
    color: "#323031",
  };
  const [recordingsCount, setRecordingsCount] = useState(0);
  const [patients, setPatients] = useState(0);

  const getRecordingsInfo = () => {
    const listRef = ref(storage, "recordings/");

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        var count = 0;
        res.items.forEach((itemRef) => {
          count = count + 1;
          // All the items under listRef.
          console.log(itemRef.name);
        });

        setRecordingsCount(count);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  useEffect(() => {
    getRecordingsInfo();
  }, []);

  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Sep",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Oct",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Nov",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
          background:"#e8e8e8",
          marginLeft:"100px",
          marginRight:"100px",
          paddingTop:"20px",
          paddingBottom:"50px",
          borderRadius:"10px"
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
              sx={{ fontFamily: "Metropolis", fontSize: 19, fontWeight: 700 }}
              color="text.secondary"
              gutterBottom
            >
              Number of recordings
            </Typography>

            <Typography
              sx={{ fontFamily: "Metropolis", fontSize: 40, fontWeight: 700 }}
              color="text.secondary"
            >
              {recordingsCount}
            </Typography>
          </CardContent>
        </Card>
        <div style={{paddingTop:"30px"}}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#D4A373" />
          <Bar dataKey="uv" fill="#219EBC" />
        </BarChart>
        </div>
      </div>
    </div>
  );
}
