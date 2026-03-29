import { PageHeader } from "@/components/sections/about/PageHeader";
import { Contact } from "@/components/sections/home/Contact";
import { PostShowcase } from "@/components/sections/posts/PostShowCase";
import { getContactSettingsAPI } from "@/services/contactSettingApi";
import { getPostsAPI } from "@/services/postApi";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog & News | Saeboemi Studio",
  description: "Read our latest news, tips, and insights about construction and renovations.",
};

export default async function PostsPage() {
  const posts = await getPostsAPI();
 const contactData = await getContactSettingsAPI();
  return (
    <>
      <PageHeader 
        title="Blog & News"
        breadcrumbs={[
          { name: "HOME", href: "/" },
          { name: "POSTS", href: "/posts" }
        ]}
        bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop" 
      />

      <PostShowcase posts={posts} />
      <Contact data={contactData} />
    </>
  );
}