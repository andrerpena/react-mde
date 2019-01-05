// import {assert} from "chai";
// import {getSurroundingWord, insertText} from "../src/util/MarkdownUtil";
//
// describe("TextHelperSpec.js", () => {
//     describe("insertText", () => {
//         it("should work mid-string", () => {
//             const text = insertText("bob school", "went to ", 4);
//             assert.deepEqual(text, {newText: "bob went to school", insertionLength: 8});
//         });
//         it("should work in the start", () => {
//             const text = insertText("went to school", "bob ", 0);
//             assert.deepEqual(text, {newText: "bob went to school", insertionLength: 4});
//         });
//         it("should work in the end", () => {
//             const text = insertText("bob went to", " school", 11);
//             assert.deepEqual(text, {newText: "bob went to school", insertionLength: 7});
//         });
//
//         it("should work with a selection greater than the max", () => {
//             const text = insertText("bob went to", " school", 20);
//             assert.deepEqual(text, {newText: "bob went to school", insertionLength: 7});
//         });
//     });
// });
//
// describe("getSurroundingWord", () => {
//     // tests without line breaks
//     it("Basic usage", () => {
//         const result = getSurroundingWord("bob went to school", 5);
//         assert.strictEqual(result.word, "went");
//         assert.strictEqual(result.selection.start, 4);
//         assert.strictEqual(result.selection.end, 8);
//     });
//
//     it("TextSection edge to the right", () => {
//         const result = getSurroundingWord("bob went to school", 8);
//         assert.strictEqual(result.word, "went");
//         assert.strictEqual(result.selection.start, 4);
//         assert.strictEqual(result.selection.end, 8);
//     });
//
//     it("TextSection edge to the left", () => {
//         const result = getSurroundingWord("bob went to school", 4);
//         assert.strictEqual(result.word, "went");
//         assert.strictEqual(result.selection.start, 4);
//         assert.strictEqual(result.selection.end, 8);
//     });
//
//     it("text beginning", () => {
//         const result = getSurroundingWord("bob went to school", 0);
//         assert.strictEqual(result.word, "bob");
//         assert.strictEqual(result.selection.start, 0);
//         assert.strictEqual(result.selection.end, 3);
//     });
//
//     it("text ending", () => {
//         const result = getSurroundingWord("bob went to school", 18);
//         assert.strictEqual(result.word, "school");
//         assert.strictEqual(result.selection.start, 12);
//         assert.strictEqual(result.selection.end, 18);
//     });
//
//     // tests with line breaks
//     it("Basic usage with line breaks", () => {
//         const result = getSurroundingWord("bob\nwent\nto school", 5);
//         assert.strictEqual(result.word, "went");
//         assert.strictEqual(result.selection.start, 4);
//         assert.strictEqual(result.selection.end, 8);
//     });
//
//     it("text ending with line break", () => {
//         const result = getSurroundingWord("bob went to school\n", 18);
//         assert.strictEqual(result.word, "school");
//         assert.strictEqual(result.selection.start, 12);
//         assert.strictEqual(result.selection.end, 18);
//     });
//
//     it("text beginning with line break", () => {
//         const result = getSurroundingWord("\nbob went to school", 1);
//         assert.strictEqual(result.word, "bob");
//         assert.strictEqual(result.selection.start, 1);
//         assert.strictEqual(result.selection.end, 4);
//     });
//
//     // edge cases
//     it("within spaces", () => {
//         const result = getSurroundingWord("   ", 1);
//         assert.strictEqual(result.word, "");
//         assert.strictEqual(result.selection.start, 1);
//         assert.strictEqual(result.selection.end, 1);
//     });
//
//     it("within spaces 2", () => {
//         const result = getSurroundingWord("   ", 2);
//         assert.strictEqual(result.word, "");
//         assert.strictEqual(result.selection.start, 2);
//         assert.strictEqual(result.selection.end, 2);
//     });
//
//     it("within line-breaks", () => {
//         const result = getSurroundingWord("\n\n\n", 1);
//         assert.strictEqual(result.word, "");
//         assert.strictEqual(result.selection.start, 1);
//         assert.strictEqual(result.selection.end, 1);
//     });
// });
