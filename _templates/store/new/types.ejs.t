---
to: src/<%= name %>/types.ts
---
import rootReducer from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>
