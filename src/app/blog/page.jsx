
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-6 text-center">
          <h1 className="text-4xl md:text-7xl font-black font-inter tracking-tighter text-white">
            Latest News
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Insights, updates, and stories from the TaskFlow team.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-96 bg-zinc-900/50 animate-pulse rounded-2xl" />
                ))}
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length === 0 ? (
                <div className="col-span-full text-center text-zinc-500 py-12">
                    <p>No posts found yet.</p>
                </div>
            ) : (
                blogs.map((blog) => (
                <Link 
                    key={blog._id} 
                    href={`/blog/${blog._id}`}
                    className="group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500"
                >
                    <div className="aspect-[16/10] relative overflow-hidden bg-zinc-800">
                    {blog.image ? (
                        <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700 font-black text-6xl">
                            TF
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span>{blog.readTime || 5} min read</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                    
                    <p className="text-zinc-400 line-clamp-3 text-sm leading-relaxed">
                        {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-primary font-bold text-sm pt-4">
                        Read Article <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    </div>
                </Link>
                ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
