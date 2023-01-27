import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded"
import IconButton from "@mui/material/IconButton"

interface Props {
  onClick: () => void
}

export default function ButtonRemove({ onClick }: Props) {
  return (
    <IconButton onClick={onClick} aria-label="delete">
      <DeleteForeverRoundedIcon />
    </IconButton>
  )
}
