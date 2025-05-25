const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const totalBonecas = 12;
const radius = 36;
const spacing = 78; 

const totalLength = (totalBonecas - 1) * spacing + 2 * radius;
const leftMargin = (width - totalLength) / 2 + radius;

const nodesData = d3.range(1, totalBonecas + 1).reverse();

const nodes = svg.selectAll("circle")
  .data(nodesData)
  .enter()
  .append("circle")
  .attr("class", "node")
  .attr("cx", (d, i) => leftMargin + i * spacing)
  .attr("cy", height / 2)
  .attr("r", radius);

const labels = svg.selectAll("text")
  .data(nodesData)
  .enter()
  .append("text")
  .attr("x", (d, i) => leftMargin + i * spacing)
  .attr("y", height / 2 + 6)
  .attr("text-anchor", "middle")
  .text(d => `Boneca ${d}`);

function contarBonecasVisual(n) {
  if (n === 0) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    nodes.classed("active", d => d === n);
    console.log(`Abrindo boneca ${n}`);

    setTimeout(() => {
      contarBonecasVisual(n - 1).then(resolve);
    }, 800);
  });
}

document.getElementById("start-btn").onclick = () => {
  contarBonecasVisual(totalBonecas).then(() => {
    nodes.classed("active", false);
    alert("Recursão finalizada!");
  });
};
