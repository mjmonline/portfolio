class NavMain {
    constructor() {
        this.lastArticleSeen = '';
        this.inViewSection = '';
    };

    detectInViewItem() {
        let self = this;
        let sectionsTop = this.getSectionsTop();
        let headerHeight = document.getElementById('header').offsetHeight;
        let scrollTop = window.pageYOffset;

        sectionsTop.forEach(function(sectionTop) {
            if((scrollTop + headerHeight) >= sectionTop.offsetTop) {
                self.inViewSection = sectionTop.id;
            }
        });

        if (this.inViewSection !== this.lastArticleSeen) {
            this.setInView();
            this.lastArticleSeen = this.inViewSection;
        }
    };

    setInView() {
        let self = this;
        let navItems = document.getElementsByClassName('c-nav-main__item');

        Array.from(navItems).forEach(function(navItem) {
            let link = navItem.getElementsByClassName('c-nav-main__link')[0];

            if(navItem.classList.contains('is-inView')) {
                navItem.classList.remove('is-inView');
            }

            if(link.getAttribute('href') === '#' + self.inViewSection) {
                navItem.classList.add('is-inView');
            }
        });
    };

    getSectionsTop() {
        let self = this;
        let sections = document.getElementsByTagName('main')[0].children;
        let sectionsTop = [];

        Array.from(sections).forEach(function(section) {
            let header = section.getElementsByClassName('c-section__header');
            let offset = {};
            let offsetTop = 0;

            if(header.length > 0) {
                offset = self.getOffset(header[0]);
                offsetTop = offset.top;
            } else {
                offset = self.getOffset(section);
                offsetTop = offset.top;
            }

            sectionsTop.push({
                id: section.id,
                offsetTop: offsetTop
            });
        });

        return sectionsTop;
    };

    getOffset(el) {
        let rect = el.getBoundingClientRect();
        let offset = {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };

        return offset;
    };

    init() {
        window.addEventListener('throttled.scroll', this.detectInViewItem.bind(this));
    };
};

export default NavMain;
