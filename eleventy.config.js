export default function (config) {
  config.ignores.add("README.md");

  config.setServerPassthroughCopyBehavior("passthrough");

  config.addPassthroughCopy("icon.svg");
  config.addPassthroughCopy("main.css");
};
