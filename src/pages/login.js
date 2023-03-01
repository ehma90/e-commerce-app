import { useForm } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react"
import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { getError } from "@/utilities/error";

export default function LoginScreen() {
    const {handleSubmit, register, formState: {errors}} = useForm()

    const submitHandler = ({email, password}) => {
        try {
          const result =  await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
          if(result.error){
            toast.error(result.error)
          }
        } catch (err) {
          toast.error(getError(err))
        }
    }

  return (
    <Layout title="Login">
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {required: "Please enter Email", pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please Enter valid email",
            }})}
            className="w-full px-2"
            placeholder="Enter email"
            id="email"
            autoFocus
          />
          {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {required: "Please enter password", minLength: {
                value: 6,
                message: "Password is more than 5 characters"
            }})}
            className="w-full px-2"
            placeholder="Enter password"
            id="password"
            autoFocus
          />
          {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
        </div>
        <div className="mb-4">
            <button className="primary-button"> Login </button>
        </div>
        <div className="mb-4">
            Don&apos;t have an account? &nbsp;
            <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}
