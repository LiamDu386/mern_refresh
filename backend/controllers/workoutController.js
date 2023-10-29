const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {

    }
}

// get a single workout
const getWorkout = async (req, res) => {
    try {
        const {id} = req.params

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such workout!"})
        }
        const workout = await Workout.findById(id)
        res.status(200).json(workout)
    } catch (error) {
        return res.status(404).json({error: "No such workout"})
    }
}

// create a new workout
const createWorkout = async (req, res) => {
    try {
        const {title, load, reps} = req.body
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such workout!"})
        }

        const workout = await Workout.findOneAndDelete({_id: id})
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such workout!"})
        }

        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(workout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}