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
    it('should create keys in children object', () => {
      trie.insert('pizza');
      trie.insert('dog')
      expect(Object.keys(trie.children)).to.deep.equal(['p', 'd'])
    })

    it('should be able to take in and store multiple words', () => {
      trie.insert('tacocat');
      trie.insert('pizza');
      trie.insert('cat');
      expect(Object.keys(trie.children)).to.deep.equal(['t', 'p', 'c']);
      expect(trie.count).to.equal(3);
    })

    it('should not duplicate nodes when words start with the same letter', () => {
      trie.insert('tacocat');
      trie.insert('pizza');
      trie.insert('cat');
      trie.insert('piano');
      expect(Object.keys(trie.children)).to.deep.equal(['t', 'p', 'c']);
      expect(trie.count).to.equal(4);
    })

    it('should increase the count if the full word is added', () => {
      expect(trie.count).to.equal(0);
      trie.insert("pizza");
      expect(trie.count).to.equal(1);
    })
  });

  describe('SUGGEST', () => {
    it('should suggest a word based on a prefix', () => {
      trie.insert('pizza');
      expect(trie.suggest('pi')).to.deep.equal(['pizza'])
    })

    it('should suggest array of words based on prefix if more than one word matches', () => {
      trie.insert('pizza');
      trie.insert('piano');
      trie.insert('patio');
      expect(trie.suggest('p')).to.deep.equal(['pizza', 'piano', 'patio'])
    })

    it('should not suggest words that do not follow the prefix', () => {
      trie.insert('pizza');
      trie.insert('piano');
      trie.insert('dog');
      trie.insert('patio');
      expect(trie.suggest('pi')).to.deep.equal(['pizza', 'piano'])
    })

    it('should not suggest words if no words follow the prefix', () => {
      trie.insert('pizza');
      trie.insert('piano');
      trie.insert('dog');
      expect(trie.suggest('f')).to.deep.equal([])
    })
  })

  describe('POPULATE', () => {
    it('should populate a dictionary', () => {
      expect(trie.count).to.equal(0);

      trie.populate(dictionary);

      expect(trie.count).to.equal(235886);
    })

    it('should suggest words from the dictionary', () => {
      trie.populate(dictionary);

      expect(trie.suggest('piz')).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
    })
  })

  describe('SELECT', () => {
    it('should prioritize words previously selected in the suggestion list', () => {
      trie.insert('pizza');
      trie.insert('piano');
      trie.insert('patio');
      trie.insert('dog');
      expect(trie.suggest('p')).to.deep.equal(['pizza', 'piano', 'patio']);
      trie.select('piano');
      expect(trie.suggest('p')).to.deep.equal(['piano', 'pizza', 'patio']);
    })
  })

  describe('DELETE', () => {
    it('should delete unwanted words from suggestion list', () => {
      trie.insert('polar');
      trie.insert('piano');
      trie.insert('pizzicato');
      expect(trie.suggest('pi')).to.deep.equal(['piano', 'pizzicato'])
      trie.delete('pizzicato')
      expect(trie.suggest('pi')).to.deep.equal(['piano'])
    }) 

    it('should decrement word count', () => {
      trie.insert('pizza');
      expect(trie.count).to.equal(1);
      trie.delete('pizza');
      expect(trie.count).to.equal(0);
    }) 
  })
})
