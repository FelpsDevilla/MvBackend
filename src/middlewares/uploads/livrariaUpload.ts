import { config } from '@/config';
import { Request } from 'express';
import multer from 'multer';

const storageImages = multer.diskStorage({
  destination: config.filesPath.LivrariaImages,
  filename: (_: Request, file: Express.Multer.File, cb) => {
    const uniqueName = `${Date.now()}.${file.originalname}`;
    cb(null, uniqueName);
  },
}
);

const storageBooks = multer.diskStorage({
    destination: config.filesPath.LivrariaBooks,
    filename: (_: Request, file: Express.Multer.File, cb) => {
      const uniqueName = `${Date.now()}.${file.originalname}`;
      cb(null, uniqueName);
    },
  }
  );

export const livrariaUploadImage = multer({storage: storageImages});
export const livrariaUploadBook = multer({storage: storageBooks});