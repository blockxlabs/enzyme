import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faCheck,
  faFileImport,
  faCog,
  faExclamationTriangle,
  faTrash,
  faEdit,
  faInfoCircle,
  faFile,
  faStopwatch,
  faSeedling,
  faKey,
  faCopy,
  faWindowClose,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';

const IconSendTransaction = () => (
  <FontAwesomeIcon icon={faSignOutAlt} style={{ color: '#000000', opacity: 0.3, fontSize: 19 }} />
);

const IconWindowClose = props => (
  <FontAwesomeIcon
    icon={faWindowClose}
    style={{ color: '#000000', opacity: 1, fontSize: props.size }}
  />
);

const IconDelete = props => (
  <FontAwesomeIcon icon={faTrash} style={{ color: '#2f112b', fontSize: props.size }} />
);

const ListIconDelete = props => (
  <FontAwesomeIcon
    onClick={props.onClick}
    icon={faTrash}
    style={{
      color: '#FFFFFF',
      opacity: 0.6,
      marginRight: props.marginRight,
      fontSize: props.size,
    }}
  />
);
const IconEdit = props => (
  <FontAwesomeIcon icon={faEdit} style={{ color: '#2f112b', fontSize: props.size }} />
);

const IconImportVault = () => (
  <FontAwesomeIcon
    icon={faFileImport}
    style={{
      color: '#FFFFFF',
      opacity: 1,
      fontSize: 15,
    }}
  />
);

const IconSeedWords = () => (
  <FontAwesomeIcon
    icon={faSeedling}
    style={{
      color: '#FFFFFF',
      opacity: 1,
      fontSize: 15,
    }}
  />
);

const IconPrivateKey = () => (
  <FontAwesomeIcon
    icon={faKey}
    style={{
      color: '#FFFFFF',
      opacity: 1,
      fontSize: 15,
    }}
  />
);

const IconSettings = () => (
  <FontAwesomeIcon icon={faCog} style={{ color: '#FFFFFF', opacity: 1, fontSize: 15 }} />
);
const IconFile = () => (
  <FontAwesomeIcon
    icon={faFile}
    style={{
      color: '#000000',
      opacity: 1,
      fontSize: 15,
      marginRight: 6,
    }}
  />
);

const IconFileUpload = () => (
  <FontAwesomeIcon
    icon={faFileImport}
    style={{
      color: '#000000',
      opacity: 1,
      fontSize: 15,
      marginRight: 6,
    }}
  />
);
const IconStopwatch = () => (
  <FontAwesomeIcon icon={faStopwatch} style={{ color: '#FFFFFF', opacity: 1, fontSize: 15 }} />
);
const IconCopy = () => (
  <FontAwesomeIcon icon={faCopy} style={{ color: '#719db1', opacity: 1, fontSize: 15 }} />
);

const IconSuccess = () => (
  <FontAwesomeIcon icon={faCheck} style={{ color: '#FFFFFF', fontSize: 16 }} />
);

const IconInfo = () => (
  <FontAwesomeIcon
    icon={faInfoCircle}
    style={{
      color: '#FFFFFF',
      marginRight: 6,
      opacity: 1,
      fontSize: 15,
    }}
  />
);

const IconDisclaimer = () => (
  <FontAwesomeIcon
    icon={faExclamationTriangle}
    style={{ color: '#EBEBEB', opacity: 1, fontSize: 22 }}
  />
);

const IconConnect = () => (
  <FontAwesomeIcon
    icon={faExchangeAlt}
    style={{
      color: '#666',
      opacity: 1,
      fontSize: 40,
    }}
  />
);

export class IconSelectToken extends PureComponent {
  render() {
    const { style, ...otherProps } = this.props;
    return (
      <FontAwesomeIcon
        icon={faCheck}
        style={{
          color: '#FFFFFF',
          opacity: 1,
          fontSize: 20,
          ...style,
        }}
        {...otherProps}
      />
    );
  }
}

export {
  IconSendTransaction,
  IconImportVault,
  IconSettings,
  IconDisclaimer,
  IconDelete,
  IconEdit,
  IconInfo,
  IconFile,
  IconFileUpload,
  IconStopwatch,
  IconSeedWords,
  IconPrivateKey,
  IconCopy,
  ListIconDelete,
  IconConnect,
  IconWindowClose,
  IconSuccess,
};
