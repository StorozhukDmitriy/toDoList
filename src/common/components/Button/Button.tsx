type ButtonPropsType = {
  title: string
  callback: () => void
  isDisabled?: boolean
  className?: string
}

export const Button = ({ title, callback, isDisabled, className }: ButtonPropsType) => {
  const onclickHandler = () => {
    callback()
  }

  return (
    <button className={className} disabled={isDisabled} onClick={onclickHandler}>
      {title}
    </button>
  )
}
