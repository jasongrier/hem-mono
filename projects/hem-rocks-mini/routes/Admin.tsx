import React, { ReactElement } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { AdminManualTaskRunner, AdminItem, AdminList } from '../modules/content'
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
              <NavLink to="/admin/manual-task-runner">Run Task</NavLink>
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
          <Route exact path="/admin/manual-task-runner">
            <AdminManualTaskRunner />
          </Route>
          <Route
            exact
            path="/admin/edit/:itemSlug"
            render={props => {
              return (
                <AdminItem
                  create={false}
                  itemSlug={props.match.params.itemSlug}
                />
              )
            }}
          />
        </Switch>
      </div>
    </>
  )
}

export default Admin
