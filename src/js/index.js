import Modal from '../Services/Modal';
import Form from '../Services/Form/Form';

document.addEventListener('DOMContentLoaded', () => {
    const FeedbackModal = new Modal('.modal', '.offer__btn-form'); // модальное окно обратной связи
    new Form(document.querySelector('.modal__form'), FeedbackModal); // форма обратной связи
});
