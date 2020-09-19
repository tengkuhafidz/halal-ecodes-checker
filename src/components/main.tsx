import React, { useState } from 'react'
import Fuse from 'fuse.js'
import EcodeCard from './ecodeCard'
import { EcodeData } from '../utils/models'

interface Props {
  ecodesData: EcodeData[]
}

const Main: React.FC<Props> = ({ ecodesData }) => {
  const [searchString, setSearchString] = useState('')

  const getFuseSearchResult = (ecodesData: EcodeData[], searchTerm: string): EcodeData[] => {
    const options = {
      isCaseSensitive: false,
      findAllMatches: false,
      includeMatches: false,
      includeScore: false,
      useExtendedSearch: false,
      minMatchCharLength: 1,
      shouldSort: true,
      threshold: 0.1,
      location: 0,
      distance: 100,
      keys: ['ecode'],
    }

    const fuse: Fuse<any> = new Fuse(ecodesData, options)
    const fuseSearchResult = fuse.search(searchTerm)
    return fuseSearchResult.map((result) => result.item)
  }

  const getSearchResults = (ecodesData: EcodeData[], searchString: string) => {
    const searchTerms: string[] = searchString.split(' ')

    const allResults: EcodeData[] = []
    searchTerms.forEach((term) => {
      const fuseSearchResults = getFuseSearchResult(ecodesData, term)
      allResults.push(...fuseSearchResults)
    })
    const uniqueResults = allResults.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
    return uniqueResults
  }

  const filteredEcodesData = searchString ? getSearchResults(ecodesData, searchString) : ecodesData

  const renderEcodes = () => {
    return filteredEcodesData.map((ecodeData) => <EcodeCard ecodeData={ecodeData} key={ecodeData.id} />)
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value
    setSearchString(searchTerm)
  }

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 mb-16 text-center">
        <div>
          <label className="inline-block font-bold text-lg mr-1">e</label>
          <input
            className="inline-block bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-1 px-2 w-3/4 appearance-none leading-normal"
            type="text"
            placeholder="100 (without the prefix `e`)"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <p className="mt-2 text-gray-800 text-sm">Search for multiple ecodes by spacing. e.g. 100 104</p>
        <p className="mt-2 text-gray-600 text-xs">
          Information from{' '}
          <a
            href="https://www.muis.gov.sg/Halal/Religious-Guidelines/Food-Additives-Listing"
            className="underline hover:text-gray-800"
          >
            Islamic Religious Council of Singapore
          </a>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{renderEcodes()}</div>
    </div>
  )
}

export default Main
