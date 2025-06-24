import { diskStorage, memoryStorage } from "multer";
import { extname } from "path";

export const imagesUploadOptions = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const uniqueSuffix = Math.round(Math.random() * 1e5)
            const extension = extname(file.originalname)
            const customFilename = `${uniqueSuffix}${extension}`
            callback(null, customFilename)
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/webp',
            'image/png',
            'image/gif',
            'video/mp4',
            'application/pdf'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },


    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
};