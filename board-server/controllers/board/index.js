const { user, board, Sequelize } = require('../../models');
module.exports = {
  addPost: async (req, res) => {
    // TODO : 글 작성 => 제목, 내용 session값이 존재할 때 작성(o) / 아닐 때 로그인하세요
    try {
      if (!req.session.userId) {
        res.status(401).json({ message: 'not authorized' });
      } else {
        const { title, content } = req.body;
        await board.create({
          title,
          content,
          userId: req.session.userId,
        });

        res.status(201).send({ message: 'ok' });
      }
    } catch (err) {
      console.log(err);
    }
  },

  readPost: async (req, res) => {
    // TODO : 전체목록 (제목, 작성자, 조회수, 좋아요)
    // 작성자를 알려주기 위해선 user테이블도 조회

    let boardInfo = await board.findAll({
      include: [
        {
          model: user,
          attributes: ['userName'],
        },
      ],
      where: {
        isDelete: 1,
      },
    });

    res.status(200).json({
      data: boardInfo,
    });
  },

  detailPost: async (req, res) => {
    // TODO : 글 상세정보
    //이 요청이 들어올때는 클라이언트에서 onClick이벤트 발생 시
    const { id } = req.body;
    let response = await board.findOne({
      include: [
        {
          model: user,
          attributes: ['userName'],
        },
      ],
      where: {
        id,
      },
    });
    res.status(201).json({ data: response });
  },

  updatePost: async (req, res) => {
    // TODO : 제목, 내용 바뀐거 수정
    try {
      if (!req.session.userId) {
        res.status(400).json({
          message: 'login first',
        });
      } else {
        const { title, content } = req.body;
        await board.update(
          {
            title,
            content,
            updatedAt: Sequelize.DATE,
          },
          {
            where: {
              userId: req.session.userId,
            },
          }
        );
        res.status(201).json({ message: 'update ok' });
      }
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    // TODO : board테이블에서 해당제목 컬럼 isDelete 바꿔주기 => 0
    const { id } = req.body;
    if (!req.session.userId) {
      res.status(400).json({ message: 'not authorized' });
    } else {
      await board.update(
        { isDelete: 0 },
        {
          where: {
            id,
            userId: req.session.userId,
          },
        }
      );
      res.status(200).json({ message: 'OK' });
    }
  },
};
