import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import React from 'react';
import Routes from './components/Routes';

function App() {
  const theme = createTheme({
    palette: {
      main: "#96B9FF",
      light: "#FFF",
    },
    typography: {
      messageText: {
        fontSize: 16,
        lineHeight: "18px"
      }
    },
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              color: "#96B9FF"
            }
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#96B9FF"
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: "#fff"
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
            color: "#96B9FF",
            borderBottom: "1px groove rgba(176, 202, 255, 0.7)"
          },
          label: {
            color: "#96B9FF"
          },
          input: {
            color: "#fff"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          text: {
            color: '#96B9FF',
          },
          root: {
            marginLeft: 20,
            "&:hover": {
              outline: "1px groove rgba(176, 202, 255, 0.7)"
            },
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="App-main">
          <Routes />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
