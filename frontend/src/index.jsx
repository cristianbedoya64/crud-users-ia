import '@mantine/core/styles.css';
import UsersView from './views/UsersView';
import RolesView from './views/RolesView';
import PermissionsView from './views/PermissionsView';
import DashboardView from './views/DashboardView';
import AuditView from './views/AuditView';
import LoginView from './views/LoginView';

import React, { useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import MantineLayout from './layouts/MantineLayout';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { getAccessToken, logout as authLogout } from './auth';

function App() {
  const [view, setView] = useState('users');
  const [isAuthed, setIsAuthed] = useState(!!getAccessToken());
  const [currentUser, setCurrentUser] = useState(null);
  if (!isAuthed) {
    return <LoginView onLogin={(data) => { setIsAuthed(true); setCurrentUser(data?.user || null); }} />;
  }

  let content = null;
  if (view === 'dashboard') content = <DashboardView />;
  if (view === 'users') content = <UsersView />;
  if (view === 'roles') content = <RolesView />;
  if (view === 'permissions') content = <PermissionsView />;
  if (view === 'audit') content = <AuditView />;

  return (
    <MantineLayout
      view={view}
      setView={setView}
      user={currentUser}
      onLogout={() => {
        authLogout();
        setIsAuthed(false);
        setCurrentUser(null);
      }}
    >
      {content}
    </MantineLayout>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>
);
