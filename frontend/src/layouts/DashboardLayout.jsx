
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 220;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, view: 'dashboard' },
  { text: 'Users', icon: <PeopleIcon />, view: 'users' },
  { text: 'Roles', icon: <SecurityIcon />, view: 'roles' },
  { text: 'Permissions', icon: <AssignmentIndIcon />, view: 'permissions' },
  { text: 'Audit', icon: <HistoryIcon />, view: 'audit' },
];

export default function DashboardLayout({ view, setView, children }) {
  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            UARP-AI Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map(item => (
            <ListItem button key={item.text} selected={view === item.view} onClick={() => setView(item.view)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '32px', marginLeft: drawerWidth, marginTop: 64, background: '#f5f6fa', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
