import skrollr from 'skrollr';
import FloatLabel from '../modules/floatLabel/floatLabel';
import Spinner from '../modules/spinner/spinner';
import Projects from '../modules/projects/projects';
import Timeline from '../modules/timeline/timeline';
import ContactForm from '../modules/contact-form/contact-form';
import GoogleMap from '../modules/map/map';
import Buttons from '../modules/buttons/buttons';

require('../images/ciber-l.png');
require('../images/ciber-m.png');
require('../images/ciber.png');
require('../images/electrolux.png');
require('../images/electrolux-l.png');
require('../images/electrolux-m.png');
require('../images/redcross-m.png');
require('../images/redcross-l.png');
require('../images/redcross.png');
require('../images/clouds.png');
require('../images/mansour.png');
require('../images/moon.png');
require('../images/stars.png');

var portfolio = {

    settings: {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false,
        lastScrollTop: 0,
        headerHeight: $("#header").outerHeight(),
        lastArticleSeen: ""
    },

    init: function() {
        let floatLabel = new FloatLabel();
        let spinner = new Spinner();
        let projects = new Projects();
        let timeline = new Timeline();
        let contactForm = new ContactForm();
        let googleMap = new GoogleMap();
        let buttons = new Buttons();

        floatLabel.init();
        spinner.init();
        projects.init();
        timeline.init();
        contactForm.init();
        buttons.init();

        this.animateScroll();
        this.scrollEvents();
        this.updateCopyrightYear();

        // Desktop only
        if (!this.settings.isMobile) {
            this.runSkrollr();
        }

        $(window).trigger("scroll");
        window.addEventListener('mapsApiLoaded', googleMap.init);
    },

    animateScroll: function() {
        var self = this;

        $("a[href*=#]").on('click', function(e) {
            var href = $(this).attr("href");
            var scrollTo = href === "#" ? 0 : $(href).find("header h2").offset().top - self.settings.headerHeight;

            $('html, body').animate({
                scrollTop: scrollTo
            }, 300);
            e.preventDefault();
        });
    },

    scrollEvents: function() {
        var self = this;

        $(window).on('scroll', function(e) {
            self.settings.lastScrollTop = $(window).scrollTop();

            self.stickyHeader();
            self.inView();
        });
    },

    stickyHeader: function() {
        var self = this;

        if (self.settings.lastScrollTop > self.settings.headerHeight) {
            $("#header").addClass("sticky");
        } else {
            $("#header").removeClass("sticky");
        }
    },

    inView: function() {
        var self = this;
        var articlePositions = self.getArticlePositions();
        var currentArticle = "";

        for (var id in articlePositions) {
            if (self.settings.lastScrollTop + self.settings.headerHeight >= articlePositions[id]) {
                currentArticle = id;
            }
        }

        if (currentArticle !== self.settings.lastArticleSeen) {
            $(".main-nav li.in-view").removeClass("in-view");
            $(".main-nav li a[href='#" + currentArticle + "']").parent().addClass("in-view");

            self.settings.lastArticleSeen = currentArticle;
        }
    },

    getArticlePositions: function() {
        var positions = [];

        $("main > article").each(function(i) {
            var $sectionHeader = $(this).find("header h2");

            var offsetTop = $sectionHeader.length > 0 ? $sectionHeader.offset().top : $(this).offset().top;

            positions[$(this).attr("id")] = offsetTop;
        });

        return positions;
    },

    runSkrollr: function() {
        var s = skrollr.init({
            smoothScrolling: true
        });
    },

    updateCopyrightYear: function() {
        $(".footer-content .year").text(new Date().getFullYear());
    }
};

$(function() {
    portfolio.init();

});
