const { user, board } = require('../../models'); //테이블 접근

module.exports = {
  signin: async (req, res) => {
    // TODO : login  1.입력값 없을때 처리
    const { email, password } = req.body;
    try {
      let response = await user.findOne({
        where: {
          email,
          password,
        },
      });
      if (!response) {
        res.status(400).json({
          data: null,
          message: 'not authorized',
        });
      } else {
        req.session.userId = response.id;
        res.status(200).json({
          data: response.id,
          message: 'Ok',
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  signup: async (req, res) => {
    // TODO : join   같은 이메일 확인
    const { email, password, userName } = req.body;

    try {
      let checkMail = await user.findOne({
        where: {
          email,
        },
      });
      if (checkMail) {
        res.status(409).json({
          data: checkMail,
          message: 'duplication email',
        });
      } else {
        await user.create({
          email,
          password,
          userName,
        });
        res.status(201).json({ message: 'OK' });
      }
    } catch (err) {
      console.log(err);
    }
  },

  signout: (req, res) => {
    // TODO : logout
    console.log('check sign out');
    req.session.destroy();
    res.status(205).json({ message: 'logout success!!' });
  },

  info: async (req, res) => {
    // TODO : userInfo
    try {
      if (!req.session.userId) {
        res.status(401).json({ message: 'not Authorized' });
      } else {
        const userInfo = await user.findOne({
          where: {
            id: req.session.userId,
          },
        });

        const boardInfo = await board.findAll({
          where: {
            userId: req.session.userId,
            isDelete: 1,
          },
        });
        res.status(200).json({
          userInfo,
          boardInfo,
          message: 'OK',
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
