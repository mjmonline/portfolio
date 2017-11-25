class Header {
  constructor () {
    this.stickyClassName = 'is-sticky';
    this.headerHeight = 0;
  }

  toggleSticky () {
    let header = document.getElementById('header');

    if (window.pageYOffset > this.headerHeight) {
      header.classList.add(this.stickyClassName);
    } else {
      header.classList.remove(this.stickyClassName);
    }
  }

  init () {
    this.headerHeight = document.getElementById('header').offsetHeight;
    window.addEventListener('throttled.scroll', this.toggleSticky.bind(this));
  }
}

export default Header;
