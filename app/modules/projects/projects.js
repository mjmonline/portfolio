import projectsTemplate from './projects.hbs';
import projectsData from './data.json';

class Projects {
    constructor() {
        this.projectsId = 'js-projects';
        this.projectsClassName = '.project-item';
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;
    };

    init() {
        let projectsContainer = document.getElementById(this.projectsId);
        projectsContainer.innerHTML = projectsTemplate(projectsData);

        // Desktop only
        if (!this.isMobile) {
            this.renderDesktopImage();
        }
    };

    renderDesktopImage() {
        $(this.projectsClassName).each(function() {
            var $item = $(this);
            var $img = $("<img>");
            var $mobileImage = $item.find(".image-mobile picture img");
            var imageUrl = $mobileImage.attr("srcset").replace(/(\.[\w\d_-]+)$/i, '-l$1');
            var imageAlt = $mobileImage.attr("alt");

            $img.attr("src", imageUrl).attr("alt", imageAlt);
            $item.find('.browser-frame').append($img);
        });
    };

};

export default Projects;
