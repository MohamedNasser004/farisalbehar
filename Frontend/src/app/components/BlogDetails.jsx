'use client';

import { useEffect, useState } from 'react';
import { getComments, handleDelete } from '@/services/api';
import AddComment from './AddComment';
import Footer from '../components/Footer';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactSection from '../components/ContactSection';
import NotFound from '../components/NotFound';
import { useRouter } from 'next/navigation';

const BlogDetails = ({ blog }) => {
  const router = useRouter();
  const slug = blog?.slug;
  const [comments, setComments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // معالجة المحتوى لإضافة alt للصور قبل التقديم
 const processedContent = blog?.content
  ?.replace(/<img((?![^>]*alt=)[^>]*)>/gi, (match, group) => {
    return `<img${group} alt="${blog.title}" loading="lazy">`;
  })
  ?.replace(/<img[^>]*src=["'](?!https?:\/\/)([^"']+)["']/gi, (match, src) => {
    return match.replace(src, `http://localhost:7000/api/${src}`);
  }) || '';


  useEffect(() => {
    // حل إضافي باستخدام MutationObserver للصور التي قد تظهر لاحقًا
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const images = document.querySelectorAll('.content-body img:not([alt])');
        images.forEach(img => {
          img.alt = blog?.title || '';
          img.loading = 'lazy';
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [blog?.title]);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
    setIsAdmin(typeof window !== 'undefined' && localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchComments = async () => {
      try {
        const response = await getComments(slug);
        const { mainComments = [], replies = [] } = response || {};

        const filterPublished = comments =>
          comments.filter(c => c.commentStatus?.toLowerCase() === 'published');

        const publishedMain = filterPublished(mainComments);
        const publishedReplies = filterPublished(replies);

        const buildCommentTree = parentId =>
          publishedReplies
            .filter(reply => reply.parentId === parentId)
            .map(reply => ({
              ...reply,
              replies: buildCommentTree(reply.id),
            }));

        const structuredComments = publishedMain.map(comment => ({
          ...comment,
          replies: buildCommentTree(comment.id),
        }));

        setComments(structuredComments);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };

    fetchComments();
  }, [slug]);

  const handleAddReply = (newReply, parentId) => {
    setComments(prev => {
      const updateComments = comments =>
        comments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            };
          }
          return comment.replies
            ? { ...comment, replies: updateComments(comment.replies) }
            : comment;
        });

      return updateComments(prev);
    });
  };

  const renderComments = (comments, level = 0) => (
    <div className={`comment-level-${level}`}>
      {comments.map(comment => (
        <div key={comment.id} className={`card mb-3`} style={{ marginRight: `${level * 2}rem` }}>
          <div className="card-body" style={{ direction: 'rtl' }}>
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title">{comment.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {comment.date && new Date(comment.date).toLocaleString('ar-EG')}
                </h6>
              </div>
              {isAdmin && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  حذف
                </button>
              )}
            </div>
            <p className="card-text">{comment.comment}</p>

            <button
              className="btn btn-outline-primary btn-sm"
              data-bs-toggle="collapse"
              data-bs-target={`#replyForm${comment.id}`}
            >
              الرد على التعليق
            </button>

            <div className="collapse mt-3" id={`replyForm${comment.id}`}>
              <AddComment
                articleName={slug}
                parentId={comment.id}
                onAddReply={handleAddReply}
              />
            </div>

            {comment.replies?.length > 0 && (
              <div className="mt-3">
                {renderComments(comment.replies, level + 1)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const handleDeleteBlog = async () => {
    const success = await handleDelete(slug);
    if (success) router.push('/articles');
  };

  if (!blog) return <NotFound />;
  return (
    <>
    
      <Header />

      <main className="container my-5" style={{ direction: 'rtl' }}>
        <article className="blog-post">
          <header className="text-center mb-5">
            <h1 className="display-4 mb-4">{blog.title}</h1>
            {blog.date && (
              <p className="text-muted">
                نشر في {new Date(blog.date).toLocaleDateString('ar-EG')}
              </p>
            )}
          </header>

          <div
            className="content-body"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          <ContactSection />

          <section className="comments-section mt-5">
            <h2 className="mb-4">التعليقات</h2>
            {comments.length > 0 ? (
              renderComments(comments)
            ) : (
              <p className="text-muted">لا توجد تعليقات بعد.</p>
            )}
          </section>

          <section className="add-comment mt-5">
            <AddComment articleName={slug} />
          </section>
        </article>
      </main>

      <Footer />

      <style jsx global>{`
        .content-body {
          color: #333;
          font-size: 18px;
          line-height: 1.8;
          margin-bottom: 40px;
        }
        .content-body img {
          max-width: 400px;
          height: auto;
          border-radius: 8px;
          margin: 20px auto;
          display: block;
        }
        .content-body iframe {
          max-width: 100%;
          margin: 20px auto;
          display: block;
        }
        .content-body p {
          margin-bottom: 1.5rem;
        }
        .content-body h2,
        .content-body h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }
      `}</style>
    </>
  );
};

export default BlogDetails;