export namespace BlogModel {
    export class IBlog {
        id_blog!: number
        id_blog_category!: number
        blog_category!: string
        title!: string
        content!: string
        image!: string
        location!: string
        created_at!: Date
        updated_at!: Date
        is_active!: boolean
    }

    export class BlobQueryString {
        id_blog_category!: number;
        title!: string;
    }

    export class GetAllBlog {
        status!: boolean;
        message!: string;
        data!: IBlog[];
    }

    export class GetByIdBlog {
        status!: boolean;
        message!: string;
        data!: IBlog;
    }

    export class CreateBlog {
        id_blog_category!: number
        title!: string
        content!: string
        image!: string
        location!: string
    }

    export class UpdateBlog {
        id_blog!: number
        id_blog_category!: number
        blog_category!: string
        title!: string
        content!: string
        image!: string
        location!: string
        is_active!: boolean
    }
}