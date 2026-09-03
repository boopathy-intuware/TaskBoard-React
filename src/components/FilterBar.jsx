import React from 'react'

export default function FilterBar({filterStatus,onFilterChange}) {
  return (
    <span id="filterTasks">
        Filter By:
        <select value={filterStatus} id='filter' onChange={(e)=>
          onFilterChange(e.target.value)
        }>
            <option value="ALL">All</option>
            <option value="To Do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
         
            </select>

    </span>
  );
}
