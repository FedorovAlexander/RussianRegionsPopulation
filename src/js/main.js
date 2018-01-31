function showDiagrams() {
  var barchartBtn = document.querySelector(".buttons__item--bar")
  var bubblesBtn = document.querySelector(".buttons__item--bubble")
  var barchart = document.querySelector(".barchart")
  var bubbles = document.querySelector(".bubble-chart")

  bubblesBtn.onclick =  function() {
    bubbles.classList.remove("hidden-block")
    barchart.classList.add("hidden-block")
    bubblesBtn.classList.add("btn-active")
    barchartBtn.classList.remove("btn-active")
  }
  barchartBtn.onclick =  function() {
    barchart.classList.remove("hidden-block")
    bubbles.classList.add("hidden-block")
    barchartBtn.classList.add("btn-active")
    bubblesBtn.classList.remove("btn-active")
  }
}
showDiagrams();
