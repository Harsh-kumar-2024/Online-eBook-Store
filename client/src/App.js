import './App.css';
import React,{useState} from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Upload from './components/Upload';
import Update from './components/Update';
import Delete from './components/Delete';
import Admin from './components/Admin';
import { Route , Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';



function App() {
  const [data, setData] = useState({
    bookId:0,
    bookName: "",
    bookAuthorName: "",
    bookDescription: "",
    bookDownloadLink: "",
    uploaderEmail: "",
    uploaderName: "",
    uploaderPassword: "",
  });
  const getInput = (data)=> {
    setData(data);
  }
  return (
    <>
      <Navbar />
      <Routes>
      <Route path='/' element={<Card callback={getInput}/>}/>
      <Route path='/upload' element={<Upload />}/>
      <Route path='/update' element={<Update book={data}/>}/>
      <Route path='/delete' element={<Delete book={data}/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
