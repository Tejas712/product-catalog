import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  schema: `${process.env.REACT_APP_BACKEND_BASE_URL}/graphql`,
  overwrite: true,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["./src/graphql/**/**/*.ts"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
