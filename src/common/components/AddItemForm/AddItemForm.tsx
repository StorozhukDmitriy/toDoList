import { KeyboardEvent, useState } from "react"
import { IconButton, TextField } from "@mui/material"
import { AddCircleOutlined } from "@mui/icons-material"

type AddItemFormType = {
  createItem: (newTitle: string) => void
  disable?: boolean
}

export const AddItemForm = ({ createItem, disable }: AddItemFormType) => {
  const [newTitle, setNewTitle] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const createTaskOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTitle && newTitle.length <= 15) {
      createItem(newTitle)
      setNewTitle("")
    }
  }
  const createTaskHandler = () => {
    const trimmedTitle = newTitle.trim()
    if (trimmedTitle) {
      createItem(trimmedTitle)
      setIsOpen(false)
    } else {
      setError(true)
    }
    setNewTitle("")
  }

  return isOpen ? (
    <div>
      <TextField
        disabled={disable}
        value={newTitle}
        placeholder={"max title length is 15 characters"}
        variant={"standard"}
        label={"Enter text"}
        size={"small"}
        onKeyDown={createTaskOnKeyDown}
        error={error}
        autoFocus
        onChange={(e) => {
          error && setError(false)
          setNewTitle(e.target.value)
        }}
        helperText={error ? "Enter valid string" : ""}
      />
      <IconButton onClick={createTaskHandler} disabled={!newTitle || disable}>
        <AddCircleOutlined color={"primary"} />
      </IconButton>
      {newTitle.length >= 15 && <div style={{ color: "red" }}>title is too long</div>}
    </div>
  ) : (
    <IconButton size={"small"} onClick={() => setIsOpen(!isOpen)}>
      <AddCircleOutlined />
      <span> Create</span>
    </IconButton>
  )
}
