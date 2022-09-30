let locals = []
let i=1
let pass = false
while(true){
  if(locals.length < 38){
    let local = document.querySelector(`.t${i}`)
    locals.push(local)
  }else{
    while(true){
      let position = Math.round(Math.random()*(locals.length-1))
      let time = Math.random()*9.5+1
      let tam = Math.round(Math.random()*5)+1
      locals[position].style.cssText = `
        width: ${tam}vw;
        height: ${tam}vw;
        animation: bubble ${time}s infinite;
      `
      locals.sort()
      locals.splice(position, 1)
      if(locals.length == 0){
        pass = true
        break
      }
    }
  }
  if(pass){ break }
  i++
}