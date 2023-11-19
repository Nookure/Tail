import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({
    name: 'tail',
    version: process.env.npm_package_version,
    message: 'Welcome to tail!'
  });
});


export default router;
