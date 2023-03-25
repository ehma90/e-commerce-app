import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { Store } from "@/utilities/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

export default function PaymentScreen() {
  const [selectPaymentMethod, setSelectPaymentMethod] = useState('');
  const router = useRouter()

  const {state, dispatch} = useContext(Store);
  const {cart} = state
  const {shippingAddress, paymentMethod} = cart

  useEffect(() => {
    if(!shippingAddress.address){
        return router.push('/shipping')
    }

    setSelectPaymentMethod(paymentMethod || '')
  }, [paymentMethod, router, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDefault()
    if(!selectPaymentMethod){
        return toast.error('Payment is required')
    }
    dispatch({type: 'SAVE_PAYMENT_METHOD', payload: selectPaymentMethod})
    Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          paymentMethod: selectPaymentMethod
        })
      );

    router.push('/placeholder')

  }
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id="payments"
              type="radio"
              checked={selectPaymentMethod === payment}
              onChange={() => setSelectPaymentMethod(payment)}
            />
          <label className="p-2" htmlFor="payments">{payment}</label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
        <button type="button" className="default-button" onClick={() => router.push('/shipping')}>
            Back
        </button>
        <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
