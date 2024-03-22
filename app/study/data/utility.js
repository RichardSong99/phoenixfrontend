import { useCallback } from "react";
import { useSearchParams } from "next/navigation";


export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function displayNumber({num, percent = false}) {
    if (num === 0) {
        return "-";
    } else {
        return percent ? `${Math.round(num*100)}%` : num;
    }
}

export function safeAccess(item, difficulty, property) {
    try {
        return item[difficulty][property];
    } catch (error) {
        return 0;
    }
}


export function equalContainsArrays(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every((element) => arr2.includes(element));
}

export const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
}