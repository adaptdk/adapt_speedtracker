import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SVG from 'react-inlinesvg';
import Logo from '../uploads/Logo.svg';
import { connect } from 'react-redux';
import {
  reduxForm,
  getFormValues,
  Form,
  Field,
} from 'redux-form';

const startScheduler = (profile) => {
  const { slug } = profile;
  const url = `https://speedyapi.herokuapp.com/v1/test/adaptdk/adapt_speedtracker/master/${slug}`;

  axios.get(url, {
    params: {
      key: 'kobajers',
    },
  })
    .then((response) => {
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
      <button type="button" onClick={() => startScheduler(profile)}>Start test</button>
    </div>

    <Form onSubmit={(e) => {
      e.preventDefault();
      console.log(formValues);
    }}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            className="TEST"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <button type="submit">
          Submit
      </button>
    </Form>
  </div>
);


TopBar.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  formValues: getFormValues('TopBar')(state),
});

const formConfig = {
  form: 'TopBar',
};

export default connect(mapStateToProps)(reduxForm(formConfig)(TopBar));
