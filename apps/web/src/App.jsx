import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
      <Toaster />
    </Router>
  );
}

export default App;
