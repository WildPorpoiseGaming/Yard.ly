const express = require('express')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt-as-promised')

const Worker = require('../models/worker')

const {
  WORKERS_INDEX,
  WORKERS_SHOW,
  WORKERS_CREATE,
  WORKERS_DELETE,
  WORKERS_UPDATE,
  WORKERS_LOGIN,
  WORKERS_FILTER,
} = require('../../routes')

const router = express.Router()

router.get(WORKERS_SHOW, (req, res, next) => {
  const { id } = req.params

  Worker
    .findById(id)
    .then((worker) => {
      if (worker) {
        res.json(worker)
        return
      }
      res.sendStatus(404)
    })
    .catch(next)
})

router.get(WORKERS_INDEX, (req, res, next) => {
  Worker
    .find({})
    .then((workers) => {
      res.json(workers)
    })
    .catch(next)
})

router.post(WORKERS_CREATE, (req, res, next) => {
  const { username, password, firstName, lastName, contactInfo } = req.body
  const services = { Mowing: false, 'Tree Trimming': false, Edging: false, 'Weed Eating': false, 'Hedge Trimming': false, Fertilizing: false, Aerating: false, Mulching: false, Weeding: false, Planting: false, 'Grass Seeding': false }
  const equipment = { 'Lawn Mower': false, 'Weed Eater': false, 'Mulch Truck': false, Edger: false, 'Hedge Trimmer': false, Chainsaw: false, 'Lawn Aerator': false, Seeder: false}
  const address = { 'address': '', 'city': '', 'state': '', 'zipcode': ''}
  const center = {
              lat: 30.5168629,
              lng: -97.56841989999999
          }
  const area = ''
  bcrypt.hash(password)
    .then((hashedPW) => {
      const user = new Worker({ username, password: hashedPW, center: center, services: services, equipment: equipment, area: area, firstName, lastName, contactInfo, address: address, rate: 10, radius: 5 })
      user
        .save()
        .then((newUser) => {
          res.status(201).json(newUser)
        })
        .catch(next)
    })
})

router.post(WORKERS_LOGIN, (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  const { id } = req.params

  Worker
    .findOne({username})
    .then((worker) => {
      if (!worker) {
        console.log(user, 'no matching user was found!')
        res.status(500).send('Something broke!')
      } else {
        bcrypt.compare(password, worker.password)
          .then((isMatch) => {
            req.session.user = worker
            req.session.type = 'WORKER'
            res.send(req.session)
            console.log('this works and 12345 session is', isMatch, req.session)
          })
          .catch(bcrypt.MISMATCH_ERROR, next)
          .catch(next)
      }
    })
})

router.delete(WORKERS_DELETE, (req, res, next) => {
  const { id } = req.params

  Worker
    .findById(id)
    .then((worker) => {
      if (worker) {
        worker.remove()
          .then((deletedWorker) => {
            res.json(deletedWorker)
          })
          .catch(next)
      }
    })
})

router.put(WORKERS_UPDATE, (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.sendStatus(404)
    return
  }

  Worker
    .findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    .then((newWorker) => {
      if (newWorker) {
        res.json(newWorker)
        return
      }
      res.sendStatus(404)
    })
    .catch(next)
})

router.get(WORKERS_FILTER, (req, res, next) => {
  let { city } = req.params

  console.log('this triggered', city)

  city = city.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })

  Worker
    .find({ "area": city })
    .then((array) => {
      if(array) {
        console.log(array)
        res.json(array)
      }
      else res.sendStatus(404)
    })
    .catch(next)
})

module.exports = router
