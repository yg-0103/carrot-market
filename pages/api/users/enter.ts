import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { v4 } from 'uuid'
import twilio from 'twilio'
import mail from '@sendgrid/mail'

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

mail.setApiKey(process.env.SENDGRID_KEY!)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body
  const user = email ? { email } : phone ? { phone: +phone } : null
  const payload = v4()

  if (!user) return res.status(400).end()

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  })

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.PHONE_NUMBER!,
    //   body: `캐럿마켓 인증 토큰: ${payload}`,
    // })
    // console.log(message)
  } else if (email) {
    // const message = await mail.send({
    //   from: 'rladusrn89@gmail.com',
    //   to: 'rladusrn89@gmail.com',
    //   subject: '캐럿마켓 인증 토큰입니다.',
    //   text: `인증토큰: ${payload}`,
    // })
    // console.log(message)
  }

  return res.json({
    ok: true,
  })
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false })
