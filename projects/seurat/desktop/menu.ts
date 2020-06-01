import {last} from 'lodash'
import {shell} from 'electron'
import {renderMenu as renderMenuHelper, triggerRendererHandler, toggleFloatingWindow as toggleFloatingWindowHelper} from 'projekt/lib/helpers/desktop'
import {toggleSliders} from './view-mode'
import {start, stop} from './sync'
import {defaultBoardSize, boardSizes} from '../model'

let playing = false
let slidersOpen = false
let boardSize = defaultBoardSize
let windowFloating = false

const togglePlaying = () => {
  if (playing) {
    stop()
  }

  else {
    start()
  }

  playing = !playing
}

const toggleFloatingWindow = () => {
  windowFloating = !windowFloating
  toggleFloatingWindowHelper()
}

export const renderMenu = () => {
  const template = [
    {
      label: 'Seurat',
      submenu: [
        {label: 'About Seurat', click: triggerRendererHandler('openAbout')},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'},
      ]
    },
    {
      label: 'File',
      submenu: [
        {label: 'New', accelerator: 'Cmd+N', click: triggerRendererHandler('new')},
        {type: 'separator'},
        {label: 'Open...', accelerator: 'Cmd+O', click: triggerRendererHandler('open')},
        {type: 'separator'},
        {label: 'Save', accelerator: 'Cmd+S', click: triggerRendererHandler('save')},
        {type: 'separator'},
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {label: 'Clear', accelerator: 'Cmd+Backspace', click: triggerRendererHandler('clear')},
        {label: 'Fill', accelerator: 'Cmd+Shift+Backspace', click: triggerRendererHandler('fill')},
        {type: 'separator'},
        {label: 'Play', type: 'checkbox', accelerator: 'Space', click: togglePlaying},
      ]
    },
    {
      label: 'View',
      submenu: [
        {label: 'Sliders', type: 'checkbox', checked: slidersOpen, accelerator: 'Tab', click: toggleSliders},
        {label: 'Floating Window', type: 'checkbox', checked: windowFloating, click: toggleFloatingWindow},
      ],
    },
    {
      label: 'Board',
      submenu: [
        {label: 'Bigger', accelerator: 'Cmd+Plus', enabled: boardSize > boardSizes[0], click: triggerRendererHandler('incDecBoardSize', 1)},
        {label: 'Smaller', accelerator: 'Cmd+-', enabled: boardSize < last(boardSizes), click: triggerRendererHandler('incDecBoardSize', -1)},
        {type: 'separator'},
        {label: 'Sequence',
          submenu: [
            {label: 'Random', type: 'radio', click: triggerRendererHandler('setBoardProp', {key: 'sequence', value: 'random'})},
            {label: 'Drum Machine', type: 'radio', click: triggerRendererHandler('setBoardProp', {key: 'sequence', value: 'drum-machine'})},
            {label: 'LSTM', type: 'radio', click: triggerRendererHandler('setBoardProp', {key: 'sequence', value: 'lstm'})},
          ],
        },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {type: 'separator'},
        {label: 'Read the Seurat Manual...', click: () => {}},
        {type: 'separator'},
        {label: 'Visit hem.rocks...', click: () => shell.openExternal('http://hem.rocks/')},
        {label: 'Get Support...', click: () => {}},
        {label: 'User Account and Licenses...', click: () => {}},
        {type: 'separator', visible: process.env.NODE_ENV === 'development'},
        {role: 'toggledevtools', visible: process.env.NODE_ENV === 'development'},
      ]
    },
  ]

  return renderMenuHelper(template)
}
