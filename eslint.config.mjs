import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off', // ปิด rule การใช้งาน empty object type
      '@typescript-eslint/no-unused-vars': 'warn', // แสดง warning หากมีตัวแปรที่ไม่ได้ใช้งาน
      // เพิ่มหรือปรับแต่งกฎอื่น ๆ ที่คุณต้องการ
    },
  },
];

export default eslintConfig;
