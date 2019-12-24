import $ from 'jquery'
import uuid from 'uuid/v1'
import ReactDOM from 'react-dom'
import { Root } from './components'
import './index.css'

declare const zip: any
declare const SCRIPT_URL: string

const win = (window as any)
const scripts = document.getElementsByTagName('script')
const index = scripts.length - 1

win.SCRIPT_URL = scripts[index].src.replace(/midst-widget([\.0-9a-z]+)js$/, '')

$(document).ready(async function() {
  const id = uuid()
  await $.getScript(`${SCRIPT_URL}/static/scripts/zip.js`)
  zip.workerScriptsPath = SCRIPT_URL + '/static/workers/'
  $('body').append(`<div id="react-root-${id}" />`)
  ReactDOM.render(Root, document.getElementById(`react-root-${id}`))
})
