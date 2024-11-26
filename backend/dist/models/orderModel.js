"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    shippingInfo: {
        phone: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zipCode: {
            type: Number,
            required: true
        },
    },
    orderItems: [
        {
            title: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
        }
    ],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    shippingAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: [true, "Please select payment method"],
        enum: {
            values: ["COD", "Card"],
            message: "Please select correct payment method"
        }
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing"
    },
    orderRemarks: {
        type: String,
    },
    deliverdAt: {
        type: Date,
    }
}, { timestamps: true });
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
