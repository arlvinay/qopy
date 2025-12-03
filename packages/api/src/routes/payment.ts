import { Router } from 'express';
import Razorpay from 'razorpay';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const router = Router();
const prisma = new PrismaClient();

// Initialize Razorpay
// NOTE: Ensure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are in .env
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder',
});

// Create Order Endpoint
router.post('/create-order', async (req, res) => {
    try {
        const { amount, userId } = req.body;

        if (!amount || !userId) {
            return res.status(400).json({ error: 'Amount and userId are required' });
        }

        // Create Razorpay Order
        const options = {
            amount: Math.round(amount * 100), // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save order to database
        const dbOrder = await prisma.order.create({
            data: {
                amount: Math.round(amount),
                currency: 'INR',
                status: 'PENDING',
                razorpayOrderId: order.id,
                userId: userId,
            },
        });

        res.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            dbOrderId: dbOrder.id,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Webhook Endpoint
router.post('/webhook', async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'webhook_secret_placeholder';
    const signature = req.headers['x-razorpay-signature'] as string;

    if (!signature) {
        return res.status(400).send('Missing signature');
    }

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === signature) {
        const event = req.body.event;
        const payload = req.body.payload;

        if (event === 'payment.captured') {
            const payment = payload.payment.entity;
            const orderId = payment.order_id;

            // Update order status
            await prisma.order.updateMany({
                where: { razorpayOrderId: orderId },
                data: { status: 'PAID' },
            });

            console.log(`Order ${orderId} marked as PAID`);
        }

        res.json({ status: 'ok' });
    } else {
        res.status(400).send('Invalid signature');
    }
});

export default router;
