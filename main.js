import "./style.scss";
import gsap from "gsap";
gsap.registerPlugin(MotionPathPlugin);

const nextBtn = document.querySelector(".navigation .next");
const prevBtn = document.querySelector(".navigation .prev");

const nextOrder = [
  [1, 2, 3],
  [3, 1, 2],
  [2, 3, 1],
];
const prevOrder = [
  [2, 3, 1],
  [1, 2, 3],
  [3, 1, 2],
];
const transformObjects = [
  // initial image 1
  {
    width: "500px",
    top: "-50px",
    left: "200px",
    transform: "rotate(10deg)",
  },

  // initial image 3
  {
    width: "200px",
    top: "500px",
    left: "-80px",
    transform: "rotate(110deg)",
  },

  // initial image 2
  {
    width: "200px",
    top: "-100px",
    left: "-80px",
    transform: "rotate(-28deg)",
  },
];

const transformTools = [
  // initial image 1
  {
    top: "-50px",
    left: "200px",
    scale: 1,
    opacity: 1,
  },

  // initial image 3
  {
    top: "500px",
    left: "-80px",
    scale: 0,
    opacity: 0,
  },

  // initial image 2
  {
    top: "-100px",
    left: "-80px",
    scale: 0,
    opacity: 0,
  },
];

let cliPathNumber = 0;

function animation(current) {
  const order = this.classList.contains("next") ? nextOrder : prevOrder;
  for (let j = 0; j < 3; j++) {
    const img = document.querySelector(`.image-${order[current - 1][j]}`);
    gsap.to(img, transformObjects[j]);
    const tool = document.querySelector(`.tool-${order[current - 1][j]}`);
    gsap.to(tool, transformTools[j]);
  }
  const clipPathDiv = document.createElement("div");
  clipPathDiv.classList.add(`clipPath`);
  clipPathDiv.style.clipPath = "circle(0% at 100% 0)";
  clipPathDiv.style.zIndex = cliPathNumber;
  cliPathNumber++;
  if (current === 1) {
    clipPathDiv.style.backgroundColor = "#0093c9f2";
    document.querySelector("h1").style.color = "#0C97CB";
    gsap.to("button", {
      borderColor: "#0C97CB",
      color: "#0C97CB",
    });
    // clipPathDiv.style.backgroundColor = "#ffe609f2";
    // document.querySelector("h1").style.color = "#DCC00C";
    // gsap.to("button", {
    //   borderColor: "#DCC00C",
    //   color: "#DCC00C",
    // });
  } else if (current === 2) {
    clipPathDiv.style.backgroundColor = "#e42326f2";
    document.querySelector("h1").style.color = "#B8181D";
    gsap.to("button", {
      borderColor: "#B8181D",
      color: "#B8181D",
    });
  } else if (current === 3) {
    clipPathDiv.style.backgroundColor = "#dd6b22f2";
    document.querySelector("h1").style.color = "#AB5115";
    gsap.to("button", {
      borderColor: "#AB5115",
      color: "#AB5115",
    });
  }
  const clipPaths = document.querySelector(".clipPaths");
  clipPaths.appendChild(clipPathDiv);
  gsap.to(clipPathDiv, {
    duration: 1,
    clipPath: "circle(200% at 100% 0)",
  });
  if (clipPaths.children.length > 3) {
    clipPaths.removeChild(clipPaths.children[0]);
  }
}

let current = 0;

nextBtn.addEventListener("click", () => {
  current++;
  if (current > 3) {
    current = 1;
  }
  animation.call(nextBtn, current);
});

prevBtn.addEventListener("click", () => {
  current--;
  if (current < 0) {
    current = 2;
  } else if (current === 0) {
    current = 3;
  }
  animation.call(nextBtn, current);
});
