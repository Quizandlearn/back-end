const bcrypt = require('bcrypt');
const chai = require('chai');
const sinon = require('sinon');
const { describe } = require('mocha');
const userController = require('../controllers/users');
const UserTest = require('../models/user');

const { expect } = chai;

describe('User', async () => {
  describe('/POST signup', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should returns a status 201 when signup', async () => {
      const req = {
        body: {
          name: 'name',
          surname: 'surname',
          email: 'userTest@gmail.com',
          password: 'motdepass',
        },
      };
      const res = {
        resultStatus: '',
        status(s) {
          this.resultStatus = s;
          return this;
        },
        json() {
          return { message: 'Utilisateur créé !' };
        },
      };

      const saveStub = await sinon.stub(UserTest.prototype, 'save').callsFake(() => Promise.resolve());
      const bcryptHashStub = await sinon.stub(bcrypt, 'hash').callsFake(() => Promise.resolve('hash'));
      await userController.signup(req, res);
      expect(saveStub.calledOnce).to.be.true;
      expect(bcryptHashStub.calledOnce).to.be.true;
      expect(res.resultStatus).to.eq(201);
    });

    it('should returns a status 400 if email already exist when signup', async () => {
      const req = {
        body: {
          name: 'name',
          surname: 'surname',
          email: 'userTest@gmail.com',
          password: 'motdepass',
        },
      };
      const res = {
        resultStatus: '',
        status(s) {
          this.resultStatus = s;
          return this;
        },
        json() {
          return { message: 'some error message !' };
        },
      };

      const saveStub = await sinon.stub(UserTest.prototype, 'save').callsFake(() => Promise.reject());
      const bcryptHashStub = await sinon.stub(bcrypt, 'hash').callsFake(() => Promise.resolve('hash'));
      await userController.signup(req, res);
      expect(saveStub.calledOnce).to.be.true;
      expect(bcryptHashStub.calledOnce).to.be.true;
      expect(saveStub.threw());
      expect(res.resultStatus).to.eq(400);
    });

    it('should returns a status 500 if cant\' brcypt', async () => {
      const req = {
        body: {
          name: 'name',
          surname: 'surname',
          email: 'userTest@gmail.com',
          password: 'motdepass',
        },
      };
      const res = {
        resultStatus: '',
        status(s) {
          this.resultStatus = s;
          return this;
        },
        json() {
          return { message: 'some error message !' };
        },
      };
      const saveStub = await sinon.stub(UserTest.prototype, 'save').callsFake(() => Promise.resolve());
      const bcryptHashStub = await sinon.stub(bcrypt, 'hash').callsFake(() => Promise.reject());
      await userController.signup(req, res);
      expect(saveStub.calledOnce).to.be.false;
      expect(bcryptHashStub.calledOnce).to.be.true;
      expect(bcryptHashStub.threw());
      expect(res.resultStatus).to.eq(500);
    });
  });

  describe('/POST login', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should returns a status 200 if user can login', async () => {
      const req = {
        body: {
          name: 'name',
          surname: 'surname',
          email: 'userTest@gmail.com',
          password: 'motdepass',
        },
      };
      const res = {
        resultStatus: '',
        status(s) {
          this.resultStatus = s;
          return this;
        },
        json() {
          return {
            userId: 'id',
            token: 'token',
          };
        },
      };

      const user = {
        password: 'motdepass',
        _id: 'id',
      };
      const findOneStub = await sinon.stub(UserTest, 'findOne').callsFake(() => Promise.resolve(user));
      const bcryptCompareStub = await sinon.stub(bcrypt, 'compare').callsFake(() => Promise.resolve(true));
      await userController.login(req, res);
      expect(findOneStub.calledOnce).to.be.true;
      expect(bcryptCompareStub.calledOnce).to.be.true;
      expect(res.resultStatus).to.eq(200);
    });

    it('should returns a status 401 if wrong password', async () => {
      const req = {
        body: {
          name: 'name',
          surname: 'surname',
          email: 'userTest@gmail.com',
          password: 'motdepass',
        },
      };
      const res = {
        resultStatus: '',
        status(s) {
          this.resultStatus = s;
          return this;
        },
        json() {
          return {
            error: 'Mot de passe incorrect !',
          };
        },
      };

      const user = {
        password: 'password',
        _id: 'id',
      };
      const findOneStub = await sinon.stub(UserTest, 'findOne').callsFake(() => Promise.resolve(user));
      const bcryptCompareStub = await sinon.stub(bcrypt, 'compare').callsFake(() => Promise.resolve(false));
      await userController.login(req, res);
      expect(findOneStub.calledOnce).to.be.true;
      expect(bcryptCompareStub.calledOnce).to.be.true;
      expect(res.resultStatus).to.eq(401);
    });

    it('should returns a status 401 if  user not found', async () => {
      const req = {
        body: {
          name: 'name',
          surname: 'surname',
          email: 'userTest@gmail.com',
          password: 'motdepass',
        },
      };
      const res = {
        resultStatus: '',
        status(s) {
          this.resultStatus = s;
          return this;
        },
        json() {
          return {
            error: 'Utilisateur non trouvé !',
          };
        },
      };

      const findOneStub = await sinon.stub(UserTest, 'findOne').callsFake(() => Promise.resolve(false));
      await userController.login(req, res);
      expect(findOneStub.calledOnce).to.be.true;
      expect(res.resultStatus).to.eq(401);
    });
  });
});
