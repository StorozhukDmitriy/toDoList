import React, { useState } from "react"
import { TextField } from "@mui/material"

type EditSpanType = {
  title: string
  onBlur: (newTitle: string) => void
  disable?: boolean
}

export const EditSpan = ({ title, onBlur, disable }: EditSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState(title)
  const editModeActive = () => {
    if (disable) return
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
    <TextField
      disabled={disable}
      size={"small"}
      onBlur={onBlurHandler}
      onChange={onChangeHandler}
      defaultValue={newTitle}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editModeActive}>{title}</span>
  )
}
