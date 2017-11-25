class FloatLabel {
  constructor () {
    this.populatedClass = 'c-float-label--populated'
    this.focusedClass = 'c-float-label--focused'
    this.className = 'c-float-label'
  }

  isFieldFilled (field) {
    return field.value !== null && field.value !== ''
  }

  init () {
    let self = this
    let fields = Array.from(document.getElementsByClassName(this.className))

    fields.forEach(function (field, i) {
      let inputs = Array.from(field.querySelectorAll('textarea, input'))

      inputs.forEach(input => {
        if (self.isFieldFilled(input)) {
          field.classList.add(self.populatedClass)
        }

        input.addEventListener('focus', function () {
          input.classList.add(self.focusedClass)
          if (self.isFieldFilled(input)) {
            field.classList.add(self.populatedClass)
          }
        })

        input.addEventListener('blur', function () {
          input.classList.remove(self.focusedClass)
          if (input.value === '') {
            field.classList.remove(self.populatedClass)
          }
        })

        input.addEventListener('keyup', function () {
          field.classList.add(self.populatedClass)
        })
      })
    })
  }
}

export default FloatLabel
