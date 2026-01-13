import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/services/api";
import BlogDetails from "../components/BlogDetails";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const slug = await Promise.resolve(params.slug);

  let blog;

  try {
    const res = await getBlogBySlug(slug);
    blog = res?.data?.[0] || res?.data;
  } catch {
    const decoded = decodeURIComponent(slug);
    const res = await getBlogBySlug(decoded);
    blog = res?.data?.[0] || res?.data;
  }

  if (!blog) {
    return {
      title: "Page Not Found",
      description: "Content not found",
    };
  }

  const canonical = `https://farisalbehar.com/${decodeURIComponent(blog.slug)}`;

  return {
    title: blog.title,
    description: blog.metadescription,
    keywords: blog.metakeywords,
    alternates: { canonical },

    openGraph: {
      title: blog.title,
      description: blog.metadescription,
      images: [blog.photo],
      url: canonical,
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.metadescription,
      images: [blog.photo],
    },
  };
}

// ===================================
// الصفحة نفسها
export default async function ArticlePage({ params }) {
  const slug = await Promise.resolve(params.slug);

  let blog;
  try {
    const res = await getBlogBySlug(slug);
    blog = res?.data?.[0] || res?.data;

    if (!blog) return notFound();
    return <BlogDetails blog={blog} />;
  } catch (error) {
    console.error("Error loading blog:", error);
    return notFound();
  }
}
