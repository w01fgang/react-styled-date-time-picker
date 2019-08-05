// @flow
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import styled, { type StyledComponent } from 'styled-components';
import { ReactPageClick } from 'react-page-click';
/** eslint-enable */

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
  position: fixed;
  top: 5%;
  left: 50%;
  width: 649px;
  height: 477px;
  margin-left: -324.5px;
  border-radius: 5;
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
