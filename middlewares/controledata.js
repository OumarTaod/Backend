
const Joi = require('joi');

const  userSchemaJoi = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

const validates = (req, res, next) => {
    const { error } = userSchemaJoi.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: "Erreur" + error.message
        });
    }
    next();
};

module.exports = validates;