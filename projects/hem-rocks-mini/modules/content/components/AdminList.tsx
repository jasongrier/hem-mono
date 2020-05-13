import React, { ReactElement } from 'react'
import { ElectronOnly } from '../../../../../lib/components'

function AdminList(): ReactElement {
  return (
    <ElectronOnly showMessage={true}>
      <div className="admin-list">
        ADMIN LIST
      </div>
    </ElectronOnly>
  )
}

export default AdminList
