import { expect } from 'chai';
import Node from '../lib/Node';
import Trie from '../lib/Trie';
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

//console.log(JSON.stringify(trie, null, 4))

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should instantiate our good friend trie', () => {
    expect(trie).to.exist;
  });

  it('should track number of words', () => {
    expect(trie.count).to.equal(0);
  });

  it('should store nodes', () => {
    expect(trie.children).to.deep.equal({})
  });

  describe('INSERT', () => {
    it('should increase the count', () => {
      expect(trie.count).to.equal(0);
      trie.insert("pizza");
      expect(trie.count).to.equal(1);
    })

    it('should create keys in children object of first letter', () => {
      trie.insert('pizza');
      trie.insert('dog')
      expect(Object.keys(trie.children)).to.deep.equal(['p', 'd'])
    })

    it('should be able to take in more than one word starting w/ the same letter', () => {
      trie.insert('tacocat');
      trie.insert('pizza');
      trie.insert('cat');
      trie.insert('piano');
      expect(Object.keys(trie.children)).to.deep.equal(['t', 'p', 'c']);
      expect(trie.count).to.equal(4);

    })

  });

  describe('Suggest', () => {
    it('should suggest array of words', () => {
      trie.insert('pizza');
      trie.insert('piano');
      trie.insert('dog');
      console.log(JSON.stringify(trie, null, 4))
      expect(trie.suggest('pi')).to.deep.equal(['pizza', 'piano'])

    })
    
  })
})

  // describe('Delete', () => {

    
//})
