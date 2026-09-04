import { use, useState } from 'react'
import TaskCard from './components/TaskCard'
import './App.css'
import AddTaskForm from './components/AddTaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import SortBar from './components/SortBar';
import ArchiveList from './components/ArchiveList';
import { statusColors } from './statusColors';
function App() {
  
  const [tasks,setTasks] =useState([
     { id: 1, title: 'Task 1', description: 'This is the description for Task 1.', status: 'In Progress', priority: 'High', dueDate: '2024-06-30' },
    { id: 2, title: 'Task 2', description: 'This is the description for Task 2.', status: 'In Progress', priority: 'Medium', dueDate: '2024-06-25' },
     { id: 3, title: 'Task 3', description: 'This is the description for Task 1.', status: 'To Do', priority: 'High', dueDate: '2024-06-30' },
    { id: 4, title: 'Task 4', description: 'This is the description for Task 2.', status: 'In Progress', priority: 'Medium', dueDate: '2024-06-25' },
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

 const [taskDelId,setTaskDelId]= useState(null);



 function confirmDelete(){
  setTasks(tasks.filter((task)=> task.id !== taskDelId));
  setTaskDelId(null);
 }
 function cancelDelete(){
  setTaskDelId(null);
}
const [archivedTasks,setArchivedTasks]= useState([ { id: 7, title: 'Task 1', description: 'This is the description for Task 1.', status: 'Completed', priority: 'High', dueDate: '2024-06-30' },
    { id: 8, title: 'Task 2', description: 'This is the description for Task 2.', status: 'Completed', priority: 'Medium', dueDate: '2024-06-25' },
    { id: 9, title: 'Task 3', description: 'This is the description for Task 1.', status: 'Completed', priority: 'High', dueDate: '2024-06-30' },
    { id: 10, title: 'Task 4', description: 'This is the description for Task 2.', status: 'Completed', priority: 'Medium', dueDate: '2024-06-25' },
    { id: 11, title: 'Task 5', description: 'This is the description for Task 1.', status: 'Completed', priority: 'High', dueDate: '2024-06-30' },
    { id: 12, title: 'Task 6', description: 'This is the description for Task 2.', status: 'Completed', priority: 'Medium', dueDate: '2024-06-25' }
    ]);
const [showArchive,setShowArchive]=useState(false);

const [delArchives,setDelArchives]= useState(false);

function confirmDeleteArchives()
{
  setArchivedTasks([]);
  setDelArchives(!delArchives);

}
function cancelDeleteArchives(){
  setDelArchives(!delArchives);
}



function handleRestoreTask(id){

const taskToRestore =archivedTasks.find((task)=>task.id===id);
const restoredTask ={...taskToRestore, status:'In Progress'};

setArchivedTasks(archivedTasks.filter((task)=>task.id!==id));
setTasks([...tasks,restoredTask]);
}
 function handleEditTask(id,updatedFields){
  const isNowCompleted= updatedFields.status==='Completed';
  if(isNowCompleted)
    {
      const taskToArchive = tasks.find((task)=> task.id === id);
      const updatedTask ={...taskToArchive,...updatedFields};

      setTasks(tasks.filter((task)=> task.id !==id));
      setArchivedTasks([...archivedTasks,updatedTask]);

  }
  else{

    setTasks(
      tasks.map((task)=>
      task.id===id ?{...task,...updatedFields} : task
    
      )
    );
  }
 }
const [searchText,setSearchText ] =  useState('');
const [ sortBy,setSortBy] =  useState('Due Date');
 const [sortDirection,setSortDirection ] =  useState('asc');
 const [filterStatus, setFilterStatus] = useState('ALL');

const priorityOrder ={'High': 0, 'Medium': 1,'Low': 2};
let visibleTasks = tasks.filter((task)=>{
  const matchesStatus = filterStatus === 'ALL' || task.status ===filterStatus;
  const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase())||
  task.description.toLowerCase().includes(searchText.toLowerCase());
  return matchesStatus && matchesSearch;
});

visibleTasks=[...visibleTasks].sort((a,b)=>{
  let comparison = 0;
  if(sortBy==='Priority'){
    comparison= priorityOrder[a.priority]-priorityOrder[b.priority];
  }else{
    comparison = new Date(a.dueDate) - new Date(b.dueDate);
  }
  return sortDirection==='asc' ? comparison : -comparison;
});
const toDoCount= visibleTasks.filter((task)=>task.status==='To Do').length;
const inProgressCount= visibleTasks.filter((task)=>task.status==='In Progress').length;
const archivedCount= archivedTasks.length;
const [selectedIds,setSelectedIds]= useState([]);

function handleToggleSelect(id)
{
  setSelectedIds((prev)=>
  prev.includes(id) ? prev.filter((selectedId)=> selectedId!==id): [...prev,id]
  );

}

function handleBulkMarkDone()
{
const tasksToArchive= tasks.filter((task)=> selectedIds.includes(task.id)).
map((task)=>({...task,status: 'Completed'}));
setTasks(tasks.filter((task)=> !selectedIds.includes(task.id)));
setArchivedTasks([...archivedTasks,...tasksToArchive]);
setSelectedIds([]);
}
function handleBulkDelete()
{
  setTasks(tasks.filter((task)=> !selectedIds.includes(task.id)));
  setSelectedIds([]);
  
  
  }
  // archivedTasks= visibleTasks.find((task)=>task.status==='Completed');
  // visibleTasks= visibleTasks.filter((task)=>task.status!='Completed');
  
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
      {!showArchive &&<div>
    <div id="addTaskContainer"><h2>Tasks
      
      <button id="addTaskButton" className="addTaskButton" onClick={()=>setShowForm(true)}>Add Task</button>
    

      </h2>

    
    </div>
    <span id="searchSortContainer">
     <span>
   <SearchBar searchText={searchText} onSearchChange={setSearchText}/>
    <button id="searchButton">Search</button>
    </span>
    <FilterBar filterStatus={filterStatus} onFilterChange={setFilterStatus}/>
    <SortBar sortBy={sortBy} sortDirection={sortDirection}
    onSortByChange={setSortBy}
    onToggleDirection={()=> setSortDirection((d)=>(d=== 'asc' ? 'desc' : 'asc'))}
    />
</span> 
</div>
}
    {
      !showArchive ?(

    <span id="summaryCounter">
     <span style={{color:statusColors['To Do']}}>To do: {toDoCount} </span>
     <span style={{color:statusColors['In Progress']}}>In Progress: {inProgressCount}</span>

    </span>
      ) :(
    <span id="summaryCounter">
    <span style={{color:statusColors['Completed']}}>Archived: {archivedCount}</span>
    </span>

      )
    }
  {showArchive ? ( <div className="archiveToggle">
    
    <span>
    
    <h2>
    Archives
    <button onClick={()=> setShowArchive(!showArchive)}>
    Back to Board
    </button>
    </h2>
    </span>
    <button onClick={()=>setDelArchives(true)}>Delete All</button>
    </div>
  ):( <div className="archiveToggle">
    
    <span>
    
    <h2>
    Board   
    <button onClick={()=> setShowArchive(!showArchive)}>
    Show Archives
    </button>
    </h2>
    </span>
    { selectedIds.length>0 &&
      
      <span>
      <button onClick={handleBulkMarkDone}>Mark done</button>
      <button onClick={handleBulkDelete}>Delete selected</button>
      </span>
    }
    </div>
    
  )}

{taskDelId !== null && (
  <div className="confirmOverlay">
    <div className="confirmBox">
      <p>Delete this task? This can't be undone.</p>
    <button onClick={confirmDelete}>Yes</button>
<button onClick={cancelDelete}>No</button>

    </div>
  </div>
)}
{(delArchives  && archivedTasks.length>0) &&
  <div className="confirmOverlay">
    <div className="confirmBox">
      <p>Delete All Archives? This can't be undone.</p>
    <button onClick={confirmDeleteArchives}>Yes</button>
<button onClick={cancelDeleteArchives}>No</button>

    </div>
  </div>
}

{ (delArchives && !archivedTasks.length)&&
  <div className="confirmOverlay">
    <div className="confirmBox">
      <p>There are no archives to be deleted.</p>
    
<button onClick={cancelDeleteArchives}>Okay</button>

    </div>
  </div>


}
{showForm && <AddTaskForm onAddTask={handleAddTask} />}

    {showArchive ? (<ArchiveList archivedTasks={archivedTasks} handleRestoreTask={handleRestoreTask}/>) :
    (<TaskList tasks={visibleTasks} onDelete={(id)=> setTaskDelId(id)} onEditTask={handleEditTask} selectedIds={selectedIds} onToggleSelect={handleToggleSelect}/>)



    }
{/* <TaskList tasks={visibleTasks} onDelete={(id)=>setTaskDelId(id)} onEditTask={handleEditTask}/> */}
  
</div>
  </div>

  
  )
}

export default App
