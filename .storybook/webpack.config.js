module.exports = (baseConfig, env, defaultConfig) => {
    const config = {...defaultConfig, ...baseConfig};
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('awesome-typescript-loader')
    });
    config.module.rules.push({
        test: /Story.tsx/,
        loaders: [
            {
                loader: require.resolve('@storybook/addon-storysource/loader'),
                options: {parser: 'typescript'}
            }
        ],
        enforce: 'pre',
    });
    config.module.rules.push({
        test: /\.css/, use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader', options: {sourceMap: true}
            }]
    });
    config.module.rules.push({
        test: /\.scss$/, use: [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader', options: {sourceMap: true}
            },
            {
                loader: 'sass-loader', options: {sourceMap: true}
            }]
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};