import styled from "@emotion/styled";
import MarkdownIt, { Token } from "markdown-it";
import { FunctionComponent, PropsWithChildren, ReactNode, useMemo } from "react";

import { ChannelMentionFromId } from "./ChannelMention";
import Timestamp from "./DiscordTimestamp";
import { RoleMentionFromId } from "./RoleMention";


interface DiscordMarkdownProps {
  text: string | undefined;
}
export default function DiscordMarkdown({ text }: DiscordMarkdownProps) {
  const Renderer = useMemo(() => getRenderer(), []);
  if (!text) {
    return null;
  }
  return (
    <Renderer markdown={text} />
  );
}

function getRenderer() {
  const md = new MarkdownIt({
    linkify: true,
  })
    .disable(["hr", "table", "image", "lheading", "reference"]);

  md.block.ruler.before("paragraph", "subtext", (state, startLine, endLine, silent) => { // Ex: -# smaller text here
    const pos = state.bMarks[startLine] + state.tShift[startLine];
    if (state.src.charCodeAt(pos) !== 45) return false;

    const match = state.src.slice(pos).match(/^(-#) (.*)$/m);
    if (!match) return false;

    if (!silent) {
      const token = state.push("subtext", "subtext", 0);
      token.content = match[2];
    }
    state.line = startLine + 1;
    return true;
  });

  md.inline.ruler.before("text", "user-mention", (state, silent) => {
    const pattern = /^<@!?(\d+)>/;
    const match = pattern.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const token = state.push("user_mention", "", 0);
      token.meta = { userId: match[1] }; // Store metadata
      token.content = match[0]; // The matched string
    }
    state.pos += match[0].length;
    return true;
  });

  md.inline.ruler.before("text", "role-mention", (state, silent) => {
    const pattern = /^<@&(\d+)>/;
    const match = pattern.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const token = state.push("role_mention", "", 0);
      token.meta = { roleId: match[1] };
      token.content = match[0];
    }
    state.pos += match[0].length;
    return true;
  });

  md.inline.ruler.before("text", "channel-mention", (state, silent) => {
    const pattern = /^<#(\d+)>/;
    const match = pattern.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const token = state.push("channel_mention", "", 0);
      token.meta = { channel: { id: match[1] } };
      token.content = match[0];
    }
    state.pos += match[0].length;
    return true;
  });

  md.inline.ruler.before("text", "command-mention", (state, silent) => {
    const pattern = /^<\/([\w -]+):(\d+)>/;
    const match = pattern.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const token = state.push("command_mention", "", 0);
      token.meta = { command: { name: match[1], id: match[2] } };
      token.content = match[0];
    }
    state.pos += match[0].length;
    return true;
  });

  md.inline.ruler.before("text", "discord-emoji", (state, silent) => {
    const pattern = /^<a?:(\w+):(\d+)>/;
    const match = pattern.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const token = state.push("discord_emoji", "", 0);
      token.meta = { emoji: { name: match[1], id: match[2] } };
      token.content = match[0];
    }
    state.pos += match[0].length;
    return true;
  });

  md.inline.ruler.before("text", "timestamp", (state, silent) => {
    const pattern = /^<t:(\d+)(?::(\w))?>/;
    const match = pattern.exec(state.src.slice(state.pos));
    if (!match) return false;

    if (!silent) {
      const token = state.push("timestamp", "", 0);
      token.meta = { timestamp: Number(match[1]), format: match[2] };
      token.content = match[0];
    }
    state.pos += match[0].length;
    return true;
  });

  md.core.ruler.after("block", "custom_breaks", (state) => {
    const tokens = state.tokens;
    const newTokens: Token[] = [];
    const lines = state.src.split("\n");

    let lastLineIndex = 0; // Track the last processed line number

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      newTokens.push(token);

      if (!token.content.trim()) continue; // Skip empty content tokens

      // Find the line index of this token
      let tokenLineIndex = lastLineIndex;
      while (tokenLineIndex < lines.length && !lines[tokenLineIndex].includes(token.content.trim())) {
        tokenLineIndex++;
      }

      if (tokenLineIndex >= lines.length) continue;
      lastLineIndex = tokenLineIndex;

      // Count how many empty lines follow
      let emptyLines = 0;
      while (
        lastLineIndex + 1 < lines.length
        && lines[lastLineIndex + 1].trim() === ""
      ) {
        emptyLines++;
        lastLineIndex++;
      }

      // Ensure <br /> is inserted correctly:
      if (
        emptyLines > 0
        && !(token.type.startsWith("heading") && i < tokens.length - 1 && tokens[i + 1].type.startsWith("heading"))
      ) {
        for (let j = 0; j < emptyLines; j++) {
          const brToken = new state.Token("br", "", 0);
          newTokens.push(brToken);
        }
      }
    }

    state.tokens = newTokens;
  });


  const renderers: Record<string, FunctionComponent<PropsWithChildren<{ token: Token }>>> = {
    text: ({ children }) => (typeof children === "string" ? <span>{children}</span> : children),
    "p": ({ children }) => <DiscordP>{children}</DiscordP>,
    "br": () => <br />,
    "em": ({ children }) => <em>{children}</em>,
    "strong": ({ children }) => <strong>{children}</strong>,
    "s": ({ children }) => <span style={{ textDecoration: "line-through" }}>{children}</span>,
    "a": ({ children, token }) => <FakeLink title={token.attrGet("href") ?? "#"}>{children}</FakeLink>,
    "code": ({ children, token }) => (
      (token.type === "code_inline")
        ? <InlineCode>{children}</InlineCode>
        : (
          <CodeBlock>
            <code>{children}</code>
          </CodeBlock>
        )
    ),
    "h1": ({ children }) => <DiscordH1>{children}</DiscordH1>,
    "h2": ({ children }) => <DiscordH2>{children}</DiscordH2>,
    "h3": ({ children }) => <DiscordH3>{children}</DiscordH3>,
    "h4": ({ children }) => <DiscordP>#### {children}</DiscordP>,
    "h5": ({ children }) => <DiscordP>##### {children}</DiscordP>,
    "h6": ({ children }) => <DiscordP>###### {children}</DiscordP>,
    "subtext": ({ children }) => <DiscordSubtext>{children}</DiscordSubtext>,
    "ol": ({ children }) => <DiscordOl>{children}</DiscordOl>,
    "ul": ({ children }) => <DiscordUl>{children}</DiscordUl>,
    "li": ({ children }) => <DiscordLi>{children}</DiscordLi>,
    "user_mention": ({ token }) => (
      <BlueMention>@{token.meta.userId}</BlueMention>
    ),
    "role_mention": ({ token }) => (
      <RoleMentionFromId id={token.meta.roleId} />
    ),
    "channel_mention": ({ token }) => <ChannelMentionFromId id={token.meta.channel.id} inline />,
    "command_mention": ({ token }) => (
      <BlueMention>/{token.meta.command.name}</BlueMention>
    ),
    "discord_emoji": ({ token }) => <span>:{token.meta.emoji.name}:</span>,
    "timestamp": ({ token }) => (
      <Timestamp timestamp={token.meta.timestamp.toString()} format={token.meta.format} />
    ),
  };

  const renderTokens = (tokens: Token[], level: number): ReactNode[] =>
    tokens.map((token, idx) => {
      if (token.level !== level || token.nesting === -1) {
        return null;
      }
      if (token.children) {
        return <>{renderTokens(token.children, 0)}</>;
      }

      const tokenType = token.tag || token.type;
      const Renderer = renderers[tokenType] || renderers.text;
      if (renderers[tokenType] === undefined) {
        console.info(`No renderer for token type ${tokenType}`, token);
      }

      if (token.nesting === 1) {
        // Find the following elements up to the opposite of this token, and render them using the tag of the current token.
        const children = [];
        let i = idx + 1;
        while (i < tokens.length) {
          const childToken = tokens[i];
          if (childToken.tag === token.tag && childToken.nesting === -1) {
            break;
          }
          children.push(childToken);
          i++;
        }
        return <Renderer key={idx} token={token}>{renderTokens(children, token.level + 1)}</Renderer>;
      }

      return <Renderer key={idx} token={token}>{token.content}</Renderer>;
    });

  const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
    const tokens = md.parse(markdown, {});
    return <div>{renderTokens(tokens, 0)}</div>;
  };

  return MarkdownRenderer;
}

