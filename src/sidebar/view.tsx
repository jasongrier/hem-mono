import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Search } from '../search'
import { IProjectFile } from '../project/types'
import { TagList } from '../tag-list'
import { applyFilter } from './redux'
import './style.css'

interface IProps {
  filteredFiles: IProjectFile[]
  filteredTags: string[]
}

function Sidebar({ filteredFiles, filteredTags }: IProps): ReactElement {
  const dispatch = useDispatch()

  function onSearch(searchText: string) {
    dispatch(applyFilter(searchText))
  }

  function onTagClicked(tag: string) {
    console.log(tag)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-main-controls">
            <div className="sidebar-header-search">
              <Search onSearch={onSearch} />
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
