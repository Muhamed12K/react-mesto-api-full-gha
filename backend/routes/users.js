const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const {
  getUsersInfo,
  getCurrentUserInfo,
  getUserInfoId,

  updateUserAvatar,
  updateUser,
} = require('../controllers/users');

// add patch

router.get('/', getUsersInfo);
router.get('/me', getCurrentUserInfo);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserInfoId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(URL_REGEX),
  }),
}), updateUserAvatar);

module.exports = router;
