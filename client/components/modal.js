import React from 'react'
import Add from './add'
import './input.css'

const Modal = ({ addTasks, isOpened, onModalClose, category }) => {
  return (
    <div className={`modal_wrapper ${isOpened ? 'open' : 'close'}`}>
      <div className="modal_body">
        <Add addTasks={addTasks} onModalClose={onModalClose} category={category} />
      </div>
    </div>
  )
}

export default Modal
