import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function PatientInfo(){

    const styleBody = {
        width: 310,
        height: 79,
        backgroundColor: "#F6E5D4",
        shadowOpacity: 3,
        shadowRadius: 10,
        border: "4px solid #D4A373",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",   
    }

    const styleSquare = {
        width: "49px",
        height: "49px",
        backgroundColor: "#F6E5D4",
        border: "3px solid #D4A373",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
    }

    const namePhoneContainer = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }

    const nameStyle = {
        fontFamily: 'Metropolis',
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineheight: "14px",
        color: "#323031",
        paddingLeft:"10px"
    }

    const phoneStyle = {
        fontFamily: 'Metropolis',
        fontSize: "14px",
        lineheight: "14px",
        color: "#323031",
        paddingLeft:"10px"
    }
    return(
        <div>
            <div style={styleBody}>
                <div style={styleSquare}>
                    <PersonOutlineOutlinedIcon fontSize="large" sx={{color: "#D4A373"}} ></PersonOutlineOutlinedIcon>
                </div>
                <div style={namePhoneContainer}>
                   <div style={nameStyle}>Patient One</div>
                   <div style={phoneStyle}>074634564</div>
                </div>

                <button>Record</button>
                <button>Details</button>

            </div>
        </div>
    )

}