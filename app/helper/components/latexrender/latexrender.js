import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import ReactMarkdown from 'react-markdown';
import Latex from 'react-latex-next';
import MathJax from 'react-mathjax2';
// import { MathComponent } from 'mathjax-react2';

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

export function LaTeXTable(){
  const tableString = `
  \\[
  \\begin{array}{|c|c|c|c|}
  \\hline
  \\textbf{Header 1} & \\textbf{Header 2} & \\textbf{Header 3} & \\textbf{Header 4} \\\\ \\hline
  Row 1, Col 1 & Row 1, Col 2 & Row 1, Col 3 & Row 1, Col 4 \\\\ \\hline
  Row 2, Col 1 & Row 2, Col 2 & Row 2, Col 3 & Row 2, Col 4 \\\\ \\hline
  Row 3, Col 1 & Row 3, Col 2 & Row 3, Col 3 & Row 3, Col 4 \\\\ \\hline
  \\end{array}
  \\]
  `;
  // const tableString = "Hello world";

  return (
    // <MathComponent tex = {tableString} />
    <MathJax.Context>
        <MathJax.Node inline>{tableString}</MathJax.Node>
    </MathJax.Context>
    // <div>Latex table</div>
  );
};

export function RenderLatex({ content }) {
  return (
    <div>
      <Latex>{content}</Latex>
    </div>
  );
};



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