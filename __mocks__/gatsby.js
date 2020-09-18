import React from 'react'
const gatsby = jest.requireActual('gatsby')

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
      React.createElement('a', {
        ...rest,
        href: to,
      }),
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(() => ({
    site: {
      siteMetadata: {
        defaultTitle: 'defaultTitle',
        titleTemplate: 'titleTemplate',
        defaultDescription: 'defaultDescription',
        author: 'author',
        defaultImage: 'defaultImage',
        url: 'url',
        twitterUsername: 'twitterUsername',
      },
    },
  })),
}
