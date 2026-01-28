export default interface Post {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    category: string;
    publishDate: string;
    isFeaturedPost: boolean;
    featuredImage: {
        id: number;
        documentId: string;
        url: string;
    };
    author: {
        id: number;
        documentId: string;
        firstName: string;
        lastName: string;
        avatar: {
            id: number;
            documentId: string;
            url: string;
        }
    }
    content: any;
}