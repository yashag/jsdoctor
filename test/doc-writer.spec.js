const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const docWriter = require('../lib/doc-writer');

describe('Doc writer', () => {

    const resultTestFilesPath = './test/files/result/';

    describe('#parseCode', () => {

        it('return a a parsed version of the requested file', done => {
            fs.readFile(resultTestFilesPath + 'test-class.js', 'utf8', (err, content) => {
                let result = docWriter.parseCode(content);

                expect(result).to.be.an('object');
                expect(result.sourceType).to.equal('script');
                expect(result.type).to.equal('Program');
                done();
            });
        });

    });
});