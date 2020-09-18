import React from 'react'
import { EcodeData } from '../utils/models'

interface Props {
  ecodeData: EcodeData
}

const EcodeCard: React.FC<Props> = ({ ecodeData: { ecode, halalStatus, category, whatIsIt, chemicalName }}) => (
  <div className={`grid-col-1 rounded-lg p-8  text-white ${ halalStatus === "Halal" ? "bg-green-600" : "bg-red-600"}`}>
    <h2 className="text-xl font-bold">e{ecode} - {halalStatus}</h2>
    <p className="mt-2 font-light">{chemicalName}</p>
    <p className="mt-4 font-light">{category}: {whatIsIt}</p>
    <p className="mt-4 font-light">Is this web app helpful? Buy a coffee for the developer or share it around!</p>
    <div className="mt-4 text-sm">
      <button className=" mr-2 bg-white text-gray-800 hover:bg-gray-200 py-2 px-4 rounded">
        Buy Coffee
      </button>
      <button className="bg-white text-gray-800 hover:bg-gray-200 py-2 px-4 rounded">
        Share
      </button>
    </div>
  </div>
)

export default EcodeCard