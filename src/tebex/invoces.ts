import BasketResponse from '@/interfaces/basketResponse';
import NodeCache from 'node-cache';
const pendingPayments = new NodeCache({ stdTTL: 60 * 60 });
const ids = new Set<string>();

export const getPendingPayment = (id: string) : BasketResponse => {
  return pendingPayments.get(id) as BasketResponse;
};

export const setPendingPayment = (id: string, payment: BasketResponse) : void => {
  ids.add(id);
  pendingPayments.set(id, payment);
};

export const deletePendingPayment = (id: string) : void => {
  pendingPayments.del(id);
  ids.delete(id);
};

pendingPayments.on('expired', (key) => {
  ids.delete(key);
});

export const getPendingPayments = () : string[] => {
  return Array.from(ids);
};

export default {
  getPendingPayment,
  setPendingPayment,
  deletePendingPayment,
  getPendingPayments,
};