const BlueMention = styled.span({
  display: "inline-flex",
  borderRadius: "3px",
  padding: "0 2px",
  color: "#a9baff",
  backgroundColor: "#5865f23d",
  fontWeight: 500,
});

const DiscordP = styled.p({
  margin: "0",

  "& +p": {
    marginTop: "1.2rem",
  },
});

const DiscordH1 = styled.div({
  margin: "16px 0 8px",
  fontSize: "1.5rem",
  fontWeight: 700,
  lineHeight: "1.375em",
});

const DiscordH2 = styled.div({
  margin: "16px 0 8px",
  fontSize: "1.25rem",
  fontWeight: 700,
  lineHeight: "1.375em",
});

const DiscordH3 = styled.div({
  margin: "16px 0 8px",
  fontWeight: 700,
  lineHeight: "1.375em",
});

const DiscordSubtext = styled.small({
  display: "block",
  color: "#94959c",
  lineHeight: "1.1rem",
  fontSize: ".8125rem",
});

const FakeLink = styled.span({
  color: "#5197ed",
  "&:hover": {
    textDecoration: "underline",
  },
});

const InlineCode = styled.code({
  backgroundColor: "#5865f214",
  border: "1px solid #97979f33",
  borderRadius: 4,
  padding: "0 .2em",
  fontSize: "0.85rem",
  lineHeight: "1.125rem",
});

const CodeBlock = styled.pre({
  backgroundColor: "#5865f214",
  border: "1px solid #97979f33",
  borderRadius: 4,
  marginTop: "6px",
  padding: ".5em",
  fontSize: "0.875rem",
  lineHeight: "1.125rem",
  whiteSpace: "pre-wrap",
});

const DiscordOl = styled.ol({
  margin: "4px 0 0 16px",
  padding: 0,
  listStylePosition: "outside",
});

const DiscordUl = styled.ul({
  margin: "4px 0 0 16px",
  padding: 0,
  listStylePosition: "outside",
});

const DiscordLi = styled.li({
  marginBottom: "4px",
  "& > p": {
    margin: 0,
  },
});

