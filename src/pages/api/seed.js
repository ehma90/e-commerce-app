const { default: data } = require("@/utilities/data")
const { default: db } = require("@/utilities/db")
const { default: User } = require("models/user")

const handler = async (req, res) => {
    await db.connect()
    await User.deleteMany()
    await User.insertMany(data.users)
    await db.disconnect()
    const datas = data.users
    res.send({datas, message: "seeded Successfully"})
}

export default handler