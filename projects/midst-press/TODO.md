### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [projects/midst-press/store/actions.ts](projects/midst-press/store/actions.ts#L3) | 3 | Type def file
| [projects/midst-press/store/actions.ts](projects/midst-press/store/actions.ts#L6) | 6 | Type def file
| [projects/midst-press/store/actions.ts](projects/midst-press/store/actions.ts#L19) | 19 | Should be: ThunkResult<void>. Why doesn't it work?
| [projects/midst-press/store/actions.ts](projects/midst-press/store/actions.ts#L21) | 21 | Above should be: ThunkResult<void>, then `any` is not needed here
| [projects/midst-press/store/reducer.ts](projects/midst-press/store/reducer.ts#L256) | 256 | Should be Action from `../types.ts`
| [projects/midst-press/store/selectors.ts](projects/midst-press/store/selectors.ts#L1) | 1 | Find a use for selectors in this project
| [projects/midst-press/store/types.ts](projects/midst-press/store/types.ts#L4) | 4 | How to get around putting this in every project??
| [projects/midst-press/store/types.ts](projects/midst-press/store/types.ts#L7) | 7 | Move Midst types to common
| [projects/midst-press/store/types.ts](projects/midst-press/store/types.ts#L14) | 14 | Move Midst types to common
| [projects/hem-rocks/components/SlSoundPlayer.tsx](projects/hem-rocks/components/SlSoundPlayer.tsx#L51) | 51 | Update the playback engine
| [projects/hem-rocks/components/SlSoundPlayer.tsx](projects/hem-rocks/components/SlSoundPlayer.tsx#L53) | 53 | Update the state
| [projects/jasonaarongrier-com/components/App.tsx](projects/jasonaarongrier-com/components/App.tsx#L14) | 14 | 404 page
| [projects/midst-press/components/CampaignMonitorForm.tsx](projects/midst-press/components/CampaignMonitorForm.tsx#L10) | 10 | All projects: Use line breaks for all component props
| [projects/midst-press/components/ProcessNote.tsx](projects/midst-press/components/ProcessNote.tsx#L13) | 13 | How not to "freeze in" changing state values in event callbacks?
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
| [projects/studio-hem-rocks/components/App.tsx](projects/studio-hem-rocks/components/App.tsx#L3) | 3 | Use barrel files
| [projects/studio-hem-rocks/components/App.tsx](projects/studio-hem-rocks/components/App.tsx#L21) | 21 | 404 page
| [projects/studio-hem-rocks/routes/Home.tsx](projects/studio-hem-rocks/routes/Home.tsx#L7) | 7 | Header/Footer components
| [projects/studio-hem-rocks/routes/Home.tsx](projects/studio-hem-rocks/routes/Home.tsx#L8) | 8 | Helmet here
| [projects/studio-hem-rocks/routes/Home.tsx](projects/studio-hem-rocks/routes/Home.tsx#L16) | 16 | Create a separate public Github repo as a submodule
| [projects/studio-hem-rocks/routes/Home.tsx](projects/studio-hem-rocks/routes/Home.tsx#L17) | 17 | Link to Github repo
| [projects/studio-hem-rocks/components/animation/FlipBook.tsx](projects/studio-hem-rocks/components/animation/FlipBook.tsx#L10) | 10 | All projects, separate alphabetized required props from optionals
| [projects/studio-hem-rocks/components/animation/FlipBook.tsx](projects/studio-hem-rocks/components/animation/FlipBook.tsx#L37) | 37 | Should be "speed" ––or rather, "slowness"–– not "frameRate"
| [projects/studio-hem-rocks/components/animation/FlipBook.tsx](projects/studio-hem-rocks/components/animation/FlipBook.tsx#L57) | 57 | What if ––unlikely, but–– two frames have the same difference score??
| [projects/studio-hem-rocks/components/animation/FlipBook.tsx](projects/studio-hem-rocks/components/animation/FlipBook.tsx#L59) | 59 | What if ––unlikely, but–– myDiffIndex === -1??
| [projects/studio-hem-rocks/components/animation/Theater.tsx](projects/studio-hem-rocks/components/animation/Theater.tsx#L2) | 2 | Barrel file (all projects)
| [projects/studio-hem-rocks/components/animation/Theater.tsx](projects/studio-hem-rocks/components/animation/Theater.tsx#L4) | 4 | Move to common
| [projects/studio-hem-rocks/routes/demos/MidiDemo.tsx](projects/studio-hem-rocks/routes/demos/MidiDemo.tsx#L7) | 7 | Midi class
| [projects/studio-hem-rocks/routes/demos/MidiDemo.tsx](projects/studio-hem-rocks/routes/demos/MidiDemo.tsx#L28) | 28 | Use ClockDivider
| [projects/studio-hem-rocks/routes/demos/MidiDemo.tsx](projects/studio-hem-rocks/routes/demos/MidiDemo.tsx#L49) | 49 | Screenshot of how to do this in Ableton Live
| [projects/studio-hem-rocks/routes/demos/MidiDemo.tsx](projects/studio-hem-rocks/routes/demos/MidiDemo.tsx#L51) | 51 | Screenshot and better description
| [projects/studio-hem-rocks/routes/projects/FlipBookDemo.tsx](projects/studio-hem-rocks/routes/projects/FlipBookDemo.tsx#L3) | 3 | Barrel file (done here, but not in all projects)
| [projects/studio-hem-rocks/routes/projects/FlipBookDemo.tsx](projects/studio-hem-rocks/routes/projects/FlipBookDemo.tsx#L141) | 141 | Should this be IFlipBookSpec?
| [projects/studio-hem-rocks/routes/projects/FlipBookDemo.tsx](projects/studio-hem-rocks/routes/projects/FlipBookDemo.tsx#L185) | 185 | Should be a single component that gets passed route params
