// @flow
/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { ReactPageClick } from 'react-page-click';
/** eslint-enable */

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const Popup = styled.div`
  position: fixed;
  top: 5%;
  left: 50%;
  width: 302px;
  height: 477px;
  margin-left: -151px;
  border-radius: 5;
  z-index: 1001;
`;

const Content = styled.div`
  padding: 0;
`;

const noop = () => {};

type Props = {
  onClose: Function,
  closeOnOutsideClick: boolean,
};

class Modal extends PureComponent<Props> {
  render() {
    const { onClose, closeOnOutsideClick, ...props } = this.props;

    return (
      <div>
        <Overlay />
        <ReactPageClick notify={closeOnOutsideClick ? onClose : noop}>
          <Popup>
            <Content {...props} />
          </Popup>
        </ReactPageClick>
      </div>
    );
  }
}

export default Modal;
