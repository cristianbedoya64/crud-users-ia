import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';
import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import { MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import ThemeToggle from './components/ThemeToggle';
import dashboardTokens from './theme/dashboardTokens';
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
  fontFamily: dashboardTokens.typography.body,
  headings: {
    fontFamily: dashboardTokens.typography.body,
    fontWeight: '600'
  },
  colors: {
    blue: [
      '#edf4ff', '#d8e8ff', '#bfd7ff', '#a0c3ff', '#70a7ff',
      '#5d96f5', '#4a84e4', '#376fc4', '#28599f', '#1d467d'
    ]
  },
  components: {
    Card: {
      defaultProps: { shadow: 'md', radius: 'md', withBorder: true },
      styles: theme => ({
        root: {
          backgroundColor: dashboardTokens.colors.surface,
          borderColor: dashboardTokens.colors.border,
          color: dashboardTokens.colors.text,
          transition: `transform ${dashboardTokens.motion.fast} ${dashboardTokens.motion.ease}, box-shadow ${dashboardTokens.motion.fast} ${dashboardTokens.motion.ease}`
        }
      })
    },
    Button: {
      defaultProps: { radius: 'md' },
      styles: () => ({
        root: {
          transition: `transform ${dashboardTokens.motion.fast} ${dashboardTokens.motion.ease}, box-shadow ${dashboardTokens.motion.fast} ${dashboardTokens.motion.ease}`
        }
      })
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
      defaultProps: { highlightOnHover: true, withColumnBorders: true, striped: true },
      styles: theme => ({
        table: {
          borderRadius: theme.radius.md,
          overflow: 'hidden'
        },
        thead: {
          backgroundColor: dashboardTokens.colors.surfaceRaised
        }
      })
    },
    NavLink: {
      styles: theme => ({
        root: {
          borderRadius: theme.radius.md,
          transition: 'background-color 120ms ease, color 120ms ease, transform 120ms ease'
        }
      })
    }
  }
});
root.render(
  <React.StrictMode>
    <ColorSchemeScript defaultColorScheme="dark" />
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <ThemeToggle />
      <Notifications position="top-center" zIndex={9999} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
