import CommunityItem from '@components/CommunityItem'
import FloatingButton from '@components/FloatingButton'
import Layout from '@components/Layout'
import usePosts from '@hooks/usePosts'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const CommunityHome: NextPage = () => {
  const router = useRouter()
  const { posts } = usePosts()
  return (
    <Layout title="동네생활" hasTapBar>
      <div className="px-4 space-y-6">
        {posts?.map((post) => (
          <CommunityItem
            key={post.id}
            id={post.id}
            tags={['동네생활', 'test']}
            commentCount={post._count.comments}
            likeCount={post._count.wonders}
            question={post.question}
            createdAt={`${post.createdAt}`}
            writer={post.user.name}
          />
        ))}

        <FloatingButton onClick={() => router.push('/community/write')}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  )
}

export default CommunityHome
