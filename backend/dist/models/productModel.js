"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    images: [String],
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 5
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });
productSchema.pre('save', function (next) {
    this.category = this.category.toLowerCase();
    this.subCategory = this.subCategory.toLowerCase();
    next();
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
