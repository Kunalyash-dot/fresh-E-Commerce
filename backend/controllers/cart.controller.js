import CartProductModel from "../models/cartProduct.model.js";
import UserModel from '../models/user.model.js'
export const addToCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required', error: true, success: false });
        }
        const checkItemCart = await CartProductModel.findOne({ userId, productId });
        if (checkItemCart) {
            return res.status(400).json({ message: 'Product already in cart', error: true, success: false });
        }
        const cartItem = new CartProductModel({ userId, productId, quantity: 1 });
        const savedCartItem = await cartItem.save();
        const UpdateCartUser = await UserModel.updateOne({ _id: userId }, { $push: { shopping_cart: productId } })
        return res.status(200).json({ message: 'Product added to cart', data: savedCartItem, success: true, error: false });
    } catch (error) {
        return res.status(500).json({ message: error.message || error, error: true, success: false });
    }
}
export const getCartItemsController = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await CartProductModel.find({ userId }).populate('productId');
        if (!cartItems || cartItems.length === 0) {
            return res.status(200).json({ message: 'No items in cart',data: cartItems, error: false, success: true });
        }
        return res.status(200).json({ message: 'Cart items retrieved successfully', data: cartItems, success: true, error: false });
    } catch (error) {
        return res.status(500).json({ message: error.message || error, error: true, success: false });
    }
}
export const updateCartItemQtyController = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required', error: true, success: false });
        }
        const cartItem = await CartProductModel.findOne({ _id: productId, userId });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found', error: true, success: false });
        }
        cartItem.quantity = quantity;
        const updatedCartItem = await cartItem.save();
        return res.status(200).json({ message: 'Cart item quantity updated successfully', data: updatedCartItem, success: true, error: false });
    } catch (error) {
        return res.status(500).json({ message: error.message || error, error: true, success: false });
    }

}
export const removeCartItemQtyController = async (req, res) => {
    //console.log("working")
    try {
        const userId = req.userId;
        const { productId } = req.body;
        //console.log("ProductId", productId );

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required', error: true, success: false });
        }
        const cartItem = await CartProductModel.findOne({ _id: productId, userId });
        //console.log("cart Item", cartItem);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found', error: true, success: false });
        }
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            const updatedCartItem = await cartItem.save();
            return res.status(200).json({ message: 'Cart item quantity decreased successfully', data: updatedCartItem, success: true, error: false });
        } else {
            await CartProductModel.deleteOne({ userId, _id: productId });
            return res.status(200).json({ message: 'Cart item removed successfully', success: true, error: false });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message || error, error: true, success: false });
    }
}