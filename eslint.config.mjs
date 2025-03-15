import { defineConfig } from "eslint";

export default defineConfig({
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        // เพิ่มกฎอื่นๆ ที่คุณต้องการ
      },
    },
  ],
  // ขยายการใช้งาน base config
  extends: ["next/core-web-vitals", "next/typescript"],
});
