import React, { ReactElement, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Scrollbars from 'react-scrollbars-custom'
import { LaunchBuyPopupButton } from '../components'
import { setCurrentProduct } from '../modules/products'
import { PopupContainer, openPopup } from '../../../lib/modules/popups'
import { TrackPlayPauseButton } from '../../../lib/modules/player'
import { CloseButton } from '../../../lib/packages/hem-buttons'
import { Planes } from '../../../lib/packages/hem-placemats'
import { RootState } from '../index'

function SoundLibrary(): ReactElement {
  const { allProducts } = useSelector((state: RootState) => ({
    allProducts: state.products.products,
  }))

  const dispatch = useDispatch()

  const packs = allProducts.filter(product => product.tags.includes('sound-library'))

  function launchBuyPopup(pack) {
    dispatch(setCurrentProduct(pack))
    dispatch(openPopup('buy-popup'))
  }

  return (
    <div className="page page-sound-library">
      <h1>
        Sound Library
        <div
          className="header-info-badge"
          onClick={() => {
            dispatch(openPopup('sound-library-info'))
          }}
        >
          i
        </div>
      </h1>
      <div className="main-content">
        <p className="main-content-blurb">
          I'm baby austin flexitarian artisan typewriter vice tofu crucifix. Pinterest truffaut stumptown, raw denim offal viral four dollar toast man bun. Church-key cardigan authentic, microdosing chambray literally seitan quinoa mixtape man bun. Viral meggings master cleanse 90's affogato raclette.
        </p>
        { packs.map((pack, i) => (
          <div
            className={`
              main-content-box
              ${ i === 0 ? ' heroine-box' : '' }
            `}
            key={pack.id}
          >
            <div
              className="main-content-box-key-art"
              onClick={() => {
                launchBuyPopup(pack)
              }}
            >
              <Planes />
            </div>
            <div
              className="main-content-box-text"
              onClick={() => {
                launchBuyPopup(pack)
              }}
            >
              <h3>{ pack.name }</h3>
              <p>{ pack.blurb }</p>
            </div>
            <div className="main-content-box-actions">
              <TrackPlayPauseButton track={{
                id: pack.slug,
                type: 'soundcloud',
                resource: pack.soundCloudTrackId,
              }}/>
              <LaunchBuyPopupButton product={pack} />
            </div>
          </div>
        ))}
      </div>
      <PopupContainer
        id="sound-library-info"
        // @ts-ignore
        closeIcon={CloseButton}
      >
        <Scrollbars>
          <h2>About the Sound Library</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget nulla vel velit imperdiet gravida vel quis neque. Nulla hendrerit nisi elementum nulla condimentum ultricies. Aliquam a sagittis massa. Sed non ante mattis, porttitor eros et, elementum felis. Aliquam ac odio vel arcu condimentum malesuada nec sit amet felis. Curabitur vitae imperdiet erat, eget lobortis augue. Donec et dictum dui.</p>
          <p>Duis sed est euismod, pharetra augue in, fringilla justo. Phasellus posuere fermentum leo, ac sodales sapien rhoncus vitae. Etiam ac dui sed lorem aliquet efficitur. Proin et sollicitudin libero. Maecenas venenatis orci dui, quis sodales magna consequat sit amet. Duis quam sapien, facilisis a consectetur id, porta sed arcu. Maecenas suscipit lectus vitae nisi volutpat fermentum. Phasellus dignissim tempus tellus quis blandit. Integer tincidunt massa sed mi ornare, nec malesuada libero elementum. Vestibulum sed commodo risus, non aliquet risus.</p>
          <p>Sed tincidunt molestie lorem quis malesuada. Donec et metus egestas, venenatis lectus vel, sollicitudin nisi. Vivamus rutrum sed nunc in imperdiet. Integer commodo neque ut tortor ullamcorper, eu rhoncus risus vehicula. Vestibulum efficitur tortor et posuere blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean nec vehicula dolor, id finibus sapien. Praesent semper leo eu malesuada imperdiet. Nunc egestas nibh vel elit semper tristique. Donec sed dolor et sem cursus dictum sit amet sed purus. Fusce ornare, nisl quis vestibulum molestie, elit neque rhoncus sem, congue imperdiet nisl odio at elit. Nulla imperdiet hendrerit porta. Cras ac rutrum nunc. Ut in varius sem, sit amet placerat mauris. Proin tempor nisi nec consectetur tempor.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget nulla vel velit imperdiet gravida vel quis neque. Nulla hendrerit nisi elementum nulla condimentum ultricies. Aliquam a sagittis massa. Sed non ante mattis, porttitor eros et, elementum felis. Aliquam ac odio vel arcu condimentum malesuada nec sit amet felis. Curabitur vitae imperdiet erat, eget lobortis augue. Donec et dictum dui.</p>
          <p>Duis sed est euismod, pharetra augue in, fringilla justo. Phasellus posuere fermentum leo, ac sodales sapien rhoncus vitae. Etiam ac dui sed lorem aliquet efficitur. Proin et sollicitudin libero. Maecenas venenatis orci dui, quis sodales magna consequat sit amet. Duis quam sapien, facilisis a consectetur id, porta sed arcu. Maecenas suscipit lectus vitae nisi volutpat fermentum. Phasellus dignissim tempus tellus quis blandit. Integer tincidunt massa sed mi ornare, nec malesuada libero elementum. Vestibulum sed commodo risus, non aliquet risus.</p>
          <p>Sed tincidunt molestie lorem quis malesuada. Donec et metus egestas, venenatis lectus vel, sollicitudin nisi. Vivamus rutrum sed nunc in imperdiet. Integer commodo neque ut tortor ullamcorper, eu rhoncus risus vehicula. Vestibulum efficitur tortor et posuere blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean nec vehicula dolor, id finibus sapien. Praesent semper leo eu malesuada imperdiet. Nunc egestas nibh vel elit semper tristique. Donec sed dolor et sem cursus dictum sit amet sed purus. Fusce ornare, nisl quis vestibulum molestie, elit neque rhoncus sem, congue imperdiet nisl odio at elit. Nulla imperdiet hendrerit porta. Cras ac rutrum nunc. Ut in varius sem, sit amet placerat mauris. Proin tempor nisi nec consectetur tempor.</p>
        </Scrollbars>
      </PopupContainer>
    </div>
  )
}

export default SoundLibrary
