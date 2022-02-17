import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

client.user.create({
  data: {
    email: 'yeongoo1oo4@nate.com',
    name: '사랑',
  },
})
