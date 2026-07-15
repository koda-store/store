import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Store } from './redux/Store.jsx';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <CartProvider>
        <Provider store={Store}>
          <App />
        </Provider>
      </CartProvider>
    </BrowserRouter>
  </>,
)
