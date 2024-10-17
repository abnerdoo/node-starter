const User = require("../../models/User")

const consts = require("../../constants/Consts")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.store = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const alreadyUser = await User.findOne({ email: email });

        if (alreadyUser) {
            return res
                .status(400)
                .json({ message: consts.messages.email_exists });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email: email ?? null,
            username: username ?? null,
            password: hashedPassword ?? null
        })

        await user.save()

        return res.status(201).json({ message: consts.messages.user_created })
    } catch (error) {
        return res.status(500).json({ message: consts.messages.common_exception })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = await req.body

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ message: consts.messages.account_not_found })
        };

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return res.status(401).json({ message: consts.messages.invalid_credentials })
        };

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ message: consts.messages.success, token: token })
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: consts.messages.common_exception })
    }
}

exports.updateModel = async (req, res) => {
    try {
        await User
            .syncIndexes()
            .then(() => {
                console.log('Indexes synchronized');
            })
            .catch((error) => {
                return res.status(500).json({ message: error.message })
            });

        return res.status(200).json({ message: consts.messages.sync_success })
    } catch (error) {
        return res.status(500).json({ message: consts.messages.common_exception })
    }
}