import React, { useContext } from 'react'
import { AppContext } from './AppContainer'
import './App.css'

function AppView(): React.ReactElement {
	const { app, dispatchApp } = useContext(AppContext)

  return (
		<div className="app">

		</div>
	)
}

export default AppView
