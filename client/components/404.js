import React, { useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

const NotFound = () => {
  useEffect(() => {}, [])
  const dispatch = useDispatch()
  return (
    <div className="container mx-auto">
      <div className="text-center">
        <img src="https://i.imgur.com/qIufhof.png" alt="not found" width="300" className="inline" />
        <div id="info">
          <h3>This page could not be found</h3>
        </div>
        <button
          className="btn btn-secondary btn-lg bg-yellow-400 p-2 rounded mt-3 "
          type="button"
          tabIndex="0"
          onClick={() => {
            dispatch(push('/'))
          }}
        >
          {' '}
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

NotFound.propTypes = {}

NotFound.defaultProps = {}

export default NotFound
