import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Delete = (props) => {
	const navigate = useNavigate();
	const initialData = {
		bookID: props.book.bookID,
		bookName: props.book.bookName,
		bookAuthorName: props.book.bookAuthorName,
		bookDescription: props.book.bookDescription,
		bookDownloadLink: props.book.bookDownloadLink,
		uploaderEmail: "",
		uploaderName: props.book.uploaderName,
		uploderPassword: "",
		isVerify: false
	}
	const [values, setValues] = useState(initialData);
	const handelChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		});
	};
	const serverURL = `http://localhost:5122/api/BookModels/${values.bookID}`;
	const deleteBook = async (e) => {
		try {
			const { bookID, bookName, bookAuthorName, bookDescription, bookDownloadLink, uploaderName, isVerify } = initialData;
			const { uploaderEmail, uploaderPassword } = values;
			const res = await fetch(serverURL, {
				method: 'DELETE',
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
			if (res.status === 200) {
				window.alert('Successfully deleted');
				navigate('/');
			}
			else if(res.status === 401){
				window.alert('unauthorized');			
			}
			else {
				window.alert('Something went wrong');
			}
		} catch (e) {
			console.log(e);
		}
	}
	return (
		<>
			<div className="wrapper">
				<div className="inner">
					<form method='POST'>
						<h1>Book Delete</h1>
						<div className="form-wrapper">
							<label htmlFor="">Book Name:</label>
							<input name="bookName" type="text" className="form-control" disabled value={props.book.bookName} />
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Author Name:</label>
							<input name="bookAuthorName" type="text" className="form-control" disabled value={props.book.bookAuthorName} />
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Email:</label>
							<input autoFocus type="text" name='uploaderEmail' className="form-control" onChange={handelChange} />
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Your Name:</label>
							<input name="uploaderName" type="text" className="form-control" disabled value={props.book.uploaderName} />
						</div>
						<div className="form-wrapper">
							<label htmlFor="">Password:</label>
							<input type="password" name='uploaderPassword' className="form-control" onChange={handelChange} />
						</div>
					</form>
					<div className="upload-btn">
						<button onClick={deleteBook} type="submit">Delete &nbsp; book</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Delete