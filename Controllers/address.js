import { Address } from '../Models/Address.js'

export const addAdrress = async (req, res) => {
    let { fullName, address, city, state, country, pincode, phoneNumber } = req.body;
    let userId = req.user;
    let userAdrress = await Address.create({
        userId, fullName, address, city, state, country, pincode, phoneNumber
    });
    res.json({ message: "address Addedd", userAdrress, success: true });

}

export const getAddress = async (req, res) => {
    let userId = req.user;
    let address =await Address.find({ userId }).sort({ createdAt: -1 });
    res.json({ message: 'address', userAddress: address[0]  , success: true })


}