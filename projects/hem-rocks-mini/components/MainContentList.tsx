import React, { PropsWithChildren, ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Scrollbars from 'react-scrollbars-custom'
import { CloseButton } from '../../../lib/packages/hem-buttons'
import { PopupContainer, openPopup } from '../../../lib/modules/popups'
import { MainContentBox } from './index'
import { setCurrentContentItem } from '../modules/content'
import { RootState } from '../index'

interface IProps {
  buttonText: string
  tag: string
  title: string
}

function MainContentList({
  buttonText,
  children,
  tag,
  title
}: PropsWithChildren<IProps>): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const contentItems = allContentItems.filter(item => item.tags.includes(tag))

  function launchDetailPopup(pack) {
    dispatch(setCurrentContentItem(pack))
    dispatch(openPopup('detail-popup'))
  }

  return (
    <header className="main-content-list">
      <h1>
        { title }
        <div
          className="header-info-badge"
          onClick={() => {
            dispatch(openPopup(tag + '-info'))
          }}
        >
          i
        </div>
      </h1>
      <div className="main-content">
        <p className="main-content-blurb">
          I'm baby austin flexitarian artisan typewriter vice tofu crucifix. Pinterest truffaut stumptown, raw denim offal viral four dollar toast man bun. Church-key cardigan authentic, microdosing chambray literally seitan quinoa mixtape man bun. Viral meggings master cleanse 90's affogato raclette.
        </p>
        {contentItems.map(contentItem => (
          <MainContentBox
            action={launchDetailPopup}
            buttonText={buttonText}
            key={contentItem.id}
            contentItem={contentItem}
          >
            { children }
          </MainContentBox>
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
    </header>
  )
}

export default MainContentList
