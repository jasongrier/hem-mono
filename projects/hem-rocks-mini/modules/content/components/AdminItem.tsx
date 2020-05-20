import React, { ReactElement, useState, SyntheticEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import produce from 'immer'
import { identity, startCase } from 'lodash'
import { ElectronOnly, ZoomTextarea } from '../../../../../lib/components'
import { IContentItem, fieldTypes, modelize, requestCreateItems } from '../index'

interface IProps {
  create?: boolean
  item?: IContentItem
}

function AdminItem({ create, item }: IProps): ReactElement {
  const [workingItem, setWorkingItem] = useState<IContentItem>(
    produce(create ? modelize({}) : item, identity)
  )

  const dispatch = useDispatch()

  function onChange(fieldName, value) {
    setWorkingItem(produce(workingItem, (draftItem) => {
      draftItem[fieldName] = value
    }))
  }

  useEffect(() => {
    dispatch(requestCreateItems([workingItem]))
  }, [workingItem])

  return (
    <ElectronOnly showMessage={true}>
      <header className="admin-item-header">
        <button className="action-button">Save</button>
      </header>
      <table className="admin-item">
        <tbody>
          { Object.keys(workingItem).map(fieldName => {
            if (fieldTypes[fieldName] === 'textarea') {
              return (
                <tr key={fieldName}>
                  <td>
                    <label htmlFor={fieldName}>{ startCase(fieldName) }</label>
                  </td>
                  <td>
                    <ZoomTextarea
                      name={fieldName}
                      onChange={(value) => onChange(fieldName, value)}
                      value={workingItem[fieldName]}
                    />
                  </td>
                </tr>
              )
            }

            else if (
              fieldTypes[fieldName] === 'text'
              || fieldTypes[fieldName] === 'number'
            ) {
              return (
                <tr key={fieldName}>
                  <td>
                    <label htmlFor={fieldName}>{ startCase(fieldName) }</label>
                  </td>
                  <td>
                    <input
                      name={fieldName}
                      onChange={(evt: SyntheticEvent<HTMLInputElement>) => onChange(fieldName, evt.currentTarget.value)}
                      type={fieldTypes[fieldName]}
                      value={workingItem[fieldName]}
                    />
                  </td>
                </tr>
              )
            }

            else if (
              fieldTypes[fieldName] === 'checkbox'
            ) {
              return (
                <tr key={fieldName}>
                  <td>
                    <label htmlFor={fieldName}>{ startCase(fieldName) }</label>
                  </td>
                  <td>
                    <input
                      name={fieldName}
                      onChange={(evt: SyntheticEvent<HTMLInputElement>) => onChange(fieldName, !workingItem[fieldName])}
                      type={fieldTypes[fieldName]}
                      checked={workingItem[fieldName]}
                    />
                  </td>
                </tr>
              )
            }

            else {
              return (
                <tr key={fieldName}>
                  <td>
                    ERR!
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </ElectronOnly>
  )
}

export default AdminItem
