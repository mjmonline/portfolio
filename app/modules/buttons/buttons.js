class Buttons {
    constructor() {
    };

    ripplyfy() {
        let self = this;

        $(".button, .remark").each(function() {
            if ($(this).find(".ripple-element").length === 0) {
                $(this).find(".content-container").prepend(self.getRipplyEl());
            }
        }).on('click', this.onClick);
    };

    getRipplyEl() {
        return '<span class="ripple-element"></span>';
    };

    onClick(e) {
        var $button = $(this);
        var $rippleEl = $button.find(".ripple-element");

        //incase of quick double clicks stop the previous animation
        $rippleEl.removeClass("animate ripple");

        //get click coordinates
        var x = e.pageX - $button.offset().left;
        var y = e.pageY - $button.offset().top;

        $rippleEl.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animated ripple");

        window.setTimeout(function() {
            $rippleEl.removeClass('animated ripple');
        }, 400);
    };

    init() {
        this.ripplyfy();
    };
};

export default Buttons;
