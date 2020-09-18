import { graphql } from 'gatsby'
import React from 'react'
import SEO from '../components/seo'
import Main from '../components/main'
import { EcodeData } from '../utils/models'

const Home = ({ data }) => {
  const ecodesData: EcodeData[] = data.allEcodesSheetsData.nodes

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <SEO />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-semibold text-center">Additive Halal Check</h1>
        <Main ecodesData={ecodesData} />
      </div>
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
