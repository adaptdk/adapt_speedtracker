import React from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars

import Logo from './Logo'

class Footer extends React.Component {
  render () {
    return (
      <footer className='c-Footer'>
        <div className='c-Footer__inner'>
          <a href="https://adaptagency.com">https://adaptagency.com</a>
          </div>
      </footer>
    )
  }
}

export default Footer
