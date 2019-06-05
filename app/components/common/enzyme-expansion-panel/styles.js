export const styles = () => ({
  root: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    position: 'inherit',
    paddingLeft: 0,
    minHeight: 15,
    width: 321,
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: '0px 0px 0px 0px',
      minHeight: 0,
    },
  },
  expanded: {},
  detailsRoot: {
    flexDirection: 'column',
    padding: '0px 0px',
  },
  summaryRoot: {
    padding: 0,
    minHeight: 0,
    '&$expanded': {
      margin: 0,
      minHeight: 0,
    },
  },
  expandIcon: {
    padding: 0,
    right: 0,
  },
  panelExpanded: {
    margin: 0,
  },
});
