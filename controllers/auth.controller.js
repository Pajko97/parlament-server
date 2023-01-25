const { Language, LoginType } = require('@prisma/client')
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()

const register = async (req, res) => {
    const saltRounds = 12;
    let user;

    const hashedPassword = bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        if(err) {
            res.status(500).send('Failed to encrypt password')
        }
            user = await prisma.User.create({
                data: {
                    email : req.body.email,
                    password: hash,
                    phone: req.body.phone,
                    loginType : LoginType.TRADITIONAL,
                    createdAt : new Date(Date.now()),
                    lastLogin:  new Date(Date.now()),
                    exp: 0,
                    prefLanguage : req.body.prefLanguage
                }
            })

            res.status(200).send(user)
    });


}

const login = async (req, res) => {
    const user = await prisma.User.findUnique({
        where : {
            email : req.body.email
        }
    })

    bcrypt.compare(req.body.password, user.password).then((result) => {
        if(result == true) {
            res.status(200).send(user)
        } else {
            res.status(401).send('Wrong password')
        }
    })

}

module.exports = {
    register,
    login
}