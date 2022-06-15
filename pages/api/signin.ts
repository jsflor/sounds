import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

import prisma from '../../lib/prisma';
import { createJWT, setJWTCookie } from '../../lib/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    setJWTCookie(res, createJWT(user));

    res.json(user)
  } else {
    res.status(401)
    res.json({ error: 'Email or Password is wrong' })
  }
}
