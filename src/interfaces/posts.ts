export interface Posts {
    data: Post[];
    meta: Meta;
}

export interface Post {
    id:             number;
    documentId:     string;
    title:          string;
    slug:           string;
    publishDate:    Date;
    isFeaturedPost: boolean;
    content:        string;
    featuredImage:  FeaturedImage;
    author:         Author;
    category:       Category;
}

export interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
}

export interface Author {
    id:         number;
    documentId: string;
    firstName:  string;
    lastName:   string;
    slug: string;
    avatar:     Image;
}

export interface FeaturedImage {
    id:                number;
    documentId:        string;
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: null;
    createdAt:         Date;
    updatedAt:         Date;
    publishedAt:       Date;
}

export interface Formats {
    thumbnail: PostImageFormat;
    small:     PostImageFormat;
    medium:    PostImageFormat;
    large:     PostImageFormat;
}

export interface PostImageFormat {
    name:        string;
    hash:        string;
    ext:         string;
    mime:        string;
    path:        null;
    width:       number;
    height:      number;
    size:        number;
    sizeInBytes: number;
    url:         string;
}

export interface Image {
    id:         number;
    documentId: string;
    url:        string;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page:      number;
    pageSize:  number;
    pageCount: number;
    total:     number;
}