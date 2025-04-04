export interface VideoData {
  id: string;
  image_url: string;
  title: string;
  description: string;
  video_url: string;
  category: string;
  sub_category: string;
  is_featured: boolean;
  is_pinned: boolean;
}

export interface Category {
  title: string;
}

export interface FeaturedItemProps {
  item: VideoData;
  isActive: boolean;
  width: number;
  height: number;
}
