import assert from 'assert'
import toUrl from '../src/pathJoin'

describe('join path and lowPath', () => {
    const path = 'http://pubannotation.org/docs/sourcedb/PubMed/sourceid/10022882',
        lowPath = 'spans/1-2',
        expected = 'http://pubannotation.org/docs/sourcedb/PubMed/sourceid/10022882/spans/1-2'

    it('when path end with /', () => assert.equal(toUrl(path + '/', lowPath), expected))
    it('when path end without /', () => assert.equal(toUrl(path, lowPath), expected))
});
