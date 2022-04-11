import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

async function main() {
  Array.from({ length: 500 }).forEach(async (_, i) => {
    await client.stream.create({
      data: {
        name: `${i}`,
        description: `${i}`,
        price: i,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    })
    console.log(`${i}/500`)
  })
}

main()
  .catch(console.error)
  .finally(() => client.$disconnect())
