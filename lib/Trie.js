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
      let firstLetter = letters.shift();

      if (!currentNode[firstLetter]) {
        currentNode[firstLetter] = new Node();
      } 
      if (!letters.length) {
        this.count++;
        currentNode[firstLetter].completeWord = word;
      }
      currentNode = currentNode[firstLetter].children;
    }
  }

  suggest(prefix) {
    let letters = [...prefix];
    let currentLevel = this.children;
    let suggestions = [];

    while (letters.length) {
      let currentLetter = letters.shift();
      let letterKeys = Object.keys(currentLevel);

      if (letterKeys.find(letter => letter === currentLetter)) {
        currentLevel = currentLevel[currentLetter].children;
      } else {
        return suggestions;
      }
    }
    let letterOptions = Object.keys(currentLevel);

    const findWords = (letterArray, levelObject) => {
      letterArray.forEach(letter => {
        let recursiveLevel = levelObject;

        if (recursiveLevel[letter].completeWord) {
          if (recursiveLevel[letter].popularity === 0) {
            suggestions.push(recursiveLevel[letter].completeWord);
          } else {
            suggestions.unshift(recursiveLevel[letter].completeWord);
          }
        }
        let recursiveKeys = Object.keys(recursiveLevel[letter].children);

        if (recursiveKeys.length) {
          recursiveLevel = recursiveLevel[letter].children;

          findWords(Object.keys(recursiveLevel), recursiveLevel);
        }
      });
    };

    findWords(letterOptions, currentLevel);
    return suggestions;
  }


  populate(array) {
    array.forEach(word => {
      this.insert(word);
    });
  }

  select(word) {
    let letters = [...word];
    let currentLevel = this.children;

    while (letters.length > 1) {
      let currentLetter = letters.shift();
      let letterKey = Object.keys(currentLevel);

      if (letterKey.find(letter => letter === currentLetter)) {
        currentLevel = currentLevel[currentLetter].children;     
      }
    }
    currentLevel[letters].popularity++;
  }


  delete(word) {
    let letters = [...word];
    let currentLevel = this.children;

    while (letters.length > 1) {
      let currentLetter = letters.shift();
      let letterKey = Object.keys(currentLevel);

      if (letterKey.find(letter => letter === currentLetter)) {
        currentLevel = currentLevel[currentLetter].children;     
      }
    }
    currentLevel[letters].completeWord = false;

  }
}


