import { applicationAnimationToggles } from '../constants/animation';

export default function toggleApplicationAnimationOff() {
  return dispatch => {
    applicationAnimationToggles.forEach(setting => {
      dispatch(setting(false));
    });
  };
}
