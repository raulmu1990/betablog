export interface Homepage {
    data: Data;
    meta: null;
}

export interface Data {
    id:           number;
    documentId:   string;
    createdAt:    Date;
    updatedAt:    Date;
    publishedAt:  Date;
    title:        string;
    description:  string;
    featuredPost: FeaturedPost;
    featuredCategories: FeaturedCategory[];
}

export interface FeaturedCategory {
    id:       number;
    Title:    string;
    category: Category;
}

export interface Category {
    id:          number;
    documentId:  string;
    name:        string;
    slug:        string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    image:       FeaturedImage;
}

export interface FeaturedPost {
    id:   number;
    post: Post;
}

export interface Post {
    id:             number;
    documentId:     string;
    title:          string;
    createdAt:      Date;
    updatedAt:      Date;
    publishedAt:    Date;
    locale:         string;
    publishDate:    Date;
    category:       string;
    slug:           string;
    isFeaturedPost: boolean;
    content:        string;
    featuredImage:  FeaturedImage;
}

export interface FeaturedImage {
    id:              number;
    documentId:      string;
    width:           number;
    height:          number;
    alternativeText: null;
    url:             string;
}

