import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'components/App';
import './index.css';

document.cookie = "anonymous_user_id=someValue; SameSite=None; Secure";
document.cookie = "is_human=someValue; SameSite=None; Secure";
document.cookie = "client_width=someValue; SameSite=None; Secure";
document.cookie = "lang=someValue; SameSite=None; Secure";
document.cookie = "g_rated=someValue; SameSite=None; Secure";
document.cookie = "user_id=someValue; SameSite=None; Secure";


const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);