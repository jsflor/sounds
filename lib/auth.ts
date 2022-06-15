import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { JWT_COOKIE_NAME, JWT_PRIVATE_KEY } from './constants'
import prisma from './prisma'

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[JWT_COOKIE_NAME];

    if (token) {
      let user

      try {
        const { id } = validateToken(token)
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorized' })
        return
      }

      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not Authorized' })
  }
}

export const createJWT = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      time: Date.now(),
    },
    JWT_PRIVATE_KEY,
    {
      expiresIn: '8h',
    }
  );
}

export const validateToken = (token) => {
  const user = jwt.verify(token, JWT_PRIVATE_KEY);
  return user;
}

export const setJWTCookie = (res: NextApiResponse<any>, token: any) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(JWT_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );
}
