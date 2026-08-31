import { useState } from "react";

const statusColors = {
  'To Do': 'gray',
  'In Progress': 'yellow',
  'Completed': 'green'
};

export default function TaskCard({task,onDelete,onEditTask}) {
    const [isEditing,setIsEditing]= useState(false);    
    const [title,setTitle]= useState(task.title);        
    const [description,setDescription]= useState(task.description);
    const [dueDate,setDueDate]= useState(task.dueDate);
    const [priority,setPriority]= useState(task.priority);
    
    function handleSave(){
        onEditTask(task.id,{title,description,dueDate,priority});
        setIsEditing(false); 
    }
    if(isEditing){
        return(
            <div className="task">
                <h3><input value={title} onChange={(e)=>setTitle(e.target.value)}/></h3>
                <p><input value={description} onChange={(e)=>setDescription(e.target.value)}/></p>
                <p style={{color:statusColors[task.status]}}>Status: {task.status}</p>
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
            {task.status !== 'Completed' && <input type="checkbox"/>}
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
