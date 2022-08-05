import ModalFactory from '../ModalFactory';
import Modal from '../Modal';

export default class FormShowMessage {
    constructor(modalInstance = null) {
        this.modalInstance = modalInstance;
    }

    showSuccessMessage() {
        ModalFactory.renderModal('<div class="modal__feedback-title">Your message successfully sent</div>', 'modalSuccess');
        const modalSuccess = new Modal('#modalSuccess');

        this.modalInstance.closeModal();
        modalSuccess.openModal();
    }

}
