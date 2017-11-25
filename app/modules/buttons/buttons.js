class Buttons {
  constructor () {
    this.rippleElClassName = 'c-button__ripple';
    this.contentElClassName = 'c-button__content';
    this.animationClass = 'ripple';
  }

  insertRipplyEl (el) {
    el.insertBefore(this.getRipplyEl(), el.firstChild);
  }

  getRipplyEl () {
    let el = document.createElement('span');
    el.className = this.rippleElClassName;
    return el;
  }

  getClickCoords (event, button) {
    let rect = button.getBoundingClientRect();
    let coords = {
      x: event.pageX - rect.left - document.body.scrollLeft,
      y: event.pageY - rect.top - document.body.scrollTop
    };

    return coords;
  }

  onClick (e) {
    let self = this;
    let button = e.currentTarget;
    let rippleEl = button.getElementsByClassName(self.rippleElClassName)[0];
    let clickCoords = self.getClickCoords(e, button);

    // incase of quick double clicks stop the previous animation
    rippleEl.classList.remove('animate', self.animationClass);

    rippleEl.style.top = clickCoords.y + 'px';
    rippleEl.style.left = clickCoords.x + 'px';

    rippleEl.classList.add('animated', self.animationClass);

    window.setTimeout(function () {
      rippleEl.classList.remove('animated', self.animationClass);
    }, 400);
  }

  init () {
    let self = this;
    let elements = document.getElementsByClassName('c-button');

    Array.from(elements).forEach(function (el) {
      if (el.getElementsByClassName(self.rippleElClassName).length === 0) {
        self.insertRipplyEl(el);
      }
      el.addEventListener('click', self.onClick.bind(self));
    });
  }
}

export default Buttons;
