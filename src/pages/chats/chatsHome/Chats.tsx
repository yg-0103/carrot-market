import ChatItem from '@components/ChatItem'
import Layout from '@components/Layout'
import type { NextPage } from 'next'

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTapBar>
      <div className="divide-y-2">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ChatItem key={i} name="Steve Jebs">
            See you tomorrow in the corner at 2pm!
          </ChatItem>
        ))}
      </div>
    </Layout>
  )
}

export default Chats
