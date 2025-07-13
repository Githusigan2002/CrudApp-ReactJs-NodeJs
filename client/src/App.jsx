import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {

  const [users, setUsers] = useState([]);
  const [filterUser, setfilteredUser] = useState([]);
  const [isModelopen, setIsModelOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", age: "", city: "" });

  const getAllUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      setUsers(res.data);
      setfilteredUser(res.data);
    })
  };

  useEffect(() => {
    getAllUsers();
  }, []);


  //Search fn
  const HandleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUser = users.filter((user) => user.name.toLowerCase().includes(searchText) || user.city.toLowerCase().includes(searchText));

    setfilteredUser(filteredUser);

  };

  //Delete User
  const DeleteData = async (id) => {
    const confirmed = window.confirm("Do you want to Delete?")
    if (confirmed) {
      await axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
        setUsers(res.data);
        setfilteredUser(res.data);
      })
    }

  };

  //Add user
  const handleAddRecors = () => {
    setUserData({ name: "", age: "", city: "" });
    setIsModelOpen(true);

  };

  //Close btn
  const CloseAddRecord = () => {
    setIsModelOpen(false);
  };

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    if (userData.id) {
      await axios.patch(`http://localhost:8000/users/${userData.id}`, userData).then((res) => {
        console.log(res);
      });
    } else {
      await axios.post("http://localhost:8000/users", userData).then((res) => {
        console.log(res);
      });
    }
    setIsModelOpen(false);
    getAllUsers();
  };

  //Update Record
  const updateRecord = (user) => {
    setUserData(user);
    setIsModelOpen(true);
  };



  return (
    <>
      <div className='container'>
        <h3>CRUD APP with React & NodeJs</h3>

        <div className="input-search">
          <input type="search" placeholder='Search text' onChange={HandleSearch} />
          <button className='btn green' onClick={handleAddRecors}>ADD USERS</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterUser && filterUser.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td><button className='btn green' onClick={() => updateRecord(user)}>Edit</button></td>
                  <td><button className='btn red' onClick={() => DeleteData(user.id)}>Delete</button></td>
                </tr>
              )
            })}
          </tbody>

        </table>
        {isModelopen && (
          <div className="model">
            <div className="modelContent">
              <span className="close" onClick={CloseAddRecord}>&times;</span>

              <h2>{userData.id ? "Update Record" : "Add Record"}</h2>
              <div className="inputGroup">
                <label htmlFor="name">Name</label>
                <input value={userData.name} onChange={handleData} type="text" name='name' id='name' />
              </div>
              <div className="inputGroup">
                <label htmlFor="age">Age</label>
                <input value={userData.age} onChange={handleData} type="number" name='age' id='age' />
              </div>
              <div className="inputGroup">
                <label htmlFor="city">City</label>
                <input value={userData.city} onChange={handleData} type="text" name='city' id='city' />
              </div>
              <button className='btn green' onClick={handleAddData}>{userData.id ? "Update User" : "Add User"}</button>
            </div>
          </div>
        )}

      </div>
      <div className="footer">
        <p>Designed by <a target='_blank' href="https://github.com/Githusigan2002"> J.Githusigan</a>
        </p><img src="/check_circle.svg" alt="" />
      </div>
    </>
  )
}

export default App
