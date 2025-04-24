declare module "cors" {
  import { Request, Response, NextFunction } from "express";

  type CorsOptions = {
    origin?:
      | boolean
      | string
      | RegExp
      | (string | RegExp)[]
      | ((
          origin: string | undefined,
          callback: (error: Error | null, allow?: boolean) => void
        ) => void);
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
  };

  function cors(
    options?: CorsOptions
  ): (req: Request, res: Response, next: NextFunction) => void;

  export = cors;
}
