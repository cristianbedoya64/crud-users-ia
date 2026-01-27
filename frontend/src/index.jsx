import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { getAccessToken, getRefreshToken, refreshTokens, logout as authLogout, getStoredUser, setStoredUser, clearStoredUser } from './auth';

function App() {
  const [isAuthed, setIsAuthed] = useState(!!getAccessToken() || !!getRefreshToken());
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function rehydrate() {
      try {
        if (getRefreshToken()) {
          if (!getAccessToken() || !currentUser) {
            const data = await refreshTokens();
            if (cancelled) return;
            setIsAuthed(true);
            setCurrentUser(data?.user || null);
            setStoredUser(data?.user || null);
          } else {
            setIsAuthed(true);
          }
        } else if (getAccessToken()) {
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
        }
      } catch {
        if (cancelled) return;
        setIsAuthed(false);
        setCurrentUser(null);
        clearStoredUser();
      } finally {
        if (!cancelled) setHydrating(false);
      }
    }
    rehydrate();
    return () => { cancelled = true; };
  }, []);

  if (hydrating) {
    return null;
  }

  return (
    <AppRoutes
      isAuthed={isAuthed}
      currentUser={currentUser}
      onLogin={(data) => {
        setIsAuthed(true);
        setCurrentUser(data?.user || null);
        setStoredUser(data?.user || null);
      }}
      onLogout={() => {
        authLogout();
        setIsAuthed(false);
        setCurrentUser(null);
        clearStoredUser();
      }}
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
      <Notifications position="top-center" zIndex={9999} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
