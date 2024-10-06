declare module 'minimatch' {
    interface IOptions { } // Define an empty interface as a placeholder
    interface IMinimatch {
        // Add the properties that `IMinimatch` should have, if known.
        pattern: string;
        options: any;
        match: (file: string) => boolean;
    }
}