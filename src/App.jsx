import { use, useState } from 'react'
import TaskCard from './components/TaskCard'
import './App.css'
import AddTaskForm from './components/AddTaskForm';


function App() {
  
  const [tasks,setTasks] =useState([
     { id: 1, title: 'Task 1', description: 'This is the description for Task 1.', status: 'In Progress', priority: 'High', dueDate: '2024-06-30' },
    { id: 2, title: 'Task 2', description: 'This is the description for Task 2.', status: 'Completed', priority: 'Medium', dueDate: '2024-06-25' },
     { id: 3, title: 'Task 3', description: 'This is the description for Task 1.', status: 'To Do', priority: 'High', dueDate: '2024-06-30' },
    { id: 4, title: 'Task 4', description: 'This is the description for Task 2.', status: 'Completed', priority: 'Medium', dueDate: '2024-06-25' },
     { id: 5, title: 'Task 5', description: 'This is the description for Task 1.', status: 'To Do', priority: 'High', dueDate: '2024-06-30' },
    { id: 6, title: 'Task 6', description: 'This is the description for Task 2.', status: 'To Do', priority: 'Medium', dueDate: '2024-06-25' }
    
  ]);

  const [showForm,setShowForm]=useState(false);
  function handleAddTask(newTaskData){
    const newTask={
      id: Date.now(),
      status: 'To Do',
      ...newTaskData


    };
    setTasks([...tasks,newTask]);
    setShowForm(false);
  }
 function handleDeleteTask(id){
  setTasks(tasks.filter((task)=> task.id!==id));
 }
 function handleEditTask(id,updatedFields){
  setTasks(
    tasks.map((task)=>
    task.id===id ?{...task,...updatedFields} : task
  
    )
  );
 }

  return (
  <div>

      
 <header id="header">
  <h1>Taskboard</h1>
  <nav>
    <a className="login" href="/">Login</a>
    <a className="signup" href="signup.html">Sign Up</a>
  </nav>
</header>
  
    <div className="container">
    <div id="addTaskContainer"><h2>Tasks
      <span id="summaryCounter"></span>
      <button id="addTaskButton" className="addTaskButton" onClick={()=>setShowForm(true)}>Add Task</button>
      <span id="buttons" style={{display:'none'}}>
        <button id="markDone">Mark Done</button>
      <button id="deleteBulk">Delete</button>
      </span>
      </h2>
      {showForm && <AddTaskForm onAddTask={handleAddTask} />}

    
    </div>
    <span id="searchSortContainer">
     <span>
    <input type="text" placeholder="Search tasks..." id="taskInput"/>
    <button id="searchButton">Search</button>
    </span>
    <span id="filterTasks">Filter By:
      <select id="filterSelect">
        <option value="ALL">All </option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </span>
    <span id="sortLabel">Sort by:
    <select id="sortSelect" value="Sort by">
      <option value="Due date">Due date</option>
      <option value="Priority">Priority</option>
      
    </select>
    </span>
</span> 
    
<div id="taskList">
  {tasks.map((task)=>{
   return <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} onEditTask={handleEditTask}/>
  })}
  </div>
  
</div>
  </div>

  
  )
}

export default App
