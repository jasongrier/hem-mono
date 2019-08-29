/*
<svg
  xmlns='http://www.w3.org/2000/svg'
  width='24'
  height='24'
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  stroke-width='2'
  stroke-linecap='round'
  stroke-linejoin='round'
  class='feather feather-square'
>
  <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
</svg>
*/

module.exports = function iconSquare() {
  return e('svg', {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'feather feather-square',
  },
    e('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
  )
}