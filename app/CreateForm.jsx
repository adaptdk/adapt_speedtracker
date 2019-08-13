import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  reduxForm,
  getFormValues,
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
import { sendProfile, startTest } from './Api';
import selectField from './Fields/selectField';
import checkboxField from './Fields/checkboxField';
import {
  connectivityOptions,
  locationOptions,
  baseURL,
  profileLink,
} from './Constants';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: undefined,
      response: undefined,
    };
  }

  onSubmit = () => {
    const { formValues, setLoading } = this.props;
    setLoading(true);
    return sendProfile(formValues)
      .then((res) => {
        if (res.success) this.onSuccess();
        else this.onError(res.error.code);
      });
  }

  onError = (err) => {
    const { setLoading } = this.props;
    setLoading(false);

    this.setState({
      status: 'error',
      response: err,
    });
  }

  onSuccess = () => {
    const {
      formValues: { name },
      setLoading,
      reset,
    } = this.props;

    startTest(name).then(() => {
      setLoading(false);
      reset();

      this.setState({
        status: 'success',
        response: `${profileLink}${name}`,
      });
    });
  }

  render() {
    const {
      handleSubmit,
      submitting,
      reset,
      pristine,
    } = this.props;
    const { status, response } = this.state;

    return (
      <Form
        className="c-Create-form"
        onSubmit={handleSubmit(this.onSubmit)}
      >
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
          disabled={submitting}
          type="submit"
        >
          Submit
        </button>
        {status === 'error'
          ? <div>{response}</div>
          : <a href={response}>{response}</a>
        }
        <button
          type="button"
          className="button button--back"
          onClick={() => { window.location.href = `${baseURL}/`; }}
        >
          Back
        </button>
        <button
          onClick={() => reset()}
          className="button button--reset"
          type="button"
          disabled={pristine || submitting}
        >
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
  },
});

const formConfig = {
  form: 'create',
};

CreateForm.propTypes = {
  pristine: PropTypes.bool.isRequired,
  formValues: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

CreateForm.defaultProps = {
  formValues: {},
};

export default connect(mapStateToProps)(reduxForm(formConfig)(CreateForm));
