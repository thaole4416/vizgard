export function camelCaseToKebabCase (str: string): string {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}
export function toCapitalCase (str: string) : string {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
