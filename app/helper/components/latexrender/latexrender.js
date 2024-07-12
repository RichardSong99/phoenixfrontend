import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import ReactMarkdown from 'react-markdown';

export function parseLatexString(inputString) {
  if (typeof inputString !== 'string') {
    console.log('Expected a string, but got:', typeof inputString);
    return;
  }

  // Split the string into lines
  const lines = inputString.split('\n');

  // Process each line separately
  const lineElements = lines.map((line, lineIndex) => {
    // Split the line into parts using the LaTeX delimiters
    const parts = line.split(/(\$\$.*?\$\$|\$.*?\$)/);

    const elements = parts.map((part, index) => {
      // Check if the part is LaTeX
      if (part.startsWith('$') && part.endsWith('$')) {
        // Check if the part is block LaTeX
        if (part.startsWith('$$')) {
          // Remove the $$ delimiters and render the part as block LaTeX
          return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
        } else {
          // Remove the $ delimiters and render the part as inline LaTeX
          return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
        }
      } else {
        // Replace the placeholder with $ in the non-LaTeX parts
        const partWithDollarSigns = part.replace(/DOLLARSIGN/g, '$');
        // Render the part as regular text
        return <span key={index}>{partWithDollarSigns}</span>;
      }
    });

    // Return the elements for this line, followed by a line break (unless this is the last line)
    return (
      <React.Fragment key={lineIndex}>
        {elements}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });

  // Return the line elements
  return <>{lineElements}</>;
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