import { Box, Link, styled, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

function titleToSectionId(title: string) {
  let result = title.toLowerCase().replace(/\W/g, "-");
  while (result.includes("--")) {
    result = result.replace("--", "-");
  }
  return result;
}

export const TitleSection = ({ title, children }: PropsWithChildren<{title: string}>) => (
  <section id={titleToSectionId(title)}>
    <TitleTypography variant="h4" mt={8} fontWeight="bold" textTransform="uppercase">
      {title}
      <HeaderLink title={title} />
    </TitleTypography>
    <Box mt={2} pl={2} textAlign="justify">
      {children}
    </Box>
  </section>
);

export const SubtitleSection = ({ title, children }: PropsWithChildren<{title: string}>) => (
  <section id={titleToSectionId(title)}>
    <TitleTypography variant="h5" mt={3} fontWeight="bold">
      {title}
      <HeaderLink title={title} />
    </TitleTypography>
    <Box mt={1} mb={3} pl={2}>
      {children}
    </Box>
  </section>
);

export const Subtitle2Section = ({ title, children }: PropsWithChildren<{title: string}>) => (
  <section id={titleToSectionId(title)}>
    <TitleTypography variant="h6" mt={3} fontWeight="bold">
      {title}
      <HeaderLink title={title} />
    </TitleTypography>
    <Box mt={1} mb={3} pl={2}>
      {children}
    </Box>
  </section>
);

const TitleTypography = styled(Typography)({
  fontWeight: "bold",
  "&:hover .header-link": {
    visibility: "visible",
  },
});

const HeaderLink = ({ title }: {title: string}) => (
  <Link
    href={`#${titleToSectionId(title)}`}
    className="header-link"
    underline="none"
    title="Link to this heading"
    ml={1}
    fontWeight="light"
    onClick={() => {
      window.location.hash = titleToSectionId(title);
    }}
    sx={{
      opacity: 0.7,
      visibility: "hidden",
      "&:hover": {
        opacity: 1,
      },
    }}>
    #
  </Link>
);

export const ExternalLink = ({ href }: {href: string}) => (
  <Link href={href} target="_blank">{href}</Link>
);
