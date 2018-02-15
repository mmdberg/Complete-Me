import Node from './Node';

export default class Trie {
  constructor() {
    this.count = 0;
    this.children = {};
  }

  insert(word) {
    let letters = [...word];
    let currentNode = this.children;

    while (letters.length) {
      let currentLetter = letters.shift();

      if (!currentNode[currentLetter]) {
        currentNode[currentLetter] = new Node()
      }

      if (!letters.length) {
        currentNode[currentLetter].completeWord = word;
        this.count++;
      }

      currentNode = currentNode[currentLetter].children
    }
  }

  suggest(prefix) {
    let letters = [...prefix];
    let currentNode = this.children;
    let suggestions = [];

    while (letters.length) {
      let currentLetter = letters.shift();
      let letterKeys = Object.keys(currentNode);

      if (letterKeys.find(letter => letter === currentLetter)) {
        currentNode = currentNode[currentLetter].children;
      } else {
        return suggestions;
      }
    }

    let letterOptions = Object.keys(currentNode);

    this.findWords(letterOptions, currentNode, suggestions);
    return suggestions;
  }

  findWords(letterArray, node, suggestions) {
    letterArray.forEach(letter => {
      let recursiveNode = node;

      if (recursiveNode[letter].completeWord) {
        if (recursiveNode[letter].popularity === 0) {
          suggestions.push(recursiveNode[letter].completeWord);
        } else {
          suggestions.unshift(recursiveNode[letter].completeWord);
        }
      }
      let recursiveKeys = Object.keys(recursiveNode[letter].children);

      if (recursiveKeys.length) {
        recursiveNode = recursiveNode[letter].children;
        let letterOptions = Object.keys(recursiveNode);

        this.findWords(letterOptions, recursiveNode, suggestions);
      }
    });
    return suggestions;
  }

  populate(array) {
    array.forEach(word => {
      this.insert(word);
    });
  }

  traverseDown(lettersArray) {
    let currentNode = this.children;

    while (lettersArray.length > 1) { 
      let currentLetter = lettersArray.shift();
      let letterKeys = Object.keys(currentNode);

      if (letterKeys.find(letter => letter === currentLetter)) {
        currentNode = currentNode[currentLetter].children;
      }
    }
    return currentNode;
  }

  select(word) {
    let letters = [...word];
    let lastNode = this.traverseDown(letters);

    lastNode[letters].popularity++;
  }

  delete(word) {
    let letters = [...word];
    let lastNode = this.traverseDown(letters);

    lastNode[letters].completeWord = false;
    this.count--
  }
}