import * as React from "react"
import Svg, { SvgProps, Defs, Rect, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Amex = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 512 512"
    {...props}
  >
    <Defs></Defs>
    <Rect width={512} height={332.12} y={89.94} className="cls-1" rx={15} />
    <Path
      d="M468.85 306.94c.92 13.3-6.88 24.12-18.14 25.11-3.84.34-7.93.5-12.91.5-3.08 0-6.18-.06-9.18-.11s-6-.13-9-.13h-9v-1.38a20.15 20.15 0 0 1-5.32 1.23c-3.67.36-7.64.52-12.41.52-3 0-6.07-.05-9-.13-2.4-.06-4.85-.11-7.27-.11v.39H345l.1.13h-37.7l-2.71-3.12c-1.38-1.65-2.82-3.32-4.23-5v8h-29v-19.48a24.65 24.65 0 0 1-12 3.65c-2.06.07-4.25.13-6.91.13h-1.91v15.64h-4.79l.15.21h-36.82l-2.69-3.44-4.77-6.05-3.31 4.25-1.41 1.82-2.71 3.43H157.7l.24-.28h-31.68v-64.84h32.12v-.05h36.48l2.68 3.47 4.51 5.76 4.57-5.81 2.71-3.45h36.48l-.16.21h4.12c5.4 0 9.83.18 13.93.54a19.56 19.56 0 0 1 7.82 2.4v-3h18c3 0 5.95-.05 8.92-.05 4.88 0 8.89.07 12.6.26a21.18 21.18 0 0 1 9.54 2.71V268h56.14v2.16a22 22 0 0 1 8.42-2.11c3.44-.18 7.14-.26 11.63-.26 2.82 0 5.66 0 8.55.08s5.79 0 8.74 0h13.76l-.18.42c.52-.08 1.05-.16 1.57-.19 3.54-.26 7.32-.36 11.91-.36 2.87 0 5.79.05 8.74.08s5.86.1 8.89.1h13.92l-5.73 12.7-1.75 3.86-2.48 5.48-.75 1.69c4.04 3.56 6.45 8.69 6.89 15.29ZM431.75 182.59v64.8h-27.9l-2.66-4.1-4-6.26v10.23h-28.98v-.08h-12.65l-2.4-5.19-1.72-3.7h-11.26l-.34.75-1.39 3.08-2.37 5.32h-31.6l.1-.26a27 27 0 0 1-14.49-6.26v6.34h-39.53l-2.12-1.26a26.33 26.33 0 0 1-6.91-6.05v7.33h-20v.15h-55.8v-.13h-19.21l-.05.11H123.7v-.13h-7.82v.05h-32l-2.4-5.27c-.58-1.3-1.18-2.6-1.78-3.93H68.63c-.6 1.3-1.17 2.6-1.77 4l-2.37 5.34H32.88L38.23 235c6.86-16.06 13.48-31.55 20.13-47.09l2.35-5.48H88l2.34 5.48c2.14 5 4.25 10 6.42 15v-20.29h33.48l2.13 6 2.82 7.9 2.87-8 2.11-6h33.23v.08h39.17v-.39h34.28a30 30 0 0 1 14.71 3.52v-3.16h28.53v6.81A28.12 28.12 0 0 1 305 183c4.46-.57 8.74-.7 13.27-.86 1.93-.07 3.91-.13 6-.23l9.44-.5v.94h25.89l2.35 5.45 6.26 14.6v-19.86h28.37l2.65 4.09 3.68 5.63v-9.67Z"
      className="cls-2"
    />
    <Path
      d="M146.53 191.5h17.88v46.83h-10.3v-33.62l-1.64-.29c-4.08 11.29-8.17 22.58-12.31 34H130q-6-16.75-12.14-33.6l-1.29.18v33.29h-10.82v-46.7h18.16q5.25 14.71 10.53 29.52l1.44.25ZM422.74 238.4h-14l-19.33-29.89-1.25.38v29.36h-11v-46.71h14.5l18.84 28.91 1.36-.45v-28.41h10.84ZM251.67 222.05a12.55 12.55 0 0 1 1.87-1.35c8.53-4.15 11.92-10 10.22-17.79-1.64-7.64-7.45-11.65-16.94-11.7H221.55v47.11h11v-17.26c11.13 1.8 13 12.8 20.49 17.24h12.8c-5.07-5.79-9.56-10.93-14.17-16.25Zm-4.18-10.32c-4.64.73-9.49.23-14.83.23v-10.64c5.37 0 10.58-.47 15.64.24 1.7.26 4.38 3.62 4.15 5.19-.32 1.95-2.97 4.66-4.96 4.98ZM310.33 307.11c2.14-1 3.65-1.67 5.09-2.45 5.73-3.08 8.5-9.1 7.35-16.12-1-6.12-5.73-11.16-12.23-11.44-9.91-.47-19.84-.13-30.09-.13v46.85h11v-16.69h5.71L311.53 324h13.67c-5.2-5.89-9.89-11.23-14.87-16.89Zm-3.13-10.22c-5 .62-10.06.21-15.64.21v-10.54c5.45 0 10.66-.44 15.72.26 1.7.24 4 3.39 4.07 5.35.1 1.54-2.48 4.48-4.15 4.72ZM329.49 277h38.15v9.2h-26.81v9h26v9.4h-26v9.55h26.75v9.65h-38.09ZM212.51 238.46h-37.79v-46.88h37.79v9.18h-26.6v9.33h26.16v9.25H186V229h26.48ZM135.26 323.77v-46.88h37.9v9.35H146.4v9.08h26v9.43h-26v9.6h26.76v9.42ZM353.67 191.39h-15.41c-6.65 15.49-13.3 31-20.16 47.06h12.16c1.32-3 2.6-5.84 4.09-9.15h22.81c1.59 3.42 3 6.36 4.15 8.89h12.44c-6.89-16.06-13.51-31.47-20.08-46.8Zm-15.38 27.82c2.45-6 4.59-11.29 6.75-16.56.47 0 1 0 1.43-.05 2.14 5.29 4.31 10.56 6.76 16.61ZM82.07 191.39H66.64c-6.65 15.54-13.27 31-20.13 47.09h12.12c1.41-3.18 2.77-6.15 4.18-9.31h22.68c1.49 3.23 2.84 6.21 4.2 9.2h12.51c-6.91-16.08-13.55-31.6-20.13-46.98Zm-15.28 27.72c2.35-5.85 4.49-11.22 6.63-16.56h1.38c2.16 5.24 4.33 10.51 6.81 16.56ZM409.84 286.33h-19.55c-3.2 0-5.91.89-5.82 4.67.08 3.51 2.66 4.27 5.7 4.3q6.1.07 12.2.41c7.61.42 12.18 4.32 12.81 10.8.85 8.88-3 16-10.74 16.7-9.65.92-19.45.22-29.46.22v-9.19c7.08 0 13.82.07 20.55 0 3.45 0 8.24 1.12 8.35-4.25.11-5.71-4.83-4.49-8.44-4.66s-7.57 0-11.24-.61c-8.08-1.4-11.3-6-10.94-14.88.28-6.85 5.08-12.37 12.25-12.74 9.3-.47 18.64-.11 28.45-.11ZM419.59 323.33v-8.67c1.56-.15 3-.38 4.43-.4h17.19c3.38 0 7.31.29 7.42-4.39s-3.77-4.56-7.21-4.59c-4.05 0-8.17.15-12.16-.47-7.85-1.23-11.62-5.95-11.56-13.64.05-7.4 4.66-13.49 12.05-14 9.4-.65 18.88-.16 28.9-.16l-4.21 9.33c-6.47 0-12.63.05-18.79 0-3.33 0-6.42.65-6.59 4.49-.15 3.69 2.86 4.53 6 4.63 4.36.13 8.75 0 13.08.38 7.66.73 11.26 4.51 11.76 11.74.54 7.85-3.24 14.94-10 15.55-9.9.87-20.04.2-30.31.2ZM262.85 277.49c-10.4-.94-21-.29-31.47-.29-.21 0-.42.39-.65.63v46h10.9v-15.76c6.38 0 11.91.19 17.44-.05a14.47 14.47 0 0 0 14.26-13.58c.76-8.84-3.1-16.3-10.48-16.95Zm-5.29 20.6c-5 .36-10.07.1-15.57.1v-11.81c5.32 0 10.12-.18 14.86.08 3.24.18 5.22 2.32 5.4 5.58s-1.35 5.81-4.69 6.05ZM176.52 276.83h13.9L202 291.64l11.65-14.84h13.48c-6.51 8.18-12.42 15.63-18.56 23.34L227.42 324h-13.87c-3.78-4.8-7.64-9.7-11.88-15.1l-11.79 15.16h-13.54l18.72-23.53q-9.27-11.94-18.44-23.79ZM324.67 190.92v10.41h-10.6c-9 .06-14.06 4.74-14.28 13.26-.22 9 4.3 13.92 13.45 14.56.59 0 1.16.18 2.3.36-1.36 3.06-2.62 5.87-3.79 8.49-9.53 2-19.17-3.47-21.46-13a44 44 0 0 1-.58-17.34c1.52-8.77 7.31-14.49 16.43-15.65 5.91-.8 11.93-.75 18.53-1.09ZM270.55 191.57h10.54v46.7h-10.54Z"
      className="cls-1"
    />
    <Path d="m176.62 276.73-.09.1a.81.81 0 0 1 .09-.1Z" className="cls-1" />
  </Svg>
)
export default Amex
