import { Request } from 'express';
import multer from 'multer';

const storageImages = multer.diskStorage({
  destination: "public/data/uploads/acervo/images",
  filename: (_: Request, file: Express.Multer.File, cb) => {
    const uniqueName = `${Date.now()}.${file.originalname}`;
    cb(null, uniqueName);
  },
}
);

export const acervoUploadImages = multer({storage: storageImages});