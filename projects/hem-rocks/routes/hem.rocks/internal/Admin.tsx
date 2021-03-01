import React, { ReactElement } from 'react'
import { Link, NavLink, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { AdminManualTaskRunner, AdminItem, AdminProgram, AdminList, AdminSettings, AdminReconcilePlaylists, AdminItemOrdering } from '../../../modules/core/content'
import { BASE_SITE_TITLE } from '../../../config'

function Admin(): ReactElement {
  return (
    <div className="main-content">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-admin">
        <div className="admin-main-content">
          <h1>HEM | CMS</h1>
          <nav className="admin-subnav">
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
              <li>
                <NavLink to="/admin/reconcile-playlists">Reconcile Playlists</NavLink>
              </li>
              <li>
                <NavLink to="/admin/item-ordering">Item Ordering</NavLink>
              </li>
              <li>
                <NavLink to="/admin/program">Program</NavLink>
              </li>
              <li>
                <NavLink to="/admin/settings">Settings</NavLink>
              </li>
              <li>
                <NavLink to="/internal">Internal Pages</NavLink>
              </li>
              <li>
                <Link to="#">Deploy (coming soon)</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              <AdminList />
            </Route>
            <Route exact path="/admin/list">
              <AdminList />
            </Route>
            <Route exact path="/admin/create">
              <AdminItem create={true} />
            </Route>
            <Route exact path="/admin/manual-task-runner">
              <AdminManualTaskRunner />
            </Route>
            <Route exact path="/admin/reconcile-playlists">
              <AdminReconcilePlaylists />
            </Route>
            <Route exact path="/admin/item-ordering">
              <AdminItemOrdering />
            </Route>
            <Route exact path="/admin/program">
              <AdminProgram />
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
            <Route exact path="/admin/settings">
              <AdminSettings />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Admin
