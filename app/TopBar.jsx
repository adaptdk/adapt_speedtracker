import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SVG from 'react-inlinesvg';
import Logo from '../uploads/Logo.svg';
const startScheduler = (profile) => {
  const url = `https://speedyapi.herokuapp.com/v1/test/adaptdk/adapt_speedtracker/master`;

  axios.get(`${url}/${profile.slug}\?key\=kobajers`).then((response) => {
      if (response.data.success === true) console.log(`next run at ${new Date(response.data.nextRun)}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

const TopBar = ({ profile, formValues }) => (
  <div className="c-TopBar">
    <div className="c-TopBar__inner">
      <SVG width="70px" src={Logo} />
      <div className="logo-text">
        <span>SPEED</span>
        <span>MONITOR</span>
      </div>
      <button className="start-test" type="button" onClick={() => startScheduler(profile)}>Start test</button>
    </div>
  </div>
);


TopBar.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default TopBar;
