import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { tebex } from '..';
import invoces from '@/tebex/invoces';
const router = Router();

router.post(
  '/checkout',
  body('order_id'),
  body('price').isNumeric(),
  body('return_url').isString(),
  body('items').isArray(),
  body('items.*.name').isString(),
  body('items.*.price').isNumeric(),
  body('items.*.quantity').isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const items = req.body.items.map((item) => ({
      type: 'single',
      package: {
        name: item.name,
        price: item.price,
      },
      qty: item.quantity,
    }));

    await tebex
      .getCheckout()
      .create(
        {
          cancel_url: req.body.return_url,
          return_url: req.body.return_url || '',
        },
        items,
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
