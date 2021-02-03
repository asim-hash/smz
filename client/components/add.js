import React, { useState } from 'react'

const Add = ({ addTasks }) => {
  const [taskInput, setTaskInput] = useState([])

  return (
    <div className="flex flex-col border-8 border-black font-bold">
      <div className="flex py-2 ">
        <label htmlFor="title" className="text-black">
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTaskInput([ ...taskInput, e.target.value ])}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="title" className="text-black">
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTaskInput([...taskInput, e.target.value ])}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="title" className="text-black">
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTaskInput([ ...taskInput, e.target.value ])}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="title" className="text-black">
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTaskInput([ ...taskInput, e.target.value ])}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="title" className="text-black">
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTaskInput( [...taskInput, e.target.value ])}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <button type="button" onClick={() => addTasks(taskInput)} className="border">
        сохранить
      </button>
    </div>
  )
}

export default Add
