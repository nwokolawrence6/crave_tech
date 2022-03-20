import type { NextApiRequest, NextApiResponse } from 'next'
import UserDataSource from './datasource'
import dataSource from '../../datasource'
import { cookieOptions } from "../../tools/config";
import ILoggedIn from '../../interfaces/AuthInterface'

const UserMutation = {
  addUser: async (root: any, { data }: { data: any }, { dataSources, res, req }: { dataSources: typeof dataSource, req: NextApiRequest, res: NextApiResponse }) => {
    const User: typeof UserDataSource =dataSources.User;
    const [accessToken, refreshAccessToken] = await new User().addUser(data);
    const setCookies = (res as any).cookie.setCookies
    setCookies('x-token', accessToken, { ...cookieOptions, req, res })
    setCookies('x-refresh-token', refreshAccessToken, { ...cookieOptions, req, res })
    return "Registration completed"
  },
  loginUser: async (parent: any, data: any, { dataSources, req, res }: { dataSources: typeof dataSource, req: NextApiRequest, res: NextApiResponse }, info: any) => {
    const User = dataSources.User
    const [accessToken, refreshAccessToken] = await new User().loginUser(data);
    const setCookies = (res as any).cookie.setCookies
    setCookies('x-token', accessToken, { ...cookieOptions, req, res })
    setCookies('x-refresh-token', refreshAccessToken, { ...cookieOptions, req, res })
    return 'login completed'
  },
  updatePassword: async (root: any, data : { oldPassword: string; newPassword: string }, { dataSources, req }: { dataSources: typeof dataSource, req: NextApiRequest & {user: ILoggedIn}, res: NextApiResponse }) => {
    const User = dataSources.User
    return await new User().updatePassword(data, req.user);
  },
  logout: async (root: any, data : { oldPassword: string; newPassword: string }, { res, req }: { req: NextApiRequest & {user: ILoggedIn}, res: NextApiResponse }) => {
    const setCookies = (res as any).cookie.removeCookies
    setCookies('x-token', { ...cookieOptions, req, res })
    setCookies('x-refresh-token', { ...cookieOptions, req, res })
    return 'logout successful'
  },

}
const UserQuery = {
  getCurrentUser: async (parent: any, data: any, { dataSources, req }: { dataSources: typeof dataSource, req: NextApiRequest & { user:ILoggedIn }, res: NextApiResponse }) => {
    const User = dataSources.User
    const user = req.user
    return await new User().getCurrentUser(user)
  }
}



export { UserMutation, UserQuery }
