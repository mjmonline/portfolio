import dialogTemplate from './dialog.hbs';

class Dialog {
  constructor () {
    this.dialog = '';
    this.dialogId = 'js-dialog';
    this.openClassName = 'is-open';
    this.closedClassName = 'is-closed';
    this.happyClassName = 'is-happy';
    this.unHappyClassName = 'is-unHappy';
    this.clickableClassName = 'is-clickable';
    this.closeButtonClassName = 'c-dialog__close';
  }

  getHtml (message) {
    return dialogTemplate(message);
  }

  open (dialogHtml, happy) {
    let container = document.createElement('div');
    container.id = this.dialogId;
    container.innerHTML = dialogHtml;

    this.dialog = document.body.appendChild(container).firstChild;

    if (typeof happy === 'undefined') {
      happy = true;
    }

    this.dialog.classList.add(this.openClassName);

    if (happy) {
      // positive message -> auto close the dialog
      this.dialog.classList.add(this.happyClassName);
      this.close();
    } else {
      // negative message, has error
      let closeButton = this.dialog.getElementsByClassName(
        this.closeButtonClassName
      )[0];
      this.dialog.classList.add(this.unHappyClassName);
      closeButton.focus();
      this.close(false);
    }
  }

  close (autoClose) {
    let self = this;

    if (typeof autoClose === 'undefined') {
      autoClose = true;
    }

    if (autoClose) {
      setTimeout(function () {
        self.dialog.classList.remove(self.openClassName);
        self.dialog.classList.add(self.closedClassName);
      }, 2500);
      setTimeout(function () {
        self.deleteDialog();
      }, 2900);
    } else {
      this.dialog.addEventListener('click', this.onClick.bind(this));
      this.dialog.classList.add(self.clickableClassName);
    }
  }

  onClick () {
    let self = this;
    this.dialog.classList.remove(self.openClassName);
    this.dialog.classList.add(self.closedClassName);
    setTimeout(function () {
      self.deleteDialog();
    }, 400);
  }

  deleteDialog () {
    let container = document.getElementById(this.dialogId);
    container.parentNode.removeChild(container);
  }
}

export default Dialog;
