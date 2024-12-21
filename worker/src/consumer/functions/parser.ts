export function parser(statement: string, values: any, startDelimeter = "{", endDelimeter = "}"): string {
    const regex = new RegExp(`${startDelimeter}(.*?)${endDelimeter}`, 'g');
    const cache: { [key: string]: string } = {};
    return statement.replace(regex, (_, key) => {
        if (cache[key] !== undefined) {
            return cache[key];
        }
        const keys = key.split('.');
        let value = values;
        for (const k of keys) {
            if (value[k] === undefined) {
                cache[key] = '';
                return '';
            }
            value = value[k];
        }
        cache[key] = value;
        return value;
    });
}