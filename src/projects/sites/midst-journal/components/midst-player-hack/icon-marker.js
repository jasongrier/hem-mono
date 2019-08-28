/*
<svg
  xmlns='http://www.w3.org/2000/svg'
  width='24'
  eight='24'
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  stroke-width='2'
  stroke-linecap='round'
  stroke-linejoin='round'
  class='feather feather-map-pin'
>
  <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
  <circle cx='12' cy='10' r='3'></circle>
</svg>
*/

module.exports = function iconMarker() {
  return e('svg', {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'feather feather-pin',
  },
    e('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }),
    e('circle', { cx: '12', cy: '10', r: '3' }),
  )
}
