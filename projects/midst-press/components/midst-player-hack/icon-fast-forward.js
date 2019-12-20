const e = require('react').createElement

module.exports = function iconItalic() {
  return e('svg', {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'feather feather-fast-forward',
  },
    e('polygon', { points: '13 19 22 12 13 5 13 19' }),
    e('polygon', { points: '2 19 11 12 2 5 2 19' }),
  )
}
