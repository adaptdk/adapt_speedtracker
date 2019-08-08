import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';
import {
  reduxForm,
  getFormValues,
  Form,
  Field,
} from 'redux-form';
import inputField from './Fields/inputField';
import dropdownField from './Fields/dropdownField';
import checkboxField from './Fields/checkboxField';
import { connectivityOptions, locationOptions } from './Constants';

const axios = require('axios');

class CreateForm extends React.Component {
  onSubmit = () => {
    console.log(this.props.formValues)
    const {
      formValues: {
        isfrontpage, name, interval, connectivity, location, url, runs, video,
      },
    } = this.props;
    const formated = {
      isfrontpage,
      name,
      interval,
      parameters: {
        connectivity,
        location,
        url,
        runs,
        video,
      },
    };
    console.log(formated);
    const apiUrl = 'https://speedyapi.herokuapp.com/create/adaptdk/adapt_speedtracker/master?key=kobajers';


    axios.post(apiUrl, {
      ...formated,
    })
      .then(res => console.log(res))
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} className="c-Create-form">
        <Checkbox />
        <Field
          type="text"
          name="name"
          label="Name"
          component={inputField}
          autoComplete="name"
          placeholder="Enter name"
        />
        <Field
          type="number"
          max="5"
          name="interval"
          label="Interval"
          component={inputField}
          autoComplete="interval"
          placeholder="Enter an interval"
        />
        <Field
          name="connectivity"
          label="Connectivity"
          options={connectivityOptions}
          component={dropdownField}
          placeholder="Select a connectivity type..."
        />
        <Field
          disabled
          name="location"
          label="Location"
          options={locationOptions}
          component={dropdownField}
          placeholder="Select a location..."
        />
        <Field
          type="text"
          name="url"
          label="URL"
          component={inputField}
          autoComplete="url"
          placeholder="Enter a url"
        />
        <Field
          type="number"
          name="runs"
          label="Runs"
          component={inputField}
          autoComplete="runs"
          placeholder="Enter run count"
        />
        <div>
          <Field
            name="video"
            label="Video"
            component={checkboxField}
          />
          <Field
            name="isfrontpage"
            label="isfrontpage"
            component={checkboxField}
          />
        </div>
        <div>
          <button className="button button--red" type="submit">
            Submit
          </button>
        </div>
        <button type="button">
          Reset
        </button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('create')(state),
  initialValues: {
    location: locationOptions[0],
    video: false,
    isfrontpage: false,
    runs: 5,
  },
});

const formConfig = {
  form: 'create',
};

CreateForm.propTypes = {
  formValues: PropTypes.object,
};

CreateForm.defaultProps = {
  formValues: {},
};

export default connect(mapStateToProps)(reduxForm(formConfig)(CreateForm));
