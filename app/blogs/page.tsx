"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const articles = [
  {
    title: "5 Daily Habits for a Healthy Heart ❤️",
    description:
      "Discover simple daily habits to keep your heart strong and healthy!",
    image: "/images/healthy-heart.jpg",
    link: "#",
  },
  {
    title: "Why Morning Walks Reduce Heart Risk 🚶‍♂️",
    description: "Walking 30 minutes a day can significantly improve heart health.",
    image: "/images/morning-walk.jpg",
    link: "#",
  },
  {
    title: "Superfoods for a Strong Heart 🥑🍓",
    description:
      "Learn about the best foods to lower cholesterol and improve circulation.",
    image: "/images/superfoods.jpg",
    link: "#",
  },
];

export default function Blog() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-red-500 text-white flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Heart Health & Wellness Blog 💙
        </motion.h1>
        <p className="text-lg mt-4">Your go-to place for heart care tips, tricks, and advice.</p>
      </div>

      {/* Featured Articles */}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Featured Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <Image
                src={article.image}
                width={400}
                height={200}
                alt={article.title}
                className="rounded-t-lg object-cover"
              />
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{article.description}</p>
                <Button className="mt-4" variant="outline">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* GIFs & Videos Section */}
      <div className="container mx-auto my-10 p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Health Videos & GIFs 🎥</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube.com/embed/L4N1q4RNi9I"
              title="Heart Health Video"
              allowFullScreen
            ></iframe>
          </div>
          <div className="relative">
            <img
              src="https://media.giphy.com/media/l0HUqsz2jdQYElRm0/giphy.gif"
              alt="Heart GIF"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Discussion Section */}
      <div className="container mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center">Join the Discussion 💬</h2>
        <div className="mt-4">
          <Textarea
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button className="mt-4 w-full" onClick={handleCommentSubmit}>
            Post Comment
          </Button>
        </div>
        <div className="mt-6">
          {comments.length > 0 ? (
            comments.map((cmt, index) => (
              <div key={index} className="bg-gray-200 p-3 my-2 rounded-lg">
                {cmt}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}
