export type Service = {
  slug: string;
  title: string;
  short: string;
};

export const services: Service[] = [
  { slug: "web-development", title: "Web Development", short: "Fast, scalable websites and web apps." },
  { slug: "app-development", title: "App Development", short: "Mobile apps for iOS and Android." },
  { slug: "digital-marketing", title: "Digital Marketing", short: "SEO, ads and content that bring leads." },
  { slug: "ar-vr", title: "AR / VR", short: "Immersive experiences people remember." },
  { slug: "3d-modeling", title: "3D Modeling", short: "Product and architectural 3D assets." },
  { slug: "ui-ux-design", title: "UI/UX Design", short: "Interfaces designed around your customers." },
];