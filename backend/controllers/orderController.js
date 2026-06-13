const Order = require('../models/Order');

// @POST /api/orders — Naya order banao
const createOrder = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    try {
        console.log('Order request aayi!');

        // Check karo order items hain?
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order items nahi hain' });
        }

        const order = await Order.create({
            user: req.user._id,
            orderItems,
            totalPrice
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/orders/myorders — Apne saare orders dekho
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/orders/:id — Ek order ki detail
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order nahi mila' });
        }

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @PUT /api/orders/:id/pay — Order paid mark karo
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order nahi mila' });
        }

        order.isPaid = true;
        const updatedOrder = await order.save();
        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/orders — Saare orders (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// @PUT /api/orders/:id/deliver — Order delivered mark karo
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({ message: 'Order nahi mila' })
        }

        order.isDelivered = true
        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};



module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    getAllOrders,          // ← add karo
    updateOrderToDelivered // ← add karo
};