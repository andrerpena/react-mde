import { assert } from 'chai';
import { insertText, getSurroundingWord } from '../src/TextHelper';

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
    });

    describe('getSurroundingWord', function () {
        // tests without line breaks
        it('Basic usage', function () {
            var result = getSurroundingWord('bob went to school', 5);
            assert.strictEqual(result.word, 'went');
            assert.strictEqual(result.position[0], 4);
            assert.strictEqual(result.position[1], 8);
        });

        it('Word edge to the right', function () {
            var result = getSurroundingWord('bob went to school', 8);
            assert.strictEqual(result.word, 'went');
            assert.strictEqual(result.position[0], 4);
            assert.strictEqual(result.position[1], 8);
        });

        it('Word edge to the left', function () {
            var result = getSurroundingWord('bob went to school', 4);
            assert.strictEqual(result.word, 'went');
            assert.strictEqual(result.position[0], 4);
            assert.strictEqual(result.position[1], 8);
        });

        it('text beginning', function () {
            var result = getSurroundingWord('bob went to school', 0);
            assert.strictEqual(result.word, 'bob');
            assert.strictEqual(result.position[0], 0);
            assert.strictEqual(result.position[1], 3);
        });

        it('text ending', function () {
            var result = getSurroundingWord('bob went to school', 18);
            assert.strictEqual(result.word, 'school');
            assert.strictEqual(result.position[0], 12);
            assert.strictEqual(result.position[1], 18);
        });

        // tests with line breaks
        it('Basic usage with line breaks', function () {
            var result = getSurroundingWord('bob\nwent\nto school', 5);
            assert.strictEqual(result.word, 'went');
            assert.strictEqual(result.position[0], 4);
            assert.strictEqual(result.position[1], 8);
        });

        it('text ending with line break', function () {
            var result = getSurroundingWord('bob went to school\n', 18);
            assert.strictEqual(result.word, 'school');
            assert.strictEqual(result.position[0], 12);
            assert.strictEqual(result.position[1], 18);
        });

        it('text beginning with line break', function () {
            var result = getSurroundingWord('\nbob went to school', 1);
            assert.strictEqual(result.word, 'bob');
            assert.strictEqual(result.position[0], 1);
            assert.strictEqual(result.position[1], 4);
        });

        // edge cases
        it('within spaces', function() {
            var result = getSurroundingWord('   ', 1);
            assert.strictEqual(result.word, '');
            assert.strictEqual(result.position[0], 1);
            assert.strictEqual(result.position[1], 1);
        });

        it('within spaces 2', function() {
            var result = getSurroundingWord('   ', 2);
            assert.strictEqual(result.word, '');
            assert.strictEqual(result.position[0], 2);
            assert.strictEqual(result.position[1], 2);
        });

        it('within line-breaks', function() {
            var result = getSurroundingWord('\n\n\n', 1);
            assert.strictEqual(result.word, '');
            assert.strictEqual(result.position[0], 1);
            assert.strictEqual(result.position[1], 1);
        });
    });

});