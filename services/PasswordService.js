const bcrypt = require('bcrypt');
const User = require('../models/user');

const checkPasswordMatch = async (user, rawPassword, res) => {
  try {
    const matchPassword = await bcrypt.compare(rawPassword, user.password);

    if (!matchPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }
  } catch (error) {
    return res.status(401).json({ error });
  }

  return undefined;
};

const updateUserPassword = async (req) => {
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

  const passwordToUpdate = new User({
    _id: req.params.id,
    password: hashedPassword,
  });

  await User.updateOne({ _id: req.params.id }, passwordToUpdate);
};

module.exports = { checkPasswordMatch, updateUserPassword };
