import FloatingButton from '@components/FloatingButton'
import Layout from '@components/Layout'
import LiveItem from '@components/LiveItem'
import type { NextPage } from 'next'

const Live: NextPage = () => {
  return (
    <Layout title="라이브" hasTapBar>
      <div className="divide-y-2 space-y-3">
        {[1, 2, 3, 4, 5].map((v) => (
          <LiveItem key={v} title="Let's try potatos" />
        ))}
        <FloatingButton onClick={() => {}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  )
}

export default Live
