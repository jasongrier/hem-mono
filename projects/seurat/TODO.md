### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [projects/seurat/hooks/use-clock.ts](projects/seurat/hooks/use-clock.ts#L4) | 4 | Remove this file
| [projects/seurat/store/actions.ts](projects/seurat/store/actions.ts#L82) | 82 | These should be their respective action types from `./types`!!! (All projects...)
| [projects/seurat/store/reducer.ts](projects/seurat/store/reducer.ts#L51) | 51 | All projects. Wrap cases in {} to scope these lets above as consts
| [projects/seurat/store/reducer.ts](projects/seurat/store/reducer.ts#L54) | 54 | Undo/redo decorator HoFn
| [projects/seurat/store/reducer.ts](projects/seurat/store/reducer.ts#L104) | 104 | Use action-specific interfaces, not AnyAction on the action creators
| [projects/seurat/store/reducer.ts](projects/seurat/store/reducer.ts#L107) | 107 | Why does the long property access below get a type of "never"? Try suggestion above
| [projects/seurat/store/types.ts](projects/seurat/store/types.ts#L4) | 4 | How to get around putting this in every project??
| [projects/seurat/store/types.ts](projects/seurat/store/types.ts#L36) | 36 | Omit doesn't work in `PerformanceControls.tsx`
| [projects/hem/components/SlSoundPlayer.tsx](projects/hem/components/SlSoundPlayer.tsx#L51) | 51 | Update the playback engine
| [projects/hem/components/SlSoundPlayer.tsx](projects/hem/components/SlSoundPlayer.tsx#L53) | 53 | Update the state
| [projects/jason-grier/components/Movie.tsx](projects/jason-grier/components/Movie.tsx#L29) | 29 | Make this truly fps not some weird fudge factor
| [projects/midst-journal/components/CampaignMonitorForm.tsx](projects/midst-journal/components/CampaignMonitorForm.tsx#L10) | 10 | All projects: Use line breaks for all component props
| [projects/midst-journal/components/ProcessNote.tsx](projects/midst-journal/components/ProcessNote.tsx#L11) | 11 | How not to "freeze in" changing state values in event callbacks?
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
| [projects/studio/components/App.tsx](projects/studio/components/App.tsx#L3) | 3 | Use barrel files
| [projects/studio/routes/Home.tsx](projects/studio/routes/Home.tsx#L7) | 7 | Header/Footer components
| [projects/studio/routes/Home.tsx](projects/studio/routes/Home.tsx#L8) | 8 | Helmet here
| [projects/studio/routes/Home.tsx](projects/studio/routes/Home.tsx#L18) | 18 | Create a separate public Github repo as a submodule
| [projects/studio/routes/Home.tsx](projects/studio/routes/Home.tsx#L19) | 19 | Link to Github repo
| [projects/studio/components/animation/FlipBook.tsx](projects/studio/components/animation/FlipBook.tsx#L10) | 10 | All projects, separate alphabetized required props from optionals
| [projects/studio/components/animation/FlipBook.tsx](projects/studio/components/animation/FlipBook.tsx#L37) | 37 | Should be "speed" ––or rather, "slowness"–– not "frameRate"
| [projects/studio/components/animation/FlipBook.tsx](projects/studio/components/animation/FlipBook.tsx#L57) | 57 | What if ––unlikely, but–– two frames have the same difference score??
| [projects/studio/components/animation/FlipBook.tsx](projects/studio/components/animation/FlipBook.tsx#L59) | 59 | What if ––unlikely, but–– myDiffIndex === -1??
| [projects/studio/components/animation/Theater.tsx](projects/studio/components/animation/Theater.tsx#L2) | 2 | Barrel file (all projects)
| [projects/studio/components/animation/Theater.tsx](projects/studio/components/animation/Theater.tsx#L4) | 4 | Move to common
| [projects/studio/routes/demos/MidiDemo.tsx](projects/studio/routes/demos/MidiDemo.tsx#L7) | 7 | Midi class
| [projects/studio/routes/demos/MidiDemo.tsx](projects/studio/routes/demos/MidiDemo.tsx#L28) | 28 | Use ClockDivider
| [projects/studio/routes/demos/MidiDemo.tsx](projects/studio/routes/demos/MidiDemo.tsx#L50) | 50 | What test file? Where? (/resources)
| [projects/studio/routes/demos/MidiDemo.tsx](projects/studio/routes/demos/MidiDemo.tsx#L52) | 52 | Screenshot and better description
| [projects/studio/routes/projects/FlipBookDemo.tsx](projects/studio/routes/projects/FlipBookDemo.tsx#L3) | 3 | Barrel file (done here, but not in all projects)
| [projects/studio/routes/projects/FlipBookDemo.tsx](projects/studio/routes/projects/FlipBookDemo.tsx#L141) | 141 | Should this be IFlipBookSpec?
| [projects/studio/routes/projects/FlipBookDemo.tsx](projects/studio/routes/projects/FlipBookDemo.tsx#L185) | 185 | Should be a single component that gets passed route params
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
