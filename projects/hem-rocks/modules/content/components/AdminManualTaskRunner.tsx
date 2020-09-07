import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import uuid from 'uuid/v1'
import { uniq, noop, last, compact, has, sample, filter, map, find } from 'lodash'
import pad from 'pad'
import moment from 'moment'
import $ from 'jquery'
import { autoParagraph } from '../../../../../lib/functions'
import { modelize, hasTag, getContentItemBySlug, hasCategory } from '../functions'
import { IIndexEntry, IContentItem, compressIndex } from '..'
import { RootState } from '../../../index'
import { readdirSync, renameSync } from 'fs'
import { slugify, titleCase } from 'voca'
import { execSync } from 'child_process'

function convertOldTypescriptModelsToJson() {
  const { remote } = window.require('electron')
  const { existsSync, readdirSync, readFileSync, writeFileSync } = remote.require('fs')
  const { extname, join } = remote.require('path')
  const { execSync } = remote.require('child_process')

  // @ts-ignore
  window.autop = autoParagraph
  // @ts-ignore
  window.uuid = uuid

  const contentSubDirs = [
    'jason-grier',
    'label',
    'mixes',
    'projects',
    'sound-library',
  ]

  const srcDir = join(__dirname, '..', '..', '..', 'static', 'old-content')
  const destDir = join(__dirname, '..', '..', '..', 'static', 'content')

  if (existsSync(destDir)) {
    execSync(`rm -rf ${destDir}`)
  }

  if (existsSync(destDir)) {
    execSync(`rm -rf ${destDir}`)
  }

  execSync(`mkdir ${destDir}`)

  const index = []

  for (const contentSubDir of contentSubDirs) {
    const contentSubDirPath = join(srcDir, contentSubDir)
    const candidates = readdirSync(contentSubDirPath)

    for (const candidate of candidates) {
      if (extname(candidate) === '.ts') {
        const data = readFileSync(`${contentSubDirPath}/${candidate}`, 'utf8')
        const subject = data.split('const')[1].split('}')[0]
        const itemVarName = subject.split('{')[0].split(':')[0]
        const fieldBlock = subject.split('{')[1].replace(/\r?\n|\r/g, '')

        try {
          let item = eval('({' + fieldBlock + '})')
          item.blurb = ''
          item = modelize(item)
          index.push({ slug: item.slug, date: item.date })

          const jsonItem = JSON.stringify(item, null, 2)
          writeFileSync(join(destDir, item.slug + '.json'), jsonItem)
        }

        catch(err) {
          console.error('Could not convert ' + itemVarName + '.', err)
        }
      }
    }
  }

  writeFileSync(join(destDir, 'index.json'), JSON.stringify(index, null, 2))

  const staticSrcDir = join(__dirname, '..', '..', '..', 'static')
  const staticDestDir = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static')

  execSync(`rm -rf ${staticDestDir}`, { stdio: 'inherit' })
  execSync(`cp -rf ${staticSrcDir} ${staticDestDir}`, { stdio: 'inherit' })
}

