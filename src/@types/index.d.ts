declare module "instagram" {
  type PaginatedResponse<T> = {
    items: T[];
    next_max_id: string;
    more_available: true;
  };
  type SavedPost = {
    media: {
      code: string;
      saved_collection_ids: string[];
    };
  };
  type Media = {
    id: string;
    image_versions2: {
      candidates: any[];
    };
    media_type: number;
    original_height: number;
    original_width: number;
  };
  type Collection = {
    collection_id: string;
    collection_media_count: number;
    collection_name: string;
    collection_type: string;
    cover_media_list: Media[];
  };
}
