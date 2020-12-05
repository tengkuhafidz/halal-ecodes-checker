import React from 'react'
import { FeedbackFish } from '@feedback-fish/react'

const Footer: React.FC = () => (
  <div className="text-center text-gray-600 mt-24">
    <FeedbackFish projectId={process.env.GATSBY_FEEDBACK_FISH}>
      <button className="underline mb-4">Have a feeback? Let us know!</button>
    </FeedbackFish>
    <p>
      Created by{' '}
      <a
        href="https://buymeacoffee.com/tengkubros"
        target="_blank"
        rel="noreferrer"
        className="underline hover:text-gray-800"
      >
        Tengku Bros
      </a>
      , in Sunny Singapore 🇸🇬
    </p>
  </div>
)

export default Footer
