child = require('child_process');

function graphviz2svg(graphtype, source, data) {
  var graphviz_font = "sans";
  var source = source;

  if (!source.match(/^\s*(di)?graph\s+\w+\s+\{/)) {
    var font = 'sans';

    if (data[graphtype+'_font']) {
      font = data[graphtype+'_font'];
    }

    source = graphtype + " G {\n"
            + "graph [fontname = \""+font+"\"];\n"
            + "node [fontname = \""+font+"\"];\n"
            + "edge [fontname = \""+font+"\"];\n"
            + source
            + "\n}\n";
  }

  result = spawnSync("dot", ["-Tsvg"], {input: source});

  if (result.error) {
    if (result.error.errno === 'ENOENT') {
      msg = "dot program not found in PATH.  Install GraphViz (http://graphviz.org)\n"

      if (process.platform === 'linux') {
        msg += "\nRun 'sudo apt-get install graphviz'"
      }

      throw new Error(msg);
    }
  });

  output = result.stdout.toString().replace(/^<\?xml.*?\?>\s*/, '');
  output = output.replace(/^<!DOCTYPE[^>]*>\s*/, '');

  return output;
}

function digraph2svg(source, data) {
  return graphviz2svg('digraph', source, data)
}

function graph2svg(source, data) {
  return graphviz2svg('graph', source, data)
}

module.exports = {
  "digraph2svg": digraph2svg,
  "graph2svg": graph2svg
}

if (require.main === module) {
  var content;
  process.stdin.on('data', function(chunk) {
    content += chunk.toString();
  });

  process.stdin.on('end', function() {
    if (content.match(/--/g).length > content.match(/->/g).length) {
      process.stdout.write(graph2svg(content));
    };
  });
}
