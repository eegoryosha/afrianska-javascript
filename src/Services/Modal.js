export default class Modal {
    constructor(modalSelector, triggerSelector = null) {
        this.modalSelector = modalSelector;
        this.triggerSelector = triggerSelector;

        this.initModal();
    }

    initModal() {
        const modal = this.getModal();
        const modalTrigger = this.triggerSelector ? document.querySelectorAll(this.triggerSelector) : null;

        if (!modal) return false;

        if (modalTrigger) {
            modalTrigger.forEach((btn) => {
                btn.addEventListener('click', () => this.openModal());
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target == modal || e.target.getAttribute('data-close') == '') {
                this.closeModal(modal);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                this.closeModal(modal);
            }
        })

        return true;
    }
    openModal() {
        const modal = this.getModal();

        modal.classList.remove('hide');
        modal.classList.add('show');

        document.body.style.overflow = 'hidden';
    }
    closeModal() {
        const modal = this.getModal();

        modal.classList.add('hide');
        modal.classList.remove('show');

        document.body.style.overflow = '';
    }
    getModal() {
        return document.querySelector(this.modalSelector);
    }
}
