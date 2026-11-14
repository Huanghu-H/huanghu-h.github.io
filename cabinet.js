const palette = document.querySelector(".palette");

if (palette && navigator.clipboard?.writeText) {
  const status = palette.querySelector(".palette-status");
  status.hidden = false;

  for (const button of palette.querySelectorAll("button")) {
    button.hidden = false;
    button.addEventListener("click", async () => {
      const color = button.closest("li").querySelector("code").textContent;
      try {
        await navigator.clipboard.writeText(color);
        status.textContent = `已复制 ${color}`;
      } catch {
        status.textContent = `请选中色号 ${color} 手动复制。`;
      }
    });
  }
}
