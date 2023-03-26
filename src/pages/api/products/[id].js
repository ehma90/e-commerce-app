const { default: db } = require("@/utilities/db")
const { default: Product } = require("models/Product")
const mongoose = require('mongoose');

const handler = async (req, res) => {
    console.log(req.query.id);
    await db.connect()
    const product = await Product.findById(mongoose.Types.ObjectId(req.query.id)).lean();
    await db.disconnect()
    res.send(product)
}

export default handler