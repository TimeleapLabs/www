export const fixLabelTooltip = (el) => {
  el.querySelector(".bx--tooltip__trigger").addEventListener("click", (e) => {
    e.preventDefault();
  });
};
