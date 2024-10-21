import { Box, CircularProgress, circularProgressClasses, CircularProgressProps, Typography } from "@mui/material";
import { useMemo } from "react";

interface CircularProgressWithLabelProps extends CircularProgressProps {
  label?: JSX.Element | string;
}

export default function CircularProgressWithLabel(
  props: CircularProgressWithLabelProps,
) {
  const { label, "aria-label": ariaLabel, ...circularProgressProps } = props;

  const Label = useMemo(() => {
    if (label === undefined) {
      return null;
    }
    if (typeof label === "string") {
      return <Typography variant="caption" component="div" color="text.secondary">{label}</Typography>;
    }
    return label;
  }, [label]);


  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...circularProgressProps}
        value={100}
        aria-hidden
      />
      <CircularProgress
        variant="determinate"
        {...circularProgressProps}
        aria-label={ariaLabel}
        sx={{
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={3}
      />
      {label && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Label}
        </Box>
      )}
    </Box>
  );
}
