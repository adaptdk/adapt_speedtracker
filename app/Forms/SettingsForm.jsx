import React from 'react';
import PropTypes from 'prop-types';

const SettingsForm = ({ profile }) => (
  <div>
    <div>
      <div>Name</div>
      <div>{profile.name}</div>
    </div>
  </div>
);

SettingsForm.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default SettingsForm;
