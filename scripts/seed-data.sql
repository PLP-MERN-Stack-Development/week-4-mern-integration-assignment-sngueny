-- Seed data for the blog application
-- This script populates the database with initial data

-- Insert categories
INSERT INTO categories (id, name, description) VALUES
('1', 'Web Development', 'All about web development technologies and best practices'),
('2', 'Technology', 'Latest trends and innovations in technology'),
('3', 'Design', 'UI/UX design principles and creative inspiration'),
('4', 'Programming', 'Programming languages, frameworks, and coding tutorials'),
('5', 'Mobile Development', 'iOS, Android, and cross-platform mobile development');

-- Insert sample posts
INSERT INTO posts (id, title, content, excerpt, category_id, author, image_url) VALUES
('1', 'Getting Started with Next.js', 
'Next.js is a powerful React framework that makes building web applications easier and more efficient. In this comprehensive guide, we will explore the key features that make Next.js stand out from other frameworks.

First, let us talk about the App Router, which is the recommended way to build Next.js applications. The App Router provides a more intuitive file-based routing system that makes organizing your application structure straightforward.

Server Components are another game-changing feature. They allow you to render components on the server, reducing the JavaScript bundle size sent to the client and improving performance significantly.

The framework also provides excellent developer experience with features like hot reloading, automatic code splitting, and built-in CSS support. These features make development faster and more enjoyable.',
'Learn the fundamentals of Next.js and discover why it has become the go-to framework for React developers.',
'1', 'John Doe', '/placeholder.svg?height=400&width=600'),

('2', 'The Future of Web Development',
'The web development landscape is constantly evolving, with new technologies and frameworks emerging regularly. As we look toward the future, several trends are shaping how we build web applications.

Artificial Intelligence is becoming increasingly integrated into development workflows. From code completion to automated testing, AI tools are helping developers become more productive and write better code.

Edge computing is another significant trend. By processing data closer to users, we can create faster, more responsive applications that provide better user experiences regardless of geographic location.

WebAssembly is opening new possibilities for web applications, allowing developers to run high-performance code written in languages like Rust and C++ directly in the browser.',
'Explore the emerging trends and technologies that will shape the future of web development.',
'2', 'Jane Smith', '/placeholder.svg?height=400&width=600'),

('3', 'Building Responsive Designs',
'Creating responsive web designs is essential in today\'s multi-device world. Users access websites from smartphones, tablets, laptops, and desktop computers, each with different screen sizes and capabilities.

The key to successful responsive design lies in understanding CSS Grid and Flexbox. These layout systems provide powerful tools for creating flexible, adaptive layouts that work across all device sizes.

Mobile-first design is a crucial approach. By starting with the smallest screen size and progressively enhancing for larger screens, you ensure that your website works well on all devices.

Performance is also critical in responsive design. Images should be optimized for different screen densities, and CSS should be written efficiently to minimize load times.',
'Master the art of creating websites that look great on any device with responsive design principles.',
'3', 'Mike Johnson', '/placeholder.svg?height=400&width=600');

-- Insert sample comments
INSERT INTO comments (id, post_id, author, content) VALUES
('1', '1', 'Alice Johnson', 'Great article! This really helped me understand Next.js better. The explanation of Server Components was particularly useful.'),
('2', '1', 'Bob Wilson', 'Thanks for the detailed explanation. Looking forward to more posts like this. Do you have any recommendations for learning resources?'),
('3', '2', 'Carol Davis', 'The future of web development is indeed exciting. AI integration is a game changer, and I am curious to see how it will evolve.'),
('4', '3', 'David Brown', 'Responsive design is so important nowadays. Your mobile-first approach makes a lot of sense.'),
('5', '1', 'Emma Wilson', 'I have been using Next.js for a few months now, and I completely agree with your points about the App Router.');
