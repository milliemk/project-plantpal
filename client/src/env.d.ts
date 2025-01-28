/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_LOCAL_HOST: string;
  VITE_SERVER_URL: string;
  VITE_MODE: string; // explicitly type the MODE if necessary
}

interface ImportMeta {
  env: ImportMetaEnv;
}
