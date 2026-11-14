const gallery = document.querySelector(".gallery");
const sceneLinks = Array.from(document.querySelectorAll(".scene-link"));

if (gallery && typeof gallery.showModal === "function") {
  const galleryImage = gallery.querySelector(".gallery-image");
  const galleryTitle = gallery.querySelector("#gallery-title");
  const galleryCount = gallery.querySelector(".gallery-count");
  let activeScene = 0;

  function showScene(index) {
    activeScene = (index + sceneLinks.length) % sceneLinks.length;
    const link = sceneLinks[activeScene];
    galleryImage.src = link.href;
    galleryImage.alt = link.querySelector("img").alt;
    galleryTitle.textContent = link.closest("figure").querySelector(".scene-title").textContent;
    galleryCount.textContent = `${activeScene + 1} / ${sceneLinks.length}`;
  }

  sceneLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showScene(index);
      gallery.showModal();
    });
  });

  gallery.querySelector(".gallery-previous").addEventListener("click", () => showScene(activeScene - 1));
  gallery.querySelector(".gallery-next").addEventListener("click", () => showScene(activeScene + 1));

  gallery.addEventListener("click", (event) => {
    if (event.target === gallery) gallery.close();
  });

  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showScene(activeScene + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
}
