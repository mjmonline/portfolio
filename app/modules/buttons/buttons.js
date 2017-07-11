class Buttons {
    constructor() {
    };

    insertRipplyEl(el) {
        let buttonContent = el.getElementsByClassName('content-container')[0];
        buttonContent.insertBefore(this.getRipplyEl(), buttonContent.firstChild);
    };

    getRipplyEl() {
        let el = document.createElement('span');
        el.className = 'ripple-element';
        return el;
    };

    getClickCoords(event, button) {
        let rect = button.getBoundingClientRect();
        let coords = {
            x: event.pageX - rect.left - document.body.scrollLeft,
            y: event.pageY - rect.top - document.body.scrollTop
        };

        return coords;
    };

    onClick(e) {
        let self = this;
        let button = e.currentTarget;
        let rippleEl = button.getElementsByClassName('ripple-element')[0];
        let clickCoords = self.getClickCoords(e, button);

        //incase of quick double clicks stop the previous animation
        rippleEl.classList.remove('animate', 'ripple');

        rippleEl.style.top = clickCoords.y + 'px';
        rippleEl.style.left = clickCoords.x + 'px';

        rippleEl.classList.add('animated', 'ripple');

        window.setTimeout(function() {
            rippleEl.classList.remove('animated', 'ripple');
        }, 400);
    };

    init() {
        let self = this;
        let elements = document.querySelectorAll('.button, .remark');

        Array.from(elements).forEach(function(el, i) {
            if(el.getElementsByClassName('ripple-element').length === 0) {
                self.insertRipplyEl(el);
            }
            el.addEventListener('click', self.onClick.bind(self));
        });
    };
};

export default Buttons;
