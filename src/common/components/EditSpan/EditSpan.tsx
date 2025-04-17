import React, { useState } from "react"
import { TextField } from "@mui/material"

type EditSpanType = {
  title: string
  onBlur: (newTitle: string) => void
}

export const EditSpan = ({ title, onBlur }: EditSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState(title)
  const editModeActive = () => {
    setEditMode(true)
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const onBlurHandler = () => {
    if (!newTitle) {
      setEditMode(false)
      return
    }
    onBlur(newTitle)
    setEditMode(false)
  }

  return editMode ? (
    <TextField size={"small"} onBlur={onBlurHandler} onChange={onChangeHandler} defaultValue={newTitle} autoFocus />
  ) : (
    <span onDoubleClick={editModeActive}>{title}</span>
  )
}
