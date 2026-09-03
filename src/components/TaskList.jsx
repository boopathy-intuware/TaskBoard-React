import React from 'react'
import TaskCard from './TaskCard'
export default function TaskList({tasks, onDelete,onEditTask}) {
  return (
   <div id="taskList">
  {tasks.map((task)=>{
   return <TaskCard key={task.id} task={task} onDelete={onDelete} onEditTask={onEditTask}/>
  })}
  </div>
  )
}
