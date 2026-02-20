import getRandomUniqueArray from "./utils/getRandomUniqueArray.js"

const graph1 = document.getElementById('graph1')
const graph2 = document.getElementById('graph2')

const arrLength = 10
const arr = getRandomUniqueArray(arrLength)
const arr2 = getRandomUniqueArray(arrLength)

function renderBars() {
  graph1.innerHTML = ''

  arr.forEach((num) => {
    //create a bar
    const bar = document.createElement('div')
    bar.className = `h-[${num * 10}px] w-[3px] bg-black`
    graph1.appendChild(bar)
  })
}

function renderBars2() {
  graph2.innerHTML = ''

  arr2.forEach((num) => {
    //create a bar
    const bar = document.createElement('div')
    bar.className = `h-[${num * 10}px] w-[3px] bg-black`
    graph2.appendChild(bar)
  })
}

function highlightIndices(indices, graphNumber){
  // console.log(indices, graphNumber);
  if(graphNumber === 1){
    graph1.children[indices[0]].classList.add('bg-blue-500')
    graph1.children[indices[1]].classList.add('bg-blue-500')
  } else if(graphNumber === 2){
    graph2.children[indices[0]].classList.add('bg-blue-500')
    graph2.children[indices[1]].classList.add('bg-blue-500')
  } else {

  }
}

//initial bar rendering
renderBars()
bubbleSort()
selectionSort()

function bubbleSort(){
  let i = 0, j = 0
  let interval = setInterval(() => {
    if(i >= arrLength - 1){
      clearInterval(interval)
      return
    }

    if(arr[j] > arr[j + 1]){
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
    renderBars()
    highlightIndices([j, j + 1], 1)
    j++
    if (j >= arr.length - i - 1) {
      j = 0;
      i++;
    }
  }, 500)
}

function selectionSort(){
  let i = 0
  let interval = setInterval(() => {
    if(i >= arrLength - 1){
      clearInterval(interval)
      return
    }
    
    //find the smallest index and swap
    let minIndex = i
    for(let j = i + 1; j < arrLength; j++){
      if(arr2[j] < arr2[minIndex]){
        minIndex = j
      }
    }
    
    if(minIndex != i){
      let temp = arr2[i]
      arr2[i] = arr2[minIndex]
      arr2[minIndex] = temp
    }

    renderBars2()
    highlightIndices([i, minIndex], 2)
    i++

  }, 500)
}




