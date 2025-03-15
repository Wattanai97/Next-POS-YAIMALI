import Cors from "cors";

// สร้าง middleware CORS
const cors = Cors({
  origin: "*", // เปลี่ยนเป็น "https://pos-yaimali.vercel.app" ถ้าต้องการความปลอดภัย
  methods: ["GET", "POST", "OPTIONS"],
});

export function runMiddleware(req: any) {
  return new Promise((resolve, reject) => {
    cors(req, {}, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}
