import projectsTemplate from './projects.hbs';
import projectsData from './data.json';

class Projects {
  constructor () {
    this.projectsId = 'js-projects';
  }

  init () {
    let projectsContainer = document.getElementById(this.projectsId);
    projectsContainer.innerHTML = projectsTemplate(projectsData);
  }
}

export default Projects;
