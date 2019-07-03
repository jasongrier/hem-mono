import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Search } from '../../../common/search'
import { IFile, ITag } from '../project/types'
import { TagList } from '../tag-list'
import { filterFiles, filterTags } from '../project/redux'
import './style.css'

interface IProps {
  filteredFiles: IFile[]
  filteredTags: ITag[]
  filterText: string
}

function Sidebar({ filteredTags, filterText }: IProps): ReactElement {
  const dispatch = useDispatch()

  function onSearch(searchText: string) {
    dispatch(filterFiles(searchText))
    dispatch(filterTags(searchText))
  }

  function onTagClicked(tag: ITag) {
    dispatch(filterFiles(tag.name))
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-main-controls">
            <div className="sidebar-header-search">
              <Search
                searchText={filterText}
                onSearch={onSearch}
              />
            </div>
          </div>
        </div>
        <div className="sidebar-microbar panel-border-right">
          <TagList
            tags={filteredTags}
            onTagClicked={onTagClicked}
          />
        </div>
        <div className="sidebar-main">
          <div className="sidebar-panel file-list">
            {/* {filterFiles.map((file, i) => (
              <div className="file">{}</div>
            ))} */}
            <div className="file">83-exploring-phasellus.wav</div>
            <div className="file">84-phasellus-waves.wav</div>
            <div className="file">85-phasellus-crickets.wav</div>
            <div className="file active">86-phasellus-beach-party.wav</div>
            <div className="file">87-phasellus-soundchecking.wav</div>
            <div className="file">88-jason-singing-in-the-shower.wav</div>
            <div className="file">89-jason-singing-on-the-night-road-walk.wav</div>
            <div className="file">90-last-dinner-in-mt-olympus-1.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
            <div className="file">91-last-dinner-in-mt-olympus-2.wav</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
