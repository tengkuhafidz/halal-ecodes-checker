import 'react-html5-camera-photo/build/css/index.css'

import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { CgSpinner } from 'react-icons/cg'
import Camera, { FACING_MODES } from 'react-html5-camera-photo'

import useGoogleVision from '../hooks/useGoogleVision'

import ActionSheet from './shared/action-sheet'

const reECode = /^(E|e)\d{3}[0-9a-zA-Z]?$/g

interface ECodeScannerProps {
  apiKey: string
  open: boolean
  onClose: () => void
  onChange: (eCodes: string[]) => void
  className?: string
}

export default function ECodeScanner(props: ECodeScannerProps) {
  const { apiKey, open, onChange, onClose, className } = props

  const [openScanner, setOpenScanner] = useState(false)
  const [previewing, setPreviewing] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [eCodes, setECodes] = useState('')

  const { annotateImage } = useGoogleVision(apiKey)

  useEffect(() => {
    setOpenScanner(open)
  }, [open])

  function closeScanner() {
    setOpenScanner(false)
    setPreviewing(false)
    setError(null)
    setECodes('')

    onClose()
  }

  async function scanImage(image) {
    setError(null)
    setLoading(true)
    setECodes('')
    setPreviewing(true)

    try {
      const { annotations, error } = await annotateImage(image)

      if (error) {
        setError(error.message)
      } else {
        const _annotation = annotations ? annotations.map(({ description }) => description).join(' ') : ''

        const matchECodes = _annotation.match(reECode)
        if (matchECodes) {
          const codes: string[] = Array.from(new Set(matchECodes))

          setECodes(codes.join(' '))
          onChange(codes)
        } else {
          setECodes('')
        }
      }
    } catch (e) {
      console.log('error:', error)
      setError(e.message)
    }

    setLoading(false)
  }

  return (
    <ActionSheet className={`sheet ${className}`} height={380} open={openScanner} onClose={closeScanner}>
      <style>{`
      .sheet > div {
        height: 60px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
      }
      .react-html5-camera-photo {
        top: -40px;
      }
      #container-circles {
        position: fixed;
        bottom: 163px;
        margin-left: 14px;
        cursor: pointer;
      }
      #container-circles #outer-circle{
        height: 50px;
        width: 50px;
        box-shadow: 0 0 0 3px #37363747;
      }
      #container-circles #inner-circle{
        top: 25px;
        height: 34px;
        width: 34px;
        margin: -17px 0 0 -17px;
      }
      `}</style>
      <div className="flex-col" style={{ height: 300, marginTop: 15 }}>
        <div className="flex items-center justify-center h-10 text-gray-700">
          {loading && (
            <>
              <CgSpinner size={20} className="mr-1 animate animate-spin" />
              Processing image..
            </>
          )}
          {!loading && !previewing && <div>Snap a picture to scan</div>}
          {!loading && previewing && <div>{eCodes || 'No e-code detected'}</div>}
          {error !== null && <div>error: {error}</div>}
        </div>

        <div
          className="flex justify-center items-center rounded-md shadow-md bg-gray-700 mb-8 mt-3"
          style={{
            height: 250,
            width: 250,
            overflow: 'hidden',
          }}
        >
          <Camera
            isImageMirror={false}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            onTakePhoto={(dataUri) => {
              scanImage(dataUri)
            }}
          />
        </div>
      </div>

      <div>
        <button className="flex justify-center items-center font-medium w-full h-16" onClick={closeScanner}>
          {previewing && eCodes ? (
            'Show Result'
          ) : (
            <>
              <AiOutlineClose size={16} className="mr-1 opacity-75" />
              Close
            </>
          )}
        </button>
      </div>
    </ActionSheet>
  )
}
