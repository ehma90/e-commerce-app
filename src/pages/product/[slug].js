import axios from 'axios';
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Product from 'models/Product';
import { Store } from "@/utilities/Store";
import db from "@/utilities/db";

export default function ProductScreen(props) {
  const {product} = props

  const router = useRouter()

  const { state ,dispatch } = useContext(Store);

  if (!product) {
    return <Layout title="Product not found">Product not found</Layout>;
  }

  const addToCartHandler = async() => {
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === product.slug
    );
    console.log(existItem);
    const quantity = existItem ? existItem + 1 : 1
    const {data} = await axios.get(`api/products/${product._id}`)

    if(data.countInStock < quantity){
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity}})
    router.push("/cart")
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">back to product</Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
            <ul>
                <li><h2 className="text-lg">{product.name}</h2></li>
                <li>Category: {product.category}</li>
                <li>Brand: {product.brand}</li>
                <li>{product.rating} of {product.numReviews} reviews</li>
                <li>{product.description}</li>
            </ul>
        </div>
        <div>
            <div className="card p-5">
                <div className="mb-2 flex justify-between">
                    <div>Price</div>
                    <div>${product.price}</div>
                </div>
                <div className="mb-2 flex justify-between">
                    <div>Status</div>
                    <div>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
                </div>
                <button className="primary-button w-full" onClick={() => addToCartHandler()}>Add to cart</button>
            </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  try {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    if (!product) {
      return { notFound: true };
    }
    const serializedProduct = JSON.parse(JSON.stringify(product));
    return {
      props: {
        product: db.covertDocToObj(serializedProduct),
      },
    };
  } catch (error) {
    return { props: { product: null } };
  }
}