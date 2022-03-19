import {IRoutes} from "./DashBoardRouterList";

const routes: Array<IRoutes> = [
  {
    icon: 'home',
    title: "Home",
    route: '/dashboard',
    as: 'a'
  },
  {
    icon: 'lock',
    title: "Update Password",
    route: '/dashboard/update_password',
    as: 'a'
  }
]

export default routes
