import * as MessageTypes from '../../lib/constants/messageTypes';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const getCurrentNetwork = async () => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_NETWORK_CURRENT,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};

export const updateCurrentNetwork = async network => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_NETWORK_UPDATE,
    network,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
