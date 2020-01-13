import { cancelRequest } from '../../api/dapp';
import * as RequestType from '../../../lib/constants/request-types';
import * as DAppService from '../../services/dapp-service';
import { onBoard } from '../../actions/initialize';
import { setNetwork } from '../../actions/network';

export const cancelDAppRequest = request => async dispatch => {
  await cancelRequest(request);
  dispatch(onBoard());
};

export const allowRequest = request => async dispatch => {
  switch (request.request.requestType) {
    case RequestType.SEND:
      await DAppService.submitTransaction(request);
      break;
    case RequestType.SIGN_MESSAGE:
      await DAppService.signMessage(request);
      break;
    default:
  }
  dispatch(onBoard());
};

export const fetchNetwork = () => async dispatch => {
  await dispatch(setNetwork);
};
