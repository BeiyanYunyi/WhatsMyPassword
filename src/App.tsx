import { Component, lazy } from 'solid-js';
import { Routes, Route, Router } from 'solid-app-router';

import Home from './views/Home';
import Nav from './components/Nav';

const About = lazy(() => import('./views/About'));
const NotFound = lazy(() => import('./views/NotFound'));

const App: Component = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
