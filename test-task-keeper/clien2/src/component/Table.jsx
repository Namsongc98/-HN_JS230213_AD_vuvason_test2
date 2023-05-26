import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

function Body() {
  const [conten, setConten] = useState();

  const renderDta = async () => {
    try {
      await axios.get("http://localhost:3333/api/v1/taskkeeper").then((res) => {
        return setConten(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    renderDta();
  }, []);

  const hanldeDelete = (index)=>{
  const findconten =  conten.findIndex((item)=>item.id===index)

  }
 

  return (
    <div className="table-wp">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>conten</th>
            <th>duedate</th>
            <th>status</th>
            <th>assignned</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
        {conten?.map((user, index) => (
             <tr key={index}>
             <td>{user.id}</td>
             <td>{user.conten}</td>
             <td>{user.duedate}</td>
             <td>{user.status}</td>
             <td>{user.status}</td>
             <td>
               <button className="Update">Update</button>{" "}
               <button className="Delete" onClick={()=>hanldeDelete(user.id)} >Delete</button>
             </td>
           </tr>
            ))}
        
        </tbody>
      </table>
    </div>
  );
}

export default Body;
