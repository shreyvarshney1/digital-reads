import prisma from '@/lib/prisma';

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prisma.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          book: true,
        },
      },
    },
  });

  const totoalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.book.price.toNumber();
    }, 0);

    return total + orderTotal;
  }, 0);

  return totoalRevenue;
};
