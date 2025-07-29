import axios from 'axios'

import React from 'react'
import { IoTrashBinOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import '../css/Home.css'


export default function Home() {
   const [work,setWork]=useState([])
   const [name,setName]=useState('')
   useEffect(()=>{
    axios.get('http://localhost:5000/api/tasks')
    .then((res)=>{
        console.log(res.data)
        setWork(res.data)
    })
    .catch((error)=>{
        console.log(error)
    }
    )
},[])
const deleteuser=async(id)=>{
    try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`)
        setWork(work.filter(ls=>ls._id!==id))//save in set work
    } catch (error) {                           //those dont match
        console.log(error)
    }
}
//
const createUser=async()=>{
    try {
       const res = await axios.post('http://localhost:5000/api/tasks',{title:name})
        setWork([...work,res.data])
    } catch (error) {
        console.log(error)
    }

    const updateUser = async(id) => {
  try {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { title: name });
    setWork(work.map(item => item._id === id ? res.data : item));
  } catch (error) {
    console.log(error);
  }
};
}
    
   
   
  return (
    <div className='main'>
      <div className='tasks'>
        <h2 className='task_manager'>Task Manager</h2>
        <input type="text" placeholder='eg: drink water' value={name} onChange={(e)=>setName(e.target.value)}/>
        <button onClick = {createUser}className='btn'>create</button>
      </div>
      <div className='list'>
        <ul>
            {work.map((list) =>
                <li key = {list._id}>
                    <div className='main_container'>
                        <div className='list_container'>{list.title}</div>
                        <div className='right_buttons'>
                            <div>
                           <button onClick={createUser} className='btn1'>update</button>
                            </div>
                            <div> <button onClick={()=>{deleteuser(list._id)}} className='btn2' >delete</button> </div>
                        </div>
                    </div>
                </li>
                )}
        </ul>
        </div>
       
    </div>
  )
}