export interface VideoData {
  _id: string;
  image_url: string;
  title: string;
  description: string;
  video_url: string;
  category: string;
  sub_category: string;
  is_featured: boolean;
  is_pinned: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface FeaturedItemProps {
  item: VideoData;
  isActive: boolean;
  width: number;
  height: number;
}
