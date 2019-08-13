import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Creators as AuthActions } from '../../store/ducks/auth';
import { Creators as LoaderActions } from '../../store/ducks/loader';
import { useMetrics } from '../../hooks';
import Button from '../Button';
import LoginForm from '../LoginForm';
import Modal from '../Modal';
import {
  Container,
  Logo,
  LoginFormContainer,
  UserContainer,
  UserAvatar,
  UserInfos,
  UserName,
  MenuItem,
  MobileMenuOpacity,
} from './styles';

function Header({
  user, startLoading, stopLoading, logout, history,
}) {
  const metrics = useMetrics();
  const [modalOpened, setModalOpened] = useState(false);
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  const handleLogout = async () => {
    startLoading('Logging out...');

    /*
      Timeout for evaluation purposes only
      (for the loading be visible if the action was too fast)
    */
    await new Promise(resolve => setTimeout(resolve, 500));

    await logout();
    await history.push('/');
    stopLoading();
  };

  const handleMobileMenu = () => {
    if (!metrics.isXS) return;
    setMobileMenuOpened(!mobileMenuOpened);
  };

  const renderLoggedContent = () => (
    <>
      <UserContainer onClick={handleMobileMenu}>
        <UserAvatar src={user.avatar_url} alt={user.name} />
        {(metrics.isXS && mobileMenuOpened) && <MobileMenuOpacity onClick={handleMobileMenu} />}
        <UserInfos mobileMenuOpened={mobileMenuOpened}>
          <UserName>{user.name}</UserName>
          <MenuItem type="button">My Donations</MenuItem>
          <MenuItem type="button" onClick={handleLogout}>Log Out</MenuItem>
        </UserInfos>
        {metrics.isXS && <FontAwesomeIcon icon={faEllipsisV} size="sm" />}
      </UserContainer>
    </>
  );

  const renderLoginForm = () => (
    metrics.isXL || metrics.isLG || metrics.isMD
      ? (
        <>
          <LoginFormContainer>
            <p>Log In to donate and help find lost cats!</p>
            <LoginForm />
          </LoginFormContainer>
        </>
      )
      : (
        <>
          <Button btnStyle={2} type="button" onClick={() => setModalOpened(true)}>
            Log In
            {' '}
            <FontAwesomeIcon icon={faSignInAlt} size="sm" />
          </Button>

          <Modal
            opened={modalOpened}
            setOpened={setModalOpened}
            title="Let's find the cat!"
            description="Log In to donate and help find lost cats!"
          >
            <LoginForm />
          </Modal>
        </>
      )
  );

  return (
    <Container>
      <Link to="/">
        <Logo title="Let's find the cat" />
      </Link>
      {user ? renderLoggedContent() : renderLoginForm()}
    </Container>
  );
}

Header.defaultProps = {
  user: null,
};

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    login: PropTypes.string,
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    amountDonated: PropTypes.number,
  }),
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...AuthActions,
  ...LoaderActions,
}, dispatch);

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header);
