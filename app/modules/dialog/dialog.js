import dialogTemplate from './dialog.hbs';

class Dialog {
    constructor() {
        this.dialogId = 1;
    };

    getDialog(message) {
        return dialogTemplate(message);
    };

    open($dialog, happy) {
        var self = this;
        if (typeof(happy)==='undefined') happy = true;

        $("body").append($dialog.addClass("open"));

        if(happy) {
            // positive message -> auto close the dialog
            $(".dialog").addClass("happy");
            self.closeDialogs();
        } else {
            // negative message
            $(".dialog").addClass("unHappy").find(".dialog-content").append('<span class="close-dialog"></span>');
            self.closeDialogs(false);
        }
    };

    close(autoClose) {
        if (typeof(autoClose)==='undefined') autoClose = true;

        if(autoClose) {
            setTimeout(function() {
                $(".dialog").removeClass("open").addClass("close");
            }, 2500);
            setTimeout(function() {
                $(".dialog").remove();
            }, 2900);
        } else {
            $(".dialog.open .dialog-content").on("click", function() {
                $(".dialog").removeClass("open").addClass("close");
                setTimeout(function() {
                    $(".dialog").remove();
                }, 400);
            }).addClass("clickable");
        }
    };
};

export default Dialog;
