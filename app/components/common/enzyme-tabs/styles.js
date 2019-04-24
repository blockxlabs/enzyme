export const styles = () => ({
  tabsRoot: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  tabsIndicator: {
    backgroundColor: 'rgba(215, 95, 160, 1)',
    height: '2px',
  },
  tabRoot: {
    color: 'rgba(0, 0, 0, 0.6)',
    width: '180px',
    height: '48px',
    textTransform: 'capitalise',
    fontSize: '14px',
    fontFamily: 'Roboto-Medium',
    '&:hover': {
      color: 'rgba(215, 95, 160, 1)',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'rgba(215, 95, 160, 1)',
      fontSize: '14px',
    },
    '&:focus': {
      color: 'rgba(215, 95, 160, 1)',
    },
  },
  tabSelected: {},
});
