import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

import './index.css';
import Checkout from './Pages/Checkout/checkout';

import Home from './Pages/Home/home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter basename="/">
    <Routes>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </HashRouter>
);