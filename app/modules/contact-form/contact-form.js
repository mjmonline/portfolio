import Dialog from '../dialog/dialog';

class ContactForm {
    constructor() {
        this.formClassName = '.contact-form';
    };

    validation() {
        var $form = $(this.formClassName);

        $form.isHappy({
            fields: {
                '#userEmail': {
                    required: true,
                    message: 'Plese provide a valid email',
                    test: happy.email
                },
                '#userMessage': {
                    required: true,
                    message: 'Nothing to say?'
                }
            },
            happy: function() {
                let dialog = new Dialog();

                $form.ajaxSubmit({
                    type:"POST",
                    data: $form.serialize(),
                    url:"mail_service.php",
                    success: function() {
                        ga('send', 'event', 'Emails', 'Completed', 'Email sent', $("#userEmail").val());
                        var $dialog = dialog.getHtml('Your email was sent, thank you!');
                        dialog.open($dialog);
                        $("input, textarea").focus().val("").blur();
                    },
                    error: function() {
                        ga('send', 'event', 'Emails', 'Completed', 'Email failed', $("#userEmail").val());
                        var $dialog = dialog.getHtml('Something went wrong, please try to reach me in another way.');
                        dialog.open($dialog, false);
                    }
                });
            }
        }).submit(function (e) {
            e.preventDefault();
        });
    };

    init() {
        this.validation();
    };

};

export default ContactForm;
