import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import { DASHBOARD_PAGE } from '../../constants/navigation';
import CustomNetworkForm from '../../components/network/custom-network-form';
import EnzymeValidator from '../../utils/enzyme-validator';
import validator from '../../utils/enzyme-validator/validator';
import './styles.css';

export default class CustomNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.customNetwork ? props.customNetwork.url : '',
      isURLValid: true,
      urlInvalidMessage: '',
    };
    this.validator = new EnzymeValidator(validator.customNetworkValidation);
    this.urlField = React.createRef();
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubheaderBackBtn = () => {
    this.props.changePage(DASHBOARD_PAGE);
  };

  handleSave = () => {
    const { url } = this.state;
    let { isURLValid, urlInvalidMessage } = this.state;
    const validation = this.validator.validate({ url });
    if (!validation.isValid) {
      this.urlField.focus();
      isURLValid = false;
      urlInvalidMessage = 'Invalid URL';
    } else {
      isURLValid = true;
      urlInvalidMessage = '';
      this.props.setCustomNetwork(url);
      this.props.changePage(DASHBOARD_PAGE);
    }
    this.setState({ isURLValid, urlInvalidMessage });
  };

  render() {
    const { url, isURLValid, urlInvalidMessage } = this.state;
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Custom Network"
          backBtnOnClick={this.handleSubheaderBackBtn}
        />
        <CustomNetworkForm
          className="custom-network-form"
          onSave={this.handleSave}
          url={url}
          name="url"
          onChange={this.onChange}
          isURLValid={isURLValid}
          urlInvalidMessage={urlInvalidMessage}
          urlRef={input => {
            this.urlField = input;
          }}
        />
      </div>
    );
  }
}
