import React from 'react';
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
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.formValues);
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:1234/create/casper/lol/master', {
      default: false,
      name: 'test',
      interval: 5,
      parameters: {
        connectivity: 'cable',
        location: 'ec2-eu-west-3:Chrome',
        url: 'https://lol.com',
        runs: '2',
        video: true,
      },
    })
      .then(res => console.log(res));
  }

  render() {
    const { formValues } = this.props;
    return (
      <>
        <div>
          <button type="submit" onClick={this.onSubmit}>
            Submit
          </button>
        </div>
        <Form className="c-Create-form">
          <Checkbox />
          <Field
            type="text"
            name="pageName"
            label="Page Name"
            component={inputField}
            autoComplete="pageName"
            placeholder="Enter pagename"
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
      </>
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

export default connect(mapStateToProps)(reduxForm(formConfig)(CreateForm));
