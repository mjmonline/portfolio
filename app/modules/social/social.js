import socialtemplate from './social.hbs';
import socialData from './data.json';

class Social {
  constructor () {
    this.socialId = 'js-social';
  }

  init () {
    let socialContainer = document.getElementById(this.socialId);
    socialContainer.innerHTML = socialtemplate(socialData);
  }
}

export default Social;
