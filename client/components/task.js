import React, { useState } from 'react'

const Task = ({ category, deleteTask, setModal, modal }) => {
  const [open, setOpen] = useState('hidden')
  return (
    <div className="border border-8 border-black font-bold  p-10 w-2/5 bg-gray-500 mb-2  h-56 overflow-y-scroll">
      {category.map((el) => (
        <div key={el.id} className="border border-black py-2 my-2">
          <h2>{el.title}</h2>
          <div className="flex justify-between">
            <p>project:{el.project}</p>
            <p>приоритет:{el.priority}</p>
          </div>
          <div className={open}>
            <p>description:{el.description}</p>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="border"
              onClick={() =>
                setModal({
                  ...modal,
                  modal1: true
                })
              }
            >
              изменить
            </button>
            <button
              type="button"
              className="border"
              onClick={() => {
                deleteTask(el.taskId)
              }}
            >
              закрыть
            </button>
            {open === 'hidden' ? (
              <button type="button" className="border" onClick={() => setOpen('block')}>
                развернуть
              </button>
            ) : (
              <button type="button" className="border" onClick={() => setOpen('hidden')}>
                свернуть
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Task
