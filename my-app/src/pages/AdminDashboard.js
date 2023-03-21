import React from "react";
import AllRecordings from "./AllRecordings";
import AdminSidebar from "../components/AdminSidebar";
export default function AdminDashboard() {
  
  return (
    <div style={{background:"#FAFAFA"}}>
     <AdminSidebar></AdminSidebar>

      <div style={{ paddingRight: "100px", paddingLeft: "100px" }}>
        <AllRecordings></AllRecordings>
      </div>
    </div>
  );
}
