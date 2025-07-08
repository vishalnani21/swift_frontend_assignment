import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { appStore, persistor } from './utils/appStore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommentsDashboard from './components/CommentsDashboard';
import Profile from './components/Profile';
import Body from './components/Body';

const App = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<CommentsDashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
