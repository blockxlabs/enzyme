import Animated from 'animated/lib/targets/react-dom';

import {
  settingsItemAnimatedMap,
  applicationSettingsAnimatedMap,
  settingsItemHighlightMap,
  settingsItemsArr,
  expandApplicationSettingArr,
  SETTINGS_HEIGHT,
  VAULT_SETTINGS,
  applicationSettingsArr,
} from '../constants/animation';

const settingsAnimatedHeight = applicationSettingsAnimatedMap.get(VAULT_SETTINGS);

export const unhighlightSettingItems = itemToNotHighlight => {
  settingsItemsArr.forEach(item => {
    if (item === itemToNotHighlight) {
      settingsItemHighlightMap.set(item, true);
    } else {
      settingsItemHighlightMap.set(item, false);
    }
  });
};

export const highlightSettingItems = () => {
  settingsItemsArr.forEach(item => {
    settingsItemHighlightMap.set(item, false);
  });
};

export const shrinkSettingItems = itemToNotShrink => {
  settingsItemsArr.forEach(item => {
    if (item !== itemToNotShrink) {
      Animated.timing(settingsItemAnimatedMap.get(item), {
        toValue: 0,
        duration: 200,
      }).start();
    }
  });
};

export const animateSettingItemIn = (itemToAnimate, value, callBack = () => {}) => {
  Animated.parallel([
    Animated.spring(itemToAnimate, { toValue: value }),
    Animated.spring(settingsAnimatedHeight, {
      toValue: SETTINGS_HEIGHT + value,
    }),
  ]).start(callBack);
};

export const animateSettingItemOut = (itemToAnimate, callBack = () => {}) => {
  Animated.parallel([
    Animated.timing(itemToAnimate, {
      toValue: 0,
      duration: 200,
    }),
    Animated.timing(settingsAnimatedHeight, {
      toValue: SETTINGS_HEIGHT,
      duration: 200,
    }),
  ]).start(callBack);
};

export const shrinkAllApplicationSetting = () => {
  applicationSettingsArr.forEach(setting => {
    Animated.timing(applicationSettingsAnimatedMap.get(setting), {
      toValue: 0,
      duration: 200,
    }).start();
  });

  expandApplicationSettingArr.length = 0;
};

export const animateApplicationSetting = (settingToExpand, value, callBack = () => {}) => {
  // Declare Animated Array
  const animatedArr = [];

  // Loop through Open animation Array and push to array
  if (expandApplicationSettingArr.length > 0) {
    expandApplicationSettingArr.forEach(setting => {
      animatedArr.push(
        Animated.timing(applicationSettingsAnimatedMap.get(setting), {
          toValue: 0,
          duration: 200,
        }),
      );
    });
  }

  // Check if current setting to expand was previously open
  const openAnimationIndex = expandApplicationSettingArr.findIndex(
    setting => setting === settingToExpand,
  );

  // Reset Open Application Array
  expandApplicationSettingArr.length = 0;

  // If current setting was not already open, push it to array
  if (openAnimationIndex === -1) {
    animatedArr.push(
      Animated.spring(applicationSettingsAnimatedMap.get(settingToExpand), {
        toValue: value,
      }),
    );

    expandApplicationSettingArr.push(settingToExpand);
  }

  // Animate array in sequence
  Animated.sequence(animatedArr).start(() => {
    callBack();
  });
};
