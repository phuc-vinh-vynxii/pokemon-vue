// export const fetchAPI = async (url) => {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.results;
// }
export function getIDPokemon(url) {
    const parts = url.split('/'); 
    return parseInt(parts[parts.length - 2], 10);
}

export async function fetchPromise(URL) {
    try {
        const response = await fetch(URL);
        return await response.json();
    } 
    catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
        return null;
    }
}
export function getIndexName(name) {
    let text;
    switch (name) {
        case "hp":
            text = "hp";
            break;
        case "attack":
            text = "atk";
            break;
        case "defense":
            text = "def";
            break;
        case "special-attack":
            text = "spa";
            break;
        case "special-defense":
            text = "spd";
            break;
        case "speed":
            text = "spd";
            break;
        default:
            text = null;
    }
    return text;
}

export function getUniqueClass(name) {
    let text;
    switch (name) {
        case "hp":
            text = "hp";
            break;
        case "attack":
            text = "atk";
            break;
        case "defense":
            text = "def";
            break;
        case "special-attack":
            text = "spa";
            break;
        case "special-defense":
            text = "spd-1";
            break;
        case "speed":
            text = "spd-2";
            break;
        default:
            text = null;
    }
    return text;
}