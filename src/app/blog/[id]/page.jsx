
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }
      } catch (error) {
        console.error("Failed to fetch blog", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
  }

  if (!blog) {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
            <h1 className="text-4xl font-bold">Post Not Found</h1>
            <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <article className="max-w-3xl mx-auto space-y-12">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Back to News
        </Link>
        
        <header className="space-y-6">
             <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span className="px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">News</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                <span>{blog.readTime || 5} min read</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-inter tracking-tighter text-white leading-tight">
                {blog.title}
            </h1>
        </header>

        {blog.image && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
        )}

        <div 
            className="prose prose-invert prose-lg max-w-none text-zinc-300 font-inter prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer Author */}
        <div className="pt-12 border-t border-zinc-800 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
                {blog.author?.photo ? (
                    <img src={blog.author.photo} alt={blog.author.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-zinc-500">
                        {blog.author?.name?.[0] || "A"}
                    </div>
                )}
             </div>
             <div>
                <p className="font-bold text-white">{blog.author?.name || "TaskFlow Team"}</p>
                <p className="text-sm text-zinc-500">Author</p>
             </div>
        </div>

      </article>
    </div>
  );
}
