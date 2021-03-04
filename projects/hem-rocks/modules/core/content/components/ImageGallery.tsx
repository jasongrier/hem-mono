import React, { ReactElement, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assetHostHostname } from '../../../../../hem-rocks/functions'
import { getContentItemById, IContentItem, requestReadChunk } from '../'
import { RootState } from '../../../../index'
import { getContentItemsFromRawList } from '../functions'
import { setPopupsFrozen } from '../../../../../../lib/modules/popups'
import { ChevronButton, CloseButton } from '../../../../../../lib/packages/hem-buttons'

interface IProps {
  galleryId: string
}

function findLightboxImage(
  images: IContentItem[],
  currentLightboxImage: IContentItem,
  sign: number
) {
  const currentLightboxImageIndex = images.findIndex(i => i.id === currentLightboxImage.id)
  if (currentLightboxImageIndex < 0) return
  const nextLightboxImage = images[currentLightboxImageIndex + sign]
  if (!nextLightboxImage) return
  return nextLightboxImage
}

function ImageGallery({ galleryId }: IProps): ReactElement {
  const { allContentItems, chunkLog, currentProject, galleryContentItem } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    chunkLog: state.content.chunkLog,
    currentProject: state.content.currentProject,
    galleryContentItem: getContentItemById(state.content.contentItems, galleryId),
  }))

  const dispatch = useDispatch()

  const [images, setImages] = useState<IContentItem[]>([])
  const [lightboxImage, setLightboxImage] = useState<IContentItem>()

  useEffect(function loadGallery() {
    if (chunkLog.includes('image-gallery')) return
    dispatch(requestReadChunk('image-gallery'))
  }, [chunkLog])

  useEffect(function loadImages() {
    if (!currentProject) return
    if (!galleryContentItem) return
    setImages(getContentItemsFromRawList(allContentItems, galleryContentItem.attachments))
  }, [galleryContentItem, allContentItems, currentProject])

  useEffect(function loadImages() {
    dispatch(setPopupsFrozen(!!lightboxImage))
  }, [lightboxImage])

  useEffect(function captureEscapeKey() {
    function bodyOnKeyDown(evt: any) {
      evt.stopPropagation()

      if (evt.keyCode === 27) {
        setLightboxImage(undefined)
      }
    }

    document.body.addEventListener('keydown', bodyOnKeyDown)

    return function cleanup() {
      document.body.removeEventListener('keydown', bodyOnKeyDown)
    }
  }, [])

  const onPrevClick = useCallback(
    function onPrevClickFn(evt: SyntheticEvent<HTMLDivElement>) {
      evt.stopPropagation()
      if (!lightboxImage) return
      setLightboxImage(
        findLightboxImage(images, lightboxImage, -1)
      )
    }, [images, lightboxImage],
  )

  const onNextClick = useCallback(
    function onNextClickFn(evt: SyntheticEvent<HTMLDivElement>) {
      evt.stopPropagation()
      if (!lightboxImage) return
      setLightboxImage(
        findLightboxImage(images, lightboxImage, 1)
      )
    }, [images, lightboxImage],
  )

  if (!galleryContentItem) return (<div />)

  return (
    <div className="image-gallery">
      <ul>
        { images.map(image => (
          <li
            key={image.id}
            onClick={() => setLightboxImage(image)}
            style={{
              backgroundImage:
                `url(${assetHostHostname()}/${currentProject}/${image.keyArtThumbnailFullPath})`,
            }}
          />
        ))}
      </ul>
      { lightboxImage && (
        <div
          className="image-gallery-lightbox"
          onClick={() => setLightboxImage(undefined)}
        >
          <div
            className="image-gallery-lightbox-content"
            onClick={(evt: SyntheticEvent<HTMLDivElement>) => evt.stopPropagation()}
          >
            <div className="image-gallery-lightbox-close-button">
              <CloseButton onClick={() => setLightboxImage(undefined)} />
            </div>
            { findLightboxImage(images, lightboxImage, -1) && (
              <div
                className="image-gallery-lightbox-prev-button"
                onClick={onPrevClick}
              >
                <ChevronButton />
              </div>
            )}
            { findLightboxImage(images, lightboxImage, 1) && (
              <div
                className="image-gallery-lightbox-next-button"
                onClick={onNextClick}
              >
                <ChevronButton />
              </div>
            )}
            <div className="image-gallery-lightbox-image">
              <img src={`${assetHostHostname()}/${currentProject}/${lightboxImage.keyArtFullPath}`} />
            </div>
            <div className="image-gallery-lightbox-caption">
              <strong>{ lightboxImage.title }</strong><br/>
              { lightboxImage.blurb }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGallery
