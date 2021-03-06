import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import withAuth from '../../../utils/withAuth';
import { attemptLogin } from '../../../actions/auth';
import LoginForm from './Component';

const mapStateToProps = (state: { auth: { loading: any } }) => ({
  loading: state.auth.loading,
});

const mapDispatchToProps = { attemptLogin };

const enhance: any = compose(
  reduxForm({ form: 'login' }),
  withAuth,
  connect(mapStateToProps, mapDispatchToProps)
);

const LoginFormContainer = enhance(LoginForm);

export default LoginFormContainer;
