document.addEventListener('DOMContentLoaded',() => {
  getPups().then(pups => {
    pups.forEach(pup => renderPupTile(pup))
  })

  addEventToFilterBtn()
})

const addEventToFilterBtn = () => {
  const filterBtn = document.querySelector('#good-dog-filter')
  filterBtn.addEventListener('click',(e) => {
    filterPups(e.target)
  })
}

const filterPups = (button) => {

  document.querySelector("#dog-bar").innerText = ""

  if(button.innerText === "Filter good dogs: OFF"){
    button.innerText = "Filter good dogs: ON"
    getPups().then(pups => {
      const goodPups = pups.filter(pup => pup.isGoodDog)
      goodPups.forEach(pup => renderPupTile(pup))
    })
  }else{
    button.innerText = "Filter good dogs: OFF"
    getPups().then(pups => {
      pups.forEach(pup => renderPupTile(pup))
    })
  }
}

const getPups = () => {
  return fetch('http://localhost:3000/pups')
  .then(res => res.json())
}

const renderPupTile = (pup) => {
  // create a span tag
  const pupTile = document.createElement('span')

  // set the name
  pupTile.innerText = pup.name

  pupTile.addEventListener('click',() => {
    showPupInfo(pup)
  })
  // add it to the DOM
    // Get the parent tag
  const dogBar = document.querySelector('#dog-bar')
  dogBar.append(pupTile)
}


const showPupInfo = (pup) => {

  const dogInfoParent = document.querySelector('#dog-info')
  dogInfoParent.innerHTML = ''

  const pupImg = document.createElement('img')
  pupImg.src = pup.image

  const pupName = document.createElement('h2')
  pupName.innerText = pup.name

  const pupButton = document.createElement('button')
  if(pup.isGoodDog){
    pupButton.innerText = "Good Dog"
  }else{
    pupButton.innerText = "Bad Dog"
  }

  pupButton.addEventListener('click',() => {

    if(!pup.isGoodDog){
      pupButton.innerText = "Good Dog"
    }else{
      pupButton.innerText = "Bad Dog"
    }

    fetch(`http://localhost:3000/pups/${pup.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isGoodDog: !pup.isGoodDog })
    }).then(res => res.json())
    // .then(pup => showPupInfo(pup))
  })

  dogInfoParent.append(pupImg,pupName,pupButton)
}
