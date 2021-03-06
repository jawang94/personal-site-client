import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../../utils/withAuth';
import { attemptSignup } from '../../../actions/auth';
import validate from './validate';
import SignupForm from './Component';

const mapStateToProps = (state: { auth: { loading: any } }) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = { attemptSignup };

const enhance: any = compose(
  reduxForm({ form: 'signup', validate }),
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
);

const SignupFormContainer = enhance(SignupForm);

export default SignupFormContainer;
