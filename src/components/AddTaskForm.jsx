import React from 'react'
import { useState } from 'react'
export default function AddTaskForm({onAddTask}) {
    const [title,setTitle]=useState('New Task');
    const [description,setDescription]=useState('New Task Description');
    const [dueDate,setDueDate]=useState(new Date().toISOString().slice(0,10));    
    const [priority,setPriority]=useState('Low');
    function handleSubmit(){
        onAddTask({title,description,dueDate,priority});
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('Low');
    }
    const handleFocus =  (event)=>{
      event.target.select();
    };

  
  return (
    <div id="addTaskFormOverlay">
      <div className="addTaskForm">

        Title: <input value={title} onFocus={handleFocus} onChange={(e)=>setTitle(e.target.value)}/>                   <br/>
        Description: <input value={description} onFocus={handleFocus} onChange={(e)=>setDescription(e.target.value)}/><br/>
        Due Date: <input type='date' value={dueDate} onChange={(e)=>setDueDate(e.target.value)}/><br/>
        Priority: 
        <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        </select>
        <button onClick={handleSubmit}>Submit Task</button>
      </div>
    </div>
  )
}
