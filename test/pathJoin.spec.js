var toUrl = require('../src/pathJoin');

describe('join path and lowPath', function() {
  var path = 'http://pubannotation.org/docs/sourcedb/PubMed/sourceid/10022882',
    lowPath = 'spans/1-2',
    expected = 'http://pubannotation.org/docs/sourcedb/PubMed/sourceid/10022882/spans/1-2';

  it('when path end with /', function() {
    expect(toUrl(path + '/', lowPath))
      .toEqual(expected);
  });

  it('when path end without /', function() {
    expect(toUrl(path, lowPath))
      .toEqual(expected);
  });
});
