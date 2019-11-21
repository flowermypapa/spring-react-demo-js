import React from 'react'
export const Container = (props) => (
  <div style={{width: '1400px', padding: '15px', margin:'0 auto', textAlign: 'center'}}>
    {props.children}
  </div>
)