import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CloseButton } from '../../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup, closePopup } from '../../../../lib/modules/popups'
import { assetHostHostname } from '../../functions'

function HemRefreshHeroine(): ReactElement {
  const dispatch = useDispatch()

  const assetHost = assetHostHostname()

  return (
    <div className="hem-refresh-heroine">
      <Link to="home/new-website">
        <div
          className="hem-refresh-heroine-image"
          style={{
            backgroundImage: `url(${assetHost}/hem-rocks/site/heroines/hem-refresh-heroine-5.jpg)`,
          }}
        />
        <div className="hem-refresh-heroine-details">
          <div className="hem-refresh-heroine-text">
            <h2>HEM 2021</h2>
            <h5>Music in a Petri Dish. Vito Acconci on Music and Language. Anna-Luisa Petrisko on India Cooke. Rare tracks by Ariel Pink, Kevin Drumm, Michael Pisaro, Julia Holter. New sounds in the Library.</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HemRefreshHeroine
