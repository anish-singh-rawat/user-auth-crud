import React from 'react'
import MiniDrawer from '../component/dashboard'

const layout = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#2d3436', color: 'white' }}>
      <MiniDrawer pages={children} />
    </div>
  )
}

export default layout