// Declare module for importing HTML files
declare module '*.html' {
    const content: string;
    export default content;
}

// Declare module for importing SCSS files
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}
