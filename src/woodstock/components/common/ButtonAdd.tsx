import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded"
import IconButton from "@mui/material/IconButton"

interface Props {
  onClick: () => void
}

export default function ButtonAdd({ onClick }: Props) {
  return (
    <IconButton onClick={onClick} aria-label="delete">
      <PersonAddAltRoundedIcon />
    </IconButton>
  )
}
