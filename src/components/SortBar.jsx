import React from 'react'

export default function SortBar({sortBy,sortDirection,onSortByChange,onToggleDirection}) {
  return (
<span className="sortLabel">
    Sort by:
    <select id='sortDropDown' value={sortBy} onChange={(e)=> onSortByChange(e.target.value)}>
        <option value="Due Date">Due Date</option>
        <option value="Priority">Priority</option>
    </select>
    <button onClick={onToggleDirection}>{sortDirection ==='asc' ? 'Asc ↑' : 'Desc ↓'}</button>
</span>
  )
}
