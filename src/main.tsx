import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import "./index.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ErrorPage } from "./error-page"
import { Root } from "./routes/root"
import { Home, loader as allBlogsLoader } from "./routes/home"
import { AboutUs } from "@/routes/about-us"
import { Notifications } from "@/routes/notifications"
import { Profile } from "@/routes/profile"
import { SignIn } from "@/routes/sign-in"
import { SignUp } from "@/routes/sign-up"
import { WriteBlog } from "@/routes/write-blog"
import { ReadBlog, loader as readLoader } from "@/routes/read-blog"
import { Toaster } from "sonner"
import { RequireAuth } from "./routes/require-auth"
import Comments, {
  loader as commentsLoader,
  action as commentsAction,
} from "./routes/comments"
import { ClubProfile, loader as clubProfileLoader } from "./routes/club-profile"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: allBlogsLoader,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/write-blog",
            element: <WriteBlog />,
          },
        ],
      },
      {
        path: "/profile/club/:clubSlug",
        element: <ClubProfile />,
        loader: clubProfileLoader,
      },
      {
        path: "/profile/user/:userSlug",
        element: <div>User Profile</div>,
      },
      {
        path: "/read-blog/:blogSlug",
        element: <ReadBlog />,
        loader: readLoader,
        children: [
          {
            index: true,
            element: <Comments />,
            loader: commentsLoader,
            action: commentsAction,
            // errorElement: <div>Error getting comments</div>,
          },
        ],
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
