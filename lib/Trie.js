import Node from './Node';

export default class Trie {
  constructor() {
    this.count = 0;
    this.children = {};
  }

  insert(word) {
    //break word into individual letters in an array
    let letters = [...word];
    //
    let currentNode = this.children;

    while(letters.length) {
      let firstLetter = letters.shift();
      //make new key
      if (!currentNode[firstLetter]) {
        currentNode[firstLetter] = new Node();
      } 
      //want the true tag at end of word
      if (!letters.length) {
        this.count++;
        currentNode[firstLetter].completeWord = word;
      }
      //reassign currentNode
      currentNode = currentNode[firstLetter].children;
      }

    }

  
    //take in value
    //traverse down to last letter
    //from last letter, check children node's for .completedWord = true
    //'return' words (if .completedWord is true) AND continue travering word
    // let currentNode = this.children;
  suggest(word) {
    let letters = [...word];
    let currentLevel = this.children;
    let suggestions = []
    //gets us to all the possible nodes
    while(letters.length) { // gets us down to the last known possible node
     let currentLetter = letters.shift();
     let letterKey = Object.keys(currentLevel);
     if(letterKey.find(letter => letter === currentLetter)) {
       currentLevel = currentLevel[currentLetter].children;
     }
   }

      let letterOptions = Object.keys(currentLevel);

      const findWords = (array, level) => {
        array.forEach(letter => {
          let recursiveLevel = level;
          if (recursiveLevel[letter].completeWord) {

            suggestions.push(recursiveLevel[letter].completeWord)
          }
        
          if (Object.keys(recursiveLevel[letter].children).length) {
            recursiveLevel = recursiveLevel[letter].children;
            findWords(Object.keys(recursiveLevel), recursiveLevel);
          }
        })
      }
      //recursively running findwords
      findWords(letterOptions, currentLevel);
      return suggestions
    }
  }

  // select() {

  // }

  // delete(string) {

  // }


