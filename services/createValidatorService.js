const validatorRepository = require('../repositories/validatorRepository');
const changeAnalysis = require('./changeAnalysisService');
async function run(id, hasSigned, hasNotified, currentCheckpoint){
    try {
        const newValidator ={};
        newValidator.id = id;
        newValidator.hasSigned = hasSigned;
        newValidator.hasNotified = hasNotified;
        
        console.log("verificando se o validador " + id + "já existe!");
        validatorRepository.getValidatorById(id).then(async result => {
            if (result) {
                console.log("já existe!, estou analisando..")
                await changeAnalysis.run(newValidator, result, currentCheckpoint).catch(error => {
                    console.log(error);
                });
            } else {
                await validatorRepository.createValidator({
                    id,
                    hasSigned,
                    hasNotified
                });
            }
        })

    } catch (err) {
        console.log(err);
    }
}

module.exports = { run };