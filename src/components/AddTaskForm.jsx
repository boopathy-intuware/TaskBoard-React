import React from 'react'
import { useState } from 'react'
export default function AddTaskForm({onAddTask}) {
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [dueDate,setDueDate]=useState('');    
    const [priority,setPriority]=useState('Low');
    function handleSubmit(){
        onAddTask({title,description,dueDate,priority});
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
    }
  return (
    <div id="addTaskForm">
        Title: <input value={title} onChange={(e)=>setTitle(e.target.value)}/>                   <br/>
        Description: <input value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
        Due Date: <input type='date' value={dueDate} onChange={(e)=>setDueDate(e.target.value)}/><br/>
        Priority: 
        <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        </select>
        <button onClick={handleSubmit}>Submit Task</button>
    </div>
  )
}
