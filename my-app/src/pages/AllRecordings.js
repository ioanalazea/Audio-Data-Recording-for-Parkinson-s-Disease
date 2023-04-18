import React, { useEffect, useState } from "react";
import { storage } from "../firebase/config.js";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import fileDownload from "js-file-download";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import ReactLoading from "react-loading";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function AllRecordings() {
  const title = {
    fontFamily: "Metropolis",
    fontStyle: "bold",
    fontWeight: "800",
    fontSize: "38px",
    lineHeight: "40px",
    color: "#323031",
  };
  const [isLoading, setIsLoading] = useState(false);

  const [recordingRefs, setRecordingRefs] = useState([]);
  //const [recordingRefs, setRecordingRefs] = useState([])
  const getRecordingRefs = () => {
    // Create a reference under which you want to list
    const listRef = ref(storage, "recordings/");

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          getDownloadURL(itemRef)
            .then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = "blob";
              xhr.onload = (event) => {
                const blob = xhr.response;
                //recordingRefs.push({name:itemRef.name, url:url, blob:blob})
                setRecordingRefs((oldArray) => [
                  ...oldArray,
                  { name: itemRef.name, url: url, blob: blob },
                ]);
                setIsLoading(false);
              };
              xhr.open("GET", url);
              xhr.send();
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getRecordingRefs();
  }, []);

  const downloadData = () => {
    recordingRefs.map((item) => {
      fileDownload(item.blob, item.name);
      return 1;
    });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recordingRefs.length) : 0;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div style={title}> All recordings </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="#219EBC"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 500, border: "4px solid #323031" }}
            aria-label="custom pagination table"
          >
            <TableHead sx={{ background: "#219EBC" }}>
              <TableRow>
                <TableCell sx={{ fontFamily: "Metropolis", fontSize: "20px" }}>
                  <b>Recording name</b>
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "Metropolis", fontSize: "20px" }}
                  align="right"
                >
                  <b>Audio</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? recordingRefs.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : recordingRefs
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    sx={{
                      fontFamily: "Metropolis",
                      fontWeight: "400",
                      color: "black",
                      fontSize: "16px",
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    style={{ width: 160, paddingRight: 20 }}
                    align="right"
                  >
                    <audio controls src={row.url}></audio>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={recordingRefs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      <div
        style={{
          paddingTop: "15px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={downloadData} className="button-style-blue">
          <div className="button-text-style1">Download all data</div>
        </button>
      </div>
    </div>
  );
}
