import React from 'react'
import Router from 'next/router'

function pagetwo() {
  return (
    <div>

<button onClick={()=>Router.push('/buynft')}>
  click me
</button>
    </div>
  )
}

export default pagetwo