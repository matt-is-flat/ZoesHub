import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import FlightIcon from '@material-ui/icons/Flight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';

// #region Styles
const useStyles = (drawerWidth: number) => 
makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    sideBarHeader: {
      backgroundColor: '#41a49d',
      color: 'white'
    },
    sideMenuHeaderIcon: {
      color: 'white',
      minWidth: '52px',
      marginLeft: '4px'
    }
  })
);
// #endregion

interface SideMenuProps {
  drawerWidth: number;
}

interface SideMenuItem {
  key: string;
  label: string;
  icon: JSX.Element;
  href: string;
}

const sideMenuItems: SideMenuItem[] = [
  {
    key: 'house-savings',
    label: 'House Savings',
    icon: <HomeIcon />,
    href: 'house'
  },
  {
    key: 'matts-finance',
    label: 'Matt\'s Finance',
    icon: <FlightIcon />,
    href: 'matt'
  }
];

const SideMenu = (props: SideMenuProps): JSX.Element => {
  const classes = useStyles(props.drawerWidth)();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List className={classes.sideBarHeader}>
          <ListItem>
            <ListItemIcon className={classes.sideMenuHeaderIcon}>
              <FontAwesomeIcon icon={faCat} />
            </ListItemIcon>
            <ListItemText primary="Zoe's Hub"></ListItemText>
          </ListItem>
        </List>
        <List>
          {sideMenuItems.map(menuItem => (
            <ListItem button component="a" href={menuItem.href} key={menuItem.key}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export { SideMenu };