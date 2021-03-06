import React, { useState } from 'react'
import { select } from '@storybook/addon-knobs'

const Add = ({ addTasks, onModalClose,category }) => {
  const [taskInput, setTaskInput] = useState('')
  const [taskname, setTaskname] = useState('')
  const [taskPriority, setTaskPriority] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskProject, setTaskProject] = useState('')
  return (
    <div className="flex flex-col border-8 border-black font-bold">
      <div className="flex py-2 ">
        <label htmlFor="title" className="text-black">
          Заголовок
        </label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="name" className="text-black">
          Название проекта
        </label>
        <input
          id="name"
          type="text"
          onChange={(e) => setTaskname(e.target.value)}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex py-2 ">
        <label htmlFor="priority" className="text-black">
          Приоритет
        </label>
        <select
          id="<priority>"
          onChange={(e) => setTaskPriority(e.target.value)}
          className="w-2/4 border border-4 border-black"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="flex py-2 ">
        <label htmlFor="project" className="text-black">
          Проект
        </label>
        <select
          id="<project>"
          onChange={(e) => setTaskProject(e.target.value)}
          className="w-2/4 border border-4 border-black"
        >
            {
                category.map(el=>(
                    <option key={el.taskId}>{el.project}</option>
                ))
            }
        </select>
      </div>
      <div className="flex py-2 ">
        <label htmlFor="description" className="text-black">
          описание
        </label>
        <input
          id="description"
          type="text"
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-2/4 border border-4 border-black"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => addTasks(taskInput, taskname, taskPriority, taskDescription, taskProject)}
          className="border border-black"
        >
          сохранить
        </button>
        <button type="button" className="border border-black" onClick={() => onModalClose()}>
          Отменить
        </button>
      </div>
    </div>
  )
}

export default Add
