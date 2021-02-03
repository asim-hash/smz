import React from 'react'

const Task = ({ category }) => {
  return (
    <div className="border border-8 border-black font-bold  p-10 w-2/5 bg-gray-500 mb-2 text-center h-56 overflow-y-scroll">
      {category.map((el) => (
        <div key={el.id}>{el.title}</div>
      ))}
    </div>
  )
}

export default Task
