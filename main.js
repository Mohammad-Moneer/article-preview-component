const shareBtn = document.getElementById("shareBtn");
const menu = document.getElementById("shareMenu");
const items = menu.querySelectorAll('[role="menuitem"]');

shareBtn.addEventListener("click", () => {
  const expanded = shareBtn.getAttribute("aria-expanded") === "true";
  expanded ? closeMenu() : openMenu();
});

// Allow arrow key navigation inside menu
let currentIndex = 0;

items.forEach((item, i) => {
  item.addEventListener("keydown", (e) => {
    // Move forward: ArrowRight, ArrowDown, or Tab
    if (
      e.key === "ArrowRight" ||
      e.key === "ArrowDown" ||
      (e.key === "Tab" && !e.shiftKey)
    ) {
      e.preventDefault();
      currentIndex = (i + 1) % items.length;
      // the % is a smart way to cycle around the menu items like a circle.
      items[currentIndex].focus();

      // Move backward: ArrowLeft, ArrowUp, or Shift + Tab
    } else if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      (e.key === "Tab" && e.shiftKey)
    ) {
      e.preventDefault();
      currentIndex = (i - 1 + items.length) % items.length;
      items[currentIndex].focus();
    } else if (e.key === "Escape") {
      closeMenu();
    }
  });
});

function openMenu() {
  shareBtn.setAttribute("aria-expanded", "true");
  shareBtn.classList.add("menu-visible");
  menu.classList.add("visible");
  menu.setAttribute("aria-hidden", "false");
  setTimeout(() => items[0].focus(), 100);
  // Wait briefly to let the browser apply visibility and layout changes before focusing;
  // without this delay, focus may fail if the menu is still hidden or being repainted.

  // Add outside click listener only while menu is open
  window.addEventListener("click", handleOutsideClick);
}

function closeMenu() {
  shareBtn.setAttribute("aria-expanded", "false");
  shareBtn.classList.remove("menu-visible");
  menu.classList.remove("visible");
  menu.setAttribute("aria-hidden", "true");
  shareBtn.focus();
  // Automatically restore focus to the Share button when the menu closes.

  // Remove outside click listener when menu closes
  window.removeEventListener("click", handleOutsideClick);
}

function handleOutsideClick(e) {
  if (!shareBtn.contains(e.target) && !menu.contains(e.target)) {
    closeMenu();
  }
}