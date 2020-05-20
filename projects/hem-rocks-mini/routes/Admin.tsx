import React, { ReactElement } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { AdminConvert, AdminItem, AdminList } from '../modules/content'
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
        <nav className="main-content-subnav">
          <ul>
            <li>
              <NavLink to="/admin/list">List</NavLink>
            </li>
            <li>
              <NavLink to="/admin/create">Create New</NavLink>
            </li>
            <li>
              <NavLink to="/admin/convert">Convert</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/admin/list">
            <AdminList />
          </Route>
          <Route exact path="/admin/create">
            <AdminItem create={true} />
          </Route>
          <Route exact path="/admin/convert">
            <AdminConvert />
          </Route>
          <Route exact path="/admin/edit/:itemSlug">
            Edit
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Admin
