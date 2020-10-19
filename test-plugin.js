class TestWebpackPlugin {
  constructor(chunks) {
    this.chunks = chunks || "";
  }

  apply(compiler) {
    compiler.hooks.done.tap("TestWebpackPlugin", stats => {
      let temporaryOutputFile = stats.toJson();
      // .assets.find(asset => asset.name === "mix.js");

      if (temporaryOutputFile) {
        const assets = temporaryOutputFile.assets;

        const fA = assets.filter(x =>
          x.chunks.filter(y => y.startsWith(this.chunks))
        );
        console.log(fA);

        // console.log(temporaryOutputFile.assets.map(x => x.name));
        // delete stats.compilation.assets[temporaryOutputFile.name];
        //
        // File.find(
        //   path.resolve(Config.publicPath, temporaryOutputFile.name)
        // ).delete();
      }
    });

    compiler.hooks.shouldEmit.tap("TestWebpackPlugin", compilation => {
      console.log("Compiled TEST");
      // console.log(compilation);

      return true;
    });
  }
}

module.exports = TestWebpackPlugin;
