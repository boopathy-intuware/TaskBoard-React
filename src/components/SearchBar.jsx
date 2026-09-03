import React from 'react'

export default function SearchBar({searchText,onSearchChange}) {
  return (
    // <div>SearchBar</div>
    <input type="text" id='searchBar'
    placeholder="Search tasks..."
    value={searchText}
    onChange={(e)=> onSearchChange(e.target.value)}/>
  )
}
