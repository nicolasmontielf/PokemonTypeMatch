import slugify from 'slugify';

export const slugifyString = (str: string): string => {
    return slugify(str, {
        lower: true,
        replacement: '-',
        trim: true
    });
};