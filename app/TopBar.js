import React from 'react'
import { render } from 'react-dom' // eslint-disable-line no-unused-vars
import { Dropdown } from 'semantic-ui-react'
import { dropdownPeriod } from './common/constants'
import { formatProfileDropdown } from './Utils'

import Logo from './Logo'

class TopBar extends React.Component {
  _onPeriodChange = (...props) => {
    this.props.onPeriodChange(props[1].value);
  }

  _onProfileChange = (...props) => {
    this.props.onProfileChange(props[1].value);
  }

  render () {
    const { 
      period,
      profiles,
      profile: { slug }
    } = this.props;
    return (
      <div className='c-TopBar'>
        <div className='c-TopBar__inner'>
          <Logo width={40} />
          <div className='c-TopBar__nav'>
            Viewing
            <Dropdown className='c-TopBar__select-profile'
              defaultValue={slug}
              onChange={this._onProfileChange}
              options={formatProfileDropdown(profiles)}
            /> in the last
            <Dropdown
              defaultValue={period}
              className='c-TopBar__select-period'
              options={dropdownPeriod}
              onChange={this._onPeriodChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TopBar
