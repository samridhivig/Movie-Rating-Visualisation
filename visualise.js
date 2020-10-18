// https://observablehq.com/@samridhivig/introduction-to-d3js@177
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Introduction to D3js`
)});
  main.variable(observer("petalPath")).define("petalPath", function(){return(
'M 0,0 C -10,-10 -10,40 0,-50 C 10,-40 10,-10 0,0'
)});
  main.variable(observer()).define(["html","petalPath"], function(html,petalPath){return(
html`<svg width="100" height="100"><path transform="translate(40,60)" d="${petalPath}"></svg>`
)});
  main.variable(observer("secondPetalPath")).define("secondPetalPath", function(){return(
'M 0,0 C -30,0 -10,-40 0,-50 C 10,-40 30,0 0,0'
)});
  main.variable(observer()).define(["html","secondPetalPath"], function(html,secondPetalPath){return(
html`<svg width="100" height="100" fill="purple" fill-opacity="0.5"><path transform="translate(50,60)" d="${secondPetalPath}"></svg>`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3')
)});
  main.variable(observer("_")).define("_", ["require"], function(require){return(
require('lodash')
)});
  main.variable(observer("data")).define("data", ["d3","_"], function(d3,_){return(
d3.json('https://raw.githubusercontent.com/sxywu/filmflowers/master/movies.json').then(data => _.values(data))
)});
  main.variable(observer("petalSize")).define("petalSize", function(){return(
50
)});
  main.variable(observer()).define(["DOM","petalSize","d3","data","_","secondPetalPath"], function(DOM,petalSize,d3,data,_,secondPetalPath)
{
const svg = DOM.svg(petalSize * 2,petalSize * 2);
const ratingMinMax = d3.extent(data, d => +d.imdbRating);
const votesMinMax = d3.extent(data, d => +d.imdbVotes.replace(',',''));
const sizeScale = d3.scaleLinear().domain(ratingMinMax).range([0.25,1]);
const numPetalScale = d3.scaleQuantize().domain(votesMinMax).range([3,6,9,12,15,18]);

const movieIndex = 10;
const numPetals = numPetalScale(+data[movieIndex].imdbVotes.replace(',',''));
const sizePetal = sizeScale(+data[movieIndex].imdbRating);
const flower = {
  sizePetal,
  petals: _.times(numPetals, i => {return {angle: 360 * i / numPetals, secondPetalPath}})
};
 console.log(flower);
const flowers = d3.select(svg)
    .selectAll('g')
    .data([flower]).enter().append('g')
    .attr('transform', `translate(50,50)`);

 flowers.selectAll('path')
        .data(d => d.petals).enter().append('path')
        .attr('d', d => d.secondPetalPath)
        .attr('transform', d => `rotate(${d.angle})`);
  

 return svg;
}
);
  return main;
}
