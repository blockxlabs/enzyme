import Animated from 'animated/lib/targets/react-dom';
import { showNetworks } from './networks';

// Constants Used for Vault Settings
export const SESSION_TIMEOUT_ITEM = 'SESSION_TIMEOUT_ITEM';
export const EXPORT_SEED_WORDS_ITEM = 'EXPORT_SEED_WORDS_ITEM';
export const settingsItemsArr = [EXPORT_SEED_WORDS_ITEM, SESSION_TIMEOUT_ITEM];

// Constant used for Application wide Settings/Dropdowns
export const VAULT_SETTINGS = 'VAULT_SETTINGS';
export const NETWORK_DROPDOWN_SETTINGS = 'NETWORK_DROPDOWN_SETTINGS';
export const WALLET_DROPDOWN = 'WALLET_DROPDOWN';
export const TOKEN_MARKET_DATA = 'TOKEN_MARKET_DATA';
export const applicationSettingsArr = [
  WALLET_DROPDOWN,
  VAULT_SETTINGS,
  NETWORK_DROPDOWN_SETTINGS,
  TOKEN_MARKET_DATA,
];

// Declare Array for Open Animations (Application Wide). This should not be touched
export const expandApplicationSettingArr = [];

// Create Map For Application wide Settings
const applicationSettingsAnimatedMapTemp = new Map();
applicationSettingsArr.forEach(item => {
  applicationSettingsAnimatedMapTemp.set(item, new Animated.Value(0));
});
export const applicationSettingsAnimatedMap = applicationSettingsAnimatedMapTemp;

const settingsItemAnimatedMapTemp = new Map();
const settingsItemHighlightMapTemp = new Map();
settingsItemsArr.forEach(item => {
  settingsItemAnimatedMapTemp.set(item, new Animated.Value(0));
  settingsItemHighlightMapTemp.set(item, false);
});

// Map of Animated Objects for Vault Settings Items
export const settingsItemAnimatedMap = settingsItemAnimatedMapTemp;
export const settingsItemHighlightMap = settingsItemHighlightMapTemp;

// Settings Height Constants
export const SWITCH_WAIT_TIME_MS = 350;
export const CREATE_VAULT_HEADER_HEIGHT = 180;
export const SETTINGS_HEIGHT = 87.4;
export const NETWORK_LIST_HEIGHT = 180;

// Network List Settings Height Constants
export const CUSTOM_NETWORK_HEIGHT = 120;

// Settings Height Constants
export const SESSION_TIMEOUT_HEIGHT = 57;
export const EXPORT_SEED_WORDS_INPUT_HEIGHT = 57; // Add Appropiate height (When only the input field is shown)
export const EXPORT_SEED_WORDS_DISPLAY_HEIGHT = 57; // Add Appropiate height (When both input field and seed words is shown)

// Wallet Settings Height Constants
export const WALLET_DROPDOWN_INPUT_HEIGHT = 57.5;
export const WALLET_DROPDOWN_ITEM_HEIGHT = 65;
export const WALLET_DROPDOWN_EMPTY_SEARCH_HEIGHT = 130;

// Reducer Constants
export const SHOW_SETTINGS = 'SHOW_SETTINGS';
export const TOGGLE_WALLET_DROPDOWN = 'TOGGLE_WALLET_DROPDOWN';
export const TOGGLE_TOKEN_MARKET_DATA = 'TOGGLE_TOKEN_MARKET_DATA';

export function toggleShowSettings(data) {
  return {
    type: SHOW_SETTINGS,
    payload: data,
  };
}

export function toggleWalletDropdown(data) {
  return {
    type: TOGGLE_WALLET_DROPDOWN,
    payload: data,
  };
}

export function toggleTokenMarketDetails(data) {
  return {
    type: TOGGLE_TOKEN_MARKET_DATA,
    payload: data,
  };
}

export const applicationAnimationToggles = [
  toggleShowSettings,
  toggleWalletDropdown,
  toggleTokenMarketDetails,
  showNetworks,
];
