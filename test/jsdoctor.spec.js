const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('chai-fs'));
const expect = chai.expect;
const fs = require('fs');
const cpx = require('cpx');

const jsdoctor = require('..');

describe('JSDoctor', () => {

    const originalTestFilesPath = './test/files/original/';
    const resultTestFilesPath = './test/files/result/';
    const expectationTestFilesPath = './test/files/expectation/';

    before(() => {
        cpx.copySync(originalTestFilesPath + '**', resultTestFilesPath);
    });

    describe('#doctor', () => {

        it('not fail when trying to doctor an unexisting file', () => {
            const wrongPath = 'wrongPath.js';
            const result = jsdoctor(wrongPath);

            expect('./').to.not.include.files([wrongPath]);
            return Promise.all([
                expect(result).to.be.fulfilled,
                expect(result).to.eventually.have.property('status', 'success')
            ]);
        });

        it('add jsdoc comments to a class and it\'s body components', done => {
            const testFile = 'test-class.js';
            filesComparisonTest(done, testFile);
        });

        it('add jsdoc comments to a child class', done => {
            const testFile = 'test-extend.js';
            filesComparisonTest(done, testFile);
        });

        it('add jsdoc comments to a methods module', done => {
            const testFile = 'test-module.js';
            filesComparisonTest(done, testFile);
        });

        it('leave the commented file untouched', done => {
            const testFile = 'test-commented.js';
            filesComparisonTest(done, testFile);
        });

    });

    describe('options', () => {
        it('override the existing comments with automatically generated ones', done => {
            const testFile = 'test-option-override.js';
            filesComparisonTest(done, testFile, {overrideComments: true});
        });

        it('watch file for changes', done => {
            const testFile = 'test-option-watch.js';
            const dataToAppend = "\n\nfunction generateCircle(radius) {\n    return new Circle(1, 2, radius);\n}";
            
            jsdoctor(resultTestFilesPath + testFile, {watch: true}).then(docMonitor => {
                fs.appendFile(resultTestFilesPath + testFile, dataToAppend, (err) => {
                    if (err) done(err);
                });

                setTimeout(() => {
                    expect(resultTestFilesPath + testFile).to.be.a.file().and.to.equal(expectationTestFilesPath + testFile);
    
                    docMonitor.killPatient();
                    done();
                }, 1000);
            });
        });
        
    });

    function filesComparisonTest(doneFn, fileName, options = {}) {
        jsdoctor(resultTestFilesPath + fileName, options).then(result => {
            expect(result).to.have.property('status').and.to.equal('success');
            expect(resultTestFilesPath + fileName).to.be.a.file().and.to.equal(expectationTestFilesPath + fileName);
            doneFn();
        }).catch(err => {
            console.log(`File Comparison error in the following file: ${fileName}. Details: `, err);
            doneFn(err);
        });
    }
});