import { config } from '@/config';
import { Request } from 'express';
import multer from 'multer';

const storageImages = multer.diskStorage({
  destination: config.filesPath.libraryImages,
  filename: (_: Request, file: Express.Multer.File, cb) => {
    const uniqueName = `${Date.now()}.${file.originalname}`;
    cb(null, uniqueName);
  },
}
);

const storageBooks = multer.diskStorage({
    destination: config.filesPath.libraryBooks,
    filename: (_: Request, file: Express.Multer.File, cb) => {
      const uniqueName = `${Date.now()}.${file.originalname}`;
      cb(null, uniqueName);
    },
  }
  );

export const libraryUploadImage = multer({storage: storageImages});
export const libraryUploadBook = multer({storage: storageBooks});