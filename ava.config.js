export default {
  babel: {
    extensions: [
      "ts",
      "tsx",
    ],
    testOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  files: [
    "**/__ava__/*.test.ts",
    "**/__ava__/*.test.tsx",
  ],
};
