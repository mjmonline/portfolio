import timelineTemplate from './timeline.hbs'
import timelineData from './data.json'

class Timeline {
  constructor () {
    this.timelineId = 'js-timeline'
  }

  init () {
    let timelineContainer = document.getElementById(this.timelineId)
    timelineContainer.innerHTML = timelineTemplate(timelineData)
  }
}

export default Timeline
