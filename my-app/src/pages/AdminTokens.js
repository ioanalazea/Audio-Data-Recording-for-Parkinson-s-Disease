import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import AdminSidebar from "../components/AdminSidebar.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import TokenIcon from "@mui/icons-material/Token";
import EmailIcon from "@mui/icons-material/Email";
import emailjs from "@emailjs/browser";
import { TextField, Typography } from "@material-ui/core";
import { database } from "../firebase/config.js";
import { ref, push, get } from "firebase/database";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

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

  const styleTextField = {
    backgroundColor: "#F6F6F6",
    border: "4px solid #323031",
    borderRadius: "30px",
    paddingRight: "10px",
    paddingLeft: "10px",
    display: "block",
    width: "120px",
    align: "center",
    marginBottom: "15px",
    marginTop: "10px",
  };

  const [numTokens, setNumTokens] = React.useState(1);
  const [generatedTokens, setGeneratedTokens] = React.useState([]);
  const [error, setError] = React.useState("");
  const [tokenCount, setTokenCount] = useState({ available: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const getTokens = () => {
    var tokensRef = ref(database, "tokens/");
    get(tokensRef).then(function (snapshot) {
      var available = 0;
      var total = 0;
      snapshot.forEach(function (item) {
        total = total + 1;
        if (item.val().used === 0) available = available + 1;
      });
      console.log(available, total);
      setTokenCount({ available: available, total: total });
    });
  };

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getTokens();
    console.log(tokenCount);
  }, [refresh]);

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setNumTokens(e.target.value);
    }
  };

  const generateTokens = (number) => {
    if (number > 20) setError("Number of tokens is too big!");
    else {
      var tokensArray = [];
      for (let i = 0; i < number; i++) {
        tokensArray.push(uuid());
      }
      setGeneratedTokens(tokensArray);
      setError("");
    }
  };

  const [email, setEmail] = useState("");
  const saveTokens = async (tokens, send) => {
    if (send === 0) {
      for (let i = 0; i < tokens.length; i++) {
        push(ref(database, "tokens/"), {
          token: tokens[i],
          used: 0,
        })
          .then()
          .catch((error) => setError(error));
      }

      setGeneratedTokens([]);
      setError("");
      setEmail("");
      setNumTokens(1);
      setRefresh(!refresh);
    } else if (send === 1) {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (emailPattern.test(email)) {
        for (let i = 0; i < tokens.length; i++) {
          push(ref(database, "tokens/"), {
            token: tokens[i],
            used: 0,
          })
            .then()
            .catch((error) => setError(error));
        }

        var text = "";
        for (let i = 0; i < tokens.length; i++) {
          text = text + tokens[i] + "\n\n\n";
        }

        setIsLoading(true);
        await emailjs
          .send(
            "service_b5d39lg",
            "template_75wk0ng",
            {
              tokens: text,
              email: email,
            },
            "0Fwwg2pNCwo6zOeXJ"
          )
          .then(
            function (response) {
              setIsLoading(false);
              Swal.fire({
                icon: "success",
                title: "Email has been sent!",
                showConfirmButton: false,
                timer: 1500,
              });
            },
            function (error) {
              console.log(error);
            }
          );
        setGeneratedTokens([]);
        setError("");
        setEmail("");
        setNumTokens(1);
        setRefresh(!refresh);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter a valid email!",
          confirmButtonColor: "#219ebc",
        });
      }
    }
  };

  return (
    <div style={{ background: "#FAFAFA", width: "100vw", height: "100vh" }}>
      <AdminSidebar></AdminSidebar>

      <div style={title}> Tokens </div>

      <div>
        <div style={subTitle}> Overview </div>
        <div
          style={{
            paddingLeft: "100px",
          }}
        >
          <table
            style={{
              border: "5px solid #219ebc",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ border: "3px solid #219ebc", padding: "10px" }}>
                  Total
                </td>
                <td style={{ border: "3px solid #219ebc", padding: "10px" }}>
                  Available
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {tokenCount.total}
                </td>
                <td style={{ border: "1px solid black", padding: "10px" }}>
                  {tokenCount.available}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={subTitle}> Generate token </div>

        <div style={{ paddingLeft: "100px" }}>
          <label>How many tokens do you want to generate?</label>
          <TextField
            style={styleTextField}
            type="number"
            value={numTokens}
            onChange={(e) => handleChange(e)}
            InputProps={{
              inputProps: { min: 1, max: 20, step: "any" },
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <TokenIcon />
                </InputAdornment>
              ),
            }}
          />
          <Typography>{error}</Typography>
          <button
            className="button-style-blue"
            onClick={() => generateTokens(numTokens)}
          >
            <div className="button-text-style1">Generate tokens</div>
          </button>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}
          >
            {generatedTokens.length !== 0 ? (
              <div style={{ marginTop: "15px" }}>
                <Typography
                  style={{
                    fontFamily: "Metropolis",
                    fontWeight: 700,
                    marginBottom: "5px",
                  }}
                >
                  {" "}
                  Generated tokens:{" "}
                </Typography>
                {generatedTokens.map((token) => (
                  <label>
                    {token}
                    <br />
                    <br />
                  </label>
                ))}
              </div>
            ) : (
              <></>
            )}
            {generatedTokens.length !== 0 ? (
              <div style={{ marginLeft: "100px" }}>
                {isLoading ? (
                  <div style={{ marginLeft: "140px", marginBottom: "20px" }}>
                    {" "}
                    <ReactLoading
                      type="spokes"
                      color="#219EBC"
                      height={70}
                      width={70}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <TextField
                  style={{
                    ...styleTextField,
                    ...{ width: "290px", marginLeft: "15px" },
                  }}
                  placeholder="Email address to send"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <button
                  className="button-style-blue"
                  style={{ marginLeft: "20px" }}
                  onClick={() => saveTokens(generatedTokens, 0)}
                >
                  <div className="button-text-style1">Only save tokens</div>
                </button>

                <button
                  className="button-style-blue"
                  style={{ marginLeft: "20px" }}
                  onClick={() => saveTokens(generatedTokens, 1)}
                >
                  <div className="button-text-style1">Save tokens & email</div>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
