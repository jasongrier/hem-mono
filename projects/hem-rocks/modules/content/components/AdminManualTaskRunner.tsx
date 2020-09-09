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

  const definitely: string[] = []
  const listen: string[] = []
  const check: string[] = []
  const unsorted: string[] = []
  const tunes: string[] = []
  const studio: string[] = []
  const ineligible: string[] = []
  const dedupe: string[] = []
  const duplicate: string[] = []

  for (const item of allContentItems) {
    if (hasCategory(item, 'assets')) {
      const path = item.audioFilename

      if (
        path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP III/Live at Studio 8/Jason.WAV')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP III/Live at Studio 8/Gary.WAV')
        || path.includes('/Transient Backup/Workong/HEM/Resources/Jason Grier/Live at Studio 8 Berlin.WAV')
        || path.includes('/Transient Backup/Workong/HEM/Resources/Tracks/Live at Studio 8 Berlin.mp3')
        || path.includes('/Working/HEM/Resources/jasongrier/Live at Studio 8 Berlin.WAV')
        || path.includes('/Working.prev/HEM/Resources/jasongrier/Live at Studio 8 Berlin.WA')
        || path.includes('/__SRC__/GOGOGO/HEM/Documents/Press Kits/2017 Temporary Artist EPKS/Line Gøttsche')
        || path.includes('August 2020/redmango/dev/redmango/Code/')
      ) {
        duplicate.push(path)
      }

      else if (
        path.includes('Live at Studio 8')
        || path.includes('/__SRC__/MISSING SOUNDS DONT TRASH/whistle_clairdelune_uncompressed.aif')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP VI/sl-previews')
        || path.includes('/Archive/April 2020/Soft Trash/Nice Strangers.mp3')
        || path.includes('/Archive/June 2020/Outer Spaceways Incorporated (orig. Sun Ra).mp3')
        || path.includes('/JAG/Media/Random/Music for me was the pure....amr')
        || path.includes('/Kalt/slushpile/Haunted, Frozen/')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/CAS/B2 Empire of You/Empire of You Piano.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/CAS/B3 Heart Shaped Rock/Heart Shaped Rock 3.mp3')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/CAS/B3 Heart Shaped Rock/Heart Shaped Rock - Piano.mp3')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/CAS/A5 Blonde Blues/Blonde Blues.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/CAS/A3 Heart Shaped Rock - Plastic/Heart Shaped Rock (Plastic).wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/CAS/A2 Empire of You/Empire of You Prom.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/02 - The Best That I Can - Grownup Mix.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/02 - The Best That I Can - Grownup Mix 2.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/For J.Kick/Girl - Boy Destroyed.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/For J.Kick/Girl - Boy Raw.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/For J.Kick/Midnite Blue - Raw.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/For J.Kick/On And On Destroyed Ambient.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/Mixdowns/Midnite Blue Redux - 05282011.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/BOUNCES/nothing nothing first bounce.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/Exports/on-On And On Water R.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/BOUNCES/girl minus boy first bounce.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/BOUNCES/on and on first bounce.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/BOUNCES/heart shaped rock second bounce.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/BOUNCES/Midnite Blue Redux.aif')
        || path.includes('/Heart Shaped Rock 2011/Empire of You Redux Project/Empire of You - For Soloing Over.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/Mixdowns/The Landscape.aif')
        || path.includes('/Kalt/slushpile')
        || path.includes('/Kalt/deploy/2014/05 May/HEMK0035_Tombstones_II/2-02 New Tombstones.wav')
        || path.includes('/Kalt/deploy/2014/05 May/HEMK0035_Tombstones_II/A stranger (ds6).wav')
        || path.includes('/Kalt/deploy/2014/05 May/HEMK0035_Tombstones_II/Fool (ds6).aif')
        || path.includes('/Kalt/deploy/2014/05 May/HEMK0035_Tombstones_II/The outside of everything (ds6).wav')
        || path.includes('Tombstones II')
        || path.includes('/Kalt/live/Michael Pisaro\'s Dog Star Orchestra')
        || path.includes('/Kalt/backlog/Rare Tracks/')
        || path.includes('/Kalt/studio/2009/Clouds/Clouds for Julia Really Rough/')
        || path.includes('/Kalt/studio/2009/Pirate\'s Tale Remix/Live Remix/Pirates Tale Live Sounds/')
        || path.includes('/Kalt/studio/2012/My Sweet Unbekannte/Sounds/High_Brasil_Song_1.aif')
        || path.includes('/Kalt/studio/2012/High Brasil/High_Brasil_Song_1.aif')
        || path.includes('/Kalt/studio/2013/Unbekannte/Sounds/High_Brasil_Song_1.aif')
        || path.includes('/Kalt/studio/2012/Clouds/Stems/Sessions/Clouds [Novox]')
        || path.includes('/Kalt/studio/2012/Clouds/Stems/Guests/Clouds/')
        || path.includes('/Kalt/studio/2012/Midnite Blue for Holter FACT Mix/Midnite Blue (2009 Version).aif')
        || path.includes('/Kalt/deploy/2012/09 September/HEMK0024_Clouds/Unmastered/')
        || path.includes('/Kalt/deploy/2012/11 November/HEMK0026_Tombstones/Formats/CAS/')
        || path.includes('/Kalt/deploy/2012/09 September/HEMK0023_Commotus/Deliverables/LP/')
        || path.includes('/Kalt/studio/2012/Archive Mix/Reaper/')
        || path.includes('/Kalt/live/2009/Trauermusik Festival 2009')
        || path.includes('/Kalt/studio/2013/supercollider/')
        || path.includes('/Koralle')
        || path.includes('/Corruscations')
        || path.includes('/Kalt/deploy/2014/05 May/HEMK0031_Katahymie/')
        || path.includes('/Kalt/studio/2006/Sneaky Lover/Renders/')
        || path.includes('/Transient Backup/Workong/HEM/Resources/Jason Grier/Piano Solo for BBC 6 Freakzone Julia Holter.wav')
        || path.includes('/Transient Backup/Workong/HEM/Resources/Jason Grier/NTS Radio - SKYAPNEA w Jason Grier   5th December 2015.m4a')
        || path.includes('/Transient Backup/Workong/HEM/Resources/Jason Grier/die_apparatur_als_musik_jason_griers_album_demonstration_dlf_k_20171030_1441_bb8aa3e7.mp3')
        || path.includes('/Transient Backup/Workong/HEM/Resources/Jason Grier/Jason_Grier_for_The_Wire_Oct_2017.mp3')
        || path.includes('/Warm/Projekte/Musik/Jason Grier — Pankstrasse/Library/By Type/Dings/Reichenbergerstr Demo/reichenbergerstr.m4a')
        || path.includes('/Warm/Projekte/Musik/Jason Grier — Pankstrasse/Renders/Cviews Masters/')
        || path.includes('NFOP BCR 32 JJ.aif')
        || path.includes('/Warm/Projekte/Musik/Jason Grier — Pankstrasse/Renders/Cviews/Jamage')
        || path.includes('/SOUNDS/GENOCIDE.aiff')
        || path.includes('/Bass Barberpole')
        || (path.includes('/Kalt/deploy/2014/05 May/HEMK0005_Eating-The-Stars/Julia Holter — Eating The Stars/') && path.includes('M3 reference.mp3'))
        || path.includes('/Kalt/förderung/2014/Jason_Grier_Berlin_Art_Prize_Antrag_2014/Working/For Mike Kelley (Excerpt).wav')
        || path.includes('/Kalt/bak/Studio/H Mastering/wetransfer-800639/Heroin')
        || path.includes('/Kalt/bak/Studio/H Mastering/Heroin PLURAMIX 96 NEU.aif')
        || path.includes('/Kalt/studio/2014/Pankstrasse/Library/By Type/Dings/Reichenbergerstr Demo/reichenbergerstr.m4a')
        || path.includes('/Transient Backup/Workong/Evening Flower/Doodles/Demos/')
        || path.includes('/Transient Backup/Workong/Evening Flower/Junedls/')
        || path.includes('/Transient Backup/Workong/Outer Spaceways Incorporated.wav')
        || path.includes('/Transient Backup/Workong/Evening Flower/Noodles/')
        || path.includes('/Transient Backup/Noodles/Lentil Love Life')
        || path.includes('/Kalt/live/2009/Human Genius at Soundwalk 2009/')
        || path.includes('/Kalt/live/2008/Julia Holter and Jason Grier Live at CalArts 2008/')
        || path.includes('/Kalt/deploy/2014/05 May/HEMK0031')
        || path.includes('/Kalt/bilder/jason and julia church pics/Church:Music/SAMPLER/')
        || (path.includes('/Kalt/deploy/') && path.includes('.mp3'))
        || path.includes('/126 2nd Edition/')
        // || path.includes('')
        // || path.includes('')
        // || path.includes('')
        // || path.includes('')
      ) {
        definitely.push(path)
      }

      else if (
        path.includes('/__SRC__/MISSING SOUNDS DONT TRASH/App Recording 20161110 0121.aiff')
        || path.includes('/__SRC__/MISSING SOUNDS DONT TRASH/App Recording 20161221 2056.aiff')
        || path.includes('/__SRC__/GOGOGO/HEM/Slushpile/Toucan/')
        || path.includes('/JAG/Stuff/Demo Pile/Toucan/')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP/LAKEWTF.wav')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP/Morning Song.wav')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP IIII/Next time .m4a')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP IIII/Now and later.m4a')
        || path.includes('/__SRC__/GOGOGO/Music/Unknown Artist/Unknown Album/Jason.mp3')
        || path.includes('/__SRC__/GOGOGO/HEM/Repos/rocks-api/wp-content/uploads/2017/08/Jason.mp3')
        || path.includes('/__SRC__/MISSING SOUNDS DONT TRASH/LS110165.WAV')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP VI/Video 1/Overdub Clips Raw/Video')
        || path.includes('/Archive/April 2020/Soft Trash/GOOD KIDS/')
        || path.includes('/Archive/April 2020/Soft Trash/COD-JAG.aif')
        || path.includes('/Archive/April 2020/Soft Trash/hem-tools/test/lib/assets/Test.wav')
        || path.includes('/Archive/May 2020/Rain/Rain_Chorus_JAG Project/Find Samples')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP/2017-04-18_ARIEL-PINK- RESPACED AND REVISIONS.mp3')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/03 - Babies - Ending Test Mix.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/03 - Babies - Ending Test Mix 2.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/03 - Babies - Laena Verse - 03142011.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/4. Babies - Rough Jason Vox 03202011.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/4. The Best That I Can - Rough 03202011.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/4. The Best That I Can - 03222011.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/4. The Best That I Can - 03282011.aif')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Mixdowns/4. The Best That I Can - 03282011 - L+1.aif')
        || path.includes('/Kalt/studio/2012/High Brasil/0001 1-Audio.aif')
        // || path.includes('')
        // || path.includes('')
        // || path.includes('')
      ) {
        listen.push(path)
      }

      else if (
        path.includes('/__SRC__/GOGOGO/HEM/Documents/Press Kits/2017 Temporary Artist EPKS/Experimental Housewife/')
        || path.includes('/Kalt/backlog/HEMKX001 - Zombie Sharkives/')
        || path.includes('/Kalt/backlog/Ratkiller')
      ) {
        check.push(path)
      }

      else if (
        path.includes('REGRM 007 Iannis Xenakis GRM Works 1957-1962')
        || path.includes('Downloads/hdunes/')
        || path.includes('/__SRC__/GOGOGO/Downloads/Klein - Tommy (HDB112)/Klein - Tommy (HDB112) - ')
        || path.includes('/Flotsam/iTunes/Ladies First CD/')
        || path.includes('Delia Derbyshire/Inventions For Radio')
        || path.includes('Hans Edler/Elektron Kukéso')
        || path.includes('/Lil B/Dior Paint/')
        || path.includes('/Winter in America/')
        || path.includes('/Jim French & Diamanda Galas/')
        || path.includes('/Music of Indonesia, Vol. 9_ Music from Central and West Flores/')
        || path.includes('/Delia Derbyshire/')
        || path.includes('/The Flux Quartet/')
        || path.includes('/Peter Phillips & The Tallis Scholars/')
        || path.includes('/Alvin Lucier/Still and Moving Lines of Silence In Families of Hyperbolas/')
        || path.includes('/Prefab Sprout/A Life of Surprises')
        || path.includes('/Delphine Dora/A Stream Of Consciousness/')
        || path.includes('/flac_Akos_Rozmann-Images_of_the_Dream_and_Death/')
        || path.includes('/Tim Hecker/Virgins/')
        || path.includes('/Phil Niblock/Works For Hurdy Gurdy And Voice/')
        || path.includes('/Sote/Architectonic/')
        || path.includes('/Anne Gillis/Euragine/')
        || path.includes('/Anne Gillis/Bisherigori/')
        || path.includes('/Jean-Luc Guionnet & Eric La Casa/')
        || path.includes('/Sote/Hardcore Sounds From Tehran/')
        || path.includes('/Scott Cazan/Ingress/')
        || path.includes('/Thomas Brinkmann/A')
        || path.includes('/Jenny Hval/Jenny Hval')
        || (path.includes('/Flotsam/iTunes') && !path.includes('Jelena Glazova & Leonids Lobrev'))
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/For J.Kick/Cushion_1.mp3')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/For J.Kick/MEMPHIS (master).mp3')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/Exports/Girl Minus Boy Files/Girl Minus Boy')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/Exports/Nothing Nothing Files/Nothing Nothing ')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/Exports/On And On Files/On And On')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock Pure Project/Exports/on and on 24bit mono')
        || path.includes('/HEM Site Content/Tracks/Old Tracks Sorting/')
        || path.includes('HEMK0027_Early_Live_Recordings/Working/Unmastered/Appleasians')
        || path.includes('Music/Tame Impala/')
        || path.includes('Music/Still and Moving Lines')
        || path.includes('Music/Boy Friend/Egyptian Wrinkle')
        || path.includes('Music/Tame Impala/Lonerism')
        || path.includes('/JAG/Stuff/Music')
        || path.includes('/JAG/Stuff/Klein - Tommy ')
        || path.includes('/Kalt/stuff/itunes/')
        || path.includes('/Flotsam/iTunes/')
        || path.includes('/Warm/Projekte/Musik/Jason Grier — Pankstrasse/Library/')
        || path.includes('/Warm/Projekte/Web/HEM Portal 2015/Resources/Portfolio/Selected/Ab Ovo/')
        || path.includes('/Working/HEM/Projects/Antalya/Audio')
        || path.includes('Beyoncé')
        || path.includes('/Kepner/tony/Music/iTunes/')
        // || path.includes('')
        // || path.includes('')
      ) {
        tunes.push(path)
      }

      else if (
        path.includes('Formats/LP')
        || path.includes('/__SRC__/The Shittiest Horse Project/The Chaffeur [Orig].wav')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP IIII/Edge, Other, Tar, Glass')
        || path.includes('/__SRC__/GOGOGO/HEM/Temp/CLEAN ME UP IIII/Acoustic Guitar Sound 1 Preview.mp3')
        || path.includes('/15. Jan (Semifinal)/HEM SL/')
        || path.includes('Video 1/Overdub Clips Trimmed')
        || path.includes('/2019/Working/HEM/SL22/G Project/')
        || path.includes('/2019/Working/HEM/SL22/V')
        || path.includes('/Amsterdam/App Recording 20161110 0121.aiff')
        || path.includes('/Antalya/1/')
        || path.includes('/Antalya/2/')
        || path.includes('/Antalya/3/')
        || path.includes('/Archive/April 2020/Soft Trash/hem-sound-tools/projects/antalya/')
        || path.includes('/Archive/May 2020/Grand Piano Project/Merge LR')
        || path.includes('/Archive/May 2020/Grand Piano Project/Taste Test')
        || path.includes('/Archive/April 2020/INA GRM SAMPLE PACK FOR ABLETON LIVE')
        || path.includes('/Archive/April 2020/Soft Trash/Dry Mics/')
        || path.includes('Eyes of March Project/Samples')
        || path.includes('Line Gøttsche – \"To Do\"/Prerenders')
        || path.includes('Line Gøttsche – \"To Do\"/Renders/')
        || path.includes('Line Gøttsche – \"To Do\"/Semifinal Prerenders')
        || path.includes('/Bakermoon session Feb 2018/')
        || path.includes('Samples/Recorded')
        || path.includes('Samples/Imported')
        || path.includes('Samples/Consolidate')
        || path.includes('Samples/Processed')
        || path.includes('Shoulderblades Stems')
        || path.includes('Toucan/Resources/LOGIC/')
        || path.includes('Fog Project 7.2.17')
        || path.includes('Line Gøttsche – \"To Do\"/Semifinal Renders')
        || path.includes('/Flotsam/2017 Fireworks Backup/LS110165.WAV')
        || path.includes('/Flotsam/Boddinstr Backup/LS110148.WAV')
        || path.includes('/Helen/Library/')
        || path.includes('/HEM S:L/')
        || path.includes('/Flotsam/Original Trump Protest Recording.aiff')
        || path.includes('/Flotsam/DD Stems/')
        || path.includes('/Flotsam/Album M1/AP_m1 ')
        || (
          path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux')
          && !path.includes('Blonde Blues')
          && !path.includes('Heart Shaped Rock (Plastic)')
          && !path.includes('Empire of You Prom')
          && !path.includes('On And On Destroyed Ambient')
          && !path.includes('Midnite Blue - Raw')
          && !path.includes('MEMPHIS (master)')
          && !path.includes('Girl - Boy Destroyed')
          && !path.includes('Girl - Boy Raw')
          && !path.includes('Midnite Blue - Raw')
          && !path.includes('Empire of You Piano')
          && !path.includes('Heart Shaped Rock - Piano')
          && !path.includes('Heart Shaped Rock 3')
          && !path.includes('Midnite Blue Redux - 05282011')
          && !path.includes('The Landscape')
          && !path.includes('Empire of You - For Soloing Over')
          && !path.includes('Heart Shaped Rock 2/Mixdowns/')
          && !path.includes('Heart Shaped Rock Pure Project/BOUNCES/')
        )
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/CAS/B5 Blonde Blues/Blonde Blues.wav')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 1 Redux/7\"/B Heart Shaped Rock - Plastic/Heart Shaped Rock (Plastic).wav')
        || path.includes('/Heart Shaped Rock 2011/Missing Tracks/')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Backups/Samples/')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Outtakes/Samples/')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Backups/Samples')
        || path.includes('/Heart Shaped Rock 2011/Heart Shaped Rock 2/Production/A Minute Project/Samples')
        || path.includes('/Heart Shaped Rock 2011/SAG Archives/HSR4jasonNN/JG_nothing_trans/')
        || path.includes('/JAG/Archive/indexhibit/public/audio/test-1.mp3')
        || path.includes('/JAG/Temp/')
        || path.includes('/JAG/Media/Demos/Leonids Lobrevs & Jelena Glazova/')
        || path.includes('/Flotsam/iTunes/Jelena Glazova & Leonids Lobrev/')
        || path.includes('/Kalt/stuff/itunes/1/David Bowie/Lodger/')
        || path.includes('/Kalt/studio/2006/Posthumous Writer')
        || path.includes('/Kalt/studio/2006/Sneaky Lover/Project Files/Tracktion/')
        || path.includes('/Kalt/studio/2012/Library/')
        || path.includes('/Kalt/lib/Drum Machines/')
        || (path.includes('/Kalt/deploy/2014/05 May/HEMK0030_Heroin/Unmastered/') && !path.includes('H Remixes'))
        || path.includes('/Kalt/deploy/2012/11 November/HEMK0001_Thrash-and-Burn/Formats/CAS/')
        || path.includes('/Kalt/studio/2014/HEMKV/Lesungen/Models/Marc Sabat — Jean-Philippe Rameau/Rameau-Live.mp3')
        || path.includes('/Kalt/deploy/2013/05 Mai/HEMK0001_Thrash-and-Burn_RP/Unmastered/Thrash and Burn')
        || path.includes('/Kalt/deploy/2013/05 Mai/HEMK0001_Thrash-and-Burn_RP/Deliverables/LP/Master/Thrash and Burn')
        || path.includes('/Kalt/studio/2013/Batholith Project/')
        || path.includes('/Kalt/deploy/2014/04 April/HEMK0027_Early_Live_Recordings/Working/Unmastered/PREMASTER/')
        || path.includes('/Kalt/bak/Desktop/Andre Vida/')
        || path.includes('/Kalt/deploy/2012/11 November/HEMK0026_Tombstones/Unmastered/Tombstones')
        || path.includes('/Kalt/studio/2012/Clouds/Stems/Sessions/Clouds [Demo].aif')
        || path.includes('/Kalt/studio/2012/My Sweet Unbekannte/Sounds/')
        || path.includes('/Kalt/deploy/2013/05 Mai/HEMK0001_Thrash-and-Burn_RP/Deliverables/24bit WAV/')
        || path.includes('/Kalt/deploy/2012/11 November/HEMK0001_Thrash-and-Burn/Formats/24bit WAV/')
        || path.includes('/Kalt/studio/2013/Unbekannte/Sounds/')
        || path.includes('/Old Apok/')
        || path.includes('/Transient Backup/Workong/HEM/Projects/SL2/Packs Project Files/HEM Grand Piano/Merged Mic Grands/')
        || path.includes('/Transient Backup/Workong/Evening Flower/Doodles/Evening Flower Project/Merged Mic Grands/')
        || path.includes('/Merged Mic Grands/')
        || path.includes('/Working/HEM/Projects/SL1, 2nd Edition/')
        || path.includes('/Working.prev/')
        || path.includes('/Kalt/deploy/2006/HEMK0000_126/Unmastered/')
        || path.includes('/Jelena Glazova - Lives selection/')
        || path.includes('Jelena Glazova - Red Material')
        || path.includes('/Kalt/studio/2013/Unbekannte/Mangos PrePost Sessions/')
        || path.includes('/Kalt/studio/2014/Hanne Lippard')
        || path.includes('/Kalt/studio/2014/Pankstrasse/Sessions/')
        || path.includes('/Kepner/tony/Library/Application Support/Steam/')
        || path.includes('/Transient Backup/Workong/HEM/Hosts/static/')
        || path.includes('/Transient Backup/Workong/HEM/Resources/Seurat/16 Test')
        || path.includes('/Transient Backup/Workong/HEM/Projects/SL2/')
        || path.includes('/Warm/Projekte/Musik/Jason Grier — Pankstrasse/Sessions/')
        || path.includes('/Warm/Projekte/Musik/Jason Grier — Pankstrasse/Library/')
        || path.includes('/Hanne Lippard')
        || path.includes('/Warm/Projekte/Musik/Jason Grier — Unbekannte II/Library/')
        || path.includes('/Warm/Projekte/Web/HEM Portal 2015/Resources/Portfolio/Code/hem_main_2008_wordpress/')
        || path.includes('/Warm/Projekte/Web/HEM Portal 2015/Resources/Portfolio/Code/hem_main_2008_flatfile/')
        || path.includes('/Transient Backup/Workingkong.old')
        || path.includes('/Kalt/backlog/raa_hem_improtaste')
        || path.includes('/Lost Angeles/HEM/Projects/Antalya/')
        || path.includes('/Kepner/GRAND Project/Merge LR/')
        || path.includes('/Merge LR/')
        || path.includes('/Lost Angeles/HEM/Projects/Shoulderblades/')
        || path.includes('/Kalt/studio/2013/For Mike Kelley Project/Sounds/')
        || path.includes('/Kalt/workstage/digitalformats/thrash/')
        || path.includes('/Kalt/studio/2013/Unbekannte/Stems/')
        || path.includes('/Kalt/workstage/digitalformats/unbekannte/')
        || path.includes('/Kalt/workstage/digitalformats/')
        || path.includes('/Kalt/deploy/2014/05 May/HEMK0005_Eating-The-Stars/Deliverables/Handmade/Master (OLD)')
        || path.includes('/Kalt/förderung/2014/Jason_Grier_Berlin_Art_Prize_Antrag_2014/Working/Helen of Troy.wav')
        || path.includes('/Kalt/studio/2013/Eating The Stars/Eating the Stars 2013/Mastering/Renders - No Compression/')
        || path.includes('/Kalt/bak/Desktop/Drew Straus Album/')
        || path.includes('/Kalt/deploy/2014/05 May/HEMK0005_Eating-The-Stars/Deliverables/LP/')
        || path.includes('Jürg Frey')
        || path.includes('GVE Spring 2014')
        || path.includes('/Kalt/bak/Desktop/LUP')
        || path.includes('/Kalt/studio/2014/HEMKV/Lesungen')
        || path.includes('/Lost Angeles/HEM/Releases/Experimental Housewife – Geofamiliar')
        || path.includes('/Transient Backup/Workong/HEM/Projects/Antalya/')
        || path.includes('/Transient Backup/Workingkong/HEM/Website/hem-static')
        || path.includes('/Transient Backup/Workong/HEM/Resources/Tracks/')
        || path.includes('/Warm/Projekte/Web/HEM Portal 2015/Resources/Portfolio/Code/redmango/dev/redmango/')
        || path.includes('/Warm/Projekte/Web/HEM Portal 2015/Resources/Portfolio/Code/supercreepland/')
        || path.includes('/Warm/Projekte/Web/Quandoo Mobile/Dev/ec_fe_mobile/node_modules/grunt-fontsmith/node_modules/')
        || path.includes('/Warm/Projekte/Musik/Jason Grier — Pankstrasse/Renders/Cviews/Loop')
        || path.includes('/Warm/Dokumente/Id/Lucrecia Dalt/belowtheradar/05_Levedad.mp3')
        || path.includes('/Kepner/tony/Music/iTunes/iTunes Media/Music/Unknown Artist/Unknown Album/SIDE ')
        || path.includes('/Kepner/tony/Library/Application Support/Google/Chrome/Default/Extensions/')
        || path.includes('/Library/Messages/')
        || path.includes('Library/Application Support/')
        || path.includes('/Pitchfork Advance/')
        || path.includes('/Kalt/studio/2012/Clouds/')
        || path.includes('/Kalt/studio/2013/Eating The Stars/Eating the Stars 2013/Mastering/Renders/')
        || path.includes('/Kalt/förderung/2014/Jason_Grier_Berlin_Art_Prize_Antrag_2014/Working/Unbekannte.wav')
        || path.includes('/Kalt/deploy/2014/04 April/HEMK0027_Early_Live_Recordings/Deliverables/LP/Audiomaster/Side')
        || path.includes('/Old Helen/Workshops/')
        || path.includes('/Transient Backup/Workingkong/SL 2020 Refresh/Resources/Hogir Sessions/')
        || path.includes('/Kalt/studio/2012/Midnite Blue 2012 Version/')
        || path.includes('/Kalt/studio/2013/Unbekannte/Working II/P1/Morgan State Project')
        || path.includes('/Kalt/studio/2013/Unbekannte/Working II/P1/Unbekannte/')
        || path.includes('/Kalt/deploy/2012/09 September/HEMK0024_Clouds/Deliverables/LP/')
        || path.includes('/Kalt/studio/2012/Clouds/')
        || path.includes('/Kalt/studio/2012/Jeepneys/Rawroo/')
        || path.includes('/Unmastered/')
        || path.includes('/Kalt/studio/2012/Jeepneys/LP Sessions')
        || path.includes('/Kalt/studio/2013/Unbekannte/Working')
        || path.includes('/Impulse Responses/')
        || path.includes('/Kalt/studio/2009/Pirate\'s Tale Remix/')
        || path.includes('/Kalt/live/2008/Julia Holter and Jason Grier Live at CalArts')
        || path.includes('/Kalt/studio/2012/Midnite Blue for Holter FACT Mix/audio')
        || path.includes('/Kalt/studio/2009/Clouds/Sketches/audio')
        || path.includes('/Kalt/deploy/2008/HEMK0013_Good-Evening/')
        || path.includes('/Kalt/studio/2008/Holy Shit Mexicali/')
        || path.includes('/Kalt/studio/2008/Jason Grier/Say It with Your Love/Live Version/say it with your love Sounds/')
        || path.includes('/Kalt/studio/2008/Jason Grier/Say It with Your Love/parts/')
        || path.includes('/Kalt/studio/2008/Jason Grier/Say It with Your Love/say it with your love/audio_')
        || path.includes('HEMK0011')
        || path.includes('/Kalt/studio/2010/Tombstones/')
        || path.includes('/Kalt/studio/2013/Eating The Stars/Eating the Stars Mixing/')
        || path.includes('/Kalt/studio/2013/Eating The Stars/JSH - MIXES/')
        || path.includes('/Kalt/studio/2013/Eating The Stars/')
        || path.includes('/Kalt/bilder/jason and julia church pics/Church:Music/churchsounds/')
        || path.includes('/Kalt/bilder/jason and julia church pics/Church:Music/CHURCH SAMPLES')
        || path.includes('/Kalt/studio/2007/Optimism/Optimism Tracktion/')
        || path.includes('HEMK0009')
        || path.includes('/Kalt/studio/2007/Missing/Missing Loop')
        || path.includes('/Kalt/studio/2008/HEATER/')
        || path.includes('/Kalt/studio/2007/')
        || path.includes('/Kalt/studio/2008/Jason Grier & Julia Holter Live at CalArts/TASTELESS CALARTS/audio')
        || path.includes('/Kalt/deploy/')
        // || path.includes('')
        || /\.mid$/.test(path)
        || /\.flac$/.test(path)
      ) {
        ineligible.push(path)
      }

      else if (
        path.includes('Demonstration Disc')
        || path.includes('HEMK0100_EPK')
        || path.includes('About_Repulsion_EPK')
        || path.includes('Tombstones_EPK')
        || path.includes('HEMK0032_Jason_Grier_Unbekannte_Presskit')
        || path.includes('Omonia/Quickburn Promos/')
        || path.includes('Omonia/Dense Digital Promo')
      ) {
        dedupe.push(path)
      }

      else {
        unsorted.push(path)
      }
    }
  }

  function cleanUpPaths(paths: string[]) {
    return paths.map(path => path.replace('/Volumes/April_Kepner/Eva_Vollmer/Disorganised', ''))
  }

  const report = {
    definitely: cleanUpPaths(definitely),
    listen: cleanUpPaths(listen),
    check: cleanUpPaths(check),
    // unsorted: cleanUpPaths(unsorted),
    // tunes: cleanUpPaths(tunes),
    // dedupe: cleanUpPaths(dedupe),
    // ineligible: cleanUpPaths(ineligible),
    // duplicate: cleanUpPaths(duplicate),
  }

  const reportFile = join(__dirname, '..', '..', '..', 'static', 'content', 'report.json')
  writeFileSync(reportFile, JSON.stringify(report, null, 2))

  // const srcIndex = join(__dirname, '..', '..', '..', 'static', 'content', 'index.json')
  // const distIndex = join(__dirname, '..', '..', '..', '..', '..', 'dist', 'static', 'content', 'index.json')
  // execSync(`rm index.bak.json`)
  // execSync(`cp ${srcIndex} ${srcIndex.replace('index.json', 'index.bak.json')}`)
  // writeFileSync(srcIndex, JSON.stringify(compressIndex(itemsWithStars)))
  // writeFileSync(distIndex, JSON.stringify(compressIndex(itemsWithStars)))
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

  useEffect(() => {
    runTask(() => migrate(allContentItems))
  }, [])

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
