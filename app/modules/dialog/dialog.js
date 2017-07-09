import dialogTemplate from './dialog.hbs';

class Dialog {
    constructor() {
        this.dialog = '';
        this.dialogId = 'js-dialog';
    };

    getHtml(message) {
        return dialogTemplate(message);
    };

    open(dialogHtml, happy) {
        let self = this;
        let container = document.createElement('div');
        container.id = this.dialogId;
        container.innerHTML = dialogHtml;

        this.dialog = document.body.appendChild(container).firstChild;

        if (typeof(happy)==='undefined') {
            happy = true;
        }

        this.dialog.classList.add('open');

        if(happy) {
            // positive message -> auto close the dialog
            this.dialog.classList.add('happy');
            self.close();
        } else {
            // negative message
            this.dialog.classList.add('unHappy');
            self.close(false);
        }
    };

    close(autoClose) {
        let self = this;

        if (typeof(autoClose)==='undefined') {
            autoClose = true;
        }

        if(autoClose) {
            setTimeout(function() {
                self.dialog.classList.remove('open');
                self.dialog.classList.add('close');
            }, 2500);
            setTimeout(function() {
                self.deleteDialog();
            }, 2900);
        } else {
            this.dialog.addEventListener('click', this.onClick.bind(this));
            this.dialog.classList.add('clickable');
        }
    };

    onClick() {
        let self = this;
        this.dialog.classList.remove('open');
        this.dialog.classList.add('close');
        setTimeout(function() {
            self.deleteDialog();
        }, 400);
    };

    deleteDialog() {
        let container = document.getElementById(this.dialogId);
        container.parentNode.removeChild(container);
    };
};

export default Dialog;
