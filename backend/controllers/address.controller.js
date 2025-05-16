import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
    try {
        const userId = req.userId;
        const {  fullName, mobile, addressLine, city, state, pincode, country, landmark } = req.body;
        const createAddress = new AddressModel({
            user: userId,
            fullName,
            mobile,
            addressLine,
            city,
            state,
            pincode,
            country,
            landmark
        });

        const saveAddress = await createAddress.save();
        const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
            $push: { address_details: saveAddress._id }
        });

        return res.status(201).json({
            success: true,
            error: false,
            message: "Address created successfully",
            data: saveAddress
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Address not created",
           
        });
    }
}
export const getAddressController = async (req, res) => {
    try {
        const userId = req.userId;
        const getAddress = await AddressModel.find({ user: userId }).sort({ createdAt: -1 });
        if (!getAddress) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Address not found",
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            message: "Address fetched successfully",
            data: getAddress
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Address not fetched",
        });
    }
}
export const updateAddressController = async (req, res) => {
    try {
        const userId = req.userId;
        const { addressId, fullName, mobile, addressLine, city, state, pincode, country, landmark } = req.body;
        const updateAddress = await AddressModel.updateOne({_id:addressId,user:userId}, {
            fullName,
            mobile,
            addressLine,
            city,
            state,
            pincode,
            country,
            landmark
        } );

        return res.status(200).json({
            success: true,
            error: false,
            message: "Address updated successfully",
            data: updateAddress
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Address not updated",
        });
    }
}
export const deleteAddressController = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("User Id in delete Address ",userId)
        const { addressId } = req.body;
        console.log("Address Id ",addressId)
        const disableAddress = await AddressModel.deleteOne({ _id: addressId, user: userId });
        return res.status(200).json({
            success: true,
            error: false,
            message: "Address deleted successfully",
            data: disableAddress
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Address not deleted",
        });
    }

}

