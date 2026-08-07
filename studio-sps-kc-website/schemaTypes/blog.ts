import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleImage',
      title: 'Title Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) =>
        Rule.required().custom((text) => {
          if (typeof text === 'undefined') return true
          const wordCount = text.trim().split(/\s+/).length
          return wordCount <= 50 ? true : 'Description must be 50 words or less'
        }),
    }),
    defineField({
      name: 'images',
      title: 'Blog Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description: 'Images to be displayed below the blog content.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
