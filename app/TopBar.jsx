import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SVG from 'react-inlinesvg';
import Logo from '../uploads/Logo.svg';

const startScheduler = (profile) => {
  const { slug } = profile;
  const url = `http://localhost:1234/create/adaptdk/adapt_speedtracker/master`;

  axios.post(url, {
    _default: false,
    name: "tester",
    interval: 5,
    parameters: {
      connectivity: "cable",
      location: "ec2-eu-west-3:Chrome",
      url: 'https://lol.com',
      runs: '2',
      video: true,
    }
  }).then((response) => {
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
