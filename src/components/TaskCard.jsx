import { useState } from "react";
import {statusColors} from '../statusColors';

export default function TaskCard({task,onDelete,onEditTask,isSelected,onToggleSelect}) {
    const [isEditing,setIsEditing]= useState(false);    
    const [title,setTitle]= useState(task.title);        
    const [description,setDescription]= useState(task.description);
    const [status,setStatus]= useState(task.status);
    const [dueDate,setDueDate]= useState(task.dueDate);
    const [priority,setPriority]= useState(task.priority);
    
    function handleSave(){
        onEditTask(task.id,{title,description,status,dueDate,priority});
        setIsEditing(false); 
    }
    if(isEditing){
        return(
            <div className="task">
                <h3><input value={title} onChange={(e)=>setTitle(e.target.value)}/></h3>
                <p><textarea className="descriptionInput" value={description} onChange={(e)=>setDescription(e.target.value)}/></p>
                <p style={{color:statusColors[task.status]}}>
                    Status: <select value={status} onChange={(e)=> setStatus(e.target.value)}>
                         <option value="To Do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
                        </select>
                    </p>
                <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)}/>
                <p>
                    Priority: 
                    <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
                           <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
                    </select>
                </p>
                <span className="taskActions">
                    <button onClick={handleSave}>Save</button>
                </span>
            </div>
        );

    }
    
    
    return (
        
    <div className={`task ${task.status === 'Completed' ? 'completed' : ''}`}>
        <h3>
            {task.title}
            {task.status !== 'Completed' && <input type="checkbox" checked={isSelected} onChange={()=> onToggleSelect(task.id)}/>}
        </h3>
        <p>{task.description}</p>
        <p style={{color:statusColors[task.status]}}>
            Status: {task.status}
        </p>
        <p>Due Date: {task.dueDate}</p>
        <p>
            Priority: {task.priority}
        </p>
       <span className="taskActions">
        <button onClick={()=> onDelete(task.id)}>Delete</button>
        <button onClick={()=> setIsEditing(true)}>Edit</button>
        </span> 
    </div>
  );
}
