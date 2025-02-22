'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

export function TeamSection() {
  const team = [
    {
      name: "Sk Riyaz",
      role: "Full Stack Developer",
      image: "https://avatars.githubusercontent.com/u/77242659?v=4",
      github: "https://github.com/riyaz-02",
      linkedin: "https://www.linkedin.com/in/skriyaz1/"
    },
    {
      name: "Priyanshu Nayan",
      role: "ML Developer",
      image: "https://avatars.githubusercontent.com/u/127988127?v=4",
      github: "https://github.com/priyanshu3082",
      linkedin: "https://www.linkedin.com/in/priyanshu-nayan/"
    },
    {
      name: "Ronit Pal",
      role: "ML Developer",
      image: "https://avatars.githubusercontent.com/u/121333212?v=4",
      github: "https://github.com/Ronit1909-ops",
      linkedin: "https://www.linkedin.com/in/ronit-pal-246745253"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experts in AI, healthcare, and technology working together to transform healthcare
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
              <p className="text-gray-600 text-center mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.github} className="text-gray-600 hover:text-primary">
                  <Github className="h-5 w-5" />
                </a>
                <a href={member.linkedin} className="text-gray-600 hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}