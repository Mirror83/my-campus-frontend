import GraduationCapIcon from "@/components/home/GraduationCapIcon"
import { Link } from "react-router-dom"
import React from "react"

interface AuthFormLayoutProps {
  children: React.ReactNode
  isSignUp: boolean
  imageUrl?: string
}

export function AuthFormLayout({
  children,
  isSignUp,
  imageUrl = "images/signup-image.png",
}: AuthFormLayoutProps) {
  return (
    <div className={"min-h-[100vh] md:grid md:grid-cols-2 md:gap-2"}>
      <div className="flex flex-col p-8">
        <div className="flex gap-1 items-center text-2xl font-bold">
          <GraduationCapIcon />
          <h1>My Campus</h1>
        </div>
        <p className="py-4 text-2xl">
          {isSignUp ? "Create account" : "Sign in"}
        </p>

        <>{children}</>

        <p className="text-light text-sm text-gray-600 my-4">
          {isSignUp
            ? "Already have an account? "
            : "Don't have an account yet? "}
          <Link
            to={isSignUp ? "/sign-in" : "/sign-up"}
            className="underline text-gray-800"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
        }}
        className="hidden md:block"
      />
    </div>
  )
}
