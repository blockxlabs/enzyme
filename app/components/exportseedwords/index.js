import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import Libraries
import Animated from 'animated/lib/targets/react-dom';
import { keccak512 } from 'js-sha3';
import classNames from 'classnames';

// Import Components
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ButtonXS from '../common/buttons/button-xs';
import FontRegular from '../common/fonts/font-regular';

import { IconSeedWords, IconCopy } from '../common/icon';
import IconInput from '../common/inputs/icon-input';

// Import Actions and Services
import { createToast } from '../../constants/toast';
import FontError from '../common/fonts/font-error';
// Import Constants
import {
  EXPORT_SEED_WORDS_INPUT_HEIGHT,
  EXPORT_SEED_WORDS_DISPLAY_HEIGHT,
  EXPORT_SEED_WORDS_ITEM,
  settingsItemAnimatedMap,
  settingsItemHighlightMap,
} from '../../constants/animation';

// Import Services
import {
  shrinkSettingItems,
  animateSettingItemIn,
  animateSettingItemOut,
  unhighlightSettingItems,
  highlightSettingItems,
} from '../../services/animationService';

import './styles.css';

function mapStateToProps(state) {
  return {
    pageStatus: state.appState.pageStatus,
    wallets: state.wallets.wallets,
    currentWallet: state.wallets.currentWallet,
    showSettings: state.animationReducer.showSettings,
    token: state.appState.token,
  };
}

// Declare Export Seed Words Input Height
const exportSeedWordsItemHeight = settingsItemAnimatedMap.get(EXPORT_SEED_WORDS_ITEM);

class ExportSeedWords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pwd: '',
      error: false,
      seedWords: '',
      showSeedWords: false,
      highlightContainer: false,
      seedWordsHighlight: false,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.showSettings === false) {
      Animated.timing(exportSeedWordsItemHeight, {
        toValue: 0,
      }).start();
    }

    return null;
  }

  toggleExportSeedWordsInputAnimation = () => {
    // Unhighlight Item
    unhighlightSettingItems(EXPORT_SEED_WORDS_ITEM);
    this.handleContainerMouseEnter();

    this.setState({
      pwd: '',
      error: false,
      showSeedWords: false,
      seedWords: '',
    });

    // Shrink Other Items EXCEPT Seed Wods
    shrinkSettingItems(EXPORT_SEED_WORDS_ITEM);

    // Expand Export Seed Words to display Input
    animateSettingItemIn(exportSeedWordsItemHeight, EXPORT_SEED_WORDS_INPUT_HEIGHT);
  };

  toggleExportSeedWordsDisplayAnimation = () => {
    // Shrink Other Items EXCEPT Seed Wods
    shrinkSettingItems(EXPORT_SEED_WORDS_ITEM);

    // Expand Export Seed Words to display Seed words div
    animateSettingItemIn(exportSeedWordsItemHeight, EXPORT_SEED_WORDS_DISPLAY_HEIGHT);
  };

  handelOnChange = event => {
    const { value } = event.target;
    this.setState({ pwd: value });
  };

  handleExport = async () => {
    const {
      props: { token },
      state: { pwd },
    } = this;

    const hashKey = keccak512(pwd);
    this.setState({ error: false });

    if (hashKey === token) {
      const vault = {};
      if (vault !== undefined) {
        animateSettingItemOut(exportSeedWordsItemHeight, () => {
          this.setState({ seedWords: vault.seedWords, showSeedWords: true }, () => {
            Animated.delay(250).start(() => {
              this.toggleExportSeedWordsDisplayAnimation();
            });
          });
        });
      }
    } else {
      this.setState({ error: true });
    }
  };

  handleExportCopyToClipboard = () => {
    // Animate Setings out
    highlightSettingItems();
    animateSettingItemOut(exportSeedWordsItemHeight, () => {
      Animated.delay(250).start(() => {
        this.setState({
          pwd: '',
          error: false,
          showSeedWords: false,
          seedWords: '',
        });
      });
    });

    // Show Toast once Seed Words copied to clipboard
    this.props.createToast({
      message: 'Seed words have been copied to clipboard.',
      type: 'success',
    });
  };

  handleHighlightSeedWordsEnter = () => {
    this.setState({
      seedWordsHighlight: true,
    });
  };

  handleHighlightSeedWordsLeave = () => {
    this.setState({
      seedWordsHighlight: false,
    });
  };

  handleContainerMouseEnter = () => {
    let highlightContainer = true;

    if (settingsItemHighlightMap.get(EXPORT_SEED_WORDS_ITEM)) {
      highlightContainer = false;
    }

    this.setState({
      highlightContainer,
    });
  };

  handleContainerMouseLeave = () => {
    this.setState({ highlightContainer: false });
  };

  render() {
    const {
      error, showSeedWords, seedWords, highlightContainer, seedWordsHighlight
    } = this.state;

    const seedWordsPhraseClassName = classNames({
      'settings-export-seed-words-phrase': true,
      'settings-export-seed-words-phrase-highlighted': seedWordsHighlight,
    });

    const containerClassName = classNames({
      [this.props.className]: true,
      [`${this.props.className}-highlighted`]: highlightContainer,
    });

    return (
      <div
        className={containerClassName}
        onMouseEnter={this.handleContainerMouseEnter}
        onMouseLeave={this.handleContainerMouseLeave}
      >
        <div
          className="settings-export-seed-words-label"
          onClick={() => this.toggleExportSeedWordsInputAnimation()}
        >
          <IconSeedWords className="settings-icon" />
          <FontRegular className="settings-title">Show Seed Words</FontRegular>
        </div>

        <Animated.div
          className="settings-export-seed-words-content"
          style={{
            height: exportSeedWordsItemHeight,
            overflow: 'hidden',
          }}
        >
          {showSeedWords === false && (
            <div className="settings-export-seed-words-input">
              <IconInput
                type="password"
                name="pwd"
                error={error}
                icon={faKey}
                placeholder="Enter Password"
                onChange={this.handelOnChange}
                value={this.state.pwd}
              />

              {error ? <FontError style={{ color: '#FF0000' }}>Invalid Password</FontError> : null}
            </div>
          )}
          {showSeedWords === false && (
            <div className="settings-export-seed-words-button">
              <ButtonXS onClick={this.handleExport}>View</ButtonXS>
            </div>
          )}
          {showSeedWords && (
            <div className="settings-export-seed-words-input" style={{ paddingLeft: 5 }}>
              <span className={seedWordsPhraseClassName}>{seedWords}</span>
            </div>
          )}
          {showSeedWords && (
            <div
              className="settings-export-seed-words-button"
              style={{
                alignSelf: 'center',
              }}
            >
              <CopyToClipboard text={this.state.seedWords}>
                <span
                  className="settings-export-seed-words-copy-icon"
                  onClick={this.handleExportCopyToClipboard}
                  onMouseEnter={this.handleHighlightSeedWordsEnter}
                  onMouseLeave={this.handleHighlightSeedWordsLeave}
                >
                  <IconCopy />
                </span>
              </CopyToClipboard>
            </div>
          )}
          <div className="settings-export-padding" />
        </Animated.div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createToast: toastOptions => dispatch(createToast(toastOptions)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportSeedWords);
