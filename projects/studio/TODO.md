### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [projects/studio/functions/format-movie-specs.ts](projects/studio/functions/format-movie-specs.ts#L19) | 19 | "IMG_" should be a param: "prefix"
| [projects/studio/functions/format-movie-specs.ts](projects/studio/functions/format-movie-specs.ts#L20) | 20 | URL base should come from ENV
| [projects/studio/functions/generate-image-sequence-urls.ts](projects/studio/functions/generate-image-sequence-urls.ts#L3) | 3 | Install Prettier/Eslint
| [projects/studio/functions/image-diff-matrix.ts](projects/studio/functions/image-diff-matrix.ts#L3) | 3 | Make it its own helper
| [projects/studio/functions/image-diff-matrix.ts](projects/studio/functions/image-diff-matrix.ts#L21) | 21 | Make it its own helper
| [projects/studio/functions/image-diff-matrix.ts](projects/studio/functions/image-diff-matrix.ts#L33) | 33 | Make it its own helper
| [projects/studio/store/selectors.ts](projects/studio/store/selectors.ts#L1) | 1 | Find a use for selectors in this project
| [projects/jason-grier/components/Movie.tsx](projects/jason-grier/components/Movie.tsx#L29) | 29 | Make this truly fps not some weird fudge factor
| [projects/midst-journal/components/CampaignMonitorForm.tsx](projects/midst-journal/components/CampaignMonitorForm.tsx#L10) | 10 | All projects: Use line breaks for all component props
| [projects/midst-journal/components/ProcessNote.tsx](projects/midst-journal/components/ProcessNote.tsx#L11) | 11 | How not to "freeze in" changing state values in event callbacks?
| [projects/seurat/components/DeviceControls.tsx](projects/seurat/components/DeviceControls.tsx#L18) | 18 | Rename to "SideButtons" or sth
| [projects/seurat/components/DeviceControls.tsx](projects/seurat/components/DeviceControls.tsx#L21) | 21 | Make into a selector
| [projects/seurat/components/DeviceControls.tsx](projects/seurat/components/DeviceControls.tsx#L100) | 100 | Any??
| [projects/seurat/components/Dial.tsx](projects/seurat/components/Dial.tsx#L7) | 7 | Draggging IFace for window
| [projects/seurat/components/Dial.tsx](projects/seurat/components/Dial.tsx#L16) | 16 | Stop our Nexus fork from eating mouse events
| [projects/seurat/components/Dial.tsx](projects/seurat/components/Dial.tsx#L38) | 38 | This is hardcoded in index.css as well
| [projects/seurat/components/Dial.tsx](projects/seurat/components/Dial.tsx#L50) | 50 | Fix event name in our Nexus fork
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
| [projects/studio/components/animation/FlipBook.tsx](projects/studio/components/animation/FlipBook.tsx#L10) | 10 | All projects, separate alphabetized required props from optionals
| [projects/studio/components/animation/FlipBook.tsx](projects/studio/components/animation/FlipBook.tsx#L37) | 37 | Should be "speed" ––or rather, "slowness"–– not "frameRate"
| [projects/studio/components/animation/FlipBook.tsx](projects/studio/components/animation/FlipBook.tsx#L57) | 57 | What if ––unlikely, but–– two frames have the same difference score??
| [projects/studio/components/animation/FlipBook.tsx](projects/studio/components/animation/FlipBook.tsx#L59) | 59 | What if ––unlikely, but–– myDiffIndex === -1??
| [projects/studio/components/animation/Theater.tsx](projects/studio/components/animation/Theater.tsx#L2) | 2 | Barrel file (all projects)
| [projects/studio/components/animation/Theater.tsx](projects/studio/components/animation/Theater.tsx#L4) | 4 | Move to common
| [projects/studio/routes/demos/DemoMovies.tsx](projects/studio/routes/demos/DemoMovies.tsx#L3) | 3 | Barrel file (done here, but not in all projects)
| [projects/studio/routes/demos/DemoMovies.tsx](projects/studio/routes/demos/DemoMovies.tsx#L184) | 184 | Should be a single component that gets passed route params
| [projects/studio/routes/demos/Midi.tsx](projects/studio/routes/demos/Midi.tsx#L5) | 5 | useMidi hook
| [projects/studio/routes/demos/Midi.tsx](projects/studio/routes/demos/Midi.tsx#L6) | 6 | Navigate away, then back, beeps don't start again
| [projects/studio/routes/demos/Midi.tsx](projects/studio/routes/demos/Midi.tsx#L35) | 35 | Replace all `return function destroy` with `return function cleanup`
