
export namespace BlogCategoryModel {
    export class IBlogCategory {
        id_blog_category!: number
        blog_category!: string
    }

    export class GetAllBlogCategory {
        status!: boolean;
        message!: string;
        data!: IBlogCategory[];
    }

    export class GetByIdBlogCategory {
        status!: boolean;
        message!: string;
        data!: IBlogCategory;
    }

    export class CreateBlogCategory {
        blog_category!: string
    }

    export class UpdateBlogCategory {
        id_blog_category!: number
        blog_category!: string
        is_active!: boolean
    }
}