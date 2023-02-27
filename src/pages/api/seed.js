const { default: data } = require("@/utilities/data")
const { default: db } = require("@/utilities/db")
const { default: User } = require("models/user")
const { default: mongoose } = require("mongoose")

const handler = async (req, res) => {
    await db.connect()
    await User.deleteMany()
    await User.insertMany(data.users)
    await db.disconnect()
    res.send({message: "seeded Succesfully"})
} 

export default handler