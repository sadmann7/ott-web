import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// hooks import
import { useAuth } from "@/contexts/AuthProvider";

const Signin: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sign In | OTT-Platform</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <main>
        <section aria-label="signin" className="min-h-screen">
          <Image
            src="/images/login-background.webp"
            alt="login background"
            width={1920}
            height={1080}
            className="-z-10 hidden sm:block absolute inset-0 w-full h-full object-cover"
          />
          <div className="-z-10 absolute inset-0 bg-black sm:bg-black/50 w-full h-full" />
          <div className="w-[89vw] max-w-screen-2xl mx-auto">
            <Link href="/">
              <Image
                src="/images/netflix-logo.svg"
                alt="netflix"
                width={1024}
                height={276.74}
                className="mt-5 w-36 h-auto object-cover"
                priority
              />
            </Link>
            <div className="mt-10 sm:max-w-md mx-auto sm:px-16 sm:py-20 rounded-md bg-black/75">
              <h1 className="text-white text-2xl md:text-3xl font-bold">
                Sign In
              </h1>
              <SigninForm />
              <p className="mt-5 text-content text-sm md:text-base font-medium">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-white hover:underline underline-offset-1"
                >
                  Sign up now
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signin;

const schema = {
  email: {
    value:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: "Please enter a valid email.",
  },
  password: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message:
      "Your password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
  },
};

type Inputs = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const { signin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    signin(data.email, data.password);
  };

  return (
    <form
      aria-label="signin-form"
      className="mt-8 grid gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-1.5">
        <input
          type="text"
          {...register("email", {
            required: schema.email.message,
            pattern: {
              value: schema.email.value,
              message: schema.email.message,
            },
          })}
          placeholder="Email"
          className="px-4 py-3 bg-[#333] focus:bg-[#454545] rounded-md border-none focus:ring-orange-400 text-sm md:text-base placeholder:text-gray-300/90"
        />
        {errors.email && (
          <span className="text-orange-400 text-xs md:text-sm">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="grid gap-1.5">
        <input
          type="password"
          {...register("password", {
            required: true,
            pattern: {
              value: schema.password.value,
              message: schema.password.message,
            },
          })}
          placeholder="Password"
          className="px-4 py-3 bg-[#333] focus:bg-[#454545] rounded-md border-none focus:ring-orange-400 text-sm md:text-base placeholder:text-gray-300/90 transition-colors"
        />
        {errors.password && (
          <span className="text-orange-400 text-xs md:text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <button className="mt-5 py-3 rounded-md bg-accent hover:opacity-90 transition-opacity text-sm md:text-base font-bold">
        Sign in
      </button>
    </form>
  );
};
