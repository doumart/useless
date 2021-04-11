import React from "react";

export const ChatBubble: React.FC<React.HTMLProps<HTMLOrSVGElement>> = ({ children, className }) => {
  return (
    <svg className={className} version="1.1" viewBox="0 0 90.321 51.928" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-13.258 -33.149)" fill="none">
        <g transform="matrix(1.0006 0 0 .61753 -16.629 28.291)" stroke="#000" strokeWidth=".26458px">
          <path d="m30 66v-54c0-2.0198 1.9802-4 4-4h82c3.0655 0 4 0.93448 4 4" />

          <path d="m85.785 70h-51.785c-2.0568 0-4-1.9432-4-4v-54c0-2.0198 1.9802-4 4-4h82c3.0655 0 4 0.93448 4 4v54c0 1.4142-2.5858 4-4 4h-14.767" />
        </g>

        <text>
          {children}
        </text>

        <g transform="translate(-16.581 1.4893)">
          <path d="m101.23 70c-4.4944 3.3443-1.4773 8.1984 0.82618 13.292-6.3977-3.3514-12.691-6.8186-16.275-13.292" stroke="#000" strokeWidth=".26458px" />

          <path d="m101.23 70c-4.4944 3.3443-1.4773 8.1984 0.82618 13.292-6.3977-3.3514-12.691-6.8186-16.275-13.292z" strokeOpacity="0" />
        </g>
      </g>
    </svg>

  );
};
