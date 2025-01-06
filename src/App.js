// src/App.js
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SenvelgoView from './components/SenvelgoView';
import InteractionsView from './components/InteractionsView';
import ObjectifsView from './components/ObjectifsView';
import VisitesView from './components/VisitesView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/senvelgo" element={<SenvelgoView />} />
      <Route path="/interactions" element={<InteractionsView />} />
      <Route path="/objectifs" element={<ObjectifsView />} />
      <Route path="/visites" element={<VisitesView />} />
    </Routes>
  );
}

export default App;