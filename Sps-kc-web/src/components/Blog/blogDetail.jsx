import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import "./blog.css";
import Footer from "../footer/footer";

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const BLOG_DETAIL_QUERY = `*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  titleImage,
  description,
  content,
  images
}`;

const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).url()}
          className="blog-detail__image"
        />
      );
    },
  },
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await client.fetch(BLOG_DETAIL_QUERY, { slug });
        setBlog(data);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <main className="blog-detail">
        <div style={{ textAlign: "center", color: "#a5a5a5", paddingTop: "50px" }}>Loading blog...</div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="blog-detail">
        <div style={{ textAlign: "center", color: "#a5a5a5", paddingTop: "50px" }}>Blog not found.</div>
      </main>
    );
  }

  return (
    <main className="blog-detail">
      {blog.titleImage ? (
        <div className="blog-detail__hero-banner">
          <img
            src={urlFor(blog.titleImage).url()}
            alt={blog.title}
            className="blog-detail__hero-bg"
          />
          <div className="blog-detail__hero-overlay"></div>
        </div>
      ) : (
        <div className="blog-detail__hero-spacer"></div>
      )}

      <article className="blog-detail__content-wrapper">
        <div className="blog-detail__card">
          <header className="blog-detail__header">
            <h1 className="blog-detail__title">{blog.title}</h1>
            {blog.description && (
              <p className="blog-detail__subtitle">{blog.description}</p>
            )}
          </header>

          <div className="blog-detail__body">
            {blog.content && (
              <div className="blog-detail__text">
                <PortableText value={blog.content} components={myPortableTextComponents} />
              </div>
            )}

            {blog.images && blog.images.length > 0 && (
              <div className="blog-detail__images">
                {blog.images.map((image, index) => (
                  <img
                    key={index}
                    src={urlFor(image).url()}
                    alt={`${blog.title} - image ${index + 1}`}
                    className="blog-detail__image"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
