import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import AppBar from './AppBar'
import BottmNav from './BottomNavigation'

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
});

const Home = props => {
  const classes = useStyles()
  return(
    <div className={classes.root}>
      <AppBar />
      <BottmNav />
    </div>
  )
}

export default Home