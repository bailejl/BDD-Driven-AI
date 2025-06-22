/* eslint-disable @typescript-eslint/no-require-imports */
const React = require('react')

const SvgMock = (props) =>
  React.createElement('svg', { ...props, 'data-testid': 'svg-mock' })

module.exports = SvgMock
