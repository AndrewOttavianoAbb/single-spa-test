import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@testing/remote1",
  app: () => import("remote/testing-remote1"),
  activeWhen: ["/"]
});

start({
  urlRerouteOnly: true,
});
