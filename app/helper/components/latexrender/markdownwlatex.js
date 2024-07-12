import React from 'react';
import ReactMarkdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import rehypeRaw from 'rehype-raw';

const renderMarkdownWithLaTeX = (markdownString) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        // Render inline math as InlineMath component
        inlineMath: ({ value }) => <InlineMath math={value} />,
        // Render block math as BlockMath component
        math: ({ value }) => <BlockMath math={value} />,
        text: TextComponent,

      }}
    >
      {markdownString}
    </ReactMarkdown>
  );
};

const TextComponent = ({ node, ...props }) => {
  if (node.value.startsWith('<u>') && node.value.endsWith('</u>')) {
    return <span style={{ textDecoration: 'underline' }}>{node.value.slice(2, -2)}</span>;
  } else {
    return node.value;
  }
};

export default renderMarkdownWithLaTeX;