function migrate(allContentItems: IContentItem[]) {
  const { remote } = window.require('electron')
  const { execSync } = remote.require('child_process')
  const { writeFileSync, readdirSync, readFileSync, renameSync, lstatSync, copyFileSync } = remote.require('fs')
  const { join, extname } = remote.require('path')

  const newItems = []

  // let fileList: string[] = []

  // for (let i = 1; i <= 24; i ++) {
  //   const subList = readFileSync('/Users/jason/Desktop/Workong/HEM/Repos/hem-mono/projects/hem-rocks/static/content/dir-' + i + '.json', 'utf8')
  //   const filePaths = subList.split('\n')
  //   fileList = fileList.concat(filePaths)
  // }

  // for (const file of fileList) {
  //   const title = last(file.split('/')) || 'Untitled'
  //   const slug = slugify(title)
  //   const createItem: IContentItem = {
  //     acceptingDonations: false,
  //     aside: '',
  //     attribution: '',
  //     attributionLink: '',
  //     audioFilename: file,
  //     badgeText: '',
  //     blurb: '',
  //     category: 'assets',
  //     date: lstatSync(file).birthtime,
  //     description: '',
  //     displayCategory: '',
  //     downloadFile: '',
  //     externalLinkText: '',
  //     externalLinkUrl: '',
  //     fixedPrice: '',
  //     flexPriceMinimum: '',
  //     flexPriceRecommended: '',
  //     hasFixedPrice: false,
  //     id: slug,
  //     isDigitalProduct: false,
  //     isPhysicalProduct: false,
  //     keyArt: '',
  //     order: '',
  //     physicalFormats: '',
  //     preview: true,
  //     published: false,
  //     relatedContent: '',
  //     relatedContentLink: '',
  //     releasePhase: '1',
  //     secondaryAttribution: '',
  //     secondaryAttributionLink: '',
  //     secondaryTitle: '',
  //     slug,
  //     sticky: false,
  //     tags: '',
  //     title,
  //     titleWrapping: '',
  //     trackSlugs: '',
  //     type: '',
  //   }

  //   newItems.push(createItem)
  // }

  function extractFromFilePath(path: string, index?: number) {
    const split = path.split('/')

    if (!index) {
      return split.pop()
    }

    else {
      return split[split.length - index]
    }
  }

  function extractParentDirs(path: string) {
    return extractFromFilePath(path, 4) + '/' + extractFromFilePath(path, 3) + '/' + extractFromFilePath(path, 2)
  }

  function pathByTime(newItem: IContentItem) {
    return {
      time: moment(newItem.date).valueOf(),
      path: newItem.audioFilename.replace('/Volumes/April_Kepner/Eva_Vollmer/Disorganised/', ''),
    }
  }

  const fileNames = allContentItems.map(item => extractFromFilePath(item.audioFilename))
  const allFiles: any = {}

  const projectDirs = []

  const taggingPreview = []

  const ids = allContentItems.map(item => item.id)
  ids.sort()
  // @ts-ignore
  let nextHighestId = parseInt(ids.pop(), 10)

  for (const item of allContentItems) {
    nextHighestId ++

    const newItem = Object.assign({}, item)

    // DO STUFF HERE
    if (!hasCategory(newItem, 'assets') && newItem.tags !== 'project') {
      newItems.push(newItem)
    }

    if (hasCategory(newItem, 'assets')) {
      const path = newItem.audioFilename
      const fileName = extractFromFilePath(newItem.audioFilename)

      if (
        path.includes('Samples/Recorded')
        || path.includes('Samples/Imported')
        || path.includes('Samples/Consolidate')
        || path.includes('Samples/Processed')
        || path.includes('HEM SL/Samples/Library')
        || path.includes('studio/2005')
        || path.includes('studio/2006')
        || path.includes('studio/2007')
        || path.includes('studio/2008')
        || path.includes('studio/2009')
        || path.includes('studio/2010')
        || path.includes('studio/2011')
        || path.includes('studio/2012')
        || path.includes('studio/2013')
        || path.includes('studio/2014')
        || path.includes('Thrash-and-Burn/Unmastered')
        || path.includes('Unmastered/Appleasians')
        || path.includes('Kalt/workstage')
        || path.includes('MISSING SOUNDS DONT TRASH')
        || path.includes('Quickburn Promos')
        || path.includes('The Shittiest Horse')
        || path.includes('Pankstrasse')
        || path.includes('Flotsam/DD Stems')
        || path.includes('Transient Backup')
        || path.includes('Working.prev')
        || path.includes('Working/HEM/Projects')
        || path.includes('Old Apok/OLD')
        || path.includes('Old Apok/OLD OLD')
        || path.includes('Warm/Projekte/Musik/Jason Grier — Unbekannte II')
        || path.includes('Shoulderblades/Old')
        || path.includes('HEM Portal 2015')
        || path.includes('JAG/Temp')
        || path.includes('stuff/itunes')
        || path.includes('Stuff/Music')
        || path.includes('15. Jan (Semifinal)')
        || path.includes('HEM S:L/HEM SL/Samples')
        || path.includes('Lost Angeles/HEM/Projects/SL + Demonstration Disc')
        || path.includes('deploy')
        || path.includes('HEM Site Content')
        || path.includes('HEMK0000_0006')
        || path.includes('HEMK0000_0009')
        || path.includes('HEMK0000_0011')
        || path.includes('HEMK0000_0030')
        || path.includes('Downloads/HEMK0100_EPK')
        || path.includes('Tombstones/Unmastered')
        || path.includes('Maria/Unmastered')
        || path.includes('Commotus/Unmastered')
        || path.includes('Clouds/Unmastered')
        || path.includes('Deliverables/LP')
        || path.includes('Downloads/Klein')
        || path.includes('"To Do"')
        || path.includes('Project/Merge')
        || path.includes('Ebow/Piano')
        || path.includes('Castle at Dawn Tracktion')
        || path.includes('hem-sound-tools')
        || path.includes('hem-mono')
        || path.includes('Backups/Samples')
        || path.includes('slushpile/Vibe')
        || path.includes('SECRET SESSIONS')
        || (path.includes('Antalya') && !path.includes('Kurdish'))
        || (path.includes('Antalya') && !path.includes('Rain on the'))
        || /\.flac$/.test(path)
      ) {
        if (
          path.includes('studio/2012/Library')
          || path.includes('hem-sound-tools')
          || path.includes('slushpile/Vibe')
          || path.includes('Backups/Samples')
          || path.includes('Castle at Dawn Tracktion')
          || path.includes('SECRET SESSIONS')
          || path.includes('"To Do"')
          || path.includes('Ebow/Piano')
          || path.includes('Downloads/HEMK0100_EPK')
          || path.includes('Downloads/Klein')
          || path.includes('Project/Merge')
          || path.includes('hem-sound-tools')
          || path.includes('hem-mono')
          || (path.includes('Antalya') && !path.includes('Kurdish'))
          || (path.includes('Antalya') && !path.includes('Rain on the'))
          || path.includes('Tombstones/Unmastered')
          || path.includes('Maria/Unmastered')
          || path.includes('Commotus/Unmastered')
          || path.includes('Clouds/Unmastered')
          || path.includes('Deliverables/LP')
          || /\.flac$/.test(path)
          || path.includes('Flotsam/DD Stems')
          || path.includes('HEMK0000_0006')
          || path.includes('HEMK0000_0030')
          || path.includes('HEMK0000_0011')
          || path.includes('HEMK0000_0009')
          || path.includes('Transient Backup')
          || path.includes('Working.prev')
          || path.includes('Working/HEM/Projects')
          || path.includes('Old Apok/OLD')
          || path.includes('Old Apok/OLD OLD')
          || path.includes('Warm/Projekte')
          || path.includes('Shoulderblades/Old')
          || path.includes('JAG/Temp')
          || path.includes('15. Jan (Semifinal)')
          || path.includes('HEM S:L/HEM SL/Samples')
          || path.includes('HEM SL/Samples/Library')
          || path.includes('Thrash-and-Burn/Unmastered')
          || path.includes('Unmastered/Appleasians')
          || path.includes('Deliverables/LP')
        ) {
          taggingPreview.push({ path, tags: 'audio, needs-manual-review, not-eligible-for-web-player'})
          newItem.tags = 'audio, needs-manual-review, not-eligible-for-web-player'
          // newItems.push(newItem)
        }

        else if (
          path.includes('deploy')
          && path.includes('Formats')
        ) {
          taggingPreview.push({ path, tags: 'audio, deploy-format, eligible-for-web-player'})
          newItem.tags = 'audio, deploy-format, eligible-for-web-player'
          // newItems.push(newItem)
        }

        else if (
          path.includes('deploy')
          || path.includes('Kalt/workstage')
        ) {
          taggingPreview.push({ path, tags: 'audio, possible-promo-track'})
          newItem.tags = 'audio, possible-promo-track'
          // newItems.push(newItem)
        }

        else if (
          path.includes('stuff/itunes')
          || path.includes('Stuff/Music')
        ) {
          taggingPreview.push({ path, tags: 'audio, deploy-format'})
          newItem.tags = 'audio, itunes'
          // newItems.push(newItem)
        }

        else if (
          path.includes('HEM Portal 2015')
          || path.includes('HEM Site Content')
        ) {
          // do nothing (ie. delete)
        }

        else {
          taggingPreview.push({ path, tags: 'audio, project-track'})
          newItem.tags = 'audio, project-track'
          // newItems.push(newItem)

          if (
            path.includes('Samples/Recorded')
            || path.includes('Samples/Imported')
            || path.includes('Samples/Consolidate')
            || path.includes('Samples/Processed')
          ) {
            const projectPath = path.split(/Samples\/(Recorded|Imported|Consolidate|Processed)/)[0]
            taggingPreview.push({ path: projectPath, tags: 'project'})
            const title = projectPath.split('/').pop()
            // newItems.push({
            //   title,
            //   id: nextHighestId,
            //   slug: slugify(title),
            //   date: lstatSync(projectPath).birthtime.toString(),
            //   tags: 'project',
            // })
          }

          else {
            const projectPath = path.split(/studio\/(2005|2006|2007|2008|2009|2010|2011|2012|2013|2014)/)[0]
            taggingPreview.push({ path: projectPath, tags: 'project'})
            const title = projectPath.split('/')[0]
            // newItems.push({
            //   title,
            //   id: nextHighestId,
            //   slug: slugify(title),
            //   date: lstatSync(projectPath).birthtime.toString(),
            //   tags: 'project',
            // })
          }
        }
      }

      else {
        if (fileName && fileNames.includes(fileName)) {
          if (allFiles[fileName]) {
            allFiles[fileName].pathsByTime.push(pathByTime(newItem))
            allFiles[fileName].duplicatesCount ++
          }

          else {
            allFiles[fileName] = {}
            allFiles[fileName].pathsByTime = [pathByTime(newItem)]
            allFiles[fileName].duplicatesCount = 0
          }
        }
      }
    }
    // END DO STUFF HERE

    // newItems.push(newItem)
  }

  const duplicates: any = []

  for (const fileName in allFiles) {
    if (allFiles[fileName].duplicatesCount > 0) {
      duplicates.push({
        fileName,
        duplicatesCount: allFiles[fileName].duplicatesCount,
        pathsByTime: allFiles[fileName].pathsByTime,
      })
    }
  }

  const singles: any = []

  for (const duplicate of duplicates) {
    const pathsByTime = [].concat(duplicate.pathsByTime)
    pathsByTime.sort((a: any, b: any) => {
      return b.time - a.time
    })

    // @ts-ignore
    singles.push(pathsByTime[0].path)
    // @ts-ignore
    taggingPreview.push({ path: pathsByTime[0].path, tags: 'audio, eligible-for-web-player'})
    // @ts-ignore
    const newItem = find(allContentItems, { audioFilename: '/Volumes/April_Kepner/Eva_Vollmer/Disorganised/' + pathsByTime[0].path })

    if (!newItem) {
      // @ts-ignore
      console.log(pathsByTime[0].path)
      throw new Error()
    }

    console.log(newItem.title)

    // @ts-ignore
    newItem.tags = 'audio, eligible-for-web-player'
    newItems.push(newItem)
  }

  const itemsWithStars: IContentItem[] = []

  for (const itemToMaybeStar of newItems) {
    if (
      itemToMaybeStar.audioFilename.includes('Smallsongs')
      || itemToMaybeStar.audioFilename.includes('HEMK0000_126')
      || itemToMaybeStar.audioFilename.includes('HEMK0000_0034')
      || itemToMaybeStar.audioFilename.includes('HEMK0000_0012')
    ) {
      itemToMaybeStar.tags += ', starred-for-web'
    }

    itemsWithStars.push(itemToMaybeStar)
  }

  alert(itemsWithStars.length)

  // const report = join(__dirname, '..', '..', '..', 'static', 'content', 'duplicates.json')
  // writeFileSync(report, JSON.stringify(taggingPreview, null, 2))

  const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')

  writeFileSync(srcIndex, JSON.stringify(compressIndex(itemsWithStars)))
  writeFileSync(distIndex, JSON.stringify(compressIndex(itemsWithStars)))
}

