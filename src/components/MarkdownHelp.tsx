import * as React from 'react';

export interface MarkdownHelpProps {
    helpText?: string;
    markdownReferenceUrl?: string;
}

export const MarkdownHelp: React.SFC<MarkdownHelpProps> = (props) => {
    const { helpText, markdownReferenceUrl } = props;
    return (
        <a className="markdown-help" href={markdownReferenceUrl} target="_blank" rel="noopener noreferrer">
            <svg aria-hidden="true" className="markdown-help-svg" height="16" version="1.1" viewBox="0 0 16 16" width="16">
                <path
                    fillRule="evenodd"
                    d={
                        'M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 ' +
                        '14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z'
                    }
                />
            </svg>
            <span className="markdown-help-text">{helpText}</span>
        </a>
    );
};

MarkdownHelp.defaultProps = {
    helpText: 'Markdown styling is supported',
    markdownReferenceUrl: 'http://commonmark.org/help/'
};