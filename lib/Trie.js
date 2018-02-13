import Node from './Node';

export default class Trie {
  constructor() {
    this.count = 0;
    this.children = {};
  }

  insert(word) {
    this.count++;
    let letters = [...word];
    let currentNode = this.children;

    while(letters.length) {
      let firstLetter = letters.shift();
      if (!currentNode[firstLetter]) {
        currentNode[firstLetter] = new Node();
      } 

      if (!letters.length) {
        currentNode[firstLetter].completeWord = true
      }
      
      currentNode = currentNode[firstLetter].children;

      }

    }

  }

  suggest(string) {
    let suggestions = [];
    let letters = [...string];
    let currentLevel = this.children;
    let result = [];

    while (letters.length) {
      let firstLetter = letters.shift();
      if(!currentLevel[firstLetter]) {
        
      }
    }
  }

  // populate(dictionary) {

  // }

  // select() {

  // }

  // delete(string) {

  // }


