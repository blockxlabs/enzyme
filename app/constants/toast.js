import { toast } from 'react-toastify';
import {
  success, info, warning, error, addAddress
} from '../components/common/toast';

export const CREATE_TOAST = 'CREATE_TOAST';

export function createToast(_options = {}, _hideProgressBar) {
  let msg;
  return () => {
    if (_options) {
      const {
        message, type, isCustom, autoClose, toastType, onClick
      } = _options;
      switch (type) {
        case 'success':
          msg = success(message);
          break;
        case 'warning':
          msg = warning(message);
          break;
        case 'info':
          msg = info(message, isCustom);
          break;
        case 'error':
          msg = error(message);
          break;
        case 'addAddress':
          msg = addAddress(message, onClick);
          break;
        default:
      }
      toast(msg, {
        type: toastType === undefined ? type : toastType,
        position: toast.POSITION.BOTTOM_CENTER,
        hideProgressBar: _hideProgressBar === undefined ? true : _hideProgressBar,
        autoClose: autoClose === undefined ? 2500 : autoClose,
      });
    }
  };
}
