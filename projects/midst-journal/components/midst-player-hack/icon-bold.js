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
  class='feather feather-bold'
>
  <path d='M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z'></path>
  <path d='M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z'></path>
</svg>
*/

function iconBold() {
  return e('svg', {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'feather feather-bold',
  },
    e('path', { d: 'M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z' }),
    e('path', { d: 'M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z' }),
  )
}