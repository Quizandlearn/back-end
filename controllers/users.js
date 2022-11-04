const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res) => bcrypt
  .hash(req.body.password, 10)
  .then((hash) => {
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({ message: 'Utilisateur créé !' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  })
  .catch((error) => {
    res.status(500).json({ error });
  });

exports.login = (req, res) => User.findOne({ email: req.body.email })
  .then((user) => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    return bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        return res.status(200).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h',
          }),
        });
      })
      .catch((error) => res.status(500).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));

exports.getUser = async (req, res) => {
  await User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      return res.status(200).send(user);
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyUser = async (req, res) => {
  const userToModify = new User({
    _id: req.params.id,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  });

  await User.updateOne({ _id: req.params.id }, userToModify)
    .then(() => {
      res.status(200).json({
        message: 'User updated successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      });
    });
};

exports.modifyPassword = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  async function passwordValidation() {
    try {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        user.password,
      );
      if (!matchPassword) {
        return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      return true;
    } catch (error) {
      res.status(500).json({ error });
    }

    return undefined;
  }

  const isValidPassword = await passwordValidation();

  if (isValidPassword === true) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

      const passwordToUpdate = new User({
        _id: req.params.id,
        password: hashedPassword,
      });

      await User.updateOne({ _id: req.params.id }, passwordToUpdate);
      return res
        .status(200)
        .json({ message: 'Mot de passe a été mis a jour!' });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  return undefined;
};

exports.modifyUserCreatedQuizzes = async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    { $push: { created_quizzes: req.body.created_quizzes } },
  ).then(() => {
    res.status(200).json({
      message: 'Created_quizzes updated successfully!',
    });
  }).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
};

exports.modifyUserAnsweredQuizzes = async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    { $push: { answered_quizzes: req.body.answered_quizzes } },
  ).then(() => {
    res.status(200).json({
      message: 'Answered_quizzes updated successfully!',
    });
  }).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
};

exports.modifyUserFavoriteQuizzes = async (req, res) => {
  await User.updateOne(
    { _id: req.params.id },
    { $push: { favorite_quizzes: req.body.favorite_quizzes } },
  ).then(() => {
    res.status(200).json({
      message: 'Favorite_quizzes updated successfully!',
    });
  }).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
};
