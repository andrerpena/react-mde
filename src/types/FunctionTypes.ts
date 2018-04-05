export type AlterLineFunction = (line: string, lineIndex: number) => string;
export type GenerateMarkdownPreview = (markdown: string) => Promise<string>;
