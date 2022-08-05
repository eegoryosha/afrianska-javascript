import Api from '../Api';
import FormErrors from './FormErrors';
import FormShowMessage from './FormShowMessage';
import FormValidation from './FormValidation';

export default class Form {
    constructor(form, modalInstance = null) {
        this.form = form; // элемент формы
		this.fields = this.form.querySelectorAll('.form-control'); // коллекция полей формы
		this.btn = this.form.querySelector('[type=submit]'); // кнопка подтверждения формы
		this.isError = false; // флаг валидации
        this.url = 'https://jsonplaceholder.typicode.com/posts'; // ссылка для отправки формы

        this.errors = new FormErrors(form); // ошибки
        this.validation = new FormValidation(form); // валидации
        this.messages = new FormShowMessage(modalInstance); // сообщения

		this.registerEventsHandler(); // регистрация обработчиков событий
    }

    registerEventsHandler() {
        this.btn.addEventListener('click', this.submitForm.bind(this));

        this.form.addEventListener('focus', () => {
            const el = document.activeElement;

            if (el === this.btn) return;

            this.errors.cleanError(el);
            this.isError = false;
        }, true);
    }

    async submitForm(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        let error;

        for (let property of formData.keys()) {
            error = this.validation.validForm(formData, property);

            if (error.length == 0) continue;

            this.isError = true;
            this.errors.showError(property, error);
        }

        if (this.isError) return;

        const data = Object.fromEntries(formData.entries());
        const response = await Api.request(this.url, 'POST', {}, data);

        if (response.success) {
            this.messages.showSuccessMessage();
            this.form.reset();
        }
    }


}
