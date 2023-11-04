import React, { Fragment, useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import "../styles/Card.css";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Card = ({ callback }) => {
    const [query, setQuery] = useState("");
    const URL = "http://localhost:5122/api/BookModels";
    const [done, setDone] = useState(undefined);
    const [bookList, setBookList] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            fetchData();
            setDone(true);
        }, 2000);
    }, []);
    const fetchData = () => {
        axios.get(URL).then((response) => setBookList(response.data)).catch((error) => { console.log(error); })
    }
    const verification = (e) => {
        if (e) {
            return <div className="book-tag-verify"> Verified </div>
        } else {
            return <div className="book-tag-pending"> Pending </div>
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
                    <section className="book">
                        <label htmlFor="find">
                            <input type="text" placeholder='Enter book name for find...' className='find' onChange={event => setQuery(event.target.value)} />
                        </label>
                        <div className="row">
                            {
                                bookList.filter(data => {
                                    if (query === '') {
                                        return data;
                                    } else if (data.bookName.toLowerCase().includes(query.toLowerCase())) {
                                        return data;
                                    }else{
                                        return undefined;
                                    }
                                }).map((detail, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <div className="column">
                                                <div className="single-book">
                                                    <div className="card">

                                                        <div className="book-thumb">
                                                            {verification(detail.isVerify)}
                                                            {/* <img src={image} alt="LOGO" /> */}
                                                        </div>

                                                        <div className="book-content">
                                                            <h4 name="bookName">{detail.bookName}</h4>
                                                            <div className="mark">
                                                                <span>{detail.bookDescription}</span>
                                                            </div>
                                                            <div className="book-data">
                                                                <h5>Author Name:&nbsp;&nbsp;{detail.bookAuthorName}</h5>
                                                                <h5>Uploaded by:&nbsp;&nbsp;{detail.uploaderName}</h5>
                                                            </div>
                                                            <div className="download-book">
                                                                <Button className='book-btn-download' href={detail.bookDownloadLink} target={'_blank'}>Download</Button>
                                                                <Button className='book-btn-update' component={Link} to="/Update" onClick={() => callback(detail)}>Update</Button>
                                                                <Button className='book-btn-delete' component={Link} to="/Delete" onClick={() => callback(detail)} >Delete</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default Card;