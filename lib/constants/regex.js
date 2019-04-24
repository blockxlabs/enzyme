export const INPUT_NUMBER_REGEX = /^[0-9\b]+$/;
export const WALLET_SEARCH_REGEX = /[-[\]{}()*+?.,\\^$|#\s]/g;
export const URL_VALIDATION_REGEX = /((http(s)|ws(s))?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
export const URL_STRICT_VALIDATION_REGEX = /(wss|https):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
export const PROTOCOL_VALIDATION_REGEX = /^(https|wss|ws|http)?:\/\//i;
