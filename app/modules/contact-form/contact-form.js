import Dialog from '../dialog/dialog';
import FormValidator from 'validate-js';
import errorTemplate from './error.hbs';

class ContactForm {
    constructor() {
        this.form = '';
        this.errors = [];
    };

    validation() {
        var $form = $(this.formClassName);

        var validator = new FormValidator('contactForm', [{
            name: 'userMessage',
            rules: 'required'
        }, {
            name: 'userEmail',
            rules: 'required|valid_email'
        }], function(errors) {
            if (errors.length > 0) {
            // Show the errors
            console.log('errors', errors);
            }
        });

        validator.setMessage('valid_email', 'Please provide a valid email.');
        validator.setMessage('required', 'Nothing to say?');

    //     $form.isHappy({
    //         fields: {
    //             '#userEmail': {
    //                 required: true,
    //                 message: 'Plese provide a valid email',
    //                 test: happy.email
    //             },
    //             '#userMessage': {
    //                 required: true,
    //                 message: 'Nothing to say?'
    //             }
    //         },
    //         happy: function() {
    //             let dialog = new Dialog();

    //             $form.ajaxSubmit({
    //                 type:"POST",
    //                 data: $form.serialize(),
    //                 url:"mail_service.php",
    //                 success: function() {
    //                     ga('send', 'event', 'Emails', 'Completed', 'Email sent', $("#userEmail").val());
    //                     var $dialog = dialog.getHtml('Your email was sent, thank you!');
    //                     dialog.open($dialog);
    //                     $("input, textarea").focus().val("").blur();
    //                 },
    //                 error: function() {
    //                     ga('send', 'event', 'Emails', 'Completed', 'Email failed', $("#userEmail").val());
    //                     var $dialog = dialog.getHtml('Something went wrong, please try to reach me in another way.');
    //                     dialog.open($dialog, false);
    //                 }
    //             });
    //         }
    //     }).submit(function (e) {
    //         e.preventDefault();
    //     });
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
            this.printErrors();
        } else {
            this.validationPassed();
        }
    };

    validationPassed() {
        console.log('passed');
    };

    printErrors() {
        this.errors.forEach(function(error, i) {
            let field = error.field;

            $(field).after(errorTemplate(error));
        });
    };

    clearErrors() {
        let $form = $(this.form);
        let $unhappy = $(this.form).find('.unhappyMessage');
        $unhappy.remove();
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

        if(this.errors.length > 0) {
            this.clearErrors();
        }

        this.validate();
    };

    init() {
        let form = document.getElementById('contactForm');
        form.addEventListener('submit', this.onSubmit.bind(this));
        this.form = form;
    };

};

export default ContactForm;
