import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FeedbackIcon from '@material-ui/icons/Feedback';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0
  },
});

export default function BottomNavigationBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="ホーム" icon={<HomeIcon />} component={Link} to={props.main}/>
      <BottomNavigationAction disabled label="TBD" icon={<FeedbackIcon />} />
      <BottomNavigationAction disabled label="TBD" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}

BottomNavigationBar.propTypes = {
  main: PropTypes.string
}