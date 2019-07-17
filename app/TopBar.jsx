import React from 'react';
import Logo from './Logo';

export default class TopBar extends React.PureComponent {
  render() {
    return (
      <div className="c-TopBar">
        <div className="c-TopBar__inner">
          <Logo width={40} />
        </div>
      </div>
    );
  }
}
