import Joi from "joi";

export const userAddSchema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().required()
})
export const eventAddSchema = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required(), 
    eventDate :   Joi.date().iso().greater("now").required(),
    totalCapacity : Joi.number().integer().required()
})

export const bookeventSchema = Joi.object({
    userId : Joi.number().integer().required(),
    eventId : Joi.number().integer().required(),
    tickets_count : Joi.number().integer().required(),
})

export const attendanceSchema = Joi.object({
    code : Joi.string().required(),
})


