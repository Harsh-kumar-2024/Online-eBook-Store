import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Update = (props) => {
  const navigate = useNavigate();
  const initialData = {
    bookID:props.book.bookID,
    bookName:props.book.bookName,
    bookAuthorName: props.book.bookAuthorName,
    bookDescription:props.book.bookDescription,
    bookDownloadLink:props.book.bookDownloadLink,
    uploaderEmail:"",
    uploaderName: props.book.uploaderName,
    uploderPassword:"",
    isVerify: false,
  }
  const [values, setValues] = useState(initialData);
  const handelChange = e => {
		const {name, value} = e.target;
		setValues({
			...values,
			[name]: value
		});
	};
  const serverURL = `http://localhost:5122/api/BookModels/${values.bookID}`;
  const updateBook = async (e) => {
    try{
      const {bookID, bookName, bookAuthorName, bookDescription, bookDownloadLink, uploaderEmail, uploaderName, uploaderPassword, isVerify} = values;
      const res = await fetch(serverURL,{
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
          isVerify
				})
      });
      if(res.status === 200){
        window.alert('Successfully updated');
        navigate('/');
      }
      else if(res.status === 401){
        window.alert('unauthorized');
      }
      else{
        window.alert('something went wrong');
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
            <h1>Book Update</h1>
            <div className="form-wrapper">
              <label htmlFor="">Book Name:</label>
              <input name="bookName" type="text" className="form-control" value={props.book.bookName} disabled/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Author Name:</label>
              <input name="bookAuthorName" type="text" className="form-control" value={props.book.bookAuthorName} disabled/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Description:</label>
              <textarea name="bookDescription" id="" cols="50" rows="5" value={props.book.bookDescription} disabled></textarea>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Download link:</label>
              <input type="url" autoFocus name='bookDownloadLink' className="form-control" onChange={handelChange} required/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Email:</label>
              <input type="text" name='uploaderEmail' className="form-control" onChange={handelChange}/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Your Name:</label>
              <input name="uploaderName" type="text" className="form-control" value={props.book.uploaderName} disabled/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Password:</label>
              <input type="password" name='uploaderPassword' className="form-control" onChange={handelChange}/>
            </div>
          </form>
          <div className="upload-btn">
              <button onClick={updateBook}>Update book data</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Update