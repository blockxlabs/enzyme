import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons/faArrowCircleDown';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import Visibility from '@material-ui/icons/Visibility';
import Settings from '@material-ui/icons/Settings';
import MoreVert from '@material-ui/icons/MoreVert';
import WifiOff from '@material-ui/icons/WifiOff';

const IconEdit = props => (
  <FontAwesomeIcon icon={faEdit} style={{ color: '#2f112b', fontSize: props.size }} {...props} />
);

const IconTransferFromTo = props => (
  <div
    style={{
      marginTop: '6px',
      paddingLeft: '38px',
      display: 'flex',
      flexDirection: 'row',
      width: '50%',
    }}
    {...props}
  >
    <FontAwesomeIcon
      icon={faArrowCircleDown}
      style={{
        color: '#000000',
        opacity: 1,
        fontSize: 21.2,
      }}
    />
  </div>
);

const IconTransfer = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faArrowCircleRight}
      style={{ color: 'rgba(112, 112, 112, 1)', fontSize: '16px' }}
    />
  </div>
);

const IconSettings = props => <Settings style={{ ...props.style }} {...props} />;

const IconVisibility = props => <Visibility style={{ ...props.style }} {...props} />;

const WalletDropDownIcon = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faWallet}
      style={{
        width: '18.29px',
        height: 16,
        color: 'rgba(255, 255, 255, 1)',
      }}
    />
    <MoreVert
      style={{
        fontSize: '1.5em',
        color: 'rgba(255, 255, 255, 1)',
      }}
    />
  </div>
);

const IconCheckCircle = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faCheckCircle}
      style={{ width: 10, height: 10, color: 'rgba(255, 255, 255, 1)' }}
    />
  </div>
);

const NetworkDisconnectionIcon = props => (
  <div {...props}>
    <WifiOff
      style={{
        fontSize: '1.5em',
        color: 'rgba(255, 255, 255, 1)',
      }}
    />
  </div>
);

export {
  IconEdit,
  IconTransferFromTo,
  IconTransfer,
  IconVisibility,
  WalletDropDownIcon,
  IconSettings,
  IconCheckCircle,
  NetworkDisconnectionIcon,
};
