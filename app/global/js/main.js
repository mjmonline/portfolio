import $ from 'jquery';
import _ from 'lodash';
import skrollr from 'skrollr';
import FloatLabel from '../../modules/floatlabel/floatlabel';
import Spinner from '../../modules/spinner/spinner';
// import Projects from '../../modules/projects/projects';
// import Timeline from '../../modules/timeline/timeline';
// import ContactForm from '../../modules/contact-form/contact-form';
// import GoogleMap from '../../modules/map/map';
// import Buttons from '../../modules/buttons/buttons';
// import Social from '../../modules/social/social';
import NavMain from '../../modules/nav-main/nav-main';
import Header from '../../modules/header/header';
//
// let portfolio = {
//
//     settings: {
//         isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false,
//         headerHeight: document.getElementById('header').offsetHeight
//     },
//
//     init: function() {
//         let floatLabel = new FloatLabel();
//         let spinner = new Spinner();
//         let projects = new Projects();
//         let timeline = new Timeline();
//         let contactForm = new ContactForm();
//         let googleMap = new GoogleMap();
//         let buttons = new Buttons();
//         let social = new Social();
//         let header = new Header();
//         let navMain = new NavMain();
//
//         header.init();
//         floatLabel.init();
//         spinner.init();
//         projects.init();
//         timeline.init();
//         contactForm.init();
//         buttons.init();
//         social.init();
//         navMain.init();
//
//         this.animateScroll();
//         this.updateCopyrightYear();
//
//         // Desktop only
//         if (!this.settings.isMobile) {
//             skrollr.init({
//                 smoothScrolling: true
//             });
//         }
//
//         $(window).trigger("scroll");
//         window.addEventListener('mapsApiLoaded', googleMap.init);
//         window.addEventListener('scroll', _.throttle(this.onWindowScroll.bind(this), 200));
//     },
//
//     animateScroll: function() {
//         let self = this;
//         let anchorLinks = document.querySelectorAll('[href^="#"], [href="/"]');
//
//         Array.from(anchorLinks).forEach(function(link) {
//             link.addEventListener('click', self.onScrollToBtnClick.bind(self));
//         });
//     },
//
//     onScrollToBtnClick: function(e) {
//         let href = e.currentTarget.getAttribute('href');
//         let scrollTo = 0;
//
//         if(href !== '/') {
//             let targetSection = document.getElementById(href.replace('#', ''));
//             let targetHeader = targetSection.getElementsByClassName('c-section__header')[0];
//             let targetHeaderOffset = this.getOffset(targetHeader);
//             scrollTo = targetHeaderOffset.top - this.settings.headerHeight;
//         }
//
//         e.preventDefault();
//
//         $('html, body').animate({
//             scrollTop: scrollTo
//         }, 300);
//     },
//
//     onWindowScroll: function() {
//         let event;
//
//         if (window.CustomEvent) {
//             event = new CustomEvent('throttled.scroll');
//         } else {
//             event = document.createEvent('CustomEvent');
//             event.initCustomEvent('throttled.scroll', true, true);
//         }
//
//         window.dispatchEvent(event);
//     },
//
//     updateCopyrightYear: function() {
//         document.getElementById('js-copyright-year').innerHTML = new Date().getFullYear();
//     },
//
//     getOffset(el) {
//         let rect = el.getBoundingClientRect();
//         let offset = {
//             top: rect.top + document.body.scrollTop,
//             left: rect.left + document.body.scrollLeft
//         };
//
//         return offset;
//     }
// };
//
// portfolio.init();
