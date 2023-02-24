import Head from "next/head";
import Link from "next/link";

export default function Layout({ title, children }) {
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
              <Link href="/cart" className="p-2">Cart</Link>
              <Link href="/" className="p-2">Login</Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-12 shadow-inner">Copyright © 2023 E-commerce App</footer>
      </div>
    </>
  );
}
