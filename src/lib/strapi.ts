import { STRAPI_CMS_URL } from 'astro:env/client';
import type Post from '../interfaces/post';

interface Props {
    endpoint: string;
    query?: Record<string, string>;
    wrappedByKey?: string;
    wrappedByList?: boolean;
}

export const strapiUrl = STRAPI_CMS_URL;

export async function getStrapiData<T>({ 
    endpoint, 
    query, 
    wrappedByKey, 
    wrappedByList }: Props): Promise<T> {
    
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

        if (wrappedByKey) {
            return data[wrappedByKey];
        }

        if (wrappedByList) {
            return data[0];
        }

        return data as T;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getGlobal = async () => {
    const global = await getStrapiData<any>({
        endpoint: 'global?populate[logoLightTheme][fields][0]=width&populate[logoLightTheme][fields][1]=height&populate[logoLightTheme][fields][2]=url&populate[logoDarkTheme][fields][0]=width&populate[logoDarkTheme][fields][1]=height&populate[logoDarkTheme][fields][2]=url&populate[favicon][fields][0]=width&populate[favicon][fields][1]=height&populate[favicon][fields][2]=url&populate[header][populate][navLink]=true&populate[header][populate][dropdown][populate][0]=link',
        wrappedByKey: 'data',
    });

    return { global }
}

export const getAllPosts = async () => {
    const posts = await getStrapiData<Post[]>({
        endpoint: 'posts?fields[0]=title&fields[1]=slug&fields[2]=category&fields[3]=publishDate&fields[4]=isFeaturedPost&fields[5]=content&populate[featuredImage][fields][0]=url&populate[author][fields][0]=firstName&populate[author][fields][1]=lastName&populate[author][populate][avatar][fields][0]=url',
        wrappedByKey: 'data',
    });

    return { posts }
}

export const getPost = async (slug: string) => {
    const postData = await getStrapiData<Post[]>({
        endpoint: 'posts?fields[0]=title&fields[1]=slug&fields[2]=category&fields[3]=publishDate&fields[4]=isFeaturedPost&fields[5]=content&populate[featuredImage][fields][0]=url&populate[author][fields][0]=firstName&populate[author][fields][1]=lastName&populate[author][populate][avatar][fields][0]=url',
        query: {
            'filters[slug][$eq]': slug || ''
        },
        wrappedByKey: 'data'
    });

    const post = postData[0];

    return { post }
}