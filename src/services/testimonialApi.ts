export const getTestimonialsAPI = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, { cache: 'no-store' });
  return res.json();
};