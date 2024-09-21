/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_AUTHORIZATION_TOKEN: string;
    REACT_APP_BACKEND_BASE_URL: string;
  }
}
