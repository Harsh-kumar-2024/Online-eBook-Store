import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "../styles/Upload.css"

const initialValues = {
    bookId:0,
    bookName: "",
    bookAuthorName: "",
    bookDescription: "",
    bookDownloadLink: "",
    uploaderEmail: "",
    uploaderName: "",
    uploaderPassword: "",
    isVerify: false
}

function Upload() {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);
    const handelInputChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const serverURL = "http://localhost:5122/api/BookModels";
    const addBook = async (e)=>{
        try{
            //console.log(initialValues);
            const {bookID, bookName, bookAuthorName, bookDescription, bookDownloadLink, uploaderEmail, uploaderName, uploaderPassword, isVerify} = values;
            const res = await fetch(serverURL,{
            method: 'POST',
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
                isVerify
            })
        });
        if(res.status === 201){
            window.alert('Successfully uploaded');
            navigate('/');
        }
        else{
            window.alert('Some error occurred');
        }
        }catch(e){
            console.log(e);
        }
    }
  return (
    <>
        <div className="wrapper">
			<div className="inner">
				<form method='POST'>
					<h1>Book Upload</h1>
						<div className="form-wrapper">
							<label htmlFor="">Book Name:</label>
							<input name="bookName" type="text" className="form-control" onChange={handelInputChange} autoFocus/>
						</div>
                        <div className="form-wrapper">
							<label htmlFor="">Author Name:</label>
							<input name="bookAuthorName" type="text" className="form-control" onChange={handelInputChange}/>
						</div>
                    <div className="form-wrapper">
						<label htmlFor="">Description:</label>
                        <textarea name="bookDescription" id="" cols="50" rows="5" onChange={handelInputChange}></textarea>
					</div>
                    <div className="form-wrapper">
						<label htmlFor="">Download link:</label>
						<input type="url" name='bookDownloadLink' className="form-control" onChange={handelInputChange}/>
					</div>
                    <div className="form-wrapper">
						<label htmlFor="">Your Name:</label>
						<input type="text" name='uploaderName' className="form-control" onChange={handelInputChange}/>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Email:</label>
						<input type="text" name='uploaderEmail' className="form-control" onChange={handelInputChange}/>
					</div>
					<div className="form-wrapper">
						<label htmlFor="">Password:</label>
						<input type="password" name='uploaderPassword' className="form-control" onChange={handelInputChange}/>
					</div>
				</form>
                <div className="upload-btn">
                    <button onClick={addBook}>Upload book</button>
                    </div>
			</div>
		</div>
    </>
  )
}

export default Upload;