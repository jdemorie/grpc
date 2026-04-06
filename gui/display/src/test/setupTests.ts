import "@testing-library/jest-dom";

// Polyfills nécessaires pour certaines dépendances (ex: react-router) dans l'environnement Jest/jsdom.
// On évite d'importer des modules Node ici, car ce fichier est inclus dans le build TS de l'app.
// Dans Jest (CommonJS), on peut récupérer TextEncoder/TextDecoder via require("util").
declare const require: any;

if (typeof globalThis.TextEncoder === "undefined" || typeof globalThis.TextDecoder === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {TextEncoder, TextDecoder} = require("util");
    // @ts-ignore - ajout sur globalThis pour l'environnement de test
    globalThis.TextEncoder ??= TextEncoder;
    // @ts-ignore - ajout sur globalThis pour l'environnement de test
    globalThis.TextDecoder ??= TextDecoder;
}

