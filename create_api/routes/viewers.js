const express = require('express')
const router = express.Router()
const Viewer = require('../models/viewer')



// Getting All
router.get('/', async (req, res) => {
    try{
        const viewers = await Viewer.find()
        res.json(viewers)
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})


// Getting One
router.get('/:id', getViewer, (req, res) => {
    res.json(res.viewer)
})


// Creating One
router.post('/', async (req, res) => {
    const viewer = new Viewer({
        name: req.body.name,
        viewWebsite: req.body.viewWebsite
    })
    try {
        const newViewer = await viewer.save()
        res.status(201).json(newViewer) // 201 = Successfully ceated
    } catch (error) {
        res.status(400).json({message: error.message}) //400 = user input error
    }
})


// Updating One

router.patch('/:id', getViewer, async (req, res) => {
    if (req.body.name != null){
        res.viewer.name = req.body.name
    }
    if (req.body.viewWebsite != null){
        res.viewer.viewWebsite = req.body.viewWebsite
    }

    try {
        const updatedViewer = await res.viewer.save()
        res.json(updatedViewer)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Deleting One
router.delete('/:id', getViewer, async (req, res) => {
    try {
        await res.viewer.remove()
        res.json({message: "Deleted viewer"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



// MIDDLEWARE
async function getViewer(req, res, next){
    let viewer
        try {
            viewer = await Viewer.findById(req.params.id)
            if (viewer == null){
                return res.status(404).json({message:'Cannot find such viewer'})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

    res.viewer = viewer
    next()
}


module.exports = router