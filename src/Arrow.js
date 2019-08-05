/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
/** eslint-enable */
class Arrow extends PureComponent { // eslint-disable-line
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254.296 254.296" {...this.props}>
        <path d="M249.628 176.101L138.421 52.88c-6.198-6.929-16.241-6.929-22.407 0l-.381.636L4.648 176.101c-6.198 6.897-6.198 18.052 0 24.981l.191.159c2.892 3.305 6.865 5.371 11.346 5.371h221.937c4.577 0 8.613-2.161 11.41-5.594l.064.064c6.261-6.929 6.261-18.084.032-24.981z" fill="#00A15F" />
      </svg>
    );
  }
}

export default Arrow;
