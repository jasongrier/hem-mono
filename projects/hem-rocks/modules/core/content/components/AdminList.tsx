import React, { ReactElement, useEffect, useCallback, useState, SyntheticEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, } from 'react-router-dom'
import produce from 'immer'
import uuid from 'uuid'
import { isEmpty, noop, find, filter, map } from 'lodash'
import { slugify, titleCase } from 'voca'
import { ElectronOnly, Spinner } from '../../../../../../lib/components'
import { PlayPauseButton } from '../../../../../../lib/packages/hem-buttons'
import { selectableCategories, adminApplyFilter, adminApplySearch, getTagsInCollection, getContentItemBySlug, setAdminSearchableField, toggleNeedsKeyArtFilter, requestReadItems, requestUpdateItems, IContentItem, categories, projects } from '../index'
import { RootState } from '../../../../index'
import { addTag, hasCategory, hasTag, modelize } from '../functions'
import { assetHostHostname } from '../../../../functions'
import { toggleShowUnpublishedFilter, toggleStickyFilter, setCurrentPage, requestCreateItems } from '../actions'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

function AdminList(): ReactElement {
  const {
    adminFilterApplied,
    adminSearchableField,
    adminSearchApplied,
    allContentItems,
    contentItemsCount,
    currentProject,
    currentLandingPage,
    needsKeyArtFilter,
    page,
    pageContentItems,
    showUnpublishedFilter,
    stickyFilter,
    unpaginatedItemCount,
  } = useSelector((state: RootState) => ({
    adminFilterApplied: state.content.adminFilterApplied,
    adminSearchableField: state.content.adminSearchableField,
    adminSearchApplied: state.content.adminSearchApplied,
    allContentItems: state.content.contentItems,
    contentItemsCount: state.content.contentItems.length,
    currentProject: state.content.currentProject,
    currentLandingPage: state.content.currentLandingPage,
    needsKeyArtFilter: state.content.needsKeyArtFilter,
    page: state.content.page,
    pageContentItems: state.content.pageContentItems,
    showUnpublishedFilter: state.content.showUnpublishedFilter || state.content.adminFilterApplied === 'assets',
    stickyFilter: state.content.stickyFilter,
    unpaginatedItemCount: state.content.unpaginatedItemCount,
  }))

  const dispatch = useDispatch()

  const [selectedItems, setSelectedItems] = useState<any>({})
  const [interestingProperty, setInterestingProperty] = useState<keyof IContentItem>('category')
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [deploying, setDeploying] = useState<boolean>(false)

  useEffect(function fetchItems() {
    dispatch(requestReadItems())
  }, [])

  // useEffect(function signDevApp() {
  //   const { remote } = window.require('electron')
  //   const { execSync } = remote.require('child_process')
  //   const { join } = remote.require('path')
  //   const electronAppPath = join('.', 'node_modules', 'electron', 'dist', 'Electron.app')
  //   const signingTask = `codesign -s - -f ${ electronAppPath }`
  //   execSync(`${ signingTask } --deep`)
  //   execSync(signingTask)
  // }, [])

  const projectFilterOnChange = useCallback(
    function projectFilterOnChangeFn(evt: SyntheticEvent<HTMLSelectElement>) {
      const item = getContentItemBySlug(allContentItems, 'setting-current-project')
      const updatedItem: IContentItem = produce(item, (draftItem) => {
        draftItem.description = evt.currentTarget.value
      })
      dispatch(requestUpdateItems([updatedItem]))

      const landingPageItem = getContentItemBySlug(allContentItems, 'setting-current-landing-page')
      const updatedLandingPageItemItem: IContentItem = produce(landingPageItem, (draftItem) => {
        draftItem.description = ''
      })
      dispatch(requestUpdateItems([updatedLandingPageItemItem]))
    }, [allContentItems],
  )

  const landingPageFilterOnChange = useCallback(
    function landingPageFilterOnChangeFn(evt: SyntheticEvent<HTMLSelectElement>) {
      const item = getContentItemBySlug(allContentItems, 'setting-current-landing-page')
      const updatedItem: IContentItem = produce(item, (draftItem) => {
        draftItem.description = evt.currentTarget.value
      })
      dispatch(requestUpdateItems([updatedItem]))
    }, [allContentItems],
  )

  const categoryFilterOnChange = useCallback(
    function categoryFilterOnChangeFn(evt: SyntheticEvent<HTMLSelectElement>) {
      dispatch(adminApplyFilter(evt.currentTarget.value))
    }, [],
  )

  const searchOnChange = useCallback(
    function categoryFilterOnChangeFn(evt: SyntheticEvent<HTMLInputElement | HTMLSelectElement>) {
      dispatch(adminApplySearch(evt.currentTarget.value))
      dispatch(adminApplySearch(evt.currentTarget.value))
    }, [],
  )

  const needsPhotosOnChange = useCallback(
    function needsPhotosOnChangeFn() {
      dispatch(toggleNeedsKeyArtFilter())
    }, [],
  )

  const hideUnpublishedOnChange = useCallback(
    function hideUnpublishedOnChangeFn() {
      dispatch(toggleShowUnpublishedFilter())
    }, [],
  )

  const needsStickyOnChange = useCallback(
    function needsStickyOnChangeFn() {
      dispatch(toggleStickyFilter())
    }, [],
  )

  const collapsedLayoutOnChange = useCallback(
    function collapsedLayoutOnChangeFn() {
      setCollapsed(!collapsed)
    }, [],
  )

  const onBuildButtonClick = useCallback(
    async function onBuildButtonClickFn() {
      setDeploying(true)

      setTimeout(() => {
        const { remote } = window.require('electron')
        const { join } = remote.require('path')
        const { execSync } = remote.require('child_process')
        const { writeFileSync } = remote.require('fs')
        const Bundler = remote.require('parcel-bundler')
        const puppeteer = remote.require('puppeteer')

        const entry = join('.', 'projects', 'hem-rocks', 'index.html')
        const outDir = join('.', 'deploy')

        let bundler = new Bundler(entry, { outDir })

        bundler.on('bundled', async () => {
          execSync(`cp -rf ${join('.', 'projects', 'hem-rocks', 'static')} ${join('.', 'deploy', 'static')}`)
          execSync(`cp ${join('.', 'projects', 'hem-rocks', '.htaccess')} ${join('.', 'deploy', '.htaccess')}`)

          // const browser = await puppeteer.launch()
          // const page = await browser.newPage()

          // await page.goto('http://localhost:1234', { waitUntil: 'networkidle0' })

          // const html = await page.content()

          // writeFileSync(join('.', 'deploy', 'index.html'), html)

          // browser.close()

          setDeploying(false)
        })

        bundler.bundle()
        bundler = null
      }, 500)
    }, [],
  )

  function massTagSave(contentItems: IContentItem[]) {
    const input = document.getElementById('mass-tag-input')

    if (!input) return

    const selectedIds: string[] = []

    for (const id in selectedItems) {
      if (selectedItems[id] === true) {
        selectedIds.push(id)
      }
    }

    if (!selectedIds.length) return

    // @ts-ignore
    if (!input.value.length) return

    for (const id of selectedIds) {
      const checkedItem = find(contentItems, { id })

      if (!checkedItem) continue

      const newItem = Object.assign({}, checkedItem)

      // @ts-ignore
      newItem.tags = (newItem.tags + ', ' + input.value).replace(/^, /, '')
      dispatch(requestUpdateItems([newItem]))
    }

    // @ts-ignore
    input.value = ''
    setSelectedItems([])
  }

  if (!currentProject) return (<div />)

  return (
    <ElectronOnly showMessage={true}>
      { deploying && (
        <div className="admin-list-deploy-spinner">
          <Spinner />
        </div>
      )}
      <div className="admin-list">
        <div className="admin-list-controls admin-list-controls-system admin-list-controls-dark clearfix">
          <div className="admin-list-controls-select">
            <label htmlFor="project-filter">
              Project:&nbsp;
              <PlayPauseButton
                playing={false}
                onClick={noop}
              />
            </label>
            <select
              className="custom-select"
              name="project-filter"
              onChange={projectFilterOnChange}
              value={currentProject}
            >
              { projects.map(project => (
                <option
                  key={project}
                  value={project}
                >
                  { project }
                </option>
              ))}
            </select>
          </div>
          { PROJECT_CONFIGS[currentProject].LANDING_PAGES
            && PROJECT_CONFIGS[currentProject].LANDING_PAGES.length
            && (
              <div className="admin-list-controls-select">
                <label htmlFor="landing-page-filter">
                  Landing page:&nbsp;
                  <PlayPauseButton
                    playing={false}
                    onClick={noop}
                  />
                </label>
                <select
                  className="custom-select"
                  name="landing-page-filter"
                  onChange={landingPageFilterOnChange}
                  value={currentLandingPage || undefined}
                >
                  <option
                    key={'none'}
                    value={undefined}
                  >
                    None
                  </option>
                  { PROJECT_CONFIGS[currentProject].LANDING_PAGES.map((landingPageSpec: any) => (
                    <option
                      key={landingPageSpec.name}
                      value={landingPageSpec.name}
                    >
                      { landingPageSpec.name }
                    </option>
                  ))}
                </select>
              </div>
          )}
          <button
            className="action-button"
            onClick={onBuildButtonClick}
          >
            Build
          </button>
        </div>
        <div className="admin-list-controls clearfix">
          <div className="admin-list-controls-select">
            <label htmlFor="category">
              Category:&nbsp;
              <PlayPauseButton
                playing={false}
                onClick={noop}
              />
            </label>
            <select
              className="custom-select"
              name="category"
              onChange={categoryFilterOnChange}
              value={adminFilterApplied}
            >
              <option value="all">All</option>
              { selectableCategories(categories, currentProject).map(category => (
                <option
                  key={category}
                  value={category}
                >
                  { titleCase(category).replace(/-/g, ' ') }
                </option>
              ))}
            </select>
          </div>
          <div className="admin-list-controls-search">
            <select
              className="custom-select admin-select-searchable-field"
              onChange={evt => dispatch(setAdminSearchableField(evt.currentTarget.value))}
              value={adminSearchableField}
            >
              <option value="id">Id:</option>
              <option value="tags">Tag:</option>
              <option value="properties">Props:</option>
              <option value="title">Title:</option>
              <option value="audioFilename">Audio:</option>
              <option value="attribution">Attr:</option>
              <option value="secondaryAttribution">2nd Attr:</option>
              <option value="secondaryTitle">2nd Title:</option>
              <option value="slug">Slug</option>
              <option value="description">Desc</option>
            </select>
            { adminSearchableField === 'tags' && (
              <div className="admin-list-controls-select">
                <label htmlFor="tag">
                  &nbsp;
                  <PlayPauseButton
                    playing={false}
                    onClick={noop}
                  />
                </label>
                <select
                  className="custom-select admin-select-tag"
                  name="tag"
                  onChange={searchOnChange}
                  value={adminSearchApplied}
                >
                  <option value="">All</option>
                  { getTagsInCollection(filter(allContentItems, { project: currentProject })).map(tag => (
                    <option
                      key={tag}
                      value={tag}
                    >
                      { titleCase(tag).replace(/-/g, ' ').replace(/%26/g, '&') }
                    </option>
                  )) }
                </select>
              </div>
            )}
            { adminSearchableField !== 'tags' && (
              <input
                onChange={searchOnChange}
                placeholder={adminSearchApplied}
                type="text"
              />
            )}
          </div>
        </div>
        <div className="admin-list-controls clearfix">
          <label htmlFor="hide-unpublished">
            Show unpublished:&nbsp;
            <input
              onChange={hideUnpublishedOnChange}
              name="hide-unpublished"
              type="checkbox"
              value={showUnpublishedFilter ? 'on' : 'off'}
            />
          </label>
          <label htmlFor="needs-photos">
            Needs key art:&nbsp;
            <input
              onChange={needsPhotosOnChange}
              name="needs-photos"
              type="checkbox"
              value={needsKeyArtFilter ? 'on' : 'off'}
            />
          </label>
          <label htmlFor="needs-sticky">
            Show sticky only:&nbsp;
            <input
              onChange={needsStickyOnChange}
              name="needs-sticky"
              type="checkbox"
              value={stickyFilter ? 'on' : 'off'}
            />
          </label>
          <label htmlFor="collapsed-layout">
            Collapse layout:&nbsp;
            <input
              onChange={collapsedLayoutOnChange}
              name="collapsed-layout"
              type="checkbox"
              value={collapsed ? 'on' : 'off'}
            />
          </label>
        </div>
        <div className="admin-list-stats">
          Filtered items: <strong>{ unpaginatedItemCount }</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
          Total items: <strong>{ contentItemsCount }</strong>&nbsp;&nbsp;|&nbsp;&nbsp;
          <button
            disabled={ page === 1 }
            onClick={() => dispatch(setCurrentPage(page - 1))}
          >
            &lt;&lt;
          </button>
          &nbsp;&nbsp;
          { page }&nbsp;&nbsp;
          <button onClick={() => dispatch(setCurrentPage(page + 1))}>&gt;&gt;</button>
        </div>
        <div className="admin-list-controls clearfix">
          <div className="admin-list-controls-mass-tag">
            <form onSubmit={evt => {
              evt.preventDefault()
              massTagSave(pageContentItems)
            }}>
              <label htmlFor="mass-tag-input">
                Mass tag:
              </label>
              <input
                id="mass-tag-input"
                type="text"
              />
              <button
                className="action-button"
                onClick={evt => {
                  evt.preventDefault()
                  massTagSave(pageContentItems)
                }}
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th className="admin-list-column-check"></th>
              <th className="admin-list-column-thumbnail">
                Item
              </th>
              { adminFilterApplied !== 'tracks' && (
                <th className="admin-list-column-category">
                  <select onChange={(evt: SyntheticEvent<HTMLSelectElement>) => {
                    setInterestingProperty(evt.currentTarget.value as keyof IContentItem)
                  }}>
                    <option value="category">Category</option>
                    <option value="tags">Tags</option>
                    <option value="id">Id</option>
                    <option value="date">Date</option>
                    <option value="tags">Order</option>
                    <option value="attribution">Attribution</option>
                    <option value="type">Type</option>
                  </select>
                </th>
              )}
              <th className="admin-list-column-actions">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            { pageContentItems.map((item: IContentItem) => (
              <tr key={item.id}>
                <td className="admin-list-column-check">
                  <button
                    className={`
                      action-button
                      small-action-button
                      ${ selectedItems[item.id] ? 'small-action-button-active' : '' }
                    `}
                    onClick={() => {
                      const newSelectedItems: any = Object.assign({}, selectedItems)

                      if (newSelectedItems[item.id]) {
                        newSelectedItems[item.id] = false
                      }

                      else {
                        newSelectedItems[item.id] = true
                      }

                      setSelectedItems(newSelectedItems)
                    }}
                  />
                </td>
                { collapsed && (
                  <td className="admin-list-column-thumbnail">
                    <Link to={`/admin/edit/${item.slug}`}>{ item.title }</Link><br />
                    <input
                      type="text"
                      value={item.slug}
                      onClick={(evt: any) => {
                        evt.target.select()
                      }}
                    />
                  </td>
                )}
                { !collapsed && (
                  <td className="admin-list-column-thumbnail">
                    <Link to={`/admin/edit/${item.slug}`}>
                      { hasCategory(item, 'assets')
                        ? item.audioFilename.replace('/Volumes/April_Kepner/Eva_Vollmer/Disorganised/', '')
                        : item.title
                      }
                    </Link>
                    <br />
                    <Link to={`/admin/edit/${item.slug}`}>
                      {/* { hasCategory(item, 'stock-photos') && (
                        <img src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${item.keyArt}`} />
                      )}
                      { !hasCategory(item, 'stock-photos')
                        && !hasCategory(item, 'assets')
                        && !hasCategory(item, 'lists')
                        && (
                          <img src={`${assetHost}/hem-rocks/content/images/key-art/${item.keyArt}`} />
                      )} */}
                      { hasCategory(item, 'tracks') && (
                        <>
                          <audio controls>
                            <source src={assetHostHostname() + '/' + currentProject + '/content/tracks/' + item.audioFilename} type="audio/mpeg" />
                          </audio>
                          <br/>
                          <small>{ item.slug }</small><br/>
                          <small>{ item.secondaryAttribution }</small>
                        </>
                      )}
                    </Link>
                    <br/>
                  </td>
                )}
                <td className="admin-list-column-field">
                  <div>
                    {(() => {
                      // @ts-ignore
                      return typeof interestingProperty === 'string' && item[interestingProperty].replace(/^, /, '')
                    })()}
                  </div>
                  { hasCategory(item, 'playlists') && (
                    <pre>
                      { item.attachments.split('\n').map(
                        id => {
                          const item = find(allContentItems, { id })
                          if (item) {
                            return item.title
                          }

                          else if (!isEmpty(id)) {
                            return 'NOT FOUND'
                          }
                        }
                      ).join('\n')}
                    </pre>
                  )}
                  {(hasTag(item, 'albums') || hasTag(item, 'discs')) && item.attachments.split("\n").map(id => (
                    <div key={uuid()}>
                      {(() => {
                        const item = find(allContentItems, { id })

                        if (!item) return (
                        <div>Not Found: { id }</div>
                        )

                        return (
                          <div>
                            <Link to={`/admin/edit/${item.slug}`}>
                              { item.title }
                            </Link>
                            <br />
                            <audio controls>
                              <source src={assetHostHostname() + item.audioFilename} />
                            </audio>
                          </div>
                        )
                      })()}
                    </div>
                  ))}
                </td>
                <td className="admin-list-column-actions">
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        draftItem.tags = addTag(draftItem, 'new')
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { hasTag(item, 'new') ? '√ New' : 'New'}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        draftItem.releasePhase = '1'
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { item.releasePhase === '1' ? '√ RP1' : 'RP1'}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        if (!hasTag(draftItem, 'not-playable')) {
                          draftItem.tags = draftItem.tags + ', not-playable'
                        }

                        else {
                          draftItem.tags = draftItem.tags.replace('not-playable', '')
                        }
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { hasTag(item, 'not-playable') ? 'Not Playable' : 'Playable'}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        if (draftItem.published) {
                          draftItem.published = false
                        }

                        else {
                          draftItem.published = true
                        }
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { item.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      const updatedItem: IContentItem = produce(item, (draftItem) => {
                        if (draftItem.published) {
                          draftItem.sticky = false
                        }

                        else {
                          draftItem.sticky = true
                        }
                      })
                      dispatch(requestUpdateItems([updatedItem]))
                    }}
                  >
                    { item.sticky ? 'Unsticky' : 'Sticky'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        { adminFilterApplied === 'todos' && (
          <div>
            <form
              className="inline-edit-form first-inline-edit-form"
              onSubmit={(evt: SyntheticEvent<HTMLFormElement>) => {
                evt.preventDefault()
                const input = evt.currentTarget.querySelector('input[name="title"]')
                if (!input) return
                const item: IContentItem = modelize({
                  id: uuid(),
                  // @ts-ignore
                  title: input.value,
                  // @ts-ignore
                  slug: slugify(input.value) + '-todo',
                  published: true,
                  date: 'January 2021',
                  category: 'todos',
                } as Partial<IContentItem>)
                dispatch(requestCreateItems([item]))
                // @ts-ignore
                input.value = ''
              }}
            >
              <label><span>New Do:</span> <input type="text" name="title" /></label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        <div>
          <button onClick={() => dispatch(setCurrentPage(page - 1))}>&lt;&lt;</button>&nbsp;&nbsp;
          { page }&nbsp;&nbsp;
          <button onClick={() => dispatch(setCurrentPage(page + 1))}>&gt;&gt;</button>
        </div>
      </div>
    </ElectronOnly>
  )
}

export default AdminList
