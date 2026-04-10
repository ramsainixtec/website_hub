import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Portfolio } from "./pages/Portfolio";
import { About } from "./pages/About";
import { GetStarted } from "./pages/GetStarted";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PaymentCancelled } from "./pages/PaymentCancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "portfolio", Component: Portfolio },
      { path: "about", Component: About },
      { path: "get-started", Component: GetStarted },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment-cancelled", Component: PaymentCancelled },
      { path: "*", Component: Home },
    ],
  },
]);
