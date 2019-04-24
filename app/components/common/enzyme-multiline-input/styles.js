export const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '320px',
  },
  inputRoot: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: '4px',
    paddingTop: '18px',
    paddingLeft: '18px',
    paddingRight: '18px',
    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: '16px',
  },
  input: {
    '&::placeholder': {
      color: '#000000',
      opacity: '0.6',
      fontSize: '16px',
      fontFamily: 'Roboto-Regular',
    },
  },
  inputUnderline: {
    '&::before': { border: 'none' },
    '&::after': { borderBottom: '2px solid rgba(215, 95, 160, 1)' },
  },
  inputErrorUnderline: {
    '&$inputError': {
      '&::before': { border: 'none' },
      '&::after': { borderBottom: '2px solid rgba(0, 0, 0, 0.3)' },
    },
  },
  inputError: {},
  helperText: {
    paddingLeft: '16px',
    '&$helperTextError': {
      color: 'rgba(176, 0, 32, 1)',
      fontFamily: 'Roboto-Regular',
      fontSize: '11px',
    },
  },
  helperTextError: {},
});
