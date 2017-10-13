import shuffleLetters from 'shuffle-letters';

class Spinner {
    constructor() {
        this.phraseCount = 1;
        this.phrases = [
            'black belt web developer',
            'front-end architect',
            'web designer',
            'team player',
            'positive thinker',
            'Zlatan fan',
            'Fifa addict',
            'Battlefield 4 addict'
        ];
    };

    onClick(e) {
        e.preventDefault();
        this.spin();
    };

    spin() {
        let self = this;
        let target = document.getElementsByClassName('c-spinner__refresh')[0];

        if (!target.classList.contains('spin')) {
            // Start spin
            target.classList.add('spin');
            // End spin
            window.setTimeout(function() {
                self.swap();
                target.classList.remove('spin');
            }, 900);
        }
    };

    swap() {
        shuffleLetters(document.querySelector('.c-spinner__content'), {
            'text': this.phrases[this.phraseCount],
            'step': 5
        });

        if (this.phraseCount === this.phrases.length - 1) {
            this.phraseCount = 0;
            ga('send', 'event', 'Remarks', 'Completed', 'Viewed all of the remarks', 1);
        } else {
            ga('send', 'event', 'Remarks', 'Click', 'Viewed remark', this.phraseCount);
            this.phraseCount += 1;
        }
    };

    init() {
        let self = this;
        let buttons = document.querySelectorAll('.c-spinner__remark, .c-spinner__refresh');
        Array.from(buttons).forEach(function(button) {
            button.addEventListener('click', self.onClick.bind(self));
        });
    };

};

export default Spinner;
