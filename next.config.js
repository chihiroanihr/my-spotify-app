/** @type {import('next').NextConfig} */

const nextConfig = {
  // Allow importing images from external domains specified
  images: {
    domains: ["tfisrrtznamgqukdapjz.supabase.co"], // Reference ID as Link to database
  },
};

module.exports = nextConfig;
