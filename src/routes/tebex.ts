import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { tebex } from '..';
import invoces from '@/tebex/invoces';
const router = Router();

router.post(
  '/checkout',
  body('order_id').isString(),
  body('price').isNumeric(),
  body('return_url').isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await tebex
      .getCheckout()
      .create(
        {
          cancel_url: req.body.return_url,
          return_url: req.body.return_url || '',
        },
        [
          {
            type: 'single',
            package: {
              name: req.body.order_id,
              price: req.body.price,
            },
          },
        ],
      )
      .then((checkout) => {
        res.json(checkout);
        invoces.setPendingPayment(req.body.order_id, checkout);
      })
      .catch((err) => {
        res.json(err);
      });
  },
);

export default router;
