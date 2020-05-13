import React, { ReactElement, useEffect } from 'react'
import { ElectronOnly } from '../../../../../lib/components'

function AdminItem(): ReactElement {
  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-item">
        ADMIN ITEM
      </div>
    </ElectronOnly>
  )
}

export default AdminItem
