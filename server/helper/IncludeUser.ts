import { refreshTokens, verifyJWT } from './utils.jwt'
import {NextApiRequest, NextApiResponse} from "next";
import {cookieOptions} from "../tools/config";
import ILoggedIn from '../interfaces/AuthInterface'

export default async (req:NextApiRequest & { user: ILoggedIn } , res:NextApiResponse) => {
  const token:string = req.cookies['x-token']
  if (token) {
    try {
      req.user = await verifyJWT(token)
    } catch (err) {
      const refreshToken = req.cookies['x-refresh-token']
      if (!refreshToken) {
        (req as any).user = null
      }
      const newTokens = await refreshTokens(token, refreshToken)
      if (newTokens.token && newTokens.refreshToken) {
        res.setHeader('Access-Control-Expose-Headers', 'x-token, x-refresh-token')
        const setCookies = (res as any).cookie.setCookies
        setCookies('x-token', newTokens.token, {...cookieOptions, req, res})
        setCookies('x-refresh-token', newTokens.refreshToken, {...cookieOptions, req, res})
      }
      req.user = newTokens.user
    }
  }
}
