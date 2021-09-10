# Docker compose dependency graph generator

Simple generator of dependency graph based on ```depends_on``` declarations in a ```docker-compose.yaml```. The yaml is parsed with [js-yaml](https://github.com/nodeca/js-yaml) and the dependency graph is rendered with [mermaid-cli](https://github.com/mermaid-js/mermaid-cli).

## Requirements

The generator uses [mermaid-cli](https://github.com/mermaid-js/mermaid-cli) and this needs to be installed and available in your PATH, see the project page for installation options but one way is:

```
npm install -g @mermaid-js/mermaid-cli
```

## Installation

Install globally or in your project, to make it available globally:

```
npm install -g dcdg
```

## Usage

```
> dcdg -i docker-compose.yaml -o dependency-graph.png
```

## Example output


<p align="center">
  <img src="https://github.com/oflisback/dcdg/blob/main/docs/example.png?raw=true" alt="Example graph"/>
</p>

## Contribute

Feel free to contribute improvements if you like, the script was created to fullfill a specific need, it's unlikely that it works well with all ```docker-compose.yaml``` variants.
