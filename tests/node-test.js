import { expect } from 'chai';
import Node from '../lib/Node.js';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  })

  it('should be a thing', () => {
    expect(node).to.exist
  })

  it('should default next to null', () => {
    expect(node.next).to.equal(null);
  })

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('pizza')
  })

  it('should take data as a parameter and assign it to data prop', () => {
    let node = new Node('pineapple')
    expect(node.data).to.equal('pineapple')
  })

})