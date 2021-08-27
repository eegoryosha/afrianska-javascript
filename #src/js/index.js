import modal from './modules/modal';
import form from './modules/form';
document.addEventListener('DOMContentLoaded', () => {
    modal('.offer__btn-form', '.modal');
    form('.modal__form', '.modal__input', '.modal__status-message');
    
    document.querySelector('.header__btn-project').addEventListener('click', () => {
        
    });

    document.querySelector('.nav__navicon').addEventListener('click', () => {
        
    });

    document.querySelector('.clients__more-client').addEventListener('click', () => {
        
    });
})
