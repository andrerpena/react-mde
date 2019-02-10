import {getSurroundingWord} from "../MarkdownUtil";

describe("MarkdownUtil", () => {
    describe("getSurroundingWord", () => {
        it("Basic usage", () => {
            const result = getSurroundingWord("bob went to school", 5);
            expect(result).toEqual({"end": 8, "start": 4})
        });
        it("TextSection edge to the right", () => {
            const result = getSurroundingWord("bob went to school", 8);
            expect(result).toEqual({
                "end": 8,
                "start": 4
            });
        });
        it("TextSection edge to the left", () => {
            const result = getSurroundingWord("bob went to school", 4);
            expect(result).toEqual({
                "end": 8,
                "start": 4
            });
        });
        it("text beginning", () => {
            const result = getSurroundingWord("bob went to school", 0);
            expect(result).toEqual({
                "end": 3,
                "start": 0
            });
        });
        it("text ending", () => {
            const result = getSurroundingWord("bob went to school", 18);
            expect(result).toEqual({"end": 18, "start": 12});
        });
        it("Basic usage with line breaks", () => {
            const result = getSurroundingWord("bob\nwent\nto school", 5);
            expect(result).toEqual({
                "start": 4,
                "end": 8,
            });
        });
        it("text ending with line break", () => {
            const result = getSurroundingWord("bob went to school\n", 18);
            expect(result).toEqual({
                "start": 12,
                "end": 18
            });
        });
        it("text beginning with line break", () => {
            const result = getSurroundingWord("\nbob went to school", 1);
            expect(result).toEqual({
                "start": 1,
                "end": 4
            });
        });
        it("within spaces", () => {
            const result = getSurroundingWord("   ", 1);
            expect(result).toEqual({
                "start": 1,
                "end": 1
            });
        });
        it("within spaces 2", () => {
            const result = getSurroundingWord("   ", 2);
            expect(result).toEqual({
                "start": 2,
                "end": 2
            });
        });
        it("within line-breaks", () => {
            const result = getSurroundingWord("\n\n\n", 1);
            expect(result).toEqual({
                "start": 1,
                "end": 1
            });
        });
    });
});