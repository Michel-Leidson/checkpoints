const validatorRepository = require('../repositories/validatorRepository');


async function run(id){
    try{
        return await validatorRepository.getValidatorById(id);
    }catch(error){
        console.log('error in Get Validator by ID service.')
    };
}

module.exports = { run };