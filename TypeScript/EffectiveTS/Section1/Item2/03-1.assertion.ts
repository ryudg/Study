const el = document.getElementById("status");
// el.textContent = "Ready";
// ^^ 'el'은(는) null일 수 있습니다.

if (el) {
  el.textContent = "Ready";
}
el!.textContent = "Ready";
