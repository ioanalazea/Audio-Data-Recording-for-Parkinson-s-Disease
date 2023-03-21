import React, { useEffect, useState } from "react";
import { database } from "../firebase/config.js";
import { ref, get} from 'firebase/database';
import AdminSidebar from "../components/AdminSidebar.js";
export default function AdminOverview() {
const [usersCount, setUsersCount] = useState(0)
const [patients, setPatients] = useState(0)

const getUsers = () => {
    var dbRef = ref(database, "/users/9ApA6JHNYqNlaoa7mG1uK3pq0qB3/patients");
    get(dbRef).then( function(snapshot) {
      snapshot.forEach(function(item) {
        var itemVal = item.val();
        console.log(itemVal)
      }); 

      
    });
   
}
getUsers();
    useEffect(() => {
        
        //getPatients()
      }, []);
    return(
        <div style={{background:"#FAFAFA"}}>
        <AdminSidebar></AdminSidebar>
   
         
      
           </div>
    )
}