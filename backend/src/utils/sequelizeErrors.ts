const sequelizeErrors = (objErrors) => {
    let errors = ["Proccess does not work"]
    if( objErrors.errors ){
        errors = objErrors.errors.map(error=>error.message)
    }
    return errors
}

export default sequelizeErrors