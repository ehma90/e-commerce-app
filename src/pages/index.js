import { useContext } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import db from "@/utilities/db";
import Product from "models/Product";
import { Store } from "@/utilities/Store";

export default function Home({products}) {
  const {state, dispatch} = useContext(Store);
  const {cart } = state

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <>
      <Layout title="Home Page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem key={product.slug} product={product} 
            addToCartHandler={addToCartHandler}/>
          ))}
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
    await db.connect()
    const products = await Product.find().lean();

    return {
      props: {
        products: products.map(db.covertDocToObj)
      }
    }
}