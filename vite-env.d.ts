/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SCRIPT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
