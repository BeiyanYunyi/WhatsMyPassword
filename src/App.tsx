import { Component, lazy } from 'solid-js';
import { Routes, Route, Router } from 'solid-app-router';

import Home from './views/Home';
import Nav from './components/Nav';
import About from './views/About';
import NotFound from './views/NotFound';
import WebAuthn from './views/WebAuthn';

const App: Component = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/webauthn" element={<WebAuthn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
