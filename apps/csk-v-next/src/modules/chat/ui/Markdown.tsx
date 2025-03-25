'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CodeBlockProps {
  node: unknown;
  inline: boolean;
  className: string;
  children: React.ReactNode;
}

function CodeBlock({ inline, className, children, ...props }: CodeBlockProps) {
  if (!inline) {
    return (
      <div className="not-prose flex flex-col">
        <pre
          {...props}
          className={`w-full overflow-x-auto rounded-xl border border-zinc-200 p-4 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50`}
        >
          <code className="whitespace-pre-wrap break-words">{children}</code>
        </pre>
      </div>
    );
  } else {
    return (
      <code className={`${className} rounded-md bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-800`} {...props}>
        {children}
      </code>
    );
  }
}

const components: Partial<Components> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: CodeBlock as any,
  pre: ({ children }) => <>{children}</>,
  ol: ({ children, ...props }) => (
    <ol className="ml-4 list-outside list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="py-1" {...props}>
      {children}
    </li>
  ),
  ul: ({ children, ...props }) => (
    <ul className="ml-4 list-outside list-decimal" {...props}>
      {children}
    </ul>
  ),
  strong: ({ children, ...props }) => (
    <span className="font-semibold" {...props}>
      {children}
    </span>
  ),
  a: ({ children, ...props }) => (
    <Link
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noreferrer"
      href={props.href || '#'}
      {...props}
    >
      {children}
    </Link>
  ),
  h1: ({ children, ...props }) => (
    <h1 className="mb-2 mt-6 text-5xl font-semibold" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mb-2 mt-6 text-4xl font-semibold" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mb-2 mt-6 text-3xl font-semibold" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mb-2 mt-6 text-2xl font-semibold" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="mb-2 mt-6 text-xl font-semibold" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="mb-2 mt-6 text-lg font-semibold" {...props}>
      {children}
    </h6>
  ),
};

const remarkPlugins = [remarkGfm];

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} components={components}>
      {children}
    </ReactMarkdown>
  );
};
NonMemoizedMarkdown.displayName = 'NonMemoizedMarkdown';

export const Markdown = memo(NonMemoizedMarkdown, (prevProps, nextProps) => prevProps.children === nextProps.children);
