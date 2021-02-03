import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-yellow-400  font-bold rounded-lg border shadow-lg p-10">
          DASHBOARD component
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {}

export default React.memo(Dashboard)
