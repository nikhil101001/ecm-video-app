import { Category, VideoData } from "@/types/interface";

export const featuredVideoData: VideoData[] = [
  {
    id: "1",
    image_url: "https://i.ytimg.com/vi/YH0FlNYnVCw/hq720.jpg",
    title: "The Last of Us",
    description:
      "A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game.",
    video_url: "https://www.youtube.com/watch?v=YH0FlNYnVCw",
    category: "video",
    sub_category: "story",
    is_featured: true,
    is_pinned: false,
    created_at: "2023-10-01T12:00:00Z",
    updated_at: "2023-10-01T12:00:00Z",
  },
  {
    id: "2",
    image_url:
      "https://i.ytimg.com/vi/sbYkLS1fqtg/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCoIyBpbXekRHmEoapoSYTUa_RSBQ",
    title: "Big Buck Bunny",
    description: "A short animation film.",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "animation",
    sub_category: "story",
    is_featured: true,
    is_pinned: true,
    created_at: "2023-10-01T12:00:00Z",
    updated_at: "2023-10-01T12:00:00Z",
  },
  {
    id: "3",
    image_url:
      "https://i.ytimg.com/vi/sbYkLS1fqtg/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCoIyBpbXekRHmEoapoSYTUa_RSBQ",
    title: "Big Buck Bunny",
    description: "A short animation film.",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "animation",
    sub_category: "story",
    is_featured: true,
    is_pinned: true,
    created_at: "2023-10-01T12:00:00Z",
    updated_at: "2023-10-01T12:00:00Z",
  },
  {
    id: "4",
    image_url: "https://i.ytimg.com/vi/YH0FlNYnVCw/hq720.jpg",
    title: "The Last of Us",
    description:
      "A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game. A post-apocalyptic action-adventure game.",
    video_url: "https://www.youtube.com/watch?v=YH0FlNYnVCw",
    category: "video",
    sub_category: "story",
    is_featured: true,
    is_pinned: false,
    created_at: "2023-10-01T12:00:00Z",
    updated_at: "2023-10-01T12:00:00Z",
  },
];

export const categories: Category[] = [
  { title: "Video" },
  { title: "Animation" },
  { title: "Shorts" },
  { title: "Live" },
  { title: "Music" },
  { title: "Gaming" },
  { title: "News" },
  { title: "Sports" },
  { title: "Entertainment" },
  { title: "Education" },
];
