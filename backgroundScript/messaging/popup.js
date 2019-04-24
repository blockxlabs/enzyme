// receives all messages from Content Script
import * as MessageTypes from '../../lib/constants/messageTypes';
import * as ResponseService from '../services/responseService';

const extension = require('extensionizer');

extension.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Extension to Content Script
  const senderURL = sender.url;
  const popupURL = extension.extension.getURL('popup.html');
  const windowURL = extension.extension.getURL('window.html');
  const senderId = sender.id;
  const extensionId = extension.runtime.id;
  if (senderId === extensionId) {
    if (senderURL === popupURL || senderURL === windowURL) {
      try {
        switch (request.type) {
          case MessageTypes.BG_APP_IS_READY: {
            ResponseService.isAppReady(request, sendResponse);
            break;
          }
          case MessageTypes.BG_APP_IS_ONBOARDED: {
            return { isAppReady: false };
          }
          case MessageTypes.BG_SET_HASH_KEY: {
            ResponseService.setHashKey(request, sendResponse);
            break;
          }
          case MessageTypes.BG_ACCOUNTS_CREATE_ACCOUNT: {
            ResponseService.createAccount(request, sendResponse);
            break;
          }
          case MessageTypes.BG_ACCOUNTS_CREATE_SEED_WORDS: {
            ResponseService.getSeedWords(request, sendResponse);
            break;
          }
          case MessageTypes.BG_ACCOUNTS_LIST: {
            ResponseService.getAccounts(request, sendResponse);
            break;
          }
          case MessageTypes.BG_ACCOUNT_BALANCE: {
            ResponseService.getBalances(request, sendResponse);
            break;
          }
          case MessageTypes.BG_ACCOUNTS_CURRENT_ACCOUNT: {
            ResponseService.getCurrentAccount(request, sendResponse);
            break;
          }

          //Network
          case MessageTypes.BG_NETWORK_CURRENT: {
            ResponseService.getCurrentNetwork(request, sendResponse);
            break;
          }
          case MessageTypes.BG_NETWORK_UPDATE: {
            ResponseService.updateCurrentNetwork(request, sendResponse);
            break;
          }

          // Transactions
          case MessageTypes.BG_TXN_FEE: {
            ResponseService.getTransactionFees(request, sendResponse);
            break;
          }
          case MessageTypes.BG_TXN_SUBMIT: {
            ResponseService.submitTransaction(request, sendResponse);
            break;
          }
          case MessageTypes.BG_TXN_LIST: {
            ResponseService.getTransactions(request, sendResponse);
            break;
          }
          case MessageTypes.BG_TXN_GET: {
            ResponseService.getTransaction(request, sendResponse);
            break;
          }
          default:
            ResponseService.handleDefault(request, sendResponse);
        }
      } catch (err) {
        ResponseService.handleProcessingError(request, sendResponse);
      }
    }
  }
  // This logic require to be open message port between popup.js and background.js till not get responses by sendMessage.
  // Don't remove return true.
  return true;
});
