import { Router, Request, Response } from 'express';
import { upload } from '../utils/cloudinary';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

// POST /api/upload — Upload image to Cloudinary and return URL
router.post('/', protect, authorize('ADMIN'), (req: Request, res: Response) => {
  upload.single('image')(req, res, (err: any) => {
    if (err) {
      console.error('[Upload] Multer error:', err);
      return res.status(400).json({ status: 'error', message: `Upload error: ${err.message || 'Unknown error'}` });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No file provided' });
      }

      const imageUrl = req.file.path;
      console.log('[Upload] Cloudinary success:', imageUrl);

      res.status(200).json({
        status: 'success',
        message: 'Image uploaded successfully',
        data: {
          url: imageUrl,
          filename: req.file.filename,
        }
      });
    } catch (error: any) {
      console.error('[Upload] Cloudinary error:', error.message);
      res.status(500).json({ status: 'error', message: `Upload failed: ${error.message}` });
    }
  });
});

export default router;