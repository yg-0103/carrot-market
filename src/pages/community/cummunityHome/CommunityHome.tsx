import CommunityItem from '@components/CommunityItem'
import FloatingButton from '@components/FloatingButton'
import Layout from '@components/Layout'
import type { NextPage } from 'next'

const CommunityHome: NextPage = () => {
  return (
    <Layout title="동네생활" hasTapBar>
      <div className="px-4 space-y-6">
        {[1, 2, 3, 4, 5, 7, 8, 9].map((i) => (
          <CommunityItem
            key={i}
            tags={['동네생활', 'test']}
            commentCount={1}
            likeCount={1}
            question="What is the best mandu restaurant?"
            createdAt="18시간 전"
            writer="니꼬"
          />
        ))}

        <FloatingButton onClick={() => {}}>
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
