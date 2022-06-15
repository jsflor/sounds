import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import prisma from '../../lib/prisma';
import { createJWT, setJWTCookie } from '../../lib/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync();
  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })
  } catch (e) {
    console.log(e)
    res.status(401)
    res.json({ error: 'User already exists' })
    return
  }

  setJWTCookie(res, createJWT(user));

  res.json(user)
}
