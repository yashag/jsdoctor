const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const jsdoc = require('jsdoc-x');

describe('JSDoc Generator', () => {

    const filePath = './test/files/result/**.js';

    describe('generate', () => {

        it('generate jsdoc documentation', done => {
            jsdoc.parse({
                files: filePath
            }).then(result => {
                expect(result).to.be.an('array');
                done();
            }).catch(err => {
                console.log(`JSDoc documentation creation failed. Details: `, err);
                done(err);
            });
        });

    });

});