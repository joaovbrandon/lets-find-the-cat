import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Creators as AuthActions } from '../../store/ducks/auth';
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

function Header({ user, logout, history }) {
  const metrics = useMetrics();
  const [modalMobileLoginOpened, setModalMobileLoginOpened] = useState(false);
  const [modalMyDonationsOpened, setModalMyDonationsOpened] = useState(false);
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  useEffect(() => {
    setModalMobileLoginOpened(false);
  }, [user]);

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
          <MenuItem type="button" onClick={() => setModalMyDonationsOpened(true)}>My Donations</MenuItem>
          <MenuItem type="button" onClick={() => logout(history)}>Log Out</MenuItem>
        </UserInfos>
        {metrics.isXS && <FontAwesomeIcon icon={faEllipsisV} size="sm" />}
      </UserContainer>
      {
        !modalMobileLoginOpened && (
          <Modal
            opened={modalMyDonationsOpened}
            setOpened={setModalMyDonationsOpened}
            title="My Donations"
          >
            <p>Donations</p>
          </Modal>
        )
      }
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
          <Button btnStyle={2} type="button" onClick={() => setModalMobileLoginOpened(true)}>
            Log In
            {' '}
            <FontAwesomeIcon icon={faSignInAlt} size="sm" />
          </Button>

          <Modal
            opened={modalMobileLoginOpened}
            setOpened={setModalMobileLoginOpened}
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
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header);
