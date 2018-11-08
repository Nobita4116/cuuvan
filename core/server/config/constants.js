import path from 'path';

let rootPath = path.join(__dirname, '../../../');


/**
 * Status code
 */
export const STATUS_CODE_SUCCESS = 200;
export const STATUS_CODE_NOT_MODIFIED = 304;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_UNAUTHORIZED = 401;
export const STATUS_CODE_ACCESS_DENIED = 403;
export const STATUS_CODE_NOT_FOUND = 404;
export const STATUS_CODE_METHOD_DENIED = 405;
export const STATUS_CODE_SERVER_ERROR = 500;
export const DATA_APP_DEFINED = {
    TYPE_COMPANY: 1,
    TYPE_ADMIN: 2,
    ORDER_TYPE_WHOLSE_SALE: 1,
    ORDER_TYPE_RETAIL: 2
}

export const DATA_APPLICATION_DEFINED = {
    contentPath: 'content/',
    app_default: 'main',
    post_notitle: '(Untitled)',
    post_slug: 'untitled-',
    post_draft: 'draft',
    post_publish: 'published',
    post_remove: 'trash',
    post_auto_draft: 'auto_draft',
    post_feature_image: '/images/no_image.png',
    rootPath: rootPath,
    core: {
        serverPath: path.join(rootPath, 'core', 'server'),
        clientPath: path.join(rootPath, 'core', 'client'),
        controllers: 'controllers',
        models: 'models',
        config: 'config',
        libs: 'libs',
        middlewares: 'middlewares',
        routes: 'routes',
        views: 'views'
    }
}

/**
 * Error code
 */