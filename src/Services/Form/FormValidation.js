export default class FormValidation {
    static patternName = /^[а-яёА-ЯЁa-zA-Z\s]+$/;
	static patternMail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
	static errorMessages = [
		'Name cannot be empty',
		'Email cannot be empty',
		'Incorrect Email',
		'Message cannot be empty',
	];

    constructor(form) {
        this.form = form;
    }

    validForm(formData, property) {
        let error = '';

        const validate = {
            name: () => {
                if (formData.get('name').length == 0 || !FormValidation.patternName.test(formData.get('username'))) {
                    error = FormValidation.errorMessages[0];
                }
            },
            email: () => {
                if (formData.get('email').length == 0) {
                    error = FormValidation.errorMessages[1];
                } else if (!FormValidation.patternMail.test(formData.get('email'))) {
                    error = FormValidation.errorMessages[2];
                }
            },
            message: () => {
                if (formData.get('message').length == 0) {
                    error = FormValidation.errorMessages[3];
                }
            },
        }

        if (!validate[property]) return '';

        validate[property]();

        return error;
    }
}
