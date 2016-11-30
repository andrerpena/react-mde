import { assert } from 'chai';
import { insertText } from '../src/TextHelper';

describe("TextHelperSpec.js", function () {
    describe('insertText', function () {
        it('should work mid-string', function () {
            var text = insertText('bob school', 'went to ', 4);
            assert.strictEqual(text, 'bob went to school');
        });
        it('should work in the start', function () {
            var text = insertText('went to school', 'bob ', 0);
            assert.strictEqual(text, 'bob went to school');
        });
        it('should work in the end', function () {
            var text = insertText('bob went to', ' school', 11);
            assert.strictEqual(text, 'bob went to school');
        });

        it('should work with a position greater than the max', function () {
            var text = insertText('bob went to', ' school', 20);
            assert.strictEqual(text, 'bob went to school');
        });
    })
});