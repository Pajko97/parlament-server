const prisma = require('../db/prisma')


const createReservation = async (req, res) => {

    const reservation = await prisma.reservation.create({
        data: {
            user : req.body.user,
            slots : req.body.slots,
            discount : req.body.discount
        }
    })
    .catch(err => {
        res.status(500).send(`DB Error: ${err}`)
    })
    res.status(200).send(updateReservation)


}

const updateReservation = async (req, res) => {

    const updateReservation = await prisma.reservation.update({
        where : {
            id : req.body.id
        },
        data : {
            status: req.body.status
        }
    }).catch(err => {
        res.status(500).send(`DB Error: ${err}`)
    })

    res.status(200).send(updateReservation)
}

module.exports = {
    createReservation,
    updateReservation
}