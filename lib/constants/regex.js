export const INPUT_NUMBER_REGEX = /^[0-9\b]+$/;
export const WALLET_SEARCH_REGEX = /[-[\]{}()*+?.,\\^$|#\s]/g;
export const URL_VALIDATION_REGEX = /^((ws|wss)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z0-9]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
export const PROTOCOL_OF_URL = /^(https|wss|ws|http)?:\/\//i;
export const LOCALHOST_REGEX = /(ws|wss)?:\/\/localhost/i;
