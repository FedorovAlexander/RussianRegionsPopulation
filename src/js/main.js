function showDiagrams() {
  var barchartBtn = document.querySelector(".buttons__bar")
  var bubblesBtn = document.querySelector(".buttons__bubble")
  var barchart = document.querySelector(".barchart")
  var bubbles = document.querySelector(".bubble-chart")

  bubblesBtn.onclick =  function() {
    bubbles.classList.remove("hidden-block")
    barchart.classList.add("hidden-block")
  }
  barchartBtn.onclick =  function() {
    barchart.classList.remove("hidden-block")
    bubbles.classList.add("hidden-block")
  }
}
showDiagrams();
