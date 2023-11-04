import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { green, red } from '@mui/material/colors';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Button from '@mui/material/Button';
import "../styles/Dashboard.css";
const Dashboard = () => {
  const URL = "http://localhost:5122/api/BookModels";
  const [done, setDone] = useState(undefined);
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setDone(true);
    }, 1000);
  }, []);
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log("Hello world!!");
  //     window.location.reload();
  //   },100000);
  // },[]);
  const fetchData = () => {
    axios.get(URL).then((response) => {
      setBookList(response.data)
    }).catch((error) => { console.log(error); })
  }
  const renderElement = (e) => {
    if (e) {
      return <TableCell align="center"><VerifiedOutlinedIcon sx={{ color: green[500] }} /></TableCell>
    } else {
      return <TableCell align="center"><CancelOutlinedIcon sx={{ color: red[500] }} /></TableCell>
    }
  }
  const buttonYesOrNo = (e) => {
    if (e.isVerify) {
      return (
        <TableCell align="center"><div className="dash-btn-disabled" onClick={() => unVerify(e)}><button> Unverify</button></div></TableCell>
      );
    } else {
      return <TableCell align="center"><div className="dash-btn" onClick={() => verify(e)}><button>Verify</button></div></TableCell>
    }
  }

  const verify = async (e) => {
    try {
      const serverURL = `http://localhost:5122/api/BookModels/admin/${e.bookID}`;
      const { bookID, bookName, bookAuthorName, bookDescription, bookDownloadLink, uploaderEmail, uploaderName, uploaderPassword } = e;
      const res = await fetch(serverURL, {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          bookID,
          bookName,
          bookAuthorName,
          bookDescription,
          bookDownloadLink,
          uploaderEmail,
          uploaderName,
          uploaderPassword,
          isVerify: true
        })
      });
      if (res.status === 200) {
        window.location.reload();
      } else {
        window.location.reload();
        window.alert("Error: " + res.status);
      }
    } catch (e) {

    }
  }
  const unVerify = async (e) => {
    try {
      const serverURL = `http://localhost:5122/api/BookModels/admin/${e.bookID}`;
      const { bookID, bookName, bookAuthorName, bookDescription, bookDownloadLink, uploaderEmail, uploaderName, uploaderPassword } = e;
      const res = await fetch(serverURL, {
        method: 'PUT',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          bookID,
          bookName,
          bookAuthorName,
          bookDescription,
          bookDownloadLink,
          uploaderEmail,
          uploaderName,
          uploaderPassword,
          isVerify: false
        })
      });
      if (res.status === 200) {
        window.location.reload();
      } else {
        window.location.reload();
        window.alert("Error: " + res.status);
      }
    } catch (e) {

    }
  }
  return (
    <>
      {
        !done ? (
          <ReactLoading
            type={"spin"}
            color={"#1e90ff"}
            height={100}
            width={100}
            className="preloader"
          />
        ) : (
          <>
            {/* <div className="stats">
            <p>Total number of books are: {totalCount}</p>
            <p >Verified number of books are: <span className='verify'>{verifiedCount}</span></p>
            <p>Unverified number of books are: <span className="unverify">{unVerifiedCount}</span></p>
          </div> */}
            <br /><br /><br /><br />
            <div className="table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }} stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant='h6' gutterBottom>No:</Typography></TableCell>
                      <TableCell align="center"><Typography variant='h6' gutterBottom>Book name:</Typography></TableCell>
                      <TableCell align="center"><Typography variant='h6' gutterBottom>Author name:</Typography></TableCell>
                      <TableCell align="center"><Typography variant='h6' gutterBottom>Visit link:</Typography></TableCell>
                      <TableCell align="center"><Typography variant='h6' gutterBottom>Uploaded by:</Typography></TableCell>
                      <TableCell align="center"><Typography variant='h6' gutterBottom>Uploader email:</Typography></TableCell>
                      <TableCell align="center"><Typography variant='h6' gutterBottom>Status:</Typography></TableCell>
                      <TableCell align="center"><Typography variant='h6' gutterBottom>Verify:</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookList.map((detail, i) => (
                      <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell align="center">{detail.bookName}</TableCell>
                        <TableCell align="center">{detail.bookAuthorName}</TableCell>
                        <TableCell align="center"><div className="dash-btn"><Button href={detail.bookDownloadLink} target='_blank'>Visit</Button></div></TableCell>
                        <TableCell align="center">{detail.uploaderName}</TableCell>
                        <TableCell align="center">{detail.uploaderEmail}</TableCell>
                        {renderElement(detail.isVerify)}
                        {buttonYesOrNo(detail)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        )
      }
    </>
  )
}

export default Dashboard