import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMetadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  tag?: string;
  keywords: string[];
};

export type Post = {
  metadata: PostMetadata;
  slug: string;
  content: string;
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: PostMetadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    imageAlt: data.imageAlt || "",
    tag: data.tag || "",
    keywords: data.keywords || [],
  };

  return { metadata, content };
}

function getMDXData(dir: string): Post[] {
  return getMDXFiles(dir).map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    return { metadata, slug: path.basename(file, path.extname(file)), content };
  });
}

/** Reads all blog posts from src/app/blog/posts */
export function getPosts() {
  return getMDXData(path.join(process.cwd(), "src", "app", "blog", "posts"));
}
