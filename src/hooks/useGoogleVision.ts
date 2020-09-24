const annotateImage = (base64Image: string, apiKey: string) => {
  const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`

  const payload = {
    requests: [
      {
        image: {
          content: base64Image.replace('data:image/png;base64,', ''),
        },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  }

  return fetch(endpoint, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        return {
          error: json.error,
        }
      }

      return {
        annotations: json.responses[0].textAnnotations,
      }
    })
}

export default function useGoogleVision(apiKey: string) {
  return {
    annotateImage: (base64Image) => annotateImage(base64Image, apiKey),
  }
}
