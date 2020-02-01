### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [projects/seurat/hooks/use-clock.ts](projects/seurat/hooks/use-clock.ts#L4) | 4 | Remove this file
| [projects/seurat/store/actions.ts](projects/seurat/store/actions.ts#L36) | 36 | Switch to Saga
| [projects/seurat/store/actions.ts](projects/seurat/store/actions.ts#L85) | 85 | These should be their respective action types from `./types`!!! (All projects...)
| [projects/seurat/store/reducer.ts](projects/seurat/store/reducer.ts#L51) | 51 | All projects. Wrap cases in {} to scope these lets above as consts
| [projects/seurat/store/reducer.ts](projects/seurat/store/reducer.ts#L54) | 54 | Undo/redo decorator HoFn
| [projects/seurat/store/reducer.ts](projects/seurat/store/reducer.ts#L104) | 104 | Use action-specific interfaces, not AnyAction on the action creators
| [projects/seurat/store/reducer.ts](projects/seurat/store/reducer.ts#L107) | 107 | Why does the long property access below get a type of "never"? Try suggestion above
| [projects/seurat/store/types.ts](projects/seurat/store/types.ts#L32) | 32 | Omit doesn't work in `PerformanceControls.tsx`
| [projects/hem-rocks/components/App.tsx](projects/hem-rocks/components/App.tsx#L46) | 46 | "logIn" or "login" or "loggedIn"??
| [projects/jasonaarongrier-com/components/App.tsx](projects/jasonaarongrier-com/components/App.tsx#L14) | 14 | 404 page
| [projects/midst-press/components/App.tsx](projects/midst-press/components/App.tsx#L74) | 74 | Move PoemNav out of the Switch/Route and directly into the Poem component
| [projects/midst-press/components/CampaignMonitorForm.tsx](projects/midst-press/components/CampaignMonitorForm.tsx#L10) | 10 | All projects: Use line breaks for all component props
| [projects/midst-press/components/ProcessNote.tsx](projects/midst-press/components/ProcessNote.tsx#L13) | 13 | How not to "freeze in" changing state values in event callbacks?
| [projects/midst-press/routes/Poem.tsx](projects/midst-press/routes/Poem.tsx#L41) | 41 | Why is this a section and not a div like other pages?
| [projects/midst-press/routes/Read.tsx](projects/midst-press/routes/Read.tsx#L21) | 21 | React "call on an unmounted component" warning
| [projects/seurat/components/DeviceControls.tsx](projects/seurat/components/DeviceControls.tsx#L18) | 18 | Rename to "SideButtons" or sth
| [projects/seurat/components/DeviceControls.tsx](projects/seurat/components/DeviceControls.tsx#L21) | 21 | Make into a selector
| [projects/seurat/components/DeviceControls.tsx](projects/seurat/components/DeviceControls.tsx#L100) | 100 | Any??
| [projects/seurat/components/Dot.tsx](projects/seurat/components/Dot.tsx#L5) | 5 | Barrelise actions
| [projects/seurat/components/Dot.tsx](projects/seurat/components/Dot.tsx#L8) | 8 | Move handlers to a helper file
| [projects/seurat/components/Dot.tsx](projects/seurat/components/Dot.tsx#L9) | 9 | Bug when releasing outside a dot including outside the window; should be the same as releasing on a dot
| [projects/seurat/components/MainControls.tsx](projects/seurat/components/MainControls.tsx#L16) | 16 | Current canvas selector
| [projects/seurat/components/MainControls.tsx](projects/seurat/components/MainControls.tsx#L64) | 64 | Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
| [projects/seurat/components/MainControls.tsx](projects/seurat/components/MainControls.tsx#L70) | 70 | Should not be required
| [projects/seurat/components/PerformanceControls.tsx](projects/seurat/components/PerformanceControls.tsx#L18) | 18 | Make `currentCanvas` into a selector
| [projects/seurat/components/Seurat.tsx](projects/seurat/components/Seurat.tsx#L32) | 32 | How to prevent values getting frozen into a hook??
| [projects/seurat/components/Seurat.tsx](projects/seurat/components/Seurat.tsx#L88) | 88 | Play the sound assigned to the dot, not the canvas' sound
| [projects/seurat/components/Seurat.tsx](projects/seurat/components/Seurat.tsx#L104) | 104 | Standardize colors by keeping color vars in a place both TS and (vanilla) CSS can access them
| [projects/seurat/components/SeuratDial.tsx](projects/seurat/components/SeuratDial.tsx#L23) | 23 | values in these handlers are frozen by some DOM event handler stuff in Nexus
| [projects/seurat/components/SeuratDial.tsx](projects/seurat/components/SeuratDial.tsx#L26) | 26 | Immediately alter playback
| [projects/seurat/routes/Home.tsx](projects/seurat/routes/Home.tsx#L5) | 5 | Switch to Webpack
| [projects/studio-hem-rocks/routes/Home.tsx](projects/studio-hem-rocks/routes/Home.tsx#L18) | 18 | Link to zip; deploy task to update zip (without projects)
| [projects/zak-pdp-widget/components/SwatchPicker.tsx](projects/zak-pdp-widget/components/SwatchPicker.tsx#L5) | 5 | All projects; Export all props
| [projects/hem-rocks/components/layout/Displace.tsx](projects/hem-rocks/components/layout/Displace.tsx#L17) | 17 | All projects; use PropsWithChildren instead of `children: any` in IProps
| [projects/hem-rocks/components/layout/MegaMenu.tsx](projects/hem-rocks/components/layout/MegaMenu.tsx#L15) | 15 | Remove `hem-` prefix
| [projects/hem-rocks/components/ui/SneakyHero.tsx](projects/hem-rocks/components/ui/SneakyHero.tsx#L11) | 11 | New build task: `npm run task npm-publish lib/my-package`
| [projects/hem-rocks/components/ui/SneakyHero.tsx](projects/hem-rocks/components/ui/SneakyHero.tsx#L12) | 12 | Prep: No redux just yet, or else state boldly that Redux needs to be separately installed. Use the defaultStyles pattern. Use the controlled/uncontrolled autoswitch pattern
| [projects/hem-rocks/components/ui/SneakyHero.tsx](projects/hem-rocks/components/ui/SneakyHero.tsx#L13) | 13 | NPM steps: Manually place component in lib/packages, create a package.json there with only the needed deps, React goes in dev dependencies, no Redux, create a .d.ts and doc blocks, docs generator, tests and code coverage, prettier, readme file, license file, (lint for all this), and bundle with ROLLUP, then what??
| [projects/hem-rocks/components/ui/SneakyHero.tsx](projects/hem-rocks/components/ui/SneakyHero.tsx#L14) | 14 | https://codeburst.io/deploy-react-component-as-an-npm-library-d396efc25122
| [projects/hem-rocks/components/ui/SneakyHero.tsx](projects/hem-rocks/components/ui/SneakyHero.tsx#L15) | 15 | Publish sneaky-hero, Displace, Dial, etc to NPM
| [projects/hem-rocks/components/ui/TipPop.tsx](projects/hem-rocks/components/ui/TipPop.tsx#L9) | 9 | Move to common
| [projects/hem-rocks/components/ui/TipPop.tsx](projects/hem-rocks/components/ui/TipPop.tsx#L15) | 15 | All projects; Use named functions in hooks, even useEffect
| [projects/hem-rocks/packages/generative-art/Planes.tsx](projects/hem-rocks/packages/generative-art/Planes.tsx#L17) | 17 | Move to a common/packages
| [projects/studio-hem-rocks/components/animation/FlipBook.tsx](projects/studio-hem-rocks/components/animation/FlipBook.tsx#L10) | 10 | All projects, separate alphabetized required props from optionals
| [projects/studio-hem-rocks/components/animation/FlipBook.tsx](projects/studio-hem-rocks/components/animation/FlipBook.tsx#L37) | 37 | Should be "speed" ––or rather, "slowness"–– not "frameRate"
| [projects/studio-hem-rocks/components/animation/FlipBook.tsx](projects/studio-hem-rocks/components/animation/FlipBook.tsx#L57) | 57 | What if ––unlikely, but–– two frames have the same difference score??
| [projects/studio-hem-rocks/components/animation/FlipBook.tsx](projects/studio-hem-rocks/components/animation/FlipBook.tsx#L59) | 59 | What if ––unlikely, but–– myDiffIndex === -1??
| [projects/studio-hem-rocks/components/animation/Theater.tsx](projects/studio-hem-rocks/components/animation/Theater.tsx#L2) | 2 | Barrel file (all projects)
| [projects/studio-hem-rocks/components/animation/Theater.tsx](projects/studio-hem-rocks/components/animation/Theater.tsx#L4) | 4 | Move to common
| [projects/studio-hem-rocks/routes/demos/ArrangerDemo.tsx](projects/studio-hem-rocks/routes/demos/ArrangerDemo.tsx#L14) | 14 | Describe the arranger
| [projects/studio-hem-rocks/routes/demos/MidiDemo.tsx](projects/studio-hem-rocks/routes/demos/MidiDemo.tsx#L10) | 10 | Move to the new Midi class
| [projects/studio-hem-rocks/routes/demos/MidiDemo.tsx](projects/studio-hem-rocks/routes/demos/MidiDemo.tsx#L28) | 28 | Use the new Counter class
| [projects/hem-rocks/modules/articles/components/ArticlesGrid.tsx](projects/hem-rocks/modules/articles/components/ArticlesGrid.tsx#L8) | 8 | All props interfaces should be exported
| [projects/seurat/index.css](projects/seurat/index.css#L1) | 1 | Break this file up by component, 7-to-1
| [projects/seurat/index.css](projects/seurat/index.css#L4) | 4 | Not needed
| [projects/seurat/index.css](projects/seurat/index.css#L69) | 69 | Move Dial to common, create some generic styles for it
| [projects/seurat/index.css](projects/seurat/index.css#L91) | 91 | Move IconButton to common
| [projects/seurat/index.css](projects/seurat/index.css#L128) | 128 | This? Or guarded in JS? Or both??
| [projects/seurat/index.css](projects/seurat/index.css#L139) | 139 | Move PressAndHoldButton to common
| [projects/seurat/index.css](projects/seurat/index.css#L173) | 173 | Implement SVG icons!! (ie: Pay for Fontawesome)
| [projects/seurat/index.css](projects/seurat/index.css#L217) | 217 | Fix HACK: Cause it bounces back to `opacity: 1` and then transitions to `opacity: 2`. Might be fixed by SVG
| [projects/seurat/index.css](projects/seurat/index.css#L218) | 218 | This is getting messy...
| [projects/seurat/index.css](projects/seurat/index.css#L489) | 489 | Don't use opacity to simulate color, pick actual solid colors
| [projects/seurat/index.css](projects/seurat/index.css#L496) | 496 | Faded icon buttons should be a SVG color (ie: Pay for Fontawesome)
| [projects/seurat/index.css](projects/seurat/index.css#L505) | 505 | Weird!
| [projects/seurat/index.css](projects/seurat/index.css#L742) | 742 | Move to common with the component
