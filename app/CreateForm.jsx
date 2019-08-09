import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  reduxForm,
  getFormValues,
  getFormSyncErrors,
  Form,
  Field,
} from 'redux-form';
import {
  required,
  maxName,
  interval,
  url,
  runs,
  specialCharacters,
} from './Validation';
import inputField from './Fields/inputField';
import sendProfile from './Api';
import selectField from './Fields/selectField';
import checkboxField from './Fields/checkboxField';
import { connectivityOptions, locationOptions, baseURL } from './Constants';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
    };
  }

  onSubmit = () => {
    const { formValues, setLoading } = this.props;
    setLoading(true);
    return sendProfile(formValues)
      .then(({ response }) => {
        setLoading(false);

        if (response.success) this.onSuccess();
        else this.onError(response.error.code);
      });
  }

  onError = (err) => {
    this.setState({
      response: err,
    });
  }

  onSuccess = () => {
    this.setState({
      response: 'The profile has been created',
    });
  }

  render() {
    const {
      handleSubmit,
      submitting,
      formErrors,
      reset,
    } = this.props;
    const { response } = this.state;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit)} className="c-Create-form">
        <Field
          type="text"
          name="name"
          label="Name"
          component={inputField}
          autoComplete="name"
          placeholder="Enter name"
          validate={[
            required,
            specialCharacters,
            maxName,
          ]}
        />
        <Field
          type="number"
          max="5"
          name="interval"
          label="Interval"
          component={inputField}
          autoComplete="interval"
          placeholder="Enter an interval"
          validate={[
            required,
            interval,
          ]}
        />
        <Field
          name="connectivity"
          label="Connectivity"
          validate={required}
          options={connectivityOptions}
          component={selectField}
          placeholder="Select a connectivity type..."
        />
        <Field
          disabled
          name="location"
          label="Location"
          options={locationOptions}
          component={selectField}
          placeholder="Select a location..."
          validate={required}
        />
        <Field
          type="text"
          name="url"
          label="URL"
          component={inputField}
          autoComplete="url"
          placeholder="Enter a url"
          validate={[
            required,
            url,
          ]}
        />
        <Field
          type="number"
          name="runs"
          label="Runs"
          component={inputField}
          autoComplete="runs"
          placeholder="Enter run count"
          validate={[
            required,
            runs,
          ]}
        />
        <div className="wrapper">
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
        <button
          className="button button--submit"
          disabled={submitting || Object.keys(formErrors).length !== 0}
          type="submit"
        >
          Submit
        </button>
        <div>
          {response}
        </div>
        <button
          onClick={() => reset()}
          className="button button--reset"
          type="button"
        >
          Reset
        </button>
        <button
          type="button"
          className="button button--back"
          onClick={() => { window.location.href = `${baseURL}/`; }}
        >
          Back
        </button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('create')(state),
  formErrors: getFormSyncErrors('create')(state),
  initialValues: {
    location: locationOptions[0],
    video: false,
    isfrontpage: false,
  },
});

const formConfig = {
  form: 'create',
};

CreateForm.propTypes = {
  formValues: PropTypes.object,
  formErrors: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

CreateForm.defaultProps = {
  formValues: {},
  formErrors: {},
};

export default connect(mapStateToProps)(reduxForm(formConfig)(CreateForm));
