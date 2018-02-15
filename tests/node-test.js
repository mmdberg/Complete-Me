import { expect } from 'chai';
import Node from '../lib/Node';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node()
  })

  it('should instantiate our good friend node', () => {
    expect(node).to.exist
  })

  it('should store nodes', () => {
    expect(node.children).to.deep.equal({})
  })

  it('should start with no popularity', () => {
    expect(node.popularity).to.equal(0)
  })

  it('should not be a complete word', () => {
    expect(node.completeWord).to.equal(false)
  })

})