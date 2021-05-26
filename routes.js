const express = require("express");
const router = express.Router();

const {
  dispDepartments,
  dispDeptSubs,
  dispDeptSubItems
} = require('./views')

router.get('/', async (req, res, next) => {
  try {
    res.send(await dispDepartments())
  }
  catch (err) {
    next(err)
  }
})

router.get('/:parentDeptId-:parentDept', async (req, res, next) => {
  try {
    console.log("Params = ",req.params)
    console.log("ID = ",req.params.parentDeptId)
    res.send(await dispDeptSubs(req.params.parentDeptId, req.params.parentDept))
  }
  catch (err) {
    next(err)
  }
})

router.get('/:parentDeptId-:parentDept/items/:subId-:myDept', async (req, res, next) => {
  try {
    console.log(req.params)
    res.send(await dispDeptSubItems(req.params.subId, req.params.parentDept, req.params.myDept))
  }
  catch (err) {
    next(err)
  }
})

module.exports = router;