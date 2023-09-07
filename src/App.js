import { Suspense, lazy } from "react";

const Content = lazy(() => import("./Content"));

export default function App() {
  return (
    <html>
      <head></head>
      <body>
        <div>App shell</div>
        <Suspense fallback={<div>Loading content...</div>}>
          <Content />
        </Suspense>
      </body>
    </html>
  );
}
