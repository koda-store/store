import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import { CartProvider } from "./context/CartContext";

import router from "./routs/router";

function App() {
  return (
    <Provider store={Store}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </Provider>
  );
}

export default App;