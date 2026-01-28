import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
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
const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    fontWeight: '600'
  },
  colors: {
    blue: [
      '#e7f0ff', '#cfe0ff', '#a7c2ff', '#7aa0ff', '#5687ff',
      '#3d74ff', '#2f6bff', '#1958e3', '#1249bf', '#0a3a9a'
    ]
  },
  components: {
    Card: {
      defaultProps: { shadow: 'md', radius: 'md', withBorder: true }
    },
    Button: {
      defaultProps: { radius: 'md' }
    },
    TextInput: {
      defaultProps: { radius: 'md' }
    },
    Select: {
      defaultProps: { radius: 'md' }
    },
    MultiSelect: {
      defaultProps: { radius: 'md' }
    },
    Table: {
      defaultProps: { highlightOnHover: true, withColumnBorders: true, striped: true }
    }
  }
});
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications position="top-center" zIndex={9999} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
