import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import "./blog.css";
import Footer from "../footer/footer";

const { projectId, dataset } = client.config();
const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const BLOG_QUERY = `*[_type == "blog"]|order(_createdAt desc){
  _id,
  "slug": slug.current,
  title,
  titleImage,
  description
}`;

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await client.fetch(BLOG_QUERY);
        setBlogs(data);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <main className="blog-page">
      <section className="blog-page__hero">
        <picture>
          <source media="(max-width: 768px)" srcSet="/img/blog-hero-mobile.png" />
          <img 
            src="/img/blog-hero.png" 
            alt="Blog Hero" 
            className="blog-page__heroImage" 
          />
        </picture>
      </section>

      <section className="blog-list">
        <div className="blog-container">
          <div className="blog-submit-wrapper">
            <a 
              href="https://dub.sh/Denoised" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="blog-submit-btn"
            >
              Submit Your Blog Content
            </a>
          </div>
          {loading ? (
            <div style={{ textAlign: "center", color: "#666" }}>Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div style={{ textAlign: "center", color: "#666" }}>No blogs found.</div>
          ) : (
            <div className="blog-grid">
              {blogs.map((blog) => (
                <Link to={`/blog/${blog.slug}`} key={blog._id} className="blog-card">
                  <div className="blog-card__imageWrapper">
                    {blog.titleImage && (
                      <img
                        src={urlFor(blog.titleImage).url()}
                        alt={blog.title}
                        className="blog-card__image"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="blog-card__content">
                    <h3 className="blog-card__title">{blog.title}</h3>
                    <p className="blog-card__description">{blog.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
