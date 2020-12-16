const targetChecked = (target) => {
    if(!target) return
    const roles = {
      developer: false,
      designer: false,
      entrepreneur: false
    }
    roles[target] = true
    return roles
  }

module.exports = targetChecked