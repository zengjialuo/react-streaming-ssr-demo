/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "../src/App";
import { API_DELAY, ABORT_DELAY } from "./delays";
import { Transform } from "stream";

// In a real setup, you'd read it from webpack build stats.
let assets = {
  "main.js": "/main.js",
  "main.css": "/main.css"
};

module.exports = async function render(url, req, res) {
  const transform = new Transform({
    transform(chunk, _encoding, callback) {
      try {
        const temp = chunk.toString();
        console.log("receive chunk: " + temp);
        this.push(chunk);
        callback();
      } catch (e) {
        if (e instanceof Error) {
          callback(e);
        } else {
          callback(new Error("Received unkown error when streaming"));
        }
      }
    }
  });

  // The new wiring is a bit more involved.
  res.socket.on("error", (error) => {
    console.error("Fatal", error);
  });
  let didError = false;
  const data = createServerData();

  const stream = renderToPipeableStream(<App assets={assets} />, {
    bootstrapScripts: [assets["main.js"]],
    onShellReady() {
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");
      stream.pipe(transform).pipe(res);
      // stream.pipe(res);
    },
    onError(x) {
      didError = true;
      console.error(x);
    }
  });
  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(() => stream.abort(), ABORT_DELAY);
};

// Simulate a delay caused by data fetching.
// We fake this because the streaming HTML renderer
// is not yet integrated with real data fetching strategies.
function createServerData() {
  let done = false;
  let promise = null;
  return {
    read() {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise((resolve) => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve();
        }, API_DELAY);
      });
      throw promise;
    }
  };
}
