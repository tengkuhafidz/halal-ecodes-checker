import { graphql } from 'gatsby'
import React from 'react'
import BackToTop from '../components/back-to-top'
import Footer from '../components/footer'
import Main from '../components/main'
import SEO from '../components/seo'
import { EcodeData } from '../utils/models'

const Home = ({ data }) => {
  const ecodesData: EcodeData[] = data.allEcodesSheetsData.nodes

  const renderBackToTop = () => {
    if (typeof window !== 'undefined') {
      return <BackToTop />
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <SEO />
      <div className="max-w-6xl mx-auto pt-12 pb-4 px-4">
        <h1 className="text-4xl font-semibold text-center">Additive Halal Check</h1>
        <Main ecodesData={ecodesData} />
        <Footer />
      </div>
      {renderBackToTop()}
    </div>
  )
}

export default Home

export const ecodesData = graphql`
  query MyQuery {
    allEcodesSheetsData {
      nodes {
        id
        ecode
        halalStatus
        category
        chemicalName
        whatIsIt
      }
    }
  }
`
