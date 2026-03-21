import { STRAPI_CMS_URL } from 'astro:env/client';
import type { Global } from '@interfaces/global';
import type { Homepage } from '@interfaces/homepage';
import type { Posts } from '@interfaces/posts';
import type { Authors } from '@interfaces/author';

interface Props {
    endpoint: string;
    query?: Record<string, string>;
}

export const strapiUrl = STRAPI_CMS_URL;

export async function getStrapiData<T>({ 
    endpoint, 
    query }: Props): Promise<T> {
    
    const url = new URL(`${strapiUrl}/api/${endpoint}`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch data from Strapi');
        }

        const data = await response.json();

        return data as T;
    } catch (err) {
        console.error('Error fetching data:', (err as Error).message);
        throw err;
    }
}

export const getGlobal = async () => {
    const global = await getStrapiData<Global>({
        endpoint: 'global?populate[logoLightTheme][fields][0]=width&populate[logoLightTheme][fields][1]=height&populate[logoLightTheme][fields][2]=url&populate[logoDarkTheme][fields][0]=width&populate[logoDarkTheme][fields][1]=height&populate[logoDarkTheme][fields][2]=url&populate[favicon][fields][0]=width&populate[favicon][fields][1]=height&populate[favicon][fields][2]=url&populate[header][populate][navLink]=true&populate[header][populate][dropdown][populate][0]=link&populate[footer][populate][footerLinks]=true&populate[footer][populate][categoriesLinks]=true'
    });

    return { global: global?.data }
}

export const getHomepage = async () => {
    try {
        const homepage = await getStrapiData<Homepage>({
            endpoint: 'homepage?populate[featuredPost][populate][post][populate][featuredImage]=true&populate[featuredPost][populate][post][populate][category]=true&populate[featuredPost][populate][post][populate][author]=true&populate[featuredCategories][populate][category][populate][image][fields][0]=width&populate[featuredCategories][populate][category][populate][image][fields][1]=height&populate[featuredCategories][populate][category][populate][image][fields][2]=alternativeText&populate[featuredCategories][populate][category][populate][image][fields][3]=url'
        });

        return { homepage: homepage?.data, error: null }
    } catch(err) {
        return { homepage: null, error: (err as Error).message }
    }

}

export const getAllPosts = async () => {
    const posts = await getStrapiData<Posts>({
        endpoint: 'posts?fields[0]=title&fields[1]=slug&fields[2]=publishDate&fields[3]=isFeaturedPost&fields[4]=content&populate[featuredImage]=true&populate[author][fields][0]=firstName&populate[author][fields][1]=lastName&populate[author][fields][2]=slug&populate[author][populate][avatar][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug'
    });

    return { posts: posts?.data }
}

export const getAllPostsByCategory= async (category: string) => {
    const posts = await getStrapiData<Posts>({
        endpoint: 'posts?fields[0]=title&fields[1]=slug&fields[2]=publishDate&fields[3]=isFeaturedPost&fields[4]=content&populate[featuredImage][fields][0]=url&populate[author][fields][0]=firstName&populate[author][fields][1]=lastName&populate[author][populate][avatar][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug',
        query: {
            'filters[category][slug][$eq]': category
        }
    });

    return { posts: posts?.data }
}

export const getAllPostsByAuthor = async (slug: string) => {
    const posts = await getStrapiData<Posts>({
        endpoint: 'posts?fields[0]=title&fields[1]=slug&fields[2]=publishDate&fields[3]=isFeaturedPost&fields[4]=content&populate[featuredImage]=true&populate[author][fields][0]=firstName&populate[author][fields][1]=lastName&populate[author][fields][2]=slug&populate[author][populate][avatar][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug',
        query: {
            'filters[author][slug][$eq]': slug || ''
        }
    });

    return { posts: posts?.data }
}

export const getPost = async (slug: string) => {
    const post = await getStrapiData<Posts>({
        endpoint: 'posts?fields[0]=title&fields[1]=slug&fields[2]=publishDate&fields[3]=isFeaturedPost&fields[4]=content&populate[featuredImage][fields][0]=url&populate[author][fields][0]=firstName&populate[author][fields][1]=lastName&populate[author][populate][avatar][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug',
        query: {
            'filters[slug][$eq]': slug || ''
        }
    });

    return { post: post?.data[0] }
}

export const getPostById = async (documentId: string) => {
    const post = await getStrapiData<Posts>({
        endpoint: 'posts?fields[0]=title&fields[1]=slug&fields[2]=publishDate&fields[3]=isFeaturedPost&fields[4]=content&populate[featuredImage][fields][0]=url&populate[author][fields][0]=firstName&populate[author][fields][1]=lastName&populate[author][populate][avatar][fields][0]=url&populate[category][fields][0]=name&populate[category][fields][1]=slug',
        query: {
            'filters[documentId][$eq]': documentId
        }
    })
    
    return { post: post?.data[0] }
}

export const getAuthor = async (authorSlug: string) => {
    const author = await getStrapiData<Authors>({
        endpoint: 'authors?populate=*',
        query: {
            'filters[slug][$eq]': authorSlug || ''
        }
    });

    return { author: author?.data[0] }
}