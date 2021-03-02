const Validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required'
    }

    if (!values.text) {
        errors.text = 'Required'
    }

    if (!values.email) {
        errors.email = 'Required'
    } 
    return errors;
};

export default Validate