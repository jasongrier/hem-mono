import React, { ReactElement } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { AdminItem, AdminList } from '../modules/content'
import { BASE_SITE_TITLE } from '../config'

function Admin(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-admin">
        <h1>CMS</h1>
        <nav className="page-subnav">
          <ul>
            <li>
              <NavLink to="/admin/create">Create New</NavLink>
            </li>
            <li>
              <NavLink to="/admin">List</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/admin/create">
            Create
          </Route>
          <Route exact path="/admin">
            <AdminList />
          </Route>
          <Route exact path="/admin/edit/:itemSlug">
            Edit
          </Route>
        </Switch>
        {/* <AdminList />
        <AdminItem /> */}
      </div>
    </>
  )
}

export default Admin