function assignImages() {
  const { remote } = window.require('electron')
  const { readdirSync, readFileSync } = remote.require('fs')
  const { extname, join } = remote.require('path')
  const { execSync } = remote.require('child_process')

  const contentDir = join(__dirname, '..', '..', '..', 'static', 'content')
  const imagesDir = join(__dirname, '..', '..', '..', 'static', 'assets', 'images', 'key-art')
  const imagesDistDir = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'assets', 'images', 'key-art')
  const contentFiles = readdirSync(contentDir)
  const images = readdirSync(imagesDir)

  const soundLibraryFileNames = contentFiles.reduce((acc: string[], fileName: string) => {
    if (fileName === 'index.json') return acc
    if (extname(fileName) !== '.json') return acc

    const filePath = `${contentDir}/${fileName}`
    const data = JSON.parse(readFileSync(filePath, 'utf8'))

    if (data.tags && data.tags.includes('sound-library')) {
      acc.push(fileName)
    }

    return acc
  }, [])

  for (var i = 0; i < soundLibraryFileNames.length; i ++) {
    const fileName = soundLibraryFileNames[i]

    if (fileName === 'index.json') continue
    if (extname(fileName) !== '.json') continue

    execSync(`mv ${imagesDir}/${images[i]} ${imagesDir}/${fileName.replace('.json', '.jpg')}`)
  }

  execSync(`rm -rf ${imagesDistDir}`, { stdio: 'inherit' })
  execSync(`cp -rf ${imagesDir} ${imagesDistDir}`, { stdio: 'inherit' })
}

