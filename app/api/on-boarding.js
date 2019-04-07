import * as MessageTypes from '../../lib/constants/messageTypes';
import { sendMessage } from '../../lib/services/extension/messages';
import { throwIfNoSuccess } from './helper';

export const setHashKey = async hashKey => {
  const { message, status, result } = await sendMessage({
    type: MessageTypes.BG_SET_HASH_KEY,
    data: hashKey,
  });
  throwIfNoSuccess({ message, status });
  return { result };
};
