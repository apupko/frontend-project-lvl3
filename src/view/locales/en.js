export default {
  translation: {
    mainPage: {
      title: 'RSS reader',
      description: 'Start reading RSS today! It is easy, it is nicely.',
      example: 'Example: https://ru.hexlet.io/lessons.rss',
    },
    form: {
      buttonLabel: 'Add',
      inputPlaceholder: 'RSS link',
    },
    feeds: {
      header: 'Feeds',
    },
    posts: {
      header: 'Posts',
      preview: {
        previewBtnName: 'Preview',
        modal: {
          closeName: 'Close',
          fullArtName: 'Full article',
        },
      },
    },
    feedback: {
      rssLoaded: 'Rss has been loaded',
      errors: {
        url: {
          invalid: 'Must be valid url',
        },
        rss: {
          alreadyExists: 'Rss already exists',
          invalid: 'This source doesn\'t contain valid rss',
          notFound: 'This source doesn\'t contain valid rss',
        },
        network: 'Network error',
      },
    },
  },
};
