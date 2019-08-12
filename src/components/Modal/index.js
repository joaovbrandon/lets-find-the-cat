import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Opacity, Content, Close,
} from './styles';

function Modal({
  opened, setOpened, title, description, children, isLoading,
}) {
  useEffect(() => {
    const closeModalListener = (event) => {
      if (isLoading) return;

      if (event.type === 'resize') {
        setOpened(false);
        return;
      }

      if (event.type === 'keyup') {
        const key = event.key || event.keyCode;
        if (key === 'Escape' || key === 'Esc' || key === 27) setOpened(false);
      }
    };

    if (opened) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
      window.addEventListener('keyup', closeModalListener);
      window.addEventListener('resize', closeModalListener);
    }

    return () => {
      document.body.style.height = '';
      document.body.style.overflow = '';
      window.removeEventListener('keyup', closeModalListener);
      window.removeEventListener('resize', closeModalListener);
    };
  }, [opened, setOpened, isLoading]);

  return (
    <Container opened={opened}>
      <Opacity onClick={() => setOpened(false)} />
      <Content>
        <Close onClick={() => setOpened(false)}>&times;</Close>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        {children}
      </Content>
    </Container>
  );
}

Modal.defaultProps = {
  title: null,
  description: null,
};

Modal.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading,
});

export default connect(
  mapStateToProps,
)(Modal);
