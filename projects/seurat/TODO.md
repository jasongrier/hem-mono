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