function AdminManualTaskRunner(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const [running, setRunning] = useState(0)

  const resetModelsOnClick = useCallback(
    function resetOnClickFn() {
      const confirmation = confirm('This will RUIN everything. make sure you have content backed up someplace, or committed to source control.')
      if (!confirmation) return
      runTask(convertOldTypescriptModelsToJson)
    }, [],
  )

  const migrateOnClick = useCallback(
    function migrateOnClickFn() {
      runTask(() => migrate(allContentItems))
    }, [],
  )

  const resetOnClick = useCallback(
    function resetOnClickFn() {
      setRunning(0)
    }, [],
  )

  const assignImagesOnClick = useCallback(
    function assignImagesOnClickFn() {
      runTask(assignImages)
    }, [],
  )

  function runTask(taskFn: Function) {
    setRunning(1)
    setTimeout(() => {
      taskFn()
      setRunning(2)
    }, 1000)
  }

  return (
    <div className="admin-manual-task-runner">
      { running === 0 && (
        <ul>
          <li>
            <a
              href="#"
              onClick={resetModelsOnClick}
            >
              Return to old Typescript seed models
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={migrateOnClick}
            >
              Migrate
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={assignImagesOnClick}
            >
              Assign Images
            </a>
          </li>
        </ul>
      )}
      { running === 1 && (
        <div>Running...</div>
      )}
      { running === 2 && (
        <>
          <div>Done!</div>
          <div>
            <a
              href="#"
              onClick={resetOnClick}
            >
              Run another task...
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminManualTaskRunner
