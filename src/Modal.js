// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import styled, { type StyledComponent } from 'styled-components';
/** eslint-enable */

const Container: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
`;

const Overlay: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const Popup: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  width: 617px;
  height: 477px;
  border-radius: 5px;
  z-index: 1001;
`;

const Content: StyledComponent<{}, {}, HTMLDivElement> = styled.div`
  padding: 0;
`;

const noop = () => {};

type Props = {
  onClose: () => void,
  closeOnOutsideClick?: boolean,
};

class Modal extends PureComponent<Props> {
  static defaultProps = {
    closeOnOutsideClick: true,
  }

  render() {
    const { onClose, closeOnOutsideClick, ...props } = this.props;

    return (
      <Container>
        <Overlay onClick={closeOnOutsideClick ? onClose : noop} />
        <Popup>
          <Content {...props} />
        </Popup>
      </Container>
    );
  }
}

export default Modal;
