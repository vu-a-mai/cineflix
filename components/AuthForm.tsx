"use client";

import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

// FormData interface
interface FormData {
  username?: string; // ? makes the field optional because we don't need it for login
  email: string;
  password: string;
}

// AuthForm component
const AuthForm = ({ type }: { type: "register" | "login" }) => {
  // useRouter hook
  const router = useRouter();

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      type === "register"
        ? { username: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  // onSubmit function
  // This function is used to submit the form data
  // It is an async function because we are fetching the data
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let res;

    // Fetching the data
    if (type === "register") {
      res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Checking if the response is ok
      if (res.ok) {
        router.push("/login");
      } else {
        toast.error("Something went wrong");
      }
    }

    // Signing in the user
    if (type === "login") {
      res = await signIn("credentials", {
        ...data,
        redirect: false,
      })

      // Checking if the response is ok
      if (res && res.ok) {
        router.push("/");
      } else {
        toast.error("Invalid credentials");
      }
    }
  };

  return (
    <div className="auth">
      <div className="overlay">
        {/* Content */}
        <div className="content">
          {/* Logo */}
          <img src="/assets/logo.png" alt="logo" className="logo" />
          {/* Form */}
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {type === "register" && (
              <>
                <div className="input">
                  {/* Username input */}
                  <input
                    {...register("username", {
                      required: "Username is required",
                      validate: (value: string | undefined) => {
                        if (!value || value.length < 2) {
                          return "Username must be more than 1 character";
                        }
                        return true;
                      },
                    })}
                    type="text"
                    placeholder="Username"
                    className="input-field"
                  />
                  {/* Icon */}
                  <PersonOutline sx={{ color: "white" }} />
                </div>

                {/* error message for username */}
                {errors.username && (
                  <p className="error">{errors.username?.message}</p>
                )}
              </>
            )}
            <div className="input">
              {/* Email input */}
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="input-field"
              />
              {/* Icon */}
              <EmailOutlined sx={{ color: "white" }} />
            </div>

            {/* error message for password */}
            {errors.email && <p className="error">{errors.email?.message}</p>}

            {/* Password input */}
            <div className="input">
              {/* Password input */}
              <input
                {...register("password", {
                  required: "Password is required",
                  validate: (value: string | undefined) => {
                    if (
                      !value ||
                      value.length < 5 ||
                      value.length > 20 ||
                      !value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)
                    ) {
                      return "Password must be at between 5 and 20 characters with at least one special character";
                    }
                    return true;
                  },
                })}
                type="password"
                placeholder="Password"
                className="input-field"
              />
              {/* Icon */}
              <LockOutlined sx={{ color: "white" }} />
            </div>

            {/* error message for password */}
            {errors.password && (
              <p className="error">{errors.password?.message}</p>
            )}

            {/* This is a conditional rendering */}
            <button className="button" type="submit">
              {type === "register" ? "Join Free" : "Let's Watch"}
            </button>
          </form>

          {/* This is a conditional rendering */}
          {type === "register" ? (
            <Link href="/login">
              <p className="link"> Already have an account? Login </p>
            </Link>
          ) : (
            <Link href="/register">
              <p className="link"> Don't have an account? Register </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
