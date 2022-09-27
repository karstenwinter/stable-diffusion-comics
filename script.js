window.addEventListener('DOMContentLoaded', (event) => 
{
  console.log("fired DOMContentLoaded")
  const status = document.getElementsByClassName("text bottom-right")[0]
  const arr = Array.from(document.getElementsByTagName("img"))
  console.log({status, arr})
  const statusBefore = status.innerHTML
  const setStatus = x =>
  status.innerHTML = statusBefore.trim().replace("2022\n<br>", "2022") + " <span style='color: silver'>| " + x + "</span>"

  setStatus("Images: " + arr.length + " | loading ")
  
  arr.forEach(item => {
      item.setAttribute("src2", item.attributes.src.value)
      item.removeAttribute("src")
  })

  function iter(i) {
    const item = arr[i]
    if(item) {
      const a = new Image()
      a.onload = () => {
        setTimeout(() => {
          item.setAttribute("src", item.attributes.src2.value)
          item.removeAttribute("src2")
          iter(i + 1)
        }, 10)
      }
      setStatus("Images: " + arr.length + (i === arr.length - 1 ? "" : " | loading #" + i))
      a.src = item.attributes.src2.value
    }  
  }

  iter(0)
});