import { InfoOutlined, InfoRounded } from "@mui/icons-material";
import { Box, Collapse, IconButton, Stack, styled, Tooltip, Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";

interface CollapsedInfoBoxProps {
  title: string;
}

export default function CollapsedInfoBox({ title, children }: PropsWithChildren<CollapsedInfoBoxProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? InfoRounded : InfoOutlined;

  return (
    <Container className={isOpen ? "isOpen" : undefined}>
      <Stack useFlexGap direction="row" gap={2} alignItems="center">
        <Tooltip title={title}>
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <Icon />
          </IconButton>
        </Tooltip>
        {isOpen && <Typography variant="h6">{title}</Typography>}
      </Stack>
      <Collapse in={isOpen}>
        {children}
      </Collapse>
    </Container>
  );
}

const Container = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2),
  borderStyle: "solid",
  borderWidth: 0,
  borderColor: theme.palette.secondary.main,
  borderRadius: 15,
  padding: theme.spacing(2, 3),
  transition: theme.transitions.create(["border-width"]),

  minWidth: "min(80vw, 40rem)",
  maxWidth: "calc(min(98vw, 640px))",
  [theme.breakpoints.down("sm")]: {
    minWidth: "95vw",
  },

  "&.isOpen": {
    borderWidth: 1,
  },
}));
