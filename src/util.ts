/**
 * 通用方法
 *
 * @file util.ts
 * @author guyunlong
 */

export const isNumber = (obj: any) => {
    return typeof obj=== 'number' && !isNaN(obj);
}

export const isString = (obj: any) => {
    return typeof obj=== 'string';
}