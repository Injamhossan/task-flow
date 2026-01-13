
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Trash2, Plus, X, Loader2 } from "lucide-react";

export default function ManageBlogs() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    readTime: 5,
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  async function handleDelete(id) {
    if(!confirm("Are you sure you want to delete this post?")) return;
    
    try {
        const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        if(res.ok) {
            setBlogs(blogs.filter(b => b._id !== id));
        }
    } catch (error) {
        console.error("Failed to delete", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);

    try {
        const payload = {
            ...formData,
            author: {
                name: user?.displayName || "Admin",
                email: user?.email,
                photo: user?.photoURL
            }
        };

        const res = await fetch("/api/blogs", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const newBlog = await res.json();
            setBlogs([newBlog, ...blogs]);
            setIsCreating(false);
            setFormData({ title: "", excerpt: "", content: "", image: "", readTime: 5 });
        }
    } catch (error) {
        console.error("Failed to create", error);
    } finally {
        setSubmitLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-inter">Manage Blogs</h1>
        <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold rounded-md hover:opacity-90 transition-opacity"
        >
            <Plus size={20} /> New Post
        </button>
      </div>

      {/* Create Modal Or Inline Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
                <button 
                    onClick={() => setIsCreating(false)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-white"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Excerpt (Short Description)</label>
                        <input 
                            type="text" 
                            required
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-white"
                            value={formData.excerpt}
                            onChange={e => setFormData({...formData, excerpt: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Image URL</label>
                        <input 
                            type="url" 
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-white"
                            placeholder="https://..."
                            value={formData.image}
                            onChange={e => setFormData({...formData, image: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Read Time (min)</label>
                            <input 
                                type="number" 
                                min="1"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-white"
                                value={formData.readTime}
                                onChange={e => setFormData({...formData, readTime: parseInt(e.target.value)})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Content (HTML allowed)</label>
                        <textarea 
                            required
                            rows={10}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-white font-mono text-sm"
                            value={formData.content}
                            onChange={e => setFormData({...formData, content: e.target.value})}
                        />
                        <p className="text-xs text-zinc-500 mt-1">Basic HTML tags supported: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.</p>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button 
                            type="button"
                            onClick={() => setIsCreating(false)}
                            className="px-4 py-2 text-zinc-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={submitLoading}
                            className="px-6 py-2 bg-primary text-black font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            {submitLoading && <Loader2 size={16} className="animate-spin" />}
                            Publish Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-zinc-950 text-xs uppercase text-zinc-500 font-medium">
                <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
                {loading ? (
                    <tr><td colSpan={4} className="p-6 text-center text-zinc-500">Loading...</td></tr>
                ) : blogs.length === 0 ? (
                    <tr><td colSpan={4} className="p-6 text-center text-zinc-500">No blogs found.</td></tr>
                ) : (
                    blogs.map(blog => (
                        <tr key={blog._id} className="hover:bg-zinc-800/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{blog.title}</td>
                            <td className="px-6 py-4 text-zinc-400 text-sm">{blog.author?.name}</td>
                            <td className="px-6 py-4 text-zinc-500 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right">
                                <button 
                                    onClick={() => handleDelete(blog._id)}
                                    className="text-zinc-500 hover:text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
