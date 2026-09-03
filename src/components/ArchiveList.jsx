import React from 'react'
const statusColors = {
  'To Do': 'gray',
  'In Progress': 'yellow',
  'Completed': 'green'
};
export default function ArchiveList({archivedTasks,handleRestoreTask}) {
  return (
    <div className="archiveList">
      {
        archivedTasks.map((task)=>(
         <div key={task.id} className="task completed">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
              <p style={{ color: statusColors['Completed'] }}>Status: {task.status}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Priority: {task.priority}</p>
        <span className="taskActions">
          <button onClick={() => handleRestoreTask(task.id)}>Restore</button>
        </span>
         </div>

        ))
      }
    </div>
  )
}
