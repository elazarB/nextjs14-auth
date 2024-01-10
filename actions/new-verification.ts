'use server'

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return {error: 'Token dose not exist!'}
  }

  const hesExpected = new Date(existingToken.expires) < new Date() ;

  if(hesExpected) {
    return {error: 'Token hes expired!'}
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if(!existingToken) {
    return {error: 'Email dose not exist!'}
  }

  await db.user.update({
    where: {
      id: existingUser?.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingUser?.email,
    }
  })

  await db.verificationToken.delete({
    where: {
      id: existingUser?.id,
    }
  })

  return {success: 'Email verified!'}
}