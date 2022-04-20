const express = require('express')
const res = require('express/lib/response')
const router = express()
const Variation = require('../models/variation.js')

router.get('/', async (req, res)=>{
    console.log("index")
    try{
        const variations = await Variation.find()
        res.send({
            status: 200,
            success: true,
            data: variations,
        })
    }catch(err){
        res.send({
            status: 500,
            success: false,
            data: err.message
        })
    }
})
router.post('/', async (req, res)=>{
    try{
    const newvariation = await Variation.create(req.body)
    console.log(newvariation)
    res.send({
        success: true,
        data: newvariation
    })

}catch(err){
    res.send({
        success: false,
        data: err.message
    })
}
})
router.get('/:id', async (req, res)=>{
    try{
        const variation = await Variation.findById(req.params.id)
        if(!variation){
            throw new Error('no Variation available here')
        }
        res.send({
            success: true,
            data: variation
        })
    }catch(err){
        res.send({
            success:false,
            data: err.message
        })
    }
})
router.delete('/:id', async (req, res)=>{
    try{
        const variation = await Variation.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            data: variation
        })
    }catch(err){
        res.send({
            success:false,
            data: err.message
        })
    }
})
router.put('/:id', async (req, res)=>{
    try{
        const variation = await Variation.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send({
            success: true,
            data: variation
        })
    }catch(err){
        res.send({
            success:false,
            data: err.message
        })
    }
})

module.exports = router