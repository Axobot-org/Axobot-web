import CancelIcon from "@mui/icons-material/Cancel";

export default function DeleteCircleButton({ onClick }: { onClick: (event: unknown) => void }) {
  return (
    <CancelIcon onClick={onClick} fontSize="small" htmlColor="white" sx={{
      opacity: 0.5,
      cursor: "pointer",
      "&:hover": {
        opacity: 0.8,
      },
    }}
    />
  );
}
