module.exports = {
    stories: ['./**/*.story.@(ts|js)','../src/**/*.story.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)'],
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-docs'
    ]
  };
