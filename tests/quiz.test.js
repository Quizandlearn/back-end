const chai = require('chai');
const sinon = require('sinon');
const { describe } = require('mocha');
const quizController = require('../controllers/quizzes');
const quizModel = require('../models/quiz');

const { expect } = chai;

describe('Quiz', async () => {
  describe('/POST', () => {
    afterEach(() => {
      sinon.restore();
    });
    it('should returns a status 200 when ok', async () => {
      const req = {
        body: {
          id_user_owner: 'mongooseUserId',
          title: 'Random Title',
          description: 'Random Description',
          categories: ['mongooseCategoryId'],
        },
      };
      const res = {
        resultStatus: '',
        status(s) {
          this.resultStatus = s;
          return this;
        },
        send() {
          return { message: 'Quiz créé', idQuiz: 'MongooseIdQuiz' };
        }
        ,
      };
      const saveStub = await sinon.stub(quizModel.prototype, 'save').callsFake(() => Promise.resolve());
      await quizController.postQuiz(req, res);
      expect(saveStub.calledOnce).to.be.true;
      expect(res.resultStatus).to.eq(200);
    });
    it('should returns a status 400 bad request when required parameter (ie title) is missing', async () => {
      const req = {
        body: {
          id_user_owner: 'mongooseUserId',
          description: 'Random Description',
          categories: ['mongooseCategoryId'],
        },
      };
      const res = {
        resultStatus: '',
        resultSend: '',
        status(s) {
          this.resultStatus = s;
          return this;
        },
        send(error) {
          this.resultSend = error;
          return this;
        },
      };

      const saveStub = await sinon.stub(quizModel.prototype, 'save').throws(new Error('Quiz validation failed: title: Path `title` is required.'));
      await quizController.postQuiz(req, res);
      expect(saveStub.calledOnce).to.be.true;
      expect(saveStub.threw());
      expect(res.resultStatus).to.eq(400);
      expect(res.resultSend).to.eq('Quiz validation failed: title: Path `title` is required.');
    });
  });
});
