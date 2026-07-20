import { StrictMode } from "react";
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import router from "./routs/router";

createRoot(document.getElementById('root')).render(
  <>
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
    <BrowserRouter>
      <CartProvider>
        <Provider store={Store}>
          <App />
        </Provider>
      </CartProvider>
    </BrowserRouter>
    </StrictMode>
  </>
)
