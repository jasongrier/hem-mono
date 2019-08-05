import React, { ReactElement, useState } from 'react'
import { TagsInput } from '../../../../../common/tags-input'
import './style.css'

function EditForm(): ReactElement {

  const [tags, setTags] = useState(['Foo', 'Bar', 'Baz'])

  function onTagCreated(tag: string) {
    setTags(tags.concat(tag))
  }

  return (
    <div className="edit-form">
      <form>
        <input
          className="title-input"
          type="text"
        />
        <textarea className="description-input"></textarea>
        <TagsInput
          tags={tags}
          onTagCreated={onTagCreated}
        />
      </form>
    </div>
  )
}

export default EditForm
