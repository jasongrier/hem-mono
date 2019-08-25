export default [
  {
    slug: 'foo',
    title: 'Foo',
    text: 'Lorem ipsum dolor\n\nsit amet.',
    links: [
      { type: 'external', text: 'Google', title: 'Search engine', destination: 'http://google.com' },
      { type: 'internal', text: 'Foo', title: 'I link to myself', destination: 'foo' },
    ],
    seoMeta: {
      description: '',
      keywords: '',
    }
  },
  {
    slug: 'bar',
    title: 'Bar',
    text: 'Lorem ipsum dolor\n\nsit amet.',
    links: [
      { type: 'external', text: 'Google', title: 'Search engine', destination: 'http://google.com' },
      { type: 'internal', text: 'Foo', title: 'I link to myself', destination: 'foo' },
    ],
    seoMeta: {
      description: '',
      keywords: '',
    }
  },
]
