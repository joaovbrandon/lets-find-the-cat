import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useMetrics } from '../../hooks';
import {
  Container, Logo, LoginFormContainer, OpenLoginModalBtn,
} from './styles';
import LoginForm from '../LoginForm';
import Modal from '../Modal';

export default function Header() {
  const metrics = useMetrics();
  const [modalOpened, setModalOpened] = useState(false);

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
          <OpenLoginModalBtn type="button" onClick={() => setModalOpened(true)}>
            Log In
            {' '}
            <FontAwesomeIcon icon={faSignInAlt} size="sm" />
          </OpenLoginModalBtn>

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
      {renderLoginForm()}
    </Container>
  );
}
