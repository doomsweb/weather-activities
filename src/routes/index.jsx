import { createHashRouter } from "react-router-dom"
// import { AuthLayout, DefaultLayout, EditLayout, PermissionsLayout } from "@/components"
import { lazyImport } from "@/utils/helpers"

const { Home } = lazyImport(() => import("@/views"), "Home")

const router = createHashRouter([
  {
    path: "/",
    // element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ]
  }
])

export default router