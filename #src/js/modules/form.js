import { postData } from '../services/services';
import {closeModal, openModal} from './modal'; 

function form(formSelector, inputsSelector, statusMessageSelector) {
    const form = document.querySelector(formSelector);
    const username = document.querySelector(inputsSelector+'[name="name"]');
    const email = document.querySelector(inputsSelector+'[name="email"]');
    const status = document.querySelector(statusMessageSelector);
    const message = {
        loading: 'img/spinner.svg', 
        success: 'Your message successfully sent',
        failure: 'Error...'
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validation()) {
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading; 
            statusMessage.style.cssText = `
                display: block; 
                width: 40px;
                margin: 0 auto;
            `;   
            status.appendChild(statusMessage);

            const formData = new FormData(form); 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));  
            
            postData('https://jsonplaceholder.typicode.com/posts', json)
                .then(data => {
                    showFeedbackModal(message.success);
                })
                .catch(err => {
                    showFeedbackModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    statusMessage.remove();
                })
        }
    });



    function validation() {
        let isValid = true;
        const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (username.value.trim() === '') {
            onError(username, 'Name cannot be empty'); 
            isValid = false;
        } else {
            onSuccess(username);
        }
        if (email.value.trim() === '') {
            onError(email, 'Email cannot be empty'); 
            isValid = false;
        } else {
            if (!regEmail.test(email.value)) {
                onError(email, 'Incorrect Email')
                isValid = false;
            } else {
                onSuccess(email);
            }
        }
        return isValid;
    }

    function onError(input, message) {
        const parent = input.parentElement;
        const messageError = parent.querySelector('small');
        messageError.classList.add('show');
        messageError.classList.remove('hide');
        messageError.innerText = message;
    }
    function onSuccess(input) {
        const parent = input.parentElement;
        const messageError = parent.querySelector('small');
        messageError.classList.add('hide');
        messageError.classList.remove('show');
        messageError.innerText = '';
    }
    
    function showFeedbackModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');

        openModal('.modal');

        const feedbackModal = document.createElement('div');
        feedbackModal.classList.add('modal__dialog');
        feedbackModal.innerHTML = `
            <div class="modal__feedback-title">${message}</div>
        `;

        document.querySelector('.modal').append(feedbackModal);
        
        setTimeout(() => {
            feedbackModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }


}

export default form;