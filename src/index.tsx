import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

import './index.css';
import Cart from './Pages/Cart/cart';

import Home from './Pages/Home/home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter basename="/">
    <Routes>
    <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </HashRouter>
);