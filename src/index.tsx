import React from 'react'
import ReactDOM from 'react-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'

ReactDOM.render(
  <GoogleOAuthProvider clientId="41546340715-sobfihg0norrpdvt01sh47bul3ag5olv.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root'),
)
