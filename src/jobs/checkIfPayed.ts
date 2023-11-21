import BasketResponse from '@/interfaces/basketResponse';
import { logger, tebex } from '..';
import invoces from '@/tebex/invoces';
import * as jose from 'jose';
import axios from 'axios';

const checkIfPayed = async () => {
  logger.debug('Checking if payed...');
  invoces.getPendingPayments().forEach((id) => {
    logger.debug(`Checking ${id}...`);
    check(id);
  });
};

const check = async (id: string) => {
  let basket = invoces.getPendingPayment(id);
  
  try {
    await tebex
      .getBasket()
      .get(basket.ident)
      .then((b) => {
        b = b as BasketResponse;
        if (b.links.payment) {
          logger.debug(`${id} is payed!`);
          invoces.deletePendingPayment(id);
          sendWebhook(id, b);
        }
      })
      .catch((err) => {
        logger.error(err);
      });
  } catch (err) {
    logger.error('An error occured while checking if payed!');
    console.error(err);
  }
};

const sendWebhook = async (id: string, basket: BasketResponse) => {
  let secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = 'HS256';
  let jwt = await new jose.SignJWT({ id, basket })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('5m')
    .sign(secret);

  await axios
    .post(process.env.WENHOOK_URL || '', {
      jwt,
    })
    .then(() => {
      logger.debug('Webhook sent!');
    })
    .catch((err) => {
      logger.error('Error sending webhook!');
      logger.error(err);
    });
};

export default checkIfPayed;
