import User from '../models/User';

class UserController {
  async store(req, resp) {
    const { email } = req.body;

    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      return resp.status(400).json({ error: 'Duplicated email' });
    }

    const user = await User.create(req.body);

    return resp.json(user);
  }
}

export default new UserController();
