import Dialog from '../dialog/dialog';
import FormValidator from 'validate-js';
import errorTemplate from './error.hbs';

class ContactForm {
    constructor() {
        this.form = '';
        this.errors = [];
    };

    validate() {
        let emailField = this.form.elements['userEmail'];
        let messageField = this.form.elements['userMessage'];

        if(!this.isFieldFilled(emailField) && !this.isEmailValid(emailField)) {
            this.errors.push({
                'field': emailField,
                'fieldName': emailField.name,
                'message': 'Please provide a valid email'
            });
        }

        if(!this.isFieldFilled(messageField)) {
            this.errors.push({
                'field': messageField,
                'fieldName': messageField.name,
                'message': 'Nothing to say?'
            });
        }

        if(this.errors.length > 0) {
            this.validationFailed();
        } else {
            this.validationPassed();
        }
    };

    validationPassed() {
        let self = this;
        let dialog = new Dialog();
        let submitButton = this.form.elements['submit'];
        let reciverEmail = this.form.elements['userEmail'];

        submitButton.disabled = true;

        $.ajax({
            url: '//formspree.io/mansour@mjmonline.se',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                let dialogHtml = dialog.getHtml('Your email was sent, thank you!');
                dialog.open(dialogHtml);
                self.clearForm();
                submitButton.disabled = false;
                ga('send', 'event', 'Emails', 'Completed', 'Email sent', reciverEmail.value);
            },
            error: function(error) {
                let dialogHtml = dialog.getHtml('Something went wrong, please try to reach me in another way.');
                dialog.open(dialogHtml, false);
                submitButton.disabled = false;
                ga('send', 'event', 'Emails', 'Completed', 'Email failed', reciverEmail.value + 'error:' + error);
            }
        });
    };

    validationFailed() {
        this.errors.forEach(function(error, i) {
            let field = error.field;

            field.insertAdjacentHTML('afterend', errorTemplate(error));
        });
    };

    clearForm() {
        let elements = Array.from(this.form.elements);

        elements.forEach(function(element, i) {
            let fieldType = element.type.toLowerCase();

            if(fieldType === 'text' || fieldType === 'email' || fieldType === 'textarea') {
                element.focus();
                element.value = '';
                element.blur();
            }
        });
    };

    clearErrors() {
        let unhappies = Array.from(document.getElementsByClassName('unhappyMessage'));

        unhappies.forEach(function(error, i) {
            error.parentNode.removeChild(error);
        });

        this.errors = [];
    };

    isEmailValid(field) {
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(field.value);
    };

    isFieldFilled(field) {
        return (field.value !== null && field.value !== '');
    };

    onSubmit(e) {
        e.preventDefault();
        this.form = document.getElementById('contactForm');

        if(this.errors.length > 0) {
            this.clearErrors();
        }

        this.validate();
    };

    init() {
        let form = document.getElementById('contactForm');
        form.addEventListener('submit', this.onSubmit.bind(this));
    };
};

export default ContactForm;
