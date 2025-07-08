
const poem = `Two Lakes

A year ago we stood on a beach where lake kissed stone,
A castle crowned the shoreline — a place we called our own.
... (poem continues) ...
A ghost beside the waterline that grief won’t wash away.`;

let i = 0;
function typeWriter() {
  if (i < poem.length) {
    document.getElementById("poem").innerHTML += poem.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
}
window.onload = typeWriter;
