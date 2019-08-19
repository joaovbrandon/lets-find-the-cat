import styled from 'styled-components';
import originalReactSelect from 'react-select';
import { colors, fontSizes } from '../../styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex: 1 0;

  .select {
    &-container {
      max-width: 500px;
    }

    &__ {
      &control {
        width: 100%;
        border-radius: 8px;
        border: 2px solid ${colors.primary};
        color: ${colors.primary};
        font-size: ${fontSizes.small};
        outline: none;

        &--menu-is-open,
        &:hover,
        &:focus,
        &:active {
          border: 2px solid ${colors.primary};
          box-shadow: 0 0 0 1px ${colors.inputShadow};
        }
      }

      &placeholder,
      &input {
        color: ${colors.primary};
        font-size: ${fontSizes.small};
      }

      &indicator-separator {
        background: ${colors.secondary};
      }

      &indicator {
        color: ${colors.primary};
        cursor: pointer;
      }

      &multi-value__{
        &remove {
          cursor: pointer;
          color: ${colors.primary};
          transition: .2s all;

          &:hover {
            color: ${colors.white};
            background: ${colors.backgroundOpacity};
          }
        }

        &label {
          color: ${colors.primary};
          font-size: ${fontSizes.small};
        }
      }

      &menu {
        &-list {
        }
      }

      &option {
        color: ${colors.primary};
        font-size: ${fontSizes.small};

        &--is-focused,
        &:hover,
        &:active {
          background: ${colors.selectHover};
          cursor: pointer;
        }
      }
    }
  }
`;

export const ReactSelect = styled(originalReactSelect)`
  flex: 1;
  z-index: 9996;
`;
