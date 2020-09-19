import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'
import { StringLiteral } from 'typescript'

enum TwitterCard {
  Summary = 'summary',
  SummaryLargeImage = 'summary_large_image',
}

interface Props {
  title?: StringLiteral
  description?: string
  image?: string
  twitterCard?: TwitterCard
}

const SEO: React.FC<Props> = ({ title, description, image, twitterCard }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            titleTemplate
            defaultDescription: description
            author
            defaultImage: image
            url
            twitterUsername
          }
        }
      }
    `,
  )

  const { defaultTitle, titleTemplate, defaultDescription, defaultImage, url, twitterUsername } = site.siteMetadata

  const metaTitle = title || defaultTitle
  const metaDescription = description || defaultDescription
  const metaImage = image || defaultImage
  const metaTwitterCard = twitterCard || TwitterCard.SummaryLargeImage

  return (
    <div>
      <Helmet title={metaTitle} titleTemplate={titleTemplate}>
        <meta name="title" content="Additive Halal Check" />
        <meta name="description" content="A list of ECodes/additives with their details and halal status" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ecodehalalcheck.com/" />
        <meta property="og:title" content="Additive Halal Check" />
        <meta property="og:description" content="A list of ECodes/additives with their details and halal status" />
        <meta property="og:image" content="/app-banner.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ecodehalalcheck.com/" />
        <meta property="twitter:title" content="Additive Halal Check" />
        <meta property="twitter:description" content="A list of ECodes/additives with their details and halal status" />
        <meta property="twitter:image" content="/app-banner.png" />
      </Helmet>
    </div>
  )
}

export default SEO
