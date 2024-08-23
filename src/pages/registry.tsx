// "use client";

// import React, { useState } from "react";
// import { useServerInsertedHTML } from "next/navigation";
// import { StyleRegistry, createStyleRegistry } from "styled-jsx";

// export default function StyledJsxRegistry({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // Only create stylesheet once with lazy initial state
//   // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
//   const [jsxStyleRegistry] = useState(() => createStyleRegistry());

//   useServerInsertedHTML(() => {
//     const styles = jsxStyleRegistry.styles();
//     jsxStyleRegistry.flush();
//     return <>{styles}</>;
//   });

//   return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>;
// }

// lib/registry.tsx
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
