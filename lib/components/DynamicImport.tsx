import React, { ReactElement, useEffect, useState } from 'react'

interface IProps {
  load: () => Promise<any>
  props?: any
}

function DynamicImport({ load, props = {} }: IProps): ReactElement {
  const [importedModule, setImportedModule] = useState()

  useEffect(() => { init() }, [])

  async function init() {
    setImportedModule(await load())
  }

  return (
    <>
      { !importedModule || !importedModule.default &&
        <div className="hem-dynamic-import-loading">
          <h1>Loading...</h1>
        </div>
      }
      { importedModule && importedModule.default &&
        <importedModule.default {...props} />
      }
    </>
  )
}

export default DynamicImport
