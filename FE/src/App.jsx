import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroducePage from "./pages/IntroducePage";
import CreatePaymentPage from "./pages/CreatePaymentPage";
import MainLayout from "./layouts/MainLayout";
import CreateOrderPage from "./pages/CreateOrderPage";
import PaymentDetailPage from "./pages/PaymentDetailPay";
import ListPayment from "./pages/ListPayment";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<IntroducePage />} />
          <Route path="introduce" element={<IntroducePage />} />
          <Route path="create-payment" element={<CreatePaymentPage />} />
          <Route path="create-order/:id" element={<CreateOrderPage />} />
          <Route path="payment-detail" element={<PaymentDetailPage />} />
          <Route path="list-payment" element={<ListPayment />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
