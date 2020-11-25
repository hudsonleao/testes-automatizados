const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');
const chaiSpies = require('chai-spies');

chai.use(dirtyChai);
chai.use(chaiChange);
chai.use(chaiSpies);