import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import data from "@/utilities/data";
import { Store } from "@/utilities/Store";

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  const { state ,dispatch } = useContext(Store);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  function addItemHandler(){
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1

    if(product.countInStock < quantity){
      alert("Sorry, Product is out of stuck")
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity}})
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
                <button className="primary-button w-full" onClick={addItemHandler}>Add to cart</button>
            </div>
        </div>
      </div>
    </Layout>
  );
}