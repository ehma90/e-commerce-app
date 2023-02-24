import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "../utilities/Store";

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const cartItemsCount = cart.cartItems.reduce((a,c) => a + c.quantity, 0);

  return (
    <>
      <Head>
        <title>{title ? title + " - E-Commerce-App" : "E-Commerce App"}</title>
        <meta name="description" content="E-commerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-xl font-bold">
              E-commerce
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart{" "}
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-12 shadow-inner">
          Copyright © 2023 E-commerce App
        </footer>
      </div>
    </>
  );
}
