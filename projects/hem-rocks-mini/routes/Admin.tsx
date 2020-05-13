import React, { ReactElement } from 'react'
import { AdminItem, AdminList } from '../modules/content'

function Admin(): ReactElement {
  return (
    <div className="page page-admin">
      <AdminList />
      <AdminItem />
    </div>
  )
}

export default Admin
