import { Component } from 'solid-js';
import { Toaster } from 'solid-toast';
import { Routes, Route, Router } from 'solid-app-router';

import Home from './views/Home';
import Nav from './components/Nav';
import About from './views/About';
import NotFound from './views/NotFound';
import Ribbon from './components/Ribbon';
import ReloadPrompt from './components/ReloadPrompt';
// import WebAuthn from './views/WebAuthn';

const App: Component = () => (
  <Router>
    <Nav />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/webauthn" element={<WebAuthn />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Ribbon />
    <Toaster position="top-center" />
    <ReloadPrompt />
  </Router>
);

export default App;
