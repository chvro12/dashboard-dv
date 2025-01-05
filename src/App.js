import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SenvelgoView from './components/SenvelgoView';
import InteractionsView from './components/InteractionsView';
import ObjectifsView from './components/ObjectifsView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/senvelgo" element={<SenvelgoView />} />
      <Route path="/interactions" element={<InteractionsView />} />
      <Route path="/objectifs" element={<ObjectifsView />} />
    </Routes>
  );
}

export default App;