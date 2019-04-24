import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArrowCircleDown, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Visibility, KeyboardArrowRight, Settings } from '@material-ui/icons';

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
    <KeyboardArrowRight style={{ fontSize: '40px', ...props.style }} />
  </div>
);

export {
  IconEdit,
  IconTransferFromTo,
  IconTransfer,
  IconVisibility,
  WalletDropDownIcon,
  IconSettings,
};
