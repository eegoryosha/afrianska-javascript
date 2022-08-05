export default class ModalFactory {
    static renderModal(template, modalId) {
        const modal = document.createElement('div');

        modal.classList.add('modal');
        modal.classList.add('hide');
        modal.id = modalId;
        modal.innerHTML = `
                <div class="modal__dialog">
                    <div data-close="" class="modal__close">×</div>
                    ${template}
                </div>
        `;

        document.querySelector('body').appendChild(modal);

        return modal;
    }
}
