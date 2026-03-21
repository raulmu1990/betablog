import { STRAPI_CMS_URL } from 'astro:env/client';
import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const server = {
    subscribe: defineAction({
        accept: 'form',
        input: z.object({
            email: z.string().email({ message: 'Please enter a valid email' }).max(40, { message: 'Email is too long' }),
            terms: z.string().refine(value => value === 'true', {
                message: 'You must agree to the terms and conditions',
            }),
        }),
        handler: async (user) => {
            try {
                const res = await fetch(`${STRAPI_CMS_URL}/api/subscribers`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        data: {
                            email: user.email
                        }
                    }),
                });

                if (!res.ok) {
                    const failedData = await res.json();
                    throw new Error(failedData.error.message);
                }

                return { success: true };
            } catch (error) {
                const errorMessage = (error as Error).message === 'This attribute must be unique' ? 'The email is already taken' : (error as Error).message; 
                return { success: false, error: errorMessage};
            }
        }
    })
}