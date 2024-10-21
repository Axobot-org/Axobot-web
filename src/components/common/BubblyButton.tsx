import { Button, keyframes, styled, SxProps, Theme } from "@mui/material";
import { useState } from "react";

const AnimationDurationMs = 1400;

interface BubblyButtonProps {
  sx?: SxProps<Theme>;
}

export default function BubblyButton({ sx }: BubblyButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(function() {
      setIsAnimating(false);
    }, AnimationDurationMs + 1);
  };

  return (
    <InnerBubblyButton
      variant="contained"
      onClick={onClick}
      className={isAnimating ? "animate" : undefined}
      disabled={isAnimating}
      sx={sx}
    >
      Don't press me!
    </InnerBubblyButton>
  );
}

const topBubbles = keyframes`
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
`;

const bottomBubbles = keyframes`
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
`;


const InnerBubblyButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: "transform ease-in 0.1s, box-shadow ease-in-out 0.925s",
  boxShadow: "0 2px 25px rgba(255, 0, 130, 0.95)",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.9,
  },
  "&:disabled": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  "&:before, &:after": {
    position: "absolute",
    content: "''",
    display: "block",
    width: "90vw",
    height: "70vh",
    top: "-150px",
    zIndex: -1000,
    transition: "all ease-in-out 0.5s",
    backgroundRepeat: "no-repeat",
  },
  "&:before": {
    display: "none",
    top: "-75%",
    backgroundImage: `radial-gradient(circle, ${theme.palette.secondary.light} 20%, transparent 20%),
      radial-gradient(circle,  transparent 20%, ${theme.palette.primary.light} 20%, transparent 30%),
      radial-gradient(circle, ${theme.palette.secondary.light} 20%, transparent 20%),
      radial-gradient(circle, ${theme.palette.primary.light} 20%, transparent 20%),
      radial-gradient(circle,  transparent 10%, ${theme.palette.primary.light} 15%, transparent 20%),
      radial-gradient(circle, ${theme.palette.primary.dark} 20%, transparent 20%),
      radial-gradient(circle, ${theme.palette.secondary.main} 20%, transparent 20%),
      radial-gradient(circle, ${theme.palette.primary.light} 20%, transparent 20%),
      radial-gradient(circle, ${theme.palette.primary.light} 20%, transparent 20%)`,
    backgroundSize: "10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%",
    backgroundPosition: "0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%,",
  },

  "&:after": {
    display: "none",
    bottom: "-75%",
    backgroundImage: `
      radial-gradient(circle, ${theme.palette.primary.light} 20%, transparent 20%),
      radial-gradient(circle, ${theme.palette.secondary.light} 20%, transparent 20%),
      radial-gradient(circle,  transparent 10%, ${theme.palette.primary.dark} 15%, transparent 20%),
      radial-gradient(circle, ${theme.palette.primary.main} 20%, transparent 20%),
      radial-gradient(circle, ${theme.palette.secondary.light} 20%, transparent 20%),
      radial-gradient(circle, ${theme.palette.primary.main} 20%, transparent 20%),
      radial-gradient(circle, ${theme.palette.secondary.light} 20%, transparent 20%)`,
    backgroundSize: "15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%",
    backgroundPosition: "5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%",
  },

  "&:active": {
    transform: "scale(0.9)",
    backgroundColor: `darken(${theme.palette.secondary.main}, 5%)`,
    boxShadow: "0 2px 25px rgba(255, 0, 130, 0.2)",
  },

  "&.animate": {
    " &:before": {
      display: "block",
      animation: `${topBubbles} ease-in-out ${AnimationDurationMs}ms forwards`,
    },
    "&:after": {
      display: "block",
      animation: `${bottomBubbles} ease-in-out ${AnimationDurationMs}ms forwards`,
    },
  },
}));
