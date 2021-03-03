import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assetHostHostname } from '../../../../../hem-rocks/functions'
import { getContentItemById, IContentItem, requestReadChunk } from '../'
import { RootState } from '../../../../index'
import { getContentItemsFromRawList } from '../functions'

interface IProps {
  galleryId: string
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

  useEffect(function loadGallery() {
    if (chunkLog.includes('image-gallery')) return
    dispatch(requestReadChunk('image-gallery'))
  }, [chunkLog])

  useEffect(function loadImages() {
    if (!currentProject) return
    if (!galleryContentItem) return
    setImages(getContentItemsFromRawList(allContentItems, galleryContentItem.attachments))
  }, [galleryContentItem, allContentItems, currentProject])

  return (
    <div className="image-gallery">
      <ul>
        { images.map(image => {
          <li
            key={image.id}
            style={{
              backgroundImage: (
                'url('
                + assetHostHostname()
                + '/'
                + currentProject
                + '/content/images/galleries/'
                + galleryContentItem.slug
                + '/'
                + image.keyArt
                + ')'
              ),
            }}
          />
        })}
      </ul>
    </div>
  )
}

export default ImageGallery
