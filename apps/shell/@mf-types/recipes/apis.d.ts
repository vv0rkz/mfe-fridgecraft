
    export type RemoteKeys = 'recipes/App';
    type PackageType<T> = T extends 'recipes/App' ? typeof import('recipes/App') :any;