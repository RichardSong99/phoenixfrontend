import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import ReactMarkdown from 'react-markdown';

export function parseLatexString(inputString) {
  if (typeof inputString !== 'string') {
    console.log('Expected a string, but got:', typeof inputString);
    return null;
  }

  // Split the string into parts using LaTeX delimiters
  const parts = inputString.split(/(\$.*?\$)/);

  // Map through the parts and render them
  const elements = parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      // Remove the $ delimiters and render the part as inline LaTeX
      return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
    } else {
      // Return the plain text part
      return <span key={index}>{part.replace(/DOLLARSIGN/g, '$')}</span>;
    }
  });

  // Wrap everything in a single line container (like a div or span)
  return <span>{elements}</span>;
}



function TestLatexRendering() {
  const testString = "Here is some inline LaTeX: $a^2 + b^2 = c^2$. And here is some block LaTeX: $$\\int_a^b f(x)\\,dx = F(b) - F(a)$$";

  return (
    <div>
      <h2>Test LaTeX Rendering</h2>
      <p>{parseLatexString(testString)}</p>
    </div>
  );
}

export default TestLatexRendering;