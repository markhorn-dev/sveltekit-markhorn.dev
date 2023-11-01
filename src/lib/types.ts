export interface Article {
    title: string | '';
    description: string | '';
    published: string | '';
    tags: string[] | [];
    content: string | '';
}

export interface Project {
    title: string | '';
    description: string | '';
    published: string | '';
    tags: string[] | [];
    content: string | '';
    liveURL: string | undefined;
    githubURL: string | undefined;
}