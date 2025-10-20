import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme-provider'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from "react-redux";
import store from "./app/store";

createRoot(document.getElementById('root')).render(
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
      <Router>
      <App />
      </Router>
      </Provider>
    </GoogleOAuthProvider>
   </ThemeProvider>,
)
