import React from 'react'
import TaskCard from './TaskCard'
export default function TaskList({tasks, onDelete,onEditTask,onToggleSelect,selectedIds}) {
  return (
   <div id="taskList">
  {tasks.map((task)=>{
   return <TaskCard key={task.id} task={task} onDelete={onDelete} onEditTask={onEditTask}
   isSelected={selectedIds.includes(task.id)} onToggleSelect={onToggleSelect}/>
  })}
  </div>
  )
}
