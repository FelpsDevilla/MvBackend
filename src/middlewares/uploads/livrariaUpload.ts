import { Request } from 'express';
import multer from 'multer';

const basePath = "public/data/uploads/livraria";

const storageImages = multer.diskStorage({
  destination: `${basePath}/images`,
  filename: (_: Request, file: Express.Multer.File, cb) => {
    const uniqueName = `${Date.now()}.${file.originalname}`;
    cb(null, uniqueName);
  },
}
);

const storageBooks = multer.diskStorage({
    destination: `${basePath}/books`,
    filename: (_: Request, file: Express.Multer.File, cb) => {
      const uniqueName = `${Date.now()}.${file.originalname}`;
      cb(null, uniqueName);
    },
  }
  );

export const LivrariaUploadImage = multer({storage: storageImages});
export const LivrariaUploadBook = multer({storage: storageBooks});