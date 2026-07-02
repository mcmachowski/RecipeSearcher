import "@testing-library/jest-dom";

beforeEach(() => {
  const drawerDiv = document.createElement("div");
  drawerDiv.setAttribute("id", "side-drawer");
  document.body.appendChild(drawerDiv);
});

afterEach(() => {
  document.body.innerHTML = "";
});