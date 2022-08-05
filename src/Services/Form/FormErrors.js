export default class FormErrors {
    constructor(form) {
        this.form = form;
    }

    showError(property, error) {
        const control = this.form.querySelector(`[name=${property}]`);
        const errorBox = FormErrors.getErrorBox(control);

        control.classList.add('form-control__error');
        errorBox.innerHTML = error;
        errorBox.classList.remove('hide');
    }

    cleanError(control) {
        const errorBox = FormErrors.getErrorBox(control);

        control.classList.remove('form-control__error');
        errorBox.classList.add('hide');

        errorBox.innerHTML = '';

    }

    static getErrorBox(control) {
        return control.previousElementSibling.querySelector('.modal__error-message');
    }
}
