import moment from 'moment'

const Validate = values => {
    const errors = {}

    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length < 5 || values.title.length > 40) {
        errors.title = 'Title must be between 5-40 chars'
    }

    if (!values.description || values.description.length > 700) {
        errors.description = 'Title must be between >700'
    }

    if (!values.salary) {
        errors.salary = 'Required'
    } else if (values.salary.length > 50) {
        errors.salary = 'Title must be between >50'
    }

    if (!values.dateDescription) {
        errors.dateDescription = 'Required'
    } else if (values.dateDescription.length < 5 || values.dateDescription.length > 100) {
        errors.dateDescription = 'Title must be between 5-100'
    }

    if (!values.address) {
        errors.address = 'Required'
    } else if (values.address.length < 5 || values.address.length > 100) {
        errors.address = 'Title must be between 5-100 chars'
    }

    if (!values.dateExpiration) {
        errors.dateExpiration = 'Required'
    } else if (isValidDateExpiration(values.dateExpiration)) {
        errors.dateExpiration = 'only to 7 days and not before  '
    }

    if (!values.location) {
        errors.location = 'Required'
    }

    if (!values.type) {
        errors.type = 'Required'
    }

    if (!values.fbGroupId) {
        errors.fbGroupId = 'Required'
    }

    return errors
};

const isValidDateExpiration = (dateExpiration) => {
    let date = moment(dateExpiration);
    return date.isAfter(moment().add(7, 'day')) || date.isBefore(moment())
};

export default Validate