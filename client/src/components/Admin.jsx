import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    adminId: 1,
    adminEmail: "",
    adminPassword: ""
  });
  const serverURL = "http://localhost:5122/api/AdminModels";
    const adminLogin = async () => {
        try{
          const{adminId, adminEmail, adminPassword} = adminData;
          const res = await fetch(serverURL,{
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
              adminId,
              adminEmail,
              adminPassword
            })
          });
          if(res.status === 200){
            navigate('/admin/dashboard');
          }else{
            window.alert("Invalid credentials");
          }
        }catch(err){
          console.log(err);
        }
    }
    const handelInput = (e) => {
      const {name, value} = e.target;
      setAdminData({
        ...adminData,
        [name] : value
      })
    }
  return (
    <>
        <div className="wrapper">
        <div className="inner">
          <form method='POST'>
            <h1>Admin Login</h1>
            <div className="form-wrapper">
              <label htmlFor="">Email:</label>
              <input name="adminEmail" type="text" className="form-control" value={adminData.adminEmail} onChange={handelInput}/>
            </div>
            <div className="form-wrapper">
              <label htmlFor="">Password:</label>
              <input name="adminPassword" type="password" className="form-control" value={adminData.adminPassword} onChange={handelInput}/>
            </div>
          </form>
          <div className="upload-btn">
              <button onClick={adminLogin}>Login</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Admin