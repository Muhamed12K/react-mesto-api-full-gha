const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const { URL_REGEX } = require('../utils/constants');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Введите электронную почту',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
      minlength: 6,
    },

    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      validate: {
        validator(name) {
          return name.length >= 2 && name.length <= 30;
        },
        message: 'Имя пользователя должно содержать от 2 до 30 символов',
      },
    },

    about: {
      type: String,
      default: 'Исследователь',
      validate: {
        validator(about) {
          return about.length >= 2 && about.length <= 30;
        },
        message: 'Информация о пользователе должна содержать от 2 до 30 символов',
      },
    },

    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => URL_REGEX.test(url),
        message: 'Требуется ввести URL',
      },
    },
  },

  {
 //   versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this
          .findOne({ email })
          .select('+password')
          .then((user) => {
            console.log(user);
            if (user) {
              return bcrypt.compare(password, user.password)
                .then((matched) => {
                  if (matched) return user;

                  return Promise.reject();
                });
            }

            return Promise.reject();
          });
      },
    },

  },
);

module.exports = mongoose.model('user', userSchema);
