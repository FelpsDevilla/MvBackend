import { Request } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: "public/data/uploads/acervo",
    filename: (_: Request, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    }
  });

  export const acervoUpload = multer({ storage });