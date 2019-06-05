export const styles = () => ({
  root: { marginRight: 0, marginLeft: 0 },
  label: {
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    fontWeight: 'bolder',
  },
  colorSecondary: {
    color: 'none',
    padding: '0px 3px 0px 0px',
    '&$checked': {
      color: 'rgba(215, 95, 160, 1)',
      padding: '0px 3px 0px 0px',
    },
  },
  checked: {},
  radioGroupRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
  radioRoot: {
    marginRight: 0,
    marginLeft: 0,
  },
});
