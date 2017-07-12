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

    listenToClick() {
        $('.c-spinner__remark, .c-spinner__refresh').on('click', this.onClick.bind(this));
    };

    onClick(e) {
        e.preventDefault();
        this.spin();
    };

    spin() {
        let self = this;
        let $target = $('.c-spinner__refresh');

        if (!$target.hasClass('spin')) {
            // Start spin
            $target.addClass('spin');
            // End spin
            window.setTimeout(function() {
                self.swap();
                $target.removeClass('spin');
            }, 900);
        }
    };

    swap() {
        $('.c-spinner__remark .c-spinner__content').shuffleLetters({
            "text": this.phrases[this.phraseCount],
            "step": 5
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
        this.listenToClick();
    };

};

export default Spinner;
