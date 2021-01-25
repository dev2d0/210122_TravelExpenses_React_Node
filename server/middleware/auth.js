const { User } = require('../models/User');

let auth = (req, res, next) => {
  let token = req.cookies.w_auth;//쿠키속에 담겨있는 토큰을 이용해서 유저의 정보를 가져옴.

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    req.token = token;
    req.user = user;//가져온 유저 정보를 req.user에 넣어줌.
    next();
  });
};

module.exports = { auth };
