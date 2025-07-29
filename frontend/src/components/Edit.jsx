import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../css/Home.css'

export default function Edit() {
  const {id}=useParams()
  console.log(id)  
  const [name, setName]= useState('') 


useEffect(() => {
  axios.get(`http://localhost:5000/api/tasks/${id}`)
    .then((res) => {
      setName(res.data.title); 
      console.log(res.data.title);
    })
    .catch((error) => {
      console.log(error);
    });
}, [id]);
  return (
    <div className='main'>
    <div className='tasks'>
        <h2 className='task_manager'>Edit the task</h2>
        <input type="text"  value={name} />
        <button className = 'btn'>update</button>
        
        
        </div>

    </div>
  )
}